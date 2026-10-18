import { Reveal } from "@/components/Reveal";

export function Marquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <section
      className="overflow-hidden border-y border-white/10 bg-forest py-5"
      aria-label="Wisdom values"
    >
      <div className="marquee-track flex w-max">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-[0.75rem] font-semibold tracking-[0.28em] text-ivory/70 uppercase"
          >
            <span className="font-display text-[0.625rem] font-bold text-lime">
              {String((i % items.length) + 1).padStart(2, "0")}
            </span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
export function GrowLine() {
  return (
    <div className="container-site py-0">
      <Reveal>
        <div className="h-px w-full bg-line" />
      </Reveal>
    </div>
  );
}
