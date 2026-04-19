import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { Screenshot } from '@/components/screenshot';
import { CompareTable } from '@/components/compare-table';
import { AppMockup, AppSidebar, AppTabs, AppMain, AppDiff } from '@/components/app-mockup';

export const metadata = {
  title: 'Desktop app tour',
  description: 'The Claude Code desktop app — windows, tabs, visual diffs, drag-and-drop images, parallel sessions.',
};

export default function DesktopAppPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="The desktop app"
        subtitle="Same AI as the terminal, wrapped in a window. Better for visual thinkers, better for parallel work, better for colleagues who don't live in a shell."
        lastValidated="2026-04-18"
      />

      <section className="space-y-5">
        <Callout variant="info" title="Install link">
          <a
            className="text-[color:var(--color-primary)] hover:underline"
            href="https://claude.ai/download"
            target="_blank"
            rel="noopener noreferrer"
          >
            claude.ai/download
          </a>{' '}
          &mdash; macOS and Windows. Sign in with the same Anthropic account as the terminal; your Pro/Max plan
          applies to both.
        </Callout>
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The window at a glance
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Three panels. Left: session list + project tree. Center: chat + permission prompts. Right (on demand):
          file viewer + diff preview.
        </p>
        <Screenshot
          src="/screenshots/anthropic-desktop-hero.png"
          alt="Claude Code desktop app showing left sidebar with Code tab, session list (New session, Scheduled, Customize, Pinned, Recents), and the main empty canvas with the mascot"
          caption="The desktop app on first launch · source: anthropic.com"
          aspect="21/9"
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Starting a session
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The desktop app opens a project instead of a directory. First time: pick a folder. After that, recent
          projects appear in the left sidebar and one click resumes.
        </p>
        <AppMockup caption="Project picker: recent + pinned projects, one click to resume" aspect="16/10">
          <AppSidebar
            sections={[
              {
                title: 'Sessions',
                items: [{ label: 'New session', active: true }, { label: 'Scheduled' }, { label: 'Customize' }],
              },
              {
                title: 'Pinned',
                items: [
                  { label: 'Build the alignment grid demo', accent: 'var(--tier-a)' },
                  { label: 'Fix auth redirect bug', accent: 'var(--tier-b)' },
                ],
              },
            ]}
          />
          <AppMain className="p-6 gap-4">
            <div className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-1">Open a project</div>
            <div className="text-xs text-[#888] mb-4 font-[family-name:var(--font-body)]">Recent</div>
            <div className="grid grid-cols-2 gap-3 font-[family-name:var(--font-body)]">
              {[
                { name: 'client-x-research', when: '2 hours ago', branch: 'main' },
                { name: 'q3-deck', when: 'yesterday', branch: 'feat/revision-3' },
                { name: 'accenture-labs', when: '3 days ago', branch: 'main' },
                { name: 'personal-site', when: 'last week', branch: 'main' },
              ].map((p) => (
                <div key={p.name} className="p-3 rounded border border-[#222] bg-[#121212]">
                  <div className="text-sm text-white truncate">{p.name}</div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-[#666]">
                    <span>{p.when}</span>
                    <span>·</span>
                    <span className="font-[family-name:var(--font-mono)]">{p.branch}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              disabled
              className="mt-auto self-start px-3 py-1.5 rounded bg-[color:var(--color-primary)]/15 border border-[color:var(--color-primary)]/30 text-[color:var(--color-primary)] text-xs font-[family-name:var(--font-body)] font-semibold"
            >
              Open folder…
            </button>
          </AppMain>
        </AppMockup>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Parallel sessions in tabs &mdash; the killer feature
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The one thing the desktop app does that the terminal can&apos;t match without git worktree gymnastics:{' '}
          <strong className="text-white">multiple sessions at once</strong>, each in its own isolated working copy
          of the project. Tab over to session B while A is thinking. Run a writer in one, a reviewer in another.
          Ship two features in parallel.
        </p>
        <AppMockup caption="Three parallel sessions, each in its own git-worktree-isolated copy" aspect="16/10">
          <AppMain>
            <AppTabs
              activeIndex={0}
              tabs={[
                { label: 'feature-auth', branch: 'worktree/auth', status: 'thinking' },
                { label: 'fix-checkout-bug', branch: 'worktree/checkout', status: 'ready' },
                { label: 'refactor-settings', branch: 'worktree/settings', status: 'idle' },
              ]}
            />
            <div className="flex-1 p-5 space-y-3 font-[family-name:var(--font-body)] text-sm">
              <div className="flex gap-3">
                <span className="shrink-0 text-[color:var(--color-primary)] font-[family-name:var(--font-mono)] mt-0.5">&gt;</span>
                <span className="text-white">Add OAuth callback with token refresh and session expiry.</span>
              </div>
              <div className="flex items-center gap-2 text-[#888] text-xs font-[family-name:var(--font-mono)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-primary)] animate-pulse" />
                <span>Reading src/auth/session.ts…</span>
              </div>
              <div className="text-[#aaa] pl-4 border-l border-[#222]">
                I&apos;ll add a <code className="text-[color:var(--color-primary)]">refresh()</code> handler and
                wire it into the middleware. Check before edit incoming.
              </div>
              <div className="mt-2 p-2.5 rounded border border-[#222] bg-[#0f0f0f] text-xs text-[#888]">
                Tip: tab 2 finished — diff waiting for your review.
              </div>
            </div>
          </AppMain>
        </AppMockup>
        <Callout variant="tip" title="How it works underneath">
          Each tab uses a git worktree behind the scenes &mdash; same mechanism as{' '}
          <Link href="/worktrees" className="text-[color:var(--color-primary)] hover:underline">
            <code>claude --worktree</code>
          </Link>{' '}
          but surfaced as UI instead of CLI. Files don&apos;t collide because they&apos;re physically separate
          checkouts.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The visual diff preview
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Before any edit lands, the right panel opens with a side-by-side diff &mdash; original on the left,
          proposed on the right, changed lines highlighted. Click accept, click reject, or edit the proposed version
          in place. Compared to reading a unified diff in the terminal, this is where the desktop app earns its
          keep for most people.
        </p>
        <AppMockup caption="Side-by-side diff — current on the left, proposed on the right, action bar at the bottom" aspect="16/9">
          <AppMain>
            <AppDiff
              filename="src/app/api/health/route.ts"
              oldLines={[
                { text: 'export async function GET() {' },
                { text: '  return Response.json({', changed: true },
                { text: '    status: \u201cok\u201d', changed: true },
                { text: '  })' },
                { text: '}' },
              ]}
              newLines={[
                { text: 'export async function GET() {' },
                { text: '  return Response.json({', changed: true },
                { text: '    status: \u201cok\u201d,', changed: true },
                { text: '    time: new Date().toISOString()', changed: true },
                { text: '  })' },
                { text: '}' },
              ]}
            />
          </AppMain>
        </AppMockup>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Drag-and-drop for images and files
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Drop a screenshot, mockup, or PDF straight into the prompt. No paste dance, no file path. Works for
          multiple files at once &mdash; drag three mockups in and ask Claude to compare them.
        </p>
        <AppMockup caption="Dragging an image into the prompt — drop zone is any file, any count, any order" aspect="16/10">
          <AppMain>
            <div className="flex-1 p-6 font-[family-name:var(--font-body)] flex flex-col">
              <div className="flex gap-3 mb-5">
                <span className="shrink-0 text-[color:var(--color-primary)] font-[family-name:var(--font-mono)] text-sm mt-0.5">&gt;</span>
                <span className="text-white text-sm">Here&apos;s the deck I&apos;m working on — rewrite the slide headlines as claims, not topics.</span>
              </div>
              <div className="flex-1 border-2 border-dashed border-[color:var(--color-primary)]/60 rounded-lg bg-[color:var(--color-primary)]/5 flex items-center justify-center relative overflow-hidden">
                {/* Ghost thumbnail */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[160px] h-[110px] rounded bg-[#1a1a1a] border border-[#333] shadow-2xl opacity-80 rotate-[-4deg] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[#666] uppercase tracking-[0.1em]">q3-strategy.pptx</span>
                </div>
                <div className="text-center relative z-10 mt-16">
                  <div className="font-[family-name:var(--font-display)] text-xl text-[color:var(--color-primary)] mb-1">Drop to attach</div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[#888]">or paste · Cmd+V</div>
                </div>
              </div>
            </div>
          </AppMain>
        </AppMockup>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Session history + restore
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Every session stays in the sidebar until you delete it. Click one to resume. The app also tracks
          Claude&apos;s checkpoints (same thing as{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            /rewind
          </code>{' '}
          in the terminal) &mdash; you can visually scrub back to any point and restore conversation, code, or
          both.
        </p>
        <AppMockup caption="Session history with a selected session expanded to a checkpoint timeline" aspect="4/3">
          <AppSidebar
            sections={[
              {
                title: 'Recents',
                items: [
                  { label: 'feature-auth', accent: 'var(--tier-a)', active: true, subtle: 'now' },
                  { label: 'fix-checkout-bug', accent: 'var(--tier-b)', subtle: '1h' },
                  { label: 'Q3 deck revision', accent: 'var(--tier-c)', subtle: '4h' },
                  { label: 'inbox triage', accent: 'var(--tier-ref)', subtle: '1d' },
                ],
              },
            ]}
          />
          <AppMain className="p-5 font-[family-name:var(--font-body)]">
            <div className="font-[family-name:var(--font-display)] text-base font-bold text-white mb-3">
              feature-auth <span className="text-xs text-[#666] font-normal ml-2 font-[family-name:var(--font-mono)]">worktree/auth</span>
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-[#555] mb-3">
              Checkpoints
            </div>
            <div className="space-y-0 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[#2a2a2a]">
              {[
                { time: '14:31', label: 'Added /health endpoint', active: true },
                { time: '14:18', label: 'Added refresh() in auth/session.ts' },
                { time: '13:52', label: 'Reverted test changes' },
                { time: '13:41', label: 'Initial plan accepted' },
                { time: '13:33', label: 'Session started' },
              ].map((cp, i) => (
                <div key={i} className="flex items-start gap-3 pl-0 py-2 relative">
                  <span
                    className={[
                      'w-3.5 h-3.5 rounded-full shrink-0 mt-0.5 z-10 border-2',
                      cp.active
                        ? 'bg-[color:var(--color-primary)] border-[color:var(--color-primary)]'
                        : 'bg-[#0d0d0d] border-[#444]',
                    ].join(' ')}
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#666]">{cp.time}</span>
                      <span className={`text-xs ${cp.active ? 'text-white font-semibold' : 'text-[#aaa]'}`}>{cp.label}</span>
                    </div>
                  </div>
                  {cp.active && (
                    <button
                      disabled
                      className="px-2 py-0.5 rounded border border-[color:var(--color-primary)]/30 bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] text-[9px] uppercase tracking-wider font-[family-name:var(--font-mono)]"
                    >
                      Restore
                    </button>
                  )}
                </div>
              ))}
            </div>
          </AppMain>
        </AppMockup>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Everything the terminal does, the app does too
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Same model, same permission model, same slash commands, same{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">@file</code>
          , same MCP servers, same CLAUDE.md. The app is a visual wrapper &mdash; not a different tool.
        </p>

        <CompareTable
          leftHeader="Terminal"
          rightHeader="Desktop app"
          rows={[
            {
              label: 'Slash commands',
              left: 'Type / to open fuzzy menu',
              right: 'Same — / opens a visual command palette',
            },
            {
              label: 'Permission prompts',
              left: 'Inline diff + y/n/e/a',
              right: 'Side-by-side visual diff + Accept/Reject/Edit buttons',
            },
            {
              label: 'Images',
              left: 'Ctrl+V to paste (not Cmd+V)',
              right: 'Drag-and-drop or Cmd+V',
            },
            {
              label: 'Parallel sessions',
              left: 'git worktrees + multiple terminal tabs',
              right: 'Built-in tabs, same window',
            },
            {
              label: 'Verbose thinking',
              left: 'Ctrl+O toggles gray italic text',
              right: 'Toggle in view menu — renders as a collapsible section per message',
            },
            {
              label: 'Session resume',
              left: 'claude --continue or --resume',
              right: 'Click a session in the sidebar',
            },
            {
              label: 'Scripting / headless',
              left: 'claude -p "..." — pipe-friendly',
              right: 'Not the right tool — use terminal for this',
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          When to pick the app over the terminal
        </h2>
        <div className="space-y-3">
          <UseCase
            title="You're running two or more streams of work simultaneously"
            body="Tabs are the killer feature. Every alternative (terminal tabs + worktrees, iTerm split panes) is more friction."
          />
          <UseCase
            title="You want to review a big diff visually"
            body="A 200-line rename-refactor reads far better side-by-side than as a unified diff. The app's diff view is designed for this."
          />
          <UseCase
            title="You're doing a lot of image work"
            body="Mockups, screenshots, diagrams. Drag-and-drop + the ability to drop multiple files beats any terminal workflow."
          />
          <UseCase
            title="You're onboarding a colleague"
            body="A window with labeled panels reads as 'software' to non-developers. A terminal with text on text scares people. If you're demoing to Accenture leadership, pick the app."
          />
        </div>

        <h3 className="font-[family-name:var(--font-display)] italic text-xl text-white mt-10">
          When to stay in the terminal
        </h3>
        <div className="space-y-3">
          <UseCase
            title="Scripting, CI, or pipes"
            body={
              <>
                <code>claude -p &quot;...&quot;</code> and shell pipelines only work in the terminal. Headless mode is a
                terminal-only feature.
              </>
            }
          />
          <UseCase
            title="You already live in a terminal"
            body="If tmux + neovim + gh CLI is your habitat, the app breaks your flow more than it helps."
          />
          <UseCase
            title="Minimal resource footprint"
            body="Running on an older machine or a resource-constrained VM? The terminal is lighter."
          />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/first-session"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Your first session &rarr;
        </Link>
      </section>
    </>
  );
}

function UseCase({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4">
      <div className="font-[family-name:var(--font-body)] font-semibold text-white text-sm mb-1">{title}</div>
      <p className="text-[#bbb] text-sm leading-relaxed">{body}</p>
    </div>
  );
}
