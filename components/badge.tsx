export function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block font-[family-name:var(--font-display)] text-[11px] tracking-[0.05em] text-primary/80 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
      {label}
    </span>
  );
}
