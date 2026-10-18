"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface VacancyDeleteButtonProps {
  slug: string;
  title: string;
}

export function VacancyDeleteButton({ slug, title }: VacancyDeleteButtonProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onDelete() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/vacancies/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Unable to delete. Please try again.");
        return;
      }
      router.refresh();
    } catch {
      setError("Unable to delete. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={onDelete}
        disabled={busy}
        className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2 text-[0.75rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-lime-deep hover:text-lime-deep disabled:opacity-50"
      >
        <Trash2 size={14} />
        {busy ? "Deleting…" : "Delete"}
      </button>
      {error ? <p className="text-[0.75rem] text-lime-deep">{error}</p> : null}
    </div>
  );
}