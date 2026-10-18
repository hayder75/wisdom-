export interface SavingsProduct {
  slug: string;
  name: string;
  short: string;
  featured?: boolean;
  audience: string;
  benefit: string;
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

export const savingsProducts: SavingsProduct[] = [
  {
    slug: "featured-savings",
    name: "[FEATURED SAVINGS PRODUCT]",
    short:
      "Wisdom's core savings service. Official product name, structure and terms are confirmed by Wisdom and published here.",
    featured: true,
    audience: "Open to Wisdom members",
    benefit: "A structured way to build a savings balance within the cooperative.",
    description:
      "Savings are the foundation of the Wisdom cooperative model. Members contribute through savings according to Wisdom's actual structure, building personal balances while supporting the cooperative as a whole.",
    sections: [
      {
        title: "Purpose",
        items: [
          "Build a personal savings balance within the cooperative",
          "Support the member-owned capital that Wisdom operates on",
          "Create a base of financial strength for each member",
        ],
      },
      {
        title: "Eligibility",
        items: [
          "Open to Wisdom members in good standing",
          "Official criteria confirmed by Wisdom apply",
        ],
      },
      {
        title: "How it works",
        items: [
          "Open a savings account as a Wisdom member",
          "Contribute according to Wisdom's savings arrangements",
          "Track your balance through Wisdom's member services",
        ],
      },
      {
        title: "Rates & dividends",
        items: [
          "[OFFICIAL RATE / DIVIDEND INFORMATION]",
          "Contact Wisdom for current terms.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I open a savings account?",
        answer:
          "Become a Wisdom member, then open your savings account through Wisdom's official process. Contact Wisdom for the current steps and required documents.",
      },
      {
        question: "What are the current savings terms?",
        answer:
          "Wisdom publishes official savings terms. Contact Wisdom for the most current information on minimums, frequency and access rules.",
      },
    ],
  },
  {
    slug: "savings-product-two",
    name: "[SAVINGS PRODUCT TWO]",
    short:
      "A second savings arrangement for members. Official name, structure and terms are confirmed by Wisdom and published here.",
    audience: "Open to Wisdom members",
    benefit: "Another way to save within the cooperative, per Wisdom's structure.",
    description:
      "Wisdom offers members more than one way to save. This product's exact structure, purpose and terms follow Wisdom's official model.",
    sections: [
      {
        title: "Purpose",
        items: [
          "Support members' saving goals through the cooperative",
          "Follow Wisdom's official savings arrangements",
        ],
      },
      {
        title: "Eligibility",
        items: [
          "Open to Wisdom members in good standing",
          "Official criteria confirmed by Wisdom apply",
        ],
      },
      {
        title: "Rates & dividends",
        items: [
          "[OFFICIAL RATE / DIVIDEND INFORMATION]",
          "Contact Wisdom for current terms.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the current terms?",
        answer:
          "Wisdom publishes official savings terms. Contact Wisdom for the most current information.",
      },
    ],
  },
  {
    slug: "savings-product-three",
    name: "[SAVINGS PRODUCT THREE]",
    short:
      "A further savings arrangement for members. Official name, structure and terms are confirmed by Wisdom and published here.",
    audience: "Open to Wisdom members",
    benefit: "More flexibility to save, per Wisdom's official structure.",
    description:
      "Wisdom structures its savings services around members. This product's exact details follow Wisdom's official model.",
    sections: [
      {
        title: "Purpose",
        items: [
          "Extend the ways members can save within the cooperative",
          "Follow Wisdom's official savings arrangements",
        ],
      },
      {
        title: "Eligibility",
        items: [
          "Open to Wisdom members in good standing",
          "Official criteria confirmed by Wisdom apply",
        ],
      },
      {
        title: "Rates & dividends",
        items: [
          "[OFFICIAL RATE / DIVIDEND INFORMATION]",
          "Contact Wisdom for current terms.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the current terms?",
        answer:
          "Wisdom publishes official savings terms. Contact Wisdom for the most current information.",
      },
    ],
  },
];

export const savingsBySlug = Object.fromEntries(
  savingsProducts.map((p) => [p.slug, p]),
);

export const savingsIntro = {
  label: "02 / SAVINGS",
  heading: "Small habits.\nStronger futures.",
  statement:
    "A SACCO works because members save together. Each member builds their own balance, and the cooperative grows on the strength of those combined savings.",
};