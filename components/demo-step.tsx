import { CodeBlock } from '@/components/code-block';

export function DemoStep({
  step,
  timing,
  title,
  prompt,
  expected,
  branch,
  children,
}: {
  step: number;
  timing: string;
  title: string;
  prompt?: string;
  expected?: React.ReactNode;
  branch?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-6 my-4 relative">
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <span className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-[color:var(--color-primary)]/60 w-8 shrink-0">
          {String(step).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-white leading-tight">{title}</h3>
          <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.08em] uppercase text-[#666] mt-0.5">
            {timing}
          </div>
        </div>
      </div>

      {prompt && (
        <div className="pl-[4.5rem]">
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-1">
            Prompt to type
          </div>
          <CodeBlock>{prompt}</CodeBlock>
        </div>
      )}

      {expected && (
        <div className="pl-[4.5rem] mt-3">
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#555] mb-1">
            What should happen
          </div>
          <div className="font-[family-name:var(--font-body)] text-sm text-[#bbb] leading-relaxed">{expected}</div>
        </div>
      )}

      {branch && (
        <div className="pl-[4.5rem] mt-3 p-3 rounded border-l-2 border-amber-500/40 bg-amber-500/5">
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-amber-400 mb-1">
            If they ask
          </div>
          <div className="font-[family-name:var(--font-body)] text-sm text-[#bbb] leading-relaxed">{branch}</div>
        </div>
      )}

      {children && <div className="pl-[4.5rem] mt-3 font-[family-name:var(--font-body)] text-sm text-[#bbb] leading-relaxed">{children}</div>}
    </div>
  );
}
