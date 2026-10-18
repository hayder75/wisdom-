import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { contentSchemaByKey } from "@/lib/content-schemas";
import { contentNav } from "@/lib/content-nav";

export const metadata: Metadata = {
  title: "Content",
  robots: { index: false, follow: false },
};

export default async function AdminContentPage() {
  return (
    <div>
      <Reveal>
        <p className="label text-lime-deep">Administrator — Content</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="font-display mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] font-medium tracking-tight-2 text-forest">
          Edit site content
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-4 max-w-[56ch] text-[0.9375rem] leading-relaxed text-stone">
          Choose a section on the left, or pick a card below. Everything is editable and appears
          immediately on the public site.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {contentNav.map((meta, i) => {
          const schema = contentSchemaByKey[meta.key];
          return (
            <Reveal key={meta.key} delay={i * 0.04}>
              <Link
                href={`/admin/content/${meta.key}`}
                className="group flex h-full flex-col justify-between border border-line bg-white p-6 transition-colors duration-300 hover:border-forest/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-[0.8125rem] font-bold text-lime-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.75rem] font-semibold tracking-[0.1em] text-stone/70 uppercase">
                      {schema?.fields.length ?? 0} field{schema?.fields.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <h2 className="font-display mt-4 text-[1.25rem] font-semibold tracking-tight-2 text-forest">
                    {meta.label}
                  </h2>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-stone">
                    {schema?.description}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors group-hover:text-lime-deep">
                  <span>Edit</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}