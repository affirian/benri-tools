/**
 * グローバル検索（ヘッダー・トップページ共通）
 */
const Search = {
  filterTools(query) {
    const q = query.trim().toLowerCase();
    if (!q) return getActiveTools();

    return getActiveTools().filter((tool) => {
      const cat = TOOL_CATEGORIES[tool.category];
      const haystack = [tool.name, tool.description, ...(tool.keywords || []), cat ? cat.name : '']
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  },

  renderDropdown(results, query) {
    if (!query.trim()) return '';

    if (results.length === 0) {
      return '<div class="search-dropdown-empty">該当するツールがありません</div>';
    }

    return results
      .slice(0, 8)
      .map(
        (tool) => `
        <a href="${tool.path}" class="search-dropdown-item">
          <span class="search-dropdown-name">${tool.name}</span>
          <span class="search-dropdown-cat">${TOOL_CATEGORIES[tool.category]?.name || ''}</span>
        </a>
      `
      )
      .join('');
  },

  initHeader() {
    const input = document.getElementById('header-search');
    const dropdown = document.getElementById('header-search-dropdown');
    if (!input || !dropdown) return;

    const update = Utils.debounce(() => {
      const q = input.value;
      const results = this.filterTools(q);
      dropdown.innerHTML = this.renderDropdown(results, q);
      dropdown.hidden = !q.trim();
    }, 120);

    input.addEventListener('input', update);
    input.addEventListener('focus', update);

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search-wrap')) {
        dropdown.hidden = true;
      }
    });
  },
};
