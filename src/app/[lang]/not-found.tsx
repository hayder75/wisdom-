import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, locales, type Lang } from "@/lib/i18n";

export default async function NotFound({
  params,
}: {
  params?: Promise<{ lang: string }>;
}) {
  const paramsObj = params ? await params : undefined;
  const raw = paramsObj?.lang;
  const L = locales.includes(raw as Lang) ? (raw as Lang) : "en";
  const t = getDictionary(L);
  const n = t.notFound;

  return (
    <section className="flex min-h-[70svh] flex-col items-start justify-center bg-forest px-6 pt-32 text-ivory sm:px-12 lg:px-[72px]">
      <p className="label text-lime">404</p>
      <h1 className="font-display mt-7 text-[clamp(2.75rem,8vw,7rem)] leading-[0.9] font-medium tracking-tight-2">
        {n.title}
      </h1>
      <p className="mt-8 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ivory/70">{n.text}</p>
      <div className="mt-11 flex flex-wrap items-center gap-4">
        <Link href="/" className="btn btn-lime">
          {n.back}
        </Link>
        <Link href="/membership" className="btn btn-outline-ivory">
          {t.common.becomeMember}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}