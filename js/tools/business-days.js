(function () {
  const tool = initToolPage('business-days');
  if (!tool) return;
  const startEl = document.getElementById('start-date');
  const endEl = document.getElementById('end-date');
  const resultBox = document.getElementById('result');

  function countBusinessDays(start, end) {
    let count = 0;
    const cur = new Date(start);
    const last = new Date(end);
    while (cur <= last) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  }

  function calc() {
    if (!startEl.value || !endEl.value) { resultBox.hidden = true; return; }
    const start = new Date(startEl.value);
    const end = new Date(endEl.value);
    if (end < start) {
      resultBox.hidden = false;
      resultBox.className = 'result-box is-danger';
      document.getElementById('result-days').textContent = '—';
      document.getElementById('result-total').textContent = '終了日は開始日以降を指定してください';
      return;
    }
    const biz = countBusinessDays(start, end);
    const total = Utils.daysBetween(start, end);
    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    document.getElementById('result-days').textContent = `${Utils.formatNumber(biz)}日`;
    document.getElementById('result-total').textContent = `全${total}日（土日${total - biz}日を除く）`;
    Utils.initCopyButtons();
  }
  startEl.value = Utils.today();
  endEl.value = Utils.today();
  startEl.addEventListener('change', calc);
  endEl.addEventListener('change', calc);
  calc();
})();
