"use client";

import { useEffect, useState } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroDocument } from "@/lib/content-store";
import type { Dictionary } from "@/lib/i18n";

interface HeroProps {
  hero: HeroDocument;
  t: Dictionary;
}

export function Hero({ hero, t }: HeroProps) {
  const service = hero.serviceMotto;
  const accent = "excellent service.";
  const accentAt = service.indexOf(accent);
  const serviceLines = service.split("\n").filter(Boolean);
  const slides = Array.isArray(hero.slides) && hero.slides.length > 0 ? hero.slides : [];
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 8000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const slide = slides[index] ?? slides[0];
  const blur = { filter: "blur(8px)" } as const;
  const sharp = { filter: "blur(0px)" } as const;

  return (
    <section
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-forest-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ scale: [1.04, 1.12] }}
              transition={{ duration: 9, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {slide ? (
                <Image
                  src={slide.image}
                  alt={slide.title ?? "Wisdom SACCO"}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              ) : null}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/60 to-forest-deep/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/85 via-forest-deep/35 to-transparent" />
      </div>

      <div className="container-site relative z-10 py-28 sm:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="inline-flex items-center gap-2.5 border border-ivory/25 bg-ivory/10 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="font-display text-[0.6875rem] font-semibold tracking-[0.22em] text-ivory uppercase">
              {hero.label}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, ...blur }}
            animate={{ opacity: 1, y: 0, ...sharp }}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="font-display mt-6 max-w-[16ch] text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-tight-2 text-ivory uppercase"
          >
            {serviceLines.length > 1 ? (
              serviceLines.map((line, i) => (
                <span
                  key={i}
                  className={
                    i === serviceLines.length - 1 ? "block text-lime animate-glow" : "block"
                  }
                >
                  {line}
                </span>
              ))
            ) : accentAt >= 0 ? (
              <>
                {service.slice(0, accentAt)}
                <span className="text-lime animate-glow">{accent}</span>
                {service.slice(accentAt + accent.length)}
              </>
            ) : (
              service
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26, ...blur }}
            animate={{ opacity: 1, y: 0, ...sharp }}
            transition={{ duration: 0.85, delay: 0.65 }}
            className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ivory/80 sm:text-lg"
          >
            {hero.supportingText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href={hero.primaryCtaHref} className="btn btn-lime">
              {hero.primaryCtaLabel}
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href={hero.secondaryCtaHref}
              className="btn border border-ivory/50 bg-ivory/5 text-ivory backdrop-blur-md transition-colors hover:border-ivory hover:bg-ivory/15"
            >
              {hero.secondaryCtaLabel}
            </Link>
          </motion.div>
        </div>
      </div>

      {count > 1 ? (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute top-1/2 left-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-forest-deep/40 text-ivory/85 backdrop-blur-md transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink sm:flex lg:left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute top-1/2 right-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-forest-deep/40 text-ivory/85 backdrop-blur-md transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink sm:flex lg:right-6"
          >
            <ChevronRight size={20} />
          </button>
        </>
      ) : null}

      <div className="container-site absolute inset-x-0 bottom-0 z-20">
        <div className="flex items-end justify-between gap-6 pb-8">
          <div className="hidden min-h-[3.5rem] max-w-[32ch] lg:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-display text-[0.6875rem] font-bold tracking-[0.22em] text-lime">
                  {String(index + 1).padStart(2, "0")}
                  <span className="text-ivory/40">
                    {" / "}
                    {String(count).padStart(2, "0")}
                  </span>
                </span>
                {slide?.title ? (
                  <p className="font-display mt-2 text-[1.125rem] font-semibold tracking-tight text-ivory uppercase">
                    {slide.title}
                  </p>
                ) : null}
                {slide?.caption ? (
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-ivory/70">
                    {slide.caption}
                  </p>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group flex h-6 items-center"
              >
                <span
                  className={`block rounded-sm border transition-all duration-300 ${
                    i === index
                      ? "h-2.5 w-6 border-lime bg-lime"
                      : "h-2.5 w-2.5 border-ivory/50 bg-ivory/25 group-hover:bg-ivory/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <a
            href="#wisdom-model"
            aria-label={t.hero.scroll}
            className="group hidden items-center gap-2.5 sm:flex"
          >
            <span className="font-display text-[0.6875rem] font-semibold tracking-[0.22em] text-ivory/70 uppercase transition-colors group-hover:text-ivory">
              {t.hero.scroll}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-ivory/5 backdrop-blur-md transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
              <ChevronDown size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
