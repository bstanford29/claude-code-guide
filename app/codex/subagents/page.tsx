import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodexAppAgentsMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex subagents',
  description: 'Use Codex subagents for parallel investigation, implementation, and review.',
};

export default function CodexSubagentsPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Subagents"
        subtitle="Subagents are useful when the work has independent questions or disjoint implementation lanes."
        lastValidated="2026-05-07"
      />

      <CodexAppAgentsMockup />

      <section className="mt-12">
        <CompareTable
          leftHeader="Good subagent split"
          rightHeader="Bad subagent split"
          rows={[
            {
              label: 'Research',
              left: 'One agent reviews auth, one reviews billing, one reviews tests.',
              right: 'Three agents all inspect the same file for the same bug.',
            },
            {
              label: 'Implementation',
              left: 'Worker A owns UI files; Worker B owns route tests.',
              right: 'Two agents edit the same component at once.',
            },
            {
              label: 'Review',
              left: 'Spec reviewer then code-quality reviewer.',
              right: 'Reviewer starts before the implementation is complete.',
            },
          ]}
        />
        <Callout variant="warn" title="Subagents cost more">
          They do extra model and tool work. Use them when parallelism or fresh context is worth the cost.
        </Callout>
      </section>
    </>
  );
}
