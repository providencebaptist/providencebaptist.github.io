import fs from 'fs';
import path from 'path';

const indexPath = path.resolve('dist/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(/<link\s+rel="stylesheet"([^>]*?)>/g, (match, attrs) => {
  const hrefMatch = attrs.match(/href="([^"]+)"/);
  if (!hrefMatch) return match;
  const href = hrefMatch[1];
  return `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"/>\n    <noscript><link rel="stylesheet" href="${href}"/></noscript>`;
});

html = html.replace(/<noscript><\/noscript>/g, '');

fs.writeFileSync(indexPath, html);
