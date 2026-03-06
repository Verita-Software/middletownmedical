import { NextRequest, NextResponse } from "next/server";
import { getSchedules } from "@/lib/healow/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const actor =
      searchParams.get("actor") ?? process.env.HEALOW_DEFAULT_PROVIDER_NPI;
    const locationId =
      searchParams.get("actor.location") ??
      searchParams.get("locationId") ??
      process.env.HEALOW_DEFAULT_LOCATION_ID;
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Missing required query: date (YYYY-MM-DD)" },
        { status: 400 }
      );
    }
    if (!actor || !locationId) {
      return NextResponse.json(
        { error: "Missing provider/location: pass actor & locationId, or set HEALOW_DEFAULT_PROVIDER_NPI and HEALOW_DEFAULT_LOCATION_ID" },
        { status: 400 }
      );
    }

    const bundle = await getSchedules({
      actor,
      actorLocation: String(locationId),
      date,
    });

    return NextResponse.json(bundle);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch schedules";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
