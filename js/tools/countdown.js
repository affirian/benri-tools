(function () {
  const tool = initToolPage('countdown');
  if (!tool) return;
  const dateEl = document.getElementById('target-date');
  const timeEl = document.getElementById('target-time');
  const resultBox = document.getElementById('result');
  const resultEl = document.getElementById('result-countdown');
  let timer;

  function tick() {
    if (!dateEl.value) { resultBox.hidden = true; return; }
    const target = new Date(`${dateEl.value}T${timeEl.value || '00:00'}`);
    const diff = target - Date.now();
    resultBox.hidden = false;
    if (diff <= 0) {
      resultBox.className = 'result-box is-warning';
      resultEl.textContent = '指定日時を経過しました';
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    resultBox.className = 'result-box is-success';
    resultEl.textContent = `${days}日 ${hours}時間 ${mins}分 ${secs}秒`;
    Utils.initCopyButtons();
  }

  function start() {
    clearInterval(timer);
    tick();
    timer = setInterval(tick, 1000);
  }
  dateEl.addEventListener('change', start);
  timeEl.addEventListener('change', start);
})();
