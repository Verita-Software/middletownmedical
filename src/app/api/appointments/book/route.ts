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
    } = body as {
      slotReference?: string;
      practitionerRef?: string;
      patientRef?: string;
      start?: string;
      end?: string;
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
    });

    return NextResponse.json(appointment);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to book appointment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
