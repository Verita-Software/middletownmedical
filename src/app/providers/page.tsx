"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProviderCard } from "@/components/providers/provider-card";
import { ProvidersShimmerItem } from "@/components/providers/providers-shimmer-item";
import { ProvidersFilterSection } from "@/components/providers/providers-filter-section";
import { Pagination } from "@/components/ui/pagination";
import { MOCK_PROVIDERS as providers } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { Suspense } from "react";
import { LocationsMap } from "@/components/locations/LocationsMap";
import type { LocationItem } from "@/types/location";
import type { Provider } from "@/lib/mock-data";
import { useSearchFiltersStore } from "@/store/search-filters-store";

function ProvidersPageContent() {
  const searchParams = useSearchParams();
  const setSearchFilters = useSearchFiltersStore((s) => s.setSearchFilters);
  const storeSpecialty = useSearchFiltersStore((s) => s.specialtyOrProvider);

  // Sync URL params → Zustand on mount so direct-link / refresh preserves context
  useEffect(() => {
    const specialty = searchParams.get("specialty") ?? "";
    const zip = searchParams.get("zip") ?? "";
    const age = searchParams.get("age") ?? "";
    const insurance = searchParams.get("insurance") ?? "";

    if ((specialty || zip || age || insurance) && !storeSpecialty) {
      setSearchFilters({
        specialtyOrProvider: specialty,
        zipCode: zip,
        patientAge: age,
        insurance,
      });
    }
    // Run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [viewMode] = useState<"grid" | "list">("grid");
  const [showMap, setShowMap] = useState(false);
  const [mapLocations, setMapLocations] = useState<LocationItem[] | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [selectedMapLocationId, setSelectedMapLocationId] = useState<
    string | null
  >(null);

  const handleViewMapToggle = useCallback(async () => {
    if (showMap) {
      setShowMap(false);
      return;
    }
    setShowMap(true);
    if (mapLocations !== null) return;
    setMapLoading(true);
    try {
      const res = await fetch("/api/locations");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed to load locations");
      setMapLocations(Array.isArray(data) ? data : []);
    } catch {
      setMapLocations([]);
    } finally {
      setMapLoading(false);
    }
  }, [showMap, mapLocations]);

  const selectedLocation = useMemo(() => {
    if (!selectedMapLocationId || !mapLocations) return null;
    return mapLocations.find((l) => l.id === selectedMapLocationId) ?? null;
  }, [selectedMapLocationId, mapLocations]);

  const providersAtSelectedLocation = useMemo((): Provider[] => {
    if (!selectedLocation) return [];
    const locName = selectedLocation.name.trim();
    return providers.filter((p) =>
      (p.Locations ?? []).some(
        (ploc) =>
          ploc.trim() === locName ||
          ploc.includes(locName) ||
          locName.includes(ploc.split(" - ")[0]?.trim() ?? "")
      )
    );
  }, [selectedLocation]);

  // suppress unused variable warning — providersAtSelectedLocation used later for map panel
  void providersAtSelectedLocation;

  return (
    <div className="bg-white min-h-screen">
      <ProvidersFilterSection providers={providers}>
        {({
          filteredProviders,
          paginatedItems,
          totalPages,
          currentPage,
          onPageChange,
          clearAllFilters,
          resultCount,
          isPending,
        }) => (
          <>
            <section className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 lg:px-8 overflow-hidden w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0 w-full overflow-hidden">
                <h2 className="text-[28px] sm:text-[34px] font-bold text-primary leading-none tracking-tight flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 truncate">
                  Providers
                  <span className="text-[16px] sm:text-[18px] text-slate-600 font-normal tracking-normal truncate">
                    {resultCount} Results
                  </span>
                </h2>
                <Button
                  variant="outline"
                  onClick={handleViewMapToggle}
                  disabled={mapLoading}
                  className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5 hover:text-primary font-bold text-[15px] px-6 rounded-sm h-[44px] shrink-0"
                >
                  {mapLoading
                    ? "Loading map…"
                    : showMap
                      ? "Hide map"
                      : "View Map"}
                </Button>
              </div>

              {showMap && (
                <div className="mb-8 flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:flex-row">
                  <div className="h-[320px] w-full shrink-0 bg-slate-100 lg:h-[520px] lg:min-h-[420px]">
                    {mapLocations && mapLocations.length > 0 ? (
                      <LocationsMap
                        locations={mapLocations}
                        selectedId={selectedMapLocationId}
                        onSelectLocation={setSelectedMapLocationId}
                        className="h-full min-h-[320px]"
                      />
                    ) : !mapLoading ? (
                      <div className="flex h-full items-center justify-center text-slate-500">
                        No location data available.
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isPending ? (
                <ProvidersShimmerItem viewMode={viewMode} />
              ) : filteredProviders.length === 0 ? (
                <div className="py-24 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    No Providers Found
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-6">
                    We couldn&apos;t find any providers matching your search.
                    Try adjusting your filters.
                  </p>
                  <Button
                    onClick={clearAllFilters}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-sm px-8 h-12"
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                    <AnimatePresence>
                      {paginatedItems.map((provider, i) => (
                        <ProviderCard
                          key={provider.id}
                          provider={provider}
                          variant={viewMode}
                          index={i}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12 mb-8 flex w-full justify-center">
                      <Pagination
                        initialPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </ProvidersFilterSection>
    </div>
  );
}

export default function ProvidersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-40">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <ProvidersPageContent />
    </Suspense>
  );
}
