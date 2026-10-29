-- ============================================================================
-- Black Plumbing Heating & Air - SQLite Database Schema
-- Compatible with Python Flask (sqlite3) and Node.js (node:sqlite)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Bookings Table (Online Service Scheduling Wizard)
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    customer_address TEXT NOT NULL,
    customer_city TEXT NOT NULL,
    service_category TEXT NOT NULL,
    specific_issue TEXT,
    preferred_date TEXT NOT NULL,
    time_window TEXT NOT NULL,
    notes TEXT,
    assigned_tech TEXT DEFAULT 'Master Plumber on Duty',
    status TEXT DEFAULT 'CONFIRMED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Emergencies Table (24/7 Priority Emergency Dispatch Queue)
CREATE TABLE IF NOT EXISTS emergencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emergency_id TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_city TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    emergency_type TEXT NOT NULL,
    details TEXT,
    assigned_truck TEXT NOT NULL,
    eta_minutes INTEGER NOT NULL,
    status TEXT DEFAULT 'DISPATCHED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_name TEXT NOT NULL,
    sender_phone TEXT NOT NULL,
    sender_email TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'NEW',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Financing Applications Table
CREATE TABLE IF NOT EXISTS financing_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id TEXT NOT NULL UNIQUE,
    applicant_name TEXT NOT NULL,
    applicant_phone TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    monthly_income REAL NOT NULL,
    credit_tier TEXT NOT NULL,
    requested_amount REAL NOT NULL,
    plan_id TEXT NOT NULL,
    approved_limit REAL NOT NULL,
    status TEXT DEFAULT 'PRE_APPROVED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Customer Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    review_id TEXT NOT NULL UNIQUE,
    author TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_date TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Google Review',
    service TEXT NOT NULL,
    location TEXT NOT NULL,
    content TEXT NOT NULL,
    is_verified INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Physical Branches & Service Centers Table
CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    phone TEXT NOT NULL,
    phone_raw TEXT NOT NULL,
    is_hq INTEGER DEFAULT 0,
    active_trucks INTEGER DEFAULT 6,
    avg_eta_minutes INTEGER DEFAULT 25,
    status TEXT DEFAULT 'OPEN 24/7',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Fast Query Performance
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_emergencies_status ON emergencies(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_locations_code ON locations(code);

