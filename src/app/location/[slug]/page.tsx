import { notFound } from "next/navigation";
import { getLocationBySlug, getLocationDetails, getLocationSlugs } from "@/lib/locations";
import { MOCK_PROVIDERS } from "@/lib/mock-data";
import type { LocationItem } from "@/types/location";
import { LocationOverviewDetailPage } from "@/components/locations/LocationOverviewDetailPage";

/** Match providers to a location by name/address overlap with provider.Locations. */
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

export async function generateStaticParams() {
  const slugs = getLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

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
