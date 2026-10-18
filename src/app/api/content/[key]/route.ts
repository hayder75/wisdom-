import { NextRequest, NextResponse } from "next/server";
import { adminCookieName } from "@/lib/admin";
import { verifyToken } from "@/lib/admin-auth";
import { contentMeta, readContent, writeContent } from "@/lib/content-store";
import type { Lang } from "@/lib/i18n";
import { contentSchemaByKey } from "@/lib/content-schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAdmin(request: NextRequest): boolean {
  return verifyToken(request.cookies.get(adminCookieName)?.value);
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;
  const meta = contentMeta.find((m) => m.key === key);
  if (!meta) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  }
  const url = new URL(request.url);
  const lang = (url.searchParams.get("lang") as Lang) ?? undefined;
  const value = await readContent(key, {}, lang);
  return NextResponse.json(value);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { key } = await context.params;
  const schema = contentSchemaByKey[key];
  if (!schema) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  }
  try {
    const url = new URL(request.url);
    const lang = (url.searchParams.get("lang") as Lang) ?? undefined;
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid content payload." },
        { status: 400 },
      );
    }
    await writeContent(key, body, lang);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to save content. Please try again." },
      { status: 500 },
    );
  }
}