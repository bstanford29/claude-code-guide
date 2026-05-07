import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodexAppAgentsMockup, CodexAppProjectMockup, CodexPrReviewMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex app',
  description: 'Codex desktop app: parallel local threads, worktrees, automations, browser flows, and Git review.',
};

export default function CodexAppPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Codex desktop app"
        subtitle="A visual command center for local threads, worktrees, review panes, automations, and Git workflows."
        lastValidated="2026-05-07"
      />

      <CodexAppProjectMockup />
      <CodexAppAgentsMockup />
      <CodexPrReviewMockup />

      <section className="mt-12">
        <CompareTable
          leftHeader="App feature"
          rightHeader="Why it matters"
          rows={[
            {
              label: 'Parallel threads',
              left: 'Run multiple project tasks without losing context.',
              right: 'Useful when one agent is reading or testing while another reviews a separate area.',
            },
            {
              label: 'Worktrees',
              left: 'Keep changes isolated in separate Git working copies.',
              right: 'Prevents two parallel tasks from editing the same checkout.',
            },
            {
              label: 'Review pane',
              left: 'Inspect diffs, stage, commit, push, and prepare PRs.',
              right: 'Keeps the shipping path visible instead of hidden in terminal output.',
            },
          ]}
        />
        <Callout variant="info" title="Platform note">
          Official docs describe the Codex app as available on macOS and Windows, with most features shared across
          platforms. Treat platform-specific claims as volatile and verify before training a team.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link href="/codex/worktrees" className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors">
          Codex worktrees &rarr;
        </Link>
      </section>
    </>
  );
}
