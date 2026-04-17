export function TipCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-6 relative overflow-hidden group hover:border-primary/20">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
      <h4 className="font-[family-name:var(--font-display)] font-bold text-sm mb-2 pl-4">{title}</h4>
      <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text-secondary)] leading-relaxed pl-4">
        {children}
      </p>
    </div>
  );
}
