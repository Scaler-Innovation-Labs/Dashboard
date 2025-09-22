import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: "ok",
    message: "Health is okay !",
    timestamp: new Date().toISOString(),
  });
}
