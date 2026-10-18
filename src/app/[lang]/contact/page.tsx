import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ArrowLink } from "@/components/ArrowLink";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Wisdom SACCO. Reach the cooperative directly for membership, savings, loans and general enquiries.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [settings, t] = await Promise.all([getSettings(L), Promise.resolve(getDictionary(L))]);
  const p = t.pages.contact;

  return (
    <>
      <PageHeader label={p.label} heading={p.heading} description={p.description} />

      <section className="bg-ivory py-20 sm:py-28" id="enquiry">
        <div className="container-site grid gap-16 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <Reveal>
              <p className="label text-stone">{p.details}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-5">
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-4 text-ink transition-colors hover:text-lime-deep"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-forest text-lime">
                    <Mail size={18} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold tracking-[0.18em] text-stone uppercase">
                      {p.email}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] font-medium">{settings.email}</span>
                  </span>
                </a>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-4 text-ink transition-colors hover:text-lime-deep"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-forest text-lime">
                    <Phone size={18} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold tracking-[0.18em] text-stone uppercase">
                      {p.phone}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] font-medium">{settings.phone}</span>
                  </span>
                </a>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-forest text-lime">
                    <MapPin size={18} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold tracking-[0.18em] text-stone uppercase">
                      {p.address}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] font-medium">
                      [OFFICIAL ADDRESS]
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-stone">
                      {settings.countryIndicator}
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-forest text-lime">
                    <Clock size={18} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold tracking-[0.18em] text-stone uppercase">
                      {p.hours}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] font-medium">
                      [OFFICIAL OFFICE HOURS]
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="border-t border-line pt-8">
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-stone uppercase">
                  {p.inPerson}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">
                  {p.inPersonText}
                </p>
                <div className="mt-5">
                  <ArrowLink href="/branches">{t.pages.membership.findBranch}</ArrowLink>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm email={settings.email} t={t} />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-24">
        <div className="container-site grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="rounded-[2px] border border-line bg-white p-7 sm:p-9">
              <h2 className="font-display text-[1.375rem] font-semibold tracking-tight-2 text-ink">
                {p.membershipTitle}
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">
                {p.membershipText}
              </p>
              <div className="mt-6">
                <ArrowLink href="/membership#apply">{t.pages.membership.apply}</ArrowLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[2px] border border-line bg-white p-7 sm:p-9">
              <h2 className="font-display text-[1.375rem] font-semibold tracking-tight-2 text-ink">
                {p.loanTitle}
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">
                {p.loanText}
              </p>
              <div className="mt-6">
                <ArrowLink href="/loans">{t.common.exploreLoans}</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}