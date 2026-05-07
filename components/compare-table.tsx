import type { ReactNode } from 'react';

export interface CompareRow {
  label: ReactNode;
  left: ReactNode;
  right: ReactNode;
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
    <div className="glass-card rounded-[var(--radius-lg)] overflow-x-auto my-4">
      <table className="min-w-[720px] w-full border-collapse text-sm font-[family-name:var(--font-body)]">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="w-[25%] px-4 py-3 text-left font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.08em] text-[#555]">
              Decision point
            </th>
            <th className="w-[37.5%] px-4 py-3 text-left align-top border-l border-[var(--color-border)] font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.08em] text-[#888]">
              {leftHeader}
            </th>
            <th className="w-[37.5%] px-4 py-3 text-left align-top border-l border-[var(--color-border)] font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.08em] text-[color:var(--color-primary)]">
              {rightHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--color-border)] last:border-b-0">
              <th className="px-4 py-3 text-left align-top text-[#aaa] font-semibold">{row.label}</th>
              <td className="px-4 py-3 align-top text-[#ccc] border-l border-[var(--color-border)] leading-relaxed">{row.left}</td>
              <td className="px-4 py-3 align-top text-[#ccc] border-l border-[var(--color-border)] leading-relaxed">{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
