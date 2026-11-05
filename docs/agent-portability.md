# Agent Portability

This repo is one skill distributed to many agents. The skill in `skills/mobile-gesture-design/`
holds the behavior; every host-specific file is a thin adapter that loads it.

## Two sources, everything else generated or pointed

| Source | What it is | Who reads it |
|---|---|---|
| `skills/mobile-gesture-design/SKILL.md` and `references/` | the full skill | every skill-capable host, through its manifest |
| `AGENTS.md` | the compact always-on rules: house rules, the tier summary, Never | every instruction-only host, directly or through a copy |

`node scripts/build-adapters.js` writes the copies. `--check` writes nothing and fails when a copy
is stale or the manifest versions disagree; CI runs it on every push and pull request.

| Generated file | Source |
|---|---|
| `.cursor/rules/mobile-gesture-design.mdc` | `AGENTS.md` plus Cursor frontmatter |
| `.windsurf/rules/mobile-gesture-design.md` | `AGENTS.md` |
| `.clinerules/mobile-gesture-design.md` | `AGENTS.md` |
| `.agents/rules/mobile-gesture-design.md` | `AGENTS.md` |
| `.qoder/rules/mobile-gesture-design.md` | `AGENTS.md` |
| `.github/copilot-instructions.md` | `AGENTS.md` |
| `.kiro/steering/mobile-gesture-design.md` | `AGENTS.md` plus Kiro frontmatter |
| `.openclaw/skills/mobile-gesture-design/` | the skill, with a one-line description |

## Supported adapters

| Host | Files | Tier |
|---|---|---|
| Claude Code, CodeBuddy | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/` | skill |
| Codex | `.codex-plugin/plugin.json`, `skills/`; `AGENTS.md` | skill, instruction |
| GitHub Copilot CLI | `.github/plugin/`, `skills/`; `AGENTS.md`, `.github/copilot-instructions.md` | skill, instruction |
| Gemini CLI, Qwen Code | `gemini-extension.json` (`contextFileName: AGENTS.md`), `skills/` | skill, instruction |
| Devin CLI | `.devin-plugin/plugin.json`, `skills/` | skill |
| Kimi Code | `.kimi-plugin/plugin.json` (`systemPromptPath: AGENTS.md`), `skills/` | skill, instruction |
| Qoder | `.qoder-plugin/plugin.json`, `.qoder/rules/`, `skills/`, `AGENTS.md` | skill, instruction |
| Grok Build | root `plugin.json`, `.grok-plugin/marketplace.json`, `skills/` | skill |
| Antigravity CLI | root `plugin.json`, `skills/`; `AGENTS.md`, `.agents/rules/` | skill, instruction |
| Goose | root `plugin.json`, `skills/`, `AGENTS.md` | skill, instruction |
| Hermes Agent | `plugin.yaml`, `__init__.py`, `skills/` | skill |
| Pi, Oh My Pi | `package.json` (`pi.skills`), `.claude-plugin/marketplace.json` | skill |
| OpenClaw | `.openclaw/skills/` | skill |
| Skills CLI | `skills/` | skill |
| OpenCode, Kilo Code | `AGENTS.md`; `skills/` copied to `.agents/skills/` | instruction, skill |
| Cursor | `.cursor/rules/mobile-gesture-design.mdc` | instruction |
| Windsurf | `.windsurf/rules/mobile-gesture-design.md` | instruction |
| Cline | `.clinerules/mobile-gesture-design.md`, `AGENTS.md` | instruction |
| GitHub Copilot Chat | `.github/copilot-instructions.md` | instruction |
| Kiro | `.kiro/steering/mobile-gesture-design.md`; `skills/` copied to `~/.kiro/skills/` | instruction, skill |
| Zed, Jules, Amp, CodeWhale, Junie, VS Code + Codex | `AGENTS.md` | instruction |
| Factory Droid, Freebuff, DeepSeek Harness, Muse Code, Command Code | `AGENTS.md`, `skills/` | instruction, skill |
| Generic agents | `AGENTS.md` or `skills/mobile-gesture-design/SKILL.md` | either |

## Adapter rule

Keep adapters thin. A host that supports skills points at `skills/`. A host that only reads
project instructions gets a generated copy of `AGENTS.md`, never a hand-written variant. Change
the rules in `SKILL.md` and `AGENTS.md`, then run the build.

## Releasing

Bump `version` in every file `scripts/build-adapters.js` lists in `VERSION_FILES` to the same
`X.Y.Z`, run `node scripts/build-adapters.js`, and commit the result.
