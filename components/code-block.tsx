export function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] my-4">
      {title && (
        <div className="bg-[#111] px-4 py-2 border-b border-[var(--color-border)]">
          <span className="font-[family-name:var(--font-display)] text-[11px] tracking-[0.1em] uppercase text-[#555]">
            {title}
          </span>
        </div>
      )}
      <pre className="bg-[#0a0a0a] p-4 overflow-x-auto">
        <code className="font-[family-name:var(--font-mono)] text-sm text-[#ccc] leading-relaxed whitespace-pre">
          {children}
        </code>
      </pre>
    </div>
  );
}
