import fs from 'node:fs';

async function fetchViManifest() {
  const url = 'https://phandonggiang.com/ai-templates-data/vi/manifest.json';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  fs.writeFileSync('scripts/pdg_vi_manifest.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log('Saved pdg_vi_manifest.json');
  console.log('Entries count:', data.entries?.length);
  console.log('Sample entries (first 10):', data.entries?.slice(0, 10));

  // Let's test fetching one Vietnamese entry JSON
  if (data.entries && data.entries.length > 0) {
    const sampleEntry = data.entries[0]; // e.g. "skills/agent-management" or similar
    const entryUrl = `https://phandonggiang.com/ai-templates-data/vi/${sampleEntry}.json`;
    console.log('Fetching sample vi entry:', entryUrl);
    const eRes = await fetch(entryUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (eRes.ok) {
      const eData = await eRes.json();
      console.log('Sample vi entry keys:', Object.keys(eData));
      console.log('Sample vi entry name & description:', eData.name, eData.description);
    }
  }
}

fetchViManifest().catch(console.error);
