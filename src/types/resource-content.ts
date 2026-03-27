/**
 * Backend response contract for resource page content.
 * UI renders from this shape; do not hardcode content structure in components.
 */

export interface PdfCard {
  title: string;
  category: string;
  tag: string;
  description: string;
  href: string;
  accent: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ScheduleEntry {
  day: string;
  time: string;
  services: string;
}

export interface CareerListingDetailGroup {
  label: string;
  items: string[];
}

export interface CareerListing {
  title: string;
  updated?: string;
  date?: string;
  location?: string;
  summary?: string;
  details?: CareerListingDetailGroup[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaLinks?: { label: string; href: string }[];
}

export interface LocationCardEntry {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  phone?: string;
  mapsUrl?: string;
  hours?: { day: string; time: string }[];
}

export type ResourceSectionContent =
  | { type: "paragraphs"; paragraphs: string[] }
  | {
      type: "contact";
      items: { label: string; value: string; href?: string }[];
    }
  | { type: "pdfCards"; cards: PdfCard[] }
  | { type: "faq"; items: FaqItem[] }
  | { type: "ctaButton"; label: string; href: string; note?: string }
  | { type: "bulletList"; items: string[] }
  | {
      type: "locationSchedule";
      location: string;
      floor?: string;
      mapsUrl?: string;
      schedules: ScheduleEntry[];
    }
  | { type: "locationCards"; locations: LocationCardEntry[] }
  | {
      type: "billingDeptInfo";
      hours: string;
      phone: string;
      fax: string[];
      addressLine1: string;
      addressLine2: string;
      payBillHref: string;
      mapsUrl: string;
    }
  | {
      type: "insuranceColumns";
      notices?: string[];
      columns: { heading: string; items: string[] }[];
    }
  | {
      type: "jobListings";
      introCard?: {
        title: string;
        subtitle?: string;
        description?: string;
        imageUrl?: string;
      };
      listings: CareerListing[];
      legalNote?: {
        posted?: string;
        paragraphs?: string[];
      };
    }
  | Record<string, unknown>;

export interface ResourceSection {
  heading: string;
  level: 2 | 3 | 4;
  content: ResourceSectionContent;
}

export interface ResourceResponse {
  title: string;
  subtitle?: string;
  intro: string;
  sections: ResourceSection[];
  hideHeaderCtas?: boolean;
  /** If set, visiting this resource page immediately redirects the user to this URL. */
  redirectUrl?: string;
}

export type ResourceContentMap = Record<string, ResourceResponse>;
