"use client";

import { useState, useLayoutEffect } from "react";
import { formatSameDayCareHeroLine } from "@/lib/hero-care-availability";

/**
 * Same-day copy uses Eastern time — client so it stays reasonable after SSG / navigation.
 */
export function SameDayCareAvailabilityLine() {
  const [text, setText] = useState(() => formatSameDayCareHeroLine());

  useLayoutEffect(() => {
    setText(formatSameDayCareHeroLine());
  }, []);

  return (
    <p className="text-sm font-medium text-slate-500">{text}</p>
  );
}
