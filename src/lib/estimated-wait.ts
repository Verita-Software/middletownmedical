/**
 * Illustrative wait times for urgent care (until live queue data exists).
 * Values are stable per location id so they do not flicker on re-render.
 */

export const ESTIMATED_WAIT_MIN_MIN = 10;
export const ESTIMATED_WAIT_MIN_MAX = 30;

/**
 * Returns a deterministic integer in [min, max] inclusive from a string seed
 * (e.g. urgent care `slug`). Same seed always yields the same minutes.
 */
export function stableEstimatedWaitMinutes(
  seed: string,
  min = ESTIMATED_WAIT_MIN_MIN,
  max = ESTIMATED_WAIT_MIN_MAX,
): number {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  const range = hi - lo + 1;
  return lo + (Math.abs(h) % range);
}

/** New illustrative wait when the live countdown refreshes (not seed-stable). */
export function randomEstimatedWaitMinutes(
  min = ESTIMATED_WAIT_MIN_MIN,
  max = ESTIMATED_WAIT_MIN_MAX,
): number {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}
