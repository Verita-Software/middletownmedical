"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/mock-data";
import { useBookingStore } from "@/store/booking-store";
import { CheckCircle2 } from "lucide-react";

interface BookDoneStepProps {
  provider: Provider;
}

/**
 * Render the final booking confirmation step shown after a user requests an appointment.
 *
 * Displays a success message and two action buttons: one to return to the providers list and one to view the requested provider's profile. Activating either action clears the current booking state.
 *
 * @param provider - The provider for whom the appointment was requested; used to construct the profile link.
 * @returns The confirmation step UI as a React element.
 */
export function BookDoneStep({ provider }: BookDoneStepProps) {
  const reset = useBookingStore((s) => s.reset);

  const handleClose = () => {
    reset();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h1 className="text-2xl font-bold text-[#002147] mb-2">
        Appointment requested
      </h1>
      <p className="text-slate-600 mb-8">
        Your appointment with {provider.Name} has been submitted. The practice will confirm shortly.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          asChild
          className="bg-[#002147] hover:bg-[#002147]/90 text-white font-semibold h-11 px-6 rounded-lg"
        >
          <Link href="/providers" onClick={handleClose}>
            Back to Providers
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-2 border-[#002147] text-[#002147] font-semibold h-11 px-6 rounded-lg"
        >
          <Link href={`/providers/${provider.id}`} onClick={handleClose}>
            View provider profile
          </Link>
        </Button>
      </div>
    </div>
  );
}
