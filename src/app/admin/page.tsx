import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isAdminRequest } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Administrator",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminRequest()) {
    redirect("/admin/vacancies");
  }

  return (
    <section className="bg-forest pt-32 pb-24 text-ivory sm:pt-40 sm:pb-32">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="label text-lime">Administrator</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-7 max-w-[16ch] text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] font-medium tracking-tight-2 text-ivory">
              Manage Wisdom&rsquo;s vacancies.
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ivory/70">
              Post, update and close vacancies published on the Wisdom website. This area is
              restricted to authorised administrators.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <AdminLoginForm />
        </Reveal>
      </div>
    </section>
  );
}