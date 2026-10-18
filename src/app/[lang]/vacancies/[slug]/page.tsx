import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ArrowLink } from "@/components/ArrowLink";
import { CTASection } from "@/components/CTASection";
import { readVacancies } from "@/lib/vacancies-store";
import { formatDate, isOpen } from "@/lib/vacancy";
import { getSettings } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = (await readVacancies()).find((v) => v.slug === slug);
  if (!vacancy) return { title: "Vacancy — Wisdom" };
  return {
    title: vacancy.title,
    description: vacancy.summary,
  };
}

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [vacancy, settings, t] = await Promise.all([
    (await readVacancies()).find((v) => v.slug === slug),
    getSettings(L),
    Promise.resolve(getDictionary(L)),
  ]);
  if (!vacancy || !isOpen(vacancy)) notFound();
  const p = t.pages.vacancies;

  const applyHref = `mailto:${settings.email}?subject=${encodeURIComponent(
    `Application — ${vacancy.title}`,
  )}`;

  const positionRows = [
    { label: p.department, value: vacancy.department },
    { label: p.location, value: vacancy.location },
    { label: p.type, value: vacancy.type },
    { label: p.posted, value: formatDate(vacancy.postedDate) },
    { label: p.closing, value: formatDate(vacancy.closingDate) },
  ];

  return (
    <>
      <section className="bg-forest pt-32 pb-20 text-ivory sm:pt-40 sm:pb-24">
        <div className="container-site">
          <Reveal>
            <p className="label text-lime">{p.label} — {vacancy.department}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-7 max-w-[20ch] text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-tight-2 text-ivory">
              {vacancy.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[0.875rem] text-ivory/75">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-lime" />
                {vacancy.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={15} className="text-lime" />
                {vacancy.type}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={15} className="text-lime" />
                {p.closing} {formatDate(vacancy.closingDate)}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_minmax(0,340px)] lg:gap-20">
          <div className="flex flex-col gap-14">
            <div>
              <Reveal>
                <p className="label text-lime-deep">{p.aboutRole}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[68ch] whitespace-pre-line text-[1.0625rem] leading-relaxed text-stone">
                  {vacancy.description}
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <p className="label text-lime-deep">{p.requirements}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-6 flex max-w-[68ch] flex-col gap-3">
                  {vacancy.requirements
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-lime-deep" />
                        <span className="text-[1.0625rem] leading-relaxed text-stone">{item}</span>
                      </li>
                    ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <a href={applyHref} className="btn btn-dark w-fit">
                <Send size={16} />
                {t.common.sendApplication}
              </a>
              <p className="mt-4 max-w-[52ch] text-[0.8125rem] leading-relaxed text-stone">
                {p.applyNote}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 lg:pt-8">
            <Reveal delay={0.1}>
              <div className="border border-line bg-white p-7">
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-lime-deep uppercase">
                  {p.positionDetails}
                </p>
                <dl className="mt-6 flex flex-col gap-4">
                  {positionRows.map((row) => (
                    <div key={row.label} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                      <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-stone uppercase">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] font-medium text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="border border-line bg-sand p-7">
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-stone uppercase">
                  {p.applicationProcess}
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-stone">
                  {p.applicationProcessText}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ArrowLink href="/vacancies">{t.common.allVacancies}</ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        label={t.cta.vacancyDetail.label}
        heading={t.cta.vacancyDetail.heading}
        text={t.cta.vacancyDetail.text}
        primaryHref="/vacancies"
        primaryLabel={t.cta.vacancyDetail.primary}
        secondaryHref="/contact"
        secondaryLabel={t.cta.vacancyDetail.secondary}
        image={images.workshop}
        alt="Opportunities at Wisdom"
      />
    </>
  );
}