import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminLangToggle } from "@/components/admin/AdminLangToggle";
import { requireAdmin } from "@/lib/admin-auth";
import { contentSchemaByKey } from "@/lib/content-schemas";
import { readContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Edit Content",
  robots: { index: false, follow: false },
};

export default async function EditContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  await requireAdmin();
  const { key } = await params;
  const { lang: langParam } = await searchParams;
  const lang = langParam === "am" ? "am" : "en";

  const schema = contentSchemaByKey[key];
  if (!schema) notFound();

  const value = await readContent<Record<string, unknown>>(key, {}, lang);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Reveal>
            <p className="label text-lime-deep">Administrator — {schema.label}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] font-medium tracking-tight-2 text-forest">
              {schema.label}
            </h1>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <AdminLangToggle current={lang} />
        </Reveal>
      </div>
      {schema.description ? (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-stone">
            {schema.description}
          </p>
        </Reveal>
      ) : null}

      <div className="mt-8">
        <Reveal delay={0.1}>
          <ContentForm
            schemaKey={schema.key}
            schemaFields={schema.fields}
            initialValue={value}
            lang={lang}
          />
        </Reveal>
      </div>
    </div>
  );
}