import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AdminShell } from "@/components/admin/AdminShell";
import { VacancyForm } from "@/components/admin/VacancyForm";
import { requireAdmin } from "@/lib/admin-auth";
import { readVacancies } from "@/lib/vacancies-store";

export const metadata: Metadata = {
  title: "Edit Vacancy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditVacancyPage({
  params,
}: PageProps<"/admin/vacancies/[slug]/edit">) {
  await requireAdmin();
  const { slug } = await params;
  const vacancy = (await readVacancies()).find((v) => v.slug === slug);
  if (!vacancy) notFound();

  return (
    <AdminShell>
        <Reveal>
          <p className="label text-lime-deep">Administrator — Edit Vacancy</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] font-medium tracking-tight-2 text-forest">
            Edit vacancy.
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-stone">
            Changes are saved immediately to the public page.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:gap-16">
          <Reveal delay={0.1}>
            <VacancyForm
              slug={slug}
              initial={{
                title: vacancy.title,
                department: vacancy.department,
                location: vacancy.location,
                type: vacancy.type,
                postedDate: vacancy.postedDate,
                closingDate: vacancy.closingDate,
                summary: vacancy.summary,
                description: vacancy.description,
                requirements: vacancy.requirements,
                status: vacancy.status,
              }}
            />
          </Reveal>
          <aside className="flex flex-col gap-6 lg:pt-2">
            <Reveal delay={0.14}>
              <div className="border border-line bg-sand p-7">
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-stone uppercase">
                  Public page
                </p>
                <Link
                  href={`/vacancies/${vacancy.slug}`}
                  className="mt-3 inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink transition-colors hover:text-lime-deep"
                >
                  View on site
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/admin/vacancies"
                className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:text-lime-deep"
              >
                Back to Vacancies
                <ArrowUpRight size={17} />
              </Link>
            </Reveal>
          </aside>
        </div>
    </AdminShell>
  );
}