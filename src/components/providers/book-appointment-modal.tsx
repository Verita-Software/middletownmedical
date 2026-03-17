"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/mock-data";
import type {
  ScheduleBundle,
  SlotBundle,
  FhirSchedule,
  FhirSlot,
} from "@/types/healow";
import { LOCATION_PHONES } from "@/lib/appConstant";
import { Calendar, Clock, Loader2, Phone } from "lucide-react";

const DEFAULT_LOCATION_ID = "2";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
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

export interface BookAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: Provider;
}

export function BookAppointmentModal({
  open,
  onOpenChange,
  provider,
}: BookAppointmentModalProps) {
  const [step, setStep] = useState<"date" | "slot" | "confirm" | "done">(
    "date",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [scheduleEntries, setScheduleEntries] = useState<
    Array<{ id: string; start: string; end: string }>
  >([]);
  const [slotEntries, setSlotEntries] = useState<
    Array<{ id: string; start: string; end: string; reference: string }>
  >([]);
  const [selectedDate, setSelectedDate] = useState<{
    id: string;
    start: string;
    end: string;
  } | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    id: string;
    start: string;
    end: string;
    reference: string;
  } | null>(null);
  const [bookSuccess, setBookSuccess] = useState(false);

  const actor = provider.npiId ?? "";
  const locationId = DEFAULT_LOCATION_ID;

  const fetchSchedules = useCallback(async () => {
    if (!actor) {
      setError("This provider is not set up for online scheduling.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const from = new Date();
      from.setDate(from.getDate());
      const dateStr = toDateOnly(from.toISOString());
      const res = await fetch(
        `/api/appointments/schedule?actor=${encodeURIComponent(actor)}&locationId=${encodeURIComponent(locationId)}&date=${dateStr}`,
      );
      const data = (await res.json()) as ScheduleBundle | { error: string };
      if (!res.ok) {
        const msg = (data as { error: string }).error ?? res.statusText;
        // if (res.status === 404) {
        //   throw new Error(
        //     "This provider or location is not set up for online scheduling. Please call the office to book."
        //   );
        // }
        throw new Error(msg);
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
      if (entries.length === 0) {
        setError("No available dates found for this provider.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load availability.");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  const fetchSlots = useCallback(
    async (scheduleId: string, start: string, end: string) => {
      setError(null);
      setLoading(true);
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
          // Use Slot/{id} for booking; fullUrl from Healow can contain "null" and breaks the Appointment API
          const slotId = s.id ?? (e.fullUrl?.split("/").pop() ?? "");
          const ref = slotId ? `Slot/${slotId}` : e.fullUrl ?? "";
          const entry = {
            id: s.id ?? ref,
            start: s.start,
            end: s.end,
            reference: ref,
          };
          const isFree = s.status === "free" || s.freeBusyType === "free";
          if (isFree) {
            entries.push(entry);
          }
        }
        setSlotEntries(entries);
        if (entries.length === 0) {
          setError("No available time slots for this day.");
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load time slots.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setStep("date");
      setError(null);
      setSelectedDate(null);
      setSelectedSlot(null);
      setScheduleEntries([]);
      setSlotEntries([]);
      setBookSuccess(false);
    }
    onOpenChange(next);
  };

  const onSelectDate = (entry: { id: string; start: string; end: string }) => {
    setSelectedDate(entry);
    setStep("slot");
    setSlotEntries([]);
    setSelectedSlot(null);
    fetchSlots(entry.id, entry.start, entry.end);
  };

  const onSelectSlot = (entry: {
    id: string;
    start: string;
    end: string;
    reference: string;
  }) => {
    setSelectedSlot(entry);
    setStep("confirm");
  };

  const onConfirmBook = async () => {
    if (!selectedSlot || !actor) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotReference: selectedSlot.reference,
          practitionerRef: actor,
          start: selectedSlot.start,
          end: selectedSlot.end,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? res.statusText);
      }
      setBookSuccess(true);
      setStep("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    if (step === "date" && scheduleEntries.length === 0 && actor) {
      fetchSchedules();
    }
  }, [open, step, actor, scheduleEntries.length, fetchSchedules]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book appointment with {provider.Name}</DialogTitle>
          <DialogDescription>
            Check availability and choose a date and time.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div
            className={
              error.includes("not set up for online scheduling")
                ? "rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                : "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
            }
          >
            <p>{error}</p>
            {error.includes("not set up for online scheduling") && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  <a
                    href={`tel:${(
                      (provider.Locations?.[0] &&
                        LOCATION_PHONES[provider.Locations[0]]) ||
                      "(845) 342-4774"
                    ).replace(/\D/g, "")}`}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call office to book
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenChange(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        )}

        {step === "date" && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500">
              Booking with {provider.Name}
            </p>
            <p className="text-sm font-medium text-slate-700">
              Select an available date
            </p>
            {loading && scheduleEntries.length === 0 ? (
              <div className="flex items-center justify-center gap-2 py-8 text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                Checking availability…
              </div>
            ) : (
              <div className="grid gap-2">
                {scheduleEntries.map((entry) => (
                  <Button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelectDate(entry)}
                    className="flex justify-center text-black items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-left transition hover:border-primary/40 hover:bg-slate-50"
                  >
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{formatDate(entry.start)}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === "slot" && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500">
              Booking with {provider.Name}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">
                Select a time
                {selectedDate && (
                  <span className="ml-2 font-normal text-slate-500">
                    — {formatDate(selectedDate.start)}
                  </span>
                )}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep("date")}
                disabled={loading}
              >
                Back
              </Button>
            </div>
            {loading && slotEntries.length === 0 ? (
              <div className="flex items-center justify-center gap-2 py-8 text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading time slots…
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slotEntries.map((entry) => (
                  <Button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelectSlot(entry)}
                    className="flex items-center text-black justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-slate-50"
                  >
                    <Clock className="h-4 w-4 text-primary" />
                    {formatTime(entry.start)}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === "confirm" && selectedSlot && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Confirm your appointment with <strong>{provider.Name}</strong>:
            </p>
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="font-medium text-slate-900">
                {selectedDate && formatDate(selectedDate.start)}
              </p>
              <p className="text-slate-600">
                {formatTime(selectedSlot.start)} –{" "}
                {formatTime(selectedSlot.end)}
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setStep("slot")}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                onClick={onConfirmBook}
                disabled={loading}
                className="cursor-pointer bg-primary text-white hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking…
                  </>
                ) : (
                  "Confirm booking"
                )}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "done" && bookSuccess && (
          <div className="py-4 text-center">
            <p className="font-semibold text-primary">Appointment requested.</p>
            <p className="mt-2 text-sm text-slate-600">
              Your appointment with <strong>{provider.Name}</strong> has
              been submitted. The practice will confirm shortly.
            </p>
            <DialogFooter className="mt-4">
              <Button onClick={() => handleOpenChange(false)}>Close</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
