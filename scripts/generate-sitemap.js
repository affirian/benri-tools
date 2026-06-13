/**
 * sitemap.xml 自動生成
 * 使い方: node scripts/generate-sitemap.js
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://benri-tools.pages.dev';
const registryPath = path.join(__dirname, '../js/tools-registry.js');
const registrySrc = fs.readFileSync(registryPath, 'utf8');

const toolPaths = [];
const entryRegex = /\{[^}]*path:\s*'([^']+)'[^}]*enabled:\s*true[^}]*\}/g;
let match;
while ((match = entryRegex.exec(registrySrc)) !== null) {
  toolPaths.push(match[1]);
}

const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  ...toolPaths.map((p) => ({ loc: `${SITE_URL}${p}`, priority: '0.8', changefreq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${urls.length} URLs`);
