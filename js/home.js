/**
 * トップページ：人気・新着・検索・カテゴリー一覧
 */
(function () {
  Components.initLayout({ activePath: '/' });
  SEO.setHomeStructuredData();

  const searchInput = document.getElementById('tool-search');
  const toolsContainer = document.getElementById('tools-container');
  const featuredSection = document.getElementById('featured-sections');
  const searchEmpty = document.getElementById('search-empty');

  function renderFeatured() {
    const popular = getPopularTools();
    const newest = getNewTools();

    featuredSection.innerHTML = `
      <section class="featured-section" id="popular-tools">
        <h2 class="section-title"><span class="section-title-icon" aria-hidden="true">🔥</span>人気ツール</h2>
        <div class="tools-grid">${popular.map(renderToolCard).join('')}</div>
      </section>
      <section class="featured-section" id="new-tools">
        <h2 class="section-title"><span class="section-title-icon" aria-hidden="true">✨</span>新着ツール</h2>
        <div class="tools-grid">${newest.map(renderToolCard).join('')}</div>
      </section>
    `;
  }

  function renderCategories(tools) {
    const sortedCategories = Object.values(TOOL_CATEGORIES).sort((a, b) => a.order - b.order);
    const grouped = {};
    for (const tool of tools) {
      if (!grouped[tool.category]) grouped[tool.category] = [];
      grouped[tool.category].push(tool);
    }

    return sortedCategories
      .filter((cat) => grouped[cat.id])
      .map((cat) => {
        const items = grouped[cat.id];
        return `
          <section class="category-section" id="category-${cat.id}">
            <div class="category-header">
              <span class="category-icon" aria-hidden="true">${cat.icon}</span>
              <h2 class="category-title">${cat.name}</h2>
              <span class="category-count">${items.length}件</span>
            </div>
            <div class="tools-grid">${items.map(renderToolCard).join('')}</div>
          </section>
        `;
      })
      .join('');
  }

  function renderTools(filter = '') {
    const filtered = Search.filterTools(filter);
    const isSearching = filter.trim().length > 0;

    featuredSection.hidden = isSearching;

    if (filtered.length === 0) {
      toolsContainer.innerHTML = '';
      searchEmpty.hidden = false;
      return;
    }

    searchEmpty.hidden = true;
    toolsContainer.innerHTML = isSearching
      ? `<section class="category-section"><div class="tools-grid">${filtered.map(renderToolCard).join('')}</div></section>`
      : renderCategories(filtered);
  }

  renderFeatured();
  renderTools();

  searchInput.addEventListener('input', Utils.debounce((e) => renderTools(e.target.value), 150));
})();
