(function () {
  const tool = initToolPage('school-grade');
  if (!tool) return;
  const birthEl = document.getElementById('birth-date');
  const resultBox = document.getElementById('result');
  const resultGrade = document.getElementById('result-grade');
  const resultDetail = document.getElementById('result-detail');

  function schoolYearApril1() {
    const now = new Date();
    const y = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
    return new Date(y, 3, 1);
  }

  function calc() {
    if (!birthEl.value) { resultBox.hidden = true; return; }
    const birth = new Date(birthEl.value);
    const ref = schoolYearApril1();
    const age = Utils.diffYMD(birth, ref).years;
    let grade;
    if (age < 6) grade = `未就学児（満${age}歳）`;
    else if (age <= 11) grade = `小学校 ${age - 5}年生`;
    else if (age <= 14) grade = `中学校 ${age - 11}年生`;
    else if (age <= 17) grade = `高等学校 ${age - 14}年生`;
    else grade = '高校卒業以上';

    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultGrade.textContent = grade;
    resultDetail.textContent = `${ref.getFullYear()}年4月1日時点で満${age}歳`;
    Utils.initCopyButtons();
  }
  birthEl.addEventListener('change', calc);
})();
