import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodexCloudTaskMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex web and cloud',
  description: 'Delegate Codex tasks to the cloud with GitHub-connected environments.',
};

export default function CodexWebCloudPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Codex web and cloud"
        subtitle="Use cloud tasks when work can run in the background against a GitHub repo and produce a reviewable diff or pull request."
        lastValidated="2026-05-07"
      />

      <CodexCloudTaskMockup />

      <section className="mt-12">
        <CompareTable
          leftHeader="Good cloud task"
          rightHeader="Bad cloud task"
          rows={[
            {
              label: 'Scope',
              left: 'Fix this failing test in the billing package.',
              right: 'Make the app better.',
            },
            {
              label: 'Environment',
              left: 'Repo connected, setup commands known, dependencies documented.',
              right: 'Requires private systems or undocumented local state.',
            },
            {
              label: 'Review path',
              left: 'Produces a PR or diff you can inspect.',
              right: 'Ships directly without human review.',
            },
          ]}
        />
        <Callout variant="info" title="Cloud is not local">
          Cloud tasks run in an OpenAI cloud environment connected to GitHub. Do not describe them as running on your
          laptop, and do not assume they can see local-only files.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link href="/codex/git-github" className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors">
          Git and GitHub workflows &rarr;
        </Link>
      </section>
    </>
  );
}
