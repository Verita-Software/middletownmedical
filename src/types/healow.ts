/**
 * FHIR-based Healow scheduling API types (Schedule, Slot, Appointment).
 * Based on Healow FHIR Scheduling API documentation.
 */

export interface FhirReference {
  reference?: string;
  display?: string;
}

export interface FhirSchedule {
  resourceType: "Schedule";
  id?: string;
  actor?: FhirReference[];
  planningHorizon?: {
    start?: string;
    end?: string;
  };
}

export interface FhirSlot {
  resourceType: "Slot";
  id?: string;
  schedule?: FhirReference;
  status?: string;
  start?: string;
  end?: string;
}

export interface FhirAppointment {
  resourceType: "Appointment";
  id?: string;
  status?: string;
  slot?: FhirReference[];
  participant?: Array<{
    actor?: FhirReference;
    required?: string;
    status: string;
  }>;
  start?: string;
  end?: string;
}

export interface FhirBundle<T = unknown> {
  resourceType: "Bundle";
  id?: string;
  type: "searchset" | "transaction" | "transaction-response" | "collection";
  total?: number;
  link?: Array<{ relation?: string; url?: string }>;
  entry?: Array<{
    fullUrl?: string;
    resource?: T;
  }>;
}

export type ScheduleBundle = FhirBundle<FhirSchedule>;
export type SlotBundle = FhirBundle<FhirSlot>;
export type AppointmentBundle = FhirBundle<FhirAppointment>;

export interface HealowScheduleEntry {
  id: string;
  start: string;
  end: string;
  actorRef?: string;
}

export interface HealowSlotEntry {
  id: string;
  start: string;
  end: string;
  status: string;
  scheduleRef?: string;
}

export interface HealowApiError {
  error: {
    message: string;
    type?: string;
    reason?: string;
  };
}
