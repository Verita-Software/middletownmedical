/**
 * Urgent care locations — mirrors public content from
 * https://middletownmedical.com/urgent-care/ (slugs aligned with legacy URLs).
 */

export type UrgentCareHoursRow = { day: string; hours: string };

export interface UrgentCareLocation {
  slug: string;
  /** Short label for cards and hero (e.g. "Middletown") */
  name: string;
  /** Full mailing-style lines */
  addressLines: string[];
  /** Single line for meta / OG */
  addressSingleLine: string;
  phone: string;
  phoneTel: string;
  /** Shown as “X min estimated wait” — illustrative; replace with live data later */
  estimatedWaitMinutes: number;
  /** Opening status line (e.g. walk-in hours summary) */
  statusLine: string;
  /** Google Maps search query for “Get directions” */
  directionsQuery: string;
  hours: UrgentCareHoursRow[];
  /** Card / listing image (~510×382) from middletownmedical.com media */
  cardImageUrl: string;
  /** Optional longer intro on detail page */
  introHtml?: string;
}

export const URGENT_CARE_LOCATIONS: UrgentCareLocation[] = [
  {
    slug: "middletown-ny",
    name: "Middletown",
    addressLines: ["111 Maltese Dr", "Middletown, NY 10940"],
    addressSingleLine: "111 Maltese Dr, Middletown, NY 10940",
    phone: "(845) 342-4774",
    phoneTel: "+18453424774",
    estimatedWaitMinutes: 7,
    statusLine: "Walk-in & same-day visits",
    directionsQuery: "111 Maltese Dr Middletown NY 10940",
    hours: [
      { day: "Sunday", hours: "9AM–9PM" },
      { day: "Monday", hours: "7AM–9PM" },
      { day: "Tuesday", hours: "7AM–9PM" },
      { day: "Wednesday", hours: "7AM–9PM" },
      { day: "Thursday", hours: "7AM–9PM" },
      { day: "Friday", hours: "7AM–9PM" },
      { day: "Saturday", hours: "9AM–9PM" },
    ],
    cardImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2022/04/Middletown-Medical-111-Maltese-Dr-510x382.png",
    introHtml:
      "Our Middletown Urgent Care at 111 Maltese Drive offers a wide range of medical services for non-emergency needs. Walk-ins welcome.",
  },
  {
    slug: "port-jervis-ny",
    name: "Port Jervis",
    addressLines: ["100 Pike St", "Port Jervis, NY 12771"],
    addressSingleLine: "100 Pike St, Port Jervis, NY 12771",
    /** Per https://middletownmedical.com/urgent-care/port-jervis/ */
    phone: "(845) 856-7781",
    phoneTel: "+18458567781",
    estimatedWaitMinutes: 8,
    statusLine: "Sun & Sat 8AM–1PM · Mon–Fri 8AM–8PM",
    directionsQuery: "100 Pike St Port Jervis NY 12771",
    cardImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2023/11/Port-Jervis-Urgent-Care-02-510x382.jpg",
    hours: [
      { day: "Sunday", hours: "8AM–1PM" },
      { day: "Monday", hours: "8AM–8PM" },
      { day: "Tuesday", hours: "8AM–8PM" },
      { day: "Wednesday", hours: "8AM–8PM" },
      { day: "Thursday", hours: "8AM–8PM" },
      { day: "Friday", hours: "8AM–8PM" },
      { day: "Saturday", hours: "8AM–1PM" },
    ],
    introHtml:
      "Our Port Jervis Urgent Care offers a wide range of medical services for non-emergency needs. Walk-ins welcome during posted hours.",
  },
  {
    slug: "newburgh-ny",
    name: "Newburgh",
    addressLines: [
      "Mid Valley Mall",
      "47 N Plank Rd Suite 19",
      "Newburgh, NY 12550",
    ],
    addressSingleLine: "47 N Plank Rd Suite 19, Newburgh, NY 12550",
    /** Per https://middletownmedical.com/urgent-care/newburgh-ny/ */
    phone: "(845) 561-2038",
    phoneTel: "+18455612038",
    estimatedWaitMinutes: 6,
    statusLine: "Mon–Fri 8AM–6PM · Sat 8AM–1PM · Sun closed",
    directionsQuery: "47 N Plank Rd Suite 19 Newburgh NY 12550",
    cardImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2022/04/Newburgh-UC-510x382.jpg",
    hours: [
      { day: "Sunday", hours: "Closed" },
      { day: "Monday", hours: "8AM–6PM" },
      { day: "Tuesday", hours: "8AM–6PM" },
      { day: "Wednesday", hours: "8AM–6PM" },
      { day: "Thursday", hours: "8AM–6PM" },
      { day: "Friday", hours: "8AM–6PM" },
      { day: "Saturday", hours: "8AM–1PM" },
    ],
    introHtml:
      "Our Newburgh Urgent Care at the Mid Valley shopping center offers a wide range of medical services for non-emergency needs. Walk-ins welcome during posted hours.",
  },
  {
    slug: "monticello-ny",
    name: "Monticello",
    addressLines: [
      "Thompson Square Mall",
      "4058 NY-42 #5",
      "Monticello, NY 12701",
    ],
    addressSingleLine: "4058 NY-42 #5, Monticello, NY 12701",
    /** Per https://middletownmedical.com/urgent-care/monticello-ny/ */
    phone: "(845) 794-1600",
    phoneTel: "+18457941600",
    estimatedWaitMinutes: 9,
    statusLine: "Mon–Fri 8AM–6PM · Sat 9AM–1PM · Sun closed",
    directionsQuery: "4058 NY-42 #5 Monticello NY 12701",
    cardImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2022/04/MonticelloPan-510x382.jpg",
    hours: [
      { day: "Sunday", hours: "Closed" },
      { day: "Monday", hours: "8AM–6PM" },
      { day: "Tuesday", hours: "8AM–6PM" },
      { day: "Wednesday", hours: "8AM–6PM" },
      { day: "Thursday", hours: "8AM–6PM" },
      { day: "Friday", hours: "8AM–6PM" },
      { day: "Saturday", hours: "9AM–1PM" },
    ],
    introHtml:
      "Our Monticello Urgent Care at Thompson Square Mall offers a wide range of medical services for non-emergency needs. Walk-ins welcome during posted hours.",
  },
  {
    slug: "ellenville-ny",
    name: "Ellenville",
    addressLines: ["112 Shoprite Blvd", "Ellenville, NY 12428"],
    addressSingleLine: "112 Shoprite Blvd, Ellenville, NY 12428",
    phone: "(845) 342-4774",
    phoneTel: "+18453424774",
    estimatedWaitMinutes: 5,
    statusLine: "Walk-in & same-day visits",
    directionsQuery: "112 Shoprite Blvd Ellenville NY 12428",
    cardImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2022/04/Ellenville-Urgent-Care-510x382.jpg",
    hours: [
      { day: "Sunday", hours: "9AM–9PM" },
      { day: "Monday", hours: "7AM–9PM" },
      { day: "Tuesday", hours: "7AM–9PM" },
      { day: "Wednesday", hours: "7AM–9PM" },
      { day: "Thursday", hours: "7AM–9PM" },
      { day: "Friday", hours: "7AM–9PM" },
      { day: "Saturday", hours: "9AM–9PM" },
    ],
  },
  {
    slug: "chester-ny",
    name: "Chester",
    addressLines: ["78 Brookside Ave #143", "Chester, NY 10918"],
    addressSingleLine: "78 Brookside Ave #143, Chester, NY 10918",
    phone: "(845) 469-2692", // updated
    phoneTel: "+18454692692", // updated
    estimatedWaitMinutes: 8, // your illustrative value; fine to keep
    statusLine: "Mon–Fri 8AM–8PM · Sat 9AM–1PM · Sun closed", // better match to real hours
    directionsQuery: "78 Brookside Ave #143 Chester NY 10918", // optional tweak to include suite
    cardImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2022/04/Chester-Urgent-Care-510x382.png",
    hours: [
      { day: "Sunday", hours: "Closed" },
      { day: "Monday", hours: "8AM–8PM" },
      { day: "Tuesday", hours: "8AM–8PM" },
      { day: "Wednesday", hours: "8AM–8PM" },
      { day: "Thursday", hours: "8AM–8PM" },
      { day: "Friday", hours: "8AM–8PM" },
      { day: "Saturday", hours: "9AM–1PM" },
    ],
  },
];

export function getUrgentCareSlugs(): string[] {
  return URGENT_CARE_LOCATIONS.map((l) => l.slug);
}

export function getUrgentCareBySlug(
  slug: string,
): UrgentCareLocation | undefined {
  return URGENT_CARE_LOCATIONS.find((l) => l.slug === slug);
}
