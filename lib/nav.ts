export type Product = 'shared' | 'claude' | 'codex';
export type Tier = 'home' | 'A' | 'B' | 'C' | 'ref';
export type RouteStatus = 'live' | 'coming-soon';

export interface NavRoute {
  href: string;
  label: string;
  tier: Tier;
  product: Product;
  status: RouteStatus;
  subtitle?: string;
}

export interface NavGroup {
  product: Product;
  tier: Tier;
  title: string;
  kicker: string;
  routes: NavRoute[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    product: 'shared',
    tier: 'home',
    title: 'Start',
    kicker: 'Home',
    routes: [{ href: '/', label: 'Overview', tier: 'home', product: 'shared', status: 'live' }],
  },
  {
    product: 'shared',
    tier: 'ref',
    title: 'Choose',
    kicker: 'Shared guidance',
    routes: [
      { href: '/choose', label: 'Claude Code vs Codex', tier: 'ref', product: 'shared', status: 'live', subtitle: 'Which tool, when' },
      { href: '/app-vs-cli', label: 'App vs CLI vs IDE', tier: 'ref', product: 'shared', status: 'live', subtitle: 'Pick the right surface' },
      { href: '/ide-setup', label: 'IDE setup', tier: 'ref', product: 'shared', status: 'live', subtitle: 'VS Code, Cursor, JetBrains' },
      { href: '/agent-files', label: 'Agent files', tier: 'ref', product: 'shared', status: 'live', subtitle: 'CLAUDE.md and AGENTS.md' },
    ],
  },
  {
    product: 'claude',
    tier: 'A',
    title: 'Claude Day 1',
    kicker: 'Claude Code - get productive',
    routes: [
      { href: '/install', label: 'Install', tier: 'A', product: 'claude', status: 'live', subtitle: 'Pick a path, set up' },
      { href: '/terminal', label: 'Terminal tour', tier: 'A', product: 'claude', status: 'live', subtitle: 'Shortcuts, menus, keys' },
      { href: '/desktop-app', label: 'Desktop app tour', tier: 'A', product: 'claude', status: 'live', subtitle: 'Windows, tabs, visual diffs' },
      { href: '/claude-ide', label: 'IDE setup', tier: 'A', product: 'claude', status: 'live', subtitle: 'VS Code, forks, JetBrains' },
      { href: '/first-session', label: 'First session', tier: 'A', product: 'claude', status: 'live', subtitle: 'Prompting, @files, rewind' },
      { href: '/permissions', label: 'Permissions', tier: 'A', product: 'claude', status: 'live', subtitle: 'Safety tiers' },
      { href: '/claude-md', label: 'CLAUDE.md', tier: 'A', product: 'claude', status: 'live', subtitle: "Brandon's annotated example" },
      { href: '/day-1-wins', label: 'Day 1 wins', tier: 'A', product: 'claude', status: 'live', subtitle: '5 consultant use cases' },
    ],
  },
  {
    product: 'claude',
    tier: 'B',
    title: 'Claude Week 2',
    kicker: 'Claude Code - power features',
    routes: [
      { href: '/reference-files', label: 'Reference files', tier: 'B', product: 'claude', status: 'live', subtitle: 'rules/, docs/, memory' },
      { href: '/slash-commands', label: 'Slash commands', tier: 'B', product: 'claude', status: 'live', subtitle: 'Built-in + custom' },
      { href: '/memory', label: 'Memory', tier: 'B', product: 'claude', status: 'live', subtitle: 'MEMORY.md + topic files' },
      { href: '/thinking-controls', label: 'Thinking controls', tier: 'B', product: 'claude', status: 'live', subtitle: '/effort, ultrathink, Plan mode' },
      { href: '/mcp-servers', label: 'MCP servers', tier: 'B', product: 'claude', status: 'live', subtitle: 'Connect to real tools' },
      { href: '/git-integration', label: 'Git & GitHub', tier: 'B', product: 'claude', status: 'live', subtitle: 'Commits, PRs, --from-pr' },
      { href: '/cost-plans', label: 'Cost & plans', tier: 'B', product: 'claude', status: 'live', subtitle: 'Pro vs Max, hygiene' },
    ],
  },
  {
    product: 'claude',
    tier: 'C',
    title: 'Claude Power',
    kicker: 'Claude Code - advanced',
    routes: [
      { href: '/skills', label: 'Skills', tier: 'C', product: 'claude', status: 'live', subtitle: 'SKILL.md patterns' },
      { href: '/hooks', label: 'Hooks', tier: 'C', product: 'claude', status: 'live', subtitle: 'Deterministic automation' },
      { href: '/subagents', label: 'Subagents', tier: 'C', product: 'claude', status: 'live', subtitle: 'Parallel work' },
      { href: '/worktrees', label: 'Worktrees', tier: 'C', product: 'claude', status: 'live', subtitle: 'Isolated sessions' },
      { href: '/automation', label: 'Automation', tier: 'C', product: 'claude', status: 'live', subtitle: 'Headless, Routines, /loop' },
    ],
  },
  {
    product: 'codex',
    tier: 'A',
    title: 'Codex Day 1',
    kicker: 'Codex - get productive',
    routes: [
      { href: '/codex', label: 'Overview', tier: 'A', product: 'codex', status: 'live', subtitle: 'Route map and mental model' },
      { href: '/codex/install', label: 'Install', tier: 'A', product: 'codex', status: 'live', subtitle: 'CLI, app, IDE' },
      { href: '/codex/cli', label: 'CLI', tier: 'A', product: 'codex', status: 'live', subtitle: 'Terminal agent basics' },
      { href: '/codex/app', label: 'Desktop app', tier: 'A', product: 'codex', status: 'live', subtitle: 'Parallel local threads' },
      { href: '/codex/ide', label: 'IDE extension', tier: 'A', product: 'codex', status: 'live', subtitle: 'Sidebar and cloud handoff' },
      { href: '/codex/first-session', label: 'First session', tier: 'A', product: 'codex', status: 'live', subtitle: 'Plan, edit, test, diff' },
      { href: '/codex/approvals-sandbox', label: 'Approvals', tier: 'A', product: 'codex', status: 'live', subtitle: 'Sandbox and safety' },
    ],
  },
  {
    product: 'codex',
    tier: 'B',
    title: 'Codex Week 2',
    kicker: 'Codex - power features',
    routes: [
      { href: '/codex/web-cloud', label: 'Web and cloud', tier: 'B', product: 'codex', status: 'live', subtitle: 'Background tasks' },
      { href: '/codex/agents-md', label: 'AGENTS.md', tier: 'B', product: 'codex', status: 'live', subtitle: 'Project instructions' },
      { href: '/codex/config', label: 'Config', tier: 'B', product: 'codex', status: 'live', subtitle: 'config.toml and defaults' },
      { href: '/codex/mcp-connectors', label: 'MCP and connectors', tier: 'B', product: 'codex', status: 'live', subtitle: 'External tools' },
      { href: '/codex/git-github', label: 'Git and GitHub', tier: 'B', product: 'codex', status: 'live', subtitle: 'PRs, review, @codex' },
    ],
  },
  {
    product: 'codex',
    tier: 'C',
    title: 'Codex Power',
    kicker: 'Codex - advanced',
    routes: [
      { href: '/codex/skills', label: 'Skills', tier: 'C', product: 'codex', status: 'live', subtitle: 'Reusable workflows' },
      { href: '/codex/subagents', label: 'Subagents', tier: 'C', product: 'codex', status: 'live', subtitle: 'Parallel agents' },
      { href: '/codex/worktrees', label: 'Worktrees', tier: 'C', product: 'codex', status: 'live', subtitle: 'Isolated changes' },
      { href: '/codex/automations', label: 'Automations', tier: 'C', product: 'codex', status: 'live', subtitle: 'Recurring agent work' },
      { href: '/codex/computer-use', label: 'Computer use', tier: 'C', product: 'codex', status: 'live', subtitle: 'Browser and desktop QA' },
    ],
  },
  {
    product: 'codex',
    tier: 'ref',
    title: 'Codex Reference',
    kicker: 'Codex - always handy',
    routes: [
      { href: '/codex/cost-plans', label: 'Cost and plans', tier: 'ref', product: 'codex', status: 'live', subtitle: 'Access and limits' },
      { href: '/codex/tips-mistakes', label: 'Tips and mistakes', tier: 'ref', product: 'codex', status: 'live', subtitle: 'Avoid sharp edges' },
      { href: '/codex/demo', label: 'Live demo', tier: 'ref', product: 'codex', status: 'live', subtitle: 'Codex session script' },
    ],
  },
  {
    product: 'shared',
    tier: 'ref',
    title: 'Reference',
    kicker: 'Always handy',
    routes: [
      { href: '/tips-mistakes', label: 'Claude tips', tier: 'ref', product: 'claude', status: 'live', subtitle: 'Common Claude pitfalls' },
      { href: '/demo', label: 'Dual live demo', tier: 'ref', product: 'shared', status: 'live', subtitle: 'Session screenplay' },
      { href: '/resources', label: 'Resources', tier: 'ref', product: 'shared', status: 'live', subtitle: 'Docs, downloads, communities' },
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

export function productLabel(product: Product): string {
  switch (product) {
    case 'claude':
      return 'Claude Code';
    case 'codex':
      return 'Codex';
    case 'shared':
      return 'Shared';
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
