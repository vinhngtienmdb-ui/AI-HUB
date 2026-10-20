import fs from 'node:fs';

async function explore() {
  console.log('Fetching phandonggiang.com/ai-templates...');
  const res1 = await fetch('https://phandonggiang.com/ai-templates', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html1 = await res1.text();
  fs.writeFileSync('scripts/phandonggiang.html', html1, 'utf-8');
  console.log('Saved phandonggiang.html, size:', html1.length);

  console.log('Fetching mcpmarket.com...');
  const res2 = await fetch('https://mcpmarket.com', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html2 = await res2.text();
  fs.writeFileSync('scripts/mcpmarket.html', html2, 'utf-8');
  console.log('Saved mcpmarket.html, size:', html2.length);
}

explore().catch(console.error);
