import fs from 'node:fs';

const code = fs.readFileSync('scripts/pdg_page_chunk.js', 'utf-8');
const ghMatches = [...code.matchAll(/https:\/\/github\.com\/[^\s"'`]+/g)];
console.log('GitHub link patterns:', ghMatches.map(m => m[0]));

// Search for how github links or repo URLs are constructed in the component detail
const repoMatches = [...code.matchAll(/github\.com\/([^\s"'`]+)/g)];
console.log('All github.com occurrences:', [...new Set(repoMatches.map(m => m[0]))]);
