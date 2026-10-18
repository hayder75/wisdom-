"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface JourneyStep {
  number: string;
  title: string;
  text: string;
}

interface MembershipJourneyProps {
  steps: JourneyStep[];
}

export function MembershipJourney({ steps }: MembershipJourneyProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="hidden lg:block">
        <div className="relative">
          <div className="absolute top-[22px] right-[8%] left-[8%] h-px bg-ivory/15" />
          <div className="relative grid grid-cols-5 gap-3">
            {steps.map((step, i) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={active === i}
                className={`group flex flex-col items-center gap-4 text-center ${
                  active === i ? "" : "opacity-60 hover:opacity-100"
                } transition-opacity duration-300`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center border font-display text-[0.8125rem] font-bold transition-colors duration-300 ${
                    active === i
                      ? "border-lime bg-lime text-ink"
                      : "border-ivory/30 bg-forest-deep text-ivory"
                  }`}
                >
                  {step.number}
                </span>
                <span
                  className={`text-[0.75rem] font-semibold tracking-[0.12em] uppercase ${
                    active === i ? "text-lime" : "text-ivory/70"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 min-h-[110px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-tight-2 text-ivory">
                {steps[active].title}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivory/65">
                {steps[active].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative lg:hidden">
        <div className="absolute top-0 bottom-0 left-[22px] w-px bg-ivory/15" />
        <div className="flex flex-col gap-2">
          {steps.map((step, i) => {
            const isOpen = active === i;
            return (
              <div key={step.number} className="relative pl-14">
                <span
                  className={`absolute top-4 left-0 flex h-11 w-11 items-center justify-center border font-display text-[0.8125rem] font-bold transition-colors duration-300 ${
                    isOpen
                      ? "border-lime bg-lime text-ink"
                      : "border-ivory/30 bg-forest-deep text-ivory"
                  }`}
                >
                  {step.number}
                </span>
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between py-4 text-left ${
                    isOpen ? "text-lime" : "text-ivory/85"
                  }`}
                >
                  <span className="font-display text-[1.125rem] font-semibold tracking-tight-2">
                    {step.title}
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
                      <p className="pb-6 text-[0.9375rem] leading-relaxed text-ivory/65">
                        {step.text}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}