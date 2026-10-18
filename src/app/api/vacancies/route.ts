import { NextRequest, NextResponse } from "next/server";
import { adminCookieName } from "@/lib/admin";
import { verifyToken } from "@/lib/admin-auth";
import {
  createVacancy,
  readVacancies,
  sanitizeVacancyInput,
} from "@/lib/vacancies-store";
import { isOpen } from "@/lib/vacancy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAdmin(request: NextRequest): boolean {
  return verifyToken(request.cookies.get(adminCookieName)?.value);
}

export async function GET(request: NextRequest) {
  const vacancies = await readVacancies();
  const url = new URL(request.url);
  const scope = url.searchParams.get("scope") === "all" ? "all" : "open";
  const list = scope === "all" ? vacancies : vacancies.filter(isOpen);
  return NextResponse.json(list);
}

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const input = sanitizeVacancyInput(body);
    if (!input.title) {
      return NextResponse.json(
        { error: "Vacancy title is required." },
        { status: 400 },
      );
    }
    const vacancy = await createVacancy(input);
    return NextResponse.json(vacancy, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create the vacancy. Please try again." },
      { status: 500 },
    );
  }
}