"use client";

import { create } from "zustand";
import type { Provider } from "@/lib/mock-data";

export interface SearchFilters {
  specialtyOrProvider: string;
  zipCode: string;
  patientAge: string;
  insurance: string;
}

interface SearchFiltersState extends SearchFilters {
  selectedProvider: Provider | null;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  clearSearchFilters: () => void;
  setSelectedProvider: (provider: Provider | null) => void;
}

const emptyFilters: SearchFilters = {
  specialtyOrProvider: "",
  zipCode: "",
  patientAge: "",
  insurance: "",
};

export const useSearchFiltersStore = create<SearchFiltersState>((set) => ({
  ...emptyFilters,
  selectedProvider: null,
  setSearchFilters: (filters) => set((s) => ({ ...s, ...filters })),
  clearSearchFilters: () => set({ ...emptyFilters, selectedProvider: null }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
}));
