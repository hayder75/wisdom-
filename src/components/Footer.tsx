import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { getLangLink, type Dictionary, type Lang } from "@/lib/i18n";
import type { SettingsDocument } from "@/lib/content-store";

interface FooterProps {
  settings: SettingsDocument;
  t: Dictionary;
  lang: Lang;
}

export function Footer({ settings, t, lang }: FooterProps) {
  const columns = [
    {
      title: t.footer.explore,
      links: [
        { label: t.footer.about, href: "/about" },
        { label: t.footer.savings, href: "/savings" },
        { label: t.footer.loans, href: "/loans" },
        { label: t.footer.membership, href: "/membership" },
      ],
    },
    {
      title: t.footer.resources,
      links: [
        { label: t.footer.financialEducation, href: "/financial-education" },
        { label: t.footer.news, href: "/news" },
        { label: t.footer.vacancies, href: "/vacancies" },
        { label: t.footer.branches, href: "/branches" },
      ],
    },
    {
      title: t.footer.support,
      links: [
        { label: t.footer.contact, href: "/contact" },
        { label: t.footer.branches, href: "/branches" },
        { label: t.footer.joinWisdom, href: "/membership" },
      ],
    },
  ];

  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="container-site pt-24 pb-10">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <LocalizedLink href="/" aria-label="Wisdom SACCO — home" className="inline-block">
              <Image
                src="/logo.png"
                alt="Wisdom SACCO"
                width={1254}
                height={1254}
                className="h-16 w-auto"
              />
            </LocalizedLink>
            <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-ivory/60">
              {settings.tagline}
            </p>
            <div className="mt-10 flex flex-col gap-3 text-[0.875rem]">
              <span className="flex items-center gap-3 text-ivory/70">
                <MapPin size={16} className="text-lime" />
                {settings.country}
              </span>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="flex w-fit items-center gap-3 text-ivory/70 transition-colors hover:text-ivory"
              >
                <Phone size={16} className="text-lime" />
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex w-fit items-center gap-3 text-ivory/70 transition-colors hover:text-ivory"
              >
                <Mail size={16} className="text-lime" />
                {settings.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="border-b border-white/10 pb-3 text-[0.6875rem] font-semibold tracking-[0.22em] text-lime uppercase">
                  {col.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <LocalizedLink
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-ivory/75 transition-colors hover:text-lime"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[0.8125rem] text-ivory/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {settings.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <LocalizedLink href="/contact" className="transition-colors hover:text-ivory/70">
              {t.footer.privacy}
            </LocalizedLink>
            <LocalizedLink href="/contact" className="transition-colors hover:text-ivory/70">
              {t.footer.terms}
            </LocalizedLink>
            <div className="flex items-center border border-ivory/20">
              {(["en", "am"] as const).map((l, i) => (
                <LocalizedLink
                  key={l}
                  href={getLangLink(l, `/${lang}`)}
                  className={`px-2.5 py-1 text-[0.75rem] font-semibold uppercase transition-colors ${
                    lang === l ? "bg-lime text-ink" : "text-ivory/60 hover:text-ivory"
                  } ${i > 0 ? "border-l border-ivory/20" : ""}`}
                >
                  {l === "en" ? "EN" : "አማ"}
                </LocalizedLink>
              ))}
            </div>
            <p className="tracking-[0.22em] uppercase">{settings.countryIndicator}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}