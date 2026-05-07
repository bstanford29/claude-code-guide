import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Codex approvals and sandbox',
  description: 'Use Codex approval and sandbox settings safely.',
};

export default function CodexApprovalsSandboxPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Approvals and sandbox"
        subtitle="The safety model is simple: what can Codex read, where can it write, and when must it ask?"
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <CompareTable
          leftHeader="Sandbox mode"
          rightHeader="Use it for"
          rows={[
            {
              label: 'read-only',
              left: 'Inspect files without editing.',
              right: 'Architecture reviews, onboarding, risk scans, or asking questions.',
            },
            {
              label: 'workspace-write',
              left: 'Read and edit inside the workspace.',
              right: 'Normal local implementation work.',
            },
            {
              label: 'danger-full-access',
              left: 'No sandbox boundary.',
              right: 'Rare cases where you deliberately want full machine access.',
            },
          ]}
        />

        <CompareTable
          leftHeader="Approval policy"
          rightHeader="Meaning"
          rows={[
            {
              label: 'untrusted',
              left: 'Ask before commands outside trusted reads.',
              right: 'Good when you are learning what commands Codex wants to run.',
            },
            {
              label: 'on-request',
              left: 'Work inside sandbox and ask for boundary-crossing actions.',
              right: 'Best balance for most local coding.',
            },
            {
              label: 'never',
              left: 'Do not pause for approval prompts.',
              right: 'Only use for carefully constrained automation.',
            },
          ]}
        />
      </section>

      <section className="mt-12">
        <CodeBlock title="Lower-risk local default">{`codex --sandbox workspace-write --ask-for-approval on-request`}</CodeBlock>
        <Callout variant="warn" title="Avoid full access by habit">
          Full access removes the filesystem and network boundaries. If a guide prompt needs full access, rewrite the
          prompt or use a narrower writable root first.
        </Callout>
      </section>
    </>
  );
}
