// Generates the data/*.json seed documents from the static content modules.
// Run: node scripts/seed-content.mjs  (from the project root)
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);

function loadModule(relPath) {
  const source = require("fs").readFileSync(relPath, "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: relPath,
  }).outputText;
  const m = { exports: {} };
  new Function("exports", "require", "module", "__dirname", js)(m.exports, require, m, process.cwd());
  return m.exports;
}

const savings = loadModule("src/lib/data/savings.ts");
const loans = loadModule("src/lib/data/loans.ts");
const membership = loadModule("src/lib/data/membership.ts");
const features = loadModule("src/lib/data/features.ts");
const stats = loadModule("src/lib/data/stats.ts");
const articles = loadModule("src/lib/data/articles.ts");
const branches = loadModule("src/lib/data/branches.ts");

const documents = {
  settings: {
    name: "Wisdom SACCO",
    shortName: "Wisdom",
    tagline: "Financial growth, built together.",
    description:
      "Wisdom is a member-owned Savings and Credit Cooperative (SACCO) helping its members save, access credit and build stronger financial futures through cooperative finance.",
    email: "[OFFICIAL EMAIL ADDRESS]",
    phone: "[OFFICIAL PHONE NUMBER]",
    country: "Ethiopia",
    countryIndicator: "ADDIS ABABA · ETHIOPIA",
  },
  hero: {
    label: "wisdom saccos",
    motto: "Build your future together.",
    serviceMotto: "We strive for excellent service.",
    supportingText:
      "Helping members save, access credit and build stronger financial futures through cooperative finance.",
    primaryCtaLabel: "Become a Member",
    primaryCtaHref: "/membership",
    secondaryCtaLabel: "Explore Services",
    secondaryCtaHref: "/savings",
  },
  savings: { intro: savings.savingsIntro, products: savings.savingsProducts },
  loans: { intro: loans.loansIntro, products: loans.loanProducts },
  membership: {
    intro: membership.membershipIntro,
    journey: membership.membershipJourney,
    benefits: membership.membershipBenefits,
    rights: membership.memberRights,
    responsibilities: membership.memberResponsibilities,
  },
  features: { whyWisdom: features.whyWisdom, growthJourney: features.growthJourney },
  stats: { stats: [...stats.stats] },
  articles: { news: articles.newsArticles, education: articles.educationArticles },
  branches: { branches: branches.branches },
};

mkdirSync("data", { recursive: true });
for (const [key, value] of Object.entries(documents)) {
  writeFileSync(`data/${key}.json`, JSON.stringify(value, null, 2) + "\n");
  console.log(`wrote data/${key}.json`);
}