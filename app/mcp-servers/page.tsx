import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'MCP servers',
  description: 'Connect Claude Code to Supabase, GitHub, Gmail, Slack, Obsidian and more via Model Context Protocol.',
};

export default function McpServersPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="MCP servers"
        subtitle="How Claude talks to your real tools — Supabase, GitHub, Gmail, Slack, Obsidian. The moment Claude stops being 'smart chatbot' and becomes 'team member.'"
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <DefinitionBox
          term="MCP (Model Context Protocol)"
          whatItIs="A standard way for AI models to plug into external tools. Think USB-C for AI — one port, many devices. An MCP server is a small program that exposes some service (a database, a calendar, your Obsidian vault) to Claude through a common interface."
          whyItMatters="Without MCP, Claude can only see files on disk. With MCP, Claude can query your Supabase database, create a GitHub PR, read your Slack, search your vault, or send an email. The leap from 'smart assistant' to 'team member who can actually do things.'"
          example={
            <>
              Ask Claude: <code>show me yesterday&apos;s new signups from the users table</code>. With the Supabase
              MCP connected, Claude writes the SQL, runs it, and returns the result — all inside the session.
            </>
          }
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Five servers worth connecting first
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          There are hundreds of MCP servers. For a consultant&apos;s workflow, these five move the needle the most:
        </p>

        <div className="grid gap-3 mt-6">
          <ServerCard
            name="GitHub"
            does="Read issues, open PRs, review comments, check CI status."
            useFor='"Open a PR titled X with a description from the last 3 commits."'
            install="claude mcp add github"
          />
          <ServerCard
            name="Supabase"
            does="Query your Postgres database, inspect schemas, run migrations."
            useFor='"Give me daily active users for the last 30 days, grouped by signup source."'
            install="claude mcp add supabase"
          />
          <ServerCard
            name="Gmail / Google Workspace"
            does="Read inbox, draft emails, check calendar, create docs."
            useFor='"Summarize my inbox from this week. Flag anything that needs a reply today."'
            install="Through the Google Workspace MCP server — requires OAuth setup"
          />
          <ServerCard
            name="Slack"
            does="Read channels and DMs (with your permission), post messages, search history."
            useFor='"What did the eng channel say about the outage yesterday?"'
            install="claude mcp add slack (needs a Slack app token)"
          />
          <ServerCard
            name="Obsidian"
            does="Read and write notes in your vault — useful for personal knowledge work."
            useFor={"\"Append today's decisions to my daily note. Create a new note titled 'Q3 planning.'\""}
            install="Obsidian MCP connector (community; several options)"
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          How to add one
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Inside a Claude Code session, the <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">claude mcp add</code>{' '}
          command walks you through it. Each server has its own auth flow &mdash; some use OAuth (Google, Slack), some
          ask for a token (GitHub personal access token), some just need a URL (Supabase).
        </p>
        <CodeBlock title="Add GitHub as an example">{`# in a terminal, with your Claude Code session closed
claude mcp add github

# paste a GitHub personal access token when prompted
# restart Claude Code — the new server is available`}</CodeBlock>
        <Callout variant="warn" title="Restart after install">
          MCP servers load at session start. After{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            claude mcp add
          </code>
          , exit your Claude Code session and relaunch. Otherwise you&apos;ll spend 10 minutes wondering why the new
          tools don&apos;t show up.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The security question you should ask
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          MCP servers run with whatever permissions you give them. A Supabase MCP with admin credentials lets Claude
          drop tables. Gmail MCP lets Claude send email. Before connecting, ask:
        </p>
        <div className="space-y-3 mt-5">
          <Guard
            q="Can I use a read-only token?"
            a="For querying dashboards or reading history, yes. Take the least privilege that works. Rotate later if you need more."
          />
          <Guard
            q="Is there a 'sending' step that should always ask first?"
            a="Gmail send, Slack post, GitHub PR create — these hit real humans. Keep them on default permissions (prompt every time) even if other tools are allowlisted."
          />
          <Guard
            q="Is the MCP server code trustworthy?"
            a="Anthropic-published servers are vetted. Community servers aren't. Read the code before you install. Prefer servers with real usage and recent commits."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The @resource shortcut
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Once an MCP server is connected, you can reference its resources directly with{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            @server:resource
          </code>{' '}
          syntax. Same pattern as{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            @file.ts
          </code>
          , but for external data.
        </p>
        <CodeBlock>{`> summarize the issues in @github:repos/my-org/my-project/issues

> what's in @obsidian:daily-notes/2026-04-17.md?

> give me schema for @supabase:tables/users`}</CodeBlock>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          When MCP isn&apos;t the right tool
        </h2>
        <Callout variant="info" title="Use an MCP server when...">
          You&apos;re doing the same external-system task <em>often</em>. Reading GitHub issues once a month
          doesn&apos;t need an MCP — paste the URL. Reading them daily does. The setup cost only pays off with
          repeated use.
        </Callout>
        <Callout variant="warn" title="Don't use an MCP server when...">
          The task is one-off, or the data is sensitive and you don&apos;t trust the MCP server code. In those cases,
          it&apos;s safer to copy-paste the data in manually.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/git-integration"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Git &amp; GitHub integration &rarr;
        </Link>
      </section>
    </>
  );
}

function ServerCard({
  name,
  does,
  useFor,
  install,
}: {
  name: string;
  does: string;
  useFor: string;
  install: string;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5">
      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white mb-3">{name}</h3>
      <div className="grid md:grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-sm">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          What it does
        </div>
        <div className="text-[#bbb] leading-relaxed">{does}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Use for
        </div>
        <div className="text-[#999] leading-relaxed italic">{useFor}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Install
        </div>
        <div>
          <code className="text-[color:var(--color-primary)] bg-[#0f0f0f] px-2 py-1 rounded text-xs font-mono border border-[var(--color-border)]">
            {install}
          </code>
        </div>
      </div>
    </div>
  );
}

function Guard({ q, a }: { q: string; a: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4">
      <div className="text-white font-semibold text-sm mb-1">{q}</div>
      <p className="text-[#bbb] text-sm leading-relaxed">{a}</p>
    </div>
  );
}
