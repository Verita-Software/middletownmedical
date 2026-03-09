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

MOCK_PROVIDERS.forEach((p) => {
  if (p.Specialties) p.Specialties.forEach((s) => allSpecialties.add(s));
  if (p.Locations) p.Locations.forEach((l) => allLocations.add(l));
  if (p.LanguagesSpoken) p.LanguagesSpoken.forEach((l) => allLanguages.add(l));
});

export const specialties = Array.from(allSpecialties).sort();
export const locations = Array.from(allLocations)
  .sort()
  .map((name, i) => ({
    id: `loc-${i}`,
    name,
  }));
/** All unique languages from providers (for Language Spoken filter). */
export const languages = Array.from(allLanguages).sort();

export const counties = ["Orange", "Sullivan", "Ulster", "Orange country"];
