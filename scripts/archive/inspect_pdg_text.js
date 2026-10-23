import fs from 'node:fs';

const html1 = fs.readFileSync('scripts/phandonggiang.html', 'utf-8');

// Strip html tags and see what text is in phandonggiang
const text = html1.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
                 .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
                 .replace(/<[^>]+>/g, ' ')
                 .replace(/\s+/g, ' ')
                 .trim();

fs.writeFileSync('scripts/pdg_text.txt', text, 'utf-8');
console.log('PDG plain text length:', text.length);
console.log('Sample text:', text.slice(0, 1500));
