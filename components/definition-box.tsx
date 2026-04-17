export function DefinitionBox({
  term,
  whatItIs,
  whyItMatters,
  example,
}: {
  term: string;
  whatItIs: string;
  whyItMatters: string;
  example?: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5 my-4 border-l-2 border-[color:var(--color-primary)]/40">
      <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] uppercase text-[color:var(--color-primary)] mb-2">
        What is {term}?
      </div>
      <div className="space-y-3 font-[family-name:var(--font-body)] text-sm text-[#bbb] leading-relaxed">
        <div>
          <span className="text-white font-semibold">In plain terms.</span> {whatItIs}
        </div>
        <div>
          <span className="text-white font-semibold">Why it matters.</span> {whyItMatters}
        </div>
        {example && (
          <div>
            <span className="text-white font-semibold">Example.</span> {example}
          </div>
        )}
      </div>
    </div>
  );
}
