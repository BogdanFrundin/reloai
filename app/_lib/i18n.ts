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
    items: { name: string; role: string; quote: string; initials: string }[];
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
  };
  auth: {
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
      googleSignUp: string;
      fullName: string;
      email: string;
      passwordLabel: string;
      submit: string;
      hasAccount: string;
      login: string;
    };
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
  sidebar: {
    documents: string;
    housing: string;
    banks: string;
    medicine: string;
    work: string;
    community: string;
    education: string;
    backToWebsite: string;
  };
  documents: {
    title: string;
    subtitle: string;
    tabs: { all: string; passport: string; pesel: string; workPermit: string; insurance: string; bank: string };
    status: { verified: string; pending: string; missing: string; locked: string };
    upload: string;
    viewBtn: string;
    unlockBtn: string;
    docNames: { passportScan: string; passportPhoto: string; peselForm: string; peselLetter: string; workPermitApp: string; sponsorshipLetter: string; healthInsurance: string; travelInsurance: string; bankConfirmation: string; proofOfFunds: string; relocationLetter: string; taxResidency: string };
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
    rows: [
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
    ];
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
    steps: {
      account: { title: string; desc: string };
      onboarding: { title: string; desc: string };
      visa: { title: string; desc: string };
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
  };
  education: {
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
    quickReplies: [string, string, string, string];
    placeholder: string;
    sendAria: string;
    connectionError: string;
    fallback: {
      pesel: string;
      bank: string;
      housing: string;
      documents: string;
      visa: string;
      default: string;
    };
  };
  onboarding: {
    stepLabel: string;
    back: string;
    continueBtn: string;
    finish: string;
    saving: string;
    steps: {
      language: { question: string; subheading: string };
      country: { question: string; subheading: string };
      citizenship: { question: string; subheading: string };
      currentCountry: { question: string; subheading: string };
      goal: { question: string; subheading: string };
      situation: { question: string; subheading: string };
    };
    goalOptions: {
      poland: { employment: string; business: string; familyReunification: string; study: string };
      default: { work: string; study: string; family: string; digitalNomad: string };
    };
    situationOptions: { home: string; visa: string; shortstay: string; exploring: string };
    countryNames: {
      poland: string;
      ukraine: string;
      russia: string;
      belarus: string;
      kazakhstan: string;
      uzbekistan: string;
      tajikistan: string;
      turkey: string;
      germany: string;
      spain: string;
      other: string;
    };
    alreadyHereSuffix: string;
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
          name: "Olena K.",
          role: "Moved to Berlin, Germany",
          quote:
            "ReloAI turned a mountain of paperwork into a checklist I actually understood. My Blue Card application took half the time I expected.",
          initials: "OK",
        },
        {
          name: "Marco T.",
          role: "Moved to Warsaw, Poland",
          quote:
            "The chat answered every weird question I had about PESEL and banking. Felt like having a relocation consultant in my pocket.",
          initials: "MT",
        },
        {
          name: "Sofia R.",
          role: "Moved to Valencia, Spain",
          quote:
            "I used the Digital Nomad Visa guidance and the document checklist kept me from missing a single deadline. Worth every euro.",
          initials: "SR",
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
    },
    auth: {
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
        googleSignUp: "Sign up with Google",
        fullName: "Full name",
        email: "Email",
        passwordLabel: "Password",
        submit: "Register",
        hasAccount: "Already have an account?",
        login: "Log in",
      },
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
    sidebar: {
      documents: "Documents",
      housing: "Housing",
      banks: "Banks",
      medicine: "Medicine",
      work: "Work",
      community: "Community",
      education: "Education",
      backToWebsite: "Back to website",
    },
    documents: {
      title: "Documents",
      subtitle: "Everything you need for your relocation, in one place.",
      tabs: { all: "All", passport: "Passport", pesel: "PESEL", workPermit: "Work Permit", insurance: "Insurance", bank: "Bank" },
      status: { verified: "Verified", pending: "Pending review", missing: "Missing", locked: "Premium" },
      upload: "Drag & drop or click to upload",
      viewBtn: "View",
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
      rows: [
        { label: "Cost", nfz: "Free with employment contributions", pvt: "150–400 PLN/month" },
        { label: "Wait times", nfz: "Weeks to months for specialists", pvt: "Same day to a few days" },
        { label: "Language support", nfz: "Mostly Polish only", pvt: "English, often Russian/Ukrainian" },
        { label: "Coverage", nfz: "Broad, but limited choice of doctors", pvt: "Choose your own clinic & doctor" },
      ],
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
      steps: {
        account: { title: "Create your account", desc: "You're all set up." },
        onboarding: { title: "Complete onboarding questionnaire", desc: "We used this to build your roadmap." },
        visa: { title: "Check visa eligibility", desc: "You qualify for a Job Seeker Visa or EU Blue Card." },
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
    },
    education: {
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
      quickReplies: ["How do I get a PESEL?", "Which bank should I open?", "How do I find housing?", "What documents do I need?"],
      placeholder: "Ask ReloAI anything...",
      sendAria: "Send message",
      connectionError: "I couldn't reach the server. Please check your connection and try again.",
      fallback: {
        pesel: "To get a PESEL number in Poland: 1) Book an appointment at the Urząd Miasta (city office) in your district. 2) Bring your passport, your visa or residence permit, and proof of address (a rental contract works). 3) Fill out form EL-ZAM on site. Processing is usually same-day to a few days. You'll need your PESEL for almost everything afterward — opening a bank account, signing up for healthcare, and signing contracts.",
        bank: "For banking: mBank is the most expat-friendly option — fully English app and support. Revolut works well even before you have a PESEL number. PKO BP has the largest branch network if you prefer in-person banking. Santander is a good pick if you need multi-currency accounts.",
        housing: "Housing tips: search OLX, Otodom, or Gratka for listings. Never send a deposit before viewing the apartment in person or on a live video call. Get your rental contract in Polish — it has to be in Polish to be legally enforceable. Budget for a security deposit (1–2 months' rent) plus czynsz (building maintenance fees) on top of rent.",
        documents: "Common documents you'll need: passport, visa or residence permit application, proof of address, PESEL confirmation, health insurance certificate, and (if working) your employment contract or work permit. I can walk you through any of these in more detail.",
        visa: "Visa needs depend on your citizenship and destination. For Poland, most non-EU citizens need a national visa or residence permit (Karta Pobytu) tied to work, study, or family. For Germany, look into a Job Seeker Visa, Aufenthaltstitel, or EU Blue Card. For Spain, check the Digital Nomad Visa or standard work/residence routes via NIE registration.",
        default: "I can help with documents, housing, banks, healthcare, or work. What would you like to know more about?",
      },
    },
    onboarding: {
      stepLabel: "Step {current} of {total}",
      back: "Back",
      continueBtn: "Continue",
      finish: "Finish",
      saving: "Saving...",
      steps: {
        language: { question: "Choose your language", subheading: "ReloAI will speak with you in this language." },
        country: { question: "Where are you moving to?", subheading: "We'll tailor your roadmap to this country." },
        citizenship: { question: "What is your citizenship?", subheading: "Helps us point you to the right visa category." },
        currentCountry: { question: "Which country are you currently in?", subheading: "Lets us tailor next steps to where you are right now." },
        goal: { question: "What's your main goal?", subheading: "This decides which visa track we'll guide you through." },
        situation: { question: "What's your current situation?", subheading: "Helps us skip steps you've already completed." },
      },
      goalOptions: {
        poland: { employment: "Employment contract", business: "Own business", familyReunification: "Family reunification", study: "Study" },
        default: { work: "Work", study: "Study", family: "Family", digitalNomad: "Digital Nomad" },
      },
      situationOptions: {
        home: "Still in my home country",
        visa: "I already hold a visa",
        shortstay: "Already there on a short stay",
        exploring: "Just exploring my options",
      },
      countryNames: {
        poland: "Poland",
        ukraine: "Ukraine",
        russia: "Russia",
        belarus: "Belarus",
        kazakhstan: "Kazakhstan",
        uzbekistan: "Uzbekistan",
        tajikistan: "Tajikistan",
        turkey: "Turkey",
        germany: "Germany",
        spain: "Spain",
        other: "Other",
      },
      alreadyHereSuffix: "(already here)",
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
          name: "Olena K.",
          role: "Переехала в Берлин, Германия",
          quote:
            "ReloAI превратил гору документов в понятный чек-лист. Заявку на Blue Card я оформила в два раза быстрее, чем ожидала.",
          initials: "OK",
        },
        {
          name: "Marco T.",
          role: "Переехал в Варшаву, Польша",
          quote:
            "Чат ответил на все мои странные вопросы про PESEL и банк. Как будто у меня в кармане свой консультант по переезду.",
          initials: "MT",
        },
        {
          name: "Sofia R.",
          role: "Переехала в Валенсию, Испания",
          quote:
            "Я воспользовалась гидом по Digital Nomad Visa, а чек-лист документов не дал пропустить ни одного срока. Каждое евро стоило того.",
          initials: "SR",
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
    },
    auth: {
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
        googleSignUp: "Зарегистрироваться через Google",
        fullName: "Полное имя",
        email: "Email",
        passwordLabel: "Пароль",
        submit: "Зарегистрироваться",
        hasAccount: "Уже есть аккаунт?",
        login: "Войти",
      },
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
    sidebar: {
      documents: "Документы",
      housing: "Жильё",
      banks: "Банки",
      medicine: "Медицина",
      work: "Работа",
      community: "Сообщество",
      education: "Образование",
      backToWebsite: "На сайт",
    },
    documents: {
      title: "Документы",
      subtitle: "Всё необходимое для переезда — в одном месте.",
      tabs: { all: "Все", passport: "Паспорт", pesel: "PESEL", workPermit: "Разрешение на работу", insurance: "Страховка", bank: "Банк" },
      status: { verified: "Проверено", pending: "На проверке", missing: "Отсутствует", locked: "Premium" },
      upload: "Перетащите файл или нажмите, чтобы загрузить",
      viewBtn: "Просмотр",
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
      rows: [
        { label: "Стоимость", nfz: "Бесплатно при трудовых отчислениях", pvt: "150–400 злотых/месяц" },
        { label: "Время ожидания", nfz: "От недель до месяцев к специалистам", pvt: "От пары дней до того же дня" },
        { label: "Языковая поддержка", nfz: "В основном только польский", pvt: "Английский, часто русский/украинский" },
        { label: "Охват", nfz: "Широкий, но ограниченный выбор врачей", pvt: "Выбирайте свою клинику и врача" },
      ],
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
      steps: {
        account: { title: "Создайте аккаунт", desc: "Всё готово." },
        onboarding: { title: "Заполните анкету онбординга", desc: "Мы использовали её, чтобы составить ваш план." },
        visa: { title: "Проверьте визовую подходимость", desc: "Вы подходите под Job Seeker Visa или EU Blue Card." },
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
      perMonth: "в месяц",
      freeName: "Бесплатно",
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
    },
    education: {
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
      quickReplies: ["Как получить PESEL?", "Какой банк открыть?", "Как найти жильё?", "Какие документы нужны?"],
      placeholder: "Спросите ReloAI о чём угодно...",
      sendAria: "Отправить сообщение",
      connectionError: "Не удалось связаться с сервером. Проверьте соединение и попробуйте снова.",
      fallback: {
        pesel: "Чтобы получить номер PESEL в Польше: 1) Запишитесь на приём в Urząd Miasta (городское управление) вашего района. 2) Возьмите с собой паспорт, визу или вид на жительство и подтверждение адреса (подойдёт договор аренды). 3) Заполните на месте форму EL-ZAM. Обработка обычно занимает от одного дня до нескольких. PESEL понадобится вам почти для всего в дальнейшем — открытия банковского счёта, оформления медицинской страховки и подписания договоров.",
        bank: "По банкам: mBank — самый удобный вариант для экспатов, полностью на английском языке. Revolut отлично работает даже до получения PESEL. У PKO BP самая большая сеть отделений, если вы предпочитаете обслуживание лично. Santander хорош, если нужны мультивалютные счета.",
        housing: "Советы по жилью: ищите объявления на OLX, Otodom или Gratka. Никогда не переводите депозит, не осмотрев квартиру лично или по видеосвязи. Договор аренды должен быть на польском языке, чтобы иметь юридическую силу. Заложите в бюджет залог (аренда за 1–2 месяца) плюс czynsz (плата за обслуживание дома) сверх аренды.",
        documents: "Обычно нужны следующие документы: паспорт, заявление на визу или вид на жительство, подтверждение адреса, справка о PESEL, полис медицинской страховки и (если работаете) трудовой договор или разрешение на работу. Могу подробнее рассказать про любой из них.",
        visa: "Визовые требования зависят от вашего гражданства и страны назначения. Для Польши большинству граждан не из ЕС нужна национальная виза или вид на жительство (Karta Pobytu), связанные с работой, учёбой или семьёй. Для Германии рассмотрите Job Seeker Visa, Aufenthaltstitel или EU Blue Card. Для Испании — Digital Nomad Visa или обычные пути через рабочий/жительский статус и регистрацию NIE.",
        default: "Я могу помочь с документами, жильём, банками, медициной или работой. Что вас интересует подробнее?",
      },
    },
    onboarding: {
      stepLabel: "Шаг {current} из {total}",
      back: "Назад",
      continueBtn: "Продолжить",
      finish: "Готово",
      saving: "Сохранение...",
      steps: {
        language: { question: "Выберите язык", subheading: "ReloAI будет общаться с вами на этом языке." },
        country: { question: "Куда вы переезжаете?", subheading: "Мы адаптируем ваш план под эту страну." },
        citizenship: { question: "Какое у вас гражданство?", subheading: "Поможет определить подходящую визовую категорию." },
        currentCountry: { question: "В какой стране вы сейчас находитесь?", subheading: "Позволит адаптировать следующие шаги под ваше текущее местоположение." },
        goal: { question: "Какова ваша основная цель?", subheading: "Это определит, по какому визовому пути мы вас поведём." },
        situation: { question: "Какая у вас текущая ситуация?", subheading: "Поможет пропустить уже пройденные шаги." },
      },
      goalOptions: {
        poland: { employment: "Работа по найму", business: "Собственный бизнес", familyReunification: "Воссоединение семьи", study: "Учёба" },
        default: { work: "Работа", study: "Учёба", family: "Семья", digitalNomad: "Цифровой кочевник" },
      },
      situationOptions: {
        home: "Ещё в своей стране",
        visa: "У меня уже есть виза",
        shortstay: "Уже здесь по краткосрочному пребыванию",
        exploring: "Просто изучаю варианты",
      },
      countryNames: {
        poland: "Польша",
        ukraine: "Украина",
        russia: "Россия",
        belarus: "Беларусь",
        kazakhstan: "Казахстан",
        uzbekistan: "Узбекистан",
        tajikistan: "Таджикистан",
        turkey: "Турция",
        germany: "Германия",
        spain: "Испания",
        other: "Другое",
      },
      alreadyHereSuffix: "(уже здесь)",
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
          name: "Olena K.",
          role: "Berlin, Germaniyaga ko'chdi",
          quote:
            "ReloAI qog'ozlar tog'ini men tushunadigan ro'yxatga aylantirdi. Blue Card arizam kutganimdan ikki marta tez tayyor bo'ldi.",
          initials: "OK",
        },
        {
          name: "Marco T.",
          role: "Varshava, Polshaga ko'chdi",
          quote:
            "Chat PESEL va bank haqidagi g'alati savollarimning hammasiga javob berdi. Cho'ntagimda ko'chish bo'yicha maslahatchi bordek edi.",
          initials: "MT",
        },
        {
          name: "Sofia R.",
          role: "Valensiya, Ispaniyaga ko'chdi",
          quote:
            "Digital Nomad Visa bo'yicha maslahatdan foydalandim, hujjatlar ro'yxati esa bironta muddatni o'tkazib yubormasligimga yordam berdi. Har bir yevroga arzigan.",
          initials: "SR",
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
    },
    auth: {
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
        googleSignUp: "Google orqali ro'yxatdan o'tish",
        fullName: "To'liq ism",
        email: "Email",
        passwordLabel: "Parol",
        submit: "Ro'yxatdan o'tish",
        hasAccount: "Allaqachon hisobingiz bormi?",
        login: "Kirish",
      },
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
    sidebar: {
      documents: "Hujjatlar",
      housing: "Uy-joy",
      banks: "Banklar",
      medicine: "Tibbiyot",
      work: "Ish",
      community: "Jamiyat",
      education: "Ta'lim",
      backToWebsite: "Saytga qaytish",
    },
    documents: {
      title: "Hujjatlar",
      subtitle: "Ko'chib o'tishingiz uchun kerak bo'lgan hamma narsa bir joyda.",
      tabs: { all: "Barchasi", passport: "Pasport", pesel: "PESEL", workPermit: "Ish ruxsatnomasi", insurance: "Sug'urta", bank: "Bank" },
      status: { verified: "Tasdiqlangan", pending: "Ko'rib chiqilmoqda", missing: "Yo'q", locked: "Premium" },
      upload: "Yuklash uchun sudrab tashlang yoki bosing",
      viewBtn: "Ko'rish",
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
      rows: [
        { label: "Narxi", nfz: "Ish haqidan ajratmalar to'langanda bepul", pvt: "Oyiga 150–400 PLN" },
        { label: "Kutish muddati", nfz: "Mutaxassislar uchun bir necha haftadan oygacha", pvt: "Bir kundan bir necha kungacha" },
        { label: "Til qo'llab-quvvatlashi", nfz: "Asosan faqat polyak tilida", pvt: "Ingliz, ko'pincha rus/ukrain tilida ham" },
        { label: "Qamrov", nfz: "Keng, ammo shifokor tanlovi cheklangan", pvt: "O'zingiz klinika va shifokorni tanlaysiz" },
      ],
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
      steps: {
        account: { title: "Hisobingizni yarating", desc: "Hammasi tayyor." },
        onboarding: { title: "Kirish so'rovnomasini to'ldiring", desc: "Biz buni yo'l xaritangizni tuzish uchun ishlatdik." },
        visa: { title: "Viza olish huquqini tekshiring", desc: "Siz Ish qidiruvchi vizasi yoki EU Blue Card olish huquqiga egasiz." },
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
    },
    education: {
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
      quickReplies: ["PESEL qanday olinadi?", "Qaysi bankda hisob ochsam bo'ladi?", "Uy-joyni qanday topsam bo'ladi?", "Qanday hujjatlar kerak?"],
      placeholder: "ReloAI'dan istalgan narsani so'rang...",
      sendAria: "Xabar yuborish",
      connectionError: "Serverga ulanib bo'lmadi. Internet aloqangizni tekshirib, qayta urinib ko'ring.",
      fallback: {
        pesel: "Polshada PESEL raqamini olish uchun: 1) Tumaningizdagi Urząd Miasta (shahar idorasi)ga uchrashuvga yoziling. 2) Pasportingiz, viza yoki yashash ruxsatnomangiz va manzil tasdiqnomasini (ijara shartnomasi ham bo'ladi) olib boring. 3) Joyida EL-ZAM shaklini to'ldiring. Odatda bir kundan bir necha kungacha vaqt oladi. PESEL keyinchalik deyarli hamma narsa uchun kerak bo'ladi — bank hisobi ochish, tibbiy sug'urtaga yozilish va shartnomalarni imzolash.",
        bank: "Banklar bo'yicha: mBank chet elliklar uchun eng qulayi — to'liq ingliz tilida ilova va qo'llab-quvvatlash. Revolut hatto PESEL olishdan oldin ham yaxshi ishlaydi. Agar shaxsan xizmat ko'rsatishni afzal ko'rsangiz, PKO BP eng katta filiallar tarmog'iga ega. Ko'p valyutali hisob kerak bo'lsa, Santander yaxshi tanlov.",
        housing: "Uy-joy bo'yicha maslahatlar: OLX, Otodom yoki Gratka saytlarida e'lonlarni qidiring. Kvartirani shaxsan yoki jonli video orqali ko'rmasdan hech qachon depozit yubormang. Ijara shartnomangiz polyak tilida bo'lishi kerak — aks holda yuridik kuchga ega bo'lmaydi. Ijaradan tashqari kafolat depoziti (1–2 oylik ijara) va czynsz (bino xizmat haqi) uchun ham byudjet ajrating.",
        documents: "Odatda kerak bo'ladigan hujjatlar: pasport, viza yoki yashash ruxsatnomasi arizasi, manzil tasdiqnomasi, PESEL tasdiqnomasi, tibbiy sug'urta sertifikati va (agar ishlasangiz) mehnat shartnomasi yoki ish ruxsatnomasi. Bularning har biri haqida batafsilroq gapirib bera olaman.",
        visa: "Viza talablari fuqaroligingiz va boradigan davlatingizga bog'liq. Polsha uchun ko'pchilik EI fuqarosi bo'lmaganlarga ish, o'qish yoki oila asosida milliy viza yoki yashash ruxsatnomasi (Karta Pobytu) kerak bo'ladi. Germaniya uchun Job Seeker Visa, Aufenthaltstitel yoki EU Blue Card'ni ko'rib chiqing. Ispaniya uchun Digital Nomad Visa yoki NIE ro'yxatidan o'tish orqali oddiy ish/yashash yo'llarini tekshiring.",
        default: "Men hujjatlar, uy-joy, banklar, tibbiyot yoki ish bo'yicha yordam bera olaman. Qaysi biri haqida batafsilroq bilmoqchisiz?",
      },
    },
    onboarding: {
      stepLabel: "{total} dan {current}-qadam",
      back: "Orqaga",
      continueBtn: "Davom etish",
      finish: "Tayyor",
      saving: "Saqlanmoqda...",
      steps: {
        language: { question: "Tilni tanlang", subheading: "ReloAI siz bilan shu tilda gaplashadi." },
        country: { question: "Qayerga ko'chib o'tyapsiz?", subheading: "Yo'l xaritangizni shu davlatga moslashtiramiz." },
        citizenship: { question: "Fuqaroligingiz qaysi davlatga tegishli?", subheading: "Bu to'g'ri viza toifasini aniqlashga yordam beradi." },
        currentCountry: { question: "Hozir qaysi davlatdasiz?", subheading: "Keyingi qadamlarni hozirgi joylashuvingizga moslashtirishga yordam beradi." },
        goal: { question: "Asosiy maqsadingiz nima?", subheading: "Bu qaysi viza yo'lini tanlashimizni belgilaydi." },
        situation: { question: "Hozirgi holatingiz qanday?", subheading: "Allaqachon bajargan qadamlaringizni o'tkazib yuborishga yordam beradi." },
      },
      goalOptions: {
        poland: { employment: "Mehnat shartnomasi", business: "O'z biznesi", familyReunification: "Oilaviy birlashuv", study: "O'qish" },
        default: { work: "Ish", study: "O'qish", family: "Oila", digitalNomad: "Raqamli ko'chmanchi" },
      },
      situationOptions: {
        home: "Hali o'z davlatimdaman",
        visa: "Vizam allaqachon bor",
        shortstay: "Qisqa muddatli tashrif bilan allaqachon u yerdaman",
        exploring: "Shunchaki variantlarni ko'rib chiqyapman",
      },
      countryNames: {
        poland: "Polsha",
        ukraine: "Ukraina",
        russia: "Rossiya",
        belarus: "Belarus",
        kazakhstan: "Qozog'iston",
        uzbekistan: "O'zbekiston",
        tajikistan: "Tojikiston",
        turkey: "Turkiya",
        germany: "Germaniya",
        spain: "Ispaniya",
        other: "Boshqa",
      },
      alreadyHereSuffix: "(allaqachon shu yerda)",
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
          name: "Olena K.",
          role: "Berlin, Almanya'ya taşındı",
          quote:
            "ReloAI bir evrak dağını anlayabildiğim bir kontrol listesine dönüştürdü. Mavi Kart başvurum beklediğimin yarı süresinde tamamlandı.",
          initials: "OK",
        },
        {
          name: "Marco T.",
          role: "Varşova, Polonya'ya taşındı",
          quote:
            "Sohbet, PESEL ve bankacılıkla ilgili tuhaf sorularımın hepsini yanıtladı. Cebimde bir taşınma danışmanı varmış gibi hissettim.",
          initials: "MT",
        },
        {
          name: "Sofia R.",
          role: "Valensiya, İspanya'ya taşındı",
          quote:
            "Dijital Göçebe Vizesi rehberliğini kullandım ve belge kontrol listesi tek bir son tarihi kaçırmamamı sağladı. Her avroya değdi.",
          initials: "SR",
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
    },
    auth: {
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
        googleSignUp: "Google ile kayıt ol",
        fullName: "Ad Soyad",
        email: "E-posta",
        passwordLabel: "Şifre",
        submit: "Kayıt ol",
        hasAccount: "Zaten hesabınız var mı?",
        login: "Giriş yap",
      },
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
    sidebar: {
      documents: "Belgeler",
      housing: "Konut",
      banks: "Bankalar",
      medicine: "Sağlık",
      work: "İş",
      community: "Topluluk",
      education: "Eğitim",
      backToWebsite: "Siteye dön",
    },
    documents: {
      title: "Belgeler",
      subtitle: "Taşınmanız için ihtiyacınız olan her şey tek bir yerde.",
      tabs: { all: "Tümü", passport: "Pasaport", pesel: "PESEL", workPermit: "Çalışma İzni", insurance: "Sigorta", bank: "Banka" },
      status: { verified: "Onaylandı", pending: "İnceleniyor", missing: "Eksik", locked: "Premium" },
      upload: "Yüklemek için sürükleyin veya tıklayın",
      viewBtn: "Görüntüle",
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
      rows: [
        { label: "Maliyet", nfz: "İstihdam katkı payları ile ücretsiz", pvt: "Ayda 150–400 PLN" },
        { label: "Bekleme süresi", nfz: "Uzmanlar için haftalar-aylar", pvt: "Aynı günden birkaç güne" },
        { label: "Dil desteği", nfz: "Genellikle sadece Lehçe", pvt: "İngilizce, sık sık Rusça/Ukraynaca" },
        { label: "Kapsam", nfz: "Geniş ama sınırlı doktor seçimi", pvt: "Kendi kliniğinizi ve doktorunuzu seçin" },
      ],
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
      steps: {
        account: { title: "Hesabınızı oluşturun", desc: "Her şey hazır." },
        onboarding: { title: "Başlangıç anketini tamamlayın", desc: "Bunu yol haritanızı oluşturmak için kullandık." },
        visa: { title: "Vize uygunluğunu kontrol edin", desc: "Job Seeker Visa veya EU Blue Card için uygunsunuz." },
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
    },
    education: {
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
      quickReplies: ["PESEL nasıl alınır?", "Hangi bankada hesap açmalıyım?", "Konutu nasıl bulabilirim?", "Hangi belgeler gerekli?"],
      placeholder: "ReloAI'ya istediğinizi sorun...",
      sendAria: "Mesaj gönder",
      connectionError: "Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edip tekrar deneyin.",
      fallback: {
        pesel: "Polonya'da PESEL numarası almak için: 1) Bölgenizdeki Urząd Miasta'da (belediye) randevu alın. 2) Pasaportunuzu, vize veya oturma izninizi ve adres kanıtınızı (kira sözleşmesi de olur) yanınıza alın. 3) Orada EL-ZAM formunu doldurun. İşlem genellikle aynı gün ile birkaç gün arasında sürer. PESEL'e sonrasında neredeyse her şey için ihtiyacınız olacak — banka hesabı açmak, sağlık sigortasına kaydolmak ve sözleşme imzalamak gibi.",
        bank: "Bankacılık için: mBank göçmenler için en uygun seçenek — tamamen İngilizce uygulama ve destek. Revolut, PESEL almadan önce bile iyi çalışır. Şubeden işlem yapmayı tercih ediyorsanız PKO BP en geniş şube ağına sahiptir. Çoklu para birimi hesabına ihtiyacınız varsa Santander iyi bir seçimdir.",
        housing: "Konut ipuçları: OLX, Otodom veya Gratka'da ilan arayın. Daireyi şahsen veya canlı görüntülü görüşmeyle görmeden asla depozito göndermeyin. Kira sözleşmenizin yasal geçerliliği için Lehçe olması gerekir. Kiraya ek olarak bir depozito (1–2 aylık kira) ve czynsz (bina bakım ücreti) için bütçe ayırın.",
        documents: "Genellikle ihtiyacınız olan belgeler: pasaport, vize veya oturma izni başvurusu, adres kanıtı, PESEL onayı, sağlık sigortası belgesi ve (çalışıyorsanız) iş sözleşmeniz veya çalışma izniniz. Bunlardan herhangi birini daha ayrıntılı anlatabilirim.",
        visa: "Vize ihtiyaçları vatandaşlığınıza ve gideceğiniz ülkeye göre değişir. Polonya için çoğu AB dışı vatandaşın iş, eğitim veya aile temelli ulusal vize veya oturma iznine (Karta Pobytu) ihtiyacı vardır. Almanya için Job Seeker Visa, Aufenthaltstitel veya EU Blue Card'a bakın. İspanya için Digital Nomad Visa'yı veya NIE kaydı üzerinden standart çalışma/oturma yollarını inceleyin.",
        default: "Belgeler, konut, bankalar, sağlık veya iş konusunda yardımcı olabilirim. Hangisi hakkında daha fazla bilgi almak istersiniz?",
      },
    },
    onboarding: {
      stepLabel: "Adım {current} / {total}",
      back: "Geri",
      continueBtn: "Devam et",
      finish: "Bitir",
      saving: "Kaydediliyor...",
      steps: {
        language: { question: "Dilinizi seçin", subheading: "ReloAI sizinle bu dilde konuşacak." },
        country: { question: "Nereye taşınıyorsunuz?", subheading: "Yol haritanızı bu ülkeye göre uyarlayacağız." },
        citizenship: { question: "Vatandaşlığınız nedir?", subheading: "Doğru vize kategorisini belirlememize yardımcı olur." },
        currentCountry: { question: "Şu anda hangi ülkedesiniz?", subheading: "Sonraki adımları bulunduğunuz yere göre uyarlamamızı sağlar." },
        goal: { question: "Ana hedefiniz nedir?", subheading: "Bu, sizi hangi vize sürecinde yönlendireceğimizi belirler." },
        situation: { question: "Mevcut durumunuz nedir?", subheading: "Zaten tamamladığınız adımları atlamamıza yardımcı olur." },
      },
      goalOptions: {
        poland: { employment: "İş sözleşmesi", business: "Kendi işi", familyReunification: "Aile birleşimi", study: "Eğitim" },
        default: { work: "İş", study: "Eğitim", family: "Aile", digitalNomad: "Dijital göçebe" },
      },
      situationOptions: {
        home: "Hâlâ kendi ülkemdeyim",
        visa: "Zaten bir vizem var",
        shortstay: "Kısa süreli kalışla zaten oradayım",
        exploring: "Sadece seçenekleri araştırıyorum",
      },
      countryNames: {
        poland: "Polonya",
        ukraine: "Ukrayna",
        russia: "Rusya",
        belarus: "Belarus",
        kazakhstan: "Kazakistan",
        uzbekistan: "Özbekistan",
        tajikistan: "Tacikistan",
        turkey: "Türkiye",
        germany: "Almanya",
        spain: "İspanya",
        other: "Diğer",
      },
      alreadyHereSuffix: "(zaten buradayım)",
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
          name: "Olena K.",
          role: "Ба Берлин, Олмон кӯчид",
          quote:
            "ReloAI кӯҳи коғазҳоро ба рӯйхати фаҳмо табдил дод. Аризаи Blue Card ман дар нисфи вақти интизорам тайёр шуд.",
          initials: "OK",
        },
        {
          name: "Marco T.",
          role: "Ба Варшава, Лаҳистон кӯчид",
          quote:
            "Чат ба ҳама саволҳои аҷиби ман дар бораи PESEL ва бонк ҷавоб дод. Ҳис мекардам, ки маслиҳатгари кӯчиш дар киса дорам.",
          initials: "MT",
        },
        {
          name: "Sofia R.",
          role: "Ба Валенсия, Испания кӯчид",
          quote:
            "Ман аз роҳнамои Digital Nomad Visa истифода бурдам ва рӯйхати ҳуҷҷатҳо нагузошт ки ягон мӯҳлатро гум кунам. Арзиши ҳар як евроро дошт.",
          initials: "SR",
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
    },
    auth: {
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
        googleSignUp: "Тавассути Google бақайдгирӣ кунед",
        fullName: "Номи пурра",
        email: "Email",
        passwordLabel: "Парол",
        submit: "Бақайдгирӣ",
        hasAccount: "Аллакай аккаунт доред?",
        login: "Ворид шавед",
      },
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
    sidebar: {
      documents: "Ҳуҷҷатҳо",
      housing: "Манзил",
      banks: "Бонкҳо",
      medicine: "Тибб",
      work: "Кор",
      community: "Ҷамъият",
      education: "Таҳсил",
      backToWebsite: "Бозгашт ба сайт",
    },
    documents: {
      title: "Ҳуҷҷатҳо",
      subtitle: "Барои кӯчиданатон лозим будаи ҳама чиз дар як ҷо.",
      tabs: { all: "Ҳама", passport: "Шиноснома", pesel: "PESEL", workPermit: "Иҷозати кор", insurance: "Бима", bank: "Бонк" },
      status: { verified: "Тасдиқшуда", pending: "Дар баррасӣ", missing: "Мавҷуд нест", locked: "Премиум" },
      upload: "Барои боркунӣ кашида гузоред ё зер кунед",
      viewBtn: "Дидан",
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
      rows: [
        { label: "Арзиш", nfz: "Ҳангоми пардохти андозҳои меҳнатӣ ройгон", pvt: "150–400 PLN дар моҳ" },
        { label: "Мӯҳлати интизорӣ", nfz: "Барои мутахассисон аз чанд ҳафта то чанд моҳ", pvt: "Аз ҳамон рӯз то якчанд рӯз" },
        { label: "Дастгирии забонӣ", nfz: "Асосан танҳо бо забони полякӣ", pvt: "Англисӣ, аксар вақт русӣ/украинӣ" },
        { label: "Фарогирӣ", nfz: "Васеъ, вале интихоби духтур маҳдуд", pvt: "Клиника ва духтуратонро худатон интихоб кунед" },
      ],
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
      steps: {
        account: { title: "Аккаунти худро эҷод кунед", desc: "Ҳама чиз омода аст." },
        onboarding: { title: "Анкетаи аввалияро пур кунед", desc: "Мо инро барои сохтани нақшаи роҳи шумо истифода бурдем." },
        visa: { title: "Ҳуқуқи гирифтани раводидро санҷед", desc: "Шумо барои Раводиди ҷустуҷӯи кор ё EU Blue Card ҳуқуқ доред." },
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
    },
    education: {
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
      quickReplies: ["Чӣ тавр PESEL гирифта мешавад?", "Кадом бонкро кушоям?", "Чӣ тавр манзил ёбам?", "Кадом ҳуҷҷатҳо лозиманд?"],
      placeholder: "Аз ReloAI дилхоҳ чизро бипурсед...",
      sendAria: "Фиристодани паём",
      connectionError: "Пайваст шудан ба сервер имконнопазир буд. Лутфан пайвастшавии худро санҷед ва боз кӯшиш кунед.",
      fallback: {
        pesel: "Барои гирифтани рақами PESEL дар Полша: 1) Дар Urząd Miasta (идораи шаҳр)-и ноҳияи худ вохӯрӣ ба қайд гиред. 2) Шиноснома, раводид ё иҷозати истиқомат ва тасдиқи суроғаи худро (шартномаи иҷора ҳам мешавад) бо худ гиред. 3) Дар ҷо шакли EL-ZAM-ро пур кунед. Коркард одатан аз як рӯз то якчанд рӯзро мегирад. PESEL баъдан барои қариб ҳама чиз лозим мешавад — кушодани ҳисоби бонкӣ, номнависӣ барои суғуртаи тиббӣ ва имзои шартномаҳо.",
        bank: "Дар бораи бонкҳо: mBank беҳтарин гузина барои муҳоҷирон аст — барномаи пурра ба забони англисӣ ва дастгирӣ. Revolut ҳатто пеш аз гирифтани PESEL хуб кор мекунад. Агар хидматрасонии шахсиро бартарӣ диҳед, PKO BP бузургтарин шабакаи филиалҳоро дорад. Агар ҳисоби бисёрвалютавӣ лозим бошад, Santander интихоби хубест.",
        housing: "Маслиҳатҳо оид ба манзил: дар OLX, Otodom ё Gratka эълонҳоро ҷустуҷӯ кунед. Ҳеҷ гоҳ пеш аз дидани хона шахсан ё тавассути видеои зинда пешпардохт нафиристед. Шартномаи иҷораи шумо бояд ба забони полякӣ бошад — вагарна қувваи ҳуқуқӣ надорад. Ба ғайр аз иҷора барои пешпардохти кафолатӣ (иҷораи 1–2 моҳ) ва czynsz (ҳаққи нигоҳдории бино) ҳам буҷа ҷудо кунед.",
        documents: "Одатан ин ҳуҷҷатҳо лозиманд: шиноснома, аризаи раводид ё иҷозати истиқомат, тасдиқи суроға, тасдиқи PESEL, шаҳодатномаи суғуртаи тиббӣ ва (агар кор кунед) шартномаи меҳнатӣ ё иҷозати кор. Метавонам дар бораи ҳар кадоми онҳо муфассалтар нақл кунам.",
        visa: "Талаботи раводид аз шаҳрвандӣ ва кишвари мақсади шумо вобаста аст. Барои Полша аксари шаҳрвандони ғайри ИА ба раводиди миллӣ ё иҷозати истиқомат (Karta Pobytu), ки бо кор, таҳсил ё оила алоқаманд аст, ниёз доранд. Барои Олмон ба Job Seeker Visa, Aufenthaltstitel ё EU Blue Card нигаред. Барои Испания Digital Nomad Visa ё роҳҳои муқаррарии кор/истиқомат тавассути қайди NIE-ро санҷед.",
        default: "Ман метавонам дар бораи ҳуҷҷатҳо, манзил, бонкҳо, тиб ё кор кӯмак расонам. Дар бораи кадоме бештар донистан мехоҳед?",
      },
    },
    onboarding: {
      stepLabel: "Қадами {current} аз {total}",
      back: "Бозгашт",
      continueBtn: "Идома",
      finish: "Тамом",
      saving: "Захира мешавад...",
      steps: {
        language: { question: "Забони худро интихоб кунед", subheading: "ReloAI бо шумо ба ин забон гап мезанад." },
        country: { question: "Ба куҷо мекӯчед?", subheading: "Мо нақшаи роҳи шуморо ба ин кишвар мутобиқ мекунем." },
        citizenship: { question: "Шаҳрвандии шумо кадом аст?", subheading: "Ба муайян кардани категорияи дурусти раводид кӯмак мекунад." },
        currentCountry: { question: "Ҳозир дар кадом кишвар ҳастед?", subheading: "Имкон медиҳад қадамҳои навбатиро мувофиқи ҷойгиршавии ҳозираи шумо мутобиқ кунем." },
        goal: { question: "Ҳадафи асосии шумо чист?", subheading: "Ин муайян мекунад, ки шуморо аз кадом роҳи раводид роҳнамоӣ кунем." },
        situation: { question: "Вазъи ҳозираи шумо чӣ гуна аст?", subheading: "Кӯмак мекунад, ки қадамҳои аллакай иҷрошударо гузаронем." },
      },
      goalOptions: {
        poland: { employment: "Шартномаи меҳнатӣ", business: "Бизнеси худ", familyReunification: "Муттаҳидшавии оила", study: "Таҳсил" },
        default: { work: "Кор", study: "Таҳсил", family: "Оила", digitalNomad: "Бодиянишини рақамӣ" },
      },
      situationOptions: {
        home: "Ҳанӯз дар кишвари худам",
        visa: "Ман аллакай раводид дорам",
        shortstay: "Аллакай бо иқомати кӯтоҳмуддат он ҷоям",
        exploring: "Танҳо гузинаҳоро меомӯзам",
      },
      countryNames: {
        poland: "Полша",
        ukraine: "Украина",
        russia: "Русия",
        belarus: "Белоруссия",
        kazakhstan: "Қазоқистон",
        uzbekistan: "Ӯзбекистон",
        tajikistan: "Тоҷикистон",
        turkey: "Туркия",
        germany: "Олмон",
        spain: "Испания",
        other: "Дигар",
      },
      alreadyHereSuffix: "(аллакай ин ҷоям)",
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
