(function () {
  const tool = initToolPage('interest-calculator');
  if (!tool) return;

  const principalEl = document.getElementById('principal');
  const rateEl = document.getElementById('rate');
  const yearsEl = document.getElementById('years');
  const resultBox = document.getElementById('result');
  const resultInterest = document.getElementById('result-interest');
  const resultTotal = document.getElementById('result-total');
  const resultFormula = document.getElementById('result-formula');

  function calculate() {
    const principal = Utils.numValue(principalEl);
    const rate = Utils.numValue(rateEl);
    const years = Utils.numValue(yearsEl);

    if (principal == null || rate == null || years == null) {
      resultBox.hidden = true;
      return;
    }

    const interest = Math.floor(principal * (rate / 100) * years);
    const total = principal + interest;

    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultInterest.textContent = Utils.formatYen(interest);
    resultTotal.textContent = Utils.formatYen(total);
    resultFormula.textContent = `${Utils.formatNumber(principal)}円 × ${rate}% × ${years}年`;
    Utils.initCopyButtons();
  }

  principalEl.addEventListener('input', calculate);
  rateEl.addEventListener('input', calculate);
  yearsEl.addEventListener('input', calculate);
})();
