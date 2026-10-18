import type { Metadata } from "next";
import Image from "next/image";
import { Calculator } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowLink } from "@/components/ArrowLink";
import { ImageReveal } from "@/components/ImageReveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { LoanCard } from "@/components/LoanCard";
import { ProductBrochures } from "@/components/ProductBrochures";
import { getLoans } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Loans & Credit",
  description:
    "Explore Wisdom SACCO's credit services. Members access credit under Wisdom's policies, assessed fairly and transparently.",
};

export default async function LoansPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [{ intro, products }, t] = await Promise.all([
    getLoans(L),
    Promise.resolve(getDictionary(L)),
  ]);
  const p = t.pages.loans;

  return (
    <>
      <PageHeader label={p.label} heading={p.heading} description={p.description} />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <ImageReveal className="card relative aspect-[4/3] lg:order-2">
            <Image
              src={images.loans}
              alt={p.label}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </ImageReveal>
          <div className="lg:order-1">
            <Reveal>
              <p className="label text-stone">{p.idea}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-7 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.95] font-medium tracking-tight-2 text-ink">
                {intro.heading.replace(/\n/g, " ")}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-col gap-6 text-[1.0625rem] leading-relaxed text-stone">
                <p>{intro.statement}</p>
                <p>{p.ideaNote}</p>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10">
                <ArrowLink href="/membership">{t.common.becomeMember}</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-ivory sm:py-28">
        <div className="container-site">
          <SectionHeader
            dark
            label={p.services}
            heading={p.servicesHeading}
            description={intro.disclaimer}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((loan, i) => (
              <LoanCard key={loan.slug} loan={loan} index={i} dark t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
            <div>
              <SectionHeader label={p.calculator} heading={p.calculatorHeading} description={p.calculatorText} />
            </div>

            <Reveal delay={0.1}>
              <div className="card overflow-hidden border border-line bg-white">
                <div className="border-b border-line bg-forest p-7 sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center bg-lime text-ink">
                      <Calculator size={18} />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.375rem] font-semibold tracking-tight-2 text-ivory">
                        Illustrative estimate
                      </h3>
                      <p className="text-[0.8125rem] text-ivory/60">
                        {t.pages.loans.calculatorText}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 p-7 sm:grid-cols-3 sm:p-9">
                  {[
                    { label: "Loan amount (ETB)", value: "[OFFICIAL]" },
                    { label: "Repayment period", value: "[OFFICIAL]" },
                    { label: "Rate", value: "[OFFICIAL]" },
                  ].map((field) => (
                    <div key={field.label} className="rounded-[2px] border border-dashed border-ink/20 bg-ivory p-5">
                      <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-stone uppercase">
                        {field.label}
                      </p>
                      <p className="font-display mt-2 text-[1.5rem] font-semibold tracking-tight-2 text-ink/60">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line bg-sand px-7 py-6 sm:px-9">
                  <p className="text-[0.8125rem] leading-relaxed text-stone">
                    {t.pages.loans.calculatorText}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-site">
          <Reveal>
            <p className="label text-stone">{p.process}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {p.processSteps.map((step) => (
                <div key={step.number} className="rounded-[2px] border border-line bg-white p-7 sm:p-8">
                  <span className="font-display text-[0.8125rem] font-bold text-lime-deep">
                    {step.number}
                  </span>
                  <h3 className="font-display mt-4 text-[1.375rem] font-semibold tracking-tight-2 text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{step.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-[70ch] text-[0.8125rem] leading-relaxed text-stone">
              {p.processNote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
          <div>
            <SectionHeader label={p.faq} heading={p.faqHeading} />
            <Reveal delay={0.2}>
              <div className="mt-8">
                <ArrowLink href="/contact">{t.common.contactWisdom}</ArrowLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FAQAccordion items={p.faqItems} />
          </Reveal>
        </div>
      </section>

      <ProductBrochures lang={L} />

      <CTASection
        label={t.cta.loans.label}
        heading={t.cta.loans.heading}
        text={t.cta.loans.text}
        primaryHref="/membership"
        primaryLabel={t.cta.loans.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.loans.secondary}
        image={images.education}
        alt="A member planning the next step with Wisdom"
      />
    </>
  );
}