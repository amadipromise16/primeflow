"""
Black Plumbing Heating & Air - SQLite Database Handler (Python)
Uses standard library sqlite3 (Zero external dependencies required)
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'black_plumbing.db')
SCHEMA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'schema.sql')

def get_db_connection():
    """Returns a SQLite connection with Row row_factory for dict-like access."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def init_db():
    """Initializes the SQLite database from schema.sql if tables do not exist."""
    conn = get_db_connection()
    if os.path.exists(SCHEMA_PATH):
        with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
            conn.executescript(f.read())
    conn.commit()
    conn.close()

# 1. Bookings
def insert_booking(data):
    conn = get_db_connection()
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
    conn.commit()
    booking_id = cursor.lastrowid
    conn.close()
    return booking_id

def get_bookings(limit=50):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bookings ORDER BY id DESC LIMIT ?", (limit,))
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

# 2. Emergencies
def insert_emergency(data):
    conn = get_db_connection()
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
    conn.commit()
    conn.close()
    return data['emergency_id']

# 3. Contact Messages
def insert_contact_message(data):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO contact_messages (
            sender_name, sender_phone, sender_email, subject, message
        ) VALUES (?, ?, ?, ?, ?)
    """, (
        data['sender_name'], data['sender_phone'], data.get('sender_email', ''),
        data['subject'], data['message']
    ))
    conn.commit()
    conn.close()

# 4. Financing Applications
def insert_financing_app(data):
    conn = get_db_connection()
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
    conn.commit()
    conn.close()
    return data['application_id']

# 5. Reviews
def get_reviews(limit=50):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM reviews ORDER BY id DESC LIMIT ?", (limit,))
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

def insert_review(data):
    conn = get_db_connection()
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
    conn.commit()
    conn.close()
    return data['review_id']

# 6. Locations
def get_locations():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM locations ORDER BY is_hq DESC, name ASC")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

if __name__ == '__main__':
    print("Testing SQLite connection...")
    init_db()
    locs = get_locations()
    print(f"Connected to black_plumbing.db! Found {len(locs)} locations.")
    revs = get_reviews()
    print(f"Found {len(revs)} reviews.")
