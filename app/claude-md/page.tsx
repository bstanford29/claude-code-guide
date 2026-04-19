import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'CLAUDE.md',
  description: "An annotated tour of Brandon's real CLAUDE.md — why each block earns its keep.",
};

export default function ClaudeMdPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="CLAUDE.md — the instruction manual for your project"
        subtitle="Claude reads this file at the start of every session. A good one compounds in value for years. Here's a real, annotated example."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <DefinitionBox
          term="CLAUDE.md"
          whatItIs="A markdown file you keep at the root of your project. Claude reads it automatically at the start of every session and treats it as persistent instructions — what stack you use, how you name things, what to avoid."
          whyItMatters="Without it, you re-explain your project every session. With it, Claude already knows your conventions. This is the single highest-leverage file you write when adopting Claude Code."
          example={
            <>
              Place it at{' '}
              <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
                ./CLAUDE.md
              </code>{' '}
              in any project. Check it into git so your team gets the benefit too.
            </>
          }
        />
        <p className="text-[#bbb] leading-relaxed">
          What follows is a walkthrough of the real CLAUDE.md from my own primary workspace &mdash; a 139-line file
          that accumulated over months. Some things you&apos;ll want to copy, some are specific to my setup. Steal the
          patterns, not the specifics.
        </p>
        <Callout variant="tip" title="Shortcut: let Claude write the first draft">
          In a project, type{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">/init</code>.
          Claude scans your codebase, detects your build system, test framework, and conventions, then writes a
          starter CLAUDE.md you can refine.
        </Callout>
      </section>

      {/* Section 1: Working Agreements */}
      <AnnotatedBlock
        label="Block 1 of 10"
        heading="Working Agreements"
        why="Tells Claude what to do before, during, and after any change. This is the block that prevents the most failure modes — rushed proposals, skipped verification, destructive guesses."
        whenToCopy="Steal the Before/While/After/Stuck/Never skeleton for any codebase. Tweak the specifics — e.g., your own 'deployed systems' list."
        code={`## Working Agreements

**Before:** Read \`ARCHITECTURE.md\` and \`LESSONS.md\`. Check git status. **Read every file you intend to change or cite — no proposing edits to files you haven't opened.** No speculation about unopened files. **For deployed systems (Prism / Foundry / HQ / Refinery / Career Dash), verify runtime state BEFORE planning: env file, running config, recent logs, \`git log -5\` of the file. Memory and handoffs LAG reality.** Multi-file changes → plan first.
**While:** Surgical changes only — every line traces to the request. Mention dead code, don't delete it. **If a URL, endpoint, or value appears in logs or error messages, use it directly — don't cycle through indirect lookups.**
**After:** Build passes, tests pass, lint clean. **Run the feature end-to-end with real input before declaring done — unit tests are not proof of working.**
**Stuck:** After 2 failed fixes for the same complaint, STOP guessing. Inspect live state directly. No 3rd guess.
**Never:** Ask for credentials. Skip hooks. Force push main. Commit secrets. Public gists.
**Questions:** Use \`AskUserQuestion\` tool for EVERY question — no exceptions.`}
      />

      {/* Section 2: Meticulousness */}
      <AnnotatedBlock
        label="Block 2 of 10"
        heading="Meticulousness Protocol"
        why="A numbered list of habits that Brandon is tracking across sessions. The earlier block is the 'what', this is the 'how'. Lists Claude's specific failure modes — 'read before propose', 'verify before plan', 'prove before declare' — so it can check itself against them."
        whenToCopy="Add this after you catch Claude making the same class of mistake twice. The specificity is what makes it work — 'be careful' fails, 'after 2 failed fixes, open the live artifact' works."
        code={`## Meticulousness Protocol

1. **Read before propose.** Any file you name in a plan or edit response must be Read in this session first.
2. **Verify before plan.** For deployed systems, check env + config + logs + \`git log\` BEFORE scoping work. Don't trust handoffs or memory — they lag reality.
3. **Prove before declare.** "Done" requires running the feature with real input and showing the output. Passing unit tests ≠ working feature.
4. **Inspect before guess.** After 2 failed fixes for the same issue, open the live artifact (browser, DB, logs). No third guess.
5. **AskUserQuestion, always.** Every question uses the tool. Zero inline "Want me to…?", "Should I…?", "(yes/no)", "A/B/C?".
6. **Pull from the right source of truth.** Before project-specific work: Read the matching \`memory/feedback_*.md\` and \`memory/project_*.md\` topic files and the project's Obsidian Hub Brief.`}
      />

      {/* Section 3: Presentation */}
      <AnnotatedBlock
        label="Block 3 of 10"
        heading="Presentation"
        why="I'm a visual thinker, not a dense-prose reader. This block tells Claude when to use a table vs. a scaffolded structure vs. inline prose. Without it, Claude defaults to walls of text."
        whenToCopy="Any instruction file benefits from a 'how to present things' section. Match it to your own reading style. If you skim, say so."
        code={`## Presentation

- **Use tables** when comparing options, listing files to change, mapping failure modes to fixes, or showing anything you need to act on or decide between.
- **Use scaffolded structure** (H2 headers, numbered lists, \`file_path:line\` refs, Before/After code blocks) for implementation work, code-review findings, and diffs.
- **Use inline prose** for casual acknowledgments, simple answers, quick status ("done", "fixed"), and narrative that explains *why*.
- **Default to structure.** If you need to act on what I'm showing, it's a table or scaffolded block — not a paragraph.
- **Explanation tone: educational, simplified, jargon-defined, analogies welcome.** I'm a senior EM, not a SWE — explain technical concepts the way you'd explain linting: what it is → what it does → why it matters → a concrete example.`}
      />

      {/* Section 4: Stack Reference */}
      <AnnotatedBlock
        label="Block 4 of 10"
        heading="Stack Reference"
        why="Tables of what tool I use for what, and when to pick which language. The second table prevents Claude from drifting into exotic choices ('should I write this in Rust?') when Python or TypeScript is the right answer."
        whenToCopy="Every multi-project workspace needs this. If you have a default stack and a reason to deviate, write it down once — Claude will never guess right consistently."
        code={`## Stack Reference

### Current stack

| Layer | Tool | Purpose |
|---|---|---|
| Websites / UI | Next.js + React + TypeScript | User-facing web apps |
| Styling | Tailwind CSS + shadcn/ui | UI without CSS fighting |
| Backend / agents | Python + FastAPI | Agents, cron, scripts, LLM work |
| Database | Supabase (PostgreSQL) | Data + auth + realtime |
| AI / LLM | Claude CLI on Max plan | Agentic work |
| iOS | Swift + SwiftUI | Native phone apps |

### When to pick which

| Building… | Use | Not |
|---|---|---|
| Agent, cron job, script that thinks, LLM code | **Python** | TypeScript |
| Website, dashboard, anything people click | **Next.js + TypeScript** | Python |
| iOS app | **Swift + SwiftUI** | (native always better) |
| CLI tool for other people | **Go** (or Python) | TypeScript |

**Stay on Python + Next.js by default.** Rust and Go almost never come up. If a project ever needs raw speed as its whole point, flag it and justify the language switch — don't drift.`}
      />

      {/* Section 5: Planning Mode */}
      <AnnotatedBlock
        label="Block 5 of 10"
        heading="Planning Mode Routing"
        why="Picks the right planning surface up front. I have five planning tools (inline, /quick-plan, /plan, Plan mode, /gsd:plan-phase) and they have different costs. This block tells Claude which one to reach for."
        whenToCopy="Only useful once you have 2+ planning tools. Start without this — add it when you catch Claude using a heavy tool for a light task."
        code={`## Planning Mode Routing

| Situation | Use | Why |
|---|---|---|
| Single file, <15 min, clear fix | **Inline, no plan** | Planning overhead > work |
| 1–3 files, simple scope | **\`/quick-plan\`** | Lean spec to \`specs/\` |
| 3+ files OR multi-subsystem | **\`/plan\`** | Drives the full execution loop |
| Review before edits land | **Plan mode** (built-in) | Blocks edits until ExitPlanMode |
| High-stakes one-response reasoning | **Plan mode + \`ultrathink\`** | Extended-thinking budget |

**Never skip planning for 3+ file changes.**`}
      />

      {/* Section 6: Visual Companions */}
      <AnnotatedBlock
        label="Block 6 of 10"
        heading="Visual Companions (conditional)"
        why="Tells Claude when visuals are worth the effort and when they're noise. The 'NO' column is the important one — visuals eat cap, and for a one-line fix they're overhead."
        whenToCopy="Use this skeleton for anything that has an optional output (diagrams, screenshots, test reports)."
        code={`## Visual Companions

| Trigger | Visual required? |
|---|---|
| Plan spans 3+ subsystems OR crosses project boundaries | YES |
| Plan contains a state machine or non-trivial flow | YES (Mermaid inline OK) |
| I explicitly ask | YES |
| Single-file or single-subsystem change | NO |
| Config update, dep bump, rename refactor | NO |
| Quick fix / bug patch | NO |
| I said "just do it" | NO |`}
      />

      {/* Section 7: Conditional Context */}
      <AnnotatedBlock
        label="Block 7 of 10"
        heading="Conditional Context"
        why="The magic trick. Instead of cramming every detail into CLAUDE.md (which Claude loads every session, burning cap), this block points at specialized docs and says 'read this ONE when you're doing that kind of work.' See the next page for how reference files work."
        whenToCopy="The moment your CLAUDE.md hits 100 lines, start extracting specialist content into .claude/docs/ and list it here. This is the scaling pattern."
        code={`## Conditional Context

| When you are... | Read first |
|---|---|
| Designing new systems or features | \`.claude/docs/ai-native-design.md\` |
| Working across projects | \`.claude/docs/cross-project-map.md\` |
| Creating a new project | \`.claude/docs/tech-stack-matrix.md\` |
| Building an MCP server | \`.claude/docs/mcp-server-pattern.md\` |
| Using agent teams / \`/swarm\` | \`.claude/docs/agent-teams.md\` |
| Deploying Foundry blueprints | memory topic "Foundry Blueprints" |
| Testing a pipeline or service | \`LESSONS.md\` → runtime verification rules |`}
      />

      {/* Imports */}
      <section className="mt-14 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The <code className="text-[color:var(--color-primary)]">@path</code> import syntax
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          CLAUDE.md can include other files with{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">@path</code>.
          Claude follows the reference and reads the linked file as if it were part of CLAUDE.md.
        </p>
        <CodeBlock title="CLAUDE.md with imports">{`See @README.md for project overview and @package.json for available npm commands.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          This is how you keep the main CLAUDE.md short while still giving Claude full context on demand.
        </p>
      </section>

      {/* Where to put CLAUDE.md */}
      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Where to put it
        </h2>
        <div className="grid gap-3">
          <Location
            path="./CLAUDE.md"
            use="Project-specific instructions. Check into git — your team shares the benefit."
          />
          <Location
            path="./CLAUDE.local.md"
            use="Personal notes just for you on this project. Add to .gitignore — keeps teammates from seeing your quirks."
          />
          <Location
            path="~/.claude/CLAUDE.md"
            use="Global rules that apply to every session on your machine, across all projects."
          />
          <Location
            path="./subdir/CLAUDE.md"
            use="Only pulled in when you work on files inside that subdirectory. Useful for monorepos where different apps have different conventions."
          />
        </div>
      </section>

      {/* Common mistakes */}
      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Common mistakes
        </h2>
        <div className="space-y-3">
          <Mistake
            bad="Writing a 500-line CLAUDE.md"
            good="Claude starts ignoring half of it. Prune ruthlessly. Move specialist content into .claude/docs/ and reference it with the Conditional Context table."
          />
          <Mistake
            bad="Documenting things Claude can infer"
            good={"Don't say \"this is a Next.js project\" — Claude figures that out from package.json. Do say \"we use 2-space indentation\" because that's non-obvious."}
          />
          <Mistake
            bad="Writing rules without saying WHY"
            good='"Use Pydantic models for all requests" is weaker than "Use Pydantic models for all requests — we had a silent schema drift in production last quarter." Rules with reasons survive; rules without reasons get ignored when they feel inconvenient.'
          />
          <Mistake
            bad="Never updating it"
            good="Treat CLAUDE.md like code. When Claude keeps doing something wrong, the rule is probably buried or phrased weakly. Review it monthly, prune the dead weight."
          />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/reference-files"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Reference files &mdash; how to split the load &rarr;
        </Link>
      </section>
    </>
  );
}

function AnnotatedBlock({
  label,
  heading,
  why,
  whenToCopy,
  code,
}: {
  label: string;
  heading: string;
  why: string;
  whenToCopy: string;
  code: string;
}) {
  return (
    <section className="mt-12 space-y-4">
      <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-[color:var(--tier-a)] font-semibold">
        {label}
      </div>
      <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
        {heading}
      </h2>
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6">
        <div className="space-y-3">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#666] mb-1">
              Why this block exists
            </div>
            <p className="text-[#bbb] leading-relaxed text-sm">{why}</p>
          </div>
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#666] mb-1">
              Steal this for your CLAUDE.md?
            </div>
            <p className="text-[#bbb] leading-relaxed text-sm">{whenToCopy}</p>
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#666] mb-2">
            From my CLAUDE.md
          </div>
          <CodeBlock>{code}</CodeBlock>
        </div>
      </div>
    </section>
  );
}

function Location({ path, use }: { path: string; use: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 flex items-start gap-4">
      <code className="shrink-0 text-[color:var(--color-primary)] bg-[#161616] px-2 py-1 rounded text-xs font-mono">
        {path}
      </code>
      <div className="text-[#bbb] leading-relaxed text-sm">{use}</div>
    </div>
  );
}

function Mistake({ bad, good }: { bad: string; good: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-5 space-y-3">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs mt-0.5">
          x
        </span>
        <p className="text-[#888] text-sm leading-relaxed">{bad}</p>
      </div>
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs mt-0.5">
          &#10003;
        </span>
        <p className="text-[#ccc] text-sm leading-relaxed">{good}</p>
      </div>
    </div>
  );
}
