import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodexIdeMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex IDE extension',
  description: 'Codex in VS Code, Cursor, Windsurf, and JetBrains IDEs.',
};

export default function CodexIdePage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Codex in your IDE"
        subtitle="Use Codex in the editor sidebar for local questions, targeted edits, and cloud delegation without leaving your code review flow."
        lastValidated="2026-05-07"
      />

      <CodexIdeMockup />

      <section className="mt-12">
        <CompareTable
          leftHeader="Editor"
          rightHeader="Setup note"
          rows={[
            {
              label: 'VS Code',
              left: 'Install the extension and sign in.',
              right: 'Codex opens in the sidebar; use it next to your editor and terminal.',
            },
            {
              label: 'Cursor / Windsurf',
              left: 'Use the VS Code-style extension path.',
              right: 'If the activity bar hides it, pin or reorganize the sidebar.',
            },
            {
              label: 'JetBrains',
              left: 'Use the JetBrains integration path.',
              right: 'Good for IntelliJ, PyCharm, WebStorm, Rider, and related IDEs.',
            },
          ]}
        />
        <Callout variant="tip" title="IDE vs CLI">
          Use the IDE extension when the active editor state matters. Use the CLI when the shell, scripts, or repo-wide
          command output is the center of gravity.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link href="/ide-setup" className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors">
          Compare Claude and Codex IDE setup &rarr;
        </Link>
      </section>
    </>
  );
}
