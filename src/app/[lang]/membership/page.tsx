import type { Metadata } from "next";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MembershipJourney } from "@/components/MembershipJourney";
import { MembershipForm } from "@/components/MembershipForm";
import { CTASection } from "@/components/CTASection";
import { getMembership, getSettings } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Become a member of Wisdom SACCO. Join a cooperative where saving, credit and community work together.",
};

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [data, settings, t] = await Promise.all([
    getMembership(L),
    getSettings(L),
    Promise.resolve(getDictionary(L)),
  ]);
  const { benefits, journey, rights, responsibilities } = data;
  const p = t.pages.membership;

  return (
    <>
      <PageHeader label={p.label} heading={p.heading} description={p.description} />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
          <div>
            <SectionHeader label={p.why} heading={p.whyHeading} />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-stone">
                {p.whyText}
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-[2px] border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(32,34,137,0.3)] sm:p-8">
                  <span className="font-display text-[0.8125rem] font-bold text-lime-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-[1.5rem] font-semibold tracking-tight-2 text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-ivory sm:py-28">
        <div className="container-site">
          <SectionHeader dark label={p.how} heading={p.howHeading} description={p.howText} />
          <div className="mt-14">
            <MembershipJourney steps={journey} />
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-stone">{p.eligibility}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-7 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] font-medium tracking-tight-2 text-ink">
                {p.eligibilityHeading}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-col gap-6 text-[1.0625rem] leading-relaxed text-stone">
                <p>{p.eligibilityText}</p>
                <p className="text-[0.9375rem]">
                  <span className="font-semibold text-ink">{p.requirements}</span>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="rounded-[2px] border border-line bg-white p-7 sm:p-9">
                <h3 className="font-display text-[1.375rem] font-semibold tracking-tight-2 text-ink">
                  {p.responsibilities}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-lime-deep" />
                      <span className="text-[0.9375rem] leading-relaxed text-stone">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="rounded-[2px] border border-line bg-white p-7 sm:p-9">
                <h3 className="font-display text-[1.375rem] font-semibold tracking-tight-2 text-ink">
                  {p.rights}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {rights.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-lime-deep" />
                      <span className="text-[0.9375rem] leading-relaxed text-stone">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28" id="apply">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-stone">{p.apply}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-7 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] font-medium tracking-tight-2 text-ink">
                {p.applyHeading}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-stone">
                {p.applyText}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/branches" className="btn btn-dark">
                  {p.findBranch}
                  <ArrowUpRight size={18} />
                </Link>
                <Link href="/contact" className="btn btn-outline-ink">
                  {t.common.contactWisdom}
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <MembershipForm email={settings.email} t={t} />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
          <div>
            <SectionHeader label={p.faq} heading={p.faqHeading} />
          </div>
          <Reveal delay={0.1}>
            <FAQAccordion items={p.faqItems} />
          </Reveal>
        </div>
      </section>

      <CTASection
        showImage={false}
        label={t.cta.membership.label}
        heading={t.cta.membership.heading}
        text={t.cta.membership.text}
        primaryHref="/membership#apply"
        primaryLabel={t.cta.membership.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.membership.secondary}
        image={images.signing}
        alt="A new member beginning their journey with Wisdom"
      />
    </>
  );
}