import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AdminShell } from "@/components/admin/AdminShell";
import { VacancyForm } from "@/components/admin/VacancyForm";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "New Vacancy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewVacancyPage() {
  await requireAdmin();

  return (
    <AdminShell>
        <Reveal>
          <p className="label text-lime-deep">Administrator — New Vacancy</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] font-medium tracking-tight-2 text-forest">
            Post a new vacancy.
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-stone">
            Published vacancies appear immediately on the public vacancies page.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:gap-16">
          <Reveal delay={0.1}>
            <VacancyForm />
          </Reveal>
          <aside className="flex flex-col gap-6 lg:pt-2">
            <Reveal delay={0.14}>
              <div className="border border-line bg-sand p-7">
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-stone uppercase">
                  Visibility
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 text-[0.875rem] leading-relaxed text-stone">
                  <li>— Set to <strong>Open</strong> to show the vacancy publicly.</li>
                  <li>— <strong>Draft</strong> keeps it hidden while you prepare it.</li>
                  <li>— <strong>Closed</strong> removes it from the public page.</li>
                </ul>
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