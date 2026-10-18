"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { FormField } from "@/components/FormField";
import type { Dictionary } from "@/lib/i18n";

const initialState = {
  name: "",
  phone: "",
  email: "",
  location: "",
  membershipType: "",
  message: "",
};

export function MembershipForm({ email, t }: { email: string; t: Dictionary }) {
  const [form, setForm] = useState(initialState);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Membership enquiry — Wisdom SACCO");
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nLocation: ${form.location}\nMembership type: ${form.membershipType}\n\n${form.message}`,
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
          label={t.forms.fullName}
          name="name"
          required
          placeholder="Full name"
          value={form.name}
          onChange={set("name")}
        />
        <FormField
          label={t.forms.phone}
          name="phone"
          type="tel"
          required
          placeholder="+251 …"
          value={form.phone}
          onChange={set("phone")}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label={t.forms.email}
          name="email"
          type="email"
          placeholder="name@email.com"
          value={form.email}
          onChange={set("email")}
        />
        <FormField
          label={t.forms.location}
          name="location"
          placeholder="City / area"
          value={form.location}
          onChange={set("location")}
        />
      </div>
      <FormField
        label={t.forms.membershipType}
        name="membershipType"
        placeholder="Individual / Family / Group"
        value={form.membershipType}
        onChange={set("membershipType")}
      />
      <FormField
        label={t.forms.additionalInfo}
        name="message"
        textarea
        placeholder="Anything you'd like Wisdom to know…"
        value={form.message}
        onChange={set("message")}
      />
      <button
        type="submit"
        className="btn btn-lime w-full justify-between !py-5 sm:w-fit sm:min-w-[240px]"
      >
        <span className="inline-flex items-center gap-2">
          <Send size={18} />
          {t.forms.submitEnquiry}
        </span>
        <ArrowUpRight size={18} />
      </button>
      <p className="text-[0.75rem] leading-relaxed text-stone">
        {t.forms.membershipNote}
      </p>
    </form>
  );
}