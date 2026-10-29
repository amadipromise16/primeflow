const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'assets', 'images');

// 1. Team & Fleet Hero Showcase Graphic
const fleetHeroSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="60%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#E0F2FE"/>
    </linearGradient>
    <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="vanMetal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
  </defs>

  <!-- Big Texas Sky Background -->
  <rect x="0" y="0" width="1200" height="420" fill="url(#skyGrad)"/>
  
  <!-- Subtle Soft Texas Clouds -->
  <path d="M120 160 Q160 120 220 140 Q280 110 340 150 Q400 130 460 160 Q480 180 440 200 L140 200 Z" fill="#FFFFFF" fill-opacity="0.35"/>
  <path d="M720 140 Q770 100 840 120 Q910 90 980 130 Q1040 110 1100 140 L1080 180 L740 180 Z" fill="#FFFFFF" fill-opacity="0.3"/>

  <!-- Black Plumbing Headquarters Facade in Background -->
  <rect x="250" y="160" width="700" height="230" fill="#1E293B" stroke="#475569" stroke-width="2"/>
  <rect x="280" y="175" width="640" height="40" fill="#0F172A"/>
  <text x="600" y="202" fill="#E11D48" font-family="'Impact', 'Arial Black', sans-serif" font-size="24" font-weight="900" text-anchor="middle" letter-spacing="4">BLACK PLUMBING HEATING &amp; AIR &bull; TEXAS HQ</text>
  <!-- Warehouse Bay Doors -->
  <rect x="300" y="240" width="120" height="150" fill="#334155" stroke="#64748B" stroke-width="2"/>
  <rect x="460" y="240" width="120" height="150" fill="#334155" stroke="#64748B" stroke-width="2"/>
  <rect x="620" y="240" width="120" height="150" fill="#334155" stroke="#64748B" stroke-width="2"/>
  <rect x="780" y="240" width="120" height="150" fill="#334155" stroke="#64748B" stroke-width="2"/>

  <!-- Pavement Ground -->
  <rect x="0" y="380" width="1200" height="220" fill="url(#groundGrad)"/>
  <line x1="0" y1="380" x2="1200" y2="380" stroke="#64748B" stroke-width="3"/>
  <line x1="0" y1="560" x2="1200" y2="560" stroke="#F59E0B" stroke-width="4" stroke-dasharray="30,30" opacity="0.4"/>

  <!-- Fleet of Service Vans (Left Van) -->
  <g transform="translate(60, 270)">
    <rect x="10" y="40" width="220" height="110" rx="8" fill="url(#vanMetal)" stroke="#334155" stroke-width="2"/>
    <path d="M180 40 L230 80 L230 150 L180 150 Z" fill="url(#vanMetal)" stroke="#334155" stroke-width="2"/>
    <!-- Windshield -->
    <path d="M182 48 L220 80 L182 80 Z" fill="#0284C7" fill-opacity="0.7"/>
    <!-- Red Brand Stripe -->
    <rect x="10" y="85" width="210" height="26" fill="#DC2626"/>
    <text x="110" y="103" fill="#FFFFFF" font-family="'Impact', sans-serif" font-size="13" font-weight="900" text-anchor="middle">BLACK PLUMBING</text>
    <!-- Van Wheels -->
    <circle cx="55" cy="150" r="22" fill="#0F172A" stroke="#E11D48" stroke-width="4"/>
    <circle cx="185" cy="150" r="22" fill="#0F172A" stroke="#E11D48" stroke-width="4"/>
  </g>

  <!-- Fleet of Service Vans (Right Van) -->
  <g transform="translate(900, 270)">
    <rect x="10" y="40" width="220" height="110" rx="8" fill="url(#vanMetal)" stroke="#334155" stroke-width="2"/>
    <path d="M10 40 L-40 80 L-40 150 L10 150 Z" fill="url(#vanMetal)" stroke="#334155" stroke-width="2"/>
    <path d="M8 48 L-30 80 L8 80 Z" fill="#0284C7" fill-opacity="0.7"/>
    <rect x="10" y="85" width="210" height="26" fill="#DC2626"/>
    <text x="115" y="103" fill="#FFFFFF" font-family="'Impact', sans-serif" font-size="13" font-weight="900" text-anchor="middle">HEATING &amp; AIR</text>
    <circle cx="45" cy="150" r="22" fill="#0F172A" stroke="#E11D48" stroke-width="4"/>
    <circle cx="175" cy="150" r="22" fill="#0F172A" stroke="#E11D48" stroke-width="4"/>
  </g>

  <!-- The Black Plumbing Technician & Leadership Team in Foreground (Stylized Row) -->
  <g transform="translate(320, 310)">
    <!-- 14 Stylized Crew Members in Team Uniforms (Navy Blue Shirts with Red Accents) -->
    <!-- Member 1 -->
    <g transform="translate(0, 30)">
      <circle cx="16" cy="12" r="10" fill="#FBCFE8"/>
      <path d="M4 24 L28 24 L26 70 L6 70 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5"/>
      <path d="M14 24 L18 24 L18 45 L14 45 Z" fill="#DC2626"/>
    </g>
    <!-- Member 2 -->
    <g transform="translate(40, 20)">
      <circle cx="16" cy="12" r="10" fill="#FDE047"/>
      <path d="M4 24 L28 24 L26 80 L6 80 Z" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
      <path d="M14 24 L18 24 L18 45 L14 45 Z" fill="#DC2626"/>
    </g>
    <!-- Member 3 -->
    <g transform="translate(80, 25)">
      <circle cx="16" cy="12" r="10" fill="#FED7AA"/>
      <path d="M4 24 L28 24 L26 75 L6 75 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5"/>
    </g>
    <!-- Member 4 -->
    <g transform="translate(120, 15)">
      <circle cx="16" cy="12" r="10" fill="#FBCFE8"/>
      <path d="M4 24 L28 24 L26 85 L6 85 Z" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
      <path d="M14 24 L18 24 L18 45 L14 45 Z" fill="#DC2626"/>
    </g>
    <!-- Member 5 (Team Lead) -->
    <g transform="translate(160, 5)">
      <circle cx="18" cy="12" r="11" fill="#FDE047"/>
      <path d="M4 24 L32 24 L30 95 L6 95 Z" fill="#0F172A" stroke="#DC2626" stroke-width="2"/>
      <rect x="12" y="32" width="12" height="6" fill="#DC2626"/>
      <!-- Hat -->
      <path d="M8 8 Q18 2 28 8 L34 10 L8 10 Z" fill="#DC2626"/>
    </g>
    <!-- Member 6 (Lead Founder) -->
    <g transform="translate(210, 0)">
      <circle cx="18" cy="12" r="11" fill="#FED7AA"/>
      <path d="M4 24 L32 24 L30 100 L6 100 Z" fill="#0F172A" stroke="#DC2626" stroke-width="2"/>
      <rect x="12" y="32" width="12" height="6" fill="#DC2626"/>
      <path d="M8 8 Q18 2 28 8 L34 10 L8 10 Z" fill="#1E3A8A"/>
    </g>
    <!-- Member 7 -->
    <g transform="translate(260, 10)">
      <circle cx="16" cy="12" r="10" fill="#FBCFE8"/>
      <path d="M4 24 L28 24 L26 90 L6 90 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5"/>
      <path d="M14 24 L18 24 L18 45 L14 45 Z" fill="#DC2626"/>
    </g>
    <!-- Member 8 -->
    <g transform="translate(300, 18)">
      <circle cx="16" cy="12" r="10" fill="#FDE047"/>
      <path d="M4 24 L28 24 L26 82 L6 82 Z" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
    </g>
    <!-- Member 9 -->
    <g transform="translate(340, 22)">
      <circle cx="16" cy="12" r="10" fill="#FED7AA"/>
      <path d="M4 24 L28 24 L26 78 L6 78 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5"/>
      <path d="M14 24 L18 24 L18 45 L14 45 Z" fill="#DC2626"/>
    </g>
    <!-- Member 10 -->
    <g transform="translate(380, 26)">
      <circle cx="16" cy="12" r="10" fill="#FBCFE8"/>
      <path d="M4 24 L28 24 L26 74 L6 74 Z" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
    </g>
    <!-- Member 11 -->
    <g transform="translate(420, 30)">
      <circle cx="16" cy="12" r="10" fill="#FDE047"/>
      <path d="M4 24 L28 24 L26 70 L6 70 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5"/>
      <path d="M14 24 L18 24 L18 45 L14 45 Z" fill="#DC2626"/>
    </g>
    <!-- Member 12 -->
    <g transform="translate(460, 32)">
      <circle cx="16" cy="12" r="10" fill="#FED7AA"/>
      <path d="M4 24 L28 24 L26 68 L6 68 Z" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
    </g>
    <!-- Member 13 -->
    <g transform="translate(500, 34)">
      <circle cx="16" cy="12" r="10" fill="#FBCFE8"/>
      <path d="M4 24 L28 24 L26 66 L6 66 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="1.5"/>
    </g>
  </g>

  <!-- Front Hero Overlay Banner -->
  <g transform="translate(350, 480)">
    <rect width="500" height="90" rx="14" fill="#0F172A" fill-opacity="0.95" stroke="#E11D48" stroke-width="2"/>
    <text x="250" y="34" fill="#FFFFFF" font-family="'Impact', 'Arial Black', sans-serif" font-size="20" font-weight="900" text-anchor="middle" letter-spacing="1.5">SERVING WEST &amp; CENTRAL TEXAS SINCE 1994</text>
    <text x="250" y="58" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle">Over 40 Trucks &bull; 6 Regional Offices &bull; Licensed Master Plumbers</text>
    <text x="250" y="78" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Abilene &bull; Big Spring &bull; Brownwood &bull; Cleburne &bull; Lubbock &bull; San Angelo</text>
  </g>
</svg>
`;

fs.writeFileSync(path.join(imgDir, 'fleet-hero.svg'), fleetHeroSvg.trim());

// 2. Water Heater Cutaway & Hard Water Diagram
const waterHeaterDiagramSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <linearGradient id="tankShell" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="50%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0.8"/>
      <stop offset="40%" stop-color="#F59E0B" stop-opacity="0.8"/>
      <stop offset="80%" stop-color="#0EA5E9" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="sedimentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
  </defs>

  <!-- Outer Canvas -->
  <rect width="600" height="700" rx="16" fill="#0F172A" stroke="#334155" stroke-width="2"/>
  <text x="300" y="40" fill="#FFFFFF" font-family="'Impact', 'Arial Black', sans-serif" font-size="20" font-weight="900" text-anchor="middle" letter-spacing="1">WATER HEATER DIAGNOSTIC ANATOMY</text>
  <text x="300" y="62" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Why Abilene Hard Water (14 Grains/Gal) Causes Premature Tank Failure</text>

  <!-- Water Heater Tank Outline -->
  <g transform="translate(140, 90)">
    <!-- Insulated Outer Jacket -->
    <rect x="0" y="20" width="220" height="480" rx="20" fill="url(#tankShell)" stroke="#64748B" stroke-width="2"/>
    <!-- Glass-Lined Inner Tank with Water -->
    <rect x="18" y="40" width="184" height="440" rx="12" fill="url(#waterGrad)" stroke="#38BDF8" stroke-width="1.5"/>

    <!-- Cold Water Dip Tube (Blue, goes to bottom) -->
    <rect x="40" y="0" width="12" height="420" rx="3" fill="#0EA5E9" stroke="#0284C7" stroke-width="1"/>
    <text x="46" y="-8" fill="#38BDF8" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Cold In</text>

    <!-- Hot Water Outlet Tube (Red, draws from top) -->
    <rect x="168" y="0" width="12" height="60" rx="3" fill="#EF4444" stroke="#B91C1C" stroke-width="1"/>
    <text x="174" y="-8" fill="#EF4444" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Hot Out</text>

    <!-- Sacrificial Anode Rod (Magnesium/Aluminum Center) -->
    <rect x="105" y="10" width="10" height="360" rx="2" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1"/>
    <!-- Corrosion Marks on Anode -->
    <circle cx="110" cy="180" r="3" fill="#DC2626"/>
    <circle cx="110" cy="260" r="4" fill="#DC2626"/>

    <!-- Upper Electric Heating Element / Thermostat -->
    <path d="M18 160 L140 160 L140 180 L18 180" stroke="#F59E0B" stroke-width="6" fill="none" stroke-linejoin="round"/>
    <rect x="8" y="152" width="16" height="36" rx="2" fill="#E2E8F0"/>

    <!-- Lower Electric Heating Element / Thermostat -->
    <path d="M18 360 L140 360 L140 380 L18 380" stroke="#F59E0B" stroke-width="6" fill="none" stroke-linejoin="round"/>
    <rect x="8" y="352" width="16" height="36" rx="2" fill="#E2E8F0"/>

    <!-- West Texas Heavy Calcium Carbonate Sediment Layer (Crust) -->
    <path d="M18 430 Q70 415 110 435 Q160 410 202 430 L202 480 L18 480 Z" fill="url(#sedimentGrad)"/>
    <!-- Mineral Crystal flecks -->
    <circle cx="45" cy="455" r="2.5" fill="#FEF08A"/>
    <circle cx="85" cy="465" r="3" fill="#FEF08A"/>
    <circle cx="130" cy="450" r="2" fill="#FEF08A"/>
    <circle cx="175" cy="460" r="3.5" fill="#FEF08A"/>

    <!-- Drain Valve -->
    <rect x="202" y="445" width="25" height="15" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>

    <!-- Temperature & Pressure (T&P) Relief Valve -->
    <rect x="202" y="90" width="22" height="18" fill="#EF4444" stroke="#991B1B" stroke-width="1.5"/>
    <line x1="220" y1="108" x2="220" y2="400" stroke="#EF4444" stroke-width="3"/>
  </g>

  <!-- Explanatory Callouts & Diagnostic Labels -->
  <!-- Callout 1: Anode Rod -->
  <g transform="translate(400, 220)">
    <line x1="-140" y1="20" x2="0" y2="20" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="-140" cy="20" r="4" fill="#38BDF8"/>
    <rect x="0" y="0" width="180" height="50" rx="6" fill="#1E293B" stroke="#475569" stroke-width="1"/>
    <text x="12" y="20" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Sacrificial Anode Rod</text>
    <text x="12" y="38" fill="#94A3B8" font-family="sans-serif" font-size="9.5">Attracts rust to save tank wall</text>
  </g>

  <!-- Callout 2: Heating Elements -->
  <g transform="translate(10, 250)">
    <line x1="130" y1="20" x2="160" y2="20" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="160" cy="20" r="4" fill="#F59E0B"/>
    <rect x="0" y="0" width="140" height="50" rx="6" fill="#1E293B" stroke="#475569" stroke-width="1"/>
    <text x="10" y="20" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Dual Heating Coils</text>
    <text x="10" y="38" fill="#94A3B8" font-family="sans-serif" font-size="9.5">Check for burnout / scale</text>
  </g>

  <!-- Callout 3: Hard Water Sediment Warning -->
  <g transform="translate(390, 500)">
    <line x1="-120" y1="20" x2="0" y2="20" stroke="#DC2626" stroke-width="2"/>
    <circle cx="-120" cy="20" r="5" fill="#DC2626"/>
    <rect x="0" y="0" width="190" height="75" rx="6" fill="#1E293B" stroke="#DC2626" stroke-width="1.5"/>
    <text x="12" y="20" fill="#EF4444" font-family="sans-serif" font-size="11.5" font-weight="900">&bull; HARD WATER SEDIMENT</text>
    <text x="12" y="38" fill="#F8FAFC" font-family="sans-serif" font-size="9.5">240 mg/L mineral buildup</text>
    <text x="12" y="52" fill="#94A3B8" font-family="sans-serif" font-size="9">Causes popping sounds &amp; rust</text>
    <text x="12" y="66" fill="#38BDF8" font-family="sans-serif" font-size="9" font-weight="bold">Solution: Annual Black Flushing</text>
  </g>

  <!-- Bottom CTA Tag -->
  <rect x="50" y="625" width="500" height="50" rx="8" fill="#1E293B" stroke="#0EA5E9" stroke-width="1.5"/>
  <text x="300" y="655" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">
    Need a Diagnostic or Replacement? Call <tspan fill="#E11D48">(325) 231-4695</tspan> — Same-Day Service
  </text>
</svg>
`;

fs.writeFileSync(path.join(imgDir, 'water-heater-diagram.svg'), waterHeaterDiagramSvg.trim());
console.log('Created fleet-hero.svg and water-heater-diagram.svg successfully!');

