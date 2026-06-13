(function () {
  const tool = initToolPage('instagram-char-count');
  if (!tool) return;
  const LIMIT = 2200;
  const textEl = document.getElementById('caption');
  const counterEl = document.getElementById('char-counter');
  const charCountEl = document.getElementById('char-count');
  const statLines = document.getElementById('stat-lines');
  const statTags = document.getElementById('stat-tags');
  const warningBox = document.getElementById('warning');

  function update() {
    const text = textEl.value;
    const chars = [...text].length;
    const lines = text.length ? (text.match(/\n/g) || []).length : 0;
    const tags = (text.match(/#[^\s#]+/g) || []).length;
    const over = chars > LIMIT;

    charCountEl.textContent = `${chars.toLocaleString()} / ${LIMIT.toLocaleString()}文字`;
    statLines.textContent = lines;
    statTags.textContent = tags;
    counterEl.classList.toggle('is-over', over);
    warningBox.hidden = !over;
  }
  textEl.addEventListener('input', update);
  update();
})();
