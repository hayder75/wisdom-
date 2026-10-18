"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { FormField } from "@/components/FormField";
import type { Dictionary } from "@/lib/i18n";

const initialState = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm({ email, t }: { email: string; t: Dictionary }) {
  const [form, setForm] = useState(initialState);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Contact — Wisdom SACCO${form.subject ? ` — ${form.subject}` : ""}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\n${form.message}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  const set = (key: keyof typeof initialState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <form
      onSubmit={onSubmit}
      className="card flex flex-col gap-6 border border-line bg-white p-7 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label={t.forms.name}
          name="name"
          required
          placeholder="Full name"
          value={form.name}
          onChange={set("name")}
        />
        <FormField
          label={t.forms.email}
          name="email"
          type="email"
          required
          placeholder="name@email.com"
          value={form.email}
          onChange={set("email")}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label={t.forms.phone}
          name="phone"
          type="tel"
          placeholder="+251 …"
          value={form.phone}
          onChange={set("phone")}
        />
        <FormField
          label={t.forms.subject}
          name="subject"
          placeholder="How can we help?"
          value={form.subject}
          onChange={set("subject")}
        />
      </div>
      <FormField
        label={t.forms.message}
        name="message"
        required
        textarea
        placeholder="Tell us how we can help…"
        value={form.message}
        onChange={set("message")}
      />
      <button
        type="submit"
        className="btn btn-lime w-full justify-between !py-5 sm:w-fit sm:min-w-[240px]"
      >
        <span className="inline-flex items-center gap-2">
          <Send size={18} />
          {t.forms.sendMessage}
        </span>
        <ArrowUpRight size={18} />
      </button>
      <p className="text-[0.75rem] leading-relaxed text-stone">
        {t.forms.contactNote}
      </p>
    </form>
  );
}