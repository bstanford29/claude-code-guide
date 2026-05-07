const baseUrl = process.argv[2] ?? process.env.BASE_URL ?? 'http://localhost:3000';

const routes = [
  '/',
  '/choose',
  '/app-vs-cli',
  '/ide-setup',
  '/agent-files',
  '/install',
  '/terminal',
  '/desktop-app',
  '/claude-ide',
  '/first-session',
  '/permissions',
  '/claude-md',
  '/day-1-wins',
  '/reference-files',
  '/slash-commands',
  '/memory',
  '/thinking-controls',
  '/mcp-servers',
  '/git-integration',
  '/cost-plans',
  '/skills',
  '/hooks',
  '/subagents',
  '/worktrees',
  '/automation',
  '/tips-mistakes',
  '/demo',
  '/resources',
  '/codex',
  '/codex/install',
  '/codex/cli',
  '/codex/app',
  '/codex/ide',
  '/codex/first-session',
  '/codex/approvals-sandbox',
  '/codex/web-cloud',
  '/codex/agents-md',
  '/codex/config',
  '/codex/mcp-connectors',
  '/codex/git-github',
  '/codex/skills',
  '/codex/subagents',
  '/codex/worktrees',
  '/codex/automations',
  '/codex/computer-use',
  '/codex/cost-plans',
  '/codex/tips-mistakes',
  '/codex/demo',
];

const failures = [];

for (const route of routes) {
  const url = new URL(route, baseUrl).toString();
  try {
    const res = await fetch(url, { redirect: 'manual' });
    if (!res.ok) failures.push(`${route} -> ${res.status}`);
  } catch (error) {
    failures.push(`${route} -> ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error(`Route check failed against ${baseUrl}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`All ${routes.length} routes returned 2xx from ${baseUrl}`);
