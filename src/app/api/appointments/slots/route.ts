import { NextRequest, NextResponse } from "next/server";
import { getSlots } from "@/lib/healow/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scheduleId = searchParams.get("scheduleId");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!scheduleId || !start || !end) {
      return NextResponse.json(
        { error: "Missing required query: scheduleId, start, end (ISO instants)" },
        { status: 400 }
      );
    }

    const bundle = await getSlots({ scheduleId, start, end });
    return NextResponse.json(bundle);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch slots";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
