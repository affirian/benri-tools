/**
 * 共通UIコンポーネント
 */
const Components = {
  renderHeader(activePath = '/') {
    return `
      <header class="site-header">
        <div class="container header-inner">
          <a href="/" class="site-logo">
            <span class="logo-icon" aria-hidden="true">⚡</span>
            <span class="logo-text">${SITE_CONFIG.name}</span>
          </a>
          <div class="header-search-wrap">
            <span class="search-icon" aria-hidden="true">🔍</span>
            <input type="search" id="header-search" class="header-search-input" placeholder="ツールを検索" autocomplete="off" aria-label="ツール検索">
            <div id="header-search-dropdown" class="search-dropdown" hidden></div>
          </div>
          <div class="header-actions">
            <button type="button" id="theme-toggle" class="theme-toggle" aria-label="テーマ切替">🌙</button>
            <nav class="site-nav" aria-label="メインナビゲーション">
              <a href="/" class="nav-link${activePath === '/' ? ' is-active' : ''}">ホーム</a>
            </nav>
          </div>
        </div>
      </header>
      <div id="ad-header-below" class="ad-header-below"></div>
    `;
  },

  renderFooter() {
    const year = new Date().getFullYear();
    return `
      <div id="ad-footer-above" class="ad-footer-above container"></div>
      <footer class="site-footer">
        <div class="container footer-inner">
          <p class="footer-brand">${SITE_CONFIG.name}</p>
          <p class="footer-desc">${SITE_CONFIG.tagline}。すべてブラウザ上で動作し、個人情報はサーバーに送信されません。</p>
          <p class="footer-copy">&copy; ${year} ${SITE_CONFIG.name}</p>
        </div>
      </footer>
    `;
  },

  renderBreadcrumb(items) {
    const crumbs = items
      .map((item, i) => {
        const isLast = i === items.length - 1;
        if (isLast) {
          return `<li class="breadcrumb-item is-current" aria-current="page">${item.label}</li>`;
        }
        return `<li class="breadcrumb-item"><a href="${item.href}">${item.label}</a></li>`;
      })
      .join('<li class="breadcrumb-sep" aria-hidden="true">/</li>');

    return `
      <nav class="breadcrumb" aria-label="パンくずリスト">
        <ol class="breadcrumb-list">${crumbs}</ol>
      </nav>
    `;
  },

  renderToolBreadcrumb(tool) {
    const cat = TOOL_CATEGORIES[tool.category];
    return this.renderBreadcrumb([
      { label: 'ホーム', href: '/' },
      { label: cat ? cat.name : 'ツール', href: `/#category-${tool.category}` },
      { label: tool.name, href: tool.path },
    ]);
  },

  renderAdSlot(position = 'content') {
    return `
      <div class="ad-slot ad-slot--${position}" data-ad-position="${position}">
        <!-- Google AdSense: data-ad-position="${position}" -->
        <div class="ad-placeholder">広告</div>
      </div>
    `;
  },

  renderSEOArticle(tool) {
    const content = getToolContent(tool.id);
    if (!content.seo) return '';
    const { about, usage, method } = content.seo;
    return `
      <section class="seo-article">
        <h2 class="seo-article-title">${tool.name}ツールとは</h2>
        <p>${about}</p>
        <h3 class="seo-article-subtitle">利用シーン</h3>
        <p>${usage}</p>
        <h3 class="seo-article-subtitle">使い方・計算方法</h3>
        <p>${method}</p>
      </section>
    `;
  },

  renderFAQ(tool) {
    const content = getToolContent(tool.id);
    if (!content.faq || !content.faq.length) return '';
    const items = content.faq
      .map(
        (item) => `
        <details class="faq-item">
          <summary class="faq-question">${item.q}</summary>
          <p class="faq-answer">${item.a}</p>
        </details>
      `
      )
      .join('');
    return `
      <section class="faq-section">
        <h2 class="section-title">よくある質問</h2>
        <div class="faq-list">${items}</div>
      </section>
    `;
  },

  renderRelatedTools(tool) {
    const related = getRelatedTools(tool.id);
    if (!related.length) return '';
    const cards = related.map((t) => renderToolCard(t)).join('');
    return `
      <section class="tool-related">
        <h2 class="section-title">関連ツール</h2>
        <div class="tools-grid tools-grid--compact">${cards}</div>
      </section>
    `;
  },

  mount(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  },

  initLayout(options = {}) {
    const { activePath = '/', breadcrumb = null, ads = true } = options;
    this.mount('#site-header', this.renderHeader(activePath));
    this.mount('#site-footer', this.renderFooter());

    if (ads) {
      this.mount('#ad-header-below', this.renderAdSlot('header-below'));
      this.mount('#ad-footer-above', this.renderAdSlot('footer-above'));
    }

    if (breadcrumb) this.mount('#breadcrumb', breadcrumb);

    Theme.init();
    Search.initHeader();
  },
};

const SEO = {
  setToolMeta(tool) {
    const title = `${tool.name} | ${SITE_CONFIG.name}`;
    const description = tool.description;
    const url = `${SITE_CONFIG.url}${tool.path}`;

    document.title = title;
    this._setMeta('description', description);
    this._setMeta('og:title', title, 'property');
    this._setMeta('og:description', description, 'property');
    this._setMeta('og:url', url, 'property');
    this._setMeta('og:type', 'website', 'property');
    this._setMeta('og:site_name', SITE_CONFIG.name, 'property');
    this._setMeta('og:locale', SITE_CONFIG.locale, 'property');
    this._setMeta('twitter:card', 'summary', 'name');
    this._setMeta('twitter:title', title, 'name');
    this._setMeta('twitter:description', description, 'name');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  },

  injectJsonLd(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  },

  setHomeStructuredData() {
    this.injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.url}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
  },

  setToolStructuredData(tool) {
    const url = `${SITE_CONFIG.url}${tool.path}`;
    const cat = TOOL_CATEGORIES[tool.category];
    const content = getToolContent(tool.id);

    this.injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      url,
      applicationCategory: cat ? cat.name : 'UtilityApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
    });

    this.injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE_CONFIG.url },
        { '@type': 'ListItem', position: 2, name: cat ? cat.name : 'ツール', item: `${SITE_CONFIG.url}/#category-${tool.category}` },
        { '@type': 'ListItem', position: 3, name: tool.name, item: url },
      ],
    });

    if (content.faq && content.faq.length) {
      this.injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      });
    }
  },

  _setMeta(name, content, attr = 'name') {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.content = content;
  },
};

function initToolPage(toolId) {
  const tool = getToolById(toolId);
  if (!tool) return null;

  Components.initLayout({
    activePath: tool.path,
    breadcrumb: Components.renderToolBreadcrumb(tool),
  });
  SEO.setToolMeta(tool);
  SEO.setToolStructuredData(tool);

  const article = document.querySelector('.tool-page');
  if (article) {
    const panel = article.querySelector('.tool-panel');
    if (panel && !document.getElementById('ad-tool-top')) {
      const adTop = document.createElement('div');
      adTop.id = 'ad-tool-top';
      adTop.innerHTML = Components.renderAdSlot('tool-top');
      panel.before(adTop);
    }

    const extras = document.createElement('div');
    extras.className = 'tool-page-extras';
    extras.innerHTML = `
      ${Components.renderAdSlot('tool-bottom')}
      ${Components.renderSEOArticle(tool)}
      ${Components.renderFAQ(tool)}
      ${Components.renderRelatedTools(tool)}
    `;
    article.appendChild(extras);
  }

  Utils.initCopyButtons();
  return tool;
}
