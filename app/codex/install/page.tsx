import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';
import { CodexCliMockup, CodexAppProjectMockup, CodexIdeMockup } from '@/components/codex-mockups';

export const metadata = {
  title: 'Install Codex',
  description: 'Install Codex CLI, desktop app, and IDE extension.',
};

export default function CodexInstallPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Install Codex"
        subtitle="Set up the terminal, desktop app, and IDE extension. Use the CLI for the first local smoke test."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-white">Option 1 - CLI</h2>
        <p className="text-[#bbb] leading-relaxed">
          Install the Codex CLI globally, open a project folder, and run <code>codex</code>. First launch prompts you
          to sign in with a ChatGPT account or API key.
        </p>
        <CodeBlock title="Install and launch">{`npm i -g @openai/codex
cd ~/your-project
codex`}</CodeBlock>
        <CodexCliMockup />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-white">Option 2 - Desktop app</h2>
        <p className="text-[#bbb] leading-relaxed">
          Use the Codex app when you want a visual command center: project history, parallel threads, review panes,
          local/worktree/cloud modes, automations, and Git flows in one window.
        </p>
        <CodexAppProjectMockup />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-white">Option 3 - IDE extension</h2>
        <p className="text-[#bbb] leading-relaxed">
          Use the IDE extension for editor-native context. Current official docs list VS Code, VS Code forks such as
          Cursor and Windsurf, and JetBrains IDEs.
        </p>
        <CodexIdeMockup />
      </section>

      <section className="mt-12">
        <CompareTable
          leftHeader="Start here"
          rightHeader="Use it when"
          rows={[
            {
              label: 'CLI',
              left: 'Fastest install and easiest smoke test',
              right: 'You want Codex local, scriptable, and close to Git/test commands.',
            },
            {
              label: 'App',
              left: 'Best visual onboarding path',
              right: 'You want multiple threads, worktrees, review panes, and automations.',
            },
            {
              label: 'IDE',
              left: 'Best editor-context path',
              right: 'You want selected text, active file context, and cloud handoff from the sidebar.',
            },
          ]}
        />
        <Callout variant="tip" title="First verification">
          After install, ask Codex to read the repo and explain the test commands before you ask it to edit anything.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link href="/codex/first-session" className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors">
          Run your first Codex session &rarr;
        </Link>
      </section>
    </>
  );
}
