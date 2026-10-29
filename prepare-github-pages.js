/**
 * GitHub Pages Preparation Script
 * Normalizes all links and asset paths to relative paths so the website works
 * perfectly on GitHub Pages (under any repository subpath or custom domain)
 * as well as locally with Node.js.
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const rootDir = __dirname;

// 1. Update public/js/main.js
const mainJsPath = path.join(publicDir, 'js', 'main.js');
let mainJs = fs.readFileSync(mainJsPath, 'utf8');
mainJs = mainJs.replace(/'\/assets\//g, "'assets/");
mainJs = mainJs.replace(/"\/assets\//g, '"assets/');
fs.writeFileSync(mainJsPath, mainJs, 'utf8');
console.log('✓ Updated public/js/main.js for relative asset loading');

// 2. Normalize HTML files in public/
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const replacements = [
  { pattern: /href="\/css\//g, replacement: 'href="css/' },
  { pattern: /src="\/js\//g, replacement: 'src="js/' },
  { pattern: /src="\/assets\//g, replacement: 'src="assets/' },
  { pattern: /href="\/assets\//g, replacement: 'href="assets/' },
  { pattern: /href="\/about#/g, replacement: 'href="about.html#' },
  { pattern: /href="\/about"/g, replacement: 'href="about.html"' },
  { pattern: /href="\/plumbing#/g, replacement: 'href="plumbing.html#' },
  { pattern: /href="\/plumbing"/g, replacement: 'href="plumbing.html"' },
  { pattern: /href="\/water-heaters#/g, replacement: 'href="water-heaters.html#' },
  { pattern: /href="\/water-heaters"/g, replacement: 'href="water-heaters.html"' },
  { pattern: /href="\/hvac#/g, replacement: 'href="hvac.html#' },
  { pattern: /href="\/hvac"/g, replacement: 'href="hvac.html"' },
  { pattern: /href="\/commercial#/g, replacement: 'href="commercial.html#' },
  { pattern: /href="\/commercial"/g, replacement: 'href="commercial.html"' },
  { pattern: /href="\/locations#/g, replacement: 'href="locations.html#' },
  { pattern: /href="\/locations"/g, replacement: 'href="locations.html"' },
  { pattern: /href="\/financing#/g, replacement: 'href="financing.html#' },
  { pattern: /href="\/financing"/g, replacement: 'href="financing.html"' },
  { pattern: /href="\/schedule#/g, replacement: 'href="schedule.html#' },
  { pattern: /href="\/schedule"/g, replacement: 'href="schedule.html"' },
  { pattern: /href="\/reviews#/g, replacement: 'href="reviews.html#' },
  { pattern: /href="\/reviews"/g, replacement: 'href="reviews.html"' },
  { pattern: /href="\/contact#/g, replacement: 'href="contact.html#' },
  { pattern: /href="\/contact"/g, replacement: 'href="contact.html"' },
  { pattern: /href="\/"/g, replacement: 'href="index.html"' }
];

htmlFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  replacements.forEach(r => {
    content = content.replace(r.pattern, r.replacement);
  });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Normalized links in public/${file}`);
});

// 3. Mirror all HTML files, css/, and js/ to root directory so GitHub Pages serves from root directly
htmlFiles.forEach(file => {
  const src = path.join(publicDir, file);
  const dest = path.join(rootDir, file);
  fs.copyFileSync(src, dest);
});
console.log('✓ Mirrored all 11 HTML pages to root directory');

// Helper to copy dir recursively
function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursive(path.join(publicDir, 'css'), path.join(rootDir, 'css'));
console.log('✓ Mirrored css/ to root directory');

copyDirRecursive(path.join(publicDir, 'js'), path.join(rootDir, 'js'));
console.log('✓ Mirrored js/ to root directory');

// Note: root assets/ already exists and has all generated assets; let's sync public/assets to root assets to be sure
copyDirRecursive(path.join(publicDir, 'assets'), path.join(rootDir, 'assets'));
console.log('✓ Synced assets/ at root directory');

// 4. Create .nojekyll at root
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');
console.log('✓ Created .nojekyll for GitHub Pages');

// 5. Create .gitignore
const gitignore = `node_modules/
.DS_Store
Thumbs.db
data_store.json
*.log
`;
fs.writeFileSync(path.join(rootDir, '.gitignore'), gitignore, 'utf8');
console.log('✓ Created .gitignore');

console.log('\nAll files prepared successfully for GitHub Pages hosting!');

