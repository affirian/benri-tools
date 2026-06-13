#!/usr/bin/env node
/**
 * ツールページHTMLの共通フッター生成 & 既存ページ更新
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const SCRIPTS = `  <script src="/js/config.js"></script>
  <script src="/js/categories.js"></script>
  <script src="/js/tools-registry.js"></script>
  <script src="/js/tools-content.js"></script>
  <script src="/js/utils.js"></script>
  <script src="/js/theme.js"></script>
  <script src="/js/search.js"></script>
  <script src="/js/components.js"></script>`;

function toolHtml({ title, description, toolJs, body }) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | 便利ツール集</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="便利ツール集">
  <meta name="theme-color" content="#2563eb">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/components.css">
  <script src="/js/theme.js"></script>
</head>
<body>
  <div id="site-header"></div>
  <main class="site-main">
    <div class="container">
      <div id="breadcrumb"></div>
      <article class="tool-page">
        <header class="tool-header">
          <h1 class="tool-title">${title}</h1>
          <p class="tool-description">${description}</p>
        </header>
        <div class="tool-panel">
${body}
        </div>
      </article>
    </div>
  </main>
  <div id="site-footer"></div>
${SCRIPTS}
  <script src="/js/tools/${toolJs}"></script>
</body>
</html>
`;
}

const tools = [
  {
    file: 'tools/calculation/bmi-calculator.html',
    toolJs: 'bmi-calculator.js',
    title: 'BMI計算',
    description: '身長と体重からBMI（肥満度）を計算する無料ツール。',
    body: `          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="height">身長（cm）</label>
              <input type="number" id="height" class="form-input" min="1" placeholder="例：170">
            </div>
            <div class="form-group">
              <label class="form-label" for="weight">体重（kg）</label>
              <input type="number" id="weight" class="form-input" min="1" step="0.1" placeholder="例：65">
            </div>
          </div>
          <div id="result" class="result-box" hidden>
            <p class="result-label">BMI</p>
            <p class="result-value" id="result-bmi">—</p>
            <p class="result-sub" id="result-judge"></p>
          </div>`,
  },
  {
    file: 'tools/calculation/school-grade.html',
    toolJs: 'school-grade.js',
    title: '学年計算',
    description: '生年月日から現在の学校学年を判定する無料ツール。',
    body: `          <div class="form-group">
            <label class="form-label" for="birth-date">生年月日</label>
            <input type="date" id="birth-date" class="form-input">
          </div>
          <div id="result" class="result-box" hidden>
            <p class="result-label">現在の学年</p>
            <p class="result-value" id="result-grade">—</p>
            <p class="result-sub" id="result-detail"></p>
          </div>`,
  },
  {
    file: 'tools/calculation/loan-calculator.html',
    toolJs: 'loan-calculator.js',
    title: 'ローン返済計算',
    description: '借入額・金利・返済期間から毎月の返済額を計算する無料ツール。',
    body: `          <div class="form-group">
            <label class="form-label" for="principal">借入額（円）</label>
            <input type="number" id="principal" class="form-input" min="0" placeholder="例：30000000">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rate">年利（%）</label>
              <input type="number" id="rate" class="form-input" min="0" step="0.01" placeholder="例：1.5">
            </div>
            <div class="form-group">
              <label class="form-label" for="years">返済年数</label>
              <input type="number" id="years" class="form-input" min="1" placeholder="例：35">
            </div>
          </div>
          <div id="result" class="result-box" hidden>
            <div class="result-grid">
              <div class="result-item">
                <p class="result-item-label">毎月の返済額</p>
                <p class="result-item-value" id="result-monthly">—</p>
              </div>
              <div class="result-item">
                <p class="result-item-label">総返済額</p>
                <p class="result-item-value" id="result-total">—</p>
              </div>
              <div class="result-item">
                <p class="result-item-label">総利息</p>
                <p class="result-item-value" id="result-interest">—</p>
              </div>
            </div>
          </div>`,
  },
  {
    file: 'tools/calculation/net-salary.html',
    toolJs: 'net-salary.js',
    title: '手取り計算',
    description: '額面月収から手取り額を概算する無料ツール。',
    body: `          <div class="form-group">
            <label class="form-label" for="gross">額面月収（円）</label>
            <input type="number" id="gross" class="form-input" min="0" placeholder="例：300000">
            <p class="form-hint">※概算です。実際の給与とは異なる場合があります。</p>
          </div>
          <div id="result" class="result-box" hidden>
            <p class="result-label">手取り額（概算）</p>
            <p class="result-value" id="result-net">—</p>
            <div class="result-grid">
              <div class="result-item"><p class="result-item-label">社会保険料</p><p class="result-item-value" id="result-social">—</p></div>
              <div class="result-item"><p class="result-item-label">税金（概算）</p><p class="result-item-value" id="result-tax">—</p></div>
            </div>
          </div>`,
  },
  {
    file: 'tools/date/countdown.html',
    toolJs: 'countdown.js',
    title: 'カウントダウン',
    description: '指定日時までの残り時間をリアルタイム表示する無料ツール。',
    body: `          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="target-date">目標日</label>
              <input type="date" id="target-date" class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label" for="target-time">時刻</label>
              <input type="time" id="target-time" class="form-input" value="00:00">
            </div>
          </div>
          <div id="result" class="result-box" hidden>
            <p class="result-label">残り時間</p>
            <p class="result-value" id="result-countdown">—</p>
          </div>`,
  },
  {
    file: 'tools/date/weekday-calculator.html',
    toolJs: 'weekday-calculator.js',
    title: '曜日計算',
    description: '日付から曜日を調べる無料ツール。',
    body: `          <div class="form-group">
            <label class="form-label" for="date">日付</label>
            <input type="date" id="date" class="form-input">
          </div>
          <div id="result" class="result-box" hidden>
            <p class="result-label">曜日</p>
            <p class="result-value" id="result-weekday">—</p>
          </div>`,
  },
  {
    file: 'tools/date/business-days.html',
    toolJs: 'business-days.js',
    title: '営業日計算',
    description: '土日を除いた営業日数を計算する無料ツール。',
    body: `          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="start-date">開始日</label>
              <input type="date" id="start-date" class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label" for="end-date">終了日</label>
              <input type="date" id="end-date" class="form-input">
            </div>
          </div>
          <p class="form-hint">※土日のみ除外。祝日は含まれません。</p>
          <div id="result" class="result-box" hidden>
            <p class="result-label">営業日数</p>
            <p class="result-value" id="result-days">—</p>
            <p class="result-sub" id="result-total"></p>
          </div>`,
  },
  {
    file: 'tools/sns/hashtag-count.html',
    toolJs: 'hashtag-count.js',
    title: 'ハッシュタグ数カウント',
    description: 'テキスト内のハッシュタグ（#）の数をカウントする無料ツール。',
    body: `          <div class="form-group">
            <label class="form-label" for="text">テキスト</label>
            <textarea id="text" class="form-textarea" rows="6" placeholder="#旅行 #カフェ #日常"></textarea>
            <p class="char-stats">ハッシュタグ数: <strong id="tag-count">0</strong></p>
            <div id="tag-list" class="tag-list"></div>
          </div>`,
  },
  {
    file: 'tools/sns/instagram-char-count.html',
    toolJs: 'instagram-char-count.js',
    title: 'Instagram文字数カウント',
    description: 'Instagramキャプションの文字数をリアルタイムでカウントする無料ツール。',
    body: `          <div class="form-group">
            <label class="form-label" for="caption">キャプション</label>
            <textarea id="caption" class="form-textarea" rows="8" placeholder="キャプションを入力..."></textarea>
            <div class="char-counter" id="char-counter"><span id="char-count">0 / 2,200文字</span></div>
            <div class="char-stats">
              <span>改行数: <strong id="stat-lines">0</strong></span>
              <span>ハッシュタグ: <strong id="stat-tags">0</strong></span>
            </div>
          </div>
          <div id="warning" class="result-box is-warning" hidden>
            <p class="result-value result-value--sm">2,200文字を超えています</p>
          </div>`,
  },
  {
    file: 'tools/converter/unit-converter.html',
    toolJs: 'unit-converter.js',
    title: '単位変換',
    description: '長さ・重さ・温度の単位を相互変換する無料ツール。',
    body: `          <div class="form-group">
            <label class="form-label" for="unit-type">変換タイプ</label>
            <select id="unit-type" class="form-select">
              <option value="length">長さ</option>
              <option value="weight">重さ</option>
              <option value="temperature">温度</option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="value">値</label>
              <input type="number" id="value" class="form-input" placeholder="例：100">
            </div>
            <div class="form-group">
              <label class="form-label" for="from-unit">変換元</label>
              <select id="from-unit" class="form-select"></select>
            </div>
            <div class="form-group">
              <label class="form-label" for="to-unit">変換先</label>
              <select id="to-unit" class="form-select"></select>
            </div>
          </div>
          <div id="result" class="result-box" hidden>
            <p class="result-label">変換結果</p>
            <p class="result-value" id="result-value">—</p>
          </div>`,
  },
  {
    file: 'tools/security/password-generator.html',
    toolJs: 'password-generator.js',
    title: 'パスワード生成',
    description: '安全なランダムパスワードを生成する無料ツール。',
    body: `          <div class="form-group">
            <label class="form-label" for="length">文字数</label>
            <input type="number" id="length" class="form-input" min="4" max="128" value="16">
          </div>
          <div class="form-group">
            <span class="form-label">含める文字</span>
            <div class="option-group">
              <label class="option-btn is-active"><input type="checkbox" id="use-lower" checked> 小文字</label>
              <label class="option-btn is-active"><input type="checkbox" id="use-upper" checked> 大文字</label>
              <label class="option-btn is-active"><input type="checkbox" id="use-number" checked> 数字</label>
              <label class="option-btn is-active"><input type="checkbox" id="use-symbol" checked> 記号</label>
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-block" id="generate-btn">パスワードを生成</button>
          <div id="result" class="result-box" hidden>
            <p class="result-label">生成されたパスワード</p>
            <p class="output-text" id="result-password"></p>
          </div>`,
  },
  {
    file: 'tools/security/uuid-generator.html',
    toolJs: 'uuid-generator.js',
    title: 'UUID生成',
    description: 'ユニークな識別子（UUID v4）を生成する無料ツール。',
    body: `          <button type="button" class="btn btn-primary btn-block" id="generate-btn">UUIDを生成</button>
          <div id="result" class="result-box" hidden>
            <p class="result-label">UUID（ハイフンあり）</p>
            <p class="output-text" id="result-uuid"></p>
            <p class="result-label" style="margin-top:1rem">UUID（ハイフンなし）</p>
            <p class="output-text" id="result-uuid-plain"></p>
          </div>`,
  },
  {
    file: 'tools/encode/base64-converter.html',
    toolJs: 'base64-converter.js',
    title: 'Base64変換',
    description: 'テキストとBase64を相互変換する無料ツール。',
    body: `          <div class="tab-group" role="tablist">
            <button class="tab-btn is-active" data-tab="encode" role="tab">エンコード</button>
            <button class="tab-btn" data-tab="decode" role="tab">デコード</button>
          </div>
          <div class="form-group">
            <label class="form-label" for="text">テキスト</label>
            <textarea id="text" class="form-textarea" rows="5" placeholder="変換するテキストを入力"></textarea>
          </div>
          <div id="result" class="result-box" hidden>
            <p class="result-label">結果</p>
            <p class="output-text" id="result-text"></p>
          </div>`,
  },
  {
    file: 'tools/encode/url-encode.html',
    toolJs: 'url-encode.js',
    title: 'URLエンコード',
    description: 'URLのエンコード・デコードを行う無料ツール。',
    body: `          <div class="tab-group" role="tablist">
            <button class="tab-btn is-active" data-tab="encode" role="tab">エンコード</button>
            <button class="tab-btn" data-tab="decode" role="tab">デコード</button>
          </div>
          <div class="form-group">
            <label class="form-label" for="text">テキスト / URL</label>
            <textarea id="text" class="form-textarea" rows="4" placeholder="https://example.com/検索?q=テスト"></textarea>
          </div>
          <div id="result" class="result-box" hidden>
            <p class="result-label">結果</p>
            <p class="output-text" id="result-text"></p>
          </div>`,
  },
];

for (const t of tools) {
  const out = path.join(ROOT, t.file);
  fs.writeFileSync(out, toolHtml(t));
  console.log('Created', t.file);
}

// Update existing tool pages
const existing = [
  'tools/calculation/days-calculator.html',
  'tools/calculation/age-calculator.html',
  'tools/calculation/split-bill.html',
  'tools/calculation/tax-calculator.html',
  'tools/calculation/profit-calculator.html',
  'tools/calculation/interest-calculator.html',
  'tools/calculation/work-hours.html',
  'tools/sns/x-char-count.html',
  'tools/qr-url/qr-generator.html',
];

for (const file of existing) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replace(/<script src="\/js\/theme\.js"><\/script>\n?/, '');
  html = html.replace(/\s*<div id="ad-content"><\/div>\n?/, '\n');
  html = html.replace(
    /<script src="\/js\/config\.js"><\/script>[\s\S]*?<script src="\/js\/tools\/[^"]+"><\/script>/,
    `${SCRIPTS}\n  <script src="${html.match(/\/js\/tools\/[^"]+/)[0]}"></script>`
  );
  if (!html.includes('theme.js')) {
    html = html.replace('</head>', '  <script src="/js/theme.js"></script>\n</head>');
  }
  fs.writeFileSync(fp, html);
  console.log('Updated', file);
}
