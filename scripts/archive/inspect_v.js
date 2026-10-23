import fs from 'node:fs';

const text = fs.readFileSync('scripts/pdg_page_chunk.js', 'utf-8');

// Find declaration of V
const vIndex = text.indexOf('/vi/manifest.json');
console.log('Context around /vi/manifest.json:');
console.log(text.slice(Math.max(0, vIndex - 200), vIndex + 200));
