export type Lang = "en" | "am";

export const locales: Lang[] = ["en", "am"];
export const defaultLocale: Lang = "en";

export function getLangFromPathname(pathname: string): Lang {
  const seg = pathname.split("/")[1];
  return locales.includes(seg as Lang) ? (seg as Lang) : defaultLocale;
}

export function localizeHref(href: string, lang: Lang): string {
  if (!href) return href;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (href.startsWith("/admin") || href.startsWith("/api") || href.startsWith("/_next")) return href;
  for (const l of locales) {
    if (href === `/${l}` || href.startsWith(`/${l}/`)) return href;
  }
  if (href === "/") return `/${lang}`;
  return `/${lang}${href}`;
}

export const dict = {
  metadata: {
    en: {
      title: "Savings & Credit Cooperative",
      description:
        "Wisdom is a member-owned Savings and Credit Cooperative (SACCO) helping its members save, access credit and build stronger financial futures through cooperative finance.",
    },
    am: {
      title: "የቁጠባና ብድር ኅብረት ሥራ ማህበር",
      description:
        "ዊዝደም በአባላት ባለቤትነት የሚተዳደር የቁጠባና ብድር ኅብረት ሥራ ማህበር (ሳኮ) ሲሆን፤ አባላቱ እንዲቆጥቡ፣ ብድር እንዲያገኙና በህብረት ፋይናንስ አማካኝነት አስተማማኝ የወደፊት የፋይናንስ ህይወት እንዲገነቡ ያግዛል።",
    },
  },
  nav: {
    en: {
      home: "Home",
      about: "About",
      savings: "Savings",
      loans: "Loans",
      membership: "Membership",
      news: "News",
      vacancies: "Vacancies",
      contact: "Contact",
      join: "Join Wisdom",
      ethiopia: "Ethiopia",
    },
    am: {
      home: "መነሻ",
      about: "ስለ እኛ",
      savings: "ቁጠባ",
      loans: "ብድር",
      membership: "አባልነት",
      news: "ዜና",
      vacancies: "ክፍት የሥራ ቦታዎች",
      contact: "አግኙን",
      join: "ዊዝደምን ይቀላቀሉ",
      ethiopia: "ኢትዮጵያ",
    },
  },
  hero: {
    en: {
      indicators: ["MEMBER-OWNED", "COMMUNITY-DRIVEN", "FINANCIAL GROWTH"],
      scroll: "Scroll",
    },
    am: {
      indicators: ["የአባላት ባለቤትነት", "በማህበረሰብ የሚመራ", "የፋይናንስ እድገት"],
      scroll: "ወደ ታች ይሸብልሉ",
    },
  },
  marquee: {
    en: ["MEMBER-OWNED", "COMMUNITY-DRIVEN", "FINANCIAL GROWTH", "SAVING TOGETHER", "BUILDING TOGETHER"],
    am: ["የአባላት ባለቤትነት", "በማህበረሰብ የሚመራ", "የፋይናንስ እድገት", "አብሮ መቆጠብ", "አብሮ መገንባት"],
  },
  footer: {
    en: {
      explore: "Explore",
      resources: "Resources",
      support: "Support",
      about: "About",
      savings: "Savings",
      loans: "Loans",
      membership: "Membership",
      financialEducation: "Financial Education",
      news: "News",
      vacancies: "Vacancies",
      branches: "Branches",
      contact: "Contact",
      joinWisdom: "Join Wisdom",
      privacy: "Privacy Policy",
      terms: "Terms",
      rights: "All rights reserved.",
    },
    am: {
      explore: "ይዳስሱ",
      resources: "ጠቃሚ መረጃዎች",
      support: "ድጋፍ",
      about: "ስለ እኛ",
      savings: "ቁጠባ",
      loans: "ብድር",
      membership: "አባልነት",
      financialEducation: "የፋይናንስ ትምህርት",
      news: "ዜና",
      vacancies: "ክፍት የሥራ ቦታዎች",
      branches: "ቅርንጫፎች",
      contact: "አግኙን",
      joinWisdom: "ዊዝደምን ይቀላቀሉ",
      privacy: "የግላዊነት ፖሊሲ",
      terms: "የአጠቃቀም ውሎች",
      rights: "ሁሉም መብቶች የተጠበቁ ናቸው።",
    },
  },
  cta: {
    en: {
      home: {
        label: "BECOME A MEMBER",
        heading: "Start building your\nfinancial future.",
        text: "Become part of a cooperative built around its members — where saving, credit and community work together.",
        primary: "Become a Member",
        secondary: "Contact Wisdom",
      },
      savingsDetail: {
        label: "SAVINGS",
        heading: "Start saving\nwith Wisdom.",
        text: "Become a member and begin building your savings within a cooperative built around its members.",
        primary: "Become a Member",
        secondary: "Contact Wisdom",
      },
      loans: {
        label: "ACCESS CREDIT",
        heading: "Become a member,\nthen access credit.",
        text: "Wisdom credit is built for members with a plan. Become a member, then explore what cooperative credit can support.",
        primary: "Become a Member",
        secondary: "Contact Wisdom",
      },
      loansDetail: {
        label: "ACCESS CREDIT",
        heading: "Become a member,\nthen access credit.",
        text: "Wisdom credit is built for members with a plan. Become a member, then explore what cooperative credit can support.",
        primary: "Become a Member",
        secondary: "Contact Wisdom",
      },
      membership: {
        label: "JOIN WISDOM",
        heading: "Start building your\nfinancial future.",
        text: "Become part of a cooperative built around its members — where saving, credit and community work together.",
        primary: "Start Application",
        secondary: "Contact Wisdom",
      },
      news: {
        label: "STAY CONNECTED",
        heading: "Keep up with\nWisdom.",
        text: "Follow Wisdom's news and announcements as the cooperative shares its story.",
        primary: "Become a Member",
        secondary: "Contact Wisdom",
      },
      newsDetail: {
        label: "NEWS & STORIES",
        heading: "The latest from\nWisdom.",
        text: "More announcements, member stories and community updates will be published here as Wisdom releases them.",
        primary: "All News",
        secondary: "Contact Wisdom",
      },
      education: {
        label: "FINANCIAL EDUCATION",
        heading: "Grow your\nfinancial knowledge.",
        text: "A cooperative helps its members understand money — saving, credit and planning for the future.",
        primary: "Become a Member",
        secondary: "Contact Wisdom",
      },
      educationDetail: {
        label: "FINANCIAL EDUCATION",
        heading: "Keep learning\nwith Wisdom.",
        text: "A cooperative helps its members understand money — saving, credit and planning for the future.",
        primary: "Browse the Library",
        secondary: "Contact Wisdom",
      },
      branches: {
        label: "VISIT WISDOM",
        heading: "Talk to Wisdom\nin person.",
        text: "Whether you're exploring membership or need information, Wisdom's team is ready to help.",
        primary: "Contact Wisdom",
        secondary: "Become a Member",
      },
      vacancies: {
        label: "WORK WITH WISDOM",
        heading: "Propose an open\napplication.",
        text: "Even when no role is listed, Wisdom welcomes serious applications from people who believe in cooperative finance.",
        primary: "Contact Wisdom",
        secondary: "About Wisdom",
      },
      vacancyDetail: {
        label: "WORK WITH WISDOM",
        heading: "See all open\nvacancies.",
        text: "Explore the roles currently available with the cooperative.",
        primary: "All Vacancies",
        secondary: "Contact Wisdom",
      },
    },
    am: {
      home: {
        label: "አባል ይሁኑ",
        heading: "የወደፊት የፋይናንስ ህይወትዎን\nመገንባት ይጀምሩ።",
        text: "በአባላቱ ዙሪያ በተገነባ ህብረት ውስጥ አባል ይሁኑ — ቁጠባ፣ ብድርና ማህበረሰብ ተቀናጅተው የሚሰሩበት።",
        primary: "አባል ይሁኑ",
        secondary: "ዊዝደምን ያግኙ",
      },
      savingsDetail: {
        label: "ቁጠባ",
        heading: "ከዊዝደም ጋር\nመቆጠብ ይጀምሩ።",
        text: "አባል ይሁኑና በአባላቱ ዙሪያ በተገነባው ህብረት ውስጥ ቁጠባዎን ማሳደግ ይጀምሩ።",
        primary: "አባል ይሁኑ",
        secondary: "ዊዝደምን ያግኙ",
      },
      loans: {
        label: "ብድር ያግኙ",
        heading: "አባል ይሁኑ፣\nከዚያም ብድር ያግኙ።",
        text: "የዊዝደም ብድር የታለመው ግልጽ እቅድ ላላቸው አባላት ነው። አባል ይሁኑ፣ ከዚያም የህብረት ብድር ምን ሊደግፍልዎ እንደሚችል ይመልከቱ።",
        primary: "አባል ይሁኑ",
        secondary: "ዊዝደምን ያግኙ",
      },
      loansDetail: {
        label: "ብድር ያግኙ",
        heading: "አባል ይሁኑ፣\nከዚያም ብድር ያግኙ።",
        text: "የዊዝደም ብድር የታለመው ግልጽ እቅድ ላላቸው አባላት ነው። አባል ይሁኑ፣ ከዚያም የህብረት ብድር ምን ሊደግፍልዎ እንደሚችል ይመልከቱ።",
        primary: "አባል ይሁኑ",
        secondary: "ዊዝደምን ያግኙ",
      },
      membership: {
        label: "ዊዝደምን ይቀላቀሉ",
        heading: "የወደፊት የፋይናንስ ህይወትዎን\nመገንባት ይጀምሩ።",
        text: "በአባላቱ ዙሪያ በተገነባ ህብረት ውስጥ አባል ይሁኑ — ቁጠባ፣ ብድርና ማህበረሰብ ተቀናጅተው የሚሰሩበት።",
        primary: "ማመልከቻ ይጀምሩ",
        secondary: "ዊዝደምን ያግኙ",
      },
      news: {
        label: "እንደተገናኙ ይቆዩ",
        heading: "የዊዝደምን ወቅታዊ መረጃዎች\nይከታተሉ።",
        text: "የህብረቱን ጉዞና ስኬቶች የሚያሳዩ የዊዝደም ዜናዎችንና ማስታወቂያዎችን ይከታተሉ።",
        primary: "አባል ይሁኑ",
        secondary: "ዊዝደምን ያግኙ",
      },
      newsDetail: {
        label: "ዜና እና ታሪኮች",
        heading: "ከዊዝደም\nየቅርብ ጊዜ መረጃ።",
        text: "ዊዝደም የሚያወጣቸው ተጨማሪ ማስታወቂያዎች፣ የአባላት ታሪኮችና የማህበረሰብ ዜናዎች እዚህ ይታተማሉ።",
        primary: "ሁሉንም ዜናዎች ይመልከቱ",
        secondary: "ዊዝደምን ያግኙ",
      },
      education: {
        label: "የፋይናንስ ትምህርት",
        heading: "የፋይናንስ\nእውቀትዎን ያሳድጉ።",
        text: "ህብረቱ አባላቱ ስለ ገንዘብ አያያዝ — ስለ መቆጠብ፣ ብድርና የወደፊት እቅድ ግንዛቤ እንዲኖራቸው ይረዳል።",
        primary: "አባል ይሁኑ",
        secondary: "ዊዝደምን ያግኙ",
      },
      educationDetail: {
        label: "የፋይናንስ ትምህርት",
        heading: "ከዊዝደም ጋር\nመማር ይቀጥሉ።",
        text: "ህብረቱ አባላቱ ስለ ገንዘብ አያያዝ — ስለ መቆጠብ፣ ብድርና የወደፊት እቅድ ግንዛቤ እንዲኖራቸው ይረዳል።",
        primary: "ሁሉንም ጽሑፎች ይመልከቱ",
        secondary: "ዊዝደምን ያግኙ",
      },
      branches: {
        label: "ዊዝደምን ይጎብኙ",
        heading: "በአካል መጥተው\nያነጋግሩን።",
        text: "ስለ አባልነት ማወቅ ቢፈልጉ ወይም ማንኛውም መረጃ ቢያስፈልግዎ የዊዝደም ቡድን እርስዎን ለመርዳት ዝግጁ ነው።",
        primary: "ዊዝደምን ያግኙ",
        secondary: "አባል ይሁኑ",
      },
      vacancies: {
        label: "ከዊዝደም ጋር ይስሩ",
        heading: "ክፍት ማመልከቻ\nያቅርቡ።",
        text: "ምንም ክፍት የሥራ ቦታ ባይኖርም፣ ዊዝደም በኅብረት ፋይናንስ ለሚያምኑና ፍላጎት ላላቸው አመልካቾች ሁልጊዜ በሩ ክፍት ነው።",
        primary: "ዊዝደምን ያግኙ",
        secondary: "ስለ እኛ",
      },
      vacancyDetail: {
        label: "ከዊዝደም ጋር ይስሩ",
        heading: "ሁሉንም ክፍት\nየሥራ ቦታዎች ይመልከቱ።",
        text: "በህብረቱ ውስጥ ያሉትን ሁሉንም ክፍት የሥራ ዕድሎች ይመልከቱ።",
        primary: "ሁሉም ክፍት የሥራ ቦታዎች",
        secondary: "ዊዝደምን ያግኙ",
      },
    },
  },
  journey: {
    en: {
      label: "01 / THE WISDOM MODEL",
      heading: "More than a customer. You're part of the cooperative.",
      subtitle: "Financial growth journey",
      note:
        "Members contribute through savings according to Wisdom's actual model. The cooperative provides financial services to its members, and members benefit from the institution's growth under its own rules and structure.",
    },
    am: {
      label: "01 / የዊዝደም ሞዴል",
      heading: "ከደንበኛ በላይ — የህብረቱ ባለቤት ነዎት።",
      subtitle: "የፋይናንስ እድገት ጉዞ",
      note:
        "አባላት በዊዝደም ተግባራዊ ሞዴል መሠረት በቁጠባ አስተዋጽኦ ያደርጋሉ። ህብረቱ ለአባላቱ የፋይናንስ አገልግሎቶችን ይሰጣል፤ አባላትም በህብረቱ ደንቦችና መዋቅር መሠረት ከተቋሙ እድገት ተጠቃሚ ይሆናሉ።",
    },
  },
  cards: {
    en: {
      featuredSavings: "Featured savings",
      savings: "Savings",
      whoItsFor: "Who it's for",
      keyBenefit: "Key benefit",
      requirements: "Requirements",
      exploreLoan: "Explore Loan",
      interestRate: "Interest rate",
      contactOffice: "Contact Office",
      growth: "Growth",
      high: "High",
      fullSpecs: "Full Specs",
      joinNow: "Join Now",
    },
    am: {
      featuredSavings: "ተመራጭ የቁጠባ አገልግሎት",
      savings: "ቁጠባ",
      whoItsFor: "ለማን የተዘጋጀ ነው",
      keyBenefit: "ዋና ጥቅም",
      requirements: "መስፈርቶች",
      exploreLoan: "ስለ ብድሩ ዝርዝር ይመልከቱ",
      interestRate: "የወለድ መጠን",
      contactOffice: "ቢሮ ያግኙ",
      growth: "እድገት",
      high: "ከፍተኛ",
      fullSpecs: "ሙሉ ዝርዝር",
      joinNow: "አሁን ይቀላቀሉ",
    },
  },
  common: {
    en: {
      becomeMember: "Become a Member",
      exploreServices: "Explore Services",
      exploreSavings: "Explore Savings",
      exploreLoans: "Explore Loans",
      explore: "Explore",
      learnMore: "Learn More",
      readArticle: "Read Article",
      allNews: "All News",
      browseLibrary: "Browse the Library",
      contactWisdom: "Contact Wisdom",
      howMembershipWorks: "How Membership Works",
      credit: "Credit",
      viewVacancy: "View Vacancy",
      sendApplication: "Send Your Application",
      allVacancies: "All Vacancies",
      viewWebsite: "View Website",
      savePublish: "Save & Publish",
      changesSaved: "Changes saved and published.",
    },
    am: {
      becomeMember: "አባል ይሁኑ",
      exploreServices: "አገልግሎቶችን ይመልከቱ",
      exploreSavings: "የቁጠባ አማራጮችን ይመልከቱ",
      exploreLoans: "የብድር አማራጮችን ይመልከቱ",
      explore: "ይመልከቱ",
      learnMore: "የበለጠ ይወቁ",
      readArticle: "ጽሑፉን ያንብቡ",
      allNews: "ሁሉም ዜናዎች",
      browseLibrary: "ሁሉንም ጽሑፎች ይመልከቱ",
      contactWisdom: "ዊዝደምን ያግኙ",
      howMembershipWorks: "አባልነት እንዴት እንደሚሰራ",
      credit: "ብድር",
      viewVacancy: "የሥራውን ዝርዝር ይመልከቱ",
      sendApplication: "ማመልከቻዎን ይላኩ",
      allVacancies: "ሁሉም ክፍት የሥራ ቦታዎች",
      viewWebsite: "ድረ-ገጹን ይመልከቱ",
      savePublish: "አስቀምጥና አትም",
      changesSaved: "ለውጦች በተሳካ ሁኔታ ተቀምጠው ታትመዋል።",
    },
  },
  home: {
    en: {
      whyWisdomLabel: "WHY WISDOM",
      whyWisdomHeading: "Financial growth works better when we build it together.",
      whyWisdomText:
        "Wisdom is a cooperative first. Every member contributes to its strength, and the institution exists to serve its members and its community.",
      statsLabel: "WISDOM IN NUMBERS",
      statsHeading: "A cooperative, growing with its members.",
      statsNote: "A growing cooperative — figures are updated by Wisdom as official results are published.",
      membershipLabel: "04 / MEMBERSHIP",
      membershipHeading: "More than a customer. You're a member.",
      membershipText:
        "When you join Wisdom, you become part of the cooperative. You save, you can access credit, you participate — and the cooperative's purpose is built around you and every other member.",
      communityLabel: "OUR COMMUNITY",
      communityHeading: "Growing stronger, together.",
      communityText:
        "Wisdom is a cooperative, not merely a provider of financial products. Member stories, community activities, financial education and cooperative initiatives will be shared here as Wisdom publishes them.",
      communityTags: ["MEMBER STORIES", "FINANCIAL EDUCATION", "COOPERATIVE INITIATIVES", "COMMUNITY"],
      educationLabel: "FINANCIAL EDUCATION",
      educationHeading: "Wisdom for your financial life.",
      educationTopic: "Topic",
      newsLabel: "NEWS & STORIES",
      newsHeading: "The latest from Wisdom.",
      savingsEmpty: "Savings products are being prepared and will be published here soon.",
      newsEmpty: "News and announcements will be published here as Wisdom shares them.",
      educationEmpty:
        "Financial education topics are being prepared and will be published here soon.",
      creditCardLabel: "Credit",
    },
    am: {
      whyWisdomLabel: "ለምን ዊዝደም",
      whyWisdomHeading: "የፋይናንስ እድገት አብረን ስንሰራ የበለጠ ውጤታማ ይሆናል።",
      whyWisdomText:
        "ዊዝደም በዋናነት በአባላቱ የተመሰረተ ህብረት ነው። እያንዳንዱ አባል ለጥንካሬው አስተዋጽኦ ያደርጋል፤ ተቋሙም አባላቱንና ማህበረሰቡን በታማኝነት ለማገልገል ጸንቶ ይሰራል።",
      statsLabel: "ዊዝደም በቁጥር",
      statsHeading: "ከአባላቱ ጋር እያደገ ያለ ህብረት።",
      statsNote: "እያደገ ያለ ህብረት — ኦፊሴላዊ መረጃዎች ሲረጋገጡ ቁጥሮቹ በዊዝደም ይዘመናሉ።",
      membershipLabel: "04 / አባልነት",
      membershipHeading: "ከደንበኛ በላይ — እርስዎ የህብረቱ ባለቤት ነዎት።",
      membershipText:
        "ዊዝደምን ሲቀላቀሉ የህብረቱ ሙሉ አካል ይሆናሉ። ይቆጥባሉ፣ ብድር ማግኘት ይችላሉ፣ በውሳኔዎች ይሳተፋሉ — የህብረቱ ዓላማም በእርስዎና በእያንዳንዱ አባል ዙሪያ የተገነባ ነው።",
      communityLabel: "ማህበረሰባችን",
      communityHeading: "አብረን እንጠናከራለን።",
      communityText:
        "ዊዝደም የፋይናንስ አገልግሎት አቅራቢ ብቻ ሳይሆን ጠንካራ ማህበረሰብም ጭምር ነው። የአባላት ታሪኮች፣ የማህበረሰብ ተግባራት፣ የፋይናንስ ትምህርትና የህብረት ተነሳሽነቶች በየጊዜው እዚህ ይጋራሉ።",
      communityTags: ["የአባላት ታሪኮች", "የፋይናንስ ትምህርት", "የህብረት ተነሳሽነቶች", "ማህበረሰብ"],
      educationLabel: "የፋይናንስ ትምህርት",
      educationHeading: "ለተሻለ የፋይናንስ ህይወትዎ ጥበብ።",
      educationTopic: "ርዕስ",
      newsLabel: "ዜና እና ታሪኮች",
      newsHeading: "ከዊዝደም የሚወጡ ወቅታዊ መረጃዎች።",
      savingsEmpty: "የቁጠባ አገልግሎቶች ዝርዝር በቅርቡ እዚህ ይታተማል።",
      newsEmpty: "ዜናዎችና ማስታወቂያዎች ዊዝደም ሲያጋራቸው እዚህ ይታተማሉ።",
      educationEmpty: "የትምህርት ርዕሶች እየተዘጋጁ ሲሆን በቅርቡ እዚህ ይታተማሉ።",
      creditCardLabel: "ብድር",
    },
  },
  detail: {
    en: {
      aboutThisService: "ABOUT THIS SERVICE",
      keyDetails: "KEY DETAILS",
      important: "Important",
      questions: "QUESTIONS",
      frequentlyAsked: "Frequently asked.",
      contactForTerms: "Contact Wisdom for current terms",
      exampleCategory: "Example category",
      importantNote:
        "Terms, minimums, frequency, access rules, rates and dividend information follow Wisdom's official model and are published here as Wisdom confirms them. Contact Wisdom for the most current information. Nothing on this page is an offer or commitment by Wisdom.",
      moreInfo:
        "Contact Wisdom directly for official information, announcements and updates.",
    },
    am: {
      aboutThisService: "ስለዚህ አገልግሎት",
      keyDetails: "ዋና ዋና ዝርዝሮች",
      important: "አስፈላጊ ማስታወሻ",
      questions: "ጥያቄዎች",
      frequentlyAsked: "በተደጋጋሚ የሚጠየቁ ጥያቄዎች።",
      contactForTerms: "ወቅታዊ ውሎችን ለማወቅ ዊዝደምን ያግኙ",
      exampleCategory: "የማሳያ ምድብ",
      importantNote:
        "ውሎች፣ ዝቅተኛ የቁጠባ መጠኖች፣ ድግግሞሽ፣ ገንዘብ የማውጣት ደንቦች፣ የወለድና የትርፍ ክፍፍል መረጃዎች የዊዝደምን ኦፊሴላዊ መመሪያ ይከተላሉ፤ ዊዝደም ሲያረጋግጣቸውም እዚህ ይታተማሉ። ወቅታዊ መረጃዎችን ለማግኘት ዊዝደምን ያግኙ። በዚህ ገጽ ላይ የቀረበው መረጃ በዊዝደም በኩል የቀረበ አስገዳጅ ውል ወይም ቃል ኪዳን አይደለም።",
      moreInfo:
        "ለኦፊሴላዊ መረጃ፣ ማስታወቂያዎችና ወቅታዊ ዝማኔዎች ዊዝደምን በቀጥታ ያግኙ።",
    },
  },
  pages: {
    about: {
      en: {
        label: "01 / ABOUT WISDOM",
        heading: "A cooperative built\naround its members.",
        description:
          "Wisdom is a Savings and Credit Cooperative (SACCO). It exists to help its members save, access credit and build stronger financial futures — and it is owned, in every meaningful sense, by the community it serves.",
        whoWeAre: "WHO WE ARE",
        visionMission: "VISION & MISSION",
        vision: "Vision",
        mission: "Mission",
        story: "Our story",
        coreValues: "CORE VALUES",
        valuesIntro: "Official values and governance arrangements will be published as Wisdom confirms them. These principles describe the cooperative's direction.",
        governance: "GOVERNANCE",
        governanceHeading: "A cooperative, governed by its members.",
        joinCta: "Learn how you can become part of the cooperative.",
        whoWeAreParas: [
          "Wisdom is a cooperative financial institution. That means the people who save with Wisdom are not customers of the institution — they are members of it.",
          "Members contribute through savings and participation according to Wisdom's actual model. In return, the cooperative provides financial services to its members, and members benefit from the institution's growth under its own rules and structure.",
          "The cooperative is governed and operated according to Wisdom's official structure, including its general assembly, board and management arrangements. Official institutional details, history and reports will be published here as Wisdom provides them.",
        ],
        visionText: "[OFFICIAL VISION STATEMENT] — Wisdom's official vision will be published here as it is confirmed.",
        missionText: "[OFFICIAL MISSION STATEMENT] — Wisdom's official mission will be published here as it is confirmed.",
        storyText: "[OFFICIAL HISTORY] — Wisdom's official history and founding details will be published here as they are confirmed.",
        governanceItems: [
          { title: "General Assembly", text: "The cooperative's member assembly, structured according to Wisdom's official bylaws." },
          { title: "Board of Directors", text: "Official board details will be published here as Wisdom confirms them." },
          { title: "Management", text: "Official management structure and leadership will be published here as Wisdom confirms them." },
          { title: "Supervision", text: "The cooperative operates under the supervision structure required of a SACCO in Ethiopia." },
          { title: "Reports & documents", text: "Annual reports, policies and institutional documents will be published here as Wisdom releases them." },
        ],
      },
      am: {
        label: "01 / ስለ ዊዝደም",
        heading: "በአባላቱ ዙሪያ\nየተገነባ ህብረት።",
        description:
          "ዊዝደም በአባላት ባለቤትነት የሚመራ የቁጠባና ብድር ኅብረት ሥራ ማህበር (ሳኮ) ነው። አባላቱ እንዲቆጥቡ፣ ብድር እንዲያገኙና የተሻለ የወደፊት የፋይናንስ ህይወት እንዲገነቡ ለመርዳት ቆሟል — ባለቤቶቹም በሚያገለግለው ማህበረሰብ ውስጥ ያሉ አባላት ናቸው።",
        whoWeAre: "እኛ ማን ነን",
        visionMission: "ራዕይ እና ተልዕኮ",
        vision: "ራዕይ",
        mission: "ተልዕኮ",
        story: "ታሪካችን",
        coreValues: "ዋና ዋና እሴቶች",
        valuesIntro: "ኦፊሴላዊ እሴቶችና የአመራር መዋቅሮች ዊዝደም ሲያረጋግጣቸው ይታተማሉ። እነዚህ መርሆዎች የህብረቱን አቅጣጫ ያሳያሉ።",
        governance: "አመራርና አስተዳደር",
        governanceHeading: "በአባላቱ የሚተዳደር ህብረት።",
        joinCta: "የህብረቱ አባል እንዴት መሆን እንደሚችሉ ይወቁ።",
        whoWeAreParas: [
          "ዊዝደም የኅብረት ሥራ የፋይናንስ ተቋም ነው። ይህም ማለት ከዊዝደም ጋር የሚቆጥቡ ሰዎች የተቋሙ ደንበኞች ብቻ ሳይሆኑ ባለቤቶቹና አባላቱ ናቸው።",
          "አባላት በዊዝደም መመሪያ መሠረት በቁጠባና በተሳትፎ አስተዋጽኦ ያደርጋሉ። በምላሹም ህብረቱ ለአባላቱ አስተማማኝ የፋይናንስ አገልግሎቶችን ይሰጣል፤ አባላትም በህብረቱ ደንቦችና መዋቅር መሠረት ከተቋሙ እድገት ተጠቃሚ ይሆናሉ።",
          "ህብረቱ የሚተዳደረው እና የሚንቀሳቀሰው የዊዝደምን ኦፊሴላዊ መዋቅር በመከተል ነው፤ ይህም ጠቅላላ ጉባኤን፣ የስራ አመራር ቦርድንና የስራ አስፈጻሚ ክፍሎችን ያካትታል። ተቋማዊ ዝርዝሮች፣ ታሪክና ሪፖርቶች ዊዝደም ሲያዘጋጃቸው እዚህ ይታተማሉ።",
        ],
        visionText: "[ኦፊሴላዊ የራዕይ መግለጫ] — የዊዝደም ኦፊሴላዊ ራዕይ ሲረጋገጥ እዚህ ይታተማል።",
        missionText: "[ኦፊሴላዊ የተልዕኮ መግለጫ] — የዊዝደም ኦፊሴላዊ ተልዕኮ ሲረጋገጥ እዚህ ይታተማል።",
        storyText: "[ኦፊሴላዊ ታሪክ] — የዊዝደም ኦፊሴላዊ ታሪክና የምስረታ ዝርዝሮች ሲረጋገጡ እዚህ ይታተማሉ።",
        governanceItems: [
          { title: "ጠቅላላ ጉባኤ", text: "በዊዝደም መተዳደሪያ ደንብ መሠረት የተዋቀረ የህብረቱ የበላይ የአባላት ጠቅላላ ጉባኤ።" },
          { title: "የሥራ አመራር ቦርድ", text: "ኦፊሴላዊ የቦርድ ዝርዝሮች ዊዝደም ሲያረጋግጣቸው እዚህ ይታተማሉ።" },
          { title: "ማኔጅመንት / ስራ አስፈጻሚ", text: "ኦፊሴላዊ የአስተዳደር መዋቅርና አመራር ዊዝደም ሲያረጋግጣቸው እዚህ ይታተማሉ።" },
          { title: "ቁጥጥርና ክትትል", text: "ህብረቱ በኢትዮጵያ ለሳኮዎች በተደነገገው የቁጥጥርና የክትትል ማዕቀፍ መሠረት ይሰራል።" },
          { title: "ሪፖርቶች እና ሰነዶች", text: "ዓመታዊ ሪፖርቶች፣ ፖሊሲዎችና ተቋማዊ ሰነዶች ዊዝደም ሲያወጣቸው እዚህ ይታተማሉ።" },
        ],
      },
    },
    savings: {
      en: {
        label: "02 / SAVINGS",
        heading: "Small habits.\nStronger futures.",
        description:
          "Savings are the foundation of the Wisdom cooperative model. Members contribute through savings according to Wisdom's actual structure, building personal balances while supporting the cooperative as a whole.",
        idea: "THE SAVINGS IDEA",
        services: "SAVINGS SERVICES",
        servicesHeading: "The ways members save at Wisdom.",
        servicesDesc: "Official product names and terms will be published here as Wisdom confirms them. Contact Wisdom for current terms.",
        faq: "SAVINGS FAQ",
        faqHeading: "Common questions.",
        faqNote: "For anything not covered here, Wisdom is happy to answer directly.",
        faqEmpty: "Savings products are being prepared and will be published here as Wisdom confirms them.",
        ideaNote:
          "Every member contributes in their own way and at their own pace. The exact savings products, minimums, frequency and access rules follow Wisdom's official model — and are published here as Wisdom confirms them.",
        faqItems: [
          { question: "How do I start saving with Wisdom?", answer: "Become a Wisdom member, then open your savings through Wisdom's official process. Contact Wisdom for the current steps and required documents." },
          { question: "What are the current savings terms?", answer: "Wisdom publishes official savings terms. Contact Wisdom for the most current information on minimums, frequency and access rules." },
          { question: "Are there dividends on savings?", answer: "Dividends and rates follow Wisdom's official rules and published results. Contact Wisdom for current information." },
          { question: "Who can save with Wisdom?", answer: "Savings services are open to Wisdom members in good standing. Official eligibility criteria confirmed by Wisdom apply." },
          { question: "How are member savings protected?", answer: "Wisdom operates under the cooperative framework and supervision structure applicable to SACCOs in Ethiopia. Institutional details will be published as Wisdom confirms them." },
        ],
      },
      am: {
        label: "02 / ቁጠባ",
        heading: "ትንንሽ ልማዶች።\nየበለጠ አስተማማኝ የወደፊት ህይወት።",
        description:
          "ቁጠባ የዊዝደም የኅብረት ሥራ ሞዴል መሠረት ነው። አባላት በህብረቱ መዋቅር መሠረት በቁጠባ አስተዋጽኦ ያደርጋሉ፤ ይህም የግል ቁጠባቸውን እያሳደገ የህብረቱን የጋራ ጥንካሬ ይገነባል።",
        idea: "የቁጠባ መርህ",
        services: "የቁጠባ አገልግሎቶች",
        servicesHeading: "አባላት በዊዝደም የሚቆጥቡባቸው አማራጮች።",
        servicesDesc: "ኦፊሴላዊ የምርት ስሞችና ውሎች በዊዝደም ሲረጋገጡ እዚህ ይታተማሉ። ወቅታዊ ውሎችን ለማወቅ ዊዝደምን ያግኙ።",
        faq: "የቁጠባ ጥያቄዎች",
        faqHeading: "ተደጋግመው የሚጠየቁ ጥያቄዎች።",
        faqNote: "እዚህ ላልተካተቱ ማናቸውም ጥያቄዎች ዊዝደም ቀጥተኛ ምላሽ ለመስጠት ዝግጁ ነው።",
        faqEmpty: "የቁጠባ አገልግሎቶች መረጃ እየተዘጋጀ ሲሆን ዊዝደም ሲያረጋግጠው እዚህ ይታተማል።",
        ideaNote:
          "እያንዳንዱ አባል በራሱ አቅምና ፍጥነት ቁጠባውን ያከናውናል። ትክክለኛ የቁጠባ ዓይነቶች፣ ዝቅተኛ የቁጠባ መጠኖች፣ ድግግሞሽና ገንዘብ የማውጣት ደንቦች የዊዝደምን ኦፊሴላዊ አሰራር ይከተላሉ — ዊዝደም ሲያረጋግጣቸውም እዚህ ይታተማሉ።",
        faqItems: [
          { question: "ከዊዝደም ጋር መቆጠብ እንዴት እጀምራለሁ?", answer: "የዊዝደም አባል ይሁኑ፤ ከዚያም በዊዝደም ኦፊሴላዊ አሰራር መሠረት የቁጠባ ሂሳብዎን ይክፈቱ። አስፈላጊውን ሂደትና ሰነዶች ለማወቅ ዊዝደምን ያግኙ።" },
          { question: "ወቅታዊ የቁጠባ ውሎች ምንድን ናቸው?", answer: "ዊዝደም ኦፊሴላዊ የቁጠባ ውሎችን በግልጽ ያሳውቃል። ስለ ዝቅተኛ መጠኖች፣ ድግግሞሽና ገንዘብ የማውጣት ደንቦች ወቅታዊ መረጃ ለማግኘት ዊዝደምን ያግኙ።" },
          { question: "በቁጠባ ላይ የትርፍ ክፍፍል (ወለድ) አለ?", answer: "የትርፍ ክፍፍልና የወለድ ተመን የዊዝደምን ኦፊሴላዊ ደንቦችና የታተሙ የሂሳብ ውጤቶችን ይከተላሉ። ወቅታዊ መረጃ ለማግኘት ዊዝደምን ያግኙ።" },
          { question: "ከዊዝደም ጋር መቆጠብ የሚችለው ማን ነው?", answer: "የቁጠባ አገልግሎቶች የአባልነት ግዴታቸውን ለተወጡ ንቁ የዊዝደም አባላት ክፍት ናቸው። በዊዝደም የጸደቁ ኦፊሴላዊ የብቃት መስፈርቶች ተፈጻሚ ይሆናሉ።" },
          { question: "የአባላት ቁጠባ ደህንነት እንዴት ይጠበቃል?", answer: "ዊዝደም በኢትዮጵያ ለሳኮዎች በተደነገገው የህብረት ሥራ ህጋዊ ማዕቀፍና የቁጥጥር ሥርዓት መሠረት ይሰራል። ዝርዝር ተቋማዊ መረጃዎች ዊዝደም ሲያረጋግጣቸው ይታተማሉ።" },
        ],
      },
    },
    loans: {
      en: {
        label: "03 / LOANS & CREDIT",
        heading: "When you have a plan,\nwe can help you move.",
        description:
          "Members save, and members access credit. Wisdom supports members' plans with credit built on the cooperative's shared strength — assessed fairly and transparently under Wisdom's policies.",
        idea: "THE CREDIT IDEA",
        services: "CREDIT SERVICES",
        servicesHeading: "The kinds of plans Wisdom credit can support.",
        calculator: "PLAN YOUR LOAN",
        calculatorHeading: "A clear picture before you apply.",
        calculatorText: "An illustrative loan calculator will be available here once Wisdom confirms its official interest methodology and terms.",
        process: "HOW LOANS WORK AT WISDOM",
        faq: "CREDIT FAQ",
        faqHeading: "Common questions.",
        ideaNote:
          "Members access credit for the plans that matter to them — and repayment strengthens both the member and the cooperative. Exact limits, periods, rates and requirements follow Wisdom's official model and are published here as Wisdom confirms them.",
        processNote:
          "Application steps, required documents, collateral and guarantee requirements follow Wisdom's official procedures and will be published here as Wisdom confirms them.",
        processSteps: [
          { number: "01", title: "Apply", text: "Apply as a Wisdom member for the credit you need." },
          { number: "02", title: "Assessment", text: "Wisdom assesses each application under its own policies." },
          { number: "03", title: "Approval", text: "Approved members agree to Wisdom's official terms." },
          { number: "04", title: "Repay", text: "Members repay under the agreed schedule, strengthening the cooperative." },
        ],
        faqItems: [
          { question: "Who can access credit at Wisdom?", answer: "Credit is available to Wisdom members in good standing, subject to Wisdom's official eligibility criteria and assessment." },
          { question: "What are the current loan limits and rates?", answer: "Wisdom publishes official loan terms. Contact Wisdom for the most current information on limits, periods and rates." },
          { question: "What can a loan be used for?", answer: "Loans support member plans according to Wisdom's official purpose rules. Contact Wisdom to confirm what the current products support." },
          { question: "What documents do I need to apply?", answer: "Document requirements follow Wisdom's official application checklist. Contact Wisdom for the current list." },
          { question: "How is repayment structured?", answer: "Repayment follows the schedule agreed under Wisdom's official terms, assessed according to the cooperative's applicable policies." },
        ],
      },
      am: {
        label: "03 / ብድር",
        heading: "እቅድ ሲኖርዎት፣\nግብዎ ላይ እንዲደርሱ እናግዛለን።",
        description:
          "አባላት ይቆጥባሉ፤ አስፈላጊ ሆኖ ሲገኝም ብድር ያገኛሉ። ዊዝደም በህብረቱ የጋራ ጥንካሬ ላይ በተመሰረተ ብድር የአባላቱን እቅዶች ይደግፋል — ይህም በፍትሃዊና ግልጽ አሰራር በዊዝደም ፖሊሲዎች መሠረት ይገመገማል።",
        idea: "የብድር መርህ",
        services: "የብድር አገልግሎቶች",
        servicesHeading: "የዊዝደም ብድር ሊደግፋቸው የሚችላቸው የዕቅድ ዓይነቶች።",
        calculator: "ብድርዎን ያቅዱ",
        calculatorHeading: "ከማመልከትዎ በፊት ግልጽ ግንዛቤ ያግኙ።",
        calculatorText: "ዊዝደም ኦፊሴላዊ የወለድ ስሌቱንና ውሎቹን ሲያረጋግጥ የብድር ስሌት ማስያ እዚህ ይገኛል።",
        process: "በዊዝደም የብድር አሰጣጥ ሂደት",
        faq: "የብድር ጥያቄዎች",
        faqHeading: "ተደጋግመው የሚጠየቁ ጥያቄዎች።",
        ideaNote:
          "አባላት ለጠቃሚ እቅዶቻቸው ብድር ያገኛሉ — ብድሩን በወቅቱ መክፈልም የአባሉን የፋይናንስ ታሪክ እና የህብረቱን አቅም ያጠናክራል። ትክክለኛ የብድር ጣሪያዎች፣ የመክፈያ ጊዜያት፣ የወለድ መጠኖችና መስፈርቶች የዊዝደምን ኦፊሴላዊ መመሪያ የሚከተሉ ሲሆን ሲረጋገጡም እዚህ ይታተማሉ።",
        processNote:
          "የማመልከቻ ቅደም ተከተሎች፣ የሚፈለጉ ሰነዶች፣ የማስያዣና የዋስትና መስፈርቶች የዊዝደምን ኦፊሴላዊ መመሪያ ይከተላሉ፤ ዊዝደም ሲያረጋግጣቸውም እዚህ ይታተማሉ።",
        processSteps: [
          { number: "01", title: "ማመልከት", text: "እንደ ዊዝደም አባል ለሚፈልጉት የብድር ዓይነት ያመልክቱ።" },
          { number: "02", title: "ግምገማ", text: "ዊዝደም እያንዳንዱን ማመልከቻ በፖሊሲው መሠረት ይመረምራል።" },
          { number: "03", title: "ማጽደቅና ስምምነት", text: "ብድራቸው የጸደቀላቸው አባላት ከዊዝደም ጋር የውል ስምምነት ይፈራረማሉ።" },
          { number: "04", title: "የብድር ክፍያ", text: "አባላት በተስማሙበት መርሃ ግብር መሠረት ክፍያቸውን ይፈጽማሉ፤ የህብረቱንም አቅም ያጠናክራሉ።" },
        ],
        faqItems: [
          { question: "በዊዝደም ብድር ማግኘት የሚችለው ማን ነው?", answer: "ብድር የአባልነት ግዴታቸውን ለተወጡ ንቁ የዊዝደም አባላት የሚሰጥ ሲሆን፤ የዊዝደም ኦፊሴላዊ የብቃት መስፈርቶችና የግምገማ ሂደቶች ተፈጻሚ ይሆናሉ።" },
          { question: "ወቅታዊ የብድር ገደቦችና የወለድ ተመኖች ምንድን ናቸው?", answer: "ዊዝደም ኦፊሴላዊ የብድር ውሎችን ያትማል። ስለ ብድር ጣሪያዎች፣ የመክፈያ ጊዜያትና የወለድ ተመኖች ወቅታዊ መረጃ ለማግኘት ዊዝደምን ያግኙ።" },
          { question: "ብድር ለምን ዓይነት ዓላማዎች ይውላል?", answer: "ብድሮች በዊዝደም ኦፊሴላዊ መመሪያ መሠረት የአባላትን የተለያዩ እቅዶች ይደግፋሉ። በአሁኑ ወቅት ያሉ የብድር አማራጮችን ለማረጋገጥ ዊዝደምን ያግኙ።" },
          { question: "ለማመልከት ምን ሰነዶች ያስፈልጋሉ?", answer: "የሰነድ መስፈርቶች የዊዝደምን ኦፊሴላዊ የማመልከቻ ዝርዝር ይከተላሉ። ወቅታዊውን የሰነዶች ዝርዝር ለማግኘት ዊዝደምን ያግኙ።" },
          { question: "የብድር አከፋፈል ሁኔታ እንዴት ነው?", answer: "የብድር ክፍያ በዊዝደም ኦፊሴላዊ ውል በተስማሙበት የክፍያ መርሃ ግብር መሠረት የሚፈጸም ሲሆን፤ በተቋሙ ፖሊሲዎች መሠረት ክትትል ይደረግበታል።" },
        ],
      },
    },
    membership: {
      en: {
        label: "04 / MEMBERSHIP",
        heading: "More than a customer.\nYou're a member.",
        description:
          "When you join Wisdom, you become part of the cooperative. You save, you can access credit, you participate — and the cooperative's purpose is built around you and every other member.",
        why: "WHY BECOME A MEMBER",
        whyHeading: "Save. Access. Participate. Grow.",
        whyText:
          "Membership in a SACCO is different from buying a financial service. Members contribute, participate and grow together under the cooperative's own structure and rules.",
        how: "HOW MEMBERSHIP WORKS",
        howHeading: "The journey to becoming a Wisdom member.",
        howText: "These steps describe Wisdom's membership process. Official eligibility criteria, requirements and fees follow Wisdom's rules and will be published here as Wisdom confirms them.",
        eligibility: "ELIGIBILITY & REQUIREMENTS",
        eligibilityHeading: "Who can join Wisdom.",
        eligibilityText: "Membership is open according to Wisdom's official rules. Contact Wisdom to confirm the current eligibility criteria and what is required to register.",
        requirements: "[OFFICIAL MEMBERSHIP REQUIREMENTS] — published here as Wisdom confirms them.",
        responsibilities: "Member responsibilities",
        rights: "Member rights",
        apply: "START YOUR APPLICATION",
        applyHeading: "Begin the journey to membership.",
        applyText: "Complete this enquiry and Wisdom will respond directly with the current membership steps and requirements. You can also visit a Wisdom branch in person.",
        findBranch: "Find a Branch",
        faq: "MEMBERSHIP FAQ",
        faqHeading: "Common questions.",
        faqItems: [
          { question: "Who can become a Wisdom member?", answer: "Membership follows Wisdom's official eligibility rules. Contact Wisdom to confirm the current criteria." },
          { question: "Is there a membership fee?", answer: "Membership contributions and fees follow Wisdom's official rules. Contact Wisdom for the current information." },
          { question: "How long does it take to become a member?", answer: "Processing follows Wisdom's official procedures. Contact Wisdom for current expectations." },
          { question: "Can I join in person?", answer: "Yes. Visit a Wisdom branch to register directly. Find the nearest branch on our branches page." },
          { question: "What can I access as a member?", answer: "Members can save, access credit and participate in the cooperative under Wisdom's official structure and policies." },
        ],
      },
      am: {
        label: "04 / አባልነት",
        heading: "ከደንበኛ በላይ —\nየህብረቱ ባለቤት ነዎት።",
        description:
          "ዊዝደምን ሲቀላቀሉ የህብረቱ ሙሉ አካል ይሆናሉ። ይቆጥባሉ፣ ብድር ማግኘት ይችላሉ፣ በውሳኔዎች ይሳተፋሉ — የህብረቱ ዓላማም በእርስዎና በእያንዳንዱ አባል ዙሪያ የተገነባ ነው።",
        why: "ለምን አባል ይሆናሉ?",
        whyHeading: "ይቆጥቡ። ብድር ያግኙ። ይሳተፉ። አብረው ያድጉ።",
        whyText:
          "የሳኮ አባል መሆን ተራ የፋይናንስ አገልግሎት ከመግዛት ፍጹም የተለየ ነው። አባላት በህብረቱ መዋቅርና ደንቦች መሠረት አብረው ያዋጣሉ፣ ይሳተፋሉ፣ አብረውም ያድጋሉ።",
        how: "አባልነት እንዴት ይሰራል?",
        howHeading: "የዊዝደም አባል የመሆን ሂደት።",
        howText: "እነዚህ ቅደም ተከተሎች የዊዝደምን የአባልነት ሂደት ያሳያሉ። ኦፊሴላዊ የብቃት መስፈርቶች፣ አስፈላጊ ሰነዶችና የአባልነት መዋጮዎች በዊዝደም ደንብ መሠረት ሲረጋገጡ እዚህ ይታተማሉ።",
        eligibility: "የብቃት መስፈርቶች",
        eligibilityHeading: "ዊዝደምን መቀላቀል የሚችለው ማን ነው?",
        eligibilityText: "አባልነት በዊዝደም ኦፊሴላዊ ደንብ መሠረት ክፍት ነው። ወቅታዊ የብቃት መስፈርቶችንና ለመመዝገብ የሚያስፈልጉ ነገሮችን ለማወቅ ዊዝደምን ያግኙ።",
        requirements: "[ኦፊሴላዊ የአባልነት መስፈርቶች] — ዊዝደም ሲያረጋግጣቸው እዚህ ይታተማሉ።",
        responsibilities: "የአባላት ግዴታዎች",
        rights: "የአባላት መብቶች",
        apply: "ማመልከቻዎን ይጀምሩ",
        applyHeading: "የአባልነት ጉዞዎን ይጀምሩ።",
        applyText: "ይህን የማመልከቻ ቅጽ ይሙሉ፤ ዊዝደምም ወቅታዊ የአባልነት እርምጃዎችንና መስፈርቶችን በዝርዝር ያሳውቅዎታል። እንዲሁም የዊዝደምን ቅርንጫፍ በአካል መጥተው መጎብኘት ይችላሉ።",
        findBranch: "ቅርንጫፍ ይፈልጉ",
        faq: "የአባልነት ጥያቄዎች",
        faqHeading: "ተደጋግመው የሚጠየቁ ጥያቄዎች።",
        faqItems: [
          { question: "የዊዝደም አባል መሆን የሚችለው ማን ነው?", answer: "አባልነት የዊዝደምን ኦፊሴላዊ የብቃት ደንቦች ይከተላል። ወቅታዊ መስፈርቶችን ለማረጋገጥ ዊዝደምን ያግኙ።" },
          { question: "የአባልነት መመዝገቢያ ክፍያ አለ?", answer: "የአባልነት መዋጮና ክፍያዎች የዊዝደምን ኦፊሴላዊ መተዳደሪያ ደንብ ይከተላሉ። ወቅታዊ መረጃዎችን ለማግኘት ዊዝደምን ያግኙ።" },
          { question: "አባል ለመሆን ምን ያህል ጊዜ ይወስዳል?", answer: "የማመልከቻ ሂደት በዊዝደም መመሪያ መሠረት በአጭር ጊዜ ውስጥ ይከናወናል። ዝርዝሩን ለማወቅ ዊዝደምን ያግኙ።" },
          { question: "በአካል መጥቼ መመዝገብ እችላለሁ?", answer: "አዎ። በአካል በመቅረብ ለመመዝገብ በአቅራቢያዎ የሚገኝ የዊዝደም ቅርንጫፍን ይጎብኙ።" },
          { question: "እንደ አባል ምን ዓይነት አገልግሎቶችን አገኛለሁ?", answer: "አባላት በዊዝደም መመሪያና ፖሊሲዎች መሠረት መቆጠብ፣ ብድር ማግኘት እና በህብረቱ ውሳኔዎች ላይ መሳተፍ ይችላሉ።" },
        ],
      },
    },
    news: {
      en: {
        label: "06 / NEWS & STORIES",
        heading: "The latest from Wisdom.",
        description: "Announcements, member stories and community updates from the cooperative. Official stories are published here as Wisdom releases them.",
        note: "More stories will appear here as Wisdom publishes its official announcements, member stories and community initiatives.",
        categories: ["Announcements", "Member Stories", "Community", "Financial Education", "Events"],
      },
      am: {
        label: "06 / ዜና እና ታሪኮች",
        heading: "ከዊዝደም የሚወጡ ወቅታዊ መረጃዎች።",
        description: "ከህብረቱ የሚወጡ ማስታወቂያዎች፣ የአባላት የስኬት ታሪኮችና የማህበረሰብ ዜናዎች። ኦፊሴላዊ መረጃዎች ዊዝደም ሲያወጣቸው እዚህ ይታተማሉ።",
        note: "ዊዝደም ኦፊሴላዊ ማስታወቂያዎቹን፣ የአባላት ታሪኮችንና የማህበረሰብ ተነሳሽነቶችን ሲያትም ተጨማሪ ጽሑፎች እዚህ ይቀርባሉ።",
        categories: ["ማስታወቂያዎች", "የአባላት ታሪኮች", "ማህበረሰብ", "የፋይናንስ ትምህርት", "ዝግጅቶች"],
      },
    },
    education: {
      en: {
        label: "05 / FINANCIAL EDUCATION",
        heading: "Wisdom for your financial life.",
        description:
          "Practical, member-centred financial education — on saving, budgeting, responsible borrowing and planning. Content follows Wisdom's approved educational material and is published here as it is released.",
        library: "The library",
        libraryHeading: "A cooperative invests in its members' financial confidence.",
        libraryText: "Topics are being prepared with Wisdom's financial education team and will be published here as they are approved.",
        topics: "TOPICS",
        topicsHeading: "Planned topics for members.",
        topicsDesc: "Content will be based on Wisdom's approved educational material.",
      },
      am: {
        label: "05 / የፋይናንስ ትምህርት",
        heading: "ለተሻለ የፋይናንስ ህይወትዎ ጥበብ።",
        description:
          "ተግባራዊና በአባላት ላይ ያተኮረ የፋይናንስ ትምህርት — ስለ ቁጠባ፣ በጀት አወጣጥ፣ ኃላፊነት የተሞላበት ብድር አጠቃቀምና የፋይናንስ እቅድ። ይዘቶቹ በዊዝደም በጸደቁ የትምህርት ማቴሪያሎች ላይ ተመስርተው በየጊዜው ይታተማሉ።",
        library: "የትምህርት መድረክ",
        libraryHeading: "ህብረቱ በአባላቱ የፋይናንስ ግንዛቤና በራስ መተማመን ላይ ይሰራል/ኢንቨስት ያደርጋል።",
        libraryText: "የትምህርት ርዕሶች ከዊዝደም የፋይናንስ ትምህርት ቡድን ጋር እየተዘጋጁ ሲሆን ሲጸድቁም እዚህ ይታተማሉ።",
        topics: "ርዕሶች",
        topicsHeading: "ለአባላት የተዘጋጁ የትምህርት ርዕሶች።",
        topicsDesc: "ይዘቱ በዊዝደም የጸደቀ ትምህርታዊ ጽሑፍ ላይ የተመሠረተ ይሆናል።",
      },
    },
    branches: {
      en: {
        label: "07 / BRANCHES",
        heading: "Find Wisdom near you.",
        description: "Wisdom serves its members through branches and member services. Official branch locations, addresses and hours will be published here as Wisdom confirms them.",
        finder: "BRANCH FINDER",
        finderHeading: "Our locations.",
        finderDesc: "Filter by region to find the branch closest to you.",
        note: "Can't find what you're looking for? Contact Wisdom directly and the cooperative will point you to the nearest branch or member service point.",
        filterByRegion: "Filter by region",
        allRegions: "All regions",
        getDirections: "Get Directions",
      },
      am: {
        label: "07 / ቅርንጫፎች",
        heading: "በአቅራቢያዎ የሚገኝ የዊዝደም ቅርንጫፍ ያግኙ።",
        description: "ዊዝደም አባላቱን በተለያዩ ቅርንጫፎችና የአባላት አገልግሎት መስኮቶች በኩል ያገለግላል። ኦፊሴላዊ የቅርንጫፍ አድራሻዎችና የስራ ሰዓቶች በዊዝደም ሲረጋገጡ እዚህ ይታተማሉ።",
        finder: "ቅርንጫፍ መፈለጊያ",
        finderHeading: "የቅርንጫፎቻችን አድራሻ።",
        finderDesc: "በአቅራቢያዎ የሚገኘውን ቅርንጫፍ ለማግኘት በከተማ ወይም በክልል ያጣሩ።",
        note: "የሚፈልጉትን አላገኙም? ዊዝደምን በቀጥታ ያግኙ፤ ህብረቱም ወደሚቀርብዎት ቅርንጫፍ ወይም የአገልግሎት መስጫ ይመራዎታል።",
        filterByRegion: "በክልል / በከተማ ይምረጡ",
        allRegions: "ሁሉም አካባቢዎች",
        getDirections: "አቅጣጫ ይመልከቱ",
      },
    },
    contact: {
      en: {
        label: "08 / CONTACT",
        heading: "We're here to help.",
        description: "Whether you're exploring membership, asking about savings or loans, or need information about the cooperative — Wisdom is ready to help.",
        details: "CONTACT DETAILS",
        email: "Email",
        phone: "Phone",
        address: "Address",
        hours: "Office hours",
        inPerson: "Prefer in person?",
        inPersonText: "Visit a Wisdom branch to speak with the team directly.",
        membershipTitle: "Membership enquiries",
        membershipText: "Interested in joining the cooperative? Start with the membership page or send a membership enquiry.",
        loanTitle: "Loan enquiries",
        loanText: "Planning to access credit? Send a loan enquiry so Wisdom can share the current information and next steps.",
      },
      am: {
        label: "08 / አግኙን",
        heading: "እርስዎን ለማገልገል ዝግጁ ነን።",
        description: "ስለ አባልነት ማወቅ ቢፈልጉ፣ ስለ ቁጠባና ብድር ጥያቄ ቢኖርዎት ወይም ስለ ህብረቱ መረጃ ቢያስፈልግዎ — ዊዝደም ሁልጊዜ ሊረዳዎ ዝግጁ ነው።",
        details: "የመገናኛ አድራሻዎች",
        email: "ኢሜይል",
        phone: "ስልክ",
        address: "አድራሻ",
        hours: "የቢሮ የስራ ሰዓት",
        inPerson: "በአካል መምጣት ይፈልጋሉ?",
        inPersonText: "ከቡድናችን ጋር በቀጥታ ለመነጋገር በአቅራቢያዎ የሚገኘውን የዊዝደም ቅርንጫፍ ይጎብኙ።",
        membershipTitle: "ስለ አባልነት ጥያቄዎች",
        membershipText: "ህብረቱን መቀላቀል ይፈልጋሉ? የአባልነት ገጻችንን ይመልከቱ ወይም ጥያቄዎን በቅጹ በኩል ይላኩልን።",
        loanTitle: "ስለ ብድር ጥያቄዎች",
        loanText: "ብድር ለማግኘት እያሰቡ ነው? ዊዝደም ወቅታዊ መረጃዎችንና ቀጣይ እርምጃዎችን እንዲያጋራዎት ጥያቄዎን ይላኩልን።",
      },
    },
    vacancies: {
      en: {
        label: "09 / VACANCIES",
        heading: "Join the team\nbehind Wisdom.",
        description: "Vacancies at Wisdom are posted here as they open. If nothing is listed today, applications can still be sent through the contact page.",
        emptyLabel: "No open vacancies",
        emptyHeading: "Nothing open right now — but check back soon.",
        emptyText: "Vacancies are posted here as they become available. You can also contact Wisdom directly to ask about opportunities with the cooperative.",
        aboutRole: "About the role",
        requirements: "Requirements",
        positionDetails: "Position details",
        department: "Department",
        location: "Location",
        type: "Type",
        posted: "Posted",
        closing: "Closing date",
        applicationProcess: "Application process",
        applicationProcessText: "Wisdom reviews applications and contacts shortlisted candidates directly. Official selection procedures follow Wisdom's policies.",
        applyNote: "This opens your email app with an application message addressed to Wisdom. Please do not include sensitive financial information in your application email.",
        openApp: "Propose an open application.",
        openAppText: "Even when no role is listed, Wisdom welcomes serious applications from people who believe in cooperative finance.",
      },
      am: {
        label: "09 / ክፍት የሥራ ቦታዎች",
        heading: "ከዊዝደም ጀርባ ያለውን\nቡድን ይቀላቀሉ።",
        description: "በዊዝደም ያሉ ክፍት የሥራ ቦታዎች ሲኖሩ እዚህ ይታተማሉ። በአሁኑ ወቅት ክፍት ቦታ ባይኖርም ማመልከቻዎን በአግኙን ገጽ በኩል መላክ ይችላሉ።",
        emptyLabel: "በአሁኑ ወቅት ክፍት የሥራ ቦታ የለም",
        emptyHeading: "በአሁኑ ወቅት ክፍት የሥራ ቦታ የለም — እባክዎ በቅርቡ ተመልሰው ይጎብኙን።",
        emptyText: "ክፍት የሥራ ቦታዎች ሲኖሩ ወዲያውኑ እዚህ ይታተማሉ። ከህብረቱ ጋር አብሮ ስለመስራት እድሎች ለመጠየቅም ዊዝደምን በቀጥታ ማግኘት ይችላሉ።",
        aboutRole: "ስለ ሥራው ዝርዝር",
        requirements: "መስፈርቶች",
        positionDetails: "የሥራው ዝርዝር መረጃ",
        department: "የሥራ ክፍል",
        location: "የሥራ ቦታ",
        type: "የሥራ ዓይነት",
        posted: "የወጣበት ቀን",
        closing: "የማመልከቻ ማብቂያ ቀን",
        applicationProcess: "የቅጥር / የምልመላ ሂደት",
        applicationProcessText: "ዊዝደም ማመልከቻዎችን በጥንቃቄ በመገምገም ለቀጣይ ምልመላ የተመረጡትን እጩዎች በቀጥታ ያነጋግራል። የምልመላ ሂደቱም የተቋሙን ኦፊሴላዊ መመሪያ ይከተላል።",
        applyNote: "ይህ የማመልከቻ መልእክት ወደ ዊዝደም የተዘጋጀ ሆኖ የኢሜይል መተግበሪያዎን ይከፍታል። እባክዎ በማመልከቻ ኢሜይልዎ ውስጥ ሚስጥራዊ የፋይናንስ መረጃ አያካትቱ።",
        openApp: "ክፍት ማመልከቻ ያስገቡ።",
        openAppText: "ምንም ክፍት የሥራ ቦታ ባይኖርም፣ ዊዝደም በኅብረት ፋይናንስ ለሚያምኑና ፍላጎት ያላቸው አመልካቾች የሚያቀርቡትን ማመልከቻ በደስታ ይቀበላል።",
      },
    },
  },
  notFound: {
    en: {
      title: "Page not found.",
      text: "The page you're looking for doesn't exist or has moved. Head back to explore Wisdom's savings, loans and membership.",
      back: "Back to Home",
    },
    am: {
      title: "ገጹ አልተገኘም።",
      text: "የሚፈልጉት ገጽ የለም ወይም ተዛውሯል። ወደ መነሻ ገጽ ተመልሰው የዊዝደምን ቁጠባ፣ ብድርና አባልነት መረጃዎች ይመልከቱ።",
      back: "ወደ መነሻ ገጽ ይመለሱ",
    },
  },
  forms: {
    en: {
      send: "Send",
      submitEnquiry: "Submit Enquiry",
      sendMessage: "Send Message",
      sendApplication: "Send Your Application",
      name: "Name",
      fullName: "Full name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message",
      location: "Location",
      membershipType: "Membership type",
      additionalInfo: "Additional information",
      loanType: "Loan type",
      requestedAmount: "Requested amount (ETB)",
      purpose: "Purpose",
      contactNote: "This opens your email app with your message ready to send. Wisdom will respond to your enquiry directly.",
      membershipNote: "This opens your email app with your membership enquiry ready to send. Please do not include PINs, passwords or full account numbers in public messages.",
      loanNote: "This opens your email app with your loan enquiry ready to send. It is an enquiry only — final terms are subject to Wisdom's assessment and applicable policies. Please do not include PINs, passwords or full account numbers.",
    },
    am: {
      send: "ይላኩ",
      submitEnquiry: "ጥያቄዎን ያስገቡ",
      sendMessage: "መልእክት ይላኩ",
      sendApplication: "ማመልከቻዎን ይላኩ",
      name: "ስም",
      fullName: "ሙሉ ስም",
      email: "ኢሜይል",
      phone: "ስልክ",
      subject: "ርዕስ",
      message: "መልእክት",
      location: "አድራሻ / አካባቢ",
      membershipType: "የአባልነት ዓይነት",
      additionalInfo: "ተጨማሪ መረጃ",
      loanType: "የብድር ዓይነት",
      requestedAmount: "የተጠየቀው የብድር መጠን (ብር)",
      purpose: "የብድሩ ዓላማ",
      contactNote: "ይህ መልእክትዎን ለመላክ ዝግጁ ሆኖ የኢሜይል መተግበሪያዎን ይከፍታል። ዊዝደም ለጥያቄዎ በቀጥታ ምላሽ ይሰጣል።",
      membershipNote: "ይህ የአባልነት ጥያቄዎን ለመላክ ዝግጁ ሆኖ የኢሜይል መተግበሪያዎን ይከፍታል። እባክዎ ሚስጥራዊ የይለፍ ቃላትን ወይም የሂሳብ ቁጥሮችን በመልእክት ውስጥ አያካትቱ።",
      loanNote: "ይህ የብድር ጥያቄዎን ለመላክ ዝግጁ ሆኖ የኢሜይል መተግበሪያዎን ይከፍታል። ይህ ጥያቄ ብቻ ሲሆን፤ የመጨረሻ ውሎች በዊዝደም ግምገማና ተፈጻሚ ፖሊሲዎች መሠረት የሚወሰኑ ይሆናል። እባክዎ የይለፍ ቃላትን ወይም ሚስጥራዊ መረጃዎችን በመልእክት ውስጥ አያካትቱ።",
    },
  },
};

export type Dictionary = {
  [K in keyof typeof dict]: K extends "pages"
    ? { [P in keyof (typeof dict)["pages"]]: (typeof dict)["pages"][P] extends { en: infer E } ? E : never }
    : (typeof dict)[K] extends { en: infer E }
      ? E
      : never;
};

export function getDictionary(lang: Lang): Dictionary {
  const result: Record<string, unknown> = {};
  (Object.keys(dict) as (keyof typeof dict)[]).forEach((key) => {
    if (key === "pages") {
      const pages: Record<string, unknown> = {};
      const pageDict = dict.pages as unknown as Record<string, { en: unknown; am: unknown }>;
      (Object.keys(pageDict) as string[]).forEach((pk) => {
        pages[pk] = pageDict[pk][lang];
      });
      result.pages = pages;
    } else {
      const section = (dict as unknown as Record<string, { en: unknown; am: unknown }>)[key];
      result[key] = section[lang];
    }
  });
  return result as unknown as Dictionary;
}

export function getLangLink(other: Lang, pathname: string): string {
  const seg = pathname.split("/")[1];
  const current = locales.includes(seg as Lang) ? (seg as Lang) : defaultLocale;
  if (other === current) return pathname;
  const rest = pathname.split("/").slice(2).join("/");
  return `/${other}${rest ? `/${rest}` : ""}`;
}