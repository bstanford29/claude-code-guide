import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Codex MCP and connectors',
  description: 'Connect Codex to MCP servers and external tools.',
};

export default function CodexMcpConnectorsPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="MCP and connectors"
        subtitle="MCP gives Codex tool access beyond the repo: docs, GitHub, design systems, browsers, observability, and internal systems."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <p className="text-[#bbb] leading-relaxed">
          Codex stores MCP configuration alongside other Codex settings, commonly in <code>~/.codex/config.toml</code>.
          The CLI and IDE extension share that configuration.
        </p>
        <CodeBlock title="Add an MCP server">{`codex mcp add context7 -- npx -y @upstash/context7-mcp
codex mcp --help`}</CodeBlock>
      </section>

      <section className="mt-12">
        <CompareTable
          leftHeader="Connector"
          rightHeader="Why a consultant would care"
          rows={[
            {
              label: 'OpenAI Docs MCP',
              left: 'Search current OpenAI developer docs.',
              right: 'Keeps Codex implementation advice grounded in current APIs.',
            },
            {
              label: 'GitHub',
              left: 'Issues, PRs, review comments, and repo context.',
              right: 'Turns code review and backlog grooming into agent work.',
            },
            {
              label: 'Browser / DevTools',
              left: 'Inspect local pages and rendered states.',
              right: 'Useful for UI QA after Codex changes frontend code.',
            },
          ]}
        />
        <Callout variant="tip" title="Start with docs and GitHub">
          Do not connect ten tools on day one. Add MCP servers only after a repeated workflow makes the value obvious.
        </Callout>
      </section>
    </>
  );
}
