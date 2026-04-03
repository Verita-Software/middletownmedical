/**
 * Legacy / fallback resource page content.
 * Resource page content is now provided by the backend via api/resources-content.json;
 * see @/lib/api/resources and @/types/resource-content. This file is kept only for
 * optional fallback or reference.
 */

export type ResourceSection =
  | { type: "paragraphs"; paragraphs: string[] }
  | { type: "contact"; items: { label: string; value: string; href?: string }[] }
  | { type: "paragraphs"; paragraphs: string[]; link?: { text: string; href: string } }
  | {
      type: "pdfCards";
      cards: {
        title: string;
        category: string;
        tag: string;
        description: string;
        href: string;
        accent: string;
      }[];
    };

export interface ResourcePageData {
  title: string;
  subtitle?: string;
  intro: string;
  sections: { heading: string; level: 2 | 3 | 4; content: ResourceSection }[];
}

function section(
  heading: string,
  level: 2 | 3 | 4,
  content: ResourceSection
): ResourcePageData["sections"][number] {
  return { heading, level, content };
}

function p(...paragraphs: string[]): ResourceSection {
  return { type: "paragraphs", paragraphs };
}

function contact(
  items: { label: string; value: string; href?: string }[]
): ResourceSection {
  return { type: "contact", items };
}

const RESOURCE_PAGES: Record<string, ResourcePageData> = {
  "patient-resources": {
    title: "Patient Resources",
    intro:
      "Helpful guides, forms, and clinical documents to support your care journey at Middletown Medical. All resources are published by our clinical staff and reflect current evidence-based standards of care.",
    sections: [
      section("Downloadable Documents", 2, {
        type: "pdfCards",
        cards: [
          {
            title: "Colorectal Cancer Screening",
            category: "Screening Guidelines",
            tag: "Policy Guide",
            description:
              "Evidence-based guidelines for colorectal cancer (CRC) screening and surveillance intervals for patients at average risk, starting at age 45. Includes the recommended Fecal FIT screening protocol, colonoscopy surveillance schedules, and criteria for identifying high-risk patients who require earlier or more frequent screening.",
            href: "https://middletownmedical.com/wp-content/uploads/2023/06/COLORECTAL-CANCER-SCREENING.pdf",
            accent: "#b5097b",
          },
          {
            title: "Fecal FIT Testing",
            category: "Lab Services",
            tag: "Patient Info",
            description:
              "Learn about our in-house Fecal Immunochemical Test (FIT) — covered by all insurance providers. Annual FIT testing is recommended for all patients aged 45 and older, regardless of when their last colonoscopy was performed. Recent studies show yearly FIT is superior to Cologuard for colorectal cancer detection.",
            href: "https://middletownmedical.com/wp-content/uploads/2023/06/Fecal-FIT-Testing.pdf",
            accent: "#49A3DA",
          },
          {
            title: "Fecal FIT Instruction",
            category: "How-To Guide",
            tag: "Instructions",
            description:
              "Step-by-step instructions for completing your Fecal Immunochemical Test (FIT) kit at home. Covers who should be screened, how to safely collect your stool sample using the provided collection paper, how to seal and return your kit within 48 hours, and what to expect from your results.",
            href: "https://middletownmedical.com/wp-content/uploads/2023/06/Fecal-Fit-Instruction.pdf",
            accent: "#2e7d32",
          },
          {
            title: "Middletown Medical Laboratory Update",
            category: "Laboratory",
            tag: "Update",
            description:
              "Important updates from the Middletown Medical laboratory department. This document covers new lab services, updated protocols, specimen collection procedures, and standards that ensure accurate and timely results reported directly to your physician for the best possible patient care.",
            href: "https://middletownmedical.com/wp-content/uploads/2023/06/Middletown-Medical-Laboratory-Update.pdf",
            accent: "#e65100",
          },
          {
            title: "MRI Instructions",
            category: "Imaging Preparation",
            tag: "Prep Guide",
            description:
              "Prepare for your MRI exam with this comprehensive guide from our Radiology department. Includes a pre-exam metal implant safety checklist, clothing and jewelry recommendations, food and drink guidelines, contrast dye information, and tips for patients with claustrophobia. Contact Radiology at (845) 342-4774 ext. 4190 with any questions.",
            href: "https://middletownmedical.com/wp-content/uploads/2025/03/MRI-Instructions.pdf",
            accent: "#002147",
          },
        ],
      }),
    ],
  },
  "patient-experience": {
    title: "Patient Experience",
    subtitle: "We're all in for you.",
    intro:
      "At Middletown Medical, we are deeply committed to going beyond the expected to deliver an extraordinary health and care experience for you. We want to know not only when we get it right, but what we can do to make it better.",
    sections: [
      section(
        "Your Feedback Matters",
        2,
        p(
          "That's why we work with leading healthcare survey tools to gather your feedback. After your visit with us, you may receive an email or letter asking you to complete a survey. By sharing your thoughts about your experience, you can help us recognize team members for a job well done or help us improve if we've fallen short of your expectations."
        )
      ),
      section(
        "Contact Patient Experience",
        3,
        p(
          "If you'd like to voice a concern with your experience or pay our team members a compliment, please reach out to our Patient Experience department. You can reach us by phone at (845) 342-4774, or by email at patientexperience@middletownmedical.com."
        )
      ),
    ],
  },
  "covid-19-info": {
    title: "Covid-19 Info",
    intro:
      "Middletown Medical is committed to keeping our patients and community informed with the latest updates, safety information, and vaccination resources.",
    sections: [
      section(
        "Current Guidelines",
        2,
        p(
          "We follow current CDC and state health department guidelines for COVID-19 prevention, testing, and care. Please contact your provider or our main line for the most up-to-date information."
        )
      ),
      section(
        "Vaccination",
        3,
        p(
          "COVID-19 vaccines and boosters are available at select locations. Schedule through MyChart or call (845) 342-4774 for availability."
        )
      ),
    ],
  },
  "telemedicine": {
    title: "Telemedicine",
    intro:
      "Virtual visits and telehealth options let you connect with your care team from home or on the go.",
    sections: [
      section(
        "How It Works",
        2,
        p(
          "Schedule a video visit through MyChart or by calling our scheduling line. Our team will guide you through setup and what to expect during your visit."
        )
      ),
      section(
        "Same-Day Options",
        3,
        p(
          "Same-day and next-day video visits may be available with primary care and select specialists. Call (845) 342-4774 to check availability."
        )
      ),
    ],
  },
  "patient-centered-medical-home": {
    title: "Patient Centered Medical Home",
    intro:
      "Middletown Medical is committed to a Patient Centered Medical Home (PCMH) model — putting you at the center of your care.",
    sections: [
      section(
        "What It Means for You",
        2,
        p(
          "PCMH certification reflects our focus on coordinated, accessible, and patient-centered care. Your care team works together to manage your health and wellness, with you as an active partner in decisions and goals."
        )
      ),
    ],
  },
  "patient-forms": {
    title: "Patient Forms",
    intro:
      "Download forms and prepare for your visit to save time at check-in and help us serve you better.",
    sections: [
      section(
        "New Patient Forms",
        2,
        p(
          "If you are a new patient, please complete the new patient packet before your first visit. Forms are available in our office or can be requested by calling (845) 342-4774."
        )
      ),
      section(
        "Other Forms",
        3,
        p(
          "For medical records requests, FMLA, and other forms, please allow up to 5 business days for completion. Contact our office for specific form requirements."
        )
      ),
    ],
  },
  "findhelp": {
    title: "FindHelp.org",
    intro:
      "Community resources and support are available through FindHelp.org to help with housing, food, transportation, and other needs.",
    sections: [
      section(
        "How We Use FindHelp",
        2,
        p(
          "Middletown Medical may refer patients to FindHelp.org to connect with local resources that support health and well-being outside the clinic."
        )
      ),
    ],
  },
  "billing-insurance": {
    title: "Billing & Insurance",
    intro:
      "We work with many insurance plans and offer clear guidance on billing and financial assistance.",
    sections: [
      section(
        "Insurance",
        2,
        p(
          "See if your insurance is accepted. Contact our billing office at (845) 342-4774 for verification and any questions about coverage."
        )
      ),
      section(
        "Pay Your Bill",
        3,
        p(
          "Pay your bill online through MyChart or by phone. Our billing team can also help you set up a payment plan or explore financial assistance options."
        )
      ),
    ],
  },
  "patient-bill-of-rights": {
    title: "Patient Bill of Rights",
    intro:
      "Your rights as a patient at Middletown Medical are important to us. We are committed to treating you with respect and transparency.",
    sections: [
      section(
        "Your Rights",
        2,
        p(
          "You have the right to receive considerate and respectful care, to be informed about your treatment, to privacy and confidentiality, and to voice concerns without affecting your care. A full copy of our Patient Bill of Rights is available upon request at any of our locations."
        )
      ),
    ],
  },
  careers: {
    title: "Careers",
    intro:
      "Join the Middletown Medical team and help us provide high-quality care across the Hudson Valley.",
    sections: [
      section(
        "Why Middletown Medical",
        2,
        p(
          "We offer a supportive environment, competitive benefits, and the opportunity to make a difference in our community. Explore open positions and apply through our careers portal or contact HR at (845) 342-4774."
        )
      ),
    ],
  },
  "media-center": {
    title: "Media Center",
    intro:
      "News and updates from Middletown Medical. For press inquiries, call (845) 342-4774.",
    sections: [
      section(
        "Resources",
        2,
        p(
          "For patient-facing updates and downloadable materials, see Patient Resources."
        )
      ),
    ],
  },
};

/** Optional fallback: use from API layer if needed. Not used by /resource/[id] page. */
export const RESOURCE_PAGES_FALLBACK = RESOURCE_PAGES;
