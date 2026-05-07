import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { CompareTable } from '@/components/compare-table';
import { DecisionGrid } from '@/components/decision-grid';
import { ProductBadge } from '@/components/product-badge';

export const metadata = {
  title: 'Claude Code vs Codex',
  description: 'A workflow-first decision guide for when to use Claude Code, Codex, or both.',
};

export default function ChoosePage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="Claude Code vs Codex"
        subtitle="Pick the tool by workflow, not by brand loyalty. Most consulting teams should learn both and use the one that fits the moment."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <Callout variant="info" title="The practical answer">
          You can use both. Treat Claude Code as a strong local pair-programming and agent workflow environment, and
          treat Codex as a coding agent that spans CLI, desktop app, IDE, and cloud/background work. The best setup is
          usually one shared repo with clear instructions for both tools.
        </Callout>

        <DecisionGrid
          items={[
            {
              eyebrow: 'Use Claude Code when',
              title: 'You want a tight local implementation loop',
              body:
                'Great for sitting in a repo, reading the code with the agent, making scoped edits, reviewing diffs, and iterating with local commands.',
            },
            {
              eyebrow: 'Use Codex when',
              title: 'You want parallel or delegated agent work',
              body:
                'Great for background tasks, cloud handoff, IDE or app workflows, and running multiple agents across projects without living in one terminal.',
            },
            {
              eyebrow: 'Use both when',
              title: 'The work has discovery plus delivery',
              body:
                'Have one tool investigate or review while the other implements. For a client engagement, that gives you a writer, a reviewer, and a clean audit trail.',
            },
            {
              eyebrow: 'Do not overthink it',
              title: 'The prompt matters more than the logo',
              body:
                'Clear repo instructions, small tasks, reproducible commands, and verification evidence beat tool switching almost every time.',
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Decision guide by consulting workflow
        </h2>
        <CompareTable
          leftHeader="Claude Code"
          rightHeader="Codex"
          rows={[
            {
              label: 'New client repo tour',
              left: 'Use it to map the app locally, inspect files, and explain architecture while you keep the session focused.',
              right: 'Use it to ask broad repo questions, spin off background research, or keep a parallel agent reading another subsystem.',
            },
            {
              label: 'Bug fix with failing tests',
              left: 'Strong default when you can reproduce the failure locally and want a careful edit-test loop.',
              right: 'Strong default when you want the agent to attempt the fix in an isolated task and return evidence for review.',
            },
            {
              label: 'Deck, report, or analysis support',
              left: 'Useful when the codebase is the source of truth and you need local scripts, exports, or generated artifacts.',
              right: 'Useful when the work spans files, apps, cloud tasks, or repeated automations around the analysis workflow.',
            },
            {
              label: 'Frontend polish from screenshots',
              left: 'Good for local implementation with screenshots and tight manual review.',
              right: 'Good for app or IDE workflows with visual checks, parallel attempts, and cloud follow-up tasks.',
            },
            {
              label: 'PR review before client delivery',
              left: 'Use a fresh session or subagent to review the diff and flag risks before sending.',
              right: 'Use Codex review or a delegated task to inspect the branch, cite evidence, and suggest fixes.',
            },
            {
              label: 'Long backlog cleanup',
              left: 'Best for one focused cleanup at a time, especially when local judgment matters.',
              right: 'Best for many independent tasks: docs cleanup, issue triage, dead-code sweeps, or branch-specific review.',
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Simple examples
        </h2>
        <div className="grid gap-3">
          <Example
            badge={<ProductBadge product="claude" />}
            title="Client asks: why did checkout conversion drop?"
            body="Use Claude Code locally to inspect the checkout flow, analytics events, and recent changes. Ask it to produce file references, then patch the tracking bug in the same session."
          />
          <Example
            badge={<ProductBadge product="codex" />}
            title="Client asks: can you modernize these five old pages?"
            body="Use Codex to split the work into parallel tasks or cloud/background runs, each with one page and a clear verification command."
          />
          <Example
            badge={<ProductBadge product="shared" label="Both" />}
            title="Client asks: prep a launch-readiness review by tomorrow"
            body="Use one tool to inspect risks and another to implement fixes. Keep the final answer evidence-based: changed files, commands run, tests passed, and open risks."
          />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/app-vs-cli"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Compare app, CLI, IDE, and cloud surfaces &rarr;
        </Link>
      </section>
    </>
  );
}

function Example({ badge, title, body }: { badge: React.ReactNode; title: string; body: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5">
      <div className="mb-3">{badge}</div>
      <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-white">{title}</h3>
      <p className="mt-2 text-sm text-[#bbb] leading-relaxed">{body}</p>
    </div>
  );
}
