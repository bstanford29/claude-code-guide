import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { DecisionGrid } from '@/components/decision-grid';
import { SurfaceMatrix } from '@/components/surface-matrix';
import { ProductBadge } from '@/components/product-badge';

export const metadata = {
  title: 'Codex overview',
  description: 'Start here for the OpenAI Codex guide: CLI, app, IDE extension, cloud, and power workflows.',
};

const columns = [
  { key: 'cli', title: 'CLI', subtitle: 'Local terminal' },
  { key: 'app', title: 'App', subtitle: 'Local desktop' },
  { key: 'ide', title: 'IDE', subtitle: 'Editor sidebar' },
  { key: 'cloud', title: 'Cloud', subtitle: 'Background tasks' },
];

const rows = [
  {
    label: 'Best first use',
    values: {
      cli: 'Ask Codex to inspect a repo, make one small edit, run checks, and show the diff.',
      app: 'Open a project and run two local threads side by side.',
      ide: 'Select code, ask a question, then review the patch in your editor.',
      cloud: 'Connect GitHub and delegate a scoped issue or PR follow-up.',
    },
  },
  {
    label: 'Risk profile',
    values: {
      cli: 'Local permissions and sandbox settings matter most.',
      app: 'Great visibility, but review every diff before shipping.',
      ide: 'Safest for targeted edits because context is narrow.',
      cloud: 'Environment setup and prompt precision matter most.',
    },
  },
];

export default function CodexOverviewPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Codex"
        subtitle="OpenAI's coding agent across local CLI, desktop app, IDE extension, and cloud workflows."
        lastValidated="2026-05-07"
      />

      <section className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <ProductBadge product="codex" />
          <ProductBadge product="shared" label="CLI + app + IDE + cloud" />
        </div>
        <p className="text-[#bbb] leading-relaxed">
          Codex is not one surface. It is a family of workflows: local terminal work, a desktop app for parallel
          threads, an IDE extension for editor-native context, and cloud tasks for background delegation. This guide
          keeps those surfaces separate so you pick the right one for the task.
        </p>
      </section>

      <section className="mt-12">
        <DecisionGrid
          items={[
            {
              eyebrow: 'Day 1',
              title: 'Install and run a local task',
              href: '/codex/install',
              body: 'Set up the CLI, app, and IDE extension. Then run one bounded local edit with checks.',
            },
            {
              eyebrow: 'Week 2',
              title: 'Give Codex project memory and tools',
              href: '/codex/agents-md',
              body: 'Add AGENTS.md, configure MCP, and connect GitHub/cloud workflows safely.',
            },
            {
              eyebrow: 'Power user',
              title: 'Parallelize with subagents and worktrees',
              href: '/codex/subagents',
              body: 'Use multiple agents, isolated working copies, automations, and review patterns.',
            },
            {
              eyebrow: 'Reference',
              title: 'Know the traps before they cost time',
              href: '/codex/tips-mistakes',
              body: 'Avoid vague cloud tasks, unreviewed diffs, unsafe approvals, and overloaded instructions.',
            },
          ]}
        />
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Surface map
        </h2>
        <SurfaceMatrix columns={columns} rows={rows} />
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <Link
          href="/codex/install"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Install Codex &rarr;
        </Link>
      </section>
    </>
  );
}
