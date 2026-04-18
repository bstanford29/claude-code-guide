import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'Resources',
  description: 'External links — official docs, Discord, repositories, upgrade.',
};

type Link = { title: string; desc: string; url: string };

const OFFICIAL: Link[] = [
  {
    title: 'Official documentation',
    desc: "Anthropic's complete Claude Code docs. Always the most current source.",
    url: 'https://code.claude.com/docs',
  },
  {
    title: 'Best practices guide',
    desc: "Anthropic's engineering post on getting the most from Claude Code — patterns, anti-patterns, scaling.",
    url: 'https://code.claude.com/docs/en/best-practices',
  },
  {
    title: 'Common workflows',
    desc: 'Step-by-step recipes for debugging, testing, PRs, refactoring.',
    url: 'https://code.claude.com/docs/en/common-workflows',
  },
  {
    title: 'Claude Code on GitHub',
    desc: 'Report issues, request features, browse the open roadmap.',
    url: 'https://github.com/anthropics/claude-code',
  },
];

const COMMUNITY: Link[] = [
  {
    title: 'Anthropic Discord',
    desc: 'Community discussion, help, real-time updates from Anthropic staff.',
    url: 'https://discord.gg/anthropic',
  },
  {
    title: 'MCP server directory',
    desc: 'Anthropic-maintained collection of official + community MCP servers.',
    url: 'https://github.com/modelcontextprotocol/servers',
  },
];

const PLANS: Link[] = [
  {
    title: 'Claude Pro / Max plans',
    desc: 'Sign up or upgrade. Pro is $20/mo; Max is $100 or $200/mo.',
    url: 'https://claude.ai/upgrade',
  },
  {
    title: 'Routines (scheduled tasks)',
    desc: 'Anthropic-hosted scheduled Claude Code runs. Triggers: cron, API, GitHub events.',
    url: 'https://claude.ai/code/routines',
  },
];

const INTERNAL: Link[] = [
  {
    title: "Brandon's site",
    desc: 'The author. Projects, writing, and what I work on.',
    url: 'https://brandonstanford.ai',
  },
  {
    title: 'X (Twitter)',
    desc: 'Occasional posts on AI strategy, consulting, and building.',
    url: 'https://x.com/b__stanford',
  },
  {
    title: 'LinkedIn',
    desc: 'Professional profile.',
    url: 'https://www.linkedin.com/in/brandonistanford/',
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="Resources"
        subtitle="Official docs first. Everything else is supplementary."
      />

      <LinkGroup title="Official &mdash; Anthropic docs" kicker="primary sources" links={OFFICIAL} />
      <LinkGroup title="Community" kicker="discussion & ecosystem" links={COMMUNITY} />
      <LinkGroup title="Plans &amp; scheduling" kicker="upgrade & automation" links={PLANS} />
      <LinkGroup title="About" kicker="who wrote this" links={INTERNAL} />
    </>
  );
}

function LinkGroup({ title, kicker, links }: { title: string; kicker: string; links: Link[] }) {
  return (
    <section className="mt-12">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-[var(--color-border)] flex-wrap">
        <h2
          className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-[color:var(--tier-ref)]">
          {kicker}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-[var(--radius-md)] p-5 group hover:border-[color:var(--color-primary)]/30 block"
          >
            <h3 className="font-[family-name:var(--font-display)] font-bold text-sm mb-1 text-white group-hover:text-[color:var(--color-primary)] transition-colors duration-200">
              {l.title}
              <span className="inline-block ml-1 opacity-40 group-hover:opacity-100 transition-opacity">&#8599;</span>
            </h3>
            <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-muted)] leading-relaxed">{l.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
