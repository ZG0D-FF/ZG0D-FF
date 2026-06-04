// env.js — single source of truth for environment namespacing

const getEnvPrefix = () => {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.')) 
    return 'jarvis_dev_';
  if (host.includes('staging') || host.includes('preview') || host.includes('vercel.app'))
    return 'jarvis_staging_';
  return 'jarvis_prod_';
};

export const ENV_PREFIX = getEnvPrefix();
export const IDB_NAME = `${ENV_PREFIX}db`;

// Typed wrappers — never call localStorage directly again
export const store = {
  get: (key) => localStorage.getItem(`${ENV_PREFIX}${key}`),
  set: (key, val) => localStorage.setItem(`${ENV_PREFIX}${key}`, val),
  del: (key) => localStorage.removeItem(`${ENV_PREFIX}${key}`),
  
  sessionGet: (key) => sessionStorage.getItem(`${ENV_PREFIX}${key}`),
  sessionSet: (key, val) => sessionStorage.setItem(`${ENV_PREFIX}${key}`, val),
  sessionDel: (key) => sessionStorage.removeItem(`${ENV_PREFIX}${key}`)
};
