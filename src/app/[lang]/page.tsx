import { Hero } from "@/components/Hero";
import {
  CooperativeIdea,
  SavingsSection,
  LoansSection,
  WhyWisdom,
  StatsSection,
  MembershipSection,
  CommunitySection,
  EducationSection,
  NewsSection,
} from "@/components/sections/HomeSections";
import { Marquee, GrowLine } from "@/components/Marquee";
import { CTASection } from "@/components/CTASection";
import { getHero } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [hero, t] = await Promise.all([getHero(L), Promise.resolve(getDictionary(L))]);

  return (
    <>
      <Hero hero={hero} t={t} />
      <CooperativeIdea t={t} lang={L} />
      <Marquee items={t.marquee} />
      <SavingsSection t={t} lang={L} />
      <GrowLine />
      <LoansSection t={t} lang={L} />
      <WhyWisdom t={t} lang={L} />
      <StatsSection t={t} lang={L} />
      <MembershipSection t={t} lang={L} />
      <CommunitySection t={t} lang={L} />
      <EducationSection t={t} lang={L} />
      <NewsSection t={t} lang={L} />
      <GrowLine />
      <CTASection
        showImage={false}
        label={t.cta.home.label}
        heading={t.cta.home.heading}
        text={t.cta.home.text}
        primaryHref="/membership"
        primaryLabel={t.cta.home.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.home.secondary}
        image={images.finalCta}
        alt="A Wisdom member looking toward the future with confidence"
      />
    </>
  );
}