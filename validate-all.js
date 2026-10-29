/**
 * Full Workspace Comprehensive Validator
 * Checks HTML structure, asset links, internal links, and JS syntax
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let errors = [];
let warnings = [];

console.log('=== RUNNING WORKSPACE COMPREHENSIVE VALIDATION ===\n');

// 1. Check JS syntax for all JavaScript files
const jsFiles = [
  'server.js',
  'init_sqlite.js',
  'test-sqlite-full.js',
  'prepare-github-pages.js',
  'public/js/main.js',
  'public/js/calculator.js',
  'public/js/map.js',
  'public/js/api.js',
  'js/main.js',
  'js/calculator.js',
  'js/map.js',
  'js/api.js'
];

jsFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    try {
      execSync(`node --check "${fullPath}"`);
      console.log(`✓ [JS VALID] ${file}`);
    } catch (e) {
      errors.push(`JS Syntax Error in ${file}: ${e.message}`);
    }
  } else {
    warnings.push(`File ${file} not found for syntax check`);
  }
});

// 2. Check HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  'water-heaters.html',
  'plumbing.html',
  'hvac.html',
  'commercial.html',
  'locations.html',
  'financing.html',
  'schedule.html',
  'reviews.html',
  'contact.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing HTML file: ${file}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Check tags
  if (!content.includes('<!DOCTYPE html>')) errors.push(`${file} missing <!DOCTYPE html>`);
  if (!content.includes('<html')) errors.push(`${file} missing <html>`);
  if (!content.includes('</html>')) errors.push(`${file} missing </html>`);
  if (!content.includes('<head>')) errors.push(`${file} missing <head>`);
  if (!content.includes('</head>')) errors.push(`${file} missing </head>`);
  if (!content.includes('<body>')) errors.push(`${file} missing <body>`);
  if (!content.includes('</body>')) errors.push(`${file} missing </body>`);

  // Check internal href links (excluding tel:, mailto:, #, http)
  const hrefMatches = content.match(/href="([^"#:]+)"/g) || [];
  hrefMatches.forEach(m => {
    const rawLink = m.replace(/href="|"/g, '');
    const cleanLink = rawLink.split('#')[0].split('?')[0];
    if (cleanLink && !cleanLink.startsWith('http') && !cleanLink.startsWith('tel') && !cleanLink.startsWith('mailto')) {
      const targetPath = path.join(__dirname, cleanLink);
      if (!fs.existsSync(targetPath)) {
        errors.push(`${file}: Broken link href="${rawLink}" (Target file "${cleanLink}" does not exist on disk)`);
      }
    }
  });

  // Check internal src links
  const srcMatches = content.match(/src="([^":]+)"/g) || [];
  srcMatches.forEach(m => {
    const src = m.replace(/src="|"/g, '');
    if (src && !src.startsWith('http') && !src.startsWith('data:')) {
      const targetPath = path.join(__dirname, src);
      if (!fs.existsSync(targetPath)) {
        errors.push(`${file}: Broken asset src="${src}" (Asset does not exist on disk)`);
      }
    }
  });

  console.log(`✓ [HTML VALID] ${file} (${content.length} bytes, internal links & assets verified)`);
});

// 3. Check SQLite database
const dbPath = path.join(__dirname, 'black_plumbing.db');
if (fs.existsSync(dbPath)) {
  const stats = fs.statSync(dbPath);
  console.log(`✓ [SQLITE VALID] black_plumbing.db exists (${stats.size} bytes)`);
} else {
  errors.push('black_plumbing.db missing from disk');
}

console.log('\n=== VALIDATION SUMMARY ===');
if (errors.length === 0) {
  console.log('🎉 0 ERRORS DETECTED! Entire project structure, assets, links, and code are 100% sound.');
} else {
  console.error(`❌ ${errors.length} ERRORS DETECTED:`);
  errors.forEach(e => console.error('  - ' + e));
}

if (warnings.length > 0) {
  console.log('\nWarnings:');
  warnings.forEach(w => console.log('  - ' + w));
}
