(function () {
  const tool = initToolPage('password-generator');
  if (!tool) return;
  const lengthEl = document.getElementById('length');
  const btn = document.getElementById('generate-btn');
  const resultBox = document.getElementById('result');
  const resultPw = document.getElementById('result-password');

  const sets = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    symbol: '!@#$%^&*()-_=+[]{}',
  };

  function generate() {
    let charset = '';
    if (document.getElementById('use-lower').checked) charset += sets.lower;
    if (document.getElementById('use-upper').checked) charset += sets.upper;
    if (document.getElementById('use-number').checked) charset += sets.number;
    if (document.getElementById('use-symbol').checked) charset += sets.symbol;
    if (!charset) return;

    const len = Math.min(128, Math.max(4, Utils.numValue(lengthEl) || 16));
    const pw = Utils.randomChars(len, charset);
    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultPw.textContent = pw;
    Utils.initCopyButtons();
  }

  btn.addEventListener('click', generate);
  generate();
})();
