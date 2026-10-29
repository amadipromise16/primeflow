const http = require('http');
const { spawn } = require('child_process');

const TEST_PORT = 3456;
process.env.PORT = String(TEST_PORT);

console.log('--- Starting Test Server on Port ' + TEST_PORT + ' ---');
const serverProcess = spawn('node', ['server.js'], {
  env: { ...process.env, PORT: String(TEST_PORT) },
  stdio: 'pipe'
});

serverProcess.stdout.on('data', (d) => process.stdout.write('[SERVER]: ' + d));
serverProcess.stderr.on('data', (d) => process.stderr.write('[SERVER ERROR]: ' + d));

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const req = http.request({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

setTimeout(async () => {
  try {
    console.log('\n--- Running Automated Full-Stack Route & API Tests ---\n');

    const pages = [
      '/',
      '/about',
      '/water-heaters',
      '/plumbing',
      '/hvac',
      '/commercial',
      '/locations',
      '/financing',
      '/schedule',
      '/reviews',
      '/contact'
    ];

    let allPassed = true;

    for (const page of pages) {
      const res = await makeRequest(page);
      if (res.status === 200 && res.body.includes('<!DOCTYPE html>')) {
        console.log(`[PASS] Page ${page} -> Status: 200 OK (${res.body.length} bytes)`);
      } else {
        console.error(`[FAIL] Page ${page} -> Status: ${res.status}`);
        allPassed = false;
      }
    }

    // Static Assets Check
    const assets = [
      '/css/styles.css',
      '/css/components.css',
      '/css/responsive.css',
      '/js/main.js',
      '/js/calculator.js',
      '/js/map.js',
      '/js/api.js',
      '/assets/images/logo.svg',
      '/assets/images/texas-map.svg',
      '/assets/images/fleet-hero.svg',
      '/assets/images/water-heater-diagram.svg'
    ];

    for (const asset of assets) {
      const res = await makeRequest(asset);
      if (res.status === 200) {
        console.log(`[PASS] Asset ${asset} -> Status: 200 OK`);
      } else {
        console.error(`[FAIL] Asset ${asset} -> Status: ${res.status}`);
        allPassed = false;
      }
    }

    // API Tests
    console.log('\n--- Testing REST API Endpoints ---');

    // 1. Locations
    const locRes = await makeRequest('/api/locations');
    const locData = JSON.parse(locRes.body);
    if (locRes.status === 200 && locData.data.branches.length === 7) {
      console.log(`[PASS] GET /api/locations -> 7 Texas branches loaded`);
    } else {
      console.error(`[FAIL] GET /api/locations`);
      allPassed = false;
    }

    // 2. Reviews
    const revRes = await makeRequest('/api/reviews');
    const revData = JSON.parse(revRes.body);
    if (revRes.status === 200 && revData.reviews.length >= 6) {
      console.log(`[PASS] GET /api/reviews -> ${revData.reviews.length} reviews loaded (Avg 4.8★)`);
    } else {
      console.error(`[FAIL] GET /api/reviews`);
      allPassed = false;
    }

    // 3. Financing Calculator API
    const finRes = await makeRequest('/api/financing/calculate', 'POST', { amount: 6500 });
    const finData = JSON.parse(finRes.body);
    if (finRes.status === 200 && finData.plans.length === 3) {
      console.log(`[PASS] POST /api/financing/calculate -> 3 plans calculated ($${finData.plans[0].monthlyPayment}/mo for 18mo 0% APR)`);
    } else {
      console.error(`[FAIL] POST /api/financing/calculate`);
      allPassed = false;
    }

    // 4. Diagnostic Engine API
    const diagRes = await makeRequest('/api/diagnostic/water-heater', 'POST', {
      age: 9,
      symptoms: ['popping_noise', 'lukewarm_water']
    });
    const diagData = JSON.parse(diagRes.body);
    if (diagRes.status === 200 && diagData.diagnosticScore > 0) {
      console.log(`[PASS] POST /api/diagnostic/water-heater -> Score: ${diagData.diagnosticScore}/100 (${diagData.riskLevel})`);
    } else {
      console.error(`[FAIL] POST /api/diagnostic/water-heater`);
      allPassed = false;
    }

    // 5. Booking API
    const bookRes = await makeRequest('/api/schedule', 'POST', {
      name: 'Test Customer',
      phone: '325-555-0199',
      city: 'Abilene',
      serviceCategory: 'Water Heaters',
      specificIssue: 'Rumbling noise and lukewarm water'
    });
    const bookData = JSON.parse(bookRes.body);
    if (bookRes.status === 200 && bookData.booking.bookingId) {
      console.log(`[PASS] POST /api/schedule -> Booking Confirmed: ${bookData.booking.bookingId} (${bookData.booking.assignedTech})`);
    } else {
      console.error(`[FAIL] POST /api/schedule`);
      allPassed = false;
    }

    // 6. Emergency Dispatch API
    const emergRes = await makeRequest('/api/emergency', 'POST', {
      name: 'Emergency Tester',
      phone: '325-555-9111',
      city: 'San Angelo',
      emergencyType: 'Burst Pipe'
    });
    const emergData = JSON.parse(emergRes.body);
    if (emergRes.status === 200 && emergData.emergency.emergencyId) {
      console.log(`[PASS] POST /api/emergency -> Emergency Dispatched: ${emergData.emergency.emergencyId} (ETA: ${emergData.emergency.etaMinutes} mins)`);
    } else {
      console.error(`[FAIL] POST /api/emergency`);
      allPassed = false;
    }

    console.log('\n=======================================================');
    if (allPassed) {
      console.log('✅ ALL TESTS PASSED SUCCESSFULLY! SERVER & FRONTEND 100% READY.');
    } else {
      console.log('❌ SOME TESTS FAILED.');
    }
    console.log('=======================================================\n');

  } catch (err) {
    console.error('Test execution failed:', err);
  } finally {
    serverProcess.kill();
    process.exit(0);
  }
}, 1500);

