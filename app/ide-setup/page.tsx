import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { DecisionGrid } from '@/components/decision-grid';
import { CodexIdeMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'IDE setup',
  description: 'How to use Claude Code and Codex from VS Code, forks, JetBrains IDEs, and IDE terminals.',
};

export default function IdeSetupPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="IDE setup for Claude Code and Codex"
        subtitle="Use the IDE when editor context, native diffs, diagnostics, and selection sharing matter. Fall back to the CLI in the integrated terminal when support is unclear."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <Callout variant="info" title="Safe baseline">
          Both tools work from an IDE integrated terminal as long as the terminal starts in the project root. Dedicated
          IDE integrations add convenience, but the terminal fallback is the lowest-risk setup for mixed teams.
        </Callout>
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Claude Code in IDEs
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Claude Code works in any IDE that has a terminal. For VS Code and common VS Code forks, run Claude Code from
          the integrated terminal. Dedicated integrations can provide IDE diff viewing, selection context, file
          references, and diagnostics sharing. JetBrains IDE support is available through the Claude Code plugin path.
        </p>
        <CodeBlock title="VS Code, Cursor, Windsurf, or VSCodium integrated terminal">{`cd /path/to/project
claude`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          If Claude Code is already running in an external terminal, use <code className="text-[color:var(--color-primary)]">/ide</code>{' '}
          to connect that session to the IDE and enable the integration features for the current project.
        </p>
        <CodeBlock title="External terminal connected to an IDE">{`cd /path/to/project
claude

/ide`}</CodeBlock>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Codex in IDEs
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Codex has separate CLI, app, IDE, and cloud surfaces. Current OpenAI guidance presents the Codex IDE
          extension for VS Code and common VS Code forks such as Cursor and Windsurf. Codex is also available in
          JetBrains IDE workflows through JetBrains AI Assistant on supported versions. Availability can depend on
          account, workspace policy, IDE version, and plugin version, so verify inside the specific IDE.
        </p>
        <CodexIdeMockup />
        <CodeBlock title="Fallback that works in any IDE terminal">{`cd /path/to/project
codex`}</CodeBlock>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Which IDE path to use
        </h2>
        <CompareTable
          leftHeader="Claude Code"
          rightHeader="Codex"
          rows={[
            {
              label: 'VS Code',
              left: 'Run `claude` from the integrated terminal. If needed, use `/ide` from an external terminal to connect.',
              right: 'Use the Codex IDE extension when available, or run `codex` from the integrated terminal.',
            },
            {
              label: 'Cursor',
              left: 'Use the VS Code-family path: integrated terminal first, with IDE features when detected.',
              right: 'Use the VS Code-compatible extension path when available, or the integrated terminal fallback.',
            },
            {
              label: 'Windsurf',
              left: 'Use the VS Code-family path if the matching command and extension install correctly.',
              right: 'Use Codex IDE support where available. If extension behavior lags, run the CLI in the terminal.',
            },
            {
              label: 'JetBrains',
              left: 'Use the Claude Code JetBrains plugin path or run `claude` inside the IDE terminal from the project root.',
              right: 'Use Codex through supported JetBrains AI Assistant workflows when available, or run `codex` in the IDE terminal.',
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Setup checks
        </h2>
        <DecisionGrid
          items={[
            {
              title: 'Start from the project root',
              body:
                'The agent should see the same repository root as the IDE. This avoids missing files, wrong relative paths, and confusing diffs.',
            },
            {
              title: 'Confirm the command is on PATH',
              body:
                'For VS Code-family IDEs, make sure the IDE command and the agent CLI command are available in the integrated terminal.',
            },
            {
              title: 'Use native diffs for risky edits',
              body:
                'If a change is client-visible, prefer an IDE or app diff view over scanning a long terminal patch.',
            },
            {
              title: 'Fallback without drama',
              body:
                'If extension install, account auth, or JetBrains availability is unclear, run the CLI in the IDE terminal and keep moving.',
            },
          ]}
        />
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link
          href="/agent-files"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Agent files: CLAUDE.md and AGENTS.md &rarr;
        </Link>
      </section>
    </>
  );
}
