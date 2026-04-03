import { NextRequest, NextResponse } from "next/server";
import { createAppointment } from "@/lib/healow/client";
import { BOOKING_PATIENT_NAME_OVERRIDE } from "@/lib/appConstant";

export const dynamic = "force-dynamic";

const USER_FACING_BOOK_ERROR =
  "We couldn’t complete your booking. Please check your information and try again, or call (845) 342-4774 for assistance.";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slotReference,
      practitionerRef,
      patientRef,
      start,
      end,
      patient,
      reason,
      comment,
    } = body as {
      slotReference?: string;
      practitionerRef?: string;
      patientRef?: string;
      start?: string;
      end?: string;
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
    };

    if (!slotReference || !practitionerRef || !start || !end) {
      return NextResponse.json(
        {
          error:
            "Missing required body: slotReference, practitionerRef, start, end",
        },
        { status: 400 },
      );
    }

    // TODO: Remove patientForApi once we have real website
    const patientForApi = patient
      ? {
          ...patient,
          firstName: BOOKING_PATIENT_NAME_OVERRIDE.firstName,
          lastName: BOOKING_PATIENT_NAME_OVERRIDE.lastName,
        }
      : undefined;

    const appointment = await createAppointment({
      slotReference,
      practitionerRef,
      patientRef,
      start,
      end,
      patient: patientForApi,
      reason,
      comment,
    });

    return NextResponse.json(appointment);
  } catch (e) {
    console.error("[appointments/book]", e);
    const statusCode =
      e && typeof e === "object" && "statusCode" in e
        ? Number((e as { statusCode: number }).statusCode)
        : 500;
    const safeStatus =
      statusCode >= 400 && statusCode < 600 ? statusCode : 500;
    return NextResponse.json({ error: USER_FACING_BOOK_ERROR }, { status: safeStatus });
  }
}
