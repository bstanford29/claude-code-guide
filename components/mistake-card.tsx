export function MistakeCard({ dont, doThis }: { dont: string; doThis: string }) {
  return (
    <div className="glass-card rounded-[var(--radius-lg)] p-5 space-y-3">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs mt-0.5">
          x
        </span>
        <p className="font-[family-name:var(--font-body)] text-sm text-[#888] leading-relaxed">{dont}</p>
      </div>
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs mt-0.5">
          &#10003;
        </span>
        <p className="font-[family-name:var(--font-body)] text-sm text-[#ccc] leading-relaxed">{doThis}</p>
      </div>
    </div>
  );
}
