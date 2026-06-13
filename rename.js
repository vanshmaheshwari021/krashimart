const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const ignoreDirs = ['node_modules', 'dist', '.git', 'logs'];

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (ignoreDirs.includes(file)) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndReplace(fullPath);
    } else if (stat.isFile()) {
      // only process text files
      const ext = path.extname(file);
      if (!['.js', '.jsx', '.html', '.css', '.json', '.md'].includes(ext) && file !== '.env') continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('KarshiMart') || content.includes('karshimart') || content.includes('KarshiMart')) {
        console.log(`Updating ${fullPath}`);
        content = content.replace(/KarshiMart/g, 'KarshiMart');
        content = content.replace(/KarshiMart/g, 'KarshiMart');
        content = content.replace(/karshimart/g, 'karshimart');
        content = content.replace(/KarshiMart/g, 'KarshiMart');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

walkAndReplace(rootDir);
console.log('Rename complete.');
