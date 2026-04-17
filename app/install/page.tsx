import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { CompareTable } from '@/components/compare-table';

export const metadata = {
  title: 'Install',
  description: 'Install Claude Code in under 2 minutes — terminal and desktop app.',
};

export default function InstallPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Install Claude Code"
        subtitle="Two minutes from zero to working. Terminal is default. Desktop app is the new alternative if you prefer a window."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Prerequisites
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          You need <strong className="text-white">Node.js 18 or higher</strong>. That&apos;s the JavaScript runtime that
          lets the{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">npm</code>{' '}
          installer work. Open a terminal and check:
        </p>
        <CodeBlock title="Check your Node.js version">{`node --version
# Should print v18.x.x or higher`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Missing it? Download the <strong className="text-white">LTS</strong> build from{' '}
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-primary)] hover:underline"
          >
            nodejs.org
          </a>
          . LTS means &ldquo;long-term support&rdquo; &mdash; the stable version you want for tools you rely on.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Option 1 &mdash; Terminal (default, recommended)
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          This is how most people run Claude Code. It lives inside your terminal and works on any project you{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">cd</code> into.
        </p>

        <div>
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg text-white mb-2 mt-6">
            Step 1 &mdash; install globally
          </h3>
          <CodeBlock title="One-time install">{`npm install -g @anthropic-ai/claude-code`}</CodeBlock>
          <p className="text-[#bbb] text-sm leading-relaxed">
            The{' '}
            <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">-g</code>{' '}
            flag means &ldquo;install globally&rdquo; &mdash; available from every folder, not just this one.
          </p>
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg text-white mb-2 mt-6">
            Step 2 &mdash; move into your project
          </h3>
          <CodeBlock title="Navigate to where your code lives">{`cd ~/your-project`}</CodeBlock>
          <p className="text-[#bbb] text-sm leading-relaxed">
            Claude Code reads the folder you launch from. Starting outside a project (like your home directory) gives
            it nothing useful to work with.
          </p>
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg text-white mb-2 mt-6">
            Step 3 &mdash; launch
          </h3>
          <CodeBlock title="Start the session">{`claude`}</CodeBlock>
          <p className="text-[#bbb] text-sm leading-relaxed">
            First run opens your browser to authenticate with your Anthropic account. Log in, come back to the
            terminal, and you&apos;re in. Subsequent runs start instantly.
          </p>
        </div>

        <Callout variant="tip" title="One-liner">
          If you want a single shell command to do the whole thing from a fresh terminal:
          <CodeBlock>{`npm install -g @anthropic-ai/claude-code && cd ~/your-project && claude`}</CodeBlock>
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Option 2 &mdash; Desktop app
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          If you don&apos;t live in the terminal, Anthropic ships a desktop app for macOS and Windows. Download it from{' '}
          <a
            href="https://claude.ai/download"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-primary)] hover:underline"
          >
            claude.ai/download
          </a>
          . It gives you a window with built-in session management, visual diff previews before edits land, and
          parallel-session tabs &mdash; each session runs in its own isolated copy of your project.
        </p>

        <div className="my-6 aspect-video rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[#0f0f0f] flex items-center justify-center">
          <div className="text-center">
            <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.15em] uppercase text-[#555]">
              Desktop app screenshot
            </div>
            <div className="text-xs text-[#444] mt-1">Placeholder &mdash; real screenshot in polish phase</div>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Terminal vs. desktop app &mdash; which one?
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Both run the same AI &mdash; the difference is the wrapper. You can switch anytime. Here&apos;s how to pick
          for a given moment:
        </p>
        <CompareTable
          leftHeader="Terminal"
          rightHeader="Desktop app"
          rows={[
            {
              label: 'Best for',
              left: 'Power users, CI scripts, folks already in a terminal all day',
              right: 'Visual thinkers, parallel projects, anyone who prefers windows to CLIs',
            },
            {
              label: 'Keyboard shortcuts',
              left: 'All of them (Esc, Shift+Tab, Ctrl+O, etc.)',
              right: 'All of them, plus native OS shortcuts',
            },
            {
              label: 'Parallel sessions',
              left: (
                <>
                  Via <code>git worktrees</code> + multiple terminal tabs
                </>
              ),
              right: 'Built-in tabs, each with its own isolated copy of the project',
            },
            {
              label: 'Visual diffs',
              left: 'In-terminal text diff',
              right: 'Side-by-side visual comparison before you accept',
            },
            {
              label: 'Automation / scripts',
              left: (
                <>
                  Great &mdash; pipe in <code>cat</code>, run headless with <code>claude -p</code>
                </>
              ),
              right: 'Not the right tool for headless automation',
            },
          ]}
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Pro vs. Max &mdash; which plan do you need?
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          You need either an Anthropic Pro subscription (<strong className="text-white">$20/month</strong>) or Max (
          <strong className="text-white">$100</strong> or <strong className="text-white">$200/month</strong>). Max is
          worth it if Claude Code is your daily driver &mdash; the usage caps on Pro will bite you during a long
          session.
        </p>

        <CompareTable
          leftHeader="Pro ($20/mo)"
          rightHeader="Max ($100–$200/mo)"
          rows={[
            {
              label: 'Good for',
              left: 'Trying it out, occasional use, side projects',
              right: 'Every-day work, consulting deliverables, long sessions',
            },
            {
              label: 'Usage cap',
              left: 'Hits limits inside a long session',
              right: '5–20× more headroom',
            },
            {
              label: 'Cost per productive hour',
              left: 'Cheap until you hit the cap, then zero until it resets',
              right: 'Higher fixed, but you never stop mid-task',
            },
            {
              label: 'Recommendation',
              left: 'Start here for your first 2 weeks',
              right: 'Upgrade once you catch yourself rate-limited on real work',
            },
          ]}
        />

        <Callout variant="info" title="How this shows up in practice">
          On Pro, a heavy session (lots of file reads, big refactors, extended thinking) can hit the cap mid-task and
          make you wait. On Max, that basically never happens. For client work where interrupting a Claude session
          mid-flow costs you 20 minutes of re-context, Max pays for itself in a week.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Verify your install
        </h2>
        <p className="text-[#bbb] leading-relaxed">Inside a Claude Code session, type:</p>
        <CodeBlock>{`/doctor`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          This runs a diagnostic &mdash; checks your Node version, API auth, permission config, and MCP server
          connectivity. If something&apos;s off, it tells you exactly what to fix.
        </p>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <a
          href="/first-session"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Your first session &rarr;
        </a>
      </section>
    </>
  );
}
