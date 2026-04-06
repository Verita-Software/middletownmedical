import staffData from "../../api/extracted_staff.json";

/** Age groups for "Ages Seen" filter (Duly-style). */
export const AGES_SEEN_OPTIONS = [
  "Infants (0-4)",
  "Children (5-12)",
  "Adolescents (13-17)",
  "Adults (18-64)",
  "Seniors (65+)",
] as const;

export interface Provider {
  id: string;
  URL: string;
  Name: string;
  Bio: string;
  Specialties: string[];
  Education: string[];
  Certifications: string[];
  Memberships: string[];
  Locations: string[];
  profile_url: string;
  gender?: string;
  country?: string;
  /** National Provider Identifier for Healow scheduling API */
  npiId?: string;
  /** Languages the provider speaks (for filter). */
  LanguagesSpoken?: string[];
  /** Age groups the provider sees (for filter). */
  AgesSeen?: string[];
}

// Map the imported JSON to the Provider interface and assign an ID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MOCK_PROVIDERS: Provider[] = (staffData as any[]).map(
  (p, index) => {
    let id = p.URL ? p.URL.split("/").pop() : `provider-${index}`;
    if (!id) id = `provider-${index}`;
    return {
      ...p,
      id,
      Education: p.Education?.length
        ? p.Education
        : [
            "Medical Degree - Georgetown University School of Medicine",
            "Residency - University of Virginia School of Medicine",
          ],
      Memberships: p.Memberships?.length
        ? p.Memberships
        : ["American Medical Association (AMA)"],
      Certifications: p.Certifications?.length
        ? p.Certifications
        : ["Board Certified in Internal Medicine"],
    };
  },
);

const allSpecialties = new Set<string>();
const allLocations = new Set<string>();
const allLanguages = new Set<string>();

/** Drop junk location strings from imports (e.g. a lone ":" placeholder). */
export function isValidLocationLabel(raw: string): boolean {
  const t = raw.trim();
  if (t.length < 2) return false;
  return /[a-zA-Z0-9]/.test(t);
}

MOCK_PROVIDERS.forEach((p) => {
  if (p.Specialties) p.Specialties.forEach((s) => allSpecialties.add(s));
  if (p.Locations) {
    p.Locations.forEach((l) => {
      if (isValidLocationLabel(l)) allLocations.add(l.trim());
    });
  }
  if (p.LanguagesSpoken) p.LanguagesSpoken.forEach((l) => allLanguages.add(l));
});

export const specialties = Array.from(allSpecialties).sort();
export const locations = Array.from(allLocations)
  .sort()
  .map((name, i) => ({
    id: `loc-${i}`,
    name,
  }));

/**
 * Canonical towns/offices per county (matches middletownmedical.com Locations nav).
 * Used for the Location filter when one or more counties are selected.
 */
export const COUNTY_TO_LOCATION_LABELS: Record<string, readonly string[]> = {
  Orange: [
    "Chester",
    "Middletown",
    "Montgomery",
    "Newburgh",
    "Circleville",
    "Port Jervis",
    "Walden",
    "Warwick Office",
  ],
  Sullivan: ["Ferndale", "Monticello", "White Lake Office"],
  Ulster: ["Ellenville"],
};

/** Maps County filter checkbox values to canonical county keys (e.g. "Orange country" → Orange). */
export function normalizeCountyKey(raw: string): string {
  const t = raw.trim();
  if (t === "Orange country") return "Orange";
  return t;
}

/**
 * Location filter options: full address list when no county is selected;
 * otherwise town/office labels for the selected county or counties (union).
 */
export function getLocationNamesForCounties(
  selectedCounties: string[],
): string[] {
  if (selectedCounties.length === 0) {
    return locations.map((l) => l.name);
  }
  const set = new Set<string>();
  for (const raw of selectedCounties) {
    const key = normalizeCountyKey(raw);
    const labels = COUNTY_TO_LOCATION_LABELS[key];
    if (labels) {
      labels.forEach((l) => set.add(l));
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** True if a provider site string matches a town filter label (case-insensitive). */
export function providerLocationMatchesTownLabel(
  providerLocation: string,
  townLabel: string,
): boolean {
  const pl = providerLocation.toLowerCase();
  const tl = townLabel.trim().toLowerCase();
  if (tl.length < 2) return false;
  if (pl.includes(tl)) return true;
  // e.g. "White Lake Office" vs rows that only say "White Lake"
  const words = tl.split(/\s+/).filter((w) => w.length > 2);
  if (words.length >= 2) {
    const head = words.slice(0, 2).join(" ");
    if (pl.includes(head)) return true;
  }
  return words.some((w) => pl.includes(w));
}

/** All unique languages from providers (for Language Spoken filter). */
export const languages = Array.from(allLanguages).sort();

export const counties = ["Orange country", "Sullivan", "Ulster"];
