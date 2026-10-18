"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { getLangLink, type Dictionary, type Lang } from "@/lib/i18n";
import type { SettingsDocument } from "@/lib/content-store";

const navHrefs = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/savings", key: "savings" },
  { href: "/loans", key: "loans" },
  { href: "/membership", key: "membership" },
  { href: "/news", key: "news" },
  { href: "/vacancies", key: "vacancies" },
  { href: "/contact", key: "contact" },
] as const;

interface NavbarProps {
  settings: SettingsDocument;
  t: Dictionary;
  lang: Lang;
}

export function Navbar({ settings, t, lang }: NavbarProps) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const centerLinks = navHrefs.slice(0, 5);
  const rightLinks = navHrefs.slice(5);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 28);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === `/${lang}` : pathname === `/${lang}${href}`),
    [pathname, lang],
  );

  const label = (key: (typeof navHrefs)[number]["key"]) => (t.nav as Record<string, string>)[key];

  const LangSwitcher = (
    <div
      className="flex items-center border border-ivory/20"
      role="group"
      aria-label="Language"
    >
      {(["en", "am"] as const).map((l, i) => (
        <LocalizedLink
          key={l}
          href={getLangLink(l, pathname)}
          className={`px-2.5 py-1.5 text-[0.75rem] font-semibold uppercase transition-colors ${
            lang === l ? "bg-lime text-ink" : "text-ivory/70 hover:text-ivory"
          } ${i > 0 ? "border-l border-ivory/20" : ""}`}
          aria-current={lang === l ? "true" : undefined}
        >
          {l === "en" ? "EN" : "አማ"}
        </LocalizedLink>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 mt-3 text-ivory sm:mt-4">
      <motion.div
        animate={{
          height: scrolled ? 64 : 92,
          backgroundColor: scrolled
            ? "rgba(32,34,137,0.98)"
            : "rgba(32,34,137,0)",
          boxShadow: scrolled ? "0 12px 32px rgba(0,0,0,0.25)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex items-center overflow-hidden"
      >
        <div className="container-site flex w-full items-center justify-between">
          <LocalizedLink href="/" aria-label="Wisdom SACCO — home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Wisdom SACCO"
              width={1254}
              height={1254}
              priority
              className="h-20 w-auto sm:h-24"
            />
          </LocalizedLink>

          <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {centerLinks.map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                className={`relative text-[0.8125rem] font-medium tracking-[0.05em] transition-colors duration-300 ${
                  isActive(link.href) ? "text-ivory" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                {label(link.key)}
                {isActive(link.href) ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-lime"
                  />
                ) : null}
              </LocalizedLink>
            ))}
            <span className="h-4 w-px bg-ivory/20" aria-hidden="true" />
            {rightLinks.map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                className={`relative text-[0.8125rem] font-medium tracking-[0.05em] transition-colors duration-300 ${
                  isActive(link.href) ? "text-ivory" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                {label(link.key)}
                {isActive(link.href) ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-lime"
                  />
                ) : null}
              </LocalizedLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {LangSwitcher}
            <LocalizedLink
              href="/membership"
              className="btn btn-lime !hidden !px-5 !py-2.5 !text-[0.75rem] sm:!inline-flex"
            >
              {t.nav.join}
              <ArrowUpRight size={15} />
            </LocalizedLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-lime hover:text-lime lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="h-px w-full bg-ivory/15"
        aria-hidden="true"
      />

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-0 z-[-1] flex min-h-dvh flex-col overflow-y-auto bg-forest px-6 pt-28 pb-10 lg:hidden"
          >
            <nav aria-label="Mobile menu" className="flex flex-col gap-1">
              {navHrefs.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  className="border-b border-ivory/10"
                >
                  <LocalizedLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline justify-between py-5 ${
                      isActive(link.href) ? "text-lime" : "text-ivory"
                    }`}
                  >
                    <span className="font-display text-[clamp(1.75rem,7vw,2.5rem)] font-medium tracking-tight-2">
                      {label(link.key)}
                    </span>
                    <span className="font-display text-[0.75rem] font-bold text-ivory/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </LocalizedLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-auto flex flex-col gap-2 pt-10"
            >
              {LangSwitcher}
              <LocalizedLink
                href="/membership"
                onClick={() => setOpen(false)}
                className="btn btn-lime w-full justify-between !px-6"
              >
                {t.nav.join}
                <ArrowUpRight size={18} />
              </LocalizedLink>
              <p className="pt-6 text-[0.6875rem] tracking-[0.22em] text-ivory/50 uppercase">
                {settings.countryIndicator}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}