import { NextRequest, NextResponse } from "next/server";
import { createAppointment } from "@/lib/healow/client";

export const dynamic = "force-dynamic";

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
        { error: "Missing required body: slotReference, practitionerRef, start, end" },
        { status: 400 }
      );
    }

    const appointment = await createAppointment({
      slotReference,
      practitionerRef,
      patientRef,
      start,
      end,
      patient,
      reason,
      comment,
    });

    return NextResponse.json(appointment);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to book appointment";
    const statusCode = e && typeof e === "object" && "statusCode" in e
      ? Number((e as { statusCode: number }).statusCode)
      : 500;
    return NextResponse.json(
      { error: message },
      { status: statusCode >= 400 && statusCode < 600 ? statusCode : 500 }
    );
  }
}
