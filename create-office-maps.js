const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'assets', 'images', 'offices');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const offices = [
  { id: 'abilene', name: 'Abilene HQ', street: '4402 S Danville Dr', cross: 'S 14th St & Danville' },
  { id: 'big-spring', name: 'Big Spring', street: '1105 E 3rd St', cross: 'E 3rd & Gregg St' },
  { id: 'brownwood', name: 'Brownwood', street: '703 Austin Ave', cross: 'Austin Ave & Main' },
  { id: 'cleburne', name: 'Cleburne', street: '1408 N. Main St', cross: 'N Main & Henderson' },
  { id: 'kerrville', name: 'Kerrville', street: '2610 Memorial Blvd', cross: 'Memorial & Sidney Baker' },
  { id: 'lubbock', name: 'Lubbock', street: '8215 Avenue D', cross: 'Avenue D & 82nd St' },
  { id: 'san-angelo', name: 'San Angelo', street: '501 N Main St', cross: 'N Main & 6th St' }
];

for (const off of offices) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <clipPath id="circleClip_${off.id}">
      <circle cx="100" cy="100" r="92"/>
    </clipPath>
    <radialGradient id="mapGlow_${off.id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </radialGradient>
  </defs>

  <!-- Outer Ring with Red Trim -->
  <circle cx="100" cy="100" r="98" fill="#1E293B" stroke="#E11D48" stroke-width="3"/>
  <circle cx="100" cy="100" r="93" fill="url(#mapGlow_${off.id})"/>

  <!-- Map Content clipped to circle -->
  <g clip-path="url(#circleClip_${off.id})">
    <!-- Park green zones -->
    <rect x="20" y="20" width="50" height="40" rx="6" fill="#DCFCE7"/>
    <rect x="130" y="120" width="60" height="50" rx="6" fill="#DCFCE7"/>

    <!-- Water canal / river -->
    <path d="M0 160 Q60 140 100 170 T200 150" stroke="#BAE6FD" stroke-width="12" fill="none"/>

    <!-- Street Grids -->
    <!-- Major Avenue -->
    <line x1="100" y1="0" x2="100" y2="200" stroke="#FFFFFF" stroke-width="14"/>
    <line x1="100" y1="0" x2="100" y2="200" stroke="#F59E0B" stroke-width="8"/>

    <!-- Cross Street -->
    <line x1="0" y1="100" x2="200" y2="100" stroke="#FFFFFF" stroke-width="14"/>
    <line x1="0" y1="100" x2="200" y2="100" stroke="#CBD5E1" stroke-width="8"/>

    <!-- Secondary grid streets -->
    <line x1="45" y1="0" x2="45" y2="200" stroke="#FFFFFF" stroke-width="6"/>
    <line x1="155" y1="0" x2="155" y2="200" stroke="#FFFFFF" stroke-width="6"/>
    <line x1="0" y1="50" x2="200" y2="50" stroke="#FFFFFF" stroke-width="6"/>
    <line x1="0" y1="150" x2="200" y2="150" stroke="#FFFFFF" stroke-width="6"/>

    <!-- Street Labels -->
    <text x="104" y="35" fill="#475569" font-family="sans-serif" font-size="8" font-weight="bold" transform="rotate(90, 104, 35)">MAIN ST</text>
    <text x="110" y="94" fill="#475569" font-family="sans-serif" font-size="7" font-weight="bold">AVE D</text>

    <!-- Location Marker Pin at Center (100, 100) -->
    <g transform="translate(100, 100)">
      <ellipse cx="0" cy="8" rx="8" ry="4" fill="#0F172A" fill-opacity="0.3"/>
      <!-- Pin shape -->
      <path d="M0 6 C-1 -2 -14 -12 -14 -22 C-14 -32 -6 -38 0 -38 C6 -38 14 -32 14 -22 C14 -12 1 -2 0 6 Z" fill="#DC2626" stroke="#991B1B" stroke-width="1.5"/>
      <circle cx="0" cy="-22" r="5.5" fill="#FFFFFF"/>
      <circle cx="0" cy="-22" r="2.5" fill="#DC2626"/>
    </g>

    <!-- Subtle Location Name Banner at Top of Map -->
    <rect x="25" y="160" width="150" height="24" rx="4" fill="#0F172A" fill-opacity="0.9" stroke="#E11D48" stroke-width="1"/>
    <text x="100" y="176" fill="#FFFFFF" font-family="'Impact', sans-serif" font-size="10.5" font-weight="900" text-anchor="middle" letter-spacing="1">${off.name.toUpperCase()}</text>
  </g>
</svg>
`;
  fs.writeFileSync(path.join(imgDir, `${off.id}.svg`), svg.trim());
}

console.log('Created 7 office map SVGs successfully!');

