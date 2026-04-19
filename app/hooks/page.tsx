import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'Hooks',
  description:
    'Deterministic automation — shell commands that fire on Claude events. PreToolUse, PostToolUse, Stop, Notification.',
};

export default function HooksPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Hooks"
        subtitle="Shell commands that run automatically at specific points. The difference between 'please do X every time' and 'X will happen every time, I guarantee it.'"
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <DefinitionBox
          term="a hook"
          whatItIs="A shell command registered in .claude/settings.json that runs automatically when a specific event fires — before a tool runs, after a tool runs, when Claude stops, when Claude needs your attention."
          whyItMatters={
            "Instructions in CLAUDE.md are advisory — Claude follows them if it remembers. Hooks are deterministic — the harness runs them, not Claude. If you need something to happen with zero exceptions, use a hook."
          }
          example={
            <>
              A PostToolUse hook on <code>Edit</code> that runs <code>prettier --write</code> on the changed file.
              Every edit, every time, no reminding.
            </>
          }
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The four events worth knowing
        </h2>

        <div className="space-y-3">
          <EventCard
            name="PreToolUse"
            fires="Before a tool runs (Edit, Write, Bash, etc.). Can block the action entirely."
            use='Guard rails. "Never let Bash run `rm -rf` without asking." "Never let Write touch the migrations folder."'
          />
          <EventCard
            name="PostToolUse"
            fires="After a tool succeeds."
            use='Reactive automation. "Run prettier after every Edit." "Log every Write to a file." "Warn if the diff contains a TODO."'
          />
          <EventCard
            name="Stop"
            fires="When Claude stops its turn (done responding)."
            use={
              <>
                Enforcing discipline. Brandon&apos;s CLAUDE.md has a Stop hook that scans for inline questions like
                &ldquo;Want me to...?&rdquo; and blocks the turn with a reminder. Forces use of the{' '}
                <code>AskUserQuestion</code> tool.
              </>
            }
          />
          <EventCard
            name="Notification"
            fires="When Claude needs your attention (waiting for permission, idle, auth done)."
            use='Desktop notifications. "When Claude is waiting for me, ping my phone."'
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          A complete hook &mdash; start to finish
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Say you want a desktop notification whenever Claude is waiting on you. Put this in{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            ~/.claude/settings.json
          </code>
          :
        </p>
        <CodeBlock title="~/.claude/settings.json — macOS notification">{`{
  "hooks": {
    "Notification": [
      {
        "matcher": "permission_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\"Claude needs approval\\" with title \\"Claude Code\\"'"
          }
        ]
      }
    ]
  }
}`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Next time you walk away during a long session, your Mac pings you when Claude hits a permission prompt.{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            matcher
          </code>{' '}
          filters which subtype of notification fires the hook. Leave it empty to catch all of them.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Three hooks worth stealing
        </h2>

        <div className="space-y-6">
          <HookExample
            name="Format on save"
            why="Every edit gets formatted consistently. You never think about it."
            where=".claude/settings.json (project or global)"
            code={`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "prettier --write \\"$CLAUDE_FILE_PATH\\"" }]
      }
    ]
  }
}`}
          />

          <HookExample
            name="Block writes to migrations"
            why="Database migrations are too dangerous for autonomous edits. Make them explicit."
            where=".claude/settings.json (project)"
            code={`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "if echo \\"$CLAUDE_FILE_PATH\\" | grep -q '/migrations/'; then echo 'BLOCKED: migrations require manual edits'; exit 1; fi"
        }]
      }
    ]
  }
}`}
          />

          <HookExample
            name="Secret scanner"
            why="Catch API keys in diffs before they hit git. Every PostToolUse on Write runs a grep."
            where=".claude/settings.json (global)"
            code={`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [{
          "type": "command",
          "command": "grep -E '(sk-[a-zA-Z0-9]{20,}|AKIA[0-9A-Z]{16})' \\"$CLAUDE_FILE_PATH\\" && echo '⚠ Possible secret detected' || true"
        }]
      }
    ]
  }
}`}
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Let Claude write hooks for you
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Describing a hook to Claude works. No memorizing JSON syntax required:
        </p>
        <CodeBlock>{`> Write a hook that runs eslint on any file Claude edits.
Update my .claude/settings.json accordingly.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Claude checks your current settings, merges the new hook entry cleanly (doesn&apos;t overwrite existing
          ones), and shows you the diff for approval. The{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">/hooks</code>{' '}
          command lists everything currently configured.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          When hooks beat skills beat CLAUDE.md
        </h2>
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <TierRow
            layer="CLAUDE.md"
            nature="Advisory"
            useFor="Preferences and conventions Claude should apply — tone, style, common gotchas."
            strength="Low friction. Easy to read and edit."
            weakness="Claude can skip a rule if it gets distracted or the instruction gets buried."
          />
          <TierRow
            layer="Skills"
            nature="On-demand"
            useFor="Workflows and knowledge Claude applies when context matches the description."
            strength="Scoped, loads on relevance, doesn't bloat every session."
            weakness="Still depends on Claude matching the description correctly."
          />
          <TierRow
            layer="Hooks"
            nature="Deterministic"
            useFor="Things that must happen every time — format, audit, notify, block."
            strength="The harness runs them, not Claude. Zero exceptions."
            weakness="JSON config, harder to reason about. Bugs are silent if the shell command is wrong."
          />
        </div>
      </section>

      <Callout variant="warn" title="Hooks run with your permissions">
        Hooks are shell commands on your machine. A bad hook can delete files, leak secrets, or run slow enough to
        make every session miserable. Test hooks with a small safe command first (e.g., <code>echo hook ran</code>),
        then swap to the real command once you&apos;ve confirmed the wiring.
      </Callout>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/subagents"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Subagents &mdash; delegate with isolation &rarr;
        </Link>
      </section>
    </>
  );
}

function EventCard({ name, fires, use }: { name: string; fires: string; use: React.ReactNode }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4">
      <code className="text-[color:var(--color-primary)] font-mono font-semibold text-sm bg-[#161616] px-2 py-1 rounded inline-block mb-2">
        {name}
      </code>
      <div className="grid md:grid-cols-[90px_1fr] gap-x-4 gap-y-2 text-sm">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Fires
        </div>
        <div className="text-[#bbb] leading-relaxed">{fires}</div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Use for
        </div>
        <div className="text-[#999] leading-relaxed italic">{use}</div>
      </div>
    </div>
  );
}

function HookExample({
  name,
  why,
  where,
  code,
}: {
  name: string;
  why: string;
  where: string;
  code: string;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5">
      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white mb-1">{name}</h3>
      <p className="text-[#bbb] text-sm mb-3 leading-relaxed">{why}</p>
      <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] mb-2">
        Where: <span className="text-[#888] normal-case tracking-normal">{where}</span>
      </div>
      <CodeBlock>{code}</CodeBlock>
    </div>
  );
}

function TierRow({
  layer,
  nature,
  useFor,
  strength,
  weakness,
}: {
  layer: string;
  nature: string;
  useFor: string;
  strength: string;
  weakness: string;
}) {
  return (
    <div className="p-4 border-t border-[var(--color-border)] first:border-t-0">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <span className="font-[family-name:var(--font-display)] font-bold text-white">{layer}</span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[color:var(--tier-c)]">
          {nature}
        </span>
      </div>
      <div className="grid md:grid-cols-[90px_1fr] gap-x-4 gap-y-1 text-xs">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Use for
        </div>
        <div className="text-[#bbb] leading-relaxed">{useFor}</div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Strength
        </div>
        <div className="text-[#bbb] leading-relaxed">{strength}</div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Weakness
        </div>
        <div className="text-[#888] leading-relaxed">{weakness}</div>
      </div>
    </div>
  );
}
