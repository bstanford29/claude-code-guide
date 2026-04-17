import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'Permissions',
  description:
    'Four tiers of safety: default prompts, auto mode, allowlists, and OS sandbox. When to loosen, when to tighten.',
};

export default function PermissionsPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="The permission model"
        subtitle="Four tiers from 'ask me everything' to 'sandbox it and let it run.' Know where you are and why."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Why permissions exist
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Claude Code can do real things on your machine &mdash; edit files, run shell commands, commit to git, call
          external APIs. That&apos;s the whole point. It&apos;s also the reason it asks you to approve the risky
          stuff. Permissions are how you dial the tradeoff between{' '}
          <em className="text-white">&ldquo;I approve every single thing&rdquo;</em> and{' '}
          <em className="text-white">&ldquo;go make progress, ping me if something weird comes up.&rdquo;</em>
        </p>
        <p className="text-[#bbb] leading-relaxed">
          Don&apos;t stay on the strictest setting forever &mdash; after the 50th time you approve{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">npm run lint</code>
          , you&apos;re not really reviewing, you&apos;re just clicking through. But don&apos;t start at the loosest
          setting either. Loosen deliberately as you build trust.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          The four tiers
        </h2>

        <div className="space-y-4">
          <TierRow
            level="1"
            name="Default — approve every action"
            color="var(--color-primary)"
            use="New to Claude Code, new to a project, or doing destructive work"
            how="Nothing to configure — this is the out-of-the-box behavior"
            looks={`Claude wants to edit src/auth.ts
Allow? (y/n/e)`}
          />
          <TierRow
            level="2"
            name="Auto mode — a classifier reviews"
            color="#e2c275"
            use="You trust the overall direction of a task but don't want to click through every step"
            how="claude --permission-mode auto"
            looks="A separate classifier model reviews each command and only blocks risky stuff (scope escalation, unknown infrastructure, hostile content). Safe commands proceed without prompting."
          />
          <TierRow
            level="3"
            name="Allowlist — permit specific known-safe tools"
            color="#9dc088"
            use="You have commands you approve over and over — linter, tests, git commit"
            how="/permissions inside a session, or add to .claude/settings.json"
            looks={`"allow": ["Bash(npm run lint:*)", "Bash(git commit *)"]`}
          />
          <TierRow
            level="4"
            name="Sandbox — OS-level isolation"
            color="#a89bd3"
            use="Letting Claude work unattended on untrusted code or long-running agents"
            how="claude --permission-mode sandbox  (or /sandbox in session)"
            looks="Claude runs in an OS-enforced bubble — restricted filesystem access, restricted network. Works more freely inside the bubble, can't escape it."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Picking the right tier for the moment
        </h2>
        <CompareTable
          leftHeader="If you're doing…"
          rightHeader="…pick this tier"
          rows={[
            {
              label: 'First session on a client codebase',
              left: 'You want to see every action',
              right: <strong>Default</strong>,
            },
            {
              label: 'Writing a feature you understand well',
              left: 'You trust the direction, don\u2019t want to babysit',
              right: <strong>Auto mode</strong>,
            },
            {
              label: 'Running a routine command 20 times',
              left: <>e.g. <code>npm run lint</code></>,
              right: <><strong>Allowlist</strong> that specific command</>,
            },
            {
              label: 'Overnight or unattended work',
              left: 'You won\u2019t be watching',
              right: <strong>Sandbox</strong>,
            },
            {
              label: 'Production migrations, delete operations',
              left: 'One bad step is expensive',
              right: (
                <>
                  <strong>Default</strong> (re-tighten)
                </>
              ),
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Allowlist syntax
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The allowlist lives in{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            .claude/settings.json
          </code>
          at your project root (or globally in{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            ~/.claude/settings.json
          </code>
          ). You&apos;re declaring specific commands Claude can run without asking.
        </p>
        <CodeBlock title=".claude/settings.json">{`{
  "permissions": {
    "allow": [
      "Bash(npm run lint:*)",
      "Bash(npm test:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Read(*)",
      "WebFetch(domain:docs.anthropic.com)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push *)",
      "Bash(npm publish:*)"
    ]
  }
}`}</CodeBlock>
        <p className="text-[#bbb] text-sm leading-relaxed">
          Deny wins over allow. Use{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            /permissions
          </code>{' '}
          inside a session to see what&apos;s currently allowed or edit the file directly.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Default permission mode for a project
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          If every session on a project should start in a specific mode (e.g., plan mode for risky codebases), set it
          once:
        </p>
        <CodeBlock title=".claude/settings.json">{`{
  "permissions": {
    "defaultMode": "plan"
  }
}`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Now every{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">claude</code>{' '}
          launch in that folder starts in plan mode. Other valid values:{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            default
          </code>
          ,{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">auto</code>,{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">sandbox</code>
          .
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          The universal rule
        </h2>
        <DefinitionBox
          term="the permission reflex"
          whatItIs="A habit: any time you change what Claude is working on, re-check your permission mode."
          whyItMatters="The mistake everyone makes: loosening permissions for a specific safe task, then forgetting to tighten them for the next (riskier) task. You approved auto mode for a refactor; two prompts later you're in production migration territory with auto mode still on."
          example={
            <>
              Between tasks, a quick{' '}
              <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
                /permissions
              </code>{' '}
              tells you where you are. Takes 3 seconds, saves hours.
            </>
          }
        />
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/claude-md"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          CLAUDE.md &mdash; the instruction manual for your project &rarr;
        </Link>
      </section>
    </>
  );
}

function TierRow({
  level,
  name,
  color,
  use,
  how,
  looks,
}: {
  level: string;
  name: string;
  color: string;
  use: string;
  how: string;
  looks: string;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-baseline gap-3 mb-3">
        <span
          className="font-[family-name:var(--font-display)] font-extrabold text-xl"
          style={{ color }}
          aria-hidden
        >
          {level}
        </span>
        <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white leading-tight">{name}</h3>
      </div>
      <div className="grid md:grid-cols-[100px_1fr] gap-x-4 gap-y-2 text-sm pl-8">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          When to use
        </div>
        <div className="text-[#bbb] leading-relaxed">{use}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          How to enter
        </div>
        <div className="text-[#bbb] leading-relaxed font-mono text-xs">{how}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          What it looks like
        </div>
        <div className="text-[#888] leading-relaxed font-mono text-xs whitespace-pre-wrap">{looks}</div>
      </div>
    </div>
  );
}
