import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/ImageReveal";
import type { SavingsProduct } from "@/lib/data/savings";
import type { Dictionary } from "@/lib/i18n";

interface SavingsCardProps {
  product: SavingsProduct;
  featured?: boolean;
  compact?: boolean;
  index?: number;
  t: Dictionary;
}

export function SavingsCard({ product, featured = false, compact = false, index = 1, t }: SavingsCardProps) {
  if (compact) {
    return (
      <Link
        href={`/savings/${product.slug}`}
        className="group flex h-full flex-col border border-line bg-white p-5 transition-colors hover:border-forest/40"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-[0.75rem] font-bold text-lime-deep">
            {String(index).padStart(2, "0")}
          </span>
          <ArrowUpRight
            size={17}
            className="text-stone/50 transition-colors group-hover:text-lime-deep"
          />
        </div>
        <h3 className="font-display mt-3 text-[1.0625rem] leading-snug font-semibold tracking-tight-2 text-forest">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.8125rem] leading-relaxed text-stone">
          {product.short}
        </p>
        <span className="mt-auto pt-4 text-[0.6875rem] font-semibold tracking-[0.12em] text-ink uppercase">
          {t.cards.fullSpecs}
        </span>
      </Link>
    );
  }

  if (featured) {
    return (
      <ImageReveal className="border border-line bg-white">
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <span className="label text-lime-deep">{t.cards.featuredSavings}</span>
            <span className="font-display text-[0.8125rem] font-bold text-stone/40">
              {String(index).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5">
            <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-lime-deep uppercase">
              {t.cards.interestRate}
            </span>
            <span className="text-[0.9375rem] font-semibold text-ink">
              {t.cards.contactOffice}
            </span>
            <span className="text-[0.9375rem] font-semibold text-ink">
              {t.cards.growth} {t.cards.high}
            </span>
          </div>

          <h3 className="font-display mt-6 max-w-[18ch] text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] font-medium tracking-tight-2 text-forest">
            {product.name}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-stone">
            {product.short}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={`/savings/${product.slug}`} className="btn btn-dark">
              {t.cards.fullSpecs}
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/membership" className="btn btn-outline-ink">
              {t.cards.joinNow}
            </Link>
          </div>
        </div>
      </ImageReveal>
    );
  }

  return (
    <ImageReveal className="flex h-full flex-col border border-line bg-white">
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-display text-[0.8125rem] font-bold text-lime-deep">
            {String(index).padStart(2, "0")}
          </span>
          <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-stone/70 uppercase">
            {t.cards.savings}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
          <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-lime-deep uppercase">
            {t.cards.interestRate}
          </span>
          <span className="text-[0.8125rem] text-stone">{t.cards.contactOffice}</span>
          <span className="text-[0.8125rem] text-stone">
            {t.cards.growth} {t.cards.high}
          </span>
        </div>

        <h3 className="font-display mt-4 text-[1.375rem] font-semibold tracking-tight-2 text-forest">
          {product.name}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{product.short}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Link
            href={`/savings/${product.slug}`}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:text-lime-deep"
          >
            <span>{t.cards.fullSpecs}</span>
            <ArrowUpRight size={17} />
          </Link>
          <Link
            href="/membership"
            className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:text-lime-deep"
          >
            <span>{t.cards.joinNow}</span>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </ImageReveal>
  );
}