"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_PROVIDERS } from "@/lib/mock-data";
import { useBookingStore } from "@/store/booking-store";
import { BookQuestionsStep } from "@/components/booking/book-questions-step";
import { BookScheduleStep } from "@/components/booking/book-schedule-step";
import { BookDetailsStep } from "@/components/booking/book-details-step";
import { BookDoneStep } from "@/components/booking/book-done-step";
import { Button } from "@/components/ui/button";

export default function ProviderBookPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const providerId = params?.id;
  const providerFromStore = useBookingStore((s) => s.provider);
  const step = useBookingStore((s) => s.step);
  const setProvider = useBookingStore((s) => s.setProvider);
  const reset = useBookingStore((s) => s.reset);

  const provider =
    providerFromStore ??
    (providerId
      ? (MOCK_PROVIDERS.find((p) => p.id === providerId) ?? null)
      : null);

  useEffect(() => {
    if (providerId && provider && !providerFromStore) {
      setProvider(provider);
    }
  }, [providerId, provider, providerFromStore, setProvider]);

  useEffect(() => {
    return () => {
      // Optional: reset on unmount when leaving the flow (e.g. navigate away)
      // Don't reset on every unmount to avoid clearing when switching steps
    };
  }, []);

  if (!providerId || !provider) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Provider not found.</p>
        <Button
          type="button"
          onClick={() => router.push("/providers")}
          className="ml-4 text-[#002147] font-semibold hover:underline"
        >
          Back to providers
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {step === "questions" && <BookQuestionsStep provider={provider} />}
      {step === "schedule" && <BookScheduleStep provider={provider} />}
      {step === "details" && <BookDetailsStep provider={provider} />}
      {step === "done" && <BookDoneStep provider={provider} />}
    </div>
  );
}
