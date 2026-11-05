<h1 align="center">Mobile Gesture Design</h1>

<p align="center">
  <em>The operating system's conventions are the bar. The app adapts to them, never the other way round.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-111111?style=flat-square" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android-111111?style=flat-square" alt="iOS and Android">
  <img src="https://img.shields.io/badge/works%20with-30%2B%20agents-111111?style=flat-square" alt="Works with 30+ agents">
</p>

---

A skill for AI coding agents that designs, reviews and implements mobile touch and swipe
interactions: familiar, predictable, accessible, and right for both iOS and Android, in any stack
(SwiftUI, UIKit, Android Views, Jetpack Compose, React Native, Flutter, Kotlin Multiplatform, web
views).

## Before / after

You ask for swipe-to-delete on a list inside a horizontally paged screen.

Without the skill, the agent wires a custom horizontal recognizer across the whole row and fires
the delete when the swipe ends. It now fights Android's edge Back on both sides, steals the
page swipe, deletes on an accidental partial swipe while scrolling, and has no button for
VoiceOver or TalkBack users.

With it, the agent classifies the gesture as Tier 2, uses the platform's swipe-actions
component, reveals the action on the first swipe and asks for a tap to delete, adds undo, keeps
the leading edge free for Back, decides which container owns the touch, and adds the same delete
to an overflow menu. Then it lists the device tests that prove each of those.

## How it works

Every proposed gesture lands in one tier before anything is designed:

| Tier | What it is | It needs |
|---|---|---|
| 1 | Standard: scroll, paging, system Back, pull to refresh, drag, pinch, long press | the conventional behavior |
| 2 | Contextual: row actions, swipe to dismiss, tab swipes, carousels, reorder | justification and a visible alternative |
| 3 | Custom: multi-finger shortcuts, diagonal swipes, hidden or edge gestures | a written reason, usability testing, a conflict analysis |

Then a fixed run: the goal, the surface, the simplest familiar gesture, what the platform
reserves, what competes for the touch, recognition, feedback, recovery, alternatives, real-device
tests, and official sources for every version-sensitive claim.

Never on the table: an essential action that is gesture-only, overriding system navigation, a
vertical scroll hijacked by a diagonal touch, and thresholds the platform docs never gave.

## The prompt

The skill is one prompt: [`skills/mobile-gesture-design/SKILL.md`](skills/mobile-gesture-design/SKILL.md),
with its official sources in [`references/platform-sources.md`](skills/mobile-gesture-design/references/platform-sources.md).
The compact version, for agents that read a rules file, is [`AGENTS.md`](AGENTS.md). Everything
else in this repo loads one of those two into a different agent.

## Install

`ferakpeter/mobile-gesture-skill` is the GitHub repository this folder is published as.

**Claude Code**, as two separate prompts:

```
/plugin marketplace add ferakpeter/mobile-gesture-skill
```
```
/plugin install mobile-gesture-design@mobile-gesture-design
```

**Codex:**

```bash
codex plugin marketplace add ferakpeter/mobile-gesture-skill
codex plugin add mobile-gesture-design@mobile-gesture-design
```

**Gemini CLI:**

```bash
gemini extensions install https://github.com/ferakpeter/mobile-gesture-skill
```

**Any other agent:** copy [`AGENTS.md`](AGENTS.md) into your project, or ask your agent to install
[`skills/mobile-gesture-design/SKILL.md`](skills/mobile-gesture-design/SKILL.md) as a skill. Step
by step for Copilot, Cursor, Kiro, Devin, Kimi, Qoder, Grok, Goose, Hermes, Pi, OpenClaw and the
rest: **[INSTALL.md](INSTALL.md)**. Which file serves which agent:
[docs/agent-portability.md](docs/agent-portability.md).

## Use it

Ask in plain words. The skill answers in a fixed order: recommendation, tier, expected behavior,
iOS, Android, conflicts, accessibility, implementation notes, test cases, sources.

- "Design the swipe actions for this inbox list."
- "Review this screen's gestures for conflicts with system Back."
- "Should this carousel or a tab swipe handle these pages?"
- "Implement pull to refresh in Compose for this feed."

## Contributing

Edit the two sources, `SKILL.md` and `AGENTS.md`, never a copy. Then:

```bash
node scripts/build-adapters.js            # regenerate every per-agent copy
node scripts/build-adapters.js --check    # what CI runs: fails on a stale copy or a version mismatch
```

## FAQ

**Does it run anything on my machine?**
No. No hooks, no scripts at runtime: instructions and one skill. Node is only for regenerating
the adapters.

**Does it know the newest OS release?**
It knows where to look. Version-sensitive claims are checked against the official Apple and
Android pages in `references/platform-sources.md`, with the date checked.

**What if I really need a three-finger diagonal swipe?**
Tier 3. Write down why a button will not do, test it with users, and keep the button anyway.
