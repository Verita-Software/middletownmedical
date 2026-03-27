import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, getLocationDetails, getLocationSlugs } from "@/lib/locations";
import { MOCK_PROVIDERS } from "@/lib/mock-data";
import type { LocationItem } from "@/types/location";
import { LocationOverviewDetailPage } from "@/components/locations/LocationOverviewDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/seo-constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return { title: "Location Not Found" };

  const details = getLocationDetails(slug);
  const description =
    details?.overview?.slice(0, 160) ??
    `${location.name} — Middletown Medical location in ${location.county} County. Call ${location.phone}.`;

  return {
    title: location.name,
    description,
    alternates: { canonical: `${SITE_URL}/location/${slug}` },
    openGraph: {
      url: `${SITE_URL}/location/${slug}`,
      title: `${location.name} | Middletown Medical`,
      description,
      images: details?.imageUrl ? [{ url: details.imageUrl }] : undefined,
    },
  };
}

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

  const [streetAddress, ...cityParts] = location.address.split(",");
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: location.name,
    url: `${SITE_URL}/location/${slug}`,
    telephone: location.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: streetAddress?.trim(),
      addressLocality: cityParts[0]?.trim() ?? "Middletown",
      addressRegion: "NY",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    parentOrganization: {
      "@type": "MedicalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={clinicSchema} />
      <LocationOverviewDetailPage
        location={location}
        details={details}
        providers={providers}
      />
    </>
  );
}
