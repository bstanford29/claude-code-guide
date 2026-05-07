import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { CodexAppAgentsMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex worktrees',
  description: 'Use Codex worktrees to isolate parallel code changes.',
};

export default function CodexWorktreesPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Worktrees"
        subtitle="Worktrees let parallel Codex tasks edit separate working copies instead of fighting over one checkout."
        lastValidated="2026-05-07"
      />

      <CodexAppAgentsMockup />

      <section className="mt-12">
        <CompareTable
          leftHeader="Use worktrees"
          rightHeader="Stay in one checkout"
          rows={[
            {
              label: 'Parallel tasks',
              left: 'Two independent features or a writer/reviewer split.',
              right: 'One small sequential patch.',
            },
            {
              label: 'Risk',
              left: 'You want isolated diffs and easier rollback.',
              right: 'You are changing shared foundational files.',
            },
            {
              label: 'Cleanup',
              left: 'Delete the worktree after merge or rejection.',
              right: 'No extra cleanup beyond normal Git state.',
            },
          ]}
        />
      </section>
    </>
  );
}
