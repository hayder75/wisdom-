"use client";

import { useState, type FormEvent, type ReactNode, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Loader2,
  Plus,
  Trash2,
  Upload,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { SchemaField } from "@/lib/content-schemas";

const inputClass =
  "w-full rounded-[2px] border border-ink/15 bg-white px-4 py-2.5 text-[0.875rem] text-ink placeholder:text-stone/60 outline-none transition-colors duration-300 focus:border-lime-deep focus:ring-2 focus:ring-lime/40";

function defaultValueFor(field: SchemaField): unknown {
  switch (field.kind) {
    case "stringList":
      return [];
    case "object":
      return Object.fromEntries(
        (field.fields ?? []).map((f) => [f.key, defaultValueFor(f)]),
      );
    case "nestedList":
      return Object.fromEntries(
        (field.fields ?? []).map((f) => [f.key, defaultValueFor(f)]),
      );
    default:
      return "";
  }
}

function CollapsibleCard({
  title,
  subtitle,
  badge,
  defaultOpen = true,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: number;
  defaultOpen?: boolean;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-line bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <ChevronDown
            size={16}
            className={`shrink-0 text-lime-deep transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
          <span className="min-w-0">
            <span className="block truncate text-[0.8125rem] font-semibold tracking-[0.04em] text-ink">
              {title}
            </span>
            {subtitle ? (
              <span className="block truncate text-[0.75rem] text-stone">{subtitle}</span>
            ) : null}
          </span>
          {badge !== undefined ? (
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center border border-lime-deep/40 bg-lime/10 px-1.5 text-[0.6875rem] font-bold text-lime-deep">
              {badge}
            </span>
          ) : null}
        </button>
        {actions}
      </div>
      {open ? <div className="border-t border-line p-4">{children}</div> : null}
    </div>
  );
}

function ImageField({
  field,
  value,
  onChange,
}: {
  field: SchemaField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const current = typeof value === "string" ? value : "";

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setBusy(false);
      if (e.target) e.target.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.75rem] font-semibold tracking-[0.04em] text-ink">
        {field.label}
        {field.required ? <span className="text-lime-deep"> *</span> : null}
      </span>
      <div className="flex items-start gap-3">
        <div className="h-20 w-32 shrink-0 border border-ink/15 bg-sand/60">
          {current ? (
            <Image
              src={current}
              alt=""
              width={128}
              height={80}
              className="h-20 w-32 object-cover"
            />
          ) : (
            <div className="flex h-20 w-32 items-center justify-center text-[0.6875rem] text-stone/60">
              No image
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label className="inline-flex w-fit cursor-pointer items-center gap-2 border border-ink/15 px-3 py-1.5 text-[0.75rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-forest hover:text-forest">
            {busy ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {busy ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp,image/avif,image/svg+xml"
              className="hidden"
              onChange={onFile}
              disabled={busy}
            />
          </label>
          <input
            value={current}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
            className={inputClass}
          />
          {error ? (
            <span className="text-[0.75rem] font-medium text-lime-deep">{error}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: SchemaField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const label = (
    <span className="text-[0.75rem] font-semibold tracking-[0.04em] text-ink">
      {field.label}
      {field.required ? <span className="text-lime-deep"> *</span> : null}
    </span>
  );

  if (field.kind === "image") {
    return <ImageField field={field} value={value} onChange={onChange} />;
  }

  if (field.kind === "stringList") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className="flex flex-col gap-2">
        {label}
        {list.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <input
              value={item}
              onChange={(e) => {
                const next = [...list];
                next[i] = e.target.value;
                onChange(next);
              }}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(list.filter((_, j) => j !== i))}
              aria-label={`Remove ${field.itemLabel ?? "item"}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/15 text-stone transition-colors hover:border-lime-deep hover:text-lime-deep"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...list, ""])}
          className="inline-flex w-fit items-center gap-2 border border-ink/15 px-3 py-1.5 text-[0.75rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-forest hover:text-forest"
        >
          <Plus size={13} />
          Add {field.itemLabel ?? "item"}
        </button>
      </div>
    );
  }

  if (field.kind === "object") {
    const obj = (typeof value === "object" && value !== null ? value : {}) as Record<
      string,
      unknown
    >;
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {(field.fields ?? []).map((sub) => (
          <div key={sub.key} className={sub.kind === "textarea" ? "sm:col-span-2" : ""}>
            <FieldRenderer
              field={sub}
              value={obj[sub.key]}
              onChange={(v) => onChange({ ...obj, [sub.key]: v })}
            />
          </div>
        ))}
      </div>
    );
  }

  if (field.kind === "nestedList") {
    const list = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
    return (
      <div className="flex flex-col gap-3">
        {list.length === 0 ? (
          <p className="rounded-[2px] border border-dashed border-ink/20 px-4 py-3 text-[0.8125rem] text-stone/70">
            No {field.label.toLowerCase()} yet.
          </p>
        ) : (
          list.map((item, i) => {
            const objItem =
              typeof item === "object" && item !== null && !Array.isArray(item) ? item : {};
            const display =
              (typeof objItem.name === "string" && objItem.name) ||
              (typeof objItem.title === "string" && objItem.title) ||
              (typeof objItem.topic === "string" && objItem.topic) ||
              "";
            return (
              <CollapsibleCard
                key={i}
                defaultOpen={i === 0}
                title={`${field.itemLabel ?? "Item"} ${String(i + 1).padStart(2, "0")}`}
                subtitle={display || undefined}
                actions={
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (i === 0) return;
                        const next = [...list];
                        [next[i - 1], next[i]] = [next[i], next[i - 1]];
                        onChange(next);
                      }}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="flex h-8 w-8 items-center justify-center border border-ink/15 text-stone transition-colors hover:border-forest hover:text-forest disabled:opacity-30"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (i === list.length - 1) return;
                        const next = [...list];
                        [next[i], next[i + 1]] = [next[i + 1], next[i]];
                        onChange(next);
                      }}
                      disabled={i === list.length - 1}
                      aria-label="Move down"
                      className="flex h-8 w-8 items-center justify-center border border-ink/15 text-stone transition-colors hover:border-forest hover:text-forest disabled:opacity-30"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onChange(list.filter((_, j) => j !== i))}
                      aria-label={`Remove ${field.itemLabel ?? "item"}`}
                      className="flex h-8 w-8 items-center justify-center border border-ink/15 text-stone transition-colors hover:border-lime-deep hover:text-lime-deep"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                }
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {(field.fields ?? []).map((sub) => (
                    <div
                      key={sub.key}
                      className={
                        sub.kind === "textarea" ||
                        sub.kind === "nestedList" ||
                        sub.kind === "stringList"
                          ? "sm:col-span-2"
                          : ""
                      }
                    >
                      <FieldRenderer
                        field={sub}
                        value={objItem[sub.key]}
                        onChange={(v) => {
                          const next = [...list];
                          next[i] = { ...objItem, [sub.key]: v };
                          onChange(next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CollapsibleCard>
            );
          })
        )}
        <button
          type="button"
          onClick={() => onChange([...list, defaultValueFor(field) as Record<string, unknown>])}
          className="inline-flex w-fit items-center gap-2 border border-ink/15 px-3 py-1.5 text-[0.75rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:border-forest hover:text-forest"
        >
          <Plus size={13} />
          Add {field.itemLabel ?? "item"}
        </button>
      </div>
    );
  }

  if (field.kind === "textarea") {
    return (
      <label className="flex flex-col gap-1.5">
        {label}
        <textarea
          required={field.required}
          rows={field.rows ?? 3}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${inputClass} resize-none`}
        />
      </label>
    );
  }

  if (field.kind === "select") {
    const selected =
      value === true ? "true" : value === false ? "false" : typeof value === "string" ? value : "";
    return (
      <label className="flex flex-col gap-1.5">
        {label}
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  const inputType =
    field.kind === "date" ? "date" : field.kind === "number" ? "number" : "text";

  return (
    <label className="flex flex-col gap-1.5">
      {label}
      <input
        required={field.required}
        type={inputType}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={inputClass}
      />
    </label>
  );
}

interface ContentFormProps {
  schemaKey: string;
  schemaFields: SchemaField[];
  initialValue: Record<string, unknown>;
  lang?: string;
}

export function ContentForm({
  schemaKey,
  schemaFields,
  initialValue,
  lang,
}: ContentFormProps) {
  const router = useRouter();
  const [value, setValue] = useState<Record<string, unknown>>(initialValue);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch(
        `/api/content/${schemaKey}${lang ? `?lang=${lang}` : ""}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Unable to save content.");
        return;
      }
      setSaved(true);
      setJustSaved(true);
      window.setTimeout(() => setJustSaved(false), 3500);
      router.refresh();
    } catch {
      setError("Unable to save content. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {saved ? (
        <div
          role="status"
          className="mb-6 flex items-center gap-3 border border-lime-deep/40 bg-lime/10 px-4 py-3 text-[0.8125rem] font-medium text-forest"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-lime text-ink">
            <Check size={14} />
          </span>
          Changes saved and published.
        </div>
      ) : null}
      {error ? (
        <p
          role="alert"
          className="mb-6 border border-lime-deep/40 bg-lime/10 px-4 py-3 text-[0.8125rem] font-medium text-lime-deep"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-5">
        {schemaFields.map((field, fi) => {
          const isCard = field.kind === "nestedList" || field.kind === "object";
          const badge =
            field.kind === "nestedList" && Array.isArray(value[field.key])
              ? (value[field.key] as unknown[]).length
              : undefined;
          const inner = (
            <FieldRenderer
              field={field}
              value={value[field.key]}
              onChange={(v) => setValue((prev) => ({ ...prev, [field.key]: v }))}
            />
          );
          if (isCard) {
            return (
              <CollapsibleCard
                key={field.key}
                defaultOpen={fi === 0}
                title={field.label}
                subtitle={
                  field.kind === "nestedList"
                    ? `${badge ?? 0} item${badge === 1 ? "" : "s"}`
                    : undefined
                }
                badge={badge}
              >
                {inner}
              </CollapsibleCard>
            );
          }
          return (
            <div key={field.key} className="border border-line bg-white p-5">
              {inner}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy || justSaved}
          className={`btn disabled:opacity-70 ${justSaved ? "btn-success" : "btn-lime"}`}
        >
          {justSaved ? (
            <>
              <Check size={18} />
              Published
            </>
          ) : (
            <>
              <ArrowUpRight size={18} />
              Save &amp; Publish
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/content")}
          className="btn btn-outline-ink"
        >
          Cancel
        </button>
      </div>
      <p className="mt-5 max-w-[70ch] text-[0.8125rem] leading-relaxed text-stone">
        Changes are saved directly to the content store and reflected immediately on the public
        site. Please do not enter fabricated financial figures — use only official Wisdom
        information.
      </p>
    </form>
  );
}