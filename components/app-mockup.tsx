export function AppMockup({
  caption,
  children,
  aspect = '16/10',
}: {
  caption: string;
  children: React.ReactNode;
  aspect?: string;
}) {
  return (
    <figure className="my-6">
      <div
        className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[#0d0d0d] shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
        style={{ aspectRatio: aspect }}
      >
        {/* Traffic-lights title bar */}
        <div className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0a0a0a] border-b border-[#1a1a1a]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
        </div>
        {/* Window content */}
        <div className="h-[calc(100%-32px)] flex">{children}</div>
      </div>
      <figcaption className="font-[family-name:var(--font-mono)] text-[11px] text-[#666] mt-2 px-1">
        {caption}
      </figcaption>
    </figure>
  );
}

export function AppSidebar({
  sections,
}: {
  sections: {
    title: string;
    items: { label: string; accent?: string; active?: boolean; subtle?: string }[];
  }[];
}) {
  return (
    <aside className="w-[220px] shrink-0 bg-[#0b0b0b] border-r border-[#1a1a1a] overflow-hidden px-3 py-4 flex flex-col gap-5">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.15em] uppercase text-[#555] px-2 mb-1.5">
            {section.title}
          </div>
          <ul className="space-y-0.5">
            {section.items.map((item, i) => (
              <li
                key={i}
                className={[
                  'rounded px-2 py-1 text-[11px] flex items-center gap-2',
                  item.active ? 'bg-[#161616] text-white' : 'text-[#999]',
                ].join(' ')}
              >
                {item.accent && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.accent }}
                    aria-hidden
                  />
                )}
                <span className="flex-1 truncate font-[family-name:var(--font-body)]">{item.label}</span>
                {item.subtle && <span className="text-[9px] text-[#555] shrink-0">{item.subtle}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export function AppTabs({
  tabs,
  activeIndex = 0,
}: {
  tabs: { label: string; branch?: string; status?: 'idle' | 'thinking' | 'ready' }[];
  activeIndex?: number;
}) {
  return (
    <div className="flex border-b border-[#1a1a1a] bg-[#0a0a0a]">
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={[
            'px-3 py-2 flex items-center gap-2 text-[11px] border-r border-[#1a1a1a] min-w-[180px]',
            i === activeIndex ? 'bg-[#121212] text-white' : 'text-[#888]',
          ].join(' ')}
        >
          {tab.status && <StatusDot status={tab.status} />}
          <span className="truncate flex-1 font-[family-name:var(--font-body)]">{tab.label}</span>
          {tab.branch && (
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-[#555]">{tab.branch}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function StatusDot({ status }: { status: 'idle' | 'thinking' | 'ready' }) {
  const c =
    status === 'thinking'
      ? 'var(--color-primary)'
      : status === 'ready'
        ? '#6b7d5a'
        : '#444';
  return (
    <span
      aria-hidden
      className={`w-1.5 h-1.5 rounded-full shrink-0 ${status === 'thinking' ? 'animate-pulse' : ''}`}
      style={{ backgroundColor: c }}
    />
  );
}

export function AppMain({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex-1 min-w-0 flex flex-col ${className}`}>{children}</div>;
}

/* Diff columns */
export function AppDiff({
  filename,
  oldLines,
  newLines,
}: {
  filename: string;
  oldLines: { text: string; changed?: boolean }[];
  newLines: { text: string; changed?: boolean }[];
}) {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      <div className="px-4 py-2 text-[11px] font-[family-name:var(--font-mono)] text-[#888] border-b border-[#1a1a1a] bg-[#0c0c0c]">
        {filename}
      </div>
      <div className="grid grid-cols-2 flex-1 min-h-0">
        <DiffColumn label="Current" variant="current" lines={oldLines} />
        <DiffColumn label="Proposed" variant="proposed" lines={newLines} />
      </div>
      <div className="px-4 py-2.5 flex items-center gap-2 justify-end border-t border-[#1a1a1a] bg-[#0c0c0c]">
        <button
          disabled
          className="px-3 py-1 text-[11px] rounded border border-[#222] text-[#888] font-[family-name:var(--font-body)]"
        >
          Reject
        </button>
        <button
          disabled
          className="px-3 py-1 text-[11px] rounded border border-[#222] text-[#aaa] font-[family-name:var(--font-body)]"
        >
          Edit
        </button>
        <button
          disabled
          className="px-3 py-1 text-[11px] rounded bg-[color:var(--color-primary)]/15 border border-[color:var(--color-primary)]/30 text-[color:var(--color-primary)] font-[family-name:var(--font-body)] font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

function DiffColumn({
  label,
  variant,
  lines,
}: {
  label: string;
  variant: 'current' | 'proposed';
  lines: { text: string; changed?: boolean }[];
}) {
  return (
    <div className={`border-r border-[#1a1a1a] last:border-r-0 flex flex-col min-w-0 ${variant === 'proposed' ? 'border-r-0' : ''}`}>
      <div className="px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-[#555] border-b border-[#1a1a1a] font-[family-name:var(--font-mono)]">
        {label}
      </div>
      <pre className="p-3 text-[11px] font-[family-name:var(--font-mono)] overflow-auto flex-1 min-w-0">
        {lines.map((l, i) => (
          <div
            key={i}
            className={[
              'whitespace-pre px-1',
              l.changed && variant === 'current' ? 'bg-red-500/10 text-red-300' : '',
              l.changed && variant === 'proposed' ? 'bg-emerald-500/10 text-emerald-300' : '',
              !l.changed ? 'text-[#888]' : '',
            ].join(' ')}
          >
            {l.text || ' '}
          </div>
        ))}
      </pre>
    </div>
  );
}
