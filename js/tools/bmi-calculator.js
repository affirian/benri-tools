(function () {
  const tool = initToolPage('bmi-calculator');
  if (!tool) return;
  const heightEl = document.getElementById('height');
  const weightEl = document.getElementById('weight');
  const resultBox = document.getElementById('result');
  const resultBmi = document.getElementById('result-bmi');
  const resultJudge = document.getElementById('result-judge');

  function judge(bmi) {
    if (bmi < 18.5) return '低体重（痩せ型）';
    if (bmi < 25) return '普通体重';
    if (bmi < 30) return '肥満（1度）';
    if (bmi < 35) return '肥満（2度）';
    return '肥満（3度）';
  }

  function calc() {
    const h = Utils.numValue(heightEl);
    const w = Utils.numValue(weightEl);
    if (!h || !w) { resultBox.hidden = true; return; }
    const bmi = w / ((h / 100) ** 2);
    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultBmi.textContent = bmi.toFixed(1);
    resultJudge.textContent = judge(bmi);
    Utils.initCopyButtons();
  }
  heightEl.addEventListener('input', calc);
  weightEl.addEventListener('input', calc);
})();
