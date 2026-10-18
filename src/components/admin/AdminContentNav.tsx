"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { contentNav } from "@/lib/content-nav";

export function AdminContentNav() {
  const pathname = usePathname();

  const isContent = (key: string) =>
    pathname === `/admin/content/${key}` ||
    (key === "savings" && pathname === "/admin/content");
  const isVacancies = pathname.startsWith("/admin/vacancies");
  const isNewVacancy = pathname === "/admin/vacancies/new";

  const linkClass = (active: boolean) =>
    `group flex w-full items-center justify-between gap-3 border-l-2 px-4 py-3 text-left text-[0.875rem] font-medium transition-colors duration-200 ${
      active
        ? "border-lime bg-white text-forest"
        : "border-transparent text-stone hover:bg-white/70 hover:text-forest"
    }`;

  return (
    <nav aria-label="Admin sections" className="flex flex-col gap-1">
      <p className="px-4 pb-2 text-[0.6875rem] font-semibold tracking-[0.18em] text-stone/70 uppercase">
        Content
      </p>
      {contentNav.map((item, i) => {
        const active = isContent(item.key);
        return (
          <Link
            key={item.key}
            href={`/admin/content/${item.key}`}
            className={linkClass(active)}
          >
            <span className="flex items-center gap-3">
              <span className="font-display text-[0.6875rem] font-bold text-lime-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </span>
            {active ? <ArrowUpRight size={15} className="text-lime-deep" /> : null}
          </Link>
        );
      })}

      <p className="mt-6 px-4 pb-2 text-[0.6875rem] font-semibold tracking-[0.18em] text-stone/70 uppercase">
        Vacancies
      </p>
      <Link href="/admin/vacancies" className={linkClass(isVacancies && !isNewVacancy)}>
        <span>Manage vacancies</span>
        {isVacancies && !isNewVacancy ? (
          <ArrowUpRight size={15} className="text-lime-deep" />
        ) : null}
      </Link>
      <Link href="/admin/vacancies/new" className={linkClass(isNewVacancy)}>
        <span>New vacancy</span>
        {isNewVacancy ? <ArrowUpRight size={15} className="text-lime-deep" /> : null}
      </Link>

      <div className="mt-8 border-t border-line pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:text-lime-deep"
        >
          View website
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </nav>
  );
}