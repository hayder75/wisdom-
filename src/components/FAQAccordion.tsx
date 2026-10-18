"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQAccordionProps {
  items: { question: string; answer: string }[];
  dark?: boolean;
}

export function FAQAccordion({ items, dark = false }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className={dark ? "border-b border-ivory/15 first:border-t" : "border-b border-line first:border-t"}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`group flex w-full items-center justify-between gap-6 py-6 text-left ${
                dark ? "text-ivory" : "text-ink"
              }`}
            >
              <span
                className={`font-display text-[clamp(1.0625rem,2vw,1.375rem)] font-semibold tracking-tight-2 ${
                  isOpen ? (dark ? "text-lime" : "text-ink") : ""
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 ${
                  isOpen
                    ? "border-lime bg-lime text-forest-deep rotate-45"
                    : dark
                      ? "border-ivory/25 text-ivory"
                      : "border-ink/20 text-ink"
                }`}
              >
                <Plus size={16} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="overflow-hidden"
                >
                  <p
                    className={`pb-7 max-w-[62ch] text-[0.9375rem] leading-relaxed ${
                      dark ? "text-ivory/65" : "text-stone"
                    }`}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}