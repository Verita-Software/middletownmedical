# Appointment Booking: Production Requirements

This document describes all details required from the user to book an appointment in a real production scenario, based on the Healow FHIR Scheduling API and the Middletown Medical booking flow.

---

## 1. Required for Healow / EMR (Patient Matching)

The Healow API uses these fields for **patient matching** in the EMR. They should be collected from the user before confirming the appointment.

| Field             | Description                | Notes                                                       |
| ----------------- | -------------------------- | ----------------------------------------------------------- |
| **First name**    | Patient's legal first name | Must match EMR for existing patients                        |
| **Last name**     | Patient's legal last name  | Must match EMR for existing patients                        |
| **Date of birth** | Patient's DOB              | Format: `YYYY-MM-DD`. Used for matching                     |
| **Phone**         | Contact phone number       | 10 digits (with or without country code). Used for matching |
| **Email**         | Email address              | Used for matching and for sending confirmations             |

**Optional but recommended for FHIR / matching**

| Field      | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| **Gender** | `male` / `female` / `other` (FHIR format). Can improve matching |

---

## 2. Required for the Booking Itself

These are determined by the user's choices in the UI (no separate "details" form).

| Detail                      | Source                                                 | Notes                                               |
| --------------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| **Provider (practitioner)** | User selects provider (e.g. "Book with Test Resource") | Sent as NPI / `practitionerRef` (e.g. `2007948351`) |
| **Date**                    | User selects from available dates (Schedule API)       | From "Select an available date"                     |
| **Time slot**               | User selects from available slots (Slot API)           | Slot id plus `start` / `end` sent to book API       |
| **Slot reference**          | From selected slot                                     | Slot id (e.g. `Slot/{uuid}` or raw id)              |

---

## 3. Optional but Recommended

| Field                | Description                                        |
| -------------------- | -------------------------------------------------- | ---------------------------- |
| **Reason for visit** | Short reason (e.g. "Annual physical", "Follow-up") | Maps to `reason.text` in API |
| **Comments / notes** | Free text for the office                           | Maps to `comment` in API     |

---

## 4. Production Extras (Policy / UX)

| Item                         | Purpose                                                                                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Insurance vs self-pay**    | Currently only Self-Pay is sent. In production you may need: insurance name, member ID, group number, relationship to subscriber, or explicit "Self-Pay" choice |
| **Preferred contact method** | Phone vs email for reminders and confirmations                                                                                                                  |
| **Consent / terms**          | e.g. "I agree to cancellation policy and to be contacted at the number/email above"                                                                             |
| **Confirmation channel**     | SMS vs email for "appointment confirmed" message                                                                                                                |

---

## 5. Production Checklist Summary

### Must collect from user before confirming

1. First name
2. Last name
3. Date of birth (`YYYY-MM-DD`)
4. Phone number
5. Email

### Already determined by the flow (no extra form)

6. Provider (from "Book with [Provider]")
7. Date (from calendar)
8. Time slot (from slot list)

### Recommended when going live

9. Reason for visit (optional)
10. Insurance or Self-Pay (if supporting insurance)
11. Consent / terms acceptance
12. Preferred contact (phone/email) for confirmations

---

## 6. Current Implementation vs Production

| Aspect               | Current                                                                 | Production                                                                    |
| -------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Patient data**     | Defaults: "Requested" / "Patient", DOB `1970-01-01`, phone `0000000000` | Collect real first name, last name, DOB, phone, email (and optionally gender) |
| **Reason / comment** | Default text                                                            | Optional form fields or pre-defined reasons                                   |
| **Insurance**        | Self-Pay only in payload                                                | Choice: Self-Pay or insurance details (when supported)                        |
| **UI**               | Modal: date → slot → confirm (no patient form)                          | Add step: "Your information" or "Confirm your details" before final confirm   |

The book API and Healow client already accept optional `patient`, `reason`, and `comment`. The remaining work for production is:

- Add a patient/details form step in the booking modal (or a dedicated page).
- Validate required fields (first name, last name, DOB, phone, email).
- Pass the collected values into the existing `/api/appointments/book` payload as `patient`, and optionally `reason` and `comment`.

---

## 7. API Payload Reference

The `POST /api/appointments/book` body supports:

```json
{
  "slotReference": "Slot/{id} or {id}",
  "practitionerRef": "NPI string",
  "start": "ISO datetime",
  "end": "ISO datetime",
  "patient": {
    "firstName": "string",
    "lastName": "string",
    "birthDate": "YYYY-MM-DD",
    "phone": "10-digit string",
    "email": "string",
    "gender": "male | female | other"
  },
  "reason": "optional string",
  "comment": "optional string"
}
```

Required for the request: `slotReference`, `practitionerRef`, `start`, `end`.  
For production, `patient` should be populated with real user input; other fields remain optional.

---

_Last updated: March 2026. Based on Healow FHIR Scheduling API (Schedule, Slot, Appointment) and Middletown Medical booking flow._
