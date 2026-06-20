const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Colors
  content = content.replace(/brand-teal/g, 'brand-primary');
  content = content.replace(/brand-indigo/g, 'brand-secondary');
  content = content.replace(/slate-/g, 'zinc-');
  
  fs.writeFileSync(file, content);
});
console.log("Theme updated in all files.");
