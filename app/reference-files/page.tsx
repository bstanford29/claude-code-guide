import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Reference files',
  description:
    '.claude/rules/, .claude/docs/, memory topics — how to split CLAUDE.md once it gets long.',
};

export default function ReferenceFilesPage() {
  return (
    <>
      <PageHeader
        tier="B"
        title="Reference files"
        subtitle="The layer above CLAUDE.md. Specialist content that loads on demand instead of bloating every session."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <p className="text-[#bbb] leading-relaxed">
          CLAUDE.md works great until it gets long. The first 100 lines compound in value; lines 200&ndash;500 start
          getting ignored by Claude because there&apos;s too much to pay attention to. The fix is to split specialist
          content into reference files and load them <em>only when needed</em>.
        </p>
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The three reference folders
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          There&apos;s no enforced convention &mdash; you can organize however you want. This is the pattern I
          settled on after a year of use:
        </p>

        <div className="space-y-4 mt-6">
          <Folder
            path=".claude/rules/"
            loads="Automatically on every session (via CLAUDE.md glob)"
            holds="Rules that apply across every project. Standards, tone, tech choices, security defaults."
            example='`.claude/rules/planning.md`, `.claude/rules/security.md`, `.claude/rules/standards.md`'
          />
          <Folder
            path=".claude/docs/"
            loads="On demand, when work touches that domain"
            holds="Deeper documentation for specific subsystems. Not loaded until Claude decides it's relevant."
            example='`.claude/docs/mcp-server-pattern.md`, `.claude/docs/agent-teams.md`, `.claude/docs/supabase-migrations.md`'
          />
          <Folder
            path="memory/ (or ~/.claude/projects/<id>/memory/)"
            loads="Index loads every session; topic files load on demand"
            holds="Personal, evolving knowledge. User preferences, project context, lessons learned."
            example='`memory/MEMORY.md` (index), `memory/project_prism.md`, `memory/feedback_presentation_style.md`'
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The conditional-context table
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The magic trick: CLAUDE.md keeps a table at the bottom that says &ldquo;when you are doing X, read Y.&rdquo;
          Claude reads the pointer on every session (cheap), then reads the full doc only when the topic comes up
          (paid on demand, not upfront).
        </p>
        <CodeBlock title="Bottom of CLAUDE.md">{`## Conditional Context

| When you are... | Read first |
|---|---|
| Designing new systems or features | \`.claude/docs/ai-native-design.md\` |
| Working across projects | \`.claude/docs/cross-project-map.md\` |
| Creating a new project | \`.claude/docs/tech-stack-matrix.md\` |
| Building an MCP server | \`.claude/docs/mcp-server-pattern.md\` |
| Using agent teams / \`/swarm\` | \`.claude/docs/agent-teams.md\` |
| Calling Anthropic API | memory topic \`anthropic-api.md\` |
| Handling file edit conflicts | \`.claude/docs/workflow-ops.md\` |`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          This is the single biggest trick for keeping Claude sharp across a growing workspace. Specialist
          content stays specialist; only the pointer lives in the always-loaded context.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Rules vs. docs vs. memory &mdash; when to use which
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The three folders sound similar but serve different jobs. Here&apos;s how to decide where something
          belongs:
        </p>

        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden mt-4">
          <div className="grid grid-cols-[140px_1fr] gap-x-4 p-4 bg-[#161616] border-b border-[var(--color-border)]">
            <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#888]">
              If it&apos;s...
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#888]">
              Put it in...
            </div>
          </div>
          <Row
            left="Universal. Applies to everything you do."
            right={
              <>
                <code>.claude/rules/</code> &mdash; Claude needs it every session
              </>
            }
          />
          <Row
            left="Specialized. Only relevant for a specific kind of work."
            right={
              <>
                <code>.claude/docs/</code> &mdash; loaded on demand via conditional-context table
              </>
            }
          />
          <Row
            left="Personal. About you, your preferences, your projects."
            right={
              <>
                <code>memory/</code> &mdash; private to you, survives across workspaces
              </>
            }
          />
          <Row
            left="True for one project only."
            right={
              <>
                Project root <code>CLAUDE.md</code> &mdash; already scoped by filesystem location
              </>
            }
          />
          <Row
            left="True for you but not your team."
            right={
              <>
                <code>CLAUDE.local.md</code> &mdash; gitignored, personal overlay
              </>
            }
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          A worked example
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Say I learn that Next.js 16 has breaking changes vs. training data. That&apos;s a big deal &mdash; Claude
          will write wrong code if it trusts old patterns. Where does this belong?
        </p>

        <div className="space-y-3 mt-4">
          <Bad
            where="In CLAUDE.md"
            why="Loaded every session. But this is Next.js-only info — 80% of my sessions don't touch Next. Wastes cap."
          />
          <Bad
            where="In memory"
            why="Memory is for personal/project context, not framework-level facts. Also: if I change my memory system later, I'd lose this."
          />
          <Good
            where="In `.claude/docs/nextjs-16-breaking.md`, referenced from the conditional-context table under 'When working on Next.js code, read first'"
            why="Loads exactly when relevant. Scales — add more entries as I learn more Next-specific gotchas."
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          When in doubt: start in CLAUDE.md, extract later
        </h2>
        <Callout variant="tip" title="The grow-and-split rule">
          Don&apos;t build the folder tree on day one. Start with a lean CLAUDE.md, add what you need inline, and
          when a section passes ~30 lines <em>or</em> becomes domain-specific, cut it out into its own reference file
          and link it from the conditional-context table. Premature splitting is worse than late splitting.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/slash-commands"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Slash commands &mdash; the 15 worth knowing &rarr;
        </Link>
      </section>
    </>
  );
}

function Folder({ path, loads, holds, example }: { path: string; loads: string; holds: string; example: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5">
      <code className="text-[color:var(--color-primary)] font-mono font-semibold text-sm bg-[#161616] px-2 py-1 rounded inline-block mb-3">
        {path}
      </code>
      <div className="grid md:grid-cols-[100px_1fr] gap-x-4 gap-y-2 text-sm">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Loads
        </div>
        <div className="text-[#bbb] leading-relaxed">{loads}</div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Holds
        </div>
        <div className="text-[#bbb] leading-relaxed">{holds}</div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Examples
        </div>
        <div className="text-[#999] leading-relaxed font-mono text-xs">{example}</div>
      </div>
    </div>
  );
}

function Row({ left, right }: { left: string; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-x-4 p-4 border-t border-[var(--color-border)] first:border-t-0 text-sm">
      <div className="text-[#aaa] leading-relaxed">{left}</div>
      <div className="text-[#ccc] leading-relaxed">{right}</div>
    </div>
  );
}

function Bad({ where, why }: { where: string; why: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 border-l-2 border-red-500/40">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs mt-0.5">
          x
        </span>
        <div>
          <div className="text-[#aaa] text-sm mb-1">{where}</div>
          <div className="text-[#888] text-xs italic">{why}</div>
        </div>
      </div>
    </div>
  );
}

function Good({ where, why }: { where: string; why: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 border-l-2 border-emerald-500/40">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs mt-0.5">
          &#10003;
        </span>
        <div>
          <div className="text-[#ccc] text-sm mb-1">{where}</div>
          <div className="text-[#888] text-xs italic">{why}</div>
        </div>
      </div>
    </div>
  );
}
