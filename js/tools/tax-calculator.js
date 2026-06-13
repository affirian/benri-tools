(function () {
  const tool = initToolPage('tax-calculator');
  if (!tool) return;

  const amountExclEl = document.getElementById('amount-excl');
  const amountInclEl = document.getElementById('amount-incl');
  const resultBox = document.getElementById('result');
  const resultExcl = document.getElementById('result-excl');
  const resultTax = document.getElementById('result-tax');
  const resultIncl = document.getElementById('result-incl');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const rateBtns = document.querySelectorAll('#tax-rate-options .option-btn');

  let activeTab = 'excl-to-incl';

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('is-active'));
      document.getElementById(`tab-${activeTab}`).classList.add('is-active');
      calculate();
    });
  });

  rateBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      rateBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      btn.querySelector('input').checked = true;
      calculate();
    });
  });

  function getRate() {
    return Number(document.querySelector('input[name="tax-rate"]:checked').value) / 100;
  }

  function calculate() {
    const rate = getRate();

    if (activeTab === 'excl-to-incl') {
      const excl = Utils.numValue(amountExclEl);
      if (excl == null) {
        resultBox.hidden = true;
        return;
      }
      const tax = Math.floor(excl * rate);
      const incl = excl + tax;
      showResult(excl, tax, incl);
    } else {
      const incl = Utils.numValue(amountInclEl);
      if (incl == null) {
        resultBox.hidden = true;
        return;
      }
      const excl = Math.floor(incl / (1 + rate));
      const tax = incl - excl;
      showResult(excl, tax, incl);
    }
  }

  function showResult(excl, tax, incl) {
    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultExcl.textContent = Utils.formatYen(excl);
    resultTax.textContent = Utils.formatYen(tax);
    resultIncl.textContent = Utils.formatYen(incl);
    Utils.initCopyButtons();
  }

  amountExclEl.addEventListener('input', calculate);
  amountInclEl.addEventListener('input', calculate);
})();
