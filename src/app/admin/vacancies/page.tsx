import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Pencil } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { VacancyDeleteButton } from "@/components/admin/VacancyDeleteButton";
import { requireAdmin } from "@/lib/admin-auth";
import { readVacancies } from "@/lib/vacancies-store";
import { formatDate } from "@/lib/vacancy";

export const metadata: Metadata = {
  title: "Manage Vacancies",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  open: "border-lime/50 bg-lime/10 text-lime-deep",
  draft: "border-ink/15 bg-sand text-stone",
  closed: "border-ink/25 bg-ink text-ivory",
};

export default async function AdminVacanciesPage() {
  await requireAdmin();
  const vacancies = await readVacancies();

  return (
    <AdminShell>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <p className="label text-lime-deep">Administrator</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] font-medium tracking-tight-2 text-forest">
                Manage vacancies
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-[0.9375rem] text-stone">
                {vacancies.length} vacancy{vacancies.length === 1 ? "" : "ies"} on record
              </p>
            </Reveal>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/admin/content" className="btn btn-outline-ink">
              Content
            </Link>
            <AdminLogoutButton />
            <Link href="/admin/vacancies/new" className="btn btn-lime">
              New Vacancy
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {vacancies.length === 0 ? (
          <Reveal delay={0.1}>
            <div className="mt-12 border border-line bg-white p-10 sm:p-14">
              <p className="label text-lime-deep">No vacancies yet</p>
              <h2 className="font-display mt-6 max-w-[24ch] text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] font-medium tracking-tight-2 text-forest">
                Post your first vacancy.
              </h2>
              <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-stone">
                Create a vacancy and it will appear immediately on the public vacancies page.
              </p>
              <div className="mt-9">
                <Link href="/admin/vacancies/new" className="btn btn-dark">
                  Create a Vacancy
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mt-12 flex flex-col border-t border-line">
            {vacancies.map((vacancy, i) => (
              <Reveal key={vacancy.id} delay={i * 0.04}>
                <div className="grid gap-5 border-b border-line py-7 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8">
                  <span className="font-display text-[0.8125rem] font-bold text-stone/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-[1.25rem] font-semibold tracking-tight-2 text-forest">
                        {vacancy.title}
                      </h2>
                      <span
                        className={`border px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.16em] uppercase ${statusStyles[vacancy.status]}`}
                      >
                        {vacancy.status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.8125rem] text-stone">
                      {vacancy.department} · {vacancy.location} · {vacancy.type} · Closes{" "}
                      {formatDate(vacancy.closingDate)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 lg:justify-self-end">
                    <Link
                      href={`/admin/vacancies/${vacancy.slug}/edit`}
                      className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2 text-[0.75rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-forest hover:text-forest"
                    >
                      <Pencil size={14} />
                      Edit
                    </Link>
                    <Link
                      href={`/vacancies/${vacancy.slug}`}
                      className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2 text-[0.75rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-forest hover:text-forest"
                    >
                      View
                    </Link>
                    <VacancyDeleteButton slug={vacancy.slug} title={vacancy.title} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
    </AdminShell>
  );
}