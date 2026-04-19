import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { CompareTable } from '@/components/compare-table';

export const metadata = {
  title: 'Automation',
  description:
    'Headless mode, fan-out across files, Routines, /loop, GitHub Actions — making Claude work while you do something else.',
};

export default function AutomationPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Automation"
        subtitle="Claude without a UI. Piping, scripting, scheduling. The move from 'AI assistant' to 'team member who works overnight.'"
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Headless mode &mdash; the foundation
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">claude -p</code>{' '}
          runs a single prompt without an interactive session. No TTY, no chat UI &mdash; just input in, answer out.
          This is the building block for every automation pattern below.
        </p>
        <CodeBlock title="The basic shape">{`# One-shot query
claude -p "Explain what this project does"

# Read from file, output to stdout
claude -p "Summarize the changes vs main" < diff.txt

# Classic Unix pipe in + pipe out
cat error.log | claude -p "Root-cause this stack trace" > report.txt`}</CodeBlock>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Output formats
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          For scripting, you want structured output. Three formats:
        </p>
        <CompareTable
          leftHeader="Format"
          rightHeader="Use when"
          rows={[
            { label: <code>text</code>, left: 'Plain text (default)', right: 'You just want the answer. Pipes into other commands.' },
            { label: <code>json</code>, left: 'Full JSON — includes cost, duration, messages', right: "You're writing a pipeline and need metadata." },
            { label: <code>stream-json</code>, left: 'JSON objects emitted as they arrive', right: 'Real-time processing. Each line is valid JSON; whole file is not.' },
          ]}
        />
        <CodeBlock>{`claude -p "audit this file for bugs" \\
  --output-format json \\
  < src/auth.ts > audit.json

# In a downstream script:
jq '.cost_usd' audit.json
jq '.messages[-1].content' audit.json`}</CodeBlock>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Fan-out &mdash; one-prompt-per-file at scale
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          You have 2,000 files to migrate from React to Vue. Doing it one-at-a-time in an interactive session would
          take weeks. Loop over the list with{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">-p</code>:
        </p>
        <CodeBlock title="scripts/migrate-all.sh">{`#!/usr/bin/env bash
for file in $(cat files.txt); do
  echo "Migrating $file..."
  claude -p "Migrate $file from React to Vue. Return only 'OK' or 'FAIL: <reason>'." \\
    --allowedTools "Edit,Bash(git commit *)"
done`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            --allowedTools
          </code>{' '}
          is critical for unattended runs. You&apos;re not there to approve permission prompts &mdash; list the exact
          tools Claude can use, or the run halts.
        </p>
        <Callout variant="warn" title="Pilot before production">
          Run the script on 2&ndash;3 files first. Refine the prompt based on what goes wrong. Then run on the
          full list. A bad prompt × 2,000 files is worse than a bad prompt × 3 files by a factor of 2,000.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Claude as a CI linter
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Wire Claude into{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            package.json
          </code>{' '}
          or GitHub Actions like any other tool:
        </p>
        <CodeBlock title="package.json">{`{
  "scripts": {
    "lint:claude": "claude -p 'You are a linter. Scan changes vs main for typos. For each, output <filename>:<line>\\\\n<description>. Nothing else.'"
  }
}`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Run it locally during code review, or wire it into your CI to catch things ESLint won&apos;t.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Auto mode for unattended runs
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          For scripts where you won&apos;t be watching, combine{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">-p</code>{' '}
          with <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            --permission-mode auto
          </code>
          . A classifier model reviews each action in the background &mdash; risky ones abort the whole run, safe
          ones proceed.
        </p>
        <CodeBlock>{`claude --permission-mode auto -p "fix all lint errors"`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          If the classifier blocks too many actions in a row, auto mode aborts rather than grinding forever &mdash;
          better to fail fast than wake up to a broken repo.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Scheduling &mdash; four options, four use cases
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          &ldquo;Have Claude do X every morning&rdquo; isn&apos;t one feature &mdash; it&apos;s four, depending on
          where you want it to run.
        </p>

        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden mt-4">
          <SchedRow
            where="Routines (Anthropic-hosted)"
            best="Tasks that should run even when your computer is off. Also: event-triggered (API calls, GitHub events)."
            setup="claude.ai/code/routines"
            scope="Runs on Anthropic infrastructure"
          />
          <SchedRow
            where="Desktop scheduled tasks"
            best="Tasks that need access to local files or uncommitted changes on your Mac."
            setup="Desktop app → Schedule"
            scope="Runs on your machine, via the desktop app"
          />
          <SchedRow
            where="GitHub Actions"
            best="Tasks tied to repo events (PR opens, cron on the repo) that should live alongside workflow config."
            setup=".github/workflows/*.yml + claude-code action"
            scope="Runs in your CI"
          />
          <SchedRow
            where="/loop (in-session polling)"
            best='Quick "keep checking until X" while a session is open. Tasks stop when you start a new conversation.'
            setup="/loop 5m <command>"
            scope="Runs in your current CLI session"
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Prompt craft for scheduled tasks
        </h2>
        <Callout variant="tip" title="The autonomous-task rule">
          When Claude runs unattended, it can&apos;t ask clarifying questions. So prompts for scheduled tasks need
          to be <em>explicit about success and failure.</em>
        </Callout>
        <CodeBlock title="Example — daily open-PR review">{`Review open PRs labeled 'needs-review'. For each:

1. Leave inline comments on anything that looks wrong (security, perf, missing tests).
2. If everything looks good, leave a "LGTM with minor nits" summary.
3. Post a summary in #eng-reviews on Slack: "Reviewed N PRs today. Flagged M for manual review."

If any PR has more than 2,000 lines changed, skip it and flag it for human review instead.
If you can't complete the review for any reason, post the error in #eng-reviews and stop.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Three things every autonomous prompt needs:
        </p>
        <ul className="list-none space-y-2 mt-2">
          <li className="pl-6 relative">
            <span className="absolute left-0 text-[color:var(--color-primary)]">&#8250;</span>
            <span className="text-[#bbb] text-sm">A clear success signal (what to report)</span>
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 text-[color:var(--color-primary)]">&#8250;</span>
            <span className="text-[#bbb] text-sm">An explicit skip rule (when to punt to humans)</span>
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 text-[color:var(--color-primary)]">&#8250;</span>
            <span className="text-[#bbb] text-sm">A failure behavior (post error + stop, don&apos;t silently fail)</span>
          </li>
        </ul>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Where this lands for consulting work
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Automation pays off for rituals that recur and aren&apos;t decision-heavy. A few consulting examples:
        </p>
        <div className="grid gap-3">
          <UseCase
            title="Monday morning client digest"
            body="Routine that reads client emails from the past week, summarizes what's open vs resolved, posts to your daily note in Obsidian. Runs at 7am Monday whether you're at your desk or not."
          />
          <UseCase
            title="End-of-week status generation"
            body="Scheduled task that reads your daily notes from the past 5 days, builds a standard status template, writes it to a shared folder. Friday 4pm ritual becomes zero work."
          />
          <UseCase
            title="Competitive alert"
            body="Routine that watches a list of competitor blogs/feeds, summarizes new posts that mention keywords you care about, pings Slack if anything high-signal lands. Sleeps when nothing's interesting."
          />
          <UseCase
            title="Post-mortem kickoff"
            body="When Slack posts an incident alert, GitHub Action triggers Claude to create an incident doc with a template, attach the timeline from Slack, ping the right people. Saves 15 minutes of structure work in a moment nobody has 15 minutes."
          />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/tips-mistakes"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Tips &amp; common mistakes &rarr;
        </Link>
      </section>
    </>
  );
}

function SchedRow({
  where,
  best,
  setup,
  scope,
}: {
  where: string;
  best: string;
  setup: string;
  scope: string;
}) {
  return (
    <div className="p-4 border-t border-[var(--color-border)] first:border-t-0">
      <div className="font-[family-name:var(--font-body)] font-semibold text-white text-sm mb-2">{where}</div>
      <div className="grid md:grid-cols-[90px_1fr] gap-x-4 gap-y-1 text-xs">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Best for
        </div>
        <div className="text-[#bbb] leading-relaxed">{best}</div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Setup
        </div>
        <div className="text-[#ccc] leading-relaxed font-mono">{setup}</div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Scope
        </div>
        <div className="text-[#888] leading-relaxed italic">{scope}</div>
      </div>
    </div>
  );
}

function UseCase({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4">
      <div className="font-[family-name:var(--font-body)] font-semibold text-white text-sm mb-1">{title}</div>
      <p className="text-[#bbb] text-sm leading-relaxed">{body}</p>
    </div>
  );
}
