import Link from 'next/link';
import { NAV_GROUPS, tierColor } from '@/lib/nav';
import { Badge } from '@/components/badge';
import { CodeBlock } from '@/components/code-block';

export default function HomePage() {
  const tiers = NAV_GROUPS.filter((g) => g.tier !== 'home');

  return (
    <>
      {/* Hero */}
      <section className="relative pb-14 border-b border-[var(--color-border)] mb-14">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(117,214,214,0.04)_0%,transparent_70%)] pointer-events-none -z-10" />

        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <Badge label="Training guide" />
          <Badge label="Updated 2026" />
        </div>

        <h1 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-white">
          Getting started with
          <br />
          <span className="hero-text-mask">Claude Code</span>
        </h1>

        <p className="mt-5 text-[var(--color-text-secondary)] text-base leading-relaxed max-w-[620px] font-[family-name:var(--font-body)]">
          Claude Code is an AI coding assistant that lives in your terminal &mdash; and now on your desktop. You describe
          what you want in plain English, and it reads your files, writes code, runs commands, and builds things for
          you. This guide takes you from zero to productive.
        </p>

        <div className="flex flex-wrap gap-2 mt-7">
          <Badge label="Terminal-native" />
          <Badge label="Reads your codebase" />
          <Badge label="Runs commands" />
          <Badge label="Git-aware" />
          <Badge label="Skills + hooks + MCP" />
        </div>
      </section>

      {/* Start-here CTA */}
      <section className="mb-14">
        <div className="glass-card rounded-[var(--radius-lg)] p-6 md:p-8 relative overflow-hidden">
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-[color:var(--color-primary)] mb-2">
            Start here
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-xl md:text-2xl tracking-[-0.01em] mb-2">
            New to Claude Code? Install first.
          </h2>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text-secondary)] mb-5 max-w-[560px]">
            Two minutes to working. Then try the first-session walkthrough.
          </p>
          <CodeBlock>{`npm install -g @anthropic-ai/claude-code && claude`}</CodeBlock>
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            <Link href="/install" className="text-[color:var(--color-primary)] hover:underline font-medium">
              Full install guide &rarr;
            </Link>
            <Link href="/first-session" className="text-[#888] hover:text-white">
              Or skip to your first session
            </Link>
          </div>
        </div>
      </section>

      {/* Tier-grouped TOC */}
      <section className="space-y-10">
        <div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-[#555] mb-3">
            What&apos;s in the guide
          </div>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text-secondary)] max-w-[620px] leading-relaxed">
            Three tiers, in order. Day 1 gets you productive. Week 2 makes you fast. Power user is for when you want
            to build processes, not just prompts.
          </p>
        </div>

        {tiers.map((group) => (
          <div key={group.tier}>
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-[var(--color-border)]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tierColor(group.tier) }}
                aria-hidden
              />
              <h2 className="font-[family-name:var(--font-display)] font-bold text-xl tracking-[-0.01em]">
                {group.title}
              </h2>
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555]">
                {group.kicker}
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group.routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="block p-3 rounded border border-transparent hover:border-[var(--color-border-hover)] hover:bg-[#121212] transition-colors group"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-wider text-[#555] w-16 shrink-0 uppercase">
                        {route.href}
                      </span>
                      <div className="min-w-0">
                        <div className="font-[family-name:var(--font-body)] text-sm font-semibold text-[#ddd] group-hover:text-white transition-colors truncate">
                          {route.label}
                        </div>
                        {route.subtitle && (
                          <div className="font-[family-name:var(--font-body)] text-xs text-[#666] mt-0.5 truncate">
                            {route.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-6 border-t border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#555]">
          <span>
            Written by{' '}
            <a
              href="https://brandonstanford.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[color:var(--color-primary)] transition-colors"
            >
              Brandon Stanford
            </a>
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/b__stanford"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-[color:var(--color-primary)] transition-colors"
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/in/brandonistanford/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-[color:var(--color-primary)] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
