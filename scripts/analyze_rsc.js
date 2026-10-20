import fs from 'node:fs';

const pdgRsc = fs.readFileSync('scripts/pdg_rsc.txt', 'utf-8');
const mcpRsc = fs.readFileSync('scripts/mcpmarket_rsc.txt', 'utf-8');

console.log('=== PDG RSC Inspection ===');
// Clean up escaped unicode and slashes
const unescapedPdg = pdgRsc.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
// Look for keywords
const pdgItems = [];
// Find titles, categories, or tool names
const pdgRegex = /"title":"([^"]+)"/g;
let m;
while ((m = pdgRegex.exec(unescapedPdg)) !== null) {
  pdgItems.push(m[1]);
}
console.log('PDG Titles found:', pdgItems);

// Check for links in PDG
const pdgHrefs = [];
const hrefRegex = /"href":"([^"]+)"/g;
while ((m = hrefRegex.exec(unescapedPdg)) !== null) {
  pdgHrefs.push(m[1]);
}
console.log('PDG Hrefs found:', [...new Set(pdgHrefs)]);

console.log('\n=== MCP Market RSC Inspection ===');
const unescapedMcp = mcpRsc.replace(/\\"/g, '"').replace(/\\\\/g, '\\');

// Look for server objects or cards
// Example: name, description, github, category, stars
const serverNames = [];
const nameRegex = /"name":"([^"]+)"/g;
while ((m = nameRegex.exec(unescapedMcp)) !== null) {
  serverNames.push(m[1]);
}
console.log('MCP Market Names count:', serverNames.length);
console.log('MCP Market Sample Names (first 25):', [...new Set(serverNames)].slice(0, 25));

// Check for github urls in MCP Market
const githubUrls = [];
const ghRegex = /https:\/\/github\.com\/[^"\\]+/g;
while ((m = ghRegex.exec(unescapedMcp)) !== null) {
  githubUrls.push(m[0]);
}
console.log('GitHub URLs count:', githubUrls.length);
console.log('Sample GitHub URLs:', [...new Set(githubUrls)].slice(0, 15));
