export type Lang = "ru" | "en" | "uz" | "tr" | "tg";

export const LANGUAGES: { code: Lang; flag: string; name: string }[] = [
  { code: "ru", flag: "🇷🇺", name: "Русский" },
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "uz", flag: "🇺🇿", name: "Uzbek" },
  { code: "tr", flag: "🇹🇷", name: "Türkçe" },
  { code: "tg", flag: "🇹🇯", name: "Тоҷикӣ" },
];

export const DEFAULT_LANG: Lang = "ru";

export type Dictionary = {
  nav: {
    howItWorks: string;
    features: string;
    countries: string;
    pricing: string;
    reviews: string;
    login: string;
    getStarted: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subtext: string;
    getStarted: string;
    seeHowItWorks: string;
    trustedFor: string;
  };
  chat: {
    assistantName: string;
    online: string;
    messages: [string, string, string, string];
  };
  heroDemo: {
    question: string;
    userReply: string;
    response: string;
    inputPlaceholder: string;
  };
  stats: {
    items: { value: string; label: string }[];
  };
  howItWorks: {
    heading: string;
    subheading: string;
    steps: { title: string; description: string }[];
  };
  features: {
    heading: string;
    subheading: string;
    items: { title: string; description: string }[];
  };
  countries: {
    heading: string;
    subheading: string;
    list: { flag: string; name: string; highlight: string; points: string[] }[];
    planMyMoveTo: string;
  };
  pricing: {
    heading: string;
    subheading: string;
    mostPopular: string;
    plans: {
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      cta: string;
    }[];
  };
  reviews: {
    heading: string;
    subheading: string;
    items: {
      name: string;
      route: string;
      fromFlag: string;
      toFlag: string;
      rating: number;
      quote: string;
      initials: string;
      documentBadge?: string;
    }[];
  };
  contact: {
    heading: string;
    subtext: string;
    email: string;
    repliesWithin: string;
    form: {
      fullName: string;
      emailLabel: string;
      movingTo: string;
      message: string;
      placeholderName: string;
      placeholderEmail: string;
      placeholderMessage: string;
      destinations: string[];
      send: string;
    };
    success: { title: string; subtext: string };
  };
  footer: {
    description: string;
    productHeading: string;
    countriesHeading: string;
    companyHeading: string;
    productLinks: string[];
    companyLinks: string[];
    rights: string;
    disclaimer: string;
  };
  auth: {
    or: string;
    login: {
      heading: string;
      subtext: string;
      googleSignIn: string;
      email: string;
      passwordLabel: string;
      submit: string;
      forgotPassword: string;
      noAccount: string;
      register: string;
    };
    register: {
      heading: string;
      subtitle: string;
      googleSignUp: string;
      redirecting: string;
      fullName: string;
      email: string;
      passwordLabel: string;
      passwordTooltip: string;
      submit: string;
      hasAccount: string;
      login: string;
      confirmEmail: { heading: string; body: string; goToLogin: string };
    };
  };
  password: {
    minLength: string;
    hasUppercase: string;
    hasLowercase: string;
    hasNumber: string;
    hasSpecialOrNumber: string;
    noForeign: string;
    weak: string;
    medium: string;
    strong: string;
  };
  profile: {
    title: string;
    subtitle: string;
    languageSection: string;
    languageDesc: string;
    saving: string;
    notifications: string;
    logOut: string;
    planSuffix: string;
    unnamed: string;
    notifEmail: string;
    notifEmailDesc: string;
    notifDocuments: string;
    notifDocumentsDesc: string;
    notifProduct: string;
    notifProductDesc: string;
  };
  topbar: {
    searchPlaceholder: string;
    upgrade: string;
    openMenuAria: string;
  };
  sidebar: {
    documents: string;
    housing: string;
    banks: string;
    medicine: string;
    work: string;
    community: string;
    education: string;
    otherServices: string;
    profile: string;
    settings: string;
    logout: string;
  };
  documents: {
    title: string;
    subtitle: string;
    tabs: { all: string; passport: string; pesel: string; workPermit: string; insurance: string; bank: string };
    status: { verified: string; pending: string; missing: string; locked: string };
    upload: string;
    viewBtn: string;
    deleteBtn: string;
    unlockBtn: string;
    docNames: { passportScan: string; passportPhoto: string; peselForm: string; peselLetter: string; workPermitApp: string; sponsorshipLetter: string; healthInsurance: string; travelInsurance: string; bankConfirmation: string; proofOfFunds: string; relocationLetter: string; taxResidency: string };
    autoCompleteToast: string;
    sectionCompleteHeading: string;
    sectionCompleteBody: string;
    sectionCompleteDismiss: string;
    deleteConfirmTitle: string;
    deleteConfirmBody: string;
    cancelBtn: string;
  };
  housing: {
    title: string;
    subtitle: string;
    rentMarket: string;
    rentMarketSub: string;
    distanceToCenter: string;
    metroAccess: string;
    noMetro: string;
    topWebsites: string;
    topWebsitesSub: string;
    aiTips: string;
    aiTipsSub: string;
    visitSite: string;
    websiteDescs: { olx: string; otodom: string; gratka: string };
    tips: [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }];
    topDistrictDescs: { mokotow: string; ursynow: string; wola: string; zoliborz: string };
    bestValueBadge: string;
    showAllDistricts: string;
    showFewerDistricts: string;
  };
  banks: {
    title: string;
    subtitle: string;
    openAccount: string;
    bestForExpats: string;
    features: { pkobp: [string, string, string]; mbank: [string, string, string]; santander: [string, string, string]; revolut: [string, string, string] };
  };
  medicine: {
    title: string;
    subtitle: string;
    nfzVsPrivate: string;
    nfzPublic: string;
    privateLabel: string;
    clinicsTitle: string;
    clinicsSub: string;
    warsaw: string;
    languages: { ruUa: string; en: string; ru: string; ua: string };
    rows: [
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
    ];
    bookBtn: string;
  };
  work: {
    title: string;
    subtitle: string;
    contractVsB2B: string;
    salarySearch: string;
    salarySearchSub: string;
    placeholder: string;
    averageSalary: string;
    inEuros: string;
    noExactData: string;
    jobSites: string;
    visitSite: string;
    employmentSubtitle: string;
    b2bSubtitle: string;
    b2bContractName: string;
    employmentFeatures: [string, string, string];
    b2bFeatures: [string, string, string];
    jobSiteDescs: { pracuj: string; nofluff: string; linkedin: string };
  };
  community: {
    title: string;
    subtitle: string;
    join: string;
    members: string;
    cats: { all: string; housing: string; work: string; sport: string; family: string; general: string };
  };
  dashboard: {
    relocation: string;
    subtitle: string;
    overallProgress: string;
    openBtn: string;
    route: {
      heading: string;
      recommended: string;
      viewFullPlan: string;
      hidePlan: string;
      successProbability: string;
      timeline: string;
      cost: string;
      requiredDocuments: string;
      pros: string;
      cons: string;
      reasoningTitle: string;
      checklistHeading: string;
      loading: string;
    };
    steps: {
      account: { title: string; desc: string };
      onboarding: { title: string; desc: string };
      visa: {
        title: string;
        euDesc: string;
        byCountry: {
          poland: { work: string; study: string; business: string; family: string };
          germany: { work: string; study: string; business: string; family: string };
          spain: { work: string; study: string; business: string; family: string };
        };
      };
      business: { title: string; desc: string };
      documents: { title: string; desc: string };
      biometric: { title: string; desc: string };
      residence: { title: string; desc: string };
      address: { title: string; desc: string };
    };
  };
  appPricing: {
    title: string;
    subtitle: string;
    activating: string;
    securedByStripe: string;
    mostPopular: string;
    forever: string;
    perMonth: string;
    freeName: string;
    premiumName: string;
    proName: string;
    freeDesc: string;
    premiumDesc: string;
    proDesc: string;
    freeCta: string;
    premiumCta: string;
    proCta: string;
    freeFeatures: [string, string, string, string, string, string, string];
    premiumFeatures: [string, string, string, string, string, string, string];
    proFeatures: [string, string, string, string, string, string, string];
  };
  checkout: {
    secureCheckout: string;
    orderSummary: string;
    subscription: string;
    perMonth: string;
    totalToday: string;
    paymentDetails: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    cardholderName: string;
    processing: string;
    trustBadge: string;
    termsPrefix: string;
    termsService: string;
    and: string;
    privacyPolicy: string;
    payFailed: string;
    payBtn: string;
    welcomeToast: string;
    premiumFeatures: [string, string, string, string, string];
    proFeatures: [string, string, string, string, string];
  };
  education: {
    title: string;
    subtitle: string;
    coursesTab: string;
    schoolsTab: string;
    kindergartensTab: string;
    universitiesTab: string;
    filterAll: string;
    filterPublic: string;
    filterPrivate: string;
    publicBadge: string;
    privateBadge: string;
    learnMore: string;
    rowFormat: string;
    rowLevel: string;
    rowPrice: string;
    rowInstruction: string;
    rowAges: string;
    rowWaiting: string;
    rowTuition: string;
    rowDeadline: string;
    morePrograms: string;
    emptyState: string;
    banners: {
      poland: { courses: string; schools: string; universities: string };
      germany: { courses: string; schools: string };
      spain: { courses: string; schools: string };
    };
  };
  aiChat: {
    welcome: string;
    personalizedGreeting: string;
    personalizedRecommendation: string;
    quickReplies: [string, string, string, string];
    placeholder: string;
    sendAria: string;
    closeAria: string;
    connectionError: string;
    fallback: {
      pesel: string;
      bank: string;
      housing: string;
      documents: string;
      visa: string;
      default: string;
    };
    actionLabel: string;
    premiumLabel: string;
  };
  demo: {
    bannerText: string;
    registerNow: string;
    floatingGreeting: string;
    promptHeading: string;
    promptBody: string;
    promptDismiss: string;
  };
  onboarding: {
    stepLabel: string;
    back: string;
    continueBtn: string;
    finish: string;
    saving: string;
    skip: string;
    skipTooltip: string;
    citizenshipLabel: string;
    citizenshipPlaceholder: string;
    currentCountryLabel: string;
    currentCountryPlaceholder: string;
    comingSoon: string;
    steps: {
      language: { question: string; subheading: string };
      citizenship: { question: string; subheading: string };
      currentCountry: { question: string; subheading: string };
      destination: { question: string; subheading: string };
      goal: { question: string; subheading: string };
    };
    goalOptions: {
      work: string;
      study: string;
      business: string;
      passiveIncome: string;
      digitalNomad: string;
      familyReunification: string;
      other: string;
    };
    results: {
      heading: string;
      loading: string;
      selectButton: string;
      recommended: string;
      speedFast: string;
      speedMedium: string;
      speedSlow: string;
      difficultyEasy: string;
      difficultyMedium: string;
      difficultyHard: string;
      approvalRate: string;
      timeline: string;
      cost: string;
    };
  };
};

export const dictionaries: Record<Lang, Dictionary> = {
  en: {
    nav: {
      howItWorks: "How it works",
      features: "Features",
      countries: "Countries",
      pricing: "Pricing",
      reviews: "Reviews",
      login: "Log in",
      getStarted: "Get Started",
    },
    hero: {
      badge: "Your AI relocation guide",
      headline1: "Moving to Europe",
      headline2: "— simple.",
      subtext:
        "ReloAI plans your visa, paperwork, housing, and banking — step by step, in plain language. Ask a question, get a personalized roadmap in seconds.",
      getStarted: "Get Started",
      seeHowItWorks: "See how it works",
      trustedFor: "Trusted for relocations to",
    },
    chat: {
      assistantName: "ReloAI Assistant",
      online: "Online",
      messages: [
        "I want to move from Ukraine to Germany for work.",
        "Got it. Based on your profile, you'll need a Job Seeker Visa or EU Blue Card. Want me to build your document checklist?",
        "Yes, please.",
        "Done. 7 documents needed, 2 you already have. I'll remind you about deadlines along the way.",
      ],
    },
    heroDemo: {
      question: "Where would you like to move?",
      userReply: "Poland, I want to work",
      response: "Great! Let me build you a step-by-step relocation roadmap for Poland.",
      inputPlaceholder: "Ask about living in Poland...",
    },
    stats: {
      items: [
        { value: "3", label: "Countries" },
        { value: "10x", label: "Cheaper" },
        { value: "24/7", label: "AI Support" },
      ],
    },
    howItWorks: {
      heading: "How it works",
      subheading: "From question to moving day, in four simple steps.",
      steps: [
        {
          title: "Tell us your situation",
          description:
            "Answer a few questions about your nationality, goals, and target country.",
        },
        {
          title: "Get your roadmap",
          description:
            "ReloAI builds a personalized visa, housing, and timeline plan in minutes.",
        },
        {
          title: "Handle paperwork with AI",
          description:
            "Chat with your assistant to fill forms, gather documents, and track deadlines.",
        },
        {
          title: "Move with confidence",
          description:
            "Land knowing your visa, housing, banking, and registration are sorted.",
        },
      ],
    },
    features: {
      heading: "Everything your move needs",
      subheading: "One assistant for every part of relocating to Europe.",
      items: [
        {
          title: "Visa & permit guidance",
          description:
            "Know exactly which visa fits your situation and what each step requires.",
        },
        {
          title: "Document checklist",
          description:
            "A personalized, always up-to-date list of every document you need.",
        },
        {
          title: "Housing assistant",
          description:
            "Search listings, understand contracts, and avoid common rental scams.",
        },
        {
          title: "Banking & taxes",
          description:
            "Open the right accounts and understand your new tax obligations.",
        },
        {
          title: "Healthcare setup",
          description: "Get registered with insurance and find a local doctor fast.",
        },
        {
          title: "24/7 AI chat",
          description:
            "Ask anything about your move and get a clear, sourced answer instantly.",
        },
      ],
    },
    countries: {
      heading: "Built for your destination",
      subheading: "Country-specific guidance that goes beyond generic checklists.",
      list: [
        {
          flag: "🇵🇱",
          name: "Poland",
          highlight: "Fast-growing tech hub",
          points: [
            "Karta Pobytu residence permit walkthrough",
            "PESEL registration & local banking",
            "Average rent guide by city",
          ],
        },
        {
          flag: "🇩🇪",
          name: "Germany",
          highlight: "EU Blue Card & job seeker visas",
          points: [
            "Anmeldung and Bürgeramt appointments",
            "Health insurance (public vs. private)",
            "Tax ID and freelancer visa support",
          ],
        },
        {
          flag: "🇪🇸",
          name: "Spain",
          highlight: "Popular for remote workers",
          points: [
            "Digital Nomad Visa eligibility check",
            "NIE number and empadronamiento",
            "Regional cost-of-living comparisons",
          ],
        },
      ],
      planMyMoveTo: "Plan my move to {country} →",
    },
    pricing: {
      heading: "Simple, transparent pricing",
      subheading: "Start free. Upgrade when your move gets real.",
      mostPopular: "Most popular",
      plans: [
        {
          name: "Free",
          price: "€0",
          period: "forever",
          description: "Explore your options before you commit.",
          features: [
            "Visa eligibility check",
            "Basic document checklist",
            "Limited AI chat (10 messages/mo)",
            "Country overview guides",
          ],
          cta: "Start for free",
        },
        {
          name: "Premium",
          price: "€29",
          period: "/month",
          description: "Full guidance for an active relocation.",
          features: [
            "Everything in Free",
            "Unlimited AI chat",
            "Personalized roadmap & deadlines",
            "Housing & banking assistant",
            "Email support",
          ],
          cta: "Get Premium",
        },
        {
          name: "Pro",
          price: "€49",
          period: "/month",
          description: "For families and complex moves.",
          features: [
            "Everything in Premium",
            "Multi-person profiles",
            "Document review by a human expert",
            "Priority chat support",
            "Employer relocation letters",
          ],
          cta: "Get Pro",
        },
      ],
    },
    reviews: {
      heading: "Loved by people who moved",
      subheading: "Real stories from people who relocated with ReloAI.",
      items: [
        {
          name: "Anna K.",
          route: "Ukraine → Poland",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Got my PESEL in 2 days. Without ReloAI I would've spent a week just looking for information.",
          initials: "AK",
        },
        {
          name: "Mikhail S.",
          route: "Russia → Germany",
          fromFlag: "🇷🇺",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "AI helped me figure out Anmeldung. Explained everything clearly and gave me office addresses.",
          initials: "MS",
        },
        {
          name: "Olga M.",
          route: "Belarus → Spain",
          fromFlag: "🇧🇾",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "Started a business in Spain. The checklist saved me a month of work and €2,000 in lawyer fees.",
          initials: "OM",
        },
        {
          name: "Dmitry P.",
          route: "Kazakhstan → Poland",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 4,
          quote: "The progress tracker really helps. I always know exactly what step I'm on.",
          initials: "DP",
        },
        {
          name: "Leyla R.",
          route: "Uzbekistan → Germany",
          fromFlag: "🇺🇿",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Found a job in Germany through the jobs section. The AI even wrote my cover letter.",
          initials: "LR",
        },
        {
          name: "Timur A.",
          route: "Tajikistan → Spain",
          fromFlag: "🇹🇯",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "Got my NIE in 3 weeks. I thought it would take half a year.",
          initials: "TA",
        },
        {
          name: "Karina N.",
          route: "Ukraine → Germany",
          fromFlag: "🇺🇦",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Moved with my family. Found a school for the kids and a Russian-speaking doctor.",
          initials: "KN",
        },
        {
          name: "Artyom V.",
          route: "Russia → Spain",
          fromFlag: "🇷🇺",
          toFlag: "🇪🇸",
          rating: 4,
          quote: "Digital Nomad Visa — sorted it in 6 weeks following ReloAI's guide.",
          initials: "AV",
          documentBadge: "🇪🇸 Digital Nomad Visa",
        },
        {
          name: "Zarina I.",
          route: "Kazakhstan → Poland",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Opened an mBank account on the first try. The AI told me exactly which documents to bring.",
          initials: "ZI",
        },
        {
          name: "Bogdan F.",
          route: "Ukraine → Poland",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Best relocation service out there. Saved me time and nerves.",
          initials: "BF",
          documentBadge: "🇵🇱 Karta Pobytu",
        },
      ],
    },
    contact: {
      heading: "Ready to start your move?",
      subtext:
        "Tell us where you're headed and we'll send you a free relocation roadmap within a day.",
      email: "hello@reloai.com",
      repliesWithin: "Replies within 24 hours",
      form: {
        fullName: "Full name",
        emailLabel: "Email",
        movingTo: "Moving to",
        message: "Message",
        placeholderName: "Jane Doe",
        placeholderEmail: "jane@example.com",
        placeholderMessage: "Tell us a bit about your move...",
        destinations: ["Poland", "Germany", "Spain", "Other"],
        send: "Send message",
      },
      success: {
        title: "Thanks — message sent!",
        subtext: "We'll be in touch with your relocation roadmap shortly.",
      },
    },
    footer: {
      description:
        "Your AI relocation assistant for moving to Europe — visas, paperwork, housing, and banking, guided step by step.",
      productHeading: "Product",
      countriesHeading: "Countries",
      companyHeading: "Company",
      productLinks: ["How it works", "Features", "Pricing"],
      companyLinks: ["Reviews", "Contact"],
      rights: "All rights reserved.",
      disclaimer: "ReloAI provides informational services. We are not a law firm and are not responsible for decisions made by immigration authorities. All information is for general guidance only. For legal assistance, please consult a licensed professional.",
    },
    auth: {
      or: "or",
      login: {
        heading: "Welcome back",
        subtext: "Sign in to continue your relocation plan.",
        googleSignIn: "Sign in with Google",
        email: "Email",
        passwordLabel: "Password",
        submit: "Continue",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account?",
        register: "Register",
      },
      register: {
        heading: "Create your account",
        subtitle: "Start your free relocation roadmap in minutes.",
        googleSignUp: "Sign up with Google",
        redirecting: "Redirecting…",
        fullName: "Full name",
        email: "Email",
        passwordLabel: "Password",
        passwordTooltip: "Password doesn't meet requirements",
        submit: "Register",
        hasAccount: "Already have an account?",
        login: "Log in",
        confirmEmail: {
          heading: "Check your inbox",
          body: "We sent a confirmation link to {email}. Click it to activate your account, then log in to continue.",
          goToLogin: "Go to login",
        },
      },
    },
    password: {
      minLength: "Minimum 8 characters",
      hasUppercase: "At least one uppercase letter (A–Z)",
      hasLowercase: "At least one lowercase letter (a–z)",
      hasNumber: "At least one number (0–9)",
      hasSpecialOrNumber: "Special character (!@#$%^&*) — or number counts double",
      noForeign: "English letters only (no Cyrillic)",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
    },
    profile: {
      title: "Profile",
      subtitle: "Manage your account and preferences.",
      languageSection: "Language",
      languageDesc: "ReloAI will speak with you in this language.",
      saving: "(saving…)",
      notifications: "Notifications",
      logOut: "Log out",
      planSuffix: "Plan",
      unnamed: "Unnamed",
      notifEmail: "Email updates",
      notifEmailDesc: "Occasional product news and tips.",
      notifDocuments: "Document reminders",
      notifDocumentsDesc: "Alerts before a deadline is due.",
      notifProduct: "Product news",
      notifProductDesc: "New features and roadmap updates.",
    },
    topbar: {
      searchPlaceholder: "Search documents, tasks...",
      upgrade: "Upgrade",
      openMenuAria: "Open menu",
    },
    sidebar: {
      documents: "Documents",
      housing: "Housing",
      banks: "Banks",
      medicine: "Medicine",
      work: "Work",
      community: "Community",
      education: "Education",
      otherServices: "Other Services",
      profile: "Profile",
      settings: "Settings",
      logout: "Log out",
    },
    documents: {
      title: "Documents",
      subtitle: "Everything you need for your relocation, in one place.",
      tabs: { all: "All", passport: "Passport", pesel: "PESEL", workPermit: "Work Permit", insurance: "Insurance", bank: "Bank" },
      status: { verified: "Verified", pending: "Pending review", missing: "Missing", locked: "Premium" },
      upload: "Drag & drop or click to upload",
      viewBtn: "View",
      deleteBtn: "Remove",
      unlockBtn: "Unlock with Premium",
      docNames: {
        passportScan: "Passport scan",
        passportPhoto: "Passport-sized photo",
        peselForm: "PESEL application form",
        peselLetter: "PESEL confirmation letter",
        workPermitApp: "Work permit application",
        sponsorshipLetter: "Employer sponsorship letter",
        healthInsurance: "Health insurance certificate",
        travelInsurance: "Travel insurance",
        bankConfirmation: "Bank account confirmation",
        proofOfFunds: "Proof of funds statement",
        relocationLetter: "Employer relocation letter",
        taxResidency: "Tax residency certificate",
      },
      autoCompleteToast: "✓ Step completed automatically",
      sectionCompleteHeading: "🎉 Section complete!",
      sectionCompleteBody: "Move on to the next step.",
      sectionCompleteDismiss: "Continue",
      deleteConfirmTitle: "Delete document?",
      deleteConfirmBody: "This action cannot be undone. The document will be permanently deleted.",
      cancelBtn: "Cancel",
    },
    housing: {
      title: "Housing in Poland 🇵🇱",
      subtitle: "Find a place to live, the smart way.",
      rentMarket: "Rent Market",
      rentMarketSub: "Average monthly rent by Warsaw district.",
      distanceToCenter: "{km} km to center",
      metroAccess: "Metro access",
      noMetro: "No metro",
      topWebsites: "Top Websites",
      topWebsitesSub: "Where to actually find listings.",
      aiTips: "AI Tips",
      aiTipsSub: "Practical advice from real relocations.",
      visitSite: "Visit site",
      websiteDescs: {
        olx: "Poland's largest classifieds site — biggest selection, mostly direct from owners.",
        otodom: "Most polished listings, strong filters, popular with agencies.",
        gratka: "Smaller but reliable — good for second-tier cities.",
      },
      tips: [
        {
          title: "Avoid deposit scams",
          body: "Never wire a deposit before seeing the apartment in person or on a live video call with the landlord. Scammers target foreigners with too-good-to-be-true listings.",
        },
        {
          title: "Get the contract in Polish",
          body: "Rental agreements (umowa najmu) must be in Polish to be enforceable. Get a certified translation before signing anything you don't fully understand.",
        },
        {
          title: "Budget beyond the rent",
          body: "Expect a security deposit (1–2 months' rent) plus czynsz — building maintenance fees — billed separately from rent and utilities.",
        },
      ],
      topDistrictDescs: {
        mokotow: "Best balance of price and quality. Quiet, green, great infrastructure, metro access.",
        ursynow: "The most affordable comfortable district. Metro, parks, family-friendly atmosphere.",
        wola: "Modern district with lots of new developments, fast-growing, close to the center.",
        zoliborz: "Cozy, safe, a favorite among expats. Excellent atmosphere.",
      },
      bestValueBadge: "Best value",
      showAllDistricts: "Show all districts →",
      showFewerDistricts: "Show fewer districts",
    },
    banks: {
      title: "Banks in Poland 🇵🇱",
      subtitle: "Compare accounts built for newcomers.",
      openAccount: "Open Account",
      bestForExpats: "Best for expats",
      features: {
        pkobp: ["Largest branch network in Poland", "Polish & English mobile app", "Free student account options"],
        mbank: ["Fully English app and support", "Instant online account opening", "No fees without a PESEL number"],
        santander: ["Multi-currency accounts", "Global bank network", "Free debit card use abroad"],
        revolut: ["No PESEL required to start", "Multi-currency wallet", "Best for digital nomads"],
      },
    },
    medicine: {
      title: "Medicine in Poland 🇵🇱",
      subtitle: "Get insured and find care, fast.",
      nfzVsPrivate: "NFZ vs. Private Insurance",
      nfzPublic: "NFZ (public)",
      privateLabel: "Private",
      clinicsTitle: "Clinics",
      clinicsSub: "English, Russian, and Ukrainian-speaking options.",
      warsaw: "Warsaw",
      languages: {
        ruUa: "Russian & Ukrainian speaking",
        en: "English speaking",
        ru: "Russian speaking",
        ua: "Ukrainian speaking",
      },
      rows: [
        { label: "Cost", nfz: "Free with employment contributions", pvt: "150–400 PLN/month" },
        { label: "Wait times", nfz: "Weeks to months for specialists", pvt: "Same day to a few days" },
        { label: "Language support", nfz: "Mostly Polish only", pvt: "English, often Russian/Ukrainian" },
        { label: "Coverage", nfz: "Broad, but limited choice of doctors", pvt: "Choose your own clinic & doctor" },
      ],
      bookBtn: "Book appointment",
    },
    work: {
      title: "Work in Poland 🇵🇱",
      subtitle: "Contracts, salaries, and where to look.",
      contractVsB2B: "Contract vs. B2B",
      salarySearch: "Salary Search",
      salarySearchSub: "Type a profession to see average pay.",
      placeholder: "e.g. software developer, nurse, driver...",
      averageSalary: "Average salary",
      inEuros: "In euros",
      noExactData: "No exact data for this role yet — showing the national average.",
      jobSites: "Job Sites",
      visitSite: "Visit site",
      employmentSubtitle: "Employment contract",
      b2bSubtitle: "Self-employment",
      b2bContractName: "B2B Contract",
      employmentFeatures: [
        "Paid leave, sick leave, and notice period",
        "Employer pays ZUS social contributions",
        "Easier path to a residence permit",
      ],
      b2bFeatures: [
        "Higher take-home pay, lower tax rate",
        "You handle your own ZUS and invoicing",
        "More flexibility, less job security",
      ],
      jobSiteDescs: {
        pracuj: "Poland's largest job board, all industries.",
        nofluff: "Tech-focused, salaries listed upfront.",
        linkedin: "International roles, strong for English speakers.",
      },
    },
    community: {
      title: "Community 🇵🇱",
      subtitle: "Telegram channels other movers actually use.",
      join: "Join",
      members: "members",
      cats: { all: "All", housing: "Housing", work: "Work", sport: "Sport", family: "Family", general: "General" },
    },
    dashboard: {
      relocation: "{country} Relocation",
      subtitle: "Your personalized roadmap, updated in real time.",
      overallProgress: "Overall progress",
      openBtn: "Open",
      route: {
        heading: "Your relocation options",
        recommended: "Recommended",
        viewFullPlan: "View full plan",
        hidePlan: "Hide plan",
        successProbability: "Success probability",
        timeline: "Timeline",
        cost: "Estimated cost",
        requiredDocuments: "Required documents",
        pros: "Pros",
        cons: "Cons",
        reasoningTitle: "Why this pathway",
        checklistHeading: "Your personalized checklist",
        loading: "Analyzing your relocation options…",
      },
      steps: {
        account: { title: "Create your account", desc: "You're all set up." },
        onboarding: { title: "Complete onboarding questionnaire", desc: "We used this to build your roadmap." },
        visa: {
          title: "Check visa eligibility",
          euDesc: "As an EU/EEA citizen, you don't need a visa — just register your address once you arrive.",
          byCountry: {
            poland: {
              work: "You may qualify for a national work visa or Karta Pobytu tied to your employer.",
              study: "You'll need a national visa or Karta Pobytu tied to your studies.",
              business: "Business owners can apply for a residence permit tied to running a company in Poland.",
              family: "Family reunification permits are available if you have a family member with legal residence in Poland.",
            },
            germany: {
              work: "You may qualify for a Job Seeker Visa, EU Blue Card, or work-based Aufenthaltstitel.",
              study: "You'll need a student visa (Aufenthaltstitel zum Studium) tied to your enrollment.",
              business: "Germany offers a self-employment residence permit (Aufenthaltserlaubnis für selbständige Tätigkeit).",
              family: "Family reunification visas (Familiennachzug) may apply if you have close family already residing in Germany.",
            },
            spain: {
              work: "You may qualify for a standard work visa or the EU Blue Card.",
              study: "You'll need a student visa tied to your enrollment and financial means.",
              business: "Spain's entrepreneur or investor visa (including the Golden Visa route) may apply.",
              family: "Family reunification (reagrupación familiar) visas may apply if you have close family already residing in Spain.",
            },
          },
        },
        business: {
          title: "Register your business",
          desc: "Set up your company structure and tax registration before applying for a business residence permit.",
        },
        documents: { title: "Upload required documents", desc: "7 documents needed — 2 you already have." },
        biometric: { title: "Schedule biometric appointment", desc: "Unlocks once your documents are verified." },
        residence: { title: "Apply for residence permit", desc: "Unlocks after your biometric appointment." },
        address: { title: "Register local address", desc: "Final step before you're fully settled." },
      },
    },
    appPricing: {
      title: "Choose your plan",
      subtitle: "Pick the right plan for your move. Upgrade or downgrade any time.",
      activating: "Activating…",
      securedByStripe: "Secured by Stripe",
      mostPopular: "Most popular",
      forever: "forever",
      perMonth: "/month",
      freeName: "Free",
      premiumName: "Premium",
      proName: "Pro",
      freeDesc: "Try before you commit.",
      premiumDesc: "Full guidance for your move.",
      proDesc: "For families and complex moves.",
      freeCta: "Start free",
      premiumCta: "Get Premium",
      proCta: "Get Pro",
      freeFeatures: [
        "Poland — 1 country available",
        "Checklist: 5 steps preview",
        "5 AI messages per day",
        "Document upload & storage",
        "Full address database",
        "Community access",
        "Email support",
      ],
      premiumFeatures: [
        "All 3 countries (Poland, Germany, Spain)",
        "Full checklist — all steps",
        "50 AI messages per day",
        "Document upload & storage",
        "Full address database (banks, clinics, offices)",
        "Community access",
        "Email support",
      ],
      proFeatures: [
        "Everything in Premium",
        "Unlimited AI messages",
        "AI fills documents automatically",
        "Priority support 24/7",
        "Consultation call (1× / month)",
        "Early access to new countries",
        "PDF export for documents",
      ],
    },
    checkout: {
      secureCheckout: "Secure checkout",
      orderSummary: "Order summary",
      subscription: "Monthly subscription · cancel any time",
      perMonth: "/month",
      totalToday: "Total today",
      paymentDetails: "Payment details",
      cardNumber: "Card number",
      expiryDate: "Expiry date",
      cvc: "CVC",
      cardholderName: "Cardholder name",
      processing: "Processing…",
      trustBadge: "Secure payment · 256-bit SSL encryption · Powered by Stripe",
      termsPrefix: "By paying you agree to our",
      termsService: "Terms of Service",
      and: "and",
      privacyPolicy: "Privacy Policy",
      payFailed: "Payment failed. Please try again.",
      payBtn: "Pay",
      welcomeToast: "Welcome to {plan}! 🎉",
      premiumFeatures: ["All 3 countries", "Full checklist", "50 AI messages/day", "Document storage", "Email support"],
      proFeatures: ["Everything in Premium", "Unlimited AI messages", "AI fills documents", "Priority 24/7 support", "Monthly consultation call"],
    },
    education: {
      title: "Education",
      subtitle: "Language courses, schools, kindergartens and universities — filtered for your country.",
      coursesTab: "Language courses",
      schoolsTab: "Schools",
      kindergartensTab: "Kindergartens",
      universitiesTab: "Universities",
      filterAll: "All",
      filterPublic: "Public",
      filterPrivate: "Private",
      publicBadge: "Public",
      privateBadge: "Private",
      learnMore: "Learn more →",
      rowFormat: "Format",
      rowLevel: "Level",
      rowPrice: "Price",
      rowInstruction: "Instruction",
      rowAges: "Ages",
      rowWaiting: "Waiting list",
      rowTuition: "Tuition",
      rowDeadline: "Application deadline",
      morePrograms: "more",
      emptyState: "No options for the selected filter.",
      banners: {
        poland: {
          courses: "Holder of temporary protection status? Many Warsaw city courses are free. Ask at your local district office or Powiatowy Urząd Pracy (PUP).",
          schools: "Polish public schools are FREE for all children — including Ukrainian refugees with temporary protection status. Schools offer preparatory classes with intensive Polish language support.",
          universities: "Ukrainian citizens with temporary protection may study at Polish public universities under the same conditions as Polish citizens — typically with no tuition fees.",
        },
        germany: {
          courses: "The BAMF Integration Course is your first port of call: 700 hours of German (A1–B1) plus civic orientation, heavily subsidized or free for many residence permit types.",
          schools: "School attendance is mandatory in Germany. Newcomer children are placed in welcome classes with intensive German support before joining regular classes. Always free.",
        },
        spain: {
          courses: "EOI state schools offer incredibly affordable Spanish and English — enrol each September. Some districts offer free community Spanish classes for newcomers.",
          schools: "All children in Spain have a constitutional right to education regardless of immigration status. Public schools are free for all residents. Ask your local town hall about language support classes.",
        },
      },
    },
    aiChat: {
      welcome:
        "Hi! I'm your ReloAI assistant. I can help with questions about moving to Poland, Germany, or Spain. Ask me about documents, housing, banks, healthcare, and work!",
      personalizedGreeting: "Hi! I see you're planning to relocate to {country} for {goal}.",
      personalizedRecommendation: "Based on your profile, your top pathway is: {pathway}. Want me to walk you through it?",
      quickReplies: ["How do I get a PESEL?", "Which bank should I open?", "How do I find housing?", "What documents do I need?"],
      placeholder: "Ask ReloAI anything...",
      sendAria: "Send message",
      closeAria: "Close",
      connectionError: "I couldn't reach the server. Please check your connection and try again.",
      fallback: {
        pesel:
          "To get a PESEL number in Poland:\n- Book an appointment at the Urząd Miasta (city office) in your district.\n- Bring your passport, your visa or residence permit, and proof of address (a rental contract works).\n- Fill out form EL-ZAM on site.\nProcessing is usually same-day to a few days. You'll need your PESEL for almost everything afterward — opening a bank account, signing up for healthcare, and signing contracts.",
        bank:
          "For banking:\n- mBank — most expat-friendly, fully English app and support.\n- Revolut — works well even before you have a PESEL number.\n- PKO BP — largest branch network if you prefer in-person banking.\n- Santander — good pick if you need multi-currency accounts.",
        housing: "Housing tips: search OLX, Otodom, or Gratka for listings. Never send a deposit before viewing the apartment in person or on a live video call. Get your rental contract in Polish — it has to be in Polish to be legally enforceable. Budget for a security deposit (1–2 months' rent) plus czynsz (building maintenance fees) on top of rent.",
        documents: "Common documents you'll need: passport, visa or residence permit application, proof of address, PESEL confirmation, health insurance certificate, and (if working) your employment contract or work permit. I can walk you through any of these in more detail.",
        visa: "Visa needs depend on your citizenship and destination. For Poland, most non-EU citizens need a national visa or residence permit (Karta Pobytu) tied to work, study, or family. For Germany, look into a Job Seeker Visa, Aufenthaltstitel, or EU Blue Card. For Spain, check the Digital Nomad Visa or standard work/residence routes via NIE registration.",
        default: "I can help with documents, housing, banks, healthcare, or work. What would you like to know more about?",
      },
      actionLabel: "Do this in ReloAI →",
      premiumLabel: "Available in Premium →",
    },
    demo: {
      bannerText: "You are in preview mode. Register to save your progress and access all features.",
      registerNow: "Register Now",
      floatingGreeting: "👋 You're exploring ReloAI — Register free to save progress",
      promptHeading: "Register to unlock this feature",
      promptBody: "Create a free account to save your progress and unlock every feature.",
      promptDismiss: "Maybe later",
    },
    onboarding: {
      stepLabel: "Step {current} of {total}",
      back: "Back",
      continueBtn: "Continue",
      finish: "Finish",
      saving: "Saving...",
      skip: "Skip and fill later",
      skipTooltip: "Answer 5 questions to get your personal relocation plan",
      citizenshipLabel: "Citizenship",
      citizenshipPlaceholder: "Search for your country of citizenship...",
      currentCountryLabel: "Current country of residence",
      currentCountryPlaceholder: "Search for a country...",
      comingSoon: "Coming soon",
      steps: {
        language: { question: "Choose your language", subheading: "ReloAI will speak with you in this language." },
        citizenship: { question: "What is your citizenship?", subheading: "Helps us point you to the right visa category." },
        currentCountry: { question: "Which country are you currently in?", subheading: "Lets us tailor next steps to where you are right now." },
        destination: { question: "Where are you moving?", subheading: "We'll tailor your roadmap to this country." },
        goal: { question: "What's your main goal?", subheading: "This decides which pathways we'll analyze for you." },
      },
      goalOptions: {
        work: "Work",
        study: "Study",
        business: "Open business",
        passiveIncome: "Passive income",
        digitalNomad: "Digital Nomad",
        familyReunification: "Family reunification",
        other: "Other",
      },
      results: {
        heading: "We found 3 relocation routes for you",
        loading: "Generating your personalized routes...",
        selectButton: "Choose this route",
        recommended: "Recommended",
        speedFast: "Fast",
        speedMedium: "Medium",
        speedSlow: "Slow",
        difficultyEasy: "Easy",
        difficultyMedium: "Medium",
        difficultyHard: "Hard",
        approvalRate: "Approval rate",
        timeline: "Timeline",
        cost: "Cost",
      },
    },
  },
  ru: {
    nav: {
      howItWorks: "Как это работает",
      features: "Возможности",
      countries: "Страны",
      pricing: "Цены",
      reviews: "Отзывы",
      login: "Войти",
      getStarted: "Начать",
    },
    hero: {
      badge: "Ваш AI-гид по переезду",
      headline1: "Переезд в Европу",
      headline2: "— это просто.",
      subtext:
        "ReloAI планирует вашу визу, документы, жильё и банковские дела — шаг за шагом, простым языком. Задайте вопрос и получите персональный план за секунды.",
      getStarted: "Начать",
      seeHowItWorks: "Как это работает",
      trustedFor: "Нам доверяют переезды в",
    },
    chat: {
      assistantName: "Ассистент ReloAI",
      online: "Онлайн",
      messages: [
        "Я хочу переехать из Украины в Германию на работу.",
        "Понял. Судя по вашему профилю, вам нужна виза для поиска работы или EU Blue Card. Составить чек-лист документов?",
        "Да, пожалуйста.",
        "Готово. Нужно 7 документов, 2 у вас уже есть. Я буду напоминать о сроках.",
      ],
    },
    heroDemo: {
      question: "Куда вы хотите переехать?",
      userReply: "Польша, хочу работать",
      response: "Отлично! Сейчас составлю для вас пошаговый план переезда в Польшу.",
      inputPlaceholder: "Спросите о жизни в Польше...",
    },
    stats: {
      items: [
        { value: "3", label: "Страны" },
        { value: "10x", label: "Дешевле" },
        { value: "24/7", label: "Поддержка AI" },
      ],
    },
    howItWorks: {
      heading: "Как это работает",
      subheading: "От вопроса до дня переезда — всего четыре простых шага.",
      steps: [
        {
          title: "Расскажите о своей ситуации",
          description:
            "Ответьте на несколько вопросов о вашем гражданстве, целях и стране назначения.",
        },
        {
          title: "Получите свой план",
          description:
            "ReloAI составит персональный план по визе, жильё и срокам за несколько минут.",
        },
        {
          title: "Оформляйте документы с AI",
          description:
            "Общайтесь с ассистентом, чтобы заполнять формы, собирать документы и отслеживать сроки.",
        },
        {
          title: "Переезжайте уверенно",
          description:
            "Прибывайте, зная, что виза, жильё, банк и регистрация уже решены.",
        },
      ],
    },
    features: {
      heading: "Всё, что нужно для переезда",
      subheading: "Один ассистент для каждой части переезда в Европу.",
      items: [
        {
          title: "Помощь с визой и разрешениями",
          description:
            "Узнайте, какая виза подходит именно вам и что нужно на каждом шаге.",
        },
        {
          title: "Чек-лист документов",
          description:
            "Персональный, всегда актуальный список всех нужных документов.",
        },
        {
          title: "Помощник по жильё",
          description:
            "Ищите объявления, разбирайтесь в договорах и избегайте мошенников.",
        },
        {
          title: "Банки и налоги",
          description:
            "Откройте нужные счета и разберитесь в новых налоговых обязанностях.",
        },
        {
          title: "Оформление медицины",
          description: "Быстро оформите страховку и найдите врача рядом.",
        },
        {
          title: "AI-чат 24/7",
          description:
            "Задайте любой вопрос о переезде и получите чёткий ответ с источником.",
        },
      ],
    },
    countries: {
      heading: "Создано для вашего направления",
      subheading: "Гид по конкретной стране — не просто общие списки.",
      list: [
        {
          flag: "🇵🇱",
          name: "Польша",
          highlight: "Быстрорастущий tech-хаб",
          points: [
            "Разбор Karta Pobytu (вид на жительство)",
            "Регистрация PESEL и местный банк",
            "Гид по средней арендной плате по городам",
          ],
        },
        {
          flag: "🇩🇪",
          name: "Германия",
          highlight: "EU Blue Card и визы для поиска работы",
          points: [
            "Anmeldung и приёмы в Bürgeramt",
            "Медстраховка (государственная vs частная)",
            "Налоговый номер и виза для фрилансеров",
          ],
        },
        {
          flag: "🇪🇸",
          name: "Испания",
          highlight: "Популярно среди удалённых сотрудников",
          points: [
            "Проверка на Digital Nomad Visa",
            "Номер NIE и empadronamiento",
            "Сравнение стоимости жизни по регионам",
          ],
        },
      ],
      planMyMoveTo: "Спланировать переезд в {country} →",
    },
    pricing: {
      heading: "Простые и понятные тарифы",
      subheading: "Начните бесплатно. Перейдите на платный, когда переезд станет реальностью.",
      mostPopular: "Самый популярный",
      plans: [
        {
          name: "Бесплатный",
          price: "€0",
          period: "навсегда",
          description: "Изучите варианты перед тем, как принять решение.",
          features: [
            "Проверка визовой подходимости",
            "Базовый чек-лист документов",
            "Ограниченный AI-чат (10 сообщений/мес)",
            "Обзорные гиды по странам",
          ],
          cta: "Начать бесплатно",
        },
        {
          name: "Premium",
          price: "€29",
          period: "/месяц",
          description: "Полное сопровождение активного переезда.",
          features: [
            "Всё из Бесплатного",
            "Безлимитный AI-чат",
            "Персональный план и сроки",
            "Помощник по жильё и банку",
            "Поддержка по email",
          ],
          cta: "Подключить Premium",
        },
        {
          name: "Pro",
          price: "€49",
          period: "/месяц",
          description: "Для семей и сложных переездов.",
          features: [
            "Всё из Premium",
            "Профили для нескольких человек",
            "Проверка документов экспертом",
            "Приоритетная поддержка в чате",
            "Письма для работодателя о переезде",
          ],
          cta: "Подключить Pro",
        },
      ],
    },
    reviews: {
      heading: "Нас любят те, кто уже переехал",
      subheading: "Реальные истории людей, переехавших с ReloAI.",
      items: [
        {
          name: "Анна К.",
          route: "Украина → Польша",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Получила PESEL за 2 дня. Без ReloAI потратила бы неделю на поиски информации.",
          initials: "АК",
        },
        {
          name: "Михаил С.",
          route: "Россия → Германия",
          fromFlag: "🇷🇺",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "AI помог разобраться с Anmeldung. Объяснил всё на русском, дал адреса бюро.",
          initials: "МС",
        },
        {
          name: "Ольга М.",
          route: "Беларусь → Испания",
          fromFlag: "🇧🇾",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "Открыла бизнес в Испании. Чеклист сэкономил месяц работы и 2000 евро на юристе.",
          initials: "ОМ",
        },
        {
          name: "Дмитрий П.",
          route: "Казахстан → Польша",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 4,
          quote: "Прогресс-трекер очень помогает. Всегда знаю на каком шаге нахожусь.",
          initials: "ДП",
        },
        {
          name: "Лейла Р.",
          route: "Узбекистан → Германия",
          fromFlag: "🇺🇿",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Нашла работу в Германии через раздел вакансий. AI написал сопроводительное письмо.",
          initials: "ЛР",
        },
        {
          name: "Тимур А.",
          route: "Таджикистан → Испания",
          fromFlag: "🇹🇯",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "NIE получил за 3 недели. Раньше думал это займёт полгода.",
          initials: "ТА",
        },
        {
          name: "Карина Н.",
          route: "Украина → Германия",
          fromFlag: "🇺🇦",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Переехала с семьёй. Нашли школу для детей и врача говорящего по-русски.",
          initials: "КН",
        },
        {
          name: "Артём В.",
          route: "Россия → Испания",
          fromFlag: "🇷🇺",
          toFlag: "🇪🇸",
          rating: 4,
          quote: "Digital Nomad Visa — оформил за 6 недель по инструкции ReloAI.",
          initials: "АВ",
          documentBadge: "🇪🇸 Digital Nomad Visa",
        },
        {
          name: "Зарина И.",
          route: "Казахстан → Польша",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Открыла счёт в mBank с первого раза. AI подсказал какие документы взять.",
          initials: "ЗИ",
        },
        {
          name: "Богдан Ф.",
          route: "Украина → Польша",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Лучший сервис для переезда. Сэкономил время и нервы.",
          initials: "БФ",
          documentBadge: "🇵🇱 Karta Pobytu",
        },
      ],
    },
    contact: {
      heading: "Готовы начать переезд?",
      subtext:
        "Скажите, куда вы направляетесь, и мы отправим бесплатный план переезда в течение дня.",
      email: "hello@reloai.com",
      repliesWithin: "Отвечаем в течение 24 часов",
      form: {
        fullName: "Полное имя",
        emailLabel: "Email",
        movingTo: "Переезд в",
        message: "Сообщение",
        placeholderName: "Иван Иванов",
        placeholderEmail: "ivan@example.com",
        placeholderMessage: "Расскажите немного о вашем переезде...",
        destinations: ["Польша", "Германия", "Испания", "Другое"],
        send: "Отправить сообщение",
      },
      success: {
        title: "Спасибо — сообщение отправлено!",
        subtext: "Мы скоро свяжемся с вами и пришлём план переезда.",
      },
    },
    footer: {
      description:
        "Ваш AI-ассистент по переезду в Европу — визы, документы, жильё и банк, шаг за шагом.",
      productHeading: "Продукт",
      countriesHeading: "Страны",
      companyHeading: "Компания",
      productLinks: ["Как это работает", "Возможности", "Цены"],
      companyLinks: ["Отзывы", "Контакты"],
      rights: "Все права защищены.",
      disclaimer: "ReloAI предоставляет информационные услуги. Мы не являемся юридической фирмой и не несём ответственности за решения миграционных органов. Вся информация носит ознакомительный характер. Для юридической помощи обратитесь к лицензированному специалисту.",
    },
    auth: {
      or: "или",
      login: {
        heading: "С возвращением",
        subtext: "Войдите чтобы продолжить переезд.",
        googleSignIn: "Войти через Google",
        email: "Электронная почта",
        passwordLabel: "Пароль",
        submit: "Продолжить",
        forgotPassword: "Забыли пароль?",
        noAccount: "Нет аккаунта?",
        register: "Зарегистрироваться",
      },
      register: {
        heading: "Создайте аккаунт",
        subtitle: "Постройте бесплатный план переезда за несколько минут.",
        googleSignUp: "Зарегистрироваться через Google",
        redirecting: "Перенаправление…",
        fullName: "Полное имя",
        email: "Email",
        passwordLabel: "Пароль",
        passwordTooltip: "Пароль не соответствует требованиям",
        submit: "Зарегистрироваться",
        hasAccount: "Уже есть аккаунт?",
        login: "Войти",
        confirmEmail: {
          heading: "Проверьте почту",
          body: "Мы отправили ссылку для подтверждения на {email}. Перейдите по ней, чтобы активировать аккаунт, а затем войдите.",
          goToLogin: "Перейти ко входу",
        },
      },
    },
    password: {
      minLength: "Минимум 8 символов",
      hasUppercase: "Хотя бы одна заглавная буква (A–Z)",
      hasLowercase: "Хотя бы одна строчная буква (a–z)",
      hasNumber: "Хотя бы одна цифра (0–9)",
      hasSpecialOrNumber: "Спецсимвол (!@#$%^&*) — или цифра засчитывается вдвойне",
      noForeign: "Только английские буквы (без кириллицы)",
      weak: "Слабый",
      medium: "Средний",
      strong: "Надёжный",
    },
    profile: {
      title: "Профиль",
      subtitle: "Управляйте аккаунтом и настройками.",
      languageSection: "Язык",
      languageDesc: "ReloAI будет общаться с вами на этом языке.",
      saving: "(сохранение…)",
      notifications: "Уведомления",
      logOut: "Выйти",
      planSuffix: "план",
      unnamed: "Без имени",
      notifEmail: "Email-рассылка",
      notifEmailDesc: "Время от времени — новости и советы.",
      notifDocuments: "Напоминания о документах",
      notifDocumentsDesc: "Предупреждения перед истечением срока.",
      notifProduct: "Новости продукта",
      notifProductDesc: "Новые функции и обновления.",
    },
    topbar: {
      searchPlaceholder: "Поиск документов, задач...",
      upgrade: "Улучшить",
      openMenuAria: "Открыть меню",
    },
    sidebar: {
      documents: "Документы",
      housing: "Жильё",
      banks: "Банки",
      medicine: "Медицина",
      work: "Работа",
      community: "Сообщество",
      education: "Образование",
      otherServices: "Другие услуги",
      profile: "Профиль",
      settings: "Настройки",
      logout: "Выход",
    },
    documents: {
      title: "Документы",
      subtitle: "Всё необходимое для переезда — в одном месте.",
      tabs: { all: "Все", passport: "Паспорт", pesel: "PESEL", workPermit: "Разрешение на работу", insurance: "Страховка", bank: "Банк" },
      status: { verified: "Готово", pending: "На проверке", missing: "Отсутствует", locked: "Premium" },
      upload: "Перетащите файл или нажмите, чтобы загрузить",
      viewBtn: "Просмотр",
      deleteBtn: "Удалить",
      unlockBtn: "Открыть с Premium",
      docNames: {
        passportScan: "Скан паспорта",
        passportPhoto: "Фото на паспорт",
        peselForm: "Заявление на PESEL",
        peselLetter: "Письмо-подтверждение PESEL",
        workPermitApp: "Заявление на разрешение на работу",
        sponsorshipLetter: "Письмо от работодателя-спонсора",
        healthInsurance: "Полис медицинской страховки",
        travelInsurance: "Туристическая страховка",
        bankConfirmation: "Подтверждение банковского счёта",
        proofOfFunds: "Подтверждение наличия средств",
        relocationLetter: "Письмо о переезде от работодателя",
        taxResidency: "Справка о налоговом резидентстве",
      },
      autoCompleteToast: "✓ Шаг выполнен автоматически",
      sectionCompleteHeading: "🎉 Раздел завершён!",
      sectionCompleteBody: "Переходите к следующему шагу.",
      sectionCompleteDismiss: "Продолжить",
      deleteConfirmTitle: "Удалить документ?",
      deleteConfirmBody: "Это действие нельзя отменить. Документ будет удалён безвозвратно.",
      cancelBtn: "Отмена",
    },
    housing: {
      title: "Жильё в Польше 🇵🇱",
      subtitle: "Найдите жильё с умом.",
      rentMarket: "Рынок аренды",
      rentMarketSub: "Средняя месячная аренда по районам Варшавы.",
      distanceToCenter: "{km} км до центра",
      metroAccess: "Есть метро",
      noMetro: "Без метро",
      topWebsites: "Лучшие сайты",
      topWebsitesSub: "Где реально искать объявления.",
      aiTips: "Советы от AI",
      aiTipsSub: "Практические советы от тех, кто уже переехал.",
      visitSite: "Перейти на сайт",
      websiteDescs: {
        olx: "Крупнейший сайт объявлений Польши — самый большой выбор, в основном напрямую от владельцев.",
        otodom: "Самые качественные объявления, хорошие фильтры, популярен у агентств.",
        gratka: "Меньше, но надёжно — хорош для городов поменьше.",
      },
      tips: [
        {
          title: "Остерегайтесь мошенников с депозитом",
          body: "Никогда не переводите депозит, не увидев квартиру лично или на видеозвонке с хозяином. Мошенники охотятся на иностранцев с слишком выгодными объявлениями.",
        },
        {
          title: "Требуйте договор на польском",
          body: "Договор аренды (umowa najmu) должен быть составлен на польском языке, чтобы иметь юридическую силу. Сделайте заверенный перевод, прежде чем подписывать то, что не до конца понимаете.",
        },
        {
          title: "Планируйте бюджет не только на аренду",
          body: "Ожидайте залог (1–2 месячные ставки) плюс czynsz — эксплуатационные расходы дома, которые оплачиваются отдельно от аренды и коммунальных услуг.",
        },
      ],
      topDistrictDescs: {
        mokotow: "Лучший баланс цены и качества. Тихий, зелёный, хорошая инфраструктура, метро.",
        ursynow: "Самый доступный комфортный район. Метро, парки, семейная атмосфера.",
        wola: "Современный район, много новостроек, быстро развивается, близко к центру.",
        zoliborz: "Уютный, безопасный, любимый среди экспатов. Отличная атмосфера.",
      },
      bestValueBadge: "Рекомендуем",
      showAllDistricts: "Показать все районы →",
      showFewerDistricts: "Свернуть список районов",
    },
    banks: {
      title: "Банки в Польше 🇵🇱",
      subtitle: "Сравните счета, созданные для новоприбывших.",
      openAccount: "Открыть счёт",
      bestForExpats: "Лучший для экспатов",
      features: {
        pkobp: ["Самая большая сеть отделений в Польше", "Приложение на польском и английском", "Бесплатные варианты студенческого счёта"],
        mbank: ["Полностью англоязычное приложение и поддержка", "Мгновенное открытие счёта онлайн", "Без комиссий даже без номера PESEL"],
        santander: ["Мультивалютные счета", "Международная банковская сеть", "Бесплатное использование карты за границей"],
        revolut: ["PESEL не требуется для начала", "Мультивалютный кошелёк", "Лучший вариант для цифровых кочевников"],
      },
    },
    medicine: {
      title: "Медицина в Польше 🇵🇱",
      subtitle: "Оформите страховку и найдите врача быстро.",
      nfzVsPrivate: "NFZ против частной страховки",
      nfzPublic: "NFZ (гос.)",
      privateLabel: "Частная",
      clinicsTitle: "Клиники",
      clinicsSub: "Варианты с англо-, русско- и украиноязычным персоналом.",
      warsaw: "Варшава",
      languages: {
        ruUa: "Говорят по-русски и по-украински",
        en: "Говорят по-английски",
        ru: "Говорят по-русски",
        ua: "Говорят по-украински",
      },
      rows: [
        { label: "Стоимость", nfz: "Бесплатно при трудовых отчислениях", pvt: "150–400 злотых/месяц" },
        { label: "Время ожидания", nfz: "От недель до месяцев к специалистам", pvt: "От пары дней до того же дня" },
        { label: "Языковая поддержка", nfz: "В основном только польский", pvt: "Английский, часто русский/украинский" },
        { label: "Охват", nfz: "Широкий, но ограниченный выбор врачей", pvt: "Выбирайте свою клинику и врача" },
      ],
      bookBtn: "Записаться",
    },
    work: {
      title: "Работа в Польше 🇵🇱",
      subtitle: "Контракты, зарплаты и где искать.",
      contractVsB2B: "Трудовой договор против B2B",
      salarySearch: "Поиск зарплаты",
      salarySearchSub: "Введите профессию, чтобы узнать среднюю зарплату.",
      placeholder: "например, разработчик, медсестра, водитель...",
      averageSalary: "Средняя зарплата",
      inEuros: "В евро",
      noExactData: "Точных данных по этой профессии пока нет — показываем среднюю по стране.",
      jobSites: "Сайты вакансий",
      visitSite: "Перейти на сайт",
      employmentSubtitle: "Трудовой договор",
      b2bSubtitle: "Самозанятость",
      b2bContractName: "Договор B2B",
      employmentFeatures: [
        "Оплачиваемый отпуск, больничный и срок предупреждения",
        "Работодатель платит взносы в ZUS",
        "Более простой путь к виду на жительство",
      ],
      b2bFeatures: [
        "Выше зарплата на руки, ниже налоговая ставка",
        "Вы сами занимаетесь ZUS и выставлением счетов",
        "Больше гибкости, меньше стабильности",
      ],
      jobSiteDescs: {
        pracuj: "Крупнейшая доска вакансий Польши, все отрасли.",
        nofluff: "Ориентирован на IT, зарплаты указаны сразу.",
        linkedin: "Международные вакансии, хорош для англоговорящих.",
      },
    },
    community: {
      title: "Сообщество 🇵🇱",
      subtitle: "Telegram-каналы, которыми реально пользуются переехавшие.",
      join: "Вступить",
      members: "участников",
      cats: { all: "Все", housing: "Жильё", work: "Работа", sport: "Спорт", family: "Семья", general: "Общее" },
    },
    dashboard: {
      relocation: "Переезд в {country}",
      subtitle: "Ваш персональный план, обновляется в реальном времени.",
      overallProgress: "Общий прогресс",
      openBtn: "Открыть",
      route: {
        heading: "Ваши варианты переезда",
        recommended: "Рекомендовано",
        viewFullPlan: "Смотреть полный план",
        hidePlan: "Скрыть план",
        successProbability: "Вероятность успеха",
        timeline: "Сроки",
        cost: "Примерная стоимость",
        requiredDocuments: "Необходимые документы",
        pros: "Плюсы",
        cons: "Минусы",
        reasoningTitle: "Почему этот путь",
        checklistHeading: "Ваш персональный чек-лист",
        loading: "Анализируем ваши варианты переезда…",
      },
      steps: {
        account: { title: "Создайте аккаунт", desc: "Всё готово." },
        onboarding: { title: "Заполните анкету онбординга", desc: "Мы использовали её, чтобы составить ваш план." },
        visa: {
          title: "Проверьте визовую подходимость",
          euDesc: "Как гражданину ЕС/ЕЭЗ, вам не нужна виза — просто зарегистрируйте адрес по прибытии.",
          byCountry: {
            poland: {
              work: "Вам может подойти национальная рабочая виза или Karta Pobytu, привязанная к работодателю.",
              study: "Вам понадобится национальная виза или Karta Pobytu, привязанная к учёбе.",
              business: "Владельцы бизнеса могут подать на вид на жительство, связанный с ведением компании в Польше.",
              family: "Разрешения на воссоединение семьи доступны, если у вас есть родственник с легальным видом на жительство в Польше.",
            },
            germany: {
              work: "Вам может подойти Job Seeker Visa, EU Blue Card или трудовой Aufenthaltstitel.",
              study: "Вам понадобится студенческая виза (Aufenthaltstitel zum Studium), привязанная к зачислению.",
              business: "В Германии есть вид на жительство для самозанятых (Aufenthaltserlaubnis für selbständige Tätigkeit).",
              family: "Могут подойти визы воссоединения семьи (Familiennachzug), если у вас есть близкие родственники, уже проживающие в Германии.",
            },
            spain: {
              work: "Вам может подойти обычная рабочая виза или EU Blue Card.",
              study: "Вам понадобится студенческая виза, привязанная к зачислению и финансовым средствам.",
              business: "Может подойти виза предпринимателя или инвестора (включая маршрут Golden Visa).",
              family: "Могут подойти визы воссоединения семьи (reagrupación familiar), если у вас есть близкие родственники, уже проживающие в Испании.",
            },
          },
        },
        business: {
          title: "Зарегистрируйте бизнес",
          desc: "Оформите структуру компании и налоговую регистрацию перед подачей на вид на жительство для бизнеса.",
        },
        documents: { title: "Загрузите необходимые документы", desc: "Нужно 7 документов — 2 у вас уже есть." },
        biometric: { title: "Запишитесь на биометрию", desc: "Откроется после проверки ваших документов." },
        residence: { title: "Подайте на вид на жительство", desc: "Откроется после приёма по биометрии." },
        address: { title: "Зарегистрируйте местный адрес", desc: "Последний шаг перед тем, как вы полностью обоснуетесь." },
      },
    },
    appPricing: {
      title: "Выберите тариф",
      subtitle: "Подберите подходящий план для переезда. Меняйте его в любое время.",
      activating: "Активация…",
      securedByStripe: "Защищено Stripe",
      mostPopular: "Популярный",
      forever: "навсегда",
      perMonth: "/месяц",
      freeName: "Бесплатный",
      premiumName: "Premium",
      proName: "Pro",
      freeDesc: "Попробуйте, прежде чем платить.",
      premiumDesc: "Полное сопровождение вашего переезда.",
      proDesc: "Для семей и сложных переездов.",
      freeCta: "Начать бесплатно",
      premiumCta: "Получить Premium",
      proCta: "Получить Pro",
      freeFeatures: [
        "Польша — 1 страна доступна",
        "Чек-лист: превью из 5 шагов",
        "5 AI-сообщений в день",
        "Загрузка и хранение документов",
        "Полная база адресов",
        "Доступ к сообществу",
        "Поддержка по email",
      ],
      premiumFeatures: [
        "Все 3 страны (Польша, Германия, Испания)",
        "Полный чек-лист — все шаги",
        "50 AI-сообщений в день",
        "Загрузка и хранение документов",
        "Полная база адресов (банки, клиники, офисы)",
        "Доступ к сообществу",
        "Поддержка по email",
      ],
      proFeatures: [
        "Всё из Premium",
        "Безлимитные AI-сообщения",
        "AI автоматически заполняет документы",
        "Приоритетная поддержка 24/7",
        "Консультация (1× в месяц)",
        "Ранний доступ к новым странам",
        "Экспорт документов в PDF",
      ],
    },
    checkout: {
      secureCheckout: "Безопасная оплата",
      orderSummary: "Сводка заказа",
      subscription: "Ежемесячная подписка · отмена в любое время",
      perMonth: "/месяц",
      totalToday: "Итого сегодня",
      paymentDetails: "Данные оплаты",
      cardNumber: "Номер карты",
      expiryDate: "Срок действия",
      cvc: "CVC",
      cardholderName: "Имя владельца карты",
      processing: "Обработка…",
      trustBadge: "Безопасный платёж · 256-битное SSL-шифрование · На основе Stripe",
      termsPrefix: "Оплачивая, вы соглашаетесь с нашими",
      termsService: "Условиями использования",
      and: "и",
      privacyPolicy: "Политикой конфиденциальности",
      payFailed: "Оплата не прошла. Попробуйте ещё раз.",
      payBtn: "Оплатить",
      welcomeToast: "Добро пожаловать в {plan}! 🎉",
      premiumFeatures: ["Все 3 страны", "Полный чек-лист", "50 AI-сообщений в день", "Хранение документов", "Поддержка по email"],
      proFeatures: ["Всё из Premium", "Безлимитные AI-сообщения", "AI заполняет документы", "Приоритетная поддержка 24/7", "Ежемесячная консультация"],
    },
    education: {
      title: "Образование",
      subtitle: "Языковые курсы, школы, детские сады и университеты — с учётом вашей страны.",
      coursesTab: "Языковые курсы",
      schoolsTab: "Школы",
      kindergartensTab: "Детские сады",
      universitiesTab: "Университеты",
      filterAll: "Все",
      filterPublic: "Государственные",
      filterPrivate: "Частные",
      publicBadge: "Государств.",
      privateBadge: "Частное",
      learnMore: "Подробнее →",
      rowFormat: "Формат",
      rowLevel: "Уровень",
      rowPrice: "Стоимость",
      rowInstruction: "Язык обучения",
      rowAges: "Возраст",
      rowWaiting: "Очередь",
      rowTuition: "Стоимость",
      rowDeadline: "Подача заявок",
      morePrograms: "ещё",
      emptyState: "Нет вариантов для выбранного фильтра.",
      banners: {
        poland: {
          courses: "Есть статус временной защиты? Многие курсы от города Варшавы бесплатны. Спросите в местном urząd dzielnicy или Powiatowy Urząd Pracy (PUP).",
          schools: "Польские государственные школы БЕСПЛАТНЫ для всех детей — включая украинских беженцев со статусом временной защиты. Школы предлагают подготовительные классы с интенсивной поддержкой польского языка.",
          universities: "Граждане Украины со статусом временной защиты могут учиться в польских государственных университетах на тех же условиях, что и граждане Польши — как правило, без платы за обучение.",
        },
        germany: {
          courses: "Интеграционный курс BAMF — ваш первый шаг: 700 часов немецкого (A1–B1) плюс курс обществознания, сильно субсидируется или бесплатен для многих типов вида на жительство.",
          schools: "Посещение школы обязательно в Германии. Новоприбывших детей определяют в приветственные классы с интенсивной поддержкой немецкого языка перед переходом в обычные классы. Всегда бесплатно.",
        },
        spain: {
          courses: "Государственные школы EOI предлагают очень доступный испанский и английский — запись каждый сентябрь. В некоторых районах есть бесплатные общественные курсы испанского для новоприбывших.",
          schools: "Все дети в Испании имеют конституционное право на образование независимо от иммиграционного статуса. Государственные школы бесплатны для всех резидентов. Спросите в вашей мэрии о курсах языковой поддержки.",
        },
      },
    },
    aiChat: {
      welcome:
        "Привет! Я ваш AI-ассистент ReloAI. Помогу с вопросами о переезде в Польшу, Германию или Испанию. Спрашивайте про документы, жильё, банки, медицину и работу!",
      personalizedGreeting: "Привет! Вижу, вы планируете переезд в {country} с целью «{goal}».",
      personalizedRecommendation: "Судя по вашему профилю, лучший вариант для вас: {pathway}. Рассказать подробнее?",
      quickReplies: ["Как получить PESEL?", "Какой банк открыть?", "Как найти жильё?", "Какие документы нужны?"],
      placeholder: "Спросите ReloAI о чём угодно...",
      sendAria: "Отправить сообщение",
      closeAria: "Закрыть",
      connectionError: "Не удалось связаться с сервером. Проверьте соединение и попробуйте снова.",
      fallback: {
        pesel:
          "Чтобы получить номер PESEL в Польше:\n- Запишитесь на приём в Urząd Miasta (городское управление) вашего района.\n- Возьмите с собой паспорт, визу или вид на жительство и подтверждение адреса (подойдёт договор аренды).\n- Заполните на месте форму EL-ZAM.\nОбработка обычно занимает от одного дня до нескольких. PESEL понадобится вам почти для всего в дальнейшем — открытия банковского счёта, оформления медицинской страховки и подписания договоров.",
        bank:
          "По банкам:\n- mBank — самый удобный вариант для экспатов, полностью на английском языке.\n- Revolut — отлично работает даже до получения PESEL.\n- PKO BP — самая большая сеть отделений, если предпочитаете обслуживание лично.\n- Santander — хорош, если нужны мультивалютные счета.",
        housing: "Советы по жилью: ищите объявления на OLX, Otodom или Gratka. Никогда не переводите депозит, не осмотрев квартиру лично или по видеосвязи. Договор аренды должен быть на польском языке, чтобы иметь юридическую силу. Заложите в бюджет залог (аренда за 1–2 месяца) плюс czynsz (плата за обслуживание дома) сверх аренды.",
        documents: "Обычно нужны следующие документы: паспорт, заявление на визу или вид на жительство, подтверждение адреса, справка о PESEL, полис медицинской страховки и (если работаете) трудовой договор или разрешение на работу. Могу подробнее рассказать про любой из них.",
        visa: "Визовые требования зависят от вашего гражданства и страны назначения. Для Польши большинству граждан не из ЕС нужна национальная виза или вид на жительство (Karta Pobytu), связанные с работой, учёбой или семьёй. Для Германии рассмотрите Job Seeker Visa, Aufenthaltstitel или EU Blue Card. Для Испании — Digital Nomad Visa или обычные пути через рабочий/жительский статус и регистрацию NIE.",
        default: "Я могу помочь с документами, жильём, банками, медициной или работой. Что вас интересует подробнее?",
      },
      actionLabel: "Сделать это в ReloAI →",
      premiumLabel: "Доступно в Premium →",
    },
    demo: {
      bannerText: "Вы находитесь в режиме предпросмотра. Зарегистрируйтесь, чтобы сохранить прогресс и получить доступ ко всем функциям.",
      registerNow: "Зарегистрироваться",
      floatingGreeting: "👋 Вы изучаете ReloAI — зарегистрируйтесь бесплатно, чтобы сохранить прогресс",
      promptHeading: "Зарегистрируйтесь, чтобы разблокировать эту функцию",
      promptBody: "Создайте бесплатный аккаунт, чтобы сохранить прогресс и открыть все функции.",
      promptDismiss: "Может быть позже",
    },
    onboarding: {
      stepLabel: "Шаг {current} из {total}",
      back: "Назад",
      continueBtn: "Продолжить",
      finish: "Готово",
      saving: "Сохранение...",
      skip: "Пропустить и заполнить позже",
      skipTooltip: "Ответьте на 5 вопросов, чтобы получить персональный план переезда",
      citizenshipLabel: "Гражданство",
      citizenshipPlaceholder: "Найдите страну вашего гражданства...",
      currentCountryLabel: "Страна текущего проживания",
      currentCountryPlaceholder: "Найдите страну...",
      comingSoon: "Скоро",
      steps: {
        language: { question: "Выберите язык", subheading: "ReloAI будет общаться с вами на этом языке." },
        citizenship: { question: "Какое у вас гражданство?", subheading: "Поможет определить подходящую визовую категорию." },
        currentCountry: { question: "В какой стране вы сейчас находитесь?", subheading: "Позволит адаптировать следующие шаги под ваше текущее местоположение." },
        destination: { question: "Куда вы переезжаете?", subheading: "Мы адаптируем ваш план под эту страну." },
        goal: { question: "Какова ваша основная цель?", subheading: "Это определит, какие пути мы для вас проанализируем." },
      },
      goalOptions: {
        work: "Работа",
        study: "Учёба",
        business: "Открыть бизнес",
        passiveIncome: "Пассивный доход",
        digitalNomad: "Цифровой кочевник",
        familyReunification: "Воссоединение семьи",
        other: "Другое",
      },
      results: {
        heading: "Мы нашли 3 маршрута переезда для вас",
        loading: "Генерируем ваши персональные маршруты...",
        selectButton: "Выбрать этот маршрут",
        recommended: "Рекомендуем",
        speedFast: "Быстрый",
        speedMedium: "Средний",
        speedSlow: "Долгий",
        difficultyEasy: "Простой",
        difficultyMedium: "Средний",
        difficultyHard: "Сложный",
        approvalRate: "Вероятность одобрения",
        timeline: "Сроки",
        cost: "Стоимость",
      },
    },
  },
  uz: {
    nav: {
      howItWorks: "Qanday ishlaydi",
      features: "Imkoniyatlar",
      countries: "Davlatlar",
      pricing: "Narxlar",
      reviews: "Sharhlar",
      login: "Kirish",
      getStarted: "Boshlash",
    },
    hero: {
      badge: "Sizning AI ko'chish yordamchingiz",
      headline1: "Yevropaga ko'chish",
      headline2: "— oddiy.",
      subtext:
        "ReloAI sizning vizangiz, hujjatlaringiz, turar joyingiz va bank ishlaringizni — qadam-baqadam, oddiy tilda rejalashtiradi. Savol bering va soniyalar ichida shaxsiy reja oling.",
      getStarted: "Boshlash",
      seeHowItWorks: "Qanday ishlashini ko'rish",
      trustedFor: "Quyidagi davlatlarga ko'chishda ishonch bildirishadi",
    },
    chat: {
      assistantName: "ReloAI Yordamchisi",
      online: "Onlayn",
      messages: [
        "Men Ukrainadan Germaniyaga ishlash uchun ko'chmoqchiman.",
        "Tushunarli. Profilingizga ko'ra, sizga Job Seeker Visa yoki EU Blue Card kerak bo'ladi. Hujjatlar ro'yxatini tuzishimni xohlaysizmi?",
        "Ha, iltimos.",
        "Tayyor. 7 ta hujjat kerak, 2 tasi sizda allaqachon bor. Muddatlar haqida sizga eslatib boraman.",
      ],
    },
    heroDemo: {
      question: "Qayerga ko'chib o'tmoqchisiz?",
      userReply: "Polsha, ishlamoqchiman",
      response: "Ajoyib! Hozir sizga Polshaga ko'chish uchun bosqichma-bosqich reja tuzib beraman.",
      inputPlaceholder: "Polshada yashash haqida so'rang...",
    },
    stats: {
      items: [
        { value: "3", label: "Davlat" },
        { value: "10x", label: "Arzon" },
        { value: "24/7", label: "AI yordam" },
      ],
    },
    howItWorks: {
      heading: "Qanday ishlaydi",
      subheading: "Savoldan ko'chish kuniga qadar — to'rt oddiy qadam.",
      steps: [
        {
          title: "Vaziyatingizni aytib bering",
          description:
            "Fuqaroligingiz, maqsadlaringiz va maqsadli davlat haqida bir necha savolga javob bering.",
        },
        {
          title: "Reja oling",
          description:
            "ReloAI bir necha daqiqada shaxsiy viza, turar joy va vaqt jadvalini tuzadi.",
        },
        {
          title: "Hujjatlarni AI bilan boshqaring",
          description:
            "Formalarni to'ldirish, hujjatlarni yig'ish va muddatlarni kuzatish uchun yordamchi bilan suhbatlashing.",
        },
        {
          title: "Ishonch bilan ko'ching",
          description:
            "Viza, turar joy, bank va ro'yxatdan o'tish hal qilinganini bilib boring.",
        },
      ],
    },
    features: {
      heading: "Ko'chish uchun kerak bo'lgan hamma narsa",
      subheading: "Yevropaga ko'chishning har bir qismi uchun bitta yordamchi.",
      items: [
        {
          title: "Viza va ruxsatnoma bo'yicha maslahat",
          description:
            "Sizga qaysi viza mosligini va har bir qadamda nima kerak bo'lishini biling.",
        },
        {
          title: "Hujjatlar ro'yxati",
          description:
            "Sizga kerak bo'lgan barcha hujjatlarning shaxsiy, doimo yangilanadigan ro'yxati.",
        },
        {
          title: "Turar joy yordamchisi",
          description:
            "E'lonlarni qidiring, shartnomalarni tushuning va firibgarlikdan saqlaning.",
        },
        {
          title: "Bank va soliqlar",
          description:
            "To'g'ri hisob ochish va yangi soliq majburiyatlarini tushunish.",
        },
        {
          title: "Sog'liqni saqlashni rasmiylashtirish",
          description: "Sug'urtadan ro'yxatdan o'ting va tez orada mahalliy shifokor toping.",
        },
        {
          title: "24/7 AI-chat",
          description:
            "Ko'chish haqida har qanday savol bering va aniq, manbali javob oling.",
        },
      ],
    },
    countries: {
      heading: "Sizning manzilingiz uchun yaratilgan",
      subheading: "Oddiy ro'yxatlardan ko'ra ko'proq — davlatga xos maslahat.",
      list: [
        {
          flag: "🇵🇱",
          name: "Polsha",
          highlight: "Tez rivojlanayotgan tech-markaz",
          points: [
            "Karta Pobytu yashash ruxsatnomasi bo'yicha qo'llanma",
            "PESEL ro'yxatdan o'tish va mahalliy bank",
            "Shaharlar bo'yicha o'rtacha ijara narxi",
          ],
        },
        {
          flag: "🇩🇪",
          name: "Germaniya",
          highlight: "EU Blue Card va ish izlovchi vizalari",
          points: [
            "Anmeldung va Bürgeramt uchrashuvlari",
            "Sog'liq sug'urtasi (davlat vs xususiy)",
            "Soliq raqami va frilanser vizasi yordami",
          ],
        },
        {
          flag: "🇪🇸",
          name: "Ispaniya",
          highlight: "Masofadan ishlovchilar orasida mashhur",
          points: [
            "Digital Nomad Visa uchun moslik tekshiruvi",
            "NIE raqami va empadronamiento",
            "Hududlar bo'yicha yashash narxi taqqoslash",
          ],
        },
      ],
      planMyMoveTo: "{country}ga ko'chishni rejalashtirish →",
    },
    pricing: {
      heading: "Oddiy va shaffof narxlar",
      subheading: "Bepul boshlang. Ko'chish jiddiy bo'lganda yangilang.",
      mostPopular: "Eng mashhur",
      plans: [
        {
          name: "Bepul",
          price: "€0",
          period: "doim",
          description: "Qaror qabul qilishdan oldin variantlaringizni ko'rib chiqing.",
          features: [
            "Vizaga moslik tekshiruvi",
            "Asosiy hujjatlar ro'yxati",
            "Cheklangan AI-chat (10 xabar/oy)",
            "Davlatlar haqida umumiy qo'llanmalar",
          ],
          cta: "Bepul boshlash",
        },
        {
          name: "Premium",
          price: "€29",
          period: "/oy",
          description: "Faol ko'chish uchun to'liq yordam.",
          features: [
            "Bepul rejadagi hamma narsa",
            "Cheksiz AI-chat",
            "Shaxsiy reja va muddatlar",
            "Turar joy va bank yordamchisi",
            "Email orqali yordam",
          ],
          cta: "Premiumni olish",
        },
        {
          name: "Pro",
          price: "€49",
          period: "/oy",
          description: "Oilalar va murakkab ko'chishlar uchun.",
          features: [
            "Premiumdagi hamma narsa",
            "Bir nechta shaxs uchun profil",
            "Mutaxassis tomonidan hujjatlarni tekshirish",
            "Ustuvor chat yordami",
            "Ish beruvchi uchun ko'chish xatlari",
          ],
          cta: "Proni olish",
        },
      ],
    },
    reviews: {
      heading: "Ko'chganlar tomonidan yaxshi ko'riladi",
      subheading: "ReloAI bilan ko'chgan odamlarning haqiqiy hikoyalari.",
      items: [
        {
          name: "Anna K.",
          route: "Ukraina → Polsha",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "PESEL'imni 2 kunda oldim. ReloAI bo'lmaganida ma'lumot qidirishga bir hafta sarflagan bo'lardim.",
          initials: "AK",
        },
        {
          name: "Mikhail S.",
          route: "Rossiya → Germaniya",
          fromFlag: "🇷🇺",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "AI Anmeldungni tushunishimga yordam berdi. Hammasini tushuntirdi va idoralar manzilini berdi.",
          initials: "MS",
        },
        {
          name: "Olga M.",
          route: "Belarus → Ispaniya",
          fromFlag: "🇧🇾",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "Ispaniyada biznes ochdim. Ro'yxat menga bir oy vaqt va 2000 yevro advokat xarajatini tejadi.",
          initials: "OM",
        },
        {
          name: "Dmitry P.",
          route: "Qozog'iston → Polsha",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 4,
          quote: "Progress-trekeri juda yordam beradi. Doim qaysi bosqichda ekanligimni bilaman.",
          initials: "DP",
        },
        {
          name: "Leyla R.",
          route: "O'zbekiston → Germaniya",
          fromFlag: "🇺🇿",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Ish o'rinlari bo'limi orqali Germaniyadan ish topdim. AI hatto motivatsion xat ham yozib berdi.",
          initials: "LR",
        },
        {
          name: "Timur A.",
          route: "Tojikiston → Ispaniya",
          fromFlag: "🇹🇯",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "NIE'ni 3 haftada oldim. Avval yarim yil ketadi deb o'ylagandim.",
          initials: "TA",
        },
        {
          name: "Karina N.",
          route: "Ukraina → Germaniya",
          fromFlag: "🇺🇦",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Oila bilan ko'chib o'tdim. Bolalar uchun maktab va rus tilida gaplashadigan shifokor topdik.",
          initials: "KN",
        },
        {
          name: "Artyom V.",
          route: "Rossiya → Ispaniya",
          fromFlag: "🇷🇺",
          toFlag: "🇪🇸",
          rating: 4,
          quote: "Digital Nomad Visa — ReloAI qo'llanmasi bo'yicha 6 haftada rasmiylashtirdim.",
          initials: "AV",
          documentBadge: "🇪🇸 Digital Nomad Visa",
        },
        {
          name: "Zarina I.",
          route: "Qozog'iston → Polsha",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "mBank'da birinchi urinishda hisob ochdim. AI qaysi hujjatlarni olib borish kerakligini aytdi.",
          initials: "ZI",
        },
        {
          name: "Bogdan F.",
          route: "Ukraina → Polsha",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Ko'chish uchun eng yaxshi xizmat. Vaqt va asablarimni tejadim.",
          initials: "BF",
          documentBadge: "🇵🇱 Karta Pobytu",
        },
      ],
    },
    contact: {
      heading: "Ko'chishni boshlashga tayyormisiz?",
      subtext:
        "Qayerga ketayotganingizni ayting — bir kun ichida bepul ko'chish rejasini yuboramiz.",
      email: "hello@reloai.com",
      repliesWithin: "24 soat ichida javob beramiz",
      form: {
        fullName: "To'liq ism",
        emailLabel: "Email",
        movingTo: "Qayerga ko'chasiz",
        message: "Xabar",
        placeholderName: "Anvar Aliyev",
        placeholderEmail: "anvar@example.com",
        placeholderMessage: "Ko'chishingiz haqida bir oz yozing...",
        destinations: ["Polsha", "Germaniya", "Ispaniya", "Boshqa"],
        send: "Xabarni yuborish",
      },
      success: {
        title: "Rahmat — xabar yuborildi!",
        subtext: "Tez orada ko'chish rejangiz bilan siz bilan bog'lanamiz.",
      },
    },
    footer: {
      description:
        "Yevropaga ko'chish uchun AI yordamchingiz — vizalar, hujjatlar, turar joy va bank ishlari, qadam-baqadam.",
      productHeading: "Mahsulot",
      countriesHeading: "Davlatlar",
      companyHeading: "Kompaniya",
      productLinks: ["Qanday ishlaydi", "Imkoniyatlar", "Narxlar"],
      companyLinks: ["Sharhlar", "Aloqa"],
      rights: "Barcha huquqlar himoyalangan.",
      disclaimer: "ReloAI axborot xizmatlarini taqdim etadi. Biz yuridik firma emasmiz va migratsiya organlarining qarorlari uchun javobgar emasmiz. Barcha ma'lumotlar faqat tanishtirish maqsadida berilgan. Yuridik yordam uchun litsenziyalangan mutaxassisga murojaat qiling.",
    },
    auth: {
      or: "yoki",
      login: {
        heading: "Xush kelibsiz",
        subtext: "Ko'chishni davom ettirish uchun kiring.",
        googleSignIn: "Google orqali kirish",
        email: "Elektron pochta",
        passwordLabel: "Parol",
        submit: "Davom etish",
        forgotPassword: "Parolni unutdingizmi?",
        noAccount: "Hisobingiz yo'qmi?",
        register: "Ro'yxatdan o'tish",
      },
      register: {
        heading: "Hisob yaratish",
        subtitle: "Bir necha daqiqada bepul ko'chish rejangizni tuzing.",
        googleSignUp: "Google orqali ro'yxatdan o'tish",
        redirecting: "Yo'naltirilmoqda…",
        fullName: "To'liq ism",
        email: "Email",
        passwordLabel: "Parol",
        passwordTooltip: "Parol talablarga javob bermaydi",
        submit: "Ro'yxatdan o'tish",
        hasAccount: "Allaqachon hisobingiz bormi?",
        login: "Kirish",
        confirmEmail: {
          heading: "Pochtangizni tekshiring",
          body: "{email} manziliga tasdiqlash havolasini yubordik. Hisobingizni faollashtirish uchun uni bosing, so'ng tizimga kiring.",
          goToLogin: "Kirish sahifasiga o'tish",
        },
      },
    },
    password: {
      minLength: "Kamida 8 ta belgi",
      hasUppercase: "Kamida bitta katta harf (A–Z)",
      hasLowercase: "Kamida bitta kichik harf (a–z)",
      hasNumber: "Kamida bitta raqam (0–9)",
      hasSpecialOrNumber: "Maxsus belgi (!@#$%^&*) — yoki raqam ikki barobar hisoblanadi",
      noForeign: "Faqat ingliz harflari (kirill harflarisiz)",
      weak: "Zaif",
      medium: "O'rta",
      strong: "Kuchli",
    },
    profile: {
      title: "Profil",
      subtitle: "Hisobingizni va sozlamalaringizni boshqaring.",
      languageSection: "Til",
      languageDesc: "ReloAI siz bilan shu tilda gaplashadi.",
      saving: "(saqlanmoqda…)",
      notifications: "Bildirishnomalar",
      logOut: "Chiqish",
      planSuffix: "reja",
      unnamed: "Ism yo'q",
      notifEmail: "Email yangiliklari",
      notifEmailDesc: "Vaqti-vaqti bilan mahsulot yangiliklari.",
      notifDocuments: "Hujjat eslatmalari",
      notifDocumentsDesc: "Muddatlar yaqinlashganda ogohlantirishlar.",
      notifProduct: "Mahsulot yangiliklari",
      notifProductDesc: "Yangi funksiyalar va yangilanishlar.",
    },
    topbar: {
      searchPlaceholder: "Hujjatlar, vazifalarni qidirish...",
      upgrade: "Yaxshilash",
      openMenuAria: "Menyuni ochish",
    },
    sidebar: {
      documents: "Hujjatlar",
      housing: "Uy-joy",
      banks: "Banklar",
      medicine: "Tibbiyot",
      work: "Ish",
      community: "Jamiyat",
      education: "Ta'lim",
      otherServices: "Boshqa xizmatlar",
      profile: "Profil",
      settings: "Sozlamalar",
      logout: "Chiqish",
    },
    documents: {
      title: "Hujjatlar",
      subtitle: "Ko'chib o'tishingiz uchun kerak bo'lgan hamma narsa bir joyda.",
      tabs: { all: "Barchasi", passport: "Pasport", pesel: "PESEL", workPermit: "Ish ruxsatnomasi", insurance: "Sug'urta", bank: "Bank" },
      status: { verified: "Tasdiqlangan", pending: "Ko'rib chiqilmoqda", missing: "Yo'q", locked: "Premium" },
      upload: "Yuklash uchun sudrab tashlang yoki bosing",
      viewBtn: "Ko'rish",
      deleteBtn: "O'chirish",
      unlockBtn: "Premium bilan ochish",
      docNames: {
        passportScan: "Pasport skani",
        passportPhoto: "Pasport o'lchamidagi surat",
        peselForm: "PESEL ariza shakli",
        peselLetter: "PESEL tasdiqlash xati",
        workPermitApp: "Ish ruxsatnomasi uchun ariza",
        sponsorshipLetter: "Ish beruvchi homiylik xati",
        healthInsurance: "Tibbiy sug'urta sertifikati",
        travelInsurance: "Sayohat sug'urtasi",
        bankConfirmation: "Bank hisobi tasdiqnomasi",
        proofOfFunds: "Mablag' mavjudligi haqida ma'lumotnoma",
        relocationLetter: "Ish beruvchining ko'chirish xati",
        taxResidency: "Soliq rezidentligi sertifikati",
      },
      autoCompleteToast: "✓ Qadam avtomatik bajarildi",
      sectionCompleteHeading: "🎉 Bo'lim yakunlandi!",
      sectionCompleteBody: "Keyingi qadamga o'ting.",
      sectionCompleteDismiss: "Davom etish",
      deleteConfirmTitle: "Hujjatni o'chirasizmi?",
      deleteConfirmBody: "Bu amalni bekor qilib bo'lmaydi. Hujjat butunlay o'chiriladi.",
      cancelBtn: "Bekor qilish",
    },
    housing: {
      title: "Polshada uy-joy 🇵🇱",
      subtitle: "Yashash uchun joyni aqlli tarzda toping.",
      rentMarket: "Ijara bozori",
      rentMarketSub: "Varshava tumanlari bo'yicha o'rtacha oylik ijara narxi.",
      distanceToCenter: "Markazgacha {km} km",
      metroAccess: "Metro mavjud",
      noMetro: "Metro yo'q",
      topWebsites: "Eng yaxshi saytlar",
      topWebsitesSub: "E'lonlarni haqiqatda qayerdan topish mumkin.",
      aiTips: "AI maslahatlari",
      aiTipsSub: "Haqiqiy ko'chishlardan olingan amaliy maslahatlar.",
      visitSite: "Saytga o'tish",
      websiteDescs: {
        olx: "Polshaning eng katta e'lonlar sayti — eng katta tanlov, asosan mulk egalaridan bevosita.",
        otodom: "Eng puxta tayyorlangan e'lonlar, kuchli filtrlar, agentliklar orasida mashhur.",
        gratka: "Kichikroq, ammo ishonchli — ikkinchi darajali shaharlar uchun qulay.",
      },
      tips: [
        {
          title: "Depozit firibgarligidan ehtiyot bo'ling",
          body: "Kvartirani shaxsan yoki uy egasi bilan jonli video qo'ng'iroqda ko'rmasdan turib hech qachon depozit o'tkazmang. Firibgarlar juda jozibali ko'rinadigan e'lonlar orqali chet elliklarni nishonga oladi.",
        },
        {
          title: "Shartnomani polyak tilida oling",
          body: "Ijara shartnomalari (umowa najmu) yuridik kuchga ega bo'lishi uchun polyak tilida bo'lishi shart. To'liq tushunmagan hujjatga imzo qo'yishdan oldin uning tasdiqlangan tarjimasini oling.",
        },
        {
          title: "Ijaradan tashqari xarajatlarni ham hisobga oling",
          body: "Kafolat depoziti (1–2 oylik ijara puli), shuningdek czynsz — bino uchun texnik xizmat haqi — ijaradan va kommunal to'lovlardan alohida hisoblanishini kutib turing.",
        },
      ],
      topDistrictDescs: {
        mokotow: "Narx va sifatning eng yaxshi muvozanati. Tinch, ko'kalamzorlashtirilgan, infratuzilmasi yaxshi, metro bor.",
        ursynow: "Eng arzon qulay tuman. Metro, parklar, oilaviy muhit.",
        wola: "Zamonaviy tuman, yangi qurilishlar ko'p, tez rivojlanmoqda, markazga yaqin.",
        zoliborz: "Qulay, xavfsiz, chet elliklar orasida sevimli. Ajoyib muhit.",
      },
      bestValueBadge: "Eng foydali",
      showAllDistricts: "Barcha tumanlarni ko'rsatish →",
      showFewerDistricts: "Ro'yxatni yig'ish",
    },
    banks: {
      title: "Polshadagi banklar 🇵🇱",
      subtitle: "Yangi kelganlar uchun mo'ljallangan hisoblarni solishtiring.",
      openAccount: "Hisob ochish",
      bestForExpats: "Chet elliklar uchun eng yaxshisi",
      features: {
        pkobp: ["Polshadagi eng katta filiallar tarmog'i", "Polyak va ingliz tilidagi mobil ilova", "Talabalar uchun bepul hisob variantlari"],
        mbank: ["To'liq ingliz tilidagi ilova va qo'llab-quvvatlash", "Onlayn tarzda tezkor hisob ochish", "PESEL raqamisiz ham komissiyasiz xizmat"],
        santander: ["Ko'p valyutali hisoblar", "Global bank tarmog'i", "Chet elda bepul debit karta orqali foydalanish"],
        revolut: ["Boshlash uchun PESEL talab qilinmaydi", "Ko'p valyutali hamyon", "Raqamli ko'chmanchilar uchun eng qulayi"],
      },
    },
    medicine: {
      title: "Polshada tibbiyot 🇵🇱",
      subtitle: "Tezda sug'urta oling va shifokor toping.",
      nfzVsPrivate: "NFZ va xususiy sug'urta",
      nfzPublic: "NFZ (davlat)",
      privateLabel: "Xususiy",
      clinicsTitle: "Klinikalar",
      clinicsSub: "Ingliz, rus va ukrain tilida xizmat ko'rsatuvchi variantlar.",
      warsaw: "Varshava",
      languages: {
        ruUa: "Rus va ukrain tilida xizmat",
        en: "Ingliz tilida xizmat",
        ru: "Rus tilida xizmat",
        ua: "Ukrain tilida xizmat",
      },
      rows: [
        { label: "Narxi", nfz: "Ish haqidan ajratmalar to'langanda bepul", pvt: "Oyiga 150–400 PLN" },
        { label: "Kutish muddati", nfz: "Mutaxassislar uchun bir necha haftadan oygacha", pvt: "Bir kundan bir necha kungacha" },
        { label: "Til qo'llab-quvvatlashi", nfz: "Asosan faqat polyak tilida", pvt: "Ingliz, ko'pincha rus/ukrain tilida ham" },
        { label: "Qamrov", nfz: "Keng, ammo shifokor tanlovi cheklangan", pvt: "O'zingiz klinika va shifokorni tanlaysiz" },
      ],
      bookBtn: "Qabulga yozilish",
    },
    work: {
      title: "Polshada ish 🇵🇱",
      subtitle: "Shartnomalar, maoshlar va qayerdan qidirish kerakligi.",
      contractVsB2B: "Mehnat shartnomasi va B2B",
      salarySearch: "Maosh qidirish",
      salarySearchSub: "O'rtacha maoshni ko'rish uchun kasb nomini kiriting.",
      placeholder: "masalan, dasturchi, hamshira, haydovchi...",
      averageSalary: "O'rtacha maosh",
      inEuros: "Yevroda",
      noExactData: "Bu kasb uchun aniq ma'lumot hali yo'q — mamlakat bo'yicha o'rtacha ko'rsatkich ko'rsatilmoqda.",
      jobSites: "Ish qidirish saytlari",
      visitSite: "Saytga o'tish",
      employmentSubtitle: "Mehnat shartnomasi",
      b2bSubtitle: "O'z ishi (B2B)",
      b2bContractName: "B2B shartnoma",
      employmentFeatures: [
        "Haq to'lanadigan ta'til, kasallik varaqasi va ogohlantirish muddati",
        "Ish beruvchi ZUS ijtimoiy ajratmalarini to'laydi",
        "Yashash ruxsatnomasi olish osonroq",
      ],
      b2bFeatures: [
        "Qo'lga tegadigan daromad yuqoriroq, soliq stavkasi pastroq",
        "ZUS va hisob-fakturalarni o'zingiz yuritasiz",
        "Erkinlik ko'proq, ish barqarorligi kamroq",
      ],
      jobSiteDescs: {
        pracuj: "Polshaning eng katta ish qidirish sayti, barcha sohalar bo'yicha.",
        nofluff: "Texnologiya sohasiga yo'naltirilgan, maoshlar oldindan ko'rsatiladi.",
        linkedin: "Xalqaro lavozimlar, ingliz tilida so'zlashuvchilar uchun qulay.",
      },
    },
    community: {
      title: "Jamiyat 🇵🇱",
      subtitle: "Boshqa ko'chib o'tuvchilar haqiqatda foydalanadigan Telegram kanallari.",
      join: "Qo'shilish",
      members: "a'zo",
      cats: { all: "Barchasi", housing: "Uy-joy", work: "Ish", sport: "Sport", family: "Oila", general: "Umumiy" },
    },
    dashboard: {
      relocation: "{country}ga ko'chish",
      subtitle: "Sizning shaxsiy yo'l xaritangiz, real vaqtda yangilanadi.",
      overallProgress: "Umumiy jarayon",
      openBtn: "Ochish",
      route: {
        heading: "Sizning ko'chish variantlaringiz",
        recommended: "Tavsiya etilgan",
        viewFullPlan: "To'liq rejani ko'rish",
        hidePlan: "Rejani yashirish",
        successProbability: "Muvaffaqiyat ehtimoli",
        timeline: "Muddat",
        cost: "Taxminiy narx",
        requiredDocuments: "Kerakli hujjatlar",
        pros: "Afzalliklar",
        cons: "Kamchiliklar",
        reasoningTitle: "Nega aynan shu yo'l",
        checklistHeading: "Sizning shaxsiy bajarish ro'yxatingiz",
        loading: "Ko'chish variantlaringiz tahlil qilinmoqda…",
      },
      steps: {
        account: { title: "Hisobingizni yarating", desc: "Hammasi tayyor." },
        onboarding: { title: "Kirish so'rovnomasini to'ldiring", desc: "Biz buni yo'l xaritangizni tuzish uchun ishlatdik." },
        visa: {
          title: "Viza olish huquqini tekshiring",
          euDesc: "EI/EEA fuqarosi sifatida sizga viza kerak emas — kelganingizdan so'ng manzilingizni ro'yxatdan o'tkazing.",
          byCountry: {
            poland: {
              work: "Sizga ish beruvchingizga bog'liq milliy ish vizasi yoki Karta Pobytu mos kelishi mumkin.",
              study: "Sizga o'qishingizga bog'liq milliy viza yoki Karta Pobytu kerak bo'ladi.",
              business: "Biznes egalari Polshada kompaniya yuritish bilan bog'liq yashash ruxsatnomasiga ariza bera oladi.",
              family: "Agar Polshada qonuniy yashash huquqiga ega qarindoshingiz bo'lsa, oilaviy birlashuv ruxsatnomalari mavjud.",
            },
            germany: {
              work: "Sizga Job Seeker Visa, EU Blue Card yoki ishga asoslangan Aufenthaltstitel mos kelishi mumkin.",
              study: "Sizga o'qishga yozilishingizga bog'liq talaba vizasi (Aufenthaltstitel zum Studium) kerak bo'ladi.",
              business: "Germaniya o'zini o'zi band qilganlar uchun yashash ruxsatnomasini taklif etadi (Aufenthaltserlaubnis für selbständige Tätigkeit).",
              family: "Agar Germaniyada yaqin qarindoshingiz allaqachon istiqomat qilsa, oilaviy birlashuv vizalari (Familiennachzug) mos kelishi mumkin.",
            },
            spain: {
              work: "Sizga oddiy ish vizasi yoki EU Blue Card mos kelishi mumkin.",
              study: "Sizga o'qishga yozilishingiz va moliyaviy imkoniyatingizga bog'liq talaba vizasi kerak bo'ladi.",
              business: "Ispaniyaning tadbirkor yoki investor vizasi (Golden Visa yo'nalishi bilan birga) mos kelishi mumkin.",
              family: "Agar Ispaniyada yaqin qarindoshingiz allaqachon istiqomat qilsa, oilaviy birlashuv (reagrupación familiar) vizalari mos kelishi mumkin.",
            },
          },
        },
        business: {
          title: "Biznesingizni ro'yxatdan o'tkazing",
          desc: "Biznes uchun yashash ruxsatnomasiga ariza berishdan oldin kompaniya tuzilmasi va soliq ro'yxatidan o'tishni tashkil qiling.",
        },
        documents: { title: "Kerakli hujjatlarni yuklang", desc: "7 ta hujjat kerak — 2 tasi sizda allaqachon bor." },
        biometric: { title: "Biometrik uchrashuvni belgilang", desc: "Hujjatlaringiz tasdiqlangach ochiladi." },
        residence: { title: "Yashash ruxsatnomasiga ariza bering", desc: "Biometrik uchrashuvingizdan so'ng ochiladi." },
        address: { title: "Mahalliy manzilingizni ro'yxatdan o'tkazing", desc: "To'liq joylashishingizdan oldingi so'nggi qadam." },
      },
    },
    appPricing: {
      title: "Rejangizni tanlang",
      subtitle: "Ko'chishingiz uchun mos rejani tanlang. Istalgan vaqtda o'zgartirishingiz mumkin.",
      activating: "Faollashtirilmoqda…",
      securedByStripe: "Stripe tomonidan himoyalangan",
      mostPopular: "Eng mashhur",
      forever: "doimiy",
      perMonth: "/oy",
      freeName: "Bepul",
      premiumName: "Premium",
      proName: "Pro",
      freeDesc: "Qaror qilishdan oldin sinab ko'ring.",
      premiumDesc: "Ko'chishingiz uchun to'liq yo'l-yo'riq.",
      proDesc: "Oilalar va murakkab ko'chishlar uchun.",
      freeCta: "Bepul boshlash",
      premiumCta: "Premium olish",
      proCta: "Pro olish",
      freeFeatures: [
        "Polsha — 1 ta mamlakat mavjud",
        "Bajarish ro'yxati: 5 qadam ko'rinishi",
        "Kuniga 5 ta AI xabar",
        "Hujjatlarni yuklash va saqlash",
        "To'liq manzillar bazasi",
        "Jamiyatga kirish",
        "Email orqali yordam",
      ],
      premiumFeatures: [
        "Barcha 3 mamlakat (Polsha, Germaniya, Ispaniya)",
        "To'liq bajarish ro'yxati — barcha qadamlar",
        "Kuniga 50 ta AI xabar",
        "Hujjatlarni yuklash va saqlash",
        "To'liq manzillar bazasi (banklar, klinikalar, idoralar)",
        "Jamiyatga kirish",
        "Email orqali yordam",
      ],
      proFeatures: [
        "Premiumdagi hamma narsa",
        "Cheksiz AI xabarlar",
        "AI hujjatlarni avtomatik to'ldiradi",
        "24/7 ustuvor yordam",
        "Konsultatsiya qo'ng'irog'i (oyiga 1×)",
        "Yangi mamlakatlarga erta kirish huquqi",
        "Hujjatlar uchun PDF eksport",
      ],
    },
    checkout: {
      secureCheckout: "Xavfsiz to'lov",
      orderSummary: "Buyurtma xulosasi",
      subscription: "Oylik obuna · istalgan vaqtda bekor qilish mumkin",
      perMonth: "/oy",
      totalToday: "Bugungi jami",
      paymentDetails: "To'lov ma'lumotlari",
      cardNumber: "Karta raqami",
      expiryDate: "Amal qilish muddati",
      cvc: "CVC",
      cardholderName: "Karta egasining ismi",
      processing: "Amalga oshirilmoqda…",
      trustBadge: "Xavfsiz to'lov · 256-bitli SSL shifrlash · Stripe tomonidan ta'minlangan",
      termsPrefix: "To'lov qilish orqali siz bizning",
      termsService: "Xizmat ko'rsatish shartlari",
      and: "va",
      privacyPolicy: "Maxfiylik siyosati",
      payFailed: "To'lov amalga oshmadi. Iltimos, qayta urinib ko'ring.",
      payBtn: "To'lash",
      welcomeToast: "{plan}ga xush kelibsiz! 🎉",
      premiumFeatures: ["Barcha 3 mamlakat", "To'liq ro'yxat", "Kuniga 50 ta AI xabar", "Hujjatlarni saqlash", "Email orqali yordam"],
      proFeatures: ["Premiumdagi hamma narsa", "Cheksiz AI xabarlar", "AI hujjatlarni to'ldiradi", "24/7 ustuvor yordam", "Oylik konsultatsiya"],
    },
    education: {
      title: "Ta'lim",
      subtitle: "Til kurslari, maktablar, bolalar bog'chalari va universitetlar — mamlakatingizga mos.",
      coursesTab: "Til kurslari",
      schoolsTab: "Maktablar",
      kindergartensTab: "Bolalar bog'chalari",
      universitiesTab: "Universitetlar",
      filterAll: "Barchasi",
      filterPublic: "Davlat",
      filterPrivate: "Xususiy",
      publicBadge: "Davlat",
      privateBadge: "Xususiy",
      learnMore: "Batafsil →",
      rowFormat: "Format",
      rowLevel: "Daraja",
      rowPrice: "Narxi",
      rowInstruction: "O'qitish tili",
      rowAges: "Yosh",
      rowWaiting: "Navbat ro'yxati",
      rowTuition: "O'qish haqi",
      rowDeadline: "Ariza topshirish muddati",
      morePrograms: "yana",
      emptyState: "Tanlangan filtr uchun variantlar topilmadi.",
      banners: {
        poland: {
          courses: "Vaqtinchalik himoya maqomiga egamisiz? Varshavadagi ko'plab shahar kurslari bepul. Mahalliy tuman idorasi yoki Powiatowy Urząd Pracy (PUP) dan so'rang.",
          schools: "Polshaning davlat maktablari barcha bolalar uchun BEPUL — jumladan, vaqtinchalik himoya maqomiga ega ukrainalik qochqinlar uchun ham. Maktablarda intensiv polyak tili yordami bilan tayyorlov sinflari mavjud.",
          universities: "Vaqtinchalik himoyaga ega ukrainalik fuqarolar Polsha davlat universitetlarida polyak fuqarolari bilan bir xil shartlarda, odatda o'qish haqisiz, tahsil olishlari mumkin.",
        },
        germany: {
          courses: "BAMF integratsiya kursi sizning birinchi murojaat manzilingiz: 700 soatlik nemis tili (A1–B1) darslari va fuqarolik yo'naltiruvi, ko'plab yashash ruxsatnomasi turlari uchun katta subsidiya bilan yoki bepul.",
          schools: "Germaniyada maktabga qatnashish majburiy. Yangi kelgan bolalar oddiy sinflarga qo'shilishdan oldin intensiv nemis tili yordami bilan qabul sinflariga joylashtiriladi. Har doim bepul.",
        },
        spain: {
          courses: "EOI davlat maktablari juda arzon narxlarda ispan va ingliz tili kurslarini taklif etadi — har yili sentyabr oyida ro'yxatdan o'ting. Ba'zi tumanlar yangi kelganlar uchun bepul jamoat ispan tili darslarini taklif qiladi.",
          schools: "Ispaniyada barcha bolalar immigratsiya maqomidan qat'i nazar, ta'lim olish uchun konstitutsiyaviy huquqqa ega. Davlat maktablari barcha rezidentlar uchun bepul. Til yordami darslari haqida mahalliy hokimlikdan so'rang.",
        },
      },
    },
    aiChat: {
      welcome:
        "Salom! Men sizning ReloAI yordamchingizman. Polsha, Germaniya yoki Ispaniyaga ko'chib o'tish haqidagi savollaringizga yordam bera olaman. Hujjatlar, uy-joy, banklar, tibbiyot va ish haqida so'rang!",
      personalizedGreeting: "Salom! Ko'ryapmanki, siz {country}ga «{goal}» maqsadida ko'chmoqchisiz.",
      personalizedRecommendation: "Profilingizga ko'ra, siz uchun eng yaxshi yo'l: {pathway}. Batafsil aytib beraymi?",
      quickReplies: ["PESEL qanday olinadi?", "Qaysi bankda hisob ochsam bo'ladi?", "Uy-joyni qanday topsam bo'ladi?", "Qanday hujjatlar kerak?"],
      placeholder: "ReloAI'dan istalgan narsani so'rang...",
      sendAria: "Xabar yuborish",
      closeAria: "Yopish",
      connectionError: "Serverga ulanib bo'lmadi. Internet aloqangizni tekshirib, qayta urinib ko'ring.",
      fallback: {
        pesel: "Polshada PESEL raqamini olish uchun: 1) Tumaningizdagi Urząd Miasta (shahar idorasi)ga uchrashuvga yoziling. 2) Pasportingiz, viza yoki yashash ruxsatnomangiz va manzil tasdiqnomasini (ijara shartnomasi ham bo'ladi) olib boring. 3) Joyida EL-ZAM shaklini to'ldiring. Odatda bir kundan bir necha kungacha vaqt oladi. PESEL keyinchalik deyarli hamma narsa uchun kerak bo'ladi — bank hisobi ochish, tibbiy sug'urtaga yozilish va shartnomalarni imzolash.",
        bank: "Banklar bo'yicha: mBank chet elliklar uchun eng qulayi — to'liq ingliz tilida ilova va qo'llab-quvvatlash. Revolut hatto PESEL olishdan oldin ham yaxshi ishlaydi. Agar shaxsan xizmat ko'rsatishni afzal ko'rsangiz, PKO BP eng katta filiallar tarmog'iga ega. Ko'p valyutali hisob kerak bo'lsa, Santander yaxshi tanlov.",
        housing: "Uy-joy bo'yicha maslahatlar: OLX, Otodom yoki Gratka saytlarida e'lonlarni qidiring. Kvartirani shaxsan yoki jonli video orqali ko'rmasdan hech qachon depozit yubormang. Ijara shartnomangiz polyak tilida bo'lishi kerak — aks holda yuridik kuchga ega bo'lmaydi. Ijaradan tashqari kafolat depoziti (1–2 oylik ijara) va czynsz (bino xizmat haqi) uchun ham byudjet ajrating.",
        documents: "Odatda kerak bo'ladigan hujjatlar: pasport, viza yoki yashash ruxsatnomasi arizasi, manzil tasdiqnomasi, PESEL tasdiqnomasi, tibbiy sug'urta sertifikati va (agar ishlasangiz) mehnat shartnomasi yoki ish ruxsatnomasi. Bularning har biri haqida batafsilroq gapirib bera olaman.",
        visa: "Viza talablari fuqaroligingiz va boradigan davlatingizga bog'liq. Polsha uchun ko'pchilik EI fuqarosi bo'lmaganlarga ish, o'qish yoki oila asosida milliy viza yoki yashash ruxsatnomasi (Karta Pobytu) kerak bo'ladi. Germaniya uchun Job Seeker Visa, Aufenthaltstitel yoki EU Blue Card'ni ko'rib chiqing. Ispaniya uchun Digital Nomad Visa yoki NIE ro'yxatidan o'tish orqali oddiy ish/yashash yo'llarini tekshiring.",
        default: "Men hujjatlar, uy-joy, banklar, tibbiyot yoki ish bo'yicha yordam bera olaman. Qaysi biri haqida batafsilroq bilmoqchisiz?",
      },
      actionLabel: "Buni ReloAI'da bajarish →",
      premiumLabel: "Premium'da mavjud →",
    },
    demo: {
      bannerText: "Siz ko'rib chiqish rejimidasiz. Jarayoningizni saqlash va barcha funksiyalardan foydalanish uchun ro'yxatdan o'ting.",
      registerNow: "Hozir ro'yxatdan o'ting",
      floatingGreeting: "👋 Siz ReloAI'ni ko'rib chiqyapsiz — jarayoningizni saqlash uchun bepul ro'yxatdan o'ting",
      promptHeading: "Bu funksiyani ochish uchun ro'yxatdan o'ting",
      promptBody: "Jarayoningizni saqlash va barcha funksiyalarni ochish uchun bepul hisob yarating.",
      promptDismiss: "Keyinroq",
    },
    onboarding: {
      stepLabel: "{total} dan {current}-qadam",
      back: "Orqaga",
      continueBtn: "Davom etish",
      finish: "Tayyor",
      saving: "Saqlanmoqda...",
      skip: "O'tkazib yuborish va keyinroq to'ldirish",
      skipTooltip: "Shaxsiy ko'chish rejangizni olish uchun 5 ta savolga javob bering",
      citizenshipLabel: "Fuqarolik",
      citizenshipPlaceholder: "Fuqaroligingiz davlatini qidiring...",
      currentCountryLabel: "Hozirgi yashash davlati",
      currentCountryPlaceholder: "Davlatni qidiring...",
      comingSoon: "Tez orada",
      steps: {
        language: { question: "Tilni tanlang", subheading: "ReloAI siz bilan shu tilda gaplashadi." },
        citizenship: { question: "Fuqaroligingiz qaysi davlatga tegishli?", subheading: "Bu to'g'ri viza toifasini aniqlashga yordam beradi." },
        currentCountry: { question: "Hozir qaysi davlatdasiz?", subheading: "Keyingi qadamlarni hozirgi joylashuvingizga moslashtirishga yordam beradi." },
        destination: { question: "Qayerga ko'chib o'tyapsiz?", subheading: "Yo'l xaritangizni shu davlatga moslashtiramiz." },
        goal: { question: "Asosiy maqsadingiz nima?", subheading: "Bu siz uchun qaysi yo'llarni tahlil qilishimizni belgilaydi." },
      },
      goalOptions: {
        work: "Ish",
        study: "O'qish",
        business: "Biznes ochish",
        passiveIncome: "Passiv daromad",
        digitalNomad: "Raqamli ko'chmanchi",
        familyReunification: "Oilaviy birlashuv",
        other: "Boshqa",
      },
      results: {
        heading: "Biz siz uchun 3 ta ko'chish mararhalarini topdik",
        loading: "Sizning shaxsiy mararhalarini yaratmoqdamiz...",
        selectButton: "Bu mararhanni tanlang",
        recommended: "Tafsiya qilingan",
        speedFast: "Tezkor",
        speedMedium: "O'rta",
        speedSlow: "Sekinroq",
        difficultyEasy: "Oson",
        difficultyMedium: "O'rta",
        difficultyHard: "Qiyin",
        approvalRate: "Tasdiqlanish ehtimoli",
        timeline: "Muddatlar",
        cost: "Narx",
      },
    },
  },
  tr: {
    nav: {
      howItWorks: "Nasıl çalışır",
      features: "Özellikler",
      countries: "Ülkeler",
      pricing: "Fiyatlandırma",
      reviews: "Yorumlar",
      login: "Giriş yap",
      getStarted: "Başla",
    },
    hero: {
      badge: "Yapay zeka destekli taşınma rehberiniz",
      headline1: "Avrupa'ya taşınmak",
      headline2: "— artık kolay.",
      subtext:
        "ReloAI vizenizi, evraklarınızı, konaklamanızı ve bankacılık işlerinizi adım adım, anlaşılır bir dille planlar. Bir soru sorun, saniyeler içinde kişisel bir yol haritası alın.",
      getStarted: "Başla",
      seeHowItWorks: "Nasıl çalıştığını gör",
      trustedFor: "Şu ülkelere taşınmalarda güvenilir",
    },
    chat: {
      assistantName: "ReloAI Asistanı",
      online: "Çevrimiçi",
      messages: [
        "Ukrayna'dan Almanya'ya iş için taşınmak istiyorum.",
        "Anladım. Profilinize göre bir İş Arama Vizesi veya AB Mavi Kartı'na ihtiyacınız olacak. Belge kontrol listenizi hazırlamamı ister misiniz?",
        "Evet, lütfen.",
        "Tamamdır. 7 belge gerekiyor, 2'si zaten sizde. Süreçte size son tarihleri hatırlatacağım.",
      ],
    },
    heroDemo: {
      question: "Nereye taşınmak istersiniz?",
      userReply: "Polonya, çalışmak istiyorum",
      response: "Harika! Sizin için Polonya'ya taşınma konusunda adım adım bir yol haritası hazırlıyorum.",
      inputPlaceholder: "Polonya'da yaşam hakkında sorun...",
    },
    stats: {
      items: [
        { value: "3", label: "Ülke" },
        { value: "10x", label: "Daha ucuz" },
        { value: "24/7", label: "AI desteği" },
      ],
    },
    howItWorks: {
      heading: "Nasıl çalışır",
      subheading: "Sorudan taşınma gününe kadar, dört basit adımda.",
      steps: [
        {
          title: "Durumunuzu bize anlatın",
          description:
            "Vatandaşlığınız, hedefleriniz ve gideceğiniz ülke hakkında birkaç soruyu yanıtlayın.",
        },
        {
          title: "Yol haritanızı alın",
          description:
            "ReloAI dakikalar içinde kişisel viza, konaklama ve zaman planınızı oluşturur.",
        },
        {
          title: "Evrak işlerini AI ile halledin",
          description:
            "Formları doldurmak, belge toplamak ve son tarihleri takip etmek için asistanınızla sohbet edin.",
        },
        {
          title: "Güvenle taşının",
          description:
            "Vizenizin, konaklamanızın, bankacılığınızın ve kaydınızın halledildiğini bilerek varış yapın.",
        },
      ],
    },
    features: {
      heading: "Taşınmanız için gereken her şey",
      subheading: "Avrupa'ya taşınmanın her aşaması için tek bir asistan.",
      items: [
        {
          title: "Vize ve izin rehberliği",
          description:
            "Durumunuza tam olarak hangi vizenin uyduğunu ve her adımda ne gerektiğini öğrenin.",
        },
        {
          title: "Belge kontrol listesi",
          description:
            "İhtiyacınız olan her belgenin kişiselleştirilmiş, her zaman güncel listesi.",
        },
        {
          title: "Konaklama asistanı",
          description:
            "İlanları arayın, sözleşmeleri anlayın ve yaygın kiralama dolandırıcılıklarından kaçının.",
        },
        {
          title: "Bankacılık ve vergiler",
          description: "Doğru hesapları açın ve yeni vergi yükümlülüklerinizi anlayın.",
        },
        {
          title: "Sağlık sigortası kurulumu",
          description: "Sigortaya hızlıca kaydolun ve yerel bir doktor bulun.",
        },
        {
          title: "7/24 AI sohbet",
          description:
            "Taşınmanızla ilgili her şeyi sorun, anında net ve kaynaklı bir yanıt alın.",
        },
      ],
    },
    countries: {
      heading: "Hedefiniz için özel olarak tasarlandı",
      subheading: "Genel kontrol listelerinin ötesine geçen ülkeye özel rehberlik.",
      list: [
        {
          flag: "🇵🇱",
          name: "Polonya",
          highlight: "Hızla büyüyen teknoloji merkezi",
          points: [
            "Karta Pobytu oturma izni adım adım rehberi",
            "PESEL kaydı ve yerel bankacılık",
            "Şehre göre ortalama kira rehberi",
          ],
        },
        {
          flag: "🇩🇪",
          name: "Almanya",
          highlight: "AB Mavi Kartı ve iş arama vizeleri",
          points: [
            "Anmeldung ve Bürgeramt randevuları",
            "Sağlık sigortası (kamu mu özel mi)",
            "Vergi numarası ve serbest çalışan vizesi desteği",
          ],
        },
        {
          flag: "🇪🇸",
          name: "İspanya",
          highlight: "Uzaktan çalışanlar arasında popüler",
          points: [
            "Dijital Göçebe Vizesi uygunluk kontrolü",
            "NIE numarası ve empadronamiento",
            "Bölgesel yaşam maliyeti karşılaştırmaları",
          ],
        },
      ],
      planMyMoveTo: "{country}'ya taşınmamı planla →",
    },
    pricing: {
      heading: "Basit, şeffaf fiyatlandırma",
      subheading: "Ücretsiz başlayın. Taşınmanız gerçekleştiğinde yükseltin.",
      mostPopular: "En popüler",
      plans: [
        {
          name: "Ücretsiz",
          price: "€0",
          period: "süresiz",
          description: "Karar vermeden önce seçeneklerinizi keşfedin.",
          features: [
            "Vize uygunluk kontrolü",
            "Temel belge kontrol listesi",
            "Sınırlı AI sohbet (ayda 10 mesaj)",
            "Ülke genel bakış rehberleri",
          ],
          cta: "Ücretsiz başla",
        },
        {
          name: "Premium",
          price: "€29",
          period: "/ay",
          description: "Aktif bir taşınma için tam rehberlik.",
          features: [
            "Ücretsiz paketteki her şey",
            "Sınırsız AI sohbet",
            "Kişiselleştirilmiş yol haritası ve son tarihler",
            "Konaklama ve bankacılık asistanı",
            "E-posta desteği",
          ],
          cta: "Premium al",
        },
        {
          name: "Pro",
          price: "€49",
          period: "/ay",
          description: "Aileler ve karmaşık taşınmalar için.",
          features: [
            "Premium'daki her şey",
            "Çok kişili profiller",
            "İnsan uzman tarafından belge incelemesi",
            "Öncelikli sohbet desteği",
            "İşveren taşınma mektupları",
          ],
          cta: "Pro al",
        },
      ],
    },
    reviews: {
      heading: "Taşınanlar tarafından seviliyor",
      subheading: "ReloAI ile taşınan insanların gerçek hikayeleri.",
      items: [
        {
          name: "Anna K.",
          route: "Ukrayna → Polonya",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "PESEL'imi 2 günde aldım. ReloAI olmasaydı bilgi aramak için bir hafta harcardım.",
          initials: "AK",
        },
        {
          name: "Mikhail S.",
          route: "Rusya → Almanya",
          fromFlag: "🇷🇺",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Yapay zeka Anmeldung konusunda yardımcı oldu. Her şeyi açıkladı ve büro adreslerini verdi.",
          initials: "MS",
        },
        {
          name: "Olga M.",
          route: "Belarus → İspanya",
          fromFlag: "🇧🇾",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "İspanya'da bir işletme açtım. Kontrol listesi bir aylık iş ve 2000 avro avukat ücreti tasarrufu sağladı.",
          initials: "OM",
        },
        {
          name: "Dmitry P.",
          route: "Kazakistan → Polonya",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 4,
          quote: "İlerleme takipçisi gerçekten çok yardımcı oluyor. Hangi adımda olduğumu her zaman biliyorum.",
          initials: "DP",
        },
        {
          name: "Leyla R.",
          route: "Özbekistan → Almanya",
          fromFlag: "🇺🇿",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "İş ilanları bölümü sayesinde Almanya'da iş buldum. Yapay zeka ön yazımı bile yazdı.",
          initials: "LR",
        },
        {
          name: "Timur A.",
          route: "Tacikistan → İspanya",
          fromFlag: "🇹🇯",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "NIE'mi 3 haftada aldım. Yarım yıl süreceğini düşünüyordum.",
          initials: "TA",
        },
        {
          name: "Karina N.",
          route: "Ukrayna → Almanya",
          fromFlag: "🇺🇦",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Ailemle taşındım. Çocuklar için okul ve Rusça konuşan bir doktor bulduk.",
          initials: "KN",
        },
        {
          name: "Artyom V.",
          route: "Rusya → İspanya",
          fromFlag: "🇷🇺",
          toFlag: "🇪🇸",
          rating: 4,
          quote: "Digital Nomad Visa — ReloAI rehberini takip ederek 6 haftada hallettim.",
          initials: "AV",
          documentBadge: "🇪🇸 Digital Nomad Visa",
        },
        {
          name: "Zarina I.",
          route: "Kazakistan → Polonya",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "mBank'ta ilk denemede hesap açtım. Yapay zeka hangi belgeleri getirmem gerektiğini söyledi.",
          initials: "ZI",
        },
        {
          name: "Bogdan F.",
          route: "Ukrayna → Polonya",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Taşınma için en iyi hizmet. Zamandan ve sinirden tasarruf ettim.",
          initials: "BF",
          documentBadge: "🇵🇱 Karta Pobytu",
        },
      ],
    },
    contact: {
      heading: "Taşınmaya başlamaya hazır mısınız?",
      subtext:
        "Nereye gittiğinizi bize söyleyin, bir gün içinde size ücretsiz bir taşınma yol haritası gönderelim.",
      email: "hello@reloai.com",
      repliesWithin: "24 saat içinde yanıt veriyoruz",
      form: {
        fullName: "Ad Soyad",
        emailLabel: "E-posta",
        movingTo: "Taşınılacak yer",
        message: "Mesaj",
        placeholderName: "Ahmet Yılmaz",
        placeholderEmail: "ahmet@example.com",
        placeholderMessage: "Taşınmanız hakkında biraz bilgi verin...",
        destinations: ["Polonya", "Almanya", "İspanya", "Diğer"],
        send: "Mesaj gönder",
      },
      success: {
        title: "Teşekkürler — mesajınız gönderildi!",
        subtext: "Taşınma yol haritanızla birlikte yakında sizinle iletişime geçeceğiz.",
      },
    },
    footer: {
      description:
        "Avrupa'ya taşınmak için yapay zeka destekli asistanınız — vizeler, evraklar, konaklama ve bankacılık, adım adım.",
      productHeading: "Ürün",
      countriesHeading: "Ülkeler",
      companyHeading: "Şirket",
      productLinks: ["Nasıl çalışır", "Özellikler", "Fiyatlandırma"],
      companyLinks: ["Yorumlar", "İletişim"],
      rights: "Tüm hakları saklıdır.",
      disclaimer: "ReloAI bilgilendirme hizmetleri sunar. Bir hukuk firması değiliz ve göçmenlik makamlarının kararlarından sorumlu değiliz. Tüm bilgiler yalnızca genel bilgilendirme amaçlıdır. Hukuki yardım için lisanslı bir uzmana danışın.",
    },
    auth: {
      or: "veya",
      login: {
        heading: "Tekrar hoş geldiniz",
        subtext: "Taşınma planınıza devam etmek için giriş yapın.",
        googleSignIn: "Google ile giriş yap",
        email: "E-posta",
        passwordLabel: "Şifre",
        submit: "Devam et",
        forgotPassword: "Şifrenizi mi unuttunuz?",
        noAccount: "Hesabınız yok mu?",
        register: "Kayıt ol",
      },
      register: {
        heading: "Hesabınızı oluşturun",
        subtitle: "Ücretsiz taşınma yol haritanızı dakikalar içinde oluşturun.",
        googleSignUp: "Google ile kayıt ol",
        redirecting: "Yönlendiriliyor…",
        fullName: "Ad Soyad",
        email: "E-posta",
        passwordLabel: "Şifre",
        passwordTooltip: "Şifre gereksinimleri karşılamıyor",
        submit: "Kayıt ol",
        hasAccount: "Zaten hesabınız var mı?",
        login: "Giriş yap",
        confirmEmail: {
          heading: "Gelen kutunuzu kontrol edin",
          body: "{email} adresine bir onay bağlantısı gönderdik. Hesabınızı etkinleştirmek için tıklayın, ardından giriş yapın.",
          goToLogin: "Girişe git",
        },
      },
    },
    password: {
      minLength: "En az 8 karakter",
      hasUppercase: "En az bir büyük harf (A–Z)",
      hasLowercase: "En az bir küçük harf (a–z)",
      hasNumber: "En az bir rakam (0–9)",
      hasSpecialOrNumber: "Özel karakter (!@#$%^&*) — veya rakam iki kat sayılır",
      noForeign: "Yalnızca İngilizce harfler (Kiril alfabesi olmadan)",
      weak: "Zayıf",
      medium: "Orta",
      strong: "Güçlü",
    },
    profile: {
      title: "Profil",
      subtitle: "Hesabınızı ve tercihlerinizi yönetin.",
      languageSection: "Dil",
      languageDesc: "ReloAI sizinle bu dilde konuşacak.",
      saving: "(kaydediliyor…)",
      notifications: "Bildirimler",
      logOut: "Çıkış yap",
      planSuffix: "Plan",
      unnamed: "İsimsiz",
      notifEmail: "E-posta güncellemeleri",
      notifEmailDesc: "Ara sıra ürün haberleri ve ipuçları.",
      notifDocuments: "Belge hatırlatıcıları",
      notifDocumentsDesc: "Bir son tarih yaklaşınca uyarılar.",
      notifProduct: "Ürün haberleri",
      notifProductDesc: "Yeni özellikler ve güncellemeler.",
    },
    topbar: {
      searchPlaceholder: "Belge, görev ara...",
      upgrade: "Yükselt",
      openMenuAria: "Menüyü aç",
    },
    sidebar: {
      documents: "Belgeler",
      housing: "Konut",
      banks: "Bankalar",
      medicine: "Sağlık",
      work: "İş",
      community: "Topluluk",
      education: "Eğitim",
      otherServices: "Diğer Hizmetler",
      profile: "Profil",
      settings: "Ayarlar",
      logout: "Çıkış yap",
    },
    documents: {
      title: "Belgeler",
      subtitle: "Taşınmanız için ihtiyacınız olan her şey tek bir yerde.",
      tabs: { all: "Tümü", passport: "Pasaport", pesel: "PESEL", workPermit: "Çalışma İzni", insurance: "Sigorta", bank: "Banka" },
      status: { verified: "Onaylandı", pending: "İnceleniyor", missing: "Eksik", locked: "Premium" },
      upload: "Yüklemek için sürükleyin veya tıklayın",
      viewBtn: "Görüntüle",
      deleteBtn: "Kaldır",
      unlockBtn: "Premium ile Aç",
      docNames: {
        passportScan: "Pasaport taraması",
        passportPhoto: "Vesikalık fotoğraf",
        peselForm: "PESEL başvuru formu",
        peselLetter: "PESEL onay mektubu",
        workPermitApp: "Çalışma izni başvurusu",
        sponsorshipLetter: "İşveren sponsorluk mektubu",
        healthInsurance: "Sağlık sigortası belgesi",
        travelInsurance: "Seyahat sigortası",
        bankConfirmation: "Banka hesap onayı",
        proofOfFunds: "Maddi yeterlilik belgesi",
        relocationLetter: "İşveren taşınma mektubu",
        taxResidency: "Vergi mukimliği belgesi",
      },
      autoCompleteToast: "✓ Adım otomatik olarak tamamlandı",
      sectionCompleteHeading: "🎉 Bölüm tamamlandı!",
      sectionCompleteBody: "Sonraki adıma geçin.",
      sectionCompleteDismiss: "Devam et",
      deleteConfirmTitle: "Belge silinsin mi?",
      deleteConfirmBody: "Bu işlem geri alınamaz. Belge kalıcı olarak silinecektir.",
      cancelBtn: "İptal",
    },
    housing: {
      title: "Polonya'da Konut 🇵🇱",
      subtitle: "Doğru şekilde bir yaşam alanı bulun.",
      rentMarket: "Kira Piyasası",
      rentMarketSub: "Varşova ilçelerine göre ortalama aylık kira.",
      distanceToCenter: "Merkeze {km} km",
      metroAccess: "Metro erişimi",
      noMetro: "Metro yok",
      topWebsites: "En İyi Siteler",
      topWebsitesSub: "İlanları gerçekten nerede bulacağınız.",
      aiTips: "AI İpuçları",
      aiTipsSub: "Gerçek taşınma deneyimlerinden pratik tavsiyeler.",
      visitSite: "Siteyi ziyaret et",
      websiteDescs: {
        olx: "Polonya'nın en büyük ilan sitesi — en geniş seçenek, çoğunlukla ev sahiplerinden doğrudan.",
        otodom: "En düzenli ilanlar, güçlü filtreler, emlakçılar arasında popüler.",
        gratka: "Daha küçük ama güvenilir — ikinci kademe şehirler için uygun.",
      },
      tips: [
        {
          title: "Depozito dolandırıcılığından kaçının",
          body: "Daireyi şahsen görmeden veya ev sahibiyle canlı görüntülü görüşme yapmadan asla depozito göndermeyin. Dolandırıcılar, gerçek olamayacak kadar iyi ilanlarla yabancıları hedef alır.",
        },
        {
          title: "Sözleşmeyi Lehçe alın",
          body: "Kira sözleşmeleri (umowa najmu) yasal geçerliliği için Lehçe olmalıdır. Tam olarak anlamadığınız hiçbir şeyi imzalamadan önce onaylı bir çeviri alın.",
        },
        {
          title: "Bütçenizi sadece kiraya göre yapmayın",
          body: "Kiraya ek olarak bir güvenlik depozitosu (1–2 aylık kira) ve kira ile faturalardan ayrı tahsil edilen czynsz — bina bakım ücretleri — bekleyin.",
        },
      ],
      topDistrictDescs: {
        mokotow: "Fiyat ve kalite açısından en iyi denge. Sakin, yeşil, altyapısı iyi, metroya yakın.",
        ursynow: "En uygun fiyatlı konforlu ilçe. Metro, parklar, aile dostu bir atmosfer.",
        wola: "Modern bir ilçe, çok sayıda yeni inşaat, hızla gelişiyor, merkeze yakın.",
        zoliborz: "Rahat, güvenli, göçmenler arasında favori. Mükemmel bir atmosfer.",
      },
      bestValueBadge: "En iyi değer",
      showAllDistricts: "Tüm ilçeleri göster →",
      showFewerDistricts: "Listeyi daralt",
    },
    banks: {
      title: "Polonya'da Bankalar 🇵🇱",
      subtitle: "Yeni gelenler için tasarlanmış hesapları karşılaştırın.",
      openAccount: "Hesap Aç",
      bestForExpats: "Göçmenler için en iyisi",
      features: {
        pkobp: ["Polonya'nın en büyük şube ağı", "Lehçe ve İngilizce mobil uygulama", "Ücretsiz öğrenci hesabı seçenekleri"],
        mbank: ["Tamamen İngilizce uygulama ve destek", "Anında çevrimiçi hesap açma", "PESEL numarası olmadan ücretsiz"],
        santander: ["Çoklu para birimi hesapları", "Küresel banka ağı", "Yurt dışında ücretsiz banka kartı kullanımı"],
        revolut: ["Başlamak için PESEL gerekmez", "Çoklu para birimi cüzdanı", "Dijital göçebeler için en iyisi"],
      },
    },
    medicine: {
      title: "Polonya'da Sağlık 🇵🇱",
      subtitle: "Hızlıca sigorta yaptırın ve bakım bulun.",
      nfzVsPrivate: "NFZ ve Özel Sigorta",
      nfzPublic: "NFZ (kamu)",
      privateLabel: "Özel",
      clinicsTitle: "Klinikler",
      clinicsSub: "İngilizce, Rusça ve Ukraynaca konuşan seçenekler.",
      warsaw: "Varşova",
      languages: {
        ruUa: "Rusça ve Ukraynaca konuşuluyor",
        en: "İngilizce konuşuluyor",
        ru: "Rusça konuşuluyor",
        ua: "Ukraynaca konuşuluyor",
      },
      rows: [
        { label: "Maliyet", nfz: "İstihdam katkı payları ile ücretsiz", pvt: "Ayda 150–400 PLN" },
        { label: "Bekleme süresi", nfz: "Uzmanlar için haftalar-aylar", pvt: "Aynı günden birkaç güne" },
        { label: "Dil desteği", nfz: "Genellikle sadece Lehçe", pvt: "İngilizce, sık sık Rusça/Ukraynaca" },
        { label: "Kapsam", nfz: "Geniş ama sınırlı doktor seçimi", pvt: "Kendi kliniğinizi ve doktorunuzu seçin" },
      ],
      bookBtn: "Randevu al",
    },
    work: {
      title: "Polonya'da İş 🇵🇱",
      subtitle: "Sözleşmeler, maaşlar ve nerede arayacağınız.",
      contractVsB2B: "Sözleşme ve B2B",
      salarySearch: "Maaş Arama",
      salarySearchSub: "Ortalama ücreti görmek için bir meslek yazın.",
      placeholder: "örn. yazılım geliştirici, hemşire, şoför...",
      averageSalary: "Ortalama maaş",
      inEuros: "Euro cinsinden",
      noExactData: "Bu meslek için henüz kesin veri yok — ulusal ortalama gösteriliyor.",
      jobSites: "İş Siteleri",
      visitSite: "Siteyi ziyaret et",
      employmentSubtitle: "İş sözleşmesi",
      b2bSubtitle: "Serbest çalışma",
      b2bContractName: "B2B Sözleşmesi",
      employmentFeatures: [
        "Ücretli izin, hastalık izni ve ihbar süresi",
        "İşveren ZUS sosyal güvenlik katkı paylarını öder",
        "Oturma izni için daha kolay bir yol",
      ],
      b2bFeatures: [
        "Daha yüksek eline geçen ücret, daha düşük vergi oranı",
        "ZUS ve faturalandırmayı kendiniz yönetirsiniz",
        "Daha fazla esneklik, daha az iş güvencesi",
      ],
      jobSiteDescs: {
        pracuj: "Polonya'nın en büyük iş sitesi, tüm sektörler.",
        nofluff: "Teknolojiye odaklı, maaşlar önceden belirtilir.",
        linkedin: "Uluslararası pozisyonlar, İngilizce konuşanlar için güçlü.",
      },
    },
    community: {
      title: "Topluluk 🇵🇱",
      subtitle: "Diğer göçmenlerin gerçekten kullandığı Telegram kanalları.",
      join: "Katıl",
      members: "üye",
      cats: { all: "Tümü", housing: "Konut", work: "İş", sport: "Spor", family: "Aile", general: "Genel" },
    },
    dashboard: {
      relocation: "{country} Taşınması",
      subtitle: "Kişiselleştirilmiş yol haritanız, gerçek zamanlı güncellenir.",
      overallProgress: "Genel ilerleme",
      openBtn: "Aç",
      route: {
        heading: "Taşınma seçenekleriniz",
        recommended: "Önerilen",
        viewFullPlan: "Tam planı görüntüle",
        hidePlan: "Planı gizle",
        successProbability: "Başarı olasılığı",
        timeline: "Süre",
        cost: "Tahmini maliyet",
        requiredDocuments: "Gerekli belgeler",
        pros: "Artıları",
        cons: "Eksileri",
        reasoningTitle: "Neden bu yol",
        checklistHeading: "Kişiselleştirilmiş kontrol listeniz",
        loading: "Taşınma seçenekleriniz analiz ediliyor…",
      },
      steps: {
        account: { title: "Hesabınızı oluşturun", desc: "Her şey hazır." },
        onboarding: { title: "Başlangıç anketini tamamlayın", desc: "Bunu yol haritanızı oluşturmak için kullandık." },
        visa: {
          title: "Vize uygunluğunu kontrol edin",
          euDesc: "AB/AEA vatandaşı olarak vizeye ihtiyacınız yok — sadece vardığınızda adresinizi kaydettirin.",
          byCountry: {
            poland: {
              work: "İşvereninize bağlı ulusal çalışma vizesi veya Karta Pobytu size uygun olabilir.",
              study: "Eğitiminize bağlı ulusal vize veya Karta Pobytu'ya ihtiyacınız olacak.",
              business: "İşletme sahipleri Polonya'da şirket yürütmeye bağlı oturma izni için başvurabilir.",
              family: "Polonya'da yasal ikamet sahibi bir aile üyeniz varsa aile birleşimi izinleri mevcuttur.",
            },
            germany: {
              work: "Job Seeker Visa, EU Blue Card veya işe dayalı Aufenthaltstitel size uygun olabilir.",
              study: "Kaydınıza bağlı bir öğrenci vizesine (Aufenthaltstitel zum Studium) ihtiyacınız olacak.",
              business: "Almanya, serbest meslek sahipleri için bir oturma izni sunar (Aufenthaltserlaubnis für selbständige Tätigkeit).",
              family: "Almanya'da zaten ikamet eden yakın bir aile üyeniz varsa aile birleşimi vizeleri (Familiennachzug) uygulanabilir.",
            },
            spain: {
              work: "Standart çalışma vizesi veya EU Blue Card size uygun olabilir.",
              study: "Kaydınıza ve mali imkanlarınıza bağlı bir öğrenci vizesine ihtiyacınız olacak.",
              business: "İspanya'nın girişimci veya yatırımcı vizesi (Golden Visa yolu dahil) uygulanabilir.",
              family: "İspanya'da zaten ikamet eden yakın bir aile üyeniz varsa aile birleşimi (reagrupación familiar) vizeleri uygulanabilir.",
            },
          },
        },
        business: {
          title: "İşletmenizi kaydettirin",
          desc: "İşletme oturma izni için başvurmadan önce şirket yapınızı ve vergi kaydınızı oluşturun.",
        },
        documents: { title: "Gerekli belgeleri yükleyin", desc: "7 belge gerekiyor — 2'si zaten sizde." },
        biometric: { title: "Biyometrik randevu planlayın", desc: "Belgeleriniz onaylandığında açılır." },
        residence: { title: "Oturma izni için başvurun", desc: "Biyometrik randevunuzdan sonra açılır." },
        address: { title: "Yerel adresinizi kaydedin", desc: "Tamamen yerleşmeden önceki son adım." },
      },
    },
    appPricing: {
      title: "Planınızı seçin",
      subtitle: "Taşınmanız için doğru planı seçin. İstediğiniz zaman yükseltin veya düşürün.",
      activating: "Etkinleştiriliyor…",
      securedByStripe: "Stripe ile güvence altında",
      mostPopular: "En popüler",
      forever: "sonsuza dek",
      perMonth: "/ay",
      freeName: "Ücretsiz",
      premiumName: "Premium",
      proName: "Pro",
      freeDesc: "Taahhüt etmeden önce deneyin.",
      premiumDesc: "Taşınmanız için tam rehberlik.",
      proDesc: "Aileler ve karmaşık taşınmalar için.",
      freeCta: "Ücretsiz başla",
      premiumCta: "Premium al",
      proCta: "Pro al",
      freeFeatures: [
        "Polonya — 1 ülke mevcut",
        "Kontrol listesi: 5 adım önizleme",
        "Günde 5 AI mesajı",
        "Belge yükleme ve saklama",
        "Tam adres veritabanı",
        "Topluluk erişimi",
        "E-posta desteği",
      ],
      premiumFeatures: [
        "3 ülkenin tamamı (Polonya, Almanya, İspanya)",
        "Tam kontrol listesi — tüm adımlar",
        "Günde 50 AI mesajı",
        "Belge yükleme ve saklama",
        "Tam adres veritabanı (bankalar, klinikler, ofisler)",
        "Topluluk erişimi",
        "E-posta desteği",
      ],
      proFeatures: [
        "Premium'daki her şey",
        "Sınırsız AI mesajı",
        "AI belgeleri otomatik doldurur",
        "7/24 öncelikli destek",
        "Danışma görüşmesi (ayda 1×)",
        "Yeni ülkelere erken erişim",
        "Belgeler için PDF dışa aktarma",
      ],
    },
    checkout: {
      secureCheckout: "Güvenli ödeme",
      orderSummary: "Sipariş özeti",
      subscription: "Aylık abonelik · istediğiniz zaman iptal edin",
      perMonth: "/ay",
      totalToday: "Bugün toplam",
      paymentDetails: "Ödeme bilgileri",
      cardNumber: "Kart numarası",
      expiryDate: "Son kullanma tarihi",
      cvc: "CVC",
      cardholderName: "Kart sahibinin adı",
      processing: "İşleniyor…",
      trustBadge: "Güvenli ödeme · 256-bit SSL şifreleme · Stripe altyapısıyla",
      termsPrefix: "Ödeme yaparak kabul etmiş olursunuz:",
      termsService: "Hizmet Şartları",
      and: "ve",
      privacyPolicy: "Gizlilik Politikası",
      payFailed: "Ödeme başarısız oldu. Lütfen tekrar deneyin.",
      payBtn: "Öde",
      welcomeToast: "{plan}'a hoş geldiniz! 🎉",
      premiumFeatures: ["3 ülkenin tamamı", "Tam kontrol listesi", "Günde 50 AI mesajı", "Belge saklama", "E-posta desteği"],
      proFeatures: ["Premium'daki her şey", "Sınırsız AI mesajı", "AI belgeleri doldurur", "7/24 öncelikli destek", "Aylık danışma görüşmesi"],
    },
    education: {
      title: "Eğitim",
      subtitle: "Dil kursları, okullar, anaokulları ve üniversiteler — ülkenize göre filtrelendi.",
      coursesTab: "Dil kursları",
      schoolsTab: "Okullar",
      kindergartensTab: "Anaokulları",
      universitiesTab: "Üniversiteler",
      filterAll: "Tümü",
      filterPublic: "Devlet",
      filterPrivate: "Özel",
      publicBadge: "Devlet",
      privateBadge: "Özel",
      learnMore: "Daha fazla bilgi →",
      rowFormat: "Format",
      rowLevel: "Seviye",
      rowPrice: "Ücret",
      rowInstruction: "Eğitim dili",
      rowAges: "Yaş",
      rowWaiting: "Bekleme listesi",
      rowTuition: "Öğrenim ücreti",
      rowDeadline: "Başvuru son tarihi",
      morePrograms: "daha",
      emptyState: "Seçilen filtre için seçenek yok.",
      banners: {
        poland: {
          courses: "Geçici koruma statüsüne mi sahipsiniz? Varşova belediyesinin birçok kursu ücretsizdir. Bölgenizdeki urząd dzielnicy veya Powiatowy Urząd Pracy'ye (PUP) sorun.",
          schools: "Polonya devlet okulları geçici koruma statüsüne sahip Ukraynalı mülteciler dahil tüm çocuklar için ÜCRETSİZDİR. Okullar, yoğun Lehçe desteği sunan hazırlık sınıfları sağlar.",
          universities: "Geçici korumaya sahip Ukrayna vatandaşları, Polonya devlet üniversitelerinde Polonya vatandaşlarıyla aynı koşullarda — genellikle öğrenim ücreti ödemeden — okuyabilir.",
        },
        germany: {
          courses: "BAMF Entegrasyon Kursu ilk uğrak noktanızdır: 700 saat Almanca (A1–B1) artı vatandaşlık oryantasyonu, birçok oturma izni türü için yoğun şekilde sübvanse edilir veya ücretsizdir.",
          schools: "Almanya'da okula devam zorunludur. Yeni gelen çocuklar, normal sınıflara katılmadan önce yoğun Almanca desteği sunan hoş geldin sınıflarına yerleştirilir. Her zaman ücretsizdir.",
        },
        spain: {
          courses: "Devlet EOI okulları çok uygun fiyatlı İspanyolca ve İngilizce sunar — her Eylül'de kayıt yapılır. Bazı bölgeler yeni gelenler için ücretsiz toplum İspanyolca kursları sunar.",
          schools: "İspanya'daki tüm çocukların göçmenlik statüsünden bağımsız olarak eğitim hakkı anayasal bir haktır. Devlet okulları tüm sakinler için ücretsizdir. Yerel belediyenize dil destek kursları hakkında sorun.",
        },
      },
    },
    aiChat: {
      welcome:
        "Merhaba! Ben ReloAI asistanınızım. Polonya, Almanya veya İspanya'ya taşınmayla ilgili sorularınızda yardımcı olabilirim. Belgeler, konut, bankalar, sağlık ve iş hakkında sorabilirsiniz!",
      personalizedGreeting: "Merhaba! {country}'a «{goal}» amacıyla taşınmayı planladığınızı görüyorum.",
      personalizedRecommendation: "Profilinize göre sizin için en iyi yol: {pathway}. Detaylandırmamı ister misiniz?",
      quickReplies: ["PESEL nasıl alınır?", "Hangi bankada hesap açmalıyım?", "Konutu nasıl bulabilirim?", "Hangi belgeler gerekli?"],
      placeholder: "ReloAI'ya istediğinizi sorun...",
      sendAria: "Mesaj gönder",
      closeAria: "Kapat",
      connectionError: "Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edip tekrar deneyin.",
      fallback: {
        pesel: "Polonya'da PESEL numarası almak için: 1) Bölgenizdeki Urząd Miasta'da (belediye) randevu alın. 2) Pasaportunuzu, vize veya oturma izninizi ve adres kanıtınızı (kira sözleşmesi de olur) yanınıza alın. 3) Orada EL-ZAM formunu doldurun. İşlem genellikle aynı gün ile birkaç gün arasında sürer. PESEL'e sonrasında neredeyse her şey için ihtiyacınız olacak — banka hesabı açmak, sağlık sigortasına kaydolmak ve sözleşme imzalamak gibi.",
        bank: "Bankacılık için: mBank göçmenler için en uygun seçenek — tamamen İngilizce uygulama ve destek. Revolut, PESEL almadan önce bile iyi çalışır. Şubeden işlem yapmayı tercih ediyorsanız PKO BP en geniş şube ağına sahiptir. Çoklu para birimi hesabına ihtiyacınız varsa Santander iyi bir seçimdir.",
        housing: "Konut ipuçları: OLX, Otodom veya Gratka'da ilan arayın. Daireyi şahsen veya canlı görüntülü görüşmeyle görmeden asla depozito göndermeyin. Kira sözleşmenizin yasal geçerliliği için Lehçe olması gerekir. Kiraya ek olarak bir depozito (1–2 aylık kira) ve czynsz (bina bakım ücreti) için bütçe ayırın.",
        documents: "Genellikle ihtiyacınız olan belgeler: pasaport, vize veya oturma izni başvurusu, adres kanıtı, PESEL onayı, sağlık sigortası belgesi ve (çalışıyorsanız) iş sözleşmeniz veya çalışma izniniz. Bunlardan herhangi birini daha ayrıntılı anlatabilirim.",
        visa: "Vize ihtiyaçları vatandaşlığınıza ve gideceğiniz ülkeye göre değişir. Polonya için çoğu AB dışı vatandaşın iş, eğitim veya aile temelli ulusal vize veya oturma iznine (Karta Pobytu) ihtiyacı vardır. Almanya için Job Seeker Visa, Aufenthaltstitel veya EU Blue Card'a bakın. İspanya için Digital Nomad Visa'yı veya NIE kaydı üzerinden standart çalışma/oturma yollarını inceleyin.",
        default: "Belgeler, konut, bankalar, sağlık veya iş konusunda yardımcı olabilirim. Hangisi hakkında daha fazla bilgi almak istersiniz?",
      },
      actionLabel: "Bunu ReloAI'da yap →",
      premiumLabel: "Premium'da mevcut →",
    },
    demo: {
      bannerText: "Önizleme modundasınız. İlerlemenizi kaydetmek ve tüm özelliklere erişmek için kayıt olun.",
      registerNow: "Şimdi Kayıt Ol",
      floatingGreeting: "👋 ReloAI'yi keşfediyorsunuz — ilerlemenizi kaydetmek için ücretsiz kayıt olun",
      promptHeading: "Bu özelliğin kilidini açmak için kayıt olun",
      promptBody: "İlerlemenizi kaydetmek ve tüm özelliklerin kilidini açmak için ücretsiz bir hesap oluşturun.",
      promptDismiss: "Daha sonra",
    },
    onboarding: {
      stepLabel: "Adım {current} / {total}",
      back: "Geri",
      continueBtn: "Devam et",
      finish: "Bitir",
      saving: "Kaydediliyor...",
      skip: "Atla ve daha sonra doldur",
      skipTooltip: "Kişisel taşınma planınızı almak için 5 soruyu yanıtlayın",
      citizenshipLabel: "Vatandaşlık",
      citizenshipPlaceholder: "Vatandaşlık ülkenizi arayın...",
      currentCountryLabel: "Şu anda yaşadığınız ülke",
      currentCountryPlaceholder: "Bir ülke arayın...",
      comingSoon: "Yakında",
      steps: {
        language: { question: "Dilinizi seçin", subheading: "ReloAI sizinle bu dilde konuşacak." },
        citizenship: { question: "Vatandaşlığınız nedir?", subheading: "Doğru vize kategorisini belirlememize yardımcı olur." },
        currentCountry: { question: "Şu anda hangi ülkedesiniz?", subheading: "Sonraki adımları bulunduğunuz yere göre uyarlamamızı sağlar." },
        destination: { question: "Nereye taşınıyorsunuz?", subheading: "Yol haritanızı bu ülkeye göre uyarlayacağız." },
        goal: { question: "Ana hedefiniz nedir?", subheading: "Bu, sizin için hangi yolları analiz edeceğimizi belirler." },
      },
      goalOptions: {
        work: "İş",
        study: "Eğitim",
        business: "İş kurma",
        passiveIncome: "Pasif gelir",
        digitalNomad: "Dijital göçebe",
        familyReunification: "Aile birleşimi",
        other: "Diğer",
      },
      results: {
        heading: "Sizin için 3 taşınma yolu bulduk",
        loading: "Kişiselleştirilmiş yollarınız oluşturuluyor...",
        selectButton: "Bu yolu seçin",
        recommended: "Önerilen",
        speedFast: "Hızlı",
        speedMedium: "Orta",
        speedSlow: "Yavaş",
        difficultyEasy: "Kolay",
        difficultyMedium: "Orta",
        difficultyHard: "Zor",
        approvalRate: "Onay oranı",
        timeline: "Zaman dilimi",
        cost: "Maliyet",
      },
    },
  },
  tg: {
    nav: {
      howItWorks: "Чӣ тавр кор мекунад",
      features: "Хусусиятҳо",
      countries: "Кишварҳо",
      pricing: "Нархгузорӣ",
      reviews: "Шарҳҳо",
      login: "Воридшавӣ",
      getStarted: "Сар кардан",
    },
    hero: {
      badge: "Роҳнамои сунъии аз ҷониби AI барои кӯчиш",
      headline1: "Кӯчидан ба Аврупо",
      headline2: "— ин содда аст.",
      subtext:
        "ReloAI раводид, коғазҳо, манзил ва корҳои бонкии шуморо қадам ба қадам, бо забони сода ба нақша мегирад. Саволеро бипурсед ва дар якчанд сония нақшаи шахсии худро гиред.",
      getStarted: "Сар кардан",
      seeHowItWorks: "Чӣ тавр кор карданашро бинед",
      trustedFor: "Ба кӯчиш ба ин кишварҳо боварӣ доранд",
    },
    chat: {
      assistantName: "Ёрирасони ReloAI",
      online: "Онлайн",
      messages: [
        "Ман мехоҳам аз Украина ба Олмон барои кор кӯчам.",
        "Фаҳмидам. Тибқи профили шумо, ба шумо раводиди ҷустуҷӯи кор ё EU Blue Card лозим мешавад. Мехоҳед рӯйхати ҳуҷҷатҳои шуморо тартиб диҳам?",
        "Ҳа, лутфан.",
        "Тайёр. 7 ҳуҷҷат лозим аст, 2-тои онро шумо аллакай доред. Ман дар бораи мӯҳлатҳо ба шумо ёдрасонӣ мекунам.",
      ],
    },
    heroDemo: {
      question: "Ба куҷо мехоҳед кӯчед?",
      userReply: "Полша, мехоҳам кор кунам",
      response: "Аъло! Ҳозир барои шумо нақшаи қадам ба қадами кӯчидан ба Полша тартиб медиҳам.",
      inputPlaceholder: "Дар бораи зиндагӣ дар Полша бипурсед...",
    },
    stats: {
      items: [
        { value: "3", label: "Кишвар" },
        { value: "10x", label: "Арзонтар" },
        { value: "24/7", label: "Дастгирии AI" },
      ],
    },
    howItWorks: {
      heading: "Чӣ тавр кор мекунад",
      subheading: "Аз савол то рӯзи кӯчиш — танҳо дар чор қадами оддӣ.",
      steps: [
        {
          title: "Дар бораи вазъи худ нақл кунед",
          description:
            "Ба якчанд савол дар бораи шаҷарномаи худ, ҳадафҳо ва кишвари мақсаднок ҷавоб диҳед.",
        },
        {
          title: "Нақшаи худро гиред",
          description:
            "ReloAI дар тӯли якчанд дақиқа нақшаи шахсии раводид, манзил ва вақтро тартиб медиҳад.",
        },
        {
          title: "Коғазбозиро бо AI идора кунед",
          description:
            "Бо ёрирасони худ сӯҳбат кунед, то шаклҳоро пур кунед, ҳуҷҷатҳо ҷамъ кунед ва мӯҳлатҳоро пайгирӣ кунед.",
        },
        {
          title: "Бо боварӣ кӯчед",
          description:
            "Бо донистани он ки раводид, манзил, бонк ва қайди шумо ҳал шудаанд, бирасед.",
        },
      ],
    },
    features: {
      heading: "Ҳама чизе ки барои кӯчиши шумо лозим аст",
      subheading: "Як ёрирасон барои ҳар як қисми кӯчидан ба Аврупо.",
      items: [
        {
          title: "Роҳнамоӣ дар бораи раводид ва иҷозатнома",
          description:
            "Бидонед маҳз кадом раводид ба вазъи шумо мувофиқ аст ва дар ҳар қадам чӣ лозим аст.",
        },
        {
          title: "Рӯйхати ҳуҷҷатҳо",
          description:
            "Рӯйхати шахсӣ ва ҳамеша навшудаистодаи тамоми ҳуҷҷатҳои лозимаи шумо.",
        },
        {
          title: "Ёрирасони манзил",
          description:
            "Эълонҳоро ҳаввасунад кунед, шартномаҳоро фаҳмед ва аз фирефторони иҷора дур шавед.",
        },
        {
          title: "Бонк ва андозҳо",
          description: "Ҳисобҳои дурустро кушоед ва ӯҳдадориҳои нави андозии худро фаҳмед.",
        },
        {
          title: "Тартиб додани тибб",
          description: "Зуд дар суғурта қайд шавед ва дар наздикӣ духтур ёбед.",
        },
        {
          title: "Чати AI 24/7",
          description:
            "Дар бораи кӯчиши худ ҳар чизро бипурсед ва дарҷол ҳавоби равшан ва бо манбаъ гиред.",
        },
      ],
    },
    countries: {
      heading: "Барои самти шумо сохта шудааст",
      subheading: "Роҳнамоии хосси кишвар, на танҳо рӯйхати умумӣ.",
      list: [
        {
          flag: "🇵🇱",
          name: "Лаҳистон",
          highlight: "Маркази технологии зуд рушдкунанда",
          points: [
            "Шарҳи иҷозатномаи истиқомати Karta Pobytu",
            "Бақайдгирии PESEL ва бонки маҳаллӣ",
            "Роҳнамои миёнаи ҳаққи иҷора аз рӯи шаҳрҳо",
          ],
        },
        {
          flag: "🇩🇪",
          name: "Олмон",
          highlight: "EU Blue Card ва раводидҳои ҷустуҷӯи кор",
          points: [
            "Анмелдунг ва вомбардҳои Bürgeramt",
            "Суғуртаи тиббӣ (давлатӣ ё хусусӣ)",
            "Рақами андоз ва дастгирии раводиди фрилансер",
          ],
        },
        {
          flag: "🇪🇸",
          name: "Испания",
          highlight: "Маъмул дар миёни кормандони дурдаст",
          points: [
            "Санҳии мутобиқати Digital Nomad Visa",
            "Рақами NIE ва empadronamiento",
            "Муқоисаи арзиши зиндагӣ аз рӯи минтақаҳо",
          ],
        },
      ],
      planMyMoveTo: "Нақшаи кӯчиш ба {country} →",
    },
    pricing: {
      heading: "Нархгузории содда ва шаффоф",
      subheading: "Ройгон сар кунед. Вақте ки кӯчиши шумо воқеӣ мешавад, баланд кунед.",
      mostPopular: "Маъмултарин",
      plans: [
        {
          name: "Ройгон",
          price: "€0",
          period: "доимӣ",
          description: "Пеш аз қарор додан имкониятҳои худро бинед.",
          features: [
            "Санҷиши мутобиқати раводид",
            "Рӯйхати асосии ҳуҷҷатҳо",
            "Чати маҳдуди AI (10 паём/моҳ)",
            "Роҳнамоҳои умумии кишварҳо",
          ],
          cta: "Ройгон сар кунед",
        },
        {
          name: "Premium",
          price: "€29",
          period: "/моҳ",
          description: "Роҳнамоии пурра барои кӯчиши фаъол.",
          features: [
            "Ҳама чизи нақшаи Ройгон",
            "Чати беандозаи AI",
            "Нақша ва мӯҳлатҳои шахсӣ",
            "Ёрирасони манзил ва бонк",
            "Дастгирии электронӣ",
          ],
          cta: "Premium-ро гиред",
        },
        {
          name: "Pro",
          price: "€49",
          period: "/моҳ",
          description: "Барои оилаҳо ва кӯчиши мураккаб.",
          features: [
            "Ҳама чизи Premium",
            "Профилҳо барои якчанд шахс",
            "Баррасии ҳуҷҷатҳо аз ҷониби мутахассис",
            "Дастгирии чати афзалиятнок",
            "Мактубҳои кӯчиш барои корфармо",
          ],
          cta: "Pro-ро гиред",
        },
      ],
    },
    reviews: {
      heading: "Дӯстдоштаи онҳое, ки кӯчидаанд",
      subheading: "Ҳикояҳои воқеӣ аз одамоне, ки бо ReloAI кӯчидаанд.",
      items: [
        {
          name: "Анна К.",
          route: "Украина → Полша",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "PESEL-ро дар 2 рӯз гирифтам. Бе ReloAI як ҳафта барои ҷустуҷӯи маълумот сарф мекардам.",
          initials: "АК",
        },
        {
          name: "Михаил С.",
          route: "Русия → Олмон",
          fromFlag: "🇷🇺",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "AI ба фаҳмидани Anmeldung кӯмак кард. Ҳама чизро фаҳмонд ва суроғаи идораҳоро дод.",
          initials: "МС",
        },
        {
          name: "Ольга М.",
          route: "Белоруссия → Испания",
          fromFlag: "🇧🇾",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "Дар Испания бизнес кушодам. Рӯйхат як моҳ вақт ва 2000 евро ҳаққи ҳуқуқшиносро сарфа кард.",
          initials: "ОМ",
        },
        {
          name: "Дмитрий П.",
          route: "Қазоқистон → Полша",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 4,
          quote: "Пайгирии пешравӣ хеле кӯмак мекунад. Ҳамеша медонам, ки дар кадом қадам ҳастам.",
          initials: "ДП",
        },
        {
          name: "Лейла Р.",
          route: "Ӯзбекистон → Олмон",
          fromFlag: "🇺🇿",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Тавассути бахши ҷойҳои корӣ дар Олмон кор ёфтам. AI ҳатто мактуби ҳамроҳиро навишт.",
          initials: "ЛР",
        },
        {
          name: "Тимур А.",
          route: "Тоҷикистон → Испания",
          fromFlag: "🇹🇯",
          toFlag: "🇪🇸",
          rating: 5,
          quote: "NIE-ро дар 3 ҳафта гирифтам. Пештар фикр мекардам, ки ним сол вақт мегирад.",
          initials: "ТА",
        },
        {
          name: "Карина Н.",
          route: "Украина → Олмон",
          fromFlag: "🇺🇦",
          toFlag: "🇩🇪",
          rating: 5,
          quote: "Бо оила кӯчидам. Барои кӯдакон мактаб ва духтури русзабонро ёфтем.",
          initials: "КН",
        },
        {
          name: "Артём В.",
          route: "Русия → Испания",
          fromFlag: "🇷🇺",
          toFlag: "🇪🇸",
          rating: 4,
          quote: "Digital Nomad Visa — тибқи дастури ReloAI дар 6 ҳафта расмӣ кардам.",
          initials: "АВ",
          documentBadge: "🇪🇸 Digital Nomad Visa",
        },
        {
          name: "Зарина И.",
          route: "Қазоқистон → Полша",
          fromFlag: "🇰🇿",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Дар mBank аз бори аввал ҳисоб кушодам. AI гуфт, ки кадом ҳуҷҷатҳоро гирам.",
          initials: "ЗИ",
        },
        {
          name: "Богдан Ф.",
          route: "Украина → Полша",
          fromFlag: "🇺🇦",
          toFlag: "🇵🇱",
          rating: 5,
          quote: "Беҳтарин хидмат барои кӯчидан. Вақт ва асабамро сарфа кард.",
          initials: "БФ",
          documentBadge: "🇵🇱 Karta Pobytu",
        },
      ],
    },
    contact: {
      heading: "Омодаед кӯчиши худро сар кунед?",
      subtext:
        "Ба мо бигӯед ба куҷо меравед ва мо дар тӯли як рӯз ба шумо нақшаи ройгони кӯчишро мефиристем.",
      email: "hello@reloai.com",
      repliesWithin: "Дар тӯли 24 соат ҷавоб медиҳем",
      form: {
        fullName: "Номи пурра",
        emailLabel: "Email",
        movingTo: "Кӯчиш ба",
        message: "Паём",
        placeholderName: "Анвар Алиев",
        placeholderEmail: "anvar@example.com",
        placeholderMessage: "Дар бораи кӯчиши худ каме нависед...",
        destinations: ["Лаҳистон", "Олмон", "Испания", "Дигар"],
        send: "Фиристодани паём",
      },
      success: {
        title: "Ташаккур — паём фиристода шуд!",
        subtext: "Мо ба зудӣ бо шумо тавассути нақшаи кӯчиш дар тамос мешавем.",
      },
    },
    footer: {
      description:
        "Ёрирасони сунъии шумо барои кӯчидан ба Аврупо — раводидҳо, коғазҳо, манзил ва бонк, қадам ба қадам.",
      productHeading: "Маҳсулот",
      countriesHeading: "Кишварҳо",
      companyHeading: "Ширкат",
      productLinks: ["Чӣ тавр кор мекунад", "Хусусиятҳо", "Нархгузорӣ"],
      companyLinks: ["Шарҳҳо", "Тамос"],
      rights: "Ҳамаи ҳуқуқҳо ҳифз шудаанд.",
      disclaimer: "ReloAI хидматҳои иттилоотӣ пешниҳод мекунад. Мо ширкати ҳуқуқӣ нестем ва барои қарорҳои мақомоти муҳоҷират масъулият надорем. Тамоми маълумот танҳо хусусияти шиносоӣ дорад. Барои кӯмаки ҳуқуқӣ ба мутахассиси литсензиядор муроҷиат кунед.",
    },
    auth: {
      or: "ё",
      login: {
        heading: "Хуш омадед",
        subtext: "Барои идома додани нақшаи кӯчиш ворид шавед.",
        googleSignIn: "Тавассути Google ворид шавед",
        email: "Почтаи электронӣ",
        passwordLabel: "Парол",
        submit: "Идома додан",
        forgotPassword: "Паролро фаромӯш кардед?",
        noAccount: "Аккаунт надоред?",
        register: "Бақайдгирӣ",
      },
      register: {
        heading: "Аккаунт созед",
        subtitle: "Дар якчанд дақиқа нақшаи ройгони кӯчиши худро созед.",
        googleSignUp: "Тавассути Google бақайдгирӣ кунед",
        redirecting: "Равона карда мешавад…",
        fullName: "Номи пурра",
        email: "Email",
        passwordLabel: "Парол",
        passwordTooltip: "Парол ба талабот ҷавобгӯ нест",
        submit: "Бақайдгирӣ",
        hasAccount: "Аллакай аккаунт доред?",
        login: "Ворид шавед",
        confirmEmail: {
          heading: "Почтаи худро тафтиш кунед",
          body: "Мо ба {email} пайванди тасдиқ фиристодем. Барои фаъол кардани аккаунт болои он клик кунед, сипас ворид шавед.",
          goToLogin: "Гузариш ба вуруд",
        },
      },
    },
    password: {
      minLength: "Ҳадди ақал 8 аломат",
      hasUppercase: "Ҳадди ақал як ҳарфи калон (A–Z)",
      hasLowercase: "Ҳадди ақал як ҳарфи хурд (a–z)",
      hasNumber: "Ҳадди ақал як рақам (0–9)",
      hasSpecialOrNumber: "Аломати махсус (!@#$%^&*) — ё рақам ду баробар ҳисоб мешавад",
      noForeign: "Танҳо ҳарфҳои англисӣ (бе кириллӣ)",
      weak: "Заиф",
      medium: "Миёна",
      strong: "Қавӣ",
    },
    profile: {
      title: "Профил",
      subtitle: "Аккаунт ва танзимоти худро идора кунед.",
      languageSection: "Забон",
      languageDesc: "ReloAI бо шумо ба ин забон гап мезанад.",
      saving: "(захира мешавад…)",
      notifications: "Огоҳиномаҳо",
      logOut: "Баромадан",
      planSuffix: "нақша",
      unnamed: "Номи нест",
      notifEmail: "Навсозиҳои Email",
      notifEmailDesc: "Гоҳо хабарҳои маҳсулот ва маслиҳатҳо.",
      notifDocuments: "Ёдоварии ҳуҷҷатҳо",
      notifDocumentsDesc: "Огоҳиҳо пеш аз мӯҳлат.",
      notifProduct: "Хабарҳои маҳсулот",
      notifProductDesc: "Хусусиятҳои нав ва навсозиҳо.",
    },
    topbar: {
      searchPlaceholder: "Ҷустуҷӯи ҳуҷҷатҳо, вазифаҳо...",
      upgrade: "Беҳтар кардан",
      openMenuAria: "Кушодани меню",
    },
    sidebar: {
      documents: "Ҳуҷҷатҳо",
      housing: "Манзил",
      banks: "Бонкҳо",
      medicine: "Тибб",
      work: "Кор",
      community: "Ҷамъият",
      education: "Таҳсил",
      otherServices: "Дигар хизматҳо",
      profile: "Профил",
      settings: "Танзимот",
      logout: "Баромадан",
    },
    documents: {
      title: "Ҳуҷҷатҳо",
      subtitle: "Барои кӯчиданатон лозим будаи ҳама чиз дар як ҷо.",
      tabs: { all: "Ҳама", passport: "Шиноснома", pesel: "PESEL", workPermit: "Иҷозати кор", insurance: "Бима", bank: "Бонк" },
      status: { verified: "Тасдиқшуда", pending: "Дар баррасӣ", missing: "Мавҷуд нест", locked: "Премиум" },
      upload: "Барои боркунӣ кашида гузоред ё зер кунед",
      viewBtn: "Дидан",
      deleteBtn: "Нест кардан",
      unlockBtn: "Бо Премиум кушоед",
      docNames: {
        passportScan: "Скани шиноснома",
        passportPhoto: "Акси андозаи шиноснома",
        peselForm: "Шакли аризаи PESEL",
        peselLetter: "Мактуби тасдиқи PESEL",
        workPermitApp: "Аризаи иҷозати кор",
        sponsorshipLetter: "Мактуби сарпарастии корфармо",
        healthInsurance: "Шаҳодатномаи суғуртаи тиббӣ",
        travelInsurance: "Суғуртаи сафар",
        bankConfirmation: "Тасдиқи ҳисоби бонкӣ",
        proofOfFunds: "Маълумотнома дар бораи мавҷудияти маблағ",
        relocationLetter: "Мактуби кӯчонидани корфармо",
        taxResidency: "Шаҳодатномаи резиденти андоз",
      },
      autoCompleteToast: "✓ Қадам ба таври худкор иҷро шуд",
      sectionCompleteHeading: "🎉 Бахш ба анҷом расид!",
      sectionCompleteBody: "Ба қадами навбатӣ гузаред.",
      sectionCompleteDismiss: "Идома",
      deleteConfirmTitle: "Ҳуҷҷат нест карда шавад?",
      deleteConfirmBody: "Ин амалро бекор кардан мумкин нест. Ҳуҷҷат абадӣ нест карда мешавад.",
      cancelBtn: "Бекор кардан",
    },
    housing: {
      title: "Манзил дар Полша 🇵🇱",
      subtitle: "Ҷои зист бо роҳи оқилона ёфта гиред.",
      rentMarket: "Бозори иҷора",
      rentMarketSub: "Иҷораи миёнаи моҳона аз рӯи ноҳияҳои Варшава.",
      distanceToCenter: "{km} км то марказ",
      metroAccess: "Дастрасии метро",
      noMetro: "Метро нест",
      topWebsites: "Сомонаҳои беҳтарин",
      topWebsitesSub: "Дар куҷо воқеан эълонҳоро ёфтан мумкин аст.",
      aiTips: "Маслиҳатҳои AI",
      aiTipsSub: "Маслиҳатҳои амалӣ аз кӯчиданҳои воқеӣ.",
      visitSite: "Ба сомона гузаред",
      websiteDescs: {
        olx: "Бузургтарин сомонаи эълонҳои Полша — интихоби васеъ, асосан бевосита аз соҳибмулкон.",
        otodom: "Эълонҳои пуркорона тайёршуда, филтрҳои қавӣ, дар байни агентиҳо маъмул.",
        gratka: "Хурдтар, вале боэътимод — барои шаҳрҳои дараҷаи дуюм мувофиқ.",
      },
      tips: [
        {
          title: "Аз фиребгарии вобаста ба пешпардохт эҳтиёт бошед",
          body: "Ҳеҷ гоҳ пеш аз дидани хона шахсан ё тавассути видеоконфронси зинда бо соҳибхона пешпардохт нафиристед. Фиребгарон бо эълонҳои аз ҳад зиёд ҷолиб хориҷиёнро ҳадаф мегиранд.",
        },
        {
          title: "Шартномаро ба забони полякӣ гиред",
          body: "Шартномаҳои иҷора (umowa najmu) бояд ба забони полякӣ бошанд, то қувваи ҳуқуқӣ дошта бошанд. Пеш аз имзои чизе, ки пурра намефаҳмед, тарҷумаи тасдиқшударо гиред.",
        },
        {
          title: "Хароҷоти иловагӣ ба ғайр аз иҷораро ба ҳисоб гиред",
          body: "Интизор бошед, ки пешпардохти кафолатӣ (иҷораи 1–2 моҳ), инчунин czynsz — ҳаққи нигоҳдории бино — алоҳида аз иҷора ва хизматрасониҳои коммуналӣ ҳисоб карда мешавад.",
        },
      ],
      topDistrictDescs: {
        mokotow: "Беҳтарин мувозинати нарх ва сифат. Ором, сербарг, инфрасохтори хуб, метро дорад.",
        ursynow: "Ноҳияи қулайи арзонтарин. Метро, боғҳо, фазои оилавӣ.",
        wola: "Ноҳияи муосир, бисёр биноҳои нав, зуд рушдёбанда, наздик ба марказ.",
        zoliborz: "Форам, бехатар, дар байни муҳоҷирон маҳбуб. Фазои олиҷаноб.",
      },
      bestValueBadge: "Тавсия медиҳем",
      showAllDistricts: "Ҳамаи ноҳияҳоро нишон диҳед →",
      showFewerDistricts: "Рӯйхатро кӯтоҳ кунед",
    },
    banks: {
      title: "Бонкҳо дар Полша 🇵🇱",
      subtitle: "Ҳисобҳои барои навкӯчидагон сохташударо муқоиса кунед.",
      openAccount: "Кушодани ҳисоб",
      bestForExpats: "Беҳтарин барои муҳоҷирон",
      features: {
        pkobp: ["Бузургтарин шабакаи филиалҳо дар Полша", "Барномаи мобилӣ ба забонҳои полякӣ ва англисӣ", "Имконоти ҳисоби ройгон барои донишҷӯён"],
        mbank: ["Барнома ва дастгирии пурра ба забони англисӣ", "Кушодани фаврии ҳисоб онлайн", "Бе рақами PESEL ҳам бе пардохт"],
        santander: ["Ҳисобҳои бисёрвалютавӣ", "Шабакаи бонкии ҷаҳонӣ", "Истифодаи ройгони корти дебетӣ дар хориҷа"],
        revolut: ["Барои оғоз PESEL лозим нест", "Ҳамёни бисёрвалютавӣ", "Беҳтарин барои бодиянишинони рақамӣ"],
      },
    },
    medicine: {
      title: "Тибб дар Полша 🇵🇱",
      subtitle: "Тезтар суғурта гиред ва духтур ёбед.",
      nfzVsPrivate: "NFZ ва суғуртаи хусусӣ",
      nfzPublic: "NFZ (давлатӣ)",
      privateLabel: "Хусусӣ",
      clinicsTitle: "Клиникаҳо",
      clinicsSub: "Гузинаҳо бо забонҳои англисӣ, русӣ ва украинӣ.",
      warsaw: "Варшава",
      languages: {
        ruUa: "Бо забонҳои русӣ ва украинӣ",
        en: "Бо забони англисӣ",
        ru: "Бо забони русӣ",
        ua: "Бо забони украинӣ",
      },
      rows: [
        { label: "Арзиш", nfz: "Ҳангоми пардохти андозҳои меҳнатӣ ройгон", pvt: "150–400 PLN дар моҳ" },
        { label: "Мӯҳлати интизорӣ", nfz: "Барои мутахассисон аз чанд ҳафта то чанд моҳ", pvt: "Аз ҳамон рӯз то якчанд рӯз" },
        { label: "Дастгирии забонӣ", nfz: "Асосан танҳо бо забони полякӣ", pvt: "Англисӣ, аксар вақт русӣ/украинӣ" },
        { label: "Фарогирӣ", nfz: "Васеъ, вале интихоби духтур маҳдуд", pvt: "Клиника ва духтуратонро худатон интихоб кунед" },
      ],
      bookBtn: "Навбат гирифтан",
    },
    work: {
      title: "Кор дар Полша 🇵🇱",
      subtitle: "Шартномаҳо, маошҳо ва дар куҷо ҷустуҷӯ кардан.",
      contractVsB2B: "Шартномаи меҳнатӣ ва B2B",
      salarySearch: "Ҷустуҷӯи маош",
      salarySearchSub: "Барои дидани маоши миёна касбро нависед.",
      placeholder: "масалан, барномасоз, ҳамшира, ронанда...",
      averageSalary: "Маоши миёна",
      inEuros: "Бо евро",
      noExactData: "Барои ин касб ҳанӯз маълумоти дақиқ нест — нишондиҳандаи миёнаи миллӣ нишон дода мешавад.",
      jobSites: "Сомонаҳои корӣ",
      visitSite: "Ба сомона гузаред",
      employmentSubtitle: "Шартномаи меҳнатӣ",
      b2bContractName: "Шартномаи B2B",
      b2bSubtitle: "Кори мустақил (B2B)",
      employmentFeatures: [
        "Рухсатии пулакӣ, рухсатии бемористон ва мӯҳлати огоҳонӣ",
        "Корфармо ҳаққи иҷтимоии ZUS-ро месупорад",
        "Роҳи осонтар ба сӯи иҷозати истиқомат",
      ],
      b2bFeatures: [
        "Даромади холис баландтар, андози камтар",
        "ZUS ва ҳисобномаҳоро худатон танзим мекунед",
        "Чандирии бештар, амнияти шуғли камтар",
      ],
      jobSiteDescs: {
        pracuj: "Бузургтарин сомонаи кории Полша, дар ҳамаи соҳаҳо.",
        nofluff: "Ба технология нигаронидашуда, маошҳо пешакӣ нишон дода мешаванд.",
        linkedin: "Ҷойҳои кории байналмилалӣ, барои англисзабонон мувофиқ.",
      },
    },
    community: {
      title: "Ҷамъият 🇵🇱",
      subtitle: "Каналҳои Telegram, ки дигар кӯчидагон воқеан истифода мебаранд.",
      join: "Ҳамроҳ шудан",
      members: "аъзо",
      cats: { all: "Ҳама", housing: "Манзил", work: "Кор", sport: "Варзиш", family: "Оила", general: "Умумӣ" },
    },
    dashboard: {
      relocation: "Кӯчидан ба {country}",
      subtitle: "Нақшаи роҳи шахсии шумо, ки дар вақти воқеӣ навсозӣ мешавад.",
      overallProgress: "Пешрафти умумӣ",
      openBtn: "Кушодан",
      route: {
        heading: "Вариантҳои кӯчидани шумо",
        recommended: "Тавсияшуда",
        viewFullPlan: "Дидани нақшаи пурра",
        hidePlan: "Пинҳон кардани нақша",
        successProbability: "Эҳтимоли муваффақият",
        timeline: "Мӯҳлат",
        cost: "Арзиши тахминӣ",
        requiredDocuments: "Ҳуҷҷатҳои зарурӣ",
        pros: "Бартариҳо",
        cons: "Камбудиҳо",
        reasoningTitle: "Чаро маҳз ин роҳ",
        checklistHeading: "Рӯйхати корҳои шахсии шумо",
        loading: "Вариантҳои кӯчидани шумо таҳлил мешаванд…",
      },
      steps: {
        account: { title: "Аккаунти худро эҷод кунед", desc: "Ҳама чиз омода аст." },
        onboarding: { title: "Анкетаи аввалияро пур кунед", desc: "Мо инро барои сохтани нақшаи роҳи шумо истифода бурдем." },
        visa: {
          title: "Ҳуқуқи гирифтани раводидро санҷед",
          euDesc: "Ҳамчун шаҳрванди ИА/ҲИА ба шумо раводид лозим нест — танҳо баъди омадан суроғаи худро сабт кунед.",
          byCountry: {
            poland: {
              work: "Раводиди миллии корӣ ё Karta Pobytu, ки бо корфармои шумо алоқаманд аст, метавонад мувофиқ бошад.",
              study: "Ба шумо раводиди миллӣ ё Karta Pobytu, ки бо таҳсилатон алоқаманд аст, лозим мешавад.",
              business: "Соҳибони бизнес метавонанд ба иҷозати истиқомат, ки бо пеш бурдани ширкат дар Полша алоқаманд аст, ариза диҳанд.",
              family: "Агар шумо хешованди дорои иҷозати истиқомати қонунӣ дар Полша дошта бошед, иҷозатҳои муттаҳидшавии оила дастрасанд.",
            },
            germany: {
              work: "Job Seeker Visa, EU Blue Card ё Aufenthaltstitel-и ба кор асосёфта метавонад мувофиқ бошад.",
              study: "Ба шумо раводиди донишҷӯӣ (Aufenthaltstitel zum Studium), ки бо қабули шумо алоқаманд аст, лозим мешавад.",
              business: "Олмон иҷозати истиқомат барои шахсони худкорфаъолиятро пешниҳод мекунад (Aufenthaltserlaubnis für selbständige Tätigkeit).",
              family: "Агар хешованди наздики шумо аллакай дар Олмон истиқомат дошта бошад, раводидҳои муттаҳидшавии оила (Familiennachzug) метавонанд мувофиқ бошанд.",
            },
            spain: {
              work: "Раводиди муқаррарии корӣ ё EU Blue Card метавонад мувофиқ бошад.",
              study: "Ба шумо раводиди донишҷӯӣ, ки бо қабул ва имконоти молиявии шумо алоқаманд аст, лозим мешавад.",
              business: "Раводиди соҳибкор ё сармоягузори Испания (аз ҷумла роҳи Golden Visa) метавонад мувофиқ бошад.",
              family: "Агар хешованди наздики шумо аллакай дар Испания истиқомат дошта бошад, раводидҳои муттаҳидшавии оила (reagrupación familiar) метавонанд мувофиқ бошанд.",
            },
          },
        },
        business: {
          title: "Бизнеси худро ба қайд гиред",
          desc: "Пеш аз дархости иҷозати истиқомат барои бизнес сохтори ширкат ва бақайдгирии андозро ташкил кунед.",
        },
        documents: { title: "Ҳуҷҷатҳои лозимиро бор кунед", desc: "7 ҳуҷҷат лозим аст — 2-тои онҳо аллакай назди шумост." },
        biometric: { title: "Вохӯрии биометриро таъин кунед", desc: "Пас аз тасдиқи ҳуҷҷатҳоятон кушода мешавад." },
        residence: { title: "Барои иҷозати истиқомат ариза диҳед", desc: "Пас аз вохӯрии биометриатон кушода мешавад." },
        address: { title: "Суроғаи маҳаллии худро ба қайд гиред", desc: "Қадами охирин пеш аз пурра ҷойгир шуданатон." },
      },
    },
    appPricing: {
      title: "Нақшаи худро интихоб кунед",
      subtitle: "Барои кӯчиданатон нақшаи муносибро интихоб кунед. Дар вақти дилхоҳ тағйир диҳед.",
      activating: "Фаъол карда мешавад…",
      securedByStripe: "Аз ҷониби Stripe ҳифзшуда",
      mostPopular: "Маъмултарин",
      forever: "доимӣ",
      perMonth: "/моҳ",
      freeName: "Ройгон",
      premiumName: "Premium",
      proName: "Pro",
      freeDesc: "Пеш аз қарор додан санҷед.",
      premiumDesc: "Роҳнамоии пурра барои кӯчиданатон.",
      proDesc: "Барои оилаҳо ва кӯчиданҳои мураккаб.",
      freeCta: "Ройгон оғоз кунед",
      premiumCta: "Премиум гиред",
      proCta: "Pro гиред",
      freeFeatures: [
        "Полша — 1 кишвар дастрас",
        "Рӯйхати корҳо: намоиши 5 қадам",
        "Дар як рӯз 5 паёми AI",
        "Боркунӣ ва нигоҳдории ҳуҷҷатҳо",
        "Пойгоҳи пурраи суроғаҳо",
        "Дастрасӣ ба ҷамъият",
        "Дастгирӣ тавассути email",
      ],
      premiumFeatures: [
        "Ҳар 3 кишвар (Полша, Олмон, Испания)",
        "Рӯйхати пурраи корҳо — ҳамаи қадамҳо",
        "Дар як рӯз 50 паёми AI",
        "Боркунӣ ва нигоҳдории ҳуҷҷатҳо",
        "Пойгоҳи пурраи суроғаҳо (бонкҳо, клиникаҳо, идораҳо)",
        "Дастрасӣ ба ҷамъият",
        "Дастгирӣ тавассути email",
      ],
      proFeatures: [
        "Ҳама чизи Премиум",
        "Паёмҳои беохири AI",
        "AI ҳуҷҷатҳоро худкор пур мекунад",
        "Дастгирии афзалиятнок 24/7",
        "Занги машваратӣ (1× дар моҳ)",
        "Дастрасии барвақт ба кишварҳои нав",
        "Содироти PDF барои ҳуҷҷатҳо",
      ],
    },
    checkout: {
      secureCheckout: "Пардохти бехатар",
      orderSummary: "Хулосаи фармоиш",
      subscription: "Обунаи моҳона · дар вақти дилхоҳ бекор кунед",
      perMonth: "/моҳ",
      totalToday: "Ҷамъи имрӯза",
      paymentDetails: "Тафсилоти пардохт",
      cardNumber: "Рақами корт",
      expiryDate: "Санаи анҷоми муҳлат",
      cvc: "CVC",
      cardholderName: "Номи соҳиби корт",
      processing: "Дар ҳоли коркард…",
      trustBadge: "Пардохти бехатар · рамзгузории 256-битии SSL · Аз ҷониби Stripe таъмин шудааст",
      termsPrefix: "Бо пардохт кардан шумо розӣ мешавед бо",
      termsService: "Шартҳои хизматрасонӣ",
      and: "ва",
      privacyPolicy: "Сиёсати махфият",
      payFailed: "Пардохт иҷро нашуд. Лутфан, боз кӯшиш кунед.",
      payBtn: "Пардохт",
      welcomeToast: "Хуш омадед ба {plan}! 🎉",
      premiumFeatures: ["Ҳар 3 кишвар", "Рӯйхати пурраи корҳо", "Дар як рӯз 50 паёми AI", "Нигоҳдории ҳуҷҷатҳо", "Дастгирӣ тавассути email"],
      proFeatures: ["Ҳама чизи Премиум", "Паёмҳои беохири AI", "AI ҳуҷҷатҳоро пур мекунад", "Дастгирии афзалиятнок 24/7", "Машварати моҳона"],
    },
    education: {
      title: "Таҳсилот",
      subtitle: "Курсҳои забон, мактабҳо, боғчаҳои бачагона ва донишгоҳҳо — барои кишвари шумо.",
      coursesTab: "Курсҳои забон",
      schoolsTab: "Мактабҳо",
      kindergartensTab: "Боғчаҳои кӯдакон",
      universitiesTab: "Донишгоҳҳо",
      filterAll: "Ҳама",
      filterPublic: "Давлатӣ",
      filterPrivate: "Хусусӣ",
      publicBadge: "Давлатӣ",
      privateBadge: "Хусусӣ",
      learnMore: "Бештар омӯзед →",
      rowFormat: "Формат",
      rowLevel: "Дараҷа",
      rowPrice: "Нарх",
      rowInstruction: "Забони таълим",
      rowAges: "Синну сол",
      rowWaiting: "Навбат",
      rowTuition: "Ҳаққи таълим",
      rowDeadline: "Мӯҳлати пешниҳоди ариза",
      morePrograms: "боз",
      emptyState: "Барои филтри интихобшуда ҳеҷ гузинае нест.",
      banners: {
        poland: {
          courses: "Соҳиби мақоми ҳимояи муваққатӣ ҳастед? Бисёр курсҳои шаҳри Варшава ройгонанд. Дар идораи ноҳиявии худ ё Powiatowy Urząd Pracy (PUP) пурсон шавед.",
          schools: "Мактабҳои давлатии Полша барои ҳамаи кӯдакон РОЙГОН аст — аз ҷумла барои гурезаҳои украинӣ бо мақоми ҳимояи муваққатӣ. Мактабҳо синфҳои омодагӣ бо дастгирии интенсивии забони полякӣ пешниҳод мекунанд.",
          universities: "Шаҳрвандони украинӣ бо ҳимояи муваққатӣ метавонанд дар донишгоҳҳои давлатии Полша бо ҳамон шартҳое, ки шаҳрвандони Полша доранд, таҳсил кунанд — маъмулан бе ҳаққи таълим.",
        },
        germany: {
          courses: "Курси интегратсионии BAMF аввалин ҷои муроҷиати шумост: 700 соат забони олмонӣ (A1–B1) ба ҳамроҳи ошносозии шаҳрвандӣ, ки барои бисёр намудҳои иҷозати истиқомат ба таври калон субсидия дода мешавад ё ройгон аст.",
          schools: "Иштирок дар мактаб дар Олмон ҳатмист. Кӯдакони навомада пеш аз ҳамроҳ шудан ба синфҳои муқаррарӣ ба синфҳои қабул бо дастгирии интенсивии забони олмонӣ ҷойгир карда мешаванд. Ҳамеша ройгон.",
        },
        spain: {
          courses: "Мактабҳои давлатии EOI забонҳои испанӣ ва англисиро бо нархи хеле дастрас пешниҳод мекунанд — ҳар сол дар моҳи сентябр номнавис шавед. Баъзе ноҳияҳо барои навомадагон дарсҳои ройгони ҷамъиятии забони испаниро пешниҳод мекунанд.",
          schools: "Ҳамаи кӯдакон дар Испания новобаста аз мақоми муҳоҷираташон ҳуқуқи конститутсионии таҳсил доранд. Мактабҳои давлатӣ барои ҳамаи резидентҳо ройгонанд. Дар бораи дарсҳои дастгирии забонӣ аз мақомоти маҳаллии шаҳрдорӣ пурсон шавед.",
        },
      },
    },
    aiChat: {
      welcome:
        "Салом! Ман ёрирасони AI-и ReloAI ҳастам. Дар бораи саволҳои кӯчидан ба Полша, Олмон ё Испания кӯмак мерасонам. Дар бораи ҳуҷҷатҳо, манзил, бонкҳо, тиб ва кор бипурсед!",
      personalizedGreeting: "Салом! Мебинам, ки шумо ба {country} бо ҳадафи «{goal}» кӯчидан мехоҳед.",
      personalizedRecommendation: "Мувофиқи профили шумо, беҳтарин роҳ барои шумо: {pathway}. Муфассалтар нақл кунам?",
      quickReplies: ["Чӣ тавр PESEL гирифта мешавад?", "Кадом бонкро кушоям?", "Чӣ тавр манзил ёбам?", "Кадом ҳуҷҷатҳо лозиманд?"],
      placeholder: "Аз ReloAI дилхоҳ чизро бипурсед...",
      sendAria: "Фиристодани паём",
      closeAria: "Пӯшидан",
      connectionError: "Пайваст шудан ба сервер имконнопазир буд. Лутфан пайвастшавии худро санҷед ва боз кӯшиш кунед.",
      fallback: {
        pesel: "Барои гирифтани рақами PESEL дар Полша: 1) Дар Urząd Miasta (идораи шаҳр)-и ноҳияи худ вохӯрӣ ба қайд гиред. 2) Шиноснома, раводид ё иҷозати истиқомат ва тасдиқи суроғаи худро (шартномаи иҷора ҳам мешавад) бо худ гиред. 3) Дар ҷо шакли EL-ZAM-ро пур кунед. Коркард одатан аз як рӯз то якчанд рӯзро мегирад. PESEL баъдан барои қариб ҳама чиз лозим мешавад — кушодани ҳисоби бонкӣ, номнависӣ барои суғуртаи тиббӣ ва имзои шартномаҳо.",
        bank: "Дар бораи бонкҳо: mBank беҳтарин гузина барои муҳоҷирон аст — барномаи пурра ба забони англисӣ ва дастгирӣ. Revolut ҳатто пеш аз гирифтани PESEL хуб кор мекунад. Агар хидматрасонии шахсиро бартарӣ диҳед, PKO BP бузургтарин шабакаи филиалҳоро дорад. Агар ҳисоби бисёрвалютавӣ лозим бошад, Santander интихоби хубест.",
        housing: "Маслиҳатҳо оид ба манзил: дар OLX, Otodom ё Gratka эълонҳоро ҷустуҷӯ кунед. Ҳеҷ гоҳ пеш аз дидани хона шахсан ё тавассути видеои зинда пешпардохт нафиристед. Шартномаи иҷораи шумо бояд ба забони полякӣ бошад — вагарна қувваи ҳуқуқӣ надорад. Ба ғайр аз иҷора барои пешпардохти кафолатӣ (иҷораи 1–2 моҳ) ва czynsz (ҳаққи нигоҳдории бино) ҳам буҷа ҷудо кунед.",
        documents: "Одатан ин ҳуҷҷатҳо лозиманд: шиноснома, аризаи раводид ё иҷозати истиқомат, тасдиқи суроға, тасдиқи PESEL, шаҳодатномаи суғуртаи тиббӣ ва (агар кор кунед) шартномаи меҳнатӣ ё иҷозати кор. Метавонам дар бораи ҳар кадоми онҳо муфассалтар нақл кунам.",
        visa: "Талаботи раводид аз шаҳрвандӣ ва кишвари мақсади шумо вобаста аст. Барои Полша аксари шаҳрвандони ғайри ИА ба раводиди миллӣ ё иҷозати истиқомат (Karta Pobytu), ки бо кор, таҳсил ё оила алоқаманд аст, ниёз доранд. Барои Олмон ба Job Seeker Visa, Aufenthaltstitel ё EU Blue Card нигаред. Барои Испания Digital Nomad Visa ё роҳҳои муқаррарии кор/истиқомат тавассути қайди NIE-ро санҷед.",
        default: "Ман метавонам дар бораи ҳуҷҷатҳо, манзил, бонкҳо, тиб ё кор кӯмак расонам. Дар бораи кадоме бештар донистан мехоҳед?",
      },
      actionLabel: "Инро дар ReloAI иҷро кунед →",
      premiumLabel: "Дар Premium дастрас аст →",
    },
    demo: {
      bannerText: "Шумо дар реҷаи пешнамоиш ҳастед. Барои нигоҳ доштани пешрафт ва дастрасӣ ба ҳамаи хусусиятҳо бақайд гиред.",
      registerNow: "Ҳозир бақайд гиред",
      floatingGreeting: "👋 Шумо ReloAI-ро меомӯзед — барои нигоҳ доштани пешрафт ройгон бақайд гиред",
      promptHeading: "Барои кушодани ин хусусият бақайд гиред",
      promptBody: "Барои нигоҳ доштани пешрафт ва кушодани ҳамаи хусусиятҳо аккаунти ройгон созед.",
      promptDismiss: "Дертар",
    },
    onboarding: {
      stepLabel: "Қадами {current} аз {total}",
      back: "Бозгашт",
      continueBtn: "Идома",
      finish: "Тамом",
      saving: "Захира мешавад...",
      skip: "Гузарондан ва баъдтар пур кардан",
      skipTooltip: "Барои гирифтани нақшаи шахсии кӯчидан ба 5 савол ҷавоб диҳед",
      citizenshipLabel: "Шаҳрвандӣ",
      citizenshipPlaceholder: "Кишвари шаҳрвандии худро ҷустуҷӯ кунед...",
      currentCountryLabel: "Кишвари истиқомати ҳозира",
      currentCountryPlaceholder: "Кишварро ҷустуҷӯ кунед...",
      comingSoon: "Ба зудӣ",
      steps: {
        language: { question: "Забони худро интихоб кунед", subheading: "ReloAI бо шумо ба ин забон гап мезанад." },
        citizenship: { question: "Шаҳрвандии шумо кадом аст?", subheading: "Ба муайян кардани категорияи дурусти раводид кӯмак мекунад." },
        currentCountry: { question: "Ҳозир дар кадом кишвар ҳастед?", subheading: "Имкон медиҳад қадамҳои навбатиро мувофиқи ҷойгиршавии ҳозираи шумо мутобиқ кунем." },
        destination: { question: "Ба куҷо мекӯчед?", subheading: "Мо нақшаи роҳи шуморо ба ин кишвар мутобиқ мекунем." },
        goal: { question: "Ҳадафи асосии шумо чист?", subheading: "Ин муайян мекунад, ки кадом роҳҳоро барои шумо таҳлил мекунем." },
      },
      goalOptions: {
        work: "Кор",
        study: "Таҳсил",
        business: "Кушодани бизнес",
        passiveIncome: "Даромади пассивӣ",
        digitalNomad: "Бодиянишини рақамӣ",
        familyReunification: "Муттаҳидшавии оила",
        other: "Дигар",
      },
      results: {
        heading: "Мо 3 роҳи кӯчидан барои шумо ёфтем",
        loading: "Роҳҳои шахсии шумо сохта мешаванд...",
        selectButton: "Ин роҳро интихоб кунед",
        recommended: "Тавсияшуда",
        speedFast: "Тезкор",
        speedMedium: "Миёнавӣ",
        speedSlow: "Суст",
        difficultyEasy: "Осон",
        difficultyMedium: "Миёнавӣ",
        difficultyHard: "Мушкил",
        approvalRate: "Баҳри таҳқиқ",
        timeline: "Мӯҳлат",
        cost: "Нарх",
      },
    },
  },
};

export function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const code = raw.toLowerCase().split("-")[0];
    if (code === "ru") return "ru";
    if (code === "uz") return "uz";
    if (code === "tr") return "tr";
    if (code === "tg") return "tg";
    // Polish, German, Spanish and all other western/unrecognized locales → English
    if (["en", "pl", "de", "es", "fr", "it", "pt", "nl", "cs", "sk", "hu", "ro", "bg", "uk"].includes(code)) return "en";
  }
  return "en";
}
