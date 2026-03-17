"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import type { Provider } from "@/lib/mock-data";

export interface UseProvidersFilterOptions {
  /** Called when any filter changes (e.g. to reset pagination in parent). */
  onFiltersChange?: () => void;
}

export interface UseProvidersFilterResult {
  filteredProviders: Provider[];
  resultCount: number;
  isPending: boolean;
  activeFilterCount: number;
  clearAllFilters: () => void;

  // Search inputs
  search: string;
  setSearch: (v: string) => void;
  locationSearch: string;
  setLocationSearch: (v: string) => void;

  // Filter state + toggles (for ProvidersFilter UI)
  selectedSpecialties: string[];
  toggleSpecialty: (s: string) => void;
  selectedCounties: string[];
  toggleCounty: (c: string) => void;
  selectedLocations: string[];
  toggleLocation: (l: string) => void;
  selectedGender: string;
  toggleGender: (g: string) => void;
  selectedLanguages: string[];
  toggleLanguage: (lang: string) => void;
  selectedAgesSeen: string[];
  toggleAgesSeen: (age: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function useProvidersFilter(
  providers: Provider[],
  options: UseProvidersFilterOptions = {},
): UseProvidersFilterResult {
  const { onFiltersChange } = options;
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get("specialty") ? [searchParams.get("specialty")!] : [],
  );
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedAgesSeen, setSelectedAgesSeen] = useState<string[]>([]);
  const [acceptingOnly, setAcceptingOnly] = useState(false);
  const [telehealthOnly, setTelehealthOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const debouncedSearch = useDebounce(search, 600);
  const debouncedLocationSearch = useDebounce(locationSearch, 600);

  const notifyFilterChange = useCallback(() => {
    onFiltersChange?.();
  }, [onFiltersChange]);

  const filteredProviders = useMemo(() => {
    let result = [...providers];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase().replace(/\s+/g, " ");
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

    if (debouncedLocationSearch) {
      const qLocation = debouncedLocationSearch
        .toLowerCase()
        .replace(/\s+/g, " ");
      result = result.filter((p) => {
        const locationMatch = p.Locations?.some((loc) =>
          loc.toLowerCase().replace(/\s+/g, " ").includes(qLocation),
        );
        const countryMatch = p.country
          ?.toLowerCase()
          .replace(/\s+/g, " ")
          .includes(qLocation);
        return locationMatch || countryMatch;
      });
    }

    if (selectedSpecialties.length > 0) {
      result = result.filter((p) =>
        p.Specialties?.some((s) => selectedSpecialties.includes(s)),
      );
    }

    if (selectedCounties.length > 0) {
      result = result.filter(
        (p) => p.country && selectedCounties.includes(p.country),
      );
    }

    if (selectedLocations.length > 0) {
      result = result.filter((p) =>
        p.Locations?.some((l) => selectedLocations.includes(l)),
      );
    }

    if (selectedGender) {
      result = result.filter((p) => p.gender === selectedGender);
    }

    if (selectedLanguages.length > 0) {
      result = result.filter((p) =>
        p.LanguagesSpoken?.some((lang) => selectedLanguages.includes(lang)),
      );
    }

    if (selectedAgesSeen.length > 0) {
      result = result.filter((p) =>
        p.AgesSeen?.some((age) => selectedAgesSeen.includes(age)),
      );
    }

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
    providers,
    selectedSpecialties,
    selectedCounties,
    selectedLocations,
    selectedGender,
    selectedLanguages,
    selectedAgesSeen,
    sortBy,
    debouncedSearch,
    debouncedLocationSearch,
  ]);

  const activeFilterCount =
    selectedSpecialties.length +
    selectedCounties.length +
    selectedLocations.length +
    (selectedGender ? 1 : 0) +
    selectedLanguages.length +
    selectedAgesSeen.length +
    (acceptingOnly ? 1 : 0) +
    (telehealthOnly ? 1 : 0);

  const clearAllFilters = useCallback(() => {
    startTransition(() => {
      setSearch("");
      setLocationSearch("");
      setSelectedSpecialties([]);
      setSelectedCounties([]);
      setSelectedLocations([]);
      setSelectedGender("");
      setSelectedLanguages([]);
      setSelectedAgesSeen([]);
      setAcceptingOnly(false);
      setTelehealthOnly(false);
      onFiltersChange?.();
    });
  }, [onFiltersChange]);

  const wrapTransition = useCallback(
    (fn: () => void) => {
      startTransition(() => {
        fn();
        notifyFilterChange();
      });
    },
    [notifyFilterChange],
  );

  const toggleSpecialty = useCallback(
    (s: string) => {
      wrapTransition(() => {
        setSelectedSpecialties((prev) =>
          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
        );
      });
    },
    [wrapTransition],
  );

  const toggleCounty = useCallback(
    (c: string) => {
      wrapTransition(() => {
        setSelectedCounties((prev) =>
          prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
        );
      });
    },
    [wrapTransition],
  );

  const toggleLocation = useCallback(
    (l: string) => {
      wrapTransition(() => {
        setSelectedLocations((prev) =>
          prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l],
        );
      });
    },
    [wrapTransition],
  );

  const toggleGender = useCallback(
    (g: string) => {
      wrapTransition(() => {
        setSelectedGender((prev) => (prev === g ? "" : g));
      });
    },
    [wrapTransition],
  );

  const toggleLanguage = useCallback(
    (lang: string) => {
      wrapTransition(() => {
        setSelectedLanguages((prev) =>
          prev.includes(lang) ? prev.filter((x) => x !== lang) : [...prev, lang],
        );
      });
    },
    [wrapTransition],
  );

  const toggleAgesSeen = useCallback(
    (age: string) => {
      wrapTransition(() => {
        setSelectedAgesSeen((prev) =>
          prev.includes(age) ? prev.filter((x) => x !== age) : [...prev, age],
        );
      });
    },
    [wrapTransition],
  );

  const handleSetSortBy = useCallback(
    (val: string) => {
      wrapTransition(() => setSortBy(val));
    },
    [wrapTransition],
  );

  return {
    filteredProviders,
    resultCount: filteredProviders.length,
    isPending,
    activeFilterCount,
    clearAllFilters,
    search,
    setSearch,
    locationSearch,
    setLocationSearch,
    selectedSpecialties,
    toggleSpecialty,
    selectedCounties,
    toggleCounty,
    selectedLocations,
    toggleLocation,
    selectedGender,
    toggleGender,
    selectedLanguages,
    toggleLanguage,
    selectedAgesSeen,
    toggleAgesSeen,
    sortBy,
    setSortBy: handleSetSortBy,
  };
}
