/**
 * Black Plumbing - Intelligent Calculators & Diagnostic Engines
 * Full client-side fallback support for static hosting (GitHub Pages) + backend API integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initFinancingCalculator();
  initDiagnosticWidget();
  initHvacSavingsCalculator();
});

// 1. Financing Live Calculator
function initFinancingCalculator() {
  const slider = document.getElementById('financeAmountSlider');
  const sliderDisplay = document.getElementById('sliderDisplayVal');
  const planBtns = document.querySelectorAll('.plan-btn');
  const monthlyDisplay = document.getElementById('calcMonthlyPayment');
  const termDisplay = document.getElementById('calcTermDisplay');
  const rateDisplay = document.getElementById('calcRateDisplay');
  const totalCostDisplay = document.getElementById('calcTotalCost');

  if (!slider) return;

  let currentAmount = parseInt(slider.value) || 4500;
  let currentPlan = 'plan-18-zero';

  function localCalculate(amount, planId) {
    const principal = amount;
    if (planId === 'plan-18-zero') {
      return { monthly: Math.round(principal / 18), term: '18 Months', rate: '0% APR', total: principal };
    } else if (planId === 'plan-60-low') {
      const r = 0.0799 / 12;
      const m = principal * (r * Math.pow(1 + r, 60)) / (Math.pow(1 + r, 60) - 1);
      return { monthly: Math.round(m), term: '60 Months', rate: '7.99% APR', total: Math.round(m * 60) };
    } else {
      const r = 0.0999 / 12;
      const m = principal * (r * Math.pow(1 + r, 84)) / (Math.pow(1 + r, 84) - 1);
      return { monthly: Math.round(m), term: '84 Months', rate: '9.99% APR', total: Math.round(m * 84) };
    }
  }

  async function recalculate() {
    if (sliderDisplay) sliderDisplay.textContent = `$${currentAmount.toLocaleString()}`;

    try {
      const res = await fetch('/api/financing/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: currentAmount, plan: currentPlan })
      });
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (data.success && data.plans) {
        const selected = data.plans.find(p => p.id === currentPlan) || data.plans[0];
        if (monthlyDisplay) monthlyDisplay.textContent = `$${Math.round(selected.monthlyPayment)}`;
        if (termDisplay) termDisplay.textContent = `${selected.termMonths} Months`;
        if (rateDisplay) rateDisplay.textContent = `${selected.apr}% APR`;
        if (totalCostDisplay) totalCostDisplay.textContent = `$${Math.round(selected.totalCost).toLocaleString()}`;
        return;
      }
    } catch (err) {
      // Fallback for static GitHub Pages hosting
      const calc = localCalculate(currentAmount, currentPlan);
      if (monthlyDisplay) monthlyDisplay.textContent = `$${calc.monthly}`;
      if (termDisplay) termDisplay.textContent = calc.term;
      if (rateDisplay) rateDisplay.textContent = calc.rate;
      if (totalCostDisplay) totalCostDisplay.textContent = `$${calc.total.toLocaleString()}`;
    }
  }

  slider.addEventListener('input', (e) => {
    currentAmount = parseInt(e.target.value);
    recalculate();
  });

  planBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      planBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentPlan = btn.getAttribute('data-plan-id');
      recalculate();
    });
  });

  // Initial calculation
  recalculate();
}

// 2. Water Heater Diagnostic Tool Widget
function initDiagnosticWidget() {
  const runBtn = document.getElementById('runDiagnosticBtn');
  const resultPanel = document.getElementById('diagnosticResultPanel');
  const ageSelect = document.getElementById('whAgeSelect');

  if (!runBtn || !resultPanel) return;

  function localDiagnose(age, symptoms) {
    let score = 0;
    const reasons = [];
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
    if (age >= 10) {
      score += 35;
      reasons.push(`System age (${age} years) exceeds average West Texas tank lifespan (8-10 years).`);
    } else if (age >= 6) {
      score += 15;
      reasons.push(`System is in mid-to-late life cycle (${age} years). Requires anode rod replacement.`);
    }

    const isCrit = score >= 60 || symptoms.includes('leaking_base');
    const isElev = score >= 30;
    return {
      diagnosticScore: Math.min(100, score),
      riskLevel: isCrit ? 'CRITICAL' : isElev ? 'ELEVATED' : 'STABLE',
      recommendation: isCrit ? 'Replacement Strongly Recommended (Same-Day Replacement Available)' : isElev ? 'Professional Repair & Hard Water Sediment Flush' : 'Routine Maintenance & Anode Inspection',
      estimatedCostRange: isCrit ? '$1,400 - $2,800 (Depending on Tank vs. Tankless)' : isElev ? '$185 - $480' : '$120 - $220',
      analysisDetails: reasons,
      westTexasWaterFactor: 'Abilene groundwater contains ~240 mg/L mineral hardness, accelerating tank scale 2.4x faster than national averages.'
    };
  }

  runBtn.addEventListener('click', async () => {
    const age = parseInt(ageSelect ? ageSelect.value : 5);
    const checkedBoxes = document.querySelectorAll('.symptom-checkbox:checked');
    const symptoms = Array.from(checkedBoxes).map(cb => cb.value);

    runBtn.disabled = true;
    runBtn.textContent = 'Analyzing Symptoms & Mineral Scaling...';

    let data = null;
    try {
      const res = await fetch('/api/diagnostic/water-heater', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, symptoms })
      });
      if (res.ok) data = await res.json();
    } catch (err) {
      // Fallback
    }

    if (!data || !data.success) {
      data = { success: true, ...localDiagnose(age, symptoms) };
    }

    resultPanel.style.display = 'block';
    document.getElementById('diagScoreVal').textContent = `${data.diagnosticScore} / 100`;
    document.getElementById('diagRiskBadge').textContent = data.riskLevel;
    document.getElementById('diagRiskBadge').style.backgroundColor = 
      data.riskLevel === 'CRITICAL' ? 'var(--color-red)' : data.riskLevel === 'ELEVATED' ? 'var(--color-amber)' : 'var(--color-green)';
    document.getElementById('diagRecommendation').textContent = data.recommendation;
    document.getElementById('diagCostRange').textContent = data.estimatedCostRange;
    document.getElementById('diagWestTexasHardWater').textContent = data.westTexasWaterFactor;

    const analysisList = document.getElementById('diagAnalysisList');
    if (analysisList) {
      analysisList.innerHTML = data.analysisDetails.map(d => `<li style="margin-bottom:0.4rem;">${d}</li>`).join('');
    }

    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    runBtn.disabled = false;
    runBtn.textContent = 'Run Professional Diagnostic';
  });
}

// 3. HVAC SEER2 Energy Savings Calculator
function initHvacSavingsCalculator() {
  const currentSeer = document.getElementById('currentSeerSelect');
  const tonnage = document.getElementById('coolingTonsSelect');
  const annualSavingsDisplay = document.getElementById('annualSavingsVal');
  const tenYearSavingsDisplay = document.getElementById('tenYearSavingsVal');

  if (!currentSeer || !tonnage || !annualSavingsDisplay) return;

  function updateSavings() {
    const seerOld = parseFloat(currentSeer.value) || 10;
    const tons = parseFloat(tonnage.value) || 3.5;
    const seerNew = 18; // Modern inverter standard

    const oldKwh = (tons * 12000 / seerOld) * 2100 / 1000;
    const newKwh = (tons * 12000 / seerNew) * 2100 / 1000;
    const annualSavings = (oldKwh - newKwh) * 0.14;

    annualSavingsDisplay.textContent = `$${Math.round(annualSavings).toLocaleString()} / yr`;
    if (tenYearSavingsDisplay) {
      tenYearSavingsDisplay.textContent = `$${Math.round(annualSavings * 10).toLocaleString()} (10-Year Total)`;
    }
  }

  currentSeer.addEventListener('change', updateSavings);
  tonnage.addEventListener('change', updateSavings);
  updateSavings();
}
