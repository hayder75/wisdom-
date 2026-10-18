import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { CTASection } from "@/components/CTASection";
import { getArticles } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Financial Education",
  description:
    "Wisdom's financial education library — saving, budgeting, responsible borrowing and financial planning for members.",
};

export default async function FinancialEducationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [{ education }, t] = await Promise.all([getArticles(L), Promise.resolve(getDictionary(L))]);
  const p = t.pages.education;

  return (
    <>
      <PageHeader label={p.label} heading={p.heading} description={p.description} />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site">
          <div className="grid gap-6">
            <ImageReveal className="card relative aspect-[16/9] bg-forest-deep">
              <Image
                src={images.budgeting}
                alt={p.libraryHeading}
                fill
                sizes="100vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
                <span className="placeholder-tag w-fit border border-lime/40 bg-lime/10 text-lime">
                  {p.library}
                </span>
                <h2 className="font-display mt-5 max-w-[20ch] text-[clamp(2rem,5vw,4rem)] leading-[0.92] font-medium tracking-tight-2 text-ivory">
                  {p.libraryHeading}
                </h2>
                <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ivory/75">
                  {p.libraryText}
                </p>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-site">
          <SectionHeader label={p.topics} heading={p.topicsHeading} description={p.topicsDesc} />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {education.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.05}>
                <Link
                  href={`/financial-education/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[2px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-[0_16px_40px_-20px_rgba(32,34,137,0.3)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-lime-deep uppercase">
                      {article.topic}
                    </span>
                    <h3 className="font-display mt-3 text-[1.5rem] leading-[1.05] font-semibold tracking-tight-2 text-forest">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">
                      {article.short}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors group-hover:text-lime-deep">
                      {t.common.readArticle}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        label={t.cta.education.label}
        heading={t.cta.education.heading}
        text={t.cta.education.text}
        primaryHref="/membership"
        primaryLabel={t.cta.education.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.education.secondary}
        image={images.education}
        alt="Members learning together at Wisdom"
      />
    </>
  );
}