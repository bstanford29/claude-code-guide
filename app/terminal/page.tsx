import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { Screenshot } from '@/components/screenshot';
import { TerminalMockup, TermLine, TermPrompt, TermCaret, TermMenu } from '@/components/terminal-mockup';

export const metadata = {
  title: 'Terminal tour',
  description: 'The terminal UI of Claude Code — keyboard shortcuts, slash menu, @file completion, verbose mode.',
};

export default function TerminalPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="The terminal"
        subtitle="A five-minute tour of what you see when you type `claude` and what every key does. Terminal is the default and where power users live."
        lastValidated="2026-04-18"
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Starting a session
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          From any directory with <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">cd</code>:
        </p>
        <CodeBlock>{`cd ~/your-project
claude`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Claude Code initializes in the current directory, reads any{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">CLAUDE.md</code>
          , and drops you at a prompt. The top of the terminal shows context &mdash; project name, model, effort level.
        </p>

        <Screenshot
          src="/screenshots/anthropic-terminal-prompt.webp"
          alt="Claude Code running in a terminal — showing the mascot, version line, user prompt, and Claude exploring the codebase"
          caption="Claude Code in the terminal · source: anthropic.com"
          aspect="16/10"
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Keyboard shortcuts that matter
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The terminal UI is keyboard-first. Half a dozen shortcuts cover 90% of what you&apos;ll do:
        </p>

        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden mt-4">
          <ShortcutRow keys="Enter" what="Submit your prompt" when="Any time the cursor is in the prompt box" />
          <ShortcutRow keys="Shift + Enter" what="New line without submitting" when="Writing a multi-line prompt" />
          <ShortcutRow keys="Esc" what="Interrupt Claude mid-response" when="It's writing a wall of text you don't need" />
          <ShortcutRow keys="Esc Esc" what="Open the /rewind checkpoint menu" when="Undo something Claude did earlier" />
          <ShortcutRow keys="Shift + Tab" what="Cycle permission modes (default → auto-accept → plan)" when="Before a multi-file change, hit Shift+Tab twice for plan mode" />
          <ShortcutRow keys="Ctrl + G" what="Open the current plan in your default editor" when="Plan mode is active and you want to tweak before executing" />
          <ShortcutRow keys="Ctrl + O" what="Toggle verbose mode — show Claude's internal thinking" when="Debugging a prompt that isn't landing" />
          <ShortcutRow keys="Ctrl + V" what="Paste image from clipboard (even on macOS — not Cmd+V)" when="Pasting screenshots, mockups, diagrams" />
          <ShortcutRow keys="Up arrow" what="Recall previous prompts" when="Re-running or editing a recent prompt" />
          <ShortcutRow keys="Ctrl + C" what="Hard exit the session" when="Closing up for the day" />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Two completion menus you&apos;ll use every session
        </h2>

        <h3 className="font-[family-name:var(--font-display)] italic text-xl text-white mt-6">
          Slash command menu
        </h3>
        <p className="text-[#bbb] leading-relaxed">
          Type <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">/</code>
          {' '}at the start of a prompt and a fuzzy-matched menu appears. Keep typing to narrow it down, Tab to
          accept, Enter to run. No need to memorize command names.
        </p>
        <TerminalMockup title="claude · ~/your-project" caption="Slash menu: type / to fuzzy-filter every slash command">
          <TermLine muted>Claude Code v2.1.76 · /Users/you/your-project</TermLine>
          <div className="mt-3">
            <TermPrompt>
              /<TermCaret />
            </TermPrompt>
          </div>
          <TermMenu
            header="slash commands · fuzzy match"
            activeIndex={0}
            items={[
              { label: '/help', hint: 'list every command' },
              { label: '/clear', hint: 'reset conversation context' },
              { label: '/compact', hint: 'summarize to free context' },
              { label: '/cost', hint: 'session cost + plan usage' },
              { label: '/effort', hint: 'set thinking depth' },
              { label: '/permissions', hint: 'view or edit allowlist' },
              { label: '/rewind', hint: 'restore a prior checkpoint' },
              { label: '/agents', hint: 'browse subagents' },
            ]}
          />
          <TermLine muted>Tab to accept · Enter to run · Esc to dismiss</TermLine>
        </TerminalMockup>

        <h3 className="font-[family-name:var(--font-display)] italic text-xl text-white mt-8">
          @file completion
        </h3>
        <p className="text-[#bbb] leading-relaxed">
          Type <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">@</code>{' '}
          inside a prompt and Claude Code offers fuzzy-matched filenames from your project. Tab to complete. Works
          for files and directories.
        </p>
        <TerminalMockup title="claude · ~/your-project" caption="@file completion: type @ and get fuzzy-matched paths from your project">
          <TermLine muted>Claude Code v2.1.76 · /Users/you/your-project</TermLine>
          <div className="mt-3">
            <TermPrompt>
              explain @src/au<TermCaret />
            </TermPrompt>
          </div>
          <TermMenu
            header="files · matches for 'au'"
            activeIndex={1}
            items={[
              { label: '@src/auth.ts', hint: '1.2 KB · TypeScript' },
              { label: '@src/auth/', hint: 'directory · 8 files' },
              { label: '@src/auth/login.ts', hint: '0.8 KB · TypeScript' },
              { label: '@src/auth/session.ts', hint: '2.1 KB · TypeScript' },
              { label: '@src/audit.ts', hint: '0.4 KB · TypeScript' },
            ]}
          />
          <TermLine muted>Tab to accept · referenced files are read before Claude responds</TermLine>
        </TerminalMockup>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The permission prompt in the terminal
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          When Claude is about to edit a file or run a command, the prompt inline-renders the diff with{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">+</code>{' '}
          and{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">-</code>{' '}
          markers, then asks. Four keys:
        </p>
        <CodeBlock title="Permission prompt example">{`Claude wants to edit src/app/api/health/route.ts

+ export async function GET() {
+   return Response.json({ status: 'ok' })
+ }

Allow? (y/n/e to edit, a to always allow)`}</CodeBlock>
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden mt-4">
          <ShortcutRow keys="y" what="Accept the change" when="Diff looks right" />
          <ShortcutRow keys="n" what="Reject the change" when="Diff is wrong or risky" />
          <ShortcutRow keys="e" what="Open the diff in your editor and edit before applying" when="90% right, small tweaks needed" />
          <ShortcutRow keys="a" what="Always allow this exact kind of action (add to allowlist)" when="Routine command you approve repeatedly" />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Verbose mode &mdash; watch Claude think
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Press <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">Ctrl+O</code>{' '}
          to toggle verbose mode. Claude&apos;s internal reasoning renders as gray italic text before the answer.
          Useful when:
        </p>
        <ul className="list-none space-y-2 mt-3">
          <li className="pl-6 relative">
            <span className="absolute left-0 text-[color:var(--color-primary)]">&#8250;</span>
            <span className="text-[#bbb] text-sm">A prompt keeps producing wrong answers and you can&apos;t tell where the misunderstanding is</span>
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 text-[color:var(--color-primary)]">&#8250;</span>
            <span className="text-[#bbb] text-sm">You want to verify that <code>/effort high</code> is actually being used</span>
          </li>
          <li className="pl-6 relative">
            <span className="absolute left-0 text-[color:var(--color-primary)]">&#8250;</span>
            <span className="text-[#bbb] text-sm">Convincing a skeptical colleague that the model isn&apos;t just bullshitting</span>
          </li>
        </ul>
        <TerminalMockup title="claude · ~/your-project · verbose" caption="Verbose mode (Ctrl+O): thinking in gray italic, answer in normal text">
          <TermPrompt>why does our auth silently fail after 24 hours?</TermPrompt>
          <div className="mt-3 pl-4 border-l border-[#222]">
            <TermLine italic>Let me read @src/auth/session.ts and look at the token lifetime...</TermLine>
            <TermLine italic>The refresh-token TTL is 24h but I don&apos;t see any auto-refresh logic.</TermLine>
            <TermLine italic>Checking middleware now for silent failure handling...</TermLine>
            <TermLine italic>Middleware catches 401 but doesn&apos;t distinguish from network errors.</TermLine>
            <TermLine italic>The root cause is the silent catch. The 24h matches the TTL.</TermLine>
          </div>
          <div className="mt-3">
            <TermLine accent>● Root cause: auth/middleware.ts:47 swallows 401 from expired refresh tokens</TermLine>
            <TermLine>The middleware catches every non-200 and renders the home page, so an</TermLine>
            <TermLine>expired refresh token looks identical to &ldquo;not logged in.&rdquo; Fix: branch on</TermLine>
            <TermLine>status === 401 and redirect to /login instead of silently dropping.</TermLine>
          </div>
          <TermLine muted>Ctrl+O to hide thinking · thinking tokens still counted</TermLine>
        </TerminalMockup>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The status line (optional, recommended)
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          A thin bar at the bottom of your terminal showing context usage, cost, current branch, and session name.
          Claude Code ships with a default; you can customize or install community ones.
        </p>
        <Callout variant="tip" title="Why install a status line">
          Before installing one: you find out you&apos;re at 80% context when Claude starts forgetting things. After:
          you see it climb in real time and run <code>/compact</code> proactively. Context hygiene becomes automatic
          instead of reactive.
        </Callout>
        <CodeBlock title="Enable status line in settings">{`// ~/.claude/settings.json
{
  "statusLine": {
    "enabled": true,
    "format": "{session} · {branch} · {context_pct}% · \${cost}"
  }
}`}</CodeBlock>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Exiting cleanly
        </h2>
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <ShortcutRow
            keys="/exit"
            what="Clean exit — saves session for later resume"
            when={`You'll come back to this work later`}
          />
          <ShortcutRow
            keys="Ctrl + C"
            what="Force exit"
            when="Claude is stuck and won't respond to Esc"
          />
          <ShortcutRow
            keys="Close terminal tab"
            what="Also clean — session is saved automatically"
            when="You're done for the day"
          />
        </div>
        <p className="text-[#bbb] leading-relaxed mt-4">
          Either way, the session is saved. Come back tomorrow with{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            claude --continue
          </code>{' '}
          to pick up where you left off.
        </p>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/desktop-app"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          The desktop app &rarr;
        </Link>
      </section>
    </>
  );
}

function ShortcutRow({ keys, what, when }: { keys: string; what: string; when: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[180px_1fr_1fr] gap-x-4 p-4 border-t border-[var(--color-border)] first:border-t-0 text-sm">
      <code className="text-[color:var(--color-primary)] bg-[#161616] px-2 py-1 rounded text-xs font-mono self-start">
        {keys}
      </code>
      <div className="text-[#ccc] leading-relaxed">{what}</div>
      <div className="text-[#888] text-xs leading-relaxed italic">{when}</div>
    </div>
  );
}
