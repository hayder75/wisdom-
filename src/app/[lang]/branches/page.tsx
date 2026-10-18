import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import { BranchFinder } from "@/components/BranchFinder";
import { getBranches } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Branches",
  description:
    "Find a Wisdom SACCO branch. Official branch locations, addresses and hours will be published here as Wisdom confirms them.",
};

export default async function BranchesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const L = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [{ branches }, t] = await Promise.all([getBranches(L), Promise.resolve(getDictionary(L))]);
  const p = t.pages.branches;

  return (
    <>
      <PageHeader label={p.label} heading={p.heading} description={p.description} />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site">
          <SectionHeader label={p.finder} heading={p.finderHeading} description={p.finderDesc} />
          <div className="mt-12">
            <Reveal>
              <BranchFinder branches={branches} t={t} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-24">
        <div className="container-site">
          <Reveal>
            <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-stone">{p.note}</p>
          </Reveal>
        </div>
      </section>

      <CTASection
        label={t.cta.branches.label}
        heading={t.cta.branches.heading}
        text={t.cta.branches.text}
        primaryHref="/contact"
        primaryLabel={t.cta.branches.primary}
        secondaryHref="/membership"
        secondaryLabel={t.cta.branches.secondary}
        image={images.landscape}
        alt="Wisdom serving its community across Ethiopia"
      />
    </>
  );
}