"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/mock-data";
import { useBookingStore } from "@/store/booking-store";

const VISIT_TYPES = [
  {
    value: "annual-physical",
    label: "Annual Physical",
    subtitle: "Annual wellness exam with a primary care provider",
  },
  {
    value: "office-visit",
    label: "Office Visit",
    subtitle: "Office or video visit for a new problem, sick visit or follow-up care",
  },
  {
    value: "video-visit",
    label: "Video Visit",
    subtitle: "Virtual visit with a primary care provider",
  },
  { value: "other", label: "I don't see my reason", subtitle: "" },
];

interface BookQuestionsStepProps {
  provider: Provider;
}

export function BookQuestionsStep({ provider }: BookQuestionsStepProps) {
  const setAnswers = useBookingStore((s) => s.setAnswers);
  const setStep = useBookingStore((s) => s.setStep);
  const answers = useBookingStore((s) => s.answers);

  // Initial state from store so back navigation shows previously selected values
  const [seenInThreeYears, setSeenInThreeYears] = useState<"" | "yes" | "no">(
    () => answers.seenInThreeYears ?? ""
  );
  const [visitType, setVisitType] = useState(() => answers.visitType ?? "");

  const canContinue =
    (seenInThreeYears === "yes" || seenInThreeYears === "no") && visitType !== "";

  const handleContinue = () => {
    setAnswers({
      seenInThreeYears: seenInThreeYears === "yes" || seenInThreeYears === "no" ? seenInThreeYears : undefined,
      visitType: visitType || undefined,
    });
    setStep("schedule");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href={`/providers/${provider.id}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#002147] hover:text-[#00AEEF] transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Provider
      </Link>

      <h1 className="text-3xl font-bold text-[#002147] mb-8">
        A Few Quick Questions
      </h1>

      <div className="space-y-8">
        <div>
          <p className="text-base font-semibold text-slate-800 mb-3">
            Have you been to a Middletown Medical Primary Care Provider in the last three years?
          </p>
          <div className="flex gap-6">
            {(["yes", "no"] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="seenInThreeYears"
                  checked={seenInThreeYears === opt}
                  onChange={() => setSeenInThreeYears(opt)}
                  className="w-4 h-4 text-[#002147] border-slate-300 focus:ring-[#002147]"
                />
                <span className="text-slate-700 capitalize">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-base font-semibold text-slate-800 mb-3">
            What&apos;s the type of visit you&apos;re looking for?
          </p>
          <div className="space-y-3">
            {VISIT_TYPES.map((opt) => (
              <label
                key={opt.value}
                className="flex items-start gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-[#002147]/30 cursor-pointer transition-colors has-[:checked]:border-[#002147] has-[:checked]:bg-[#002147]/5"
              >
                <input
                  type="radio"
                  name="visitType"
                  value={opt.value}
                  checked={visitType === opt.value}
                  onChange={() => setVisitType(opt.value)}
                  className="mt-1 w-4 h-4 text-[#002147] border-slate-300 focus:ring-[#002147]"
                />
                <div>
                  <span className="font-medium text-slate-900">{opt.label}</span>
                  {opt.subtitle && (
                    <p className="text-sm text-slate-500 mt-0.5">{opt.subtitle}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          className="min-w-[200px] h-12 bg-[#002147] hover:bg-[#002147]/90 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
