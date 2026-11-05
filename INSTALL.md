# Install

Pick your agent below. Not listed? Most agents read [`AGENTS.md`](AGENTS.md): copy it into your project, or ask your agent to install [`skills/mobile-gesture-design/SKILL.md`](skills/mobile-gesture-design/SKILL.md) as a skill. Which files map to which agent: [Agent portability](docs/agent-portability.md).

`<owner>/mobile-gesture-skill` below is the GitHub repository this folder is published as. Replace `<owner>` with that account.

Nothing here runs code on your machine: there are no lifecycle hooks, only instructions and one skill. No Node, Python or anything else is needed to use it.

Every install has one of two tiers:

- **Skill tier:** the agent loads the full skill, with its references, when a task is about mobile gestures.
- **Instruction tier:** the agent reads the compact rules in `AGENTS.md` or a copied rule file on every turn.

## Claude Code

```
/plugin marketplace add <owner>/mobile-gesture-skill
```
```
/plugin install mobile-gesture-design@mobile-gesture-design
```

Send them as two separate prompts. The Claude Code Desktop app's Code tab takes the same two commands, or **+** → **Plugins** → **Add plugin**. CodeBuddy reads the same Claude manifests and installs with the same two commands.

## Codex

```bash
codex plugin marketplace add <owner>/mobile-gesture-skill
codex plugin add mobile-gesture-design@mobile-gesture-design
```

Start a new thread. The same install covers the Codex desktop app after a restart. For the instruction tier only, copy `AGENTS.md` to `~/.codex/AGENTS.md`.

## GitHub Copilot CLI

```bash
copilot plugin marketplace add <owner>/mobile-gesture-skill
copilot plugin install mobile-gesture-design@mobile-gesture-design
```

Instruction tier instead: Copilot CLI reads `AGENTS.md` and `.github/copilot-instructions.md` in a project, or copy the rules into `~/.copilot/copilot-instructions.md` for every project.

## Gemini CLI

```bash
gemini extensions install https://github.com/<owner>/mobile-gesture-skill
```

Loads `AGENTS.md` as always-on context every session and ships the skill. Qwen Code installs the same extension: `qwen extensions install <owner>/mobile-gesture-skill:mobile-gesture-design`.

## Devin CLI

```bash
devin plugins install <owner>/mobile-gesture-skill
```

The skill is available as `/mobile-gesture-design:mobile-gesture-design`.

## Kimi Code

Run `/plugins install https://github.com/<owner>/mobile-gesture-skill`, then `/reload` or start a new session. `AGENTS.md` goes into the system prompt every turn, and the skill doubles as `/mobile-gesture-design`.

## Qoder

Qoder auto-loads `AGENTS.md` from the repo root, so a checkout works with zero setup. For a project, copy [`.qoder/rules/mobile-gesture-design.md`](.qoder/rules/mobile-gesture-design.md) into its `.qoder/rules/`. As a plugin: `qodercli plugins install <path-to-checkout>`.

## Grok Build

```bash
grok plugin install <owner>/mobile-gesture-skill --trust
```

Enable it (off by default) in `/plugins`, or in `~/.grok/config.toml`:

```toml
[plugins]
enabled = ["mobile-gesture-design"]
```

Start a new session and verify with `grok inspect`.

## Antigravity CLI

```bash
agy plugin install https://github.com/<owner>/mobile-gesture-skill
```

Installs the skill. For the always-on rules, copy `AGENTS.md` into your project; Antigravity reads it as workspace rules, and `.agents/rules/` works too.

## Goose

```bash
goose plugin install https://github.com/<owner>/mobile-gesture-skill.git
```

Imports the skill as `mobile-gesture-design:mobile-gesture-design`. For the always-on rules, copy `AGENTS.md` to `~/.agents/AGENTS.md` or into your project.

## Hermes Agent

```bash
hermes plugins install <owner>/mobile-gesture-skill --enable
```

If the install check refuses the manifest, clone it in by hand; Hermes loads it from `plugin.yaml`:

```bash
git clone https://github.com/<owner>/mobile-gesture-skill.git ~/.hermes/plugins/mobile-gesture-design
hermes plugins enable mobile-gesture-design
```

Restart Hermes. The skill registers as `mobile-gesture-design:mobile-gesture-design`.

## Pi agent harness and Oh My Pi

```bash
pi install git:github.com/<owner>/mobile-gesture-skill
```

Pi reads the `pi.skills` key in `package.json`. omp installs through the Claude marketplace: `omp plugin marketplace add <owner>/mobile-gesture-skill`, then `omp plugin install mobile-gesture-design@mobile-gesture-design`.

## OpenClaw

Copy [`.openclaw/skills/mobile-gesture-design`](.openclaw/skills/) into `~/.openclaw/skills/`. That copy is generated from `skills/` with a one-line description, as OpenClaw requires.

## OpenCode and Kilo Code

Both auto-load `AGENTS.md` from the project root: copy it in, or into `~/.config/kilo/AGENTS.md` for Kilo globally. For the full skill, copy `skills/mobile-gesture-design/` into `.agents/skills/` (project) or `~/.agents/skills/` (global).

## Cursor

Copy [`.cursor/rules/mobile-gesture-design.mdc`](.cursor/rules/mobile-gesture-design.mdc) into your project's `.cursor/rules/`.

## Kiro

Copy [`.kiro/steering/mobile-gesture-design.md`](.kiro/steering/mobile-gesture-design.md) to `~/.kiro/steering/` (global) or `.kiro/steering/` in your project. It is `inclusion: always`; change it to `inclusion: auto` with a `name` and `description` to load it only on gesture work. For the full skill, copy `skills/mobile-gesture-design/` into `~/.kiro/skills/`.

## Skills CLI

The [skills CLI](https://skills.sh) copies the skill into the skills folder of many agents:

```bash
npx skills add <owner>/mobile-gesture-skill
```

Pick the agent with `--agent`, and add `--global` to install for your user instead of the project. This installs the skill only; for the always-on rules, also add `AGENTS.md`.

## Other agents (rules file only)

Copy the matching file into your project:

| Agent | File |
|---|---|
| Windsurf | [`.windsurf/rules/mobile-gesture-design.md`](.windsurf/rules/mobile-gesture-design.md) |
| Cline | [`.clinerules/mobile-gesture-design.md`](.clinerules/mobile-gesture-design.md), or `~/.cline/rules/` for every project |
| GitHub Copilot Chat (VS Code, JetBrains, Visual Studio) | [`.github/copilot-instructions.md`](.github/copilot-instructions.md) |
| Antigravity IDE | [`.agents/rules/mobile-gesture-design.md`](.agents/rules/mobile-gesture-design.md), or `AGENTS.md` |
| Zed, Jules, Amp, CodeWhale, VS Code with the Codex extension | [`AGENTS.md`](AGENTS.md) at the repo root |
| JetBrains Junie | `AGENTS.md`, once pointed at in Settings → Tools → Junie → Project Settings → Guidelines Path |
| Factory Droid, Freebuff, DeepSeek Harness, Muse Code, Command Code | `AGENTS.md`, plus `skills/mobile-gesture-design/` in the agent's skills folder |

## Uninstall

| Host | Command |
|------|---------|
| Claude Code | `/plugin remove mobile-gesture-design` |
| Codex | `codex plugin remove mobile-gesture-design` |
| Devin CLI | `devin plugins remove mobile-gesture-design` |
| Grok Build | `grok plugin uninstall mobile-gesture-design` |
| Pi agent | `pi uninstall mobile-gesture-design` |
| Kimi Code | `/plugins` in Kimi Code, then remove mobile-gesture-design |
| Skills CLI | `npx skills remove mobile-gesture-design` (same `--agent` / `--global` flags as the install) |
| Rules file, `AGENTS.md`, copied skill folder | Delete the copied file or folder |

Nothing is written outside the plugin's own files, so there is nothing else to clean up.
