import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { CompareTable } from '@/components/compare-table';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'Thinking controls',
  description:
    'Plan mode vs /effort vs ultrathink vs Ultraplan — three names that sound alike, four different tools. The corrected story.',
};

export default function ThinkingControlsPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Thinking controls"
        subtitle="Plan mode, /effort, ultrathink, Ultraplan. Four tools that sound alike, four different jobs. This page untangles them."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <Callout variant="warn" title="Read this first — the rule changed">
          You may have seen older guides describe a <em>thinking budget ladder</em> &mdash;{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">think</code> →{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            think hard
          </code>{' '}
          →{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            think harder
          </code>{' '}
          →{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">ultrathink</code>
          . That ladder is obsolete on current models (Opus 4.7, Sonnet 4.6). The current system is different and
          better. Everything below reflects the 2026-04-17 state of the docs.
        </Callout>
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          What&apos;s actually happening now
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          On current models (Opus 4.7 and Sonnet 4.6), <strong className="text-white">extended thinking is on by
          default</strong>, and it&apos;s <em>adaptive</em>: the model decides per-prompt how much thinking the task
          deserves. A casual question gets almost no thinking; a complex architecture decision gets a lot. You no
          longer set a fixed &ldquo;budget&rdquo; &mdash; you set an <em>effort level</em>, and the model allocates
          thinking time against that.
        </p>
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The four controls
        </h2>

        <div className="space-y-4">
          <ControlCard
            name="/effort"
            kind="Primary — set and forget"
            when="At the start of a session, or whenever the shape of the work changes"
            does="Sets how hard Claude thinks for the rest of the session. Options: low · medium · high · max."
            example="/effort high"
            note="This is the main lever. Most work stays on the default. Flip to 'high' or 'max' for architecture calls, migrations, or security-sensitive work."
          />
          <ControlCard
            name="ultrathink"
            kind="Tactical — one prompt"
            when="A single high-stakes prompt you want Claude to reason harder on, without changing the session default"
            does="An in-prompt keyword that tells Claude to reason more on that turn. Doesn't change the effort level; just nudges harder for the one response."
            example="> ultrathink on this — what's the failure mode I'm missing in the retry logic?"
            note="Think of /effort as your cruise control and ultrathink as the passing lane. Quieter than flipping /effort for a single moment."
          />
          <ControlCard
            name="Plan mode"
            kind="Workflow — different gear"
            when="You want Claude to explore and propose before it touches any file"
            does="Claude reads files and drafts a plan; no edits happen until you accept. Enter with Shift+Tab (cycles permission modes) or start with claude --permission-mode plan."
            example="Shift+Tab  →  ⏸ plan mode on"
            note="Orthogonal to thinking depth. You can be in plan mode with any /effort setting and can still add ultrathink to a plan-mode prompt."
          />
          <ControlCard
            name="Ultraplan"
            kind="External — different surface"
            when="You have a draft plan and want a deeper pass without burning your CLI session"
            does="Hand your draft plan to the web-based Claude Code at claude.ai/code. It refines the plan with a separate context window."
            example="'Refine with Ultraplan on the web' in the ExitPlanMode dialog"
            note="Not a thinking mode at all — it's a handoff to a different Claude instance on a different surface. People confuse it with ultrathink because of the name."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The one confusion to fix, forever
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Three of these share the prefix &ldquo;ultra&rdquo; or &ldquo;plan&rdquo; and they&apos;re different things.
          Burn this table into memory:
        </p>

        <CompareTable
          leftHeader="What it is"
          rightHeader="Where it lives"
          rows={[
            {
              label: 'Plan mode',
              left: 'CLI mode that blocks edits until you approve a plan',
              right: 'Terminal session (Shift+Tab or --permission-mode plan)',
            },
            {
              label: 'ultrathink',
              left: 'Keyword in a prompt: "reason more on this turn"',
              right: 'Typed inline in any session, any mode',
            },
            {
              label: 'Ultraplan',
              left: 'Web service that deepens a draft plan',
              right: 'claude.ai/code in your browser',
            },
            {
              label: '/effort',
              left: 'Session-wide thinking depth setting',
              right: 'Slash command inside a session',
            },
          ]}
        />

        <p className="text-[#bbb] leading-relaxed">
          <strong className="text-white">Not ladder, not synonyms, not aliases.</strong> Four tools, four jobs. Use
          each for what it&apos;s for.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Decision tree — which knob do I turn?
        </h2>
        <div className="space-y-3">
          <DecisionRow
            q="Is this a routine prompt in an existing session?"
            a={
              <>
                Nothing. Adaptive reasoning already picks the right depth. Don&apos;t touch anything.
              </>
            }
          />
          <DecisionRow
            q="Am I starting work on something architecturally tricky?"
            a={
              <>
                <code>/effort high</code> or <code>/effort max</code> at the top. Leave it there for the session.
              </>
            }
          />
          <DecisionRow
            q="Is this one specific prompt that matters more than the rest?"
            a={
              <>
                Type <code>ultrathink</code> somewhere in the prompt. Nudges the model for just that turn.
              </>
            }
          />
          <DecisionRow
            q="Am I about to change multiple files?"
            a={
              <>
                <strong className="text-white">Plan mode.</strong> <code>Shift+Tab</code> to enter. Review before edits
                land.
              </>
            }
          />
          <DecisionRow
            q="I have a draft plan and want a deeper pass before building?"
            a={
              <>
                <strong className="text-white">Ultraplan.</strong> Choose &ldquo;Refine with Ultraplan on the
                web&rdquo; in the ExitPlanMode dialog.
              </>
            }
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Fine print you can mostly ignore
        </h2>
        <DefinitionBox
          term="the MAX_THINKING_TOKENS environment variable"
          whatItIs={
            "An env var that caps how many thinking tokens Claude can use. On adaptive-reasoning models (Opus 4.7, Sonnet 4.6), only MAX_THINKING_TOKENS=0 does anything — it disables thinking entirely."
          }
          whyItMatters="Only matters for older fixed-budget models or if you want to turn thinking off globally. For a consultant on current models, ignore this knob."
          example={
            <>
              To disable: <code>export MAX_THINKING_TOKENS=0</code>
            </>
          }
        />
        <Callout variant="info" title="To peek at Claude's thinking">
          Press{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            Ctrl+O
          </code>{' '}
          during a session. Shows Claude&apos;s internal reasoning as gray italic text. Sometimes useful for debugging
          a prompt that&apos;s not landing. Also useful for convincing a skeptic that the model is actually working.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/mcp-servers"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          MCP servers &mdash; connect to your real tools &rarr;
        </Link>
      </section>
    </>
  );
}

function ControlCard({
  name,
  kind,
  when,
  does,
  example,
  note,
}: {
  name: string;
  kind: string;
  when: string;
  does: string;
  example: string;
  note: string;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <code className="text-[color:var(--color-primary)] font-semibold text-base bg-[#161616] px-2 py-1 rounded">
          {name}
        </code>
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[color:var(--tier-b)]">
          {kind}
        </span>
      </div>
      <div className="grid md:grid-cols-[100px_1fr] gap-x-4 gap-y-2 text-sm mt-3">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          When
        </div>
        <div className="text-[#bbb] leading-relaxed">{when}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          What it does
        </div>
        <div className="text-[#bbb] leading-relaxed">{does}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Example
        </div>
        <div>
          <code className="text-[#ccc] bg-[#0f0f0f] px-2 py-1 rounded text-xs font-mono block border border-[var(--color-border)]">
            {example}
          </code>
        </div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Note
        </div>
        <div className="text-[#999] leading-relaxed text-xs italic">{note}</div>
      </div>
    </div>
  );
}

function DecisionRow({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6">
      <div className="flex-1 min-w-0">
        <div className="font-[family-name:var(--font-body)] text-sm text-white font-semibold">{q}</div>
      </div>
      <div className="font-[family-name:var(--font-body)] text-sm text-[#bbb] leading-relaxed md:max-w-[55%]">
        {a}
      </div>
    </div>
  );
}
