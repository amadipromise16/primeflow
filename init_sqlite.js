/**
 * Initialize SQLite Database & Seed Data
 * Uses built-in node:sqlite in Node.js 24+
 */

const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'black_plumbing.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

console.log('Connecting to SQLite Database at:', DB_PATH);
const db = new DatabaseSync(DB_PATH);

// 1. Execute schema.sql
const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
db.exec(schemaSql);
console.log('✓ Executed schema.sql successfully');

// 2. Seed Locations
const seedLocations = [
  { code: 'abilene', name: 'Abilene Corporate HQ', address: '4402 S Danville Dr', city: 'Abilene', zip_code: '79605', phone: '(325) 231-4695', phone_raw: '3252314695', is_hq: 1, active_trucks: 14, avg_eta: 20 },
  { code: 'cleburne', name: 'Cleburne Branch', address: '1408 N Main St', city: 'Cleburne', zip_code: '76033', phone: '(682) 244-2866', phone_raw: '6822442866', is_hq: 0, active_trucks: 6, avg_eta: 25 },
  { code: 'san-angelo', name: 'San Angelo Branch', address: '501 N Main St', city: 'San Angelo', zip_code: '76903', phone: '(325) 659-3747', phone_raw: '3256593747', is_hq: 0, active_trucks: 8, avg_eta: 25 },
  { code: 'big-spring', name: 'Big Spring Branch', address: '1105 E 3rd St', city: 'Big Spring', zip_code: '79720', phone: '(432) 935-1117', phone_raw: '4329351117', is_hq: 0, active_trucks: 5, avg_eta: 30 },
  { code: 'brownwood', name: 'Brownwood Branch', address: '703 Austin Ave', city: 'Brownwood', zip_code: '76801', phone: '(325) 643-5215', phone_raw: '3256435215', is_hq: 0, active_trucks: 5, avg_eta: 25 },
  { code: 'lubbock', name: 'Lubbock Branch', address: '8215 Avenue D', city: 'Lubbock', zip_code: '79423', phone: '(806) 787-2200', phone_raw: '8067872200', is_hq: 0, active_trucks: 7, avg_eta: 25 },
  { code: 'kerrville', name: 'Kerrville Branch', address: '2610 Memorial Blvd', city: 'Kerrville', zip_code: '78028', phone: '(830) 240-1708', phone_raw: '8302401708', is_hq: 0, active_trucks: 4, avg_eta: 35 }
];

const insertLocation = db.prepare(`
  INSERT OR IGNORE INTO locations (code, name, address, city, zip_code, phone, phone_raw, is_hq, active_trucks, avg_eta_minutes)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const loc of seedLocations) {
  insertLocation.run(loc.code, loc.name, loc.address, loc.city, loc.zip_code, loc.phone, loc.phone_raw, loc.is_hq, loc.active_trucks, loc.avg_eta);
}
console.log(`✓ Seeded ${seedLocations.length} locations`);

// 3. Seed Verified Reviews
const seedReviews = [
  {
    review_id: 'rev-1',
    author: 'Karen Herfurth',
    rating: 5,
    review_date: '1 day ago',
    source: 'Google Review',
    service: 'Plumbing Repair',
    location: 'Abilene, TX',
    content: 'They were so helpful and very nice. The technician explained everything clearly before starting and had our kitchen line running like new in under an hour.'
  },
  {
    review_id: 'rev-2',
    author: 'Larry B.',
    rating: 5,
    review_date: '3 days ago',
    source: 'Google Review',
    service: 'Water Heaters',
    location: 'Abilene, TX',
    content: 'Water heater crapped out. Called Black Plumbing in the morning and by 4:30 a new water heater was installed. Couldn\'t ask for faster or more professional service.'
  },
  {
    review_id: 'rev-3',
    author: 'Richard M.',
    rating: 5,
    review_date: '1 week ago',
    source: 'Google Review',
    service: 'Water Heaters',
    location: 'San Angelo, TX',
    content: 'These people are awesome! My water heater is in the attic and had to be replaced. They showed up on time and they had 4 employees in the attic to make it as quick as possible but also professionally done.'
  },
  {
    review_id: 'rev-4',
    author: 'Marcus Vance',
    rating: 5,
    review_date: '2 weeks ago',
    source: 'Angi Verified',
    service: 'AC Repair',
    location: 'Lubbock, TX',
    content: 'Our AC went out in 103-degree West Texas heat. Called dispatch at 8:00 AM and truck was in my driveway by 8:35. Replaced the run capacitor and got us cool again immediately.'
  }
];

const insertReview = db.prepare(`
  INSERT OR IGNORE INTO reviews (review_id, author, rating, review_date, source, service, location, content, is_verified)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
`);

for (const rev of seedReviews) {
  insertReview.run(rev.review_id, rev.author, rev.rating, rev.review_date, rev.source, rev.service, rev.location, rev.content);
}
console.log(`✓ Seeded ${seedReviews.length} customer reviews`);

// Verify counts
const locCount = db.prepare('SELECT COUNT(*) as count FROM locations').get();
const revCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get();

console.log(`\nSQLite Database Initialized! Database file: black_plumbing.db`);
console.log(`Locations in DB: ${locCount.count}`);
console.log(`Reviews in DB: ${revCount.count}`);
