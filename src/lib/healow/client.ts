/**
 * Server-only Healow FHIR scheduling API client.
 * Uses HEALOW_* env vars; never expose bearer token to the client.
 */

import type {
  ScheduleBundle,
  SlotBundle,
  FhirAppointment,
  HealowApiError,
} from "@/types/healow";

const getConfig = () => {
  const baseUrl = process.env.HEALOW_BASE_URL;
  const practiceCode = process.env.HEALOW_PRACTICE_CODE;
  const token = process.env.HEALOW_BEARER_TOKEN;
  if (!baseUrl || !practiceCode || !token) {
    throw new Error(
      "Missing Healow config: HEALOW_BASE_URL, HEALOW_PRACTICE_CODE, HEALOW_BEARER_TOKEN"
    );
  }
  return { baseUrl, practiceCode, token };
};

/** Base path for FHIR scheduling. Doc uses dstu2 or fhir; connect4 may use fhir. */
function fhirPath(practiceCode: string): string {
  return `/apps/api/v1/fhir/${practiceCode}/fhir`;
}

async function healowFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { token } = getConfig();
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json+fhir",
      "Content-Type": "application/fhir+json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = (await res.json().catch(() => ({}))) as T | HealowApiError;
  if (!res.ok) {
    const err = data as HealowApiError;
    throw new Error(
      err?.error?.message ?? `Healow API error: ${res.status} ${res.statusText}`
    );
  }
  return data as T;
}

/**
 * Get available schedule days for a provider at a location from a given date.
 * Schedule API: returns days that have slots (planning horizon), not individual slots.
 */
export async function getSchedules(params: {
  actor: string;
  actorLocation: string;
  date: string; // YYYY-MM-DD; API uses ge (greater or equal)
}): Promise<ScheduleBundle> {
  const { baseUrl, practiceCode } = getConfig();
  const base = `${baseUrl.replace(/\/$/, "")}${fhirPath(practiceCode)}`;
  const search = new URLSearchParams({
    actor: params.actor,
    "actor.location": params.actorLocation,
    date: `ge${params.date}`,
    identifier: "none",
    type: "none",
  });
  const url = `${base}/Schedule?${search.toString()}`;
  return healowFetch<ScheduleBundle>(url);
}

/**
 * Get bookable slots for a given schedule and date range.
 * Slot API: returns actual time slots for the schedule.
 */
export async function getSlots(params: {
  scheduleId: string;
  start: string; // ISO instant
  end: string;
}): Promise<SlotBundle> {
  const { baseUrl, practiceCode } = getConfig();
  const base = `${baseUrl.replace(/\/$/, "")}${fhirPath(practiceCode)}`;
  const search = new URLSearchParams({
    schedule: params.scheduleId,
    start: `ge${params.start}`,
    end: `le${params.end}`,
  });
  const url = `${base}/Slot?${search.toString()}`;
  return healowFetch<SlotBundle>(url);
}

/**
 * Book an appointment for a given slot.
 * Appointment API: creates the appointment referencing the slot.
 */
export async function createAppointment(params: {
  slotReference: string;
  practitionerRef: string;
  patientRef?: string;
  start: string;
  end: string;
}): Promise<FhirAppointment> {
  const { baseUrl, practiceCode } = getConfig();
  const base = `${baseUrl.replace(/\/$/, "")}${fhirPath(practiceCode)}`;
  const body: FhirAppointment = {
    resourceType: "Appointment",
    status: "booked",
    slot: [{ reference: params.slotReference }],
    start: params.start,
    end: params.end,
    participant: [
      { actor: { reference: params.practitionerRef }, required: "required", status: "accepted" },
      ...(params.patientRef
        ? [{ actor: { reference: params.patientRef }, required: "required" as const, status: "accepted" as const } as const]
        : []),
    ],
  };
  const res = await fetch(`${base}/Appointment`, {
    method: "POST",
    headers: {
      Accept: "application/json+fhir",
      "Content-Type": "application/fhir+json",
      Authorization: `Bearer ${getConfig().token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = data as HealowApiError;
    throw new Error(
      err?.error?.message ?? `Healow API error: ${res.status} ${res.statusText}`
    );
  }
  return data as FhirAppointment;
}
