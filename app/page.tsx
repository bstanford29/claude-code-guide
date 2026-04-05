'use client';

import { useEffect, useState } from 'react';

/* ─── Scroll Reveal Hook ─── */
const useScrollReveal = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.reveal');

    if (prefersReduced) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

/* ─── Code Block ─── */
const CodeBlock = ({ children, title }: { children: string; title?: string }) => (
  <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] my-4">
    {title && (
      <div className="bg-[#111] px-4 py-2 border-b border-[var(--color-border)]">
        <span className="font-[family-name:var(--font-display)] text-[11px] tracking-[0.1em] uppercase text-[#555]">
          {title}
        </span>
      </div>
    )}
    <pre className="bg-[#0a0a0a] p-4 overflow-x-auto">
      <code className="font-[family-name:var(--font-mono)] text-sm text-[#ccc] leading-relaxed whitespace-pre">{children}</code>
    </pre>
  </div>
);

/* ─── Expandable Section ─── */
const Section = ({
  num,
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  num: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="reveal glass-card rounded-[var(--radius-lg)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start gap-4 group cursor-pointer"
      >
        <span className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-primary/30 group-hover:text-primary/60 transition-colors duration-200 shrink-0 w-8">
          {num}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-lg tracking-[-0.01em] group-hover:text-primary transition-colors duration-200">
            {title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text-muted)] mt-1">{subtitle}</p>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 text-[#555] shrink-0 mt-1 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pl-[4.5rem] border-t border-[#1a1a1a]">
          <div className="pt-6 font-[family-name:var(--font-body)] text-sm text-[#bbb] leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Tip Card ─── */
const TipCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="glass-card rounded-[var(--radius-lg)] p-6 relative overflow-hidden group hover:border-primary/20">
    <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
    <h4 className="font-[family-name:var(--font-display)] font-bold text-sm mb-2 pl-4">{title}</h4>
    <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text-secondary)] leading-relaxed pl-4">{children}</p>
  </div>
);

/* ─── Mistake Card ─── */
const MistakeCard = ({ dont, doThis }: { dont: string; doThis: string }) => (
  <div className="glass-card rounded-[var(--radius-lg)] p-5 space-y-3">
    <div className="flex items-start gap-3">
      <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs mt-0.5">
        x
      </span>
      <p className="font-[family-name:var(--font-body)] text-sm text-[#888] leading-relaxed">{dont}</p>
    </div>
    <div className="flex items-start gap-3">
      <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs mt-0.5">
        &#10003;
      </span>
      <p className="font-[family-name:var(--font-body)] text-sm text-[#ccc] leading-relaxed">{doThis}</p>
    </div>
  </div>
);

/* ─── Badge ─── */
const Badge = ({ label }: { label: string }) => (
  <span className="inline-block font-[family-name:var(--font-display)] text-[11px] tracking-[0.05em] text-primary/80 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
    {label}
  </span>
);

/* ─── Bullet List ─── */
const BulletList = ({ items }: { items: string[] }) => (
  <ul className="list-none space-y-2 my-4">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <span className="text-primary mt-1 shrink-0">&#8250;</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function GuidePage() {
  useScrollReveal();

  return (
    <>
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-transparent">
        <div className="max-w-[900px] mx-auto px-6 h-[56px] flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] font-bold text-xs tracking-[0.15em] text-[#666] uppercase">
            Claude Code Guide
          </span>
          <a
            href="https://brandonstanford.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-display)] text-xs text-[#555] hover:text-primary transition-colors duration-200"
          >
            by Brandon Stanford
          </a>
        </div>
      </header>

      <main className="pt-[56px] flex-1">
        {/* ── Hero ── */}
        <section className="max-w-[900px] mx-auto px-6 pt-16 pb-16 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(117,214,214,0.04)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10">
            <div className="reveal flex items-center gap-3 mb-6">
              <Badge label="Guide" />
              <Badge label="2026" />
            </div>

            <h1 className="reveal reveal-d1 font-[family-name:var(--font-display)] font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[1] tracking-[-0.04em] mb-5">
              Getting Started with<br />
              <span className="hero-text-mask">Claude Code</span>
            </h1>
            <p className="reveal reveal-d2 text-[var(--color-text-secondary)] text-base leading-relaxed max-w-[600px] font-[family-name:var(--font-body)]">
              Claude Code is an AI coding assistant that lives in your terminal. You describe what you
              want in plain English, and it reads your files, writes code, runs commands, and builds
              things for you. This guide covers everything you need to go from zero to productive.
            </p>

            <div className="reveal reveal-d3 flex flex-wrap gap-2 mt-8">
              <Badge label="Terminal-native" />
              <Badge label="Reads your codebase" />
              <Badge label="Runs commands" />
              <Badge label="Git-aware" />
            </div>
          </div>
        </section>

        {/* ── Table of Contents ── */}
        <section className="max-w-[900px] mx-auto px-6 pb-12">
          <div className="reveal glass-card rounded-[var(--radius-lg)] p-5">
            <h2 className="font-[family-name:var(--font-display)] text-[11px] tracking-[0.15em] uppercase text-[#555] mb-4">
              What&apos;s in This Guide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
              {[
                { num: '01', label: 'What is Claude Code?' },
                { num: '02', label: 'Installation' },
                { num: '03', label: 'Your First Session' },
                { num: '04', label: 'Key Concepts' },
                { num: '05', label: 'Power Features' },
                { num: '06', label: 'Tips from Heavy Use' },
                { num: '07', label: 'Common Mistakes' },
                { num: '08', label: 'Resources' },
              ].map((item) => (
                <div key={item.num} className="flex items-center gap-2 py-2 px-2 rounded-[var(--radius-sm)] hover:bg-[#161616] transition-colors duration-150">
                  <span className="font-[family-name:var(--font-display)] font-bold text-[10px] text-primary/40">{item.num}</span>
                  <span className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-secondary)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sections ── */}
        <section className="max-w-[900px] mx-auto px-6 pb-20 space-y-3">

          {/* 01 */}
          <Section num="01" title="What is Claude Code?" subtitle="The 30-second version" defaultOpen={true}>
            <p>
              Claude Code is Anthropic&apos;s official command-line tool for working with Claude directly
              in your terminal. Think of it as having a senior developer sitting next to you who can:
            </p>
            <BulletList items={[
              'Read and understand your entire codebase',
              'Write, edit, and create files',
              'Run terminal commands (with your permission)',
              'Search the web for documentation',
              'Work with git — commits, branches, PRs',
              'Connect to external tools via MCP servers',
            ]} />
            <p>
              Unlike chat-based AI tools, Claude Code operates directly on your actual project files.
              It doesn&apos;t just suggest code in a chat window — it makes changes to your real codebase, runs your real
              test suite, and interacts with your real development environment.
            </p>
            <p>
              You talk to it in plain English. &quot;Add a dark mode toggle to the settings page&quot; or
              &quot;Fix the bug where users can&apos;t log in on Safari&quot; — and it figures out which files to
              read, what changes to make, and how to verify they work.
            </p>
          </Section>

          {/* 02 */}
          <Section num="02" title="Installation" subtitle="Up and running in under 2 minutes">
            <p><strong className="text-white">Prerequisites:</strong> You need Node.js 18+ installed. If you&apos;re not sure, open a terminal and run:</p>
            <CodeBlock title="Check Node.js version">{`node --version\n# Should show v18.x.x or higher`}</CodeBlock>

            <p>If you don&apos;t have Node.js, download it from <span className="text-primary">nodejs.org</span> — grab the LTS version.</p>

            <p className="mt-4"><strong className="text-white">Step 1: Install Claude Code</strong></p>
            <CodeBlock title="Install globally via npm">{`npm install -g @anthropic-ai/claude-code`}</CodeBlock>

            <p><strong className="text-white">Step 2: Navigate to your project</strong></p>
            <CodeBlock title="Go to your project directory">{`cd ~/your-project`}</CodeBlock>

            <p><strong className="text-white">Step 3: Launch it</strong></p>
            <CodeBlock title="Start Claude Code">{`claude`}</CodeBlock>

            <p>
              The first time you run it, it&apos;ll open a browser window to authenticate with your Anthropic
              account. Log in, and you&apos;re ready. You&apos;ll need either a Pro subscription ($20/month)
              or a Max subscription ($100-200/month) for Claude Code access.
            </p>

            <div className="glass-card rounded-[var(--radius-md)] p-4 mt-4 border-primary/20">
              <p className="text-[var(--color-text-secondary)] text-xs">
                <strong className="text-primary">Pro tip:</strong> The Max plan gives you significantly more usage.
                If you plan to use Claude Code as your primary development tool, Max is worth it.
              </p>
            </div>
          </Section>

          {/* 03 */}
          <Section num="03" title="Your First Session" subtitle="A real example of what working with Claude Code looks like">
            <p>
              Once you&apos;re in, you&apos;ll see a prompt where you can type in plain English.
              Here&apos;s what a typical first interaction looks like:
            </p>

            <CodeBlock title="Your first prompt">{`> Explain what this project does and how it's structured`}</CodeBlock>

            <p>
              Claude will read your files, look at your package.json or requirements.txt, scan the
              directory structure, and give you a clear summary. It&apos;s the fastest way to understand
              an unfamiliar codebase.
            </p>

            <p className="mt-4"><strong className="text-white">Try something real:</strong></p>
            <CodeBlock title="Ask it to make a change">{`> Add a /health endpoint that returns { status: "ok" }`}</CodeBlock>

            <p>
              Claude will figure out your framework (Express, FastAPI, Next.js, etc.), find the right
              file, write the endpoint, and ask for your permission before making changes. You review
              each file edit and either accept or reject it.
            </p>

            <p className="mt-4"><strong className="text-white">The permission model:</strong></p>
            <p>
              Claude Code always asks before doing anything potentially risky. File edits, terminal commands,
              git operations — you approve each one. As you build trust, you can loosen permissions
              to let it work more autonomously.
            </p>

            <CodeBlock title="Example permission prompt">{`Claude wants to edit src/app/api/health/route.ts\n\n+ export async function GET() {\n+   return Response.json({ status: 'ok' })\n+ }\n\nAllow? (y/n/e to edit)`}</CodeBlock>
          </Section>

          {/* 04 */}
          <Section num="04" title="Key Concepts" subtitle="The mental model you need">
            <p><strong className="text-white">Context is everything.</strong> Claude Code reads your project files to understand what you&apos;re
              working with. The more it can see, the better its suggestions. It automatically reads
              files it needs, but you can also point it at specific files.</p>

            <p className="mt-4"><strong className="text-white">CLAUDE.md — your project&apos;s instruction manual.</strong> Create a <code className="bg-[#161616] px-2 py-0.5 rounded text-primary text-xs font-[family-name:var(--font-mono)]">CLAUDE.md</code> file
              in your project root to give Claude persistent instructions. Think of it as onboarding
              docs for your AI teammate:</p>

            <CodeBlock title="Example CLAUDE.md">{`# My Project\n\n## Stack\n- Next.js 14, TypeScript, Tailwind\n- Supabase for database and auth\n- Deployed on Vercel\n\n## Conventions\n- Use single quotes\n- Prefer async/await over .then()\n- All components go in src/components/\n\n## Important\n- Never commit .env files\n- Run tests before committing: npm test`}</CodeBlock>

            <p className="mt-4"><strong className="text-white">Slash commands</strong> are shortcuts for common tasks:</p>
            <ul className="list-none space-y-2 my-3">
              {[
                { cmd: '/help', desc: 'See all available commands' },
                { cmd: '/clear', desc: 'Reset the conversation context' },
                { cmd: '/compact', desc: 'Summarize conversation to save context space' },
                { cmd: '/cost', desc: 'See how much of your usage you\'ve consumed' },
                { cmd: '/doctor', desc: 'Diagnose issues with your Claude Code setup' },
              ].map((item) => (
                <li key={item.cmd} className="flex items-start gap-3">
                  <code className="bg-[#161616] px-2 py-0.5 rounded text-primary text-xs font-[family-name:var(--font-mono)] shrink-0 mt-0.5">{item.cmd}</code>
                  <span>{item.desc}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4"><strong className="text-white">Tools</strong> are what Claude Code uses behind the scenes — file reads, file writes, terminal
              commands, web searches. When you see it asking for permission, it&apos;s asking to use a tool.
              You can configure which tools need permission and which can run automatically.</p>
          </Section>

          {/* 05 */}
          <Section num="05" title="Power Features" subtitle="What makes Claude Code different from chat-based AI">
            <p><strong className="text-white">Headless mode</strong> — run Claude Code without an interactive session. Perfect
              for automation, CI/CD pipelines, or scripting:</p>
            <CodeBlock title="Headless mode">{`# Run a one-shot command\nclaude -p "Find all TODO comments and list them"\n\n# Pipe input to Claude\ncat error.log | claude -p "What's causing these errors?"`}</CodeBlock>

            <p className="mt-4"><strong className="text-white">MCP Servers</strong> (Model Context Protocol) — connect Claude Code to external tools
              and services. MCP lets Claude interact with databases, APIs, browser automation, and more:</p>
            <CodeBlock title="Example MCP integrations">{`# Claude can now:\n- Query your Supabase database directly\n- Control a browser via Playwright\n- Read and write to your Obsidian vault\n- Search the web with Exa\n- Interact with GitHub, Slack, etc.`}</CodeBlock>

            <p className="mt-4"><strong className="text-white">Custom slash commands</strong> — create reusable workflows by adding markdown
              files to <code className="bg-[#161616] px-2 py-0.5 rounded text-primary text-xs font-[family-name:var(--font-mono)]">.claude/commands/</code> in your project:</p>
            <CodeBlock title=".claude/commands/deploy.md">{`Run the test suite, and if all tests pass,\nbuild the project and deploy to production.\nReport the deployment URL when done.`}</CodeBlock>
            <p>Then run it with <code className="bg-[#161616] px-2 py-0.5 rounded text-primary text-xs font-[family-name:var(--font-mono)]">/deploy</code> in your Claude Code session.</p>

            <p className="mt-4"><strong className="text-white">Background agents</strong> — spawn agents that work independently
              while you continue with other tasks. Great for long-running operations like test suites
              or code reviews.</p>

            <p className="mt-4"><strong className="text-white">Git integration</strong> — Claude Code understands git natively. It can
              create branches, make commits with good messages, create pull requests, and even
              review PRs. Ask it to &quot;commit these changes with a descriptive message&quot; and it
              writes a thoughtful commit message based on the actual diff.</p>
          </Section>

          {/* 06 */}
          <Section num="06" title="Tips from Heavy Use" subtitle="What I've learned using Claude Code to build production systems every day">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 !mt-0">
              <TipCard title="CLAUDE.md is your highest-leverage file">
                Spend 15 minutes writing a good CLAUDE.md with your stack, conventions, and gotchas.
                It pays for itself within the first hour. Update it as you learn what Claude gets wrong.
              </TipCard>

              <TipCard title="Let it read before you ask it to write">
                Instead of describing your code, tell Claude to read it first. &quot;Read src/auth/ and then
                add rate limiting&quot; produces much better results than describing your auth setup from memory.
              </TipCard>

              <TipCard title="Be specific about what you want">
                &quot;Make the homepage better&quot; gives mediocre results. &quot;Add a hero section with a headline,
                subtitle, and CTA button using our teal color scheme&quot; gives exactly what you want.
              </TipCard>

              <TipCard title="Use /compact before you hit context limits">
                Long sessions eat up context. When Claude starts forgetting earlier parts of your
                conversation, run /compact to summarize and free up space.
              </TipCard>

              <TipCard title="Start with a plan for big changes">
                For anything touching more than 2-3 files, ask Claude to write a plan first. Review
                the plan, then tell it to execute. This catches bad assumptions early.
              </TipCard>

              <TipCard title="Check its work — trust but verify">
                Claude Code is remarkably capable, but it can make mistakes. Always review file changes
                before accepting, and run your tests after changes. Build a habit of verification.
              </TipCard>
            </div>
          </Section>

          {/* 07 */}
          <Section num="07" title="Common Mistakes" subtitle="What beginners get wrong (and how to fix it)">
            <div className="space-y-3 !mt-0">
              <MistakeCard
                dont="Running Claude Code from your home directory with no project context"
                doThis="Always cd into your project directory first. Claude needs project context to be useful."
              />
              <MistakeCard
                dont="Accepting every change without reading the diff"
                doThis="Review each file edit. It takes 10 seconds and catches mistakes before they compound."
              />
              <MistakeCard
                dont="Writing a novel-length prompt trying to explain everything at once"
                doThis="Break big tasks into smaller steps. One clear instruction per message gets better results."
              />
              <MistakeCard
                dont="Ignoring CLAUDE.md and re-explaining your stack every session"
                doThis="Write it once in CLAUDE.md. Claude reads it automatically at the start of every session."
              />
              <MistakeCard
                dont="Expecting it to know your project's state without reading files"
                doThis="Point it at the relevant files. 'Read src/config.ts and then update the database URL' works better than describing your config from memory."
              />
              <MistakeCard
                dont="Using Claude Code for simple tasks a quick terminal command handles faster"
                doThis="Know when to just type the command yourself. Claude Code shines on complex, multi-step work."
              />
            </div>
          </Section>

          {/* 08 */}
          <Section num="08" title="Resources" subtitle="Where to go next">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 !mt-0">
              {[
                {
                  title: 'Official Documentation',
                  desc: 'Anthropic\'s complete Claude Code docs',
                  url: 'https://docs.anthropic.com/en/docs/claude-code',
                },
                {
                  title: 'Claude Code on GitHub',
                  desc: 'Report issues, request features',
                  url: 'https://github.com/anthropics/claude-code',
                },
                {
                  title: 'Anthropic Discord',
                  desc: 'Community support and discussion',
                  url: 'https://discord.gg/anthropic',
                },
                {
                  title: 'Claude Pro / Max Plans',
                  desc: 'Sign up or upgrade your plan',
                  url: 'https://claude.ai/upgrade',
                },
              ].map((resource) => (
                <a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-[var(--radius-md)] p-5 group hover:border-primary/30 block"
                >
                  <h4 className="font-[family-name:var(--font-display)] font-bold text-sm mb-1 group-hover:text-primary transition-colors duration-200">
                    {resource.title}
                  </h4>
                  <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-muted)]">{resource.desc}</p>
                </a>
              ))}
            </div>
          </Section>

        </section>

        {/* ── CTA ── */}
        <section className="max-w-[900px] mx-auto px-6 pb-24">
          <div className="reveal glass-card rounded-[var(--radius-lg)] p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(117,214,214,0.03)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.02em] mb-3">
                Ready to try it?
              </h2>
              <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text-secondary)] mb-6 max-w-[500px] mx-auto">
                Install Claude Code, open your project, and start with something simple.
                You&apos;ll be surprised how fast it clicks.
              </p>
              <CodeBlock>{`npm install -g @anthropic-ai/claude-code && claude`}</CodeBlock>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--color-border)] max-w-[900px] mx-auto w-full px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#444]">
          <span>Written by <a href="https://brandonstanford.ai" target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-primary transition-colors">Brandon Stanford</a></span>
          <div className="flex items-center gap-4">
            <a href="https://x.com/b__stanford" target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-primary transition-colors">X</a>
            <a href="https://www.linkedin.com/in/brandonistanford/" target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
