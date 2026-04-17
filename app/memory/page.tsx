import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'Memory',
  description: 'How Claude remembers you across sessions: MEMORY.md, topic files, and the discipline that makes it work.',
};

export default function MemoryPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Memory"
        subtitle="Why your Claude knows your stack, your habits, and your past mistakes — and theirs doesn't. Yet."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <DefinitionBox
          term="Claude Code memory"
          whatItIs="A set of markdown files in a special folder that Claude automatically reads at the start of every session. Think of it as a notebook Claude keeps about you — your role, your preferences, projects you're working on, mistakes to avoid repeating."
          whyItMatters="Without it, every session starts from zero and you re-explain yourself constantly. With it, Claude already knows you're a senior EM at a strategy firm, not a junior dev — so it defaults to business framing, not CS jargon."
          example={
            <>
              Brandon&apos;s memory lives at{' '}
              <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
                ~/.claude/projects/&lt;workspace-id&gt;/memory/
              </code>
              . Claude reads{' '}
              <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
                MEMORY.md
              </code>{' '}
              every session.
            </>
          }
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The index pattern
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The discipline that keeps memory useful over time: one <strong className="text-white">index file</strong>{' '}
          (<code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            MEMORY.md
          </code>
          ), always loaded, and many <strong className="text-white">topic files</strong>, loaded on demand. The index
          is a terse one-line-per-entry menu. Topic files hold the detail.
        </p>
        <CodeBlock title="MEMORY.md — the index">{`# Claude Code Memory

## Projects
- [project_aegis.md](project_aegis.md) — agent governance platform; dashboard + decks pending
- [project_career_dash.md](project_career_dash.md) — services, Max routing, storage
- [project_hq_v2.md](project_hq_v2.md) — SHIPPED 2026-04-11

## Feedback / preferences
- [feedback_presentation_style.md](feedback_presentation_style.md) — tables for actionable data, prose for narrative
- [feedback_debug_from_logs.md](feedback_debug_from_logs.md) — use URLs from logs directly, don't look them up
- [feedback_task_tracking.md](feedback_task_tracking.md) — always use TaskCreate for multi-step work

## Reference
- [user_stack.md](user_stack.md) — Python/Next.js/Swift/Supabase, routing rules`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Each line is a pointer. The actual content lives in the linked file. Claude loads the index on every
          session and reads a topic file when that topic becomes relevant.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Four kinds of memory
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Not everything belongs in the same file. The taxonomy makes memory searchable and pruneable.
        </p>

        <div className="space-y-4 mt-6">
          <MemoryType
            kind="user"
            color="var(--color-primary)"
            purpose="Who you are, what you care about, how you think about problems."
            example='"User is a senior engagement manager at Accenture Strategy. Not a SWE. Explain technical concepts in business terms, with analogies."'
            whenToAdd="When Claude needs to know something about your role or goals to give you useful answers."
          />
          <MemoryType
            kind="feedback"
            color="var(--tier-a)"
            purpose={"How you want Claude to work. The stuff you'd otherwise repeat every session."}
            example={"\"Use the AskUserQuestion tool for every question. Never write inline 'Want me to...?' — enforced by a Stop-event hook.\""}
            whenToAdd="When you correct Claude's approach and the correction is applicable beyond this one task."
          />
          <MemoryType
            kind="project"
            color="var(--tier-b)"
            purpose="Who's doing what, why, and by when — the moving parts of your work."
            example='"Foundry retired 2026-04-12. Blueprint/DAG patterns preserved as reference. Flag when future ideas need multi-step gated workflows."'
            whenToAdd="When you make a decision or learn something non-obvious about an ongoing project."
          />
          <MemoryType
            kind="reference"
            color="var(--tier-c)"
            purpose="Pointers to external sources: dashboards, channels, docs you come back to."
            example={"\"Pipeline bugs tracked in Linear project 'INGEST'. Grafana dashboard at grafana.internal/d/api-latency is what oncall watches.\""}
            whenToAdd="When you find yourself linking Claude to the same external system more than twice."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The discipline that makes it work
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          A memory system that isn&apos;t maintained decays fast. Three habits keep it useful:
        </p>

        <div className="grid gap-3 mt-5">
          <Habit
            num="1"
            title="Prune when memory goes stale"
            body="Ended a project? Delete the project_X.md topic. Changed your preferred stack? Update user_stack.md. Stale memory is worse than no memory — Claude trusts it and gives you wrong answers based on old context."
          />
          <Habit
            num="2"
            title="Convert corrections into feedback memory"
            body="When you fix Claude's approach and the fix is generalizable, save it. Example: 'Use pgrep, not launchctl list, to check service state.' Next time, Claude starts there."
          />
          <Habit
            num="3"
            title="Keep MEMORY.md under 200 lines"
            body="It's loaded on every session. Long memory files start getting ignored. One line per topic, with a descriptive pointer. Detail belongs in topic files."
          />
        </div>

        <Callout variant="warn" title="Memory is not a database">
          Memory is great for <em>stable</em> facts (your stack, preferences, project context). It&apos;s terrible for
          facts that change fast (current sprint status, yesterday&apos;s bug count). For those, use an MCP server
          (live query) or a handoff note (session-bounded context).
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Starting from scratch
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          You don&apos;t build memory by sitting down and writing it. You build it by <em>saving</em> things as they
          come up. A good rule:
        </p>
        <CodeBlock>{`> remember this: I prefer tables over bullet lists for side-by-side comparisons.
Save it as a feedback memory.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Claude writes it to the right file with the right frontmatter and updates the index. In two weeks of real
          use you&apos;ll have a working memory system; in two months you&apos;ll notice your Claude is measurably
          better than a fresh one.
        </p>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/mcp-servers"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          MCP servers &mdash; connect to external tools &rarr;
        </Link>
      </section>
    </>
  );
}

function MemoryType({
  kind,
  color,
  purpose,
  example,
  whenToAdd,
}: {
  kind: string;
  color: string;
  purpose: string;
  example: string;
  whenToAdd: string;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-baseline gap-3 mb-2">
        <code className="font-mono text-sm font-bold" style={{ color }}>
          {kind}
        </code>
      </div>
      <div className="space-y-3">
        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#666] mb-1">
            Purpose
          </div>
          <p className="text-[#bbb] text-sm leading-relaxed">{purpose}</p>
        </div>
        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#666] mb-1">
            Example
          </div>
          <p className="text-[#999] text-sm leading-relaxed italic">{example}</p>
        </div>
        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#666] mb-1">
            Add one when
          </div>
          <p className="text-[#bbb] text-sm leading-relaxed">{whenToAdd}</p>
        </div>
      </div>
    </div>
  );
}

function Habit({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 flex items-start gap-4">
      <span className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-[color:var(--color-primary)]/50 w-6 shrink-0">
        {num}
      </span>
      <div>
        <div className="font-[family-name:var(--font-body)] font-semibold text-white mb-1">{title}</div>
        <p className="text-[#bbb] text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
