'use client';

import Link from 'next/link';

export function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#0a0a0a]/85 border-b border-[var(--color-border)]">
      <div className="h-[56px] px-4 md:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded border border-[var(--color-border)] text-[#888] hover:text-white hover:border-[var(--color-border-hover)] transition-colors"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
          <Link href="/" className="font-[family-name:var(--font-display)] font-bold text-xs tracking-[0.15em] text-[#888] hover:text-[color:var(--color-primary)] uppercase transition-colors truncate">
            Claude Code Guide
          </Link>
        </div>
        <a
          href="https://brandonstanford.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-display)] text-xs text-[#555] hover:text-[color:var(--color-primary)] transition-colors duration-200 hidden sm:block"
        >
          by Brandon Stanford
        </a>
      </div>
    </header>
  );
}
