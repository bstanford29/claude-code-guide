import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'Skills',
  description: 'Reusable workflows packaged as SKILL.md files. Teach Claude to follow your rituals.',
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        tier="C"
        title="Skills"
        subtitle="Reusable workflows Claude applies automatically when relevant. The way you bottle your rituals into muscle memory for the tool."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <DefinitionBox
          term="a Claude Code skill"
          whatItIs="A folder with a SKILL.md file that describes a workflow or domain knowledge. Claude reads the frontmatter (name + description) of all installed skills at session start, then loads the full body on demand when the situation matches."
          whyItMatters={
            "CLAUDE.md is loaded every session — so it has to stay lean. Skills are the escape valve: specialized knowledge or workflows that only apply sometimes live here, costing you zero context until they're relevant."
          }
          example={
            <>
              A skill called <code>weekly-status</code> might contain the exact prompt + formatting that builds
              your Monday status update from Obsidian notes. Typing <code>/weekly-status</code> runs it.
            </>
          }
        />
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Anatomy of a skill
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Skills live in{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            .claude/skills/&lt;name&gt;/SKILL.md
          </code>
          . The file has a YAML frontmatter block (metadata Claude reads upfront) and a markdown body (the actual
          instructions loaded on demand).
        </p>
        <CodeBlock title=".claude/skills/api-conventions/SKILL.md">{`---
name: api-conventions
description: REST API design conventions for our services
---

# API Conventions

- Use kebab-case for URL paths
- Use camelCase for JSON properties
- Always include pagination for list endpoints
- Version APIs in the URL path (/v1/, /v2/)
- Standard error shape: { error: { code, message, details? } }`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          With that file in your project, any time Claude works on an endpoint, it applies these rules automatically
          &mdash; because the frontmatter{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            description
          </code>{' '}
          tells it when to pull the skill in.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Two kinds of skills
        </h2>

        <div className="space-y-4">
          <SkillKind
            name="Knowledge skill"
            color="var(--color-primary)"
            use="Capture domain knowledge Claude should apply automatically when relevant."
            example={
              "A skill named 'figma-conventions' with the project's design tokens, naming rules, and component patterns. Claude reads it automatically when working on UI."
            }
            invoke="Automatic — Claude matches by description"
          />
          <SkillKind
            name="Workflow skill"
            color="var(--tier-c)"
            use="Capture a repeatable ritual with specific steps Claude runs end-to-end."
            example={
              "A skill named 'fix-issue' that reads a GitHub issue, reproduces it, writes a fix, writes a test, opens a PR."
            }
            invoke={
              <>
                Manual &mdash; you type <code>/fix-issue 1234</code>. Set{' '}
                <code>disable-model-invocation: true</code> in frontmatter to force manual-only.
              </>
            }
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Worked example &mdash; a weekly-status skill
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          You do the same thing every Monday: read your Obsidian daily notes from the past week, extract what you
          actually shipped, group by project, write it in a specific format for your manager. Bottle it.
        </p>
        <CodeBlock title=".claude/skills/weekly-status/SKILL.md">{`---
name: weekly-status
description: Generate a weekly status update from my Obsidian daily notes
disable-model-invocation: true
---

Pull the last 7 days of daily notes from @~/Obsidian/Daily/.

Extract:
1. What I shipped (anything marked with [x] or tagged #shipped)
2. Decisions made (anything in a "Decisions" section)
3. Blockers or open questions (anything tagged #blocker or #open)

Output format:

## Week of YYYY-MM-DD

### Shipped
- Bullet per item, with project prefix: [Project] the thing

### Decisions
- Bullet per decision, one-line rationale

### Open / blockers
- Bullet per item

Write it to @~/Obsidian/Status/YYYY-MM-DD-weekly.md.
Keep to half a page.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Now every Monday:{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            /weekly-status
          </code>
          . Claude reads your notes, builds the report, saves it. What used to be a 30-minute ritual becomes a 30-
          second prompt.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Frontmatter options
        </h2>
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <FrontmatterRow
            key_={'name'}
            kind="required"
            what={<>The skill name. Becomes the slash command if manually invoked (<code>/name</code>).</>}
          />
          <FrontmatterRow
            key_={'description'}
            kind="required"
            what="One-sentence description of when this skill applies. Claude matches prompts against this to decide when to load the full skill."
          />
          <FrontmatterRow
            key_={'disable-model-invocation'}
            kind="optional"
            what="If true, skill only runs when you type /name. Prevents Claude from triggering it automatically. Use for skills with side effects (email send, commits, API calls)."
          />
          <FrontmatterRow
            key_={'allowed-tools'}
            kind="optional"
            what={
              <>
                List of tools the skill can use. Default is all. Example:{' '}
                <code>allowed-tools: [Read, Grep, Bash]</code>.
              </>
            }
          />
        </div>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          When to build a skill
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Every skill is a maintenance burden &mdash; it has to stay accurate as things change around it. So the bar
          is:
        </p>
        <div className="grid gap-3 mt-4">
          <Habit
            num="1"
            title="You've done it at least 3 times"
            body="Twice might be a coincidence. Three times is a pattern. Skills are for patterns."
          />
          <Habit
            num="2"
            title="The exact steps matter"
            body="If you've noticed yourself retyping the same instructions with slight variations, the variation is the skill. Write it once, stop forgetting steps."
          />
          <Habit
            num="3"
            title="Someone else could use it too"
            body="Skills checked into git become team rituals. 'Our way of doing X' instead of 'the way each person does X.' Leverage compounds."
          />
        </div>
        <Callout variant="warn" title="Don't build a skill for">
          One-off tasks, things that change every time you do them, or anything where the prompt is the reflection
          itself (&ldquo;what should I work on today?&rdquo;). Skills are for automation; thinking is for humans.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Skills vs. slash commands vs. subagents
        </h2>
        <p className="text-[#bbb] leading-relaxed">Same family, different jobs:</p>
        <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden">
          <TriCompare
            name="Slash command"
            path=".claude/commands/*.md"
            does="A named prompt you invoke manually. Simple, no frontmatter, no auto-invocation."
            pick="When you want a shortcut to an exact prompt."
          />
          <TriCompare
            name="Skill"
            path=".claude/skills/*/SKILL.md"
            does="Domain knowledge or workflow with frontmatter. Auto-loads when relevant (unless disabled)."
            pick="When Claude should apply the rules without being asked."
          />
          <TriCompare
            name="Subagent"
            path=".claude/agents/*.md"
            does="A specialized assistant that runs in its own context window with its own allowed tools."
            pick="When you want to delegate work with isolation — code review, long research, dangerous operations."
          />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/hooks"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Hooks &mdash; deterministic automation &rarr;
        </Link>
      </section>
    </>
  );
}

function SkillKind({
  name,
  color,
  use,
  example,
  invoke,
}: {
  name: string;
  color: string;
  use: string;
  example: string;
  invoke: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5 border-l-4" style={{ borderLeftColor: color }}>
      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white mb-3">{name}</h3>
      <div className="grid md:grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-sm">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Use for
        </div>
        <div className="text-[#bbb] leading-relaxed">{use}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Example
        </div>
        <div className="text-[#999] leading-relaxed italic">{example}</div>

        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Invocation
        </div>
        <div className="text-[#bbb] leading-relaxed">{invoke}</div>
      </div>
    </div>
  );
}

function FrontmatterRow({ key_, kind, what }: { key_: string; kind: string; what: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[200px_80px_1fr] gap-x-4 p-4 border-t border-[var(--color-border)] first:border-t-0">
      <code className="text-[color:var(--color-primary)] font-mono text-xs self-start">{key_}</code>
      <span
        className={`font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider font-semibold self-start ${
          kind === 'required' ? 'text-amber-400' : 'text-[#666]'
        }`}
      >
        {kind}
      </span>
      <div className="text-[#bbb] text-sm leading-relaxed">{what}</div>
    </div>
  );
}

function TriCompare({ name, path, does, pick }: { name: string; path: string; does: string; pick: string }) {
  return (
    <div className="p-4 border-t border-[var(--color-border)] first:border-t-0">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <span className="font-[family-name:var(--font-display)] font-bold text-white">{name}</span>
        <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-[11px] font-mono">
          {path}
        </code>
      </div>
      <div className="grid md:grid-cols-[110px_1fr] gap-x-4 gap-y-1 text-sm">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Does
        </div>
        <div className="text-[#bbb] leading-relaxed">{does}</div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] pt-1">
          Pick when
        </div>
        <div className="text-[#bbb] leading-relaxed">{pick}</div>
      </div>
    </div>
  );
}

function Habit({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-md)] p-4 flex items-start gap-4">
      <span className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-[color:var(--tier-c)]/70 w-6 shrink-0">
        {num}
      </span>
      <div>
        <div className="font-[family-name:var(--font-body)] font-semibold text-white mb-1">{title}</div>
        <p className="text-[#bbb] text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
