export function TerminalMockup({
  title,
  caption,
  children,
}: {
  title?: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-6">
      <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[#0a0a0a] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a1a1a] bg-[#0d0d0d]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
          </div>
          {title && (
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#666] tracking-[0.05em] ml-2">
              {title}
            </span>
          )}
        </div>
        {/* Body */}
        <div className="p-4 font-[family-name:var(--font-mono)] text-[12.5px] leading-[1.6] text-[#ccc]">
          {children}
        </div>
      </div>
      <figcaption className="font-[family-name:var(--font-mono)] text-[11px] text-[#666] mt-2 px-1">
        {caption}
      </figcaption>
    </figure>
  );
}

/* Helpers for terminal content */

export function TermLine({
  children,
  muted,
  accent,
  italic,
}: {
  children: React.ReactNode;
  muted?: boolean;
  accent?: boolean;
  italic?: boolean;
}) {
  return (
    <div
      className={[
        'whitespace-pre-wrap',
        muted ? 'text-[#666]' : '',
        accent ? 'text-[color:var(--color-primary)]' : '',
        italic ? 'italic text-[#777]' : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function TermPrompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 my-2">
      <span className="text-[color:var(--color-primary)] shrink-0">&gt;</span>
      <span className="text-[#e5e5e5]">{children}</span>
    </div>
  );
}

export function TermCaret() {
  return (
    <span
      aria-hidden
      className="inline-block w-[0.55ch] h-[1.2em] align-[-0.2em] bg-[color:var(--color-primary)] animate-pulse ml-0.5"
    />
  );
}

/* Floating menu (used for slash / @ completion) */
export function TermMenu({
  items,
  activeIndex = 0,
  header,
}: {
  items: { label: string; hint?: string }[];
  activeIndex?: number;
  header?: string;
}) {
  return (
    <div className="my-3 rounded border border-[#2a2a2a] bg-[#111] shadow-lg max-w-[440px]">
      {header && (
        <div className="px-3 py-1.5 border-b border-[#1f1f1f] text-[10px] uppercase tracking-[0.1em] text-[#555]">
          {header}
        </div>
      )}
      <ul className="py-1">
        {items.map((item, i) => (
          <li
            key={item.label}
            className={[
              'px-3 py-1 flex items-center justify-between gap-3',
              i === activeIndex ? 'bg-[color:var(--color-primary)]/10 text-white' : 'text-[#aaa]',
            ].join(' ')}
          >
            <span className="truncate">{item.label}</span>
            {item.hint && <span className="text-[10px] text-[#666] shrink-0">{item.hint}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
