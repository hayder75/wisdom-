import { NextResponse } from "next/server";
import { contentMeta } from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(contentMeta);
}