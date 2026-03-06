/**
 * Legacy / fallback resource page content.
 * Resource page content is now provided by the backend via api/resources-content.json;
 * see @/lib/api/resources and @/types/resource-content. This file is kept only for
 * optional fallback or reference.
 */

export type ResourceSection =
  | { type: "paragraphs"; paragraphs: string[] }
  | {
      type: "contact";
      items: { label: string; value: string; href?: string }[];
    }
  | { type: "paragraphs"; paragraphs: string[]; link?: { text: string; href: string } };

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
      "We are excited to be your partner for medical care. As a Middletown Medical patient, you have access to our physicians across multiple clinical specialties. From primary care for the whole family to expert specialty care, we are equipped to diagnose and treat your medical needs. We have practice sites across the Hudson Valley and beyond, making access to care easy and convenient for you.",
    sections: [
      section(
        "What to Expect",
        2,
        p(
          "It can be hard to keep up with the changes in healthcare today, but at Middletown Medical our focus remains constant — providing the highest quality medical care available. This is why every aspect of your care is thoughtfully designed by physicians who know and care for you.",
          "Our physicians know that trust is earned, compassion is non-negotiable and that the only bottom line worth caring about is whether we've helped you and your family live healthier, happier lives. We are leading the way by listening to you."
        )
      ),
      section(
        "Primary Care",
        3,
        p(
          "With expertise in internal medicine and family medicine, you are sure to find a doctor you trust to be your partner in health. Our physicians take a comprehensive approach to the prevention, diagnosis and treatment of diseases in adults.",
          "Our pediatricians care for the physical, mental and emotional well-being of your child through every stage of their development. We offer preventive care for healthy children, as well as early detection and management of a variety of pediatric issues."
        )
      ),
      section(
        "Specialty Care",
        3,
        p(
          "Our board-certified specialists are leaders in innovative care. With advanced clinical training and sub-specialty expertise, our specialty care team offers advanced treatment options tailored to your individual needs and health-related goals. Our physicians collaborate across specialties to develop a care plan centered around what is best for you."
        )
      ),
      section(
        "Immediate Care",
        3,
        p(
          "We know illness and injury don't consult your schedule, so we've made room in ours to make sure you can be seen on short notice, close to home or on the go. With same-day appointments, urgent care centers and virtual visits, access to care has never been more convenient."
        )
      ),
      section(
        "Contact Us",
        2,
        contact([
          {
            label: "Scheduling",
            value: "Schedule online or call (845) 342-4774",
            href: "#",
          },
          { label: "MyChart Questions", value: "(845) 342-4774" },
          { label: "Billing Customer Service", value: "(845) 342-4774" },
          {
            label: "Patient Experience & Feedback",
            value: "Call (845) 342-4774",
          },
          { label: "Medical Records Request", value: "(845) 342-4774" },
        ])
      ),
      section(
        "Requesting Medical Records",
        3,
        p(
          "Some of the information you are requesting may be available online in our patient portal, MyChart. To have a copy of your medical records sent to Middletown Medical from another provider or facility, please contact that provider directly."
        )
      ),
      section(
        "Medication Prescriptions and Refills",
        3,
        p(
          "We strive to address your medication needs during your appointments. We will verify the medications that you are currently taking at each visit. If you need a refill, please allow 3 business days for the refill to be completed. In some cases, it may take longer if our office is waiting for an approval or a response from your insurance company. Regular and periodic visits as recommended by your provider will help make this process more seamless and are necessary for ongoing medication refills."
        )
      ),
      section(
        "Notification Regarding Lab Results",
        3,
        p(
          "Middletown Medical is committed to ensuring all our patients have the best access to their medical information. Results from tests performed or collected at our locations will be released to the MyChart app as soon as they are received. The care team will review all results and communicate any follow-up instructions. Should there be any questions or concerns about the results, please log in to MyChart, navigate to Messages, and route your message to the provider who ordered the test."
        )
      ),
      section(
        "MyChart Messages",
        3,
        p(
          "Exchanging messages with your care team through the app is a convenient way to communicate for non-urgent medical needs. This tool can be used for simple questions about test results, medication refills and questions about your recent visit. This tool should not be used for urgent issues or in replacement of a visit."
        )
      ),
      section(
        "Form Completion",
        3,
        p(
          "Please allow 5 business days for completion of forms (FMLA, patient assistance, etc.)."
        )
      ),
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
};

/** Optional fallback: use from API layer if needed. Not used by /resource/[id] page. */
export const RESOURCE_PAGES_FALLBACK = RESOURCE_PAGES;
