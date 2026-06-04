const fs = require('fs');

const files = ['index.html', 'dashboard.html', 'jarvis_ui.html', 'ban.html'];

files.forEach(file => {
  if(!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Inject module import
  if (!content.includes('import { ENV_PREFIX, store }')) {
    // Remove the old inline script logic for ENV_PREFIX
    content = content.replace(
      /window\.ENV_PREFIX = [^;]+;/,
      `// ENV_PREFIX and store managed by env.js module`
    );
    // Insert the module loader at the top of <head>
    content = content.replace('<head>', `<head>\n<script type="module">\n  import { ENV_PREFIX, store } from './env.js';\n  window.ENV_PREFIX = ENV_PREFIX;\n  window.store = store;\n</script>`);
  }
  
  // 2. Replace session storage
  content = content.replace(/sessionStorage\.setItem\(\s*(?:window\.)?ENV_PREFIX\s*\+\s*'([^']+)',\s*(.+?)\)/g, 'window.store.sessionSet(\'$1\', $2)');
  content = content.replace(/sessionStorage\.getItem\(\s*(?:window\.)?ENV_PREFIX\s*\+\s*'([^']+)'\)/g, 'window.store.sessionGet(\'$1\')');
  content = content.replace(/sessionStorage\.removeItem\(\s*(?:window\.)?ENV_PREFIX\s*\+\s*'([^']+)'\)/g, 'window.store.sessionDel(\'$1\')');

  // 3. Replace local storage for explicitly stringified keys (like JARVIS_SECURITY_LOCKOUT)
  // But be careful not to double replace if run multiple times.
  content = content.replace(/localStorage\.setItem\('([^']+)',\s*(.+?)\)/g, 'window.store.set(\'$1\', $2)');
  content = content.replace(/localStorage\.getItem\('([^']+)'\)/g, 'window.store.get(\'$1\')');
  content = content.replace(/localStorage\.removeItem\('([^']+)'\)/g, 'window.store.del(\'$1\')');
  
  fs.writeFileSync(file, content);
  console.log('Refactored', file);
});
