import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Slash commands',
  description: 'The 15 built-in slash commands worth knowing, plus how to write your own.',
};

type Cmd = { name: string; what: string; when: string };

const ESSENTIAL: Cmd[] = [
  {
    name: '/help',
    what: 'Lists every slash command available in this session.',
    when: 'When you forget one (you will).',
  },
  {
    name: '/clear',
    what: 'Wipes the conversation context and starts fresh.',
    when: 'Between unrelated tasks. Also: after two failed corrections on the same problem.',
  },
  {
    name: '/compact',
    what: 'Summarizes the conversation so far to free up context without losing the important bits.',
    when: 'Long session starting to feel slow or forgetful. Pass instructions: /compact Focus on the auth changes.',
  },
  {
    name: '/cost',
    what: 'Shows your current session cost and remaining plan usage.',
    when: "Any time you want to know 'am I about to hit my cap?'",
  },
  {
    name: '/doctor',
    what: 'Diagnostic: Node version, auth state, MCP connectivity, permissions.',
    when: 'When something mysteriously broke after an upgrade or fresh install.',
  },
];

const SESSION: Cmd[] = [
  {
    name: '/effort',
    what: 'Sets thinking depth (low / medium / high / max) for the rest of the session.',
    when: 'Start of architecture-heavy work. Default is fine for routine tasks.',
  },
  {
    name: '/rewind',
    what: 'Opens the checkpoint menu. Restore code, conversation, or both to any prior state.',
    when: 'Something Claude did is wrong and you want to time-travel back. Also: Esc Esc as a shortcut.',
  },
  {
    name: '/btw',
    what: 'Ask a side question in a dismissible overlay — answer never enters your main context.',
    when: "Quick 'wait, what does this flag do?' curiosity you don't want clogging up the session.",
  },
  {
    name: '/resume',
    what: 'Switch to a previous conversation from the session picker.',
    when: 'You left a session earlier today or yesterday and want to pick up where you left off.',
  },
  {
    name: '/rename',
    what: 'Give the current session a descriptive name so you can find it later.',
    when: "Start of any session you'll want to resume. 'oauth-refactor' beats 'Tuesday 3pm session'.",
  },
];

const WORKFLOW: Cmd[] = [
  {
    name: '/plan',
    what: 'Enters plan mode — Claude drafts an implementation plan and blocks edits until you approve.',
    when: "3+ file change coming. If you can't describe the diff in one sentence, plan first. Shift+Tab also enters plan mode.",
  },
  {
    name: '/permissions',
    what: 'View or edit which tools Claude can run without asking.',
    when: 'When approval prompts get repetitive. Allowlist your routine commands.',
  },
  {
    name: '/agents',
    what: 'Browse and manage subagents (specialized assistants with their own context).',
    when: 'Want Claude to hand off a task to a focused sub-session — e.g., "code-reviewer" agent.',
  },
  {
    name: '/hooks',
    what: 'View configured hooks — scripts that run automatically at specific points.',
    when: "Debugging why an automatic action is or isn't firing.",
  },
  {
    name: '/powerup',
    what: 'Interactive lessons with animated demos — Anthropic-official onboarding walkthroughs.',
    when: 'First day. Also: when a colleague sits down and asks "so what does this thing do?"',
  },
];

export default function SlashCommandsPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Slash commands"
        subtitle="The built-ins worth remembering plus how to write your own. Keep this page open during your second week."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <p className="text-[#bbb] leading-relaxed">
          Slash commands are typed with a leading{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">/</code>{' '}
          at the start of a prompt and execute instantly &mdash; no AI roundtrip. They are the closest thing Claude
          Code has to keyboard shortcuts. There are more than 40 built-ins, but you only need about 15.
        </p>
      </section>

      <CommandGroup title={"The five you'll use every session"} kicker="essential" cmds={ESSENTIAL} />
      <CommandGroup title="Managing the session" kicker="session ops" cmds={SESSION} />
      <CommandGroup title="Changing what Claude does" kicker="workflow" cmds={WORKFLOW} />

      {/* Custom commands */}
      <section className="mt-14 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Writing your own
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Any reusable workflow should become a slash command. Drop a markdown file in{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            .claude/commands/
          </code>{' '}
          and the filename becomes the command name.
        </p>
        <CodeBlock title=".claude/commands/deploy.md">{`Run the test suite. If all tests pass, build the project and deploy to production.
Report the deployment URL when done. If tests fail, stop and show me the failures.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Now type <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">/deploy</code>{' '}
          inside a session. Claude runs it.
        </p>
        <Callout variant="tip" title="Pass arguments with $ARGUMENTS">
          Commands can take parameters. Inside your markdown file, reference them with{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">$ARGUMENTS</code>
          . Example:{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            /fix-issue 1234
          </code>{' '}
          with a file that says &ldquo;Fix GitHub issue $ARGUMENTS&rdquo; expands to &ldquo;Fix GitHub issue
          1234.&rdquo;
        </Callout>
      </section>

      {/* Power user tip */}
      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Where people build libraries of these
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Teams share custom commands by checking{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            .claude/commands/
          </code>{' '}
          into git. A good team repo has 10&ndash;30 custom commands covering the rituals everyone does: shipping,
          code review, post-mortem template, release notes, security sweep. Once a workflow has a name, it becomes
          reliable.
        </p>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/memory"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Memory &mdash; how Claude remembers across sessions &rarr;
        </Link>
      </section>
    </>
  );
}

function CommandGroup({ title, kicker, cmds }: { title: string; kicker: string; cmds: Cmd[] }) {
  return (
    <section className="mt-12 space-y-4">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          {title}
        </h2>
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-[color:var(--tier-b)]">
          {kicker}
        </span>
      </div>
      <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
        {cmds.map((c, i) => (
          <div
            key={c.name}
            className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-x-6 gap-y-2 p-4 md:p-5 ${
              i > 0 ? 'border-t border-[var(--color-border)]' : ''
            }`}
          >
            <div>
              <code className="text-[color:var(--color-primary)] font-mono font-semibold text-sm bg-[#161616] px-2 py-1 rounded">
                {c.name}
              </code>
            </div>
            <div className="space-y-1">
              <div className="text-[#ccc] text-sm leading-relaxed">{c.what}</div>
              <div className="text-[#888] text-xs leading-relaxed">
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] mr-2">
                  When
                </span>
                {c.when}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
