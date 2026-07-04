export type ChecklistStepDef = {
  documentType: string;
  title: string;
  description: string;
};

export const CHECKLIST_STEPS: ChecklistStepDef[] = [
  { documentType: "account", title: "Create your account", description: "You're all set up." },
  {
    documentType: "onboarding",
    title: "Complete onboarding questionnaire",
    description: "We used this to build your roadmap.",
  },
  {
    documentType: "visa_eligibility",
    title: "Check visa eligibility",
    description: "You qualify for a Job Seeker Visa or EU Blue Card.",
  },
  {
    documentType: "documents",
    title: "Upload required documents",
    description: "7 documents needed — 2 you already have.",
  },
  {
    documentType: "biometric",
    title: "Schedule biometric appointment",
    description: "Unlocks once your documents are verified.",
  },
  {
    documentType: "residence_permit",
    title: "Apply for residence permit",
    description: "Unlocks after your biometric appointment.",
  },
  {
    documentType: "address_registration",
    title: "Register local address",
    description: "Final step before you're fully settled.",
  },
];

export const STEPS_COMPLETED_ON_ONBOARDING = ["account", "onboarding", "visa_eligibility"];
