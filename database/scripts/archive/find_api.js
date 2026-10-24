import fs from 'node:fs';

const html1 = fs.readFileSync('scripts/phandonggiang.html', 'utf-8');

// Look for API endpoints, .json urls, supabase, etc.
const apiMatches = [...html1.matchAll(/(https?:\/\/[^\s"']+|\/api\/[^\s"']+)/g)];
console.log('All URLs/Endpoints found:', [...new Set(apiMatches.map(m => m[0]))]);

// Check chunks files in _next/static/chunks/
const scriptChunks = [...html1.matchAll(/src=["'](\/_next\/static\/chunks\/[^"']+)["']/g)];
console.log('Script chunks count:', scriptChunks.length);
for (const sc of scriptChunks) {
  console.log('Chunk:', sc[1]);
}
