import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'Worktrees',
  description:
    'Parallel Claude sessions on isolated copies of your code. Built-in via --worktree, custom via .worktreeinclude.',
};

export default function WorktreesPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Worktrees"
        subtitle="Parallel Claude sessions, each in its own isolated copy of your code. Ship two features at once without them stepping on each other."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <DefinitionBox
          term="a git worktree"
          whatItIs="A second working directory for the same git repository. Same history, same remotes, but a separate branch and separate files on disk. You can edit both without them colliding."
          whyItMatters="Lets you run two Claude sessions in parallel on the same project. One working on feature-A in one worktree, one working on bug-fix-B in another. No branch-switching, no stash-dance, no 'why did my changes disappear.'"
          example={
            <>
              Main repo at <code>~/proj</code>. Run <code>claude --worktree feature-auth</code> &mdash; Claude Code
              spins up a new directory at <code>~/proj/.claude/worktrees/feature-auth/</code> on a fresh branch and
              starts the session there. You keep working in <code>~/proj</code> on something else.
            </>
          }
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The built-in flag
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Claude Code ships with a <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">--worktree</code>{' '}
          flag. It creates the worktree, starts a new branch, and launches a Claude session in it &mdash; one command.
        </p>
        <CodeBlock title="Start a session in a new worktree">{`# Named worktree (creates branch 'worktree-feature-auth')
claude --worktree feature-auth

# Short flag
claude -w feature-auth

# Auto-named — Claude generates a playful name
claude --worktree`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          The worktree lives at{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            &lt;repo&gt;/.claude/worktrees/&lt;name&gt;/
          </code>
          . Branches from whatever <code>origin/HEAD</code> points at (usually main). Exit the session when done and
          Claude asks whether to keep or remove the worktree based on whether you have commits.
        </p>
        <Callout variant="tip" title="Keep your main repo tidy">
          Add <code>.claude/worktrees/</code> to your <code>.gitignore</code> so the worktree contents don&apos;t
          show up as untracked files in your main repo&apos;s status. Do this once per project.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          When to reach for a worktree
        </h2>
        <div className="grid gap-3">
          <UseCase
            title="Running two tasks in parallel"
            body='"I need to build the new settings page AND fix the auth bug — and I don&apos;t want them sharing a branch." Two worktrees, two sessions, ship both.'
          />
          <UseCase
            title="Trying a risky approach"
            body='"What if we rewrote this in X?" Spin up a worktree, let Claude go exploratory, compare against main. If it works, merge. If not, drop the worktree — your main stays clean.'
          />
          <UseCase
            title="Writer/Reviewer pattern"
            body="Writer session in one worktree, Reviewer session in another. They can&apos;t accidentally touch the same files. Particularly useful with the desktop app's built-in parallel tabs."
          />
          <UseCase
            title="Running subagents in parallel"
            body={
              <>
                Custom subagents with <code>isolation: worktree</code> in their frontmatter get their own worktree
                per invocation. Means 5 parallel security audits don&apos;t collide on the filesystem.
              </>
            }
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The <code className="text-[color:var(--color-primary)]">.worktreeinclude</code> file
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Git worktrees are fresh checkouts. They don&apos;t include gitignored files &mdash; so your{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">.env</code>{' '}
          won&apos;t be there, local config files won&apos;t be there, and the dev server won&apos;t start.
        </p>
        <p className="text-[#bbb] leading-relaxed">
          Fix: add a <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">.worktreeinclude</code>{' '}
          file at your project root. Uses <code>.gitignore</code> syntax. Claude Code copies matching files into every
          new worktree.
        </p>
        <CodeBlock title=".worktreeinclude">{`.env
.env.local
config/secrets.json
local-settings.yaml`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Only files that match a pattern <em>and</em> are gitignored get copied &mdash; tracked files stay under git
          control. Applies to{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">--worktree</code>
          , subagent worktrees, and desktop app parallel sessions.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Manual worktrees via git
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          If you want a worktree outside the default <code>.claude/worktrees/</code> path, or want to work on an
          existing branch, do it with plain git and cd in:
        </p>
        <CodeBlock>{`# Create a worktree with a new branch, outside the repo
git worktree add ../proj-feature-a -b feature-a

# Or check out an existing branch in a worktree
git worktree add ../proj-bugfix-123 bugfix-123

# Start Claude in it
cd ../proj-feature-a && claude

# Clean up when done
git worktree remove ../proj-feature-a`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Slightly more manual, but gives you control. <code>git worktree list</code> shows every worktree
          currently active for the repo.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Cleanup &mdash; what happens when you&apos;re done
        </h2>
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <CleanupRow
            scenario="No changes made"
            what="Worktree and branch removed automatically when the session ends."
          />
          <CleanupRow
            scenario="Uncommitted changes or commits exist"
            what="Claude prompts: keep or remove? Keeping preserves the directory so you can come back. Removing deletes uncommitted work."
          />
          <CleanupRow
            scenario="Session crashed or you force-quit"
            what="Orphaned subagent worktrees get swept at next startup (once past cleanupPeriodDays). Worktrees you created with --worktree are never auto-swept — delete manually if needed."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Common mistakes
        </h2>
        <div className="space-y-3">
          <Mistake
            bad="Forgetting to run npm install / pip install in the new worktree"
            good="Each worktree is a fresh checkout. Dependencies aren't copied. Run your project's setup (npm install, poetry install, etc.) once per new worktree — or add it to a .worktreeinclude-like script."
          />
          <Mistake
            bad="Expecting the worktree to see .env from your main repo"
            good="Gitignored files aren't copied. Create a .worktreeinclude listing your env files, and they'll land in every new worktree automatically."
          />
          <Mistake
            bad="Running multiple worktree dev servers on the same port"
            good="Each worktree is a separate process. If you're running dev servers, give each worktree its own port (e.g., via env var). Otherwise you'll see Next.js auto-switch to 3001, 3002..."
          />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/automation"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Automation &mdash; headless mode, Routines, scheduled tasks &rarr;
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

function CleanupRow({ scenario, what }: { scenario: string; what: string }) {
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-x-4 p-4 border-t border-[var(--color-border)] first:border-t-0">
      <div className="font-[family-name:var(--font-body)] text-sm text-white font-semibold">{scenario}</div>
      <div className="text-[#bbb] text-sm leading-relaxed">{what}</div>
    </div>
  );
}

function Mistake({ bad, good }: { bad: string; good: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-5 space-y-3">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs mt-0.5">
          x
        </span>
        <p className="text-[#888] text-sm leading-relaxed">{bad}</p>
      </div>
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs mt-0.5">
          &#10003;
        </span>
        <p className="text-[#ccc] text-sm leading-relaxed">{good}</p>
      </div>
    </div>
  );
}
