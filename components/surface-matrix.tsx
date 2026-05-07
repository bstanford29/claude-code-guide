export interface SurfaceColumn {
  key: string;
  title: string;
  subtitle?: string;
}

export interface SurfaceRow {
  label: string;
  values: Record<string, React.ReactNode>;
}

export function SurfaceMatrix({ columns, rows }: { columns: SurfaceColumn[]; rows: SurfaceRow[] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[#101010]">
      <table className="min-w-[760px] w-full border-collapse text-sm font-[family-name:var(--font-body)]">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="w-[160px] px-4 py-3 text-left font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[#555]">
              Decision point
            </th>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 text-left align-top border-l border-[var(--color-border)]">
                <div className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.08em] text-[#ddd]">
                  {column.title}
                </div>
                {column.subtitle && <div className="mt-1 text-[11px] normal-case tracking-normal text-[#666]">{column.subtitle}</div>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-[var(--color-border)] last:border-b-0">
              <th className="px-4 py-3 text-left align-top font-semibold text-[#aaa]">{row.label}</th>
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 align-top border-l border-[var(--color-border)] text-[#ccc] leading-relaxed">
                  {row.values[column.key] ?? <span className="text-[#555]">-</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
