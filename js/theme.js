/**
 * ダークモード管理
 * 初回はOS設定に従い、以降はlocalStorageで保存
 */
const Theme = {
  STORAGE_KEY: 'benri-tools-theme',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    this.apply(theme, false);

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      this.apply(next, true);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.apply(e.matches ? 'dark' : 'light', false);
      }
    });
  },

  apply(theme, save = true) {
    document.documentElement.dataset.theme = theme;
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替');
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#0f172a' : SITE_CONFIG.themeColor;
    if (save) localStorage.setItem(this.STORAGE_KEY, theme);
  },
};

// FOUC防止: 描画前にテーマ適用
(function () {
  const saved = localStorage.getItem('benri-tools-theme');
  const dark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.dataset.theme = 'dark';
})();
