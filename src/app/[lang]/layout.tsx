import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getSettings } from "@/lib/content-store";
import { getDictionary, locales, type Lang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary((locales.includes(lang as Lang) ? lang : "en") as Lang);
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: {
      languages: { en: "/en", am: "/am" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const current = (locales.includes(lang as Lang) ? lang : "en") as Lang;
  const [settings, t] = await Promise.all([getSettings(current), Promise.resolve(getDictionary(current))]);

  return (
    <>
      <ScrollProgress />
      <Navbar settings={settings} t={t} lang={current} />
      <main>{children}</main>
      <Footer settings={settings} t={t} lang={current} />
    </>
  );
}