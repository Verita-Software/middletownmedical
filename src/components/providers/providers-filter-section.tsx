"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProvidersFilter } from "@/components/providers/provider-filter";
import { useProvidersFilter } from "@/hooks/use-providers-filter";
import { usePagination } from "@/hooks/use-pagination";
import { ITEMS_PER_PAGE } from "@/lib/appConstant";
import { Search, MapPin } from "lucide-react";
import type { Provider } from "@/lib/mock-data";

export interface ProvidersFilterSectionProps {
  providers: Provider[];
  children: (props: {
    filteredProviders: Provider[];
    paginatedItems: Provider[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    clearAllFilters: () => void;
    resultCount: number;
    isPending: boolean;
  }) => React.ReactNode;
}

export function ProvidersFilterSection({
  providers,
  children,
}: ProvidersFilterSectionProps) {
  const setCurrentPageRef = useRef<(page: number) => void>(() => {});

  const filter = useProvidersFilter(providers, {
    onFiltersChange: () => setCurrentPageRef.current(1),
  });

  const pagination = usePagination(filter.filteredProviders, ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPageRef.current = pagination.setCurrentPage;
  });

  return (
    <>
      <section className="bg-slate-50/80 border-b border-slate-200 py-6 sm:py-8 w-full z-20 relative">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={filter.search}
                onChange={(e) => filter.setSearch(e.target.value)}
                placeholder="Name, Services, Conditions"
                className="w-full h-[52px] rounded-sm border border-slate-300 bg-slate-100 py-2 pl-4 pr-12 text-[15px] text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
                strokeWidth={2.5}
              />
            </div>

            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={filter.locationSearch}
                onChange={(e) => filter.setLocationSearch(e.target.value)}
                placeholder="City, Address, Zip Code"
                className="w-full h-[52px] rounded-sm border border-slate-300 bg-slate-100 py-2 pl-4 pr-12 text-[15px] text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <MapPin
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
                strokeWidth={2.5}
              />
            </div>

            <Button className="h-[52px] px-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold rounded-sm shrink-0 whitespace-nowrap hidden md:flex cursor-pointer">
              Search
            </Button>
          </div>

          <Button className="w-full h-[52px] mb-4 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold rounded-sm shrink-0 whitespace-nowrap md:hidden cursor-pointer">
            Search
          </Button>

          <ProvidersFilter
            selectedSpecialties={filter.selectedSpecialties}
            toggleSpecialty={filter.toggleSpecialty}
            selectedCounties={filter.selectedCounties}
            toggleCounty={filter.toggleCounty}
            selectedLocations={filter.selectedLocations}
            toggleLocation={filter.toggleLocation}
            selectedGender={filter.selectedGender}
            toggleGender={filter.toggleGender}
            selectedLanguages={filter.selectedLanguages}
            toggleLanguage={filter.toggleLanguage}
            selectedAgesSeen={filter.selectedAgesSeen}
            toggleAgesSeen={filter.toggleAgesSeen}
            sortBy={filter.sortBy}
            setSortBy={filter.setSortBy}
            activeFilterCount={filter.activeFilterCount}
            clearAllFilters={filter.clearAllFilters}
          />
        </div>
      </section>

      {children({
        filteredProviders: filter.filteredProviders,
        paginatedItems: pagination.paginatedItems,
        totalPages: pagination.totalPages,
        currentPage: pagination.currentPage,
        onPageChange: (page) => {
          pagination.setCurrentPage(page);
          window.scrollTo({ top: 300, behavior: "smooth" });
        },
        clearAllFilters: filter.clearAllFilters,
        resultCount: filter.resultCount,
        isPending: filter.isPending,
      })}
    </>
  );
}
