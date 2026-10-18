import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminCookieName,
  adminSecret,
  adminSessionHours,
} from "@/lib/admin";

function sign(payload: string): string {
  return createHmac("sha256", adminSecret).update(payload).digest("base64url");
}

export function createToken(): string {
  const exp = Date.now() + adminSessionHours * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = Buffer.from(sign(payload));
  const provided = Buffer.from(sig);
  if (expected.length !== provided.length) return false;
  if (!timingSafeEqual(expected, provided)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(adminCookieName)?.value);
}

export async function requireAdmin(): Promise<void> {
  const ok = await isAdminRequest();
  if (!ok) redirect("/admin");
}