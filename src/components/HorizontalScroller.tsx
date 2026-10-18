"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface HorizontalScrollerProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroller({ children, className = "" }: HorizontalScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: dir * (trackRef.current.clientWidth * 0.72),
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-gradient-to-l from-ivory to-transparent lg:block" />
        <div
          ref={trackRef}
          className={`no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 lg:gap-6 ${className}`}
        >
          {children}
        </div>
      </div>
      <div className="mt-8 hidden items-center gap-3 lg:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="flex h-12 w-12 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="flex h-12 w-12 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}