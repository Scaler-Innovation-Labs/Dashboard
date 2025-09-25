import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getUserRole } from "@/lib/mock-db";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    if (!user.emailAddresses || user.emailAddresses.length === 0) {
      return NextResponse.json({ message: "No email found" }, { status: 404 });
    }

    const email = user.emailAddresses[0].emailAddress;
    if (!email) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    const role = getUserRole(email);
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: role },
    });

    console.log(`Updated user ${userId} with role: ${role}`);
    return NextResponse.json(
      {
        role: role,
        message: `User is ${role}`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("User API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
