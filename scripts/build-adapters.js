#!/usr/bin/env node
// Writes every per-agent copy from the two sources: AGENTS.md (the compact rules) and
// skills/mobile-gesture-design/ (the full skill). --check writes nothing and exits 1
// when a copy is stale or the manifest versions disagree, so CI catches a hand edit.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKILL = 'mobile-gesture-design';
const SKILL_DIR = path.join('skills', SKILL);
const SHORT_DESCRIPTION =
  'Design, review and implement mobile touch and swipe interactions that follow iOS and Android conventions.';

const VERSION_FILES = [
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.devin-plugin/plugin.json',
  '.github/plugin/plugin.json',
  '.qoder-plugin/plugin.json',
  'gemini-extension.json',
  'package.json',
];

const read = rel => fs.readFileSync(path.join(root, rel), 'utf8').replace(/\r\n/g, '\n');
const body = text => text.replace(/^---\n[\s\S]*?\n---\n*/, '');

function outputs() {
  const rules = read('AGENTS.md').trim() + '\n';
  const files = {
    '.cursor/rules/mobile-gesture-design.mdc':
      `---\ndescription: ${SHORT_DESCRIPTION}\nglobs:\nalwaysApply: true\n---\n\n${rules}`,
    '.windsurf/rules/mobile-gesture-design.md': rules,
    '.clinerules/mobile-gesture-design.md': rules,
    '.agents/rules/mobile-gesture-design.md': rules,
    '.qoder/rules/mobile-gesture-design.md': rules,
    '.github/copilot-instructions.md': rules,
    '.kiro/steering/mobile-gesture-design.md':
      `---\ntitle: Mobile Gesture Design\ninclusion: always\n---\n\n${rules}`,
    [`.openclaw/skills/${SKILL}/SKILL.md`]:
      `---\nname: ${SKILL}\ndescription: "${SHORT_DESCRIPTION}"\n---\n\n${body(read(path.join(SKILL_DIR, 'SKILL.md')))}`,
  };
  const refs = path.join(root, SKILL_DIR, 'references');
  for (const name of fs.readdirSync(refs)) {
    files[`.openclaw/skills/${SKILL}/references/${name}`] = read(path.join(SKILL_DIR, 'references', name));
  }
  return files;
}

function versionErrors() {
  const versions = VERSION_FILES.map(rel => [rel, JSON.parse(read(rel)).version]);
  const distinct = new Set(versions.map(([, v]) => v));
  const bad = versions.filter(([, v]) => !/^\d+\.\d+\.\d+$/.test(String(v)));
  const errors = bad.map(([rel, v]) => `${rel}: version must be X.Y.Z, got ${JSON.stringify(v)}`);
  if (distinct.size > 1) {
    errors.push('versions disagree: ' + versions.map(([rel, v]) => `${v} ${rel}`).join(', '));
  }
  return errors;
}

const check = process.argv.includes('--check');
const errors = versionErrors();
for (const [rel, content] of Object.entries(outputs())) {
  const target = path.join(root, rel);
  const current = fs.existsSync(target) ? read(rel) : null;
  if (current === content) {
    continue;
  }
  if (check) {
    errors.push(`${rel} is stale: run node scripts/build-adapters.js`);
    continue;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  console.log(`wrote ${rel}`);
}

if (errors.length) {
  errors.forEach(e => console.error(e));
  process.exit(1);
}
console.log(check ? 'adapters match their sources, versions agree' : 'adapters up to date');
