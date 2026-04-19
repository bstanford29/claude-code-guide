import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { CompareTable } from '@/components/compare-table';

export const metadata = {
  title: 'Git & GitHub',
  description: 'Claude Code understands git. Commits, PRs, rewind, --from-pr — the practical flows.',
};

export default function GitIntegrationPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Git &amp; GitHub integration"
        subtitle="Claude commits for you. It writes PRs. It reviews diffs. Here's the practical flow — and where git ends and rewind begins."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <p className="text-[#bbb] leading-relaxed">
          Claude Code knows git natively. You describe intent; it runs the commands. The one thing to install up
          front: the{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">gh</code>{' '}
          CLI (GitHub&apos;s official tool). Without it, Claude falls back to the REST API and hits rate limits on
          unauth&apos;d requests. With it, Claude runs PR and issue commands as smoothly as file edits.
        </p>
        <CodeBlock title="Install gh once, benefit forever">{`brew install gh  # macOS
gh auth login   # one-time auth`}</CodeBlock>
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The commit flow
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The move that saves the most time: let Claude write your commit message. It reads the diff, understands
          what changed, and writes a message that reflects the <em>why</em>, not just the <em>what</em>.
        </p>
        <CodeBlock title="The essential prompt">{`> commit these changes with a descriptive message`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Claude reads the diff, drafts the message, and asks for your approval before running the commit. Better
          than the messages most humans write under deadline.
        </p>
        <Callout variant="tip" title="For multi-file changes with distinct concerns">
          Tell Claude to split into separate commits:{' '}
          <em>&ldquo;Split these changes into logical commits &mdash; one for the auth fix, one for the
          refactor.&rdquo;</em>{' '}
          Claude stages each group and commits them separately.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The pull request flow
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          PRs are one prompt away. Claude summarizes the branch, writes the description, opens the PR via{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">gh</code>.
        </p>
        <CodeBlock>{`> open a PR for this branch. Include a summary of what changed and why.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          The draft PR opens in your browser for review. Tweak the description, request reviewers, merge when
          ready. If you use a PR template, Claude fills it in correctly.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          <code className="text-[color:var(--color-primary)]">--from-pr</code> &mdash; resume a session tied to a PR
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          When Claude opens a PR, the session gets linked to the PR number. You can come back days later and pick up
          the exact conversation.
        </p>
        <CodeBlock>{`claude --from-pr 123

# Or from within an active session:
/resume   # pick from the session picker`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Useful when a reviewer asks for changes and you want the full context of what Claude did originally &mdash;
          what it considered, what it rejected, what the test cases were. Review comments often make zero sense out
          of context; this gives it back.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          <code className="text-[color:var(--color-primary)]">/rewind</code> vs. <code>git</code> &mdash; the one to get right
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          This trips everyone up once. Both involve going back in time. They are <strong className="text-white">not the
          same system</strong> and they don&apos;t know about each other.
        </p>

        <CompareTable
          leftHeader="/rewind (Claude checkpoints)"
          rightHeader="git (version control)"
          rows={[
            {
              label: 'What it tracks',
              left: "Every action Claude took in the session — edits, runs, conversation",
              right: 'Only what you explicitly commit',
            },
            {
              label: 'Who created the checkpoint',
              left: 'Automatic, every action',
              right: 'You, by running git commit',
            },
            {
              label: 'Scope',
              left: 'Your current session',
              right: 'The whole project, forever',
            },
            {
              label: 'Catches external changes',
              left: 'No — only tracks what Claude did',
              right: 'Yes — anything in the working tree',
            },
            {
              label: 'Use for',
              left: "'Undo what Claude just did'",
              right: "'Record a stable version I can come back to'",
            },
          ]}
        />

        <Callout variant="warn" title="The Anthropic docs say this explicitly">
          <em>&ldquo;Checkpoints only track changes made <strong>by Claude</strong>, not external processes. This
          isn&apos;t a replacement for git.&rdquo;</em> Translation: if you&apos;re about to do something irreversible,
          commit first. Don&apos;t rely on <code>/rewind</code>.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The three prompts that cover 90% of git work
        </h2>
        <div className="space-y-3">
          <PromptRow
            prompt="status"
            what="Natural-language version of git status. Claude reads the repo state and tells you what's going on in prose."
          />
          <PromptRow
            prompt="commit these changes with a descriptive message"
            what="Claude reads the diff, drafts the commit message, asks approval, runs it."
          />
          <PromptRow
            prompt="open a PR"
            what="Branch → summary → description → gh pr create. Browser opens with the draft."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Branch hygiene Claude will cheerfully break
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Three things to put in your CLAUDE.md so Claude respects your team&apos;s git habits:
        </p>
        <CodeBlock title="Example git rules for CLAUDE.md">{`## Git rules

- Never force push to main or any shared branch.
- Never push without running the test suite first.
- Commit messages: present tense, imperative mood ("Add X", not "Added X").
- PR titles follow Conventional Commits (feat:, fix:, docs:, refactor:, chore:).
- Branch names: kebab-case with type prefix (feat/add-search, fix/auth-redirect).`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Without these, Claude will happily use past-tense commit messages or force-push a shared branch. It&apos;s
          just doing what looks reasonable in isolation.
        </p>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/cost-plans"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Cost &amp; plans &mdash; usage hygiene &rarr;
        </Link>
      </section>
    </>
  );
}

function PromptRow({ prompt, what }: { prompt: string; what: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 flex items-start gap-4">
      <code className="shrink-0 text-[color:var(--color-primary)] bg-[#161616] px-2 py-1 rounded text-xs font-mono whitespace-pre">
        &gt; {prompt}
      </code>
      <div className="text-[#bbb] text-sm leading-relaxed">{what}</div>
    </div>
  );
}
