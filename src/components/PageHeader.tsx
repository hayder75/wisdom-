import { Reveal } from "@/components/Reveal";
import { AnimatedWords } from "@/components/AnimatedText";
import { getFeatures, getSettings } from "@/lib/content-store";

interface PageHeaderProps {
  label: string;
  heading: string;
  description?: string;
  tag?: string;
}

export async function PageHeader({ label, heading, description, tag }: PageHeaderProps) {
  const [features, settings] = await Promise.all([getFeatures(), getSettings()]);
  const journeySteps = features.growthJourney.slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-forest pt-32 pb-20 text-ivory sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/5" />
      </div>

      <div className="container-site relative z-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="label text-lime">{label}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-7 max-w-[18ch] text-balance whitespace-pre-line text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-tight-2 text-ivory">
              <AnimatedWords text={heading} />
            </h1>
          </Reveal>
          {tag ? (
            <Reveal delay={0.15}>
              <span className="placeholder-tag mt-6 inline-block border border-lime/50 bg-lime/10 text-lime">
                {tag}
              </span>
            </Reveal>
          ) : null}
          {description ? (
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ivory/70">
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="hidden flex-col justify-end lg:flex">
          <Reveal delay={0.15}>
            <div className="border border-white/15 p-8">
              <p className="text-[0.6875rem] font-semibold tracking-[0.22em] text-ivory/50 uppercase">
                {settings.tagline.toUpperCase()}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-6">
                {journeySteps.map((step, i) => (
                  <div key={step.key}>
                    <span className="font-display text-[0.8125rem] font-bold text-lime">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1.5 text-[0.8125rem] font-semibold tracking-[0.16em] text-ivory/80 uppercase">
                      {step.key}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}