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

/** Base path for FHIR scheduling. API docs use dstu2 for Schedule, Slot, and Appointment. */
function fhirPath(practiceCode: string): string {
  return `/apps/api/v1/fhir/${practiceCode}/dstu2`;
}

async function healowFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { token } = getConfig();
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json, application/fhir+json, */*",
      "Content-Type": "application/json+fhir",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = (await res.json().catch(() => ({}))) as T | HealowApiError;
  if (!res.ok) {
    const err = data as HealowApiError;
    const message =
      err?.error?.message ?? `Healow API error: ${res.status} ${res.statusText}`;
    const e = new Error(message) as Error & { statusCode?: number };
    e.statusCode = res.status;
    throw e;
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
    practice_code: practiceCode,
  });
  const url = `${base}/Schedule?${search.toString()}`;
  return healowFetch<ScheduleBundle>(url);
}

/**
 * Get bookable slots for a given schedule and date.
 * Slot API: use date-only for start (YYYY-MM-DD). Tries dstu2 path first, then /apps/fhir/Slot (voice-agent style) on 404.
 */
export async function getSlots(params: {
  scheduleId: string;
  start: string; // ISO instant or YYYY-MM-DD
  end?: string;
}): Promise<SlotBundle> {
  const { baseUrl, practiceCode } = getConfig();
  const host = baseUrl.replace(/\/$/, "");
  const dateOnly = params.start.slice(0, 10);
  const slotType = process.env.HEALOW_DEFAULT_SLOT_TYPE || "none";

  const paramsDstu2 = new URLSearchParams({
    schedule: params.scheduleId,
    "slot-type": slotType,
    slots_count: "20",
    start: dateOnly,
    practice_code: practiceCode,
  });

  // Try dstu2 path first (same as Schedule)
  try {
    const urlDstu2 = `${host}${fhirPath(practiceCode)}/Slot?${paramsDstu2.toString()}`;
    return await healowFetch<SlotBundle>(urlDstu2);
  } catch (err) {
    const statusCode = err && typeof err === "object" && "statusCode" in err ? (err as { statusCode: number }).statusCode : 0;
    if (statusCode !== 404) throw err;
  }

  // Fallback: voice-agent path /apps/fhir/Slot (no practice_code in query)
  const paramsFhir = new URLSearchParams({
    schedule: params.scheduleId,
    "slot-type": slotType,
    slots_count: "20",
    start: dateOnly,
  });
  const urlFhir = `${host}/apps/fhir/Slot?${paramsFhir.toString()}`;
  return healowFetch<SlotBundle>(urlFhir);
}

/**
 * Book an appointment for a given slot.
 * Appointment API requires a contained Patient (used for matching); slot and practitioner are required.
 */
export async function createAppointment(params: {
  slotReference: string;
  practitionerRef: string;
  patientRef?: string;
  start: string;
  end: string;
  /** Optional patient details for EMR matching (first name, last name, DOB, phone, email). */
  patient?: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    phone?: string;
    email?: string;
    gender?: string;
  };
  reason?: string;
  comment?: string;
}): Promise<FhirAppointment> {
  const { baseUrl, practiceCode } = getConfig();
  const base = `${baseUrl.replace(/\/$/, "")}${fhirPath(practiceCode)}`;
  const practitionerRef =
    params.practitionerRef.startsWith("Practitioner/")
      ? params.practitionerRef
      : `Practitioner/${params.practitionerRef}`;
  const p = params.patient ?? {};
  const firstName = p.firstName ?? "Requested";
  const lastName = p.lastName ?? "Patient";
  const body = {
    resourceType: "Appointment",
    status: "proposed",
    reason: { text: params.reason ?? "Appointment request" },
    description: `Appointment for ${firstName} ${lastName}`,
    comment: params.comment ?? "Booked via Middletown Medical website",
    slot: [{ reference: params.slotReference }],
    start: params.start,
    end: params.end,
    contained: [
      {
        resourceType: "Patient",
        id: "patA",
        name: [{ use: "usual", family: [lastName], given: [firstName] }],
        telecom: [
          { system: "phone", value: p.phone ?? "0000000000", use: "mobile" },
          ...(p.email ? [{ system: "email", value: p.email, use: "home" }] : []),
        ],
        ...(p.birthDate ? { birthDate: p.birthDate } : {}),
        ...(p.gender ? { gender: p.gender } : {}),
      },
    ],
    participant: [
      { actor: { reference: practitionerRef }, required: "required", status: "accepted" },
      { actor: { reference: "#patA" }, required: "required" as const, status: "accepted" as const },
    ],
  };
  const res = await fetch(`${base}/Appointment`, {
    method: "POST",
    headers: {
      Accept: "application/json, application/fhir+json, */*",
      "Content-Type": "application/json+fhir",
      Authorization: `Bearer ${getConfig().token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = data as HealowApiError;
    const message =
      err?.error?.message ?? `Healow API error: ${res.status} ${res.statusText}`;
    const e = new Error(message) as Error & { statusCode?: number };
    e.statusCode = res.status;
    throw e;
  }
  return data as FhirAppointment;
}
