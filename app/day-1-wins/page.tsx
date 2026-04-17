import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';

export const metadata = {
  title: 'Day 1 wins',
  description:
    'Five things you can do with Claude Code on your first Monday — copy-pasteable prompts for consulting work.',
};

export default function DayOneWinsPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Five Monday-morning wins"
        subtitle="Real consulting tasks, real prompts. Copy, paste, tweak the file paths, see it work. No coding required on your end."
        lastValidated="2026-04-17"
      />

      <section className="space-y-3">
        <Callout variant="info" title="Before you start">
          Claude Code works best when you point it at a specific folder. For these examples, open a terminal,{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">cd</code>{' '}
          into the folder with the relevant files (e.g.,{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            cd ~/Documents/client-x
          </code>
          ), then type{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">claude</code>.
        </Callout>
      </section>

      {/* Win 1 — Research synthesis */}
      <Win
        num="01"
        title="Synthesize a pile of research into a point of view"
        situation="You have a folder with 15 PDFs, a few memos, and some web-clipped notes on a topic. Your deliverable is a one-pager with the key insights. Normally that's a 2-hour read-and-summarize loop."
        prompt={`> Read every file in the current folder. Give me a 1-page synthesis structured as:
1. What's the consensus view across these sources?
2. Where do they disagree, and what's the substantive argument?
3. What are the 3 things a CEO would want to know?
4. What's missing — what questions would you ask next?

Quote specific sources by filename when you make a claim.`}
        expected={
          <>
            Claude reads every file (including PDFs &mdash; it handles them natively), builds a mental model of the
            material, then delivers the one-pager. Source citations let you trace any claim back. Total time:
            typically 3&ndash;5 minutes of Claude working while you get coffee.
          </>
        }
        gotcha="For files larger than a few hundred pages each, ask Claude to summarize them individually first and save to a notes file, then synthesize from the summaries. Keeps the context window healthy."
      />

      {/* Win 2 — Deck critique */}
      <Win
        num="02"
        title="Critique a deck slide-by-slide"
        situation="You just got forwarded a deck that's going to a client Monday. It has 40 slides. You have 20 minutes to triage it. Which slides need work, which are fine, and where are the logic gaps?"
        prompt={`> Open @deck.pptx. For each slide, tell me:
- Does it pass the "so what?" test?
- Is the headline a claim or a topic? (claims are better)
- Are the charts doing the work, or is the text carrying them?
- Any slide I should kill outright?

Output as a numbered list by slide. Flag the 3 slides most in need of rework and explain why.`}
        expected={
          <>
            Claude reads the PowerPoint structure (not just screenshots &mdash; it understands the pptx format),
            applies classic consulting-deck heuristics (pyramid principle, so-what test, MECE), and returns a slide-
            by-slide audit. For dense decks, drop screenshots of specific slides into the chat for a visual critique.
          </>
        }
        gotcha={
          <>
            Claude can read <code>.pptx</code> natively but can&apos;t <em>edit</em> PowerPoint files in place. For
            edits, use it to generate a revised outline and rebuild, or pair with the{' '}
            <a
              href="https://github.com/modelcontextprotocol/servers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-primary)] hover:underline"
            >
              MS-Office MCP server
            </a>{' '}
            if your firm allows it.
          </>
        }
      />

      {/* Win 3 — Meeting → actions */}
      <Win
        num="03"
        title="Turn a meeting transcript into action items"
        situation="Zoom or Teams dumped a transcript. It's 8,000 words of people talking past each other. You need owners, due dates, and open questions by end of day."
        prompt={`> Read @meeting-transcript.txt. Extract:
1. DECISIONS — what was actually decided (not just discussed)?
2. ACTION ITEMS — owner, task, inferred due date, confidence level (high/med/low).
3. OPEN QUESTIONS — things that were raised but not resolved.
4. TENSIONS — where people disagreed. Name them and summarize each side.

For anything with low-confidence owner or date, flag it so I can chase it.`}
        expected="You get a structured recap that separates the signal (decisions, actions, questions) from the noise. The confidence flags are the magic — Claude tells you when it's guessing so you know which items need a follow-up email."
        gotcha="Transcripts with bad speaker labels ('Speaker 1', 'Speaker 2') are harder — if you have the meeting attendee list, paste that into the prompt too. Claude can often cross-reference who said what from context."
      />

      {/* Win 4 — Excel surgery */}
      <Win
        num="04"
        title="Fix a messy spreadsheet"
        situation="Someone sent you a CSV with 12,000 rows, inconsistent date formats, duplicate client IDs, and three different spellings of 'United States.' You need it clean before you can analyze."
        prompt={`> @data.csv needs cleanup. Write and run a Python script that:
1. Normalizes all dates to YYYY-MM-DD
2. Deduplicates rows by client_id (keep the most recent)
3. Standardizes the country column (US, U.S., United States → "United States")
4. Flags rows where revenue is missing or negative

Save the cleaned file as data-cleaned.csv. Print a summary of what changed.`}
        expected={
          <>
            Claude writes a Python script using pandas, runs it in your terminal, and reports the row counts before
            and after. You get <code>data-cleaned.csv</code>, a change log, and a reusable script you can run next
            week on the new drop.
          </>
        }
        gotcha="For first runs, let Claude show you the script before executing. After two or three runs on the same shape of data, allowlist Python execution so the whole thing runs unattended."
      />

      {/* Win 5 — Inbox triage */}
      <Win
        num="05"
        title="Summarize a week of email"
        situation="You were in workshops Mon–Thu. Friday morning your inbox has 180 unread threads. You need to know what actually needs you today vs. what can wait."
        prompt={`> I have an export of my inbox in @inbox.mbox (or @inbox.json). Sort it into 4 buckets:

URGENT — needs a reply or action today (meetings scheduled, deadlines, requests from leadership).
IMPORTANT — needs a reply this week but not today.
FYI — just needs to be read or skimmed. No action required.
NOISE — newsletters, notifications, automated alerts. Skip.

For URGENT and IMPORTANT, write me a one-line summary and the sender. Sort URGENT by how overdue I am.`}
        expected={
          <>
            Claude reads the export, applies the classification, and gives you a prioritized list. You triage in 5
            minutes instead of 45. Save the prompt as a custom slash command (<code>/inbox-triage</code>) and it
            becomes a Friday-morning ritual.
          </>
        }
        gotcha={
          <>
            Email clients don&apos;t always make exporting easy. For Gmail, Google Takeout gives you{' '}
            <code>.mbox</code>. For Outlook, Power Automate can ship JSON. If it&apos;s too much friction, connect
            Gmail via MCP server and Claude can pull directly (see{' '}
            <Link href="/mcp-servers" className="text-[color:var(--color-primary)] hover:underline">
              MCP servers
            </Link>
            ).
          </>
        }
      />

      {/* Pattern */}
      <section className="mt-16 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          The pattern behind all five
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          You&apos;ll notice every prompt above follows the same skeleton. It&apos;s the one we recommend until it
          becomes muscle memory:
        </p>
        <CodeBlock title="The reliable prompt pattern">{`> [Read/use this specific input — point at it with @]
Do [specific task] and return [specific output format].
For [edge case], [what to do instead].
Flag [uncertainty type] so I can [follow up].`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Specificity does all the work. &ldquo;Summarize this&rdquo; gets you a summary. &ldquo;Summarize as 5
          bullets, name the sources, flag anything you&apos;re unsure about&rdquo; gets you something you can send
          upward.
        </p>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/reference-files"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          Reference files &mdash; the layer above CLAUDE.md &rarr;
        </Link>
      </section>
    </>
  );
}

function Win({
  num,
  title,
  situation,
  prompt,
  expected,
  gotcha,
}: {
  num: string;
  title: string;
  situation: string;
  prompt: string;
  expected: React.ReactNode;
  gotcha: React.ReactNode;
}) {
  return (
    <section className="mt-12 glass-card rounded-[var(--radius-lg)] p-6 md:p-8">
      <div className="flex items-baseline gap-4 mb-4 flex-wrap">
        <span className="font-[family-name:var(--font-display)] font-extrabold text-3xl text-[color:var(--tier-a)]/70">
          {num}
        </span>
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl md:text-2xl text-white leading-tight tracking-[-0.01em] flex-1 min-w-0">
          {title}
        </h2>
      </div>

      <div className="pl-[3.5rem] space-y-5">
        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#666] mb-1">
            The situation
          </div>
          <p className="text-[#bbb] leading-relaxed text-sm">{situation}</p>
        </div>

        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[color:var(--color-primary)] mb-1">
            Copy this prompt
          </div>
          <CodeBlock>{prompt}</CodeBlock>
        </div>

        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#666] mb-1">
            What should happen
          </div>
          <div className="text-[#bbb] leading-relaxed text-sm">{expected}</div>
        </div>

        <div className="p-4 rounded-[var(--radius-md)] border-l-2 border-amber-500/40 bg-amber-500/5">
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-amber-400 mb-1">
            Gotcha
          </div>
          <div className="text-[#bbb] leading-relaxed text-sm">{gotcha}</div>
        </div>
      </div>
    </section>
  );
}
