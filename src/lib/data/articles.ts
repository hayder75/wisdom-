export interface Article {
  slug: string;
  category: string;
  title: string;
  short: string;
  image: string;
  date: string;
  published: boolean;
  body: string[];
}

function img(id: string, w: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const newsArticles: Article[] = [
  {
    slug: "wisdom-announcements",
    category: "Announcement",
    title: "Wisdom's latest updates",
    short: "Official announcements from Wisdom will be published here.",
    image: img("20879646", 1600),
    date: "Publishing soon",
    published: false,
    body: [
      "Wisdom will publish its official announcements here — updates for members, notices and cooperative news.",
      "Until then, contact Wisdom directly for the latest information.",
    ],
  },
  {
    slug: "member-stories",
    category: "Member Stories",
    title: "Member stories",
    short: "Real stories from Wisdom members will be featured here.",
    image: img("13597868", 1600),
    date: "Publishing soon",
    published: false,
    body: [
      "Wisdom will share the stories of its members here — real people, real progress.",
      "Until then, contact Wisdom directly for the latest information.",
    ],
  },
  {
    slug: "community-initiatives",
    category: "Community",
    title: "Community initiatives",
    short: "Wisdom's community work will be shared here.",
    image: img("33609158", 1600),
    date: "Publishing soon",
    published: false,
    body: [
      "Wisdom will share its community initiatives here — cooperative activities and member engagement.",
      "Until then, contact Wisdom directly for the latest information.",
    ],
  },
];

export const newsBySlug = Object.fromEntries(
  newsArticles.map((a) => [a.slug, a]),
);

export interface EducationArticle {
  slug: string;
  topic: string;
  title: string;
  short: string;
  image: string;
  body: string[];
}

export const educationArticles: EducationArticle[] = [
  {
    slug: "saving",
    topic: "Saving",
    title: "Saving",
    short:
      "How a regular saving habit builds financial strength over time.",
    image: img("18053874", 1600),
    body: [
      "This is a planned topic in Wisdom's financial education series. Content is being prepared with Wisdom's approved educational material.",
      "Contact Wisdom to learn how its financial education programme supports members.",
    ],
  },
  {
    slug: "budgeting",
    topic: "Budgeting",
    title: "Budgeting",
    short:
      "A simple approach to planning income and spending.",
    image: img("18647872", 1600),
    body: [
      "This is a planned topic in Wisdom's financial education series. Content is being prepared with Wisdom's approved educational material.",
      "Contact Wisdom to learn how its financial education programme supports members.",
    ],
  },
  {
    slug: "responsible-borrowing",
    topic: "Responsible borrowing",
    title: "Responsible borrowing",
    short:
      "Understanding credit, repayment and borrowing within your means.",
    image: img("12495386", 1600),
    body: [
      "This is a planned topic in Wisdom's financial education series. Content is being prepared with Wisdom's approved educational material.",
      "Contact Wisdom to learn how its financial education programme supports members.",
    ],
  },
  {
    slug: "loan-preparation",
    topic: "Loan preparation",
    title: "Preparing to access credit",
    short:
      "What it means to approach credit with a clear plan.",
    image: img("25391223", 1600),
    body: [
      "This is a planned topic in Wisdom's financial education series. Content is being prepared with Wisdom's approved educational material.",
      "Contact Wisdom to learn how its financial education programme supports members.",
    ],
  },
  {
    slug: "financial-planning",
    topic: "Financial planning",
    title: "Financial planning",
    short:
      "Thinking about your finances as a longer-term journey.",
    image: img("20879645", 1600),
    body: [
      "This is a planned topic in Wisdom's financial education series. Content is being prepared with Wisdom's approved educational material.",
      "Contact Wisdom to learn how its financial education programme supports members.",
    ],
  },
  {
    slug: "emergency-funds",
    topic: "Emergency funds",
    title: "Emergency funds",
    short:
      "Why having a reserve matters, and how saving supports it.",
    image: img("20865974", 1600),
    body: [
      "This is a planned topic in Wisdom's financial education series. Content is being prepared with Wisdom's approved educational material.",
      "Contact Wisdom to learn how its financial education programme supports members.",
    ],
  },
];

export const educationBySlug = Object.fromEntries(
  educationArticles.map((a) => [a.slug, a]),
);