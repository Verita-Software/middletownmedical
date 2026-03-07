"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  specialties,
  counties,
  locations,
  languages,
  AGES_SEEN_OPTIONS,
} from "@/lib/mock-data";

const genders = ["Male", "Female"];

export interface ProvidersFilterProps {
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
  activeFilterCount: number;
  clearAllFilters: () => void;
}

function HoverDropdown({
  label,
  options,
  selectedValues,
  onToggle,
}: {
  label: string;
  options: { id: string | number; name: string }[] | string[];
  selectedValues: string[];
  onToggle: (val: string) => void;
}) {
  const count = selectedValues.length;

  return (
    <div className="relative group inline-block">
      <Button
        variant="outline"
        className={`h-10 cursor-pointer rounded-sm border-slate-300 text-slate-900 font-bold text-[13px] hover:bg-slate-100 hover:text-slate-900 ${
          count > 0 ? "border-primary bg-primary/5" : ""
        }`}
      >
        {label}
        {count > 0 && (
          <Badge className="ml-2 bg-primary text-primary-foreground px-1.5 min-w-[20px] h-5 rounded-[4px] flex items-center justify-center text-[11px] hover:bg-primary/90">
            {count}
          </Badge>
        )}
      </Button>

      {/* Popover container */}
      <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-100">
        <div className="bg-white border border-slate-200 rounded-md shadow-xl w-64 max-h-80 overflow-y-auto p-2">
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.name;
            const checked = selectedValues.includes(val);
            return (
              <label
                key={val}
                className="flex items-start gap-3 p-2 text-[14px] font-medium text-slate-700 cursor-pointer hover:bg-slate-50 hover:text-primary rounded-sm transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => onToggle(val)}
                  className="mt-0.5 border-slate-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                {val}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ProvidersFilter({
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
  setSortBy,
  activeFilterCount,
  clearAllFilters,
}: ProvidersFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 relative z-100">
      <HoverDropdown
        label="County"
        options={counties}
        selectedValues={selectedCounties}
        onToggle={toggleCounty}
      />

      <HoverDropdown
        label="Ages Seen"
        options={[...AGES_SEEN_OPTIONS]}
        selectedValues={selectedAgesSeen}
        onToggle={toggleAgesSeen}
      />

      <HoverDropdown
        label="Specialty"
        options={specialties}
        selectedValues={selectedSpecialties}
        onToggle={toggleSpecialty}
      />

      <HoverDropdown
        label="Gender"
        options={genders}
        selectedValues={selectedGender ? [selectedGender] : []}
        onToggle={toggleGender}
      />

      <HoverDropdown
        label="Location"
        options={locations}
        selectedValues={selectedLocations}
        onToggle={toggleLocation}
      />

      <HoverDropdown
        label="Language Spoken"
        options={languages}
        selectedValues={selectedLanguages}
        onToggle={toggleLanguage}
      />

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="cursor-pointer h-10 w-auto min-w-[120px] rounded-sm border-slate-300 text-slate-900 font-bold text-[13px] bg-slate-100 hover:bg-slate-200 px-4">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="z-100">
          <SelectItem value="relevance" className="font-medium text-slate-700">
            Sort By
          </SelectItem>
          <SelectItem value="name-asc" className="font-medium text-slate-700">
            Name A-Z
          </SelectItem>
          <SelectItem value="name-desc" className="font-medium text-slate-700">
            Name Z-A
          </SelectItem>
        </SelectContent>
      </Select>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="text-[13px] text-primary hover:underline ml-2 font-bold"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
