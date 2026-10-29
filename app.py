"""
Black Plumbing Heating & Air - Python Flask Application Server
Integrated with SQLite Database (black_plumbing.db)
"""

import os
import random
import datetime
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS

import database

app = Flask(__name__, static_folder='.')
CORS(app)

# Ensure SQLite tables exist on startup
database.init_db()

# -----------------------------------------------------------------------------
# Frontend Static & HTML Routes
# -----------------------------------------------------------------------------
@app.route('/')
def index():
    return send_file('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    # If the file exists directly (e.g. css/styles.css, assets/..., about.html)
    if os.path.exists(filename) and not os.path.isdir(filename):
        return send_file(filename)
    
    # If file with .html exists (e.g. /about -> about.html)
    html_candidate = f"{filename}.html"
    if os.path.exists(html_candidate):
        return send_file(html_candidate)
    
    # Try public directory fallback
    public_file = os.path.join('public', filename)
    if os.path.exists(public_file) and not os.path.isdir(public_file):
        return send_file(public_file)
    
    public_html = os.path.join('public', f"{filename}.html")
    if os.path.exists(public_html):
        return send_file(public_html)
        
    return send_file('index.html')

# -----------------------------------------------------------------------------
# REST API Endpoints with SQLite Persistence
# -----------------------------------------------------------------------------

# 1. Online Smart Booking Wizard
@app.route('/api/schedule', methods=['POST'])
def schedule_appointment():
    data = request.get_json() or {}
    
    name = data.get('name') or data.get('customer_name')
    phone = data.get('phone') or data.get('customer_phone')
    address = data.get('address') or data.get('customer_address')
    city = data.get('city') or data.get('customer_city')
    service = data.get('serviceCategory') or data.get('service_category') or 'General Plumbing'
    
    if not (name and phone and address and city):
        return jsonify({'success': False, 'error': 'Missing required booking details'}), 400
        
    booking_id = f"BP-{random.randint(100000, 999999)}"
    techs = [
        "Master Tech #4 (Abilene Central)",
        "Senior Plumber #8 (San Angelo)",
        "HVAC Lead #2 (Lubbock)",
        "Master Tech #11 (Cleburne)"
    ]
    assigned_tech = random.choice(techs)
    
    booking_record = {
        'booking_id': booking_id,
        'customer_name': name,
        'customer_phone': phone,
        'customer_email': data.get('email') or data.get('customer_email', ''),
        'customer_address': address,
        'customer_city': city,
        'service_category': service,
        'specific_issue': data.get('specificIssue') or data.get('specific_issue', 'Standard Service Request'),
        'preferred_date': data.get('preferredDate') or data.get('preferred_date', 'Tomorrow'),
        'time_window': data.get('timeWindow') or data.get('time_window', 'Morning (8am - 12pm)'),
        'notes': data.get('notes', ''),
        'assigned_tech': assigned_tech,
        'status': 'CONFIRMED'
    }
    
    database.insert_booking(booking_record)
    
    return jsonify({
        'success': True,
        'message': f"Appointment successfully scheduled for {name}",
        'booking': {
            'bookingId': booking_id,
            'assignedTech': assigned_tech,
            'customer': { 'name': name, 'phone': phone, 'address': address, 'city': city },
            'service': { 'category': service, 'issue': booking_record['specific_issue'] },
            'schedule': { 'preferredDate': booking_record['preferred_date'], 'timeWindow': booking_record['time_window'] }
        }
    }), 201

# 2. 24/7 Priority Emergency Dispatch
@app.route('/api/emergency', methods=['POST'])
def emergency_dispatch():
    data = request.get_json() or {}
    
    phone = data.get('phone') or data.get('customer_phone')
    city = data.get('city') or data.get('customer_city') or 'Abilene'
    address = data.get('address') or data.get('customer_address') or 'Local Service Area'
    emergency_type = data.get('emergencyType') or data.get('emergency_type') or 'Burst Pipe / Water Shutoff'
    
    if not phone:
        return jsonify({'success': False, 'error': 'Callback phone number is required'}), 400
        
    emergency_id = f"EMG-{random.randint(10000, 99999)}"
    eta = random.randint(15, 35)
    truck = f"Unit {random.randint(10, 28)} - Rapid Response ({city})"
    
    emergency_record = {
        'emergency_id': emergency_id,
        'customer_name': data.get('name') or data.get('customer_name', 'Emergency Caller'),
        'customer_phone': phone,
        'customer_city': city,
        'customer_address': address,
        'emergency_type': emergency_type,
        'details': data.get('details', 'Emergency 24/7 dispatch requested'),
        'assigned_truck': truck,
        'eta_minutes': eta,
        'status': 'DISPATCHED'
    }
    
    database.insert_emergency(emergency_record)
    
    return jsonify({
        'success': True,
        'message': 'Emergency truck dispatched!',
        'emergency': {
            'emergencyId': emergency_id,
            'assignedTruck': truck,
            'etaMinutes': eta,
            'customer': { 'phone': phone, 'city': city }
        }
    }), 201

# 3. Financing Calculator
@app.route('/api/financing/calculate', methods=['POST'])
def calculate_financing():
    data = request.get_json() or {}
    try:
        amount = float(data.get('amount', 4500))
    except (ValueError, TypeError):
        amount = 4500.0
        
    plans = [
        {
            'id': 'plan-18-zero',
            'name': '18 Months No Interest (0% APR)',
            'termMonths': 18,
            'apr': 0.0,
            'monthlyPayment': round(amount / 18, 2),
            'totalCost': round(amount, 2)
        },
        {
            'id': 'plan-60-low',
            'name': '60 Months Low Monthly Payment (7.99% APR)',
            'termMonths': 60,
            'apr': 7.99,
            'monthlyPayment': round((amount * (0.0799 / 12) * ((1 + 0.0799 / 12) ** 60)) / (((1 + 0.0799 / 12) ** 60) - 1), 2),
            'totalCost': round(((amount * (0.0799 / 12) * ((1 + 0.0799 / 12) ** 60)) / (((1 + 0.0799 / 12) ** 60) - 1)) * 60, 2)
        },
        {
            'id': 'plan-84-extended',
            'name': '84 Months Extended Comfort Plan (9.99% APR)',
            'termMonths': 84,
            'apr': 9.99,
            'monthlyPayment': round((amount * (0.0999 / 12) * ((1 + 0.0999 / 12) ** 84)) / (((1 + 0.0999 / 12) ** 84) - 1), 2),
            'totalCost': round(((amount * (0.0999 / 12) * ((1 + 0.0999 / 12) ** 84)) / (((1 + 0.0999 / 12) ** 84) - 1)) * 84, 2)
        }
    ]
    
    return jsonify({
        'success': True,
        'requestedAmount': amount,
        'plans': plans
    })

# 4. Instant Pre-Qualification Simulator
@app.route('/api/financing/apply', methods=['POST'])
def apply_financing():
    data = request.get_json() or {}
    name = data.get('name')
    phone = data.get('phone')
    income = float(data.get('monthlyIncome', 5000))
    tier = data.get('creditTier', 'excellent')
    requested = float(data.get('amount', 5000))
    
    limit_mult = 3.5 if tier == 'excellent' else (2.5 if tier == 'good' else 1.5)
    approved_limit = min(25000.0, max(requested, income * limit_mult))
    app_id = f"FIN-TX-{random.randint(100000, 999999)}"
    
    app_record = {
        'application_id': app_id,
        'applicant_name': name or 'Applicant',
        'applicant_phone': phone or '(325) 231-4695',
        'applicant_email': data.get('email', 'applicant@texas.com'),
        'monthly_income': income,
        'credit_tier': tier,
        'requested_amount': requested,
        'plan_id': data.get('planId', 'plan-18-zero'),
        'approved_limit': approved_limit,
        'status': 'PRE_APPROVED'
    }
    
    database.insert_financing_app(app_record)
    
    return jsonify({
        'success': True,
        'applicationId': app_id,
        'status': 'PRE_APPROVED',
        'approvedCreditLine': approved_limit,
        'promoPlan': '18 Months 0% APR Available',
        'nextStep': 'Our financing officer will verify your ID and activate your credit line within 1 hour.'
    }), 201

# 5. Water Heater Mineral Diagnostic Engine
@app.route('/api/diagnostic/water-heater', methods=['POST'])
def diagnose_water_heater():
    data = request.get_json() or {}
    age = int(data.get('age', 5))
    symptoms = data.get('symptoms', [])
    
    score = 0
    reasons = []
    
    if 'leaking_base' in symptoms:
        score += 85
        reasons.append('Tank cylinder inner glass lining is compromised; catastrophic leak hazard.')
    if 'rusty_water' in symptoms:
        score += 35
        reasons.append('Sacrificial anode rod depleted; internal galvanic tank corrosion underway.')
    if 'popping_noise' in symptoms:
        score += 25
        reasons.append('Severe West Texas hard-water sediment baking on the bottom heating element.')
    if 'lukewarm_only' in symptoms:
        score += 20
        reasons.append('Lower heating element or dip tube has fractured.')
    if 'pilot_quits' in symptoms:
        score += 20
        reasons.append('Thermocouple or gas control valve failure.')
        
    if age > 10:
        score += 30
        reasons.append(f"Unit age ({age} years) exceeds standard 8-10 year manufacturer lifespan in high-mineral water.")
    elif age > 6:
        score += 15
        
    score = min(100, score)
    
    if score >= 70:
        action = 'REPLACE'
        urgency = 'CRITICAL'
        recommendation = 'Immediate replacement recommended to avoid sudden attic/closet flood damage.'
    elif score >= 40:
        action = 'EVALUATE'
        urgency = 'MODERATE'
        recommendation = 'Professional technician inspection needed; component repair or tank flush may resolve.'
    else:
        action = 'MAINTAIN'
        urgency = 'LOW'
        recommendation = 'Schedule annual mineral sediment flush to maximize equipment life.'
        
    return jsonify({
        'success': True,
        'diagnosticScore': score,
        'recommendedAction': action,
        'urgency': urgency,
        'primaryFactors': reasons,
        'recommendation': recommendation
    })

# 6. Branch Locations
@app.route('/api/locations', methods=['GET'])
def get_locations():
    locs = database.get_locations()
    return jsonify({
        'success': True,
        'count': len(locs),
        'locations': locs
    })

# 7. Customer Reviews
@app.route('/api/reviews', methods=['GET', 'POST'])
def reviews_endpoint():
    if request.method == 'POST':
        data = request.get_json() or {}
        author = data.get('author')
        rating = int(data.get('rating', 5))
        content = data.get('content')
        
        if not (author and content):
            return jsonify({'success': False, 'error': 'Author name and review content are required'}), 400
            
        rev_id = f"rev-{random.randint(1000, 9999)}"
        rev_record = {
            'review_id': rev_id,
            'author': author,
            'rating': max(1, min(5, rating)),
            'review_date': 'Just now',
            'source': 'Verified Customer Submission',
            'service': data.get('service', 'Plumbing Service'),
            'location': data.get('location', 'West Texas'),
            'content': content
        }
        database.insert_review(rev_record)
        return jsonify({
            'success': True,
            'message': 'Thank you! Your verified review has been published.',
            'reviewId': rev_id
        }), 201
        
    revs = database.get_reviews()
    return jsonify({
        'success': True,
        'count': len(revs),
        'reviews': revs
    })

# 8. Contact Form
@app.route('/api/contact', methods=['POST'])
def contact_form():
    data = request.get_json() or {}
    name = data.get('name')
    phone = data.get('phone')
    message = data.get('message')
    
    if not (name and phone and message):
        return jsonify({'success': False, 'error': 'Name, phone, and message are required'}), 400
        
    database.insert_contact_message({
        'sender_name': name,
        'sender_phone': phone,
        'sender_email': data.get('email', ''),
        'subject': data.get('subject', 'General Inquiry'),
        'message': message
    })
    
    return jsonify({
        'success': True,
        'message': 'Thank you! Central dispatch has received your message and will call you shortly.'
    }), 201

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print("=" * 60)
    print("BLACK PLUMBING HEATING & AIR - PYTHON FLASK + SQLITE SERVER")
    print(f"Server running at: http://localhost:{port}")
    print(f"SQLite Database: {database.DB_PATH}")
    print("24/7 Hotline: (325) 231-4695")
    print("=" * 60)
    app.run(host='0.0.0.0', port=port, debug=True)
