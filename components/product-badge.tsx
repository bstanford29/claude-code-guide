import type { Product } from '@/lib/nav';
import { productLabel } from '@/lib/nav';

const productStyles: Record<Product, string> = {
  shared: 'border-[color:var(--color-primary)]/25 text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/5',
  claude: 'border-[color:var(--tier-a)]/30 text-[color:var(--tier-a)] bg-[color:var(--tier-a)]/5',
  codex: 'border-[color:var(--tier-c)]/30 text-[color:var(--tier-c)] bg-[color:var(--tier-c)]/5',
};

export function ProductBadge({ product, label }: { product: Product; label?: string }) {
  return (
    <span
      className={`inline-block font-[family-name:var(--font-display)] text-[10px] tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full border ${productStyles[product]}`}
    >
      {label ?? productLabel(product)}
    </span>
  );
}
