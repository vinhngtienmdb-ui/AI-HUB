import fs from 'node:fs';

const html2 = fs.readFileSync('scripts/mcpmarket.html', 'utf-8');

// Find all server links and surrounding text
const regex = /<a\b[^>]*href=["'](\/server\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const servers = [];
let match;
while ((match = regex.exec(html2)) !== null) {
  const url = match[1];
  const inner = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  servers.push({ url, inner });
}

console.log('Total server links in HTML:', servers.length);
for (const s of servers.slice(0, 20)) {
  console.log(s.url, '=>', s.inner);
}
