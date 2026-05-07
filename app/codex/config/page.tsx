import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { CompareTable } from '@/components/compare-table';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Codex config',
  description: 'Codex config.toml basics for models, sandbox defaults, approvals, MCP, and fallback docs.',
};

export default function CodexConfigPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Codex config"
        subtitle="Use config.toml for durable defaults. Keep it boring: model defaults, sandbox defaults, approval posture, MCP servers, and instruction-file fallbacks."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <CodeBlock title="Conceptual config example">{`# ~/.codex/config.toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
project_doc_fallback_filenames = ["TEAM_GUIDE.md"]

[mcp_servers.openaiDeveloperDocs]
url = "https://developers.openai.com/mcp"`}</CodeBlock>
        <p className="text-sm text-[#bbb] leading-relaxed">
          You can also add the OpenAI developer docs MCP server with{' '}
          <code className="text-[color:var(--color-primary)]">codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp</code>
          . It is a read-only docs server, not an API credential bridge.
        </p>
        <Callout variant="warn" title="Do not cargo-cult config">
          Only set defaults you understand. A vague global config creates surprising behavior across every repo you
          open.
        </Callout>
      </section>

      <section className="mt-12">
        <CompareTable
          leftHeader="Config area"
          rightHeader="Decision to make"
          rows={[
            {
              label: 'Sandbox',
              left: 'workspace-write vs read-only vs full access',
              right: 'How much local authority should Codex have by default?',
            },
            {
              label: 'Approvals',
              left: 'on-request, untrusted, or never',
              right: 'When should Codex pause and ask?',
            },
            {
              label: 'MCP',
              left: 'Server tables in config.toml',
              right: 'Which external tools are worth durable setup?',
            },
          ]}
        />
      </section>
    </>
  );
}
