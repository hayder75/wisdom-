import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getArticles, getLoans, getSavings } from "@/lib/content-store";
import { locales } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: "monthly" | "yearly" | "weekly";
  }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/savings", priority: 0.9, changeFrequency: "monthly" },
    { path: "/loans", priority: 0.9, changeFrequency: "monthly" },
    { path: "/membership", priority: 0.9, changeFrequency: "monthly" },
    { path: "/financial-education", priority: 0.7, changeFrequency: "monthly" },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" },
    { path: "/vacancies", priority: 0.6, changeFrequency: "weekly" },
    { path: "/branches", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  const [savings, loans, articles] = await Promise.all([
    getSavings(),
    getLoans(),
    getArticles(),
  ]);

  const urls: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    const prefix = `/${lang}`;
    for (const route of staticRoutes) {
      urls.push({
        url: `${base}${prefix}${route.path}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
    for (const p of savings.products) {
      urls.push({
        url: `${base}${prefix}/savings/${p.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const l of loans.products) {
      urls.push({
        url: `${base}${prefix}/loans/${l.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const a of articles.news) {
      urls.push({
        url: `${base}${prefix}/news/${a.slug}`,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
    for (const a of articles.education) {
      urls.push({
        url: `${base}${prefix}/financial-education/${a.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return urls;
}