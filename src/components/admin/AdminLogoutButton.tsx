"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className="inline-flex items-center gap-2 border border-ivory/25 px-4 py-2 text-[0.75rem] font-semibold tracking-[0.06em] text-ivory uppercase transition-colors hover:border-lime hover:text-lime"
    >
      <LogOut size={14} />
      Sign out
    </button>
  );
}