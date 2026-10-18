import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

interface Brochure {
  src: string;
  title: string;
  caption: string;
}

const COPY: Record<
  Lang,
  { label: string; heading: string; description: string; items: Brochure[] }
> = {
  en: {
    label: "PRODUCT GUIDE",
    heading: "Our products, in full.",
    description:
      "Browse the official Wisdom SACCO product guides — savings, loans and interest-free (Wisdom Berka) services. Tap any guide to open it larger.",
    items: [
      {
        src: "/products/savings-loans-front.jpg",
        title: "Savings & Loan Products",
        caption: "Overview of the savings and credit services available to members.",
      },
      {
        src: "/products/savings-loans-back.jpg",
        title: "Savings & Loan Products — Details",
        caption: "Regular and purpose savings, plus the loan terms offered to members.",
      },
      {
        src: "/products/islamic-products-front.jpg",
        title: "Interest-Free Products (Wisdom Berka)",
        caption: "Sharia-compliant, interest-free savings and financing services.",
      },
      {
        src: "/products/islamic-products-back.jpg",
        title: "Interest-Free Products — Details",
        caption: "Vision, membership criteria and the interest-free product range.",
      },
    ],
  },
  am: {
    label: "የምርት መመሪያ",
    heading: "የእኛ ምርቶች በሙሉ።",
    description:
      "የዊዝደም ሳኮ ኦፊሴላዊ የምርት መመሪያዎችን ይመልከቱ — ቁጠባ፣ ብድርና የወለድ አልባ (ዊዝደም በርካ) አገልግሎቶች። ለማጉላት ማንኛውንም መመሪያ ይጫኑ።",
    items: [
      {
        src: "/products/savings-loans-front.jpg",
        title: "የቁጠባና የብድር ምርቶች",
        caption: "ለአባላት የሚገኙ የቁጠባና የብድር አገልግሎቶች አጠቃላይ እይታ።",
      },
      {
        src: "/products/savings-loans-back.jpg",
        title: "የቁጠባና የብድር ምርቶች — ዝርዝር",
        caption: "መደበኛና ልዩ ዓላማ ቁጠባ፣ እንዲሁም ለአባላት የሚሰጡ የብድር ውሎች።",
      },
      {
        src: "/products/islamic-products-front.jpg",
        title: "የወለድ አልባ ምርቶች (ዊዝደም በርካ)",
        caption: "ከሸሪዓ ጋር የሚስማሙ የወለድ አልባ የቁጠባና የፋይናንስ አገልግሎቶች።",
      },
      {
        src: "/products/islamic-products-back.jpg",
        title: "የወለድ አልባ ምርቶች — ዝርዝር",
        caption: "ራዕይ፣ የአባልነት መስፈርቶችና የወለድ አልባ የምርት አማራጮች።",
      },
    ],
  },
};

export function ProductBrochures({ lang }: { lang: Lang }) {
  const c = COPY[lang] ?? COPY.en;

  return (
    <section className="bg-ivory py-20 sm:py-28">
      <div className="container-site">
        <SectionHeader label={c.label} heading={c.heading} description={c.description} />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {c.items.map((item, i) => (
            <Reveal key={item.src} delay={i * 0.08}>
              <a
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className="card group block overflow-hidden bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium tracking-tight-2 text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">
                    {item.caption}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
