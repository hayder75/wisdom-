import { LocalizedLink as Link } from "@/components/LocalizedLink";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/ImageReveal";
import { AnimatedWords } from "@/components/AnimatedText";

interface CTASectionProps {
  label?: string;
  heading: string;
  text: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image: string;
  alt: string;
  showImage?: boolean;
}

export function CTASection({
  label = "JOIN WISDOM",
  heading,
  text,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  image,
  alt,
  showImage = true,
}: CTASectionProps) {
  if (!showImage) {
    return (
      <section className="relative overflow-hidden bg-lime text-ink">
        <div className="container-site relative z-10 mx-auto max-w-3xl py-24 text-center lg:py-32">
          <p className="label label-center text-ink">{label}</p>
          <h2 className="font-display mx-auto mt-7 max-w-[18ch] text-balance whitespace-pre-line text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-tight-2">
            <AnimatedWords text={heading} />
          </h2>
          <p className="mx-auto mt-8 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink/70">
            {text}
          </p>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Link href={primaryHref} className="btn btn-dark">
              {primaryLabel}
              <ArrowUpRight size={18} />
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className="btn btn-outline-ink">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-lime text-ink">
      <div className="container-site relative z-10 grid gap-14 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:py-32">
        <div>
          <p className="label text-ink">{label}</p>
          <h2 className="font-display mt-7 max-w-[16ch] text-balance whitespace-pre-line text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-tight-2">
            <AnimatedWords text={heading} />
          </h2>
          <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink/70">
            {text}
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link href={primaryHref} className="btn btn-dark">
              {primaryLabel}
              <ArrowUpRight size={18} />
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className="btn btn-outline-ink">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="hidden sm:block">
          <ImageReveal>
            <div className="relative border border-ink/15">
              <div className="relative aspect-[4/3]">
                <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </div>
              <div className="absolute top-0 left-0 bg-forest px-3.5 py-2 text-[0.6875rem] font-bold tracking-[0.2em] text-ivory uppercase">
                Wisdom SACCO
              </div>
              <div className="absolute right-0 bottom-0 border-l border-t border-ink/15 bg-ivory px-4 py-2.5 text-[0.6875rem] font-semibold tracking-[0.16em] text-forest uppercase">
                Built together
              </div>
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}