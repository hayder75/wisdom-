import type { Metadata } from "next";
import { Inter, Manrope, Noto_Sans_Ethiopic } from "next/font/google";
import { cookies } from "next/headers";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import { organizationSchema, financialServiceSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Savings & Credit Cooperative`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "Wisdom SACCO",
    "SACCO Ethiopia",
    "savings and credit cooperative",
    "cooperative savings",
    "member savings Ethiopia",
    "cooperative credit",
    "SACCO membership",
    "financial services Ethiopia",
    "savings Ethiopia",
    "loans Ethiopia",
  ],
  openGraph: {
    title: `${site.name} — Savings & Credit Cooperative`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Savings & Credit Cooperative`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "am" ? "am" : "en";

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${manrope.variable} ${notoEthiopic.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}