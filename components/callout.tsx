type Variant = 'info' | 'warn' | 'tip';

const variants: Record<Variant, { border: string; bg: string; text: string; label: string }> = {
  info: {
    border: 'border-[color:var(--color-primary)]/40',
    bg: 'bg-[color:var(--color-primary)]/5',
    text: 'text-[color:var(--color-primary)]',
    label: 'Note',
  },
  warn: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/5',
    text: 'text-amber-400',
    label: 'Heads up',
  },
  tip: {
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-400',
    label: 'Tip',
  },
};

export function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  const v = variants[variant];
  return (
    <div className={`rounded-[var(--radius-md)] border-l-4 ${v.border} ${v.bg} p-4 my-4`}>
      <div className={`font-[family-name:var(--font-display)] text-[11px] tracking-[0.1em] uppercase font-bold mb-1 ${v.text}`}>
        {title ?? v.label}
      </div>
      <div className="font-[family-name:var(--font-body)] text-sm text-[#ccc] leading-relaxed">{children}</div>
    </div>
  );
}
