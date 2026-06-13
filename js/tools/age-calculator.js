(function () {
  const tool = initToolPage('age-calculator');
  if (!tool) return;

  const birthEl = document.getElementById('birth-date');
  const resultBox = document.getElementById('result');
  const resultAge = document.getElementById('result-age');
  const resultDetail = document.getElementById('result-detail');
  const resultDays = document.getElementById('result-days');

  function calculate() {
    if (!birthEl.value) {
      resultBox.hidden = true;
      return;
    }

    const birth = new Date(birthEl.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    birth.setHours(0, 0, 0, 0);

    if (birth > today) {
      resultBox.hidden = false;
      resultBox.className = 'result-box is-danger';
      resultAge.textContent = '—';
      resultDetail.textContent = '未来の日付は指定できません';
      resultDays.textContent = '—';
      Utils.initCopyButtons();
      return;
    }

    const ymd = Utils.diffYMD(birth, today);
    const days = Utils.daysBetween(birth, today);

    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultAge.textContent = `${ymd.years}歳`;
    resultDetail.textContent = `${ymd.years}年${ymd.months}ヶ月${ymd.days}日`;
    resultDays.textContent = `${Utils.formatNumber(days)}日`;
    Utils.initCopyButtons();
  }

  birthEl.addEventListener('change', calculate);
  calculate();
})();
