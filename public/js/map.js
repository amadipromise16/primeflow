/**
 * Black Plumbing - Interactive Texas Service Area Map & Locator
 */

document.addEventListener('DOMContentLoaded', () => {
  initTexasMapInteraction();
});

const CITY_DETAILS = {
  'abilene': {
    name: 'Abilene (Corporate Headquarters)',
    phone: '(325) 231-4695',
    address: '4402 S Danville Dr, Abilene, TX 79605',
    trucksOnDuty: 14,
    eta: '25 - 35 minutes',
    coverage: 'Taylor, Jones, Callahan, Nolan counties'
  },
  'lubbock': {
    name: 'Lubbock Regional Branch',
    phone: '(806) 787-2200',
    address: '8215 Avenue D, Lubbock, TX 79423',
    trucksOnDuty: 8,
    eta: '20 - 30 minutes',
    coverage: 'Lubbock, Lynn, Crosby, Hockley counties'
  },
  'san-angelo': {
    name: 'San Angelo Branch Office',
    phone: '(325) 659-3747',
    address: '501 N Main St, San Angelo, TX 76903',
    trucksOnDuty: 6,
    eta: '25 - 35 minutes',
    coverage: 'Tom Green, Concho, Irion, Runnels counties'
  },
  'big-spring': {
    name: 'Big Spring Branch Office',
    phone: '(432) 935-1117',
    address: '1105 E 3rd St, Big Spring, TX 79720',
    trucksOnDuty: 5,
    eta: '30 - 40 minutes',
    coverage: 'Howard, Martin, Mitchell counties'
  },
  'brownwood': {
    name: 'Brownwood Branch Office',
    phone: '(325) 643-5215',
    address: '703 Austin Ave, Brownwood, TX 76801',
    trucksOnDuty: 6,
    eta: '25 - 35 minutes',
    coverage: 'Brown, Coleman, Comanche, Mills counties'
  },
  'cleburne': {
    name: 'Cleburne Branch Office',
    phone: '(682) 244-2866',
    address: '1408 N. Main St, Cleburne, TX 76033',
    trucksOnDuty: 7,
    eta: '30 - 40 minutes',
    coverage: 'Johnson, Hill, Somervell, Hood counties'
  },
  'kerrville': {
    name: 'Kerrville Regional Office',
    phone: '(830) 240-1708',
    address: '2610 Memorial Blvd, Kerrville, TX 78028',
    trucksOnDuty: 4,
    eta: '35 - 45 minutes',
    coverage: 'Kerr, Gillespie, Kendall counties'
  },
  'midland': {
    name: 'Midland Service Hub',
    phone: '(432) 935-1117',
    address: 'Dispatched from Big Spring / Midland Center',
    trucksOnDuty: 4,
    eta: '35 - 45 minutes',
    coverage: 'Midland & Permian Basin East'
  },
  'sweetwater': {
    name: 'Sweetwater Service Hub',
    phone: '(325) 231-4695',
    address: 'Dispatched from Abilene Corridor',
    trucksOnDuty: 3,
    eta: '30 - 40 minutes',
    coverage: 'Nolan, Fisher counties'
  },
  'snyder': {
    name: 'Snyder Service Hub',
    phone: '(325) 231-4695',
    address: 'Dispatched from Regional Hub',
    trucksOnDuty: 3,
    eta: '35 - 45 minutes',
    coverage: 'Scurry, Borden counties'
  },
  'haskell': {
    name: 'Haskell Service Hub',
    phone: '(325) 231-4695',
    address: 'Dispatched from North Hub',
    trucksOnDuty: 3,
    eta: '35 - 45 minutes',
    coverage: 'Haskell, Throckmorton counties'
  },
  'stamford': {
    name: 'Stamford Service Hub',
    phone: '(325) 231-4695',
    address: 'Dispatched from Abilene North',
    trucksOnDuty: 3,
    eta: '30 - 40 minutes',
    coverage: 'Jones, Haskell border'
  },
  'brady': {
    name: 'Brady Service Hub',
    phone: '(325) 643-5215',
    address: 'Dispatched from Brownwood / Heart of Texas',
    trucksOnDuty: 3,
    eta: '35 - 45 minutes',
    coverage: 'McCulloch, San Saba, Mason counties'
  }
};

function initTexasMapInteraction() {
  const cityPills = document.querySelectorAll('.location-pill-item');
  const detailBox = document.getElementById('activeCityDetailCard');

  if (!detailBox) return;

  function selectCity(cityKey) {
    const info = CITY_DETAILS[cityKey] || CITY_DETAILS['abilene'];

    cityPills.forEach(p => {
      if (p.getAttribute('data-city-id') === cityKey) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    detailBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
        <h4 style="color:#FFFFFF; font-size:1.25rem;">${info.name}</h4>
        <span style="background:rgba(16, 185, 129, 0.2); color:#10B981; border:1px solid #10B981; padding:0.25rem 0.75rem; border-radius:999px; font-size:0.8rem; font-weight:bold;">
          ● ${info.trucksOnDuty} Trucks On Duty
        </span>
      </div>
      <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:0.5rem;"><strong>Address / Base:</strong> ${info.address}</p>
      <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:0.5rem;"><strong>Estimated Emergency ETA:</strong> <span style="color:var(--color-blue); font-weight:bold;">${info.eta}</span></p>
      <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.25rem;"><strong>Coverage:</strong> ${info.coverage}</p>
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <a href="tel:${info.phone.replace(/[^0-9]/g, '')}" class="btn-office-call" style="background:var(--color-red);">
          <svg style="width:16px; height:16px; fill:currentColor;" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/></svg>
          Call Local Direct: ${info.phone}
        </a>
        <a href="/schedule?city=${encodeURIComponent(cityKey)}" class="btn-secondary-large" style="padding:0.6rem 1.4rem; font-size:0.95rem;">
          Schedule Service
        </a>
      </div>
    `;
  }

  cityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cityKey = pill.getAttribute('data-city-id');
      selectCity(cityKey);
    });
  });

  // Default to Abilene
  selectCity('abilene');
}

