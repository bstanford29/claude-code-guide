import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Codex skills',
  description: 'Use Codex skills for reusable instructions and workflows.',
};

export default function CodexSkillsPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Codex skills"
        subtitle="Skills package repeatable instructions so Codex can run a workflow consistently across app, CLI, and IDE sessions."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <CodeBlock title="Skill idea">{`---
name: weekly-pr-review
description: Review this week's PRs and produce a short engineering digest
---

1. Find merged PRs from this week.
2. Group by product area.
3. Summarize risks, tests, and follow-ups.
4. Keep the final output executive-readable.`}</CodeBlock>
        <Callout variant="tip" title="Skill threshold">
          Build a skill only after you have repeated the prompt three times and know the exact shape of the desired
          output.
        </Callout>
      </section>

      <section className="mt-12">
        <CompareTable
          leftHeader="Use a prompt"
          rightHeader="Use a skill"
          rows={[
            {
              label: 'Frequency',
              left: 'One-off task.',
              right: 'Repeated weekly, per PR, per release, or per client.',
            },
            {
              label: 'Audience',
              left: 'Only you need the output.',
              right: 'A team needs the same standard every time.',
            },
            {
              label: 'Workflow',
              left: 'Simple ask and answer.',
              right: 'Multi-step read, analyze, format, verify, and summarize loop.',
            },
          ]}
        />
      </section>
    </>
  );
}
