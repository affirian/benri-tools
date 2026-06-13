(function () {
  const tool = initToolPage('uuid-generator');
  if (!tool) return;
  const btn = document.getElementById('generate-btn');
  const resultBox = document.getElementById('result');

  function uuidv4() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  function generate() {
    const uuid = uuidv4();
    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    document.getElementById('result-uuid').textContent = uuid;
    document.getElementById('result-uuid-plain').textContent = uuid.replace(/-/g, '');
    Utils.initCopyButtons();
  }

  btn.addEventListener('click', generate);
  generate();
})();
