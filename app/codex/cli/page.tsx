import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodexCliMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex CLI',
  description: 'Codex CLI basics: local repo context, approvals, sandboxing, MCP, web search, and review.',
};

export default function CodexCliPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Codex CLI"
        subtitle="Run Codex locally in your terminal. It can inspect, edit, run commands, review code, use MCP, and launch cloud tasks from the selected directory."
        lastValidated="2026-05-07"
      />

      <CodexCliMockup />

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-white">Three commands to know</h2>
        <CodeBlock title="Daily CLI loop">{`codex
codex --search "what changed in Next.js app routing?"
codex mcp --help`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Launch from the project root. Codex reads the current directory, discovers instructions such as
          <code> AGENTS.md</code>, and uses your sandbox and approval policy to decide what requires confirmation.
        </p>
      </section>

      <section className="mt-12">
        <CompareTable
          leftHeader="Mode"
          rightHeader="Practical meaning"
          rows={[
            {
              label: 'Read-only',
              left: 'Codex can inspect files.',
              right: 'Use for audits, explanations, and risk review before edits.',
            },
            {
              label: 'Workspace-write',
              left: 'Codex can edit within the workspace and run routine local commands.',
              right: 'Best default for local implementation work with approvals for wider access.',
            },
            {
              label: 'Danger full access',
              left: 'No filesystem or network boundary.',
              right: 'Avoid for normal guide workflows; it is only appropriate when you intentionally want full access.',
            },
          ]}
        />
      </section>

      <section className="mt-12">
        <Callout variant="warn" title="Approval hygiene">
          Keep prompts scoped. A good approval decision is easy because the requested edit or command is small enough
          to review. If Codex asks for broad access and you do not understand why, stop and narrow the task.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link href="/codex/approvals-sandbox" className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors">
          Approvals and sandbox &rarr;
        </Link>
      </section>
    </>
  );
}
