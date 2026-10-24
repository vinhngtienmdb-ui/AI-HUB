import fs from 'node:fs';

// Read PDG components
const pdg = JSON.parse(fs.readFileSync('scripts/pdg_components.json', 'utf-8'));

console.log('--- Summary of available components ---');
console.log('MCPs:', pdg.mcps?.length);
console.log('Skills:', pdg.skills?.length);
console.log('Agents:', pdg.agents?.length);
console.log('Commands:', pdg.commands?.length);
console.log('Hooks:', pdg.hooks?.length);
console.log('Templates:', pdg.templates?.length);

// Let's sample MCPs
console.log('\nTop 15 MCPs in PDG:');
for (const item of (pdg.mcps || []).slice(0, 15)) {
  console.log(`- ${item.name} (${item.category}): ${item.description?.slice(0, 60)} | Repo: ${item.repo}`);
}

// Let's sample Skills
console.log('\nTop 10 Skills in PDG:');
for (const item of (pdg.skills || []).slice(0, 10)) {
  console.log(`- ${item.name} (${item.category}): ${item.description?.slice(0, 60)} | Repo: ${item.repo}`);
}
