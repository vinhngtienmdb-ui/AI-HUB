import fs from 'node:fs';

async function fetchPdgComponents() {
  const url = 'https://phandonggiang.com/ai-templates-data/components.json';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  fs.writeFileSync('scripts/pdg_components.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log('Saved pdg_components.json');

  console.log('Keys in data:', Object.keys(data));
  for (const k of Object.keys(data)) {
    if (Array.isArray(data[k])) {
      console.log(`Key ${k}: Array of ${data[k].length} items`);
      if (data[k].length > 0) {
        console.log(`  Sample ${k}[0]:`, Object.keys(data[k][0]));
        console.log(`  Item name:`, data[k][0].name || data[k][0].title || data[k][0].id);
      }
    } else if (typeof data[k] === 'object' && data[k] !== null) {
      console.log(`Key ${k}: Object with keys:`, Object.keys(data[k]));
    }
  }
}

fetchPdgComponents().catch(console.error);
