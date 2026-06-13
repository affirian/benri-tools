/**
 * 共通ユーティリティ
 */
const Utils = {
  /** 数値をカンマ区切りでフォーマット */
  formatNumber(num, decimals = 0) {
    if (num == null || isNaN(num)) return '—';
    return Number(num).toLocaleString('ja-JP', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  },

  /** 金額フォーマット（円） */
  formatYen(num) {
    return `${this.formatNumber(num)}円`;
  },

  /** パーセントフォーマット */
  formatPercent(num, decimals = 1) {
    if (num == null || isNaN(num)) return '—';
    return `${Number(num).toFixed(decimals)}%`;
  },

  /** 日付を YYYY-MM-DD に正規化 */
  toDateInputValue(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  /** 今日の日付文字列 */
  today() {
    return this.toDateInputValue(new Date());
  },

  /** 2つの日付間の日数差（終了日を含む） */
  daysBetween(start, end) {
    const s = new Date(start);
    const e = new Date(end);
    s.setHours(0, 0, 0, 0);
    e.setHours(0, 0, 0, 0);
    const diff = e - s;
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  },

  /** 年・月・日の差分を計算 */
  diffYMD(start, end) {
    let y1 = start.getFullYear(), m1 = start.getMonth(), d1 = start.getDate();
    let y2 = end.getFullYear(), m2 = end.getMonth(), d2 = end.getDate();

    let years = y2 - y1;
    let months = m2 - m1;
    let days = d2 - d1;

    if (days < 0) {
      months--;
      const prevMonth = new Date(y2, m2, 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  },

  /** 時刻文字列 HH:MM を分に変換 */
  timeToMinutes(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  },

  /** 分を HH:MM に変換 */
  minutesToTime(totalMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  },

  /** デバウンス */
  debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /** 要素の値を数値で取得（空なら null） */
  numValue(el) {
    const v = el.value.trim();
    if (v === '') return null;
    const n = Number(v);
    return isNaN(n) ? null : n;
  },

  /** クリップボードにコピー */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    }
  },

  /** 結果コピーボタン初期化 */
  initCopyButtons(root = document) {
    root.querySelectorAll('.result-box:not([data-copy-init])').forEach((box) => {
      box.dataset.copyInit = '1';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', '結果をコピー');
      btn.innerHTML = '📋';
      btn.addEventListener('click', async () => {
        const text = box.innerText.replace(/📋/g, '').trim();
        const ok = await this.copyToClipboard(text);
        btn.textContent = ok ? '✓' : '✗';
        setTimeout(() => { btn.innerHTML = '📋'; }, 1500);
      });
      box.style.position = 'relative';
      box.appendChild(btn);
    });
  },

  /** ローディング表示 */
  showLoading(el) {
    el.innerHTML = '<div class="loading-spinner" role="status"><span class="sr-only">読み込み中</span></div>';
  },

  /** ランダム文字列生成 */
  randomChars(length, charset) {
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, (v) => charset[v % charset.length]).join('');
  },
};
