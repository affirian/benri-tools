(function () {
  const tool = initToolPage('work-hours');
  if (!tool) return;

  const startEl = document.getElementById('start-time');
  const endEl = document.getElementById('end-time');
  const breakEl = document.getElementById('break-minutes');
  const resultBox = document.getElementById('result');
  const resultHours = document.getElementById('result-hours');
  const resultDetail = document.getElementById('result-detail');

  function calculate() {
    if (!startEl.value || !endEl.value) {
      resultBox.hidden = true;
      return;
    }

    let startMin = Utils.timeToMinutes(startEl.value);
    let endMin = Utils.timeToMinutes(endEl.value);
    const breakMin = Utils.numValue(breakEl) || 0;

    if (endMin <= startMin) {
      endMin += 24 * 60;
    }

    const totalMin = endMin - startMin - breakMin;

    if (totalMin < 0) {
      resultBox.hidden = false;
      resultBox.className = 'result-box is-danger';
      resultHours.textContent = '—';
      resultDetail.textContent = '休憩時間が長すぎます。';
      Utils.initCopyButtons();
      return;
    }

    const hours = Math.floor(totalMin / 60);
    const minutes = totalMin % 60;

    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultHours.textContent = `${hours}時間${minutes}分`;
    resultDetail.textContent = `合計 ${totalMin}分（${(totalMin / 60).toFixed(2)}時間）`;
    Utils.initCopyButtons();
  }

  startEl.addEventListener('change', calculate);
  endEl.addEventListener('change', calculate);
  breakEl.addEventListener('input', calculate);
  calculate();
})();
