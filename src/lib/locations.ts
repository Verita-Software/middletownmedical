import fs from "fs";
import path from "path";
import type { LocationItem, LocationDetail } from "@/types/location";

let _cache: LocationItem[] | undefined;
let _detailsCache: Record<string, LocationDetail> | undefined;

/** Load locations from api/location.json (server-side). */
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

/** Get a single location by slug. */
export function getLocationBySlug(slug: string): LocationItem | null {
  const locations = getLocations();
  return locations.find((loc) => loc.slug === slug) ?? null;
}

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

/** Load location details (overview, services, etc.) from api/location-details.json. */
export function getLocationDetails(slug: string): LocationDetail | null {
  const details = loadLocationDetails();
  return details[slug] ?? null;
}

/** All location slugs for static params. */
export function getLocationSlugs(): string[] {
  return getLocations().map((loc) => loc.slug);
}
