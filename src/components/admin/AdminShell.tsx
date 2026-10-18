import type { ReactNode } from "react";
import { AdminContentNav } from "@/components/admin/AdminContentNav";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <section className="bg-sand pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,250px)_1fr] lg:gap-14">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-line bg-sand/40 p-3">
            <AdminContentNav />
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}