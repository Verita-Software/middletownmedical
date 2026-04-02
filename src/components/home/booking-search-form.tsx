"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpecialtyProviderSearch } from "@/components/home/specialty-provider-search-component";
import { InsuranceSelect } from "@/components/home/insurance-select-component";
import { useSearchFiltersStore } from "@/store/search-filters-store";

export function BookingSearchForm() {
  const [specialtyOrProvider, setSpecialtyOrProvider] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [insurance, setInsurance] = useState("");
  const [error, setError] = useState("");

  const setSearchFilters = useSearchFiltersStore((s) => s.setSearchFilters);
  const router = useRouter();

  function handleSearch() {
    const hasValue = specialtyOrProvider || zipCode || patientAge || insurance;
    if (!hasValue) {
      setError("Please enter at least one search criteria to find providers.");
      return;
    }
    setError("");

    // Persist to Zustand so booking/detail pages can read context
    setSearchFilters({ specialtyOrProvider, zipCode, patientAge, insurance });

    // Build URL query string and navigate
    const params = new URLSearchParams();
    if (specialtyOrProvider) params.set("specialty", specialtyOrProvider);
    if (zipCode) params.set("zip", zipCode);
    if (patientAge) params.set("age", patientAge);
    if (insurance) params.set("insurance", insurance);

    router.push(`/providers?${params.toString()}`);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
        {/* Specialty / Provider combobox */}
        <SpecialtyProviderSearch
          value={specialtyOrProvider}
          onValueChange={setSpecialtyOrProvider}
        />

        {/* Zip Code */}
        <div className="relative border-b-2 border-slate-300 focus-within:border-[#002147] transition-colors pb-0">
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-800"
            strokeWidth={2.5}
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-100 text-[15px] font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none"
          />
        </div>

        {/* Patient Age */}
        <div className="relative border-b-2 border-slate-300 focus-within:border-[#002147] transition-colors pb-0">
          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-800"
            strokeWidth={2.5}
          />
          <input
            type="number"
            min={0}
            max={120}
            placeholder="Patient Age"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-100 text-[15px] font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* Insurance */}
        <InsuranceSelect
          value={insurance}
          onValueChange={(val) => setInsurance(val)}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium mb-4 -mt-1">{error}</p>
      )}

      <Button
        onClick={handleSearch}
        className="bg-[#002147] hover:bg-[#002147]/90 text-white font-bold text-lg px-8  h-auto w-fit rounded-sm shadow-md transition-all"
      >
        Search
      </Button>
    </>
  );
}
