"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Unable to sign in.");
        return;
      }
      router.push("/admin/vacancies");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-line bg-white p-7 sm:p-10"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center bg-forest text-lime">
          <Lock size={18} />
        </span>
        <div>
          <h2 className="font-display text-[1.25rem] font-semibold tracking-tight-2 text-ink">
            Administrator sign in
          </h2>
          <p className="text-[0.8125rem] text-stone">
            Restricted area — authorised staff only.
          </p>
        </div>
      </div>

      <label className="mt-8 flex flex-col gap-2.5">
        <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-ink">
          Password
        </span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          autoComplete="current-password"
          className="w-full rounded-[2px] border border-ink/15 bg-white px-5 py-4 text-[0.9375rem] text-ink placeholder:text-stone/70 outline-none transition-colors duration-300 focus:border-lime-deep focus:ring-2 focus:ring-lime/40"
        />
      </label>

      {error ? (
        <p role="alert" className="mt-4 text-[0.8125rem] font-medium text-lime-deep">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="btn btn-lime mt-7 w-full justify-between disabled:opacity-60"
      >
        <span>Sign in</span>
        <ArrowRight size={18} />
      </button>

      <p className="mt-5 text-[0.75rem] leading-relaxed text-stone">
        Contact your administrator if you need access. The default development password can be
        changed by setting the WISDOM_ADMIN_PASSWORD environment variable.
      </p>
    </form>
  );
}