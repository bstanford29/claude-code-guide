import type { Tier } from '@/lib/nav';
import { TierBadge } from '@/components/tier-badge';

export function PageHeader({
  tier,
  title,
  subtitle,
  lastValidated,
}: {
  tier: Tier;
  title: string;
  subtitle?: string;
  lastValidated?: string;
}) {
  return (
    <header className="mb-10 pb-8 border-b border-[var(--color-border)]">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <TierBadge tier={tier} />
        {lastValidated && <LastValidated date={lastValidated} />}
      </div>
      <h1 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em] text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 font-[family-name:var(--font-body)] text-base text-[var(--color-text-secondary)] leading-relaxed max-w-[680px]">
          {subtitle}
        </p>
      )}
    </header>
  );
}

function LastValidated({ date }: { date: string }) {
  const stale = isStale(date);
  return (
    <span
      title={stale ? 'This page may be out of date — verify against current docs.' : undefined}
      className={`font-[family-name:var(--font-mono)] text-[10px] tracking-[0.08em] uppercase px-2 py-0.5 rounded border ${
        stale
          ? 'text-amber-400 border-amber-500/30 bg-amber-500/5'
          : 'text-[#555] border-[#222] bg-transparent'
      }`}
    >
      validated {date}
      {stale && ' · stale'}
    </span>
  );
}

function isStale(isoDate: string): boolean {
  try {
    const then = new Date(isoDate).getTime();
    const now = Date.now();
    const days = (now - then) / (1000 * 60 * 60 * 24);
    return days > 30;
  } catch {
    return false;
  }
}
