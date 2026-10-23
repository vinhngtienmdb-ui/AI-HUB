import fs from 'node:fs';

const html1 = fs.readFileSync('scripts/phandonggiang.html', 'utf-8');

// Look for headings and paragraphs
console.log('--- Headings and texts in phandonggiang.html ---');
const matches = [...html1.matchAll(/<(h[1-6]|p|div|span|button|a)\b[^>]*class=["']([^"']*)["'][^>]*>([\s\S]*?)<\/\1>/gi)];
console.log('Matches with classes:', matches.length);

// Let's search for interesting keywords like "Agent", "Skill", "Claude", "Công cụ", "Template"
const lines = html1.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('Claude') || line.includes('Agent') || line.includes('Skill') || line.includes('Template') || line.includes('MCP') || line.includes('prompt')) {
    console.log(`Line ${i}:`, line.trim().slice(0, 150));
  }
}
