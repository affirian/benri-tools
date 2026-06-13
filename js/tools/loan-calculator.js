(function () {
  const tool = initToolPage('loan-calculator');
  if (!tool) return;
  const principalEl = document.getElementById('principal');
  const rateEl = document.getElementById('rate');
  const yearsEl = document.getElementById('years');
  const resultBox = document.getElementById('result');

  function calc() {
    const p = Utils.numValue(principalEl);
    const annualRate = Utils.numValue(rateEl);
    const years = Utils.numValue(yearsEl);
    if (!p || annualRate == null || !years) { resultBox.hidden = true; return; }
    const r = annualRate / 100 / 12;
    const n = years * 12;
    const monthly = r === 0 ? p / n : (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    const total = Math.round(monthly) * n;
    const interest = total - p;

    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    document.getElementById('result-monthly').textContent = Utils.formatYen(Math.round(monthly));
    document.getElementById('result-total').textContent = Utils.formatYen(total);
    document.getElementById('result-interest').textContent = Utils.formatYen(interest);
    Utils.initCopyButtons();
  }
  [principalEl, rateEl, yearsEl].forEach((el) => el.addEventListener('input', calc));
})();
