import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodexAutomationMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex automations',
  description: 'Use Codex automations for recurring tasks with clear prompts and safety boundaries.',
};

export default function CodexAutomationsPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Automations"
        subtitle="Schedule recurring Codex work only after the same prompt succeeds manually."
        lastValidated="2026-05-07"
      />

      <CodexAutomationMockup />

      <section className="mt-12">
        <CodeBlock title="Automation-ready prompt shape">{`Check the open PRs assigned to me.
For each PR:
1. Summarize status in one sentence.
2. List failing checks.
3. Flag review comments that need my response.
4. Do not modify files.`}</CodeBlock>
        <CompareTable
          leftHeader="Good automation"
          rightHeader="Risky automation"
          rows={[
            {
              label: 'Output',
              left: 'Summary, triage, recommendation.',
              right: 'Unreviewed code changes.',
            },
            {
              label: 'Permissions',
              left: 'Read-only or tightly scoped workspace-write.',
              right: 'Full access with vague task text.',
            },
            {
              label: 'Prompt',
              left: 'Tested manually with known output shape.',
              right: 'First attempt is scheduled unattended.',
            },
          ]}
        />
        <Callout variant="warn" title="Manual first">
          If you have not run the prompt manually and reviewed the result, it is not automation-ready.
        </Callout>
      </section>
    </>
  );
}
