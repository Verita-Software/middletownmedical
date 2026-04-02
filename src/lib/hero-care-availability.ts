import {
  ESTIMATED_WAIT_MIN_MAX,
  ESTIMATED_WAIT_MIN_MIN,
} from "@/lib/estimated-wait";
import { URGENT_CARE_LOCATIONS } from "@/lib/urgent-care-locations";

const TZ = "America/New_York";

function weekdayShortInNY(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  }).format(d);
}

function hour0to23InNY(d: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    hour12: false,
  }).formatToParts(d);
  const h = parts.find((p) => p.type === "hour")?.value;
  return parseInt(h ?? "0", 10);
}

/**
 * Subtext for the home hero “Same Day Care” card — avoids misleading fixed
 * clock times (e.g. late PM). Uses Eastern time for Hudson Valley hours.
 */
export function formatSameDayCareHeroLine(now = new Date()): string {
  const wd = weekdayShortInNY(now);
  const hour = hour0to23InNY(now);
  const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(wd);

  if (isWeekday && hour >= 8 && hour < 17) {
    return "Same-day appointments often available today";
  }
  if (isWeekday && hour < 8) {
    return "Opens today at 8:00 AM · same-day visits";
  }
  return "Next: weekdays · 8:00 AM – 5:00 PM · search for openings";
}

/**
 * Subtext for the home hero “Immediate Care Centers” card.
 */
export function formatImmediateCareHeroLine(): string {
  const n = URGENT_CARE_LOCATIONS.length;
  return `Typical wait ${ESTIMATED_WAIT_MIN_MIN}–${ESTIMATED_WAIT_MIN_MAX} min · ${n} Hudson Valley locations`;
}
