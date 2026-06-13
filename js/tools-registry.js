/**
 * ツール一覧レジストリ（Single Source of Truth）
 *
 * 新ツール追加手順:
 * 1. この配列にエントリを追加（enabled: true）
 * 2. js/tools-content.js に FAQ・SEO本文を追加
 * 3. tools/{category}/{id}.html と js/tools/{id}.js を作成
 * 4. node scripts/generate-sitemap.js を実行
 */
const TOOLS_REGISTRY = [
  // ── 計算ツール ──
  { id: 'days-calculator', name: '日数計算', description: '開始日と終了日から日数を計算。年・月・日表示にも対応。', category: 'calculation', path: '/tools/calculation/days-calculator.html', keywords: ['日数', '日付', '期間'], enabled: true, popular: true, isNew: false, addedAt: '2026-01-01' },
  { id: 'age-calculator', name: '年齢計算', description: '生年月日から現在の年齢と生後日数を計算。', category: 'calculation', path: '/tools/calculation/age-calculator.html', keywords: ['年齢', '誕生日', '生年月日'], enabled: true, popular: true, isNew: false, addedAt: '2026-01-01' },
  { id: 'split-bill', name: '割り勘計算', description: '合計金額と人数から1人あたりの金額を計算。端数処理にも対応。', category: 'calculation', path: '/tools/calculation/split-bill.html', keywords: ['割り勘', '割勘', '均等割'], enabled: true, popular: true, isNew: false, addedAt: '2026-01-01' },
  { id: 'tax-calculator', name: '消費税計算', description: '税抜・税込の相互変換。8%・10%の税率に対応。', category: 'calculation', path: '/tools/calculation/tax-calculator.html', keywords: ['消費税', '税込', '税抜'], enabled: true, popular: false, isNew: false, addedAt: '2026-01-01' },
  { id: 'profit-calculator', name: '利益率計算', description: '原価と販売価格から利益額・利益率を計算。', category: 'calculation', path: '/tools/calculation/profit-calculator.html', keywords: ['利益率', '粗利', '原価'], enabled: true, popular: false, isNew: false, addedAt: '2026-01-01' },
  { id: 'interest-calculator', name: '利息計算', description: '元金・年利・年数から単利の利息を計算。', category: 'calculation', path: '/tools/calculation/interest-calculator.html', keywords: ['利息', '単利', '年利'], enabled: true, popular: false, isNew: false, addedAt: '2026-01-01' },
  { id: 'work-hours', name: '勤務時間計算', description: '開始・終了時刻と休憩時間から実働時間を計算。', category: 'calculation', path: '/tools/calculation/work-hours.html', keywords: ['勤務時間', '実働', '労働時間'], enabled: true, popular: false, isNew: false, addedAt: '2026-01-01' },
  { id: 'bmi-calculator', name: 'BMI計算', description: '身長と体重からBMI（肥満度）を計算。', category: 'calculation', path: '/tools/calculation/bmi-calculator.html', keywords: ['BMI', '肥満度', '体重'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'school-grade', name: '学年計算', description: '生年月日から現在の学校学年を判定。', category: 'calculation', path: '/tools/calculation/school-grade.html', keywords: ['学年', '入学', '学校'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'loan-calculator', name: 'ローン返済計算', description: '借入額・金利・期間から毎月の返済額を計算。', category: 'calculation', path: '/tools/calculation/loan-calculator.html', keywords: ['ローン', '返済', '住宅ローン'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'net-salary', name: '手取り計算', description: '額面月収から手取り額を概算。', category: 'calculation', path: '/tools/calculation/net-salary.html', keywords: ['手取り', '給与', '年収'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },

  // ── 日付ツール ──
  { id: 'countdown', name: 'カウントダウン', description: '指定日時までの残り時間をリアルタイム表示。', category: 'date', path: '/tools/date/countdown.html', keywords: ['カウントダウン', '残り日数', 'タイマー'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'weekday-calculator', name: '曜日計算', description: '日付から曜日を調べる。', category: 'date', path: '/tools/date/weekday-calculator.html', keywords: ['曜日', '何曜日'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'business-days', name: '営業日計算', description: '土日を除いた営業日数を計算。', category: 'date', path: '/tools/date/business-days.html', keywords: ['営業日', '平日', '稼働日'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },

  // ── SNSツール ──
  { id: 'x-char-count', name: 'X文字数カウント', description: 'X（旧Twitter）投稿の文字数をリアルタイムでカウント。', category: 'sns', path: '/tools/sns/x-char-count.html', keywords: ['X', 'Twitter', '文字数'], enabled: true, popular: false, isNew: false, addedAt: '2026-01-01' },
  { id: 'hashtag-count', name: 'ハッシュタグ数カウント', description: 'テキスト内のハッシュタグ（#）の数をカウント。', category: 'sns', path: '/tools/sns/hashtag-count.html', keywords: ['ハッシュタグ', 'Instagram', '#'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'instagram-char-count', name: 'Instagram文字数カウント', description: 'Instagramキャプションの文字数をリアルタイムカウント。', category: 'sns', path: '/tools/sns/instagram-char-count.html', keywords: ['Instagram', 'インスタ', '文字数'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },

  // ── QR・URLツール ──
  { id: 'qr-generator', name: 'QRコード生成', description: 'テキストやURLからQRコードを生成。PNGダウンロード対応。', category: 'qr-url', path: '/tools/qr-url/qr-generator.html', keywords: ['QRコード', 'QR'], enabled: true, popular: true, isNew: false, addedAt: '2026-01-01' },

  // ── 単位変換 ──
  { id: 'unit-converter', name: '単位変換', description: '長さ・重さ・温度の単位を相互変換。', category: 'converter', path: '/tools/converter/unit-converter.html', keywords: ['単位変換', '長さ', '温度'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'password-generator', name: 'パスワード生成', description: '安全なランダムパスワードを生成。', category: 'security', path: '/tools/security/password-generator.html', keywords: ['パスワード', '安全', '生成'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'uuid-generator', name: 'UUID生成', description: 'ユニークな識別子（UUID v4）を生成。', category: 'security', path: '/tools/security/uuid-generator.html', keywords: ['UUID', 'ID', '識別子'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },

  // ── エンコード ──
  { id: 'base64-converter', name: 'Base64変換', description: 'テキストとBase64を相互変換。', category: 'encode', path: '/tools/encode/base64-converter.html', keywords: ['Base64', 'エンコード'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
  { id: 'url-encode', name: 'URLエンコード', description: 'URLのエンコード・デコード。', category: 'encode', path: '/tools/encode/url-encode.html', keywords: ['URL', 'エンコード', 'パーセント'], enabled: true, popular: false, isNew: true, addedAt: '2026-06-13' },
];

function getActiveTools() {
  return TOOLS_REGISTRY.filter((t) => t.enabled);
}

function getToolById(id) {
  return TOOLS_REGISTRY.find((t) => t.id === id);
}

function getPopularTools() {
  return TOOLS_REGISTRY.filter((t) => t.enabled && t.popular);
}

function getNewTools() {
  return getActiveTools()
    .filter((t) => t.isNew)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}

function getToolsByCategory() {
  const grouped = {};
  for (const tool of getActiveTools()) {
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push(tool);
  }
  return grouped;
}

function getRelatedTools(toolId) {
  const content = getToolContent(toolId);
  return (content.related || [])
    .map((id) => getToolById(id))
    .filter((t) => t && t.enabled);
}

function renderToolCard(tool) {
  const badge = tool.isNew ? '<span class="tool-card-badge">NEW</span>' : '';
  return `
    <a href="${tool.path}" class="tool-card">
      ${badge}
      <h3 class="tool-card-title">${tool.name}</h3>
      <p class="tool-card-desc">${tool.description}</p>
      <span class="tool-card-arrow">使ってみる →</span>
    </a>
  `;
}
