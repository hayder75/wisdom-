function img(id: string, w: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const site = {
  name: "Wisdom SACCO",
  shortName: "Wisdom",
  tagline: "Financial growth, built together.",
  description:
    "Wisdom is a member-owned Savings and Credit Cooperative (SACCO) helping its members save, access credit and build stronger financial futures through cooperative finance.",
  email: "[OFFICIAL EMAIL ADDRESS]",
  phone: "[OFFICIAL PHONE NUMBER]",
  country: "Ethiopia",
  countryIndicator: "ADDIS ABABA · ETHIOPIA",
  url: "https://wisdom-sacco.example.com",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Savings", href: "/savings" },
  { label: "Loans", href: "/loans" },
  { label: "Membership", href: "/membership" },
  { label: "News", href: "/news" },
  { label: "Vacancies", href: "/vacancies" },
  { label: "Contact", href: "/contact" },
] as const;

export const images = {
  hero: {
    src: img("6694569", 2400),
    alt: "Managing finances with a calculator and documents",
  },
  cooperative: img("3184292", 1600),
  savingsFeatured: img("4386373", 1600),
  savingsSecondaryOne: img("4386366", 1200),
  savingsSecondaryTwo: img("4038853", 1200),
  loans: img("5900179", 1600),
  member: img("5900188", 1200),
  membership: img("5900188", 1600),
  community: img("4308045", 2400),
  education: img("7821487", 1600),
  budgeting: img("669619", 1600),
  signing: img("4491441", 1600),
  teamTech: img("7698707", 1600),
  workshop: img("6964105", 1600),
  friends: img("6964346", 1600),
  volunteering: img("4968631", 1600),
  landscape: img("5900162", 2400),
  finalCta: img("5900184", 2400),
} as const;