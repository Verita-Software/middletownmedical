"use client";

import { useEffect, useState } from "react";
import { randomEstimatedWaitMinutes } from "@/lib/estimated-wait";

const FIVE_MIN_SECONDS = 5 * 60;

function formatMmSs(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  // return `${m}m ${s.toString().padStart(2, "0")}s`;
  return `${m}m`;
}

interface UrgentCareEstimatedWaitLiveProps {
  /** Used to reset state when switching locations */
  slug: string;
  /** Initial minutes from `stableEstimatedWaitMinutes(slug)` */
  initialMinutes: number;
  variant?: "card" | "detail";
}

/**
 * Counts down second-by-second; when remaining drops below 5 minutes, picks a
 * new random 10–30 min wait (illustrative until real queue data exists).
 */
export function UrgentCareEstimatedWaitLive({
  slug,
  initialMinutes,
  variant = "card",
}: Readonly<UrgentCareEstimatedWaitLiveProps>) {
  const [seconds, setSeconds] = useState(
    () => Math.max(1, initialMinutes) * 60,
  );

  useEffect(() => {
    setSeconds(Math.max(1, initialMinutes) * 60);
  }, [slug, initialMinutes]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((prev) => {
        const next = prev - 1;
        if (next < FIVE_MIN_SECONDS) {
          return randomEstimatedWaitMinutes() * 60;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [slug]);

  const line =
    variant === "card"
      ? `~${formatMmSs(seconds)} estimated wait time`
      : `~${formatMmSs(seconds)}`;

  return (
    <p
      className={
        variant === "card"
          ? "text-sm font-semibold text-[#b5097b] tabular-nums"
          : "mt-1 text-lg font-semibold text-[#b5097b] tabular-nums"
      }
      aria-live="polite"
      aria-atomic="true"
    >
      {line}
    </p>
  );
}
