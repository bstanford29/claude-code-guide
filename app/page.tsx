import Link from 'next/link';
import { NAV_GROUPS } from '@/lib/nav';
import { Badge } from '@/components/badge';
import { DecisionGrid } from '@/components/decision-grid';
import { SurfaceMatrix } from '@/components/surface-matrix';

const surfaceColumns = [
  { key: 'cli', title: 'CLI', subtitle: 'Terminal-first local work' },
  { key: 'app', title: 'Desktop app', subtitle: 'Parallel visual work' },
  { key: 'ide', title: 'IDE', subtitle: 'Editor-native context' },
  { key: 'cloud', title: 'Web/cloud', subtitle: 'Background delegation' },
];

const surfaceRows = [
  {
    label: 'Claude Code',
    values: {
      cli: 'Mature terminal workflow with permissions, slash commands, memory, MCP, hooks, and automation.',
      app: 'Good for visual diffs, tabs, screenshots, and people who prefer a window over a terminal.',
      ide: 'VS Code and JetBrains integration for selected text, diagnostics, and IDE diff viewing.',
      cloud: 'Use local CLI/app patterns first; this guide treats Claude Code as local-first.',
    },
  },
  {
    label: 'Codex',
    values: {
      cli: 'Local TUI that can inspect, edit, run commands, use MCP, review code, search the web, and launch cloud tasks.',
      app: 'Desktop command center for parallel local threads, worktrees, automations, browser flows, and git review.',
      ide: 'Sidebar extension for VS Code, Cursor, Windsurf, and JetBrains with local and cloud handoff.',
      cloud: 'Background tasks connected to GitHub that can propose changes and pull requests.',
    },
  },
];

export default function HomePage() {
  const claudeGroups = NAV_GROUPS.filter((g) => g.product === 'claude');
  const codexGroups = NAV_GROUPS.filter((g) => g.product === 'codex');

  return (
    <>
      <section className="relative pb-14 border-b border-[var(--color-border)] mb-14">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[420px] bg-[radial-gradient(ellipse,rgba(117,214,214,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <Badge label="Training guide" />
          <Badge label="Claude Code" />
          <Badge label="Codex" />
        </div>

        <h1 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-white">
          AI coding agents,
          <br />
          <span className="hero-text-mask">from first install to power workflows</span>
        </h1>

        <p className="mt-5 text-[var(--color-text-secondary)] text-base leading-relaxed max-w-[680px] font-[family-name:var(--font-body)]">
          A practical guide to Claude Code and OpenAI Codex across CLI, desktop app, IDE, and cloud workflows. Start
          with one track, then use the comparison pages when you need to choose the right surface for a real task.
        </p>

        <div className="flex flex-wrap gap-3 mt-8 text-sm">
          <Link
            href="/install"
            className="rounded border border-[color:var(--color-primary)]/35 bg-[color:var(--color-primary)]/10 px-4 py-2 text-[color:var(--color-primary)] font-semibold hover:bg-[color:var(--color-primary)]/15 transition-colors"
          >
            Start with Claude Code
          </Link>
          <Link
            href="/codex/install"
            className="rounded border border-[var(--color-border)] px-4 py-2 text-[#ddd] font-semibold hover:border-[var(--color-border-hover)] hover:bg-[#141414] transition-colors"
          >
            Start with Codex
          </Link>
          <Link href="/choose" className="px-2 py-2 text-[#888] hover:text-white transition-colors">
            Help me choose
          </Link>
        </div>
      </section>

      <section className="mb-14">
        <DecisionGrid
          items={[
            {
              eyebrow: 'Claude Code track',
              title: 'Best when you want a mature Claude-first local workflow',
              href: '/install',
              body: 'Use this path for terminal-native work, project memory, slash commands, hooks, MCP servers, subagents, worktrees, and the Claude desktop app.',
            },
            {
              eyebrow: 'Codex track',
              title: "Best when you want OpenAI's local, IDE, app, and cloud agent workflows",
              href: '/codex/install',
              body: 'Use this path for Codex CLI, the desktop app, IDE extension, web/cloud tasks, AGENTS.md, app automations, and GitHub delegation.',
            },
          ]}
        />
      </section>

      <section className="mb-14">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-[#555] mb-3">
          App vs CLI vs IDE
        </div>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Pick the surface by the work, not by habit.
        </h2>
        <p className="mt-2 font-[family-name:var(--font-body)] text-sm text-[var(--color-text-secondary)] max-w-[680px] leading-relaxed">
          The same agent can feel very different depending on where you run it. The CLI is efficient, the app is visual
          and parallel, the IDE is contextual, and cloud is for background delegation.
        </p>
        <SurfaceMatrix columns={surfaceColumns} rows={surfaceRows} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TrackSection title="Claude Code" groups={claudeGroups} />
        <TrackSection title="Codex" groups={codexGroups} />
      </section>
    </>
  );
}

function TrackSection({ title, groups }: { title: string; groups: typeof NAV_GROUPS }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-[var(--color-border)]">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em]">{title}</h2>
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555]">
          Guide track
        </span>
      </div>
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={`${group.product}-${group.title}`}>
            <h3 className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.12em] text-[#777] mb-2">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="block rounded border border-transparent px-3 py-2 hover:border-[var(--color-border-hover)] hover:bg-[#121212] transition-colors"
                  >
                    <div className="font-[family-name:var(--font-body)] text-sm font-semibold text-[#ddd]">
                      {route.label}
                    </div>
                    {route.subtitle && <div className="text-xs text-[#666] mt-0.5">{route.subtitle}</div>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
