import { AppDiff, AppMain, AppMockup, AppSidebar, AppTabs } from './app-mockup';
import { TerminalMockup, TermLine, TermPrompt } from './terminal-mockup';

const mono = 'font-[family-name:var(--font-mono)]';
const body = 'font-[family-name:var(--font-body)]';
const display = 'font-[family-name:var(--font-display)]';

function Pill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'primary' | 'green' | 'amber' | 'red';
}) {
  const tones = {
    neutral: 'border-[#2a2a2a] bg-[#151515] text-[#aaa]',
    primary: 'border-[color:var(--color-primary)]/35 bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]',
    green: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
    amber: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
    red: 'border-red-500/25 bg-red-500/10 text-red-300',
  };

  return (
    <span
      className={[
        mono,
        'inline-flex items-center rounded border px-2 py-0.5 text-[10px] leading-none whitespace-nowrap',
        tones[tone],
      ].join(' ')}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${mono} text-[9px] uppercase tracking-[0.15em] text-[#555]`}>
      {children}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
      <div
        className="h-full rounded-full bg-[color:var(--color-primary)]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function MiniFile({
  name,
  detail,
  active,
}: {
  name: string;
  detail: string;
  active?: boolean;
}) {
  return (
    <div
      className={[
        'rounded border px-2.5 py-2 min-w-0',
        active ? 'border-[color:var(--color-primary)]/35 bg-[color:var(--color-primary)]/10' : 'border-[#222] bg-[#111]',
      ].join(' ')}
    >
      <div className={`${body} text-[12px] text-white truncate`}>{name}</div>
      <div className={`${mono} mt-1 text-[9px] text-[#666] truncate`}>{detail}</div>
    </div>
  );
}

function Message({
  role,
  children,
  muted,
}: {
  role: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className={`${mono} w-10 shrink-0 text-[10px] uppercase tracking-[0.08em] text-[#555] pt-0.5`}>
        {role}
      </div>
      <div
        className={[
          body,
          'min-w-0 flex-1 rounded border px-3 py-2 text-[12px] leading-relaxed',
          muted ? 'border-[#202020] bg-[#0d0d0d] text-[#777]' : 'border-[#242424] bg-[#111] text-[#bbb]',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}

export function CodexCliMockup() {
  return (
    <TerminalMockup
      title="codex - ~/product-dashboard"
      caption="Illustrative mockup: Codex CLI planning, editing, and verifying a local change."
    >
      <TermLine muted>Codex v0.42.0 - GPT-5 - /Users/you/product-dashboard</TermLine>
      <TermPrompt>fix the flaky billing test and explain the cause</TermPrompt>
      <div className="mt-3 pl-4 border-l border-[#222] space-y-1">
        <TermLine muted>Reading package.json, vitest config, and failing test output...</TermLine>
        <TermLine muted>Found retry state leaking between examples in billing-sync.test.ts.</TermLine>
        <TermLine accent>Plan</TermLine>
        <TermLine>1. Reset the fake clock and queue between tests.</TermLine>
        <TermLine>2. Add a regression assertion for the second retry.</TermLine>
        <TermLine>3. Run the targeted test file.</TermLine>
      </div>
      <div className="mt-3 grid gap-1">
        <TermLine accent>edit components/billing/retry-queue.test.ts</TermLine>
        <TermLine muted>+ afterEach(() =&gt; retryQueue.reset())</TermLine>
        <TermLine muted>+ expect(secondAttempt.status).toBe(&apos;scheduled&apos;)</TermLine>
      </div>
      <div className="mt-3 rounded border border-[#222] bg-[#101010] px-3 py-2">
        <TermLine accent>npm test -- billing-sync.test.ts</TermLine>
        <TermLine>PASS  components/billing/billing-sync.test.ts</TermLine>
        <TermLine muted>8 tests passed - 1.4s</TermLine>
      </div>
    </TerminalMockup>
  );
}

export function CodexAppProjectMockup() {
  return (
    <AppMockup
      caption="Illustrative mockup: Codex desktop project view with session history, prompt context, and local files."
      aspect="16/10"
    >
      <div className="hidden sm:flex">
        <AppSidebar
          sections={[
            {
              title: 'Projects',
              items: [
                { label: 'product-dashboard', active: true, accent: 'var(--color-primary)' },
                { label: 'growth-site', subtle: '2' },
                { label: 'internal-api', subtle: 'new' },
              ],
            },
            {
              title: 'Sessions',
              items: [
                { label: 'Billing retry fix', active: true },
                { label: 'Polish empty states' },
                { label: 'Audit auth middleware' },
              ],
            },
          ]}
        />
      </div>
      <AppMain>
        <AppTabs
          tabs={[
            { label: 'Billing retry fix', branch: 'codex/billing-retry', status: 'thinking' },
            { label: 'Empty states', branch: 'codex/empty-states', status: 'ready' },
          ]}
        />
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1fr_240px]">
          <div className="p-4 sm:p-5 space-y-3 overflow-auto sm:overflow-hidden">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="primary">workspace trusted</Pill>
              <Pill>main + 3 files changed</Pill>
              <Pill tone="amber">permission required</Pill>
            </div>
            <Message role="you">Fix the billing retry test and keep the change isolated.</Message>
            <Message role="codex">
              I found shared retry queue state between tests. I am adding teardown and a focused regression
              assertion before running the targeted suite.
            </Message>
            <div className="rounded border border-[#222] bg-[#0e0e0e] p-3">
              <div className="flex items-center justify-between gap-3">
                <SectionLabel>Current action</SectionLabel>
                <Pill tone="primary">editing test</Pill>
              </div>
              <div className={`${body} mt-2 text-[13px] text-white`}>
                Update retry queue cleanup in <span className={mono}>billing-sync.test.ts</span>
              </div>
              <div className="mt-3">
                <ProgressBar value={62} />
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-3 border-l border-[#1a1a1a] bg-[#0b0b0b] p-4">
            <SectionLabel>Context</SectionLabel>
            <MiniFile name="billing-sync.test.ts" detail="test file - 3 edits" active />
            <MiniFile name="retry-queue.ts" detail="source - read only" />
            <MiniFile name="vitest.config.ts" detail="config - read only" />
          </div>
        </div>
      </AppMain>
    </AppMockup>
  );
}

export function CodexAppAgentsMockup() {
  return (
    <AppMockup
      caption="Illustrative mockup: Codex desktop coordinating focused subagents on separate review tasks."
      aspect="16/10"
    >
      <div className="hidden sm:flex">
        <AppSidebar
          sections={[
            {
              title: 'Agents',
              items: [
                { label: 'implementer', active: true, accent: 'var(--color-primary)', subtle: 'run' },
                { label: 'reviewer', accent: '#6b7d5a', subtle: 'done' },
                { label: 'tester', accent: '#9a7a3c', subtle: 'wait' },
              ],
            },
            {
              title: 'Artifacts',
              items: [
                { label: 'plan.md' },
                { label: 'review-notes.md' },
                { label: 'test-output.log' },
              ],
            },
          ]}
        />
      </div>
      <AppMain className="p-4 sm:p-5 gap-4 overflow-auto sm:overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className={`${display} text-lg font-bold text-white`}>Subagent run</div>
            <div className={`${body} text-[12px] text-[#777]`}>One lead session, three scoped workers.</div>
          </div>
          <Pill tone="primary">3 active contexts</Pill>
        </div>
        <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              name: 'Implementer',
              status: 'editing',
              tone: 'primary' as const,
              items: ['Create codex-mockups.tsx', 'Reuse app primitives', 'Keep captions explicit'],
            },
            {
              name: 'Reviewer',
              status: 'finding risks',
              tone: 'amber' as const,
              items: ['Scan for mobile overflow', 'Check ASCII only', 'Confirm export names'],
            },
            {
              name: 'Tester',
              status: 'queued',
              tone: 'neutral' as const,
              items: ['Run lint', 'Smoke import compile', 'Report skipped checks'],
            },
          ].map((agent) => (
            <div key={agent.name} className="min-w-0 rounded border border-[#222] bg-[#101010] p-3 flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <div className={`${display} text-[15px] font-semibold text-white`}>{agent.name}</div>
                <Pill tone={agent.tone}>{agent.status}</Pill>
              </div>
              <div className="mt-3 space-y-2">
                {agent.items.map((item) => (
                  <div key={item} className={`${body} flex gap-2 text-[12px] text-[#aaa]`}>
                    <span className="text-[color:var(--color-primary)]">&gt;</span>
                    <span className="min-w-0">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4">
                <ProgressBar value={agent.name === 'Implementer' ? 72 : agent.name === 'Reviewer' ? 48 : 12} />
              </div>
            </div>
          ))}
        </div>
      </AppMain>
    </AppMockup>
  );
}

export function CodexIdeMockup() {
  return (
    <AppMockup
      caption="Illustrative mockup: Codex inside an IDE-style workspace with editor, chat, and inline diff."
      aspect="16/9"
    >
      <AppMain>
        <div className="flex border-b border-[#1a1a1a] bg-[#0a0a0a]">
          {['app/page.tsx', 'components/codex-mockups.tsx', 'lint output'].map((tab, index) => (
            <div
              key={tab}
              className={[
                mono,
                'min-w-0 border-r border-[#1a1a1a] px-3 py-2 text-[11px]',
                index === 1 ? 'bg-[#121212] text-white' : 'text-[#777]',
              ].join(' ')}
            >
              <span className="block truncate">{tab}</span>
            </div>
          ))}
        </div>
        <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-[1fr_280px]">
          <div className="min-w-0 overflow-auto sm:overflow-hidden">
            <AppDiff
              filename="components/codex-mockups.tsx"
              oldLines={[
                { text: 'export function CodexCliMockup() {' },
                { text: '  return null', changed: true },
                { text: '}' },
              ]}
              newLines={[
                { text: 'export function CodexCliMockup() {' },
                { text: '  return <TerminalMockup ... />', changed: true },
                { text: '}' },
              ]}
            />
          </div>
          <div className="hidden md:flex flex-col gap-3 border-l border-[#1a1a1a] bg-[#0b0b0b] p-4">
            <SectionLabel>Codex chat</SectionLabel>
            <Message role="you">Keep the mockup responsive and do not touch existing pages.</Message>
            <Message role="codex">
              I am composing the existing app and terminal primitives, then I will run lint against the project.
            </Message>
            <div className="mt-auto rounded border border-[#222] bg-[#101010] p-3">
              <SectionLabel>Checks</SectionLabel>
              <div className="mt-2 flex flex-wrap gap-2">
                <Pill tone="green">exports match</Pill>
                <Pill tone="green">ASCII</Pill>
                <Pill tone="amber">lint pending</Pill>
              </div>
            </div>
          </div>
        </div>
      </AppMain>
    </AppMockup>
  );
}

export function CodexCloudTaskMockup() {
  return (
    <AppMockup
      caption="Illustrative mockup: Codex cloud task running a repository change away from the local machine."
      aspect="16/10"
    >
      <AppMain className="p-4 sm:p-5 gap-4 overflow-auto sm:overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className={`${display} text-lg font-bold text-white`}>Cloud task</div>
            <div className={`${body} text-[12px] text-[#777]`}>repo: acme/product-dashboard - branch: codex/invoice-export</div>
          </div>
          <Pill tone="primary">running in sandbox</Pill>
        </div>
        <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-[1fr_260px] gap-3">
          <div className="rounded border border-[#222] bg-[#101010] p-3 sm:p-4 overflow-auto sm:overflow-hidden">
            <SectionLabel>Timeline</SectionLabel>
            <div className="mt-3 space-y-3">
              {[
                ['00:00', 'Cloned repository and installed dependencies'],
                ['00:34', 'Read AGENTS.md, docs billing spec, and export route'],
                ['02:18', 'Implemented CSV export with permission checks'],
                ['03:07', 'Running npm test -- invoice-export'],
              ].map(([time, text], index) => (
                <div key={time} className="flex gap-3">
                  <div className={`${mono} w-11 shrink-0 text-[10px] text-[#666]`}>{time}</div>
                  <div className="flex flex-col items-center">
                    <span
                      className={[
                        'h-2 w-2 rounded-full',
                        index === 3 ? 'bg-[color:var(--color-primary)] animate-pulse' : 'bg-[#444]',
                      ].join(' ')}
                    />
                    {index !== 3 && <span className="h-9 w-px bg-[#222]" />}
                  </div>
                  <div className={`${body} min-w-0 text-[12px] text-[#bbb]`}>{text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded border border-[#222] bg-[#0d0d0d] p-3 sm:p-4">
            <SectionLabel>Task summary</SectionLabel>
            <div className="mt-3 space-y-3">
              <div>
                <div className={`${mono} text-[10px] text-[#555]`}>files changed</div>
                <div className={`${display} text-2xl font-bold text-white`}>5</div>
              </div>
              <div>
                <div className={`${mono} text-[10px] text-[#555]`}>tests</div>
                <Pill tone="amber">running</Pill>
              </div>
              <div>
                <div className={`${mono} text-[10px] text-[#555]`}>next step</div>
                <div className={`${body} mt-1 text-[12px] text-[#aaa]`}>Open pull request after checks pass.</div>
              </div>
            </div>
          </div>
        </div>
      </AppMain>
    </AppMockup>
  );
}

export function CodexPrReviewMockup() {
  return (
    <AppMockup
      caption="Illustrative mockup: Codex reviewing a pull request with findings tied to changed files."
      aspect="16/9"
    >
      <AppMain className="p-4 sm:p-5 gap-4 overflow-auto sm:overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className={`${display} text-lg font-bold text-white`}>PR review</div>
            <div className={`${body} text-[12px] text-[#777]`}>#482 Add invoice CSV export</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill tone="red">1 blocker</Pill>
            <Pill tone="amber">2 notes</Pill>
          </div>
        </div>
        <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-[280px_1fr] gap-3">
          <div className="rounded border border-[#222] bg-[#101010] p-3 space-y-3">
            {[
              {
                title: 'Missing tenant guard',
                file: 'app/api/invoices/export/route.ts:42',
                tone: 'red' as const,
              },
              {
                title: 'CSV escaping edge case',
                file: 'lib/invoices/csv.ts:18',
                tone: 'amber' as const,
              },
              {
                title: 'Add regression test',
                file: 'tests/invoices/export.test.ts:71',
                tone: 'amber' as const,
              },
            ].map((finding) => (
              <div key={finding.title} className="rounded border border-[#242424] bg-[#0d0d0d] p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className={`${body} text-[12px] font-semibold text-white`}>{finding.title}</div>
                  <Pill tone={finding.tone}>{finding.tone === 'red' ? 'P1' : 'P2'}</Pill>
                </div>
                <div className={`${mono} mt-2 text-[10px] text-[#666] truncate`}>{finding.file}</div>
              </div>
            ))}
          </div>
          <div className="rounded border border-[#222] bg-[#0d0d0d] p-3 sm:p-4 overflow-auto sm:overflow-hidden">
            <SectionLabel>Selected finding</SectionLabel>
            <div className={`${display} mt-3 text-base font-semibold text-white`}>Tenant guard is bypassed for CSV exports</div>
            <p className={`${body} mt-2 text-[12px] leading-relaxed text-[#aaa]`}>
              The HTML invoice route checks the current tenant, but this export route trusts the invoice id from
              the request. A user who guesses another tenant invoice id can export it.
            </p>
            <pre className={`${mono} mt-4 overflow-auto rounded border border-[#222] bg-[#080808] p-3 text-[11px] leading-relaxed text-[#888]`}>
{`41  const invoice = await db.invoice.findUnique({ where: { id } })
42  return csv(invoice.lineItems)
43
44  // Suggested:
45  await requireTenantAccess(user.id, invoice.tenantId)`}
            </pre>
          </div>
        </div>
      </AppMain>
    </AppMockup>
  );
}

export function CodexAutomationMockup() {
  return (
    <AppMockup
      caption="Illustrative mockup: Codex automation monitoring scheduled code health tasks."
      aspect="16/10"
    >
      <AppMain className="p-4 sm:p-5 gap-4 overflow-auto sm:overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className={`${display} text-lg font-bold text-white`}>Automations</div>
            <div className={`${body} text-[12px] text-[#777]`}>Scheduled checks that wake Codex with fresh context.</div>
          </div>
          <Pill tone="green">enabled</Pill>
        </div>
        <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              title: 'Morning CI triage',
              schedule: 'weekdays - 8:30 AM',
              status: 'next in 14h',
              detail: 'Summarize failed GitHub Actions and propose fixes.',
              tone: 'primary' as const,
            },
            {
              title: 'Dependency drift report',
              schedule: 'Mondays - 9:00 AM',
              status: 'waiting',
              detail: 'Review outdated packages and group low-risk updates.',
              tone: 'neutral' as const,
            },
            {
              title: 'Docs freshness scan',
              schedule: 'Fridays - 2:00 PM',
              status: 'paused',
              detail: 'Find stale screenshots and pages past validation date.',
              tone: 'amber' as const,
            },
            {
              title: 'Release note draft',
              schedule: 'on merged PR',
              status: 'active',
              detail: 'Turn merged commits into a concise changelog draft.',
              tone: 'green' as const,
            },
          ].map((automation) => (
            <div key={automation.title} className="rounded border border-[#222] bg-[#101010] p-3 sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div className={`${display} min-w-0 text-[15px] font-semibold text-white`}>{automation.title}</div>
                <Pill tone={automation.tone}>{automation.status}</Pill>
              </div>
              <div className={`${mono} mt-2 text-[10px] text-[#666]`}>{automation.schedule}</div>
              <p className={`${body} mt-3 text-[12px] leading-relaxed text-[#aaa]`}>{automation.detail}</p>
            </div>
          ))}
        </div>
      </AppMain>
    </AppMockup>
  );
}

export function AgentsMdPreview() {
  return (
    <AppMockup
      caption="Illustrative mockup: AGENTS.md project instructions previewed beside the active Codex session."
      aspect="16/10"
    >
      <AppMain>
        <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-[1fr_300px]">
          <div className="p-4 sm:p-5 space-y-3 overflow-auto sm:overflow-hidden">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="primary">AGENTS.md loaded</Pill>
              <Pill>scope: repository root</Pill>
            </div>
            <Message role="you">Add the Codex mockup components from the plan.</Message>
            <Message role="codex">
              I will follow AGENTS.md, avoid existing page edits, compose the current primitives, and run lint
              before reporting back.
            </Message>
            <div className="rounded border border-[#222] bg-[#101010] p-3">
              <SectionLabel>Instruction match</SectionLabel>
              <div className="mt-3 grid gap-2">
                <MiniFile name="Read Next docs before code" detail="done - components API checked" active />
                <MiniFile name="Do not touch nav or pages" detail="new component file only" />
                <MiniFile name="ASCII only" detail="source scan before final" />
              </div>
            </div>
          </div>
          <div className="border-l border-[#1a1a1a] bg-[#0b0b0b] p-4 overflow-auto sm:overflow-hidden">
            <div className={`${mono} text-[11px] text-[#777]`}>AGENTS.md</div>
            <pre className={`${mono} mt-3 h-full overflow-auto rounded border border-[#222] bg-[#080808] p-3 text-[11px] leading-relaxed text-[#999]`}>
{`# Project instructions

- Read the Next.js docs in node_modules
  before editing framework code.
- Prefer existing screenshot primitives.
- Do not modify navigation, app pages, or
  package files for mockup-only work.
- Keep source text ASCII only.
- Run npm run lint when feasible.`}
            </pre>
          </div>
        </div>
      </AppMain>
    </AppMockup>
  );
}
