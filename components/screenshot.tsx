import Image from 'next/image';

export function Screenshot({
  src,
  caption,
  alt,
  spec,
  aspect = '16/10',
}: {
  src?: string;
  caption: string;
  alt?: string;
  spec?: string;
  aspect?: string;
}) {
  const style = { aspectRatio: aspect };

  if (src) {
    return (
      <figure className="my-6">
        <div
          className="rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden bg-[#0f0f0f] relative"
          style={style}
        >
          <Image src={src} alt={alt ?? caption} fill className="object-cover" />
        </div>
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] text-[#777] mt-2 px-1">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="my-6">
      <div
        className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-hover)] bg-[#0c0c0c] relative overflow-hidden flex items-center justify-center"
        style={style}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.5)_8px,rgba(255,255,255,0.5)_9px)]" />
        <div className="text-center px-6 max-w-[80%] relative z-10">
          <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-[#555] mb-2">
            Screenshot placeholder
          </div>
          <div className="font-[family-name:var(--font-body)] text-sm text-[#aaa] leading-relaxed">{caption}</div>
          {spec && (
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-[#555] mt-3 leading-relaxed italic">
              spec: {spec}
            </div>
          )}
        </div>
      </div>
      <figcaption className="font-[family-name:var(--font-mono)] text-[11px] text-[#666] mt-2 px-1">
        {caption}
      </figcaption>
    </figure>
  );
}
