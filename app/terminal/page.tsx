import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { Screenshot } from '@/components/screenshot';

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
          caption="A fresh Claude Code session in the terminal"
          spec="Full-terminal shot of: `cd ~/some-project && claude`. Shows the welcome banner, the project name in the header, the status line at the bottom, and a blank prompt with cursor. Zsh or iTerm2 with a dark theme works best."
          aspect="16/9"
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
        <Screenshot
          caption="Slash menu after typing /"
          spec="Terminal shot of a session with just `/` typed. Shows the filterable list of slash commands (/help, /clear, /compact, /cost, /effort, etc.) with the first one highlighted. Cursor visible in the prompt."
          aspect="16/9"
        />

        <h3 className="font-[family-name:var(--font-display)] italic text-xl text-white mt-8">
          @file completion
        </h3>
        <p className="text-[#bbb] leading-relaxed">
          Type <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">@</code>{' '}
          inside a prompt and Claude Code offers fuzzy-matched filenames from your project. Tab to complete. Works
          for files and directories.
        </p>
        <Screenshot
          caption="@-completion after typing @src/au"
          spec='Terminal shot mid-prompt: "explain @src/au" with a dropdown showing matched files like @src/auth.ts, @src/auth/, @src/auth/login.ts. The prompt text continues after the dropdown dismisses.'
          aspect="16/9"
        />
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
        <Screenshot
          caption="Verbose mode showing Claude's internal thinking (gray italic) followed by the answer"
          spec='Terminal shot of a completed prompt with Ctrl+O toggled on. Upper half is gray italic text: "Let me check the config... looking at src/config.ts... I see the env vars are loaded via..." Lower half is the clean answer in normal text.'
          aspect="16/9"
        />
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
