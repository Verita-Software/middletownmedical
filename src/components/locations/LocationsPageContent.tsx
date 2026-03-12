"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { Search, MapPin, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationsMap } from "@/components/locations/LocationsMap";
import type { LocationItem } from "@/types/location";
import { LocationCard } from "./locationCardComponent";

const COUNTIES = ["Orange", "Sullivan", "Ulster"] as const;

interface LocationsPageContentProps {
  locations: LocationItem[];
}

/**
 * Render the locations search page with a filterable list and an interactive map.
 *
 * Filters the provided locations to entries that have numeric latitude and longitude
 * and that match the active name/address, city/address/ZIP, and county filters.
 *
 * @param locations - Array of location items to display and filter
 * @returns The rendered locations page element containing the search UI, results list, and map
 */
export function LocationsPageContent({
  locations: rawLocations,
}: LocationsPageContentProps) {
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [countyFilter, setCountyFilter] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const locations = useMemo(() => {
    let list = rawLocations.filter(
      (loc) =>
        typeof loc.latitude === "number" && typeof loc.longitude === "number",
    );

    const qName = searchName.trim().toLowerCase();
    if (qName) {
      list = list.filter(
        (loc) =>
          loc.name.toLowerCase().includes(qName) ||
          loc.address.toLowerCase().includes(qName),
      );
    }

    const qCity = searchCity.trim().toLowerCase();
    if (qCity) {
      list = list.filter(
        (loc) =>
          loc.address.toLowerCase().includes(qCity) ||
          loc.county.toLowerCase().includes(qCity),
      );
    }

    if (countyFilter) {
      list = list.filter((loc) => loc.county === countyFilter);
    }

    return list;
  }, [rawLocations, searchName, searchCity, countyFilter]);

  const selectedCardRef = useRef<HTMLDivElement | null>(null);

  const handleSelectLocation = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  useEffect(() => {
    if (selectedId && selectedCardRef.current) {
      selectedCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero / Title */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Locations
          </h1>
          <p className="mt-2 text-slate-600">
            Find a Middletown Medical office near you. Select a location for
            details and directions.
          </p>
        </div>
      </div>

      {/* Search & Filters - Duly style */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-4">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Name, location, or address"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="h-11 pl-10"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="City, address, or zip code"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="h-11 pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={countyFilter}
                onChange={(e) => setCountyFilter(e.target.value)}
                className="h-11 rounded-md border border-slate-200 bg-slate-100 px-4 text-sm text-slate-800 shadow-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All counties</option>
                {COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c} County
                  </option>
                ))}
              </select>
              {(searchName || searchCity || countyFilter) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchName("");
                    setSearchCity("");
                    setCountyFilter("");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="container mx-auto px-4 py-3 md:px-6">
        <p className="text-sm font-medium text-slate-700">
          {locations.length} {locations.length === 1 ? "location" : "locations"}{" "}
          found
        </p>
      </div>

      {/* Two columns: List (left) + Map (right) */}
      <div className="container mx-auto flex flex-col px-4 pb-16 md:px-6 lg:flex-row lg:gap-6">
        {/* Left: Scrollable list – no full card borders; blue bottom border per entry (Duly-style) */}
        <div className="lg:max-h-[calc(100vh-12rem)] lg:w-[420px] lg:shrink-0 lg:overflow-y-auto">
          <div className="flex flex-col pb-6">
            {locations.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                No locations match your search. Try adjusting filters.
              </div>
            ) : (
              locations.map((loc) => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  isSelected={selectedId === loc.id}
                  isExpanded={expandedId === loc.id}
                  onSelect={() => handleSelectLocation(loc.id)}
                  onToggleExpand={() =>
                    setExpandedId((prev) => (prev === loc.id ? null : loc.id))
                  }
                  scrollRef={
                    selectedId === loc.id ? selectedCardRef : undefined
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* Right: Sticky map */}
        <div className="sticky top-24 h-[420px] lg:w-[calc(100%-420px)] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:h-[calc(100vh-8rem)] lg:min-h-[500px] ">
          <LocationsMap
            locations={locations}
            selectedId={selectedId}
            onSelectLocation={handleSelectLocation}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
