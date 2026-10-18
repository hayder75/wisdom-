import type { Metadata } from "next";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowLink } from "@/components/ArrowLink";
import { ImageReveal } from "@/components/ImageReveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SavingsCard } from "@/components/SavingsCard";
import { ProductBrochures } from "@/components/ProductBrochures";
import { getSavings } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Savings",
  description:
    "Explore Wisdom SACCO's savings services. Members build their own balances while the cooperative grows on the strength of combined savings.",
};

export default async function SavingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [data, t] = await Promise.all([getSavings(L), Promise.resolve(getDictionary(L))]);
  const { intro, products } = data;
  const p = t.pages.savings;

  return (
    <>
      <PageHeader
        label={p.label}
        heading={p.heading}
        description={p.description}
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
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

          <ImageReveal className="card relative aspect-[4/3]">
            <Image
              src="/saving.webp"
              alt={p.label}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </ImageReveal>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader
              label={p.services}
              heading={p.servicesHeading}
              description={p.servicesDesc}
            />
          </div>

          {products.length > 0 ? (
            <Reveal delay={0.1}>
              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, i) => (
                  <SavingsCard
                    key={product.slug}
                    product={product}
                    compact
                    index={i + 1}
                    t={t}
                  />
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <p className="mt-14 border border-line bg-white p-8 text-[0.9375rem] text-stone">
                {p.faqEmpty}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-24">
          <div>
            <SectionHeader label={p.faq} heading={p.faqHeading} />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[44ch] text-[1.0625rem] leading-relaxed text-stone">
                {p.faqNote}
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-8">
                <Link href="/contact" className="btn btn-dark">
                  {t.common.contactWisdom}
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <FAQAccordion items={p.faqItems} />
          </Reveal>
        </div>
      </section>

      <ProductBrochures lang={L} />
    </>
  );
}