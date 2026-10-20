import fs from 'node:fs';

async function fetchChunk() {
  const url = 'https://phandonggiang.com/_next/static/chunks/app/ai-templates/page-329a207526e31523.js';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const text = await res.text();
  fs.writeFileSync('scripts/pdg_page_chunk.js', text, 'utf-8');
  console.log('Downloaded pdg_page_chunk.js, size:', text.length);

  // Search for fetch or api calls or hardcoded items
  const fetchCalls = [...text.matchAll(/fetch\(([^)]+)\)/g)];
  console.log('Fetch calls:', fetchCalls.map(f => f[1]));

  // Search for urls
  const urls = [...text.matchAll(/https?:\/\/[^\s"'`]+/g)];
  console.log('URLs in chunk:', [...new Set(urls.map(u => u[0]))]);
}

fetchChunk().catch(console.error);
