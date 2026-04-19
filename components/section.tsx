'use client';

import { useState } from 'react';

export function Section({
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
}) {
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
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text-muted)] mt-1">
            {subtitle}
          </p>
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
}
