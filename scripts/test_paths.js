import fs from 'node:fs';

const pdg = JSON.parse(fs.readFileSync('scripts/pdg_components.json', 'utf-8'));
for (const key of ['agents', 'mcps', 'skills', 'commands', 'hooks']) {
  const item = pdg[key][0];
  console.log(`${key}[0] name: ${item.name}, path: ${item.path}`);
}
