const fs = require('fs');
const files = ['index.html', 'dashboard.html', 'jarvis_ui.html', 'ban.html'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let text = fs.readFileSync(f, 'utf8');
    text = text.replace(/from '\.\/env\.js'/g, "from './js/core/env.js'");
    fs.writeFileSync(f, text);
    console.log('Updated ' + f);
  }
});
