/**
 * Long-form copy and lists aligned with middletownmedical.com urgent care content.
 */

export const WHY_IMMEDIATE_CARE = {
  title: "Why choose immediate care?",
  paragraphs: [
    "When you need treatment today for a non-life-threatening illness or injury, Middletown Medical urgent care centers offer convenient walk-in access across the Hudson Valley — often with shorter waits than the emergency room for the right types of concerns.",
    "Our team focuses on everyday medical needs: infections, minor injuries, flu and COVID symptoms, sprains, cuts, and more. Many locations offer on-site labs and imaging partnerships so you can get answers and a care plan in one visit.",
    "We work with most major insurance plans for urgent care services. If you are uninsured, ask about straightforward self-pay options so you know what to expect before you are seen.",
  ],
};

export const RESERVE_AND_PRICING_BLURBS = {
  reserveTitle: "Reserve your spot",
  reserveBody:
    "Skip the line and check in before you arrive when capacity allows. Call the location directly or use your patient portal when available so you spend less time in the waiting room.",
  pricingTitle: "Worry-free pricing",
  pricingLead:
    "We offer a simple, transparent pricing model for patients without medical insurance. Levels reflect the complexity of your visit and any tests or minor procedures provided.",
};

export const WORRY_FREE_LEVELS = [
  {
    level: "Level 1",
    price: "$150",
    body:
      "Office visit with a provider that includes lab tests for minor illness or injuries. One medical complaint that requires minor treatment.",
  },
  {
    level: "Level 2",
    price: "$180",
    body:
      "Office visit that includes Level 1 services plus a diagnostic test or additional lab service.",
  },
  {
    level: "Level 3",
    price: "$250",
    body:
      "Office visit that includes Level 2 services plus a minor procedure when clinically appropriate.",
  },
] as const;

export const WHEN_URGENT_CARE = [
  "Burning with urination",
  "Mild asthma",
  "Nausea or diarrhea",
  "Ear or sinus pain",
  "Allergic reactions (non-severe)",
  "Rash, minor burns",
  "Back pain",
  "Cough or sore throat",
  "Eye pain or irritation",
  "Minor fever or cold",
  "Minor headache",
  "Bumps, cuts, and scrapes",
  "Removal of stitches",
];

export const WHEN_EMERGENCY_ROOM = [
  "Sudden or unexplained loss of consciousness",
  "Chest pain",
  "Numbness in the face, arm, or leg",
  "Difficulty speaking",
  "Severe shortness of breath",
  "High fever with stiff neck, confusion, or difficulty breathing",
  "Coughing up or vomiting blood",
  "Cuts or wounds that won’t stop bleeding",
  "Major injuries",
];

export const SERVICE_LISTS = {
  illness: [
    "Urinary tract infection",
    "Strep throat",
    "Influenza",
    "COVID",
    "RSV",
    "Ear infection",
    "Eye infection",
    "Sinus infection",
    "Mild asthma",
    "Allergies",
    "Skin rash",
    "Vomiting",
    "Diarrhea",
    "Headache",
    "Abscess drainage",
    "Athlete’s foot",
    "Bronchitis",
    "Insect bites",
  ],
  pediatrics: [
    "RSV",
    "Diaper rash",
    "Ear infection",
    "Rash",
    "Fever",
    "Eye infection",
    "Strep A",
    "Flu",
    "COVID",
  ],
  laboratory: [
    "COVID antibody test",
    "Blood glucose",
    "Complete blood count",
    "Electrolytes",
    "Mono",
    "Pregnancy",
    "Drug test",
  ],
  physicals: [
    "Employment",
    "College",
    "PPD testing",
    "QuantiFERON",
    "Titer testing",
  ],
  stdTesting: [
    "Gonorrhea",
    "Chlamydia",
    "Trichomoniasis",
    "Syphilis",
    "Mycoplasma",
    "Hepatitis",
    "HIV",
    "Herpes",
  ],
  injury: [
    "Cuts and scrapes",
    "Broken bones",
    "Strained muscle",
    "Minor burns",
    "Fractures",
    "Lacerations",
    "Removal of superficial foreign objects",
    "Sprains",
    "Stitches / sutures / stapling",
    "Wound infection",
  ],
  testing: ["CT scan", "MRI", "X-ray", "Ultrasound"],
  immunizations: [
    "MMR",
    "Varicella",
    "Hepatitis A/B",
    "Meningococcal",
    "Pneumonia",
    "Influenza",
  ],
} as const;

export const WHAT_TO_BRING = [
  "Photo ID",
  "Insurance card (if insured)",
  "List of current medications",
  "Payment method for copay or self-pay",
];
