import { notFound } from "next/navigation";
import { getLocationBySlug, getLocationDetails, getLocationSlugs } from "@/lib/locations";
import { MOCK_PROVIDERS } from "@/lib/mock-data";
import type { LocationItem } from "@/types/location";
import { LocationOverviewDetailPage } from "@/components/locations/LocationOverviewDetailPage";

/**
 * Finds providers whose listed locations match the given location's name or primary address.
 *
 * @param location - The location item to match against provider location entries.
 * @returns An array of providers from MOCK_PROVIDERS whose `Locations` overlap the location's name or first address segment.
 */
function getProvidersForLocation(location: LocationItem) {
  const nameParts = location.name
    .toLowerCase()
    .replace(/\s*(urgent care|office|medical branch|center)\s*/gi, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const addressFirst = location.address.split(",")[0]?.toLowerCase().trim() ?? "";

  return MOCK_PROVIDERS.filter((p) => {
    const locStrings = (p.Locations ?? []).map((l) => l.toLowerCase());
    const matchesName = nameParts.some(
      (part) => part.length > 2 && locStrings.some((l) => l.includes(part))
    );
    const matchesAddress = addressFirst && locStrings.some((l) => l.includes(addressFirst) || addressFirst.includes(l.slice(0, 15)));
    return matchesName || matchesAddress;
  });
}

/**
 * Produce route parameters for static generation from available location slugs.
 *
 * @returns An array of objects, each with a `slug` property corresponding to a location slug
 */
export async function generateStaticParams() {
  const slugs = getLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Render the location detail page for a given route slug.
 *
 * Fetches the location and its details, finds matching providers, and returns
 * the LocationOverviewDetailPage UI for that location. If no location matches
 * the provided slug, calls `notFound()` to render a 404.
 *
 * @param props - Component props containing route parameters
 * @param props.params - Promise resolving to an object with the route `slug`
 * @returns The LocationOverviewDetailPage React element for the resolved location
 */
export default async function LocationDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const details = getLocationDetails(slug);
  const providers = getProvidersForLocation(location);

  return (
    <LocationOverviewDetailPage
      location={location}
      details={details}
      providers={providers}
    />
  );
}
