export type FieldKind =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "url"
  | "image"
  | "select"
  | "stringList"
  | "object"
  | "nestedList";

export interface SchemaField {
  kind: FieldKind;
  key: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: string[];
  itemLabel?: string;
  description?: string;
  fields?: SchemaField[];
}

export interface ContentSchema {
  key: string;
  label: string;
  description?: string;
  fields: SchemaField[];
}

export const contentSchemas: ContentSchema[] = [
  {
    key: "settings",
    label: "Site settings",
    description: "Cooperative name, tagline and contact details.",
    fields: [
      { kind: "text", key: "name", label: "Cooperative name", required: true },
      { kind: "text", key: "shortName", label: "Short name" },
      { kind: "text", key: "tagline", label: "Tagline" },
      { kind: "textarea", key: "description", label: "Description", rows: 3 },
      { kind: "text", key: "email", label: "Email", placeholder: "name@example.com" },
      { kind: "text", key: "phone", label: "Phone", placeholder: "+251 …" },
      { kind: "text", key: "country", label: "Country" },
      { kind: "text", key: "countryIndicator", label: "Location indicator" },
    ],
  },
  {
    key: "hero",
    label: "Hero",
    description: "The main statement shown at the top of the homepage.",
    fields: [
      { kind: "text", key: "label", label: "Top label", required: true },
      {
        kind: "textarea",
        key: "motto",
        label: "Main motto",
        rows: 3,
        placeholder: "One line per line break (the last line is highlighted)",
      },
      { kind: "textarea", key: "serviceMotto", label: "Service promise", rows: 2, placeholder: "One line per line break (the last line is highlighted)" },
      {
        kind: "textarea",
        key: "supportingText",
        label: "Supporting text",
        rows: 3,
      },
      { kind: "text", key: "primaryCtaLabel", label: "Primary button label" },
      { kind: "url", key: "primaryCtaHref", label: "Primary button link" },
      { kind: "text", key: "secondaryCtaLabel", label: "Secondary button label" },
      { kind: "url", key: "secondaryCtaHref", label: "Secondary button link" },
      {
        kind: "nestedList",
        key: "slides",
        label: "Hero carousel slides",
        description: "Images shown in the carousel beside the hero text.",
        itemLabel: "Slide",
        fields: [
          { kind: "image", key: "image", label: "Image", required: true },
          { kind: "text", key: "title", label: "Title" },
          { kind: "textarea", key: "caption", label: "Caption", rows: 2 },
        ],
      },
    ],
  },
  {
    key: "savings",
    label: "Savings",
    description: "Savings intro and savings products with sections and FAQs.",
    fields: [
      {
        kind: "object",
        key: "intro",
        label: "Intro",
        fields: [
          { kind: "text", key: "label", label: "Label" },
          { kind: "text", key: "heading", label: "Heading" },
          { kind: "textarea", key: "statement", label: "Statement", rows: 3 },
        ],
      },
      {
        kind: "nestedList",
        key: "products",
        label: "Savings products",
        itemLabel: "Product",
        fields: [
          { kind: "text", key: "name", label: "Product name", required: true },
          { kind: "text", key: "slug", label: "Slug (URL)" },
          { kind: "textarea", key: "short", label: "Short description", rows: 2 },
          { kind: "text", key: "audience", label: "Who it's for" },
          { kind: "text", key: "benefit", label: "Key benefit" },
          { kind: "textarea", key: "description", label: "Full description", rows: 4 },
          {
            kind: "select",
            key: "featured",
            label: "Featured",
            options: ["true", "false"],
          },
          {
            kind: "nestedList",
            key: "sections",
            label: "Sections",
            itemLabel: "Section",
            fields: [
              { kind: "text", key: "title", label: "Section title" },
              { kind: "stringList", key: "items", label: "Items", itemLabel: "Item" },
            ],
          },
          {
            kind: "nestedList",
            key: "faqs",
            label: "FAQs",
            itemLabel: "FAQ",
            fields: [
              { kind: "text", key: "question", label: "Question" },
              { kind: "textarea", key: "answer", label: "Answer", rows: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "loans",
    label: "Loans & credit",
    description: "Loans intro and loan products with sections and FAQs.",
    fields: [
      {
        kind: "object",
        key: "intro",
        label: "Intro",
        fields: [
          { kind: "text", key: "label", label: "Label" },
          { kind: "text", key: "heading", label: "Heading" },
          { kind: "textarea", key: "statement", label: "Statement", rows: 3 },
          { kind: "textarea", key: "disclaimer", label: "Disclaimer", rows: 3 },
        ],
      },
      {
        kind: "nestedList",
        key: "products",
        label: "Loan products",
        itemLabel: "Product",
        fields: [
          { kind: "text", key: "name", label: "Product name", required: true },
          { kind: "text", key: "slug", label: "Slug (URL)" },
          { kind: "text", key: "category", label: "Category" },
          { kind: "textarea", key: "short", label: "Short description", rows: 2 },
          { kind: "text", key: "audience", label: "Who it's for" },
          { kind: "text", key: "purpose", label: "Purpose" },
          { kind: "textarea", key: "description", label: "Full description", rows: 4 },
          { kind: "stringList", key: "features", label: "Features", itemLabel: "Feature" },
          { kind: "select", key: "example", label: "Example category", options: ["true", "false"] },
          {
            kind: "nestedList",
            key: "sections",
            label: "Sections",
            itemLabel: "Section",
            fields: [
              { kind: "text", key: "title", label: "Section title" },
              { kind: "stringList", key: "items", label: "Items", itemLabel: "Item" },
            ],
          },
          {
            kind: "nestedList",
            key: "faqs",
            label: "FAQs",
            itemLabel: "FAQ",
            fields: [
              { kind: "text", key: "question", label: "Question" },
              { kind: "textarea", key: "answer", label: "Answer", rows: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "membership",
    label: "Membership",
    description: "Membership intro, journey, benefits, rights and responsibilities.",
    fields: [
      {
        kind: "object",
        key: "intro",
        label: "Intro",
        fields: [
          { kind: "text", key: "label", label: "Label" },
          { kind: "text", key: "heading", label: "Heading" },
          { kind: "textarea", key: "statement", label: "Statement", rows: 3 },
        ],
      },
      {
        kind: "nestedList",
        key: "journey",
        label: "Membership journey",
        itemLabel: "Step",
        fields: [
          { kind: "text", key: "number", label: "Number" },
          { kind: "text", key: "title", label: "Title" },
          { kind: "textarea", key: "text", label: "Description", rows: 2 },
        ],
      },
      {
        kind: "nestedList",
        key: "benefits",
        label: "Benefits",
        itemLabel: "Benefit",
        fields: [
          { kind: "text", key: "title", label: "Title" },
          { kind: "textarea", key: "text", label: "Description", rows: 2 },
        ],
      },
      { kind: "stringList", key: "rights", label: "Member rights", itemLabel: "Right" },
      { kind: "stringList", key: "responsibilities", label: "Member responsibilities", itemLabel: "Responsibility" },
    ],
  },
  {
    key: "features",
    label: "Why Wisdom & growth journey",
    description: "The 'Why Wisdom' values and the financial growth journey steps.",
    fields: [
      {
        kind: "nestedList",
        key: "whyWisdom",
        label: "Why Wisdom values",
        itemLabel: "Value",
        fields: [
          { kind: "text", key: "title", label: "Title", required: true },
          { kind: "textarea", key: "text", label: "Description", rows: 2 },
        ],
      },
      {
        kind: "nestedList",
        key: "growthJourney",
        label: "Financial growth journey",
        itemLabel: "Step",
        fields: [
          { kind: "text", key: "key", label: "Key (e.g. SAVE)", required: true },
          { kind: "text", key: "title", label: "Title" },
          { kind: "textarea", key: "text", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    key: "stats",
    label: "Statistics",
    description: "The figures shown in 'Wisdom in numbers'.",
    fields: [
      {
        kind: "nestedList",
        key: "stats",
        label: "Figures",
        itemLabel: "Figure",
        fields: [
          { kind: "text", key: "value", label: "Value (e.g. 1,200+)", required: true },
          { kind: "text", key: "label", label: "Label", required: true },
          { kind: "text", key: "note", label: "Note" },
        ],
      },
    ],
  },
  {
    key: "articles",
    label: "News & financial education",
    description: "News articles and financial education topics.",
    fields: [
      {
        kind: "nestedList",
        key: "news",
        label: "News articles",
        itemLabel: "Article",
        fields: [
          { kind: "text", key: "slug", label: "Slug (URL)" },
          { kind: "text", key: "category", label: "Category" },
          { kind: "text", key: "title", label: "Title", required: true },
          { kind: "textarea", key: "short", label: "Short description", rows: 2 },
          { kind: "url", key: "image", label: "Image URL" },
          { kind: "text", key: "date", label: "Date" },
          { kind: "select", key: "published", label: "Published", options: ["true", "false"] },
          { kind: "stringList", key: "body", label: "Body paragraphs", itemLabel: "Paragraph" },
        ],
      },
      {
        kind: "nestedList",
        key: "education",
        label: "Financial education topics",
        itemLabel: "Topic",
        fields: [
          { kind: "text", key: "slug", label: "Slug (URL)" },
          { kind: "text", key: "topic", label: "Topic" },
          { kind: "text", key: "title", label: "Title", required: true },
          { kind: "textarea", key: "short", label: "Short description", rows: 2 },
          { kind: "url", key: "image", label: "Image URL" },
          { kind: "stringList", key: "body", label: "Body paragraphs", itemLabel: "Paragraph" },
        ],
      },
    ],
  },
  {
    key: "branches",
    label: "Branches",
    description: "Branch locations and contact details.",
    fields: [
      {
        kind: "nestedList",
        key: "branches",
        label: "Branches",
        itemLabel: "Branch",
        fields: [
          { kind: "text", key: "name", label: "Branch name", required: true },
          { kind: "image", key: "image", label: "Branch image" },
          { kind: "text", key: "region", label: "Region / city" },
          { kind: "text", key: "address", label: "Address" },
          { kind: "text", key: "phone", label: "Phone" },
          { kind: "text", key: "hours", label: "Office hours" },
          { kind: "url", key: "mapUrl", label: "Map URL" },
        ],
      },
    ],
  },
];

export const contentSchemaByKey = Object.fromEntries(
  contentSchemas.map((s) => [s.key, s]),
);