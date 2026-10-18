import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Reveal } from "@/components/Reveal";
import { ArrowLink } from "@/components/ArrowLink";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { GrowthJourney } from "@/components/GrowthJourney";
import { SavingsCard } from "@/components/SavingsCard";
import {
  getArticles,
  getFeatures,
  getLoans,
  getMembership,
  getSavings,
  getStats,
} from "@/lib/content-store";
import type { Dictionary, Lang } from "@/lib/i18n";

interface SectionProps {
  t: Dictionary;
  lang: Lang;
}

export async function CooperativeIdea({ t, lang }: SectionProps) {
  const { growthJourney } = await getFeatures(lang);
  return <GrowthJourney steps={growthJourney} t={t} />;
}

export async function SavingsSection({ t, lang }: SectionProps) {
  const { intro, products } = await getSavings(lang);
  const featured = products.find((p) => String(p.featured) === "true") ?? products[0];

  return (
    <section className="bg-forest py-28 text-ivory sm:py-40">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader dark label={intro.label} heading={intro.heading} />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ivory/70">
                {intro.statement}
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-10">
                <ArrowLink href="/savings" dark>
                  {t.common.exploreSavings}
                </ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            {featured ? (
              <SavingsCard product={featured} featured index={1} t={t} />
            ) : (
              <Reveal>
                <div className="border border-white/15 bg-forest-soft/40 p-10">
                  <p className="text-[0.9375rem] text-ivory/70">{t.home.savingsEmpty}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function LoansSection({ t, lang }: SectionProps) {
  const { intro, products } = await getLoans(lang);
  const featuredLoans = products.slice(0, 4);

  return (
    <section className="bg-ivory py-28 sm:py-40">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader label={intro.label} heading={intro.heading} />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-stone">
                {intro.statement}
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-10">
                <ArrowLink href="/loans">{t.common.exploreLoans}</ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {featuredLoans.map((loan, i) => (
              <Reveal key={loan.slug} delay={i * 0.06}>
                <Link
                  href={`/loans/${loan.slug}`}
                  className="group flex h-full flex-col justify-between border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-[0_16px_40px_-20px_rgba(32,34,137,0.35)] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="label text-lime-deep">{t.home.creditCardLabel}</span>
                    <span className="font-display text-[0.8125rem] font-bold text-stone/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.125rem)] font-semibold tracking-tight-2 text-forest">
                      {loan.name}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">
                      {loan.purpose}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                    <span className="text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors group-hover:text-lime-deep">
                      {t.common.explore}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-ink transition-colors duration-300 group-hover:text-lime-deep"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-12 border-t border-line pt-8 text-[0.8125rem] leading-relaxed text-stone">
            {intro.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export async function WhyWisdom({ t, lang }: SectionProps) {
  const { whyWisdom } = await getFeatures(lang);

  return (
    <section className="bg-sand py-28 sm:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="label text-lime-deep">{t.home.whyWisdomLabel}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-7 text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.92] font-medium tracking-tight-2 text-forest">
              {t.home.whyWisdomHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-[44ch] text-[1.0625rem] leading-relaxed text-stone">
              {t.home.whyWisdomText}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {whyWisdom.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <div className="group border-b border-line py-9 first:border-t">
                <div className="flex items-baseline justify-between gap-6">
                  <span className="font-display text-[0.8125rem] font-bold text-lime-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display flex-1 text-right text-[clamp(1.5rem,3.5vw,2.75rem)] leading-none font-medium tracking-tight-2 text-forest transition-colors duration-300 group-hover:text-lime-deep">
                    {value.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-[52ch] text-right text-[1.0625rem] leading-relaxed text-stone">
                  {value.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function StatsSection({ t, lang }: SectionProps) {
  const { stats } = await getStats(lang);

  return (
    <section className="bg-navy py-28 text-ivory sm:py-32">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[34ch]">
            <Reveal>
              <p className="label text-lime">{t.home.statsLabel}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] font-medium tracking-tight-2 text-ivory">
                {t.home.statsHeading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-ivory/60">
              {t.home.statsNote}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="border-t border-white/15 pt-7 lg:border-t-0 lg:border-l lg:border-white/15 lg:pt-0 lg:pl-6">
                <AnimatedNumber
                  value={stat.value}
                  className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-medium tracking-tight-2 text-ivory"
                />
                <p className="mt-3 text-[0.8125rem] font-semibold tracking-[0.16em] text-lime uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 text-[0.75rem] leading-relaxed text-ivory/45">{stat.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function MembershipSection({ t, lang }: SectionProps) {
  const { benefits } = await getMembership(lang);

  return (
    <section className="bg-ivory py-28 sm:py-40">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            align="center"
            label={t.home.membershipLabel}
            heading={t.home.membershipHeading}
          />
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-[52ch] text-center text-[1.0625rem] leading-relaxed text-stone">
              {t.home.membershipText}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((item, i) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(32,34,137,0.3)]"
                >
                  <span className="font-display text-[0.8125rem] font-bold text-lime-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-[1.25rem] font-semibold tracking-tight-2 text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-stone">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link href="/membership" className="btn btn-dark">
                {t.common.becomeMember}
                <ArrowUpRight size={18} />
              </Link>
              <Link href="/membership" className="btn btn-outline-ink">
                {t.common.howMembershipWorks}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CommunitySection({ t }: SectionProps) {
  return (
    <section className="relative overflow-hidden bg-forest-deep">
      <div className="absolute inset-0">
        <Image
          src="/hero-background.jpg"
          alt={t.home.communityLabel}
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/50 to-forest-deep/85" />
      </div>

      <div className="container-site relative z-10 py-28 sm:py-44">
        <div className="max-w-3xl">
          <Reveal>
            <p className="label text-lime">{t.home.communityLabel}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-8 text-balance text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.9] font-medium tracking-tight-2 text-ivory">
              {t.home.communityHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ivory/70">
              {t.home.communityText}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.28}>
          <div className="mt-16 grid max-w-3xl grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-4">
            {t.home.communityTags.map((tag, i) => (
              <div
                key={tag}
                className="flex items-center justify-between gap-3 bg-forest-deep/70 px-4 py-3.5 backdrop-blur-sm"
              >
                <span className="font-display text-[0.6875rem] font-bold text-lime">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-ivory/85 uppercase">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export async function EducationSection({ t, lang }: SectionProps) {
  const { education } = await getArticles(lang);
  const topics = education.slice(0, 6);

  return (
    <section className="bg-ivory py-28 sm:py-40">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[36ch]">
            <SectionHeader label={t.home.educationLabel} heading={t.home.educationHeading} />
          </div>
          <Reveal delay={0.2}>
            <div className="lg:pb-2">
              <ArrowLink href="/financial-education">{t.common.browseLibrary}</ArrowLink>
            </div>
          </Reveal>
        </div>

        {topics.length === 0 ? (
          <Reveal delay={0.1}>
            <p className="mt-14 border border-line bg-white p-8 text-[0.9375rem] text-stone">
              {t.home.educationEmpty}
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, i) => (
              <Reveal key={topic.slug} delay={i * 0.05}>
                <Link
                  href={`/financial-education/${topic.slug}`}
                  className="group flex h-full flex-col justify-between border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-[0_16px_40px_-20px_rgba(32,34,137,0.3)] sm:p-8"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-lime-deep uppercase">
                        {t.home.educationTopic}
                      </span>
                      <span className="font-display text-[0.8125rem] font-bold text-stone/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight-2 text-forest">
                      {topic.topic}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{topic.short}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors group-hover:text-lime-deep">
                    <span>{t.common.readArticle}</span>
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export async function NewsSection({ t, lang }: SectionProps) {
  const { news } = await getArticles(lang);
  const featured = news[0];
  const rest = news.slice(1, 3);

  return (
    <section className="bg-sand py-28 sm:py-40">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[36ch]">
            <SectionHeader label={t.home.newsLabel} heading={t.home.newsHeading} />
          </div>
          <Reveal delay={0.2}>
            <div className="lg:pb-2">
              <ArrowLink href="/news">{t.common.allNews}</ArrowLink>
            </div>
          </Reveal>
        </div>

        {!featured ? (
          <Reveal delay={0.1}>
            <p className="mt-14 border border-line bg-white p-8 text-[0.9375rem] text-stone">
              {t.home.newsEmpty}
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <ArticleCard
              featured
              basePath="/news"
              slug={featured.slug}
              category={featured.category}
              title={featured.title}
              short={featured.short}
              image={featured.image}
              date={featured.date}
              t={t}
            />
            {rest.length > 0 ? (
              <div className="grid gap-6">
                {rest.map((article, i) => (
                  <ArticleCard
                    key={article.slug}
                    basePath="/news"
                    slug={article.slug}
                    category={article.category}
                    title={article.title}
                    short={article.short}
                    image={article.image}
                    date={article.date}
                    index={i + 2}
                    t={t}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}