import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { Screenshot } from '@/components/screenshot';
import { CompareTable } from '@/components/compare-table';

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
          caption="Full desktop app window with all three panels visible"
          spec="Desktop app screenshot at ~1440x900. Left sidebar shows 'Sessions' list (3-4 sessions named) + project tree below. Center panel: active chat with a few messages and a permission prompt pending. Right panel: side-by-side diff preview for a file about to be edited. Dark theme."
          aspect="16/10"
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
        <Screenshot
          caption="Project picker — recent + pinned projects"
          spec="Desktop app first-run or File→Open screen. Shows recent projects as cards with repo name, last-active timestamp, and a thumbnail/icon. 'Open folder' button prominent at bottom."
          aspect="16/10"
        />
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
        <Screenshot
          caption="Three tabs open — each session working on a separate branch"
          spec="Desktop app with 3 tabs visible at top of window. Tab 1: 'feature-auth' (active, in middle of a prompt). Tab 2: 'fix-checkout-bug' (idle, has a completed diff waiting). Tab 3: 'refactor-settings' (thinking indicator). Each tab has a color/branch label."
          aspect="16/10"
        />
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
        <Screenshot
          caption="Side-by-side diff preview with accept/reject bar at the bottom"
          spec="Desktop app right panel showing a file diff: left column 'Current' with original code; right column 'Proposed' with Claude's changes. Changed lines have a subtle green/red background. Bottom of the panel has three buttons: Reject · Edit · Accept. Filename shows at the top."
          aspect="16/10"
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Drag-and-drop for images and files
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Drop a screenshot, mockup, or PDF straight into the prompt. No paste dance, no file path. Works for
          multiple files at once &mdash; drag three mockups in and ask Claude to compare them.
        </p>
        <Screenshot
          caption="Dragging a PNG mockup into the prompt box"
          spec="Desktop app with a file being dragged over the prompt box. Prompt shows a dashed drop zone overlay with 'Drop to attach' text. Cursor shows a file being held, a thumbnail preview of the image visible under cursor."
          aspect="16/10"
        />
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
        <Screenshot
          caption="Session history sidebar with a selected session expanded to show checkpoints"
          spec="Desktop app left sidebar zoomed. Sessions listed with one selected and expanded into a timeline view: each row is a checkpoint with a timestamp and one-line summary ('Added /health endpoint', 'Reverted test changes'). A 'Restore to here' button appears on hover."
          aspect="4/5"
        />
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
