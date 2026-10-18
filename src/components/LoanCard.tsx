import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { LoanProduct } from "@/lib/data/loans";
import type { Dictionary } from "@/lib/i18n";

interface LoanCardProps {
  loan: LoanProduct;
  index: number;
  dark?: boolean;
  t: Dictionary;
}

export function LoanCard({ loan, index, dark = false, t }: LoanCardProps) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article
        className={`group flex h-full flex-col border p-7 transition-colors duration-300 sm:p-8 ${
          dark
            ? "border-white/15 bg-forest-soft/40 hover:border-lime/50"
            : "border-line bg-white hover:border-forest/40"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={`font-display text-[2.75rem] leading-none font-medium tracking-tight-2 transition-colors duration-300 ${
              dark ? "text-ivory/15 group-hover:text-lime/40" : "text-stone/20 group-hover:text-lime/40"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`label ${dark ? "text-lime" : "text-lime-deep"}`}
          >
            {t.common.credit}
          </span>
        </div>

        <h3
          className={`font-display mt-2 text-[clamp(1.5rem,3vw,2.125rem)] font-semibold tracking-tight-2 ${
            dark ? "text-ivory" : "text-forest"
          }`}
        >
          {loan.name}
        </h3>

        <p className={`mt-3 text-[0.9375rem] leading-relaxed ${dark ? "text-ivory/65" : "text-stone"}`}>
          {loan.short}
        </p>

        <div
          className={`mt-6 flex flex-wrap gap-2 border-t pt-5 ${
            dark ? "border-white/10" : "border-line"
          }`}
        >
          <span
            className={`border px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase ${
              dark ? "border-white/20 text-ivory/75" : "border-line bg-sand text-stone"
            }`}
          >
            {loan.audience}
          </span>
          <span
            className={`border px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase ${
              dark ? "border-white/20 text-ivory/75" : "border-line bg-sand text-stone"
            }`}
          >
            {loan.purpose}
          </span>
        </div>

        <div className="mt-auto pt-7">
          <Link
            href={`/loans/${loan.slug}`}
            className={`inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase transition-colors ${
              dark ? "text-ivory hover:text-lime" : "text-ink hover:text-lime-deep"
            }`}
          >
            <span>{t.cards.exploreLoan}</span>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}