import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/api/(.*)",
  "/api/auth/(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isInstructorRoute = createRouteMatcher(["/instructor(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);

export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
    try {
      const authObj = await auth();
      if (req.nextUrl.pathname === "/") {
        if (authObj.userId) {
          const role = authObj.sessionClaims?.metadata?.role;
          if (role) {
            switch (role) {
              case "admin":
                return NextResponse.redirect(new URL("/admin", req.url));
              case "instructor":
                return NextResponse.redirect(new URL("/instructor", req.url));
              case "student":
                return NextResponse.redirect(new URL("/student", req.url));
              default:
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }
          } else {
            return NextResponse.redirect(new URL("/sign-in", req.url));
          }
        } else {
          return NextResponse.next();
        }
      }

      if (isPublicRoute(req)) {
        return NextResponse.next();
      }

      if (!authObj.userId) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      const userRole = authObj.sessionClaims?.metadata?.role;
      if (!userRole) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      if (isAdminRoute(req) && userRole !== "admin") {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      if (isInstructorRoute(req) && userRole !== "instructor") {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      if (isStudentRoute(req) && userRole !== "student") {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error: ", error);
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
