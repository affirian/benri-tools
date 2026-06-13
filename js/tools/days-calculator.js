(function () {
  const tool = initToolPage('days-calculator');
  if (!tool) return;

  const startEl = document.getElementById('start-date');
  const endEl = document.getElementById('end-date');
  const resultBox = document.getElementById('result');
  const resultDays = document.getElementById('result-days');
  const resultYmd = document.getElementById('result-ymd');

  startEl.value = Utils.today();
  endEl.value = Utils.today();

  function calculate() {
    if (!startEl.value || !endEl.value) {
      resultBox.hidden = true;
      return;
    }

    const start = new Date(startEl.value);
    const end = new Date(endEl.value);

    if (end < start) {
      resultBox.hidden = false;
      resultBox.className = 'result-box is-danger';
      resultDays.textContent = '—';
      resultYmd.textContent = '終了日は開始日以降を指定してください。';
      Utils.initCopyButtons();
      return;
    }

    const days = Utils.daysBetween(start, end);
    const ymd = Utils.diffYMD(start, end);

    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultDays.textContent = `${Utils.formatNumber(days)}日`;
    resultYmd.textContent = `（${ymd.years}年${ymd.months}ヶ月${ymd.days}日）`;
    Utils.initCopyButtons();
  }

  startEl.addEventListener('change', calculate);
  endEl.addEventListener('change', calculate);
  calculate();
})();
