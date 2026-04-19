# Colleague Training Guide — Implementation Plan

**Branch:** `colleague-training-update`
**Worktree:** `/Users/brandonstanford/Projects D/claude-code-guide-colleague-training`
**Base:** `main` @ `17dff2b`
**Created:** 2026-04-17

## Goal

Transform the existing single-page Claude Code guide into a **multi-page training reference site** for Brandon's Accenture colleagues. Dual-purpose:

1. **Reference site** — the URL Brandon sends after the session; colleagues come back to it.
2. **Live demo script** — a dedicated `/demo` page Brandon can screen-share during the session.

Audience: senior EMs / consultants at Accenture Strategy. Smart, non-SWE, business-minded. Educational tone, jargon defined on first use.

## Decisions locked (2026-04-17)

| # | Decision | Chosen |
|---|---|---|
| D1 | Who executes | **Claude (inline)** — deviation from workspace rule default accepted; task shape favors tight content/voice coherence over Codex handoff |
| D2 | Tier C scope | **Committed** — all 20 pages ship; sidebar renders all entries as live from the start |

`lib/nav.ts` still gets the `status` field defensively — if a page slips during incremental deploy, sidebar shows "coming soon" instead of 404.

## Design principles

| Principle | What it means |
|---|---|
| Keep visual language | Dark (#0a0a0a) + teal (#75d6d6) + Inter/Space Grotesk/JetBrains Mono + glass cards + scroll reveal. Already distinctive; don't rebuild. |
| Tables > prose for actionable data | Per Brandon's feedback rule. |
| Define jargon on first use | No assumed terms (hook, MCP, middleware, regex, webhook). |
| Surgical additions | Reuse existing components (Section, CodeBlock, TipCard, MistakeCard, Badge, BulletList). Extract them first, then extend. |
| Progressive disclosure | Tier A (must-know) → B (power user) → C (advanced). Sidebar grouping reflects this. |
| Truth over memory | Every claim about Claude Code features verified against current `code.claude.com/docs/*` before writing. No stale info (e.g., the old `think hard` ladder). |
| Minimum content density per page | **≥3 concrete examples OR ≥2 tables OR ≥1 worked walkthrough.** Pages below this floor get merged into neighbors — 10 thick pages beat 20 thin ones. |
| "Last validated" timestamps on feature-citing pages | `/demo`, `/thinking-controls`, `/slash-commands`, `/mcp-servers`, `/skills`, `/hooks`, `/subagents`, `/worktrees`, `/automation`, `/cost-plans` all carry a `last validated: YYYY-MM-DD` badge. If >30 days, render a dim banner: "verify against current docs before relying on specifics." |

## Sitemap

### Home
| Route | Purpose |
|---|---|
| `/` | Hero, 3-tier TOC, start-here CTA, "what you'll learn" |

### Tier A — Day 1 (5 pages)
| Route | Purpose |
|---|---|
| `/install` | Prereqs (Node 18+), `npm i -g @anthropic-ai/claude-code`, **Desktop app** install & UI tour, when to use app vs terminal, Pro vs Max pricing |
| `/first-session` | First prompt, `@file` references, paste screenshots, `Esc` to interrupt, `/rewind` & checkpoints, `Ctrl+G` to edit plan in text editor |
| `/permissions` | Default prompts → Auto mode (`--permission-mode auto`) → `/permissions` allowlist → `/sandbox` OS isolation. "Will it break my stuff?" early. |
| `/claude-md` | Brandon's real Projects D CLAUDE.md, redacted + annotated block-by-block. Why each section earns its keep. `@path/to/import` syntax. When to use `./CLAUDE.local.md` (gitignored personal notes). |
| `/day-1-wins` | **5 Monday-morning use cases for consultants**, each with a copy-pasteable prompt and expected output: (1) Research synthesis from a folder of PDFs, (2) Deck cleanup / PPT critique, (3) Meeting transcript → action items, (4) Excel surgery, (5) Email triage / summarize inbox |

### Tier B — Week 2 (7 pages)
| Route | Purpose |
|---|---|
| `/reference-files` | `.claude/rules/*.md`, `.claude/docs/*.md`, conditional context pattern. Why splitting beats one giant CLAUDE.md. |
| `/slash-commands` | The 15 most useful: `/help`, `/clear`, `/compact`, `/cost`, `/effort`, `/rewind`, `/btw`, `/plan`, `/resume`, `/agents`, `/powerup`, `/loop`, `/config`, `/rename`, `/sandbox`. Plus custom `.claude/commands/*.md` pattern. |
| `/memory` | The `MEMORY.md` index + topic file pattern. User/feedback/project/reference types. Why *your* Claude knows you and theirs doesn't — yet. |
| `/thinking-controls` | **The corrected story.** Adaptive reasoning by default on Opus 4.7 / Sonnet 4.6. `/effort` is the primary control. `ultrathink` = "reason more this turn" nudge (not a budget). `Option+T` toggle. `think/think hard` are just words now. Plan mode (Shift+Tab cycle) vs `ultrathink` vs Ultraplan disambiguation table. |
| `/mcp-servers` | What MCP is in plain terms ("USB-C for Claude → external tools"). Top consultant integrations: Supabase, GitHub, Gmail, Slack, Obsidian, Google Drive. `claude mcp add`. |
| `/git-integration` | `gh` CLI synergy. Commit/PR flow. `claude --from-pr 123` to resume a PR conversation. `/rewind` vs `git` (checkpoints ≠ version control). |
| `/cost-plans` | Pro ($20) vs Max ($100/$200). Context hygiene = $. Headless mode (`claude -p`) for scripts. Verbose toggle (`Ctrl+O`). Status line for context usage. |

### Tier C — Power user (5 pages)
| Route | Purpose |
|---|---|
| `/skills` | SKILL.md anatomy (frontmatter: `name`, `description`, `disable-model-invocation`), `.claude/skills/<name>/SKILL.md`. When to build one. `$ARGUMENTS` substitution. Worked example: "write me a skill that generates a weekly status update from Obsidian notes." |
| `/hooks` | PreToolUse, PostToolUse, Stop, Notification events. Non-advisory (guaranteed to fire). Worked examples: desktop notification when Claude needs input (macOS/Linux/Windows tabs); block writes to `migrations/`. `/hooks` command to browse. |
| `/subagents` | `/agents` menu. `.claude/agents/<name>.md` with `tools`, `model`, `description` frontmatter. `isolation: worktree` for parallel agents. Writer/Reviewer pattern. Fan-out across files. |
| `/worktrees` | `claude --worktree <name>` (built-in, lands at `.claude/worktrees/<name>`). `.worktreeinclude` for env files. Desktop app parallel sessions. Writer/Reviewer without branch pollution. |
| `/automation` | Headless (`claude -p`) pipelines. `--output-format json\|stream-json`. `--allowedTools` for unattended runs. Scheduling: Routines (Anthropic-hosted), Desktop scheduled tasks, GitHub Actions, `/loop` (in-session). Use-a-Claude-as-a-linter pattern. |

### Reference
| Route | Purpose |
|---|---|
| `/tips-mistakes` | Consolidated tips (expand current 6 TipCards + 6 MistakeCards). Add: kitchen-sink session, correcting over and over, over-specified CLAUDE.md, trust-then-verify gap, infinite exploration. |
| `/demo` | **Live walkthrough script for Brandon.** Timed (30-min session), copy-pasteable prompts, checkpoints, "if they ask X, show Y." Not a teaching doc — a screenplay. |
| `/resources` | Official docs, GitHub, Discord, upgrade link, Anthropic blog |

**Total: 20 pages.**

## Component architecture

### Reuse (extract from current `app/page.tsx` into `components/`)
- `Section` — expandable numbered section
- `CodeBlock` — syntax-themed code with optional title
- `TipCard` — titled tip with teal accent bar
- `MistakeCard` — don't/do pair with red/green badges
- `Badge` — pill label
- `BulletList` — chevron-prefixed list
- `useScrollReveal` hook

### New
| Component | Purpose |
|---|---|
| `Sidebar` | Collapsible nav grouped by tier, active-page highlight. **Mobile behavior (specified):** overlay drawer with semi-opaque backdrop, triggered by hamburger in `TopNav`. Dismisses on backdrop click, Esc key, and nav-link click. Body `overflow: hidden` while open (scroll-lock). Width 280px, slides in from left with 200ms ease-out. Breakpoint: <768px. |
| `TopNav` | Brand, GitHub link, "by Brandon Stanford". Keep current styling. |
| `PageHeader` | Tier badge + page title + subtitle (reused across all inner pages) |
| `TierBadge` | A/B/C chip with tier-specific color tint |
| `DemoStep` | Numbered walkthrough step: timing + prompt + expected output + "if they ask" branch |
| `Callout` | `info` / `warn` / `tip` variants with icon + accent bar |
| `DefinitionBox` | "What it is / Why it matters / Example" pattern for jargon |
| `CompareTable` | Before/after or old/new mental-model comparison |

## File structure

```
app/
├── layout.tsx                    # shared: Sidebar + TopNav + main
├── page.tsx                      # home (simplified: hero + TOC + CTA)
├── globals.css                   # existing + sidebar + mobile drawer styles
├── install/page.tsx
├── first-session/page.tsx
├── permissions/page.tsx
├── claude-md/page.tsx
├── day-1-wins/page.tsx
├── reference-files/page.tsx
├── slash-commands/page.tsx
├── memory/page.tsx
├── thinking-controls/page.tsx
├── mcp-servers/page.tsx
├── git-integration/page.tsx
├── cost-plans/page.tsx
├── skills/page.tsx
├── hooks/page.tsx
├── subagents/page.tsx
├── worktrees/page.tsx
├── automation/page.tsx
├── tips-mistakes/page.tsx
├── demo/page.tsx
└── resources/page.tsx

components/
├── sidebar.tsx                   # nav tree + mobile drawer
├── top-nav.tsx
├── page-header.tsx
├── tier-badge.tsx
├── demo-step.tsx
├── callout.tsx
├── definition-box.tsx
├── compare-table.tsx
├── code-block.tsx                # extracted
├── section.tsx                   # extracted
├── tip-card.tsx                  # extracted
├── mistake-card.tsx              # extracted
├── bullet-list.tsx               # extracted
├── badge.tsx                     # extracted
└── hooks/use-scroll-reveal.ts    # extracted

lib/
└── nav.ts                        # nav tree data (title, route, tier) — single source of truth

public/
└── og-image.png                  # existing
```

## Execution phases

Each phase's **verify** step runs: `npm run build`, `npm run lint`, route `curl -sf` loop, **DevTools mobile viewport (375px) check for pages touched this phase**, content-density audit (≥3 examples / ≥2 tables / ≥1 walkthrough per new page).

### Phase 1: Scaffolding (~2h)
- [ ] Install deps in worktree (`npm i`)
- [ ] Extract 7 reusable components + hook from `app/page.tsx` into `components/`
- [ ] Create `lib/nav.ts` with full nav tree + per-route `status: 'live' | 'coming-soon'` field (resolves D2 without changing the tree later)
- [ ] Lock down palette: add tier color tokens (A=gold, B=sage, C=slate, Reference=navy) to Tailwind `@theme` in `globals.css`
- [ ] Build `Sidebar` component (desktop fixed-left, mobile overlay drawer per spec above)
- [ ] Build backdrop, hamburger, Esc-to-close handlers
- [ ] Update `app/layout.tsx` to include Sidebar + TopNav wrapping `{children}`
- [ ] Simplify current `app/page.tsx` to be the new home (hero + TOC + CTA)
- [ ] Build new components: `PageHeader`, `TierBadge`, `Callout`, `DefinitionBox`, `CompareTable`, `DemoStep`
- [ ] **Verify:** build passes, lint clean, dev server shows home with sidebar, mobile drawer opens/closes/dismisses correctly, scroll-lock works

### Phase 2: Tier A content (~3h)
- [ ] `/install` — terminal install, desktop app section with screenshots placeholder
- [ ] `/first-session` — first prompt walk, permission model intro, @file refs, `/rewind`, paste screenshots
- [ ] `/permissions` — 4-tier safety model (default prompts → Auto mode → allowlist → sandbox)
- [ ] `/claude-md` — **biggest page** — embed real CLAUDE.md (redacted per list in Risks section), annotate each block
- [ ] `/day-1-wins` — 5 use cases with copy-pasteable prompts + expected outputs
- [ ] **Verify:** all 5 routes render, no console errors, sidebar highlights correctly, mobile viewport passes on each, content-density floor met

### Phase 3: Tier B content (~3h)
- [ ] 7 pages at ~25min each
- [ ] **Verify:** all 12 routes (home + A + B) work, build passes, mobile passes on 7 new pages, content-density floor met

### Phase 4: Tier C content (~2.5h)
- [ ] 5 pages at ~30min each
- [ ] **Verify:** all 17 routes work, mobile passes on 5 new pages, content-density floor met

### Phase 5: Reference + demo (~1.5h)
- [ ] `/tips-mistakes` — consolidated, refreshed
- [ ] `/demo` — live walkthrough script + "last validated: YYYY-MM-DD" badge + 30-day-staleness banner
- [ ] `/resources` — external links
- [ ] **Verify:** all 20 routes work, mobile passes, content-density floor met

### Phase 6: Polish + deploy (~1h)
- [ ] Per-page metadata (OG titles, descriptions — one OG image shared for now, per-page OG is post-launch)
- [ ] Full-site mobile sweep (not just new-this-phase)
- [ ] Prefers-reduced-motion respect
- [ ] Accessibility spot-check: keyboard nav through sidebar + expandable sections, color contrast on tier badges
- [ ] `npm run build` clean
- [ ] `npm run lint` clean
- [ ] Commit + push → Vercel preview URL
- [ ] Spot-check deployed preview on mobile + desktop

**Total estimate: ~13h focused work. Realistic across 3-4 sessions.**

## E2E verification table

| # | Check | Command | Expected |
|---|---|---|---|
| 1 | Deps install | `cd <worktree> && npm install` | Completes, no errors |
| 2 | Dev server boots | `npm run dev` | Starts on :3000, no compile errors |
| 3 | Home renders | `curl -s localhost:3000 \| grep "Claude Code"` | Matches |
| 4 | All 20 routes exist | Script loops through route list, `curl -sf` each | 200 on all |
| 5 | Build passes | `npm run build` | Completes, no type errors |
| 6 | Lint clean | `npm run lint` | No warnings |
| 7 | Sidebar active highlight | Manual browser check | Current route visually distinct |
| 8 | Mobile drawer | DevTools mobile viewport | Hamburger opens drawer, closes on nav |
| 9 | Deploy preview | `git push` → Vercel | Preview URL live |
| 10 | Production check | Visit preview URL | All routes work in prod build |

## Visual companion

Not needed — this is a single-project site update, not a multi-subsystem change. Mermaid diagram in this doc would be overkill. The site itself IS the visual.

## Risks

| Risk | Mitigation |
|---|---|
| Next.js 16 breaking changes | AGENTS.md warned about this. Docs verified (layouts-and-pages, project-structure) — App Router still works as expected. Will consult `node_modules/next/dist/docs/` before any non-trivial pattern. |
| Brandon's CLAUDE.md has sensitive paths/names | Redaction pass before embedding. See redaction checklist below. |
| Scope creep (20 pages is a lot) | Can ship after Tier A (Phase 1+2), add B/C iteratively. Each phase independently deployable. |
| Claims about Claude Code features go stale | Every factual claim cross-checked against current `code.claude.com/docs/*`. No memory-only facts. |
| Live demo page tied to a moment in time | Call it out explicitly on the page: "snapshot of April 2026 features, update before each session." |

## CLAUDE.md redaction checklist

Applied before embedding `Projects D/CLAUDE.md` in `/claude-md` page.

**Strip:**
- Absolute paths containing `/Users/brandonstanford/` → replace with `~/Projects/` or `<workspace>/`
- References to specific family members (Tiffany, Bailey) if any appear — currently none in CLAUDE.md itself, but verify
- Specific project commit SHAs
- Internal project names Brandon prefers to keep private (none flagged yet — confirm before embed)

**Keep:**
- Working Agreements / Meticulousness Protocol (the reason this example exists)
- Stack Reference tables
- Planning Mode Routing (educational value)
- Visual Companions rules
- Session End handler reference
- Workspace Structure (shows a real layout, not an abstract one)
- Conditional Context table

**Before embed, show the redacted draft to Brandon for approval.** The page teaches by example — false confidence in the redaction is worse than a delay.

## Open questions for Brandon

| # | Question | Default if no answer |
|---|---|---|
| 1 | Deploy-as-you-go or all-at-once? | **As-you-go.** Ship Tier A to Vercel preview after Phase 2, iterate from there. |
| 2 | Is the guide public or colleague-only? | **Public.** Current site is already live. Keeping it public unless told otherwise. |
| 3 | Tone: "insider tips" or "neutral reference"? | **Insider tips.** Current site already has that voice ("Tips from Heavy Use"). |
| 4 | Anything sensitive in your CLAUDE.md? | Will do a redaction pass and show you before it goes live. |
| 5 | Screenshots of desktop app — record fresh or use placeholder? | **Placeholder first, real screenshots in Phase 6 polish.** |

## Execution strategy

**No agent teams.** This is a focused site rebuild with tight content coherence — better handled inline by one model with full context on voice, design language, and Brandon's CLAUDE.md.

**Claude executes inline** (D1 locked). I write each phase, verify via `npm run build` + `npm run lint` + route check + mobile viewport + content-density audit. No agent dispatch.

Phase 1 (scaffolding) blocks everything else. Phases 2-5 can happen in any order within each phase, but tiers should be completed before moving to the next.

## Acceptance criteria (ship-readiness gate)

- [ ] All 20 pages render with no console errors (or Tier C renders "coming soon" if D2 resolved aspirational)
- [ ] Sidebar shows current page highlighted
- [ ] Mobile drawer: opens, dismisses on backdrop/Esc/nav-click, scroll-locks body
- [ ] `npm run build` + `npm run lint` both clean
- [ ] Every new page meets content-density floor (≥3 examples / ≥2 tables / ≥1 walkthrough)
- [ ] Feature-citing pages carry a "last validated: YYYY-MM-DD" badge
- [ ] Brandon's CLAUDE.md embedded with redaction per checklist, annotations reviewed by him
- [ ] 5 Day-1 use cases have copy-pasteable prompts Brandon has tested
- [ ] `/demo` page is a usable screenplay (Brandon can read it during session without improvising)
- [ ] `/thinking-controls` reflects adaptive reasoning reality — no old `think hard` ladder
- [ ] Every documented feature exists in current docs (spot-checked against `code.claude.com`)
- [ ] Keyboard nav works through sidebar + expandable sections
- [ ] Color contrast on tier badges meets WCAG AA (4.5:1 for text)
- [ ] Vercel preview URL deployed and tested on mobile + desktop
