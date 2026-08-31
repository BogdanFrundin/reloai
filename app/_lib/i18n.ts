export type Lang = "ru" | "en" | "uz" | "tr" | "tg" | "uk";

export const LANGUAGES: { code: Lang; flag: string; name: string }[] = [
  { code: "ru", flag: "ru", name: "Русский" },
  { code: "en", flag: "gb", name: "English" },
  { code: "uz", flag: "uz", name: "Uzbek" },
  { code: "tr", flag: "tr", name: "Türkçe" },
  { code: "tg", flag: "tj", name: "Тоҷикӣ" },
  { code: "uk", flag: "ua", name: "Українська" },
];

export const DEFAULT_LANG: Lang = "ru";

export type Dictionary = {
  nav: {
    howItWorks: string;
    features: string;
    countries: string;
    pricing: string;
    reviews: string;
    faq: string;
    login: string;
    getStarted: string;
    goToDashboard: string;
  };
  common: {
    cancelBtn: string;
    logoutBtn: string;
    logoutConfirmTitle: string;
    logoutConfirmBody: string;
    cityLabel: string;
    chosenByCountTemplate: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subtext: string;
    getStarted: string;
    seeHowItWorks: string;
    trustCountries: string;
    trustLanguages: string;
    trustFree: string;
    trustSocialProof: string;
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
    docQuestion: string;
    docResponse: string;
    inputPlaceholder: string;
    docCardPassportTitle: string;
    docCardPassportSubtitle: string;
    docCardInsuranceTitle: string;
    docCardInsuranceSubtitle: string;
    docStatusDone: string;
    docStatusPending: string;
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
    list: { flag: string; name: string; nameDeclined?: string; highlight: string; points: string[] }[];
    planMyMoveTo: string;
  };
  directions: {
    label: string;
    heading: string;
    subheading: string;
    comingSoonBadge: string;
    ctaLabel: string;
    comingSoonCta: string;
    cards: [{ name: string; subtitle: string }, { name: string; subtitle: string }, { name: string; subtitle: string }];
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
      documentBadge?: { country: string; label: string };
    }[];
  };
  faq: {
    heading: string;
    subheading: string;
    items: { question: string; answer: string }[];
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
    backToLanding: string;
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
      confirmPasswordLabel: string;
      passwordMismatch: string;
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
    logOut: string;
    planLabel: string;
    upgradeTooltip: string;
    upgradeBadge: string;
    upgradeToProBadge: string;
    maxPlanBadge: string;
    unnamed: string;
    memberSinceLabel: string;
    personalSection: string;
    relocationSection: string;
    destinationLabel: string;
    routeLabel: string;
    noRouteSelected: string;
    chooseRoute: string;
    routeModalSubheading: string;
    jobOfferLabel: string;
    alreadyAdmittedLabel: string;
    yes: string;
    no: string;
    notSet: string;
    progressSection: string;
    currentStepLabel: string;
    stepsCompletedLabel: string;
    allStepsDone: string;
    documentsSection: string;
    viewAllDocuments: string;
    editBtn: string;
    changeRouteBtn: string;
    editModalTitle: string;
    cityLabel: string;
    cityPlaceholder: string;
    saveBtn: string;
    saved: string;
  };
  topbar: {
    searchPlaceholder: string;
    upgrade: string;
    openMenuAria: string;
    avatarAria: string;
  };
  notifications: {
    bellAria: string;
    title: string;
    markAllRead: string;
    empty: string;
    registrationTitle: string;
    registrationMessage: string;
    welcomeTitle: string;
    welcomeMessage: string;
    checklistTitle: string;
    checklistMessage: string;
    inactivityTitle: string;
    inactivityMessage: string;
    documentTitle: string;
    documentMessage: string;
  };
  sidebar: {
    documents: string;
    housing: string;
    banks: string;
    medicine: string;
    insurance: string;
    work: string;
    community: string;
    education: string;
    otherServices: string;
    profile: string;
    settings: string;
    logout: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageSection: string;
    languageDesc: string;
    currencySection: string;
    currencyDesc: string;
    saving: string;
    themeSection: string;
    themeDesc: string;
    themeDark: string;
    themeLight: string;
    notifications: string;
    notifEmail: string;
    notifEmailDesc: string;
    notifDocuments: string;
    notifDocumentsDesc: string;
    notifProduct: string;
    notifProductDesc: string;
    accountSection: string;
    nameLabel: string;
    emailLabel: string;
    saveBtn: string;
    saved: string;
    dangerSection: string;
    dangerDesc: string;
    deleteAccountBtn: string;
    deleteConfirmTitle: string;
    deleteConfirmBody: string;
    deleteConfirmBtn: string;
  };
  documents: {
    title: string;
    subtitle: string;
    tabs: {
      all: string;
      passport: string;
      pesel: string;
      workPermit: string;
      insurance: string;
      bank: string;
      biometric: string;
      address: string;
      residencePermit: string;
      taxId: string;
      employment: string;
      business: string;
    };
    status: { verified: string; pending: string; missing: string; locked: string };
    upload: string;
    uploadBtn: string;
    addDocumentBtn: string;
    viewBtn: string;
    deleteBtn: string;
    unlockBtn: string;
    docNames: {
      passportScan: string;
      passportPhoto: string;
      peselForm: string;
      peselLetter: string;
      workPermitApp: string;
      sponsorshipLetter: string;
      healthInsurance: string;
      travelInsurance: string;
      bankConfirmation: string;
      proofOfFunds: string;
      relocationLetter: string;
      taxResidency: string;
      biometricConfirmation: string;
      addressConfirmation: string;
      residencePermitScan: string;
      taxIdConfirmation: string;
      employmentContract: string;
      businessRegistrationConfirmation: string;
    };
    docHints: {
      passportScan: string;
      passportPhoto: string;
      peselForm: string;
      peselLetter: string;
      workPermitApp: string;
      sponsorshipLetter: string;
      healthInsurance: string;
      travelInsurance: string;
      bankConfirmation: string;
      proofOfFunds: string;
      relocationLetter: string;
      taxResidency: string;
      biometricConfirmation: string;
      addressConfirmation: string;
      residencePermitScan: string;
      taxIdConfirmation: string;
      employmentContract: string;
      businessRegistrationConfirmation: string;
    };
    uploadGuides: {
      passportScan: string;
      passportPhoto: string;
      peselForm: string;
      peselLetter: string;
      workPermitApp: string;
      sponsorshipLetter: string;
      healthInsurance: string;
      travelInsurance: string;
      bankConfirmation: string;
      proofOfFunds: string;
      relocationLetter: string;
      taxResidency: string;
      biometricConfirmation: string;
      addressConfirmation: string;
      residencePermitScan: string;
      taxIdConfirmation: string;
      employmentContract: string;
      businessRegistrationConfirmation: string;
    };
    progressSummary: string;
    autoCompleteToast: string;
    sectionCompleteHeading: string;
    sectionCompleteBody: string;
    sectionCompleteDismiss: string;
    deleteConfirmTitle: string;
    deleteConfirmBody: string;
    cancelBtn: string;
    uploadModal: {
      dropzoneLabel: string;
      dropzoneHint: string;
      confirmBtn: string;
    };
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
    topDistrictDescs: { mokotow: string; wola: string; zoliborz: string; ochota: string };
    bestValueBadge: string;
    expatsChoiceBadge: string;
    showAllDistricts: string;
    showFewerDistricts: string;
    guides: Record<string, { heading: string; steps: string[]; aiQuestion: string }>;
    roomsLabel: string;
    roomsAny: string;
    roomsStudio: string;
    rooms2: string;
    rooms3: string;
    noDistrictsText: string;
    searchWithFiltersBtn: string;
  };
  banks: {
    title: string;
    subtitle: string;
    openAccount: string;
    bestForExpats: string;
    features: { pkobp: [string, string, string]; mbank: [string, string, string]; santander: [string, string, string]; revolut: [string, string, string] };
    guide: {
      heading: string;
      steps: [string, string, string, string, string];
      tipsHeading: string;
      tips: [string, string, string, string];
    };
    openAccountAt: string;
    guides: Record<string, { heading: string; steps: string[]; aiQuestion: string }>;
    howToOpenLabel: string;
    emptyText: string;
    faqHeading: string;
    faqCaption: string;
    faqQuestions: [string, string, string, string];
  };
  medicine: {
    title: string;
    subtitle: string;
    clinicsTitle: string;
    clinicsSub: string;
    warsaw: string;
    languages: { ruUa: string; en: string; ru: string; ua: string };
    bookBtn: string;
    nfzTitle: string;
    nfzSteps: [string, string, string, string];
    nfzAiQuestion: string;
    stepLabel: string;
    emergencyTitle: string;
    emergencyNumber: string;
    emergencyEr: string;
    emergencyPharmacy: string;
    usefulSitesTitle: string;
    usefulSites: [
      { url: string; desc: string },
      { url: string; desc: string },
      { url: string; desc: string },
      { url: string; desc: string },
    ];
    dentalTitle: string;
    dentalNfz: string;
    dentalPrivate: string;
    dentalChains: string;
    aiPickHeading: string;
    aiPickSubtitle: string;
    aiPickPlaceholder: string;
    searchPlaceholder: string;
    allCategoriesLabel: string;
    allDistrictsLabel: string;
    clinicsCountTemplate: string;
    notFoundText: string;
    askAiQuestionTemplate: string;
    learnMoreBtn: string;
  };
  insurance: {
    title: string;
    subtitle: string;
    compareTitle: string;
    nfzLabel: string;
    nfzTooltip: string;
    privateLabel: string;
    rows: [
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
      { label: string; nfz: string; pvt: string },
    ];
    learnMoreBtn: string;
    types: {
      medical: { name: string; provider: string; price: string; desc: string };
      car: { name: string; provider: string; price: string; desc: string };
      home: { name: string; provider: string; price: string; desc: string };
      travel: { name: string; provider: string; price: string; desc: string };
    };
    guides: Record<string, { heading: string; steps: string[]; aiQuestion: string }>;
    emptyText: string;
    aiPromptHeading: string;
    aiPromptSubtitle: string;
    aiPromptCta: string;
    aiPromptQuestion: string;
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
    salaryNote: string;
    noExactData: string;
    jobSites: string;
    visitSite: string;
    searchByProfession: string;
    viewVacanciesBtn: string;
    employmentSubtitle: string;
    b2bSubtitle: string;
    b2bContractName: string;
    employmentFeatures: [string, string, string];
    b2bFeatures: [string, string, string];
    jobSiteDescs: { pracuj: string; nofluff: string; linkedin: string };
    guides: Record<string, { heading: string; steps: string[]; aiQuestion: string }>;
    notFoundHeading: string;
    notFoundTryThese: string;
    perMonth: string;
    employmentFullSubtitle: string;
    faqHeading: string;
    faqCaption: string;
    faqQuestions: [string, string, string, string];
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
    subtitleTemplate: string;
    subtitleTemplateNoCity: string;
    overallProgress: string;
    openBtn: string;
    expandBtn: string;
    collapseBtn: string;
    whatNextBtn: string;
    stepsCompletedTemplate: string;
    docsReadyTemplate: string;
    currentPhasePrefix: string;
    allPhasesDone: string;
    motivational: {
      noRoute: string;
      allDone: string;
      almostThere: string;
      thirdDone: string;
      goodStart: string;
      startFirst: string;
    };
    timelineSections: {
      before_departure: string;
      first_week: string;
      first_month: string;
      longterm: string;
    };
    countdown: {
      heading: string;
      remaining: string;
      expired: string;
    };
    phases: {
      beforeDeparture: string;
      legalization: string;
      residenceCard: string;
      workTaxes: string;
    };
    phaseDescriptions: {
      beforeDeparture: string;
      legalization: string;
      residenceCard: string;
      workTaxes: string;
    };
    phaseStatus: {
      done: string;
      inProgress: string;
      waiting: string;
    };
    sidebar: {
      tagline: string;
      home: string;
      myPlanSection: string;
      roadmap: string;
      checklist: string;
      aiAssistant: string;
      servicesSection: string;
      landingLinkAria: string;
    };
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
      stepLabel: string;
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
      taxId: {
        title: string;
        byCountry: { poland: string; germany: string; spain: string };
      };
      employmentRegistration: {
        title: string;
        byCountry: { poland: string; germany: string; spain: string };
      };
    };
    stepGuides: Record<string, { heading: string; steps: string[] }>;
    howToGetQuestion: string;
    home: {
      flightHeading: string;
      flightSub: string;
      flightOriginPlaceholder: string;
      greeting: string;
      guestGreeting: string;
      greetingSubtitle: string;
      stepsLabel: string;
      phaseLabel: string;
      daysLabel: string;
      quickActionsHeading: string;
      quickActionRoadmapDesc: string;
      quickActionDocumentsDesc: string;
      quickActionAiDesc: string;
      quickActionBanksDesc: string;
      quickActionWorkDesc: string;
      currentStepCta: string;
    };
  };
  guideCard: {
    whenToGet: string;
    whereToSubmit: string;
    showOnMap: string;
    onMap: string;
    workingHours: string;
    onlineBooking: string;
    cost: string;
    waitingTime: string;
    requiredDocs: string;
    howToApply: string;
    tips: string;
    commonMistakes: string;
    officialSite: string;
    downloadForm: string;
    fillWithAi: string;
    askAi: string;
    askAiAriaTemplate: string;
    askAiBankQuestionTemplate: string;
    askAiTopicQuestionTemplate: string;
    yourBank: string;
    chooseBank: string;
    bankInfo: string;
    classicAccount: string;
    moreDetails: string;
    allTag: string;
    citizenshipNote: string;
    loading: string;
    searchGeneric: string;
    searchBanks: string;
    searchInsurance: string;
    searchGuides: string;
    important2026Badge: string;
    moreBanksTemplate: string;
    statusDone: string;
    statusNotStarted: string;
    urgentAria: string;
    start: string;
    compareBanksTitle: string;
    tagsLabel: string;
    tags: { noPesel: string; fullyOnline: string; free: string; multicurrency: string };
    headlines: { noPesel: string; fullyOnline: string; free: string; multicurrency: string };
  };
  helpButton: {
    label: string;
    openGuide: string;
    askAi: string;
    askAiFooter: string;
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
    aiPickHeading: string;
    aiPickSubtitle: string;
    aiPickPlaceholder: string;
    findBtn: string;
    findingBtn: string;
    resetBtn: string;
    searchByNamePlaceholder: string;
    addressLabel: string;
    showOnMapBtn: string;
    forWhomLabel: string;
    languageLabel: string;
    scheduleLabel: string;
    costLabel: string;
    documentsLabel: string;
    priceOnRequestText: string;
    askAiBtn: string;
    askAiAriaTemplate: string;
    askAiQuestionTemplate: string;
    needHelpHeading: string;
    clickHintText: string;
    tabQuestions: {
      universities: [string, string, string];
      schools: [string, string, string];
      kindergartens: [string, string, string];
      courses: [string, string, string];
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
    pageTitle: string;
    pageSubtitle: string;
    newChat: string;
    emptyHistory: string;
    todayLabel: string;
    thisWeekLabel: string;
    olderLabel: string;
    deleteChatAria: string;
    assistantName: string;
    online: string;
    greetingHeading: string;
    greetingSubtitle: string;
    defaultChatTitle: string;
    deleteModalTitle: string;
    deleteModalBody: string;
    deleteConfirm: string;
    deleteCancel: string;
  };
  demo: {
    bannerText: string;
    registerNow: string;
    floatingGreeting: string;
    dismissAria: string;
    promptHeading: string;
    promptBody: string;
    promptDismiss: string;
  };
  onboarding: {
    stepLabel: string;
    back: string;
    cancel: string;
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
      jobOffer: { question: string; subheading: string };
      universityAccepted: { question: string; subheading: string };
      studyLevel: { question: string; subheading: string };
      businessType: { question: string; subheading: string };
      familyMemberType: { question: string; subheading: string };
      hasChildren: { question: string; subheading: string };
      foreignEmployer: { question: string; subheading: string };
      registerIp: { question: string; subheading: string };
      timeline: { question: string; subheading: string };
      hasCar: { question: string; subheading: string };
    };
    goalOptions: {
      work: string;
      workDesc: string;
      study: string;
      studyDesc: string;
      business: string;
      businessDesc: string;
      family: string;
      familyDesc: string;
      remote: string;
      remoteDesc: string;
      savings: string;
      savingsDesc: string;
      other: string;
    };
    jobOfferOptions: { yes: string; no: string };
    universityAcceptedOptions: { yes: string; no: string };
    studyLevelOptions: { bachelor: string; master: string; phd: string };
    businessTypeOptions: { jdg: string; spzoo: string; undecided: string };
    familyMemberTypeOptions: { spouse: string; parent: string; child: string; multiple: string };
    hasChildrenOptions: { yes: string; no: string };
    foreignEmployerOptions: { yes: string; no: string };
    registerIpOptions: { yes: string; no: string };
    timelineOptions: {
      already: string;
      month1: string;
      months3: string;
      months6: string;
      year1: string;
      exploring: string;
    };
    hasCarOptions: { yes: string; no: string };
    results: {
      heading: string;
      loading: string;
      selectButton: string;
      selecting: string;
      currentRoute: string;
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
      steps: string;
      bestFor: string;
      selectError: string;
      incompleteHeading: string;
      incompleteCta: string;
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
      faq: "FAQ",
      login: "Log in",
      getStarted: "Get Started",
      goToDashboard: "Go to dashboard →",
    },
    common: {
      cancelBtn: "Cancel",
      logoutBtn: "Log out",
      logoutConfirmTitle: "Log out of your account?",
      logoutConfirmBody: "Are you sure you want to log out?",
      cityLabel: "City",
      chosenByCountTemplate: "{n}+ people already chose this via ReloAI",
    },
    hero: {
      badge: "Your AI relocation guide",
      headline1: "Moving to Europe",
      headline2: "— simple.",
      subtext:
        "ReloAI plans your visa, paperwork, housing, and banking — step by step, in plain language. Ask a question, get a personalized roadmap in seconds.",
      getStarted: "Get Started",
      seeHowItWorks: "See how it works",
      trustCountries: "3 countries",
      trustLanguages: "6 languages",
      trustFree: "Free to start",
      trustSocialProof: "Over 1,000 people have already relocated successfully with ReloAI",
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
      docQuestion: "And which documents do I need first?",
      docResponse: "Here are 2 documents to start with:",
      inputPlaceholder: "Ask about living in Poland...",
      docCardPassportTitle: "Passport scan",
      docCardPassportSubtitle: "Needed for almost every step",
      docCardInsuranceTitle: "Health insurance",
      docCardInsuranceSubtitle: "Required for your residence permit",
      docStatusDone: "Done",
      docStatusPending: "Under review",
    },
    stats: {
      items: [
        { value: "3", label: "Countries" },
        { value: "100x", label: "Cheaper" },
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
          flag: "pl",
          name: "Poland",
          highlight: "Fast-growing tech hub",
          points: [
            "Karta Pobytu residence permit walkthrough",
            "PESEL registration & local banking",
            "Average rent guide by city",
          ],
        },
        {
          flag: "de",
          name: "Germany",
          highlight: "EU Blue Card & job seeker visas",
          points: [
            "Anmeldung and Bürgeramt appointments",
            "Health insurance (public vs. private)",
            "Tax ID and freelancer visa support",
          ],
        },
        {
          flag: "es",
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
    directions: {
      label: "DESTINATIONS",
      heading: "Where are you moving?",
      subheading: "A personal plan for your country — in seconds.",
      comingSoonBadge: "Coming soon",
      ctaLabel: "Get started",
      comingSoonCta: "Coming soon",
      cards: [
        { name: "Poland", subtitle: "Stable Europe to start" },
        { name: "Germany", subtitle: "Blue Card and an IT career" },
        { name: "Spain", subtitle: "Sun, sea, and Digital Nomad life" },
      ],
    },
    pricing: {
      heading: "Pricing",
      subheading: "Start free.",
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
      heading: "Reviews",
      subheading: "Real people. Real moves.",
      items: [
        {
          name: "Anna K.",
          route: "Ukraine → Poland",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Got my PESEL in 2 days. Without ReloAI I would've spent a week just looking for information.",
          initials: "AK",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Mikhail S.",
          route: "Russia → Germany",
          fromFlag: "ru",
          toFlag: "de",
          rating: 5,
          quote: "AI helped me figure out Anmeldung. Explained everything clearly and gave me office addresses.",
          initials: "MS",
          documentBadge: { country: "de", label: "Anmeldung" },
        },
        {
          name: "Olga M.",
          route: "Belarus → Spain",
          fromFlag: "by",
          toFlag: "es",
          rating: 5,
          quote: "Started a business in Spain. The checklist saved me a month of work and €2,000 in lawyer fees.",
          initials: "OM",
          documentBadge: { country: "es", label: "Alta de Autónomo" },
        },
        {
          name: "Dmitry P.",
          route: "Kazakhstan → Poland",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 4,
          quote: "The progress tracker really helps. I always know exactly what step I'm on.",
          initials: "DP",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Leyla R.",
          route: "Uzbekistan → Germany",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Found a job in Germany through the jobs section. The AI even wrote my cover letter.",
          initials: "LR",
          documentBadge: { country: "de", label: "Anschreiben" },
        },
        {
          name: "Timur A.",
          route: "Tajikistan → Spain",
          fromFlag: "tj",
          toFlag: "es",
          rating: 5,
          quote: "Got my NIE in 3 weeks. I thought it would take half a year.",
          initials: "TA",
          documentBadge: { country: "es", label: "NIE" },
        },
        {
          name: "Karina N.",
          route: "Ukraine → Germany",
          fromFlag: "ua",
          toFlag: "de",
          rating: 5,
          quote: "Moved with my family. Found a school for the kids and a Russian-speaking doctor.",
          initials: "KN",
          documentBadge: { country: "de", label: "Familiennachzug" },
        },
        {
          name: "Artyom V.",
          route: "Russia → Spain",
          fromFlag: "ru",
          toFlag: "es",
          rating: 4,
          quote: "Digital Nomad Visa — sorted it in 6 weeks following ReloAI's guide.",
          initials: "AV",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Zarina I.",
          route: "Kazakhstan → Poland",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Opened an mBank account on the first try. The AI told me exactly which documents to bring.",
          initials: "ZI",
          documentBadge: { country: "pl", label: "mBank" },
        },
        {
          name: "Bogdan F.",
          route: "Ukraine → Poland",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Best relocation service out there. Saved me time and nerves.",
          initials: "BF",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Alexey K.",
          route: "Kazakhstan → Poland",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Got my PESEL in 3 days — the AI told me all the documents I'd need in advance.",
          initials: "AK",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Nilufar R.",
          route: "Uzbekistan → Poland",
          fromFlag: "uz",
          toFlag: "pl",
          rating: 5,
          quote: "Found an apartment in Warsaw in a week with ReloAI's help.",
          initials: "NR",
          documentBadge: { country: "pl", label: "Wynajem mieszkania" },
        },
        {
          name: "Dmitry V.",
          route: "Belarus → Germany",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Got my Blue Card without a lawyer, saved €2,000.",
          initials: "DV",
          documentBadge: { country: "de", label: "Blue Card" },
        },
        {
          name: "Malika S.",
          route: "Tajikistan → Poland",
          fromFlag: "tj",
          toFlag: "pl",
          rating: 5,
          quote: "Opened a PKO BP account on the first try, the AI prepared my document list.",
          initials: "MS",
          documentBadge: { country: "pl", label: "PKO BP" },
        },
        {
          name: "Anna P.",
          route: "Ukraine → Spain",
          fromFlag: "ua",
          toFlag: "es",
          rating: 5,
          quote: "Digital Nomad Visa — every step laid out, sorted it in a month.",
          initials: "AP",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Aziz T.",
          route: "Uzbekistan → Germany",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Got into university in Munich — the AI helped me gather the documents for my student visa.",
          initials: "AT",
          documentBadge: { country: "de", label: "Studentenvisum" },
        },
        {
          name: "Svetlana I.",
          route: "Russia → Poland",
          fromFlag: "ru",
          toFlag: "pl",
          rating: 5,
          quote: "Moved with my husband and kids, found a kindergarten and school in two weeks.",
          initials: "SI",
          documentBadge: { country: "pl", label: "Przedszkole i szkoła" },
        },
        {
          name: "Roman K.",
          route: "Belarus → Germany",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Started a sole proprietorship in Berlin, the checklist helped with all the paperwork.",
          initials: "RK",
          documentBadge: { country: "de", label: "Gewerbeanmeldung" },
        },
        {
          name: "Dinara Zh.",
          route: "Kazakhstan → Poland",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Got into Warsaw University and received my student residence card with no issues.",
          initials: "DZ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Yulia N.",
          route: "Ukraine → Spain",
          fromFlag: "ua",
          toFlag: "es",
          rating: 4,
          quote: "Found a remote job and got my NIE in a month, all according to the guide.",
          initials: "YN",
          documentBadge: { country: "es", label: "NIE" },
        },
      ],
    },
    faq: {
      heading: "Frequently asked questions",
      subheading: "Everything you need to know before you start moving.",
      items: [
        {
          question: "What is ReloAI and how does it work?",
          answer: "ReloAI is an AI platform that helps people move to Europe. You answer a few questions about yourself — where you're from, where you want to move, and why. Based on your answers, ReloAI automatically builds a personal relocation plan with a full list of documents, timelines, and step-by-step instructions. Everything in one place — documents, housing, banking, healthcare, work, education, insurance, and more — plus an AI assistant that answers any question 24/7.",
        },
        {
          question: "How is ReloAI different from an immigration lawyer?",
          answer: "A lawyer costs anywhere from 500 to 3,000 euros and only works during business hours. ReloAI is available 24/7, costs a fraction of that, and gives you the same accurate information on documents and procedures.",
        },
        {
          question: "Which countries can I move to with ReloAI?",
          answer: "Poland is available now — one of the most popular destinations for people moving from the CIS. We'll be adding Germany and Spain soon. You can explore all available destination countries in more detail on our website. ReloAI supports relocation from more than 40 countries — Ukraine, Belarus, Russia, Uzbekistan, Tajikistan, Kazakhstan, Turkey, Moldova, and many more.",
        },
        {
          question: "What documents do I need for the move, and how does ReloAI help me collect them?",
          answer: "The list of documents depends on your citizenship and the purpose of your move. After you complete onboarding, ReloAI automatically shows you only the documents that are actually relevant to you — no clutter. For every document, ReloAI gives you comprehensive information — exact office addresses in every major city, up-to-date opening hours, the full list of documents to bring with you, the cost of every fee, realistic waiting times, step-by-step instructions, and a breakdown of the most common mistakes. Nothing extra — only what you actually need.",
        },
        {
          question: "How does the AI generate my relocation plan?",
          answer: "You answer 5 questions during onboarding — citizenship, destination country, purpose of the move, whether you already have a job offer, and your timeline. Based on this, ReloAI selects the right documents from its database and builds a step-by-step plan with realistic timelines. For example, someone from Uzbekistan moving to Poland for work would get a plan like: D visa → Address registration → PESEL → Bank account → Work permit → Residence card.",
        },
        {
          question: "How long does a move with the ReloAI plan take?",
          answer: "It depends on your situation. On average: visa-free countries (Ukraine, Moldova) — 1 to 3 months to full legalization. Countries that need a visa (Uzbekistan, Kazakhstan, and others) — 3 to 6 months, including time to get a D visa. ReloAI shows realistic timelines for every document so you can plan ahead.",
        },
        {
          question: "Is it paid? How much does it cost?",
          answer: "ReloAI has a free plan with basic access to one country and 5 AI messages a day. For full access there are two paid tiers: Premium — €29/month: all countries, 50 AI messages a day, document uploads, the full address database. Pro — €49/month: everything in Premium plus unlimited AI chat, document auto-fill, and priority support.",
        },
        {
          question: "What languages does the service support?",
          answer: "ReloAI works in 6 languages: Russian, English, Uzbek, Turkish, Tajik, and Ukrainian. You can choose your language when you sign up or change it in settings at any time.",
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes. You can cancel your subscription anytime from the Profile section — no penalties or hidden conditions. After cancelling, you keep access until the end of your paid period, then your account moves to the free plan. All your data and documents are kept.",
        },
        {
          question: "How does ReloAI protect my personal data?",
          answer: "All data is stored on secure, encrypted servers. We don't share your data with third parties. Documents you upload are only accessible to you. ReloAI complies with GDPR — the European law on personal data protection.",
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
      backToLanding: "Back to site",
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
        confirmPasswordLabel: "Confirm password",
        passwordMismatch: "Passwords don't match",
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
      subtitle: "Your full relocation overview.",
      logOut: "Log out",
      planLabel: "Plan",
      upgradeTooltip: "Improve your plan",
      upgradeBadge: "⚡ Upgrade to Premium",
      upgradeToProBadge: "⚡ Upgrade to Pro",
      maxPlanBadge: "✓ Maximum plan",
      unnamed: "Unnamed",
      memberSinceLabel: "Member since",
      personalSection: "Personal Info",
      relocationSection: "Relocation Profile",
      destinationLabel: "Moving to",
      routeLabel: "Selected legalization route",
      noRouteSelected: "No route selected yet",
      chooseRoute: "Choose a route",
      routeModalSubheading: "Pick a plan below — you can switch anytime.",
      jobOfferLabel: "Has job offer",
      alreadyAdmittedLabel: "Already admitted",
      yes: "Yes",
      no: "No",
      notSet: "Not specified",
      progressSection: "Progress Overview",
      currentStepLabel: "Current step",
      stepsCompletedLabel: "{completed} of {total} steps completed",
      allStepsDone: "All steps complete!",
      documentsSection: "Documents Status",
      viewAllDocuments: "View all documents",
      editBtn: "Edit relocation info",
      changeRouteBtn: "Change relocation plan",
      editModalTitle: "Edit relocation info",
      cityLabel: "City",
      cityPlaceholder: "e.g. Warsaw",
      saveBtn: "Save changes",
      saved: "Saved",
    },
    topbar: {
      searchPlaceholder: "Search documents, tasks...",
      upgrade: "Upgrade",
      openMenuAria: "Open menu",
      avatarAria: "Go to profile",
    },
    notifications: {
      bellAria: "Open notifications",
      title: "Notifications",
      markAllRead: "Mark all as read",
      empty: "No notifications yet",
      registrationTitle: "Thanks for signing up! 🎉",
      registrationMessage: "Congratulations, you've successfully registered with ReloAI.",
      welcomeTitle: "Questionnaire completed! 🎉",
      welcomeMessage: "You've successfully filled in your questionnaire and chosen a relocation plan ({route}). You can change this data anytime in your profile settings.",
      checklistTitle: "Roadmap updated ✅",
      checklistMessage: "You've recreated your relocation plan ({route}). Progress on the new roadmap will start fresh — you can view and change your previous questionnaire data in profile settings.",
      inactivityTitle: "Don't forget about your relocation plan",
      inactivityMessage: "Come back to continue where you left off.",
      documentTitle: "Document uploaded and sent for review",
      documentMessage: "We'll notify you as soon as it's reviewed.",
    },
    sidebar: {
      documents: "Documents",
      housing: "Housing",
      banks: "Banks",
      medicine: "Medicine",
      insurance: "Insurance",
      work: "Work",
      community: "Community",
      education: "Education",
      otherServices: "Other Services",
      profile: "Profile",
      settings: "Settings",
      logout: "Log out",
    },
    settings: {
      title: "Settings",
      subtitle: "Manage how ReloAI looks and behaves.",
      languageSection: "Language",
      languageDesc: "ReloAI will speak with you in this language.",
      currencySection: "Currency",
      currencyDesc: "Which currency to show prices in on the site (the rate against the zloty updates automatically).",
      saving: "(saving…)",
      themeSection: "Appearance",
      themeDesc: "Choose how ReloAI looks on your device.",
      themeDark: "Dark",
      themeLight: "Light",
      notifications: "Notifications",
      notifEmail: "Email updates",
      notifEmailDesc: "Occasional product news and tips.",
      notifDocuments: "Document reminders",
      notifDocumentsDesc: "Alerts before a deadline is due.",
      notifProduct: "Product news",
      notifProductDesc: "New features and roadmap updates.",
      accountSection: "Account",
      nameLabel: "Name",
      emailLabel: "Email",
      saveBtn: "Save changes",
      saved: "Saved",
      dangerSection: "Danger zone",
      dangerDesc: "Deleting your account removes your data. This can't be undone.",
      deleteAccountBtn: "Delete account",
      deleteConfirmTitle: "Delete your account?",
      deleteConfirmBody: "This will permanently delete your profile and data. This can't be undone.",
      deleteConfirmBtn: "Delete account",
    },
    documents: {
      title: "Documents",
      subtitle: "The documents you need, in one place.",
      tabs: {
        all: "All",
        passport: "Passport",
        pesel: "PESEL",
        workPermit: "Work Permit",
        insurance: "Insurance",
        bank: "Bank",
        biometric: "Biometrics",
        address: "Address",
        residencePermit: "Residence Card",
        taxId: "Tax ID",
        employment: "Employment",
        business: "Business",
      },
      status: { verified: "Verified", pending: "Pending review", missing: "Missing", locked: "Premium" },
      upload: "Drag & drop or click to upload",
      uploadBtn: "Upload",
      addDocumentBtn: "Upload document",
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
        biometricConfirmation: "Biometric confirmation",
        addressConfirmation: "Address registration confirmation",
        residencePermitScan: "Residence card scan",
        taxIdConfirmation: "NIP confirmation",
        employmentContract: "Employment contract",
        businessRegistrationConfirmation: "Business registration confirmation",
      },
      docHints: {
        passportScan: "Needed for most official procedures",
        passportPhoto: "Required for your Karta Pobytu application",
        peselForm: "First step to getting your PESEL number",
        peselLetter: "Confirms your PESEL number was issued",
        workPermitApp: "Needed to work legally",
        sponsorshipLetter: "Confirms employment with your sponsoring employer",
        healthInsurance: "Required for your residence permit",
        travelInsurance: "Needed until you're covered by NFZ",
        bankConfirmation: "Required to open a bank account",
        proofOfFunds: "Confirms you have enough funds to live on",
        relocationLetter: "Available with Premium",
        taxResidency: "Available with Premium",
        biometricConfirmation: "Upload after your biometric appointment at Urząd do Spraw Cudzoziemców",
        addressConfirmation: "Zaświadczenie confirming your address registration (zameldowanie)",
        residencePermitScan: "Scan of your received residence card (kartę pobytu)",
        taxIdConfirmation: "Confirmation of your NIP assignment from the tax office",
        employmentContract: "Signed employment contract (umowa o pracę)",
        businessRegistrationConfirmation: "CEIDG registration confirmation",
      },
      uploadGuides: {
        passportScan:
          "Photograph the passport page with your photo and personal details, plus the visa or stay-stamp page if you have one. The image should be sharp, with no glare and no cropped edges.",
        passportPhoto: "Upload a passport-style photo: face forward, no headwear, plain light background, meeting biometric photo requirements.",
        peselForm: "Upload the filled-in and signed PESEL number application form.",
        peselLetter: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        workPermitApp: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        sponsorshipLetter: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        healthInsurance: "Upload your health insurance policy — the coverage dates and policy number must be visible.",
        travelInsurance: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        bankConfirmation: "Upload a bank statement or certificate showing the account number and holder details.",
        proofOfFunds: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        relocationLetter: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        taxResidency: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        biometricConfirmation: "Upload the confirmation or receipt from your biometrics appointment.",
        addressConfirmation: "Upload your rental agreement or address registration confirmation (zameldowanie) with the address clearly visible.",
        residencePermitScan: "Photograph your residence card on both sides — the front with your photo and the back with your details.",
        taxIdConfirmation: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        employmentContract: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
        businessRegistrationConfirmation: "Take a clear photo or scan of the document — make sure all details are clearly visible.",
      },
      progressSummary: "Done: {completed} of {total} documents",
      autoCompleteToast: "✓ Step completed automatically",
      sectionCompleteHeading: "🎉 Section complete!",
      sectionCompleteBody: "Move on to the next step.",
      sectionCompleteDismiss: "Continue",
      deleteConfirmTitle: "Delete document?",
      deleteConfirmBody: "This action cannot be undone. The document will be permanently deleted.",
      cancelBtn: "Cancel",
      uploadModal: {
        dropzoneLabel: "Choose a file",
        dropzoneHint: "PDF, JPG or PNG",
        confirmBtn: "Upload",
      },
    },
    housing: {
      title: "Housing in Poland",
      subtitle: "Find a place to live, the smart way.",
      rentMarket: "🏆 Top 4 districts by price-to-quality ratio",
      rentMarketSub: "Our experts and thousands of expats picked these districts as the best for living, based on price, comfort, and infrastructure.",
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
        mokotow: "Best balance of price and quality. Quiet, green, metro access.",
        wola: "Modern district with lots of new developments, close to the center.",
        zoliborz: "Cozy, safe, a favorite among релокантов.",
        ochota: "Quiet district near the center, great infrastructure, metro, popular with students and релокантов.",
      },
      bestValueBadge: "Best value",
      expatsChoiceBadge: "Релокантов' choice",
      showAllDistricts: "Show all {count} districts in {city} →",
      showFewerDistricts: "Show fewer districts",
      roomsLabel: "Rooms",
      roomsAny: "Any",
      roomsStudio: "Studio",
      rooms2: "2 rooms",
      rooms3: "3 rooms",
      noDistrictsText: "No district data available for {city}.",
      searchWithFiltersBtn: "Search with these filters →",
      guides: {
        olx: {
          heading: "How to search for housing on OLX",
          steps: [
            "Go to Real Estate → Rent and set filters for city, price, and number of rooms.",
            "Save listings and turn on notifications for new offers matching your criteria.",
            "Message the seller through the built-in chat — never send money before viewing the apartment in person.",
            "Arrange a viewing and check the apartment's condition and paperwork before signing a contract.",
          ],
          aiQuestion: "How do I search for housing on OLX?",
        },
        otodom: {
          heading: "How to search for housing on Otodom",
          steps: [
            "Use Otodom's advanced filters — metro, floor, furnished or not — to narrow your search.",
            "Look for listings marked \"from owner\" — this often means no agency commission.",
            "Contact the poster through the site and confirm a viewing date.",
            "Before signing, ask for a handover protocol (protokół zdawczo-odbiorczy) for the apartment.",
          ],
          aiQuestion: "How do I search for housing on Otodom?",
        },
        gratka: {
          heading: "How to search for housing on Gratka",
          steps: [
            "Set your region and budget in Gratka's search — it's especially strong outside major cities.",
            "Check the listing's publish date — older listings are often no longer available.",
            "Contact the seller by phone or through the site's form to confirm details.",
            "Always ask for a rental contract and verify ownership before paying a deposit.",
          ],
          aiQuestion: "How do I search for housing on Gratka?",
        },
      },
    },
    banks: {
      title: "Banks in Poland",
      subtitle: "Compare accounts built for newcomers.",
      openAccount: "Open Account",
      bestForExpats: "Best for релоканты",
      features: {
        pkobp: ["Largest branch network in Poland", "Polish & English mobile app", "Free student account options"],
        mbank: ["Fully English app and support", "Instant online account opening", "No fees without a PESEL number"],
        santander: ["Multi-currency accounts", "Global bank network", "Free debit card use abroad"],
        revolut: ["No PESEL required to start", "Multi-currency wallet", "Best for digital nomads"],
      },
      guide: {
        heading: "How to open a bank account in Poland — step by step",
        steps: [
          "🪪 Get your PESEL — most banks won't open an account without it",
          "📄 Prepare your documents — passport, proof of address (rental agreement), PESEL",
          "🏦 Choose a bank — online banks (mBank, ING) are easier for foreigners",
          "📱 Open online or in person — mBank and Revolut can be opened fully online",
          "✅ Activate your card — it arrives by mail within 5–7 days",
        ],
        tipsHeading: "💡 Tips",
        tips: [
          "mBank and ING are the most foreigner-friendly",
          "Revolut can be opened without a PESEL in 10 minutes",
          "PKO BP and Pekao require an in-person visit",
          "Bring your rental agreement as proof of address",
        ],
      },
      openAccountAt: "How to open an account at {bank}",
      guides: {
        pkobp: {
          heading: "How to open an account at PKO BP",
          steps: [
            "Get your PESEL — PKO BP, like most traditional banks, requires it to open an account.",
            "Book an appointment at your nearest branch — PKO BP has the largest network in Poland, so finding one is easy.",
            "Bring your passport, PESEL, and proof of address (a rental agreement works).",
            "Sign the contract in person — staff will help you choose the right account type and issue your card.",
          ],
          aiQuestion: "How do I open an account at PKO BP?",
        },
        mbank: {
          heading: "How to open an account at mBank",
          steps: [
            "Download the mBank app or go to their website — the whole process can be done online, no branch visit needed.",
            "Fill out the application and verify your identity via video call or a courier who checks your passport.",
            "Provide your PESEL if you already have one — it speeds things up but isn't required to start.",
            "Wait for approval — the account is usually opened within a day, and the app is fully in English.",
          ],
          aiQuestion: "How do I open an account at mBank?",
        },
        santander: {
          heading: "How to open an account at Santander",
          steps: [
            "Choose your account type — Santander offers multi-currency accounts, handy for international transfers.",
            "Prepare your passport, PESEL, and proof of address.",
            "Book a branch appointment or apply online if it's available for your status.",
            "Activate your card and set up mobile banking — the card can be used abroad free of charge.",
          ],
          aiQuestion: "How do I open an account at Santander?",
        },
        revolut: {
          heading: "How to open an account at Revolut",
          steps: [
            "Download the Revolut app and sign up with your phone number — no branch visit needed.",
            "Verify your identity with a selfie and a passport scan right in the app.",
            "No PESEL is required to open an account — it's the fastest option for someone who just arrived.",
            "Top up your account and start using the multi-currency wallet and card.",
          ],
          aiQuestion: "How do I open an account at Revolut?",
        },
      },
      howToOpenLabel: "How to open an account?",
      emptyText: "No bank data yet.",
      faqHeading: "Common questions about opening an account",
      faqCaption: "Clicking a question opens a chat with a ready-made AI answer",
      faqQuestions: [
        "How do I open an account without PESEL?",
        "What documents do I need?",
        "How many days does it take to open?",
        "Can I open it online?",
      ],
    },
    medicine: {
      title: "Medicine in Poland",
      subtitle: "Get insured and find care, fast.",
      clinicsTitle: "Clinics",
      clinicsSub: "English, Russian, and Ukrainian-speaking options.",
      warsaw: "Warsaw",
      languages: {
        ruUa: "Russian & Ukrainian speaking",
        en: "English speaking",
        ru: "Russian speaking",
        ua: "Ukrainian speaking",
      },
      bookBtn: "Book appointment",
      nfzTitle: "How to get NFZ health insurance",
      nfzSteps: [
        "Get a job under an employment contract (umowa o pracę) — your employer registers you with ZUS automatically",
        "Get a PESEL number",
        "Confirm your coverage on the eWUŚ website (ewus.nfz.gov.pl)",
        "Book an appointment at any public clinic",
      ],
      nfzAiQuestion: "How do I register with NFZ?",
      stepLabel: "Step",
      emergencyTitle: "Emergency and urgent care",
      emergencyNumber: "Emergency number in Poland: 112 or 999",
      emergencyEr: "The nearest ER (SOR) takes walk-ins with no appointment, free of charge",
      emergencyPharmacy: "Duty pharmacy finder:",
      usefulSitesTitle: "Useful websites",
      usefulSites: [
        { url: "znany-lekarz.pl", desc: "Book a doctor online — Russian-speaking doctors available" },
        { url: "ewus.nfz.gov.pl", desc: "Check your NFZ insurance status" },
        { url: "nfz.gov.pl", desc: "Official NFZ website" },
        { url: "aptekadyzurna.pl", desc: "Find a duty (24-hour) pharmacy" },
      ],
      dentalTitle: "Dental care",
      dentalNfz: "NFZ covers basic treatment — fillings, extractions",
      dentalPrivate: "Private dentistry: 150–400 PLN per visit",
      dentalChains: "Recommended chains: Dental+, Medicover Stomatologia",
      aiPickHeading: "AI-powered clinic matching",
      aiPickSubtitle: "Describe your problem or what kind of doctor or clinic you need — we'll find matching options.",
      aiPickPlaceholder: "E.g.: toothache, need a dentist near the center",
      searchPlaceholder: "Search by name or district",
      allCategoriesLabel: "All categories",
      allDistrictsLabel: "All districts",
      clinicsCountTemplate: "{count} clinics",
      notFoundText: "Nothing found for {city}.",
      askAiQuestionTemplate: 'Tell me more about the "{name}" clinic in {city}: is it worth choosing, what are the pros and cons, what should I pay attention to?',
      learnMoreBtn: "Learn more",
    },
    insurance: {
      title: "Insurance in Poland",
      subtitle: "Health, car, and other types of insurance",
      compareTitle: "Public vs. Private Insurance",
      nfzLabel: "NFZ Public Insurance",
      nfzTooltip: "NFZ — Poland's national health system",
      privateLabel: "Private",
      rows: [
        { label: "Cost", nfz: "Free with employment contributions", pvt: "150–400 PLN/month" },
        { label: "Wait times", nfz: "Weeks to months for specialists", pvt: "Same day to a few days" },
        { label: "Language support", nfz: "Mostly Polish only", pvt: "English, often Russian/Ukrainian" },
        { label: "Coverage", nfz: "Broad, but limited choice of doctors", pvt: "Choose your own clinic & doctor" },
      ],
      learnMoreBtn: "Learn more",
      types: {
        medical: { name: "Health insurance", provider: "Medicover", price: "150–400 PLN/month", desc: "Private health insurance for fast access to specialists with no queues." },
        car: { name: "Car insurance (OC/AC)", provider: "PZU", price: "800–2,500 PLN/year", desc: "Mandatory third-party liability (OC) plus optional comprehensive cover (AC) for full protection." },
        home: { name: "Home insurance", provider: "Warta", price: "200–600 PLN/year", desc: "Protects your apartment or house against fire, water damage, and theft." },
        travel: { name: "Travel insurance", provider: "Allianz", price: "20–80 PLN/trip", desc: "Covers medical expenses and emergencies while travelling around Europe." },
      },
      guides: {
        medical: {
          heading: "How to get medical insurance",
          steps: [
            "Choose your coverage level — a basic package or an extended one with dental and specialist care.",
            "Compare offers from a few insurers (LUX MED, Medicover, Signal Iduna) on price and clinic network.",
            "Take out the policy online or at the insurer's office — you'll usually need your passport and PESEL.",
            "Keep your policy number — you'll need it when booking appointments.",
          ],
          aiQuestion: "How do I get medical insurance in Poland?",
        },
        car: {
          heading: "How to get car insurance (OC/AC)",
          steps: [
            "OC (mandatory third-party liability) is required by law for any registered car.",
            "Compare OC rates from several insurers — prices vary a lot based on driving history.",
            "Optionally add AC (theft and damage cover) for fuller protection.",
            "Get a policy online in a few minutes — you'll need your car details and driving licence.",
          ],
          aiQuestion: "How do I get car insurance in Poland?",
        },
        home: {
          heading: "How to get home insurance",
          steps: [
            "Decide what to insure — the property itself, the contents, or liability.",
            "Gather basic info about the apartment: size, address, building type.",
            "Compare offers from a few insurers — many banks give a discount when bundled with a mortgage.",
            "Take out the policy online or through an agent, and keep proof for your landlord if required.",
          ],
          aiQuestion: "How do I get home insurance in Poland?",
        },
        travel: {
          heading: "How to get travel insurance",
          steps: [
            "Decide on the length and purpose of your trip — this determines the coverage level you need.",
            "Check that the policy covers medical costs, evacuation, and trip cancellation.",
            "Compare offers online — getting a policy takes a couple of minutes and no in-person visit.",
            "Save the policy on your phone or print it — you may need it at the border or at a hospital.",
          ],
          aiQuestion: "How do I get travel insurance?",
        },
      },
      emptyText: "No insurance data yet.",
      aiPromptHeading: "Not sure what to choose?",
      aiPromptSubtitle: "Ask the AI — it will take your situation into account and suggest what fits you best",
      aiPromptCta: "Ask",
      aiPromptQuestion:
        "What should I choose — public NFZ insurance or private? Take into account my situation: whether I'm formally employed, whether I need fast access to doctors, and whether budget matters.",
    },
    work: {
      title: "Work in Poland",
      subtitle: "Contracts, salaries, and where to look.",
      contractVsB2B: "Contract vs. B2B",
      salarySearch: "Salary Search",
      salarySearchSub: "Type a profession to see average pay.",
      placeholder: "e.g. software developer, nurse, driver...",
      averageSalary: "Average salary in Poland",
      inEuros: "In euros",
      salaryNote: "* Figures are approximate and depend on experience and city.",
      noExactData: "No exact data for this role yet — showing the national average.",
      jobSites: "Job Sites",
      visitSite: "Visit site",
      searchByProfession: "Search vacancies for this profession",
      viewVacanciesBtn: "View vacancies",
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
      guides: {
        employment: {
          heading: "How to get an employment contract (umowa o pracę)",
          steps: [
            "Your employer must sign a written employment contract with you before you start work.",
            "Check that the contract states your position, salary, schedule, and probation period if any.",
            "Your employer registers you with ZUS (social insurance) — this gives you access to NFZ and pension contributions.",
            "Keep a copy of the contract — you'll need it for your residence permit and other procedures.",
          ],
          aiQuestion: "How do I get an employment contract in Poland?",
        },
        b2b: {
          heading: "How to set up a B2B contract (self-employment)",
          steps: [
            "Register a sole proprietorship (JDG) through the CEIDG website — this can be done online in a day.",
            "Choose a tax form (general rules, flat tax, or ryczałt) together with an accountant.",
            "Sign a B2B contract with the contracting company — this is a civil-law contract, not an employment one.",
            "Pay your ZUS contributions yourself every month and file your tax return.",
          ],
          aiQuestion: "How do I set up a B2B contract in Poland?",
        },
        pracuj: {
          heading: "How to find a job on Pracuj.pl",
          steps: [
            "Create a profile and upload your CV — many listings let you apply with one click.",
            "Use filters for city, salary, and required English/Polish level.",
            "Set up alerts for keywords matching your profession so you don't miss new postings.",
            "Be ready for some interviews to be in Polish — confirm the interview language in advance.",
          ],
          aiQuestion: "How do I find a job on Pracuj.pl?",
        },
        nofluff: {
          heading: "How to find a job on NoFluffJobs",
          steps: [
            "NoFluffJobs specializes in tech — it's easy to filter listings by tech stack here.",
            "Note that listings show the salary range upfront, which makes comparing offers easier.",
            "Fill out your profile in English — many IT companies in Poland operate in English.",
            "Apply directly through the site — most companies respond within a few days.",
          ],
          aiQuestion: "How do I find a job on NoFluffJobs?",
        },
        linkedin: {
          heading: "How to find a job on LinkedIn",
          steps: [
            "Fill out your profile completely — experience, skills, and recommendations improve your chances of being found by recruiters.",
            "Turn on \"Open to work\", visible only to recruiters, so your search stays private from your current employer.",
            "Use location filters (Poland/Warsaw) and remote work filters to narrow your search.",
            "Message recruiters directly — a direct message is often more effective than applying through a form.",
          ],
          aiQuestion: "How do I find a job on LinkedIn?",
        },
      },
      notFoundHeading: "This profession isn't in our database",
      notFoundTryThese: "Try one of these professions:",
      perMonth: "month",
      employmentFullSubtitle: "Full employment benefits",
      faqHeading: "Not sure what to choose? Ask the AI",
      faqCaption: "Clicking a question opens a chat with a ready-made AI answer",
      faqQuestions: [
        "What should I choose: an employment contract or B2B?",
        "How do I switch from B2B to an employment contract?",
        "What taxes do I pay under B2B?",
        "What do I lose if I work without a contract?",
      ],
    },
    community: {
      title: "Communities",
      subtitle: "Telegram channels and chats for people moving to Poland.",
      join: "Join",
      members: "members",
      cats: { all: "All", housing: "Housing", work: "Work", sport: "Sport", family: "Family", general: "General" },
    },
    dashboard: {
      relocation: "{country} Relocation",
      subtitle: "Your personalized roadmap, updated in real time.",
      subtitleTemplate: "{from} → {city} · Goal: {goal} · Progress {percent}%",
      subtitleTemplateNoCity: "{from} · Goal: {goal} · Progress {percent}%",
      overallProgress: "Overall progress",
      openBtn: "Open",
      expandBtn: "Expand",
      collapseBtn: "Collapse",
      whatNextBtn: "What to do next",
      stepsCompletedTemplate: "{done} of {total} steps completed",
      docsReadyTemplate: "{done} of {total} documents ready",
      currentPhasePrefix: "Now: {phase}",
      allPhasesDone: "All phases complete",
      motivational: {
        noRoute: "Choose a route — and your personal relocation plan will appear here.",
        allDone: "All documents are done. You're fully ready to relocate!",
        almostThere: "You're almost there — just a little more to complete full legalization.",
        thirdDone: "More than a third of the way done. Keep it up!",
        goodStart: "Great start! Every document you complete brings you closer to your goal.",
        startFirst: "Start with the first step — and the whole path will become clearer.",
      },
      timelineSections: {
        before_departure: "Before departure",
        first_week: "First week",
        first_month: "First month",
        longterm: "Long-term",
      },
      countdown: {
        heading: "You have 30 days of legal stay under the visa-free regime",
        remaining: "{days} days left — apply for your PESEL and residence card in time",
        expired: "Your 30-day legal stay window has ended — apply for your residence documents as soon as possible",
      },
      phases: {
        beforeDeparture: "Preparation before departure",
        legalization: "Legalization — first 30 days",
        residenceCard: "Getting your residence card (karta pobytu)",
        workTaxes: "Work & taxes",
      },
      phaseDescriptions: {
        beforeDeparture: "Create your account, fill out the questionnaire, and check your visa eligibility — the very first steps, even before you move.",
        legalization: "Submit your documents, complete biometrics, and register your address (zameldowanie) — required steps in your first month after arrival.",
        residenceCard: "Apply for the karta pobytu — your residence permit — and receive the physical card.",
        workTaxes: "Get your tax ID (NIP) and formally set up your employment contract or business.",
      },
      phaseStatus: {
        done: "Done",
        inProgress: "In progress",
        waiting: "Waiting",
      },
      sidebar: {
        tagline: "Your relocation plan",
        home: "Home",
        myPlanSection: "MY PLAN",
        roadmap: "Roadmap",
        checklist: "Checklist",
        aiAssistant: "AI Assistant",
        servicesSection: "SERVICES",
        landingLinkAria: "Go to landing page",
      },
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
        stepLabel: "Step",
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
        taxId: {
          title: "Get your tax ID",
          byCountry: {
            poland: "Apply for a NIP (tax identification number) at your local tax office.",
            germany: "Get your Steuer-ID by mail after completing your Anmeldung.",
            spain: "Apply for your NIE (foreigner ID number) — required for almost everything in Spain.",
          },
        },
        employmentRegistration: {
          title: "Formalize your employment or business",
          byCountry: {
            poland: "Sign an umowa o pracę/zlecenie or register your business with ZUS.",
            germany: "Sign your employment contract and register with the Finanzamt and social insurance.",
            spain: "Register (alta) with Seguridad Social or Hacienda as an employee or self-employed.",
          },
        },
      },
      stepGuides: {
        visa_eligibility: {
          heading: "How to get your visa or entry permit",
          steps: [
            "Determine the visa or entry basis that fits your goal (work, study, business, family reunification).",
            "Gather the basic document set: passport, invitation or proof of purpose, insurance, proof of funds.",
            "Submit your application at the consulate or visa center of your destination country.",
            "Wait for a decision and attend an interview if required.",
            "Once approved, confirm your entry deadline and what to do on arrival.",
          ],
        },
        business_registration: {
          heading: "How to register a business",
          steps: [
            "Choose a legal structure (sole proprietorship, LLC, or local equivalent) depending on the country.",
            "Prepare your founding documents and proof of a registered address.",
            "File your registration with the relevant business registry.",
            "Get your company's tax and statistical numbers.",
            "Open a business bank account.",
          ],
        },
        documents: {
          heading: "What documents you need to prepare",
          steps: [
            "Gather originals and copies of key documents: passport, certificates, diplomas (apostilled if needed).",
            "Get notarized translations into the destination country's language where required.",
            "Upload scans to the Documents section in ReloAI to track their status.",
            "Check each document's status: Done, Under review, or Missing.",
            "Keep the originals on hand — you may need them in person at government offices.",
          ],
        },
        biometric: {
          heading: "How to complete your biometric appointment",
          steps: [
            "Book a biometric appointment with the immigration office or consulate — often possible online.",
            "Bring your passport, appointment confirmation, and supporting documents.",
            "Your fingerprints and photo will be taken at the appointment.",
            "Keep the receipt or application number — you can use it to track your document's status.",
            "Wait for notification that your card or permit is ready.",
          ],
        },
        address_registration: {
          heading: "How to register your address",
          steps: [
            "Find permanent or temporary housing and get the owner's consent to register (a rental agreement or landlord's confirmation).",
            "Prepare your passport and proof of your right to use the property.",
            "Go to your local municipal office in person or through the government portal.",
            "Fill out the address registration form.",
            "Get your registration confirmation — you'll need it for later steps (residence permit, tax ID, etc.).",
          ],
        },
        residence_permit: {
          heading: "How to get your residence permit",
          steps: [
            "Confirm you have a valid basis to apply: work, study, business, or family reunification.",
            "Gather your documents: passport, photo, proof of purpose, insurance, proof of income and address.",
            "Submit your application to the local immigration office — in person or online.",
            "Complete your biometric appointment if you haven't already.",
            "Wait for a decision — this can take from a few weeks to several months, so track your application status.",
          ],
        },
        tax_id: {
          heading: "How to get your tax ID",
          steps: [
            "Work out which number you need: a general ID number or a business tax number.",
            "Gather your passport and, if you have it, proof of address registration.",
            "Submit your application to the local municipal office or tax authority.",
            "Wait for your number to be issued — often possible the same day.",
            "Keep the confirmation document — you'll need the number for employment, banking, and health insurance.",
          ],
        },
        employment_registration: {
          heading: "How to formalize your employment",
          steps: [
            "Check with your employer which type of work permit or contract you need.",
            "Prepare your documents: passport, residence permit or work visa, diploma if required.",
            "Sign your employment contract and make sure your employer files the required notifications.",
            "Get your social insurance number if you don't have one yet.",
            "Confirm that contributions and taxes are being deducted correctly from your first paycheck.",
          ],
        },
      },
      howToGetQuestion: "How do I get: {title}?",
      home: {
        flightHeading: "Your journey",
        flightSub: "The more steps you complete, the closer the plane gets to your destination.",
        flightOriginPlaceholder: "Your country",
        greeting: "Hi, {name}! 👋",
        guestGreeting: "Hi there! 👋",
        greetingSubtitle: "Here's how your move to {country} is progressing.",
        stepsLabel: "Steps completed",
        phaseLabel: "Current phase",
        daysLabel: "Days since joining",
        quickActionsHeading: "Quick actions",
        quickActionRoadmapDesc: "Check your step-by-step progress",
        quickActionDocumentsDesc: "Upload and track your documents",
        quickActionAiDesc: "Ask the AI assistant a question",
        quickActionBanksDesc: "Find a bank for newcomers",
        quickActionWorkDesc: "Search jobs and check salaries",
        currentStepCta: "Go to step →",
      },
    },
    guideCard: {
      whenToGet: "When to apply",
      whereToSubmit: "Where to submit",
      showOnMap: "Show on map",
      onMap: "On map",
      workingHours: "Working hours",
      onlineBooking: "Online booking",
      cost: "Cost",
      waitingTime: "Waiting time",
      requiredDocs: "Documents",
      howToApply: "How to apply",
      tips: "Tips",
      commonMistakes: "Common mistakes",
      officialSite: "Official website",
      downloadForm: "Download form",
      fillWithAi: "Fill with AI",
      askAi: "Ask AI",
      askAiAriaTemplate: "Ask AI about {name}",
      askAiBankQuestionTemplate:
        "Tell me more about {name}: how to open an account, what documents are needed, and what to watch out for?",
      askAiTopicQuestionTemplate:
        'Tell me more about "{name}": how to apply, what documents are needed, and what to watch out for?',
      yourBank: "Your bank",
      chooseBank: "Choose bank",
      bankInfo: "Bank information",
      classicAccount: "Classic account",
      moreDetails: "More details",
      allTag: "All",
      citizenshipNote: "Showing guides relevant to your citizenship.",
      loading: "Loading…",
      searchGeneric: "Search",
      searchBanks: "Search banks",
      searchInsurance: "Search insurance",
      searchGuides: "Search guides",
      important2026Badge: "Important 2026",
      moreBanksTemplate: "{n} more banks",
      statusDone: "Done",
      statusNotStarted: "Not started",
      urgentAria: "Requires urgent attention",
      start: "Start",
      compareBanksTitle: "Bank comparison",
      tagsLabel: "Tags",
      tags: { noPesel: "No PESEL", fullyOnline: "Fully online", free: "Free", multicurrency: "Multi-currency" },
      headlines: {
        noPesel: "No PESEL",
        fullyOnline: "Open an account online",
        free: "Free service",
        multicurrency: "Multi-currency account",
      },
    },
    helpButton: {
      label: "How to get this?",
      openGuide: "📄 Open instructions",
      askAi: "💬 Ask AI",
      askAiFooter: "Still have questions? Ask AI →",
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
      aiPickHeading: "AI-powered matching",
      aiPickSubtitle: "Describe what you're looking for — a university, school, kindergarten, or courses — and we'll find matching options.",
      aiPickPlaceholder: "E.g.: a private kindergarten near the center for a 3-year-old",
      findBtn: "Find",
      findingBtn: "Searching…",
      resetBtn: "Reset",
      searchByNamePlaceholder: "Search by name",
      addressLabel: "Address",
      showOnMapBtn: "Show on map →",
      forWhomLabel: "For whom",
      languageLabel: "Language",
      scheduleLabel: "Schedule",
      costLabel: "Cost",
      documentsLabel: "Documents: ",
      priceOnRequestText: "Contact for price",
      askAiBtn: "Ask AI",
      askAiAriaTemplate: "Ask AI about {name}",
      askAiQuestionTemplate: 'Tell me more about "{name}" in {city}: is it worth choosing, what are the pros and cons, what should I pay attention to?',
      needHelpHeading: "Need help choosing? Ask AI",
      clickHintText: "Clicking a question opens a chat with a ready answer from AI",
      tabQuestions: {
        universities: [
          "How do I apply to a university in Poland?",
          "Do I need to have my diploma recognized (nostrification)?",
          "What scholarships are available for foreigners?",
        ],
        schools: [
          "What's the difference between private and public schools?",
          "How do I enroll a child in school without knowing Polish?",
          "What documents are needed for enrollment?",
        ],
        kindergartens: [
          "Do I need a PESEL for kindergarten?",
          "How does the queue for public kindergartens work?",
          "How much does a private kindergarten cost?",
        ],
        courses: [
          "How do I choose language courses in Poland?",
          "Are there free Polish courses for foreigners?",
          "How long does it take to learn the language to B1?",
        ],
      },
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
          "For banking:\n- mBank — most релокант-friendly, fully English app and support.\n- Revolut — works well even before you have a PESEL number.\n- PKO BP — largest branch network if you prefer in-person banking.\n- Santander — good pick if you need multi-currency accounts.",
        housing: "Housing tips: search OLX, Otodom, or Gratka for listings. Never send a deposit before viewing the apartment in person or on a live video call. Get your rental contract in Polish — it has to be in Polish to be legally enforceable. Budget for a security deposit (1–2 months' rent) plus czynsz (building maintenance fees) on top of rent.",
        documents: "Common documents you'll need: passport, visa or residence permit application, proof of address, PESEL confirmation, health insurance certificate, and (if working) your employment contract or work permit. I can walk you through any of these in more detail.",
        visa: "Visa needs depend on your citizenship and destination. For Poland, most non-EU citizens need a national visa or residence permit (Karta Pobytu) tied to work, study, or family. For Germany, look into a Job Seeker Visa, Aufenthaltstitel, or EU Blue Card. For Spain, check the Digital Nomad Visa or standard work/residence routes via NIE registration.",
        default: "I can help with documents, housing, banks, healthcare, or work. What would you like to know more about?",
      },
      actionLabel: "Do this in ReloAI →",
      premiumLabel: "Available in Premium →",
      pageTitle: "AI Assistant",
      pageSubtitle: "Your personal relocation assistant",
      newChat: "New chat",
      emptyHistory: "History is empty",
      todayLabel: "Today",
      thisWeekLabel: "This week",
      olderLabel: "Earlier",
      deleteChatAria: "Delete chat",
      assistantName: "ReloAI assistant",
      online: "Online",
      greetingHeading: "How can I help?",
      greetingSubtitle: "Ask a question about relocating — or pick one of the examples below.",
      defaultChatTitle: "New chat",
      deleteModalTitle: "Delete this chat?",
      deleteModalBody: "This action cannot be undone. The conversation will be permanently deleted.",
      deleteConfirm: "Delete",
      deleteCancel: "Cancel",
    },
    demo: {
      bannerText: "You are in preview mode. Register to save your progress and access all features.",
      registerNow: "Register Now",
      floatingGreeting: "👋 You're exploring ReloAI — Register free to save progress",
      dismissAria: "Dismiss",
      promptHeading: "Register to unlock this feature",
      promptBody: "Create a free account to save your progress and unlock every feature.",
      promptDismiss: "Maybe later",
    },
    onboarding: {
      stepLabel: "Step {current} of {total}",
      back: "Back",
      cancel: "Cancel",
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
        goal: { question: "What's your main goal?", subheading: "You can pick more than one — this decides which pathways we'll analyze for you." },
        jobOffer: { question: "Do you already have a job offer?", subheading: "Helps us know which documents you'll need." },
        universityAccepted: { question: "Have you already been accepted to a university?", subheading: "Determines where your plan starts." },
        studyLevel: { question: "Which program are you enrolling in?", subheading: "Master's and PhD programs require diploma nostrification." },
        businessType: { question: "What type of business are you planning to open?", subheading: "Determines the registration documents you'll need." },
        familyMemberType: { question: "Who is already in Poland?", subheading: "Determines the type of family reunification residence card." },
        hasChildren: { question: "Are your children moving with you?", subheading: "We'll show school/kindergarten documents if needed." },
        foreignEmployer: { question: "Do you already have a foreign employer or clients?", subheading: "Affects which residence card type applies to you." },
        registerIp: { question: "Are you planning to register a sole proprietorship in Poland?", subheading: "Determines whether you need NIP, ZUS and business registration." },
        timeline: { question: "When are you planning to move?", subheading: "Helps us prioritize your plan." },
        hasCar: { question: "Do you have a car you're bringing to Poland?", subheading: "If so, we'll add license exchange, car registration and insurance." },
      },
      goalOptions: {
        work: "Work",
        workDesc: "Have an offer or looking for work",
        study: "Study",
        studyDesc: "University or college",
        business: "Business",
        businessDesc: "Open a sole proprietorship or LLC",
        family: "Family",
        familyDesc: "Spouse/parent/child already in Poland",
        remote: "Remote work",
        remoteDesc: "Work for a foreign employer or freelance",
        savings: "Moving on personal savings",
        savingsDesc: "Moving without a job, on savings",
        other: "Other",
      },
      jobOfferOptions: {
        yes: "Yes — I already have an invitation from a Polish company",
        no: "No — I'm looking for work on my own",
      },
      universityAcceptedOptions: {
        yes: "Yes — I have proof of enrollment",
        no: "No — not accepted yet",
      },
      studyLevelOptions: { bachelor: "Bachelor's", master: "Master's", phd: "PhD" },
      businessTypeOptions: {
        jdg: "Sole proprietorship (JDG) — self-employment",
        spzoo: "LLC (Sp. z o.o.) — limited liability company",
        undecided: "Not decided yet",
      },
      familyMemberTypeOptions: {
        spouse: "Spouse / partner",
        parent: "Parent",
        child: "Child",
        multiple: "Multiple family members",
      },
      hasChildrenOptions: { yes: "Yes", no: "No" },
      foreignEmployerOptions: {
        yes: "Yes — I work for a foreign company",
        no: "No — I'm a freelancer looking for clients",
      },
      registerIpOptions: {
        yes: "Yes — I want to work officially",
        no: "No — not planning to yet",
      },
      timelineOptions: {
        already: "Already in Poland",
        month1: "Within 1 month",
        months3: "Within 3 months",
        months6: "Within 6 months",
        year1: "Within a year",
        exploring: "Just exploring options",
      },
      hasCarOptions: {
        yes: "Yes — bringing my own car",
        no: "No — no car",
      },
      results: {
        heading: "We found 3 relocation routes for you!",
        loading: "Generating your personalized routes...",
        selectButton: "Choose this route",
        selecting: "Selecting…",
        currentRoute: "Current route",
        recommended: "Recommended",
        speedFast: "High speed",
        speedMedium: "Medium speed",
        speedSlow: "Low speed",
        difficultyEasy: "Low difficulty",
        difficultyMedium: "Medium difficulty",
        difficultyHard: "High difficulty",
        approvalRate: "Approval rate",
        timeline: "Timeline",
        cost: "Cost",
        steps: "Steps",
        bestFor: "Best for",
        selectError: "Couldn't save your selected route. Please try again.",
        incompleteHeading: "Please finish the questionnaire first — we need your citizenship and goal to build your routes.",
        incompleteCta: "Continue the questionnaire",
      },
    },
  },
  ru: {
    nav: {
      howItWorks: "Как это работает",
      features: "Функции",
      countries: "Страны",
      pricing: "Цены",
      reviews: "Отзывы",
      faq: "Вопросы",
      login: "Войти",
      getStarted: "Начать",
      goToDashboard: "Мой план →",
    },
    common: {
      cancelBtn: "Отмена",
      logoutBtn: "Выйти",
      logoutConfirmTitle: "Выйти из аккаунта?",
      logoutConfirmBody: "Вы уверены, что хотите выйти?",
      cityLabel: "Город",
      chosenByCountTemplate: "Уже выбрали {n}+ человек через ReloAI",
    },
    hero: {
      badge: "Ваш AI-гид по переезду",
      headline1: "Переезд в Европу",
      headline2: "— это просто.",
      subtext:
        "ReloAI планирует вашу визу, документы, жильё и банковские дела — шаг за шагом, простым языком. Задайте вопрос и получите персональный план за секунды.",
      getStarted: "Начать",
      seeHowItWorks: "Как это работает",
      trustCountries: "3 страны",
      trustLanguages: "6 языков",
      trustFree: "Бесплатно для старта",
      trustSocialProof: "Более 1000 человек уже успешно переехали с ReloAI",
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
      docQuestion: "А какие документы нужны в первую очередь?",
      docResponse: "Вот 2 документа, с которых стоит начать:",
      inputPlaceholder: "Спросите о жизни в Польше...",
      docCardPassportTitle: "Скан паспорта",
      docCardPassportSubtitle: "Нужен почти для всех шагов",
      docCardInsuranceTitle: "Мед. страховка",
      docCardInsuranceSubtitle: "Обязательна для ВНЖ",
      docStatusDone: "Готово",
      docStatusPending: "На проверке",
    },
    stats: {
      items: [
        { value: "3", label: "Страны" },
        { value: "100x", label: "Дешевле" },
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
          flag: "pl",
          name: "Польша",
          nameDeclined: "Польшу",
          highlight: "Быстрорастущий tech-хаб",
          points: [
            "Разбор Karta Pobytu (вид на жительство)",
            "Регистрация PESEL и местный банк",
            "Гид по средней арендной плате по городам",
          ],
        },
        {
          flag: "de",
          name: "Германия",
          nameDeclined: "Германию",
          highlight: "EU Blue Card и визы для поиска работы",
          points: [
            "Anmeldung и приёмы в Bürgeramt",
            "Медстраховка (государственная vs частная)",
            "Налоговый номер и виза для фрилансеров",
          ],
        },
        {
          flag: "es",
          name: "Испания",
          nameDeclined: "Испанию",
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
    directions: {
      label: "НАПРАВЛЕНИЯ",
      heading: "Куда вы переезжаете?",
      subheading: "Персональный план для вашей страны — за секунды.",
      comingSoonBadge: "Скоро будет доступно",
      ctaLabel: "Начать",
      comingSoonCta: "Скоро",
      cards: [
        { name: "Польша", subtitle: "Стабильная Европа для старта" },
        { name: "Германия", subtitle: "Blue Card и карьера в IT" },
        { name: "Испания", subtitle: "Море, солнце и Digital Nomad" },
      ],
    },
    pricing: {
      heading: "Тарифы",
      subheading: "Начните бесплатно.",
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
      heading: "Отзывы",
      subheading: "Реальные люди. Реальные переезды.",
      items: [
        {
          name: "Анна К.",
          route: "Украина → Польша",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Получила PESEL за 2 дня. Без ReloAI потратила бы неделю на поиски информации.",
          initials: "АК",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Михаил С.",
          route: "Россия → Германия",
          fromFlag: "ru",
          toFlag: "de",
          rating: 5,
          quote: "AI помог разобраться с Anmeldung. Объяснил всё на русском, дал адреса бюро.",
          initials: "МС",
          documentBadge: { country: "de", label: "Anmeldung" },
        },
        {
          name: "Ольга М.",
          route: "Беларусь → Испания",
          fromFlag: "by",
          toFlag: "es",
          rating: 5,
          quote: "Открыла бизнес в Испании. Чеклист сэкономил месяц работы и 2000 евро на юристе.",
          initials: "ОМ",
          documentBadge: { country: "es", label: "Alta de Autónomo" },
        },
        {
          name: "Дмитрий П.",
          route: "Казахстан → Польша",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 4,
          quote: "Прогресс-трекер очень помогает. Всегда знаю на каком шаге нахожусь.",
          initials: "ДП",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Лейла Р.",
          route: "Узбекистан → Германия",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Нашла работу в Германии через раздел вакансий. AI написал сопроводительное письмо.",
          initials: "ЛР",
          documentBadge: { country: "de", label: "Anschreiben" },
        },
        {
          name: "Тимур А.",
          route: "Таджикистан → Испания",
          fromFlag: "tj",
          toFlag: "es",
          rating: 5,
          quote: "NIE получил за 3 недели. Раньше думал это займёт полгода.",
          initials: "ТА",
          documentBadge: { country: "es", label: "NIE" },
        },
        {
          name: "Карина Н.",
          route: "Украина → Германия",
          fromFlag: "ua",
          toFlag: "de",
          rating: 5,
          quote: "Переехала с семьёй. Нашли школу для детей и врача говорящего по-русски.",
          initials: "КН",
          documentBadge: { country: "de", label: "Familiennachzug" },
        },
        {
          name: "Артём В.",
          route: "Россия → Испания",
          fromFlag: "ru",
          toFlag: "es",
          rating: 4,
          quote: "Digital Nomad Visa — оформил за 6 недель по инструкции ReloAI.",
          initials: "АВ",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Зарина И.",
          route: "Казахстан → Польша",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Открыла счёт в mBank с первого раза. AI подсказал какие документы взять.",
          initials: "ЗИ",
          documentBadge: { country: "pl", label: "mBank" },
        },
        {
          name: "Богдан Ф.",
          route: "Украина → Польша",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Лучший сервис для переезда. Сэкономил время и нервы.",
          initials: "БФ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Алексей К.",
          route: "Казахстан → Польша",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Получил PESEL за 3 дня, AI подсказал все документы заранее.",
          initials: "АК",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Нилуфар Р.",
          route: "Узбекистан → Польша",
          fromFlag: "uz",
          toFlag: "pl",
          rating: 5,
          quote: "Нашла жильё в Варшаве за неделю с помощью ReloAI.",
          initials: "НР",
          documentBadge: { country: "pl", label: "Wynajem mieszkania" },
        },
        {
          name: "Дмитрий В.",
          route: "Беларусь → Германия",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Blue Card оформил без юриста, сэкономил €2000.",
          initials: "ДВ",
          documentBadge: { country: "de", label: "Blue Card" },
        },
        {
          name: "Малика С.",
          route: "Таджикистан → Польша",
          fromFlag: "tj",
          toFlag: "pl",
          rating: 5,
          quote: "Открыла счёт в PKO BP с первого раза, AI подготовил список документов.",
          initials: "МС",
          documentBadge: { country: "pl", label: "PKO BP" },
        },
        {
          name: "Анна П.",
          route: "Украина → Испания",
          fromFlag: "ua",
          toFlag: "es",
          rating: 5,
          quote: "Digital Nomad Visa — всё по шагам, оформила за месяц.",
          initials: "АП",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Азиз Т.",
          route: "Узбекистан → Германия",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Поступил в университет в Мюнхене, AI помог собрать документы для студенческой визы.",
          initials: "АТ",
          documentBadge: { country: "de", label: "Studentenvisum" },
        },
        {
          name: "Светлана И.",
          route: "Россия → Польша",
          fromFlag: "ru",
          toFlag: "pl",
          rating: 5,
          quote: "Переехала с мужем и детьми, нашли садик и школу за две недели.",
          initials: "СИ",
          documentBadge: { country: "pl", label: "Przedszkole i szkoła" },
        },
        {
          name: "Роман К.",
          route: "Беларусь → Германия",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Открыл ИП в Берлине, чеклист помог со всеми справками.",
          initials: "РК",
          documentBadge: { country: "de", label: "Gewerbeanmeldung" },
        },
        {
          name: "Динара Ж.",
          route: "Казахстан → Польша",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Поступила в Варшавский университет, получила карту побыту студента без проблем.",
          initials: "ДЖ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Юлия Н.",
          route: "Украина → Испания",
          fromFlag: "ua",
          toFlag: "es",
          rating: 4,
          quote: "Нашла удалённую работу и оформила NIE за месяц, всё по инструкции.",
          initials: "ЮН",
          documentBadge: { country: "es", label: "NIE" },
        },
      ],
    },
    faq: {
      heading: "Частые вопросы",
      subheading: "Всё, что нужно знать перед началом переезда.",
      items: [
        {
          question: "Что такое ReloAI и как это работает?",
          answer: "ReloAI — это AI-платформа которая помогает людям переехать в Европу. Вы отвечаете на несколько вопросов о себе — откуда вы, куда хотите переехать и с какой целью. На основе ваших ответов ReloAI автоматически составляет персональный план переезда с полным списком документов, сроками и пошаговыми инструкциями. Всё в одном месте — документы, жильё, банки, медицина, работа, образование, страхование и многое другое, а также AI-ассистент который отвечает на любые вопросы 24/7.",
        },
        {
          question: "Чем ReloAI отличается от юриста по иммиграции?",
          answer: "Юрист стоит от 500 до 3000 евро и работает только в рабочее время. ReloAI доступен 24/7, стоит в разы дешевле и даёт такую же точную информацию по документам и процедурам.",
        },
        {
          question: "В какие страны можно переехать с ReloAI?",
          answer: "Сейчас доступна Польша — одно из самых популярных направлений для переезда из СНГ. В ближайшее время добавим Германию и Испанию. Со всеми доступными странами для переезда вы можете ознакомиться более детально на нашем сайте. ReloAI поддерживает переезд из более чем 40 стран — Украина, Беларусь, Россия, Узбекистан, Таджикистан, Казахстан, Турция, Молдова и многие другие.",
        },
        {
          question: "Какие документы нужны для переезда и как ReloAI помогает их собрать?",
          answer: "Список документов зависит от вашего гражданства и цели переезда. После прохождения онбординга ReloAI автоматически показывает только те документы которые нужны именно вам — без лишней информации. По каждому документу ReloAI предоставляет исчерпывающую информацию — точные адреса учреждений во всех крупных городах, актуальные часы работы, полный список документов которые нужно взять с собой, стоимость всех пошлин и сборов, реальные сроки ожидания, пошаговую инструкцию и разбор самых частых ошибок. Ничего лишнего — только то что действительно нужно именно вам.",
        },
        {
          question: "Как AI генерирует мой план переезда?",
          answer: "Вы отвечаете на 5 вопросов в онбординге — гражданство, страна назначения, цель переезда, наличие оффера о работе и сроки. На основе этих данных ReloAI подбирает нужные документы из базы данных и составляет пошаговый план с реальными сроками. Например, узбек который едет работать в Польшу получит план: Виза D → Регистрация адреса → PESEL → Банковский счёт → Разрешение на работу → Карта побыту.",
        },
        {
          question: "Сколько времени занимает переезд по плану ReloAI?",
          answer: "Зависит от вашей ситуации. В среднем: безвизовые страны (Украина, Молдова) — от 1 до 3 месяцев до полной легализации. Визовые страны (Узбекистан, Казахстан и другие) — от 3 до 6 месяцев с учётом получения визы D. ReloAI показывает реальные сроки по каждому документу чтобы вы могли планировать заранее.",
        },
        {
          question: "Это платно? Сколько стоит?",
          answer: "ReloAI имеет бесплатный план с базовым доступом к одной стране и 5 AI-сообщениями в день. Для полного доступа есть два платных тарифа: Premium — 29€ в месяц: все страны, 50 AI-сообщений в день, загрузка документов, полная база адресов. Pro — 49€ в месяц: всё из Premium плюс безлимитный AI-чат, автозаполнение документов, приоритетная поддержка.",
        },
        {
          question: "На каких языках работает сервис?",
          answer: "ReloAI работает на 6 языках: русский, английский, узбекский, турецкий, таджикский и украинский. Вы можете выбрать язык при регистрации или изменить его в настройках в любой момент.",
        },
        {
          question: "Можно ли отменить подписку в любой момент?",
          answer: "Да. Подписку можно отменить в любое время в разделе «Профиль» — без штрафов и скрытых условий. После отмены вы сохраняете доступ до конца оплаченного периода, затем аккаунт переходит на бесплатный план. Все ваши данные и документы сохраняются.",
        },
        {
          question: "Как ReloAI защищает мои личные данные?",
          answer: "Все данные хранятся на защищённых серверах с шифрованием. Мы не передаём ваши данные третьим лицам. Документы которые вы загружаете доступны только вам. ReloAI соответствует требованиям GDPR — европейского закона о защите персональных данных.",
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
      backToLanding: "На сайт",
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
        confirmPasswordLabel: "Подтвердите пароль",
        passwordMismatch: "Пароли не совпадают",
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
      subtitle: "Полный обзор вашей релокации.",
      logOut: "Выйти",
      planLabel: "План",
      upgradeTooltip: "Улучшить план",
      upgradeBadge: "⚡ Улучшить до Premium",
      upgradeToProBadge: "⚡ Улучшить до Pro",
      maxPlanBadge: "✓ Максимальный план",
      unnamed: "Без имени",
      memberSinceLabel: "На платформе с",
      personalSection: "Личные данные",
      relocationSection: "Профиль релокации",
      destinationLabel: "Переезжает в",
      routeLabel: "Выбранный маршрут легализации",
      noRouteSelected: "Маршрут ещё не выбран",
      chooseRoute: "Выбрать маршрут",
      routeModalSubheading: "Выберите один из вариантов ниже — маршрут можно поменять в любой момент.",
      jobOfferLabel: "Есть предложение о работе",
      alreadyAdmittedLabel: "Уже зачислен(а)",
      yes: "Да",
      no: "Нет",
      notSet: "Не указано",
      progressSection: "Обзор прогресса",
      currentStepLabel: "Текущий шаг",
      stepsCompletedLabel: "Выполнено {completed} из {total} шагов",
      allStepsDone: "Все шаги выполнены!",
      documentsSection: "Статус документов",
      viewAllDocuments: "Все документы",
      editBtn: "Изменить данные о релокации",
      changeRouteBtn: "Изменить план переезда",
      editModalTitle: "Изменить данные о релокации",
      cityLabel: "Город",
      cityPlaceholder: "например, Варшава",
      saveBtn: "Сохранить изменения",
      saved: "Сохранено",
    },
    topbar: {
      searchPlaceholder: "Поиск документов, задач...",
      upgrade: "Улучшить",
      openMenuAria: "Открыть меню",
      avatarAria: "Перейти в профиль",
    },
    notifications: {
      bellAria: "Открыть уведомления",
      title: "Уведомления",
      markAllRead: "Отметить все как прочитанные",
      empty: "Пока нет уведомлений",
      registrationTitle: "Спасибо за регистрацию! 🎉",
      registrationMessage: "Поздравляем, вы успешно зарегистрировались в ReloAI.",
      welcomeTitle: "Анкета заполнена! 🎉",
      welcomeMessage: "Вы успешно заполнили данные анкеты и выбрали план релокации ({route}). Вы можете изменить эти данные в любой момент в настройках профиля.",
      checklistTitle: "Дорожная карта обновлена ✅",
      checklistMessage: "Вы пересоздали план релокации ({route}). Прогресс по новой дорожной карте начнётся заново — прежние данные анкеты можно посмотреть и изменить в настройках профиля.",
      inactivityTitle: "Не забывайте о вашем плане переезда",
      inactivityMessage: "Вернитесь, чтобы продолжить с того места, где остановились.",
      documentTitle: "Документ загружен и отправлен на проверку",
      documentMessage: "Мы уведомим вас, как только он будет проверен.",
    },
    sidebar: {
      documents: "Документы",
      housing: "Жильё",
      banks: "Банки",
      medicine: "Медицина",
      insurance: "Страхование",
      work: "Работа",
      community: "Сообщество",
      education: "Образование",
      otherServices: "Другие услуги",
      profile: "Профиль",
      settings: "Настройки",
      logout: "Выход",
    },
    settings: {
      title: "Настройки",
      subtitle: "Управляйте оформлением и поведением ReloAI.",
      languageSection: "Язык",
      languageDesc: "ReloAI будет общаться с вами на этом языке.",
      currencySection: "Валюта",
      currencyDesc: "В какой валюте показывать цены на сайте (курс к злотому обновляется автоматически).",
      saving: "(сохранение…)",
      themeSection: "Оформление",
      themeDesc: "Выберите, как ReloAI выглядит на вашем устройстве.",
      themeDark: "Тёмная",
      themeLight: "Светлая",
      notifications: "Уведомления",
      notifEmail: "Email-рассылка",
      notifEmailDesc: "Время от времени — новости и советы.",
      notifDocuments: "Напоминания о документах",
      notifDocumentsDesc: "Предупреждения перед истечением срока.",
      notifProduct: "Новости продукта",
      notifProductDesc: "Новые функции и обновления.",
      accountSection: "Аккаунт",
      nameLabel: "Имя",
      emailLabel: "Email",
      saveBtn: "Сохранить изменения",
      saved: "Сохранено",
      dangerSection: "Опасная зона",
      dangerDesc: "Удаление аккаунта удалит все ваши данные. Это необратимо.",
      deleteAccountBtn: "Удалить аккаунт",
      deleteConfirmTitle: "Удалить аккаунт?",
      deleteConfirmBody: "Ваш профиль и данные будут удалены безвозвратно. Это действие нельзя отменить.",
      deleteConfirmBtn: "Удалить аккаунт",
    },
    documents: {
      title: "Документы",
      subtitle: "Документы, которые нужны именно вам, — в одном месте.",
      tabs: {
        all: "Все",
        passport: "Паспорт",
        pesel: "PESEL",
        workPermit: "Разрешение на работу",
        insurance: "Страховка",
        bank: "Банк",
        biometric: "Биометрия",
        address: "Адрес",
        residencePermit: "Карта побыту",
        taxId: "NIP",
        employment: "Трудоустройство",
        business: "Бизнес",
      },
      status: { verified: "Готово", pending: "На проверке", missing: "Отсутствует", locked: "Premium" },
      upload: "Перетащите файл или нажмите, чтобы загрузить",
      uploadBtn: "Загрузить",
      addDocumentBtn: "Загрузить документ",
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
        biometricConfirmation: "Подтверждение биометрии",
        addressConfirmation: "Подтверждение регистрации адреса",
        residencePermitScan: "Скан карты побыту",
        taxIdConfirmation: "Подтверждение NIP",
        employmentContract: "Трудовой договор",
        businessRegistrationConfirmation: "Подтверждение регистрации бизнеса",
      },
      docHints: {
        passportScan: "Нужен для большинства официальных процедур",
        passportPhoto: "Требуется для оформления Karta Pobytu",
        peselForm: "Первый шаг к получению номера PESEL",
        peselLetter: "Подтверждает присвоение номера PESEL",
        workPermitApp: "Нужно для легального трудоустройства",
        sponsorshipLetter: "Подтверждает трудоустройство у работодателя-спонсора",
        healthInsurance: "Обязательна для оформления резиденции",
        travelInsurance: "Нужна на период до получения NFZ",
        bankConfirmation: "Требуется для открытия банковского счёта",
        proofOfFunds: "Подтверждает наличие средств для проживания",
        relocationLetter: "Доступно с Premium-подпиской",
        taxResidency: "Доступно с Premium-подпиской",
        biometricConfirmation: "Загрузите после сдачи биометрии в Urząd do Spraw Cudzoziemców",
        addressConfirmation: "Zaświadczenie о регистрации адреса (zameldowanie)",
        residencePermitScan: "Скан полученной карты побыту (kartę pobytu)",
        taxIdConfirmation: "Подтверждение присвоения NIP из налоговой",
        employmentContract: "Подписанный трудовой договор (umowa o pracę)",
        businessRegistrationConfirmation: "Подтверждение регистрации CEIDG",
      },
      uploadGuides: {
        passportScan:
          "Сфотографируйте разворот паспорта с фото и личными данными, а также страницу с визой или отметкой о пребывании, если она есть. Снимок должен быть чётким, без бликов и обрезанных краёв.",
        passportPhoto: "Загрузите фото на документы: анфас, без головного убора, на светлом однотонном фоне, соответствующее биометрическим требованиям.",
        peselForm: "Загрузите заполненную и подписанную анкету на присвоение номера PESEL.",
        peselLetter: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        workPermitApp: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        sponsorshipLetter: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        healthInsurance: "Загрузите полис медицинской страховки — должны быть видны срок действия и номер полиса.",
        travelInsurance: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        bankConfirmation: "Загрузите выписку или справку из банка с указанием номера счёта и данных владельца.",
        proofOfFunds: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        relocationLetter: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        taxResidency: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        biometricConfirmation: "Загрузите подтверждение или квитанцию о записи на сдачу биометрических данных.",
        addressConfirmation: "Загрузите договор аренды или подтверждение регистрации адреса (zameldowanie) с чётко видимым адресом.",
        residencePermitScan: "Сфотографируйте карту побыту с обеих сторон — лицевую сторону с фото и оборотную сторону с данными.",
        taxIdConfirmation: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        employmentContract: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
        businessRegistrationConfirmation: "Сделайте чёткое фото или скан документа, все данные должны быть хорошо видны.",
      },
      progressSummary: "Готово: {completed} из {total} документов",
      autoCompleteToast: "✓ Шаг выполнен автоматически",
      sectionCompleteHeading: "🎉 Раздел завершён!",
      sectionCompleteBody: "Переходите к следующему шагу.",
      sectionCompleteDismiss: "Продолжить",
      deleteConfirmTitle: "Удалить документ?",
      deleteConfirmBody: "Это действие нельзя отменить. Документ будет удалён безвозвратно.",
      cancelBtn: "Отмена",
      uploadModal: {
        dropzoneLabel: "Выбрать файл",
        dropzoneHint: "PDF, JPG или PNG",
        confirmBtn: "Загрузить",
      },
    },
    housing: {
      title: "Жильё в Польше",
      subtitle: "Найдите жильё с умом.",
      rentMarket: "🏆 Топ-4 района по соотношению цена/качество",
      rentMarketSub: "Наши эксперты и тысячи экспатов выбрали эти районы как лучшие для жизни по соотношению цены, комфорта и инфраструктуры.",
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
        mokotow: "Лучший баланс цены и качества. Тихий, зелёный, метро.",
        wola: "Современный район, много новостроек, близко к центру.",
        zoliborz: "Уютный, безопасный, любимый среди релокантов.",
        ochota: "Тихий район рядом с центром, хорошая инфраструктура, метро, популярен среди студентов и релокантов.",
      },
      bestValueBadge: "Рекомендуем",
      expatsChoiceBadge: "Выбор релокантов",
      showAllDistricts: "Показать все {count} районов {city} →",
      showFewerDistricts: "Свернуть список районов",
      roomsLabel: "Комнат",
      roomsAny: "Любое",
      roomsStudio: "Студия",
      rooms2: "2 комнаты",
      rooms3: "3 комнаты",
      noDistrictsText: "Нет данных по районам для {city}.",
      searchWithFiltersBtn: "Искать с этими фильтрами →",
      guides: {
        olx: {
          heading: "Как искать жильё на OLX",
          steps: [
            "Перейдите в раздел «Недвижимость» → «Аренда» и задайте фильтры по городу, цене и числу комнат.",
            "Сохраняйте объявления и настройте уведомления о новых предложениях по вашим критериям.",
            "Пишите продавцу через встроенный чат — никогда не переводите деньги до личного просмотра квартиры.",
            "Договоритесь о просмотре и проверьте состояние квартиры и документы перед подписанием договора.",
          ],
          aiQuestion: "Как искать жильё на OLX?",
        },
        otodom: {
          heading: "Как искать жильё на Otodom",
          steps: [
            "Используйте расширенные фильтры Otodom — метро, этаж, наличие мебели — чтобы сузить поиск.",
            "Обращайте внимание на пометку «от собственника» — часто это означает отсутствие комиссии агентству.",
            "Свяжитесь с объявителем через сайт и уточните доступность даты просмотра.",
            "Перед подписанием договора попросите протокол приёма-передачи квартиры (protokół zdawczo-odbiorczy).",
          ],
          aiQuestion: "Как искать жильё на Otodom?",
        },
        gratka: {
          heading: "Как искать жильё на Gratka",
          steps: [
            "Задайте регион и бюджет в поиске Gratka — сервис особенно силён за пределами крупных городов.",
            "Проверяйте дату публикации объявления — старые объявления часто уже неактуальны.",
            "Свяжитесь с продавцом по телефону или через форму на сайте, чтобы уточнить детали.",
            "Перед оплатой залога всегда просите договор аренды и проверяйте право собственности.",
          ],
          aiQuestion: "Как искать жильё на Gratka?",
        },
      },
    },
    banks: {
      title: "Банки в Польше",
      subtitle: "Сравните счета, созданные для новоприбывших.",
      openAccount: "Открыть счёт",
      bestForExpats: "Лучший для релокантов",
      features: {
        pkobp: ["Самая большая сеть отделений в Польше", "Приложение на польском и английском", "Бесплатные варианты студенческого счёта"],
        mbank: ["Полностью англоязычное приложение и поддержка", "Мгновенное открытие счёта онлайн", "Без комиссий даже без номера PESEL"],
        santander: ["Мультивалютные счета", "Международная банковская сеть", "Бесплатное использование карты за границей"],
        revolut: ["PESEL не требуется для начала", "Мультивалютный кошелёк", "Лучший вариант для цифровых кочевников"],
      },
      guide: {
        heading: "Как открыть счёт в Польше — пошаговая инструкция",
        steps: [
          "🪪 Получите PESEL — без него большинство банков не откроют счёт",
          "📄 Подготовьте документы — паспорт, подтверждение адреса (договор аренды), PESEL",
          "🏦 Выберите банк — онлайн-банки (mBank, ING) проще для иностранцев",
          "📱 Откройте онлайн или лично — mBank и Revolut можно открыть полностью онлайн",
          "✅ Активируйте карту — придёт по почте в течение 5-7 дней",
        ],
        tipsHeading: "💡 Советы",
        tips: [
          "mBank и ING — самые лояльные к иностранцам",
          "Revolut открывается без PESEL за 10 минут",
          "PKO BP и Pekao требуют личного визита",
          "Возьмите с собой договор аренды как подтверждение адреса",
        ],
      },
      openAccountAt: "Как открыть счёт в {bank}",
      guides: {
        pkobp: {
          heading: "Как открыть счёт в PKO BP",
          steps: [
            "Получите PESEL — PKO BP, как и большинство традиционных банков, требует его для открытия счёта.",
            "Запишитесь на приём в ближайшее отделение — у PKO BP самая большая сеть в Польше, найти отделение легко.",
            "Возьмите с собой паспорт, PESEL и подтверждение адреса (например, договор аренды).",
            "Подпишите договор на месте — сотрудник поможет выбрать подходящий тип счёта и оформить карту.",
          ],
          aiQuestion: "Как открыть счёт в PKO BP?",
        },
        mbank: {
          heading: "Как открыть счёт в mBank",
          steps: [
            "Скачайте приложение mBank или зайдите на сайт — весь процесс можно пройти онлайн, без визита в отделение.",
            "Заполните заявку и подтвердите личность через видеозвонок или курьера с проверкой паспорта.",
            "Укажите PESEL, если он у вас уже есть — это ускорит открытие счёта, но не обязательно на старте.",
            "Дождитесь одобрения — обычно счёт открывается в течение одного дня, приложение полностью на английском.",
          ],
          aiQuestion: "Как открыть счёт в mBank?",
        },
        santander: {
          heading: "Как открыть счёт в Santander",
          steps: [
            "Выберите тип счёта — Santander предлагает мультивалютные счета, удобные для международных переводов.",
            "Подготовьте паспорт, PESEL и подтверждение адреса.",
            "Запишитесь на приём в отделение или подайте заявку онлайн, если это доступно для вашего статуса.",
            "Активируйте карту и подключите мобильный банкинг — картой можно бесплатно пользоваться за границей.",
          ],
          aiQuestion: "Как открыть счёт в Santander?",
        },
        revolut: {
          heading: "Как открыть счёт в Revolut",
          steps: [
            "Скачайте приложение Revolut и зарегистрируйтесь по номеру телефона — отделение посещать не нужно.",
            "Подтвердите личность через селфи и скан паспорта прямо в приложении.",
            "PESEL не требуется для открытия счёта — это самый быстрый способ для тех, кто только приехал.",
            "Пополните счёт и начните пользоваться мультивалютным кошельком и картой.",
          ],
          aiQuestion: "Как открыть счёт в Revolut?",
        },
      },
      howToOpenLabel: "Как открыть счёт?",
      emptyText: "Пока нет данных по банкам.",
      faqHeading: "Частые вопросы про открытие счёта",
      faqCaption: "Клик по вопросу сразу открывает чат с готовым ответом от ИИ",
      faqQuestions: [
        "Как открыть счёт без PESEL?",
        "Какие документы нужны?",
        "Сколько дней занимает открытие?",
        "Можно ли открыть онлайн?",
      ],
    },
    medicine: {
      title: "Медицина в Польше",
      subtitle: "Оформите страховку и найдите врача быстро.",
      clinicsTitle: "Клиники",
      clinicsSub: "Варианты с англо-, русско- и украиноязычным персоналом.",
      warsaw: "Варшава",
      languages: {
        ruUa: "Говорят по-русски и по-украински",
        en: "Говорят по-английски",
        ru: "Говорят по-русски",
        ua: "Говорят по-украински",
      },
      bookBtn: "Записаться",
      nfzTitle: "Как получить медицинскую страховку NFZ",
      nfzSteps: [
        "Устройтесь на работу по umowie o pracę → работодатель автоматически регистрирует вас в ZUS",
        "Получите номер PESEL",
        "Подтвердите страховку на сайте eWUŚ (ewus.nfz.gov.pl)",
        "Запишитесь к врачу в любую государственную клинику",
      ],
      nfzAiQuestion: "Как зарегистрироваться в NFZ?",
      stepLabel: "Шаг",
      emergencyTitle: "Скорая помощь и экстренные случаи",
      emergencyNumber: "Номер скорой помощи в Польше: 112 или 999",
      emergencyEr: "Ближайшее отделение неотложной помощи (SOR) принимает без записи и бесплатно",
      emergencyPharmacy: "Дежурная аптека:",
      usefulSitesTitle: "Полезные сайты",
      usefulSites: [
        { url: "znany-lekarz.pl", desc: "Запись к врачу онлайн — есть русскоязычные врачи" },
        { url: "ewus.nfz.gov.pl", desc: "Проверить свою страховку NFZ" },
        { url: "nfz.gov.pl", desc: "Официальный сайт NFZ" },
        { url: "aptekadyzurna.pl", desc: "Найти дежурную аптеку" },
      ],
      dentalTitle: "Стоматология",
      dentalNfz: "NFZ покрывает базовое лечение — пломбы, удаление зубов",
      dentalPrivate: "Частная стоматология: 150–400 PLN за приём",
      dentalChains: "Рекомендуемые сети: Dental+, Medicover Stomatologia",
      aiPickHeading: "Подбор клиники с ИИ",
      aiPickSubtitle: "Опишите свою проблему или какой врач или клиника вам нужны — мы подберём подходящие варианты.",
      aiPickPlaceholder: "Например: болит зуб, нужен стоматолог рядом с центром",
      searchPlaceholder: "Поиск по названию или району",
      allCategoriesLabel: "Все категории",
      allDistrictsLabel: "Все районы",
      clinicsCountTemplate: "{count} клиник",
      notFoundText: "Ничего не найдено для {city}.",
      askAiQuestionTemplate: 'Расскажи подробнее про клинику "{name}" в городе {city}: стоит ли выбрать её, какие плюсы и минусы, на что обратить внимание?',
      learnMoreBtn: "Подробнее",
    },
    insurance: {
      title: "Страхование в Польше",
      subtitle: "Медицинская, автомобильная и другие виды страховок",
      compareTitle: "Государственная vs Частная страховка",
      nfzLabel: "Государственная страховка NFZ",
      nfzTooltip: "NFZ — национальная система здравоохранения Польши",
      privateLabel: "Частная",
      rows: [
        { label: "Стоимость", nfz: "Бесплатно при трудовых отчислениях", pvt: "150–400 злотых/месяц" },
        { label: "Время ожидания", nfz: "От недель до месяцев к специалистам", pvt: "От пары дней до того же дня" },
        { label: "Языковая поддержка", nfz: "В основном только польский", pvt: "Английский, часто русский/украинский" },
        { label: "Охват", nfz: "Широкий, но ограниченный выбор врачей", pvt: "Выбирайте свою клинику и врача" },
      ],
      learnMoreBtn: "Узнать подробнее",
      types: {
        medical: { name: "Медицинская страховка", provider: "Medicover", price: "150–400 zł/мес", desc: "Приватная медицинская страховка для быстрого доступа к врачам-специалистам без очередей." },
        car: { name: "Автомобильная (OC/AC)", provider: "PZU", price: "800–2500 zł/год", desc: "Обязательное ОС (OC) плюс расширенное КАСКО (AC) для полной защиты автомобиля." },
        home: { name: "Страховка жилья", provider: "Warta", price: "200–600 zł/год", desc: "Защита квартиры или дома от пожара, залива и кражи имущества." },
        travel: { name: "Туристическая страховка", provider: "Allianz", price: "20–80 zł/поездка", desc: "Покрытие медицинских расходов и форс-мажоров во время путешествий по Европе." },
      },
      guides: {
        medical: {
          heading: "Как оформить медицинскую страховку",
          steps: [
            "Выберите тип покрытия — базовый пакет или расширенный со стоматологией и специалистами.",
            "Сравните предложения нескольких страховщиков (LUX MED, Medicover, Signal Iduna) по цене и сети клиник.",
            "Оформите полис онлайн или в офисе страховой компании — обычно нужен паспорт и PESEL.",
            "Сохраните номер полиса — он понадобится при записи к врачу.",
          ],
          aiQuestion: "Как оформить медицинскую страховку в Польше?",
        },
        car: {
          heading: "Как оформить автостраховку (OC/AC)",
          steps: [
            "OC (обязательная гражданская ответственность) требуется по закону для любого зарегистрированного автомобиля.",
            "Сравните тарифы OC у нескольких страховщиков — цена сильно варьируется в зависимости от истории вождения.",
            "При желании добавьте AC (страхование от угона и повреждений) для более полной защиты.",
            "Оформите полис онлайн за несколько минут — потребуются данные автомобиля и водительские права.",
          ],
          aiQuestion: "Как оформить автостраховку в Польше?",
        },
        home: {
          heading: "Как оформить страховку жилья",
          steps: [
            "Определите, что нужно застраховать — само жильё, имущество внутри или гражданскую ответственность.",
            "Соберите базовую информацию о квартире: площадь, адрес, тип строения.",
            "Сравните предложения нескольких страховщиков — многие банки предлагают скидку при оформлении вместе с ипотекой.",
            "Оформите полис онлайн или через агента и сохраните подтверждение для арендодателя, если требуется.",
          ],
          aiQuestion: "Как оформить страховку жилья в Польше?",
        },
        travel: {
          heading: "Как оформить туристическую страховку",
          steps: [
            "Определите длительность и цель поездки — от этого зависит нужный уровень покрытия.",
            "Проверьте, что полис покрывает медицинские расходы, эвакуацию и отмену поездки.",
            "Сравните предложения онлайн — оформление занимает пару минут и не требует личного визита.",
            "Сохраните полис в телефоне или распечатайте — он может понадобиться на границе или в больнице.",
          ],
          aiQuestion: "Как оформить туристическую страховку?",
        },
      },
      emptyText: "Пока нет данных по страховкам.",
      aiPromptHeading: "Не знаете, что выбрать?",
      aiPromptSubtitle: "Спросите ИИ — он учтёт вашу ситуацию и подскажет, что подойдёт именно вам",
      aiPromptCta: "Спросить",
      aiPromptQuestion:
        "Что мне выбрать — государственную страховку NFZ или частную? Учти мою ситуацию: работаю ли я официально, нужен ли быстрый доступ к врачам, важен ли бюджет.",
    },
    work: {
      title: "Работа в Польше",
      subtitle: "Контракты, зарплаты и где искать.",
      contractVsB2B: "Трудовой договор против B2B",
      salarySearch: "Поиск зарплаты",
      salarySearchSub: "Введите профессию, чтобы узнать среднюю зарплату.",
      placeholder: "Введите профессию, например: программист",
      averageSalary: "Средняя зарплата в Польше",
      inEuros: "В евро",
      salaryNote: "* Данные приблизительные, зависят от опыта и города",
      noExactData: "Точных данных по этой профессии пока нет — показываем среднюю по стране.",
      jobSites: "Сайты вакансий",
      visitSite: "Перейти на сайт",
      searchByProfession: "Искать вакансии по этой профессии",
      viewVacanciesBtn: "Смотреть вакансии",
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
      guides: {
        employment: {
          heading: "Как оформить трудовой договор (umowa o pracę)",
          steps: [
            "Работодатель обязан заключить с вами письменный трудовой договор до начала работы.",
            "Проверьте, что в договоре указаны должность, зарплата, график и испытательный срок, если он есть.",
            "Работодатель регистрирует вас в ZUS (социальное страхование) — это даёт доступ к NFZ и пенсионным взносам.",
            "Сохраните копию договора — она понадобится для вида на жительство и других процедур.",
          ],
          aiQuestion: "Как оформить трудовой договор в Польше?",
        },
        b2b: {
          heading: "Как оформить контракт B2B (самозанятость)",
          steps: [
            "Зарегистрируйте индивидуальную деятельность (JDG) через сайт CEIDG — это можно сделать онлайн за один день.",
            "Выберите форму налогообложения (общие правила, линейный налог или ryczałt) вместе с бухгалтером.",
            "Подпишите контракт B2B с компанией-заказчиком — это гражданско-правовой, а не трудовой договор.",
            "Ежемесячно платите взносы в ZUS самостоятельно и подавайте налоговую декларацию.",
          ],
          aiQuestion: "Как оформить контракт B2B в Польше?",
        },
        pracuj: {
          heading: "Как искать работу на Pracuj.pl",
          steps: [
            "Создайте профиль и загрузите резюме (CV) — многие вакансии позволяют откликнуться в один клик.",
            "Используйте фильтры по городу, зарплате и уровню английского/польского языка.",
            "Настройте уведомления по ключевым словам вашей профессии, чтобы не пропустить новые вакансии.",
            "Готовьтесь, что часть собеседований проходит на польском — уточняйте язык интервью заранее.",
          ],
          aiQuestion: "Как искать работу на Pracuj.pl?",
        },
        nofluff: {
          heading: "Как искать работу на NoFluffJobs",
          steps: [
            "NoFluffJobs специализируется на IT — здесь удобно фильтровать вакансии по стеку технологий.",
            "Обратите внимание, что вакансии показывают вилку зарплаты сразу — это упрощает сравнение предложений.",
            "Заполните профиль на английском языке — многие IT-компании в Польше работают на английском.",
            "Откликайтесь напрямую через сайт — большинство компаний отвечают в течение нескольких дней.",
          ],
          aiQuestion: "Как искать работу на NoFluffJobs?",
        },
        linkedin: {
          heading: "Как искать работу на LinkedIn",
          steps: [
            "Заполните профиль полностью — опыт, навыки и рекомендации повышают шанс, что рекрутер найдёт вас сам.",
            "Включите статус «Open to work», видимый только рекрутерам, чтобы не афишировать поиск текущему работодателю.",
            "Используйте фильтры по локации (Poland/Warsaw) и удалённой работе для точного поиска.",
            "Пишите рекрутерам в личные сообщения — прямой контакт часто эффективнее отклика через форму.",
          ],
          aiQuestion: "Как искать работу на LinkedIn?",
        },
      },
      notFoundHeading: "Такой профессии нет в базе",
      notFoundTryThese: "Попробуйте одну из этих профессий:",
      perMonth: "месяц",
      employmentFullSubtitle: "Со всеми гарантиями работника",
      faqHeading: "Не уверены, что выбрать? Спросите ИИ",
      faqCaption: "Клик по вопросу сразу открывает чат с готовым ответом от ИИ",
      faqQuestions: [
        "Что мне выбрать: трудовой договор или B2B?",
        "Как перейти с B2B на трудовой договор?",
        "Какие налоги я плачу при B2B?",
        "Что теряю, если работаю без договора?",
      ],
    },
    community: {
      title: "Сообщества",
      subtitle: "Telegram-каналы и чаты для тех, кто переезжает в Польшу.",
      join: "Вступить",
      members: "участников",
      cats: { all: "Все", housing: "Жильё", work: "Работа", sport: "Спорт", family: "Семья", general: "Общее" },
    },
    dashboard: {
      relocation: "Переезд в {country}",
      subtitle: "Ваш персональный план, обновляется в реальном времени.",
      subtitleTemplate: "{from} → {city} · Цель: {goal} · Прогресс {percent}%",
      subtitleTemplateNoCity: "{from} · Цель: {goal} · Прогресс {percent}%",
      overallProgress: "Общий прогресс",
      openBtn: "Открыть",
      expandBtn: "Развернуть",
      collapseBtn: "Свернуть",
      whatNextBtn: "Что делать дальше",
      stepsCompletedTemplate: "{done} из {total} шагов выполнено",
      docsReadyTemplate: "{done} из {total} документов готово",
      currentPhasePrefix: "Сейчас: {phase}",
      allPhasesDone: "Все этапы завершены",
      motivational: {
        noRoute: "Выберите маршрут — и здесь появится ваш личный план переезда.",
        allDone: "Все документы оформлены. Вы полностью готовы к переезду!",
        almostThere: "Вы почти у цели — совсем немного осталось до полной легализации.",
        thirdDone: "Больше трети пути пройдено. Так держать!",
        goodStart: "Отличное начало! Каждый оформленный документ приближает вас к цели.",
        startFirst: "Начните с первого шага — и весь путь станет понятнее.",
      },
      timelineSections: {
        before_departure: "До отъезда",
        first_week: "Первая неделя",
        first_month: "Первый месяц",
        longterm: "Долгосрочно",
      },
      countdown: {
        heading: "У вас 30 дней легального пребывания по визовому режиму",
        remaining: "Осталось {days} дней — нужно успеть подать на PESEL и карту побыту",
        expired: "30 дней легального пребывания истекли — как можно скорее подайте документы на легализацию",
      },
      phases: {
        beforeDeparture: "Подготовка перед отъездом",
        legalization: "Легализация — первые 30 дней",
        residenceCard: "Оформление карты побыту (ВНЖ)",
        workTaxes: "Работа и налоги",
      },
      phaseDescriptions: {
        beforeDeparture: "Создание аккаунта, заполнение анкеты и проверка визовой категории — самые первые шаги, ещё до переезда.",
        legalization: "Подача документов, сдача биометрии и регистрация адреса проживания (zameldowanie) — обязательные шаги в первый месяц после приезда.",
        residenceCard: "Подача заявления на карту побыту (kartę pobytu) — вид на жительство — и получение самой карты.",
        workTaxes: "Получение налогового номера (NIP) и официальное оформление трудового договора или бизнеса.",
      },
      phaseStatus: {
        done: "Завершено",
        inProgress: "В процессе",
        waiting: "Предстоит",
      },
      sidebar: {
        tagline: "Ваш план переезда",
        home: "Главная",
        myPlanSection: "МОЙ ПЛАН",
        roadmap: "Дорожная карта",
        checklist: "Чеклист",
        aiAssistant: "AI Ассистент",
        servicesSection: "СЕРВИСЫ",
        landingLinkAria: "Перейти на главную страницу",
      },
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
        stepLabel: "Шаг",
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
        taxId: {
          title: "Получите налоговый номер",
          byCountry: {
            poland: "Оформите NIP (налоговый номер) в местной налоговой инспекции.",
            germany: "Получите Steuer-ID по почте после регистрации по адресу (Anmeldung).",
            spain: "Оформите NIE (номер иностранца) — он нужен почти для всего в Испании.",
          },
        },
        employmentRegistration: {
          title: "Оформите трудоустройство или бизнес официально",
          byCountry: {
            poland: "Подпишите umowa o pracę/zlecenie или зарегистрируйте бизнес в ZUS.",
            germany: "Подпишите трудовой договор и зарегистрируйтесь в Finanzamt и системе социального страхования.",
            spain: "Оформите alta в Seguridad Social или Hacienda как сотрудник или самозанятый.",
          },
        },
      },
      stepGuides: {
        visa_eligibility: {
          heading: "Как оформить визу или основание на въезд",
          steps: [
            "Определите тип визы или основания для въезда в зависимости от вашей цели (работа, учёба, бизнес, воссоединение семьи).",
            "Соберите базовый пакет документов: загранпаспорт, приглашение или подтверждение цели поездки, страховку, финансовые гарантии.",
            "Подайте заявление в консульство или визовый центр страны переезда.",
            "Дождитесь решения и, при необходимости, пройдите собеседование.",
            "После получения визы уточните сроки въезда и что делать по прибытии.",
          ],
        },
        business_registration: {
          heading: "Как зарегистрировать бизнес",
          steps: [
            "Выберите организационно-правовую форму (ИП, ООО и аналоги) в зависимости от страны.",
            "Подготовьте учредительные документы и подтверждение юридического адреса.",
            "Подайте заявление на регистрацию в соответствующий государственный реестр.",
            "Получите налоговый и статистический номера компании.",
            "Откройте расчётный счёт на имя бизнеса.",
          ],
        },
        documents: {
          heading: "Какие документы нужно подготовить",
          steps: [
            "Соберите оригиналы и копии основных документов: паспорт, свидетельства, дипломы (при необходимости — с апостилем).",
            "Сделайте нотариально заверенные переводы документов на язык страны переезда, если это требуется.",
            "Загрузите сканы документов в раздел «Документы» в ReloAI, чтобы отслеживать их статус.",
            "Проверяйте статус каждого документа: Готово, На проверке или Отсутствует.",
            "Держите оригиналы под рукой — они могут понадобиться при личной подаче в госорганы.",
          ],
        },
        biometric: {
          heading: "Как пройти биометрию",
          steps: [
            "Запишитесь на подачу биометрических данных в миграционную службу или консульство — часто это можно сделать онлайн.",
            "Возьмите с собой паспорт, приглашение на приём и подтверждающие документы.",
            "На приёме у вас снимут отпечатки пальцев и сделают фото.",
            "Сохраните расписку или номер заявки — по нему можно отслеживать готовность документа.",
            "Дождитесь уведомления о готовности карты или разрешения.",
          ],
        },
        address_registration: {
          heading: "Как зарегистрировать адрес проживания",
          steps: [
            "Найдите постоянное или временное жильё и получите от владельца согласие на регистрацию (договор аренды или согласие собственника).",
            "Подготовьте паспорт и документ, подтверждающий право пользования жильём.",
            "Обратитесь в местную администрацию лично или через портал госуслуг.",
            "Заполните заявление о регистрации по месту жительства.",
            "Получите подтверждение регистрации — оно понадобится для дальнейших процедур (ВНЖ, налоговый номер и т.д.).",
          ],
        },
        residence_permit: {
          heading: "Как получить вид на жительство",
          steps: [
            "Убедитесь, что у вас есть основание для подачи: работа, учёба, бизнес или воссоединение семьи.",
            "Соберите пакет документов: паспорт, фото, подтверждение цели пребывания, страховку, подтверждение дохода и адреса.",
            "Подайте заявление в местное миграционное управление — лично или онлайн.",
            "Пройдите биометрию, если это не было сделано раньше.",
            "Дождитесь решения — это может занять от нескольких недель до нескольких месяцев, отслеживайте статус заявления.",
          ],
        },
        tax_id: {
          heading: "Как получить налоговый идентификационный номер",
          steps: [
            "Определите, какой номер вам нужен: общий идентификационный или налоговый номер для бизнеса.",
            "Соберите паспорт и, при наличии, подтверждение адреса регистрации.",
            "Подайте заявление в местную администрацию или налоговую службу.",
            "Дождитесь присвоения номера — часто это можно сделать в день обращения.",
            "Сохраните подтверждающий документ — номер понадобится для трудоустройства, банка и медицинской страховки.",
          ],
        },
        employment_registration: {
          heading: "Как оформить трудоустройство",
          steps: [
            "Уточните у работодателя, какой тип разрешения на работу или трудового договора вам нужен.",
            "Подготовьте документы: паспорт, вид на жительство или рабочую визу, диплом при необходимости.",
            "Подпишите трудовой договор и убедитесь, что работодатель подал уведомление в соответствующие органы (если требуется).",
            "Получите номер социального страхования, если он ещё не оформлен.",
            "Проверьте, что все взносы и налоги отчисляются корректно с первой зарплаты.",
          ],
        },
      },
      howToGetQuestion: "Как получить: {title}?",
      home: {
        flightHeading: "Ваш путь",
        flightSub: "Чем больше шагов выполнено — тем ближе самолёт к цели.",
        flightOriginPlaceholder: "Ваша страна",
        greeting: "Привет, {name}! 👋",
        guestGreeting: "Привет! 👋",
        greetingSubtitle: "Вот как продвигается ваш переезд в {country}.",
        stepsLabel: "Шаги выполнено",
        phaseLabel: "Текущий этап",
        daysLabel: "Дней с регистрации",
        quickActionsHeading: "Быстрые действия",
        quickActionRoadmapDesc: "Проверьте прогресс по шагам",
        quickActionDocumentsDesc: "Загрузите и отслеживайте документы",
        quickActionAiDesc: "Задайте вопрос ИИ-ассистенту",
        quickActionBanksDesc: "Найдите банк для эмигрантов",
        quickActionWorkDesc: "Ищите работу и узнайте зарплаты",
        currentStepCta: "Перейти к шагу →",
      },
    },
    guideCard: {
      whenToGet: "Когда оформлять",
      whereToSubmit: "Куда подавать",
      showOnMap: "Показать на карте",
      onMap: "На карте",
      workingHours: "Часы работы",
      onlineBooking: "Запись онлайн",
      cost: "Стоимость",
      waitingTime: "Срок ожидания",
      requiredDocs: "Документы",
      howToApply: "Как оформить",
      tips: "Советы",
      commonMistakes: "Частые ошибки",
      officialSite: "Официальный сайт",
      downloadForm: "Скачать бланк",
      fillWithAi: "Заполнить с ИИ",
      askAi: "Спросить ИИ",
      askAiAriaTemplate: "Спросить ИИ про {name}",
      askAiBankQuestionTemplate:
        "Расскажи подробнее про {name}: как открыть счёт, какие документы нужны и на что обратить внимание?",
      askAiTopicQuestionTemplate:
        'Расскажи подробнее про "{name}": как оформить, какие документы нужны и на что обратить внимание?',
      yourBank: "Ваш банк",
      chooseBank: "Выбрать банк",
      bankInfo: "Информация о банке",
      classicAccount: "Классический счёт",
      moreDetails: "Подробнее",
      allTag: "Все",
      citizenshipNote: "Показаны гайды, актуальные для вашего гражданства.",
      loading: "Загрузка…",
      searchGeneric: "Поиск",
      searchBanks: "Поиск банка",
      searchInsurance: "Поиск страховки",
      searchGuides: "Поиск гайда",
      important2026Badge: "Важно 2026",
      moreBanksTemplate: "Ещё {n} {word}",
      statusDone: "Готово",
      statusNotStarted: "Не начато",
      urgentAria: "Требует срочного внимания",
      start: "Начать",
      compareBanksTitle: "Сравнение банков",
      tagsLabel: "Теги",
      tags: { noPesel: "Без PESEL", fullyOnline: "Полностью онлайн", free: "Бесплатно", multicurrency: "Мультивалютный" },
      headlines: {
        noPesel: "Без PESEL",
        fullyOnline: "Открыть счёт онлайн",
        free: "Бесплатное обслуживание",
        multicurrency: "Мультивалютный счёт",
      },
    },
    helpButton: {
      label: "Как это получить?",
      openGuide: "📄 Открыть инструкцию",
      askAi: "💬 Спросить ИИ",
      askAiFooter: "Остались вопросы? Спросить ИИ →",
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
      aiPickHeading: "Подбор с ИИ",
      aiPickSubtitle: "Опишите, что вы ищете — вуз, школу, садик или курсы — и мы подберём подходящие варианты.",
      aiPickPlaceholder: "Например: частный садик рядом с центром для ребёнка 3 лет",
      findBtn: "Найти",
      findingBtn: "Подбираем…",
      resetBtn: "Сбросить",
      searchByNamePlaceholder: "Поиск по названию",
      addressLabel: "Адрес",
      showOnMapBtn: "Показать на карте →",
      forWhomLabel: "Для кого",
      languageLabel: "Язык",
      scheduleLabel: "График",
      costLabel: "Стоимость",
      documentsLabel: "Документы: ",
      priceOnRequestText: "Уточняйте цену",
      askAiBtn: "Спросить ИИ",
      askAiAriaTemplate: "Спросить ИИ про {name}",
      askAiQuestionTemplate: 'Расскажи подробнее про "{name}" в городе {city}: стоит ли выбрать это заведение, какие плюсы и минусы, на что обратить внимание?',
      needHelpHeading: "Нужна помощь с выбором? Спросите ИИ",
      clickHintText: "Клик по вопросу сразу открывает чат с готовым ответом от ИИ",
      tabQuestions: {
        universities: [
          "Как подать документы в университет в Польше?",
          "Нужна ли нострификация диплома?",
          "Какие есть стипендии для иностранцев?",
        ],
        schools: [
          "Чем отличаются частные и государственные школы?",
          "Как записать ребёнка в школу без знания польского?",
          "Какие документы нужны для зачисления?",
        ],
        kindergartens: [
          "Нужен ли PESEL для детского сада?",
          "Как устроена очередь в государственные сады?",
          "Сколько стоит частный детский сад?",
        ],
        courses: [
          "Как выбрать языковые курсы в Польше?",
          "Есть ли бесплатные курсы польского для иностранцев?",
          "Сколько времени нужно, чтобы выучить язык до B1?",
        ],
      },
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
          "По банкам:\n- mBank — самый удобный вариант для релокантов, полностью на английском языке.\n- Revolut — отлично работает даже до получения PESEL.\n- PKO BP — самая большая сеть отделений, если предпочитаете обслуживание лично.\n- Santander — хорош, если нужны мультивалютные счета.",
        housing: "Советы по жилью: ищите объявления на OLX, Otodom или Gratka. Никогда не переводите депозит, не осмотрев квартиру лично или по видеосвязи. Договор аренды должен быть на польском языке, чтобы иметь юридическую силу. Заложите в бюджет залог (аренда за 1–2 месяца) плюс czynsz (плата за обслуживание дома) сверх аренды.",
        documents: "Обычно нужны следующие документы: паспорт, заявление на визу или вид на жительство, подтверждение адреса, справка о PESEL, полис медицинской страховки и (если работаете) трудовой договор или разрешение на работу. Могу подробнее рассказать про любой из них.",
        visa: "Визовые требования зависят от вашего гражданства и страны назначения. Для Польши большинству граждан не из ЕС нужна национальная виза или вид на жительство (Karta Pobytu), связанные с работой, учёбой или семьёй. Для Германии рассмотрите Job Seeker Visa, Aufenthaltstitel или EU Blue Card. Для Испании — Digital Nomad Visa или обычные пути через рабочий/жительский статус и регистрацию NIE.",
        default: "Я могу помочь с документами, жильём, банками, медициной или работой. Что вас интересует подробнее?",
      },
      actionLabel: "Сделать это в ReloAI →",
      premiumLabel: "Доступно в Premium →",
      pageTitle: "AI Ассистент",
      pageSubtitle: "Ваш персональный помощник по переезду",
      newChat: "Новый чат",
      emptyHistory: "История пуста",
      todayLabel: "Сегодня",
      thisWeekLabel: "На этой неделе",
      olderLabel: "Ранее",
      deleteChatAria: "Удалить чат",
      assistantName: "ReloAI ассистент",
      online: "Онлайн",
      greetingHeading: "Чем могу помочь?",
      greetingSubtitle: "Задайте вопрос о переезде — или выберите один из примеров ниже.",
      defaultChatTitle: "Новый чат",
      deleteModalTitle: "Удалить этот чат?",
      deleteModalBody: "Это действие нельзя отменить. Переписка будет удалена безвозвратно.",
      deleteConfirm: "Удалить",
      deleteCancel: "Отмена",
    },
    demo: {
      bannerText: "Вы находитесь в режиме предпросмотра. Зарегистрируйтесь, чтобы сохранить прогресс и получить доступ ко всем функциям.",
      registerNow: "Зарегистрироваться",
      floatingGreeting: "👋 Вы изучаете ReloAI — зарегистрируйтесь бесплатно, чтобы сохранить прогресс",
      dismissAria: "Закрыть",
      promptHeading: "Зарегистрируйтесь, чтобы разблокировать эту функцию",
      promptBody: "Создайте бесплатный аккаунт, чтобы сохранить прогресс и открыть все функции.",
      promptDismiss: "Может быть позже",
    },
    onboarding: {
      stepLabel: "Шаг {current} из {total}",
      back: "Назад",
      cancel: "Отмена",
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
        goal: { question: "Какова ваша основная цель?", subheading: "Можно выбрать сразу несколько — это определит, какие пути мы для вас проанализируем." },
        jobOffer: { question: "Есть ли у вас оффер от работодателя?", subheading: "Это поможет понять, какие документы вам понадобятся." },
        universityAccepted: { question: "Вы уже поступили в университет?", subheading: "Определяет, с чего начнётся ваш план." },
        studyLevel: { question: "На какую программу поступаете?", subheading: "Для магистратуры и докторантуры нужна нострификация диплома." },
        businessType: { question: "Какую форму бизнеса планируете открыть?", subheading: "От этого зависит список документов для регистрации." },
        familyMemberType: { question: "Кто уже находится в Польше?", subheading: "Определяет тип карты побыту для воссоединения семьи." },
        hasChildren: { question: "Едут ли с вами дети?", subheading: "Покажем документы для школы и садика, если нужно." },
        foreignEmployer: { question: "У вас уже есть иностранный работодатель или клиенты?", subheading: "Влияет на тип карты побыту." },
        registerIp: { question: "Планируете регистрировать ИП в Польше?", subheading: "Определяет, нужны ли вам NIP, ZUS и регистрация ИП." },
        timeline: { question: "Когда планируете переехать?", subheading: "Поможет расставить приоритеты в вашем плане." },
        hasCar: { question: "Есть ли у вас автомобиль, который вы везёте в Польшу?", subheading: "Если да, добавим обмен прав, регистрацию авто и страховки." },
      },
      goalOptions: {
        work: "Работа",
        workDesc: "Есть оффер или ищу работу",
        study: "Учёба",
        studyDesc: "Университет или колледж",
        business: "Бизнес",
        businessDesc: "Открыть ИП или ООО",
        family: "Семья",
        familyDesc: "Супруг/родитель/ребёнок уже в Польше",
        remote: "Удалёнка",
        remoteDesc: "Работаю на иностранного работодателя или фриланс",
        savings: "Переезд на свои сбережения",
        savingsDesc: "Переезд без работы, на сбережения",
        other: "Другое",
      },
      jobOfferOptions: {
        yes: "Да — уже есть приглашение от польской компании",
        no: "Нет — ищу работу самостоятельно",
      },
      universityAcceptedOptions: {
        yes: "Да — есть подтверждение зачисления",
        no: "Нет — ещё не поступил",
      },
      studyLevelOptions: { bachelor: "Бакалавриат", master: "Магистратура", phd: "Докторантура" },
      businessTypeOptions: {
        jdg: "ИП (JDG) — самозанятость",
        spzoo: "ООО (Sp. z o.o.) — компания с ограниченной ответственностью",
        undecided: "Ещё не решил",
      },
      familyMemberTypeOptions: {
        spouse: "Супруг / партнёр",
        parent: "Родитель",
        child: "Ребёнок",
        multiple: "Несколько членов семьи",
      },
      hasChildrenOptions: { yes: "Да", no: "Нет" },
      foreignEmployerOptions: {
        yes: "Да — работаю на иностранную компанию",
        no: "Нет — фрилансер, ищу клиентов",
      },
      registerIpOptions: {
        yes: "Да — хочу работать официально",
        no: "Нет — пока не планирую",
      },
      timelineOptions: {
        already: "Уже нахожусь в Польше",
        month1: "В течение 1 месяца",
        months3: "В течение 3 месяцев",
        months6: "В течение 6 месяцев",
        year1: "В течение года",
        exploring: "Просто изучаю варианты",
      },
      hasCarOptions: {
        yes: "Да — везу свой автомобиль",
        no: "Нет — автомобиля нет",
      },
      results: {
        heading: "Мы нашли 3 маршрута переезда для вас!",
        loading: "Генерируем ваши персональные маршруты...",
        selectButton: "Выбрать этот маршрут",
        selecting: "Выбираем…",
        currentRoute: "Текущий маршрут",
        recommended: "Рекомендуем",
        speedFast: "Высокая скорость",
        speedMedium: "Средняя скорость",
        speedSlow: "Низкая скорость",
        difficultyEasy: "Низкая сложность",
        difficultyMedium: "Средняя сложность",
        difficultyHard: "Высокая сложность",
        approvalRate: "Вероятность одобрения",
        timeline: "Сроки",
        cost: "Стоимость",
        steps: "Шаги",
        bestFor: "Подходит для",
        selectError: "Не удалось сохранить выбранный маршрут. Попробуйте снова.",
        incompleteHeading: "Сначала завершите анкету — нам нужны гражданство и цель переезда, чтобы построить маршруты.",
        incompleteCta: "Продолжить анкету",
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
      faq: "Savollar",
      login: "Kirish",
      getStarted: "Boshlash",
      goToDashboard: "Rejamga o'tish →",
    },
    common: {
      cancelBtn: "Bekor qilish",
      logoutBtn: "Chiqish",
      logoutConfirmTitle: "Hisobdan chiqasizmi?",
      logoutConfirmBody: "Chiqishga ishonchingiz komilmi?",
      cityLabel: "Shahar",
      chosenByCountTemplate: "ReloAI orqali {n}+ kishi allaqachon tanladi",
    },
    hero: {
      badge: "Sizning AI ko'chish yordamchingiz",
      headline1: "Yevropaga ko'chish",
      headline2: "— oddiy.",
      subtext:
        "ReloAI sizning vizangiz, hujjatlaringiz, turar joyingiz va bank ishlaringizni — qadam-baqadam, oddiy tilda rejalashtiradi. Savol bering va soniyalar ichida shaxsiy reja oling.",
      getStarted: "Boshlash",
      seeHowItWorks: "Qanday ishlashini ko'rish",
      trustCountries: "3 mamlakat",
      trustLanguages: "6 til",
      trustFree: "Bepul boshlash",
      trustSocialProof: "1000 dan ortiq odam ReloAI yordamida allaqachon muvaffaqiyatli ko'chib o'tdi",
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
      docQuestion: "Birinchi navbatda qanday hujjatlar kerak?",
      docResponse: "Mana boshlash uchun 2 ta hujjat:",
      inputPlaceholder: "Polshada yashash haqida so'rang...",
      docCardPassportTitle: "Pasport skani",
      docCardPassportSubtitle: "Deyarli barcha qadamlar uchun kerak",
      docCardInsuranceTitle: "Tibbiy sug'urta",
      docCardInsuranceSubtitle: "Yashash ruxsatnomasi uchun talab qilinadi",
      docStatusDone: "Tasdiqlangan",
      docStatusPending: "Ko'rib chiqilmoqda",
    },
    stats: {
      items: [
        { value: "3", label: "Davlat" },
        { value: "100x", label: "Arzon" },
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
          flag: "pl",
          name: "Polsha",
          highlight: "Tez rivojlanayotgan tech-markaz",
          points: [
            "Karta Pobytu yashash ruxsatnomasi bo'yicha qo'llanma",
            "PESEL ro'yxatdan o'tish va mahalliy bank",
            "Shaharlar bo'yicha o'rtacha ijara narxi",
          ],
        },
        {
          flag: "de",
          name: "Germaniya",
          highlight: "EU Blue Card va ish izlovchi vizalari",
          points: [
            "Anmeldung va Bürgeramt uchrashuvlari",
            "Sog'liq sug'urtasi (davlat vs xususiy)",
            "Soliq raqami va frilanser vizasi yordami",
          ],
        },
        {
          flag: "es",
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
    directions: {
      label: "YO'NALISHLAR",
      heading: "Qayerga ko'chib o'tyapsiz?",
      subheading: "Mamlakatingiz uchun shaxsiy reja — soniyalarda.",
      comingSoonBadge: "Tez orada mavjud bo'ladi",
      ctaLabel: "Boshlash",
      comingSoonCta: "Tez orada",
      cards: [
        { name: "Polsha", subtitle: "Boshlash uchun barqaror Yevropa" },
        { name: "Germaniya", subtitle: "Blue Card va IT sohasida karyera" },
        { name: "Ispaniya", subtitle: "Dengiz, quyosh va Digital Nomad" },
      ],
    },
    pricing: {
      heading: "Narxlar",
      subheading: "Bepul boshlang.",
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
      heading: "Sharhlar",
      subheading: "Haqiqiy odamlar. Haqiqiy ko'chishlar.",
      items: [
        {
          name: "Anna K.",
          route: "Ukraina → Polsha",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "PESEL'imni 2 kunda oldim. ReloAI bo'lmaganida ma'lumot qidirishga bir hafta sarflagan bo'lardim.",
          initials: "AK",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Mikhail S.",
          route: "Rossiya → Germaniya",
          fromFlag: "ru",
          toFlag: "de",
          rating: 5,
          quote: "AI Anmeldungni tushunishimga yordam berdi. Hammasini tushuntirdi va idoralar manzilini berdi.",
          initials: "MS",
          documentBadge: { country: "de", label: "Anmeldung" },
        },
        {
          name: "Olga M.",
          route: "Belarus → Ispaniya",
          fromFlag: "by",
          toFlag: "es",
          rating: 5,
          quote: "Ispaniyada biznes ochdim. Ro'yxat menga bir oy vaqt va 2000 yevro advokat xarajatini tejadi.",
          initials: "OM",
          documentBadge: { country: "es", label: "Alta de Autónomo" },
        },
        {
          name: "Dmitry P.",
          route: "Qozog'iston → Polsha",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 4,
          quote: "Progress-trekeri juda yordam beradi. Doim qaysi bosqichda ekanligimni bilaman.",
          initials: "DP",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Leyla R.",
          route: "O'zbekiston → Germaniya",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Ish o'rinlari bo'limi orqali Germaniyadan ish topdim. AI hatto motivatsion xat ham yozib berdi.",
          initials: "LR",
          documentBadge: { country: "de", label: "Anschreiben" },
        },
        {
          name: "Timur A.",
          route: "Tojikiston → Ispaniya",
          fromFlag: "tj",
          toFlag: "es",
          rating: 5,
          quote: "NIE'ni 3 haftada oldim. Avval yarim yil ketadi deb o'ylagandim.",
          initials: "TA",
          documentBadge: { country: "es", label: "NIE" },
        },
        {
          name: "Karina N.",
          route: "Ukraina → Germaniya",
          fromFlag: "ua",
          toFlag: "de",
          rating: 5,
          quote: "Oila bilan ko'chib o'tdim. Bolalar uchun maktab va rus tilida gaplashadigan shifokor topdik.",
          initials: "KN",
          documentBadge: { country: "de", label: "Familiennachzug" },
        },
        {
          name: "Artyom V.",
          route: "Rossiya → Ispaniya",
          fromFlag: "ru",
          toFlag: "es",
          rating: 4,
          quote: "Digital Nomad Visa — ReloAI qo'llanmasi bo'yicha 6 haftada rasmiylashtirdim.",
          initials: "AV",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Zarina I.",
          route: "Qozog'iston → Polsha",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "mBank'da birinchi urinishda hisob ochdim. AI qaysi hujjatlarni olib borish kerakligini aytdi.",
          initials: "ZI",
          documentBadge: { country: "pl", label: "mBank" },
        },
        {
          name: "Bogdan F.",
          route: "Ukraina → Polsha",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Ko'chish uchun eng yaxshi xizmat. Vaqt va asablarimni tejadim.",
          initials: "BF",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Alexey K.",
          route: "Qozog'iston → Polsha",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "PESEL'imni 3 kunda oldim — AI barcha kerakli hujjatlarni oldindan aytib berdi.",
          initials: "AK",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Nilufar R.",
          route: "O'zbekiston → Polsha",
          fromFlag: "uz",
          toFlag: "pl",
          rating: 5,
          quote: "ReloAI yordamida Varshavada bir haftada kvartira topdim.",
          initials: "NR",
          documentBadge: { country: "pl", label: "Wynajem mieszkania" },
        },
        {
          name: "Dmitry V.",
          route: "Belarus → Germaniya",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Blue Card'ni advokatsiz rasmiylashtirdim, €2000 tejadim.",
          initials: "DV",
          documentBadge: { country: "de", label: "Blue Card" },
        },
        {
          name: "Malika S.",
          route: "Tojikiston → Polsha",
          fromFlag: "tj",
          toFlag: "pl",
          rating: 5,
          quote: "PKO BP'da birinchi urinishda hisob ochdim, AI hujjatlar ro'yxatini tayyorladi.",
          initials: "MS",
          documentBadge: { country: "pl", label: "PKO BP" },
        },
        {
          name: "Anna P.",
          route: "Ukraina → Ispaniya",
          fromFlag: "ua",
          toFlag: "es",
          rating: 5,
          quote: "Digital Nomad Visa — barchasi qadam-baqadam, bir oyda rasmiylashtirdim.",
          initials: "AP",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Aziz T.",
          route: "O'zbekiston → Germaniya",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Myunxendagi universitetga kirdim — AI talaba vizasi uchun hujjatlarni yig'ishga yordam berdi.",
          initials: "AT",
          documentBadge: { country: "de", label: "Studentenvisum" },
        },
        {
          name: "Svetlana I.",
          route: "Rossiya → Polsha",
          fromFlag: "ru",
          toFlag: "pl",
          rating: 5,
          quote: "Er va bolalarim bilan ko'chib o'tdim, ikki haftada bog'cha va maktab topdik.",
          initials: "SI",
          documentBadge: { country: "pl", label: "Przedszkole i szkoła" },
        },
        {
          name: "Roman K.",
          route: "Belarus → Germaniya",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Berlinda yakka tartibdagi tadbirkorlik ochdim, ro'yxat barcha hujjatlar bilan yordam berdi.",
          initials: "RK",
          documentBadge: { country: "de", label: "Gewerbeanmeldung" },
        },
        {
          name: "Dinara Zh.",
          route: "Qozog'iston → Polsha",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Varshava universitetiga kirdim va talaba turar joy kartasini muammosiz oldim.",
          initials: "DZ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Yulia N.",
          route: "Ukraina → Ispaniya",
          fromFlag: "ua",
          toFlag: "es",
          rating: 4,
          quote: "Masofaviy ish topdim va bir oyda NIE oldim, hammasi qo'llanma bo'yicha.",
          initials: "YN",
          documentBadge: { country: "es", label: "NIE" },
        },
      ],
    },
    faq: {
      heading: "Ko'p beriladigan savollar",
      subheading: "Ko'chib o'tishni boshlashdan oldin bilishingiz kerak bo'lgan hamma narsa.",
      items: [
        {
          question: "ReloAI nima va u qanday ishlaydi?",
          answer: "ReloAI — bu odamlarga Yevropaga ko'chib o'tishda yordam beradigan AI platforma. Siz o'zingiz haqingizda bir nechta savolga javob berasiz — qayerdansiz, qayerga ko'chmoqchisiz va qanday maqsadda. Javoblaringiz asosida ReloAI avtomatik ravishda hujjatlarning to'liq ro'yxati, muddatlar va bosqichma-bosqich yo'riqnomalar bilan shaxsiy ko'chish rejasini tuzadi. Hammasi bir joyda — hujjatlar, uy-joy, banklar, tibbiyot, ish, ta'lim, sug'urta va boshqa ko'p narsa, shuningdek istalgan savolga 24/7 javob beradigan AI-yordamchi.",
        },
        {
          question: "ReloAI immigratsiya bo'yicha yuristdan nimasi bilan farq qiladi?",
          answer: "Yurist 500 dan 3000 evrogacha turadi va faqat ish vaqtida ishlaydi. ReloAI 24/7 mavjud, bir necha marta arzonroq turadi va hujjatlar hamda tartib-qoidalar bo'yicha xuddi shunday aniq ma'lumot beradi.",
        },
        {
          question: "ReloAI bilan qaysi mamlakatlarga ko'chib o'tish mumkin?",
          answer: "Hozircha Polsha mavjud — MDH davlatlaridan ko'chib o'tish uchun eng mashhur yo'nalishlardan biri. Yaqin orada Germaniya va Ispaniyani qo'shamiz. Ko'chib o'tish uchun barcha mavjud mamlakatlar bilan veb-saytimizda batafsil tanishishingiz mumkin. ReloAI 40 dan ortiq davlatdan ko'chishni qo'llab-quvvatlaydi — Ukraina, Belarus, Rossiya, O'zbekiston, Tojikiston, Qozog'iston, Turkiya, Moldova va boshqa ko'plab davlatlar.",
        },
        {
          question: "Ko'chish uchun qanday hujjatlar kerak va ReloAI ularni yig'ishga qanday yordam beradi?",
          answer: "Hujjatlar ro'yxati sizning fuqaroligingiz va ko'chish maqsadingizga bog'liq. Onboardingdan o'tgach, ReloAI avtomatik ravishda faqat aynan sizga kerak bo'lgan hujjatlarni ko'rsatadi — ortiqcha ma'lumotsiz. Har bir hujjat bo'yicha ReloAI to'liq ma'lumot beradi — barcha yirik shaharlardagi muassasalarning aniq manzillari, dolzarb ish vaqtlari, o'zingiz bilan olib borishingiz kerak bo'lgan hujjatlarning to'liq ro'yxati, barcha boj va yig'imlar narxi, real kutish muddatlari, bosqichma-bosqich yo'riqnoma va eng ko'p uchraydigan xatolar tahlili. Ortiqcha hech narsa — faqat aynan sizga kerak bo'lgani.",
        },
        {
          question: "AI mening ko'chish rejamni qanday yaratadi?",
          answer: "Siz onboardingda 5 ta savolga javob berasiz — fuqarolik, manzil mamlakat, ko'chish maqsadi, ish taklifi borligi va muddatlar. Shu ma'lumotlar asosida ReloAI ma'lumotlar bazasidan kerakli hujjatlarni tanlaydi va real muddatlar bilan bosqichma-bosqich reja tuzadi. Masalan, Polshaga ishlash uchun ko'chib o'tayotgan o'zbekistonlik quyidagi rejani oladi: D vizasi → Manzilni ro'yxatdan o'tkazish → PESEL → Bank hisobi → Ish ruxsatnomasi → Turar joy kartasi.",
        },
        {
          question: "ReloAI rejasi bo'yicha ko'chish qancha vaqt oladi?",
          answer: "Bu sizning vaziyatingizga bog'liq. O'rtacha: vizasiz mamlakatlar (Ukraina, Moldova) — to'liq legallashtirishgacha 1 dan 3 oygacha. Viza talab qiladigan mamlakatlar (O'zbekiston, Qozog'iston va boshqalar) — D vizasini olishni hisobga olgan holda 3 dan 6 oygacha. ReloAI oldindan rejalashtirishingiz uchun har bir hujjat bo'yicha real muddatlarni ko'rsatadi.",
        },
        {
          question: "Bu pullikmi? Qancha turadi?",
          answer: "ReloAI'da bitta mamlakatga asosiy kirish va kuniga 5 ta AI-xabar bilan bepul reja mavjud. To'liq kirish uchun ikkita pullik tarif bor: Premium — oyiga 29€: barcha mamlakatlar, kuniga 50 ta AI-xabar, hujjatlarni yuklash, to'liq manzillar bazasi. Pro — oyiga 49€: Premium'dagi hammasi, shuningdek cheksiz AI-chat, hujjatlarni avtomatik to'ldirish, ustuvor qo'llab-quvvatlash.",
        },
        {
          question: "Servis qaysi tillarda ishlaydi?",
          answer: "ReloAI 6 tilda ishlaydi: rus, ingliz, o'zbek, turk, tojik va ukrain. Ro'yxatdan o'tishda tilni tanlashingiz yoki istalgan vaqtda sozlamalarda o'zgartirishingiz mumkin.",
        },
        {
          question: "Obunani istalgan vaqtda bekor qilish mumkinmi?",
          answer: "Ha. Obunani istalgan vaqtda «Profil» bo'limida bekor qilishingiz mumkin — jarimasiz va yashirin shartlarsiz. Bekor qilgandan so'ng to'langan davr oxirigacha kirish imkoniyati saqlanadi, keyin hisob bepul tarifga o'tadi. Barcha ma'lumotlaringiz va hujjatlaringiz saqlanib qoladi.",
        },
        {
          question: "ReloAI mening shaxsiy ma'lumotlarimni qanday himoya qiladi?",
          answer: "Barcha ma'lumotlar shifrlangan xavfsiz serverlarda saqlanadi. Biz ma'lumotlaringizni uchinchi shaxslarga bermaymiz. Siz yuklagan hujjatlar faqat sizga ochiq. ReloAI GDPR — shaxsiy ma'lumotlarni himoya qilish bo'yicha Yevropa qonuni talablariga javob beradi.",
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
      backToLanding: "Saytga qaytish",
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
        confirmPasswordLabel: "Parolni tasdiqlang",
        passwordMismatch: "Parollar mos kelmadi",
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
      subtitle: "Ko'chishingiz haqida to'liq ma'lumot.",
      logOut: "Chiqish",
      planLabel: "Reja",
      upgradeTooltip: "Rejani yaxshilash",
      upgradeBadge: "⚡ Premium'ga yangilang",
      upgradeToProBadge: "⚡ Pro'ga yangilang",
      maxPlanBadge: "✓ Maksimal reja",
      unnamed: "Ism yo'q",
      memberSinceLabel: "Ro'yxatdan o'tgan sana",
      personalSection: "Shaxsiy ma'lumotlar",
      relocationSection: "Ko'chish profili",
      destinationLabel: "Ko'chib o'tilayotgan joy",
      routeLabel: "Tanlangan legalizatsiya yo'li",
      noRouteSelected: "Hali yo'l tanlanmagan",
      chooseRoute: "Yo'l tanlash",
      routeModalSubheading: "Quyidagi variantlardan birini tanlang — istalgan vaqtda o'zgartirishingiz mumkin.",
      jobOfferLabel: "Ish taklifi bor",
      alreadyAdmittedLabel: "Allaqachon qabul qilingan",
      yes: "Ha",
      no: "Yo'q",
      notSet: "Ko'rsatilmagan",
      progressSection: "Jarayon umumiy ko'rinishi",
      currentStepLabel: "Joriy qadam",
      stepsCompletedLabel: "{total} tadan {completed} qadam bajarildi",
      allStepsDone: "Barcha qadamlar bajarildi!",
      documentsSection: "Hujjatlar holati",
      viewAllDocuments: "Barcha hujjatlar",
      editBtn: "Ko'chish ma'lumotlarini tahrirlash",
      changeRouteBtn: "Ko'chish rejasini o'zgartirish",
      editModalTitle: "Ko'chish ma'lumotlarini tahrirlash",
      cityLabel: "Shahar",
      cityPlaceholder: "masalan, Varshava",
      saveBtn: "O'zgarishlarni saqlash",
      saved: "Saqlandi",
    },
    topbar: {
      searchPlaceholder: "Hujjatlar, vazifalarni qidirish...",
      upgrade: "Yaxshilash",
      openMenuAria: "Menyuni ochish",
      avatarAria: "Profilga o'tish",
    },
    notifications: {
      bellAria: "Bildirishnomalarni ochish",
      title: "Bildirishnomalar",
      markAllRead: "Barchasini o'qilgan deb belgilash",
      empty: "Hozircha bildirishnomalar yo'q",
      registrationTitle: "Ro'yxatdan o'tganingiz uchun rahmat! 🎉",
      registrationMessage: "Tabriklaymiz, siz ReloAI'da muvaffaqiyatli ro'yxatdan o'tdingiz.",
      welcomeTitle: "Anketa to'ldirildi! 🎉",
      welcomeMessage: "Siz anketa ma'lumotlarini muvaffaqiyatli to'ldirdingiz va ko'chish rejasini tanladingiz ({route}). Bu ma'lumotlarni istalgan vaqtda profil sozlamalarida o'zgartirishingiz mumkin.",
      checklistTitle: "Yo'l xaritasi yangilandi ✅",
      checklistMessage: "Siz ko'chish rejasini ({route}) qayta yaratdingiz. Yangi yo'l xaritasi bo'yicha jarayon qaytadan boshlanadi — oldingi anketa ma'lumotlarini profil sozlamalarida ko'rish va o'zgartirish mumkin.",
      inactivityTitle: "Ko'chish rejangizni unutmang",
      inactivityMessage: "To'xtagan joyingizdan davom etish uchun qayting.",
      documentTitle: "Hujjat yuklandi va tekshiruvga yuborildi",
      documentMessage: "Tekshirilishi bilanoq sizga xabar beramiz.",
    },
    sidebar: {
      documents: "Hujjatlar",
      housing: "Uy-joy",
      banks: "Banklar",
      medicine: "Tibbiyot",
      insurance: "Sug'urta",
      work: "Ish",
      community: "Jamiyat",
      education: "Ta'lim",
      otherServices: "Boshqa xizmatlar",
      profile: "Profil",
      settings: "Sozlamalar",
      logout: "Chiqish",
    },
    settings: {
      title: "Sozlamalar",
      subtitle: "ReloAI qanday ko'rinishi va ishlashini boshqaring.",
      languageSection: "Til",
      languageDesc: "ReloAI siz bilan shu tilda gaplashadi.",
      currencySection: "Valyuta",
      currencyDesc: "Saytda narxlar qaysi valyutada ko'rsatilsin (zlotiyga kursi avtomatik yangilanadi).",
      saving: "(saqlanmoqda…)",
      themeSection: "Ko'rinish",
      themeDesc: "ReloAI qurilmangizda qanday ko'rinishini tanlang.",
      themeDark: "Tungi",
      themeLight: "Kunduzgi",
      notifications: "Bildirishnomalar",
      notifEmail: "Email yangiliklari",
      notifEmailDesc: "Vaqti-vaqti bilan mahsulot yangiliklari.",
      notifDocuments: "Hujjat eslatmalari",
      notifDocumentsDesc: "Muddatlar yaqinlashganda ogohlantirishlar.",
      notifProduct: "Mahsulot yangiliklari",
      notifProductDesc: "Yangi funksiyalar va yangilanishlar.",
      accountSection: "Hisob",
      nameLabel: "Ism",
      emailLabel: "Email",
      saveBtn: "O'zgarishlarni saqlash",
      saved: "Saqlandi",
      dangerSection: "Xavfli hudud",
      dangerDesc: "Hisobingizni o'chirish barcha ma'lumotlaringizni o'chiradi. Buni bekor qilib bo'lmaydi.",
      deleteAccountBtn: "Hisobni o'chirish",
      deleteConfirmTitle: "Hisobingizni o'chirasizmi?",
      deleteConfirmBody: "Profilingiz va ma'lumotlaringiz butunlay o'chiriladi. Buni bekor qilib bo'lmaydi.",
      deleteConfirmBtn: "Hisobni o'chirish",
    },
    documents: {
      title: "Hujjatlar",
      subtitle: "Aynan sizga kerak bo'lgan hujjatlar bir joyda.",
      tabs: {
        all: "Barchasi",
        passport: "Pasport",
        pesel: "PESEL",
        workPermit: "Ish ruxsatnomasi",
        insurance: "Sug'urta",
        bank: "Bank",
        biometric: "Biometriya",
        address: "Manzil",
        residencePermit: "Turar joy kartasi",
        taxId: "Soliq raqami",
        employment: "Ishga joylashish",
        business: "Biznes",
      },
      status: { verified: "Tasdiqlangan", pending: "Ko'rib chiqilmoqda", missing: "Yo'q", locked: "Premium" },
      upload: "Yuklash uchun sudrab tashlang yoki bosing",
      uploadBtn: "Yuklash",
      addDocumentBtn: "Hujjat yuklash",
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
        biometricConfirmation: "Biometriya tasdiqnomasi",
        addressConfirmation: "Manzil ro'yxatga olinganligi tasdiqnomasi",
        residencePermitScan: "Turar joy kartasi skani",
        taxIdConfirmation: "NIP tasdiqnomasi",
        employmentContract: "Mehnat shartnomasi",
        businessRegistrationConfirmation: "Biznes ro'yxatga olinganligi tasdiqnomasi",
      },
      docHints: {
        passportScan: "Aksariyat rasmiy tartib-qoidalar uchun kerak",
        passportPhoto: "Karta Pobytu uchun ariza berishda talab qilinadi",
        peselForm: "PESEL raqamini olishning birinchi qadami",
        peselLetter: "PESEL raqami berilganini tasdiqlaydi",
        workPermitApp: "Qonuniy ishlash uchun kerak",
        sponsorshipLetter: "Homiy ish beruvchida ishlayotganingizni tasdiqlaydi",
        healthInsurance: "Yashash ruxsatnomasi uchun talab qilinadi",
        travelInsurance: "NFZ qamrovigacha kerak bo'ladi",
        bankConfirmation: "Bank hisobini ochish uchun talab qilinadi",
        proofOfFunds: "Yashash uchun yetarli mablag' borligini tasdiqlaydi",
        relocationLetter: "Premium bilan mavjud",
        taxResidency: "Premium bilan mavjud",
        biometricConfirmation: "Urząd do Spraw Cudzoziemców'da biometriya topshirgandan keyin yuklang",
        addressConfirmation: "Manzil ro'yxatga olinganligini (zameldowanie) tasdiqlovchi zaświadczenie",
        residencePermitScan: "Olingan turar joy kartasi (karta pobytu) skani",
        taxIdConfirmation: "Soliq idorasidan NIP berilganligi tasdiqnomasi",
        employmentContract: "Imzolangan mehnat shartnomasi (umowa o pracę)",
        businessRegistrationConfirmation: "CEIDG ro'yxatga olinganligi tasdiqnomasi",
      },
      uploadGuides: {
        passportScan:
          "Pasportning surat va shaxsiy ma'lumotlar yozilgan sahifasini, shuningdek viza yoki turar joy shtampi bo'lgan sahifani suratga oling. Rasm aniq, yorug'lik aksisiz va chetlari kesilmagan bo'lishi kerak.",
        passportPhoto: "Hujjatlar uchun fotosurat yuklang: to'g'ridan, bosh kiyimsiz, och rangli bir xil fonda, biometrik talablarga mos.",
        peselForm: "To'ldirilgan va imzolangan PESEL raqami uchun arizani yuklang.",
        peselLetter: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        workPermitApp: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        sponsorshipLetter: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        healthInsurance: "Tibbiy sug'urta polisini yuklang — amal qilish muddati va polis raqami ko'rinishi kerak.",
        travelInsurance: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        bankConfirmation: "Hisob raqami va egasi ma'lumotlari ko'rsatilgan bank ma'lumotnomasini yuklang.",
        proofOfFunds: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        relocationLetter: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        taxResidency: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        biometricConfirmation: "Biometrik ma'lumotlarni topshirish uchun uchrashuv tasdig'i yoki kvitansiyasini yuklang.",
        addressConfirmation: "Ijara shartnomasi yoki manzil ro'yxatga olinganligi tasdig'ini (zameldowanie) manzil aniq ko'rinadigan holda yuklang.",
        residencePermitScan: "Turar joy kartasini ikkala tomondan suratga oling — old tomonda surat, orqa tomonda ma'lumotlar.",
        taxIdConfirmation: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        employmentContract: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
        businessRegistrationConfirmation: "Hujjatning aniq fotosurati yoki skanini oling — barcha ma'lumotlar yaxshi ko'rinishi kerak.",
      },
      progressSummary: "Bajarildi: {total} tadan {completed} tasi",
      autoCompleteToast: "✓ Qadam avtomatik bajarildi",
      sectionCompleteHeading: "🎉 Bo'lim yakunlandi!",
      sectionCompleteBody: "Keyingi qadamga o'ting.",
      sectionCompleteDismiss: "Davom etish",
      deleteConfirmTitle: "Hujjatni o'chirasizmi?",
      deleteConfirmBody: "Bu amalni bekor qilib bo'lmaydi. Hujjat butunlay o'chiriladi.",
      cancelBtn: "Bekor qilish",
      uploadModal: {
        dropzoneLabel: "Fayl tanlash",
        dropzoneHint: "PDF, JPG yoki PNG",
        confirmBtn: "Yuklash",
      },
    },
    housing: {
      title: "Polshada uy-joy",
      subtitle: "Yashash uchun joyni aqlli tarzda toping.",
      rentMarket: "🏆 Narx-sifat nisbati bo'yicha eng yaxshi 4 tuman",
      rentMarketSub: "Bizning mutaxassislarimiz va minglab chet elliklar bu tumanlarni narx, qulaylik va infratuzilma bo'yicha yashash uchun eng yaxshisi deb tanladilar.",
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
        mokotow: "Narx va sifatning eng yaxshi muvozanati. Tinch, ko'kalamzorlashtirilgan, metro bor.",
        wola: "Zamonaviy tuman, yangi qurilishlar ko'p, markazga yaqin.",
        zoliborz: "Qulay, xavfsiz, chet elliklar orasida sevimli.",
        ochota: "Markazga yaqin tinch tuman, infratuzilmasi yaxshi, metro bor, talabalar va chet elliklar orasida mashhur.",
      },
      bestValueBadge: "Eng foydali",
      expatsChoiceBadge: "Chet elliklar tanlovi",
      showAllDistricts: "{city} shahridagi barcha {count} ta tumanni ko'rsatish →",
      showFewerDistricts: "Ro'yxatni yig'ish",
      roomsLabel: "Xonalar",
      roomsAny: "Har qanday",
      roomsStudio: "Studiya",
      rooms2: "2 xonali",
      rooms3: "3 xonali",
      noDistrictsText: "{city} bo'yicha tumanlar haqida ma'lumot yo'q.",
      searchWithFiltersBtn: "Shu filtrlar bilan qidirish →",
      guides: {
        olx: {
          heading: "OLX'da uy-joy qanday qidiriladi",
          steps: [
            "«Ko'chmas mulk» → «Ijara» bo'limiga o'ting va shahar, narx va xonalar soni bo'yicha filtrlarni sozlang.",
            "E'lonlarni saqlang va mezonlaringizga mos yangi takliflar haqida bildirishnomalarni yoqing.",
            "Sotuvchiga ilova ichidagi chat orqali yozing — kvartirani shaxsan ko'rmasdan pul o'tkazmang.",
            "Ko'rish uchun kelishing va shartnomani imzolashdan oldin kvartira holati va hujjatlarini tekshiring.",
          ],
          aiQuestion: "OLX'da uy-joyni qanday qidiraman?",
        },
        otodom: {
          heading: "Otodom'da uy-joy qanday qidiriladi",
          steps: [
            "Qidiruvni toraytirish uchun Otodom'ning kengaytirilgan filtrlaridan foydalaning — metro, qavat, mebelli yoki yo'q.",
            "«Egasidan» belgisiga e'tibor bering — bu ko'pincha agentlik komissiyasi yo'qligini bildiradi.",
            "E'lon beruvchi bilan sayt orqali bog'laning va ko'rish sanasini aniqlashtiring.",
            "Shartnomani imzolashdan oldin kvartirani topshirish-qabul qilish dalolatnomasini (protokół zdawczo-odbiorczy) so'rang.",
          ],
          aiQuestion: "Otodom'da uy-joyni qanday qidiraman?",
        },
        gratka: {
          heading: "Gratka'da uy-joy qanday qidiriladi",
          steps: [
            "Gratka qidiruvida hudud va byudjetni belgilang — xizmat ayniqsa yirik shaharlardan tashqarida kuchli.",
            "E'lonning e'lon qilingan sanasini tekshiring — eski e'lonlar ko'pincha allaqachon dolzarb emas.",
            "Tafsilotlarni aniqlashtirish uchun sotuvchi bilan telefon orqali yoki saytdagi shakl orqali bog'laning.",
            "Garovni to'lashdan oldin har doim ijara shartnomasini so'rang va mulkchilik huquqini tekshiring.",
          ],
          aiQuestion: "Gratka'da uy-joyni qanday qidiraman?",
        },
      },
    },
    banks: {
      title: "Polshadagi banklar",
      subtitle: "Yangi kelganlar uchun mo'ljallangan hisoblarni solishtiring.",
      openAccount: "Hisob ochish",
      bestForExpats: "Chet elliklar uchun eng yaxshisi",
      features: {
        pkobp: ["Polshadagi eng katta filiallar tarmog'i", "Polyak va ingliz tilidagi mobil ilova", "Talabalar uchun bepul hisob variantlari"],
        mbank: ["To'liq ingliz tilidagi ilova va qo'llab-quvvatlash", "Onlayn tarzda tezkor hisob ochish", "PESEL raqamisiz ham komissiyasiz xizmat"],
        santander: ["Ko'p valyutali hisoblar", "Global bank tarmog'i", "Chet elda bepul debit karta orqali foydalanish"],
        revolut: ["Boshlash uchun PESEL talab qilinmaydi", "Ko'p valyutali hamyon", "Raqamli ko'chmanchilar uchun eng qulayi"],
      },
      guide: {
        heading: "Polshada bank hisobini qanday ochish — bosqichma-bosqich",
        steps: [
          "🪪 PESEL oling — usiz aksariyat banklar hisob ochmaydi",
          "📄 Hujjatlarni tayyorlang — pasport, manzil tasdig'i (ijara shartnomasi), PESEL",
          "🏦 Bankni tanlang — onlayn banklar (mBank, ING) chet elliklar uchun osonroq",
          "📱 Onlayn yoki shaxsan oching — mBank va Revolut'ni to'liq onlayn ochish mumkin",
          "✅ Kartani faollashtiring — 5–7 kun ichida pochta orqali keladi",
        ],
        tipsHeading: "💡 Maslahatlar",
        tips: [
          "mBank va ING — chet elliklarga eng qulay banklar",
          "Revolut PESEL'siz 10 daqiqada ochiladi",
          "PKO BP va Pekao shaxsan borishni talab qiladi",
          "Manzil tasdig'i sifatida ijara shartnomasini olib boring",
        ],
      },
      openAccountAt: "{bank}da hisobni qanday ochish",
      guides: {
        pkobp: {
          heading: "PKO BP'da hisobni qanday ochish",
          steps: [
            "PESEL oling — PKO BP, ko'pchilik an'anaviy banklar kabi, hisob ochish uchun uni talab qiladi.",
            "Eng yaqin filialga uchrashuvga yoziling — PKO BP Polshada eng katta tarmoqqa ega, filial topish oson.",
            "O'zingiz bilan pasport, PESEL va manzil tasdig'ini (masalan, ijara shartnomasini) olib boring.",
            "Shartnomani joyida imzolang — xodim mos hisob turini tanlashda va karta rasmiylashtirishda yordam beradi.",
          ],
          aiQuestion: "PKO BP'da hisobni qanday ochsam bo'ladi?",
        },
        mbank: {
          heading: "mBank'da hisobni qanday ochish",
          steps: [
            "mBank ilovasini yuklab oling yoki saytga kiring — butun jarayonni onlayn, filialga bormasdan o'tish mumkin.",
            "Arizani to'ldiring va shaxsingizni video qo'ng'iroq orqali yoki pasportni tekshiruvchi kuryer orqali tasdiqlang.",
            "Agar allaqachon bo'lsa, PESEL raqamingizni ko'rsating — bu jarayonni tezlashtiradi, lekin boshlash uchun shart emas.",
            "Tasdiqlashni kuting — hisob odatda bir kun ichida ochiladi, ilova to'liq ingliz tilida.",
          ],
          aiQuestion: "mBank'da hisobni qanday ochsam bo'ladi?",
        },
        santander: {
          heading: "Santander'da hisobni qanday ochish",
          steps: [
            "Hisob turini tanlang — Santander xalqaro o'tkazmalar uchun qulay bo'lgan ko'p valyutali hisoblarni taklif qiladi.",
            "Pasport, PESEL va manzil tasdig'ini tayyorlang.",
            "Filialga uchrashuvga yoziling yoki, agar statusingiz uchun mavjud bo'lsa, onlayn ariza bering.",
            "Kartangizni faollashtiring va mobil bankingni sozlang — kartani chet elda bepul ishlatish mumkin.",
          ],
          aiQuestion: "Santander'da hisobni qanday ochsam bo'ladi?",
        },
        revolut: {
          heading: "Revolut'da hisobni qanday ochish",
          steps: [
            "Revolut ilovasini yuklab oling va telefon raqamingiz bilan ro'yxatdan o'ting — filialga borish shart emas.",
            "Shaxsingizni ilovaning o'zida selfi va pasport skani orqali tasdiqlang.",
            "Hisob ochish uchun PESEL talab qilinmaydi — bu yaqinda kelganlar uchun eng tezkor variant.",
            "Hisobingizni to'ldiring va ko'p valyutali hamyon hamda kartadan foydalanishni boshlang.",
          ],
          aiQuestion: "Revolut'da hisobni qanday ochsam bo'ladi?",
        },
      },
      howToOpenLabel: "Hisobni qanday ochish mumkin?",
      emptyText: "Banklar bo'yicha hali ma'lumot yo'q.",
      faqHeading: "Hisob ochish haqida tez-tez so'raladigan savollar",
      faqCaption: "Savolga bosish darhol tayyor AI javobi bilan chatni ochadi",
      faqQuestions: [
        "PESELsiz hisobni qanday ochaman?",
        "Qanday hujjatlar kerak?",
        "Ochish necha kun davom etadi?",
        "Onlayn ochish mumkinmi?",
      ],
    },
    medicine: {
      title: "Polshada tibbiyot",
      subtitle: "Tezda sug'urta oling va shifokor toping.",
      clinicsTitle: "Klinikalar",
      clinicsSub: "Ingliz, rus va ukrain tilida xizmat ko'rsatuvchi variantlar.",
      warsaw: "Varshava",
      languages: {
        ruUa: "Rus va ukrain tilida xizmat",
        en: "Ingliz tilida xizmat",
        ru: "Rus tilida xizmat",
        ua: "Ukrain tilida xizmat",
      },
      bookBtn: "Qabulga yozilish",
      nfzTitle: "NFZ tibbiy sug'urtasini qanday olish mumkin",
      nfzSteps: [
        "Mehnat shartnomasi (umowa o pracę) asosida ishga joylashing — ish beruvchi sizni avtomatik ravishda ZUS'ga ro'yxatdan o'tkazadi",
        "PESEL raqamini oling",
        "Sug'urtangizni eWUŚ saytida tasdiqlang (ewus.nfz.gov.pl)",
        "Istalgan davlat poliklinikasiga shifokorga yoziling",
      ],
      nfzAiQuestion: "NFZ'da qanday ro'yxatdan o'taman?",
      stepLabel: "Qadam",
      emergencyTitle: "Tez yordam va favqulodda holatlar",
      emergencyNumber: "Polshada tez yordam raqami: 112 yoki 999",
      emergencyEr: "Eng yaqin tez yordam bo'limi (SOR) navbatsiz va bepul qabul qiladi",
      emergencyPharmacy: "Navbatchi dorixona:",
      usefulSitesTitle: "Foydali saytlar",
      usefulSites: [
        { url: "znany-lekarz.pl", desc: "Shifokorga onlayn yozilish — rus tilida so'zlashuvchi shifokorlar bor" },
        { url: "ewus.nfz.gov.pl", desc: "NFZ sug'urtangizni tekshirish" },
        { url: "nfz.gov.pl", desc: "NFZ rasmiy sayti" },
        { url: "aptekadyzurna.pl", desc: "Navbatchi dorixonani topish" },
      ],
      dentalTitle: "Stomatologiya",
      dentalNfz: "NFZ asosiy davolashni qoplaydi — plombalash, tish olish",
      dentalPrivate: "Xususiy stomatologiya: qabul uchun 150–400 PLN",
      dentalChains: "Tavsiya etilgan tarmoqlar: Dental+, Medicover Stomatologia",
      aiPickHeading: "Klinikani AI bilan tanlash",
      aiPickSubtitle: "Muammoingizni yoki qanday shifokor yoki klinika kerakligini tasvirlab bering — biz mos variantlarni topamiz.",
      aiPickPlaceholder: "Masalan: tish og'riyapti, markazga yaqin stomatolog kerak",
      searchPlaceholder: "Nomi yoki tuman bo'yicha qidirish",
      allCategoriesLabel: "Barcha kategoriyalar",
      allDistrictsLabel: "Barcha tumanlar",
      clinicsCountTemplate: "{count} klinika",
      notFoundText: "{city} uchun hech narsa topilmadi.",
      askAiQuestionTemplate: '"{name}" klinikasi ({city}) haqida batafsil ayting: uni tanlash arziydimi, qanday afzallik va kamchiliklari bor, nimaga e\'tibor berish kerak?',
      learnMoreBtn: "Batafsil",
    },
    insurance: {
      title: "Polshada sug'urta",
      subtitle: "Tibbiy, avto va boshqa sug'urta turlari",
      compareTitle: "Davlat va xususiy sug'urta",
      nfzLabel: "NFZ davlat sug'urtasi",
      nfzTooltip: "NFZ — Polshaning milliy sog'liqni saqlash tizimi",
      privateLabel: "Xususiy",
      rows: [
        { label: "Narxi", nfz: "Ish haqidan ajratmalar to'langanda bepul", pvt: "Oyiga 150–400 PLN" },
        { label: "Kutish muddati", nfz: "Mutaxassislar uchun bir necha haftadan oygacha", pvt: "Bir kundan bir necha kungacha" },
        { label: "Til qo'llab-quvvatlashi", nfz: "Asosan faqat polyak tilida", pvt: "Ingliz, ko'pincha rus/ukrain tilida ham" },
        { label: "Qamrov", nfz: "Keng, ammo shifokor tanlovi cheklangan", pvt: "O'zingiz klinika va shifokorni tanlaysiz" },
      ],
      learnMoreBtn: "Batafsil",
      types: {
        medical: { name: "Tibbiy sug'urta", provider: "Medicover", price: "Oyiga 150–400 PLN", desc: "Mutaxassis shifokorlarga navbatsiz tezkor kirish uchun xususiy tibbiy sug'urta." },
        car: { name: "Avto sug'urta (OC/AC)", provider: "PZU", price: "Yiliga 800–2500 PLN", desc: "Avtomobilni to'liq himoya qilish uchun majburiy OC va kengaytirilgan AC sug'urtasi." },
        home: { name: "Uy-joy sug'urtasi", provider: "Warta", price: "Yiliga 200–600 PLN", desc: "Kvartira yoki uyni yong'in, suv toshqini va o'g'irlikdan himoya qiladi." },
        travel: { name: "Sayohat sug'urtasi", provider: "Allianz", price: "Safar uchun 20–80 PLN", desc: "Yevropa bo'ylab sayohat paytida tibbiy xarajatlar va favqulodda holatlarni qoplaydi." },
      },
      guides: {
        medical: {
          heading: "Tibbiy sug'urtani qanday rasmiylashtirish",
          steps: [
            "Qamrov darajasini tanlang — asosiy paket yoki stomatologiya va mutaxassislarni o'z ichiga olgan kengaytirilgan paket.",
            "Bir nechta sug'urtachining (LUX MED, Medicover, Signal Iduna) narxi va klinikalar tarmog'i bo'yicha takliflarini solishtiring.",
            "Polisni onlayn yoki sug'urta kompaniyasi ofisida rasmiylashtiring — odatda pasport va PESEL kerak bo'ladi.",
            "Polis raqamini saqlang — u shifokorga yozilishda kerak bo'ladi.",
          ],
          aiQuestion: "Polshada tibbiy sug'urtani qanday rasmiylashtiraman?",
        },
        car: {
          heading: "Avtomobil sug'urtasini (OC/AC) qanday rasmiylashtirish",
          steps: [
            "OC (majburiy fuqarolik javobgarligi) ro'yxatdan o'tgan har qanday avtomobil uchun qonun bo'yicha talab qilinadi.",
            "Bir nechta sug'urtachining OC tariflarini solishtiring — narx haydash tarixiga qarab juda farq qiladi.",
            "Istasangiz, to'liqroq himoya uchun AC (o'g'irlik va shikastlanishdan sug'urta) qo'shing.",
            "Polisni onlayn bir necha daqiqada rasmiylashtiring — avtomobil ma'lumotlari va haydovchilik guvohnomasi kerak bo'ladi.",
          ],
          aiQuestion: "Polshada avtomobil sug'urtasini qanday rasmiylashtiraman?",
        },
        home: {
          heading: "Uy-joy sug'urtasini qanday rasmiylashtirish",
          steps: [
            "Nimani sug'urtalash kerakligini aniqlang — uy-joyning o'zi, ichidagi mol-mulk yoki fuqarolik javobgarligi.",
            "Kvartira haqida asosiy ma'lumotlarni to'plang: maydoni, manzili, bino turi.",
            "Bir nechta sug'urtachining takliflarini solishtiring — ko'p banklar ipoteka bilan birga rasmiylashtirilganda chegirma taklif qiladi.",
            "Polisni onlayn yoki agent orqali rasmiylashtiring va zarur bo'lsa, uy egasi uchun tasdiqni saqlang.",
          ],
          aiQuestion: "Polshada uy-joy sug'urtasini qanday rasmiylashtiraman?",
        },
        travel: {
          heading: "Sayohat sug'urtasini qanday rasmiylashtirish",
          steps: [
            "Safar davomiyligi va maqsadini aniqlang — bu kerakli qamrov darajasini belgilaydi.",
            "Polis tibbiy xarajatlar, evakuatsiya va safarni bekor qilishni qoplashini tekshiring.",
            "Onlayn takliflarni solishtiring — rasmiylashtirish bir necha daqiqa oladi va shaxsan tashrif buyurish shart emas.",
            "Polisni telefoningizda saqlang yoki chop eting — u chegarada yoki kasalxonada kerak bo'lishi mumkin.",
          ],
          aiQuestion: "Sayohat sug'urtasini qanday rasmiylashtiraman?",
        },
      },
      emptyText: "Sug'urtalar bo'yicha hali ma'lumot yo'q.",
      aiPromptHeading: "Nimani tanlashni bilmayapsizmi?",
      aiPromptSubtitle: "AI'dan so'rang — u vaziyatingizni hisobga olib, aynan sizga mos variantni taklif qiladi",
      aiPromptCta: "So'rash",
      aiPromptQuestion:
        "Nimani tanlashim kerak — davlat NFZ sug'urtasi yoki xususiymi? Vaziyatimni hisobga oling: rasman ishlaydiganmanmi, shifokorlarga tez kirish kerakmi, byudjet muhimmi.",
    },
    work: {
      title: "Polshada ish",
      subtitle: "Shartnomalar, maoshlar va qayerdan qidirish kerakligi.",
      contractVsB2B: "Mehnat shartnomasi va B2B",
      salarySearch: "Maosh qidirish",
      salarySearchSub: "O'rtacha maoshni ko'rish uchun kasb nomini kiriting.",
      placeholder: "masalan, dasturchi, hamshira, haydovchi...",
      averageSalary: "Polshadagi o'rtacha maosh",
      inEuros: "Yevroda",
      salaryNote: "* Ma'lumotlar taxminiy, tajriba va shaharga bog'liq.",
      noExactData: "Bu kasb uchun aniq ma'lumot hali yo'q — mamlakat bo'yicha o'rtacha ko'rsatkich ko'rsatilmoqda.",
      jobSites: "Ish qidirish saytlari",
      visitSite: "Saytga o'tish",
      searchByProfession: "Ushbu kasb bo'yicha bo'sh ish o'rinlarini qidirish",
      viewVacanciesBtn: "Vakansiyalarni ko'rish",
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
      guides: {
        employment: {
          heading: "Mehnat shartnomasini (umowa o pracę) qanday olish",
          steps: [
            "Ish beruvchi ish boshlashdan oldin siz bilan yozma mehnat shartnomasi tuzishi shart.",
            "Shartnomada lavozim, maosh, jadval va agar mavjud bo'lsa, sinov muddati ko'rsatilganligini tekshiring.",
            "Ish beruvchi sizni ZUS'da (ijtimoiy sug'urta) ro'yxatdan o'tkazadi — bu NFZ va pensiya badallariga kirish imkonini beradi.",
            "Shartnoma nusxasini saqlang — u yashash ruxsatnomasi va boshqa jarayonlar uchun kerak bo'ladi.",
          ],
          aiQuestion: "Polshada mehnat shartnomasini qanday olaman?",
        },
        b2b: {
          heading: "B2B shartnomasini (o'z-o'zini bandlik) qanday tuzish",
          steps: [
            "CEIDG sayti orqali yakka tartibdagi faoliyatni (JDG) ro'yxatdan o'tkazing — buni bir kunda onlayn qilish mumkin.",
            "Buxgalter bilan birgalikda soliq shaklini (umumiy qoidalar, yagona soliq yoki ryczałt) tanlang.",
            "Buyurtmachi kompaniya bilan B2B shartnomasini imzolang — bu mehnat emas, fuqarolik-huquqiy shartnoma.",
            "ZUS badallarini har oy o'zingiz to'lang va soliq deklaratsiyasini topshiring.",
          ],
          aiQuestion: "Polshada B2B shartnomasini qanday tuzaman?",
        },
        pracuj: {
          heading: "Pracuj.pl'da ish qanday izlanadi",
          steps: [
            "Profil yarating va rezyume (CV) yuklang — ko'p vakansiyalarga bir marta bosish bilan murojaat qilish mumkin.",
            "Shahar, maosh va ingliz/polyak tili darajasi bo'yicha filtrlardan foydalaning.",
            "Yangi vakansiyalarni o'tkazib yubormaslik uchun kasbingizga oid kalit so'zlar bo'yicha bildirishnomalarni sozlang.",
            "Ba'zi suhbatlar polyak tilida o'tishiga tayyor bo'ling — intervyu tilini oldindan aniqlashtiring.",
          ],
          aiQuestion: "Pracuj.pl'da ishni qanday izlayman?",
        },
        nofluff: {
          heading: "NoFluffJobs'da ish qanday izlanadi",
          steps: [
            "NoFluffJobs IT sohasiga ixtisoslashgan — bu yerda vakansiyalarni texnologiyalar to'plami bo'yicha filtrlash qulay.",
            "Vakansiyalar maosh oralig'ini darhol ko'rsatishiga e'tibor bering — bu takliflarni solishtirishni osonlashtiradi.",
            "Profilingizni ingliz tilida to'ldiring — Polshadagi ko'p IT-kompaniyalar ingliz tilida ishlaydi.",
            "Sayt orqali to'g'ridan-to'g'ri murojaat qiling — ko'pchilik kompaniyalar bir necha kun ichida javob beradi.",
          ],
          aiQuestion: "NoFluffJobs'da ishni qanday izlayman?",
        },
        linkedin: {
          heading: "LinkedIn'da ish qanday izlanadi",
          steps: [
            "Profilingizni to'liq to'ldiring — tajriba, ko'nikmalar va tavsiyalar rekruter sizni o'zi topish imkoniyatini oshiradi.",
            "Faqat rekruterlarga ko'rinadigan «Open to work» holatini yoqing — shunda joriy ish beruvchingiz izlanishingizni bilmaydi.",
            "Aniq qidiruv uchun joylashuv (Poland/Warsaw) va masofaviy ish filtrlaridan foydalaning.",
            "Rekruterlarga shaxsiy xabar yozing — to'g'ridan-to'g'ri muloqot ko'pincha shakl orqali murojaat qilishdan samaraliroq.",
          ],
          aiQuestion: "LinkedIn'da ishni qanday izlayman?",
        },
      },
      notFoundHeading: "Bu kasb bazamizda yo'q",
      notFoundTryThese: "Ushbu kasblardan birini sinab ko'ring:",
      perMonth: "oy",
      employmentFullSubtitle: "Xodimning barcha kafolatlari bilan",
      faqHeading: "Nimani tanlashni bilmayapsizmi? AI'dan so'rang",
      faqCaption: "Savolga bosish darhol tayyor AI javobi bilan chatni ochadi",
      faqQuestions: [
        "Nimani tanlashim kerak: mehnat shartnomasi yoki B2B?",
        "B2B'dan mehnat shartnomasiga qanday o'taman?",
        "B2B'da qanday soliqlar to'layman?",
        "Shartnomasiz ishlasam nimani yo'qotaman?",
      ],
    },
    community: {
      title: "Jamiyatlar",
      subtitle: "Polshaga ko'chib o'tayotganlar uchun Telegram kanallari va chatlari.",
      join: "Qo'shilish",
      members: "a'zo",
      cats: { all: "Barchasi", housing: "Uy-joy", work: "Ish", sport: "Sport", family: "Oila", general: "Umumiy" },
    },
    dashboard: {
      relocation: "{country}ga ko'chish",
      subtitle: "Sizning shaxsiy yo'l xaritangiz, real vaqtda yangilanadi.",
      subtitleTemplate: "{from} → {city} · Maqsad: {goal} · Progress {percent}%",
      subtitleTemplateNoCity: "{from} · Maqsad: {goal} · Progress {percent}%",
      overallProgress: "Umumiy jarayon",
      openBtn: "Ochish",
      expandBtn: "Yoyish",
      collapseBtn: "Yig'ish",
      whatNextBtn: "Keyingi qadam",
      stepsCompletedTemplate: "{total} tadan {done} tasi bajarildi",
      docsReadyTemplate: "{total} tadan {done} tasi hujjat tayyor",
      currentPhasePrefix: "Hozir: {phase}",
      allPhasesDone: "Barcha bosqichlar yakunlandi",
      motivational: {
        noRoute: "Marshrutni tanlang — va bu yerda shaxsiy ko'chish rejangiz paydo bo'ladi.",
        allDone: "Barcha hujjatlar rasmiylashtirildi. Siz ko'chishga to'liq tayyorsiz!",
        almostThere: "Siz maqsadga deyarli yetdingiz — to'liq legalizatsiyagacha ozgina qoldi.",
        thirdDone: "Yo'lning uchdan biridan ko'prog'i bosib o'tildi. Shunday davom eting!",
        goodStart: "Zo'r boshlanish! Rasmiylashtirilgan har bir hujjat sizni maqsadga yaqinlashtiradi.",
        startFirst: "Birinchi qadamdan boshlang — va butun yo'l tushunarli bo'ladi.",
      },
      timelineSections: {
        before_departure: "Jo'nashdan oldin",
        first_week: "Birinchi hafta",
        first_month: "Birinchi oy",
        longterm: "Uzoq muddatli",
      },
      countdown: {
        heading: "Sizda vizasiz rejim bo'yicha 30 kunlik qonuniy turish muddati bor",
        remaining: "{days} kun qoldi — PESEL va karta pobytu uchun ariza berishga ulgurish kerak",
        expired: "30 kunlik qonuniy turish muddati tugadi — hujjatlarni legallashtirish uchun imkon qadar tezroq ariza bering",
      },
      phases: {
        beforeDeparture: "Jo'nashdan oldin tayyorgarlik",
        legalization: "Legallashtirish — birinchi 30 kun",
        residenceCard: "Turar joy kartasini (karta pobytu) rasmiylashtirish",
        workTaxes: "Ish va soliqlar",
      },
      phaseDescriptions: {
        beforeDeparture: "Hisob yaratish, anketani to'ldirish va viza toifasini tekshirish — ko'chishdan oldingi eng birinchi qadamlar.",
        legalization: "Hujjatlarni topshirish, biometriyadan o'tish va yashash manzilini ro'yxatdan o'tkazish (zameldowanie) — kelganingizdan keyingi birinchi oyda majburiy qadamlar.",
        residenceCard: "Karta pobytu — yashash ruxsatnomasi — uchun ariza berish va kartaning o'zini olish.",
        workTaxes: "Soliq raqamini (NIP) olish va mehnat shartnomasi yoki biznesni rasmiy ro'yxatdan o'tkazish.",
      },
      phaseStatus: {
        done: "Bajarildi",
        inProgress: "Jarayonda",
        waiting: "Kutilmoqda",
      },
      sidebar: {
        tagline: "Sizning ko'chish rejangiz",
        home: "Bosh sahifa",
        myPlanSection: "MENING REJAM",
        roadmap: "Yo'l xaritasi",
        checklist: "Ro'yxat",
        aiAssistant: "AI Yordamchi",
        servicesSection: "XIZMATLAR",
        landingLinkAria: "Bosh sahifaga o'tish",
      },
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
        stepLabel: "Qadam",
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
        taxId: {
          title: "Soliq raqamingizni oling",
          byCountry: {
            poland: "Mahalliy soliq idorasida NIP (soliq identifikatsiya raqami) oling.",
            germany: "Anmeldungdan so'ng Steuer-ID pochta orqali keladi.",
            spain: "NIE (chet ellik raqami) oling — Ispaniyada deyarli hamma narsa uchun kerak.",
          },
        },
        employmentRegistration: {
          title: "Ishga joylashish yoki biznesni rasmiylashtiring",
          byCountry: {
            poland: "Umowa o pracę/zlecenie imzolang yoki biznesingizni ZUSda ro'yxatdan o'tkazing.",
            germany: "Mehnat shartnomasini imzolang va Finanzamt hamda ijtimoiy sug'urtada ro'yxatdan o'ting.",
            spain: "Xodim yoki o'z-o'zini band qilgan shaxs sifatida Seguridad Social yoki Haciendada alta rasmiylashtiring.",
          },
        },
      },
      stepGuides: {
        visa_eligibility: {
          heading: "Viza yoki kirish uchun asosni qanday olish mumkin",
          steps: [
            "Maqsadingizga mos viza yoki kirish asosini aniqlang (ish, o'qish, biznes, oilani birlashtirish).",
            "Asosiy hujjatlar to'plamini yig'ing: xorijiy pasport, taklifnoma yoki sayohat maqsadi tasdig'i, sug'urta, moliyaviy kafolatlar.",
            "Ko'chib boradigan mamlakat konsulligi yoki viza markaziga ariza topshiring.",
            "Qaror kutib turing va zarur bo'lsa, suhbatdan o'ting.",
            "Viza olgach, kirish muddatlarini va kelganingizda nima qilish kerakligini aniqlashtiring.",
          ],
        },
        business_registration: {
          heading: "Biznesni qanday ro'yxatdan o'tkazish mumkin",
          steps: [
            "Mamlakatga qarab tashkiliy-huquqiy shaklni tanlang (YaTT, MChJ va o'xshashlari).",
            "Ta'sis hujjatlarini va yuridik manzil tasdig'ini tayyorlang.",
            "Tegishli davlat reyestrida ro'yxatdan o'tish uchun ariza bering.",
            "Kompaniyaning soliq va statistika raqamlarini oling.",
            "Biznes nomiga hisob raqami oching.",
          ],
        },
        documents: {
          heading: "Qanday hujjatlarni tayyorlash kerak",
          steps: [
            "Asosiy hujjatlarning asl nusxalari va nusxalarini yig'ing: pasport, guvohnomalar, diplomlar (kerak bo'lsa — apostil bilan).",
            "Agar talab qilinsa, hujjatlarning ko'chib boradigan mamlakat tiliga notarial tasdiqlangan tarjimasini qiling.",
            "Hujjatlar holatini kuzatish uchun skanerlarini ReloAI'dagi «Hujjatlar» bo'limiga yuklang.",
            "Har bir hujjat holatini tekshiring: Tayyor, Tekshiruvda yoki Yo'q.",
            "Asl nusxalarni yoningizda saqlang — davlat organlariga shaxsan murojaat qilganda kerak bo'lishi mumkin.",
          ],
        },
        biometric: {
          heading: "Biometriyani qanday topshirish mumkin",
          steps: [
            "Migratsiya xizmati yoki konsullikda biometrik ma'lumot topshirishga yoziling — ko'pincha buni onlayn qilish mumkin.",
            "O'zingiz bilan pasport, qabulga taklifnoma va tasdiqlovchi hujjatlarni olib boring.",
            "Qabulda sizning barmoq izlaringiz olinadi va suratga tushirilasiz.",
            "Kvitansiya yoki ariza raqamini saqlang — u orqali hujjat tayyorligini kuzatish mumkin.",
            "Karta yoki ruxsatnoma tayyor bo'lgani haqida xabarnomani kuting.",
          ],
        },
        address_registration: {
          heading: "Yashash manzilini qanday ro'yxatdan o'tkazish mumkin",
          steps: [
            "Doimiy yoki vaqtinchalik uy toping va egasidan ro'yxatga olish uchun rozilik oling (ijara shartnomasi yoki mulkdor roziligi).",
            "Pasport va uydan foydalanish huquqini tasdiqlovchi hujjatni tayyorlang.",
            "Shaxsan yoki davlat xizmatlari portali orqali mahalliy ma'muriyatga murojaat qiling.",
            "Yashash joyi bo'yicha ro'yxatga olish uchun ariza to'ldiring.",
            "Ro'yxatga olish tasdig'ini oling — u keyingi jarayonlar uchun kerak bo'ladi (yashash ruxsatnomasi, soliq raqami va h.k.).",
          ],
        },
        residence_permit: {
          heading: "Yashash ruxsatnomasini qanday olish mumkin",
          steps: [
            "Ariza berish uchun asosingiz borligiga ishonch hosil qiling: ish, o'qish, biznes yoki oilani birlashtirish.",
            "Hujjatlar to'plamini yig'ing: pasport, surat, sayohat maqsadi tasdig'i, sug'urta, daromad va manzil tasdig'i.",
            "Mahalliy migratsiya boshqarmasiga — shaxsan yoki onlayn — ariza topshiring.",
            "Agar oldin qilinmagan bo'lsa, biometriyadan o'ting.",
            "Qarorni kuting — bu bir necha haftadan bir necha oygacha davom etishi mumkin, ariza holatini kuzatib boring.",
          ],
        },
        tax_id: {
          heading: "Soliq identifikatsiya raqamini qanday olish mumkin",
          steps: [
            "Qaysi raqam kerakligini aniqlang: umumiy identifikatsiya raqami yoki biznes uchun soliq raqami.",
            "Pasport va, agar bo'lsa, manzil ro'yxatga olinganligi tasdig'ini yig'ing.",
            "Mahalliy ma'muriyat yoki soliq xizmatiga ariza topshiring.",
            "Raqam berilishini kuting — ko'pincha buni murojaat qilgan kuningiz olish mumkin.",
            "Tasdiqlovchi hujjatni saqlang — raqam ish, bank va tibbiy sug'urta uchun kerak bo'ladi.",
          ],
        },
        employment_registration: {
          heading: "Ishga rasmiy joylashishni qanday amalga oshirish mumkin",
          steps: [
            "Ish beruvchingizdan qanday turdagi ish ruxsatnomasi yoki mehnat shartnomasi kerakligini aniqlashtiring.",
            "Hujjatlarni tayyorlang: pasport, yashash ruxsatnomasi yoki ish vizasi, zarur bo'lsa diplom.",
            "Mehnat shartnomasini imzolang va ish beruvchi tegishli organlarga xabarnoma topshirganiga ishonch hosil qiling (agar talab qilinsa).",
            "Agar hali rasmiylashtirilmagan bo'lsa, ijtimoiy sug'urta raqamini oling.",
            "Birinchi maoshingizdan barcha to'lovlar va soliqlar to'g'ri ushlab qolinayotganini tekshiring.",
          ],
        },
      },
      howToGetQuestion: "Qanday olish mumkin: {title}?",
      home: {
        flightHeading: "Sizning yo'lingiz",
        flightSub: "Qancha ko'p qadam bajarilsa, samolyot manzilingizga shuncha yaqinlashadi.",
        flightOriginPlaceholder: "Sizning davlatingiz",
        greeting: "Salom, {name}! 👋",
        guestGreeting: "Salom! 👋",
        greetingSubtitle: "{country}ga ko'chishingiz qanday davom etayotgani mana bunday.",
        stepsLabel: "Bajarilgan qadamlar",
        phaseLabel: "Joriy bosqich",
        daysLabel: "Ro'yxatdan o'tgandan beri kunlar",
        quickActionsHeading: "Tezkor amallar",
        quickActionRoadmapDesc: "Qadamlar bo'yicha progressni tekshiring",
        quickActionDocumentsDesc: "Hujjatlarni yuklang va kuzating",
        quickActionAiDesc: "AI yordamchisiga savol bering",
        quickActionBanksDesc: "Yangi kelganlar uchun bank toping",
        quickActionWorkDesc: "Ish qidiring va maoshlarni bilib oling",
        currentStepCta: "Qadamga o'tish →",
      },
    },
    guideCard: {
      whenToGet: "Qachon rasmiylashtirish kerak",
      whereToSubmit: "Qayerga topshiriladi",
      showOnMap: "Xaritada ko'rsatish",
      onMap: "Xaritada",
      workingHours: "Ish vaqti",
      onlineBooking: "Onlayn ro'yxatga olish",
      cost: "Narxi",
      waitingTime: "Kutish muddati",
      requiredDocs: "Hujjatlar",
      howToApply: "Qanday rasmiylashtiriladi",
      tips: "Maslahatlar",
      commonMistakes: "Tez-tez uchraydigan xatolar",
      officialSite: "Rasmiy sayt",
      downloadForm: "Blankni yuklab olish",
      fillWithAi: "AI bilan to'ldirish",
      askAi: "AI'dan so'rash",
      askAiAriaTemplate: "{name} haqida AI'dan so'rash",
      askAiBankQuestionTemplate:
        "{name} haqida batafsil ayting: hisobni qanday ochish kerak, qanday hujjatlar kerak va nimalarga e'tibor berish kerak?",
      askAiTopicQuestionTemplate:
        '"{name}" haqida batafsil ayting: qanday rasmiylashtiriladi, qanday hujjatlar kerak va nimalarga e\'tibor berish kerak?',
      yourBank: "Sizning bankingiz",
      chooseBank: "Bankni tanlash",
      bankInfo: "Bank haqida ma'lumot",
      classicAccount: "Klassik hisob",
      moreDetails: "Batafsil",
      allTag: "Barchasi",
      citizenshipNote: "Sizning fuqaroligingizga tegishli qo'llanmalar ko'rsatilmoqda.",
      loading: "Yuklanmoqda…",
      searchGeneric: "Qidiruv",
      searchBanks: "Bank qidirish",
      searchInsurance: "Sug'urta qidirish",
      searchGuides: "Qo'llanma qidirish",
      important2026Badge: "2026 uchun muhim",
      moreBanksTemplate: "Yana {n} ta bank",
      statusDone: "Tayyor",
      statusNotStarted: "Boshlanmagan",
      urgentAria: "Shoshilinch e'tibor talab qiladi",
      start: "Boshlash",
      compareBanksTitle: "Banklarni solishtirish",
      tagsLabel: "Teglar",
      tags: { noPesel: "PESELsiz", fullyOnline: "To'liq onlayn", free: "Bepul", multicurrency: "Ko'p valyutali" },
      headlines: {
        noPesel: "PESELsiz",
        fullyOnline: "Hisobni onlayn ochish",
        free: "Bepul xizmat",
        multicurrency: "Ko'p valyutali hisob",
      },
    },
    helpButton: {
      label: "Buni qanday olish mumkin?",
      openGuide: "📄 Yo'riqnomani ochish",
      askAi: "💬 AI'dan so'rash",
      askAiFooter: "Savollaringiz qoldimi? AI'dan so'rang →",
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
      aiPickHeading: "AI bilan tanlash",
      aiPickSubtitle: "Nima izlayotganingizni tasvirlab bering — universitet, maktab, bog'cha yoki kurslar — biz mos variantlarni topamiz.",
      aiPickPlaceholder: "Masalan: markazga yaqin, 3 yoshli bola uchun xususiy bog'cha",
      findBtn: "Topish",
      findingBtn: "Qidirilmoqda…",
      resetBtn: "Bekor qilish",
      searchByNamePlaceholder: "Nomi bo'yicha qidirish",
      addressLabel: "Manzil",
      showOnMapBtn: "Xaritada ko'rsatish →",
      forWhomLabel: "Kimlar uchun",
      languageLabel: "Til",
      scheduleLabel: "Jadval",
      costLabel: "Narxi",
      documentsLabel: "Hujjatlar: ",
      priceOnRequestText: "Narxini so'rang",
      askAiBtn: "AI'dan so'rash",
      askAiAriaTemplate: "{name} haqida AI'dan so'rash",
      askAiQuestionTemplate: '"{name}" ({city}) haqida batafsil ayting: uni tanlash arziydimi, qanday afzallik va kamchiliklari bor, nimaga e\'tibor berish kerak?',
      needHelpHeading: "Tanlashda yordam kerakmi? AI'dan so'rang",
      clickHintText: "Savolga bosish AI'dan tayyor javob bilan chatni ochadi",
      tabQuestions: {
        universities: [
          "Polshada universitetga qanday hujjat topshiraman?",
          "Diplomni nostrifikatsiya qilish kerakmi?",
          "Chet elliklar uchun qanday stipendiyalar bor?",
        ],
        schools: [
          "Xususiy va davlat maktablari qanday farq qiladi?",
          "Polyak tilini bilmasdan bolani maktabga qanday yozaman?",
          "Qabul uchun qanday hujjatlar kerak?",
        ],
        kindergartens: [
          "Bog'cha uchun PESEL kerakmi?",
          "Davlat bog'chalariga navbat qanday ishlaydi?",
          "Xususiy bog'cha qancha turadi?",
        ],
        courses: [
          "Polshada til kurslarini qanday tanlash kerak?",
          "Chet elliklar uchun bepul polyak tili kurslari bormi?",
          "Tilni B1 darajasigacha o'rganish qancha vaqt oladi?",
        ],
      },
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
      pageTitle: "AI Yordamchi",
      pageSubtitle: "Sizning shaxsiy ko'chish yordamchingiz",
      newChat: "Yangi chat",
      emptyHistory: "Tarix bo'sh",
      todayLabel: "Bugun",
      thisWeekLabel: "Shu hafta",
      olderLabel: "Oldinroq",
      deleteChatAria: "Chatni o'chirish",
      assistantName: "ReloAI yordamchisi",
      online: "Onlayn",
      greetingHeading: "Nima bilan yordam bera olaman?",
      greetingSubtitle: "Ko'chish haqida savol bering — yoki quyidagi misollardan birini tanlang.",
      defaultChatTitle: "Yangi chat",
      deleteModalTitle: "Bu chatni o'chirasizmi?",
      deleteModalBody: "Bu amalni bekor qilib bo'lmaydi. Yozishmalar butunlay o'chiriladi.",
      deleteConfirm: "O'chirish",
      deleteCancel: "Bekor qilish",
    },
    demo: {
      bannerText: "Siz ko'rib chiqish rejimidasiz. Jarayoningizni saqlash va barcha funksiyalardan foydalanish uchun ro'yxatdan o'ting.",
      registerNow: "Hozir ro'yxatdan o'ting",
      floatingGreeting: "👋 Siz ReloAI'ni ko'rib chiqyapsiz — jarayoningizni saqlash uchun bepul ro'yxatdan o'ting",
      dismissAria: "Yopish",
      promptHeading: "Bu funksiyani ochish uchun ro'yxatdan o'ting",
      promptBody: "Jarayoningizni saqlash va barcha funksiyalarni ochish uchun bepul hisob yarating.",
      promptDismiss: "Keyinroq",
    },
    onboarding: {
      stepLabel: "{total} dan {current}-qadam",
      back: "Orqaga",
      cancel: "Bekor qilish",
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
        goal: { question: "Asosiy maqsadingiz nima?", subheading: "Bir nechtasini tanlashingiz mumkin — bu siz uchun qaysi yo'llarni tahlil qilishimizni belgilaydi." },
        jobOffer: { question: "Ish beruvchidan taklifingiz bormi?", subheading: "Bu qanday hujjatlar kerakligini bilishga yordam beradi." },
        universityAccepted: { question: "Universitetga allaqachon qabul qilingansiz?", subheading: "Rejangiz qayerdan boshlanishini belgilaydi." },
        studyLevel: { question: "Qaysi dasturga o'qishga kirasiz?", subheading: "Magistratura va doktoranturada diplom nostrifikatsiyasi kerak." },
        businessType: { question: "Qanday biznes shaklini ochishni rejalashtiryapsiz?", subheading: "Ro'yxatdan o'tish uchun kerakli hujjatlarni belgilaydi." },
        familyMemberType: { question: "Polshada allaqachon kim bor?", subheading: "Oilaviy birlashuv uchun karta pobytu turini belgilaydi." },
        hasChildren: { question: "Farzandlaringiz siz bilan ko'chib o'tyaptimi?", subheading: "Agar kerak bo'lsa, maktab/bog'cha hujjatlarini ko'rsatamiz." },
        foreignEmployer: { question: "Xorijiy ish beruvchi yoki mijozlaringiz bormi?", subheading: "Sizga qanday karta pobytu kerakligiga ta'sir qiladi." },
        registerIp: { question: "Polshada YaTT ro'yxatdan o'tkazishni rejalashtiryapsizmi?", subheading: "NIP, ZUS va biznes ro'yxatidan o'tish kerakligini belgilaydi." },
        timeline: { question: "Qachon ko'chib o'tishni rejalashtiryapsiz?", subheading: "Rejangizda ustuvorliklarni belgilashga yordam beradi." },
        hasCar: { question: "Polshaga olib boradigan avtomobilingiz bormi?", subheading: "Bo'lsa, guvohnoma almashtirish, ro'yxatga olish va sug'urtani qo'shamiz." },
      },
      goalOptions: {
        work: "Ish",
        workDesc: "Taklif bor yoki ish qidiryapman",
        study: "O'qish",
        studyDesc: "Universitet yoki kollej",
        business: "Biznes",
        businessDesc: "YaTT yoki MChJ ochish",
        family: "Oila",
        familyDesc: "Turmush o'rtog'i/ota-ona/farzand allaqachon Polshada",
        remote: "Masofaviy ish",
        remoteDesc: "Xorijiy ish beruvchi uchun ishlayman yoki frilanser",
        savings: "O'z jamg'armasi bilan ko'chish",
        savingsDesc: "Ishsiz, jamg'arma hisobidan ko'chish",
        other: "Boshqa",
      },
      jobOfferOptions: {
        yes: "Ha — Polsha kompaniyasidan taklif bor",
        no: "Yo'q — o'zim ish qidiryapman",
      },
      universityAcceptedOptions: {
        yes: "Ha — qabul tasdig'i bor",
        no: "Yo'q — hali qabul qilinmagan",
      },
      studyLevelOptions: { bachelor: "Bakalavriat", master: "Magistratura", phd: "Doktorantura" },
      businessTypeOptions: {
        jdg: "YaTT (JDG) — o'zini o'zi band qilish",
        spzoo: "MChJ (Sp. z o.o.) — mas'uliyati cheklangan jamiyat",
        undecided: "Hali qaror qilmadim",
      },
      familyMemberTypeOptions: {
        spouse: "Turmush o'rtog'i / hamkor",
        parent: "Ota-ona",
        child: "Farzand",
        multiple: "Bir nechta oila a'zosi",
      },
      hasChildrenOptions: { yes: "Ha", no: "Yo'q" },
      foreignEmployerOptions: {
        yes: "Ha — xorijiy kompaniyada ishlayman",
        no: "Yo'q — frilanserman, mijoz qidiryapman",
      },
      registerIpOptions: {
        yes: "Ha — rasmiy ishlashni xohlayman",
        no: "Yo'q — hozircha rejalashtirmayapman",
      },
      timelineOptions: {
        already: "Allaqachon Polshadaman",
        month1: "1 oy ichida",
        months3: "3 oy ichida",
        months6: "6 oy ichida",
        year1: "Bir yil ichida",
        exploring: "Shunchaki variantlarni o'rganyapman",
      },
      hasCarOptions: {
        yes: "Ha — o'z avtomobilimni olib boraman",
        no: "Yo'q — avtomobil yo'q",
      },
      results: {
        heading: "Biz siz uchun 3 ta ko'chish mararhalarini topdik!",
        loading: "Sizning shaxsiy mararhalarini yaratmoqdamiz...",
        selectButton: "Bu mararhanni tanlang",
        selecting: "Tanlanmoqda…",
        currentRoute: "Joriy marshrut",
        recommended: "Tafsiya qilingan",
        speedFast: "Yuqori tezlik",
        speedMedium: "O'rta tezlik",
        speedSlow: "Past tezlik",
        difficultyEasy: "Past murakkablik",
        difficultyMedium: "O'rta murakkablik",
        difficultyHard: "Yuqori murakkablik",
        approvalRate: "Tasdiqlanish ehtimoli",
        timeline: "Muddatlar",
        cost: "Narx",
        steps: "Bosqichlar",
        bestFor: "Kimlarga mos",
        selectError: "Tanlangan yo'lni saqlab bo'lmadi. Qayta urinib ko'ring.",
        incompleteHeading: "Avval anketani to'ldiring — mararhalarni yaratish uchun fuqarolik va maqsad kerak.",
        incompleteCta: "Anketani davom ettirish",
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
      faq: "SSS",
      login: "Giriş yap",
      getStarted: "Başla",
      goToDashboard: "Panele git →",
    },
    common: {
      cancelBtn: "İptal",
      logoutBtn: "Çıkış yap",
      logoutConfirmTitle: "Hesaptan çıkış yapılsın mı?",
      logoutConfirmBody: "Çıkış yapmak istediğinizden emin misiniz?",
      cityLabel: "Şehir",
      chosenByCountTemplate: "ReloAI ile {n}+ kişi zaten bunu seçti",
    },
    hero: {
      badge: "Yapay zeka destekli taşınma rehberiniz",
      headline1: "Avrupa'ya taşınmak",
      headline2: "— artık kolay.",
      subtext:
        "ReloAI vizenizi, evraklarınızı, konaklamanızı ve bankacılık işlerinizi adım adım, anlaşılır bir dille planlar. Bir soru sorun, saniyeler içinde kişisel bir yol haritası alın.",
      getStarted: "Başla",
      seeHowItWorks: "Nasıl çalıştığını gör",
      trustCountries: "3 ülke",
      trustLanguages: "6 dil",
      trustFree: "Ücretsiz başlangıç",
      trustSocialProof: "1000'den fazla kişi ReloAI ile başarıyla taşındı bile",
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
      docQuestion: "Peki öncelikle hangi belgeler gerekiyor?",
      docResponse: "İşte başlamanız gereken 2 belge:",
      inputPlaceholder: "Polonya'da yaşam hakkında sorun...",
      docCardPassportTitle: "Pasaport taraması",
      docCardPassportSubtitle: "Neredeyse tüm adımlar için gerekli",
      docCardInsuranceTitle: "Sağlık sigortası",
      docCardInsuranceSubtitle: "Oturma izni için gereklidir",
      docStatusDone: "Onaylandı",
      docStatusPending: "İnceleniyor",
    },
    stats: {
      items: [
        { value: "3", label: "Ülke" },
        { value: "100x", label: "Daha ucuz" },
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
          flag: "pl",
          name: "Polonya",
          highlight: "Hızla büyüyen teknoloji merkezi",
          points: [
            "Karta Pobytu oturma izni adım adım rehberi",
            "PESEL kaydı ve yerel bankacılık",
            "Şehre göre ortalama kira rehberi",
          ],
        },
        {
          flag: "de",
          name: "Almanya",
          highlight: "AB Mavi Kartı ve iş arama vizeleri",
          points: [
            "Anmeldung ve Bürgeramt randevuları",
            "Sağlık sigortası (kamu mu özel mi)",
            "Vergi numarası ve serbest çalışan vizesi desteği",
          ],
        },
        {
          flag: "es",
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
    directions: {
      label: "YÖNLER",
      heading: "Nereye taşınıyorsunuz?",
      subheading: "Ülkeniz için kişisel bir plan — saniyeler içinde.",
      comingSoonBadge: "Yakında kullanılabilir",
      ctaLabel: "Başla",
      comingSoonCta: "Yakında",
      cards: [
        { name: "Polonya", subtitle: "Başlamak için istikrarlı Avrupa" },
        { name: "Almanya", subtitle: "Blue Card ve BT kariyeri" },
        { name: "İspanya", subtitle: "Deniz, güneş ve Digital Nomad" },
      ],
    },
    pricing: {
      heading: "Fiyatlandırma",
      subheading: "Ücretsiz başlayın.",
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
      heading: "Yorumlar",
      subheading: "Gerçek insanlar. Gerçek taşınmalar.",
      items: [
        {
          name: "Anna K.",
          route: "Ukrayna → Polonya",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "PESEL'imi 2 günde aldım. ReloAI olmasaydı bilgi aramak için bir hafta harcardım.",
          initials: "AK",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Mikhail S.",
          route: "Rusya → Almanya",
          fromFlag: "ru",
          toFlag: "de",
          rating: 5,
          quote: "Yapay zeka Anmeldung konusunda yardımcı oldu. Her şeyi açıkladı ve büro adreslerini verdi.",
          initials: "MS",
          documentBadge: { country: "de", label: "Anmeldung" },
        },
        {
          name: "Olga M.",
          route: "Belarus → İspanya",
          fromFlag: "by",
          toFlag: "es",
          rating: 5,
          quote: "İspanya'da bir işletme açtım. Kontrol listesi bir aylık iş ve 2000 avro avukat ücreti tasarrufu sağladı.",
          initials: "OM",
          documentBadge: { country: "es", label: "Alta de Autónomo" },
        },
        {
          name: "Dmitry P.",
          route: "Kazakistan → Polonya",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 4,
          quote: "İlerleme takipçisi gerçekten çok yardımcı oluyor. Hangi adımda olduğumu her zaman biliyorum.",
          initials: "DP",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Leyla R.",
          route: "Özbekistan → Almanya",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "İş ilanları bölümü sayesinde Almanya'da iş buldum. Yapay zeka ön yazımı bile yazdı.",
          initials: "LR",
          documentBadge: { country: "de", label: "Anschreiben" },
        },
        {
          name: "Timur A.",
          route: "Tacikistan → İspanya",
          fromFlag: "tj",
          toFlag: "es",
          rating: 5,
          quote: "NIE'mi 3 haftada aldım. Yarım yıl süreceğini düşünüyordum.",
          initials: "TA",
          documentBadge: { country: "es", label: "NIE" },
        },
        {
          name: "Karina N.",
          route: "Ukrayna → Almanya",
          fromFlag: "ua",
          toFlag: "de",
          rating: 5,
          quote: "Ailemle taşındım. Çocuklar için okul ve Rusça konuşan bir doktor bulduk.",
          initials: "KN",
          documentBadge: { country: "de", label: "Familiennachzug" },
        },
        {
          name: "Artyom V.",
          route: "Rusya → İspanya",
          fromFlag: "ru",
          toFlag: "es",
          rating: 4,
          quote: "Digital Nomad Visa — ReloAI rehberini takip ederek 6 haftada hallettim.",
          initials: "AV",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Zarina I.",
          route: "Kazakistan → Polonya",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "mBank'ta ilk denemede hesap açtım. Yapay zeka hangi belgeleri getirmem gerektiğini söyledi.",
          initials: "ZI",
          documentBadge: { country: "pl", label: "mBank" },
        },
        {
          name: "Bogdan F.",
          route: "Ukrayna → Polonya",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Taşınma için en iyi hizmet. Zamandan ve sinirden tasarruf ettim.",
          initials: "BF",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Alexey K.",
          route: "Kazakistan → Polonya",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "PESEL'imi 3 günde aldım — yapay zeka gereken tüm belgeleri önceden söyledi.",
          initials: "AK",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Nilufar R.",
          route: "Özbekistan → Polonya",
          fromFlag: "uz",
          toFlag: "pl",
          rating: 5,
          quote: "ReloAI'nin yardımıyla Varşova'da bir haftada daire buldum.",
          initials: "NR",
          documentBadge: { country: "pl", label: "Wynajem mieszkania" },
        },
        {
          name: "Dmitry V.",
          route: "Belarus → Almanya",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Blue Card'ımı avukatsız çıkardım, €2000 tasarruf ettim.",
          initials: "DV",
          documentBadge: { country: "de", label: "Blue Card" },
        },
        {
          name: "Malika S.",
          route: "Tacikistan → Polonya",
          fromFlag: "tj",
          toFlag: "pl",
          rating: 5,
          quote: "PKO BP'de ilk denemede hesap açtım, yapay zeka belge listesini hazırladı.",
          initials: "MS",
          documentBadge: { country: "pl", label: "PKO BP" },
        },
        {
          name: "Anna P.",
          route: "Ukrayna → İspanya",
          fromFlag: "ua",
          toFlag: "es",
          rating: 5,
          quote: "Digital Nomad Visa — adım adım anlatıldı, bir ayda hallettim.",
          initials: "AP",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Aziz T.",
          route: "Özbekistan → Almanya",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Münih'te üniversiteye girdim — yapay zeka öğrenci vizesi için belgeleri toplamama yardım etti.",
          initials: "AT",
          documentBadge: { country: "de", label: "Studentenvisum" },
        },
        {
          name: "Svetlana I.",
          route: "Rusya → Polonya",
          fromFlag: "ru",
          toFlag: "pl",
          rating: 5,
          quote: "Eşim ve çocuklarımla taşındım, iki haftada kreş ve okul bulduk.",
          initials: "SI",
          documentBadge: { country: "pl", label: "Przedszkole i szkoła" },
        },
        {
          name: "Roman K.",
          route: "Belarus → Almanya",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Berlin'de şahıs şirketi açtım, kontrol listesi tüm evraklarda yardımcı oldu.",
          initials: "RK",
          documentBadge: { country: "de", label: "Gewerbeanmeldung" },
        },
        {
          name: "Dinara Zh.",
          route: "Kazakistan → Polonya",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Varşova Üniversitesi'ne girdim ve öğrenci ikamet kartımı sorunsuzca aldım.",
          initials: "DZ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Yulia N.",
          route: "Ukrayna → İspanya",
          fromFlag: "ua",
          toFlag: "es",
          rating: 4,
          quote: "Uzaktan iş buldum ve bir ayda NIE aldım, her şey rehbere göre.",
          initials: "YN",
          documentBadge: { country: "es", label: "NIE" },
        },
      ],
    },
    faq: {
      heading: "Sıkça Sorulan Sorular",
      subheading: "Taşınmaya başlamadan önce bilmeniz gereken her şey.",
      items: [
        {
          question: "ReloAI nedir ve nasıl çalışır?",
          answer: "ReloAI, insanların Avrupa'ya taşınmasına yardımcı olan bir AI platformudur. Kendinizle ilgili birkaç soruyu yanıtlarsınız — nereli olduğunuz, nereye taşınmak istediğiniz ve hangi amaçla. Yanıtlarınıza dayanarak ReloAI, belgelerin tam listesi, süreler ve adım adım talimatlarla kişisel bir taşınma planı oluşturur. Her şey tek bir yerde — belgeler, konut, bankacılık, sağlık, iş, eğitim, sigorta ve daha fazlası, artı her soruyu 7/24 yanıtlayan bir AI asistanı.",
        },
        {
          question: "ReloAI bir göçmenlik avukatından ne farkı var?",
          answer: "Bir avukat 500 ile 3.000 euro arasında ücret alır ve yalnızca mesai saatlerinde çalışır. ReloAI 7/24 kullanılabilir, kat kat daha ucuzdur ve belgeler ile prosedürler konusunda aynı doğrulukta bilgi verir.",
        },
        {
          question: "ReloAI ile hangi ülkelere taşınabilirim?",
          answer: "Şu anda Polonya kullanılabilir — BDT ülkelerinden taşınmak için en popüler destinasyonlardan biri. Yakında Almanya ve İspanya'yı ekleyeceğiz. Taşınma için mevcut tüm ülkeleri web sitemizde daha ayrıntılı inceleyebilirsiniz. ReloAI 40'tan fazla ülkeden taşınmayı destekler — Ukrayna, Belarus, Rusya, Özbekistan, Tacikistan, Kazakistan, Türkiye, Moldova ve daha birçoğu.",
        },
        {
          question: "Taşınma için hangi belgeler gerekli ve ReloAI bunları toplamama nasıl yardımcı olur?",
          answer: "Belge listesi vatandaşlığınıza ve taşınma amacınıza bağlıdır. Onboarding'i tamamladıktan sonra ReloAI otomatik olarak yalnızca sizin için gerekli olan belgeleri gösterir — gereksiz bilgi olmadan. Her belge için ReloAI kapsamlı bilgi sunar — tüm büyük şehirlerdeki kurumların tam adresleri, güncel çalışma saatleri, yanınızda getirmeniz gereken belgelerin tam listesi, tüm harç ve ücretlerin maliyeti, gerçekçi bekleme süreleri, adım adım talimatlar ve en sık yapılan hataların analizi. Gereksiz hiçbir şey yok — yalnızca gerçekten ihtiyacınız olan.",
        },
        {
          question: "AI taşınma planımı nasıl oluşturuyor?",
          answer: "Onboarding sırasında 5 soruyu yanıtlarsınız — vatandaşlık, hedef ülke, taşınma amacı, iş teklifiniz olup olmadığı ve zaman çizelgeniz. Bu verilere dayanarak ReloAI veritabanından gerekli belgeleri seçer ve gerçekçi sürelerle adım adım bir plan oluşturur. Örneğin, çalışmak için Polonya'ya giden bir Özbek şu planı alır: D vizesi → Adres kaydı → PESEL → Banka hesabı → Çalışma izni → Oturma kartı.",
        },
        {
          question: "ReloAI planıyla taşınma ne kadar sürer?",
          answer: "Durumunuza bağlıdır. Ortalama olarak: vizesiz ülkeler (Ukrayna, Moldova) — tam yasallaştırmaya kadar 1 ila 3 ay. Vize gerektiren ülkeler (Özbekistan, Kazakistan ve diğerleri) — D vizesi alımı dahil 3 ila 6 ay. ReloAI, önceden planlama yapabilmeniz için her belge için gerçekçi süreler gösterir.",
        },
        {
          question: "Ücretli mi? Ne kadar tutuyor?",
          answer: "ReloAI'nin tek bir ülkeye temel erişim ve günde 5 AI mesajı içeren ücretsiz bir planı vardır. Tam erişim için iki ücretli katman bulunur: Premium — ayda 29€: tüm ülkeler, günde 50 AI mesajı, belge yükleme, tam adres veritabanı. Pro — ayda 49€: Premium'daki her şey artı sınırsız AI sohbeti, belge otomatik doldurma, öncelikli destek.",
        },
        {
          question: "Hizmet hangi dillerde çalışıyor?",
          answer: "ReloAI 6 dilde çalışır: Rusça, İngilizce, Özbekçe, Türkçe, Tacikçe ve Ukraynaca. Kayıt olurken dilinizi seçebilir veya istediğiniz zaman ayarlardan değiştirebilirsiniz.",
        },
        {
          question: "Aboneliğimi istediğim zaman iptal edebilir miyim?",
          answer: "Evet. Aboneliğinizi istediğiniz zaman «Profil» bölümünden iptal edebilirsiniz — cezasız ve gizli koşullar olmadan. İptal ettikten sonra ödediğiniz dönemin sonuna kadar erişiminiz devam eder, ardından hesabınız ücretsiz plana geçer. Tüm verileriniz ve belgeleriniz saklanır.",
        },
        {
          question: "ReloAI kişisel verilerimi nasıl koruyor?",
          answer: "Tüm veriler şifrelenmiş, güvenli sunucularda saklanır. Verilerinizi üçüncü taraflarla paylaşmayız. Yüklediğiniz belgelere yalnızca siz erişebilirsiniz. ReloAI, kişisel verilerin korunmasına ilişkin Avrupa yasası olan GDPR'ye uygundur.",
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
      backToLanding: "Siteye dön",
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
        confirmPasswordLabel: "Şifreyi onaylayın",
        passwordMismatch: "Şifreler eşleşmiyor",
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
      subtitle: "Taşınmanızla ilgili tam görünüm.",
      logOut: "Çıkış yap",
      planLabel: "Plan",
      upgradeTooltip: "Planınızı yükseltin",
      upgradeBadge: "⚡ Premium'a yükseltin",
      upgradeToProBadge: "⚡ Pro'ya yükseltin",
      maxPlanBadge: "✓ Maksimum plan",
      unnamed: "İsimsiz",
      memberSinceLabel: "Katılım tarihi",
      personalSection: "Kişisel Bilgiler",
      relocationSection: "Taşınma Profili",
      destinationLabel: "Taşınılan yer",
      routeLabel: "Seçilen yasallaştırma rotası",
      noRouteSelected: "Henüz bir rota seçilmedi",
      chooseRoute: "Rota seç",
      routeModalSubheading: "Aşağıdaki seçeneklerden birini seçin — istediğiniz zaman değiştirebilirsiniz.",
      jobOfferLabel: "İş teklifi var",
      alreadyAdmittedLabel: "Zaten kabul edildi",
      yes: "Evet",
      no: "Hayır",
      notSet: "Belirtilmedi",
      progressSection: "İlerleme Özeti",
      currentStepLabel: "Mevcut adım",
      stepsCompletedLabel: "{total} adımdan {completed} tamamlandı",
      allStepsDone: "Tüm adımlar tamamlandı!",
      documentsSection: "Belge Durumu",
      viewAllDocuments: "Tüm belgeler",
      editBtn: "Taşınma bilgilerini düzenle",
      changeRouteBtn: "Taşınma planını değiştir",
      editModalTitle: "Taşınma bilgilerini düzenle",
      cityLabel: "Şehir",
      cityPlaceholder: "örn. Varşova",
      saveBtn: "Değişiklikleri kaydet",
      saved: "Kaydedildi",
    },
    topbar: {
      searchPlaceholder: "Belge, görev ara...",
      upgrade: "Yükselt",
      openMenuAria: "Menüyü aç",
      avatarAria: "Profile git",
    },
    notifications: {
      bellAria: "Bildirimleri aç",
      title: "Bildirimler",
      markAllRead: "Tümünü okundu olarak işaretle",
      empty: "Henüz bildirim yok",
      registrationTitle: "Kaydolduğunuz için teşekkürler! 🎉",
      registrationMessage: "Tebrikler, ReloAI'a başarıyla kaydoldunuz.",
      welcomeTitle: "Anket tamamlandı! 🎉",
      welcomeMessage: "Anket verilerinizi başarıyla doldurdunuz ve bir taşınma planı seçtiniz ({route}). Bu verileri istediğiniz zaman profil ayarlarından değiştirebilirsiniz.",
      checklistTitle: "Yol haritası güncellendi ✅",
      checklistMessage: "Taşınma planınızı ({route}) yeniden oluşturdunuz. Yeni yol haritasındaki ilerleme sıfırdan başlayacak — önceki anket verilerinizi profil ayarlarından görüntüleyip değiştirebilirsiniz.",
      inactivityTitle: "Taşınma planınızı unutmayın",
      inactivityMessage: "Kaldığınız yerden devam etmek için geri dönün.",
      documentTitle: "Belge yüklendi ve incelemeye gönderildi",
      documentMessage: "İncelenir incelenmez size haber vereceğiz.",
    },
    sidebar: {
      documents: "Belgeler",
      housing: "Konut",
      banks: "Bankalar",
      medicine: "Sağlık",
      insurance: "Sigorta",
      work: "İş",
      community: "Topluluk",
      education: "Eğitim",
      otherServices: "Diğer Hizmetler",
      profile: "Profil",
      settings: "Ayarlar",
      logout: "Çıkış yap",
    },
    settings: {
      title: "Ayarlar",
      subtitle: "ReloAI'nin görünümünü ve davranışını yönetin.",
      languageSection: "Dil",
      languageDesc: "ReloAI sizinle bu dilde konuşacak.",
      currencySection: "Para birimi",
      currencyDesc: "Sitede fiyatların hangi para biriminde gösterileceği (zlotiye karşı kur otomatik güncellenir).",
      saving: "(kaydediliyor…)",
      themeSection: "Görünüm",
      themeDesc: "ReloAI'nin cihazınızda nasıl görüneceğini seçin.",
      themeDark: "Koyu",
      themeLight: "Açık",
      notifications: "Bildirimler",
      notifEmail: "E-posta güncellemeleri",
      notifEmailDesc: "Ara sıra ürün haberleri ve ipuçları.",
      notifDocuments: "Belge hatırlatıcıları",
      notifDocumentsDesc: "Bir son tarih yaklaşınca uyarılar.",
      notifProduct: "Ürün haberleri",
      notifProductDesc: "Yeni özellikler ve güncellemeler.",
      accountSection: "Hesap",
      nameLabel: "Ad",
      emailLabel: "E-posta",
      saveBtn: "Değişiklikleri kaydet",
      saved: "Kaydedildi",
      dangerSection: "Tehlikeli bölge",
      dangerDesc: "Hesabınızı silmek tüm verilerinizi kaldırır. Bu geri alınamaz.",
      deleteAccountBtn: "Hesabı sil",
      deleteConfirmTitle: "Hesabınızı silmek istiyor musunuz?",
      deleteConfirmBody: "Profiliniz ve verileriniz kalıcı olarak silinecek. Bu işlem geri alınamaz.",
      deleteConfirmBtn: "Hesabı sil",
    },
    documents: {
      title: "Belgeler",
      subtitle: "Tam olarak size gereken belgeler, tek bir yerde.",
      tabs: {
        all: "Tümü",
        passport: "Pasaport",
        pesel: "PESEL",
        workPermit: "Çalışma İzni",
        insurance: "Sigorta",
        bank: "Banka",
        biometric: "Biyometri",
        address: "Adres",
        residencePermit: "İkamet Kartı",
        taxId: "Vergi No",
        employment: "İstihdam",
        business: "İşletme",
      },
      status: { verified: "Onaylandı", pending: "İnceleniyor", missing: "Eksik", locked: "Premium" },
      upload: "Yüklemek için sürükleyin veya tıklayın",
      uploadBtn: "Yükle",
      addDocumentBtn: "Belge yükle",
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
        biometricConfirmation: "Biyometri onayı",
        addressConfirmation: "Adres kaydı onayı",
        residencePermitScan: "İkamet kartı taraması",
        taxIdConfirmation: "NIP onayı",
        employmentContract: "İş sözleşmesi",
        businessRegistrationConfirmation: "İşletme kaydı onayı",
      },
      docHints: {
        passportScan: "Çoğu resmi işlem için gereklidir",
        passportPhoto: "Karta Pobytu başvurusu için gereklidir",
        peselForm: "PESEL numarası almanın ilk adımı",
        peselLetter: "PESEL numaranızın verildiğini onaylar",
        workPermitApp: "Yasal olarak çalışmak için gereklidir",
        sponsorshipLetter: "Sponsor işvereninizde çalıştığınızı onaylar",
        healthInsurance: "Oturma izni için gereklidir",
        travelInsurance: "NFZ kapsamına girene kadar gereklidir",
        bankConfirmation: "Banka hesabı açmak için gereklidir",
        proofOfFunds: "Yaşamak için yeterli maddi kaynağınız olduğunu kanıtlar",
        relocationLetter: "Premium ile kullanılabilir",
        taxResidency: "Premium ile kullanılabilir",
        biometricConfirmation: "Urząd do Spraw Cudzoziemców'da biyometri verdikten sonra yükleyin",
        addressConfirmation: "Adres kaydınızı (zameldowanie) onaylayan zaświadczenie",
        residencePermitScan: "Aldığınız ikamet kartının (karta pobytu) taraması",
        taxIdConfirmation: "Vergi dairesinden NIP verildiğine dair onay",
        employmentContract: "İmzalanmış iş sözleşmesi (umowa o pracę)",
        businessRegistrationConfirmation: "CEIDG kayıt onayı",
      },
      uploadGuides: {
        passportScan:
          "Pasaportun fotoğraf ve kişisel bilgilerin bulunduğu sayfasını, varsa vize veya ikamet damgası sayfasını fotoğraflayın. Görüntü net, parlamasız ve kenarları kesilmemiş olmalı.",
        passportPhoto: "Vesikalık fotoğraf yükleyin: cepheden, başlıksız, açık renkli düz zeminde, biyometrik fotoğraf şartlarına uygun.",
        peselForm: "Doldurulmuş ve imzalanmış PESEL numarası başvuru formunu yükleyin.",
        peselLetter: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        workPermitApp: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        sponsorshipLetter: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        healthInsurance: "Sağlık sigortası poliçenizi yükleyin — geçerlilik tarihleri ve poliçe numarası görünür olmalı.",
        travelInsurance: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        bankConfirmation: "Hesap numarası ve hesap sahibi bilgilerini gösteren banka ekstresi veya belgesi yükleyin.",
        proofOfFunds: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        relocationLetter: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        taxResidency: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        biometricConfirmation: "Biyometrik randevunuzdan aldığınız onay veya fişi yükleyin.",
        addressConfirmation: "Kira sözleşmenizi veya adres kayıt onayınızı (zameldowanie) adres net görünecek şekilde yükleyin.",
        residencePermitScan: "İkamet kartınızı her iki taraftan fotoğraflayın — ön yüzde fotoğraf, arka yüzde bilgiler.",
        taxIdConfirmation: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        employmentContract: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
        businessRegistrationConfirmation: "Belgenin net bir fotoğrafını veya taramasını çekin — tüm bilgiler net görünmeli.",
      },
      progressSummary: "Tamamlandı: {total} belgeden {completed}'i",
      autoCompleteToast: "✓ Adım otomatik olarak tamamlandı",
      sectionCompleteHeading: "🎉 Bölüm tamamlandı!",
      sectionCompleteBody: "Sonraki adıma geçin.",
      sectionCompleteDismiss: "Devam et",
      deleteConfirmTitle: "Belge silinsin mi?",
      deleteConfirmBody: "Bu işlem geri alınamaz. Belge kalıcı olarak silinecektir.",
      cancelBtn: "İptal",
      uploadModal: {
        dropzoneLabel: "Dosya seç",
        dropzoneHint: "PDF, JPG veya PNG",
        confirmBtn: "Yükle",
      },
    },
    housing: {
      title: "Polonya'da Konut",
      subtitle: "Doğru şekilde bir yaşam alanı bulun.",
      rentMarket: "🏆 Fiyat-kalite oranına göre en iyi 4 ilçe",
      rentMarketSub: "Uzmanlarımız ve binlerce göçmen, fiyat, konfor ve altyapı açısından yaşamak için en iyi ilçeler olarak bunları seçti.",
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
        mokotow: "Fiyat ve kalite açısından en iyi denge. Sakin, yeşil, metroya yakın.",
        wola: "Modern bir ilçe, çok sayıda yeni inşaat, merkeze yakın.",
        zoliborz: "Rahat, güvenli, göçmenler arasında favori.",
        ochota: "Merkeze yakın sakin bir ilçe, altyapısı iyi, metro var, öğrenciler ve göçmenler arasında popüler.",
      },
      bestValueBadge: "En iyi değer",
      expatsChoiceBadge: "Göçmenlerin tercihi",
      showAllDistricts: "{city} şehrindeki tüm {count} ilçeyi göster →",
      showFewerDistricts: "Listeyi daralt",
      roomsLabel: "Oda",
      roomsAny: "Fark etmez",
      roomsStudio: "Stüdyo",
      rooms2: "2 oda",
      rooms3: "3 oda",
      noDistrictsText: "{city} için mahalle verisi yok.",
      searchWithFiltersBtn: "Bu filtrelerle ara →",
      guides: {
        olx: {
          heading: "OLX'te konut nasıl aranır",
          steps: [
            "Emlak → Kiralık bölümüne gidin ve şehir, fiyat ve oda sayısına göre filtre ayarlayın.",
            "İlanları kaydedin ve kriterlerinize uyan yeni teklifler için bildirimleri açın.",
            "Satıcıya uygulama içi sohbet üzerinden yazın — daireyi şahsen görmeden asla para göndermeyin.",
            "Bir görüntüleme ayarlayın ve sözleşmeyi imzalamadan önce dairenin durumunu ve evraklarını kontrol edin.",
          ],
          aiQuestion: "OLX'te konutu nasıl ararım?",
        },
        otodom: {
          heading: "Otodom'da konut nasıl aranır",
          steps: [
            "Aramanızı daraltmak için Otodom'un gelişmiş filtrelerini kullanın — metro, kat, eşyalı olup olmadığı.",
            "\"Sahibinden\" ibaresine dikkat edin — bu genellikle emlakçı komisyonu olmadığı anlamına gelir.",
            "İlan sahibiyle site üzerinden iletişime geçin ve bir görüntüleme tarihi belirleyin.",
            "İmzalamadan önce dairenin teslim tutanağını (protokół zdawczo-odbiorczy) isteyin.",
          ],
          aiQuestion: "Otodom'da konutu nasıl ararım?",
        },
        gratka: {
          heading: "Gratka'da konut nasıl aranır",
          steps: [
            "Gratka aramasında bölge ve bütçenizi belirleyin — hizmet özellikle büyük şehirler dışında güçlüdür.",
            "İlanın yayın tarihini kontrol edin — eski ilanlar genellikle artık geçerli değildir.",
            "Detayları netleştirmek için satıcıyla telefonla veya sitedeki formla iletişime geçin.",
            "Depozito ödemeden önce her zaman bir kira sözleşmesi isteyin ve mülkiyeti doğrulayın.",
          ],
          aiQuestion: "Gratka'da konutu nasıl ararım?",
        },
      },
    },
    banks: {
      title: "Polonya'da Bankalar",
      subtitle: "Yeni gelenler için tasarlanmış hesapları karşılaştırın.",
      openAccount: "Hesap Aç",
      bestForExpats: "Göçmenler için en iyisi",
      features: {
        pkobp: ["Polonya'nın en büyük şube ağı", "Lehçe ve İngilizce mobil uygulama", "Ücretsiz öğrenci hesabı seçenekleri"],
        mbank: ["Tamamen İngilizce uygulama ve destek", "Anında çevrimiçi hesap açma", "PESEL numarası olmadan ücretsiz"],
        santander: ["Çoklu para birimi hesapları", "Küresel banka ağı", "Yurt dışında ücretsiz banka kartı kullanımı"],
        revolut: ["Başlamak için PESEL gerekmez", "Çoklu para birimi cüzdanı", "Dijital göçebeler için en iyisi"],
      },
      guide: {
        heading: "Polonya'da banka hesabı nasıl açılır — adım adım",
        steps: [
          "🪪 PESEL alın — çoğu banka bu olmadan hesap açmaz",
          "📄 Belgelerinizi hazırlayın — pasaport, adres kanıtı (kira sözleşmesi), PESEL",
          "🏦 Banka seçin — çevrimiçi bankalar (mBank, ING) yabancılar için daha kolaydır",
          "📱 Çevrimiçi veya şahsen açın — mBank ve Revolut tamamen çevrimiçi açılabilir",
          "✅ Kartınızı etkinleştirin — 5-7 gün içinde posta ile gelir",
        ],
        tipsHeading: "💡 İpuçları",
        tips: [
          "mBank ve ING yabancılara en dostane olanlardır",
          "Revolut, PESEL olmadan 10 dakikada açılır",
          "PKO BP ve Pekao şahsen başvuru gerektirir",
          "Adres kanıtı olarak kira sözleşmenizi yanınıza alın",
        ],
      },
      openAccountAt: "{bank}'de hesap nasıl açılır",
      guides: {
        pkobp: {
          heading: "PKO BP'de hesap nasıl açılır",
          steps: [
            "PESEL alın — PKO BP, çoğu geleneksel banka gibi, hesap açmak için bunu ister.",
            "En yakın şubeden randevu alın — PKO BP Polonya'nın en büyük şube ağına sahip, bir şube bulmak kolay.",
            "Yanınıza pasaportunuzu, PESEL'inizi ve adres kanıtınızı (kira sözleşmesi olabilir) alın.",
            "Sözleşmeyi şubede imzalayın — personel size uygun hesap türünü seçmenizde ve kartınızı çıkarmanızda yardımcı olur.",
          ],
          aiQuestion: "PKO BP'de hesabı nasıl açarım?",
        },
        mbank: {
          heading: "mBank'te hesap nasıl açılır",
          steps: [
            "mBank uygulamasını indirin veya web sitelerine gidin — tüm süreç çevrimiçi yapılabilir, şubeye gitmenize gerek yok.",
            "Başvuruyu doldurun ve kimliğinizi video görüşmesi veya pasaportunuzu kontrol eden bir kurye ile doğrulayın.",
            "Zaten varsa PESEL numaranızı belirtin — bu süreci hızlandırır ama başlamak için zorunlu değildir.",
            "Onayı bekleyin — hesap genellikle bir gün içinde açılır, uygulama tamamen İngilizce.",
          ],
          aiQuestion: "mBank'te hesabı nasıl açarım?",
        },
        santander: {
          heading: "Santander'de hesap nasıl açılır",
          steps: [
            "Hesap türünüzü seçin — Santander, uluslararası transferler için kullanışlı olan çoklu para birimi hesapları sunar.",
            "Pasaportunuzu, PESEL'inizi ve adres kanıtınızı hazırlayın.",
            "Şubeden randevu alın veya durumunuz için mevcutsa çevrimiçi başvurun.",
            "Kartınızı etkinleştirin ve mobil bankacılığı kurun — kart yurt dışında ücretsiz kullanılabilir.",
          ],
          aiQuestion: "Santander'de hesabı nasıl açarım?",
        },
        revolut: {
          heading: "Revolut'ta hesap nasıl açılır",
          steps: [
            "Revolut uygulamasını indirin ve telefon numaranızla kaydolun — şubeye gitmenize gerek yok.",
            "Kimliğinizi uygulama içinde bir selfie ve pasaport taraması ile doğrulayın.",
            "Hesap açmak için PESEL gerekmez — bu, yeni gelenler için en hızlı seçenektir.",
            "Hesabınıza para yükleyin ve çoklu para birimi cüzdanını ve kartı kullanmaya başlayın.",
          ],
          aiQuestion: "Revolut'ta hesabı nasıl açarım?",
        },
      },
      howToOpenLabel: "Hesap nasıl açılır?",
      emptyText: "Bankalar hakkında henüz veri yok.",
      faqHeading: "Hesap açma hakkında sık sorulan sorular",
      faqCaption: "Bir soruya tıklamak, hazır yapay zeka yanıtıyla sohbeti hemen açar",
      faqQuestions: [
        "PESEL olmadan nasıl hesap açarım?",
        "Hangi belgeler gerekli?",
        "Açılış kaç gün sürer?",
        "Online açabilir miyim?",
      ],
    },
    medicine: {
      title: "Polonya'da Sağlık",
      subtitle: "Hızlıca sigorta yaptırın ve bakım bulun.",
      clinicsTitle: "Klinikler",
      clinicsSub: "İngilizce, Rusça ve Ukraynaca konuşan seçenekler.",
      warsaw: "Varşova",
      languages: {
        ruUa: "Rusça ve Ukraynaca konuşuluyor",
        en: "İngilizce konuşuluyor",
        ru: "Rusça konuşuluyor",
        ua: "Ukraynaca konuşuluyor",
      },
      bookBtn: "Randevu al",
      nfzTitle: "NFZ sağlık sigortası nasıl alınır",
      nfzSteps: [
        "İş sözleşmesiyle (umowa o pracę) işe girin — işvereniniz sizi otomatik olarak ZUS'a kaydeder",
        "PESEL numarası alın",
        "Sigortanızı eWUŚ web sitesinden onaylayın (ewus.nfz.gov.pl)",
        "Herhangi bir devlet kliniğinden randevu alın",
      ],
      nfzAiQuestion: "NFZ'ye nasıl kaydolurum?",
      stepLabel: "Adım",
      emergencyTitle: "Acil durum ve ambulans",
      emergencyNumber: "Polonya'da acil numara: 112 veya 999",
      emergencyEr: "En yakın acil servis (SOR) randevusuz ve ücretsiz kabul eder",
      emergencyPharmacy: "Nöbetçi eczane bulucu:",
      usefulSitesTitle: "Faydalı web siteleri",
      usefulSites: [
        { url: "znany-lekarz.pl", desc: "Online doktor randevusu — Rusça konuşan doktorlar mevcut" },
        { url: "ewus.nfz.gov.pl", desc: "NFZ sigorta durumunuzu kontrol edin" },
        { url: "nfz.gov.pl", desc: "Resmi NFZ web sitesi" },
        { url: "aptekadyzurna.pl", desc: "Nöbetçi eczane bulun" },
      ],
      dentalTitle: "Diş hekimliği",
      dentalNfz: "NFZ temel tedaviyi karşılar — dolgu, çekim",
      dentalPrivate: "Özel diş hekimliği: randevu başına 150–400 PLN",
      dentalChains: "Önerilen zincirler: Dental+, Medicover Stomatologia",
      aiPickHeading: "Yapay zeka ile klinik seçimi",
      aiPickSubtitle: "Sorununuzu veya nasıl bir doktor ya da klinik gerektiğini tarif edin — size uygun seçenekleri bulalım.",
      aiPickPlaceholder: "Örn: diş ağrısı var, merkeze yakın diş hekimi lazım",
      searchPlaceholder: "İsme veya semte göre ara",
      allCategoriesLabel: "Tüm kategoriler",
      allDistrictsLabel: "Tüm semtler",
      clinicsCountTemplate: "{count} klinik",
      notFoundText: "{city} için bir şey bulunamadı.",
      askAiQuestionTemplate: '"{name}" kliniği ({city}) hakkında daha fazla bilgi ver: seçmeye değer mi, artıları ve eksileri neler, nelere dikkat etmeli?',
      learnMoreBtn: "Daha fazla",
    },
    insurance: {
      title: "Polonya'da Sigorta",
      subtitle: "Sağlık, araç ve diğer sigorta türleri",
      compareTitle: "Kamu ve Özel Sigorta",
      nfzLabel: "NFZ Kamu Sigortası",
      nfzTooltip: "NFZ — Polonya'nın ulusal sağlık sistemi",
      privateLabel: "Özel",
      rows: [
        { label: "Maliyet", nfz: "İstihdam katkı payları ile ücretsiz", pvt: "Ayda 150–400 PLN" },
        { label: "Bekleme süresi", nfz: "Uzmanlar için haftalar-aylar", pvt: "Aynı günden birkaç güne" },
        { label: "Dil desteği", nfz: "Genellikle sadece Lehçe", pvt: "İngilizce, sık sık Rusça/Ukraynaca" },
        { label: "Kapsam", nfz: "Geniş ama sınırlı doktor seçimi", pvt: "Kendi kliniğinizi ve doktorunuzu seçin" },
      ],
      learnMoreBtn: "Daha fazla bilgi",
      types: {
        medical: { name: "Sağlık sigortası", provider: "Medicover", price: "Ayda 150–400 PLN", desc: "Uzman doktorlara sırasız hızlı erişim için özel sağlık sigortası." },
        car: { name: "Araç sigortası (OC/AC)", provider: "PZU", price: "Yılda 800–2.500 PLN", desc: "Aracınızın tam korunması için zorunlu trafik sigortası (OC) ve kasko (AC)." },
        home: { name: "Konut sigortası", provider: "Warta", price: "Yılda 200–600 PLN", desc: "Evinizi yangın, su hasarı ve hırsızlığa karşı korur." },
        travel: { name: "Seyahat sigortası", provider: "Allianz", price: "Seyahat başına 20–80 PLN", desc: "Avrupa'da seyahat ederken tıbbi masrafları ve acil durumları kapsar." },
      },
      guides: {
        medical: {
          heading: "Sağlık sigortası nasıl yaptırılır",
          steps: [
            "Kapsam düzeyinizi seçin — temel paket veya diş hekimliği ve uzmanları içeren genişletilmiş paket.",
            "Birkaç sigorta şirketinin (LUX MED, Medicover, Signal Iduna) fiyat ve klinik ağını karşılaştırın.",
            "Poliçeyi çevrimiçi veya sigorta şirketinin ofisinde yaptırın — genellikle pasaport ve PESEL gerekir.",
            "Poliçe numaranızı saklayın — randevu alırken buna ihtiyacınız olacak.",
          ],
          aiQuestion: "Polonya'da sağlık sigortasını nasıl yaptırırım?",
        },
        car: {
          heading: "Araç sigortası (OC/AC) nasıl yaptırılır",
          steps: [
            "OC (zorunlu trafik sigortası), tescilli her araç için yasa gereği zorunludur.",
            "Birkaç sigorta şirketinin OC fiyatlarını karşılaştırın — fiyat sürüş geçmişine göre büyük ölçüde değişir.",
            "İsterseniz daha kapsamlı koruma için AC (hırsızlık ve hasar sigortası) ekleyin.",
            "Poliçeyi birkaç dakikada çevrimiçi olarak alın — araç bilgileriniz ve ehliyetiniz gerekecek.",
          ],
          aiQuestion: "Polonya'da araç sigortasını nasıl yaptırırım?",
        },
        home: {
          heading: "Ev sigortası nasıl yaptırılır",
          steps: [
            "Neyi sigortalatacağınıza karar verin — konutun kendisi, içindeki eşyalar veya sorumluluk.",
            "Daire hakkında temel bilgileri toplayın: metrekare, adres, bina tipi.",
            "Birkaç sigorta şirketinin tekliflerini karşılaştırın — birçok banka mortgage ile birlikte alındığında indirim sunar.",
            "Poliçeyi çevrimiçi veya bir acente aracılığıyla alın ve gerekirse ev sahibiniz için kanıtı saklayın.",
          ],
          aiQuestion: "Polonya'da ev sigortasını nasıl yaptırırım?",
        },
        travel: {
          heading: "Seyahat sigortası nasıl yaptırılır",
          steps: [
            "Seyahatinizin süresini ve amacını belirleyin — bu ihtiyacınız olan kapsam düzeyini belirler.",
            "Poliçenin tıbbi masrafları, tahliyeyi ve seyahat iptalini kapsadığını kontrol edin.",
            "Çevrimiçi teklifleri karşılaştırın — poliçe almak birkaç dakika sürer ve şahsen gitmeye gerek yoktur.",
            "Poliçeyi telefonunuzda saklayın veya yazdırın — sınırda veya hastanede ihtiyacınız olabilir.",
          ],
          aiQuestion: "Seyahat sigortasını nasıl yaptırırım?",
        },
      },
      emptyText: "Sigortalar hakkında henüz veri yok.",
      aiPromptHeading: "Ne seçeceğinizi bilmiyor musunuz?",
      aiPromptSubtitle: "Yapay zekaya sorun — durumunuzu dikkate alarak size en uygun olanı önerecek",
      aiPromptCta: "Sor",
      aiPromptQuestion:
        "Neyi seçmeliyim — devlet NFZ sigortası mı yoksa özel mi? Durumumu dikkate al: resmi olarak çalışıyor muyum, doktora hızlı erişim gerekli mi, bütçe önemli mi.",
    },
    work: {
      title: "Polonya'da İş",
      subtitle: "Sözleşmeler, maaşlar ve nerede arayacağınız.",
      contractVsB2B: "Sözleşme ve B2B",
      salarySearch: "Maaş Arama",
      salarySearchSub: "Ortalama ücreti görmek için bir meslek yazın.",
      placeholder: "örn. yazılım geliştirici, hemşire, şoför...",
      averageSalary: "Polonya'da ortalama maaş",
      inEuros: "Euro cinsinden",
      salaryNote: "* Rakamlar tahminidir, deneyime ve şehre göre değişir.",
      noExactData: "Bu meslek için henüz kesin veri yok — ulusal ortalama gösteriliyor.",
      jobSites: "İş Siteleri",
      visitSite: "Siteyi ziyaret et",
      searchByProfession: "Bu meslek için iş ilanlarını ara",
      viewVacanciesBtn: "İlanları görüntüle",
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
      guides: {
        employment: {
          heading: "Nasıl iş sözleşmesi (umowa o pracę) alınır",
          steps: [
            "İşvereniniz işe başlamadan önce sizinle yazılı bir iş sözleşmesi imzalamak zorundadır.",
            "Sözleşmede pozisyonunuzun, maaşınızın, çalışma programınızın ve varsa deneme süresinin belirtildiğinden emin olun.",
            "İşvereniniz sizi ZUS'a (sosyal sigorta) kaydeder — bu size NFZ ve emeklilik katkı payları erişimi sağlar.",
            "Sözleşmenin bir kopyasını saklayın — oturma izni ve diğer işlemler için gerekecek.",
          ],
          aiQuestion: "Polonya'da iş sözleşmesini nasıl alırım?",
        },
        b2b: {
          heading: "B2B sözleşmesi (serbest çalışma) nasıl kurulur",
          steps: [
            "CEIDG web sitesi üzerinden şahıs şirketi (JDG) kaydedin — bu bir günde çevrimiçi olarak yapılabilir.",
            "Bir muhasebeciyle birlikte vergi biçiminizi (genel kurallar, sabit vergi veya ryczałt) seçin.",
            "Sözleşme yapan şirketle bir B2B sözleşmesi imzalayın — bu bir iş sözleşmesi değil, medeni hukuk sözleşmesidir.",
            "ZUS katkı paylarınızı her ay kendiniz ödeyin ve vergi beyannamenizi verin.",
          ],
          aiQuestion: "Polonya'da B2B sözleşmesini nasıl kurarım?",
        },
        pracuj: {
          heading: "Pracuj.pl'de iş nasıl aranır",
          steps: [
            "Bir profil oluşturun ve özgeçmişinizi (CV) yükleyin — birçok ilan tek tıkla başvurmanıza izin verir.",
            "Şehir, maaş ve İngilizce/Lehçe seviyesine göre filtreleri kullanın.",
            "Yeni ilanları kaçırmamak için mesleğinizle ilgili anahtar kelimeler için uyarılar ayarlayın.",
            "Bazı mülakatların Lehçe yapılabileceğine hazır olun — mülakat dilini önceden teyit edin.",
          ],
          aiQuestion: "Pracuj.pl'de işi nasıl ararım?",
        },
        nofluff: {
          heading: "NoFluffJobs'ta iş nasıl aranır",
          steps: [
            "NoFluffJobs teknolojiye özeldir — ilanları teknoloji yığınına göre filtrelemek burada kolaydır.",
            "İlanların maaş aralığını önceden gösterdiğine dikkat edin — bu teklifleri karşılaştırmayı kolaylaştırır.",
            "Profilinizi İngilizce doldurun — Polonya'daki birçok IT şirketi İngilizce çalışır.",
            "Site üzerinden doğrudan başvurun — çoğu şirket birkaç gün içinde yanıt verir.",
          ],
          aiQuestion: "NoFluffJobs'ta işi nasıl ararım?",
        },
        linkedin: {
          heading: "LinkedIn'de iş nasıl aranır",
          steps: [
            "Profilinizi tamamen doldurun — deneyim, beceriler ve tavsiyeler, bir işe alım uzmanının sizi kendiliğinden bulma şansını artırır.",
            "Yalnızca işe alım uzmanlarına görünen \"Open to work\" durumunu açın, böylece aramanız mevcut işvereninizden gizli kalır.",
            "Kesin bir arama için konum (Poland/Warsaw) ve uzaktan çalışma filtrelerini kullanın.",
            "İşe alım uzmanlarına doğrudan mesaj gönderin — doğrudan iletişim genellikle bir form üzerinden başvurmaktan daha etkilidir.",
          ],
          aiQuestion: "LinkedIn'de işi nasıl ararım?",
        },
      },
      notFoundHeading: "Bu meslek veritabanımızda yok",
      notFoundTryThese: "Şu mesleklerden birini deneyin:",
      perMonth: "ay",
      employmentFullSubtitle: "Tüm çalışan haklarıyla",
      faqHeading: "Ne seçeceğinizi bilmiyor musunuz? Yapay zekaya sorun",
      faqCaption: "Bir soruya tıklamak, hazır yapay zeka yanıtıyla sohbeti hemen açar",
      faqQuestions: [
        "Neyi seçmeliyim: iş sözleşmesi mi yoksa B2B mi?",
        "B2B'den iş sözleşmesine nasıl geçerim?",
        "B2B'de hangi vergileri öderim?",
        "Sözleşmesiz çalışırsam neyi kaybederim?",
      ],
    },
    community: {
      title: "Topluluklar",
      subtitle: "Polonya'ya taşınanlar için Telegram kanalları ve sohbetleri.",
      join: "Katıl",
      members: "üye",
      cats: { all: "Tümü", housing: "Konut", work: "İş", sport: "Spor", family: "Aile", general: "Genel" },
    },
    dashboard: {
      relocation: "{country} Taşınması",
      subtitle: "Kişiselleştirilmiş yol haritanız, gerçek zamanlı güncellenir.",
      subtitleTemplate: "{from} → {city} · Hedef: {goal} · İlerleme %{percent}",
      subtitleTemplateNoCity: "{from} · Hedef: {goal} · İlerleme %{percent}",
      overallProgress: "Genel ilerleme",
      openBtn: "Aç",
      expandBtn: "Genişlet",
      collapseBtn: "Daralt",
      whatNextBtn: "Sırada ne var",
      stepsCompletedTemplate: "{total} adımdan {done} tamamlandı",
      docsReadyTemplate: "{total} belgeden {done} hazır",
      currentPhasePrefix: "Şimdi: {phase}",
      allPhasesDone: "Tüm aşamalar tamamlandı",
      motivational: {
        noRoute: "Bir rota seçin — kişisel taşınma planınız burada görünecek.",
        allDone: "Tüm belgeler tamamlandı. Taşınmaya tamamen hazırsınız!",
        almostThere: "Hedefe neredeyse ulaştınız — tam yasallaşmaya çok az kaldı.",
        thirdDone: "Yolun üçte birinden fazlası tamamlandı. Böyle devam edin!",
        goodStart: "Harika bir başlangıç! Tamamladığınız her belge sizi hedefe yaklaştırıyor.",
        startFirst: "İlk adımla başlayın — ve tüm yol daha anlaşılır hale gelecek.",
      },
      timelineSections: {
        before_departure: "Gitmeden önce",
        first_week: "İlk hafta",
        first_month: "İlk ay",
        longterm: "Uzun vadeli",
      },
      countdown: {
        heading: "Vizesiz rejim kapsamında 30 günlük yasal kalış hakkınız var",
        remaining: "{days} gün kaldı — PESEL ve ikamet kartı başvurunuzu zamanında yapmanız gerekiyor",
        expired: "30 günlük yasal kalış süreniz doldu — belgelerinizi en kısa sürede yasallaştırmak için başvurun",
      },
      phases: {
        beforeDeparture: "Yola çıkmadan önce hazırlık",
        legalization: "Yasallaştırma — ilk 30 gün",
        residenceCard: "İkamet kartı (karta pobytu) alma",
        workTaxes: "İş ve vergiler",
      },
      phaseDescriptions: {
        beforeDeparture: "Hesap oluşturma, anketi doldurma ve vize uygunluğunun kontrolü — taşınmadan önceki ilk adımlar.",
        legalization: "Belgelerin teslimi, biyometrinin tamamlanması ve ikamet adresinin kaydı (zameldowanie) — varışınızdan sonraki ilk ay içinde zorunlu adımlar.",
        residenceCard: "Karta pobytu — ikamet izni — için başvuru yapmak ve kartın kendisini almak.",
        workTaxes: "Vergi numarasını (NIP) almak ve iş sözleşmenizi veya işletmenizi resmi olarak kaydettirmek.",
      },
      phaseStatus: {
        done: "Tamamlandı",
        inProgress: "Devam ediyor",
        waiting: "Bekliyor",
      },
      sidebar: {
        tagline: "Taşınma planınız",
        home: "Ana sayfa",
        myPlanSection: "PLANIM",
        roadmap: "Yol haritası",
        checklist: "Kontrol listesi",
        aiAssistant: "AI Asistan",
        servicesSection: "HİZMETLER",
        landingLinkAria: "Ana sayfaya git",
      },
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
        stepLabel: "Adım",
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
        taxId: {
          title: "Vergi numaranızı alın",
          byCountry: {
            poland: "Yerel vergi dairesinden NIP (vergi kimlik numarası) alın.",
            germany: "Anmeldung işleminden sonra Steuer-ID'niz posta yoluyla gelir.",
            spain: "NIE (yabancı kimlik numarası) alın — İspanya'da neredeyse her şey için gereklidir.",
          },
        },
        employmentRegistration: {
          title: "İşinizi veya işletmenizi resmileştirin",
          byCountry: {
            poland: "Umowa o pracę/zlecenie imzalayın veya işletmenizi ZUS'a kaydettirin.",
            germany: "İş sözleşmenizi imzalayın ve Finanzamt ile sosyal sigortaya kaydolun.",
            spain: "Çalışan veya serbest meslek sahibi olarak Seguridad Social veya Hacienda'ya alta kaydı yaptırın.",
          },
        },
      },
      stepGuides: {
        visa_eligibility: {
          heading: "Vize veya giriş izni nasıl alınır",
          steps: [
            "Amacınıza uygun vize veya giriş türünü belirleyin (çalışma, eğitim, iş, aile birleşimi).",
            "Temel belge setini toplayın: pasaport, davetiye veya seyahat amacı kanıtı, sigorta, mali güvence.",
            "Gideceğiniz ülkenin konsolosluğuna veya vize merkezine başvurun.",
            "Karar bekleyin ve gerekirse mülakata katılın.",
            "Vizenizi aldıktan sonra giriş sürelerini ve vardığınızda yapmanız gerekenleri netleştirin.",
          ],
        },
        business_registration: {
          heading: "İşletme nasıl kurulur",
          steps: [
            "Ülkeye göre bir hukuki yapı seçin (şahıs şirketi, limited şirket vb.).",
            "Kuruluş belgelerinizi ve tescilli adres kanıtınızı hazırlayın.",
            "İlgili ticaret siciline başvurunuzu yapın.",
            "Şirketinizin vergi ve istatistik numaralarını alın.",
            "İşletme adına bir banka hesabı açın.",
          ],
        },
        documents: {
          heading: "Hangi belgeleri hazırlamanız gerekiyor",
          steps: [
            "Temel belgelerin asıllarını ve kopyalarını toplayın: pasaport, sertifikalar, diplomalar (gerekirse apostil ile).",
            "Gerekiyorsa belgelerin gideceğiniz ülkenin diline noter onaylı çevirilerini yaptırın.",
            "Durumlarını takip etmek için taramaları ReloAI'daki «Belgeler» bölümüne yükleyin.",
            "Her belgenin durumunu kontrol edin: Tamamlandı, İncelemede veya Eksik.",
            "Asıl belgeleri yanınızda bulundurun — devlet dairelerine şahsen başvururken gerekebilir.",
          ],
        },
        biometric: {
          heading: "Biyometri nasıl tamamlanır",
          steps: [
            "Göçmenlik dairesi veya konsoloslukta biyometri randevusu alın — genellikle çevrimiçi mümkündür.",
            "Yanınıza pasaportunuzu, randevu onayınızı ve destekleyici belgelerinizi alın.",
            "Randevuda parmak izleriniz alınır ve fotoğrafınız çekilir.",
            "Makbuzu veya başvuru numaranızı saklayın — belgenizin durumunu bununla takip edebilirsiniz.",
            "Kartınızın veya izninizin hazır olduğuna dair bildirimi bekleyin.",
          ],
        },
        address_registration: {
          heading: "Adres nasıl kaydettirilir",
          steps: [
            "Kalıcı veya geçici bir konut bulun ve sahibinden kayıt için onay alın (kira sözleşmesi veya ev sahibinin onayı).",
            "Pasaportunuzu ve mülkü kullanma hakkınızı gösteren belgeyi hazırlayın.",
            "Şahsen veya e-devlet portalı üzerinden yerel belediyeye başvurun.",
            "Adres kaydı formunu doldurun.",
            "Kayıt onayınızı alın — sonraki adımlar için gerekecek (oturma izni, vergi numarası vb.).",
          ],
        },
        residence_permit: {
          heading: "Oturma izni nasıl alınır",
          steps: [
            "Başvurmak için geçerli bir dayanağınız olduğundan emin olun: çalışma, eğitim, iş veya aile birleşimi.",
            "Belgelerinizi toplayın: pasaport, fotoğraf, amaç kanıtı, sigorta, gelir ve adres kanıtı.",
            "Başvurunuzu yerel göçmenlik dairesine — şahsen veya çevrimiçi — yapın.",
            "Daha önce yapılmadıysa biyometri randevunuzu tamamlayın.",
            "Kararı bekleyin — bu birkaç haftadan birkaç aya kadar sürebilir, başvuru durumunuzu takip edin.",
          ],
        },
        tax_id: {
          heading: "Vergi kimlik numarası nasıl alınır",
          steps: [
            "Hangi numaraya ihtiyacınız olduğunu belirleyin: genel kimlik numarası mı yoksa işletme vergi numarası mı.",
            "Pasaportunuzu ve varsa adres kaydı kanıtınızı toplayın.",
            "Yerel belediyeye veya vergi dairesine başvurunuzu yapın.",
            "Numaranızın verilmesini bekleyin — genellikle aynı gün mümkündür.",
            "Onay belgesini saklayın — numara işe başlama, bankacılık ve sağlık sigortası için gerekecek.",
          ],
        },
        employment_registration: {
          heading: "İşe resmi olarak nasıl başlanır",
          steps: [
            "İşvereninize hangi tür çalışma izni veya sözleşme gerektiğini sorun.",
            "Belgelerinizi hazırlayın: pasaport, oturma izni veya çalışma vizesi, gerekirse diploma.",
            "İş sözleşmenizi imzalayın ve işvereninizin gerekli bildirimleri yaptığından emin olun.",
            "Henüz yoksa sosyal sigorta numaranızı alın.",
            "İlk maaşınızdan itibaren kesintilerin ve vergilerin doğru yapıldığını kontrol edin.",
          ],
        },
      },
      howToGetQuestion: "Nasıl alınır: {title}?",
      home: {
        flightHeading: "Yolculuğunuz",
        flightSub: "Ne kadar çok adım tamamlarsanız, uçak hedefinize o kadar yaklaşır.",
        flightOriginPlaceholder: "Ülkeniz",
        greeting: "Merhaba, {name}! 👋",
        guestGreeting: "Merhaba! 👋",
        greetingSubtitle: "{country}'a taşınmanız böyle ilerliyor.",
        stepsLabel: "Tamamlanan adımlar",
        phaseLabel: "Mevcut aşama",
        daysLabel: "Katılımdan bu yana geçen gün",
        quickActionsHeading: "Hızlı işlemler",
        quickActionRoadmapDesc: "Adım adım ilerlemenizi kontrol edin",
        quickActionDocumentsDesc: "Belgelerinizi yükleyin ve takip edin",
        quickActionAiDesc: "Yapay zeka asistanına soru sorun",
        quickActionBanksDesc: "Yeni gelenler için banka bulun",
        quickActionWorkDesc: "İş arayın ve maaşları öğrenin",
        currentStepCta: "Adıma git →",
      },
    },
    guideCard: {
      whenToGet: "Ne zaman başvurulmalı",
      whereToSubmit: "Nereye başvurulmalı",
      showOnMap: "Haritada göster",
      onMap: "Haritada",
      workingHours: "Çalışma saatleri",
      onlineBooking: "Online randevu",
      cost: "Ücret",
      waitingTime: "Bekleme süresi",
      requiredDocs: "Belgeler",
      howToApply: "Nasıl başvurulur",
      tips: "İpuçları",
      commonMistakes: "Sık yapılan hatalar",
      officialSite: "Resmi site",
      downloadForm: "Formu indir",
      fillWithAi: "Yapay zeka ile doldur",
      askAi: "Yapay zekaya sor",
      askAiAriaTemplate: "{name} hakkında yapay zekaya sor",
      askAiBankQuestionTemplate:
        "{name} hakkında daha fazla bilgi ver: hesap nasıl açılır, hangi belgeler gerekir ve nelere dikkat edilmeli?",
      askAiTopicQuestionTemplate:
        '"{name}" hakkında daha fazla bilgi ver: nasıl başvurulur, hangi belgeler gerekir ve nelere dikkat edilmeli?',
      yourBank: "Bankanız",
      chooseBank: "Banka seç",
      bankInfo: "Banka bilgisi",
      classicAccount: "Klasik hesap",
      moreDetails: "Daha fazla",
      allTag: "Tümü",
      citizenshipNote: "Vatandaşlığınıza uygun rehberler gösteriliyor.",
      loading: "Yükleniyor…",
      searchGeneric: "Ara",
      searchBanks: "Banka ara",
      searchInsurance: "Sigorta ara",
      searchGuides: "Rehber ara",
      important2026Badge: "2026 için önemli",
      moreBanksTemplate: "{n} banka daha",
      statusDone: "Tamamlandı",
      statusNotStarted: "Başlanmadı",
      urgentAria: "Acil dikkat gerektirir",
      start: "Başla",
      compareBanksTitle: "Banka karşılaştırması",
      tagsLabel: "Etiketler",
      tags: { noPesel: "PESEL'siz", fullyOnline: "Tamamen online", free: "Ücretsiz", multicurrency: "Çoklu döviz" },
      headlines: {
        noPesel: "PESEL'siz",
        fullyOnline: "Online hesap aç",
        free: "Ücretsiz hizmet",
        multicurrency: "Çoklu döviz hesabı",
      },
    },
    helpButton: {
      label: "Bu nasıl alınır?",
      openGuide: "📄 Talimatları aç",
      askAi: "💬 Yapay zekaya sor",
      askAiFooter: "Sorularınız mı var? Yapay zekaya sorun →",
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
      aiPickHeading: "Yapay zeka ile seçim",
      aiPickSubtitle: "Ne aradığınızı tarif edin — üniversite, okul, anaokulu ya da kurs — size uygun seçenekleri bulalım.",
      aiPickPlaceholder: "Örn: merkeze yakın, 3 yaşındaki çocuk için özel anaokulu",
      findBtn: "Bul",
      findingBtn: "Aranıyor…",
      resetBtn: "Sıfırla",
      searchByNamePlaceholder: "İsme göre ara",
      addressLabel: "Adres",
      showOnMapBtn: "Haritada göster →",
      forWhomLabel: "Kimler için",
      languageLabel: "Dil",
      scheduleLabel: "Program",
      costLabel: "Ücret",
      documentsLabel: "Belgeler: ",
      priceOnRequestText: "Fiyat için iletişime geçin",
      askAiBtn: "Yapay zekaya sor",
      askAiAriaTemplate: "{name} hakkında yapay zekaya sor",
      askAiQuestionTemplate: '"{name}" ({city}) hakkında daha fazla bilgi ver: seçmeye değer mi, artıları ve eksileri neler, nelere dikkat etmeli?',
      needHelpHeading: "Seçim konusunda yardıma mı ihtiyacınız var? Yapay zekaya sorun",
      clickHintText: "Soruya tıklamak, yapay zekadan hazır cevabı olan bir sohbet açar",
      tabQuestions: {
        universities: [
          "Polonya'da üniversiteye nasıl başvururum?",
          "Diploma denkliği (nostrifikasyon) gerekli mi?",
          "Yabancılar için hangi burslar mevcut?",
        ],
        schools: [
          "Özel ve devlet okulları arasındaki fark nedir?",
          "Lehçe bilmeden çocuğumu okula nasıl kaydettiririm?",
          "Kayıt için hangi belgeler gerekli?",
        ],
        kindergartens: [
          "Anaokulu için PESEL gerekli mi?",
          "Devlet anaokullarındaki sıra nasıl işler?",
          "Özel anaokulu ne kadar tutar?",
        ],
        courses: [
          "Polonya'da dil kursu nasıl seçilir?",
          "Yabancılar için ücretsiz Lehçe kursu var mı?",
          "Dili B1 seviyesine öğrenmek ne kadar sürer?",
        ],
      },
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
      pageTitle: "Yapay Zeka Asistanı",
      pageSubtitle: "Kişisel taşınma asistanınız",
      newChat: "Yeni sohbet",
      emptyHistory: "Geçmiş boş",
      todayLabel: "Bugün",
      thisWeekLabel: "Bu hafta",
      olderLabel: "Daha önce",
      deleteChatAria: "Sohbeti sil",
      assistantName: "ReloAI asistanı",
      online: "Çevrimiçi",
      greetingHeading: "Nasıl yardımcı olabilirim?",
      greetingSubtitle: "Taşınma hakkında bir soru sorun — veya aşağıdaki örneklerden birini seçin.",
      defaultChatTitle: "Yeni sohbet",
      deleteModalTitle: "Bu sohbeti silmek istiyor musunuz?",
      deleteModalBody: "Bu işlem geri alınamaz. Yazışma kalıcı olarak silinecek.",
      deleteConfirm: "Sil",
      deleteCancel: "İptal",
    },
    demo: {
      bannerText: "Önizleme modundasınız. İlerlemenizi kaydetmek ve tüm özelliklere erişmek için kayıt olun.",
      registerNow: "Şimdi Kayıt Ol",
      floatingGreeting: "👋 ReloAI'yi keşfediyorsunuz — ilerlemenizi kaydetmek için ücretsiz kayıt olun",
      dismissAria: "Kapat",
      promptHeading: "Bu özelliğin kilidini açmak için kayıt olun",
      promptBody: "İlerlemenizi kaydetmek ve tüm özelliklerin kilidini açmak için ücretsiz bir hesap oluşturun.",
      promptDismiss: "Daha sonra",
    },
    onboarding: {
      stepLabel: "Adım {current} / {total}",
      back: "Geri",
      cancel: "İptal",
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
        goal: { question: "Ana hedefiniz nedir?", subheading: "Birden fazla seçebilirsiniz — bu, sizin için hangi yolları analiz edeceğimizi belirler." },
        jobOffer: { question: "Bir işveren teklifiniz var mı?", subheading: "Hangi belgelere ihtiyacınız olduğunu anlamamıza yardımcı olur." },
        universityAccepted: { question: "Bir üniversiteye kabul edildiniz mi?", subheading: "Planınızın nereden başlayacağını belirler." },
        studyLevel: { question: "Hangi programa kayıt oluyorsunuz?", subheading: "Yüksek lisans ve doktora için diploma denkliği gerekir." },
        businessType: { question: "Ne tür bir işletme açmayı planlıyorsunuz?", subheading: "Kayıt için gereken belgeleri belirler." },
        familyMemberType: { question: "Polonya'da şu anda kim var?", subheading: "Aile birleşimi ikamet kartı türünü belirler." },
        hasChildren: { question: "Çocuklarınız sizinle mi taşınıyor?", subheading: "Gerekirse okul/anaokulu belgelerini göstereceğiz." },
        foreignEmployer: { question: "Zaten yabancı bir işvereniniz veya müşterileriniz var mı?", subheading: "Size uygun ikamet kartı türünü etkiler." },
        registerIp: { question: "Polonya'da şahıs şirketi kaydı yaptırmayı düşünüyor musunuz?", subheading: "NIP, ZUS ve işletme kaydına ihtiyacınız olup olmadığını belirler." },
        timeline: { question: "Ne zaman taşınmayı planlıyorsunuz?", subheading: "Planınızda önceliklendirme yapmamıza yardımcı olur." },
        hasCar: { question: "Polonya'ya getireceğiniz bir arabanız var mı?", subheading: "Varsa, ehliyet değişimi, araç tescili ve sigortayı ekleyeceğiz." },
      },
      goalOptions: {
        work: "İş",
        workDesc: "Teklifim var ya da iş arıyorum",
        study: "Eğitim",
        studyDesc: "Üniversite veya kolej",
        business: "İş kurma",
        businessDesc: "Şahıs şirketi veya limited şirket açmak",
        family: "Aile",
        familyDesc: "Eş/ebeveyn/çocuk zaten Polonya'da",
        remote: "Uzaktan çalışma",
        remoteDesc: "Yabancı bir işveren için çalışıyorum veya serbest çalışıyorum",
        savings: "Kendi birikimiyle taşınma",
        savingsDesc: "İşsiz, birikimle taşınma",
        other: "Diğer",
      },
      jobOfferOptions: {
        yes: "Evet — Polonyalı bir şirketten davetim var",
        no: "Hayır — kendim iş arıyorum",
      },
      universityAcceptedOptions: {
        yes: "Evet — kayıt onayım var",
        no: "Hayır — henüz kabul edilmedim",
      },
      studyLevelOptions: { bachelor: "Lisans", master: "Yüksek Lisans", phd: "Doktora" },
      businessTypeOptions: {
        jdg: "Şahıs şirketi (JDG) — serbest çalışma",
        spzoo: "Limited şirket (Sp. z o.o.)",
        undecided: "Henüz karar vermedim",
      },
      familyMemberTypeOptions: {
        spouse: "Eş / partner",
        parent: "Ebeveyn",
        child: "Çocuk",
        multiple: "Birden fazla aile üyesi",
      },
      hasChildrenOptions: { yes: "Evet", no: "Hayır" },
      foreignEmployerOptions: {
        yes: "Evet — yabancı bir şirkette çalışıyorum",
        no: "Hayır — serbest çalışanım, müşteri arıyorum",
      },
      registerIpOptions: {
        yes: "Evet — resmi olarak çalışmak istiyorum",
        no: "Hayır — şimdilik planlamıyorum",
      },
      timelineOptions: {
        already: "Zaten Polonya'dayım",
        month1: "1 ay içinde",
        months3: "3 ay içinde",
        months6: "6 ay içinde",
        year1: "Bir yıl içinde",
        exploring: "Sadece seçenekleri araştırıyorum",
      },
      hasCarOptions: {
        yes: "Evet — kendi arabamı getiriyorum",
        no: "Hayır — arabam yok",
      },
      results: {
        heading: "Sizin için 3 taşınma yolu bulduk!",
        loading: "Kişiselleştirilmiş yollarınız oluşturuluyor...",
        selectButton: "Bu yolu seçin",
        selecting: "Seçiliyor…",
        currentRoute: "Mevcut yol",
        recommended: "Önerilen",
        speedFast: "Yüksek hız",
        speedMedium: "Orta hız",
        speedSlow: "Düşük hız",
        difficultyEasy: "Düşük zorluk",
        difficultyMedium: "Orta zorluk",
        difficultyHard: "Yüksek zorluk",
        approvalRate: "Onay oranı",
        timeline: "Zaman dilimi",
        cost: "Maliyet",
        steps: "Adımlar",
        bestFor: "Kimler için uygun",
        selectError: "Seçilen rota kaydedilemedi. Lütfen tekrar deneyin.",
        incompleteHeading: "Önce anketi tamamlayın — yollarınızı oluşturmak için uyruk ve hedef bilgisi gerekiyor.",
        incompleteCta: "Ankete devam et",
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
      faq: "Саволҳо",
      login: "Воридшавӣ",
      getStarted: "Сар кардан",
      goToDashboard: "Нақшаи ман →",
    },
    common: {
      cancelBtn: "Бекор кардан",
      logoutBtn: "Баромадан",
      logoutConfirmTitle: "Аз ҳисоб мебароед?",
      logoutConfirmBody: "Оё мутмаин ҳастед, ки мехоҳед бароед?",
      cityLabel: "Шаҳр",
      chosenByCountTemplate: "Тавассути ReloAI аллакай {n}+ нафар интихоб кардаанд",
    },
    hero: {
      badge: "Роҳнамои сунъии аз ҷониби AI барои кӯчиш",
      headline1: "Кӯчидан ба Аврупо",
      headline2: "— ин содда аст.",
      subtext:
        "ReloAI раводид, коғазҳо, манзил ва корҳои бонкии шуморо қадам ба қадам, бо забони сода ба нақша мегирад. Саволеро бипурсед ва дар якчанд сония нақшаи шахсии худро гиред.",
      getStarted: "Сар кардан",
      seeHowItWorks: "Чӣ тавр кор карданашро бинед",
      trustCountries: "3 кишвар",
      trustLanguages: "6 забон",
      trustFree: "Оғози ройгон",
      trustSocialProof: "Зиёда аз 1000 нафар аллакай бо ёрии ReloAI бомуваффақият кӯчиданд",
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
      docQuestion: "Пас, дар навбати аввал кадом ҳуҷҷатҳо лозиманд?",
      docResponse: "Инак 2 ҳуҷҷате, ки бо онҳо оғоз кардан лозим аст:",
      inputPlaceholder: "Дар бораи зиндагӣ дар Полша бипурсед...",
      docCardPassportTitle: "Скани шиноснома",
      docCardPassportSubtitle: "Барои қариб ҳамаи қадамҳо лозим аст",
      docCardInsuranceTitle: "Суғуртаи тиббӣ",
      docCardInsuranceSubtitle: "Барои иҷозати истиқомат лозим аст",
      docStatusDone: "Тасдиқшуда",
      docStatusPending: "Дар баррасӣ",
    },
    stats: {
      items: [
        { value: "3", label: "Кишвар" },
        { value: "100x", label: "Арзонтар" },
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
          flag: "pl",
          name: "Лаҳистон",
          highlight: "Маркази технологии зуд рушдкунанда",
          points: [
            "Шарҳи иҷозатномаи истиқомати Karta Pobytu",
            "Бақайдгирии PESEL ва бонки маҳаллӣ",
            "Роҳнамои миёнаи ҳаққи иҷора аз рӯи шаҳрҳо",
          ],
        },
        {
          flag: "de",
          name: "Олмон",
          highlight: "EU Blue Card ва раводидҳои ҷустуҷӯи кор",
          points: [
            "Анмелдунг ва вомбардҳои Bürgeramt",
            "Суғуртаи тиббӣ (давлатӣ ё хусусӣ)",
            "Рақами андоз ва дастгирии раводиди фрилансер",
          ],
        },
        {
          flag: "es",
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
    directions: {
      label: "ҶАБҲАҲО",
      heading: "Ба куҷо кӯч мебандед?",
      subheading: "Нақшаи шахсӣ барои кишвари шумо — дар сонияҳо.",
      comingSoonBadge: "Ба зудӣ дастрас мешавад",
      ctaLabel: "Сар кардан",
      comingSoonCta: "Ба зудӣ",
      cards: [
        { name: "Лаҳистон", subtitle: "Аврупои устувор барои оғоз" },
        { name: "Олмон", subtitle: "Blue Card ва карераи IT" },
        { name: "Испания", subtitle: "Баҳр, офтоб ва Digital Nomad" },
      ],
    },
    pricing: {
      heading: "Нархҳо",
      subheading: "Ройгон сар кунед.",
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
      heading: "Шарҳҳо",
      subheading: "Одамони воқеӣ. Кӯчидани воқеӣ.",
      items: [
        {
          name: "Анна К.",
          route: "Украина → Полша",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "PESEL-ро дар 2 рӯз гирифтам. Бе ReloAI як ҳафта барои ҷустуҷӯи маълумот сарф мекардам.",
          initials: "АК",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Михаил С.",
          route: "Русия → Олмон",
          fromFlag: "ru",
          toFlag: "de",
          rating: 5,
          quote: "AI ба фаҳмидани Anmeldung кӯмак кард. Ҳама чизро фаҳмонд ва суроғаи идораҳоро дод.",
          initials: "МС",
          documentBadge: { country: "de", label: "Anmeldung" },
        },
        {
          name: "Ольга М.",
          route: "Белоруссия → Испания",
          fromFlag: "by",
          toFlag: "es",
          rating: 5,
          quote: "Дар Испания бизнес кушодам. Рӯйхат як моҳ вақт ва 2000 евро ҳаққи ҳуқуқшиносро сарфа кард.",
          initials: "ОМ",
          documentBadge: { country: "es", label: "Alta de Autónomo" },
        },
        {
          name: "Дмитрий П.",
          route: "Қазоқистон → Полша",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 4,
          quote: "Пайгирии пешравӣ хеле кӯмак мекунад. Ҳамеша медонам, ки дар кадом қадам ҳастам.",
          initials: "ДП",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Лейла Р.",
          route: "Ӯзбекистон → Олмон",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Тавассути бахши ҷойҳои корӣ дар Олмон кор ёфтам. AI ҳатто мактуби ҳамроҳиро навишт.",
          initials: "ЛР",
          documentBadge: { country: "de", label: "Anschreiben" },
        },
        {
          name: "Тимур А.",
          route: "Тоҷикистон → Испания",
          fromFlag: "tj",
          toFlag: "es",
          rating: 5,
          quote: "NIE-ро дар 3 ҳафта гирифтам. Пештар фикр мекардам, ки ним сол вақт мегирад.",
          initials: "ТА",
          documentBadge: { country: "es", label: "NIE" },
        },
        {
          name: "Карина Н.",
          route: "Украина → Олмон",
          fromFlag: "ua",
          toFlag: "de",
          rating: 5,
          quote: "Бо оила кӯчидам. Барои кӯдакон мактаб ва духтури русзабонро ёфтем.",
          initials: "КН",
          documentBadge: { country: "de", label: "Familiennachzug" },
        },
        {
          name: "Артём В.",
          route: "Русия → Испания",
          fromFlag: "ru",
          toFlag: "es",
          rating: 4,
          quote: "Digital Nomad Visa — тибқи дастури ReloAI дар 6 ҳафта расмӣ кардам.",
          initials: "АВ",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Зарина И.",
          route: "Қазоқистон → Полша",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Дар mBank аз бори аввал ҳисоб кушодам. AI гуфт, ки кадом ҳуҷҷатҳоро гирам.",
          initials: "ЗИ",
          documentBadge: { country: "pl", label: "mBank" },
        },
        {
          name: "Богдан Ф.",
          route: "Украина → Полша",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Беҳтарин хидмат барои кӯчидан. Вақт ва асабамро сарфа кард.",
          initials: "БФ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Алексей К.",
          route: "Қазоқистон → Полша",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "PESEL-ро дар 3 рӯз гирифтам, AI ҳамаи ҳуҷҷатҳоро пешакӣ гуфт.",
          initials: "АК",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Нилуфар Р.",
          route: "Ӯзбекистон → Полша",
          fromFlag: "uz",
          toFlag: "pl",
          rating: 5,
          quote: "Бо кӯмаки ReloAI дар Варшава дар як ҳафта хона ёфтам.",
          initials: "НР",
          documentBadge: { country: "pl", label: "Wynajem mieszkania" },
        },
        {
          name: "Дмитрий В.",
          route: "Белоруссия → Олмон",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Blue Card-ро бе ҳуқуқшинос гирифтам, 2000 евро сарфа кардам.",
          initials: "ДВ",
          documentBadge: { country: "de", label: "Blue Card" },
        },
        {
          name: "Малика С.",
          route: "Тоҷикистон → Полша",
          fromFlag: "tj",
          toFlag: "pl",
          rating: 5,
          quote: "Дар PKO BP аз бори аввал ҳисоб кушодам, AI рӯйхати ҳуҷҷатҳоро омода кард.",
          initials: "МС",
          documentBadge: { country: "pl", label: "PKO BP" },
        },
        {
          name: "Анна П.",
          route: "Украина → Испания",
          fromFlag: "ua",
          toFlag: "es",
          rating: 5,
          quote: "Digital Nomad Visa — ҳама қадам ба қадам, дар як моҳ расмӣ кардам.",
          initials: "АП",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Азиз Т.",
          route: "Ӯзбекистон → Олмон",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Ба донишгоҳи Мюнхен дохил шудам — AI дар ҷамъоварии ҳуҷҷатҳо барои визаи донишҷӯӣ кӯмак кард.",
          initials: "АТ",
          documentBadge: { country: "de", label: "Studentenvisum" },
        },
        {
          name: "Светлана И.",
          route: "Русия → Полша",
          fromFlag: "ru",
          toFlag: "pl",
          rating: 5,
          quote: "Бо шавҳар ва фарзандон кӯчидам, дар ду ҳафта боғча ва мактаб ёфтем.",
          initials: "СИ",
          documentBadge: { country: "pl", label: "Przedszkole i szkoła" },
        },
        {
          name: "Роман К.",
          route: "Белоруссия → Олмон",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Дар Берлин соҳибкории инфиродӣ кушодам, рӯйхат бо ҳамаи справкаҳо кӯмак кард.",
          initials: "РК",
          documentBadge: { country: "de", label: "Gewerbeanmeldung" },
        },
        {
          name: "Динара Ж.",
          route: "Қазоқистон → Полша",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Ба Донишгоҳи Варшава дохил шудам ва корти иқомати донишҷӯиро бе мушкилот гирифтам.",
          initials: "ДЖ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Юлия Н.",
          route: "Украина → Испания",
          fromFlag: "ua",
          toFlag: "es",
          rating: 4,
          quote: "Кори дурдастӣ ёфтам ва NIE-ро дар як моҳ гирифтам, ҳама тибқи дастур.",
          initials: "ЮН",
          documentBadge: { country: "es", label: "NIE" },
        },
      ],
    },
    faq: {
      heading: "Саволҳои маъмул",
      subheading: "Ҳама чизе, ки пеш аз оғози кӯчиш бояд донед.",
      items: [
        {
          question: "ReloAI чист ва он чӣ гуна кор мекунад?",
          answer: "ReloAI платформаи AI аст, ки ба одамон дар кӯчидан ба Аврупо кӯмак мекунад. Шумо ба якчанд савол дар бораи худатон ҷавоб медиҳед — аз куҷо ҳастед, ба куҷо кӯчидан мехоҳед ва бо кадом мақсад. Дар асоси ҷавобҳои шумо ReloAI ба таври худкор нақшаи шахсии кӯчишро бо рӯйхати пурраи ҳуҷҷатҳо, мӯҳлатҳо ва дастурҳои қадам ба қадам месозад. Ҳама чиз дар як ҷо — ҳуҷҷатҳо, манзил, бонкҳо, тиб, кор, таҳсилот, суғурта ва бисёр чизҳои дигар, инчунин ёрдамчии AI, ки ба ҳар саволе 24/7 ҷавоб медиҳад.",
        },
        {
          question: "ReloAI аз ҳуқуқшиноси муҳоҷират чӣ фарқ дорад?",
          answer: "Ҳуқуқшинос аз 500 то 3000 евро арзиш дорад ва танҳо дар соатҳои корӣ кор мекунад. ReloAI 24/7 дастрас аст, якчанд маротиба арзонтар аст ва маълумоти ҳамон қадар дақиқро оид ба ҳуҷҷатҳо ва расмиёт медиҳад.",
        },
        {
          question: "Бо ReloAI ба кадом кишварҳо кӯчидан мумкин аст?",
          answer: "Ҳозир Полша дастрас аст — яке аз самтҳои маъмултарин барои кӯчиш аз кишварҳои ИДМ. Ба наздикӣ Олмон ва Испанияро илова мекунем. Бо ҳамаи кишварҳои дастрас барои кӯчиш метавонед дар вебсайти мо муфассалтар шинос шавед. ReloAI кӯчишро аз зиёда аз 40 кишвар дастгирӣ мекунад — Украина, Белоруссия, Русия, Ӯзбекистон, Тоҷикистон, Қазоқистон, Туркия, Молдова ва бисёр дигарон.",
        },
        {
          question: "Барои кӯчиш кадом ҳуҷҷатҳо лозиманд ва ReloAI дар ҷамъ кардани онҳо чӣ гуна кӯмак мекунад?",
          answer: "Рӯйхати ҳуҷҷатҳо аз шаҳрвандӣ ва мақсади кӯчиши шумо вобаста аст. Пас аз гузаштани онбординг ReloAI ба таври худкор танҳо ҳуҷҷатҳоеро нишон медиҳад, ки маҳз ба шумо лозиманд — бе маълумоти изофӣ. Оид ба ҳар як ҳуҷҷат ReloAI маълумоти пурра медиҳад — суроғаҳои дақиқи муассисаҳо дар ҳамаи шаҳрҳои калон, соатҳои кории мубрам, рӯйхати пурраи ҳуҷҷатҳое ки бояд бо худ бурд, арзиши ҳамаи боҷ ва пардохтҳо, мӯҳлатҳои воқеии интизорӣ, дастури қадам ба қадам ва таҳлили хатогиҳои маъмултарин. Ҳеҷ чизи барзиёд — танҳо он чизе ки воқеан ба шумо лозим аст.",
        },
        {
          question: "AI нақшаи кӯчиши маро чӣ гуна месозад?",
          answer: "Шумо дар онбординг ба 5 савол ҷавоб медиҳед — шаҳрвандӣ, кишвари мақсад, мақсади кӯчиш, мавҷудияти пешниҳоди корӣ ва мӯҳлатҳо. Дар асоси ин маълумот ReloAI ҳуҷҷатҳои лозимаро аз пойгоҳи додаҳо интихоб мекунад ва нақшаи қадам ба қадамро бо мӯҳлатҳои воқеӣ месозад. Масалан, шаҳрванди Ӯзбекистон ки барои кор ба Полша меравад, чунин нақшаро мегирад: Раводиди D → Қайди суроға → PESEL → Ҳисоби бонкӣ → Иҷозати кор → Корти истиқомат.",
        },
        {
          question: "Кӯчиш аз рӯи нақшаи ReloAI чӣ қадар вақт мегирад?",
          answer: "Ин ба вазъияти шумо вобаста аст. Ба таври миёна: кишварҳои бе раводид (Украина, Молдова) — аз 1 то 3 моҳ то легализатсияи пурра. Кишварҳое ки раводид талаб мекунанд (Ӯзбекистон, Қазоқистон ва дигарон) — аз 3 то 6 моҳ бо назардошти гирифтани раводиди D. ReloAI мӯҳлатҳои воқеиро барои ҳар як ҳуҷҷат нишон медиҳад, то шумо пешакӣ нақша кашед.",
        },
        {
          question: "Оё ин пулакист? Чанд арзиш дорад?",
          answer: "ReloAI нақшаи ройгон бо дастрасии асосӣ ба як кишвар ва 5 паёми AI дар як рӯз дорад. Барои дастрасии пурра ду тарифи пулакӣ мавҷуд аст: Premium — 29€ дар моҳ: ҳамаи кишварҳо, 50 паёми AI дар як рӯз, боркунии ҳуҷҷатҳо, пойгоҳи пурраи суроғаҳо. Pro — 49€ дар моҳ: ҳама чизи Premium плюс чати беохири AI, пуркунии худкори ҳуҷҷатҳо, дастгирии афзалиятнок.",
        },
        {
          question: "Хидмат бо кадом забонҳо кор мекунад?",
          answer: "ReloAI бо 6 забон кор мекунад: русӣ, англисӣ, ӯзбекӣ, туркӣ, тоҷикӣ ва украинӣ. Шумо метавонед забонро ҳангоми бақайдгирӣ интихоб кунед ё дар лаҳзаи дилхоҳ дар танзимот тағир диҳед.",
        },
        {
          question: "Оё обунаро дар лаҳзаи дилхоҳ бекор кардан мумкин аст?",
          answer: "Бале. Обунаро дар лаҳзаи дилхоҳ дар бахши «Профил» бекор кардан мумкин аст — бе ҷарима ва шартҳои пинҳонӣ. Пас аз бекор кардан шумо то охири давраи пардохтшуда дастрасиро нигоҳ медоред, сипас ҳисоб ба нақшаи ройгон мегузарад. Ҳамаи маълумот ва ҳуҷҷатҳои шумо нигоҳ дошта мешаванд.",
        },
        {
          question: "ReloAI маълумоти шахсии маро чӣ гуна ҳифз мекунад?",
          answer: "Ҳамаи маълумот дар серверҳои бехатари рамзгузоришуда нигоҳ дошта мешавад. Мо маълумоти шуморо ба шахсони сеюм намедиҳем. Ҳуҷҷатҳое ки шумо бор мекунед, танҳо ба шумо дастрасанд. ReloAI ба талаботи GDPR — қонуни аврупоии ҳифзи маълумоти шахсӣ — ҷавобгӯ аст.",
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
      backToLanding: "Ба сайт",
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
        confirmPasswordLabel: "Пароли худро тасдиқ кунед",
        passwordMismatch: "Паролҳо мувофиқат намекунанд",
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
      subtitle: "Дурнамои пурраи кӯчиши шумо.",
      logOut: "Баромадан",
      planLabel: "Нақша",
      upgradeTooltip: "Нақшаро беҳтар кунед",
      upgradeBadge: "⚡ Ба Premium гузаред",
      upgradeToProBadge: "⚡ Ба Pro гузаред",
      maxPlanBadge: "✓ Нақшаи максималӣ",
      unnamed: "Номи нест",
      memberSinceLabel: "Аз санаи бақайдгирӣ",
      personalSection: "Маълумоти шахсӣ",
      relocationSection: "Профили кӯчиш",
      destinationLabel: "Кӯчиш ба",
      routeLabel: "Роҳи интихобшудаи қонунигардонӣ",
      noRouteSelected: "Роҳ ҳанӯз интихоб нашудааст",
      chooseRoute: "Роҳро интихоб кунед",
      routeModalSubheading: "Яке аз вариантҳои поёнро интихоб кунед — шумо метавонед онро дар вақти дилхоҳ иваз кунед.",
      jobOfferLabel: "Пешниҳоди кор дорад",
      alreadyAdmittedLabel: "Аллакай қабул шудааст",
      yes: "Ҳа",
      no: "Не",
      notSet: "Муайян нашудааст",
      progressSection: "Дурнамои пешравӣ",
      currentStepLabel: "Қадами ҷорӣ",
      stepsCompletedLabel: "{completed} аз {total} қадам иҷро шуд",
      allStepsDone: "Ҳамаи қадамҳо иҷро шуданд!",
      documentsSection: "Ҳолати ҳуҷҷатҳо",
      viewAllDocuments: "Ҳамаи ҳуҷҷатҳо",
      editBtn: "Тағир додани маълумоти кӯчиш",
      changeRouteBtn: "Тағир додани нақшаи кӯчиш",
      editModalTitle: "Тағир додани маълумоти кӯчиш",
      cityLabel: "Шаҳр",
      cityPlaceholder: "масалан, Варшава",
      saveBtn: "Тағиротро захира кунед",
      saved: "Захира шуд",
    },
    topbar: {
      searchPlaceholder: "Ҷустуҷӯи ҳуҷҷатҳо, вазифаҳо...",
      upgrade: "Беҳтар кардан",
      openMenuAria: "Кушодани меню",
      avatarAria: "Гузариш ба профил",
    },
    notifications: {
      bellAria: "Кушодани огоҳиномаҳо",
      title: "Огоҳиномаҳо",
      markAllRead: "Ҳамаро хондашуда қайд кунед",
      empty: "Ҳанӯз огоҳиномае нест",
      registrationTitle: "Барои бақайдгирӣ ташаккур! 🎉",
      registrationMessage: "Табрик мегӯем, шумо бомуваффақият дар ReloAI бақайд гирифта шудед.",
      welcomeTitle: "Анкета пур карда шуд! 🎉",
      welcomeMessage: "Шумо маълумоти анкетаро бомуваффақият пур кардед ва нақшаи муҳоҷиратро интихоб кардед ({route}). Шумо метавонед ин маълумотро дар ҳар лаҳза дар танзимоти профил тағйир диҳед.",
      checklistTitle: "Харитаи роҳ навсозӣ шуд ✅",
      checklistMessage: "Шумо нақшаи муҳоҷиратро ({route}) аз нав сохтед. Пешрафт аз рӯи харитаи нави роҳ аз нав оғоз мешавад — маълумоти пешинаи анкетаро дар танзимоти профил дидан ва тағйир додан мумкин аст.",
      inactivityTitle: "Дар бораи нақшаи муҳоҷирати худ фаромӯш накунед",
      inactivityMessage: "Барои идома додан аз ҷое, ки монда будед, баргардед.",
      documentTitle: "Ҳуҷҷат бор карда шуд ва барои санҷиш фиристода шуд",
      documentMessage: "Ба зудӣ баъд аз санҷиш ба шумо хабар медиҳем.",
    },
    sidebar: {
      documents: "Ҳуҷҷатҳо",
      housing: "Манзил",
      banks: "Бонкҳо",
      medicine: "Тибб",
      insurance: "Суғурта",
      work: "Кор",
      community: "Ҷамъият",
      education: "Таҳсил",
      otherServices: "Дигар хизматҳо",
      profile: "Профил",
      settings: "Танзимот",
      logout: "Баромадан",
    },
    settings: {
      title: "Танзимот",
      subtitle: "Намуд ва рафтори ReloAI-ро идора кунед.",
      languageSection: "Забон",
      languageDesc: "ReloAI бо шумо ба ин забон гап мезанад.",
      currencySection: "Асъор",
      currencyDesc: "Дар кадом асъор нархҳо дар сайт нишон дода шаванд (қурб нисбат ба злотӣ ба таври худкор навсозӣ мешавад).",
      saving: "(захира мешавад…)",
      themeSection: "Намуди зоҳирӣ",
      themeDesc: "Интихоб кунед, ки ReloAI дар дастгоҳи шумо чӣ гуна намоён шавад.",
      themeDark: "Торик",
      themeLight: "Равшан",
      notifications: "Огоҳиномаҳо",
      notifEmail: "Навсозиҳои Email",
      notifEmailDesc: "Гоҳо хабарҳои маҳсулот ва маслиҳатҳо.",
      notifDocuments: "Ёдоварии ҳуҷҷатҳо",
      notifDocumentsDesc: "Огоҳиҳо пеш аз мӯҳлат.",
      notifProduct: "Хабарҳои маҳсулот",
      notifProductDesc: "Хусусиятҳои нав ва навсозиҳо.",
      accountSection: "Ҳисоб",
      nameLabel: "Ном",
      emailLabel: "Email",
      saveBtn: "Тағиротро захира кунед",
      saved: "Захира шуд",
      dangerSection: "Минтақаи хатарнок",
      dangerDesc: "Нест кардани ҳисоб тамоми маълумоти шуморо мебарад. Ин амалро баргардонидан мумкин нест.",
      deleteAccountBtn: "Ҳисобро нест кунед",
      deleteConfirmTitle: "Ҳисобатонро нест мекунед?",
      deleteConfirmBody: "Профил ва маълумоти шумо пурра нест карда мешавад. Ин амалро баргардонидан мумкин нест.",
      deleteConfirmBtn: "Ҳисобро нест кунед",
    },
    documents: {
      title: "Ҳуҷҷатҳо",
      subtitle: "Ҳуҷҷатҳое, ки маҳз ба шумо лозиманд, дар як ҷо.",
      tabs: {
        all: "Ҳама",
        passport: "Шиноснома",
        pesel: "PESEL",
        workPermit: "Иҷозати кор",
        insurance: "Бима",
        bank: "Бонк",
        biometric: "Биометрия",
        address: "Суроға",
        residencePermit: "Корти иқомат",
        taxId: "NIP",
        employment: "Шуғл",
        business: "Бизнес",
      },
      status: { verified: "Тасдиқшуда", pending: "Дар баррасӣ", missing: "Мавҷуд нест", locked: "Премиум" },
      upload: "Барои боркунӣ кашида гузоред ё зер кунед",
      uploadBtn: "Бор кардан",
      addDocumentBtn: "Ҳуҷҷат бор кардан",
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
        biometricConfirmation: "Тасдиқи биометрия",
        addressConfirmation: "Тасдиқи бақайдгирии суроға",
        residencePermitScan: "Скани корти иқомат",
        taxIdConfirmation: "Тасдиқи NIP",
        employmentContract: "Шартномаи меҳнатӣ",
        businessRegistrationConfirmation: "Тасдиқи бақайдгирии бизнес",
      },
      docHints: {
        passportScan: "Барои аксари расмиёти расмӣ лозим аст",
        passportPhoto: "Барои аризаи Karta Pobytu лозим аст",
        peselForm: "Қадами аввал барои гирифтани рақами PESEL",
        peselLetter: "Додашудани рақами PESEL-и шуморо тасдиқ мекунад",
        workPermitApp: "Барои кор кардани қонунӣ лозим аст",
        sponsorshipLetter: "Кор кардани шуморо назди корфармои сарпараст тасдиқ мекунад",
        healthInsurance: "Барои иҷозати истиқомат лозим аст",
        travelInsurance: "То фарогирии NFZ лозим аст",
        bankConfirmation: "Барои кушодани ҳисоби бонкӣ лозим аст",
        proofOfFunds: "Мавҷудияти маблағи кофӣ барои зиндагиро тасдиқ мекунад",
        relocationLetter: "Бо Премиум дастрас аст",
        taxResidency: "Бо Премиум дастрас аст",
        biometricConfirmation: "Пас аз супоридани биометрия дар Urząd do Spraw Cudzoziemców бор кунед",
        addressConfirmation: "Zaświadczenie дар бораи бақайдгирии суроға (zameldowanie)",
        residencePermitScan: "Скани корти иқомати гирифташуда (karta pobytu)",
        taxIdConfirmation: "Тасдиқи додашудани NIP аз идораи андоз",
        employmentContract: "Шартномаи меҳнатии имзошуда (umowa o pracę)",
        businessRegistrationConfirmation: "Тасдиқи бақайдгирии CEIDG",
      },
      uploadGuides: {
        passportScan:
          "Саҳифаи шиноснома бо акс ва маълумоти шахсиро аксбардорӣ кунед, инчунин саҳифаи виза ё муҳри истиқомат, агар мавҷуд бошад. Акс бояд возеҳ, бе дурахшиш ва бе буридани канорҳо бошад.",
        passportPhoto: "Акси ҳуҷҷатиро бор кунед: рӯирост, бе сарпӯш, дар заминаи якранги равшан, мувофиқи талаботи биометрӣ.",
        peselForm: "Анкетаи пуркардашуда ва имзошудаи дархости рақами PESEL-ро бор кунед.",
        peselLetter: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        workPermitApp: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        sponsorshipLetter: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        healthInsurance: "Полиси суғуртаи тиббиро бор кунед — мӯҳлати амал ва рақами полис бояд намоён бошанд.",
        travelInsurance: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        bankConfirmation: "Маълумотнома ё выпискаи бонкиро бо рақами ҳисоб ва маълумоти соҳиб бор кунед.",
        proofOfFunds: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        relocationLetter: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        taxResidency: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        biometricConfirmation: "Тасдиқ ё квитансияи навбати супоридани маълумоти биометриро бор кунед.",
        addressConfirmation: "Шартномаи иҷора ё тасдиқи қайди суроға (zameldowanie)-ро бо суроғаи возеҳ намоён бор кунед.",
        residencePermitScan: "Корти иқоматро аз ду тараф аксбардорӣ кунед — рӯй бо акс, пушт бо маълумот.",
        taxIdConfirmation: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        employmentContract: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
        businessRegistrationConfirmation: "Акс ё сканери возеҳи ҳуҷҷатро гиред — ҳамаи маълумот бояд возеҳ намоён бошад.",
      },
      progressSummary: "Иҷро шуд: {completed} аз {total} ҳуҷҷат",
      autoCompleteToast: "✓ Қадам ба таври худкор иҷро шуд",
      sectionCompleteHeading: "🎉 Бахш ба анҷом расид!",
      sectionCompleteBody: "Ба қадами навбатӣ гузаред.",
      sectionCompleteDismiss: "Идома",
      deleteConfirmTitle: "Ҳуҷҷат нест карда шавад?",
      deleteConfirmBody: "Ин амалро бекор кардан мумкин нест. Ҳуҷҷат абадӣ нест карда мешавад.",
      cancelBtn: "Бекор кардан",
      uploadModal: {
        dropzoneLabel: "Файл интихоб кунед",
        dropzoneHint: "PDF, JPG ё PNG",
        confirmBtn: "Бор кардан",
      },
    },
    housing: {
      title: "Манзил дар Полша",
      subtitle: "Ҷои зист бо роҳи оқилона ёфта гиред.",
      rentMarket: "🏆 4 ноҳияи беҳтарин аз рӯи нисбати нарх ва сифат",
      rentMarketSub: "Мутахассисони мо ва ҳазорон муҳоҷир ин ноҳияҳоро аз рӯи нарх, роҳат ва инфрасохтор беҳтарин барои зиндагӣ интихоб карданд.",
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
        mokotow: "Беҳтарин мувозинати нарх ва сифат. Ором, сербарг, метро дорад.",
        wola: "Ноҳияи муосир, бисёр биноҳои нав, наздик ба марказ.",
        zoliborz: "Форам, бехатар, дар байни муҳоҷирон маҳбуб.",
        ochota: "Ноҳияи ороми наздики марказ, инфрасохтори хуб, метро дорад, дар байни донишҷӯён ва муҳоҷирон маъмул.",
      },
      bestValueBadge: "Тавсия медиҳем",
      expatsChoiceBadge: "Интихоби муҳоҷирон",
      showAllDistricts: "Ҳамаи {count} ноҳияи шаҳри {city}-ро нишон диҳед →",
      showFewerDistricts: "Рӯйхатро кӯтоҳ кунед",
      roomsLabel: "Хонаҳо",
      roomsAny: "Фарқ надорад",
      roomsStudio: "Студия",
      rooms2: "2 хона",
      rooms3: "3 хона",
      noDistrictsText: "Барои {city} маълумот дар бораи ноҳияҳо нест.",
      searchWithFiltersBtn: "Бо ин филтрҳо ҷустуҷӯ кардан →",
      guides: {
        olx: {
          heading: "Чӣ тавр дар OLX манзил ҷустуҷӯ кунем",
          steps: [
            "Ба бахши «Амволи ғайриманқул» → «Иҷора» гузаред ва филтрҳоро аз рӯи шаҳр, нарх ва шумораи хонаҳо танзим кунед.",
            "Эълонҳоро нигоҳ доред ва барои пешниҳодҳои нав мувофиқи меъёрҳои худ огоҳиномаҳоро фаъол кунед.",
            "Ба фурӯшанда тавассути чати дохилӣ нависед — то дидани квартира шахсан ҳеҷ гоҳ пул интиқол надиҳед.",
            "Дидорбинӣ гузаронед ва пеш аз имзо кардани шартнома вазъият ва ҳуҷҷатҳои квартираро тафтиш кунед.",
          ],
          aiQuestion: "Чӣ тавр дар OLX манзил ҷустуҷӯ кунам?",
        },
        otodom: {
          heading: "Чӣ тавр дар Otodom манзил ҷустуҷӯ кунем",
          steps: [
            "Барои маҳдуд кардани ҷустуҷӯ аз филтрҳои пешрафтаи Otodom истифода баред — метро, ошёна, мавҷудияти мебел.",
            "Ба нишонаи «аз соҳиб» диққат диҳед — ин аксар вақт маънои набудани комиссияи агентиро дорад.",
            "Бо эълонкунанда тавассути сомона тамос гиред ва санаи дидорбиниро аниқ кунед.",
            "Пеш аз имзо кардани шартнома протоколи қабул-супоридани квартираро (protokół zdawczo-odbiorczy) талаб кунед.",
          ],
          aiQuestion: "Чӣ тавр дар Otodom манзил ҷустуҷӯ кунам?",
        },
        gratka: {
          heading: "Чӣ тавр дар Gratka манзил ҷустуҷӯ кунем",
          steps: [
            "Дар ҷустуҷӯи Gratka минтақа ва буҷаро муайян кунед — хидмат хусусан берун аз шаҳрҳои калон қавӣ аст.",
            "Санаи нашри эълонро тафтиш кунед — эълонҳои кӯҳна аксар вақт дигар мавҷуд нестанд.",
            "Барои аниқ кардани тафсилот бо фурӯшанда тавассути телефон ё формаи сомона тамос гиред.",
            "Пеш аз пардохти депозит ҳамеша шартномаи иҷораро талаб кунед ва ҳуқуқи моликиятро тафтиш кунед.",
          ],
          aiQuestion: "Чӣ тавр дар Gratka манзил ҷустуҷӯ кунам?",
        },
      },
    },
    banks: {
      title: "Бонкҳо дар Полша",
      subtitle: "Ҳисобҳои барои навкӯчидагон сохташударо муқоиса кунед.",
      openAccount: "Кушодани ҳисоб",
      bestForExpats: "Беҳтарин барои муҳоҷирон",
      features: {
        pkobp: ["Бузургтарин шабакаи филиалҳо дар Полша", "Барномаи мобилӣ ба забонҳои полякӣ ва англисӣ", "Имконоти ҳисоби ройгон барои донишҷӯён"],
        mbank: ["Барнома ва дастгирии пурра ба забони англисӣ", "Кушодани фаврии ҳисоб онлайн", "Бе рақами PESEL ҳам бе пардохт"],
        santander: ["Ҳисобҳои бисёрвалютавӣ", "Шабакаи бонкии ҷаҳонӣ", "Истифодаи ройгони корти дебетӣ дар хориҷа"],
        revolut: ["Барои оғоз PESEL лозим нест", "Ҳамёни бисёрвалютавӣ", "Беҳтарин барои бодиянишинони рақамӣ"],
      },
      guide: {
        heading: "Чӣ тавр дар Полша ҳисоби бонкӣ кушоем — қадам ба қадам",
        steps: [
          "🪪 PESEL гиред — бидуни он аксари бонкҳо ҳисоб намекушоянд",
          "📄 Ҳуҷҷатҳоро омода кунед — шиноснома, тасдиқи суроға (шартномаи иҷора), PESEL",
          "🏦 Бонкро интихоб кунед — бонкҳои онлайн (mBank, ING) барои хориҷиён осонтаранд",
          "📱 Онлайн ё шахсан кушоед — mBank ва Revolut пурра онлайн кушода мешаванд",
          "✅ Кортро фаъол кунед — дар давоми 5-7 рӯз бо почта меояд",
        ],
        tipsHeading: "💡 Маслиҳатҳо",
        tips: [
          "mBank ва ING — ба хориҷиён бештар мувофиқ",
          "Revolut бе PESEL дар 10 дақиқа кушода мешавад",
          "PKO BP ва Pekao ташрифи шахсиро талаб мекунанд",
          "Шартномаи иҷораро ҳамчун тасдиқи суроға бо худ гиред",
        ],
      },
      openAccountAt: "Чӣ тавр дар {bank} ҳисоб кушоем",
      guides: {
        pkobp: {
          heading: "Чӣ тавр дар PKO BP ҳисоб кушоем",
          steps: [
            "PESEL гиред — PKO BP, мисли аксари бонкҳои анъанавӣ, барои кушодани ҳисоб онро талаб мекунад.",
            "Ба филиали наздиктарин навишт шавед — PKO BP бузургтарин шабакаро дар Полша дорад, ёфтани филиал осон аст.",
            "Бо худ шиноснома, PESEL ва тасдиқи суроға (масалан, шартномаи иҷора) гиред.",
            "Шартномаро дар ҷо имзо кунед — корманд дар интихоби навъи мувофиқи ҳисоб ва расмиёти корт кӯмак мекунад.",
          ],
          aiQuestion: "Чӣ тавр дар PKO BP ҳисоб кушоям?",
        },
        mbank: {
          heading: "Чӣ тавр дар mBank ҳисоб кушоем",
          steps: [
            "Барномаи mBank-ро зеркашӣ кунед ё ба сомонаи он гузаред — тамоми раванд метавонад онлайн, бидуни ташрифи филиал гузаронида шавад.",
            "Аризаро пур кунед ва ҳувияти худро тавассути занги видеоӣ ё курьер бо тафтиши шиноснома тасдиқ кунед.",
            "Агар аллакай дошта бошед, рақами PESEL-ро нишон диҳед — ин раванди зудтарро таъмин мекунад, аммо барои оғоз ҳатмӣ нест.",
            "Тасдиқро интизор шавед — ҳисоб одатан дар давоми як рӯз кушода мешавад, барнома пурра ба забони англисӣ аст.",
          ],
          aiQuestion: "Чӣ тавр дар mBank ҳисоб кушоям?",
        },
        santander: {
          heading: "Чӣ тавр дар Santander ҳисоб кушоем",
          steps: [
            "Навъи ҳисобро интихоб кунед — Santander ҳисобҳои бисёрвалютавӣ пешниҳод мекунад, ки барои интиқолҳои байналмилалӣ қулай аст.",
            "Шиноснома, PESEL ва тасдиқи суроғаро омода кунед.",
            "Ба филиал навишт шавед ё, агар барои вазъияти шумо дастрас бошад, онлайн ариза диҳед.",
            "Кортро фаъол кунед ва бонкдории мобилиро танзим кунед — кортро дар хориҷа ройгон истифода бурдан мумкин аст.",
          ],
          aiQuestion: "Чӣ тавр дар Santander ҳисоб кушоям?",
        },
        revolut: {
          heading: "Чӣ тавр дар Revolut ҳисоб кушоем",
          steps: [
            "Барномаи Revolut-ро зеркашӣ кунед ва бо рақами телефони худ ба қайд гиред — ба филиал рафтан лозим нест.",
            "Ҳувияти худро тавассути селфи ва сканери шиноснома дар дохили барнома тасдиқ кунед.",
            "Барои кушодани ҳисоб PESEL талаб карда намешавад — ин бехатартарин роҳ барои онҳое, ки навакак омадаанд.",
            "Ҳисоби худро пур кунед ва аз ҳамёни бисёрвалютавӣ ва корт истифода баред.",
          ],
          aiQuestion: "Чӣ тавр дар Revolut ҳисоб кушоям?",
        },
      },
      howToOpenLabel: "Чӣ тавр ҳисоб кушоем?",
      emptyText: "Дар бораи бонкҳо ҳанӯз маълумот нест.",
      faqHeading: "Саволҳои маъмул дар бораи кушодани ҳисоб",
      faqCaption: "Клик ба савол якбора чатро бо ҷавоби омодаи AI мекушояд",
      faqQuestions: [
        "Чӣ тавр бе PESEL ҳисоб кушоям?",
        "Кадом ҳуҷҷатҳо лозиманд?",
        "Кушодан чанд рӯз вақт мегирад?",
        "Оё онлайн кушодан мумкин аст?",
      ],
    },
    medicine: {
      title: "Тибб дар Полша",
      subtitle: "Тезтар суғурта гиред ва духтур ёбед.",
      clinicsTitle: "Клиникаҳо",
      clinicsSub: "Гузинаҳо бо забонҳои англисӣ, русӣ ва украинӣ.",
      warsaw: "Варшава",
      languages: {
        ruUa: "Бо забонҳои русӣ ва украинӣ",
        en: "Бо забони англисӣ",
        ru: "Бо забони русӣ",
        ua: "Бо забони украинӣ",
      },
      bookBtn: "Навбат гирифтан",
      nfzTitle: "Чӣ тавр суғуртаи тиббии NFZ гирифта мешавад",
      nfzSteps: [
        "Бо шартномаи меҳнатӣ (umowa o pracę) кор кунед — корфармо шуморо ба таври худкор дар ZUS сабти ном мекунад",
        "Рақами PESEL гиред",
        "Суғуртаи худро дар сомонаи eWUŚ тасдиқ кунед (ewus.nfz.gov.pl)",
        "Ба ягон клиникаи давлатӣ ба назди духтур навишта шавед",
      ],
      nfzAiQuestion: "Чӣ тавр дар NFZ сабти ном шавам?",
      stepLabel: "Қадам",
      emergencyTitle: "Ёрии таъҷилӣ ва ҳолатҳои фавқулодда",
      emergencyNumber: "Рақами ёрии таъҷилӣ дар Полша: 112 ё 999",
      emergencyEr: "Наздиктарин шӯъбаи ёрии таъҷилӣ (SOR) бидуни навбат ва ройгон қабул мекунад",
      emergencyPharmacy: "Дорухонаи навбатдор:",
      usefulSitesTitle: "Сомонаҳои муфид",
      usefulSites: [
        { url: "znany-lekarz.pl", desc: "Навишта шудан ба назди духтур онлайн — духтурони русзабон мавҷуданд" },
        { url: "ewus.nfz.gov.pl", desc: "Санҷиши суғуртаи NFZ" },
        { url: "nfz.gov.pl", desc: "Сомонаи расмии NFZ" },
        { url: "aptekadyzurna.pl", desc: "Ёфтани дорухонаи навбатдор" },
      ],
      dentalTitle: "Дандонпизишкӣ",
      dentalNfz: "NFZ табобати асосиро фаро мегирад — пломба, кашидани дандон",
      dentalPrivate: "Дандонпизишкии хусусӣ: 150–400 PLN барои қабул",
      dentalChains: "Шабакаҳои тавсияшуда: Dental+, Medicover Stomatologia",
      aiPickHeading: "Интихоби клиника бо ёрии ЗҲ",
      aiPickSubtitle: "Мушкилии худ ё чӣ гуна духтур ё клиника лозим бударо тавсиф кунед — мо вариантҳои мувофиқро меёбем.",
      aiPickPlaceholder: "Масалан: дандон дард мекунад, дандонпизишки наздики марказ лозим аст",
      searchPlaceholder: "Ҷустуҷӯ аз рӯи ном ё ноҳия",
      allCategoriesLabel: "Ҳамаи категорияҳо",
      allDistrictsLabel: "Ҳамаи ноҳияҳо",
      clinicsCountTemplate: "{count} клиника",
      notFoundText: "Барои {city} чизе ёфт нашуд.",
      askAiQuestionTemplate: 'Дар бораи клиникаи "{name}" дар {city} бештар нақл кунед: оё интихоби он арзанда аст, чӣ бартарӣ ва камбудӣ дорад, ба чӣ бояд диққат дод?',
      learnMoreBtn: "Бештар",
    },
    insurance: {
      title: "Суғурта дар Полша",
      subtitle: "Суғуртаи тиббӣ, автомобилӣ ва дигар намудҳо",
      compareTitle: "Суғуртаи давлатӣ vs хусусӣ",
      nfzLabel: "Суғуртаи давлатии NFZ",
      nfzTooltip: "NFZ — низоми миллии тандурустии Полша",
      privateLabel: "Хусусӣ",
      rows: [
        { label: "Арзиш", nfz: "Ҳангоми пардохти андозҳои меҳнатӣ ройгон", pvt: "150–400 PLN дар моҳ" },
        { label: "Мӯҳлати интизорӣ", nfz: "Барои мутахассисон аз чанд ҳафта то чанд моҳ", pvt: "Аз ҳамон рӯз то якчанд рӯз" },
        { label: "Дастгирии забонӣ", nfz: "Асосан танҳо бо забони полякӣ", pvt: "Англисӣ, аксар вақт русӣ/украинӣ" },
        { label: "Фарогирӣ", nfz: "Васеъ, вале интихоби духтур маҳдуд", pvt: "Клиника ва духтуратонро худатон интихоб кунед" },
      ],
      learnMoreBtn: "Маълумоти бештар",
      types: {
        medical: { name: "Суғуртаи тиббӣ", provider: "Medicover", price: "150–400 PLN дар моҳ", desc: "Суғуртаи хусусии тиббӣ барои дастрасии зуд ба духтурони мутахассис бе навбат." },
        car: { name: "Суғуртаи автомобилӣ (OC/AC)", provider: "PZU", price: "800–2500 PLN дар сол", desc: "Суғуртаи ҳатмии OC ва суғуртаи иловагии AC барои ҳифзи пурраи мошин." },
        home: { name: "Суғуртаи манзил", provider: "Warta", price: "200–600 PLN дар сол", desc: "Ҳифзи хона ё квартира аз сӯхтор, обхезӣ ва дуздӣ." },
        travel: { name: "Суғуртаи сайёҳӣ", provider: "Allianz", price: "20–80 PLN барои сафар", desc: "Пӯшонидани хароҷоти тиббӣ ва ҳолатҳои фавқулодда ҳангоми сафар дар Аврупо." },
      },
      guides: {
        medical: {
          heading: "Чӣ тавр суғуртаи тиббӣ бигирем",
          steps: [
            "Дараҷаи пӯшишро интихоб кунед — бастаи асосӣ ё бастаи васеъ бо стоматология ва мутахассисон.",
            "Пешниҳодҳои якчанд ширкати суғуртавӣ (LUX MED, Medicover, Signal Iduna) аз рӯи нарх ва шабакаи клиникаҳо муқоиса кунед.",
            "Полисро онлайн ё дар дафтари ширкати суғуртавӣ гиред — одатан шиноснома ва PESEL лозим аст.",
            "Рақами полисро нигоҳ доред — он барои навишт шудан ба назди духтур лозим мешавад.",
          ],
          aiQuestion: "Чӣ тавр суғуртаи тиббӣ дар Полша бигирам?",
        },
        car: {
          heading: "Чӣ тавр суғуртаи автомобил (OC/AC) бигирем",
          steps: [
            "OC (масъулияти маданӣ ҳатмӣ) барои ҳар як автомобили ба қайд гирифташуда мувофиқи қонун талаб карда мешавад.",
            "Нархҳои OC-и якчанд ширкати суғуртавиро муқоиса кунед — нарх вобаста ба таърихи ронандагӣ хеле фарқ мекунад.",
            "Агар хоҳед, барои ҳимояи пуртар AC (суғурта аз дуздӣ ва зарар)-ро илова кунед.",
            "Полисро дар давоми якчанд дақиқа онлайн гиред — маълумоти автомобил ва шаҳодатномаи ронандагӣ лозим мешавад.",
          ],
          aiQuestion: "Чӣ тавр суғуртаи автомобил дар Полша бигирам?",
        },
        home: {
          heading: "Чӣ тавр суғуртаи манзил бигирем",
          steps: [
            "Муайян кунед, ки чиро суғурта кардан лозим аст — худи манзил, амволи дохилӣ ё масъулияти маданӣ.",
            "Маълумоти асосӣ дар бораи квартира ҷамъ кунед: масоҳат, суроға, навъи бино.",
            "Пешниҳодҳои якчанд ширкати суғуртавиро муқоиса кунед — бисёр бонкҳо ҳангоми гирифтани якҷоя бо ипотека тахфиф пешниҳод мекунанд.",
            "Полисро онлайн ё тавассути агент гиред ва дар сурати лозим тасдиқро барои соҳиби манзил нигоҳ доред.",
          ],
          aiQuestion: "Чӣ тавр суғуртаи манзил дар Полша бигирам?",
        },
        travel: {
          heading: "Чӣ тавр суғуртаи сайёҳӣ бигирем",
          steps: [
            "Давомнокӣ ва мақсади сафарро муайян кунед — ин дараҷаи пӯшиши заруриро муайян мекунад.",
            "Тафтиш кунед, ки полис хароҷоти тиббӣ, эвакуатсия ва бекоркунии сафарро пӯшонад.",
            "Пешниҳодҳоро онлайн муқоиса кунед — гирифтани полис якчанд дақиқа вақт мегирад ва ташрифи шахсӣ лозим нест.",
            "Полисро дар телефон нигоҳ доред ё чоп кунед — он метавонад дар марз ё бемористон лозим шавад.",
          ],
          aiQuestion: "Чӣ тавр суғуртаи сайёҳӣ бигирам?",
        },
      },
      emptyText: "Дар бораи суғурта ҳанӯз маълумот нест.",
      aiPromptHeading: "Намедонед чиро интихоб кунед?",
      aiPromptSubtitle: "Аз AI бипурсед — он вазъи шуморо ба назар гирифта, чизи мувофиқро пешниҳод мекунад",
      aiPromptCta: "Пурсидан",
      aiPromptQuestion:
        "Ман чиро интихоб кунам — суғуртаи давлатии NFZ ё хусусӣ? Вазъи маро ба назар гир: оё ман расман кор мекунам, оё дастрасии зуд ба духтур лозим аст, оё буҷет муҳим аст.",
    },
    work: {
      title: "Кор дар Полша",
      subtitle: "Шартномаҳо, маошҳо ва дар куҷо ҷустуҷӯ кардан.",
      contractVsB2B: "Шартномаи меҳнатӣ ва B2B",
      salarySearch: "Ҷустуҷӯи маош",
      salarySearchSub: "Барои дидани маоши миёна касбро нависед.",
      placeholder: "масалан, барномасоз, ҳамшира, ронанда...",
      averageSalary: "Маоши миёна дар Полша",
      inEuros: "Бо евро",
      salaryNote: "* Рақамҳо тахминӣ мебошанд ва аз таҷриба ва шаҳр вобастаанд.",
      noExactData: "Барои ин касб ҳанӯз маълумоти дақиқ нест — нишондиҳандаи миёнаи миллӣ нишон дода мешавад.",
      jobSites: "Сомонаҳои корӣ",
      visitSite: "Ба сомона гузаред",
      searchByProfession: "Ҷустуҷӯи ҷойҳои кор барои ин касб",
      viewVacanciesBtn: "Ҷойҳои кориро дидан",
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
      guides: {
        employment: {
          heading: "Чӣ тавр шартномаи меҳнатӣ (umowa o pracę) гирем",
          steps: [
            "Корфармо ҳатмист, ки пеш аз оғози кор бо шумо шартномаи хаттии меҳнатӣ бандад.",
            "Тафтиш кунед, ки дар шартнома вазифа, маош, ҷадвал ва, агар мавҷуд бошад, мӯҳлати озмоишӣ нишон дода шудааст.",
            "Корфармо шуморо дар ZUS (суғуртаи иҷтимоӣ) сабти ном мекунад — ин дастрасӣ ба NFZ ва бадалҳои пенсионӣ медиҳад.",
            "Нусхаи шартномаро нигоҳ доред — он барои иҷозати истиқомат ва расмиёти дигар лозим мешавад.",
          ],
          aiQuestion: "Чӣ тавр шартномаи меҳнатӣ дар Полша гирам?",
        },
        b2b: {
          heading: "Чӣ тавр шартномаи B2B (худшуғлӣ) тартиб диҳем",
          steps: [
            "Фаъолияти инфиродиро (JDG) тавассути сомонаи CEIDG ба қайд гиред — инро дар як рӯз онлайн кардан мумкин аст.",
            "Якҷоя бо ҳисобдор шакли андозбандиро (қоидаҳои умумӣ, андози якхела ё ryczałt) интихоб кунед.",
            "Бо ширкати фармоишгар шартномаи B2B имзо кунед — ин шартномаи ҳуқуқи гражданӣ аст, на меҳнатӣ.",
            "Бадалҳои ZUS-ро ҳар моҳ худатон пардохт кунед ва эъломияи андозро пешниҳод кунед.",
          ],
          aiQuestion: "Чӣ тавр шартномаи B2B дар Полша тартиб диҳам?",
        },
        pracuj: {
          heading: "Чӣ тавр дар Pracuj.pl кор ҷустуҷӯ кунем",
          steps: [
            "Профил созед ва резюме (CV)-ро бор кунед — бисёр ҷойҳои холӣ имкон медиҳанд бо як клик муроҷиат кунед.",
            "Аз филтрҳо аз рӯи шаҳр, маош ва сатҳи забони англисӣ/полякӣ истифода баред.",
            "Барои аз даст надодани ҷойҳои холии нав огоҳиномаҳоро аз рӯи калимаҳои калидии касби худ танзим кунед.",
            "Омода бошед, ки баъзе мусоҳибаҳо бо забони поляки мегузаранд — забони мусоҳибаро пешакӣ аниқ кунед.",
          ],
          aiQuestion: "Чӣ тавр дар Pracuj.pl кор ҷустуҷӯ кунам?",
        },
        nofluff: {
          heading: "Чӣ тавр дар NoFluffJobs кор ҷустуҷӯ кунем",
          steps: [
            "NoFluffJobs ба соҳаи IT ихтисос ёфтааст — дар ин ҷо филтр кардани ҷойҳои холӣ аз рӯи маҷмӯи технологияҳо осон аст.",
            "Диққат диҳед, ки ҷойҳои холӣ дарҳол диапазони маошро нишон медиҳанд — ин муқоисаи пешниҳодҳоро осон мекунад.",
            "Профили худро бо забони англисӣ пур кунед — бисёр ширкатҳои IT дар Полша бо забони англисӣ кор мекунанд.",
            "Мустақим тавассути сомона муроҷиат кунед — аксари ширкатҳо дар давоми якчанд рӯз ҷавоб медиҳанд.",
          ],
          aiQuestion: "Чӣ тавр дар NoFluffJobs кор ҷустуҷӯ кунам?",
        },
        linkedin: {
          heading: "Чӣ тавр дар LinkedIn кор ҷустуҷӯ кунем",
          steps: [
            "Профили худро пурра пур кунед — таҷриба, малакаҳо ва тавсияҳо имконияти пайдо шудани шуморо аз ҷониби рекрутер зиёд мекунанд.",
            "Ҳолати «Open to work»-ро фаъол кунед, ки танҳо ба рекрутерон намоён аст, то корфармои ҳозираатон аз ҷустуҷӯи шумо огоҳ нашавад.",
            "Барои ҷустуҷӯи дақиқ аз филтрҳои ҷойгиршавӣ (Poland/Warsaw) ва кори дурдаст истифода баред.",
            "Ба рекрутерон паёми шахсӣ нависед — тамоси мустақим аксар вақт назар ба муроҷиат тавассути форма самараноктар аст.",
          ],
          aiQuestion: "Чӣ тавр дар LinkedIn кор ҷустуҷӯ кунам?",
        },
      },
      notFoundHeading: "Ин касб дар пойгоҳи мо нест",
      notFoundTryThese: "Яке аз ин касбҳоро санҷед:",
      perMonth: "моҳ",
      employmentFullSubtitle: "Бо ҳамаи кафолатҳои корманд",
      faqHeading: "Намедонед чиро интихоб кунед? Аз AI бипурсед",
      faqCaption: "Клик ба савол якбора чатро бо ҷавоби омодаи AI мекушояд",
      faqQuestions: [
        "Ман чиро интихоб кунам: шартномаи меҳнатӣ ё B2B?",
        "Чӣ тавр аз B2B ба шартномаи меҳнатӣ гузарам?",
        "Ман дар B2B кадом андозҳоро месупорам?",
        "Агар бе шартнома кор кунам, чиро аз даст медиҳам?",
      ],
    },
    community: {
      title: "Ҷамъиятҳо",
      subtitle: "Каналҳо ва чатҳои Telegram барои онҳое, ки ба Лаҳистон кӯч мебанданд.",
      join: "Ҳамроҳ шудан",
      members: "аъзо",
      cats: { all: "Ҳама", housing: "Манзил", work: "Кор", sport: "Варзиш", family: "Оила", general: "Умумӣ" },
    },
    dashboard: {
      relocation: "Кӯчидан ба {country}",
      subtitle: "Нақшаи роҳи шахсии шумо, ки дар вақти воқеӣ навсозӣ мешавад.",
      subtitleTemplate: "{from} → {city} · Ҳадаф: {goal} · Пешрафт {percent}%",
      subtitleTemplateNoCity: "{from} · Ҳадаф: {goal} · Пешрафт {percent}%",
      overallProgress: "Пешрафти умумӣ",
      openBtn: "Кушодан",
      expandBtn: "Кушодан",
      collapseBtn: "Пӯшидан",
      whatNextBtn: "Баъд чӣ бояд кард",
      stepsCompletedTemplate: "{done} аз {total} қадам иҷро шуд",
      docsReadyTemplate: "{done} аз {total} ҳуҷҷат тайёр",
      currentPhasePrefix: "Ҳозир: {phase}",
      allPhasesDone: "Ҳамаи марҳилаҳо ба анҷом расиданд",
      motivational: {
        noRoute: "Маршрутро интихоб кунед — ва дар ин ҷо нақшаи шахсии кӯчидани шумо пайдо мешавад.",
        allDone: "Ҳамаи ҳуҷҷатҳо расмият гирифтанд. Шумо комилан барои кӯчидан омодаед!",
        almostThere: "Шумо қариб ба ҳадаф расидед — то легализатсияи пурра каме монд.",
        thirdDone: "Зиёда аз сеяки роҳ тай шудааст. Ҳамин тавр давом диҳед!",
        goodStart: "Оғози аъло! Ҳар ҳуҷҷати расмиятгирифта шуморо ба ҳадаф наздиктар мекунад.",
        startFirst: "Аз қадами аввал сар кунед — ва тамоми роҳ фаҳмотар мешавад.",
      },
      timelineSections: {
        before_departure: "Пеш аз рафтан",
        first_week: "Ҳафтаи аввал",
        first_month: "Моҳи аввал",
        longterm: "Дарозмуддат",
      },
      countdown: {
        heading: "Шумо 30 рӯз иқомати қонунӣ дар низоми бидуни виза доред",
        remaining: "{days} рӯз боқӣ мондааст — бояд барои PESEL ва карти иқомат дар мӯҳлат муроҷиат кунед",
        expired: "Мӯҳлати 30-рӯзаи иқомати қонунии шумо ба охир расид — ҳарчи зудтар барои ҳуҷҷатҳои иқомат муроҷиат кунед",
      },
      phases: {
        beforeDeparture: "Тайёрӣ пеш аз рафтан",
        legalization: "Расмикунонӣ — 30 рӯзи аввал",
        residenceCard: "Гирифтани корти иқомат (karta pobytu)",
        workTaxes: "Кор ва андозҳо",
      },
      phaseDescriptions: {
        beforeDeparture: "Сохтани ҳисоб, пур кардани анкета ва санҷиши категорияи виза — қадамҳои аввалин, ҳанӯз пеш аз кӯчидан.",
        legalization: "Супоридани ҳуҷҷатҳо, гузаштани биометрия ва бақайдгирии суроғаи истиқомат (zameldowanie) — қадамҳои ҳатмӣ дар моҳи аввали пас аз омадан.",
        residenceCard: "Пешниҳоди ариза барои karta pobytu — иҷозати истиқомат — ва гирифтани худи корт.",
        workTaxes: "Гирифтани рақами андоз (NIP) ва расмикунонии шартномаи меҳнатӣ ё бизнес.",
      },
      phaseStatus: {
        done: "Иҷрошуда",
        inProgress: "Дар ҷараён",
        waiting: "Дар интизорӣ",
      },
      sidebar: {
        tagline: "Нақшаи кӯчиши шумо",
        home: "Асосӣ",
        myPlanSection: "НАҚШАИ МАН",
        roadmap: "Харитаи роҳ",
        checklist: "Рӯйхат",
        aiAssistant: "Ёрдамчии AI",
        servicesSection: "ХИЗМАТРАСОНӢ",
        landingLinkAria: "Гузаштан ба саҳифаи асосӣ",
      },
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
        stepLabel: "Қадам",
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
        taxId: {
          title: "Рақами андозии худро гиред",
          byCountry: {
            poland: "Дар идораи андози маҳаллӣ барои NIP (рақами шиносоии андоз) муроҷиат кунед.",
            germany: "Пас аз Anmeldung, Steuer-ID тавассути почта мерасад.",
            spain: "Барои NIE (рақами шахсии хориҷӣ) муроҷиат кунед — он тақрибан барои ҳама чиз дар Испания зарур аст.",
          },
        },
        employmentRegistration: {
          title: "Шуғл ё бизнеси худро расман ба қайд гиред",
          byCountry: {
            poland: "Umowa o pracę/zlecenie имзо кунед ё бизнеси худро дар ZUS ба қайд гиред.",
            germany: "Шартномаи меҳнатиро имзо кунед ва дар Finanzamt ва суғуртаи иҷтимоӣ ба қайд гиред.",
            spain: "Ҳамчун корманд ё худкорфармо дар Seguridad Social ё Hacienda alta ба қайд гиред.",
          },
        },
      },
      stepGuides: {
        visa_eligibility: {
          heading: "Чӣ тавр раводид ё асоси воридшавӣ гирем",
          steps: [
            "Намуди раводид ё асоси воридшавиро вобаста ба мақсади худ муайян кунед (кор, таҳсил, бизнес, муттаҳидшавии оила).",
            "Бастаи асосии ҳуҷҷатҳоро ҷамъ кунед: шиноснома, даъватнома ё тасдиқи мақсади сафар, суғурта, кафолатҳои молиявӣ.",
            "Ба консулгарӣ ё маркази раводиди кишвари кӯчиш ариза диҳед.",
            "Қарорро интизор шавед ва дар сурати зарурат мусоҳиба гузаронед.",
            "Пас аз гирифтани раводид, мӯҳлати воридшавӣ ва амали баъдиро аниқ кунед.",
          ],
        },
        business_registration: {
          heading: "Чӣ тавр бизнесро ба қайд гирем",
          steps: [
            "Вобаста ба кишвар шакли ташкилию ҳуқуқиро интихоб кунед (соҳибкори инфиродӣ, ҶДММ ва монанди инҳо).",
            "Ҳуҷҷатҳои таъсисӣ ва тасдиқи суроғаи ҳуқуқиро омода кунед.",
            "Ба феҳристи давлатии дахлдор барои қайд ариза диҳед.",
            "Рақамҳои андоз ва омори ширкатро гиред.",
            "Ҳисоби бонкиро ба номи бизнес кушоед.",
          ],
        },
        documents: {
          heading: "Кадом ҳуҷҷатҳоро омода кардан лозим аст",
          steps: [
            "Нусхаҳои аслӣ ва нусхабардории ҳуҷҷатҳои асосиро ҷамъ кунед: шиноснома, шаҳодатномаҳо, дипломҳо (агар лозим — бо апостил).",
            "Агар талаб карда шавад, тарҷумаи нотариалии ҳуҷҷатҳоро ба забони кишвари кӯчиш кунед.",
            "Барои пайгирии вазъият, сканҳоро ба бахши «Ҳуҷҷатҳо» дар ReloAI бор кунед.",
            "Вазъияти ҳар як ҳуҷҷатро тафтиш кунед: Тайёр, Дар тафтиш ё Мавҷуд нест.",
            "Нусхаҳои аслиро дар дасти худ нигоҳ доред — ҳангоми муроҷиати шахсӣ ба идораҳои давлатӣ лозим шуда метавонанд.",
          ],
        },
        biometric: {
          heading: "Чӣ тавр биометрияро супорем",
          steps: [
            "Ба хидмати муҳоҷират ё консулгарӣ барои супоридани маълумоти биометрӣ навишт шавед — аксар вақт инро онлайн кардан мумкин аст.",
            "Бо худ шиноснома, даъватнома ба қабул ва ҳуҷҷатҳои тасдиқкунандаро гиред.",
            "Дар қабул нақши ангуштони шумо гирифта мешавад ва акс гирифта мешавад.",
            "Расид ё рақами арзаро нигоҳ доред — тавассути он метавонед тайёр будани ҳуҷҷатро пайгирӣ кунед.",
            "Огоҳинома дар бораи тайёр будани корт ё иҷозатро интизор шавед.",
          ],
        },
        address_registration: {
          heading: "Чӣ тавр суроғаи истиқоматро ба қайд гирем",
          steps: [
            "Манзили доимӣ ё муваққатӣ пайдо кунед ва аз соҳиб барои қайд розигӣ гиред (шартномаи иҷора ё розигии соҳибмулк).",
            "Шиноснома ва ҳуҷҷати тасдиқкунандаи ҳуқуқи истифодаи манзилро омода кунед.",
            "Шахсан ё тавассути портали хидматрасониҳои давлатӣ ба маъмурияти маҳаллӣ муроҷиат кунед.",
            "Аризаи қайди ҷои истиқоматро пур кунед.",
            "Тасдиқи қайдро гиред — он барои расмиёти минбаъда лозим мешавад (иҷозати истиқомат, рақами андоз ва ғайра).",
          ],
        },
        residence_permit: {
          heading: "Чӣ тавр иҷозати истиқомат гирем",
          steps: [
            "Мутмаин шавед, ки барои муроҷиат асос доред: кор, таҳсил, бизнес ё муттаҳидшавии оила.",
            "Бастаи ҳуҷҷатҳоро ҷамъ кунед: шиноснома, акс, тасдиқи мақсади истиқомат, суғурта, тасдиқи даромад ва суроға.",
            "Ба идораи муҳоҷирати маҳаллӣ — шахсан ё онлайн — ариза диҳед.",
            "Агар пештар анҷом надода бошед, биометрияро супоред.",
            "Қарорро интизор шавед — ин метавонад аз якчанд ҳафта то якчанд моҳ давом кунад, вазъияти аризаро пайгирӣ кунед.",
          ],
        },
        tax_id: {
          heading: "Чӣ тавр рақами шиносномаи андоз гирем",
          steps: [
            "Муайян кунед, ки кадом рақам лозим аст: рақами умумии шиносномавӣ ё рақами андози бизнес.",
            "Шиноснома ва, агар мавҷуд бошад, тасдиқи қайди суроғаро ҷамъ кунед.",
            "Ба маъмурияти маҳаллӣ ё хидмати андоз ариза диҳед.",
            "Додани рақамро интизор шавед — аксар вақт инро дар ҳамон рӯзи муроҷиат гирифтан мумкин аст.",
            "Ҳуҷҷати тасдиқкунандаро нигоҳ доред — рақам барои кор, бонк ва суғуртаи тиббӣ лозим мешавад.",
          ],
        },
        employment_registration: {
          heading: "Чӣ тавр шуғлро расмӣ кунем",
          steps: [
            "Аз корфармо пурсед, ки кадом навъи иҷозати кор ё шартномаи меҳнатӣ лозим аст.",
            "Ҳуҷҷатҳоро омода кунед: шиноснома, иҷозати истиқомат ё раводиди корӣ, дар сурати лозим — диплом.",
            "Шартномаи меҳнатиро имзо кунед ва мутмаин шавед, ки корфармо огоҳиномаи заруриро пешниҳод кардааст.",
            "Агар ҳанӯз расмӣ нашуда бошад, рақами суғуртаи иҷтимоиро гиред.",
            "Тафтиш кунед, ки аз аввалин маоши шумо ҳама пардохтҳо ва андозҳо дуруст нигоҳ дошта мешаванд.",
          ],
        },
      },
      howToGetQuestion: "Чӣ тавр гирем: {title}?",
      home: {
        flightHeading: "Роҳи шумо",
        flightSub: "Ҳар қадаре ки иҷро шавад, ҳавопаймо ба ҳадафи шумо ҳамон қадар наздик мешавад.",
        flightOriginPlaceholder: "Кишвари шумо",
        greeting: "Салом, {name}! 👋",
        guestGreeting: "Салом! 👋",
        greetingSubtitle: "Кӯчиши шумо ба {country} чунин пеш меравад.",
        stepsLabel: "Қадамҳои иҷрошуда",
        phaseLabel: "Марҳилаи ҷорӣ",
        daysLabel: "Рӯзҳо аз рӯзи бақайдгирӣ",
        quickActionsHeading: "Амалҳои зуд",
        quickActionRoadmapDesc: "Пешрафти қадам ба қадамро тафтиш кунед",
        quickActionDocumentsDesc: "Ҳуҷҷатҳоро бор кунед ва пайгирӣ кунед",
        quickActionAiDesc: "Ба ёрдамчии AI савол диҳед",
        quickActionBanksDesc: "Барои навакак омадагон бонк ёбед",
        quickActionWorkDesc: "Кор ҷустуҷӯ кунед ва маошро фаҳмед",
        currentStepCta: "Ба қадам гузаред →",
      },
    },
    guideCard: {
      whenToGet: "Кай гирифта мешавад",
      whereToSubmit: "Ба куҷо супорида мешавад",
      showOnMap: "Дар харита нишон додан",
      onMap: "Дар харита",
      workingHours: "Соатҳои корӣ",
      onlineBooking: "Сабти ном онлайн",
      cost: "Арзиш",
      waitingTime: "Мӯҳлати интизорӣ",
      requiredDocs: "Ҳуҷҷатҳо",
      howToApply: "Чӣ тавр гирифта мешавад",
      tips: "Маслиҳатҳо",
      commonMistakes: "Хатоҳои маъмул",
      officialSite: "Сомонаи расмӣ",
      downloadForm: "Боргирии бланк",
      fillWithAi: "Бо AI пур кардан",
      askAi: "Аз AI пурсидан",
      askAiAriaTemplate: "Дар бораи {name} аз AI пурсидан",
      askAiBankQuestionTemplate:
        "Дар бораи {name} муфассал нақл кун: чӣ тавр ҳисоб кушода мешавад, кадом ҳуҷҷатҳо лозиманд ва ба чӣ бояд диққат дод?",
      askAiTopicQuestionTemplate:
        'Дар бораи "{name}" муфассал нақл кун: чӣ тавр гирифта мешавад, кадом ҳуҷҷатҳо лозиманд ва ба чӣ бояд диққат дод?',
      yourBank: "Бонки шумо",
      chooseBank: "Бонкро интихоб кунед",
      bankInfo: "Маълумот дар бораи бонк",
      classicAccount: "Ҳисоби классикӣ",
      moreDetails: "Муфассалтар",
      allTag: "Ҳама",
      citizenshipNote: "Дастурҳои марбут ба шаҳрвандии шумо нишон дода мешаванд.",
      loading: "Боргузорӣ…",
      searchGeneric: "Ҷустуҷӯ",
      searchBanks: "Ҷустуҷӯи бонк",
      searchInsurance: "Ҷустуҷӯи суғурта",
      searchGuides: "Ҷустуҷӯи роҳнамо",
      important2026Badge: "Муҳим барои 2026",
      moreBanksTemplate: "Боз {n} бонк",
      statusDone: "Тайёр",
      statusNotStarted: "Оғоз нашудааст",
      urgentAria: "Диққати таъҷилиро талаб мекунад",
      start: "Оғоз кардан",
      compareBanksTitle: "Муқоисаи бонкҳо",
      tagsLabel: "Тегҳо",
      tags: { noPesel: "Бе PESEL", fullyOnline: "Комилан онлайн", free: "Ройгон", multicurrency: "Бисёрасъорӣ" },
      headlines: {
        noPesel: "Бе PESEL",
        fullyOnline: "Кушодани ҳисоб онлайн",
        free: "Хизматрасонии ройгон",
        multicurrency: "Ҳисоби бисёрасъорӣ",
      },
    },
    helpButton: {
      label: "Инро чӣ тавр гирем?",
      openGuide: "📄 Дастурро кушоед",
      askAi: "💬 Аз AI пурсед",
      askAiFooter: "Саволҳо мондаанд? Аз AI пурсед →",
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
      aiPickHeading: "Интихоб бо ёрии ЗҲ",
      aiPickSubtitle: "Тавсиф кунед, ки чиро меҷӯед — донишгоҳ, мактаб, боғча ё курс — мо вариантҳои мувофиқро меёбем.",
      aiPickPlaceholder: "Масалан: боғчаи хусусии наздики марказ барои кӯдаки 3-сола",
      findBtn: "Ёфтан",
      findingBtn: "Ҷустуҷӯ…",
      resetBtn: "Бекор кардан",
      searchByNamePlaceholder: "Ҷустуҷӯ аз рӯи ном",
      addressLabel: "Суроға",
      showOnMapBtn: "Дар харита нишон додан →",
      forWhomLabel: "Барои кӣ",
      languageLabel: "Забон",
      scheduleLabel: "Ҷадвал",
      costLabel: "Арзиш",
      documentsLabel: "Ҳуҷҷатҳо: ",
      priceOnRequestText: "Нархро дақиқ кунед",
      askAiBtn: "Аз ЗҲ пурсидан",
      askAiAriaTemplate: "Дар бораи {name} аз ЗҲ пурсидан",
      askAiQuestionTemplate: 'Дар бораи "{name}" дар {city} бештар нақл кунед: оё интихоби он арзанда аст, чӣ бартарӣ ва камбудӣ дорад, ба чӣ бояд диққат дод?',
      needHelpHeading: "Барои интихоб кӯмак лозим аст? Аз ЗҲ бипурсед",
      clickHintText: "Клик ба савол дарҳол чатро бо ҷавоби тайёри ЗҲ мекушояд",
      tabQuestions: {
        universities: [
          "Чӣ тавр ба донишгоҳ дар Лаҳистон ҳуҷҷат супорам?",
          "Оё нострификатсияи диплом лозим аст?",
          "Барои хориҷиён кадом стипендияҳо мавҷуданд?",
        ],
        schools: [
          "Фарқи мактабҳои хусусӣ ва давлатӣ дар чист?",
          "Чӣ тавр кӯдакро бе донистани забони лаҳистонӣ ба мактаб сабт кунам?",
          "Барои қабул кадом ҳуҷҷатҳо лозиманд?",
        ],
        kindergartens: [
          "Барои боғча PESEL лозим аст?",
          "Навбат ба боғчаҳои давлатӣ чӣ тавр кор мекунад?",
          "Боғчаи хусусӣ чанд арзиш дорад?",
        ],
        courses: [
          "Чӣ тавр курсҳои забон дар Лаҳистонро интихоб кунам?",
          "Барои хориҷиён курсҳои ройгони забони лаҳистонӣ ҳастанд?",
          "Барои омӯхтани забон то дараҷаи B1 чанд вақт лозим аст?",
        ],
      },
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
      pageTitle: "Ёрдамчии AI",
      pageSubtitle: "Ёрдамчии шахсии кӯчидани шумо",
      newChat: "Чати нав",
      emptyHistory: "Таърих холӣ аст",
      todayLabel: "Имрӯз",
      thisWeekLabel: "Ин ҳафта",
      olderLabel: "Пештар",
      deleteChatAria: "Нест кардани чат",
      assistantName: "Ёрдамчии ReloAI",
      online: "Онлайн",
      greetingHeading: "Чӣ тавр кӯмак карда метавонам?",
      greetingSubtitle: "Дар бораи кӯчидан савол диҳед — ё яке аз мисолҳои зерро интихоб кунед.",
      defaultChatTitle: "Чати нав",
      deleteModalTitle: "Ин чатро нест мекунед?",
      deleteModalBody: "Ин амалро бекор кардан мумкин нест. Мукотиба бебозгашт нест карда мешавад.",
      deleteConfirm: "Нест кардан",
      deleteCancel: "Бекор кардан",
    },
    demo: {
      bannerText: "Шумо дар реҷаи пешнамоиш ҳастед. Барои нигоҳ доштани пешрафт ва дастрасӣ ба ҳамаи хусусиятҳо бақайд гиред.",
      registerNow: "Ҳозир бақайд гиред",
      floatingGreeting: "👋 Шумо ReloAI-ро меомӯзед — барои нигоҳ доштани пешрафт ройгон бақайд гиред",
      dismissAria: "Пӯшидан",
      promptHeading: "Барои кушодани ин хусусият бақайд гиред",
      promptBody: "Барои нигоҳ доштани пешрафт ва кушодани ҳамаи хусусиятҳо аккаунти ройгон созед.",
      promptDismiss: "Дертар",
    },
    onboarding: {
      stepLabel: "Қадами {current} аз {total}",
      back: "Бозгашт",
      cancel: "Бекор кардан",
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
        goal: { question: "Ҳадафи асосии шумо чист?", subheading: "Шумо метавонед якчанд ҳадафро интихоб кунед — ин муайян мекунад, ки кадом роҳҳоро барои шумо таҳлил мекунем." },
        jobOffer: { question: "Оё шумо пешниҳоди корфармо доред?", subheading: "Ба фаҳмидани он, ки кадом ҳуҷҷатҳо ба шумо лозиманд, кӯмак мекунад." },
        universityAccepted: { question: "Оё шумо аллакай ба донишгоҳ қабул шудаед?", subheading: "Муайян мекунад, ки нақшаи шумо аз куҷо оғоз мешавад." },
        studyLevel: { question: "Ба кадом барнома дохил мешавед?", subheading: "Барои магистратура ва докторантура нострификатсияи диплом лозим аст." },
        businessType: { question: "Кадом шакли бизнесро кушодан мехоҳед?", subheading: "Ҳуҷҷатҳои заруриро барои сабти ном муайян мекунад." },
        familyMemberType: { question: "Ҳозир дар Полша кӣ ҳаст?", subheading: "Навъи корти иқоматро барои муттаҳидшавии оила муайян мекунад." },
        hasChildren: { question: "Фарзандони шумо бо шумо мекӯчанд?", subheading: "Агар лозим бошад, ҳуҷҷатҳои мактаб/богча нишон медиҳем." },
        foreignEmployer: { question: "Оё шумо аллакай корфармо ё муштариёни хориҷӣ доред?", subheading: "Ба навъи корти иқомати шумо таъсир мерасонад." },
        registerIp: { question: "Оё дар Полша сабти ном кардани соҳибкории инфиродиро нақша доред?", subheading: "Муайян мекунад, ки оё NIP, ZUS ва сабти бизнес лозим аст." },
        timeline: { question: "Кай кӯчиданро нақша доред?", subheading: "Ба афзалиятбандии нақшаи шумо кӯмак мекунад." },
        hasCar: { question: "Оё мошине доред, ки ба Полша мебаред?", subheading: "Агар бале, иваз кардани шаҳодатнома, сабти мошин ва суғуртаро илова мекунем." },
      },
      goalOptions: {
        work: "Кор",
        workDesc: "Пешниҳод дорам ё кор меҷӯям",
        study: "Таҳсил",
        studyDesc: "Донишгоҳ ё коллеҷ",
        business: "Бизнес",
        businessDesc: "Кушодани соҳибкории инфиродӣ ё ҶМД",
        family: "Оила",
        familyDesc: "Ҳамсар/волидайн/фарзанд аллакай дар Полша",
        remote: "Кори дурдаст",
        remoteDesc: "Барои корфармои хориҷӣ кор мекунам ё фриланс",
        savings: "Кӯчидан бо пасандозҳои худ",
        savingsDesc: "Кӯчидан бидуни кор, бо пасандозҳо",
        other: "Дигар",
      },
      jobOfferOptions: {
        yes: "Ҳа — аллакай даъвати ширкати полякӣ дорам",
        no: "Не — худам кор меҷӯям",
      },
      universityAcceptedOptions: {
        yes: "Ҳа — тасдиқи қабул дорам",
        no: "Не — ҳанӯз қабул нашудаам",
      },
      studyLevelOptions: { bachelor: "Бакалавриат", master: "Магистратура", phd: "Докторантура" },
      businessTypeOptions: {
        jdg: "Соҳибкории инфиродӣ (JDG)",
        spzoo: "ҶМД (Sp. z o.o.) — ширкати масъулияти маҳдуд",
        undecided: "Ҳанӯз қарор накардаам",
      },
      familyMemberTypeOptions: {
        spouse: "Ҳамсар / шарик",
        parent: "Волидайн",
        child: "Фарзанд",
        multiple: "Якчанд узви оила",
      },
      hasChildrenOptions: { yes: "Ҳа", no: "Не" },
      foreignEmployerOptions: {
        yes: "Ҳа — барои ширкати хориҷӣ кор мекунам",
        no: "Не — фрилансерам, муштарӣ меҷӯям",
      },
      registerIpOptions: {
        yes: "Ҳа — мехоҳам расман кор кунам",
        no: "Не — ҳоло нақша надорам",
      },
      timelineOptions: {
        already: "Аллакай дар Полша ҳастам",
        month1: "Дар давоми 1 моҳ",
        months3: "Дар давоми 3 моҳ",
        months6: "Дар давоми 6 моҳ",
        year1: "Дар давоми як сол",
        exploring: "Танҳо вариантҳоро меомӯзам",
      },
      hasCarOptions: {
        yes: "Ҳа — мошини худро мебарам",
        no: "Не — мошин надорам",
      },
      results: {
        heading: "Мо 3 роҳи кӯчидан барои шумо ёфтем!",
        loading: "Роҳҳои шахсии шумо сохта мешаванд...",
        selectButton: "Ин роҳро интихоб кунед",
        selecting: "Интихоб шуда истодааст…",
        currentRoute: "Роҳи ҷорӣ",
        recommended: "Тавсияшуда",
        speedFast: "Суръати баланд",
        speedMedium: "Суръати миёна",
        speedSlow: "Суръати паст",
        difficultyEasy: "Мушкилии паст",
        difficultyMedium: "Мушкилии миёна",
        difficultyHard: "Мушкилии баланд",
        approvalRate: "Баҳри таҳқиқ",
        timeline: "Мӯҳлат",
        cost: "Нарх",
        steps: "Қадамҳо",
        bestFor: "Барои кӣ мувофиқ аст",
        selectError: "Роҳи интихобшуда захира нашуд. Лутфан аз нав кӯшиш кунед.",
        incompleteHeading: "Аввал анкетаро пур кунед — барои сохтани роҳҳо шаҳрвандӣ ва ҳадаф лозим аст.",
        incompleteCta: "Идомаи анкета",
      },
    },
  },
  uk: {
    nav: {
      howItWorks: "Як це працює",
      features: "Можливості",
      countries: "Країни",
      pricing: "Ціни",
      reviews: "Відгуки",
      faq: "Питання",
      login: "Увійти",
      getStarted: "Почати",
      goToDashboard: "Мій план →",
    },
    common: {
      cancelBtn: "Скасувати",
      logoutBtn: "Вийти",
      logoutConfirmTitle: "Вийти з акаунту?",
      logoutConfirmBody: "Ви впевнені, що хочете вийти?",
      cityLabel: "Місто",
      chosenByCountTemplate: "Уже обрали {n}+ людей через ReloAI",
    },
    hero: {
      badge: "Ваш AI-гід з переїзду",
      headline1: "Переїзд до Європи",
      headline2: "— це просто.",
      subtext:
        "ReloAI планує вашу візу, документи, житло та банківські справи — крок за кроком, простою мовою. Поставте запитання та отримайте персональний план за секунди.",
      getStarted: "Почати",
      seeHowItWorks: "Як це працює",
      trustCountries: "3 країни",
      trustLanguages: "6 мов",
      trustFree: "Безкоштовний старт",
      trustSocialProof: "Понад 1000 людей уже успішно переїхали за допомогою ReloAI",
    },
    chat: {
      assistantName: "Асистент ReloAI",
      online: "Онлайн",
      messages: [
        "Я хочу переїхати з України до Німеччини на роботу.",
        "Зрозумів. Судячи з вашого профілю, вам потрібна віза для пошуку роботи або EU Blue Card. Скласти чек-лист документів?",
        "Так, будь ласка.",
        "Готово. Потрібно 7 документів, 2 у вас вже є. Я нагадуватиму про терміни.",
      ],
    },
    heroDemo: {
      question: "Куди ви хочете переїхати?",
      userReply: "Польща, хочу працювати",
      response: "Чудово! Зараз складу для вас покроковий план переїзду до Польщі.",
      docQuestion: "А які документи потрібні в першу чергу?",
      docResponse: "Ось 2 документи, з яких варто почати:",
      inputPlaceholder: "Запитайте про життя в Польщі...",
      docCardPassportTitle: "Скан паспорта",
      docCardPassportSubtitle: "Потрібен майже для всіх кроків",
      docCardInsuranceTitle: "Мед. страхування",
      docCardInsuranceSubtitle: "Обов'язкове для посвідки на проживання",
      docStatusDone: "Готово",
      docStatusPending: "На перевірці",
    },
    stats: {
      items: [
        { value: "3", label: "Країни" },
        { value: "100x", label: "Дешевше" },
        { value: "24/7", label: "Підтримка AI" },
      ],
    },
    howItWorks: {
      heading: "Як це працює",
      subheading: "Від запитання до дня переїзду — всього чотири прості кроки.",
      steps: [
        {
          title: "Розкажіть про свою ситуацію",
          description:
            "Дайте відповідь на кілька запитань про своє громадянство, цілі та країну призначення.",
        },
        {
          title: "Отримайте свій план",
          description:
            "ReloAI складе персональний план щодо візи, житла та термінів за кілька хвилин.",
        },
        {
          title: "Оформлюйте документи з AI",
          description:
            "Спілкуйтеся з асистентом, щоб заповнювати форми, збирати документи та відстежувати терміни.",
        },
        {
          title: "Переїжджайте впевнено",
          description:
            "Прибувайте, знаючи, що віза, житло, банк і реєстрація вже вирішені.",
        },
      ],
    },
    features: {
      heading: "Все, що потрібно для переїзду",
      subheading: "Один асистент для кожної частини переїзду до Європи.",
      items: [
        {
          title: "Допомога з візою та дозволами",
          description:
            "Дізнайтеся, яка віза підходить саме вам і що потрібно на кожному кроці.",
        },
        {
          title: "Чек-лист документів",
          description:
            "Персональний, завжди актуальний список усіх потрібних документів.",
        },
        {
          title: "Помічник з житла",
          description:
            "Шукайте оголошення, розбирайтеся в договорах і уникайте шахраїв.",
        },
        {
          title: "Банки та податки",
          description:
            "Відкрийте потрібні рахунки та розберіться в нових податкових обов'язках.",
        },
        {
          title: "Оформлення медицини",
          description: "Швидко оформіть страховку та знайдіть лікаря поруч.",
        },
        {
          title: "AI-чат 24/7",
          description:
            "Поставте будь-яке запитання про переїзд і отримайте чітку відповідь із джерелом.",
        },
      ],
    },
    countries: {
      heading: "Створено для вашого напрямку",
      subheading: "Гід по конкретній країні — не просто загальні списки.",
      list: [
        {
          flag: "pl",
          name: "Польща",
          nameDeclined: "Польщі",
          highlight: "Швидкозростаючий tech-хаб",
          points: [
            "Розбір Karta Pobytu (посвідка на проживання)",
            "Реєстрація PESEL і місцевий банк",
            "Гід по середній орендній платі по містах",
          ],
        },
        {
          flag: "de",
          name: "Німеччина",
          nameDeclined: "Німеччини",
          highlight: "EU Blue Card і візи для пошуку роботи",
          points: [
            "Anmeldung і прийоми в Bürgeramt",
            "Медстраховка (державна vs приватна)",
            "Податковий номер і віза для фрилансерів",
          ],
        },
        {
          flag: "es",
          name: "Іспанія",
          nameDeclined: "Іспанії",
          highlight: "Популярно серед віддалених працівників",
          points: [
            "Перевірка на Digital Nomad Visa",
            "Номер NIE та empadronamiento",
            "Порівняння вартості життя за регіонами",
          ],
        },
      ],
      planMyMoveTo: "Спланувати переїзд до {country} →",
    },
    directions: {
      label: "НАПРЯМКИ",
      heading: "Куди ви переїжджаєте?",
      subheading: "Персональний план для вашої країни — за секунди.",
      comingSoonBadge: "Незабаром буде доступно",
      ctaLabel: "Почати",
      comingSoonCta: "Незабаром",
      cards: [
        { name: "Польща", subtitle: "Стабільна Європа для старту" },
        { name: "Німеччина", subtitle: "Blue Card та кар'єра в IT" },
        { name: "Іспанія", subtitle: "Море, сонце та Digital Nomad" },
      ],
    },
    pricing: {
      heading: "Тарифи",
      subheading: "Почніть безкоштовно.",
      mostPopular: "Найпопулярніший",
      plans: [
        {
          name: "Безкоштовний",
          price: "€0",
          period: "назавжди",
          description: "Вивчіть варіанти перед тим, як прийняти рішення.",
          features: [
            "Перевірка візової відповідності",
            "Базовий чек-лист документів",
            "Обмежений AI-чат (10 повідомлень/міс)",
            "Оглядові гіди по країнах",
          ],
          cta: "Почати безкоштовно",
        },
        {
          name: "Premium",
          price: "€29",
          period: "/місяць",
          description: "Повний супровід активного переїзду.",
          features: [
            "Все з Безкоштовного",
            "Необмежений AI-чат",
            "Персональний план і терміни",
            "Помічник з житла та банку",
            "Підтримка по email",
          ],
          cta: "Підключити Premium",
        },
        {
          name: "Pro",
          price: "€49",
          period: "/місяць",
          description: "Для сімей і складних переїздів.",
          features: [
            "Все з Premium",
            "Профілі для кількох осіб",
            "Перевірка документів експертом",
            "Пріоритетна підтримка в чаті",
            "Листи для роботодавця про переїзд",
          ],
          cta: "Підключити Pro",
        },
      ],
    },
    reviews: {
      heading: "Відгуки",
      subheading: "Реальні люди. Реальні переїзди.",
      items: [
        {
          name: "Анна К.",
          route: "Україна → Польща",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Отримала PESEL за 2 дні. Без ReloAI витратила б тиждень на пошук інформації.",
          initials: "АК",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Михайло С.",
          route: "Росія → Німеччина",
          fromFlag: "ru",
          toFlag: "de",
          rating: 5,
          quote: "AI допоміг розібратися з Anmeldung. Пояснив усе зрозуміло, дав адреси бюро.",
          initials: "МС",
          documentBadge: { country: "de", label: "Anmeldung" },
        },
        {
          name: "Ольга М.",
          route: "Білорусь → Іспанія",
          fromFlag: "by",
          toFlag: "es",
          rating: 5,
          quote: "Відкрила бізнес в Іспанії. Чеклист заощадив місяць роботи і 2000 євро на юристі.",
          initials: "ОМ",
          documentBadge: { country: "es", label: "Alta de Autónomo" },
        },
        {
          name: "Дмитро П.",
          route: "Казахстан → Польща",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 4,
          quote: "Прогрес-трекер дуже допомагає. Завжди знаю, на якому кроці перебуваю.",
          initials: "ДП",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Лейла Р.",
          route: "Узбекистан → Німеччина",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Знайшла роботу в Німеччині через розділ вакансій. AI написав супровідний лист.",
          initials: "ЛР",
          documentBadge: { country: "de", label: "Anschreiben" },
        },
        {
          name: "Тимур А.",
          route: "Таджикистан → Іспанія",
          fromFlag: "tj",
          toFlag: "es",
          rating: 5,
          quote: "NIE отримав за 3 тижні. Раніше думав, що це займе півроку.",
          initials: "ТА",
          documentBadge: { country: "es", label: "NIE" },
        },
        {
          name: "Карина Н.",
          route: "Україна → Німеччина",
          fromFlag: "ua",
          toFlag: "de",
          rating: 5,
          quote: "Переїхала з сім'єю. Знайшли школу для дітей і лікаря, що розмовляє російською.",
          initials: "КН",
          documentBadge: { country: "de", label: "Familiennachzug" },
        },
        {
          name: "Артем В.",
          route: "Росія → Іспанія",
          fromFlag: "ru",
          toFlag: "es",
          rating: 4,
          quote: "Digital Nomad Visa — оформив за 6 тижнів за інструкцією ReloAI.",
          initials: "АВ",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Заріна І.",
          route: "Казахстан → Польща",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Відкрила рахунок у mBank з першого разу. AI підказав, які документи взяти.",
          initials: "ЗІ",
          documentBadge: { country: "pl", label: "mBank" },
        },
        {
          name: "Богдан Ф.",
          route: "Україна → Польща",
          fromFlag: "ua",
          toFlag: "pl",
          rating: 5,
          quote: "Найкращий сервіс для переїзду. Заощадив час і нерви.",
          initials: "БФ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Олексій К.",
          route: "Казахстан → Польща",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Отримав PESEL за 3 дні — AI заздалегідь підказав усі документи.",
          initials: "ОК",
          documentBadge: { country: "pl", label: "PESEL" },
        },
        {
          name: "Нілуфар Р.",
          route: "Узбекистан → Польща",
          fromFlag: "uz",
          toFlag: "pl",
          rating: 5,
          quote: "Знайшла квартиру у Варшаві за тиждень за допомогою ReloAI.",
          initials: "НР",
          documentBadge: { country: "pl", label: "Wynajem mieszkania" },
        },
        {
          name: "Дмитро В.",
          route: "Білорусь → Німеччина",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Оформив Blue Card без юриста, заощадив €2000.",
          initials: "ДВ",
          documentBadge: { country: "de", label: "Blue Card" },
        },
        {
          name: "Маліка С.",
          route: "Таджикистан → Польща",
          fromFlag: "tj",
          toFlag: "pl",
          rating: 5,
          quote: "Відкрила рахунок у PKO BP з першого разу, AI підготував список документів.",
          initials: "МС",
          documentBadge: { country: "pl", label: "PKO BP" },
        },
        {
          name: "Анна П.",
          route: "Україна → Іспанія",
          fromFlag: "ua",
          toFlag: "es",
          rating: 5,
          quote: "Digital Nomad Visa — усе покроково, оформила за місяць.",
          initials: "АП",
          documentBadge: { country: "es", label: "Digital Nomad Visa" },
        },
        {
          name: "Азіз Т.",
          route: "Узбекистан → Німеччина",
          fromFlag: "uz",
          toFlag: "de",
          rating: 5,
          quote: "Вступив до університету в Мюнхені — AI допоміг зібрати документи для студентської візи.",
          initials: "АТ",
          documentBadge: { country: "de", label: "Studentenvisum" },
        },
        {
          name: "Світлана І.",
          route: "Росія → Польща",
          fromFlag: "ru",
          toFlag: "pl",
          rating: 5,
          quote: "Переїхала з чоловіком і дітьми, знайшли садочок і школу за два тижні.",
          initials: "СІ",
          documentBadge: { country: "pl", label: "Przedszkole i szkoła" },
        },
        {
          name: "Роман К.",
          route: "Білорусь → Німеччина",
          fromFlag: "by",
          toFlag: "de",
          rating: 4,
          quote: "Відкрив ФОП у Берліні, чекліст допоміг з усіма довідками.",
          initials: "РК",
          documentBadge: { country: "de", label: "Gewerbeanmeldung" },
        },
        {
          name: "Дінара Ж.",
          route: "Казахстан → Польща",
          fromFlag: "kz",
          toFlag: "pl",
          rating: 5,
          quote: "Вступила до Варшавського університету, отримала студентську карту побиту без проблем.",
          initials: "ДЖ",
          documentBadge: { country: "pl", label: "Karta Pobytu" },
        },
        {
          name: "Юлія Н.",
          route: "Україна → Іспанія",
          fromFlag: "ua",
          toFlag: "es",
          rating: 4,
          quote: "Знайшла віддалену роботу й оформила NIE за місяць, усе за інструкцією.",
          initials: "ЮН",
          documentBadge: { country: "es", label: "NIE" },
        },
      ],
    },
    faq: {
      heading: "Часті запитання",
      subheading: "Все, що потрібно знати перед початком переїзду.",
      items: [
        {
          question: "Що таке ReloAI і як це працює?",
          answer: "ReloAI — це AI-платформа, яка допомагає людям переїхати до Європи. Ви відповідаєте на кілька запитань про себе — звідки ви, куди хочете переїхати і з якою метою. На основі ваших відповідей ReloAI автоматично складає персональний план переїзду з повним списком документів, термінами та покроковими інструкціями. Все в одному місці — документи, житло, банки, медицина, робота, освіта, страхування і багато іншого, а також AI-асистент, який відповідає на будь-які запитання 24/7.",
        },
        {
          question: "Чим ReloAI відрізняється від юриста з імміграції?",
          answer: "Юрист коштує від 500 до 3000 євро і працює лише в робочі години. ReloAI доступний 24/7, коштує в рази дешевше і дає таку ж точну інформацію щодо документів і процедур.",
        },
        {
          question: "До яких країн можна переїхати з ReloAI?",
          answer: "Зараз доступна Польща — один із найпопулярніших напрямків для переїзду з країн СНД. Найближчим часом додамо Німеччину та Іспанію. З усіма доступними країнами для переїзду ви можете детальніше ознайомитися на нашому сайті. ReloAI підтримує переїзд із понад 40 країн — Україна, Білорусь, Росія, Узбекистан, Таджикистан, Казахстан, Туреччина, Молдова та багато інших.",
        },
        {
          question: "Які документи потрібні для переїзду і як ReloAI допомагає їх зібрати?",
          answer: "Список документів залежить від вашого громадянства та мети переїзду. Після проходження онбордингу ReloAI автоматично показує лише ті документи, які потрібні саме вам — без зайвої інформації. Для кожного документа ReloAI надає вичерпну інформацію — точні адреси установ у всіх великих містах, актуальні години роботи, повний список документів, які потрібно взяти з собою, вартість усіх мит і зборів, реальні терміни очікування, покрокову інструкцію та розбір найпоширеніших помилок. Нічого зайвого — тільки те, що дійсно потрібно саме вам.",
        },
        {
          question: "Як AI генерує мій план переїзду?",
          answer: "Ви відповідаєте на 5 запитань в онбордингу — громадянство, країна призначення, мета переїзду, наявність офера про роботу і терміни. На основі цих даних ReloAI підбирає потрібні документи з бази даних і складає покроковий план із реальними термінами. Наприклад, узбек, який їде працювати до Польщі, отримає план: Віза D → Реєстрація адреси → PESEL → Банківський рахунок → Дозвіл на роботу → Карта побиту.",
        },
        {
          question: "Скільки часу займає переїзд за планом ReloAI?",
          answer: "Залежить від вашої ситуації. У середньому: безвізові країни (Україна, Молдова) — від 1 до 3 місяців до повної легалізації. Візові країни (Узбекистан, Казахстан та інші) — від 3 до 6 місяців з урахуванням отримання візи D. ReloAI показує реальні терміни для кожного документа, щоб ви могли планувати заздалегідь.",
        },
        {
          question: "Це платно? Скільки коштує?",
          answer: "ReloAI має безкоштовний план із базовим доступом до однієї країни та 5 AI-повідомленнями на день. Для повного доступу є два платних тарифи: Premium — 29€ на місяць: усі країни, 50 AI-повідомлень на день, завантаження документів, повна база адрес. Pro — 49€ на місяць: усе з Premium плюс необмежений AI-чат, автозаповнення документів, пріоритетна підтримка.",
        },
        {
          question: "Якими мовами працює сервіс?",
          answer: "ReloAI працює 6 мовами: російська, англійська, узбецька, турецька, таджицька та українська. Ви можете обрати мову під час реєстрації або змінити її в налаштуваннях у будь-який момент.",
        },
        {
          question: "Чи можна скасувати підписку в будь-який момент?",
          answer: "Так. Підписку можна скасувати в будь-який момент у розділі «Профіль» — без штрафів і прихованих умов. Після скасування ви зберігаєте доступ до кінця оплаченого періоду, після чого акаунт переходить на безкоштовний план. Усі ваші дані та документи зберігаються.",
        },
        {
          question: "Як ReloAI захищає мої особисті дані?",
          answer: "Усі дані зберігаються на захищених серверах із шифруванням. Ми не передаємо ваші дані третім особам. Документи, які ви завантажуєте, доступні тільки вам. ReloAI відповідає вимогам GDPR — європейського закону про захист персональних даних.",
        },
      ],
    },
    contact: {
      heading: "Готові почати переїзд?",
      subtext:
        "Скажіть, куди ви прямуєте, і ми надішлемо безкоштовний план переїзду протягом дня.",
      email: "hello@reloai.com",
      repliesWithin: "Відповідаємо протягом 24 годин",
      form: {
        fullName: "Повне ім'я",
        emailLabel: "Email",
        movingTo: "Переїзд до",
        message: "Повідомлення",
        placeholderName: "Іван Іваненко",
        placeholderEmail: "ivan@example.com",
        placeholderMessage: "Розкажіть трохи про ваш переїзд...",
        destinations: ["Польща", "Німеччина", "Іспанія", "Інше"],
        send: "Надіслати повідомлення",
      },
      success: {
        title: "Дякуємо — повідомлення надіслано!",
        subtext: "Ми незабаром зв'яжемося з вами і надішлемо план переїзду.",
      },
    },
    footer: {
      description:
        "Ваш AI-асистент з переїзду до Європи — візи, документи, житло та банк, крок за кроком.",
      productHeading: "Продукт",
      countriesHeading: "Країни",
      companyHeading: "Компанія",
      productLinks: ["Як це працює", "Можливості", "Ціни"],
      companyLinks: ["Відгуки", "Контакти"],
      rights: "Усі права захищені.",
      disclaimer: "ReloAI надає інформаційні послуги. Ми не є юридичною фірмою і не несемо відповідальності за рішення міграційних органів. Уся інформація має ознайомчий характер. Для юридичної допомоги зверніться до ліцензованого фахівця.",
    },
    auth: {
      backToLanding: "На сайт",
      or: "або",
      login: {
        heading: "З поверненням",
        subtext: "Увійдіть, щоб продовжити переїзд.",
        googleSignIn: "Увійти через Google",
        email: "Електронна пошта",
        passwordLabel: "Пароль",
        submit: "Продовжити",
        forgotPassword: "Забули пароль?",
        noAccount: "Немає акаунту?",
        register: "Зареєструватися",
      },
      register: {
        heading: "Створіть акаунт",
        subtitle: "Побудуйте безкоштовний план переїзду за кілька хвилин.",
        googleSignUp: "Зареєструватися через Google",
        redirecting: "Перенаправлення…",
        fullName: "Повне ім'я",
        email: "Email",
        passwordLabel: "Пароль",
        passwordTooltip: "Пароль не відповідає вимогам",
        confirmPasswordLabel: "Підтвердіть пароль",
        passwordMismatch: "Паролі не збігаються",
        submit: "Зареєструватися",
        hasAccount: "Вже є акаунт?",
        login: "Увійти",
        confirmEmail: {
          heading: "Перевірте пошту",
          body: "Ми надіслали посилання для підтвердження на {email}. Перейдіть за ним, щоб активувати акаунт, а потім увійдіть.",
          goToLogin: "Перейти до входу",
        },
      },
    },
    password: {
      minLength: "Мінімум 8 символів",
      hasUppercase: "Хоча б одна велика літера (A–Z)",
      hasLowercase: "Хоча б одна маленька літера (a–z)",
      hasNumber: "Хоча б одна цифра (0–9)",
      hasSpecialOrNumber: "Спецсимвол (!@#$%^&*) — або цифра рахується подвійно",
      noForeign: "Тільки англійські літери (без кирилиці)",
      weak: "Слабкий",
      medium: "Середній",
      strong: "Надійний",
    },
    profile: {
      title: "Профіль",
      subtitle: "Повний огляд вашого переїзду.",
      logOut: "Вийти",
      planLabel: "План",
      upgradeTooltip: "Покращити план",
      upgradeBadge: "⚡ Покращити до Premium",
      upgradeToProBadge: "⚡ Покращити до Pro",
      maxPlanBadge: "✓ Максимальний план",
      unnamed: "Без імені",
      memberSinceLabel: "На платформі з",
      personalSection: "Особисті дані",
      relocationSection: "Профіль переїзду",
      destinationLabel: "Переїжджає в",
      routeLabel: "Обраний маршрут легалізації",
      noRouteSelected: "Маршрут ще не обрано",
      chooseRoute: "Обрати маршрут",
      routeModalSubheading: "Оберіть один із варіантів нижче — маршрут можна змінити будь-коли.",
      jobOfferLabel: "Є пропозиція роботи",
      alreadyAdmittedLabel: "Вже зараховано",
      yes: "Так",
      no: "Ні",
      notSet: "Не вказано",
      progressSection: "Огляд прогресу",
      currentStepLabel: "Поточний крок",
      stepsCompletedLabel: "Виконано {completed} з {total} кроків",
      allStepsDone: "Усі кроки виконано!",
      documentsSection: "Статус документів",
      viewAllDocuments: "Усі документи",
      editBtn: "Редагувати дані про переїзд",
      changeRouteBtn: "Змінити план переїзду",
      editModalTitle: "Редагувати дані про переїзд",
      cityLabel: "Місто",
      cityPlaceholder: "напр., Варшава",
      saveBtn: "Зберегти зміни",
      saved: "Збережено",
    },
    topbar: {
      searchPlaceholder: "Пошук документів, завдань...",
      upgrade: "Покращити",
      openMenuAria: "Відкрити меню",
      avatarAria: "Перейти до профілю",
    },
    notifications: {
      bellAria: "Відкрити сповіщення",
      title: "Сповіщення",
      markAllRead: "Позначити всі як прочитані",
      empty: "Поки що немає сповіщень",
      registrationTitle: "Дякуємо за реєстрацію! 🎉",
      registrationMessage: "Вітаємо, ви успішно зареєструвалися в ReloAI.",
      welcomeTitle: "Анкету заповнено! 🎉",
      welcomeMessage: "Ви успішно заповнили дані анкети та обрали план переїзду ({route}). Ви можете змінити ці дані будь-коли в налаштуваннях профілю.",
      checklistTitle: "Дорожню карту оновлено ✅",
      checklistMessage: "Ви перестворили план переїзду ({route}). Прогрес за новою дорожньою картою почнеться заново — попередні дані анкети можна переглянути та змінити в налаштуваннях профілю.",
      inactivityTitle: "Не забувайте про свій план переїзду",
      inactivityMessage: "Поверніться, щоб продовжити з того місця, де зупинилися.",
      documentTitle: "Документ завантажено та надіслано на перевірку",
      documentMessage: "Ми повідомимо вас, щойно він буде перевірений.",
    },
    sidebar: {
      documents: "Документи",
      housing: "Житло",
      banks: "Банки",
      medicine: "Медицина",
      insurance: "Страхування",
      work: "Робота",
      community: "Спільнота",
      education: "Освіта",
      otherServices: "Інші послуги",
      profile: "Профіль",
      settings: "Налаштування",
      logout: "Вихід",
    },
    settings: {
      title: "Налаштування",
      subtitle: "Керуйте виглядом і поведінкою ReloAI.",
      languageSection: "Мова",
      languageDesc: "ReloAI спілкуватиметься з вами цією мовою.",
      currencySection: "Валюта",
      currencyDesc: "У якій валюті показувати ціни на сайті (курс до злотого оновлюється автоматично).",
      saving: "(збереження…)",
      themeSection: "Вигляд",
      themeDesc: "Оберіть, як ReloAI виглядає на вашому пристрої.",
      themeDark: "Темна",
      themeLight: "Світла",
      notifications: "Сповіщення",
      notifEmail: "Email-розсилка",
      notifEmailDesc: "Час від часу — новини та поради.",
      notifDocuments: "Нагадування про документи",
      notifDocumentsDesc: "Попередження перед закінченням терміну.",
      notifProduct: "Новини продукту",
      notifProductDesc: "Нові функції та оновлення.",
      accountSection: "Акаунт",
      nameLabel: "Ім'я",
      emailLabel: "Email",
      saveBtn: "Зберегти зміни",
      saved: "Збережено",
      dangerSection: "Небезпечна зона",
      dangerDesc: "Видалення акаунта видалить усі ваші дані. Це неможливо скасувати.",
      deleteAccountBtn: "Видалити акаунт",
      deleteConfirmTitle: "Видалити акаунт?",
      deleteConfirmBody: "Ваш профіль і дані буде видалено назавжди. Це неможливо скасувати.",
      deleteConfirmBtn: "Видалити акаунт",
    },
    documents: {
      title: "Документи",
      subtitle: "Документи, які потрібні саме вам, — в одному місці.",
      tabs: {
        all: "Усі",
        passport: "Паспорт",
        pesel: "PESEL",
        workPermit: "Дозвіл на роботу",
        insurance: "Страховка",
        bank: "Банк",
        biometric: "Біометрія",
        address: "Адреса",
        residencePermit: "Карта побиту",
        taxId: "NIP",
        employment: "Працевлаштування",
        business: "Бізнес",
      },
      status: { verified: "Готово", pending: "На перевірці", missing: "Відсутній", locked: "Premium" },
      upload: "Перетягніть файл або натисніть, щоб завантажити",
      uploadBtn: "Завантажити",
      addDocumentBtn: "Завантажити документ",
      viewBtn: "Перегляд",
      deleteBtn: "Видалити",
      unlockBtn: "Відкрити з Premium",
      docNames: {
        passportScan: "Скан паспорта",
        passportPhoto: "Фото на паспорт",
        peselForm: "Заява на PESEL",
        peselLetter: "Лист-підтвердження PESEL",
        workPermitApp: "Заява на дозвіл на роботу",
        sponsorshipLetter: "Лист від роботодавця-спонсора",
        healthInsurance: "Поліс медичного страхування",
        travelInsurance: "Туристична страховка",
        bankConfirmation: "Підтвердження банківського рахунку",
        proofOfFunds: "Підтвердження наявності коштів",
        relocationLetter: "Лист про переїзд від роботодавця",
        taxResidency: "Довідка про податкове резидентство",
        biometricConfirmation: "Підтвердження біометрії",
        addressConfirmation: "Підтвердження реєстрації адреси",
        residencePermitScan: "Скан карти побиту",
        taxIdConfirmation: "Підтвердження NIP",
        employmentContract: "Трудовий договір",
        businessRegistrationConfirmation: "Підтвердження реєстрації бізнесу",
      },
      docHints: {
        passportScan: "Потрібен для більшості офіційних процедур",
        passportPhoto: "Потрібне для заяви на Karta Pobytu",
        peselForm: "Перший крок до отримання номера PESEL",
        peselLetter: "Підтверджує присвоєння номера PESEL",
        workPermitApp: "Потрібно для легального працевлаштування",
        sponsorshipLetter: "Підтверджує працевлаштування у роботодавця-спонсора",
        healthInsurance: "Обов'язкове для оформлення посвідки на проживання",
        travelInsurance: "Потрібне на період до отримання NFZ",
        bankConfirmation: "Потрібне для відкриття банківського рахунку",
        proofOfFunds: "Підтверджує наявність коштів для проживання",
        relocationLetter: "Доступно з Premium",
        taxResidency: "Доступно з Premium",
        biometricConfirmation: "Завантажте після складання біометрії в Urząd do Spraw Cudzoziemców",
        addressConfirmation: "Zaświadczenie про реєстрацію адреси (zameldowanie)",
        residencePermitScan: "Скан отриманої карти побиту (kartę pobytu)",
        taxIdConfirmation: "Підтвердження присвоєння NIP з податкової",
        employmentContract: "Підписаний трудовий договір (umowa o pracę)",
        businessRegistrationConfirmation: "Підтвердження реєстрації CEIDG",
      },
      uploadGuides: {
        passportScan:
          "Сфотографуйте розворот паспорта з фото та особистими даними, а також сторінку з візою чи відміткою про перебування, якщо вона є. Знімок має бути чітким, без відблисків і обрізаних країв.",
        passportPhoto: "Завантажте фото на документи: анфас, без головного убору, на світлому однотонному фоні, відповідно до біометричних вимог.",
        peselForm: "Завантажте заповнену та підписану анкету на присвоєння номера PESEL.",
        peselLetter: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        workPermitApp: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        sponsorshipLetter: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        healthInsurance: "Завантажте поліс медичного страхування — мають бути видні термін дії та номер поліса.",
        travelInsurance: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        bankConfirmation: "Завантажте виписку або довідку з банку із зазначенням номера рахунку та даних власника.",
        proofOfFunds: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        relocationLetter: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        taxResidency: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        biometricConfirmation: "Завантажте підтвердження або квитанцію про запис на здачу біометричних даних.",
        addressConfirmation: "Завантажте договір оренди або підтвердження реєстрації адреси (zameldowanie) із чітко видимою адресою.",
        residencePermitScan: "Сфотографуйте карту побиту з обох сторін — лицьову сторону з фото та зворотну з даними.",
        taxIdConfirmation: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        employmentContract: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
        businessRegistrationConfirmation: "Зробіть чітке фото або скан документа, усі дані мають бути добре видимі.",
      },
      progressSummary: "Готово: {completed} з {total} документів",
      autoCompleteToast: "✓ Крок виконано автоматично",
      sectionCompleteHeading: "🎉 Розділ завершено!",
      sectionCompleteBody: "Переходьте до наступного кроку.",
      sectionCompleteDismiss: "Продовжити",
      deleteConfirmTitle: "Видалити документ?",
      deleteConfirmBody: "Цю дію не можна скасувати. Документ буде видалено безповоротно.",
      cancelBtn: "Скасувати",
      uploadModal: {
        dropzoneLabel: "Обрати файл",
        dropzoneHint: "PDF, JPG або PNG",
        confirmBtn: "Завантажити",
      },
    },
    housing: {
      title: "Житло в Польщі",
      subtitle: "Знайдіть житло з розумом.",
      rentMarket: "🏆 Топ-4 райони за співвідношенням ціна/якість",
      rentMarketSub: "Наші експерти й тисячі експатів обрали ці райони як найкращі для життя за співвідношенням ціни, комфорту та інфраструктури.",
      distanceToCenter: "{km} км до центру",
      metroAccess: "Є метро",
      noMetro: "Без метро",
      topWebsites: "Найкращі сайти",
      topWebsitesSub: "Де реально шукати оголошення.",
      aiTips: "Поради від AI",
      aiTipsSub: "Практичні поради від тих, хто вже переїхав.",
      visitSite: "Перейти на сайт",
      websiteDescs: {
        olx: "Найбільший сайт оголошень Польщі — найбільший вибір, здебільшого напряму від власників.",
        otodom: "Найякісніші оголошення, хороші фільтри, популярний серед агентств.",
        gratka: "Менше, але надійно — добре підходить для менших міст.",
      },
      tips: [
        {
          title: "Остерігайтеся шахраїв із депозитом",
          body: "Ніколи не переказуйте депозит, не побачивши квартиру особисто або на відеодзвінку з господарем. Шахраї полюють на іноземців із занадто вигідними оголошеннями.",
        },
        {
          title: "Вимагайте договір польською",
          body: "Договір оренди (umowa najmu) має бути складений польською мовою, щоб мати юридичну силу. Зробіть завірений переклад, перш ніж підписувати те, що не до кінця розумієте.",
        },
        {
          title: "Плануйте бюджет не лише на оренду",
          body: "Очікуйте заставу (1–2 місячні ставки) плюс czynsz — експлуатаційні витрати будинку, які сплачуються окремо від оренди та комунальних послуг.",
        },
      ],
      topDistrictDescs: {
        mokotow: "Найкращий баланс ціни та якості. Тихий, зелений, метро.",
        wola: "Сучасний район, багато новобудов, близько до центру.",
        zoliborz: "Затишний, безпечний, улюблений серед експатів.",
        ochota: "Тихий район поруч із центром, хороша інфраструктура, метро, популярний серед студентів і експатів.",
      },
      bestValueBadge: "Рекомендуємо",
      expatsChoiceBadge: "Вибір експатів",
      showAllDistricts: "Показати всі {count} районів міста {city} →",
      showFewerDistricts: "Згорнути список районів",
      roomsLabel: "Кімнат",
      roomsAny: "Будь-яке",
      roomsStudio: "Студія",
      rooms2: "2 кімнати",
      rooms3: "3 кімнати",
      noDistrictsText: "Немає даних по районах для {city}.",
      searchWithFiltersBtn: "Шукати з цими фільтрами →",
      guides: {
        olx: {
          heading: "Як шукати житло на OLX",
          steps: [
            "Перейдіть у розділ «Нерухомість» → «Оренда» і задайте фільтри за містом, ціною та кількістю кімнат.",
            "Зберігайте оголошення та увімкніть сповіщення про нові пропозиції за вашими критеріями.",
            "Пишіть продавцю через вбудований чат — ніколи не переказуйте гроші до особистого перегляду квартири.",
            "Домовтеся про перегляд і перевірте стан квартири та документи перед підписанням договору.",
          ],
          aiQuestion: "Як шукати житло на OLX?",
        },
        otodom: {
          heading: "Як шукати житло на Otodom",
          steps: [
            "Використовуйте розширені фільтри Otodom — метро, поверх, наявність меблів — щоб звузити пошук.",
            "Звертайте увагу на позначку «від власника» — часто це означає відсутність комісії агентству.",
            "Зв'яжіться з автором оголошення через сайт і уточніть дату перегляду.",
            "Перед підписанням договору попросіть протокол приймання-передачі квартири (protokół zdawczo-odbiorczy).",
          ],
          aiQuestion: "Як шукати житло на Otodom?",
        },
        gratka: {
          heading: "Як шукати житло на Gratka",
          steps: [
            "Задайте регіон і бюджет у пошуку Gratka — сервіс особливо сильний за межами великих міст.",
            "Перевіряйте дату публікації оголошення — старі оголошення часто вже неактуальні.",
            "Зв'яжіться з продавцем по телефону або через форму на сайті, щоб уточнити деталі.",
            "Перед сплатою застави завжди просіть договір оренди та перевіряйте право власності.",
          ],
          aiQuestion: "Як шукати житло на Gratka?",
        },
      },
    },
    banks: {
      title: "Банки в Польщі",
      subtitle: "Порівняйте рахунки, створені для новоприбулих.",
      openAccount: "Відкрити рахунок",
      bestForExpats: "Найкращий для експатів",
      features: {
        pkobp: ["Найбільша мережа відділень у Польщі", "Додаток польською та англійською", "Безкоштовні варіанти студентського рахунку"],
        mbank: ["Повністю англомовний додаток і підтримка", "Миттєве відкриття рахунку онлайн", "Без комісій навіть без номера PESEL"],
        santander: ["Мультивалютні рахунки", "Міжнародна банківська мережа", "Безкоштовне використання картки за кордоном"],
        revolut: ["PESEL не потрібен для початку", "Мультивалютний гаманець", "Найкращий варіант для цифрових кочівників"],
      },
      guide: {
        heading: "Як відкрити рахунок у Польщі — покроково",
        steps: [
          "🪪 Отримайте PESEL — без нього більшість банків не відкриють рахунок",
          "📄 Підготуйте документи — паспорт, підтвердження адреси (договір оренди), PESEL",
          "🏦 Оберіть банк — онлайн-банки (mBank, ING) простіші для іноземців",
          "📱 Відкрийте онлайн або особисто — mBank і Revolut можна відкрити повністю онлайн",
          "✅ Активуйте картку — прийде поштою протягом 5-7 днів",
        ],
        tipsHeading: "💡 Поради",
        tips: [
          "mBank і ING — найлояльніші до іноземців",
          "Revolut відкривається без PESEL за 10 хвилин",
          "PKO BP і Pekao вимагають особистого візиту",
          "Візьміть із собою договір оренди як підтвердження адреси",
        ],
      },
      openAccountAt: "Як відкрити рахунок у {bank}",
      guides: {
        pkobp: {
          heading: "Як відкрити рахунок у PKO BP",
          steps: [
            "Отримайте PESEL — PKO BP, як і більшість традиційних банків, вимагає його для відкриття рахунку.",
            "Запишіться на прийом до найближчого відділення — у PKO BP найбільша мережа в Польщі, знайти відділення легко.",
            "Візьміть із собою паспорт, PESEL і підтвердження адреси (наприклад, договір оренди).",
            "Підпишіть договір на місці — співробітник допоможе обрати відповідний тип рахунку й оформити картку.",
          ],
          aiQuestion: "Як відкрити рахунок у PKO BP?",
        },
        mbank: {
          heading: "Як відкрити рахунок у mBank",
          steps: [
            "Завантажте застосунок mBank або зайдіть на сайт — весь процес можна пройти онлайн, без візиту до відділення.",
            "Заповніть заявку та підтвердьте особу через відеодзвінок або кур'єра з перевіркою паспорта.",
            "Вкажіть PESEL, якщо він у вас уже є — це пришвидшить відкриття рахунку, але не обов'язково на старті.",
            "Дочекайтеся схвалення — зазвичай рахунок відкривається протягом одного дня, застосунок повністю англійською.",
          ],
          aiQuestion: "Як відкрити рахунок у mBank?",
        },
        santander: {
          heading: "Як відкрити рахунок у Santander",
          steps: [
            "Оберіть тип рахунку — Santander пропонує мультивалютні рахунки, зручні для міжнародних переказів.",
            "Підготуйте паспорт, PESEL і підтвердження адреси.",
            "Запишіться на прийом до відділення або подайте заявку онлайн, якщо це доступно для вашого статусу.",
            "Активуйте картку та підключіть мобільний банкінг — карткою можна безкоштовно користуватися за кордоном.",
          ],
          aiQuestion: "Як відкрити рахунок у Santander?",
        },
        revolut: {
          heading: "Як відкрити рахунок у Revolut",
          steps: [
            "Завантажте застосунок Revolut і зареєструйтеся за номером телефону — відвідувати відділення не потрібно.",
            "Підтвердьте особу через селфі та скан паспорта прямо в застосунку.",
            "PESEL не потрібен для відкриття рахунку — це найшвидший спосіб для тих, хто щойно приїхав.",
            "Поповніть рахунок і почніть користуватися мультивалютним гаманцем і карткою.",
          ],
          aiQuestion: "Як відкрити рахунок у Revolut?",
        },
      },
      howToOpenLabel: "Як відкрити рахунок?",
      emptyText: "Поки немає даних по банках.",
      faqHeading: "Часті питання про відкриття рахунку",
      faqCaption: "Клік по питанню одразу відкриває чат із готовою відповіддю від ШІ",
      faqQuestions: [
        "Як відкрити рахунок без PESEL?",
        "Які документи потрібні?",
        "Скільки днів займає відкриття?",
        "Чи можна відкрити онлайн?",
      ],
    },
    medicine: {
      title: "Медицина в Польщі",
      subtitle: "Оформіть страховку і знайдіть лікаря швидко.",
      clinicsTitle: "Клініки",
      clinicsSub: "Варіанти з англо-, російсько- та україномовним персоналом.",
      warsaw: "Варшава",
      languages: {
        ruUa: "Говорять російською та українською",
        en: "Говорять англійською",
        ru: "Говорять російською",
        ua: "Говорять українською",
      },
      bookBtn: "Записатися",
      nfzTitle: "Як отримати медичну страховку NFZ",
      nfzSteps: [
        "Влаштуйтеся на роботу за трудовим договором (umowa o pracę) — роботодавець автоматично реєструє вас у ZUS",
        "Отримайте номер PESEL",
        "Підтвердіть страховку на сайті eWUŚ (ewus.nfz.gov.pl)",
        "Запишіться до лікаря в будь-яку державну клініку",
      ],
      nfzAiQuestion: "Як зареєструватися в NFZ?",
      stepLabel: "Крок",
      emergencyTitle: "Швидка допомога та невідкладні випадки",
      emergencyNumber: "Номер швидкої допомоги в Польщі: 112 або 999",
      emergencyEr: "Найближче відділення невідкладної допомоги (SOR) приймає без запису та безкоштовно",
      emergencyPharmacy: "Чергова аптека:",
      usefulSitesTitle: "Корисні сайти",
      usefulSites: [
        { url: "znany-lekarz.pl", desc: "Запис до лікаря онлайн — є російськомовні лікарі" },
        { url: "ewus.nfz.gov.pl", desc: "Перевірити свою страховку NFZ" },
        { url: "nfz.gov.pl", desc: "Офіційний сайт NFZ" },
        { url: "aptekadyzurna.pl", desc: "Знайти чергову аптеку" },
      ],
      dentalTitle: "Стоматологія",
      dentalNfz: "NFZ покриває базове лікування — пломби, видалення зубів",
      dentalPrivate: "Приватна стоматологія: 150–400 злотих за прийом",
      dentalChains: "Рекомендовані мережі: Dental+, Medicover Stomatologia",
      aiPickHeading: "Підбір клініки з ШІ",
      aiPickSubtitle: "Опишіть свою проблему або якого лікаря чи клініку вам потрібно — ми підберемо відповідні варіанти.",
      aiPickPlaceholder: "Наприклад: болить зуб, потрібен стоматолог поруч із центром",
      searchPlaceholder: "Пошук за назвою або районом",
      allCategoriesLabel: "Всі категорії",
      allDistrictsLabel: "Всі райони",
      clinicsCountTemplate: "{count} клінік",
      notFoundText: "Нічого не знайдено для {city}.",
      askAiQuestionTemplate: 'Розкажи детальніше про клініку "{name}" у місті {city}: чи варто її обрати, які плюси й мінуси, на що звернути увагу?',
      learnMoreBtn: "Детальніше",
    },
    insurance: {
      title: "Страхування в Польщі",
      subtitle: "Медичне, автомобільне та інші види страхування",
      compareTitle: "Державна vs Приватна страховка",
      nfzLabel: "Державна страховка NFZ",
      nfzTooltip: "NFZ — національна система охорони здоров'я Польщі",
      privateLabel: "Приватна",
      rows: [
        { label: "Вартість", nfz: "Безкоштовно при трудових відрахуваннях", pvt: "150–400 злотих/місяць" },
        { label: "Час очікування", nfz: "Від тижнів до місяців до фахівців", pvt: "Від пари днів до того ж дня" },
        { label: "Мовна підтримка", nfz: "Здебільшого лише польська", pvt: "Англійська, часто російська/українська" },
        { label: "Охоплення", nfz: "Широке, але обмежений вибір лікарів", pvt: "Обирайте свою клініку та лікаря" },
      ],
      learnMoreBtn: "Дізнатися більше",
      types: {
        medical: { name: "Медичне страхування", provider: "Medicover", price: "150–400 злотих/міс", desc: "Приватне медичне страхування для швидкого доступу до лікарів-фахівців без черг." },
        car: { name: "Автомобільне (OC/AC)", provider: "PZU", price: "800–2500 злотих/рік", desc: "Обов'язкове ОС (OC) плюс розширене КАСКО (AC) для повного захисту авто." },
        home: { name: "Страхування житла", provider: "Warta", price: "200–600 злотих/рік", desc: "Захист квартири чи будинку від пожежі, затоплення та крадіжки майна." },
        travel: { name: "Туристичне страхування", provider: "Allianz", price: "20–80 злотих/поїздка", desc: "Покриття медичних витрат і форс-мажорів під час подорожей Європою." },
      },
      guides: {
        medical: {
          heading: "Як оформити медичне страхування",
          steps: [
            "Оберіть тип покриття — базовий пакет або розширений зі стоматологією та спеціалістами.",
            "Порівняйте пропозиції кількох страховиків (LUX MED, Medicover, Signal Iduna) за ціною та мережею клінік.",
            "Оформіть поліс онлайн або в офісі страхової компанії — зазвичай потрібен паспорт і PESEL.",
            "Збережіть номер поліса — він знадобиться при записі до лікаря.",
          ],
          aiQuestion: "Як оформити медичне страхування в Польщі?",
        },
        car: {
          heading: "Як оформити автострахування (OC/AC)",
          steps: [
            "OC (обов'язкова цивільна відповідальність) вимагається законом для будь-якого зареєстрованого автомобіля.",
            "Порівняйте тарифи OC у кількох страховиків — ціна сильно варіюється залежно від історії водіння.",
            "За бажанням додайте AC (страхування від викрадення та пошкоджень) для повнішого захисту.",
            "Оформіть поліс онлайн за кілька хвилин — знадобляться дані автомобіля та водійські права.",
          ],
          aiQuestion: "Як оформити автострахування в Польщі?",
        },
        home: {
          heading: "Як оформити страхування житла",
          steps: [
            "Визначте, що потрібно застрахувати — саме житло, майно всередині чи цивільну відповідальність.",
            "Зберіть базову інформацію про квартиру: площа, адреса, тип будівлі.",
            "Порівняйте пропозиції кількох страховиків — багато банків пропонують знижку при оформленні разом з іпотекою.",
            "Оформіть поліс онлайн або через агента і збережіть підтвердження для орендодавця, якщо потрібно.",
          ],
          aiQuestion: "Як оформити страхування житла в Польщі?",
        },
        travel: {
          heading: "Як оформити туристичне страхування",
          steps: [
            "Визначте тривалість і мету поїздки — від цього залежить потрібний рівень покриття.",
            "Перевірте, що поліс покриває медичні витрати, евакуацію та скасування поїздки.",
            "Порівняйте пропозиції онлайн — оформлення займає пару хвилин і не потребує особистого візиту.",
            "Збережіть поліс у телефоні або роздрукуйте — він може знадобитися на кордоні чи в лікарні.",
          ],
          aiQuestion: "Як оформити туристичне страхування?",
        },
      },
      emptyText: "Поки немає даних по страховках.",
      aiPromptHeading: "Не знаєте, що обрати?",
      aiPromptSubtitle: "Запитайте ШІ — він врахує вашу ситуацію і підкаже, що підійде саме вам",
      aiPromptCta: "Запитати",
      aiPromptQuestion:
        "Що мені обрати — державне страхування NFZ чи приватне? Врахуй мою ситуацію: чи працюю я офіційно, чи потрібен швидкий доступ до лікарів, чи важливий бюджет.",
    },
    work: {
      title: "Робота в Польщі",
      subtitle: "Контракти, зарплати і де шукати.",
      contractVsB2B: "Трудовий договір проти B2B",
      salarySearch: "Пошук зарплати",
      salarySearchSub: "Введіть професію, щоб дізнатися середню зарплату.",
      placeholder: "наприклад, розробник, медсестра, водій...",
      averageSalary: "Середня зарплата в Польщі",
      inEuros: "У євро",
      salaryNote: "* Дані приблизні, залежать від досвіду та міста.",
      noExactData: "Точних даних щодо цієї професії поки немає — показуємо середню по країні.",
      jobSites: "Сайти вакансій",
      visitSite: "Перейти на сайт",
      searchByProfession: "Шукати вакансії за цією професією",
      viewVacanciesBtn: "Переглянути вакансії",
      employmentSubtitle: "Трудовий договір",
      b2bSubtitle: "Самозайнятість",
      b2bContractName: "Договір B2B",
      employmentFeatures: [
        "Оплачувана відпустка, лікарняний і термін попередження",
        "Роботодавець сплачує внески в ZUS",
        "Простіший шлях до посвідки на проживання",
      ],
      b2bFeatures: [
        "Вища зарплата на руки, нижча податкова ставка",
        "Ви самі займаєтеся ZUS і виставленням рахунків",
        "Більше гнучкості, менше стабільності",
      ],
      jobSiteDescs: {
        pracuj: "Найбільша дошка вакансій Польщі, усі галузі.",
        nofluff: "Орієнтований на IT, зарплати вказані одразу.",
        linkedin: "Міжнародні вакансії, добре підходить для англомовних.",
      },
      guides: {
        employment: {
          heading: "Як оформити трудовий договір (umowa o pracę)",
          steps: [
            "Роботодавець зобов'язаний укласти з вами письмовий трудовий договір до початку роботи.",
            "Перевірте, що в договорі вказані посада, зарплата, графік і випробувальний термін, якщо він є.",
            "Роботодавець реєструє вас у ZUS (соціальне страхування) — це дає доступ до NFZ і пенсійних внесків.",
            "Збережіть копію договору — вона знадобиться для посвідки на проживання та інших процедур.",
          ],
          aiQuestion: "Як оформити трудовий договір у Польщі?",
        },
        b2b: {
          heading: "Як оформити контракт B2B (самозайнятість)",
          steps: [
            "Зареєструйте індивідуальну діяльність (JDG) через сайт CEIDG — це можна зробити онлайн за один день.",
            "Оберіть форму оподаткування (загальні правила, лінійний податок або ryczałt) разом із бухгалтером.",
            "Підпишіть контракт B2B з компанією-замовником — це цивільно-правовий, а не трудовий договір.",
            "Щомісяця сплачуйте внески до ZUS самостійно та подавайте податкову декларацію.",
          ],
          aiQuestion: "Як оформити контракт B2B у Польщі?",
        },
        pracuj: {
          heading: "Як шукати роботу на Pracuj.pl",
          steps: [
            "Створіть профіль і завантажте резюме (CV) — багато вакансій дозволяють відгукнутися в один клік.",
            "Використовуйте фільтри за містом, зарплатою та рівнем англійської/польської мови.",
            "Налаштуйте сповіщення за ключовими словами вашої професії, щоб не пропустити нові вакансії.",
            "Готуйтеся, що частина співбесід проходить польською — уточнюйте мову інтерв'ю заздалегідь.",
          ],
          aiQuestion: "Як шукати роботу на Pracuj.pl?",
        },
        nofluff: {
          heading: "Як шукати роботу на NoFluffJobs",
          steps: [
            "NoFluffJobs спеціалізується на IT — тут зручно фільтрувати вакансії за стеком технологій.",
            "Зверніть увагу, що вакансії показують вилку зарплати одразу — це спрощує порівняння пропозицій.",
            "Заповніть профіль англійською мовою — багато IT-компаній у Польщі працюють англійською.",
            "Відгукуйтеся напряму через сайт — більшість компаній відповідають протягом кількох днів.",
          ],
          aiQuestion: "Як шукати роботу на NoFluffJobs?",
        },
        linkedin: {
          heading: "Як шукати роботу на LinkedIn",
          steps: [
            "Заповніть профіль повністю — досвід, навички та рекомендації підвищують шанс, що рекрутер знайде вас сам.",
            "Увімкніть статус «Open to work», видимий лише рекрутерам, щоб не афішувати пошук поточному роботодавцю.",
            "Використовуйте фільтри за локацією (Poland/Warsaw) і віддаленою роботою для точного пошуку.",
            "Пишіть рекрутерам у особисті повідомлення — прямий контакт часто ефективніший за відгук через форму.",
          ],
          aiQuestion: "Як шукати роботу на LinkedIn?",
        },
      },
      notFoundHeading: "Такої професії немає в базі",
      notFoundTryThese: "Спробуйте одну з цих професій:",
      perMonth: "місяць",
      employmentFullSubtitle: "З усіма гарантіями працівника",
      faqHeading: "Не знаєте, що обрати? Запитайте ШІ",
      faqCaption: "Клік по питанню одразу відкриває чат із готовою відповіддю від ШІ",
      faqQuestions: [
        "Що мені обрати: трудовий договір чи B2B?",
        "Як перейти з B2B на трудовий договір?",
        "Які податки я сплачую при B2B?",
        "Що я втрачаю, якщо працюю без договору?",
      ],
    },
    community: {
      title: "Спільноти",
      subtitle: "Telegram-канали та чати для тих, хто переїжджає до Польщі.",
      join: "Приєднатися",
      members: "учасників",
      cats: { all: "Усі", housing: "Житло", work: "Робота", sport: "Спорт", family: "Сім'я", general: "Загальне" },
    },
    dashboard: {
      relocation: "Переїзд до {country}",
      subtitle: "Ваш персональний план, оновлюється в реальному часі.",
      subtitleTemplate: "{from} → {city} · Мета: {goal} · Прогрес {percent}%",
      subtitleTemplateNoCity: "{from} · Мета: {goal} · Прогрес {percent}%",
      overallProgress: "Загальний прогрес",
      openBtn: "Відкрити",
      expandBtn: "Розгорнути",
      collapseBtn: "Згорнути",
      whatNextBtn: "Що робити далі",
      stepsCompletedTemplate: "{done} із {total} кроків виконано",
      docsReadyTemplate: "{done} із {total} документів готово",
      currentPhasePrefix: "Зараз: {phase}",
      allPhasesDone: "Усі етапи завершено",
      motivational: {
        noRoute: "Оберіть маршрут — і тут з'явиться ваш особистий план переїзду.",
        allDone: "Усі документи оформлено. Ви повністю готові до переїзду!",
        almostThere: "Ви майже біля мети — зовсім трохи залишилось до повної легалізації.",
        thirdDone: "Більше третини шляху пройдено. Так тримати!",
        goodStart: "Чудовий початок! Кожен оформлений документ наближає вас до мети.",
        startFirst: "Почніть із першого кроку — і весь шлях стане зрозумілішим.",
      },
      timelineSections: {
        before_departure: "До від'їзду",
        first_week: "Перший тиждень",
        first_month: "Перший місяць",
        longterm: "Довгостроково",
      },
      countdown: {
        heading: "У вас 30 днів легального перебування за візовим режимом",
        remaining: "Залишилося {days} днів — потрібно встигнути подати на PESEL і карту побиту",
        expired: "30-денний термін легального перебування закінчився — якнайшвидше подайте документи на легалізацію",
      },
      phases: {
        beforeDeparture: "Підготовка перед від'їздом",
        legalization: "Легалізація — перші 30 днів",
        residenceCard: "Оформлення карти побиту (ВНП)",
        workTaxes: "Робота і податки",
      },
      phaseDescriptions: {
        beforeDeparture: "Створення акаунту, заповнення анкети та перевірка візової категорії — найперші кроки, ще до переїзду.",
        legalization: "Подання документів, складання біометрії та реєстрація адреси проживання (zameldowanie) — обов'язкові кроки в перший місяць після приїзду.",
        residenceCard: "Подання заяви на карту побиту (kartę pobytu) — посвідку на проживання — та отримання самої картки.",
        workTaxes: "Отримання податкового номера (NIP) та офіційне оформлення трудового договору чи бізнесу.",
      },
      phaseStatus: {
        done: "Готово",
        inProgress: "У процесі",
        waiting: "Очікує",
      },
      sidebar: {
        tagline: "Ваш план переїзду",
        home: "Головна",
        myPlanSection: "МІЙ ПЛАН",
        roadmap: "Дорожня карта",
        checklist: "Чекліст",
        aiAssistant: "AI Асистент",
        servicesSection: "СЕРВІСИ",
        landingLinkAria: "Перейти на головну сторінку",
      },
      route: {
        heading: "Ваші варіанти переїзду",
        recommended: "Рекомендовано",
        viewFullPlan: "Дивитися повний план",
        hidePlan: "Сховати план",
        successProbability: "Ймовірність успіху",
        timeline: "Терміни",
        cost: "Приблизна вартість",
        requiredDocuments: "Необхідні документи",
        pros: "Плюси",
        cons: "Мінуси",
        reasoningTitle: "Чому цей шлях",
        checklistHeading: "Ваш персональний чек-лист",
        loading: "Аналізуємо ваші варіанти переїзду…",
        stepLabel: "Крок",
      },
      steps: {
        account: { title: "Створіть акаунт", desc: "Все готово." },
        onboarding: { title: "Заповніть анкету онбордингу", desc: "Ми використали її, щоб скласти ваш план." },
        visa: {
          title: "Перевірте візову відповідність",
          euDesc: "Як громадянину ЄС/ЄЕЗ, вам не потрібна віза — просто зареєструйте адресу після прибуття.",
          byCountry: {
            poland: {
              work: "Вам може підійти національна робоча віза або Karta Pobytu, прив'язана до роботодавця.",
              study: "Вам знадобиться національна віза або Karta Pobytu, прив'язана до навчання.",
              business: "Власники бізнесу можуть подати на посвідку на проживання, пов'язану з веденням компанії в Польщі.",
              family: "Дозволи на возз'єднання сім'ї доступні, якщо у вас є родич із легальною посвідкою на проживання в Польщі.",
            },
            germany: {
              work: "Вам може підійти Job Seeker Visa, EU Blue Card або трудовий Aufenthaltstitel.",
              study: "Вам знадобиться студентська віза (Aufenthaltstitel zum Studium), прив'язана до зарахування.",
              business: "У Німеччині є посвідка на проживання для самозайнятих (Aufenthaltserlaubnis für selbständige Tätigkeit).",
              family: "Можуть підійти візи возз'єднання сім'ї (Familiennachzug), якщо у вас є близькі родичі, які вже проживають у Німеччині.",
            },
            spain: {
              work: "Вам може підійти звичайна робоча віза або EU Blue Card.",
              study: "Вам знадобиться студентська віза, прив'язана до зарахування та фінансових коштів.",
              business: "Може підійти віза підприємця або інвестора (включно з маршрутом Golden Visa).",
              family: "Можуть підійти візи возз'єднання сім'ї (reagrupación familiar), якщо у вас є близькі родичі, які вже проживають в Іспанії.",
            },
          },
        },
        business: {
          title: "Зареєструйте бізнес",
          desc: "Оформіть структуру компанії та податкову реєстрацію перед подачею на посвідку на проживання для бізнесу.",
        },
        documents: { title: "Завантажте необхідні документи", desc: "Потрібно 7 документів — 2 у вас вже є." },
        biometric: { title: "Запишіться на біометрію", desc: "Відкриється після перевірки ваших документів." },
        residence: { title: "Подайте на посвідку на проживання", desc: "Відкриється після прийому з біометрії." },
        address: { title: "Зареєструйте місцеву адресу", desc: "Останній крок перед тим, як ви повністю облаштуєтеся." },
        taxId: {
          title: "Отримайте податковий номер",
          byCountry: {
            poland: "Оформіть NIP (податковий номер) у місцевій податковій інспекції.",
            germany: "Отримайте Steuer-ID поштою після реєстрації за адресою (Anmeldung).",
            spain: "Оформіть NIE (номер іноземця) — він потрібен майже для всього в Іспанії.",
          },
        },
        employmentRegistration: {
          title: "Оформіть працевлаштування або бізнес офіційно",
          byCountry: {
            poland: "Підпишіть umowa o pracę/zlecenie або зареєструйте бізнес у ZUS.",
            germany: "Підпишіть трудовий договір і зареєструйтеся у Finanzamt та системі соціального страхування.",
            spain: "Оформіть alta в Seguridad Social або Hacienda як співробітник або самозайнятий.",
          },
        },
      },
      stepGuides: {
        visa_eligibility: {
          heading: "Як оформити візу або підставу для в'їзду",
          steps: [
            "Визначте тип візи або підставу для в'їзду залежно від вашої мети (робота, навчання, бізнес, возз'єднання сім'ї).",
            "Зберіть базовий пакет документів: закордонний паспорт, запрошення або підтвердження мети поїздки, страховку, фінансові гарантії.",
            "Подайте заяву до консульства або візового центру країни переїзду.",
            "Дочекайтеся рішення і, за потреби, пройдіть співбесіду.",
            "Після отримання візи уточніть терміни в'їзду та що робити після прибуття.",
          ],
        },
        business_registration: {
          heading: "Як зареєструвати бізнес",
          steps: [
            "Оберіть організаційно-правову форму (ФОП, ТОВ та аналоги) залежно від країни.",
            "Підготуйте установчі документи та підтвердження юридичної адреси.",
            "Подайте заяву на реєстрацію у відповідний державний реєстр.",
            "Отримайте податковий і статистичний номери компанії.",
            "Відкрийте розрахунковий рахунок на ім'я бізнесу.",
          ],
        },
        documents: {
          heading: "Які документи потрібно підготувати",
          steps: [
            "Зберіть оригінали та копії основних документів: паспорт, свідоцтва, дипломи (за потреби — з апостилем).",
            "Зробіть нотаріально завірені переклади документів мовою країни переїзду, якщо це вимагається.",
            "Завантажте скани документів у розділ «Документи» в ReloAI, щоб відстежувати їх статус.",
            "Перевіряйте статус кожного документа: Готово, На перевірці або Відсутній.",
            "Тримайте оригінали під рукою — вони можуть знадобитися при особистій подачі в держоргани.",
          ],
        },
        biometric: {
          heading: "Як пройти біометрію",
          steps: [
            "Запишіться на подання біометричних даних до міграційної служби або консульства — часто це можна зробити онлайн.",
            "Візьміть із собою паспорт, запрошення на прийом і підтверджувальні документи.",
            "На прийомі у вас знімуть відбитки пальців і зроблять фото.",
            "Збережіть розписку або номер заявки — за ним можна відстежувати готовність документа.",
            "Дочекайтеся повідомлення про готовність картки чи дозволу.",
          ],
        },
        address_registration: {
          heading: "Як зареєструвати адресу проживання",
          steps: [
            "Знайдіть постійне або тимчасове житло і отримайте від власника згоду на реєстрацію (договір оренди або згода власника).",
            "Підготуйте паспорт і документ, що підтверджує право користування житлом.",
            "Зверніться до місцевої адміністрації особисто або через портал держпослуг.",
            "Заповніть заяву про реєстрацію за місцем проживання.",
            "Отримайте підтвердження реєстрації — воно знадобиться для подальших процедур (ВНП, податковий номер тощо).",
          ],
        },
        residence_permit: {
          heading: "Як отримати посвідку на проживання",
          steps: [
            "Переконайтеся, що у вас є підстава для подачі: робота, навчання, бізнес або возз'єднання сім'ї.",
            "Зберіть пакет документів: паспорт, фото, підтвердження мети перебування, страховку, підтвердження доходу та адреси.",
            "Подайте заяву до місцевого міграційного управління — особисто або онлайн.",
            "Пройдіть біометрію, якщо це не було зроблено раніше.",
            "Дочекайтеся рішення — це може зайняти від кількох тижнів до кількох місяців, відстежуйте статус заяви.",
          ],
        },
        tax_id: {
          heading: "Як отримати податковий ідентифікаційний номер",
          steps: [
            "Визначте, який номер вам потрібен: загальний ідентифікаційний чи податковий номер для бізнесу.",
            "Зберіть паспорт і, за наявності, підтвердження реєстрації адреси.",
            "Подайте заяву до місцевої адміністрації або податкової служби.",
            "Дочекайтеся присвоєння номера — часто це можна зробити в день звернення.",
            "Збережіть підтверджувальний документ — номер знадобиться для працевлаштування, банку та медичної страховки.",
          ],
        },
        employment_registration: {
          heading: "Як оформити працевлаштування",
          steps: [
            "Уточніть у роботодавця, який тип дозволу на роботу чи трудового договору вам потрібен.",
            "Підготуйте документи: паспорт, посвідку на проживання або робочу візу, диплом за потреби.",
            "Підпишіть трудовий договір і переконайтеся, що роботодавець подав повідомлення до відповідних органів (якщо потрібно).",
            "Отримайте номер соціального страхування, якщо він ще не оформлений.",
            "Перевірте, що всі внески та податки утримуються коректно з першої зарплати.",
          ],
        },
      },
      howToGetQuestion: "Як отримати: {title}?",
      home: {
        flightHeading: "Ваш шлях",
        flightSub: "Що більше кроків виконано, то ближче літак до вашого пункту призначення.",
        flightOriginPlaceholder: "Ваша країна",
        greeting: "Привіт, {name}! 👋",
        guestGreeting: "Привіт! 👋",
        greetingSubtitle: "Ось як просувається ваш переїзд до {country}.",
        stepsLabel: "Кроків виконано",
        phaseLabel: "Поточний етап",
        daysLabel: "Днів з реєстрації",
        quickActionsHeading: "Швидкі дії",
        quickActionRoadmapDesc: "Перевірте прогрес по кроках",
        quickActionDocumentsDesc: "Завантажуйте та відстежуйте документи",
        quickActionAiDesc: "Поставте запитання AI-асистенту",
        quickActionBanksDesc: "Знайдіть банк для новоприбулих",
        quickActionWorkDesc: "Шукайте роботу та дізнавайтеся зарплати",
        currentStepCta: "Перейти до кроку →",
      },
    },
    guideCard: {
      whenToGet: "Коли оформлювати",
      whereToSubmit: "Куди подавати",
      showOnMap: "Показати на карті",
      onMap: "На карті",
      workingHours: "Години роботи",
      onlineBooking: "Запис онлайн",
      cost: "Вартість",
      waitingTime: "Термін очікування",
      requiredDocs: "Документи",
      howToApply: "Як оформити",
      tips: "Поради",
      commonMistakes: "Часті помилки",
      officialSite: "Офіційний сайт",
      downloadForm: "Завантажити бланк",
      fillWithAi: "Заповнити з ШІ",
      askAi: "Запитати ШІ",
      askAiAriaTemplate: "Запитати ШІ про {name}",
      askAiBankQuestionTemplate:
        "Розкажи детальніше про {name}: як відкрити рахунок, які документи потрібні і на що звернути увагу?",
      askAiTopicQuestionTemplate:
        'Розкажи детальніше про "{name}": як оформити, які документи потрібні і на що звернути увагу?',
      yourBank: "Ваш банк",
      chooseBank: "Обрати банк",
      bankInfo: "Інформація про банк",
      classicAccount: "Класичний рахунок",
      moreDetails: "Детальніше",
      allTag: "Усі",
      citizenshipNote: "Показані гайди, актуальні для вашого громадянства.",
      loading: "Завантаження…",
      searchGeneric: "Пошук",
      searchBanks: "Пошук банку",
      searchInsurance: "Пошук страховки",
      searchGuides: "Пошук гайда",
      important2026Badge: "Важливо 2026",
      moreBanksTemplate: "Ще {n} банків",
      statusDone: "Готово",
      statusNotStarted: "Не розпочато",
      urgentAria: "Потребує термінової уваги",
      start: "Почати",
      compareBanksTitle: "Порівняння банків",
      tagsLabel: "Теги",
      tags: { noPesel: "Без PESEL", fullyOnline: "Повністю онлайн", free: "Безкоштовно", multicurrency: "Мультивалютний" },
      headlines: {
        noPesel: "Без PESEL",
        fullyOnline: "Відкрити рахунок онлайн",
        free: "Безкоштовне обслуговування",
        multicurrency: "Мультивалютний рахунок",
      },
    },
    helpButton: {
      label: "Як це отримати?",
      openGuide: "📄 Відкрити інструкцію",
      askAi: "💬 Запитати ШІ",
      askAiFooter: "Залишились питання? Запитати ШІ →",
    },
    appPricing: {
      title: "Оберіть тариф",
      subtitle: "Підберіть відповідний план для переїзду. Змінюйте його будь-коли.",
      activating: "Активація…",
      securedByStripe: "Захищено Stripe",
      mostPopular: "Популярний",
      forever: "назавжди",
      perMonth: "/місяць",
      freeName: "Безкоштовний",
      premiumName: "Premium",
      proName: "Pro",
      freeDesc: "Спробуйте, перш ніж платити.",
      premiumDesc: "Повний супровід вашого переїзду.",
      proDesc: "Для сімей і складних переїздів.",
      freeCta: "Почати безкоштовно",
      premiumCta: "Отримати Premium",
      proCta: "Отримати Pro",
      freeFeatures: [
        "Польща — 1 країна доступна",
        "Чек-лист: превʼю з 5 кроків",
        "5 AI-повідомлень на день",
        "Завантаження та зберігання документів",
        "Повна база адрес",
        "Доступ до спільноти",
        "Підтримка по email",
      ],
      premiumFeatures: [
        "Усі 3 країни (Польща, Німеччина, Іспанія)",
        "Повний чек-лист — усі кроки",
        "50 AI-повідомлень на день",
        "Завантаження та зберігання документів",
        "Повна база адрес (банки, клініки, офіси)",
        "Доступ до спільноти",
        "Підтримка по email",
      ],
      proFeatures: [
        "Все з Premium",
        "Необмежені AI-повідомлення",
        "AI автоматично заповнює документи",
        "Пріоритетна підтримка 24/7",
        "Консультація (1× на місяць)",
        "Ранній доступ до нових країн",
        "Експорт документів у PDF",
      ],
    },
    checkout: {
      secureCheckout: "Безпечна оплата",
      orderSummary: "Підсумок замовлення",
      subscription: "Щомісячна підписка · скасування будь-коли",
      perMonth: "/місяць",
      totalToday: "Разом сьогодні",
      paymentDetails: "Дані оплати",
      cardNumber: "Номер картки",
      expiryDate: "Термін дії",
      cvc: "CVC",
      cardholderName: "Ім'я власника картки",
      processing: "Обробка…",
      trustBadge: "Безпечний платіж · 256-бітне SSL-шифрування · На основі Stripe",
      termsPrefix: "Оплачуючи, ви погоджуєтеся з нашими",
      termsService: "Умовами використання",
      and: "і",
      privacyPolicy: "Політикою конфіденційності",
      payFailed: "Оплата не пройшла. Спробуйте ще раз.",
      payBtn: "Оплатити",
      welcomeToast: "Ласкаво просимо до {plan}! 🎉",
      premiumFeatures: ["Усі 3 країни", "Повний чек-лист", "50 AI-повідомлень на день", "Зберігання документів", "Підтримка по email"],
      proFeatures: ["Все з Premium", "Необмежені AI-повідомлення", "AI заповнює документи", "Пріоритетна підтримка 24/7", "Щомісячна консультація"],
    },
    education: {
      title: "Освіта",
      subtitle: "Мовні курси, школи, дитячі садки та університети — з урахуванням вашої країни.",
      coursesTab: "Мовні курси",
      schoolsTab: "Школи",
      kindergartensTab: "Дитячі садки",
      universitiesTab: "Університети",
      filterAll: "Усі",
      filterPublic: "Державні",
      filterPrivate: "Приватні",
      publicBadge: "Держ.",
      privateBadge: "Приватне",
      learnMore: "Детальніше →",
      rowFormat: "Формат",
      rowLevel: "Рівень",
      rowPrice: "Вартість",
      rowInstruction: "Мова навчання",
      rowAges: "Вік",
      rowWaiting: "Черга",
      rowTuition: "Вартість",
      rowDeadline: "Подача заявок",
      morePrograms: "ще",
      emptyState: "Немає варіантів для обраного фільтра.",
      aiPickHeading: "Підбір з ШІ",
      aiPickSubtitle: "Опишіть, що ви шукаєте — виш, школу, садок або курси — і ми підберемо відповідні варіанти.",
      aiPickPlaceholder: "Наприклад: приватний садок поруч із центром для дитини 3 років",
      findBtn: "Знайти",
      findingBtn: "Підбираємо…",
      resetBtn: "Скинути",
      searchByNamePlaceholder: "Пошук за назвою",
      addressLabel: "Адреса",
      showOnMapBtn: "Показати на карті →",
      forWhomLabel: "Для кого",
      languageLabel: "Мова",
      scheduleLabel: "Графік",
      costLabel: "Вартість",
      documentsLabel: "Документи: ",
      priceOnRequestText: "Уточнюйте ціну",
      askAiBtn: "Запитати ШІ",
      askAiAriaTemplate: "Запитати ШІ про {name}",
      askAiQuestionTemplate: 'Розкажи детальніше про "{name}" у місті {city}: чи варто обрати цей заклад, які плюси й мінуси, на що звернути увагу?',
      needHelpHeading: "Потрібна допомога з вибором? Запитайте ШІ",
      clickHintText: "Клік по питанню одразу відкриває чат з готовою відповіддю від ШІ",
      tabQuestions: {
        universities: [
          "Як подати документи до університету в Польщі?",
          "Чи потрібна нострифікація диплома?",
          "Які стипендії доступні для іноземців?",
        ],
        schools: [
          "Чим відрізняються приватні та державні школи?",
          "Як записати дитину до школи без знання польської?",
          "Які документи потрібні для зарахування?",
        ],
        kindergartens: [
          "Чи потрібен PESEL для дитячого садка?",
          "Як влаштована черга до державних садків?",
          "Скільки коштує приватний дитячий садок?",
        ],
        courses: [
          "Як обрати мовні курси в Польщі?",
          "Чи є безкоштовні курси польської для іноземців?",
          "Скільки часу потрібно, щоб вивчити мову до рівня B1?",
        ],
      },
      banners: {
        poland: {
          courses: "Маєте статус тимчасового захисту? Багато курсів від міста Варшава безкоштовні. Запитайте в місцевому urząd dzielnicy або Powiatowy Urząd Pracy (PUP).",
          schools: "Польські державні школи БЕЗКОШТОВНІ для всіх дітей — включно з українськими біженцями зі статусом тимчасового захисту. Школи пропонують підготовчі класи з інтенсивною підтримкою польської мови.",
          universities: "Громадяни України зі статусом тимчасового захисту можуть навчатися в польських державних університетах на тих самих умовах, що й громадяни Польщі — як правило, без плати за навчання.",
        },
        germany: {
          courses: "Інтеграційний курс BAMF — ваш перший крок: 700 годин німецької (A1–B1) плюс курс суспільствознавства, сильно субсидується або безкоштовний для багатьох типів посвідки на проживання.",
          schools: "Відвідування школи обов'язкове в Німеччині. Новоприбулих дітей визначають у класи прийому з інтенсивною підтримкою німецької мови перед переходом у звичайні класи. Завжди безкоштовно.",
        },
        spain: {
          courses: "Державні школи EOI пропонують дуже доступну іспанську та англійську — запис щовересня. У деяких районах є безкоштовні громадські курси іспанської для новоприбулих.",
          schools: "Усі діти в Іспанії мають конституційне право на освіту незалежно від імміграційного статусу. Державні школи безкоштовні для всіх резидентів. Запитайте у вашій мерії про курси мовної підтримки.",
        },
      },
    },
    aiChat: {
      welcome:
        "Привіт! Я ваш AI-асистент ReloAI. Допоможу з питаннями про переїзд до Польщі, Німеччини або Іспанії. Питайте про документи, житло, банки, медицину та роботу!",
      personalizedGreeting: "Привіт! Бачу, ви плануєте переїзд до {country} з метою «{goal}».",
      personalizedRecommendation: "Судячи з вашого профілю, найкращий варіант для вас: {pathway}. Розповісти детальніше?",
      quickReplies: ["Як отримати PESEL?", "Який банк відкрити?", "Як знайти житло?", "Які документи потрібні?"],
      placeholder: "Запитайте ReloAI про що завгодно...",
      sendAria: "Надіслати повідомлення",
      closeAria: "Закрити",
      connectionError: "Не вдалося зв'язатися з сервером. Перевірте з'єднання і спробуйте знову.",
      fallback: {
        pesel:
          "Щоб отримати номер PESEL у Польщі:\n- Запишіться на прийом в Urząd Miasta (міське управління) вашого району.\n- Візьміть із собою паспорт, візу або посвідку на проживання і підтвердження адреси (підійде договір оренди).\n- Заповніть на місці форму EL-ZAM.\nОбробка зазвичай займає від одного дня до кількох. PESEL знадобиться вам майже для всього надалі — відкриття банківського рахунку, оформлення медичної страховки і підписання договорів.",
        bank:
          "Щодо банків:\n- mBank — найзручніший варіант для експатів, повністю англійською мовою.\n- Revolut — чудово працює навіть до отримання PESEL.\n- PKO BP — найбільша мережа відділень, якщо надаєте перевагу обслуговуванню особисто.\n- Santander — хороший, якщо потрібні мультивалютні рахунки.",
        housing: "Поради щодо житла: шукайте оголошення на OLX, Otodom або Gratka. Ніколи не переказуйте депозит, не оглянувши квартиру особисто або по відеозв'язку. Договір оренди має бути польською мовою, щоб мати юридичну силу. Закладіть у бюджет заставу (оренда за 1–2 місяці) плюс czynsz (плата за обслуговування будинку) понад оренду.",
        documents: "Зазвичай потрібні такі документи: паспорт, заява на візу або посвідку на проживання, підтвердження адреси, довідка про PESEL, поліс медичного страхування і (якщо працюєте) трудовий договір або дозвіл на роботу. Можу детальніше розповісти про будь-який із них.",
        visa: "Візові вимоги залежать від вашого громадянства і країни призначення. Для Польщі більшості громадян не з ЄС потрібна національна віза або посвідка на проживання (Karta Pobytu), пов'язані з роботою, навчанням або сім'єю. Для Німеччини розгляньте Job Seeker Visa, Aufenthaltstitel або EU Blue Card. Для Іспанії — Digital Nomad Visa або звичайні шляхи через робочий/житловий статус і реєстрацію NIE.",
        default: "Я можу допомогти з документами, житлом, банками, медициною або роботою. Що вас цікавить детальніше?",
      },
      actionLabel: "Зробити це в ReloAI →",
      premiumLabel: "Доступно в Premium →",
      pageTitle: "AI Асистент",
      pageSubtitle: "Ваш особистий помічник з переїзду",
      newChat: "Новий чат",
      emptyHistory: "Історія порожня",
      todayLabel: "Сьогодні",
      thisWeekLabel: "На цьому тижні",
      olderLabel: "Раніше",
      deleteChatAria: "Видалити чат",
      assistantName: "ReloAI асистент",
      online: "Онлайн",
      greetingHeading: "Чим можу допомогти?",
      greetingSubtitle: "Задайте питання про переїзд — або оберіть один із прикладів нижче.",
      defaultChatTitle: "Новий чат",
      deleteModalTitle: "Видалити цей чат?",
      deleteModalBody: "Цю дію не можна скасувати. Переписку буде видалено безповоротно.",
      deleteConfirm: "Видалити",
      deleteCancel: "Скасувати",
    },
    demo: {
      bannerText: "Ви перебуваєте в режимі попереднього перегляду. Зареєструйтеся, щоб зберегти прогрес і отримати доступ до всіх функцій.",
      registerNow: "Зареєструватися",
      floatingGreeting: "👋 Ви вивчаєте ReloAI — зареєструйтеся безкоштовно, щоб зберегти прогрес",
      dismissAria: "Закрити",
      promptHeading: "Зареєструйтеся, щоб розблокувати цю функцію",
      promptBody: "Створіть безкоштовний акаунт, щоб зберегти прогрес і відкрити всі функції.",
      promptDismiss: "Можливо, пізніше",
    },
    onboarding: {
      stepLabel: "Крок {current} з {total}",
      back: "Назад",
      cancel: "Скасувати",
      continueBtn: "Продовжити",
      finish: "Готово",
      saving: "Збереження...",
      skip: "Пропустити і заповнити пізніше",
      skipTooltip: "Дайте відповідь на 5 запитань, щоб отримати персональний план переїзду",
      citizenshipLabel: "Громадянство",
      citizenshipPlaceholder: "Знайдіть країну вашого громадянства...",
      currentCountryLabel: "Країна поточного проживання",
      currentCountryPlaceholder: "Знайдіть країну...",
      comingSoon: "Скоро",
      steps: {
        language: { question: "Оберіть мову", subheading: "ReloAI спілкуватиметься з вами цією мовою." },
        citizenship: { question: "Яке у вас громадянство?", subheading: "Допоможе визначити відповідну візову категорію." },
        currentCountry: { question: "У якій країні ви зараз перебуваєте?", subheading: "Дозволить адаптувати наступні кроки під ваше поточне місцезнаходження." },
        destination: { question: "Куди ви переїжджаєте?", subheading: "Ми адаптуємо ваш план під цю країну." },
        goal: { question: "Яка ваша основна мета?", subheading: "Можна обрати декілька — це визначить, які шляхи ми для вас проаналізуємо." },
        jobOffer: { question: "Чи є у вас оффер від роботодавця?", subheading: "Допоможе зрозуміти, які документи вам знадобляться." },
        universityAccepted: { question: "Ви вже вступили до університету?", subheading: "Визначає, з чого почнеться ваш план." },
        studyLevel: { question: "На яку програму вступаєте?", subheading: "Для магістратури та докторантури потрібна нострифікація диплома." },
        businessType: { question: "Яку форму бізнесу плануєте відкрити?", subheading: "Від цього залежить перелік документів для реєстрації." },
        familyMemberType: { question: "Хто вже перебуває в Польщі?", subheading: "Визначає тип карти побиту для возз'єднання сім'ї." },
        hasChildren: { question: "Чи їдуть з вами діти?", subheading: "Покажемо документи для школи та садка, якщо потрібно." },
        foreignEmployer: { question: "У вас вже є іноземний роботодавець або клієнти?", subheading: "Впливає на тип карти побиту." },
        registerIp: { question: "Плануєте реєструвати ФОП у Польщі?", subheading: "Визначає, чи потрібні вам NIP, ZUS та реєстрація бізнесу." },
        timeline: { question: "Коли плануєте переїхати?", subheading: "Допоможе розставити пріоритети у вашому плані." },
        hasCar: { question: "Чи є у вас автомобіль, який ви везете до Польщі?", subheading: "Якщо так, додамо обмін посвідчення, реєстрацію авто та страхування." },
      },
      goalOptions: {
        work: "Робота",
        workDesc: "Є оффер або шукаю роботу",
        study: "Навчання",
        studyDesc: "Університет або коледж",
        business: "Бізнес",
        businessDesc: "Відкрити ФОП або ТОВ",
        family: "Сім'я",
        familyDesc: "Чоловік/дружина, батьки чи дитина вже в Польщі",
        remote: "Віддалена робота",
        remoteDesc: "Працюю на іноземного роботодавця або фриланс",
        savings: "Переїзд на власні заощадження",
        savingsDesc: "Переїзд без роботи, на заощадження",
        other: "Інше",
      },
      jobOfferOptions: {
        yes: "Так — вже є запрошення від польської компанії",
        no: "Ні — шукаю роботу самостійно",
      },
      universityAcceptedOptions: {
        yes: "Так — є підтвердження зарахування",
        no: "Ні — ще не вступив(ла)",
      },
      studyLevelOptions: { bachelor: "Бакалаврат", master: "Магістратура", phd: "Докторантура" },
      businessTypeOptions: {
        jdg: "ФОП (JDG) — самозайнятість",
        spzoo: "ТОВ (Sp. z o.o.) — компанія з обмеженою відповідальністю",
        undecided: "Ще не вирішив(ла)",
      },
      familyMemberTypeOptions: {
        spouse: "Чоловік / дружина / партнер",
        parent: "Батько/мати",
        child: "Дитина",
        multiple: "Кілька членів сім'ї",
      },
      hasChildrenOptions: { yes: "Так", no: "Ні" },
      foreignEmployerOptions: {
        yes: "Так — працюю на іноземну компанію",
        no: "Ні — фрилансер, шукаю клієнтів",
      },
      registerIpOptions: {
        yes: "Так — хочу працювати офіційно",
        no: "Ні — поки не планую",
      },
      timelineOptions: {
        already: "Вже перебуваю в Польщі",
        month1: "Протягом 1 місяця",
        months3: "Протягом 3 місяців",
        months6: "Протягом 6 місяців",
        year1: "Протягом року",
        exploring: "Просто вивчаю варіанти",
      },
      hasCarOptions: {
        yes: "Так — везу свій автомобіль",
        no: "Ні — автомобіля немає",
      },
      results: {
        heading: "Ми знайшли 3 маршрути переїзду для вас!",
        loading: "Генеруємо ваші персональні маршрути...",
        selectButton: "Обрати цей маршрут",
        selecting: "Обираємо…",
        currentRoute: "Поточний маршрут",
        recommended: "Рекомендуємо",
        speedFast: "Висока швидкість",
        speedMedium: "Середня швидкість",
        speedSlow: "Низька швидкість",
        difficultyEasy: "Низька складність",
        difficultyMedium: "Середня складність",
        difficultyHard: "Висока складність",
        approvalRate: "Ймовірність схвалення",
        timeline: "Терміни",
        cost: "Вартість",
        steps: "Кроки",
        bestFor: "Підходить для",
        selectError: "Не вдалося зберегти обраний маршрут. Спробуйте ще раз.",
        incompleteHeading: "Спершу завершіть анкету — нам потрібні громадянство і мета переїзду, щоб побудувати маршрути.",
        incompleteCta: "Продовжити анкету",
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
    if (code === "uk") return "uk";
    // Polish, German, Spanish and all other western/unrecognized locales → English
    if (["en", "pl", "de", "es", "fr", "it", "pt", "nl", "cs", "sk", "hu", "ro", "bg"].includes(code)) return "en";
  }
  return "en";
}
