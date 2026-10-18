import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { ArrowLink } from "@/components/ArrowLink";
import { CTASection } from "@/components/CTASection";
import { getFeatures, getSettings } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wisdom is a member-owned Savings and Credit Cooperative (SACCO) built around its members and community.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [{ whyWisdom }, settings, t] = await Promise.all([
    getFeatures(L),
    getSettings(L),
    Promise.resolve(getDictionary(L)),
  ]);
  const p = t.pages.about;

  return (
    <>
      <PageHeader label={p.label} heading={p.heading} description={p.description} />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-stone">{p.whoWeAre}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-6 text-[1.0625rem] leading-relaxed text-stone">
                {p.whoWeAreParas.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <ImageReveal className="card relative aspect-[4/3]">
              <Image
                src="/photo_2026-08-08_21-01-30.jpg"
                alt={p.whoWeAre}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </ImageReveal>
            <ImageReveal className="card relative aspect-[16/10]">
              <Image
                src={images.landscape}
                alt="The Ethiopian landscape Wisdom calls home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="label text-stone">{p.visionMission}</p>
            <h2 className="font-display mt-7 text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] font-medium tracking-tight-2 text-ink">
              {settings.tagline}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-8">
              <div className="border-b border-line pb-8">
                <h3 className="font-display text-[1.5rem] font-semibold tracking-tight-2 text-ink">
                  {p.vision}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-stone">{p.visionText}</p>
              </div>
              <div className="border-b border-line pb-8">
                <h3 className="font-display text-[1.5rem] font-semibold tracking-tight-2 text-ink">
                  {p.mission}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-stone">{p.missionText}</p>
              </div>
              <div className="border-b border-line pb-8">
                <h3 className="font-display text-[1.5rem] font-semibold tracking-tight-2 text-ink">
                  {p.story}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-stone">{p.storyText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="label text-stone">{p.coreValues}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-7 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.92] font-medium tracking-tight-2 text-ink">
                {p.coreValues}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-[44ch] text-[1.0625rem] leading-relaxed text-stone">
                {p.valuesIntro}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col">
            {whyWisdom.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <div className="group border-b border-line py-9 first:border-t">
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-none font-medium tracking-tight-2 text-ink transition-colors duration-300 group-hover:text-lime-deep">
                      {value.title}
                    </h3>
                    <span className="font-display text-[0.8125rem] font-bold text-stone/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-stone">
                    {value.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-ivory sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="label text-lime">{p.governance}</p>
            <h2 className="font-display mt-7 text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] font-medium tracking-tight-2">
              {p.governanceHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-6">
              {p.governanceItems.map((item) => (
                <div key={item.title} className="border-b border-ivory/15 pb-6">
                  <h3 className="font-display text-[1.375rem] font-semibold tracking-tight-2 text-ivory">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ivory/60">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-24">
        <div className="container-site flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal>
            <h2 className="font-display max-w-[22ch] text-[clamp(1.75rem,4vw,3.25rem)] leading-[0.95] font-medium tracking-tight-2 text-ink">
              {p.joinCta}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <ArrowLink href="/membership">{t.pages.membership.label}</ArrowLink>
          </Reveal>
        </div>
      </section>

      <CTASection
        showImage={false}
        label={t.cta.home.label}
        heading={t.cta.home.heading}
        text={t.cta.home.text}
        primaryHref="/membership"
        primaryLabel={t.cta.home.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.home.secondary}
        image={images.teamTech}
        alt="Wisdom members building their financial future together"
      />
    </>
  );
}