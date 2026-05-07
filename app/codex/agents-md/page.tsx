import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { AgentsMdPreview } from '@/components/codex-mockups';

export const metadata = {
  title: 'Codex AGENTS.md',
  description: 'Use AGENTS.md to give Codex durable project instructions.',
};

export default function CodexAgentsMdPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="AGENTS.md"
        subtitle="Codex reads layered instruction files before work: global guidance, then project guidance from the repo root down to the working directory."
        lastValidated="2026-05-07"
      />

      <AgentsMdPreview />

      <section className="mt-12">
        <CodeBlock title="Starter AGENTS.md">{`# Repository Instructions

## Project Shape
- Framework: Next.js App Router
- Package manager: npm
- Main app directory: app/

## Commands
- Build: npm run build
- Lint: npm run lint

## Working Rules
- Read before editing.
- Keep changes scoped.
- Run checks before declaring done.`}</CodeBlock>
      </section>

      <section className="mt-12">
        <CompareTable
          leftHeader="Instruction level"
          rightHeader="What belongs there"
          rows={[
            {
              label: 'Global',
              left: '~/.codex/AGENTS.md or override file',
              right: 'Personal working preferences that apply everywhere.',
            },
            {
              label: 'Repo root',
              left: 'AGENTS.md at the Git root',
              right: 'Project shape, commands, test policy, and review expectations.',
            },
            {
              label: 'Nested directory',
              left: 'AGENTS.md or override near specialized code',
              right: 'Rules for one package, service, or domain.',
            },
          ]}
        />
      </section>
    </>
  );
}
