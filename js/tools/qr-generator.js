(function () {
  const tool = initToolPage('qr-generator');
  if (!tool) return;

  const textEl = document.getElementById('qr-text');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const outputEl = document.getElementById('qr-output');
  const qrcodeEl = document.getElementById('qrcode');

  function getQrSize() {
    const panel = qrcodeEl.closest('.tool-panel');
    const base = qrcodeEl.clientWidth || (panel ? panel.clientWidth - 48 : 240);
    return Math.min(256, Math.max(160, base - 32));
  }

  function generate() {
    const text = textEl.value.trim();
    if (!text) {
      outputEl.hidden = true;
      return;
    }

    outputEl.hidden = false;
    generateBtn.disabled = true;
    Utils.showLoading(qrcodeEl);

    requestAnimationFrame(() => {
      setTimeout(() => {
        qrcodeEl.innerHTML = '';
        const size = getQrSize();
        new QRCode(qrcodeEl, {
          text,
          width: size,
          height: size,
          colorDark: document.documentElement.dataset.theme === 'dark' ? '#f1f5f9' : '#0f172a',
          colorLight: document.documentElement.dataset.theme === 'dark' ? '#1e293b' : '#ffffff',
          correctLevel: QRCode.CorrectLevel.M,
        });
        generateBtn.disabled = false;
      }, 200);
    });
  }

  function download() {
    const img = qrcodeEl.querySelector('img');
    const canvas = qrcodeEl.querySelector('canvas');
    let dataUrl;
    if (canvas) dataUrl = canvas.toDataURL('image/png');
    else if (img) dataUrl = img.src;
    else return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = dataUrl;
    link.click();
  }

  generateBtn.addEventListener('click', generate);
  downloadBtn.addEventListener('click', download);
  textEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generate();
  });
})();
