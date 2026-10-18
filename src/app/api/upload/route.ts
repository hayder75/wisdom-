import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { adminCookieName } from "@/lib/admin";
import { verifyToken } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg"]);
const MAX_SIZE = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  if (!verifyToken(request.cookies.get(adminCookieName)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !file.size) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 8 MB)." }, { status: 413 });
    }

    const ext = path.extname(file.name || "").toLowerCase();
    if (!ALLOWED.has(ext)) {
      return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const name = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, name), bytes);

    return NextResponse.json({ url: `/uploads/${name}` });
  } catch {
    return NextResponse.json({ error: "Unable to upload file." }, { status: 500 });
  }
}