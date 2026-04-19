import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { CompareTable } from '@/components/compare-table';

export const metadata = {
  title: 'Cost & plans',
  description: 'Pro vs Max, context hygiene, and the habits that keep you off the wrong side of a usage cap.',
};

export default function CostPlansPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Cost &amp; plans"
        subtitle="Which plan to buy, and how to not waste it. Plus the three habits that stretch usage ~3x without changing your work."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Plan picker &mdash; Pro vs. Max
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Anthropic sells Claude Code access through Pro and Max subscriptions. Pro is{' '}
          <strong className="text-white">$20/month</strong>; Max is{' '}
          <strong className="text-white">$100/month</strong> or{' '}
          <strong className="text-white">$200/month</strong> (the $200 tier gets the biggest usage headroom and
          priority access).
        </p>

        <CompareTable
          leftHeader="Pro ($20/mo)"
          rightHeader="Max ($100 or $200/mo)"
          rows={[
            {
              label: 'Good for',
              left: 'First 2–4 weeks of trying Claude Code. Side projects. Occasional use.',
              right: 'Primary tool for daily work, long sessions, client deliverables.',
            },
            {
              label: 'Hit a cap during a session?',
              left: 'Expect it once a week if you use Claude seriously',
              right: 'Basically never. $200 tier has the most headroom.',
            },
            {
              label: 'Extended thinking budget',
              left: 'Enabled but capped',
              right: 'Full adaptive reasoning — Opus 4.7 decides freely',
            },
            {
              label: 'Recommendation',
              left: 'Start here. You only waste $20 finding out.',
              right: 'Upgrade the first week you catch yourself rate-limited on real client work.',
            },
          ]}
        />

        <Callout variant="info" title="The upgrade signal">
          You&apos;ve hit the &ldquo;time to upgrade&rdquo; threshold the moment a Pro cap interrupts you mid-task on
          something that has a deadline. Annoying once is fine. Annoying during a client Friday is ~$180 of lost
          context-rebuild time, which is most of a Max upgrade.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Context is money
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Every prompt, file read, and command output consumes your context window. Context usage is what burns
          your plan usage. Three habits triple your effective cap:
        </p>

        <div className="space-y-3 mt-6">
          <Habit
            num="1"
            title="/clear between unrelated tasks"
            body="The single biggest lever. A session that drifts across 4 unrelated topics carries 4× the context of each — even though you only care about the current one. When you switch tasks, /clear. Re-establish context fresh."
          />
          <Habit
            num="2"
            title="/compact for long sessions"
            body="Inside one long task (a big refactor, a deep debug), context fills with file reads and failed attempts. /compact summarizes what matters — key decisions, file states, test commands — and frees the rest. Claude keeps working with the summary."
          />
          <Habit
            num="3"
            title="Use subagents for investigation"
            body="When you need Claude to read 30 files to understand one system, that's 30 file-loads in your main context. Instead: 'Use a subagent to investigate X.' Subagent runs in its own context window and reports back with findings. Your main session stays lean."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Watch your cost in real time
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Two commands keep you honest:
        </p>
        <CodeBlock>{`/cost            # current session cost + % of plan used
/ide statusline  # ongoing context usage in the terminal`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Install a status line and you stop being surprised. The first time you watch context usage tick up during
          a session you&apos;ll intuitively understand why a rogue{' '}
          <em>&ldquo;read every file in /docs&rdquo;</em> is a bad idea.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Headless mode &mdash; free work
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          For automated jobs (CI checks, batch scripts, linters), use non-interactive mode. Same AI, no session UI,
          easy to pipe in and out:
        </p>
        <CodeBlock>{`# One-shot query
claude -p "summarize the commits on this branch"

# Pipe data in
cat error.log | claude -p "explain the root cause"

# JSON out for downstream processing
cat code.py | claude -p "audit for bugs" --output-format json > audit.json

# Structured CI use
claude -p "you are a linter. report typos in the files changed vs. main." \\
  --allowedTools "Read" > review.txt`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Automated jobs billed against your plan like interactive sessions. The win isn&apos;t that it&apos;s free
          &mdash; it&apos;s that you avoid babysitting: run 50 file audits overnight instead of walking each one
          through a session.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The anti-patterns that burn cap
        </h2>
        <div className="grid gap-3">
          <AntiPattern
            name="The kitchen-sink session"
            cost="Context full of unrelated previous tasks. Claude gets slower and more confused."
            fix="/clear between tasks. Sessions are free to spin up."
          />
          <AntiPattern
            name="Reading whole folders 'just in case'"
            cost="'read everything in /src' can load 200 files. Each one eats context and plan usage."
            fix="Point Claude at specific files. Let it ask for more if it needs them."
          />
          <AntiPattern
            name="Correcting 5 times on the same issue"
            cost="Each correction adds another failed attempt to context. Claude is now trying to learn from wrong attempts."
            fix="After two corrections, /clear and start fresh with a better prompt that incorporates what you learned."
          />
          <AntiPattern
            name="Not using subagents for research"
            cost="Every file Claude reads to 'investigate how X works' stays in your main context."
            fix="'Use a subagent to investigate X' — subagent burns its own context, reports back a summary."
          />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/skills"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Skills &mdash; reusable workflows &rarr;
        </Link>
      </section>
    </>
  );
}

function Habit({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-5 flex items-start gap-4">
      <span className="font-[family-name:var(--font-display)] font-extrabold text-3xl text-[color:var(--tier-b)]/70 w-8 shrink-0">
        {num}
      </span>
      <div>
        <div className="font-[family-name:var(--font-body)] font-semibold text-white mb-1">{title}</div>
        <p className="text-[#bbb] text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function AntiPattern({ name, cost, fix }: { name: string; cost: string; fix: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 space-y-2">
      <div className="font-[family-name:var(--font-body)] font-semibold text-white text-sm">{name}</div>
      <div className="flex items-start gap-3">
        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-red-400 pt-0.5 w-12">
          Cost
        </span>
        <p className="text-[#aaa] text-xs leading-relaxed">{cost}</p>
      </div>
      <div className="flex items-start gap-3">
        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-emerald-400 pt-0.5 w-12">
          Fix
        </span>
        <p className="text-[#ccc] text-xs leading-relaxed">{fix}</p>
      </div>
    </div>
  );
}
