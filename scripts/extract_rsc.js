import fs from 'node:fs';

const html1 = fs.readFileSync('scripts/phandonggiang.html', 'utf-8');

// Look for RSC or script data in phandonggiang
const rscMatches1 = [...html1.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)];
console.log('RSC chunks in phandonggiang:', rscMatches1.length);

let combinedRsc = '';
for (const m of rscMatches1) {
  combinedRsc += m[1];
}
fs.writeFileSync('scripts/pdg_rsc.txt', combinedRsc);
console.log('Saved pdg_rsc.txt, size:', combinedRsc.length);

// Let's also do the same for mcpmarket RSC
const html2 = fs.readFileSync('scripts/mcpmarket.html', 'utf-8');
const rscMatches2 = [...html2.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)];
console.log('RSC chunks in mcpmarket:', rscMatches2.length);
let combinedRsc2 = '';
for (const m of rscMatches2) {
  combinedRsc2 += m[1];
}
fs.writeFileSync('scripts/mcpmarket_rsc.txt', combinedRsc2);
console.log('Saved mcpmarket_rsc.txt, size:', combinedRsc2.length);
