(function () {
  const tool = initToolPage('hashtag-count');
  if (!tool) return;
  const textEl = document.getElementById('text');
  const countEl = document.getElementById('tag-count');
  const listEl = document.getElementById('tag-list');

  function update() {
    const tags = textEl.value.match(/#[^\s#]+/g) || [];
    countEl.textContent = tags.length;
    listEl.innerHTML = tags.map((t) => `<span class="tag-item">${t}</span>`).join('');
  }
  textEl.addEventListener('input', update);
  update();
})();
