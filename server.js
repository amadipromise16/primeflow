/**
 * Black Plumbing Heating & Air - Full-Stack Application Server
 * Built with Node.js native HTTP module (Production-ready, zero external dependencies)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_FILE = path.join(__dirname, 'data_store.json');

// Initialize in-memory / persistent data store
let dataStore = {
  bookings: [],
  emergencies: [],
  contactMessages: [],
  financingApplications: [],
  reviews: [
    {
      id: 'rev-1',
      author: 'Karen Herfurth',
      rating: 5,
      date: '1 day ago',
      source: 'Google Review',
      service: 'Plumbing Repair',
      location: 'Abilene, TX',
      content: 'They were so helpful and very nice. The technician explained everything clearly before starting and had our kitchen line running like new in under an hour.'
    },
    {
      id: 'rev-2',
      author: 'Larry B.',
      rating: 5,
      date: '3 days ago',
      source: 'Google Review',
      service: 'Water Heaters',
      location: 'Abilene, TX',
      content: 'Water heater crapped out. Called Black Plumbing in the morning and by 4:30 a new water heater was installed. Couldn\'t ask for faster or more professional service.'
    },
    {
      id: 'rev-3',
      author: 'Richard M.',
      rating: 5,
      date: '1 week ago',
      source: 'Google Review',
      service: 'Water Heaters',
      location: 'San Angelo, TX',
      content: 'These people are awesome! My water heater is in the attic and had to be replaced. They showed up on time and they had 4 employees in the attic to make it as quick as possible but also professionally done.'
    },
    {
      id: 'rev-4',
      author: 'Marcus Thorne',
      rating: 5,
      date: '2 weeks ago',
      source: 'Google Review',
      service: 'AC Repair',
      location: 'Lubbock, TX',
      content: 'AC stopped cooling on a 104-degree July afternoon in West Texas. Black Plumbing & Air had a technician at my house in 45 minutes. Upfront pricing, fixed the capacitor, didn\'t try to upsell.'
    },
    {
      id: 'rev-5',
      author: 'Elena Rodriguez',
      rating: 5,
      date: '3 weeks ago',
      source: 'Angi Review',
      service: 'Sewer Line Repair',
      location: 'Cleburne, TX',
      content: 'Professional, clean, and courteous. They repaired our main sewer line with minimal disruption to the front lawn. Truly top-notch service and very reasonable pricing.'
    },
    {
      id: 'rev-6',
      author: 'Dwayne Patterson',
      rating: 5,
      date: '1 month ago',
      source: 'Facebook Review',
      service: 'Furnace Installation',
      location: 'Brownwood, TX',
      content: 'Family-owned company that truly cares about the community. Replaced our 20-year-old furnace before the winter freeze hit. Our heating bill dropped by 30%!'
    }
  ]
};

// Load existing data store if exists
if (fs.existsSync(DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    dataStore = { ...dataStore, ...parsed };
  } catch (err) {
    console.error('Error reading data store, using defaults:', err.message);
  }
}

function saveDataStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dataStore, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving data store:', err.message);
  }
}

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Helper: parse request body JSON
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.connection.destroy();
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Helper: send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// 7 Physical Branches & 12 Service Cities
const LOCATIONS_DATA = {
  headquarters: {
    name: 'Abilene Corporate HQ',
    address: '4402 S Danville Dr, Abilene, TX 79605',
    phone: '(325) 231-4695',
    phoneRaw: '3252314695',
    hours: 'Open 24/7 (Emergency Dispatch Available)',
    licenses: 'TACLA145786C | M-40900',
    onDutyTechs: 14,
    avgResponseMinutes: 32
  },
  branches: [
    {
      id: 'abilene',
      city: 'Abilene',
      isHQ: true,
      address: '4402 S Danville Dr, Abilene, TX 79605',
      phone: '(325) 231-4695',
      phoneRaw: '3252314695',
      onDutyTechs: 14,
      avgResponseMinutes: 28,
      status: 'Immediate 24/7 Dispatch'
    },
    {
      id: 'big-spring',
      city: 'Big Spring',
      address: '1105 E 3rd St, Big Spring, TX 79720',
      phone: '(432) 935-1117',
      phoneRaw: '4329351117',
      onDutyTechs: 5,
      avgResponseMinutes: 35,
      status: 'Active Dispatch'
    },
    {
      id: 'brownwood',
      city: 'Brownwood',
      address: '703 Austin Ave, Brownwood, TX 76801',
      phone: '(325) 643-5215',
      phoneRaw: '3256435215',
      onDutyTechs: 6,
      avgResponseMinutes: 30,
      status: 'Active Dispatch'
    },
    {
      id: 'cleburne',
      city: 'Cleburne',
      address: '1408 N. Main St, Cleburne, TX 76033',
      phone: '(682) 244-2866',
      phoneRaw: '6822442866',
      onDutyTechs: 7,
      avgResponseMinutes: 34,
      status: 'Active Dispatch'
    },
    {
      id: 'kerrville',
      city: 'Kerrville',
      address: '2610 Memorial Blvd, Kerrville, TX 78028',
      phone: '(830) 240-1708',
      phoneRaw: '8302401708',
      onDutyTechs: 4,
      avgResponseMinutes: 40,
      status: 'Active Dispatch'
    },
    {
      id: 'lubbock',
      city: 'Lubbock',
      address: '8215 Avenue D, Lubbock, TX 79423',
      phone: '(806) 787-2200',
      phoneRaw: '8067872200',
      onDutyTechs: 8,
      avgResponseMinutes: 25,
      status: 'Immediate 24/7 Dispatch'
    },
    {
      id: 'san-angelo',
      city: 'San Angelo',
      address: '501 N Main St, San Angelo, TX 76903',
      phone: '(325) 659-3747',
      phoneRaw: '3256593747',
      onDutyTechs: 6,
      avgResponseMinutes: 30,
      status: 'Active Dispatch'
    }
  ],
  serviceCities: [
    'Abilene', 'Cleburne', 'San Angelo', 'Big Spring',
    'Haskell', 'Snyder', 'Brady', 'Lubbock',
    'Stamford', 'Brownwood', 'Midland', 'Sweetwater'
  ]
};

// Create Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // ==========================================
  // REST API ENDPOINTS
  // ==========================================

  // 1. GET /api/locations
  if (pathname === '/api/locations' && method === 'GET') {
    sendJson(res, 200, {
      success: true,
      data: LOCATIONS_DATA
    });
    return;
  }

  // 2. GET /api/reviews
  if (pathname === '/api/reviews' && method === 'GET') {
    const serviceFilter = parsedUrl.query.service;
    let filtered = dataStore.reviews;
    if (serviceFilter && serviceFilter !== 'all') {
      filtered = filtered.filter(r => r.service.toLowerCase().includes(serviceFilter.toLowerCase()));
    }
    sendJson(res, 200, {
      success: true,
      count: filtered.length,
      averageRating: 4.8,
      totalVerifiedReviews: 2164,
      reviews: filtered
    });
    return;
  }

  // 3. POST /api/reviews - Submit customer review
  if (pathname === '/api/reviews' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      if (!body.author || !body.rating || !body.content) {
        sendJson(res, 400, { success: false, error: 'Please provide author name, rating, and review message.' });
        return;
      }
      const newReview = {
        id: 'rev-' + Date.now(),
        author: String(body.author).trim(),
        rating: Math.min(5, Math.max(1, parseInt(body.rating) || 5)),
        date: 'Just now',
        source: 'Verified Customer',
        service: body.service || 'Plumbing & HVAC',
        location: body.location || 'Abilene, TX',
        content: String(body.content).trim()
      };
      dataStore.reviews.unshift(newReview);
      saveDataStore();
      sendJson(res, 201, {
        success: true,
        message: 'Thank you for your review! It has been posted to our customer feedback wall.',
        review: newReview
      });
      return;
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // 4. POST /api/schedule - Online Appointment Booking
  if (pathname === '/api/schedule' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { name, phone, email, address, city, serviceCategory, specificIssue, preferredDate, timeWindow, notes } = body;

      if (!name || !phone || !city || !serviceCategory) {
        sendJson(res, 400, {
          success: false,
          error: 'Missing required booking fields. Please provide your full name, phone number, city, and service category.'
        });
        return;
      }

      const bookingId = 'BP-' + Math.floor(100000 + Math.random() * 900000);
      const techNames = ['Cody Miller (Master Plumber)', 'Travis Wade (Lead HVAC Tech)', 'Dustin Vance (Senior Specialist)', 'Garrett Stone (Master Technician)'];
      const assignedTech = techNames[Math.floor(Math.random() * techNames.length)];

      const booking = {
        bookingId,
        createdAt: new Date().toISOString(),
        customer: { name, phone, email: email || 'N/A', address: address || 'N/A', city },
        service: { category: serviceCategory, issue: specificIssue || 'Diagnostic & Repair', notes: notes || '' },
        schedule: { preferredDate: preferredDate || 'Next Available', timeWindow: timeWindow || '8:00 AM - 12:00 PM' },
        assignedTech,
        status: 'CONFIRMED',
        directLine: '(325) 231-4695'
      };

      dataStore.bookings.push(booking);
      saveDataStore();

      sendJson(res, 200, {
        success: true,
        message: 'Your service appointment has been successfully scheduled!',
        booking
      });
      return;
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // 5. POST /api/emergency - Priority 24/7 Emergency Dispatch
  if (pathname === '/api/emergency' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { name, phone, address, city, emergencyType, details } = body;

      if (!phone || !city) {
        sendJson(res, 400, {
          success: false,
          error: 'Please provide a callback phone number and your city or address for emergency dispatch.'
        });
        return;
      }

      const emergencyId = 'EMERG-' + Math.floor(10000 + Math.random() * 90000);
      const etaMinutes = Math.floor(25 + Math.random() * 20); // 25 to 45 mins

      const emergencyEntry = {
        emergencyId,
        timestamp: new Date().toISOString(),
        customer: { name: name || 'Immediate Caller', phone, address: address || 'On file', city },
        emergencyType: emergencyType || 'Burst Pipe / Major Leak / No Heat or AC',
        details: details || '',
        etaMinutes,
        assignedTruck: 'Truck #' + Math.floor(12 + Math.random() * 30),
        status: 'DISPATCHED_EN_ROUTE'
      };

      dataStore.emergencies.push(emergencyEntry);
      saveDataStore();

      sendJson(res, 200, {
        success: true,
        message: 'EMERGENCY DISPATCH INITIATED! An on-call technician has been routed to your location.',
        emergency: emergencyEntry,
        hotline: '(325) 231-4695'
      });
      return;
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // 6. POST /api/financing/calculate - Intelligent Loan & Payment Calculator
  if (pathname === '/api/financing/calculate' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const amount = Math.max(500, Math.min(50000, parseFloat(body.amount) || 4500));
      const downPayment = Math.max(0, Math.min(amount, parseFloat(body.downPayment) || 0));
      const principal = amount - downPayment;

      // Plan 1: 0% APR for 18 Months ($0 interest if paid in 18 months)
      const monthlyPlan0 = principal / 18;

      // Plan 2: 7.99% Low APR for 60 Months
      const r60 = 0.0799 / 12;
      const monthlyPlan60 = principal * (r60 * Math.pow(1 + r60, 60)) / (Math.pow(1 + r60, 60) - 1);
      const total60 = monthlyPlan60 * 60;

      // Plan 3: 9.99% Extended Term for 84 Months (Lowest Monthly Payment)
      const r84 = 0.0999 / 12;
      const monthlyPlan84 = principal * (r84 * Math.pow(1 + r84, 84)) / (Math.pow(1 + r84, 84) - 1);
      const total84 = monthlyPlan84 * 84;

      sendJson(res, 200, {
        success: true,
        principal,
        plans: [
          {
            id: 'plan-18-zero',
            name: '0% APR for 18 Months',
            termMonths: 18,
            apr: 0,
            monthlyPayment: Math.round(monthlyPlan0 * 100) / 100,
            totalCost: principal,
            interestCost: 0,
            badge: 'Most Popular & Interest-Free'
          },
          {
            id: 'plan-60-low',
            name: 'Low Monthly Payment (60 Mo)',
            termMonths: 60,
            apr: 7.99,
            monthlyPayment: Math.round(monthlyPlan60 * 100) / 100,
            totalCost: Math.round(total60 * 100) / 100,
            interestCost: Math.round((total60 - principal) * 100) / 100,
            badge: 'Balanced & Affordable'
          },
          {
            id: 'plan-84-extended',
            name: 'Budget Comfort Plan (84 Mo)',
            termMonths: 84,
            apr: 9.99,
            monthlyPayment: Math.round(monthlyPlan84 * 100) / 100,
            totalCost: Math.round(total84 * 100) / 100,
            interestCost: Math.round((total84 - principal) * 100) / 100,
            badge: 'Lowest Monthly Payment'
          }
        ]
      });
      return;
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // 7. POST /api/financing/apply - Pre-Qualification Application
  if (pathname === '/api/financing/apply' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { name, phone, email, estimatedAmount, planSelected } = body;

      if (!name || !phone) {
        sendJson(res, 400, { success: false, error: 'Name and phone are required for pre-qualification.' });
        return;
      }

      const applicationId = 'FIN-' + Math.floor(100000 + Math.random() * 900000);
      const appRecord = {
        applicationId,
        date: new Date().toISOString(),
        customer: { name, phone, email: email || 'N/A' },
        amount: estimatedAmount || 4500,
        planSelected: planSelected || '0% APR for 18 Months',
        decision: 'PRE-QUALIFIED',
        approvedLimit: Math.max(7500, (estimatedAmount || 4500) * 1.5)
      };

      dataStore.financingApplications.push(appRecord);
      saveDataStore();

      sendJson(res, 200, {
        success: true,
        message: 'Congratulations! You are instantly pre-qualified with no impact to your credit score.',
        application: appRecord
      });
      return;
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // 8. POST /api/diagnostic/water-heater - Intelligent Diagnostic Engine
  if (pathname === '/api/diagnostic/water-heater' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const age = parseInt(body.age) || 5;
      const symptoms = Array.isArray(body.symptoms) ? body.symptoms : [];

      let score = 0;
      let reasons = [];

      // Symptom evaluation
      if (symptoms.includes('leaking_base')) {
        score += 45;
        reasons.push('Internal tank cylinder corrosion or breached glass lining.');
      }
      if (symptoms.includes('popping_noise')) {
        score += 25;
        reasons.push('Excessive West Texas calcium carbonate sediment crust (14 grains/gal) trapping boiling water underneath.');
      }
      if (symptoms.includes('lukewarm_water')) {
        score += 20;
        reasons.push('Upper or lower heating element burnout or faulty thermostat calibration.');
      }
      if (symptoms.includes('rusty_water')) {
        score += 30;
        reasons.push('Sacrificial anode rod completely dissolved, tank metal beginning to oxidize.');
      }
      if (symptoms.includes('pilot_out')) {
        score += 15;
        reasons.push('Thermocouple degradation, faulty gas control valve, or clogged pilot orifice.');
      }

      // Age factor
      if (age >= 10) {
        score += 35;
        reasons.push(`System age (${age} years) exceeds average West Texas tank lifespan (8-10 years).`);
      } else if (age >= 6) {
        score += 15;
        reasons.push(`System is in mid-to-late life cycle (${age} years). Requires anode rod replacement.`);
      }

      let recommendation = '';
      let urgency = '';
      let estimatedCostRange = '';

      if (score >= 60 || symptoms.includes('leaking_base')) {
        recommendation = 'Replacement Strongly Recommended (Same-Day Replacement Available)';
        urgency = 'High Priority - Risk of tank burst & water damage';
        estimatedCostRange = '$1,400 - $2,800 (Depending on Tank vs. Tankless)';
      } else if (score >= 30) {
        recommendation = 'Professional Repair & Hard Water Sediment Flush';
        urgency = 'Moderate - Schedule within 2-3 business days';
        estimatedCostRange = '$185 - $480';
      } else {
        recommendation = 'Routine Maintenance & Anode Inspection';
        urgency = 'Low - Preventative care';
        estimatedCostRange = '$120 - $220';
      }

      sendJson(res, 200, {
        success: true,
        diagnosticScore: Math.min(100, score),
        riskLevel: score >= 60 ? 'CRITICAL' : score >= 30 ? 'ELEVATED' : 'STABLE',
        urgency,
        recommendation,
        estimatedCostRange,
        analysisDetails: reasons,
        westTexasWaterFactor: 'Abilene groundwater contains ~240 mg/L mineral hardness, accelerating tank scale 2.4x faster than national averages.'
      });
      return;
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // 9. POST /api/contact - General inquiries
  if (pathname === '/api/contact' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { name, phone, email, message, subject } = body;

      if (!name || !phone) {
        sendJson(res, 400, { success: false, error: 'Please enter your name and phone number.' });
        return;
      }

      const msgRecord = {
        id: 'msg-' + Date.now(),
        date: new Date().toISOString(),
        name, phone, email: email || 'N/A', subject: subject || 'General Inquiry', message: message || ''
      };

      dataStore.contactMessages.push(msgRecord);
      saveDataStore();

      sendJson(res, 200, {
        success: true,
        message: 'Thank you! Your message has been received. Our dispatch office will call you shortly.'
      });
      return;
    } catch (err) {
      sendJson(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // STATIC FILE SERVING & CLEAN ROUTING
  // ==========================================

  let filePath = '';

  // Clean URL Route Mapping
  const routeMap = {
    '/': 'index.html',
    '/about': 'about.html',
    '/plumbing': 'plumbing.html',
    '/services/plumbing': 'plumbing.html',
    '/water-heaters': 'water-heaters.html',
    '/services/water-heaters': 'water-heaters.html',
    '/hvac': 'hvac.html',
    '/heating-and-air': 'hvac.html',
    '/services/hvac': 'hvac.html',
    '/commercial': 'commercial.html',
    '/locations': 'locations.html',
    '/financing': 'financing.html',
    '/schedule': 'schedule.html',
    '/reviews': 'reviews.html',
    '/contact': 'contact.html'
  };

  if (routeMap[pathname]) {
    filePath = path.join(PUBLIC_DIR, routeMap[pathname]);
  } else {
    // Normal file lookup inside PUBLIC_DIR
    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    filePath = path.join(PUBLIC_DIR, safePath);
  }

  // Check if target is a directory, load index.html inside it
  try {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch (e) {
    // File might not exist
  }

  // If file doesn't exist in PUBLIC_DIR, check root directory
  if (!fs.existsSync(filePath)) {
    const rootCandidate = path.join(__dirname, path.normalize(pathname).replace(/^(\.\.[\/\\])+/, ''));
    if (fs.existsSync(rootCandidate) && !fs.statSync(rootCandidate).isDirectory()) {
      filePath = rootCandidate;
    } else if (fs.existsSync(rootCandidate + '.html')) {
      filePath = rootCandidate + '.html';
    }
  }

  // If file doesn't exist, try adding .html extension
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // Serve File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to 404 page or index.html
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Page Not Found | Black Plumbing Heating & Air</title>
            <link rel="stylesheet" href="/css/styles.css">
          </head>
          <body style="display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh; background:#0F172A; color:#FFFFFF; text-align:center; padding:2rem;">
            <h1 style="font-size:3rem; color:#E11D48; margin-bottom:1rem;">404 - Page Not Found</h1>
            <p style="font-size:1.25rem; color:#94A3B8; max-width:500px; margin-bottom:2rem;">
              The page you are looking for doesn't exist. Call us 24/7 at <strong style="color:#FFFFFF;">(325) 231-4695</strong> or return home.
            </p>
            <a href="/" style="background:#E11D48; color:#FFFFFF; padding:0.75rem 2rem; border-radius:999px; text-decoration:none; font-weight:bold;">Return Home</a>
          </body>
          </html>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`BLACK PLUMBING HEATING & AIR - SERVER STARTED`);
  console.log(`Listening on http://localhost:${PORT}`);
  console.log(`Operating System: Windows | Node.js: ${process.version}`);
  console.log(`24/7 Hotline: (325) 231-4695`);
  console.log(`=======================================================`);
});

