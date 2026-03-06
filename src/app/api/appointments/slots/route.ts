import { NextRequest, NextResponse } from "next/server";
import { getSlots } from "@/lib/healow/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scheduleId = searchParams.get("scheduleId");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!scheduleId || !start) {
      return NextResponse.json(
        { error: "Missing required query: scheduleId, start (ISO or YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    const bundle = await getSlots({ scheduleId, start, end: end ?? undefined });
    return NextResponse.json(bundle);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch slots";
    const statusCode = e && typeof e === "object" && "statusCode" in e
      ? Number((e as { statusCode: number }).statusCode)
      : 500;
    return NextResponse.json(
      { error: message },
      { status: statusCode >= 400 && statusCode < 600 ? statusCode : 500 }
    );
  }
}
