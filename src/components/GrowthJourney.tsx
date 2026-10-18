"use client";

import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/lib/i18n";

export interface JourneyStep {
  key: string;
  title: string;
  text: string;
}

interface GrowthJourneyProps {
  steps: JourneyStep[];
  t: Dictionary;
}

export function GrowthJourney({ steps, t }: GrowthJourneyProps) {
  return (
    <section className="relative bg-ivory" id="wisdom-model">
      <div className="container-site py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="label text-lime-deep">{t.journey.label}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-7 max-w-[16ch] text-balance text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.92] font-medium tracking-tight-2 text-forest">
                {t.journey.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-[44ch] text-[1.0625rem] leading-relaxed text-stone">
                {t.journey.note}
              </p>
            </Reveal>
          </div>

          <div className="relative">
            <div className="absolute top-3 bottom-3 left-[19px] w-px bg-line" aria-hidden="true" />
            <div className="flex flex-col">
              {steps.map((step, i) => (
                <Reveal key={step.key} delay={i * 0.08}>
                  <div className="relative grid gap-4 border-b border-line py-8 first:pt-0 last:border-b-0 sm:grid-cols-[170px_1fr] sm:gap-8">
                    <div className="flex items-center gap-5 sm:items-start">
                      <span className="relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center border border-forest bg-ivory font-display text-[0.75rem] font-bold text-forest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-2 text-[0.75rem] font-semibold tracking-[0.2em] text-lime-deep uppercase">
                        {step.key}
                      </span>
                    </div>
                    <div className="sm:pt-1.5">
                      <h3 className="font-display text-[clamp(1.375rem,2.5vw,2rem)] font-semibold tracking-tight-2 text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-stone">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}