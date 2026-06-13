const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'apps/frontend/src');

function getRelativePath(fromFile) {
  const fromDir = path.dirname(fromFile);
  const targetFile = path.join(srcDir, 'config', 'api.js');
  let rel = path.relative(fromDir, targetFile).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel.replace('.js', '');
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('http://localhost:5000')) {
        console.log(`Updating ${fullPath}`);
        // Replace url strings with template literal
        content = content.replace(/'http:\/\/localhost:5000(.*?)'/g, '`${API_URL}$1`');
        content = content.replace(/"http:\/\/localhost:5000(.*?)"/g, '`${API_URL}$1`');
        
        // Add import at the top
        const relPath = getRelativePath(fullPath);
        const importStmt = `import { API_URL } from '${relPath}';\n`;
        content = importStmt + content;
        
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
  }
}

processDirectory(srcDir);
console.log("Done");
