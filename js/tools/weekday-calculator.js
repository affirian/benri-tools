(function () {
  const tool = initToolPage('weekday-calculator');
  if (!tool) return;
  const dateEl = document.getElementById('date');
  const resultBox = document.getElementById('result');
  const resultEl = document.getElementById('result-weekday');
  const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];

  function calc() {
    if (!dateEl.value) { resultBox.hidden = true; return; }
    const d = new Date(dateEl.value);
    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultEl.textContent = days[d.getDay()];
    Utils.initCopyButtons();
  }
  dateEl.value = Utils.today();
  dateEl.addEventListener('change', calc);
  calc();
})();
