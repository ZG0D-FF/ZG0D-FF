// outbox.js — IndexedDB based outbox for offline optimistic UI
import { ulid } from './ulid.js';
import { ENV_PREFIX } from './env.js';

const DB_NAME = `${ENV_PREFIX}outbox_db`;
const STORE_NAME = 'outbox';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function addToOutbox(url, body) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const item = { id: ulid(), url, body, retries: 0, timestamp: Date.now() };
    store.add(item);
    tx.oncomplete = () => {
      updateSyncUI();
      resolve(item);
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function getOutboxItems() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function removeOutboxItem(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
    tx.oncomplete = () => {
      updateSyncUI();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function queueOrPost(url, body) {
  try {
    const res = await fetch(url, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body) 
    });
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    await addToOutbox(url, body);
    try {
      const sw = await navigator.serviceWorker.ready;
      if (sw.sync) {
        await sw.sync.register('outbox-drain');
      } else {
        // Fallback for Safari
        window.addEventListener('online', drainOutboxFromClient);
      }
    } catch(e) {
      window.addEventListener('online', drainOutboxFromClient);
    }
    return { optimistic: true, status: 'queued' };
  }
}

export async function updateSyncUI() {
  const items = await getOutboxItems();
  let syncChip = document.getElementById('sync-chip');
  if (!syncChip) {
    syncChip = document.createElement('div');
    syncChip.id = 'sync-chip';
    syncChip.style.cssText = 'position:fixed;bottom:20px;left:20px;background:rgba(255,171,0,0.1);border:1px solid #ffab00;color:#ffab00;padding:6px 12px;font-family:monospace;font-size:10px;border-radius:4px;z-index:9999;transition:opacity 0.3s;';
    document.body.appendChild(syncChip);
  }
  
  if (items.length > 0) {
    syncChip.innerHTML = `⟳ ${items.length} unsynced`;
    syncChip.style.opacity = '1';
    syncChip.style.display = 'block';
  } else {
    syncChip.style.opacity = '0';
    setTimeout(() => syncChip.style.display = 'none', 300);
  }
}

export async function drainOutboxFromClient() {
  const items = await getOutboxItems();
  for (const item of items) {
    try {
      const res = await fetch(item.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.body)
      });
      if (res.ok) {
        await removeOutboxItem(item.id);
      }
    } catch (e) {
      // Still failing
    }
  }
}
