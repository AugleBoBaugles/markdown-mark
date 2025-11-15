// index.js
const fs = require('fs');
const readline = require('readline');

const practices = JSON.parse(fs.readFileSync('best_practices.json', 'utf8'));
const agentConfig = JSON.parse(fs.readFileSync('agent.json', 'utf8'));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function format(practiceKey, level, lang) {
  const p = practices[practiceKey];
  if (!p) return `I don't have that practice. Try: ${Object.keys(practices).join(', ')}`;
  level = (level || 'INTERMEDIATE').toLowerCase();
  const title = p.title;
  const summary = p.summary;
  const example = p[`${level}_example`] || p.intermediate_example || '';
  const notes = level === 'advanced' ? (p.advanced_notes || '') : '';
  const checklist = (p.checklist || []).slice(0,3).map((c,i)=>`${i+1}. ${c}`).join('\n');
  const action = level === 'beginner' ? 'Try adding one small change to your code now.' : level === 'advanced' ? 'Add a metric and alert to observe behavior.' : 'Refactor one function/module to follow this practice.';
  return `== ${title} ==\n\nDefinition:\n${summary}\n\nWhy it matters:\n${p.summary}\n\nExample (${lang || agentConfig.default_language}):\n${example}\n\n${notes ? 'Advanced notes:\n' + notes + '\n\n' : ''}Checklist:\n${checklist}\n\nAction: ${action}\n`;
}

console.log('CodeCoach — local best-practices tutor');
console.log('Type: teach <practice> --level=<beginner|intermediate|advanced> --lang=<python|js|java>');
rl.setPrompt('> ');
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (!input) { rl.prompt(); return; }
  if (input === 'exit' || input === 'quit') return rl.close();

  const m = input.match(/^teach\s+(\w+)(.*)$/i);
  if (!m) { console.log("Use: teach <practice> --level=<level> --lang=<lang>"); rl.prompt(); return; }

  const key = m[1];
  const rest = m[2];
  const levelMatch = rest.match(/--level=(\w+)/i);
  const langMatch = rest.match(/--lang=(\w+)/i);
  const level = levelMatch ? levelMatch[1] : 'INTERMEDIATE';
  const lang = langMatch ? langMatch[1] : agentConfig.default_language;
  console.log(format(key, level, lang));
  rl.prompt();
});

rl.on('close', () => { console.log('bye'); process.exit(0); });
