export interface LoanProduct {
  slug: string;
  name: string;
  category: string;
  short: string;
  audience: string;
  purpose: string;
  features: string[];
  example: boolean;
  description: string;
  sections: {
    title: string;
    items: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const loanProducts: LoanProduct[] = [
  {
    slug: "personal",
    name: "Personal",
    category: "CREDIT",
    short:
      "For members financing personal plans — weddings, travel, household needs and other personal goals.",
    audience: "Individual members",
    purpose: "Personal financial goals and needs.",
    features: ["Personal plans and needs", "Member-focused credit"],
    example: true,
    description:
      "Members often access credit for personal plans and life events. This is an example category shown to illustrate the kind of credit a cooperative can support.",
    sections: [
      {
        title: "Who can apply",
        items: [
          "Wisdom members in good standing",
          "Official eligibility criteria set by Wisdom apply",
        ],
      },
      {
        title: "Purpose",
        items: ["Personal financial goals and needs"],
      },
      {
        title: "Amount, term & rate",
        items: [
          "[OFFICIAL LOAN LIMITS]",
          "[OFFICIAL REPAYMENT PERIODS]",
          "[OFFICIAL INTEREST TERMS]",
          "Contact Wisdom for current terms.",
        ],
      },
      {
        title: "Collateral / guarantee",
        items: [
          "[OFFICIAL COLLATERAL / GUARANTEE REQUIREMENTS]",
          "Subject to Wisdom's assessment and applicable policies.",
        ],
      },
      {
        title: "Required documents",
        items: [
          "[OFFICIAL DOCUMENT REQUIREMENTS]",
          "Contact Wisdom for the current application checklist.",
        ],
      },
      {
        title: "Application process",
        items: [
          "Apply as a Wisdom member",
          "Wisdom assesses each application according to its policies",
          "Contact Wisdom for the current application steps",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I apply for a personal loan as a new member?",
        answer:
          "Eligibility follows Wisdom's official rules. Contact Wisdom to confirm the current criteria and application steps.",
      },
      {
        question: "What are the current loan terms?",
        answer:
          "Wisdom publishes official loan terms. Contact Wisdom for the most current information on limits, periods and rates.",
      },
    ],
  },
  {
    slug: "business",
    name: "Business",
    category: "CREDIT",
    short:
      "For members growing small businesses — stock, equipment, working capital and expansion.",
    audience: "Members running small businesses",
    purpose: "Business investment, stock and working capital.",
    features: ["Small business support", "Working capital"],
    example: true,
    description:
      "Many cooperative members are entrepreneurs. This is an example category shown to illustrate the kind of credit a cooperative can support.",
    sections: [
      {
        title: "Who can apply",
        items: [
          "Wisdom members in good standing",
          "Official eligibility criteria set by Wisdom apply",
        ],
      },
      {
        title: "Purpose",
        items: ["Business investment, stock and working capital"],
      },
      {
        title: "Amount, term & rate",
        items: [
          "[OFFICIAL LOAN LIMITS]",
          "[OFFICIAL REPAYMENT PERIODS]",
          "[OFFICIAL INTEREST TERMS]",
          "Contact Wisdom for current terms.",
        ],
      },
      {
        title: "Collateral / guarantee",
        items: [
          "[OFFICIAL COLLATERAL / GUARANTEE REQUIREMENTS]",
          "Subject to Wisdom's assessment and applicable policies.",
        ],
      },
      {
        title: "Required documents",
        items: [
          "[OFFICIAL DOCUMENT REQUIREMENTS]",
          "Contact Wisdom for the current application checklist.",
        ],
      },
    ],
    faqs: [
      {
        question: "What can a business loan be used for?",
        answer:
          "Business credit typically supports investment, stock and working capital. Final purpose rules follow Wisdom's official policies.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education",
    category: "CREDIT",
    short:
      "For members investing in education — school fees, training and learning opportunities.",
    audience: "Members investing in education",
    purpose: "School fees, training and learning costs.",
    features: ["Education investment", "Learning support"],
    example: true,
    description:
      "Cooperative credit can support members investing in education. This is an example category shown to illustrate the kind of credit a cooperative can support.",
    sections: [
      {
        title: "Who can apply",
        items: [
          "Wisdom members in good standing",
          "Official eligibility criteria set by Wisdom apply",
        ],
      },
      {
        title: "Purpose",
        items: ["School fees, training and learning costs"],
      },
      {
        title: "Amount, term & rate",
        items: [
          "[OFFICIAL LOAN LIMITS]",
          "[OFFICIAL REPAYMENT PERIODS]",
          "[OFFICIAL INTEREST TERMS]",
          "Contact Wisdom for current terms.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can education loans cover university fees?",
        answer:
          "Education credit follows Wisdom's official purpose rules. Contact Wisdom to confirm what the current product supports.",
      },
    ],
  },
  {
    slug: "emergency",
    name: "Emergency",
    category: "CREDIT",
    short:
      "For members facing urgent, unforeseen needs, where quick access to credit matters.",
    audience: "Members with urgent needs",
    purpose: "Urgent, unforeseen financial needs.",
    features: ["Timely access", "Member support in a crisis"],
    example: true,
    description:
      "A cooperative is there for its members in difficult moments. This is an example category shown to illustrate the kind of credit a cooperative can support.",
    sections: [
      {
        title: "Who can apply",
        items: [
          "Wisdom members in good standing",
          "Official eligibility criteria set by Wisdom apply",
        ],
      },
      {
        title: "Purpose",
        items: ["Urgent, unforeseen financial needs"],
      },
      {
        title: "Amount, term & rate",
        items: [
          "[OFFICIAL LOAN LIMITS]",
          "[OFFICIAL REPAYMENT PERIODS]",
          "[OFFICIAL INTEREST TERMS]",
          "Contact Wisdom for current terms.",
        ],
      },
    ],
    faqs: [
      {
        question: "How quickly can I access emergency credit?",
        answer:
          "Processing times follow Wisdom's official procedures. Contact Wisdom for current expectations.",
      },
    ],
  },
  {
    slug: "asset",
    name: "Asset",
    category: "CREDIT",
    short:
      "For members acquiring assets such as vehicles or equipment through the cooperative.",
    audience: "Members acquiring assets",
    purpose: "Vehicles, equipment and other assets.",
    features: ["Asset acquisition", "Structured repayment"],
    example: true,
    description:
      "Cooperative credit can help members acquire assets. This is an example category shown to illustrate the kind of credit a cooperative can support.",
    sections: [
      {
        title: "Who can apply",
        items: [
          "Wisdom members in good standing",
          "Official eligibility criteria set by Wisdom apply",
        ],
      },
      {
        title: "Purpose",
        items: ["Vehicles, equipment and other assets"],
      },
      {
        title: "Amount, term & rate",
        items: [
          "[OFFICIAL LOAN LIMITS]",
          "[OFFICIAL REPAYMENT PERIODS]",
          "[OFFICIAL INTEREST TERMS]",
          "Contact Wisdom for current terms.",
        ],
      },
    ],
    faqs: [
      {
        question: "What assets can be financed?",
        answer:
          "Financed assets follow Wisdom's official purpose rules. Contact Wisdom to confirm what the current product supports.",
      },
    ],
  },
  {
    slug: "housing",
    name: "Housing",
    category: "CREDIT",
    short:
      "For members working toward housing needs — construction, home improvement or related plans.",
    audience: "Members with housing plans",
    purpose: "Construction, home improvement and housing needs.",
    features: ["Housing investment", "Longer-term planning"],
    example: true,
    description:
      "A home is one of the biggest plans a member can build. This is an example category shown to illustrate the kind of credit a cooperative can support.",
    sections: [
      {
        title: "Who can apply",
        items: [
          "Wisdom members in good standing",
          "Official eligibility criteria set by Wisdom apply",
        ],
      },
      {
        title: "Purpose",
        items: ["Construction, home improvement and housing needs"],
      },
      {
        title: "Amount, term & rate",
        items: [
          "[OFFICIAL LOAN LIMITS]",
          "[OFFICIAL REPAYMENT PERIODS]",
          "[OFFICIAL INTEREST TERMS]",
          "Contact Wisdom for current terms.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can housing credit fund new construction?",
        answer:
          "Housing credit follows Wisdom's official purpose rules. Contact Wisdom to confirm what the current product supports.",
      },
    ],
  },
];

export const loansBySlug = Object.fromEntries(
  loanProducts.map((p) => [p.slug, p]),
);

export const loansIntro = {
  label: "03 / CREDIT",
  heading: "When you have a plan,\nwe can help you move.",
  statement:
    "Members save, and members access credit. Wisdom supports its members' plans with credit built on the cooperative's shared strength — assessed fairly and transparently under Wisdom's policies.",
  disclaimer:
    "The categories below are illustrative examples of the credit a cooperative can support. Wisdom's official loan products, limits, periods and rates will be published here as they are confirmed.",
};