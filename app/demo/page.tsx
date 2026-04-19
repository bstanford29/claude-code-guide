import { PageHeader } from '@/components/page-header';
import { Callout } from '@/components/callout';
import { DemoStep } from '@/components/demo-step';
import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Live demo',
  description: 'A 30-minute session screenplay for introducing Claude Code to colleagues. Timed, copy-pasteable, branched.',
};

export default function DemoPage() {
  return (
    <>
      <PageHeader
        tier="ref"
        title="Live demo — 30-minute walkthrough"
        subtitle="The screenplay. Read along, paste each prompt as the colleagues watch. Includes 'if they ask X' branches for the curious ones."
        lastValidated="2026-04-17"
      />

      <section>
        <Callout variant="warn" title="Before the session">
          <ol className="mt-2 space-y-1 pl-5 list-decimal">
            <li>
              Have a non-production project open in your terminal. A scratch repo or a personal side project works
              best &mdash; something real but low-stakes.
            </li>
            <li>
              Close Slack, Linear, Email. Session will show your screen. You don&apos;t want a DM popup mid-demo.
            </li>
            <li>
              Run <code>claude</code> once in the morning to make sure auth is fresh.
            </li>
            <li>Run through steps 3 and 6 yourself before the live session — they&apos;re the most likely to surprise.</li>
          </ol>
        </Callout>
      </section>

      <section className="mt-10 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          The arc (30 min total)
        </h2>
        <div className="glass-card rounded-[var(--radius-lg)] p-5">
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] w-16 shrink-0 pt-0.5">
                0&ndash;3 min
              </span>
              <span className="text-[#bbb]">Framing — what this is, what it&apos;s not</span>
            </li>
            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] w-16 shrink-0 pt-0.5">
                3&ndash;7 min
              </span>
              <span className="text-[#bbb]">Install + first session (if they&apos;re going to play along)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] w-16 shrink-0 pt-0.5">
                7&ndash;15 min
              </span>
              <span className="text-[#bbb]">First real prompt &mdash; read codebase, ask for a change, permission diff</span>
            </li>
            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] w-16 shrink-0 pt-0.5">
                15&ndash;20 min
              </span>
              <span className="text-[#bbb]">CLAUDE.md walkthrough — why this is the unlock</span>
            </li>
            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] w-16 shrink-0 pt-0.5">
                20&ndash;25 min
              </span>
              <span className="text-[#bbb]">A consulting use case (deck critique, research synthesis, or meeting notes)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#555] w-16 shrink-0 pt-0.5">
                25&ndash;30 min
              </span>
              <span className="text-[#bbb]">Q&amp;A + send them the guide URL</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section className="mt-10">
        <DemoStep
          step={1}
          timing="0:00 — 3:00 · Framing"
          title="What this is, what it's not"
          expected={
            <>
              Say this first, clearly. Gets ahead of expectations and saves 10 minutes of confusion later:
              <br />
              <br />
              <em>
                &ldquo;Claude Code isn&apos;t ChatGPT-in-a-window. It&apos;s an AI that lives in your terminal (or
                now on your desktop) and can actually do things &mdash; read your files, write code, run commands,
                commit to git. It asks permission at the risky steps. You tell it what you want in plain English, it
                figures out how. Today I&apos;ll show you five minutes of that.&rdquo;
              </em>
            </>
          }
          branch={
            <>
              <strong>&ldquo;Is this the same as Copilot?&rdquo;</strong> &mdash; No. Copilot auto-completes
              individual lines inside your editor. Claude Code operates at the <em>task</em> level &mdash; you
              describe a feature, it handles the whole multi-file change, asks permission, commits. Different tool,
              different gear.
            </>
          }
        />

        <DemoStep
          step={2}
          timing="3:00 — 7:00 · Setup (optional, if they'll play along)"
          title="Install and launch"
          prompt={`# In a colleague's terminal, if they want to follow along:
npm install -g @anthropic-ai/claude-code
cd ~/any-project
claude`}
          expected={
            <>
              Usually most colleagues just watch the first time. If one wants to install during the demo, walk them
              through. If not, skip this step and show on your screen.
            </>
          }
          branch={
            <>
              <strong>&ldquo;Do I need Pro or Max?&rdquo;</strong> &mdash; Start on Pro ($20/mo). Upgrade to Max
              when you hit your first cap on real work.
            </>
          }
        />

        <DemoStep
          step={3}
          timing="7:00 — 10:00 · First prompt — exploration"
          title="Have Claude explain your codebase"
          prompt={`> give me an overview of this project — what does it do, what's the architecture, and where are the important files?`}
          expected={
            <>
              Claude reads the package.json or requirements.txt, scans the directory, summarizes in ~20 seconds.
              This is the &ldquo;holy crap&rdquo; moment for most colleagues &mdash; they&apos;ve spent hours doing
              this manually when joining new projects.
              <br />
              <br />
              Say out loud: <em>&ldquo;Notice it didn&apos;t just guess &mdash; it actually read the files and told
              me what&apos;s there. Now watch what happens when I ask for a change.&rdquo;</em>
            </>
          }
        />

        <DemoStep
          step={4}
          timing="10:00 — 15:00 · First real change"
          title="Ask for a small feature, show the permission moment"
          prompt={`> Add a /health endpoint that returns { status: "ok", time: current ISO timestamp }.
Use the framework already in use — don't add new dependencies.`}
          expected={
            <>
              Claude identifies the framework, finds the right file, drafts the code, then shows a permission
              prompt with the diff.
              <br />
              <br />
              <strong className="text-white">Stop on this moment.</strong> Say:{' '}
              <em>
                &ldquo;This is the permission model. It&apos;s asking me whether to make this change. I read the
                diff, I approve it, it lands. For risky stuff, this saves you from the AI-goes-off-the-rails problem.
                As you build trust, you can loosen this.&rdquo;
              </em>{' '}
              Approve it live.
            </>
          }
          branch={
            <>
              <strong>&ldquo;Can I trust it with production code?&rdquo;</strong> &mdash; Yes, because it asks. The
              permission model is the insurance policy. Also: start in a branch, use git worktrees for risky
              experiments, never work straight on main.
            </>
          }
        />

        <DemoStep
          step={5}
          timing="15:00 — 20:00 · Why CLAUDE.md is the unlock"
          title="Show your CLAUDE.md — explain why it matters"
          expected={
            <>
              Open your CLAUDE.md (or the one from this guide&apos;s <code>/claude-md</code> page). Walk through
              2&ndash;3 sections. Make one point:
              <br />
              <br />
              <em>
                &ldquo;Every session I open, Claude reads this first. It already knows my stack, my conventions, my
                rules. Without this file, every session starts from zero. With it, Claude is already tuned for my
                work before I type anything.&rdquo;
              </em>
              <br />
              <br />
              Show the &ldquo;Working Agreements&rdquo; block as the example. Explain what each line prevents.
            </>
          }
          branch={
            <>
              <strong>&ldquo;Can I share CLAUDE.md with my team?&rdquo;</strong> &mdash; Yes. Check it into git.
              Everyone on the team benefits from the same conventions. That&apos;s how consulting firms turn one
              person&apos;s &ldquo;good prompting&rdquo; into team-wide leverage.
            </>
          }
        />

        <DemoStep
          step={6}
          timing="20:00 — 25:00 · A consulting use case"
          title="Live demo: deck critique OR research synthesis"
          prompt={`> Read @deck.pptx. For each slide, tell me:
- Does it pass the "so what?" test?
- Is the headline a claim or a topic? (claims are better)
- Are the charts doing the work, or is the text carrying them?
- Any slide I should kill outright?

Output as a numbered list by slide. Flag the 3 slides most in need of rework and explain why.`}
          expected={
            <>
              Have a sample deck ready. Paste the prompt, let Claude go. In 20&ndash;30 seconds you get back a
              slide-by-slide critique that applies classic consulting-deck heuristics. Say:
              <br />
              <br />
              <em>
                &ldquo;This is 15 minutes of work. You can do this to any deck before you send it upward. You can
                do it to your own drafts. You can paste a screenshot of a chart and ask whether it passes the
                headline test.&rdquo;
              </em>
            </>
          }
          branch={
            <>
              <strong>&ldquo;What if I don&apos;t have a deck handy?&rdquo;</strong> &mdash; Fall back to one of the
              other Day 1 wins. Research synthesis works great with a folder of screenshots; meeting notes →
              actions works with any Zoom transcript.
            </>
          }
        />

        <DemoStep
          step={7}
          timing="25:00 — 30:00 · Close"
          title="Q&A + hand off the guide URL"
          expected={
            <>
              Three bullets to close with, said out loud:
              <br />
              <br />
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <em>
                    &ldquo;Start on Pro for a week. Try three prompts from the <code>/day-1-wins</code> page. See if
                    you like it.&rdquo;
                  </em>
                </li>
                <li>
                  <em>
                    &ldquo;Write a CLAUDE.md for your main project before you do anything else. 15 minutes. Biggest
                    leverage move you&apos;ll make.&rdquo;
                  </em>
                </li>
                <li>
                  <em>
                    &ldquo;Here&apos;s the full guide. Tier A pages are for this week. B is for when you&apos;re
                    hooked. C is if you want to build your own processes.&rdquo;
                  </em>
                </li>
              </ol>
              <br />
              Send them the URL. Open for questions.
            </>
          }
        />
      </section>

      <section className="mt-14 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          Fallback: the 5-minute version
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          If you only have 5 minutes, do Steps 1, 3, and 4 back-to-back. Framing → overview prompt → permission
          moment. That&apos;s the core of what makes Claude Code different, and it&apos;s what most colleagues
          remember.
        </p>
      </section>

      <section className="mt-14 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl tracking-[-0.02em] text-white">
          One prompt they&apos;ll definitely ask for
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Save this for when someone asks &ldquo;show me something wild.&rdquo; It usually gets a laugh and
          reliably demos the subagent + parallel-work pattern:
        </p>
        <CodeBlock>{`> Use three subagents in parallel:
1. Investigate our auth flow — report file:line references
2. Audit our database schema for missing indexes
3. Scan our dependencies for anything unmaintained (last commit >1yr)

Each should return a one-page summary. Then synthesize into a
single "tech debt snapshot" doc.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Claude spins up 3 sessions, they run in parallel, each reports back. 5 minutes of Claude work replacing an
          afternoon of manual audit. Pairs well with <em>&ldquo;this is the Tier C stuff &mdash; come back when
          you&apos;re here.&rdquo;</em>
        </p>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Maintenance note
        </div>
        <p className="text-[#bbb] text-sm leading-relaxed">
          This page is tied to specific feature behaviors that drift over time. Re-run Steps 3, 4, and 6 the day
          before any session you&apos;re using this for. If the &ldquo;last validated&rdquo; badge above is older
          than 30 days, fix it before the session &mdash; not during.
        </p>
      </section>
    </>
  );
}
