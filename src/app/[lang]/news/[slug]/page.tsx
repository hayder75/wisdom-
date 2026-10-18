import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { CTASection } from "@/components/CTASection";
import { getArticles } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const { news } = await getArticles(lang as Lang);
  const article = news.find((a) => a.slug === slug);
  if (!article) return { title: "News — Wisdom" };
  return {
    title: article.title,
    description: article.short,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [{ news }, t] = await Promise.all([getArticles(L), Promise.resolve(getDictionary(L))]);
  const article = news.find((a) => a.slug === slug);
  if (!article) notFound();
  const d = t.detail;

  return (
    <>
      <section className="bg-forest pt-40 pb-16 text-ivory sm:pt-48 sm:pb-20">
        <div className="container-site">
          <Reveal>
            <div className="flex items-center gap-3">
              <p className="label text-lime">{article.category}</p>
              <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-ivory/50 uppercase">
                {article.date}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-7 max-w-[20ch] text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-tight-2">
              {article.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site">
          <ImageReveal className="card relative aspect-[16/9]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </ImageReveal>
          <div className="mx-auto mt-14 max-w-[70ch]">
            {article.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1.0625rem] leading-relaxed text-stone [&:not(:first-child)]:mt-6"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-12 rounded-[2px] border border-line bg-sand p-7">
              <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-stone uppercase">
                {t.common.contactWisdom}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">
                {d.moreInfo}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        label={t.cta.newsDetail.label}
        heading={t.cta.newsDetail.heading}
        text={t.cta.newsDetail.text}
        primaryHref="/news"
        primaryLabel={t.cta.newsDetail.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.newsDetail.secondary}
        image={images.friends}
        alt="The Wisdom community"
      />
    </>
  );
}