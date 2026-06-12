// service_worker.js
const CACHE_NAME = 'jarvis-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  // Pass-through
});

// Background Sync
self.addEventListener('sync', event => {
  if (event.tag === 'outbox-drain') {
    event.waitUntil(drainOutbox());
  }
});

async function drainOutbox() {
  const dbNames = ['jarvis_prod_outbox_db', 'jarvis_dev_outbox_db', 'jarvis_staging_outbox_db'];
  for (const dbName of dbNames) {
    try {
      await drainDatabase(dbName);
    } catch(e) {}
  }
}

function openDB(dbName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function drainDatabase(dbName) {
  const db = await openDB(dbName);
  if (!db.objectStoreNames.contains('outbox')) return;
  
  const tx = db.transaction('outbox', 'readonly');
  const store = tx.objectStore('outbox');
  const items = await new Promise(res => {
    const req = store.getAll();
    req.onsuccess = () => res(req.result);
  });
  
  for (const item of items) {
    try {
      const response = await fetch(item.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.body)
      });
      if (response.ok) {
        // Remove from DB
        const delTx = db.transaction('outbox', 'readwrite');
        delTx.objectStore('outbox').delete(item.id);
      }
    } catch(e) {
      // Offline
    }
  }
}
