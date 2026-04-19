import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { DefinitionBox } from '@/components/definition-box';

export const metadata = {
  title: 'First session',
  description: 'What actually happens the first time you run Claude Code — prompts, permissions, file references, rewind.',
};

export default function FirstSessionPage() {
  return (
    <>
      <PageHeader
        tier="A"
        title="Your first session"
        subtitle="What actually happens when you type `claude` and hit enter. The mental model you need before your second prompt."
        lastValidated="2026-04-17"
      />

      <section className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          The shift: you&apos;re not chatting, you&apos;re delegating
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          If you&apos;ve used ChatGPT, Claude.ai, or Gemini, Claude Code feels different. It&apos;s not a chat window
          where you ask questions and get back text. You describe what you want &mdash;{' '}
          <em className="text-white">&ldquo;add a health check endpoint,&rdquo;</em>{' '}
          <em className="text-white">&ldquo;find all the places we&apos;re still on the old auth flow&rdquo;</em>{' '}
          &mdash; and Claude reads your actual files, writes changes to your actual codebase, runs your actual test
          suite, and asks for your permission at the risky steps.
        </p>
        <p className="text-[#bbb] leading-relaxed">
          The mental shift: you&apos;re not a user asking a bot for help. You&apos;re a senior engineer giving
          direction to a capable teammate who will ask before doing anything destructive.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Start with a read, not a write
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          The highest-leverage first prompt on any codebase &mdash; yours or someone else&apos;s &mdash; is to have
          Claude explain what&apos;s there. It reads your files, scans dependencies, and gives you a clear summary.
          Faster than 20 minutes of clicking around.
        </p>
        <CodeBlock title="Try this first">{`> give me an overview of this project — what does it do, what's the architecture, and where are the important files?`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          For an unfamiliar codebase, this is often enough to get oriented. For your own codebase, it surfaces things
          you forgot about.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Then ask for a change
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Real work starts here. Describe what you want in plain English. Be specific &mdash; vague prompts produce
          vague results.
        </p>
        <CodeBlock title="A specific, high-quality prompt">{`> Add a /health endpoint to the backend that returns { status: "ok", time: <current ISO timestamp> }.
Use the framework already in use — don't add new dependencies. Add a test for it too.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Claude will figure out your framework (Express, FastAPI, Next.js API routes, whatever), find the right
          file, write the code, and ask for your permission before actually changing anything.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          The permission moment
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Before Claude edits a file or runs a command, you see a prompt like this:
        </p>
        <CodeBlock title="Permission prompt">{`Claude wants to edit src/app/api/health/route.ts

  export async function GET() {
+   return Response.json({
+     status: 'ok',
+     time: new Date().toISOString()
+   })
+ }

Allow? (y/n/e to edit, a to always allow)`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          Read the diff. Hit <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">y</code>{' '}
          to accept,{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">n</code> to
          reject,{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">e</code> to
          open it in your editor and tweak before accepting. You have full control at every step.
        </p>
        <Callout variant="info" title="Later, you can loosen this">
          As you build trust with Claude, you can let it run unattended for routine work. See the{' '}
          <Link className="text-[color:var(--color-primary)] hover:underline" href="/permissions">
            Permissions page
          </Link>{' '}
          for the full safety ladder. For now, default (asks every time) is the right place to start.
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          The <code className="text-[color:var(--color-primary)] bg-[#161616] px-2 py-0.5 rounded">@file</code> shortcut
        </h2>
        <DefinitionBox
          term="@file references"
          whatItIs="A shortcut you type inside a prompt to point Claude at a specific file. Instead of describing where code lives, you reference it directly."
          whyItMatters="Claude reads the exact file before responding. Way better than describing your config from memory — that's how you end up with a suggestion that contradicts what's actually on disk."
          example={
            <>
              <code>Explain the logic in @src/utils/auth.ts</code> &mdash; Claude reads the file and explains. Try{' '}
              <code>@src/components/</code> for a directory listing.
            </>
          }
        />
        <CodeBlock title="Point at multiple files in one prompt">{`> compare @src/auth/old.ts with @src/auth/new.ts. What behavior changed?`}</CodeBlock>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Paste screenshots directly
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          Hit <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">Ctrl+V</code>{' '}
          (even on macOS &mdash; <em>not</em> Cmd+V) to paste an image from your clipboard. Drag-and-drop works in the
          desktop app. Images are a cheat code for UI work, error screenshots, and design reviews.
        </p>
        <CodeBlock title="Paste a mockup, ask for code">{`> [pastes image of a dashboard mockup]
Build this as a React component using our existing Tailwind theme. Match the layout as closely as you can.`}</CodeBlock>
        <p className="text-[#bbb] leading-relaxed">
          For consulting work: paste a PowerPoint screenshot and ask Claude to critique it, or a chart from a data
          source and ask it to explain the pattern.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          When Claude goes off the rails
        </h2>
        <p className="text-[#bbb] leading-relaxed">Four escape hatches, in order of how much you want to rewind:</p>

        <div className="grid gap-3 mt-4">
          <div className="glass-card rounded-[var(--radius-md)] p-4">
            <div className="flex items-start gap-4">
              <code className="shrink-0 text-[color:var(--color-primary)] bg-[#161616] px-2 py-0.5 rounded text-xs font-mono">
                Esc
              </code>
              <div>
                <div className="text-white font-semibold text-sm">Stop what it&apos;s doing</div>
                <div className="text-[#888] text-sm mt-1">
                  Claude was typing a wall of text you don&apos;t need. Hit Esc. It stops, context is preserved, you
                  redirect.
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[var(--radius-md)] p-4">
            <div className="flex items-start gap-4">
              <code className="shrink-0 text-[color:var(--color-primary)] bg-[#161616] px-2 py-0.5 rounded text-xs font-mono">
                Undo that
              </code>
              <div>
                <div className="text-white font-semibold text-sm">Ask it to revert</div>
                <div className="text-[#888] text-sm mt-1">
                  Natural language. &ldquo;Undo your last change&rdquo; works. Claude remembers what it did.
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[var(--radius-md)] p-4">
            <div className="flex items-start gap-4">
              <code className="shrink-0 text-[color:var(--color-primary)] bg-[#161616] px-2 py-0.5 rounded text-xs font-mono">
                /rewind
              </code>
              <div>
                <div className="text-white font-semibold text-sm">Time-travel to a checkpoint</div>
                <div className="text-[#888] text-sm mt-1">
                  Or double-tap Esc. Opens a menu showing every action Claude took. Pick a point and restore
                  conversation, code, or both. Checkpoints survive even if you close the terminal.
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[var(--radius-md)] p-4">
            <div className="flex items-start gap-4">
              <code className="shrink-0 text-[color:var(--color-primary)] bg-[#161616] px-2 py-0.5 rounded text-xs font-mono">
                /clear
              </code>
              <div>
                <div className="text-white font-semibold text-sm">Wipe context and start fresh</div>
                <div className="text-[#888] text-sm mt-1">
                  Nuclear option. Use between unrelated tasks, or when the session has picked up 50 failed attempts
                  you don&apos;t want it to remember.
                </div>
              </div>
            </div>
          </div>
        </div>

        <Callout variant="warn" title="Claude Code's own rule of thumb">
          Anthropic&apos;s docs are explicit: <em>&ldquo;If you&apos;ve corrected Claude more than twice on the same
          issue in one session, the context is cluttered with failed approaches. Run /clear and start fresh with a
          more specific prompt that incorporates what you learned.&rdquo;</em>
        </Callout>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em] text-white">
          Plan mode &mdash; the third gear
        </h2>
        <p className="text-[#bbb] leading-relaxed">
          For changes that touch multiple files, don&apos;t let Claude jump to writing code. Hit{' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">
            Shift+Tab
          </code>{' '}
          once to enter{' '}
          <em>plan mode</em>
          . Claude reads the code and drafts a plan without changing anything. You review the plan, edit it if
          needed ({' '}
          <code className="text-[color:var(--color-primary)] bg-[#161616] px-1.5 py-0.5 rounded text-xs">Ctrl+G</code>{' '}
          opens the plan in your editor), then hit accept when it looks right.
        </p>
        <Callout variant="tip" title="When plan mode pays off">
          Any change that touches more than 2&ndash;3 files. If you can describe the diff in one sentence, skip
          planning. If you can&apos;t, plan first &mdash; it catches bad assumptions before they turn into 45 minutes
          of cleanup.
        </Callout>
      </section>

      <section className="mt-14 pt-8 border-t border-[var(--color-border)]">
        <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-2">
          Next
        </div>
        <Link
          href="/permissions"
          className="font-[family-name:var(--font-display)] font-bold text-lg text-white hover:text-[color:var(--color-primary)] transition-colors"
        >
          The permission model &rarr;
        </Link>
      </section>
    </>
  );
}
