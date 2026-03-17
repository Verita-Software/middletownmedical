import { NextResponse } from "next/server";
import { getLocations } from "@/lib/locations";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const locations = getLocations();
    return NextResponse.json(locations);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load locations";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
