"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Loader2, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/mock-data";
import { useBookingStore } from "@/store/booking-store";
import { LOCATION_PHONES, BOOKING_PATIENT_NAME_OVERRIDE } from "@/lib/appConstant";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const SEX_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const INSURANCE_OPTIONS = [
  { value: "self", label: "I'll be paying for myself" },
  { value: "medicaid", label: "Medicaid" },
  { value: "aetna", label: "Aetna" },
  { value: "bcbs", label: "Blue Cross Blue Shield" },
  { value: "cigna", label: "Cigna" },
];

interface BookDetailsStepProps {
  provider: Provider;
}

export function BookDetailsStep({ provider }: BookDetailsStepProps) {
  const {
    selectedSlot,
    selectedDate,
    setStep,
    patientDetails,
    setPatientDetails,
    setLoading,
    setError,
    setBookSuccess,
    loading,
    error,
  } = useBookingStore();

  const [form, setForm] = useState({
    firstName: patientDetails.firstName ?? "",
    lastName: patientDetails.lastName ?? "",
    legalSex: patientDetails.legalSex ?? "",
    birthDate: patientDetails.birthDate ?? "",
    phone: patientDetails.phone ?? "",
    email: patientDetails.email ?? "",
    address: patientDetails.address ?? "",
    aptSuite: patientDetails.aptSuite ?? "",
    city: patientDetails.city ?? "",
    state: patientDetails.state ?? "",
    zip: patientDetails.zip ?? "",
    insurance: patientDetails.insurance ?? "",
  });

  // When navigating back to this step, sync form from store
  useEffect(() => {
    setForm({
      firstName: patientDetails.firstName ?? "",
      lastName: patientDetails.lastName ?? "",
      legalSex: patientDetails.legalSex ?? "",
      birthDate: patientDetails.birthDate ?? "",
      phone: patientDetails.phone ?? "",
      email: patientDetails.email ?? "",
      address: patientDetails.address ?? "",
      aptSuite: patientDetails.aptSuite ?? "",
      city: patientDetails.city ?? "",
      state: patientDetails.state ?? "",
      zip: patientDetails.zip ?? "",
      insurance: patientDetails.insurance ?? "",
    });
  }, [
    patientDetails.firstName,
    patientDetails.lastName,
    patientDetails.legalSex,
    patientDetails.birthDate,
    patientDetails.phone,
    patientDetails.email,
    patientDetails.address,
    patientDetails.aptSuite,
    patientDetails.city,
    patientDetails.state,
    patientDetails.zip,
    patientDetails.insurance,
  ]);

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setPatientDetails({ [key]: value });
  };

  if (!selectedSlot || !selectedDate) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <p className="text-slate-600 mb-4">No appointment time selected.</p>
        <button
          type="button"
          onClick={() => setStep("schedule")}
          className="text-[#002147] font-semibold hover:underline"
        >
          Back to Appointment Times
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotReference: selectedSlot!.reference,
          practitionerRef: provider.npiId ?? "",
          start: selectedSlot!.start,
          end: selectedSlot!.end,
          patient: {
            firstName: BOOKING_PATIENT_NAME_OVERRIDE.firstName,
            lastName: BOOKING_PATIENT_NAME_OVERRIDE.lastName,
            birthDate: form.birthDate,
            phone: form.phone.replace(/\D/g, "").slice(-10),
            email: form.email,
            gender: form.legalSex,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? res.statusText);
      }
      setBookSuccess(true);
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  const locationName = provider.Locations?.[0] ?? "";
  const locationPhone = LOCATION_PHONES[locationName] ?? "(845) 342-4774";
  const locationAddress = locationName.split(" - ")[0] || locationName;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        type="button"
        onClick={() => setStep("schedule")}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#002147] hover:text-[#00AEEF] transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Appointment Times
      </button>

      <h1 className="text-2xl font-bold text-[#002147] mb-2">
        Who&apos;s coming to see {provider.Name}?
      </h1>
      <p className="text-slate-600 mb-8">
        Please complete the below fields for the patient to be seen at this appointment. Ensure the information is correct prior to scheduling.
      </p>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 mb-6">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-[#002147] mb-4">Patient Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Legal Sex *</label>
                <select
                  required
                  value={form.legalSex}
                  onChange={(e) => update("legalSex", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                >
                  <option value="">Select</option>
                  {SEX_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={form.birthDate}
                  onChange={(e) => update("birthDate", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-[#002147] mb-4">Patient Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="Street address"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Apt, Suite, etc.</label>
                <input
                  type="text"
                  value={form.aptSuite}
                  onChange={(e) => update("aptSuite", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Zip *</label>
                <input
                  type="text"
                  required
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-[#002147] mb-2">Registration Information</h2>
            <p className="text-sm text-slate-600 mb-4">
              Please provide your insurance below to reduce the registration time required at your appointment.
            </p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Insurance *</label>
              <select
                required
                value={form.insurance}
                onChange={(e) => update("insurance", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/20 outline-none bg-slate-100"
              >
                <option value="">Select</option>
                {INSURANCE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto min-w-[200px] h-12 bg-[#002147] hover:bg-[#002147]/90 text-white font-semibold rounded-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scheduling…
              </>
            ) : (
              "Schedule Appointment"
            )}
          </Button>
        </form>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                {provider.profile_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={provider.profile_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-slate-500">
                    {provider.Name.trim().charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-[#002147]">{provider.Name}</p>
                <p className="text-sm text-slate-600">{provider.Specialties?.[0] ?? ""}</p>
              </div>
            </div>
            {selectedDate && selectedSlot && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <p className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-[#002147]" />
                  {formatDate(selectedDate.start)}
                </p>
                <p className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-[#002147]" />
                  {formatTime(selectedSlot.start)}
                </p>
              </div>
            )}
            <div className="pt-4 mt-4 border-t border-slate-200">
              <p className="flex items-start gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#002147]" />
                {locationAddress}
                <br />
                {locationName}
              </p>
              <a
                href={`tel:${locationPhone.replace(/\D/g, "")}`}
                className="inline-block mt-2 text-[#002147] font-semibold text-sm hover:underline"
              >
                {locationPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
