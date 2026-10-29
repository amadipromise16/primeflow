const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'assets', 'icons');
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

const icons = {
  'plumbing-repair.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#E11D48" stroke-width="2"/>
  <!-- Service Van -->
  <path d="M22 60 L22 42 C22 40 24 38 26 38 L54 38 L68 47 L78 47 C80 47 82 49 82 51 L82 60 C82 62 80 64 78 64 L75 64 C75 69 70 73 65 73 C60 73 55 69 55 64 L41 64 C41 69 36 73 31 73 C26 73 21 69 21 64 L22 64 Z" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
  <path d="M54 42 L66 49 L54 49 Z" fill="#0EA5E9" fill-opacity="0.6"/>
  <!-- Wheels -->
  <circle cx="31" cy="65" r="7" fill="#0F172A" stroke="#E11D48" stroke-width="2.5"/>
  <circle cx="65" cy="65" r="7" fill="#0F172A" stroke="#E11D48" stroke-width="2.5"/>
  <!-- Chrome Wrench Overlay -->
  <path d="M46 22 L55 31 L44 42 L35 33 Z" fill="#E11D48"/>
  <circle cx="58" cy="20" r="8" fill="none" stroke="#E11D48" stroke-width="3"/>
  <rect x="54" y="14" width="8" height="5" fill="#1E293B"/>
</svg>`,

  'leaks.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#0EA5E9" stroke-width="2"/>
  <!-- Horizontal Pipe -->
  <rect x="18" y="38" width="64" height="16" rx="2" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
  <!-- Pipe Collar / Flange -->
  <rect x="42" y="34" width="16" height="24" rx="3" fill="#475569" stroke="#E2E8F0" stroke-width="2"/>
  <!-- Dripping Joint -->
  <path d="M50 56 C50 56 42 68 42 74 C42 78.5 45.5 82 50 82 C54.5 82 58 78.5 58 74 C58 68 50 56 50 56 Z" fill="#38BDF8"/>
  <circle cx="47" cy="73" r="2.5" fill="#FFFFFF" fill-opacity="0.8"/>
  <!-- Mini Splash Rings -->
  <path d="M38 85 C42 87 58 87 62 85" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`,

  'water-heaters.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#E11D48" stroke-width="2"/>
  <!-- Water Heater Tank Body -->
  <rect x="32" y="24" width="36" height="50" rx="8" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
  <!-- Top Pipes (Cold In & Hot Out) -->
  <line x1="40" y1="14" x2="40" y2="24" stroke="#0EA5E9" stroke-width="4" stroke-linecap="round"/>
  <line x1="60" y1="14" x2="60" y2="24" stroke="#E11D48" stroke-width="4" stroke-linecap="round"/>
  <rect x="36" y="22" width="8" height="4" fill="#0EA5E9"/>
  <rect x="56" y="22" width="8" height="4" fill="#E11D48"/>
  <!-- Diagnostic Window / Heating Flame -->
  <circle cx="50" cy="54" r="14" fill="#0F172A" stroke="#E11D48" stroke-width="1.5"/>
  <path d="M50 44 C53 48 57 51 57 56 C57 60 54 63 50 63 C46 63 43 60 43 56 C43 52 47 48 50 44 Z" fill="#F59E0B"/>
  <path d="M50 50 C51.5 53 53 54.5 53 57 C53 59 51.5 60.5 50 60.5 C48.5 60.5 47 59 47 57 C47 54.5 48.5 53 50 50 Z" fill="#EF4444"/>
  <!-- Base Stand -->
  <line x1="28" y1="74" x2="72" y2="74" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
</svg>`,

  'bathrooms.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#0EA5E9" stroke-width="2"/>
  <!-- Toilet Tank -->
  <rect x="25" y="24" width="22" height="30" rx="3" fill="#F8FAFC" stroke="#334155" stroke-width="2"/>
  <rect x="23" y="22" width="26" height="5" rx="2" fill="#E2E8F0"/>
  <circle cx="28" cy="30" r="2" fill="#94A3B8"/>
  <!-- Toilet Bowl -->
  <path d="M47 44 L68 44 C76 44 78 54 70 60 C64 65 58 66 54 66 L47 66 Z" fill="#F8FAFC" stroke="#334155" stroke-width="2"/>
  <ellipse cx="60" cy="44" rx="12" ry="4" fill="#E2E8F0"/>
  <!-- Base Foot -->
  <path d="M47 66 L42 78 L62 78 L56 66 Z" fill="#F8FAFC" stroke="#334155" stroke-width="2"/>
  <line x1="36" y1="78" x2="68" y2="78" stroke="#0EA5E9" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,

  'ac-repair.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#0EA5E9" stroke-width="2"/>
  <!-- Outdoor AC Compressor Unit Body -->
  <rect x="24" y="25" width="52" height="52" rx="6" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
  <!-- Grille Louvers -->
  <line x1="28" y1="33" x2="72" y2="33" stroke="#1E293B" stroke-width="2"/>
  <line x1="28" y1="69" x2="72" y2="69" stroke="#1E293B" stroke-width="2"/>
  <!-- Central Circular Fan Guard -->
  <circle cx="50" cy="51" r="18" fill="#0F172A" stroke="#0EA5E9" stroke-width="2"/>
  <!-- Fan Blades with Spinning Motif -->
  <circle cx="50" cy="51" r="4" fill="#E2E8F0"/>
  <path d="M50 47 C50 37 57 37 57 43 C57 47 52 48 50 51 Z" fill="#38BDF8"/>
  <path d="M50 55 C50 65 43 65 43 59 C43 55 48 54 50 51 Z" fill="#38BDF8"/>
  <path d="M46 51 C36 51 36 44 42 44 C46 44 47 49 50 51 Z" fill="#38BDF8"/>
  <path d="M54 51 C64 51 64 58 58 58 C54 58 53 53 50 51 Z" fill="#38BDF8"/>
  <!-- Snowflake Accent -->
  <circle cx="72" cy="30" r="3" fill="#38BDF8"/>
</svg>`,

  'ductless-mini-splits.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#0EA5E9" stroke-width="2"/>
  <!-- Wall Mount Indoor Sleek Unit -->
  <rect x="18" y="32" width="64" height="26" rx="4" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  <!-- Status Display Panel -->
  <rect x="62" y="36" width="14" height="7" rx="2" fill="#0F172A"/>
  <text x="64" y="42" fill="#10B981" font-family="monospace" font-size="5" font-weight="bold">72°</text>
  <!-- Lower Air Louver / Blade -->
  <rect x="22" y="52" width="56" height="4" rx="1.5" fill="#94A3B8"/>
  <!-- Cooling Airflow Curves -->
  <path d="M30 62 C34 70 30 75 35 80" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M50 62 C54 72 48 76 54 82" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M70 62 C74 70 70 75 75 80" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`,

  'furnace.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#E11D48" stroke-width="2"/>
  <!-- Furnace Cabinet -->
  <rect x="28" y="20" width="44" height="60" rx="4" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
  <line x1="28" y1="50" x2="72" y2="50" stroke="#1E293B" stroke-width="2"/>
  <!-- Upper Louver Vents -->
  <line x1="36" y1="28" x2="64" y2="28" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round"/>
  <line x1="36" y1="34" x2="64" y2="34" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round"/>
  <line x1="36" y1="40" x2="64" y2="40" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round"/>
  <!-- Burner Viewport -->
  <rect x="40" y="58" width="20" height="14" rx="3" fill="#0F172A" stroke="#E11D48" stroke-width="1.5"/>
  <!-- Heat Flame -->
  <path d="M50 60 C53 64 56 66 56 69 C56 72 53 74 50 74 C47 74 44 72 44 69 C44 66 47 64 50 60 Z" fill="#F59E0B"/>
</svg>`,

  'indoor-air.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
  <!-- Air Filter / Purifier Housing -->
  <rect x="26" y="26" width="48" height="48" rx="6" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
  <!-- Accordion HEPA Pleats -->
  <path d="M32 32 L36 68 L40 32 L44 68 L48 32 L52 68 L56 32 L60 68 L64 32 L68 68" stroke="#10B981" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
  <!-- Clean Nature Leaves / Air Purity Symbols -->
  <path d="M68 22 C64 22 62 26 62 30 C66 30 70 28 70 24 Z" fill="#10B981"/>
  <circle cx="28" cy="22" r="3" fill="#38BDF8"/>
  <circle cx="76" cy="68" r="2.5" fill="#38BDF8"/>
</svg>`,

  'commercial-ac.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#E11D48" stroke-width="2"/>
  <!-- Rooftop Commercial HVAC Packaged Unit -->
  <rect x="20" y="32" width="60" height="38" rx="4" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
  <!-- Dual Rooftop Exhaust Fans -->
  <circle cx="36" cy="48" r="10" fill="#0F172A" stroke="#0EA5E9" stroke-width="1.5"/>
  <circle cx="36" cy="48" r="3" fill="#E2E8F0"/>
  <line x1="36" y1="40" x2="36" y2="56" stroke="#38BDF8" stroke-width="2"/>
  <line x1="28" y1="48" x2="44" y2="48" stroke="#38BDF8" stroke-width="2"/>

  <circle cx="62" cy="48" r="10" fill="#0F172A" stroke="#0EA5E9" stroke-width="1.5"/>
  <circle cx="62" cy="48" r="3" fill="#E2E8F0"/>
  <line x1="62" y1="40" x2="62" y2="56" stroke="#38BDF8" stroke-width="2"/>
  <line x1="54" y1="48" x2="70" y2="48" stroke="#38BDF8" stroke-width="2"/>
  <!-- Commercial Steel Base I-Beams -->
  <rect x="16" y="70" width="68" height="4" rx="1" fill="#94A3B8"/>
</svg>`,

  'phcc.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect x="5" y="5" width="110" height="110" rx="16" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
  <!-- Texas Map Silhouette -->
  <path d="M40 28 L68 28 L68 44 L88 44 L82 68 L68 88 L52 88 L46 64 L34 50 L40 38 Z" fill="#1E3A8A" fill-opacity="0.8" stroke="#38BDF8" stroke-width="1"/>
  <!-- PHCC letters -->
  <text x="60" y="58" fill="#FFFFFF" font-family="'Arial Black', Impact, sans-serif" font-size="20" font-weight="900" text-anchor="middle" letter-spacing="1">PHCC</text>
  <text x="60" y="72" fill="#E2E8F0" font-family="sans-serif" font-size="6.5" font-weight="700" text-anchor="middle">TEXAS CHAPTER</text>
  <text x="60" y="98" fill="#94A3B8" font-family="sans-serif" font-size="5.5" font-weight="600" text-anchor="middle">BEST PEOPLE &bull; BEST PRACTICES</text>
</svg>`,

  'bbb.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect x="5" y="5" width="110" height="110" rx="16" fill="#0F172A" stroke="#0284C7" stroke-width="2"/>
  <!-- Torch / Flame Motif -->
  <path d="M60 22 C64 28 68 34 68 40 C68 46 64 50 60 50 C56 50 52 46 52 40 C52 34 56 28 60 22 Z" fill="#0284C7"/>
  <!-- BBB Letters -->
  <text x="60" y="74" fill="#FFFFFF" font-family="'Arial Black', Impact, sans-serif" font-size="24" font-weight="900" text-anchor="middle" letter-spacing="2">BBB</text>
  <!-- A+ Badge -->
  <rect x="30" y="82" width="60" height="18" rx="9" fill="#0284C7"/>
  <text x="60" y="95" fill="#FFFFFF" font-family="'Arial Black', Impact, sans-serif" font-size="12" font-weight="900" text-anchor="middle">A+ RATING</text>
</svg>`,

  'emergency-247.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect x="5" y="5" width="110" height="110" rx="16" fill="#0F172A" stroke="#DC2626" stroke-width="2"/>
  <!-- Clock / Siren Outline -->
  <circle cx="60" cy="50" r="26" fill="#1E293B" stroke="#DC2626" stroke-width="2.5"/>
  <polyline points="60,34 60,50 72,50" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
  <!-- 24/7 Text -->
  <rect x="25" y="80" width="70" height="24" rx="12" fill="#DC2626"/>
  <text x="60" y="97" fill="#FFFFFF" font-family="'Arial Black', Impact, sans-serif" font-size="14" font-weight="900" text-anchor="middle">OPEN 24/7</text>
</svg>`,

  'satisfaction-guarantee.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect x="5" y="5" width="110" height="110" rx="16" fill="#0F172A" stroke="#10B981" stroke-width="2"/>
  <!-- Shield with Checkmark -->
  <path d="M60 22 L86 32 L86 58 C86 74 60 88 60 88 C60 88 34 74 34 58 L34 32 Z" fill="#1E293B" stroke="#10B981" stroke-width="2.5"/>
  <polyline points="48,54 56,62 74,44" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="60" y="102" fill="#E2E8F0" font-family="sans-serif" font-size="7" font-weight="800" text-anchor="middle" letter-spacing="1">100% SATISFACTION</text>
</svg>`,

  'top-notch.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
  <rect x="5" y="5" width="110" height="110" rx="16" fill="#0F172A" stroke="#F59E0B" stroke-width="2"/>
  <!-- 5 Gold Stars -->
  <g transform="translate(60, 42)">
    <polygon points="0,-16 4,-4 16,-4 7,4 10,16 0,8 -10,16 -7,4 -16,-4 -4,-4" fill="#F59E0B"/>
    <polygon points="-24,-8 -21,0 -12,0 -19,6 -17,15 -24,9 -31,15 -29,6 -36,0 -27,0" fill="#F59E0B" transform="scale(0.7)"/>
    <polygon points="24,-8 27,0 36,0 29,6 31,15 24,9 17,15 19,6 12,0 21,0" fill="#F59E0B" transform="scale(0.7)"/>
  </g>
  <text x="60" y="78" fill="#FFFFFF" font-family="'Arial Black', Impact, sans-serif" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="1">TOP-NOTCH</text>
  <text x="60" y="94" fill="#F59E0B" font-family="sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">5-STAR SERVICE</text>
</svg>`
};

for (const [filename, content] of Object.entries(icons)) {
  fs.writeFileSync(path.join(iconsDir, filename), content.trim());
  console.log('Created icon:', filename);
}

