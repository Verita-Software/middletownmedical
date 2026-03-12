"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/mock-data";
import { useBookingStore } from "@/store/booking-store";
import { BOOKING_PROVIDER_DISPLAY_NAME } from "@/lib/appConstant";
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

/**
 * Renders a scheduling card that collects patient age and insurance, validates those inputs,
 * and navigates to the provider's booking page when the user requests available appointment times.
 *
 * @param provider - The provider used to initialize the booking and construct the booking route
 * @returns The schedule appointment card element
 */
export function ScheduleAppointmentCard({
  provider,
}: ScheduleAppointmentCardProps) {
  const router = useRouter();
  const setProvider = useBookingStore((s) => s.setProvider);
  const setAgeAndInsurance = useBookingStore((s) => s.setAgeAndInsurance);
  const setStep = useBookingStore((s) => s.setStep);

  const [patientAge, setPatientAge] = useState("");
  const [insurance, setInsurance] = useState("");
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
          Schedule an Appointment with {BOOKING_PROVIDER_DISPLAY_NAME}
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
            <select
              id="insurance"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none transition bg-slate-100"
            >
              <option value="">Select insurance</option>
              {INSURANCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
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
