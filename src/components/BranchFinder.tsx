"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Branch } from "@/lib/data/branches";
import type { Dictionary } from "@/lib/i18n";

interface BranchFinderProps {
  branches: Branch[];
  t: Dictionary;
}

export function BranchFinder({ branches, t }: BranchFinderProps) {
  const [region, setRegion] = useState("");

  const regions = Array.from(new Set(branches.map((b) => b.region))).filter((r) => !r.startsWith("["));

  const filtered = region ? branches.filter((b) => b.region === region) : branches;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[0.8125rem] font-semibold tracking-[0.1em] text-stone uppercase">
          {t.pages.branches.filterByRegion}
        </span>
        <select
          aria-label="Filter branches by region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-[2px] border border-ink/15 bg-white px-5 py-2.5 text-[0.875rem] text-ink outline-none transition-colors duration-300 focus:border-lime-deep focus:ring-2 focus:ring-lime/40"
        >
          <option value="">{t.pages.branches.allRegions}</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((branch, i) => (
          <BranchCard key={branch.name} branch={branch} index={i} t={t} />
        ))}
      </div>

      <p className="mt-10 max-w-[64ch] text-[0.8125rem] leading-relaxed text-stone">
        Official branch locations, addresses, phone numbers and office hours will be published
        here as Wisdom confirms them. Contact Wisdom for the nearest branch.
      </p>
    </div>
  );
}

function BranchCard({ branch, index, t }: { branch: Branch; index: number; t: Dictionary }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[2px] border border-line bg-white transition-colors duration-300 hover:border-forest/40">
      {branch.image ? (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={branch.image}
            alt={branch.name}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex h-full flex-col p-7">
        <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-[1.375rem] leading-[1.05] font-semibold tracking-tight-2 text-ink">
          {branch.name}
        </h3>
        <span className="font-display text-[0.8125rem] font-bold text-stone/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-6 flex flex-col gap-3.5 text-[0.875rem]">
        <span className="flex items-start gap-3 text-stone">
          <MapPin size={16} className="mt-0.5 shrink-0 text-lime-deep" />
          <span>
            <span className="block font-semibold text-ink">{branch.region}</span>
            {branch.address}
          </span>
        </span>
        <span className="flex items-center gap-3 text-stone">
          <Phone size={16} className="shrink-0 text-lime-deep" />
          {branch.phone}
        </span>
        <span className="flex items-center gap-3 text-stone">
          <Clock size={16} className="shrink-0 text-lime-deep" />
          {branch.hours}
        </span>
      </div>
      <div className="mt-auto pt-8">
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase"
        >
          <span>{t.pages.branches.getDirections}</span>
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
      </div>
    </div>
  );
}