import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'Subagents',
  description: 'Delegate investigation or specialized work to sub-Claude sessions with their own context and tools.',
};

export default function SubagentsPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Subagents"
        subtitle="Specialized Claude sessions you can delegate to. Great for investigation, code review, and anything you want done without cluttering your main conversation."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <DefinitionBox
          term="a subagent"
          whatItIs="A named Claude session with its own system prompt, its own tools, and its own context window. Your main session delegates a task — the subagent runs it in isolation and returns a summary."
          whyItMatters="Context is your most precious resource. When Claude reads 30 files to understand how auth works, those 30 files stay in your main context. A subagent reads them in its own window and reports back: 'here's what I found.' Your main session stays lean."
          example={
            <>
              <code>use a subagent to investigate how our OAuth flow handles token refresh</code> &mdash; subagent
              explores, your main session keeps context for building the fix.
            </>
          }
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The two kinds of subagents
        </h2>
        <div className="space-y-4">
          <KindCard
            name="General-purpose (built-in)"
            color="var(--color-primary)"
            invoke={<>Just ask: <code>use a subagent to investigate X</code></>}
            whenToUse="Research, exploration, one-off heavy-context tasks. Claude picks the tools it needs on the fly."
          />
          <KindCard
            name="Custom (.claude/agents/*.md)"
            color="var(--tier-c)"
            invoke={
              <>
                Defined in a markdown file with frontmatter; invoked by name or automatically when the description
                matches (<code>use the code-reviewer subagent</code>).
              </>
            }
            whenToUse="Repeated specialized tasks. Security review, debugging, refactoring, tests — anything you want the same personality every time."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Anatomy of a custom subagent
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Custom subagents live at{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            .claude/agents/&lt;name&gt;.md
          </code>
          . Structure:
        </p>
        <CodeBlock title=".claude/agents/security-reviewer.md">{`---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---

You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication and authorization flaws
- Secrets or credentials committed in code
- Insecure data handling (PII in logs, unencrypted at rest)

For each issue, provide:
- The specific line reference (file:line)
- A one-sentence explanation of the risk
- A concrete suggested fix

Do not make edits. Report findings only.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Now in any session:{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            use the security-reviewer subagent on the auth module
          </code>
          . It spins up, does its thing, reports back. Main session stays focused.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Frontmatter fields
        </h2>
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <FieldRow
            k="name"
            req="required"
            what="Unique identifier. Used to invoke the subagent and shown in /agents list."
          />
          <FieldRow
            k="description"
            req="required"
            what="One-sentence description. Used for auto-delegation — Claude matches task descriptions against this."
          />
          <FieldRow
            k="tools"
            req="optional"
            what={<>Comma-separated list of allowed tools. Default: all. Common: <code>Read, Grep, Glob</code> for readonly auditors; <code>Edit, Write, Bash</code> for builders.</>}
          />
          <FieldRow
            k="model"
            req="optional"
            what={<>Which Claude model to use (<code>opus</code>, <code>sonnet</code>, <code>haiku</code>). Useful if you want a cheap/fast model for simple audits.</>}
          />
          <FieldRow
            k="isolation"
            req="optional"
            what={<>Set to <code>worktree</code> to have the subagent run in its own git worktree. Prevents concurrent subagents from stepping on each other&apos;s files.</>}
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Two proven patterns
        </h2>
        <PatternCard
          name="Writer / Reviewer"
          setup="One session writes the code. A fresh subagent reviews it with no memory of writing it."
          why="The writer is biased toward their own code. A reviewer with clean context catches things the writer missed — edge cases, race conditions, 'wait, why this and not that?'"
          prompt={`# In your writing session:
> implement a rate limiter for /api/*

# Then in the same session, after it's done:
> use a subagent to review the rate limiter implementation.
Look for edge cases, race conditions, consistency with existing middleware.`}
        />
        <PatternCard
          name="Fan-out"
          setup="Spawn N subagents in parallel, each investigating a different question. Main session aggregates their findings."
          why="30 files to read? One subagent reading them serially fills its own context. Five subagents reading six files each runs in parallel and reports back in a fraction of the time."
          prompt={`> I want to understand our auth system. Spin up 3 subagents in parallel:
1. Investigate how sessions are stored (Redis, cookies, where)
2. Investigate how tokens are validated (middleware path)
3. Investigate how logout works and whether it revokes everywhere

Have each report back with file:line references. Then synthesize.`}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The <code className="text-[color:var(--color-primary)]">/agents</code> command
        </h2>
        <p className="text-[#bbb] leading-relaxed">Inside any session:</p>
        <CodeBlock>{`/agents`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Lists every subagent available (built-ins + your custom ones), lets you create new ones interactively, and
          shows which tools each is allowed. Easier than editing markdown files directly for first-time setup.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          When NOT to use a subagent
        </h2>
        <div className="space-y-3">
          <AntiUse
            dont="Asking a subagent for a quick answer"
            doThis="Subagents spin up fresh context each time. For a 1-line question, your main session is cheaper. Use subagents when the task would burn context anyway."
          />
          <AntiUse
            dont="Pretending a subagent will remember a past conversation"
            doThis="Each invocation starts fresh. If you need continuity, keep the work in one session or pass context in the prompt."
          />
          <AntiUse
            dont="Spawning 10 parallel subagents unattended"
            doThis="Parallel subagents run independently — if two touch the same files without worktree isolation, they collide. Use isolation: worktree for parallel work, or keep it sequential."
          />
        </div>
      </section>

      <Callout variant="tip" title="For parallel subagents, use worktree isolation">
        Adding <code>isolation: worktree</code> to an agent&apos;s frontmatter makes each invocation run in its own
        git worktree. Means you can run a Writer + Reviewer simultaneously on the same feature without them fighting
        over the same files. Cleanup is automatic.
      </Callout>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/worktrees"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Worktrees &mdash; parallel sessions, isolated workspaces &rarr;
        </Link>
      </section>
    </>
  );
}

function KindCard({
  name,
  color,
  invoke,
  whenToUse,
}: {
  name: string;
  color: string;
  invoke: React.ReactNode;
  whenToUse: string;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5 border-l-4" style={{ borderLeftColor: color }}>
      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white mb-3">{name}</h3>
      <div className="grid md:grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-sm">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Invoke
        </div>
        <div className="text-[#bbb] leading-relaxed">{invoke}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Use for
        </div>
        <div className="text-[#bbb] leading-relaxed">{whenToUse}</div>
      </div>
    </div>
  );
}

function FieldRow({ k, req, what }: { k: string; req: string; what: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[140px_80px_1fr] gap-x-4 p-4 border-t border-[var(--color-border)] first:border-t-0">
      <code className="text-[color:var(--color-primary)] font-mono text-xs self-start">{k}</code>
      <span
        className={`font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider font-semibold self-start ${
          req === 'required' ? 'text-amber-400' : 'text-[#666]'
        }`}
      >
        {req}
      </span>
      <div className="text-[#bbb] text-sm leading-relaxed">{what}</div>
    </div>
  );
}

function PatternCard({
  name,
  setup,
  why,
  prompt,
}: {
  name: string;
  setup: string;
  why: string;
  prompt: string;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5 mb-4">
      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white mb-2">{name}</h3>
      <div className="space-y-2 mb-3">
        <div>
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] mr-2">
            Setup
          </span>
          <span className="text-[#bbb] text-sm leading-relaxed">{setup}</span>
        </div>
        <div>
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] mr-2">
            Why
          </span>
          <span className="text-[#999] text-sm leading-relaxed italic">{why}</span>
        </div>
      </div>
      <CodeBlock>{prompt}</CodeBlock>
    </div>
  );
}

function AntiUse({ dont, doThis }: { dont: string; doThis: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 space-y-2">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs mt-0.5">
          x
        </span>
        <p className="text-[#888] text-sm leading-relaxed">{dont}</p>
      </div>
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs mt-0.5">
          &#10003;
        </span>
        <p className="text-[#ccc] text-sm leading-relaxed">{doThis}</p>
      </div>
    </div>
  );
}
