import { site } from "@/lib/site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  description: site.description,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    addressCountry: "ET",
  },
  areaServed: "Ethiopia",
  knowsAbout: [
    "Savings and credit cooperative",
    "SACCO Ethiopia",
    "Cooperative savings",
    "Member savings",
    "Cooperative credit",
    "SACCO membership",
    "Financial services Ethiopia",
  ],
  sameAs: [],
};

export const financialServiceSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: site.name,
  description: site.description,
  slogan: site.tagline,
  areaServed: "Ethiopia",
  currenciesAccepted: "ETB",
  knowsAbout: ["Savings", "Credit", "Cooperative finance", "Member ownership"],
};