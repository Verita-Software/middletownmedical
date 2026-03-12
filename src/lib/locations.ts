import fs from "fs";
import path from "path";
import type { LocationItem, LocationDetail } from "@/types/location";

let _cache: LocationItem[] | undefined;
let _detailsCache: Record<string, LocationDetail> | undefined;

/**
 * Load and cache the list of locations from api/location.json.
 *
 * @returns The cached array of LocationItem objects for all locations; an empty array if the file cannot be read or parsed.
 */
export function getLocations(): LocationItem[] {
  if (_cache !== undefined) return _cache;
  try {
    const filePath = path.join(process.cwd(), "api", "location.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    _cache = JSON.parse(raw) as LocationItem[];
    return _cache;
  } catch {
    _cache = [];
    return [];
  }
}

/**
 * Retrieve the location item that matches the provided slug.
 *
 * @param slug - The slug identifier of the location to find
 * @returns The matching `LocationItem`, or `null` if no location has the given slug
 */
export function getLocationBySlug(slug: string): LocationItem | null {
  const locations = getLocations();
  return locations.find((loc) => loc.slug === slug) ?? null;
}

/**
 * Load and cache location details from the project's api/location-details.json.
 *
 * On the first invocation, reads and parses the JSON file and stores the resulting
 * mapping of slugs to LocationDetail in an in-memory cache. Subsequent calls
 * return the cached mapping without performing file I/O. If the file cannot be
 * read or parsed, an empty object is cached and returned.
 *
 * @returns A record mapping location slugs to `LocationDetail` objects; an empty object if loading fails.
 */
function loadLocationDetails(): Record<string, LocationDetail> {
  if (_detailsCache !== undefined) return _detailsCache;
  try {
    const filePath = path.join(process.cwd(), "api", "location-details.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    _detailsCache = JSON.parse(raw) as Record<string, LocationDetail>;
    return _detailsCache;
  } catch {
    _detailsCache = {};
    return _detailsCache;
  }
}

/**
 * Retrieve detailed information for a location identified by its slug.
 *
 * @param slug - The location's slug identifier
 * @returns The corresponding `LocationDetail` if found, `null` otherwise
 */
export function getLocationDetails(slug: string): LocationDetail | null {
  const details = loadLocationDetails();
  return details[slug] ?? null;
}

/**
 * Provides all location slugs used for static parameter generation.
 *
 * @returns All location slugs for generating static route parameters
 */
export function getLocationSlugs(): string[] {
  return getLocations().map((loc) => loc.slug);
}
