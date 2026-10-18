"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function AdminLangToggle({ current }: { current: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setLang(lang: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 border border-line bg-white p-1" role="group" aria-label="Content language">
      {(["en", "am"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={current === l}
          className={`px-3 py-1.5 text-[0.75rem] font-semibold tracking-[0.06em] uppercase transition-colors ${
            current === l
              ? "bg-forest text-ivory"
              : "text-stone hover:text-forest"
          }`}
        >
          {l === "en" ? "EN" : "አማ"}
        </button>
      ))}
    </div>
  );
}