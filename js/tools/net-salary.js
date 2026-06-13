(function () {
  const tool = initToolPage('net-salary');
  if (!tool) return;
  const grossEl = document.getElementById('gross');
  const resultBox = document.getElementById('result');

  function calc() {
    const gross = Utils.numValue(grossEl);
    if (!gross) { resultBox.hidden = true; return; }
    const social = Math.round(gross * (0.0499 + 0.0915 + 0.006));
    const tax = Math.round(gross * 0.1 + gross * 0.1);
    const net = gross - social - tax;

    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    document.getElementById('result-net').textContent = Utils.formatYen(net);
    document.getElementById('result-social').textContent = Utils.formatYen(social);
    document.getElementById('result-tax').textContent = Utils.formatYen(tax);
    Utils.initCopyButtons();
  }
  grossEl.addEventListener('input', calc);
})();
