const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'assets', 'images');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

// Texas SVG map with 12 locations from the video
const texasMapSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 650" width="100%" height="100%">
  <defs>
    <radialGradient id="mapBgGlow" cx="45%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </radialGradient>
    <linearGradient id="texasFill" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#0F172A" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#1E293B" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="texasStroke" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0EA5E9"/>
      <stop offset="50%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#E11D48"/>
    </linearGradient>
    <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#DC2626" flood-opacity="0.8"/>
    </filter>
    <filter id="hqGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#E11D48" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- Background Card Contour -->
  <rect x="10" y="10" width="780" height="630" rx="20" fill="url(#mapBgGlow)" stroke="#334155" stroke-width="1.5"/>

  <!-- Subtle Coordinate Grid Lines -->
  <g stroke="#334155" stroke-width="0.7" stroke-dasharray="3,6" opacity="0.4">
    <line x1="50" y1="120" x2="750" y2="120"/>
    <line x1="50" y1="240" x2="750" y2="240"/>
    <line x1="50" y1="360" x2="750" y2="360"/>
    <line x1="50" y1="480" x2="750" y2="480"/>
    <line x1="180" y1="30" x2="180" y2="600"/>
    <line x1="340" y1="30" x2="340" y2="600"/>
    <line x1="500" y1="30" x2="500" y2="600"/>
    <line x1="660" y1="30" x2="660" y2="600"/>
  </g>

  <!-- Detailed Stylized State of Texas Silhouette -->
  <!-- Texas Panhandle, West, Central, Gulf Coast, Rio Grande -->
  <path d="
    M 210,60 
    L 330,60 
    L 330,210 
    L 450,210 
    L 530,225 
    L 610,240 
    L 660,250 
    L 670,300 
    L 710,340 
    L 700,380 
    L 650,420 
    L 590,470 
    L 540,530 
    L 480,590 
    L 420,560 
    L 360,500 
    L 310,480 
    L 260,490 
    L 200,430 
    L 170,370 
    L 90,360 
    L 90,300 
    L 210,300 
    Z" 
    fill="url(#texasFill)" 
    stroke="url(#texasStroke)" 
    stroke-width="3" 
    stroke-linejoin="round"/>

  <!-- Service Region Highlight (West, Central, North Texas) -->
  <path d="
    M 210,180 
    L 330,180 
    L 540,230 
    L 550,340 
    L 460,420 
    L 310,420 
    L 200,370 
    L 200,240 
    Z" 
    fill="#E11D48" 
    fill-opacity="0.12" 
    stroke="#E11D48" 
    stroke-width="1.5" 
    stroke-dasharray="4,4"/>

  <!-- Connecting Highway Dispatch Routes -->
  <g stroke="#38BDF8" stroke-width="1.8" stroke-opacity="0.5" stroke-dasharray="3,3">
    <!-- I-20 Corridor: Midland -> Big Spring -> Sweetwater -> Abilene -> Cleburne -->
    <path d="M 230,340 L 285,320 L 335,305 L 380,305 L 530,290"/>
    <!-- North-South Lubbock -> Snyder -> Sweetwater / Abilene -->
    <path d="M 270,220 L 305,270 L 335,305"/>
    <path d="M 270,220 L 350,250 L 380,305"/>
    <!-- Abilene to San Angelo & Brownwood -->
    <path d="M 380,305 L 340,385"/>
    <path d="M 380,305 L 430,365"/>
    <path d="M 340,385 L 430,365"/>
    <path d="M 340,385 L 390,420"/>
  </g>

  <!-- Major Texas Reference Cities (Light text) -->
  <g fill="#64748B" font-family="system-ui, sans-serif" font-size="11" font-weight="600">
    <text x="545" y="270">Dallas / Fort Worth</text>
    <text x="475" y="445">Austin</text>
    <text x="440" y="500">San Antonio</text>
    <text x="630" y="475">Houston</text>
    <text x="105" y="325">El Paso</text>
    <text x="235" y="110">Amarillo</text>
  </g>

  <!-- Black Plumbing 12 Service Locations with Interactive Pin Markers -->
  <!-- 1. ABILENE (MAIN HEADQUARTERS) -->
  <g id="pin-abilene" transform="translate(380, 305)" filter="url(#hqGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="14" fill="#E11D48" fill-opacity="0.3"/>
    <circle cx="0" cy="0" r="8" fill="#E11D48"/>
    <circle cx="0" cy="0" r="4" fill="#FFFFFF"/>
    <!-- Label -->
    <rect x="12" y="-14" width="110" height="24" rx="4" fill="#0F172A" stroke="#E11D48" stroke-width="1.5"/>
    <text x="18" y="2" fill="#FFFFFF" font-family="'Arial Black', sans-serif" font-size="10" font-weight="900">ABILENE (HQ)</text>
  </g>

  <!-- 2. LUBBOCK -->
  <g id="pin-lubbock" transform="translate(270, 220)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="6" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2.5" fill="#FFFFFF"/>
    <rect x="10" y="-12" width="70" height="20" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="15" y="2" fill="#F8FAFC" font-family="sans-serif" font-size="9" font-weight="700">LUBBOCK</text>
  </g>

  <!-- 3. SAN ANGELO -->
  <g id="pin-sanangelo" transform="translate(340, 385)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="6" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2.5" fill="#FFFFFF"/>
    <rect x="-95" y="-10" width="85" height="20" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="-90" y="4" fill="#F8FAFC" font-family="sans-serif" font-size="9" font-weight="700">SAN ANGELO</text>
  </g>

  <!-- 4. BIG SPRING -->
  <g id="pin-bigspring" transform="translate(285, 320)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="6" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2.5" fill="#FFFFFF"/>
    <rect x="-85" y="-10" width="75" height="20" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="-80" y="4" fill="#F8FAFC" font-family="sans-serif" font-size="9" font-weight="700">BIG SPRING</text>
  </g>

  <!-- 5. MIDLAND -->
  <g id="pin-midland" transform="translate(230, 340)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="5" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2" fill="#FFFFFF"/>
    <rect x="-65" y="8" width="60" height="18" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="-60" y="21" fill="#F8FAFC" font-family="sans-serif" font-size="8.5" font-weight="700">MIDLAND</text>
  </g>

  <!-- 6. SWEETWATER -->
  <g id="pin-sweetwater" transform="translate(335, 305)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="5" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2" fill="#FFFFFF"/>
    <rect x="-85" y="-14" width="75" height="18" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="-80" y="-1" fill="#F8FAFC" font-family="sans-serif" font-size="8.5" font-weight="700">SWEETWATER</text>
  </g>

  <!-- 7. SNYDER -->
  <g id="pin-snyder" transform="translate(305, 270)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="5" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2" fill="#FFFFFF"/>
    <rect x="8" y="-10" width="55" height="18" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="13" y="3" fill="#F8FAFC" font-family="sans-serif" font-size="8.5" font-weight="700">SNYDER</text>
  </g>

  <!-- 8. HASKELL -->
  <g id="pin-haskell" transform="translate(350, 240)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="5" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2" fill="#FFFFFF"/>
    <rect x="8" y="-10" width="58" height="18" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="13" y="3" fill="#F8FAFC" font-family="sans-serif" font-size="8.5" font-weight="700">HASKELL</text>
  </g>

  <!-- 9. STAMFORD -->
  <g id="pin-stamford" transform="translate(365, 270)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="5" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2" fill="#FFFFFF"/>
    <rect x="8" y="-9" width="65" height="18" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="12" y="4" fill="#F8FAFC" font-family="sans-serif" font-size="8.5" font-weight="700">STAMFORD</text>
  </g>

  <!-- 10. BROWNWOOD -->
  <g id="pin-brownwood" transform="translate(430, 365)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="6" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2.5" fill="#FFFFFF"/>
    <rect x="10" y="-10" width="85" height="20" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="15" y="4" fill="#F8FAFC" font-family="sans-serif" font-size="9" font-weight="700">BROWNWOOD</text>
  </g>

  <!-- 11. BRADY -->
  <g id="pin-brady" transform="translate(390, 415)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="5" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2" fill="#FFFFFF"/>
    <rect x="8" y="-8" width="50" height="18" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="13" y="5" fill="#F8FAFC" font-family="sans-serif" font-size="8.5" font-weight="700">BRADY</text>
  </g>

  <!-- 12. CLEBURNE -->
  <g id="pin-cleburne" transform="translate(515, 290)" filter="url(#pinGlow)" class="map-pin cursor-pointer">
    <circle cx="0" cy="0" r="6" fill="#DC2626"/>
    <circle cx="0" cy="0" r="2.5" fill="#FFFFFF"/>
    <rect x="10" y="-10" width="75" height="20" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1"/>
    <text x="15" y="4" fill="#F8FAFC" font-family="sans-serif" font-size="9" font-weight="700">CLEBURNE</text>
  </g>

  <!-- Legend in Lower Left -->
  <g transform="translate(30, 480)">
    <rect width="180" height="120" rx="8" fill="#0F172A" fill-opacity="0.9" stroke="#334155" stroke-width="1"/>
    <text x="14" y="24" fill="#FFFFFF" font-family="'Arial Black', sans-serif" font-size="11" font-weight="900">SERVICE COVERAGE</text>
    
    <circle cx="22" cy="46" r="6" fill="#E11D48"/>
    <text x="36" y="50" fill="#E2E8F0" font-family="sans-serif" font-size="10" font-weight="600">Main Headquarters (Abilene)</text>
    
    <circle cx="22" cy="72" r="5" fill="#DC2626"/>
    <text x="36" y="76" fill="#E2E8F0" font-family="sans-serif" font-size="10" font-weight="600">Regional Branch Office</text>
    
    <line x1="16" y1="98" x2="30" y2="98" stroke="#38BDF8" stroke-width="2" stroke-dasharray="2,2"/>
    <text x="36" y="101" fill="#94A3B8" font-family="sans-serif" font-size="9.5">24/7 Rapid Dispatch Route</text>
  </g>
</svg>
`;

fs.writeFileSync(path.join(imgDir, 'texas-map.svg'), texasMapSvg.trim());
console.log('Created texas-map.svg successfully!');

