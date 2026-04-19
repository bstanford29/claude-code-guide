'use client';

import { useCallback, useEffect, useState } from 'react';
import { TopNav } from '@/components/top-nav';
import { Sidebar } from '@/components/sidebar';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const close = useCallback(() => setDrawerOpen(false), []);
  const open = useCallback(() => setDrawerOpen(true), []);

  // Close drawer on Esc
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, close]);

  // Scroll-lock body while drawer open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prev = document.body.style.overflow;
    if (drawerOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  return (
    <>
      <TopNav onMenuClick={open} />
      <Sidebar isOpen={drawerOpen} onClose={close} />

      {/* Mobile backdrop */}
      {drawerOpen && (
        <div
          aria-hidden
          onClick={close}
          className="md:hidden fixed inset-0 top-[56px] z-30 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Main content — offset for top bar + sidebar on desktop */}
      <main className="pt-[56px] md:pl-[280px] min-h-screen">
        <div className="max-w-[880px] mx-auto px-5 md:px-10 py-10 md:py-14">{children}</div>
      </main>
    </>
  );
}
