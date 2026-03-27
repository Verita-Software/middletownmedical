import type { Metadata } from "next";
import { getLocations } from "@/lib/locations";
import { LocationsPageContent } from "@/components/locations/LocationsPageContent";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find a Middletown Medical location near you across the Hudson Valley. Browse clinic addresses, hours, and contact information.",
  alternates: { canonical: "https://middletownmedical.com/locations" },
  openGraph: {
    url: "https://middletownmedical.com/locations",
    title: "Locations | Middletown Medical",
    description:
      "Find a Middletown Medical clinic near you. View addresses, hours, and contact information for all Hudson Valley locations.",
  },
};

export default function LocationsPage() {
  const locations = getLocations();
  return <LocationsPageContent locations={locations} />;
}
