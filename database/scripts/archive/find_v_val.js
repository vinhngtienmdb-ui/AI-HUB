import fs from 'node:fs';

const text = fs.readFileSync('scripts/pdg_page_chunk.js', 'utf-8');

const regex = /const V\s*=\s*["'`]([^"'`]+)["'`]|let V\s*=\s*["'`]([^"'`]+)["'`]|V\s*=\s*["'`](https?:\/\/[^"'`]+)["'`]/g;
let match;
while ((match = regex.exec(text)) !== null) {
  console.log('Match for V:', match[0]);
}

// Search for raw.githubusercontent or aitmpl
const rawMatches = [...text.matchAll(/(https:\/\/raw\.githubusercontent\.com\/[^\s"'`]+)/g)];
for (const rm of rawMatches) {
  console.log('Raw github URL:', rm[0]);
}
