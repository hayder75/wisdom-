import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Reveal } from "@/components/Reveal";

interface StatBlockProps {
  value: string;
  label: string;
  note: string;
  index: number;
}

export function StatBlock({ value, label, note, index }: StatBlockProps) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="border-t border-ivory/15 pt-8">
        <AnimatedNumber
          value={value}
          className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-none font-medium tracking-tight-2 text-ivory"
        />
        <p className="mt-4 text-[0.8125rem] font-semibold tracking-[0.18em] text-lime uppercase">
          {label}
        </p>
        <p className="mt-3 max-w-[24ch] text-[0.8125rem] leading-relaxed text-ivory/45">
          {note}
        </p>
      </div>
    </Reveal>
  );
}