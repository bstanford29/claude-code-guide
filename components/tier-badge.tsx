import type { Tier } from '@/lib/nav';
import { tierLabel } from '@/lib/nav';

const tierStyles: Record<Tier, string> = {
  home: 'border-[color:var(--color-primary)]/20 text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/5',
  A: 'border-[color:var(--tier-a)]/30 text-[color:var(--tier-a)] bg-[color:var(--tier-a)]/5',
  B: 'border-[color:var(--tier-b)]/30 text-[color:var(--tier-b)] bg-[color:var(--tier-b)]/5',
  C: 'border-[color:var(--tier-c)]/30 text-[color:var(--tier-c)] bg-[color:var(--tier-c)]/5',
  ref: 'border-[color:var(--tier-ref)]/30 text-[color:var(--tier-ref)] bg-[color:var(--tier-ref)]/5',
};

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={`inline-block font-[family-name:var(--font-display)] text-[10px] tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full border ${tierStyles[tier]}`}
    >
      {tierLabel(tier)}
    </span>
  );
}
