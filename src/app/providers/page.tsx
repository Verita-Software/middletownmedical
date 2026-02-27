"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProviderCard } from "@/components/providers/provider-card";
import { ProvidersShimmerItem } from "@/components/providers/providers-shimmer-item";
import { ProvidersFilter } from "@/components/providers/provider-filter";
import { MOCK_PROVIDERS as providers, specialties } from "@/lib/mock-data";
import { Search, MapPin } from "lucide-react";
import { Suspense } from "react";

function ProvidersPageContent() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Filters
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get("specialty") ? [searchParams.get("specialty")!] : [],
  );
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [acceptingOnly, setAcceptingOnly] = useState(false);
  const [telehealthOnly, setTelehealthOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);

  // Filtered and sorted providers
  const filteredProviders = useMemo(() => {
    let result = [...providers];

    // Search
    if (search) {
      const q = search.toLowerCase().replace(/\s+/g, " ");
      result = result.filter((p) => {
        const nameMatch = p.Name?.toLowerCase()
          .replace(/\s+/g, " ")
          .includes(q);
        const specialtyMatch = p.Specialties?.some((s) =>
          s.toLowerCase().replace(/\s+/g, " ").includes(q),
        );
        const bioMatch = p.Bio?.toLowerCase().replace(/\s+/g, " ").includes(q);

        return nameMatch || specialtyMatch || bioMatch;
      });
    }

    // Specialty filter
    if (selectedSpecialties.length > 0) {
      result = result.filter((p) =>
        p.Specialties?.some((s) => selectedSpecialties.includes(s)),
      );
    }

    // County filter
    if (selectedCounties.length > 0) {
      result = result.filter(
        (p) => p.country && selectedCounties.includes(p.country),
      );
    }

    // Location filter
    if (selectedLocations.length > 0) {
      result = result.filter((p) =>
        p.Locations?.some((l) => selectedLocations.includes(l)),
      );
    }

    if (selectedGender) {
      result = result.filter((p) => p.gender === selectedGender);
    }

    // Language filter - not available in Mock Data
    if (selectedLanguage && selectedLanguage !== "all") {
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => (a.Name || "").localeCompare(b.Name || ""));
        break;
      case "name-desc":
        result.sort((a, b) => (b.Name || "").localeCompare(a.Name || ""));
        break;
      default:
        break;
    }

    return result;
  }, [
    search,
    selectedSpecialties,
    selectedCounties,
    selectedLocations,
    selectedGender,
    selectedLanguage,
    acceptingOnly,
    telehealthOnly,
    sortBy,
  ]);

  const activeFilterCount =
    selectedSpecialties.length +
    selectedCounties.length +
    selectedLocations.length +
    (selectedGender ? 1 : 0) +
    (selectedLanguage && selectedLanguage !== "all" ? 1 : 0) +
    (acceptingOnly ? 1 : 0) +
    (telehealthOnly ? 1 : 0);

  const clearAllFilters = useCallback(() => {
    startTransition(() => {
      setSearch("");
      setSelectedSpecialties([]);
      setSelectedCounties([]);
      setSelectedLocations([]);
      setSelectedGender("");
      setSelectedLanguage("");
      setAcceptingOnly(false);
      setTelehealthOnly(false);
    });
  }, []);

  const toggleSpecialty = (s: string) => {
    startTransition(() => {
      setSelectedSpecialties((prev) =>
        prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
      );
    });
  };

  const toggleCounty = (c: string) => {
    startTransition(() => {
      setSelectedCounties((prev) =>
        prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
      );
    });
  };

  const toggleLocation = (l: string) => {
    startTransition(() => {
      setSelectedLocations((prev) =>
        prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l],
      );
    });
  };

  const toggleGender = (g: string) => {
    startTransition(() => {
      setSelectedGender((prev) => (prev === g ? "" : g));
    });
  };

  const displayedSpecialties = showAllSpecialties
    ? specialties
    : specialties.slice(0, 10);

  return (
    <div className="bg-white min-h-screen">
      {/* Search Bar Section */}
      <section className="bg-slate-50/80 border-b border-slate-200 py-6 sm:py-8 w-full z-20 relative">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, Services, Conditions"
                className="w-full h-[52px] rounded-sm border border-slate-300 bg-white py-2 pl-4 pr-12 text-[15px] text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
                strokeWidth={2.5}
              />
            </div>

            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="City, Address, Zip Code"
                className="w-full h-[52px] rounded-sm border border-slate-300 bg-white py-2 pl-4 pr-12 text-[15px] text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <MapPin
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
                strokeWidth={2.5}
              />
            </div>

            <Button className="h-[52px] px-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold rounded-sm shrink-0 whitespace-nowrap hidden md:flex">
              Search
            </Button>
          </div>

          <Button className="w-full h-[52px] mb-4 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold rounded-sm shrink-0 whitespace-nowrap md:hidden">
            Search
          </Button>

          {/* Pill Filters */}
          <ProvidersFilter
            selectedSpecialties={selectedSpecialties}
            toggleSpecialty={toggleSpecialty}
            selectedCounties={selectedCounties}
            toggleCounty={toggleCounty}
            selectedLocations={selectedLocations}
            toggleLocation={toggleLocation}
            selectedGender={selectedGender}
            toggleGender={toggleGender}
            sortBy={sortBy}
            setSortBy={(val) => {
              startTransition(() => {
                setSortBy(val);
              });
            }}
            activeFilterCount={activeFilterCount}
            clearAllFilters={clearAllFilters}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 lg:px-8 overflow-hidden w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0 w-full overflow-hidden">
          <h2 className="text-[28px] sm:text-[34px] font-bold text-primary leading-none tracking-tight flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 truncate">
            Providers
            <span className="text-[16px] sm:text-[18px] text-slate-600 font-normal tracking-normal truncate">
              {filteredProviders.length} Results
            </span>
          </h2>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5 hover:text-primary font-bold text-[15px] px-6 rounded-sm h-[44px] shrink-0"
          >
            View Map
          </Button>
        </div>

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
              We couldn't find any providers matching your current search
              criteria. Try adjusting your filters.
            </p>
            <Button
              onClick={clearAllFilters}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-sm px-8 h-12"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <AnimatePresence>
              {filteredProviders.map((provider, i) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  variant={viewMode}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
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
