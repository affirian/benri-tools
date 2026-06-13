(function () {
  const tool = initToolPage('split-bill');
  if (!tool) return;

  const totalEl = document.getElementById('total');
  const peopleEl = document.getElementById('people');
  const resultBox = document.getElementById('result');
  const resultPerPerson = document.getElementById('result-per-person');
  const resultSub = document.getElementById('result-sub');
  const optionBtns = document.querySelectorAll('#rounding-options .option-btn');

  optionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      optionBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      btn.querySelector('input').checked = true;
      calculate();
    });
  });

  function calculate() {
    const total = Utils.numValue(totalEl);
    const people = Utils.numValue(peopleEl);
    const rounding = document.querySelector('input[name="rounding"]:checked').value;

    if (total == null || people == null || people < 1) {
      resultBox.hidden = true;
      return;
    }

    const raw = total / people;
    let perPerson;
    switch (rounding) {
      case 'ceil':
        perPerson = Math.ceil(raw);
        break;
      case 'floor':
        perPerson = Math.floor(raw);
        break;
      default:
        perPerson = Math.round(raw);
    }

    const collected = perPerson * people;
    const diff = collected - total;

    resultBox.hidden = false;
    resultBox.className = 'result-box is-success';
    resultPerPerson.textContent = Utils.formatYen(perPerson);
    resultSub.textContent =
      diff === 0
        ? `合計 ${Utils.formatYen(total)} ÷ ${people}人`
        : `合計 ${Utils.formatYen(total)} ÷ ${people}人（${diff > 0 ? '+' : ''}${Utils.formatNumber(diff)}円の調整）`;
    Utils.initCopyButtons();
  }

  totalEl.addEventListener('input', calculate);
  peopleEl.addEventListener('input', calculate);
})();
