/**
 * Resources API – treats api/resources-content.json as the backend response.
 * No UI types; only fetches and returns the response. Optional fallback for slugs
 * not yet in the backend (e.g. nav links) so the API remains the single source for the UI.
 */

import fs from "fs";
import path from "path";
import type { ResourceContentMap, ResourceResponse } from "@/types/resource-content";
import { RESOURCE_PAGES_FALLBACK } from "@/lib/resource-pages-data";

let _cache: ResourceContentMap | null | undefined = undefined;

function loadBackendResponse(): ResourceContentMap | null {
  if (_cache !== undefined) return _cache;
  try {
    const filePath = path.join(process.cwd(), "api", "resources-content.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    _cache = JSON.parse(raw) as ResourceContentMap;
    return _cache;
  } catch {
    _cache = null;
    return null;
  }
}

/** Get resource page content by slug. Backend first, then optional fallback. */
export function getResourceBySlug(slug: string): ResourceResponse | null {
  const data = loadBackendResponse();
  const fromBackend = data?.[slug] ?? null;
  if (fromBackend) return fromBackend;
  const fromFallback = RESOURCE_PAGES_FALLBACK[slug];
  return fromFallback ? (fromFallback as ResourceResponse) : null;
}

/** All resource slugs: backend keys plus fallback keys (for static params). */
export function getResourceSlugs(): string[] {
  const fromBackend = Object.keys(loadBackendResponse() ?? {});
  const fromFallback = Object.keys(RESOURCE_PAGES_FALLBACK);
  return [...new Set([...fromBackend, ...fromFallback])];
}
