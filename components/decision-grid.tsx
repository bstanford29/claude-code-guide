import Link from 'next/link';

export interface DecisionItem {
  title: string;
  eyebrow?: string;
  body: React.ReactNode;
  href?: string;
}

export function DecisionGrid({ items }: { items: DecisionItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
      {items.map((item) => {
        const content = (
          <>
            {item.eyebrow && (
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] uppercase text-[#555] mb-2">
                {item.eyebrow}
              </div>
            )}
            <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-white tracking-[-0.01em]">
              {item.title}
            </h3>
            <div className="mt-2 text-sm leading-relaxed text-[#bbb]">{item.body}</div>
          </>
        );

        if (item.href) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="glass-card rounded-[var(--radius-lg)] p-5 block hover:border-[var(--color-border-hover)]"
            >
              {content}
            </Link>
          );
        }

        return (
          <div key={item.title} className="glass-card rounded-[var(--radius-lg)] p-5">
            {content}
          </div>
        );
      })}
    </div>
  );
}
