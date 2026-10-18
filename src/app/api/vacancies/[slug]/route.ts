import { NextRequest, NextResponse } from "next/server";
import { adminCookieName } from "@/lib/admin";
import { verifyToken } from "@/lib/admin-auth";
import {
  deleteVacancy,
  readVacancies,
  sanitizeVacancyInput,
  updateVacancy,
} from "@/lib/vacancies-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAdmin(request: NextRequest): boolean {
  return verifyToken(request.cookies.get(adminCookieName)?.value);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { slug } = await context.params;
  try {
    const body = await request.json();
    const input = sanitizeVacancyInput(body);
    if (!input.title) {
      return NextResponse.json(
        { error: "Vacancy title is required." },
        { status: 400 },
      );
    }
    const vacancy = await updateVacancy(slug, input);
    if (!vacancy) {
      return NextResponse.json({ error: "Vacancy not found." }, { status: 404 });
    }
    return NextResponse.json(vacancy);
  } catch {
    return NextResponse.json(
      { error: "Unable to update the vacancy. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { slug } = await context.params;
  const deleted = await deleteVacancy(slug);
  if (!deleted) {
    return NextResponse.json({ error: "Vacancy not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const all = await readVacancies();
  const vacancy = all.find((v) => v.slug === slug);
  if (!vacancy) {
    return NextResponse.json({ error: "Vacancy not found." }, { status: 404 });
  }
  const url = new URL(request.url);
  const scope = url.searchParams.get("scope") === "all" ? "all" : "open";
  if (scope !== "all" && vacancy.status !== "open") {
    return NextResponse.json({ error: "Vacancy not found." }, { status: 404 });
  }
  return NextResponse.json(vacancy);
}