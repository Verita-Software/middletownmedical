"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Provider } from "@/lib/mock-data";
import { useBookingStore } from "@/store/booking-store";
import { useSearchFiltersStore } from "@/store/search-filters-store";
import { Calendar } from "lucide-react";

const INSURANCE_OPTIONS = [
  { value: "self", label: "I'll be paying for myself" },
  { value: "medicaid", label: "My insurance is Medicaid" },
  { value: "aetna", label: "Aetna" },
  { value: "bcbs", label: "Blue Cross Blue Shield" },
  { value: "cigna", label: "Cigna" },
];

interface ScheduleAppointmentCardProps {
  provider: Provider;
}

export function ScheduleAppointmentCard({
  provider,
}: ScheduleAppointmentCardProps) {
  const router = useRouter();
  const setProvider = useBookingStore((s) => s.setProvider);
  const setAgeAndInsurance = useBookingStore((s) => s.setAgeAndInsurance);
  const setStep = useBookingStore((s) => s.setStep);

  const savedAge = useSearchFiltersStore((s) => s.patientAge);
  const savedInsurance = useSearchFiltersStore((s) => s.insurance);

  const [patientAge, setPatientAge] = useState(savedAge ?? "");
  const [insurance, setInsurance] = useState(savedInsurance ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleViewAppointmentTimes = () => {
    setError(null);
    const age = patientAge.trim();
    const ins = insurance.trim();
    if (!age) {
      setError("Please enter patient age.");
      return;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      setError("Please enter a valid age (0–120).");
      return;
    }
    if (!ins) {
      setError("Please select insurance.");
      return;
    }
    setProvider(provider);
    setAgeAndInsurance(age, ins);
    setStep("questions");
    router.push(`/providers/${provider.id}/book`);
  };

  return (
    <div className="lg:w-80 shrink-0">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
        <h2 className="text-lg font-bold text-[#002147] mb-1">
          Schedule an Appointment with {provider.Name}
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          Enter the patient&apos;s age and insurance to view available times.
        </p>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="patient-age"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Patient Age <span className="text-red-500">*</span>
            </label>
            <input
              id="patient-age"
              type="number"
              min={0}
              max={120}
              placeholder="e.g. 25"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className="w-full bg-slate-100 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none transition"
            />
          </div>
          <div>
            <label
              htmlFor="insurance"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Insurance <span className="text-red-500">*</span>
            </label>
            <Select value={insurance} onValueChange={setInsurance}>
              <SelectTrigger
                id="insurance"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none transition bg-slate-100 h-auto"
              >
                <SelectValue placeholder="Select insurance" />
              </SelectTrigger>
              <SelectContent align="start" position="popper" className="w-(--radix-select-trigger-width)">
                {INSURANCE_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="focus:bg-primary focus:text-primary-foreground data-highlighted:bg-primary data-highlighted:text-primary-foreground"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            onClick={handleViewAppointmentTimes}
            className="w-full bg-[#002147] hover:bg-[#002147]/90 text-white font-semibold h-11 rounded-lg flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            View Appointment Times
          </Button>
        </div>
      </div>
    </div>
  );
}
