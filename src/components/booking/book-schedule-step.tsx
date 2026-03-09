"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Loader2,
} from "lucide-react";
import type { Provider } from "@/lib/mock-data";
import type {
  ScheduleBundle,
  SlotBundle,
  FhirSchedule,
  FhirSlot,
} from "@/types/healow";
import { useBookingStore } from "@/store/booking-store";
import { Button } from "../ui/button";

const DEFAULT_LOCATION_ID = "2";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function toDateOnly(iso: string): string {
  return iso.slice(0, 10);
}

interface BookScheduleStepProps {
  provider: Provider;
}

export function BookScheduleStep({ provider }: BookScheduleStepProps) {
  const actor = provider.npiId ?? "";
  const {
    scheduleEntries,
    slotEntries,
    selectedDate,
    selectedSlot,
    setScheduleEntries,
    setSlotEntries,
    setSelectedDate,
    setSelectedSlot,
    setStep,
    setLoading,
    setError,
    loading,
    error,
  } = useBookingStore();

  // When navigating back, show the week that contains the previously selected date
  const initialWeekOffset = (() => {
    if (!selectedDate?.start) return 0;
    const selected = new Date(selectedDate.start);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    const diffDays = Math.round(
      (selected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return Math.floor(diffDays / 7);
  })();
  const [weekOffset, setWeekOffset] = useState(initialWeekOffset);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const fetchSchedules = useCallback(async () => {
    if (!actor) {
      setError("This provider is not set up for online scheduling.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const from = new Date();
      from.setDate(from.getDate() + weekOffset * 7);
      const dateStr = toDateOnly(from.toISOString());
      const res = await fetch(
        `/api/appointments/schedule?actor=${encodeURIComponent(actor)}&locationId=${encodeURIComponent(DEFAULT_LOCATION_ID)}&date=${dateStr}`,
      );
      const data = (await res.json()) as ScheduleBundle | { error: string };
      if (!res.ok) {
        throw new Error((data as { error: string }).error ?? res.statusText);
      }
      const bundle = data as ScheduleBundle;
      const entries: Array<{ id: string; start: string; end: string }> = [];
      for (const e of bundle.entry ?? []) {
        const s = e.resource as FhirSchedule | undefined;
        if (s?.planningHorizon?.start) {
          entries.push({
            id: s.id ?? e.fullUrl ?? "",
            start: s.planningHorizon.start,
            end: s.planningHorizon.end ?? s.planningHorizon.start,
          });
        }
      }
      setScheduleEntries(entries);
      // When returning to this step, match previously selected date by start so it stays selected
      const currentSelected = useBookingStore.getState().selectedDate;
      if (currentSelected && entries.length > 0) {
        const match = entries.find((e) => e.start === currentSelected.start);
        if (match) setSelectedDate(match);
      }
      if (entries.length === 0) {
        setError("No available dates found for this provider.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load availability.");
    } finally {
      setLoading(false);
    }
  }, [
    actor,
    weekOffset,
    setScheduleEntries,
    setSelectedDate,
    setError,
    setLoading,
  ]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // When navigating back with a selected date, re-fetch slots so the list is visible
  const selectedDateId = selectedDate?.id;
  const selectedDateStart = selectedDate?.start;
  const selectedDateEnd = selectedDate?.end;
  useEffect(() => {
    if (
      !slotsLoading &&
      selectedDateId &&
      selectedDateStart &&
      selectedDateEnd &&
      scheduleEntries.some((e) => e.id === selectedDateId)
    ) {
      const currentSlots = useBookingStore.getState().slotEntries;
      if (currentSlots.length === 0) {
        fetchSlots(selectedDateId, selectedDateStart, selectedDateEnd);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run when returning to step with selected date, avoid refetch loops
  }, [selectedDateId, selectedDateStart, selectedDateEnd]);

  const fetchSlots = useCallback(
    async (scheduleId: string, start: string, end: string) => {
      setError(null);
      setSlotsLoading(true);
      try {
        const res = await fetch(
          `/api/appointments/slots?scheduleId=${encodeURIComponent(scheduleId)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
        );
        const data = (await res.json()) as SlotBundle | { error: string };
        if (!res.ok) {
          throw new Error((data as { error: string }).error ?? res.statusText);
        }
        const bundle = data as SlotBundle;
        const entries: Array<{
          id: string;
          start: string;
          end: string;
          reference: string;
        }> = [];
        for (const e of bundle.entry ?? []) {
          const s = e.resource as FhirSlot | undefined;
          if (!s?.start || !s?.end) continue;
          const slotId = s.id ?? e.fullUrl?.split("/").pop() ?? "";
          const ref = slotId ? `Slot/${slotId}` : (e.fullUrl ?? "");
          const isFree = s.status === "free" || s.freeBusyType === "free";
          if (isFree) {
            entries.push({
              id: s.id ?? ref,
              start: s.start,
              end: s.end,
              reference: ref,
            });
          }
        }
        setSlotEntries(entries);
        // Don't set global error for empty slots; we show it inside the date card
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load time slots.");
      } finally {
        setSlotsLoading(false);
      }
    },
    [setSlotEntries, setError],
  );

  const onSelectDate = (entry: { id: string; start: string; end: string }) => {
    setSelectedDate(entry);
    setSelectedSlot(null);
    setSlotEntries([]);
    fetchSlots(entry.id, entry.start, entry.end);
  };

  const onSelectSlot = (entry: {
    id: string;
    start: string;
    end: string;
    reference: string;
  }) => {
    setSelectedSlot(entry);
  };

  const handleContinue = () => {
    if (selectedSlot) setStep("details");
  };

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + weekOffset * 7);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  const weekLabel = `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        type="button"
        onClick={() => setStep("questions")}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#002147] hover:text-[#00AEEF] transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-slate-200">
          {provider.profile_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={provider.profile_url}
              alt={provider.Name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-500">
              {provider.Name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#002147]">{provider.Name}</h1>
          <p className="text-slate-600 mt-1">Appointment Times</p>
          <p className="text-sm text-slate-500 mt-2">
            Please select a time to schedule your appointment
          </p>
        </div>
      </div>

      {/* Global error only for API/schedule failures, not for "no slots this day" */}
      {error && !error.includes("time slots for this day") && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 mb-6">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-600">{weekLabel}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setWeekOffset((o) => o - 1)}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setWeekOffset((o) => o + 1)}
            className="p-2 rounded-lg cursor-pointer border border-slate-300 hover:bg-slate-50 text-slate-700"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading && scheduleEntries.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-12 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading availability…
        </div>
      ) : (
        <div className="space-y-6">
          {scheduleEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
            >
              <p className="font-semibold text-slate-900 mb-3">
                {formatDate(entry.start)}
              </p>
              {selectedDate?.id === entry.id ? (
                slotsLoading ? (
                  <div className="flex items-center gap-2 text-slate-500 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading time slots…
                  </div>
                ) : slotEntries.length === 0 ? (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                    No available time slots for this day.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {slotEntries.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => onSelectSlot(slot)}
                        className={`px-4 cursor-pointer py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                          selectedSlot?.id === slot.id
                            ? "border-[#002147] bg-[#002147] text-white"
                            : "border-slate-200 hover:border-[#002147]/50 text-slate-700"
                        }`}
                      >
                        {formatTime(slot.start)}
                      </button>
                    ))}
                  </div>
                )
              ) : (
                <Button
                  type="button"
                  onClick={() => onSelectDate(entry)}
                  className="inline-flex items-center gap-2 font-medium hover:underline"
                >
                  <Calendar className="w-4 h-4" />
                  View times
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedSlot && (
        <div className="mt-8 flex justify-end">
          <Button
            type="button"
            onClick={handleContinue}
            className="min-w-[180px] h-12 bg-[#002147] hover:bg-[#002147]/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            Continue
            <Clock className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
