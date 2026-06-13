(function () {
  const tool = initToolPage('x-char-count');
  if (!tool) return;

  const LIMIT = 140;
  const textEl = document.getElementById('tweet-text');
  const counterEl = document.getElementById('char-counter');
  const charCountEl = document.getElementById('char-count');
  const statChars = document.getElementById('stat-chars');
  const statLines = document.getElementById('stat-lines');
  const warningBox = document.getElementById('warning');
  const warningDetail = document.getElementById('warning-detail');

  function countChars(text) {
    return [...text].length;
  }

  function countLines(text) {
    if (text.length === 0) return 0;
    return (text.match(/\n/g) || []).length;
  }

  function update() {
    const text = textEl.value;
    const chars = countChars(text);
    const lines = countLines(text);
    const over = chars > LIMIT;

    charCountEl.textContent = `${chars} / ${LIMIT}文字`;
    statChars.textContent = chars;
    statLines.textContent = lines;

    counterEl.classList.toggle('is-over', over);
    warningBox.hidden = !over;

    if (over) {
      warningDetail.textContent = `${chars - LIMIT}文字オーバーしています。`;
    }
  }

  textEl.addEventListener('input', update);
  update();
})();
