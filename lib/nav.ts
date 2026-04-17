export type Tier = 'home' | 'A' | 'B' | 'C' | 'ref';
export type RouteStatus = 'live' | 'coming-soon';

export interface NavRoute {
  href: string;
  label: string;
  tier: Tier;
  status: RouteStatus;
  subtitle?: string;
}

export interface NavGroup {
  tier: Tier;
  title: string;
  kicker: string;
  routes: NavRoute[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    tier: 'home',
    title: 'Start',
    kicker: 'Home',
    routes: [{ href: '/', label: 'Overview', tier: 'home', status: 'live' }],
  },
  {
    tier: 'A',
    title: 'Day 1',
    kicker: 'Tier A — get productive',
    routes: [
      { href: '/install', label: 'Install', tier: 'A', status: 'live', subtitle: 'Terminal + desktop' },
      { href: '/first-session', label: 'First session', tier: 'A', status: 'live', subtitle: 'Prompting, @files, rewind' },
      { href: '/permissions', label: 'Permissions', tier: 'A', status: 'live', subtitle: 'Safety tiers' },
      { href: '/claude-md', label: 'CLAUDE.md', tier: 'A', status: 'live', subtitle: "Brandon's annotated example" },
      { href: '/day-1-wins', label: 'Day 1 wins', tier: 'A', status: 'live', subtitle: '5 consultant use cases' },
    ],
  },
  {
    tier: 'B',
    title: 'Week 2',
    kicker: 'Tier B — power features',
    routes: [
      { href: '/reference-files', label: 'Reference files', tier: 'B', status: 'live', subtitle: 'rules/, docs/, memory' },
      { href: '/slash-commands', label: 'Slash commands', tier: 'B', status: 'live', subtitle: 'Built-in + custom' },
      { href: '/memory', label: 'Memory', tier: 'B', status: 'live', subtitle: 'MEMORY.md + topic files' },
      { href: '/thinking-controls', label: 'Thinking controls', tier: 'B', status: 'live', subtitle: '/effort, ultrathink, Plan mode' },
      { href: '/mcp-servers', label: 'MCP servers', tier: 'B', status: 'live', subtitle: 'Connect to real tools' },
      { href: '/git-integration', label: 'Git & GitHub', tier: 'B', status: 'live', subtitle: 'Commits, PRs, --from-pr' },
      { href: '/cost-plans', label: 'Cost & plans', tier: 'B', status: 'live', subtitle: 'Pro vs Max, hygiene' },
    ],
  },
  {
    tier: 'C',
    title: 'Power user',
    kicker: 'Tier C — advanced',
    routes: [
      { href: '/skills', label: 'Skills', tier: 'C', status: 'live', subtitle: 'SKILL.md patterns' },
      { href: '/hooks', label: 'Hooks', tier: 'C', status: 'live', subtitle: 'Deterministic automation' },
      { href: '/subagents', label: 'Subagents', tier: 'C', status: 'live', subtitle: 'Parallel work' },
      { href: '/worktrees', label: 'Worktrees', tier: 'C', status: 'live', subtitle: 'Isolated sessions' },
      { href: '/automation', label: 'Automation', tier: 'C', status: 'live', subtitle: 'Headless, Routines, /loop' },
    ],
  },
  {
    tier: 'ref',
    title: 'Reference',
    kicker: 'Always handy',
    routes: [
      { href: '/tips-mistakes', label: 'Tips & mistakes', tier: 'ref', status: 'live', subtitle: 'Common pitfalls' },
      { href: '/demo', label: 'Live demo', tier: 'ref', status: 'live', subtitle: 'Session screenplay' },
      { href: '/resources', label: 'Resources', tier: 'ref', status: 'live', subtitle: 'Docs, Discord, upgrade' },
    ],
  },
];

export const ALL_ROUTES: NavRoute[] = NAV_GROUPS.flatMap((g) => g.routes);

export function routeByHref(href: string): NavRoute | undefined {
  return ALL_ROUTES.find((r) => r.href === href);
}

export function tierLabel(tier: Tier): string {
  switch (tier) {
    case 'home':
      return 'Start';
    case 'A':
      return 'Day 1';
    case 'B':
      return 'Week 2';
    case 'C':
      return 'Power user';
    case 'ref':
      return 'Reference';
  }
}

export function tierColor(tier: Tier): string {
  switch (tier) {
    case 'A':
      return 'var(--tier-a)';
    case 'B':
      return 'var(--tier-b)';
    case 'C':
      return 'var(--tier-c)';
    case 'ref':
      return 'var(--tier-ref)';
    default:
      return 'var(--color-primary)';
  }
}
