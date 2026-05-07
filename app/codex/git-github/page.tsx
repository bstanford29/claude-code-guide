import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodexPrReviewMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex Git and GitHub',
  description: 'Use Codex with Git, GitHub, PR reviews, and @codex delegation.',
};

export default function CodexGitGithubPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Git and GitHub"
        subtitle="The goal is not to let Codex merge code. The goal is to make Codex produce smaller, reviewable changes."
        lastValidated="2026-05-07"
      />

      <CodexPrReviewMockup />

      <section className="mt-12">
        <CompareTable
          leftHeader="Workflow"
          rightHeader="Use it when"
          rows={[
            {
              label: 'Local diff review',
              left: 'Codex edits files, you review the diff before staging.',
              right: 'Small local changes where you can run checks immediately.',
            },
            {
              label: 'PR review',
              left: 'Ask Codex to review a branch or proposed patch.',
              right: 'You want a second agent focused on bugs, tests, and maintainability.',
            },
            {
              label: '@codex in GitHub',
              left: 'Delegate from an issue or PR comment.',
              right: 'Background work with a clear repo, task, and expected PR outcome.',
            },
          ]}
        />
        <Callout variant="warn" title="Review still belongs to you">
          Codex can propose, explain, and test. You still own the merge decision, especially for migrations,
          permissions, production data paths, and security-sensitive code.
        </Callout>
      </section>
    </>
  );
}
