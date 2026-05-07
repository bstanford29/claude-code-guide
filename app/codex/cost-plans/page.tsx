import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Codex cost and plans',
  description: 'Understand Codex access, usage hygiene, and cost-aware workflows.',
};

export default function CodexCostPlansPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="Cost and plans"
        subtitle="Treat exact limits as volatile. Teach habits that reduce waste regardless of plan."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <CompareTable
          leftHeader="Cost driver"
          rightHeader="Habit"
          rows={[
            {
              label: 'Context size',
              left: 'Large repos, pasted logs, and broad prompts increase work.',
              right: 'Point Codex at the exact files or failure output.',
            },
            {
              label: 'Parallel agents',
              left: 'Subagents multiply model and tool usage.',
              right: 'Use them only for independent lanes.',
            },
            {
              label: 'Cloud tasks',
              left: 'Background tasks can keep working while you are away.',
              right: 'Constrain the ask, expected output, and review boundary.',
            },
          ]}
        />
        <Callout variant="info" title="Plan wording">
          Use official pricing pages for current plan inclusion and limits. Do not hardcode message counts in training
          material.
        </Callout>
      </section>
    </>
  );
}
