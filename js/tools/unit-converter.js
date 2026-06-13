const UNIT_DATA = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mile: 1609.344, feet: 0.3048 },
  weight: { kg: 1, g: 0.001, t: 1000, lb: 0.453592, oz: 0.0283495 },
  temperature: { c: 'c', f: 'f' },
};

const UNIT_LABELS = {
  length: { m: 'メートル (m)', km: 'キロ (km)', cm: 'センチ (cm)', mm: 'ミリ (mm)', mile: 'マイル', feet: 'フィート' },
  weight: { kg: 'キロ (kg)', g: 'グラム (g)', t: 'トン (t)', lb: 'ポンド (lb)', oz: 'オンス (oz)' },
  temperature: { c: '摂氏 (℃)', f: '華氏 (℉)' },
};

(function () {
  const tool = initToolPage('unit-converter');
  if (!tool) return;
  const typeEl = document.getElementById('unit-type');
  const valueEl = document.getElementById('value');
  const fromEl = document.getElementById('from-unit');
  const toEl = document.getElementById('to-unit');
  const resultBox = document.getElementById('result');
  const resultVal = document.getElementById('result-value');

  function populateUnits() {
    const type = typeEl.value;
    const units = UNIT_LABELS[type];
    const opts = Object.entries(units).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
    fromEl.innerHTML = opts;
    toEl.innerHTML = opts;
    if (type === 'temperature') { toEl.selectedIndex = 1; }
    calc();
  }

  function convert(val, from, to, type) {
    if (type === 'temperature') {
      let c = from === 'f' ? (val - 32) * 5 / 9 : val;
      return to === 'f' ? c * 9 / 5 + 32 : c;
    }
    const base = val * UNIT_DATA[type][from];
    return base / UNIT_DATA[type][to];
  }

  function calc() {
    const val = Utils.numValue(valueEl);
    const type = typeEl.value;
    if (val == null) { resultBox.hidden = true; return; }
    const result = convert(val, fromEl.value, toEl.value, type);
    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultVal.textContent = `${Utils.formatNumber(result, 6)} ${UNIT_LABELS[type][toEl.value]}`;
    Utils.initCopyButtons();
  }

  typeEl.addEventListener('change', populateUnits);
  [valueEl, fromEl, toEl].forEach((el) => el.addEventListener('input', calc));
  populateUnits();
})();
