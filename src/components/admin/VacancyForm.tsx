"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { VacancyInput, VacancyStatus } from "@/lib/vacancy";

interface VacancyFormProps {
  initial?: Partial<VacancyInput>;
  slug?: string;
}

const fieldClass =
  "w-full rounded-[2px] border border-ink/15 bg-white px-5 py-3.5 text-[0.9375rem] text-ink placeholder:text-stone/70 outline-none transition-colors duration-300 focus:border-lime-deep focus:ring-2 focus:ring-lime/40";

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-ink">{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={fieldClass}
      />
    </label>
  );
}

export function VacancyForm({ initial = {}, slug }: VacancyFormProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<VacancyInput>({
    title: initial.title ?? "",
    department: initial.department ?? "",
    location: initial.location ?? "",
    type: initial.type ?? "",
    postedDate: initial.postedDate ?? "",
    closingDate: initial.closingDate ?? "",
    summary: initial.summary ?? "",
    description: initial.description ?? "",
    requirements: initial.requirements ?? "",
    status: initial.status ?? "open",
  });

  const set = (key: keyof VacancyInput) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const url = slug ? `/api/vacancies/${slug}` : "/api/vacancies";
      const res = await fetch(url, {
        method: slug ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Unable to save the vacancy.");
        return;
      }
      router.push("/admin/vacancies");
      router.refresh();
    } catch {
      setError("Unable to save the vacancy. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-white p-7 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field
            label="Vacancy title"
            name="title"
            required
            value={form.title}
            onChange={set("title")}
            placeholder="e.g. Branch Officer"
          />
        </div>
        <Field
          label="Department"
          name="department"
          value={form.department}
          onChange={set("department")}
          placeholder="e.g. Operations"
        />
        <Field
          label="Location"
          name="location"
          value={form.location}
          onChange={set("location")}
          placeholder="e.g. Addis Ababa"
        />
        <Field
          label="Employment type"
          name="type"
          value={form.type}
          onChange={set("type")}
          placeholder="e.g. Full-time"
        />
        <label className="flex flex-col gap-2">
          <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-ink">Status</span>
          <select
            name="status"
            value={form.status}
            onChange={(e) => set("status")(e.target.value as VacancyStatus)}
            className={fieldClass}
          >
            <option value="open">Open</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        <Field
          label="Posted date"
          name="postedDate"
          type="date"
          value={form.postedDate}
          onChange={set("postedDate")}
        />
        <Field
          label="Closing date"
          name="closingDate"
          type="date"
          value={form.closingDate}
          onChange={set("closingDate")}
        />
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-ink">Summary</span>
          <textarea
            rows={3}
            value={form.summary}
            onChange={(e) => set("summary")(e.target.value)}
            placeholder="Short description shown on the vacancies page"
            className={`${fieldClass} resize-none`}
          />
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-ink">
            About the role
          </span>
          <textarea
            rows={5}
            value={form.description}
            onChange={(e) => set("description")(e.target.value)}
            placeholder="Full description of the role and responsibilities"
            className={`${fieldClass} resize-none`}
          />
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-ink">
            Requirements
          </span>
          <textarea
            rows={5}
            value={form.requirements}
            onChange={(e) => set("requirements")(e.target.value)}
            placeholder={"One requirement per line"}
            className={`${fieldClass} resize-none`}
          />
          <span className="text-[0.75rem] text-stone">
            Enter one requirement per line — each line appears as a bullet on the public page.
          </span>
        </label>
      </div>

      {error ? (
        <p role="alert" className="mt-6 text-[0.8125rem] font-medium text-lime-deep">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} className="btn btn-lime disabled:opacity-60">
          {slug ? "Save Changes" : "Publish Vacancy"}
          <ArrowUpRight size={18} />
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/vacancies")}
          className="btn btn-outline-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}