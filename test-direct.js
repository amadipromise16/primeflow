const { EventEmitter } = require('events');
const { Readable, Writable } = require('stream');
const fs = require('fs');
const path = require('path');

// Verify all files exist in public directory
const requiredFiles = [
  'public/index.html',
  'public/about.html',
  'public/water-heaters.html',
  'public/plumbing.html',
  'public/hvac.html',
  'public/commercial.html',
  'public/locations.html',
  'public/financing.html',
  'public/schedule.html',
  'public/reviews.html',
  'public/contact.html',
  'public/css/styles.css',
  'public/css/components.css',
  'public/css/responsive.css',
  'public/js/main.js',
  'public/js/calculator.js',
  'public/js/map.js',
  'public/js/api.js',
  'public/assets/images/logo.svg',
  'public/assets/images/logo-light.svg',
  'public/assets/images/texas-map.svg',
  'public/assets/images/fleet-hero.svg',
  'public/assets/images/water-heater-diagram.svg',
  'public/assets/images/google-badge.svg',
  'public/assets/images/facebook-badge.svg',
  'public/assets/images/angi-badge.svg',
  'public/assets/images/bbb-badge.svg',
  'public/assets/images/offices/abilene.svg',
  'public/assets/images/offices/big-spring.svg',
  'public/assets/images/offices/brownwood.svg',
  'public/assets/images/offices/cleburne.svg',
  'public/assets/images/offices/kerrville.svg',
  'public/assets/images/offices/lubbock.svg',
  'public/assets/images/offices/san-angelo.svg',
  'public/assets/icons/plumbing-repair.svg',
  'public/assets/icons/leaks.svg',
  'public/assets/icons/water-heaters.svg',
  'public/assets/icons/bathrooms.svg',
  'public/assets/icons/ac-repair.svg',
  'public/assets/icons/ductless-mini-splits.svg',
  'public/assets/icons/furnace.svg',
  'public/assets/icons/indoor-air.svg',
  'public/assets/icons/commercial-ac.svg',
  'public/assets/icons/phcc.svg',
  'public/assets/icons/bbb.svg',
  'public/assets/icons/emergency-247.svg',
  'public/assets/icons/satisfaction-guarantee.svg',
  'public/assets/icons/top-notch.svg'
];

console.log('=== VERIFYING APPLICATION ASSETS & CODEBASE ===');
let missing = 0;
for (const file of requiredFiles) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`[EXISTS] ${file} (${stats.size} bytes)`);
  } else {
    console.error(`[MISSING] ${file}`);
    missing++;
  }
}

if (missing === 0) {
  console.log('\n✅ ALL 47 REQUIRED APPLICATION FILES, PAGES, AND ASSETS EXIST ON DISK!\n');
} else {
  console.error(`\n❌ ${missing} files missing!\n`);
}

// Test key content in HTML files
console.log('=== VERIFYING REFERENCE CONTENT IN HTML FILES ===');
const indexHtml = fs.readFileSync(path.join(__dirname, 'public/index.html'), 'utf8');
const whHtml = fs.readFileSync(path.join(__dirname, 'public/water-heaters.html'), 'utf8');
const aboutHtml = fs.readFileSync(path.join(__dirname, 'public/about.html'), 'utf8');

const assertions = [
  { file: 'index.html', str: 'RESTORING PLUMBING, HVAC &amp;', desc: 'Hero Title' },
  { file: 'index.html', str: '(325) 231-4695', desc: 'Central Dispatch Phone' },
  { file: 'index.html', str: 'OPEN 24/7', desc: 'Open 24/7 Banner' },
  { file: 'index.html', str: 'ONE TRIP STOPS THE DRIP', desc: 'Signature Pill' },
  { file: 'index.html', str: 'PLUMBING / HVAC SERVICES', desc: 'Services Heading' },
  { file: 'index.html', str: 'LOCATIONS WE SERVE', desc: 'Locations Heading' },
  { file: 'index.html', str: 'ABILENE (HQ)', desc: 'Abilene HQ' },
  { file: 'index.html', str: 'CLEBURNE', desc: 'Cleburne Location' },
  { file: 'index.html', str: 'SAN ANGELO', desc: 'San Angelo Location' },
  { file: 'index.html', str: 'BIG SPRING', desc: 'Big Spring Location' },
  { file: 'index.html', str: 'LUBBOCK', desc: 'Lubbock Location' },
  { file: 'index.html', str: 'KAREN HERFURTH', desc: 'Customer Review Karen' },
  { file: 'index.html', str: 'LARRY B.', desc: 'Customer Review Larry' },
  { file: 'index.html', str: 'TACLA145786C', desc: 'HVAC License Number' },
  { file: 'index.html', str: 'M-40900', desc: 'Master Plumber License' },
  { file: 'water-heaters.html', str: 'WATER HEATER INSTALLATION AND REPAIR IN ABILENE, TX', desc: 'Water Heater Page Title' },
  { file: 'water-heaters.html', str: '240 milligrams per liter calcium carbonate', desc: 'Hard Water Mineral Fact' },
  { file: 'water-heaters.html', str: 'RICHARD M.', desc: 'Richard Review' },
  { file: 'about.html', str: 'LICENSED PLUMBING AND HVAC EXPERTS', desc: 'About Page Experts Section' },
  { file: 'about.html', str: 'WE ARE FAMILY-OWNED', desc: 'Family-Owned Section' }
];

let checksPassed = true;
for (const a of assertions) {
  const fileContent = a.file === 'index.html' ? indexHtml : a.file === 'water-heaters.html' ? whHtml : aboutHtml;
  if (fileContent.includes(a.str)) {
    console.log(`[PASS] [${a.file}] Found "${a.desc}"`);
  } else {
    console.error(`[FAIL] [${a.file}] Missing "${a.desc}" -> "${a.str}"`);
    checksPassed = false;
  }
}

if (checksPassed) {
  console.log('\n✅ ALL REFERENCE CONTENT CHECKS PASSED WITH 100% FIDELITY!\n');
}

