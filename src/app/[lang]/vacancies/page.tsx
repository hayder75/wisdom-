import type { Metadata } from "next";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowUpRight, Calendar, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { readVacancies } from "@/lib/vacancies-store";
import { formatDate, isOpen } from "@/lib/vacancy";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vacancies",
  description:
    "Open vacancies at Wisdom SACCO. Join the team behind the cooperative.",
};

export const dynamic = "force-dynamic";

export default async function VacanciesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const t = getDictionary(L);
  const p = t.pages.vacancies;
  const vacancies = (await readVacancies()).filter(isOpen);

  return (
    <>
      <PageHeader label={p.label} heading={p.heading} description={p.description} />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site">
          {vacancies.length === 0 ? (
            <Reveal>
              <div className="border border-line bg-white p-10 sm:p-14">
                <p className="label text-lime-deep">{p.emptyLabel}</p>
                <h2 className="font-display mt-6 max-w-[24ch] text-[clamp(2rem,5vw,4rem)] leading-[0.95] font-medium tracking-tight-2 text-forest">
                  {p.emptyHeading}
                </h2>
                <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-stone">
                  {p.emptyText}
                </p>
                <div className="mt-10">
                  <Link href="/contact" className="btn btn-dark">
                    {t.common.contactWisdom}
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col border-t border-line">
              {vacancies.map((vacancy, i) => (
                <Reveal key={vacancy.id} delay={i * 0.05}>
                  <Link
                    href={`/vacancies/${vacancy.slug}`}
                    className="group flex flex-col gap-6 border-b border-line py-9 transition-all duration-300 hover:bg-white/60 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10"
                  >
                    <span className="font-display text-[0.8125rem] font-bold text-lime-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-lime-deep uppercase">
                        {vacancy.department}
                      </p>
                      <h2 className="font-display mt-2 text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.02] font-semibold tracking-tight-2 text-forest transition-colors duration-300 group-hover:text-lime-deep">
                        {vacancy.title}
                      </h2>
                      <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-stone">
                        {vacancy.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-stone">
                        <span className="inline-flex items-center gap-2">
                          <MapPin size={14} className="text-lime-deep" />
                          {vacancy.location}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock size={14} className="text-lime-deep" />
                          {vacancy.type}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Calendar size={14} className="text-lime-deep" />
                          {p.closing} {formatDate(vacancy.closingDate)}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors group-hover:text-lime-deep lg:justify-self-end">
                      <span>{t.common.viewVacancy}</span>
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

      <CTASection
        label={t.cta.vacancies.label}
        heading={t.cta.vacancies.heading}
        text={t.cta.vacancies.text}
        primaryHref="/contact"
        primaryLabel={t.cta.vacancies.primary}
        secondaryHref="/about"
        secondaryLabel={t.cta.vacancies.secondary}
        image={images.teamTech}
        alt="The team working behind Wisdom"
      />
    </>
  );
}