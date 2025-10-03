import { Roles } from "@/types/global";
import { auth } from "@clerk/nextjs/server";

export const checkUserRole = async (role: Roles) => {
  const { sessionClaims } = await auth();

  return sessionClaims?.metadata?.role === role;
};
