(function () {
  const tool = initToolPage('url-encode');
  if (!tool) return;
  const textEl = document.getElementById('text');
  const resultBox = document.getElementById('result');
  const resultText = document.getElementById('result-text');
  let mode = 'encode';

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      convert();
    });
  });

  function convert() {
    const text = textEl.value;
    if (!text) { resultBox.hidden = true; return; }
    try {
      const result = mode === 'encode' ? encodeURIComponent(text) : decodeURIComponent(text);
      resultBox.hidden = false;
      resultBox.className = 'result-box is-success';
      resultText.textContent = result;
      Utils.initCopyButtons();
    } catch {
      resultBox.hidden = false;
      resultBox.className = 'result-box is-danger';
      resultText.textContent = '変換に失敗しました。入力内容を確認してください。';
    }
  }
  textEl.addEventListener('input', convert);
})();
