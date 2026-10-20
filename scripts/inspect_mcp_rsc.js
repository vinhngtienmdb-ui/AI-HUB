import fs from 'node:fs';

const rsc = fs.readFileSync('scripts/mcpmarket_rsc.txt', 'utf-8');

// Let's search for server objects in mcpmarket RSC
// Many servers have properties like "id", "slug", "name", "description", "category", "githubUrl"
// Let's search for JSON snippets containing "github" or "slug"
const serverMatches = [...rsc.matchAll(/\{[^{}]*?"name"\s*:\s*"([^"]+)"[^{}]*?"description"\s*:\s*"([^"]+)"[^{}]*?\}/g)];
console.log('Matches with name and description:', serverMatches.length);
for (let i = 0; i < Math.min(10, serverMatches.length); i++) {
  console.log(`Server ${i}:`, serverMatches[i][1], '=>', serverMatches[i][2].slice(0, 100));
}

// Check for API endpoints in mcpmarket
const apiMatches = [...rsc.matchAll(/https?:\/\/[^\s"'`\\]+/g)];
console.log('URLs in mcpmarket RSC:', [...new Set(apiMatches.map(m => m[0]))].slice(0, 20));
