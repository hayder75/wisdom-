import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/ArticleCard";
import { CTASection } from "@/components/CTASection";
import { getArticles } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & Stories",
  description:
    "News, announcements, member stories and community updates from Wisdom SACCO.",
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [{ news }, t] = await Promise.all([getArticles(L), Promise.resolve(getDictionary(L))]);
  const featured = news[0];
  const rest = news.slice(1);
  const p = t.pages.news;

  return (
    <>
      <PageHeader label={p.label} heading={p.heading} description={p.description} />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-wrap gap-2.5">
              {p.categories.map((category) => (
                <span
                  key={category}
                  className="border border-ink/15 bg-white px-5 py-2.5 text-[0.8125rem] font-semibold tracking-[0.14em] text-stone uppercase"
                >
                  {category}
                </span>
              ))}
            </div>
          </Reveal>

          {featured ? (
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
                  {rest.map((article) => (
                    <ArticleCard
                      key={article.slug}
                      basePath="/news"
                      slug={article.slug}
                      category={article.category}
                      title={article.title}
                      short={article.short}
                      image={article.image}
                      date={article.date}
                      t={t}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <Reveal delay={0.1}>
              <p className="mt-14 border border-line bg-white p-8 text-[0.9375rem] text-stone">
                {t.home.newsEmpty}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <p className="mt-12 max-w-[64ch] text-[0.8125rem] leading-relaxed text-stone">
              {p.note}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        label={t.cta.news.label}
        heading={t.cta.news.heading}
        text={t.cta.news.text}
        primaryHref="/membership"
        primaryLabel={t.cta.news.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.news.secondary}
        image={images.workshop}
        alt="The Wisdom community gathering together"
      />
    </>
  );
}