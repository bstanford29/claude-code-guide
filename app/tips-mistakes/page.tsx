import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { TipCard } from '@/components/tip-card';
import { MistakeCard } from '@/components/mistake-card';

export const metadata = {
  title: 'Tips & mistakes',
  description: 'Consolidated best practices and common failure modes — the stuff you want to know before your second week.',
};

export default function TipsMistakesPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="Tips &amp; common mistakes"
        subtitle="Shortcuts that took us months to learn, and the mistakes worth never making. Skim this one after you've had a week with Claude Code."
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Tips from heavy use
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Things that compound. Try each one &mdash; within a week you&apos;ll have picked the handful that matter
          for <em>your</em> workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <TipCard title="CLAUDE.md is your highest-leverage file">
            Spend 15 minutes writing a good CLAUDE.md with your stack, conventions, and non-obvious rules. It pays
            for itself within the first hour. Update it the moment Claude gets something wrong that a rule would
            have prevented.
          </TipCard>
          <TipCard title="Let Claude read before you ask it to write">
            Instead of describing your code, tell Claude to read it first. &ldquo;Read @src/auth/ and then add rate
            limiting&rdquo; produces much better results than describing your setup from memory.
          </TipCard>
          <TipCard title="Be specific about what you want">
            &ldquo;Make the homepage better&rdquo; gives mediocre results. &ldquo;Add a hero section with a headline,
            subtitle, and CTA button using the existing teal color scheme&rdquo; gives exactly what you want.
          </TipCard>
          <TipCard title="Use /clear between unrelated tasks">
            Long sessions with mixed topics slow Claude down and confuse it. Treat sessions like scratch paper
            &mdash; cheap to spin up, worth throwing away.
          </TipCard>
          <TipCard title="Start with a plan for big changes">
            For anything touching more than 2&ndash;3 files, enter plan mode (Shift+Tab) first. Review the plan,
            then let it execute. Catches bad assumptions while they&apos;re still cheap to fix.
          </TipCard>
          <TipCard title="Delegate investigation to subagents">
            Reading 30 files to understand how auth works? Send a subagent. Main session stays lean, subagent
            reports back with a summary.
          </TipCard>
          <TipCard title="Paste screenshots, don't describe UI">
            A screenshot of a mockup + &ldquo;build this&rdquo; beats 300 words describing the layout. Visual
            inputs go through Claude&apos;s eyes directly.
          </TipCard>
          <TipCard title="Check its work — trust but verify">
            Claude Code is remarkably capable, but it can make mistakes. Review diffs before accepting. Run your
            tests after changes. Build a habit of verification &mdash; it&apos;s cheap and catches 95% of issues.
          </TipCard>
          <TipCard title="Save repeated prompts as slash commands">
            If you&apos;ve typed a similar prompt three times, turn it into a custom command in{' '}
            <code>.claude/commands/</code>. Costs 30 seconds once, saves 30 seconds every future time.
          </TipCard>
          <TipCard title="Leave &quot;last validated&quot; timestamps on feature pages">
            Claude Code evolves fast. If your internal docs cite specific features, stamp them with dates. In 3
            months you&apos;ll know what needs re-verifying.
          </TipCard>
        </div>
      </section>

      <section className="mt-14 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Common mistakes
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          What first-time users get wrong. Most are fixable in seconds once you know they&apos;re the problem.
        </p>
        <div className="space-y-3 mt-6">
          <MistakeCard
            dont="Running Claude Code from your home directory with no project context"
            doThis="Always cd into your project first. Claude needs files to read to be useful."
          />
          <MistakeCard
            dont="Accepting every change without reading the diff"
            doThis="Review each file edit. 10 seconds of skimming catches mistakes before they compound."
          />
          <MistakeCard
            dont="Writing a novel-length prompt trying to explain everything at once"
            doThis="Break big tasks into smaller steps. One clear instruction per message produces better results."
          />
          <MistakeCard
            dont="Ignoring CLAUDE.md and re-explaining your stack every session"
            doThis="Write it once. Claude reads it automatically at the start of every session."
          />
          <MistakeCard
            dont="Expecting Claude to know project state without reading files"
            doThis="Point it at the relevant files with @path. 'Read @src/config.ts and then update the database URL' beats describing config from memory."
          />
          <MistakeCard
            dont="Using Claude Code for simple tasks a terminal command handles faster"
            doThis="Know when to just type the command. Claude Code shines on complex, multi-step work, not 'ls'."
          />
          <MistakeCard
            dont="Correcting the same thing five times in one session"
            doThis="After two failed corrections, /clear and start fresh with a better prompt that incorporates what you learned. Pollution compounds."
          />
          <MistakeCard
            dont="Letting CLAUDE.md grow to 500 lines"
            doThis="Split specialist content into .claude/docs/ and reference it with a conditional-context table. Long CLAUDE.md files get ignored."
          />
          <MistakeCard
            dont="Trusting /rewind like it's git"
            doThis="Checkpoints track what Claude did, not the whole working tree. Before irreversible work — commit."
          />
          <MistakeCard
            dont="Forgetting to restart after adding an MCP server"
            doThis="MCP servers load at session start. `claude mcp add ...` then exit and relaunch — otherwise you'll wonder why the new tools aren't showing up."
          />
          <MistakeCard
            dont="Loosening permissions for one task and forgetting to tighten"
            doThis="A quick /permissions between task shifts takes 3 seconds. Auto mode on migration work is how bad days start."
          />
          <MistakeCard
            dont="Using outdated thinking keywords (think, think hard, think harder)"
            doThis={"On current models those are just prose. Use /effort for session depth, or 'ultrathink' as a one-turn nudge."}
          />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/demo"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          The live demo script &rarr;
        </Link>
      </section>
    </>
  );
}
