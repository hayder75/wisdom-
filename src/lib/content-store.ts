import { promises as fs } from "node:fs";
import path from "node:path";
import type { Lang } from "@/lib/i18n";
import type { Branch } from "@/lib/data/branches";
import type { SavingsProduct } from "@/lib/data/savings";
import type { LoanProduct } from "@/lib/data/loans";
import type { Article, EducationArticle } from "@/lib/data/articles";

export type {
  Branch,
  SavingsProduct,
  LoanProduct,
  Article,
  EducationArticle,
};

export interface SettingsDocument {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  country: string;
  countryIndicator: string;
}

export interface HeroSlide {
  image: string;
  title?: string;
  caption?: string;
}

export interface HeroDocument {
  label: string;
  motto: string;
  serviceMotto: string;
  supportingText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  slides: HeroSlide[];
}

export interface SavingsDocument {
  intro: { label: string; heading: string; statement: string };
  products: SavingsProduct[];
}

export interface LoansDocument {
  intro: {
    label: string;
    heading: string;
    statement: string;
    disclaimer: string;
  };
  products: LoanProduct[];
}

export interface MembershipDocument {
  intro: { label: string; heading: string; statement: string };
  journey: { number: string; title: string; text: string }[];
  benefits: { title: string; text: string }[];
  rights: string[];
  responsibilities: string[];
}

export interface FeaturesDocument {
  whyWisdom: { title: string; text: string }[];
  growthJourney: { key: string; title: string; text: string }[];
}

export interface StatsDocument {
  stats: { value: string; label: string; note: string }[];
}

export interface ArticlesDocument {
  news: Article[];
  education: EducationArticle[];
}

export interface BranchesDocument {
  branches: Branch[];
}

const dataDir = path.join(process.cwd(), "data");

export function contentFile(key: string, lang?: Lang): string {
  return lang === "am" ? `${key}-am.json` : `${key}.json`;
}

export async function readContent<T>(key: string, fallback: T, lang?: Lang): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(dataDir, contentFile(key, lang)), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeContent(
  key: string,
  value: unknown,
  lang?: Lang,
): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    path.join(dataDir, contentFile(key, lang)),
    JSON.stringify(value, null, 2),
    "utf8",
  );
}

export async function getSettings(lang?: Lang): Promise<SettingsDocument> {
  return readContent("settings", {
    name: "Wisdom SACCO",
    shortName: "Wisdom",
    tagline: "Financial growth, built together.",
    description:
      "Wisdom is a member-owned Savings and Credit Cooperative (SACCO) helping its members save, access credit and build stronger financial futures through cooperative finance.",
    email: "[OFFICIAL EMAIL ADDRESS]",
    phone: "[OFFICIAL PHONE NUMBER]",
    country: "Ethiopia",
    countryIndicator: "ADDIS ABABA · ETHIOPIA",
  }, lang);
}

export async function getHero(lang?: Lang): Promise<HeroDocument> {
  return readContent("hero", {
    label: "wisdom saccos",
    motto: "Build your\nfuture\ntogether.",
    serviceMotto: "We drive for\nexcellent service.",
    supportingText:
      "Helping members Save, access credit and build stronger financial futures through cooperative finance.",
    primaryCtaLabel: "Become a Member",
    primaryCtaHref: "/membership",
    secondaryCtaLabel: "Explore Services",
    secondaryCtaHref: "/savings",
    slides: [
      {
        image: "/hero-background.jpg",
        title: "Savings & Credit",
        caption: "Build your financial future together.",
      },
      {
        image: "/saving.webp",
        title: "Member Savings",
        caption: "Small habits. Stronger futures.",
      },
      {
        image: "/photo_2026-08-12_23-18-05.jpg",
        title: "Cooperative Finance",
        caption: "Owned by the community it serves.",
      },
    ],
  }, lang);
}

export async function getSavings(lang?: Lang): Promise<SavingsDocument> {
  const { savingsIntro, savingsProducts } = await import("@/lib/data/savings");
  return readContent("savings", {
    intro: savingsIntro,
    products: savingsProducts,
  }, lang);
}

export async function getLoans(lang?: Lang): Promise<LoansDocument> {
  const { loansIntro, loanProducts } = await import("@/lib/data/loans");
  return readContent("loans", {
    intro: loansIntro,
    products: loanProducts,
  }, lang);
}

export async function getMembership(lang?: Lang): Promise<MembershipDocument> {
  const m = await import("@/lib/data/membership");
  return readContent("membership", {
    intro: m.membershipIntro,
    journey: m.membershipJourney,
    benefits: m.membershipBenefits,
    rights: m.memberRights,
    responsibilities: m.memberResponsibilities,
  }, lang);
}

export async function getFeatures(lang?: Lang): Promise<FeaturesDocument> {
  const { whyWisdom, growthJourney } = await import("@/lib/data/features");
  return readContent("features", { whyWisdom, growthJourney }, lang);
}

export async function getStats(lang?: Lang): Promise<StatsDocument> {
  const { stats } = await import("@/lib/data/stats");
  return readContent("stats", { stats: [...stats] }, lang);
}

export async function getArticles(lang?: Lang): Promise<ArticlesDocument> {
  const { newsArticles, educationArticles } = await import("@/lib/data/articles");
  return readContent("articles", {
    news: newsArticles,
    education: educationArticles,
  }, lang);
}

export async function getBranches(lang?: Lang): Promise<BranchesDocument> {
  const { branches } = await import("@/lib/data/branches");
  return readContent("branches", { branches }, lang);
}

export interface ContentMeta {
  key: string;
  label: string;
  description: string;
}

export const contentMeta: ContentMeta[] = [
  {
    key: "settings",
    label: "Site settings",
    description: "Cooperative name, tagline, contact details.",
  },
  {
    key: "hero",
    label: "Hero",
    description: "Hero label, motto, service promise and CTAs.",
  },
  {
    key: "savings",
    label: "Savings",
    description: "Savings intro and savings products with sections and FAQs.",
  },
  {
    key: "loans",
    label: "Loans & credit",
    description: "Loans intro and loan products with sections and FAQs.",
  },
  {
    key: "membership",
    label: "Membership",
    description: "Membership intro, journey, benefits, rights and responsibilities.",
  },
  {
    key: "features",
    label: "Why Wisdom & growth journey",
    description: "The 'Why Wisdom' values and the financial growth journey steps.",
  },
  {
    key: "stats",
    label: "Statistics",
    description: "The figures shown in 'Wisdom in numbers'.",
  },
  {
    key: "articles",
    label: "News & financial education",
    description: "News articles and financial education topics.",
  },
  {
    key: "branches",
    label: "Branches",
    description: "Branch locations and contact details.",
  },
];