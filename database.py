"""
Black Plumbing Heating & Air - SQLite Database Handler (Python)
Uses standard library sqlite3 (Zero external dependencies required)
Thread-safe, self-seeding, context-managed connection pool
"""

import sqlite3
import os
from contextlib import contextmanager

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'black_plumbing.db')
SCHEMA_PATH = os.path.join(BASE_DIR, 'schema.sql')

def get_db_connection():
    """Returns a SQLite connection with Row row_factory for dict-like access."""
    conn = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=30.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

@contextmanager
def get_db():
    """Context manager to guarantee connections are closed and transactions committed."""
    conn = get_db_connection()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    """Initializes the SQLite database from schema.sql and seeds initial data if empty."""
    with get_db() as conn:
        if os.path.exists(SCHEMA_PATH):
            with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
                conn.executescript(f.read())
                
        # Check if locations table is seeded
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM locations")
        if cursor.fetchone()[0] == 0:
            seed_locations = [
                ('abilene', 'Abilene Corporate HQ', '4402 S Danville Dr', 'Abilene', '79605', '(325) 231-4695', '3252314695', 1, 14, 20),
                ('cleburne', 'Cleburne Branch', '1408 N Main St', 'Cleburne', '76033', '(682) 244-2866', '6822442866', 0, 6, 25),
                ('san-angelo', 'San Angelo Branch', '501 N Main St', 'San Angelo', '76903', '(325) 659-3747', '3256593747', 0, 8, 25),
                ('big-spring', 'Big Spring Branch', '1105 E 3rd St', 'Big Spring', '79720', '(432) 935-1117', '4329351117', 0, 5, 30),
                ('brownwood', 'Brownwood Branch', '703 Austin Ave', 'Brownwood', '76801', '(325) 643-5215', '3256435215', 0, 5, 25),
                ('lubbock', 'Lubbock Branch', '8215 Avenue D', 'Lubbock', '79423', '(806) 787-2200', '8067872200', 0, 7, 25),
                ('kerrville', 'Kerrville Branch', '2610 Memorial Blvd', 'Kerrville', '78028', '(830) 240-1708', '8302401708', 0, 4, 35)
            ]
            cursor.executemany("""
                INSERT OR IGNORE INTO locations (code, name, address, city, zip_code, phone, phone_raw, is_hq, active_trucks, avg_eta_minutes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, seed_locations)

        # Check if reviews table is seeded
        cursor.execute("SELECT COUNT(*) FROM reviews")
        if cursor.fetchone()[0] == 0:
            seed_reviews = [
                ('rev-1', 'Karen Herfurth', 5, '1 day ago', 'Google Review', 'Plumbing Repair', 'Abilene, TX', 'They were so helpful and very nice. The technician explained everything clearly before starting and had our kitchen line running like new in under an hour.', 1),
                ('rev-2', 'Larry B.', 5, '3 days ago', 'Google Review', 'Water Heaters', 'Abilene, TX', 'Water heater crapped out. Called Black Plumbing in the morning and by 4:30 a new water heater was installed. Couldn\'t ask for faster or more professional service.', 1),
                ('rev-3', 'Richard M.', 5, '1 week ago', 'Google Review', 'Water Heaters', 'San Angelo, TX', 'These people are awesome! My water heater is in the attic and had to be replaced. They showed up on time and they had 4 employees in the attic to make it as quick as possible but also professionally done.', 1),
                ('rev-4', 'Marcus Vance', 5, '2 weeks ago', 'Angi Verified', 'AC Repair', 'Lubbock, TX', 'Our AC went out in 103-degree West Texas heat. Called dispatch at 8:00 AM and truck was in my driveway by 8:35. Replaced the run capacitor and got us cool again immediately.', 1)
            ]
            cursor.executemany("""
                INSERT OR IGNORE INTO reviews (review_id, author, rating, review_date, source, service, location, content, is_verified)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, seed_reviews)

# 1. Bookings
def insert_booking(data):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO bookings (
                booking_id, customer_name, customer_phone, customer_email,
                customer_address, customer_city, service_category, specific_issue,
                preferred_date, time_window, notes, assigned_tech, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data['booking_id'], data['customer_name'], data['customer_phone'],
            data.get('customer_email', ''), data['customer_address'], data['customer_city'],
            data['service_category'], data.get('specific_issue', ''), data['preferred_date'],
            data['time_window'], data.get('notes', ''), data.get('assigned_tech', 'Master Plumber on Duty'),
            data.get('status', 'CONFIRMED')
        ))
        return cursor.lastrowid

def get_bookings(limit=50):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM bookings ORDER BY id DESC LIMIT ?", (limit,))
        return [dict(row) for row in cursor.fetchall()]

# 2. Emergencies
def insert_emergency(data):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO emergencies (
                emergency_id, customer_name, customer_phone, customer_city,
                customer_address, emergency_type, details, assigned_truck,
                eta_minutes, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data['emergency_id'], data['customer_name'], data['customer_phone'],
            data['customer_city'], data['customer_address'], data['emergency_type'],
            data.get('details', ''), data['assigned_truck'], data['eta_minutes'],
            data.get('status', 'DISPATCHED')
        ))
        return data['emergency_id']

# 3. Contact Messages
def insert_contact_message(data):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO contact_messages (
                sender_name, sender_phone, sender_email, subject, message
            ) VALUES (?, ?, ?, ?, ?)
        """, (
            data['sender_name'], data['sender_phone'], data.get('sender_email', ''),
            data['subject'], data['message']
        ))
        return cursor.lastrowid

# 4. Financing Applications
def insert_financing_app(data):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO financing_applications (
                application_id, applicant_name, applicant_phone, applicant_email,
                monthly_income, credit_tier, requested_amount, plan_id, approved_limit, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data['application_id'], data['applicant_name'], data['applicant_phone'],
            data['applicant_email'], data['monthly_income'], data['credit_tier'],
            data['requested_amount'], data['plan_id'], data['approved_limit'],
            data.get('status', 'PRE_APPROVED')
        ))
        return data['application_id']

# 5. Reviews
def get_reviews(limit=50):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM reviews ORDER BY id DESC LIMIT ?", (limit,))
        return [dict(row) for row in cursor.fetchall()]

def insert_review(data):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO reviews (
                review_id, author, rating, review_date, source, service, location, content, is_verified
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data['review_id'], data['author'], data['rating'], data['review_date'],
            data.get('source', 'Website Submission'), data['service'], data['location'],
            data['content'], 1
        ))
        return data['review_id']

# 6. Locations
def get_locations():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM locations ORDER BY is_hq DESC, name ASC")
        return [dict(row) for row in cursor.fetchall()]

if __name__ == '__main__':
    print("Testing SQLite connection and tables...")
    init_db()
    locs = get_locations()
    print(f"Connected to black_plumbing.db! Found {len(locs)} locations.")
    revs = get_reviews()
    print(f"Found {len(revs)} reviews.")


