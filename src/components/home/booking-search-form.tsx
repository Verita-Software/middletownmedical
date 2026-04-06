"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpecialtyProviderSearch } from "@/components/home/specialty-provider-search-component";
import { InsuranceSelect } from "@/components/home/insurance-select-component";
import { useSearchFiltersStore } from "@/store/search-filters-store";

const US_ZIP_RE = /^\d{5}(-\d{4})?$/;

export function BookingSearchForm() {
  const [specialtyOrProvider, setSpecialtyOrProvider] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [insurance, setInsurance] = useState("");
  const [error, setError] = useState("");

  const setSearchFilters = useSearchFiltersStore((s) => s.setSearchFilters);
  const router = useRouter();

  function handleSearch() {
    const spec = specialtyOrProvider.trim();
    const zip = zipCode.trim();
    const age = patientAge.trim();

    if (!spec) {
      setError("Please enter a specialty, provider, or symptom.");
      return;
    }
    if (!zip) {
      setError("Please enter a ZIP code.");
      return;
    }
    if (!US_ZIP_RE.test(zip)) {
      setError("Please enter a valid ZIP code (e.g. 10940 or 10940-1234).");
      return;
    }
    if (!age) {
      setError("Please enter patient age.");
      return;
    }
    const ageNum = parseInt(age, 10);
    if (Number.isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      setError("Please enter a valid patient age (0–120).");
      return;
    }
    if (!insurance) {
      setError("Please select an insurance option.");
      return;
    }

    setError("");

    // Persist to Zustand so booking/detail pages can read context
    setSearchFilters({
      specialtyOrProvider: spec,
      zipCode: zip,
      patientAge: age,
      insurance,
    });

    const params = new URLSearchParams();
    params.set("specialty", spec);
    params.set("zip", zip);
    params.set("age", age);
    params.set("insurance", insurance);

    router.push(`/providers?${params.toString()}`);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
        {/* Specialty / Provider combobox */}
        <SpecialtyProviderSearch
          placeholder="Specialty, Provider, or Symptom *"
          ariaRequired
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
            inputMode="numeric"
            autoComplete="postal-code"
            required
            placeholder="Zip Code *"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            maxLength={10}
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
            required
            autoComplete="off"
            placeholder="Patient Age *"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-100 text-[15px] font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* Insurance */}
        <InsuranceSelect
          ariaRequired
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
