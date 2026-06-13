(function () {
  const tool = initToolPage('profit-calculator');
  if (!tool) return;

  const costEl = document.getElementById('cost');
  const priceEl = document.getElementById('price');
  const resultBox = document.getElementById('result');
  const resultProfit = document.getElementById('result-profit');
  const resultMargin = document.getElementById('result-margin');
  const resultMarkup = document.getElementById('result-markup');

  function calculate() {
    const cost = Utils.numValue(costEl);
    const price = Utils.numValue(priceEl);

    if (cost == null || price == null) {
      resultBox.hidden = true;
      return;
    }

    const profit = price - cost;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    const markup = cost > 0 ? (profit / cost) * 100 : 0;

    resultBox.hidden = false;
    resultBox.className = profit >= 0 ? 'result-box is-success' : 'result-box is-danger';
    resultProfit.textContent = Utils.formatYen(profit);
    resultMargin.textContent = Utils.formatPercent(margin);
    resultMarkup.textContent = Utils.formatPercent(markup);
    Utils.initCopyButtons();
  }

  costEl.addEventListener('input', calculate);
  priceEl.addEventListener('input', calculate);
})();
