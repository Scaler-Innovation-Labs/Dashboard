import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!req) {
    return NextResponse.json(
      {
        status: "error",
        message: "No request object found",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
  return NextResponse.json({
    status: "ok",
    message: "Health is okay !",
    timestamp: new Date().toISOString(),
  });
}
