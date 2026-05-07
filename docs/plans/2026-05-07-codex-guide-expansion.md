# Claude Code and Codex Guide Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> **For this repo:** REQUIRED EXECUTION MODE: Use superpowers:subagent-driven-development in this session. Dispatch fresh subagents for implementation and review.

**Goal:** Expand the current Claude Code colleague training site into a full dual-track guide for Claude Code and OpenAI Codex, with clear guidance for IDE use, app vs CLI tradeoffs, and product-specific workflows.

**Architecture:** Keep the current Next.js App Router site and component system. Add a product-aware navigation model, preserve existing Claude Code URLs where practical, and introduce `/codex/*` pages plus shared comparison pages for choosing between surfaces and tools. Content should stay training-oriented: short explanations, decision tables, copy-paste prompts, and consultant-friendly examples.

**Tech Stack:** Next.js 16.2.3, React 19.2.4, TypeScript, Tailwind CSS 4, existing local components, static content pages.

---

## Required Execution Model

This project should use subagents. Do not execute it as one long single-agent coding pass.

### Worktree Strategy

Use the existing worktree:

```text
/Users/brandonstanford/Projects D/claude-code-guide-colleague-training
```

Do not create a second git worktree by default. This folder is already the colleague-training worktree and is the right place for this expansion. Create an additional temporary worktree only if a later task needs risky experimental layout work that should be isolated before merge.

### Subagent Pattern

For each implementation task:

1. Controller reads the exact task text and required file ownership.
2. Controller dispatches a fresh implementer subagent.
3. Implementer edits only its assigned files, runs the required checks, and reports changed paths.
4. Controller dispatches a spec-review subagent.
5. Controller dispatches a code-quality review subagent after spec review passes.
6. Implementer fixes any review findings before the next task begins.

### Parallelism Rules

Use parallel subagents only when write sets are disjoint.

Safe parallel lanes:

| Lane | Ownership | Can run parallel with |
| --- | --- | --- |
| Navigation/Layout | `lib/nav.ts`, `components/sidebar.tsx`, `components/top-nav.tsx`, `app/layout.tsx` | No other lane touching nav/layout. |
| Shared Pages | `app/choose`, `app/app-vs-cli`, `app/ide-setup`, `app/agent-files` | Codex pages after comparison components exist. |
| Claude Updates | Existing Claude pages and `app/claude-ide` | Codex pages, if nav is stable. |
| Codex Day 1 | `app/codex`, `app/codex/install`, `app/codex/cli`, `app/codex/app`, `app/codex/ide`, `app/codex/first-session`, `app/codex/approvals-sandbox` | Codex Week 2 only after shared Codex components are stable. |
| Codex Week 2 | `app/codex/web-cloud`, `app/codex/agents-md`, `app/codex/config`, `app/codex/mcp-connectors`, `app/codex/git-github` | Codex Power User, if shared imports are stable. |
| Codex Power User | `app/codex/skills`, `app/codex/subagents`, `app/codex/worktrees`, `app/codex/automations`, `app/codex/computer-use`, `app/codex/cost-plans`, `app/codex/tips-mistakes`, `app/codex/demo` | Codex Week 2, if shared imports are stable. |
| Mockups/Screenshots | `components/codex-*.tsx`, `public/screenshots/codex-*`, screenshot usage inside Codex pages | Content pages only if component API is agreed first. |
| Verification | `scripts/check-routes.mjs`, `package.json` | After route list is stable. |

Never run two implementation subagents against the same file set at the same time. Review subagents are read-only unless explicitly asked to fix a finding.

### Required Subagent Roster

Use these subagent types during execution:

| Subagent | Role | Output |
| --- | --- | --- |
| Product docs researcher | Verify current Claude Code and Codex claims against official docs. | Source notes, volatile claims, exact page recommendations. |
| IA/nav implementer | Update navigation, product grouping, metadata, and home framing. | Edited nav/layout/home files. |
| Comparison-page implementer | Build shared decision pages and comparison components. | Shared pages and reusable components. |
| Claude-track implementer | Add Claude IDE page and refresh existing app/CLI/IDE links. | Claude-specific page edits. |
| Codex Day 1 implementer | Build install, CLI, app, IDE, first session, approvals pages. | Day 1 Codex route files. |
| Codex Week 2 implementer | Build cloud, `AGENTS.md`, config, MCP, GitHub pages. | Week 2 Codex route files. |
| Codex Power User implementer | Build skills, subagents, worktrees, automations, computer-use, cost, tips, demo pages. | Power and reference Codex route files. |
| Mockup/screenshot implementer | Build HTML mockups that visually match the Claude guide style. | Codex mockup components and screenshot sections. |
| Spec reviewer | Confirm each task matches this plan exactly. | Findings only; no broad refactors. |
| Code-quality reviewer | Review maintainability, responsive UI, accessibility, and local style. | Findings only; no broad refactors. |

## Current State

- The site is route-driven through `lib/nav.ts`.
- Existing content is Claude Code oriented and organized into Day 1, Week 2, Power User, and Reference tiers.
- Existing layout components already support a durable guide: `components/site-chrome.tsx`, `components/sidebar.tsx`, `components/top-nav.tsx`, `components/page-header.tsx`, `components/compare-table.tsx`, and `components/code-block.tsx`.
- The current install page already introduces terminal vs desktop app for Claude Code, but the site does not yet have a broader "surfaces" model across CLI, app, IDE, and cloud/web.

## Product Direction

Rename the site from a narrow "Claude Code Guide" to a broader field guide. Recommended public title:

```text
AI Coding Agent Guide
```

Recommended subtitle:

```text
Claude Code and Codex, from first install to power workflows.
```

Why: this keeps Claude Code as a first-class track, adds Codex cleanly, and leaves room for future IDE or agent tooling without another rename.

## Content Information Architecture

### Shared Routes

These pages help users choose a tool or surface before diving into product-specific docs.

| Route | Purpose |
| --- | --- |
| `/` | New product selector home with Claude Code track, Codex track, and "which should I use?" CTA. |
| `/choose` | Claude Code vs Codex decision guide by job type, platform, team setting, and workflow. |
| `/app-vs-cli` | Cross-product app vs CLI vs IDE vs web/cloud comparison. |
| `/ide-setup` | How to use both tools in IDEs: VS Code, Cursor, Windsurf, JetBrains, and integrated terminal fallbacks. |
| `/agent-files` | `CLAUDE.md` vs `AGENTS.md`, project instructions, local/private notes, and how to avoid stale instructions. |
| `/demo` | Update the current demo into a dual-track live demo script. |
| `/resources` | Official docs, downloads, pricing, communities, and changelogs for both products. |

### Existing Claude Code Routes To Keep

Keep these existing routes to avoid breaking links:

- `/install`
- `/terminal`
- `/desktop-app`
- `/first-session`
- `/permissions`
- `/claude-md`
- `/day-1-wins`
- `/reference-files`
- `/slash-commands`
- `/memory`
- `/thinking-controls`
- `/mcp-servers`
- `/git-integration`
- `/cost-plans`
- `/skills`
- `/hooks`
- `/subagents`
- `/worktrees`
- `/automation`
- `/tips-mistakes`

Add one new Claude-specific route:

| Route | Purpose |
| --- | --- |
| `/claude-ide` | Claude Code in IDEs: auto-install in VS Code forks, JetBrains plugin, `/ide`, selection context, diagnostics, IDE diff viewer. |

### New Codex Routes

Use `/codex/*` so Codex grows into a full guide without colliding with current Claude Code URLs.

| Route | Tier | Purpose |
| --- | --- | --- |
| `/codex` | Start | Codex overview and route map. |
| `/codex/install` | Day 1 | Install CLI, app, and IDE extension; sign in; pick local vs cloud. |
| `/codex/cli` | Day 1 | Codex CLI basics, approvals, sandbox, models, slash commands, local review, web search. |
| `/codex/app` | Day 1 | Codex app for macOS/Windows, project picker, multi-agent work, worktrees, local environments. |
| `/codex/ide` | Day 1 | Codex IDE extension in VS Code, Cursor, Windsurf, and JetBrains. |
| `/codex/web-cloud` | Week 2 | Codex web/cloud tasks, GitHub connection, environments, PR creation, when cloud beats local. |
| `/codex/first-session` | Day 1 | First local task walkthrough: inspect, plan, edit, test, review diff. |
| `/codex/approvals-sandbox` | Day 1 | Approval modes, sandbox modes, command allowlists, safe unattended settings. |
| `/codex/agents-md` | Week 2 | `AGENTS.md` structure, repo instructions, OpenAI docs MCP snippet, team conventions. |
| `/codex/config` | Week 2 | `~/.codex/config.toml`, project settings, models, reasoning, tools, MCP. |
| `/codex/mcp-connectors` | Week 2 | MCP servers and connectors, including OpenAI Docs MCP, GitHub, Slack, Linear, browser/computer use. |
| `/codex/git-github` | Week 2 | PR review, `@codex` in GitHub, cloud tasks from issues/PRs, applying diffs locally. |
| `/codex/skills` | Power | Codex skills, when to create one, skill anatomy, repeatable workflows. |
| `/codex/subagents` | Power | Subagents, parallel work, reviewer/implementer patterns, delegation boundaries. |
| `/codex/worktrees` | Power | App and automation worktrees, isolation, cleanup, when not to use worktrees. |
| `/codex/automations` | Power | Recurring tasks, thread automations, standalone automations, triage inbox, risk controls. |
| `/codex/computer-use` | Power | In-app browser and computer use, local app workflows, QA walkthroughs. |
| `/codex/cost-plans` | Reference | Plan access, limits, rate-limit hygiene, team controls. |
| `/codex/tips-mistakes` | Reference | Codex-specific tips and common mistakes. |
| `/codex/demo` | Reference | Codex-only live demo script. |

## Source Validation Notes

Validate all product claims against official docs before writing final copy.

Official sources checked for this plan on 2026-05-07:

- OpenAI Codex web/cloud docs: `https://developers.openai.com/codex/cloud`
- OpenAI Codex CLI docs: `https://developers.openai.com/codex/cli`
- OpenAI Codex app docs: `https://developers.openai.com/codex/app`
- OpenAI Codex IDE docs: `https://developers.openai.com/codex/ide`
- OpenAI Codex help center overview: `https://help.openai.com/en/articles/11369540-codex-in-chatgpt`
- OpenAI Docs MCP guide: `https://developers.openai.com/learn/docs-mcp`
- Anthropic Claude Code setup docs: `https://docs.anthropic.com/en/docs/claude-code/getting-started`
- Anthropic Claude Code CLI reference: `https://docs.anthropic.com/en/docs/claude-code/cli-reference`
- Anthropic Claude Code IDE integrations: `https://docs.anthropic.com/en/docs/claude-code/ide-integrations`

Any page that cites volatile feature behavior should use `lastValidated="2026-05-07"` through `PageHeader`.

---

## HTML Mockup Screenshot Direction

The user wants screenshots similar to the Claude guide. Use polished HTML mockups first, not raw external screenshots, unless a real official image is available and clearly licensed/appropriate to reference.

Reuse the existing visual system:

- `components/app-mockup.tsx`
- `components/terminal-mockup.tsx`
- `components/screenshot.tsx`

Add Codex-specific mockup helpers only when the current primitives are not enough.

Required Codex mockup set:

| Mockup | Suggested component/page usage |
| --- | --- |
| Codex CLI session | `/codex/cli`, `/codex/first-session` |
| Codex app project picker | `/codex/app`, `/codex/install` |
| Codex app multi-agent workspace | `/codex/app`, `/codex/worktrees`, `/codex/subagents` |
| Codex IDE sidebar | `/codex/ide`, `/ide-setup` |
| Codex cloud task board | `/codex/web-cloud`, `/codex/git-github` |
| Codex PR review/diff | `/codex/git-github`, `/codex/demo` |
| Codex automation run | `/codex/automations` |
| `AGENTS.md` instruction file preview | `/agent-files`, `/codex/agents-md` |

Mockup quality requirements:

- Match the current dark/glass Claude guide style.
- Use realistic but clearly illustrative text.
- Avoid fake brand marks unless they are plain text labels.
- Keep all text readable on mobile.
- Build as responsive HTML/CSS inside React components.
- Prefer reusable primitives over one-off page markup.
- Use `figcaption` to label mockups as illustrative when they are not real product screenshots.

---

## Task 1: Read Local Next.js Guidance

**Files:**
- Read: `AGENTS.md`
- Read: `node_modules/next/dist/docs/`

**Step 1: Re-read repo instruction**

Run:

```bash
cat AGENTS.md
```

Expected: confirms that Next.js docs must be read before writing code.

**Step 2: Locate relevant Next docs**

Run:

```bash
find node_modules/next/dist/docs -maxdepth 3 -type f | rg 'app|metadata|routing|link'
```

Expected: identify local docs for App Router, metadata, and routing conventions in this installed Next version.

**Step 3: Read only relevant docs**

Read the docs needed for static App Router pages, metadata, links, and any changed conventions.

**Step 4: No commit**

This task only gathers implementation constraints.

---

## Task 2: Extend Navigation Model

**Files:**
- Modify: `lib/nav.ts`
- Modify: `components/sidebar.tsx`
- Modify: `components/top-nav.tsx`
- Modify: `components/tier-badge.tsx`

**Step 1: Add product-aware route types**

Update `lib/nav.ts` so routes can be grouped by product:

```ts
export type Product = 'shared' | 'claude' | 'codex';
export type Tier = 'home' | 'A' | 'B' | 'C' | 'ref';

export interface NavRoute {
  href: string;
  label: string;
  tier: Tier;
  product: Product;
  status: RouteStatus;
  subtitle?: string;
}
```

**Step 2: Add shared route group**

Add shared routes for `/choose`, `/app-vs-cli`, `/ide-setup`, and `/agent-files`.

**Step 3: Preserve existing Claude route hrefs**

Set existing routes to `product: 'claude'` without changing their paths.

**Step 4: Add Codex route groups**

Add all `/codex/*` routes listed in the sitemap above.

**Step 5: Update sidebar rendering**

Render product sections in this order:

1. Shared
2. Claude Code
3. Codex
4. Reference

Keep mobile drawer behavior unchanged.

**Step 6: Verify typecheck through build**

Run:

```bash
npm run build
```

Expected: TypeScript errors reveal every component that needs the new `product` field.

**Step 7: Commit**

```bash
git add lib/nav.ts components/sidebar.tsx components/top-nav.tsx components/tier-badge.tsx
git commit -m "feat: add product-aware guide navigation"
```

---

## Task 3: Add Comparison Components

**Files:**
- Create: `components/product-badge.tsx`
- Create: `components/surface-matrix.tsx`
- Create: `components/decision-grid.tsx`
- Modify: `components/compare-table.tsx`

**Step 1: Create `ProductBadge`**

Support `shared`, `claude`, and `codex` visual treatments without introducing a new one-note palette.

**Step 2: Create `SurfaceMatrix`**

Build a responsive table component for App vs CLI vs IDE vs Web/Cloud comparisons.

Required props:

```ts
interface SurfaceColumn {
  key: string;
  title: string;
  subtitle?: string;
}

interface SurfaceRow {
  label: string;
  values: Record<string, React.ReactNode>;
}
```

**Step 3: Create `DecisionGrid`**

Build a component for "use this when..." cards. Use existing card styling and avoid nested cards.

**Step 4: Verify mobile layout**

Run the dev server and inspect a temporary usage or Story-like page after the comparison pages are added.

**Step 5: Commit**

```bash
git add components/product-badge.tsx components/surface-matrix.tsx components/decision-grid.tsx components/compare-table.tsx
git commit -m "feat: add product comparison components"
```

---

## Task 4: Add Codex HTML Mockup Components

**Subagent ownership:** Mockup/screenshot implementer.

**Files:**
- Create: `components/codex-mockups.tsx`
- Modify: `components/app-mockup.tsx` only if a tiny reusable primitive is needed.
- Modify: `components/terminal-mockup.tsx` only if a tiny reusable primitive is needed.

**Step 1: Inventory existing mockup primitives**

Read:

```bash
sed -n '1,260p' components/app-mockup.tsx
sed -n '1,260p' components/terminal-mockup.tsx
sed -n '1,180p' components/screenshot.tsx
```

Expected: understand current Claude screenshot/mockup style before adding Codex variants.

**Step 2: Create Codex mockup helpers**

Create reusable exports:

```ts
export function CodexCliMockup() {}
export function CodexAppProjectMockup() {}
export function CodexAppAgentsMockup() {}
export function CodexIdeMockup() {}
export function CodexCloudTaskMockup() {}
export function CodexPrReviewMockup() {}
export function CodexAutomationMockup() {}
export function AgentsMdPreview() {}
```

These should compose existing `AppMockup`, `AppSidebar`, `AppTabs`, `AppMain`, `AppDiff`, `TerminalMockup`, `TermLine`, and `TermPrompt` where possible.

**Step 3: Keep the mockups illustrative**

Each figure caption should make clear whether the mockup is illustrative:

```text
Illustrative Codex app mockup: parallel local agents across project worktrees
```

**Step 4: Verify mobile behavior**

Temporarily render each mockup on one Codex page while developing, then inspect at 375px width. Text must not overlap or overflow except inside intentional horizontal code scrolling.

**Step 5: Commit**

```bash
git add components/codex-mockups.tsx components/app-mockup.tsx components/terminal-mockup.tsx
git commit -m "feat: add Codex HTML mockup components"
```

---

## Task 5: Rebrand Home And Metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `components/top-nav.tsx`

**Step 1: Update metadata**

Change default title to:

```text
AI Coding Agent Guide
```

Description:

```text
A practical guide to Claude Code and OpenAI Codex across CLI, desktop app, IDE, and cloud workflows.
```

**Step 2: Rewrite home page hero**

Home page should immediately show two tracks:

- Claude Code: "best when you want a mature terminal-first Claude workflow"
- Codex: "best when you want OpenAI's local, IDE, app, and cloud coding agent workflows"

**Step 3: Add start choices**

Primary CTAs:

- "Start with Claude Code" -> `/install`
- "Start with Codex" -> `/codex/install`
- "Help me choose" -> `/choose`

**Step 4: Add a surfaces preview**

Use a compact matrix showing:

- Terminal/CLI
- Desktop app
- IDE extension
- Web/cloud

**Step 5: Verify**

Run:

```bash
npm run lint
npm run build
```

Expected: clean lint and successful static build.

**Step 6: Commit**

```bash
git add app/layout.tsx app/page.tsx components/top-nav.tsx
git commit -m "feat: rebrand guide for Claude Code and Codex"
```

---

## Task 6: Build Shared Decision Pages

**Files:**
- Create: `app/choose/page.tsx`
- Create: `app/app-vs-cli/page.tsx`
- Create: `app/ide-setup/page.tsx`
- Create: `app/agent-files/page.tsx`

**Step 1: Create `/choose`**

Include:

- Product decision table.
- "Start here if..." examples.
- Consultant workflows: deck/data/docs vs software repo vs automation.
- Clear caveat that users can use both.

**Step 2: Create `/app-vs-cli`**

Compare surfaces:

- Claude terminal
- Claude desktop app
- Claude IDE integration
- Codex CLI
- Codex app
- Codex IDE extension
- Codex web/cloud

Required table rows:

- Best for
- Setup effort
- Works offline with files
- Runs commands locally
- Cloud/background work
- Visual diffs
- Parallel tasks
- Automation suitability
- Risk profile

**Step 3: Create `/ide-setup`**

Cover both products:

- Claude Code: run `claude` in integrated terminal, extension auto-install for VS Code forks, JetBrains plugin, `/ide` for external terminals.
- Codex: install extension for VS Code/Cursor/Windsurf/JetBrains, sign in, use sidebar, delegate cloud tasks where appropriate.
- Fallback: run each CLI inside the IDE terminal.

**Step 4: Create `/agent-files`**

Compare:

- `CLAUDE.md`
- `AGENTS.md`
- `~/.claude/*`
- `~/.codex/config.toml`
- project-local private files

Include a "do not overfit the instruction file" warning.

**Step 5: Verify all shared routes**

Run:

```bash
npm run build
for route in /choose /app-vs-cli /ide-setup /agent-files; do curl -sf "http://localhost:3000$route" >/dev/null; done
```

Expected: build passes and each route returns 200 when dev server is running.

**Step 6: Commit**

```bash
git add app/choose/page.tsx app/app-vs-cli/page.tsx app/ide-setup/page.tsx app/agent-files/page.tsx
git commit -m "feat: add shared tool selection pages"
```

---

## Task 7: Update Claude Code Track

**Files:**
- Create: `app/claude-ide/page.tsx`
- Modify: `app/install/page.tsx`
- Modify: `app/terminal/page.tsx`
- Modify: `app/desktop-app/page.tsx`
- Modify: `app/automation/page.tsx`
- Modify: `app/resources/page.tsx`

**Step 1: Add `/claude-ide`**

Cover:

- VS Code, Cursor, Windsurf, VSCodium.
- JetBrains IDEs.
- Quick launch shortcuts.
- Selection context.
- IDE diff viewer.
- Diagnostics sharing.
- `/ide` command from an external terminal.

**Step 2: Split app-vs-cli content**

Keep Claude-specific terminal vs desktop details on `/install`, but link to `/app-vs-cli` for the broader comparison.

**Step 3: Refresh validation badges**

Set `lastValidated="2026-05-07"` on pages with updated Claude product claims.

**Step 4: Add IDE links to existing pages**

Add short cross-links from:

- `/terminal` to `/claude-ide`
- `/desktop-app` to `/app-vs-cli`
- `/install` to `/claude-ide`

**Step 5: Verify**

Run:

```bash
npm run lint
npm run build
```

Expected: clean.

**Step 6: Commit**

```bash
git add app/claude-ide/page.tsx app/install/page.tsx app/terminal/page.tsx app/desktop-app/page.tsx app/automation/page.tsx app/resources/page.tsx
git commit -m "feat: expand Claude Code IDE and surface guidance"
```

---

## Task 8: Build Codex Day 1 Pages

**Files:**
- Create: `app/codex/page.tsx`
- Create: `app/codex/install/page.tsx`
- Create: `app/codex/cli/page.tsx`
- Create: `app/codex/app/page.tsx`
- Create: `app/codex/ide/page.tsx`
- Create: `app/codex/first-session/page.tsx`
- Create: `app/codex/approvals-sandbox/page.tsx`

**Step 1: Create `/codex` overview**

Explain Codex as OpenAI's coding agent across local and cloud surfaces. Avoid turning this into marketing copy; make it a route map.

**Step 2: Create install page**

Include:

```bash
npm i -g @openai/codex
codex
```

Also cover app and IDE extension setup.

Use `CodexCliMockup`, `CodexAppProjectMockup`, and `CodexIdeMockup`.

**Step 3: Create CLI page**

Include:

- Interactive TUI.
- Local repository context.
- Approval modes.
- Sandbox modes.
- Model/reasoning controls.
- Local code review.
- Web search.
- MCP.

Use `CodexCliMockup`.

**Step 4: Create app page**

Include:

- macOS and Windows availability.
- Project folder selection.
- Multiple agents across projects.
- Worktrees.
- Local environments.
- Built-in review and git workflows.

Use `CodexAppProjectMockup`, `CodexAppAgentsMockup`, and `CodexPrReviewMockup`.

**Step 5: Create IDE page**

Include:

- VS Code, Cursor, Windsurf.
- JetBrains.
- Sidebar workflow.
- When to delegate from IDE to cloud.
- How it differs from running CLI in the integrated terminal.

Use `CodexIdeMockup`.

**Step 6: Create first session walkthrough**

Use one realistic repo task:

```text
Read the app routes and explain where the navigation is defined. Then make a small copy update, run the relevant checks, and show me the diff before I accept it.
```

Use `CodexCliMockup` and `CodexPrReviewMockup`.

**Step 7: Create approvals and sandbox page**

Explain safe local use and unattended/background risk clearly.

**Step 8: Verify**

Run:

```bash
npm run lint
npm run build
```

Expected: clean.

**Step 9: Commit**

```bash
git add app/codex
git commit -m "feat: add Codex day one guide"
```

---

## Task 9: Build Codex Week 2 Pages

**Files:**
- Create: `app/codex/web-cloud/page.tsx`
- Create: `app/codex/agents-md/page.tsx`
- Create: `app/codex/config/page.tsx`
- Create: `app/codex/mcp-connectors/page.tsx`
- Create: `app/codex/git-github/page.tsx`

**Step 1: Create web/cloud page**

Cover:

- GitHub connection.
- Cloud task lifecycle.
- Environments.
- Background parallel work.
- Applying cloud diffs locally.
- When cloud is the wrong tool.

Use `CodexCloudTaskMockup`.

**Step 2: Create AGENTS.md page**

Include a practical starter template:

```markdown
# Repository Instructions

## Project Shape
- Framework:
- Package manager:
- Main app directory:

## Commands
- Install:
- Build:
- Lint:
- Test:

## Working Rules
- Read before editing.
- Keep changes scoped.
- Run checks before declaring done.
```

Use `AgentsMdPreview`.

**Step 3: Create config page**

Explain `~/.codex/config.toml`, model defaults, reasoning effort, sandbox defaults, and MCP server config at a conceptual level.

**Step 4: Create MCP/connectors page**

Include:

- OpenAI Docs MCP.
- GitHub.
- Slack.
- Linear.
- Browser/computer use where available.

**Step 5: Create GitHub page**

Cover:

- PR review.
- Tagging `@codex` in GitHub.
- Cloud task handoff.
- Reviewing and merging safely.

Use `CodexPrReviewMockup`.

**Step 6: Verify**

Run:

```bash
npm run lint
npm run build
```

Expected: clean.

**Step 7: Commit**

```bash
git add app/codex/web-cloud app/codex/agents-md app/codex/config app/codex/mcp-connectors app/codex/git-github
git commit -m "feat: add Codex week two workflows"
```

---

## Task 10: Build Codex Power User And Reference Pages

**Files:**
- Create: `app/codex/skills/page.tsx`
- Create: `app/codex/subagents/page.tsx`
- Create: `app/codex/worktrees/page.tsx`
- Create: `app/codex/automations/page.tsx`
- Create: `app/codex/computer-use/page.tsx`
- Create: `app/codex/cost-plans/page.tsx`
- Create: `app/codex/tips-mistakes/page.tsx`
- Create: `app/codex/demo/page.tsx`

**Step 1: Create skills page**

Focus on repeatable workflows, not syntax trivia. Include examples for weekly review, PR review, and docs updates.

**Step 2: Create subagents page**

Cover fan-out, reviewer/implementer patterns, isolation, and when subagents add overhead.

Use `CodexAppAgentsMockup`.

**Step 3: Create worktrees page**

Cover app worktrees and automation worktrees. Include cleanup guidance.

Use `CodexAppAgentsMockup`.

**Step 4: Create automations page**

Cover:

- Standalone automations.
- Thread automations.
- Triage inbox.
- Skills inside automations.
- Sandbox/risk controls.

Use `CodexAutomationMockup`.

**Step 5: Create computer-use page**

Cover local app/browser workflows and QA checks. Keep safety warnings practical.

**Step 6: Create cost/plans page**

Use official wording cautiously. Explain limits as variable by task size and plan instead of promising exact message counts.

**Step 7: Create tips/mistakes page**

Include mistakes:

- Starting without repo instructions.
- Letting cloud tasks run with unclear environment setup.
- Treating app, CLI, IDE, and cloud as interchangeable.
- Skipping diff review.
- Using automations before testing the prompt manually.

**Step 8: Create Codex demo page**

Write a 30-minute live script:

- Install/launch.
- Inspect repo.
- Make small change.
- Review diff.
- Show IDE extension.
- Show app/project view.
- Show cloud task concept.

Use at least three mockups: CLI, IDE, and cloud/app.

**Step 9: Verify**

Run:

```bash
npm run lint
npm run build
```

Expected: clean.

**Step 10: Commit**

```bash
git add app/codex/skills app/codex/subagents app/codex/worktrees app/codex/automations app/codex/computer-use app/codex/cost-plans app/codex/tips-mistakes app/codex/demo
git commit -m "feat: add Codex advanced and reference pages"
```

---

## Task 11: Add Route Verification Script

**Files:**
- Create: `scripts/check-routes.mjs`
- Modify: `package.json`

**Step 1: Create script**

Read `lib/nav.ts` indirectly is harder in plain Node because it is TypeScript. Keep the script simple with an explicit route list or export a generated JSON list later.

Script behavior:

- Accept base URL, default `http://localhost:3000`.
- Fetch each route.
- Fail non-200 responses.
- Print missing route list.

**Step 2: Add npm script**

```json
{
  "scripts": {
    "check:routes": "node scripts/check-routes.mjs"
  }
}
```

**Step 3: Verify against dev server**

Run:

```bash
npm run dev
npm run check:routes
```

Expected: all guide routes return 200.

**Step 4: Commit**

```bash
git add scripts/check-routes.mjs package.json package-lock.json
git commit -m "test: add route smoke check"
```

---

## Task 12: Full Visual And Content QA

**Files:**
- Modify as needed based on findings.

**Step 1: Build**

```bash
npm run build
```

Expected: successful production build.

**Step 2: Lint**

```bash
npm run lint
```

Expected: no warnings or errors.

**Step 3: Route smoke**

```bash
npm run dev
npm run check:routes
```

Expected: all pages return 200.

**Step 4: Mobile checks**

Check these pages at 375px width:

- `/`
- `/choose`
- `/app-vs-cli`
- `/ide-setup`
- `/install`
- `/claude-ide`
- `/codex/install`
- `/codex/app`
- `/codex/ide`
- `/codex/automations`

Expected:

- Sidebar drawer opens and closes.
- Comparison tables do not overflow incoherently.
- Code blocks scroll horizontally.
- No text overlaps.

**Step 5: Content density audit**

Every new page must include at least one of:

- 3 concrete examples.
- 2 tables.
- 1 worked walkthrough.

**Step 6: Source audit**

Every volatile product claim has:

- Official source checked.
- `lastValidated="2026-05-07"` if feature-specific.
- Wording that avoids over-promising exact limits or feature availability.

**Step 7: Final commit**

```bash
git add .
git commit -m "chore: polish dual coding agent guide"
```

---

## Implementation Order Recommendation

Build in this order:

1. Navigation and shared components.
2. Codex HTML mockup components.
3. Rebrand home page.
4. Shared decision pages.
5. Claude IDE update.
6. Codex Day 1.
7. Codex Week 2.
8. Codex Power User.
9. Verification script and QA.

This order keeps the site deployable after each phase. The user can review the new product framing before the larger Codex content build-out starts.

Execution should be subagent-driven throughout. The controller owns sequencing, context handoff, integration, and review loops; subagents own bounded implementation or read-only review tasks.

## Open Decisions

1. Final site title: recommended `AI Coding Agent Guide`.
2. Whether to keep existing Claude Code routes unprefixed forever or eventually move them under `/claude-code/*`.
3. How opinionated the `/choose` page should be about Claude Code vs Codex for Brandon's colleague audience.
4. Whether the live session is still Claude-first, or whether the demo should become a 50/50 Claude Code and Codex walkthrough.

## Locked Decisions

1. Use subagents for execution.
2. Use the existing `claude-code-guide-colleague-training` worktree.
3. Build polished HTML mockup screenshots for Codex surfaces, similar to the current Claude guide.
4. Keep current Claude Code URLs stable.
