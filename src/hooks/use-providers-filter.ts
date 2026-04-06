"use client";

import {
  useState,
  useMemo,
  useCallback,
  useTransition,
  useEffect,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import {
  specialties,
  getLocationNamesForCounties,
  normalizeCountyKey,
  providerLocationMatchesTownLabel,
} from "@/lib/mock-data";
import { INSURANCE_OPTIONS } from "@/components/home/insurance-select-component";
import type { Provider } from "@/lib/mock-data";

export interface FilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export interface UseProvidersFilterOptions {
  onFiltersChange?: () => void;
}

export interface UseProvidersFilterResult {
  filteredProviders: Provider[];
  resultCount: number;
  isPending: boolean;
  activeFilterCount: number;
  activeFilterChips: FilterChip[];
  clearAllFilters: () => void;

  search: string;
  setSearch: (v: string) => void;
  locationSearch: string;
  setLocationSearch: (v: string) => void;

  selectedSpecialties: string[];
  toggleSpecialty: (s: string) => void;
  selectedCounties: string[];
  toggleCounty: (c: string) => void;
  selectedLocations: string[];
  toggleLocation: (l: string) => void;
  /** Location names shown in the Location filter (scoped by selected counties). */
  locationFilterOptions: string[];
  selectedGender: string;
  toggleGender: (g: string) => void;
  selectedLanguages: string[];
  toggleLanguage: (lang: string) => void;
  selectedAgesSeen: string[];
  toggleAgesSeen: (age: string) => void;
  selectedInsurance: string;
  setSelectedInsurance: (v: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

/** Resolves the insurance option label from a raw value string. */
function insuranceLabel(val: string): string {
  return INSURANCE_OPTIONS.find((o) => o.value === val)?.label ?? val;
}

export function useProvidersFilter(
  providers: Provider[],
  options: UseProvidersFilterOptions = {},
): UseProvidersFilterResult {
  const { onFiltersChange } = options;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // ── initialise from URL params ─────────────────────────────────────────────
  // ?specialty= may be a specialty name OR a provider-name search term
  const specialtyParam = searchParams.get("specialty") ?? "";
  const isExactSpecialty = specialties.includes(specialtyParam);

  const [search, setSearch] = useState(() =>
    !isExactSpecialty && specialtyParam
      ? specialtyParam
      : (searchParams.get("search") ?? ""),
  );
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    () => (isExactSpecialty ? [specialtyParam] : []),
  );
  const [selectedAgesSeen, setSelectedAgesSeen] = useState<string[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState(
    () => searchParams.get("insurance") ?? "",
  );

  // ── other filter state (sidebar) ───────────────────────────────────────────
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [acceptingOnly, setAcceptingOnly] = useState(false);
  const [telehealthOnly, setTelehealthOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const debouncedSearch = useDebounce(search, 600);
  const debouncedLocationSearch = useDebounce(locationSearch, 600);

  const locationFilterOptions = useMemo(
    () => getLocationNamesForCounties(selectedCounties),
    [selectedCounties],
  );

  useEffect(() => {
    const allowed = new Set(locationFilterOptions);
    setSelectedLocations((prev) => {
      const next = prev.filter((l) => allowed.has(l));
      return next.length === prev.length ? prev : next;
    });
  }, [locationFilterOptions]);

  // ── URL helper ─────────────────────────────────────────────────────────────
  const removeURLParam = useCallback(
    (...keys: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      keys.forEach((k) => params.delete(k));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const notifyFilterChange = useCallback(() => {
    onFiltersChange?.();
  }, [onFiltersChange]);

  // ── filtering ──────────────────────────────────────────────────────────────
  const filteredProviders = useMemo(() => {
    let result = providers.filter((p) => (p.Name || "").trim().length > 0);

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
      const qLoc = debouncedLocationSearch.toLowerCase().replace(/\s+/g, " ");
      result = result.filter(
        (p) =>
          p.Locations?.some((loc) =>
            loc.toLowerCase().replace(/\s+/g, " ").includes(qLoc),
          ) || p.country?.toLowerCase().replace(/\s+/g, " ").includes(qLoc),
      );
    }

    if (selectedSpecialties.length > 0) {
      result = result.filter((p) =>
        p.Specialties?.some((s) => selectedSpecialties.includes(s)),
      );
    }

    if (selectedCounties.length > 0) {
      result = result.filter(
        (p) =>
          p.country &&
          selectedCounties.some((c) => normalizeCountyKey(c) === p.country),
      );
    }

    if (selectedLocations.length > 0) {
      result = result.filter((p) =>
        p.Locations?.some((loc) =>
          selectedLocations.some(
            (sel) => loc === sel || providerLocationMatchesTownLabel(loc, sel),
          ),
        ),
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

    // Insurance filtering — provider data does not include accepted insurances,
    // so this is stored and displayed as a chip for UX continuity but not applied.

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => {
          const an = (a.Name || "").trim();
          const bn = (b.Name || "").trim();
          if (!an && !bn) return 0;
          if (!an) return 1;
          if (!bn) return -1;
          return an.localeCompare(bn);
        });
        break;
      case "name-desc":
        result.sort((a, b) => {
          const an = (a.Name || "").trim();
          const bn = (b.Name || "").trim();
          if (!an && !bn) return 0;
          if (!an) return 1;
          if (!bn) return -1;
          return bn.localeCompare(an);
        });
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

  // ── chips ──────────────────────────────────────────────────────────────────
  const activeFilterChips = useMemo((): FilterChip[] => {
    const chips: FilterChip[] = [];

    if (search) {
      chips.push({
        key: "search",
        label: search,
        onRemove: () => {
          setSearch("");
          removeURLParam("specialty", "search");
          notifyFilterChange();
        },
      });
    }

    selectedSpecialties.forEach((s) => {
      chips.push({
        key: `specialty:${s}`,
        label: s,
        onRemove: () => {
          startTransition(() => {
            setSelectedSpecialties((prev) => prev.filter((x) => x !== s));
            notifyFilterChange();
          });
          removeURLParam("specialty");
        },
      });
    });

    if (locationSearch) {
      chips.push({
        key: "location",
        label: `Near: ${locationSearch}`,
        onRemove: () => {
          setLocationSearch("");
          removeURLParam("zip");
          notifyFilterChange();
        },
      });
    }

    selectedAgesSeen.forEach((a) => {
      chips.push({
        key: `age:${a}`,
        label: a,
        onRemove: () => {
          startTransition(() => {
            setSelectedAgesSeen((prev) => prev.filter((x) => x !== a));
            notifyFilterChange();
          });
          removeURLParam("age");
        },
      });
    });

    if (selectedInsurance) {
      chips.push({
        key: "insurance",
        label: insuranceLabel(selectedInsurance),
        onRemove: () => {
          setSelectedInsurance("");
          removeURLParam("insurance");
          notifyFilterChange();
        },
      });
    }

    if (selectedGender) {
      chips.push({
        key: "gender",
        label: selectedGender,
        onRemove: () => {
          startTransition(() => {
            setSelectedGender("");
            notifyFilterChange();
          });
        },
      });
    }

    selectedLanguages.forEach((l) => {
      chips.push({
        key: `lang:${l}`,
        label: l,
        onRemove: () => {
          startTransition(() => {
            setSelectedLanguages((prev) => prev.filter((x) => x !== l));
            notifyFilterChange();
          });
        },
      });
    });

    selectedCounties.forEach((c) => {
      chips.push({
        key: `county:${c}`,
        label: c,
        onRemove: () => {
          startTransition(() => {
            setSelectedCounties((prev) => prev.filter((x) => x !== c));
            notifyFilterChange();
          });
        },
      });
    });

    selectedLocations.forEach((l) => {
      chips.push({
        key: `loc:${l}`,
        label: l,
        onRemove: () => {
          startTransition(() => {
            setSelectedLocations((prev) => prev.filter((x) => x !== l));
            notifyFilterChange();
          });
        },
      });
    });

    return chips;
  }, [
    search,
    selectedSpecialties,
    locationSearch,
    selectedAgesSeen,
    selectedInsurance,
    selectedGender,
    selectedLanguages,
    selectedCounties,
    selectedLocations,
    notifyFilterChange,
    removeURLParam,
  ]);

  const activeFilterCount = activeFilterChips.length;

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
      setSelectedInsurance("");
      setAcceptingOnly(false);
      setTelehealthOnly(false);
      onFiltersChange?.();
    });
    router.replace(pathname, { scroll: false });
  }, [onFiltersChange, router, pathname]);

  // ── toggle helpers ─────────────────────────────────────────────────────────
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
    (s: string) =>
      wrapTransition(() =>
        setSelectedSpecialties((prev) =>
          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
        ),
      ),
    [wrapTransition],
  );

  const toggleCounty = useCallback(
    (c: string) =>
      wrapTransition(() =>
        setSelectedCounties((prev) =>
          prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
        ),
      ),
    [wrapTransition],
  );

  const toggleLocation = useCallback(
    (l: string) =>
      wrapTransition(() =>
        setSelectedLocations((prev) =>
          prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l],
        ),
      ),
    [wrapTransition],
  );

  const toggleGender = useCallback(
    (g: string) =>
      wrapTransition(() => setSelectedGender((prev) => (prev === g ? "" : g))),
    [wrapTransition],
  );

  const toggleLanguage = useCallback(
    (lang: string) =>
      wrapTransition(() =>
        setSelectedLanguages((prev) =>
          prev.includes(lang)
            ? prev.filter((x) => x !== lang)
            : [...prev, lang],
        ),
      ),
    [wrapTransition],
  );

  const toggleAgesSeen = useCallback(
    (age: string) =>
      wrapTransition(() =>
        setSelectedAgesSeen((prev) =>
          prev.includes(age) ? prev.filter((x) => x !== age) : [...prev, age],
        ),
      ),
    [wrapTransition],
  );

  const handleSetSortBy = useCallback(
    (val: string) => wrapTransition(() => setSortBy(val)),
    [wrapTransition],
  );

  // suppress unused-variable warnings for flags used only in clearAllFilters
  void acceptingOnly;
  void telehealthOnly;

  return {
    filteredProviders,
    resultCount: filteredProviders.length,
    isPending,
    activeFilterCount,
    activeFilterChips,
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
    locationFilterOptions,
    selectedGender,
    toggleGender,
    selectedLanguages,
    toggleLanguage,
    selectedAgesSeen,
    toggleAgesSeen,
    selectedInsurance,
    setSelectedInsurance,
    sortBy,
    setSortBy: handleSetSortBy,
  };
}
