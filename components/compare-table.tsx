export interface CompareRow {
  label: string;
  left: React.ReactNode;
  right: React.ReactNode;
}

export function CompareTable({
  leftHeader,
  rightHeader,
  rows,
}: {
  leftHeader: string;
  rightHeader: string;
  rows: CompareRow[];
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] overflow-hidden my-4">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)] text-xs font-[family-name:var(--font-display)] uppercase tracking-[0.08em] border-b border-[var(--color-border)]">
        <div className="px-4 py-3 text-[#555]">&nbsp;</div>
        <div className="px-4 py-3 text-[#888] border-l border-[var(--color-border)]">{leftHeader}</div>
        <div className="px-4 py-3 text-[color:var(--color-primary)] border-l border-[var(--color-border)]">{rightHeader}</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)] text-sm font-[family-name:var(--font-body)] ${
            i > 0 ? 'border-t border-[var(--color-border)]' : ''
          }`}
        >
          <div className="px-4 py-3 text-[#aaa] font-semibold">{row.label}</div>
          <div className="px-4 py-3 text-[#ccc] border-l border-[var(--color-border)] leading-relaxed">{row.left}</div>
          <div className="px-4 py-3 text-[#ccc] border-l border-[var(--color-border)] leading-relaxed">{row.right}</div>
        </div>
      ))}
    </div>
  );
}
