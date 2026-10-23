import fs from 'node:fs';

const html1 = fs.readFileSync('scripts/phandonggiang.html', 'utf-8');
const html2 = fs.readFileSync('scripts/mcpmarket.html', 'utf-8');

console.log('=== PHANDONGGIANG.COM ANALYSIS ===');
// Search for embedded JSON or data
const scripts1 = [...html1.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Found script tags count:', scripts1.length);
for (const s of scripts1) {
  if (s[0].includes('__NEXT_DATA__') || s[0].includes('application/json')) {
    console.log('Found JSON script tag:', s[0].slice(0, 100));
    try {
      const data = JSON.parse(s[1]);
      console.log('JSON keys:', Object.keys(data));
      fs.writeFileSync('scripts/phandonggiang_data.json', JSON.stringify(data, null, 2));
      console.log('Written phandonggiang_data.json');
    } catch (e) {
      console.log('Parse error on json script');
    }
  }
}

// Search for links and cards
const links1 = [...html1.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Total links count in phandonggiang:', links1.length);
const templateLinks = links1.filter(l => l[1].includes('ai-template') || l[1].includes('/t/') || l[1].includes('/p/'));
console.log('Template links count:', templateLinks.length);
for (let i = 0; i < Math.min(10, templateLinks.length); i++) {
  console.log('  Link:', templateLinks[i][1], 'Text:', templateLinks[i][2].replace(/<[^>]+>/g, '').trim());
}

console.log('\n=== MCPMARKET.COM ANALYSIS ===');
const scripts2 = [...html2.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Found script tags count in mcpmarket:', scripts2.length);
let foundMcpData = false;
for (const s of scripts2) {
  if (s[0].includes('__NEXT_DATA__')) {
    console.log('Found __NEXT_DATA__ in mcpmarket');
    const data = JSON.parse(s[1]);
    fs.writeFileSync('scripts/mcpmarket_data.json', JSON.stringify(data, null, 2));
    foundMcpData = true;
  }
}
if (!foundMcpData) {
  // Let's check Next.js App Router chunks (self.__next_f.push)
  console.log('Checking for Next.js App Router RSC chunks...');
  const rscMatches = [...html2.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)];
  console.log('RSC chunks count:', rscMatches.length);
  // Also check for hrefs to servers
  const serverLinks = [...html2.matchAll(/href=["'](\/server\/[^"']+)["']/g)];
  console.log('Server links in mcpmarket:', serverLinks.length);
  const uniqueServers = [...new Set(serverLinks.map(m => m[1]))];
  console.log('Unique server URLs (first 15):', uniqueServers.slice(0, 15));
}
