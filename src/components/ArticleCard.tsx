import { LocalizedLink as Link } from "@/components/LocalizedLink";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/ImageReveal";
import type { Dictionary } from "@/lib/i18n";

interface ArticleCardProps {
  slug: string;
  basePath: string;
  category: string;
  title: string;
  short: string;
  image: string;
  date: string;
  featured?: boolean;
  index?: number;
  t: Dictionary;
}

export function ArticleCard({
  slug,
  basePath,
  category,
  title,
  short,
  image,
  date,
  featured = false,
  index = 1,
  t,
}: ArticleCardProps) {
  if (featured) {
    return (
      <ImageReveal className="relative aspect-[16/10] overflow-hidden bg-forest-deep">
        <Link href={`${basePath}/${slug}`} className="group absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/45 to-forest-deep/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="placeholder-tag bg-lime text-ink">{category}</span>
              <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-ivory/60 uppercase">
                {date}
              </span>
            </div>
            <h3 className="font-display mt-5 max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] font-medium tracking-tight-2 text-ivory">
              {title}
            </h3>
            <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ivory/75">
              {short}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] text-lime uppercase">
              <span>{t.common.readArticle}</span>
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </Link>
      </ImageReveal>
    );
  }

  return (
    <ImageReveal className="flex h-full flex-col border border-line bg-white">
      <Link href={`${basePath}/${slug}`} className="group flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 bg-forest px-3 py-1.5 text-[0.625rem] font-bold tracking-[0.18em] text-ivory uppercase">
            {category}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-stone/60 uppercase">
              {date}
            </span>
            <span className="font-display text-[0.8125rem] font-bold text-stone/40">
              {String(index).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-display mt-3 text-[1.375rem] leading-[1.05] font-semibold tracking-tight-2 text-forest">
            {title}
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{short}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors group-hover:text-lime-deep">
            <span>{t.common.readArticle}</span>
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </ImageReveal>
  );
}