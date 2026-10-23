import fs from 'node:fs';

async function fetchMcpSitemap() {
  const res = await fetch('https://mcpmarket.com/sitemap/tools-0.xml');
  const text = await res.text();
  console.log('tools-0.xml length:', text.length);
  const locs = [...text.matchAll(/<loc>(https:\/\/mcpmarket\.com\/server\/[^<]+)<\/loc>/g)].map(m => m[1]);
  console.log('Found server URLs in tools-0.xml:', locs.length);
  console.log('Sample URLs:', locs.slice(0, 10));
  fs.writeFileSync('scripts/mcp_server_urls.json', JSON.stringify(locs, null, 2));
}

fetchMcpSitemap().catch(console.error);
