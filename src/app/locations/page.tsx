import { getLocations } from "@/lib/locations";
import { LocationsPageContent } from "@/components/locations/LocationsPageContent";

/**
 * Renders the locations page displaying the list of available locations.
 *
 * @returns The React element for the locations page.
 */
export default function LocationsPage() {
  const locations = getLocations();
  return <LocationsPageContent locations={locations} />;
}
