import type { Metadata } from "next";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { getSavings } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const { products } = await getSavings(lang as Lang);
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Savings — Wisdom" };
  return {
    title: product.name,
    description: product.short,
  };
}

export default async function SavingsDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [{ products }, t] = await Promise.all([getSavings(L), Promise.resolve(getDictionary(L))]);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const d = t.detail;

  return (
    <>
      <section className="bg-forest pt-40 pb-16 text-ivory sm:pt-48 sm:pb-20">
        <div className="container-site">
          <Reveal>
            <p className="label text-lime">{t.pages.savings.label}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-7 max-w-[20ch] text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-tight-2">
              {product.name}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ivory/70">
              {product.description}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span className="placeholder-tag border border-lime/40 bg-lime/10 text-lime">
                {product.audience}
              </span>
              <span className="placeholder-tag border border-ivory/25 bg-ivory/5 text-ivory/70">
                {d.contactForTerms}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-stone">{d.aboutThisService}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-6 text-[1.0625rem] leading-relaxed text-stone">
                <p>{product.description}</p>
                <p>
                  <span className="font-semibold text-ink">{t.cards.keyBenefit}.</span>{" "}
                  {product.benefit}
                </p>
                <p>
                  <span className="font-semibold text-ink">{t.cards.whoItsFor}.</span>{" "}
                  {product.audience}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10">
                <Link href="/membership" className="btn btn-dark">
                  {t.common.becomeMember}
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>

          <ImageReveal className="card relative aspect-[4/5]">
            <Image
              src={images.savingsFeatured}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </ImageReveal>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-site">
          <Reveal>
            <p className="label text-stone">{d.keyDetails}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {product.sections.map((section) => (
                <div key={section.title} className="card border border-line bg-white p-7 sm:p-9">
                  <h2 className="font-display text-[1.375rem] font-semibold tracking-tight-2 text-ink">
                    {section.title}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-lime-deep" />
                        <span className="text-[0.9375rem] leading-relaxed text-stone">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-[2px] border border-line bg-white p-7 sm:p-9">
              <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-stone uppercase">
                {d.important}
              </p>
              <p className="mt-3 max-w-[70ch] text-[0.9375rem] leading-relaxed text-stone">
                {d.importantNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="label text-stone">{d.questions}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-7 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] font-medium tracking-tight-2 text-ink">
                {d.frequentlyAsked}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FAQAccordion items={product.faqs} />
          </Reveal>
        </div>
      </section>

      <CTASection
        label={t.cta.savingsDetail.label}
        heading={t.cta.savingsDetail.heading}
        text={t.cta.savingsDetail.text}
        primaryHref="/membership"
        primaryLabel={t.cta.savingsDetail.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.savingsDetail.secondary}
        image={images.savingsSecondaryTwo}
        alt="A Wisdom member planning their savings"
      />
    </>
  );
}