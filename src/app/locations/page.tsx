import { getLocations } from "@/lib/locations";
import { LocationsPageContent } from "@/components/locations/LocationsPageContent";

export default function LocationsPage() {
  const locations = getLocations();
  return <LocationsPageContent locations={locations} />;
}
