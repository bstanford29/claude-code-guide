'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_GROUPS, tierColor } from '@/lib/nav';
import type { Tier } from '@/lib/nav';

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Primary navigation"
      className={[
        'fixed z-40 top-[56px] left-0 bottom-0 w-[280px] overflow-y-auto',
        'bg-[#0b0b0b] border-r border-[var(--color-border)]',
        'transition-transform duration-200 ease-out',
        'md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      <nav className="px-5 py-6 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.tier}>
            <GroupHeader tier={group.tier} title={group.title} kicker={group.kicker} />
            <ul className="mt-2 space-y-0.5">
              {group.routes.map((route) => {
                const active = pathname === route.href;
                const dim = route.status === 'coming-soon';
                return (
                  <li key={route.href}>
                    <Link
                      href={dim ? '#' : route.href}
                      onClick={(e) => {
                        if (dim) e.preventDefault();
                        else onClose();
                      }}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'block px-3 py-1.5 rounded text-xs border-l-2 transition-colors',
                        active
                          ? 'text-white bg-[#161616] border-l-[color:var(--color-primary)]'
                          : 'text-[#888] border-l-transparent hover:text-white hover:bg-[#121212]',
                        dim ? 'opacity-40 cursor-not-allowed' : '',
                      ].join(' ')}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium truncate">{route.label}</span>
                        {dim && (
                          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[#555] shrink-0">
                            soon
                          </span>
                        )}
                      </div>
                      {route.subtitle && (
                        <div className="text-[10px] text-[#555] mt-0.5 truncate">{route.subtitle}</div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function GroupHeader({ tier, title, kicker }: { tier: Tier; title: string; kicker: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 px-2">
      <div className="flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: tierColor(tier) }}
          aria-hidden
        />
        <h3 className="font-[family-name:var(--font-display)] text-[10px] font-bold uppercase tracking-[0.15em] text-[#aaa]">
          {title}
        </h3>
      </div>
      <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.1em] text-[#444]">
        {kicker.split('—')[0].trim()}
      </span>
    </div>
  );
}
