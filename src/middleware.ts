import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const isInstructorRoute = createRouteMatcher(["/instructor(.*)"]);

const isStudentRoute = createRouteMatcher(["/student(.*)"]);

export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
    try {
      // Public routes do not require any authentication
      // :TODO -  Add logic to handle public routes for signed in users (if the user has already signed in, redirect them to their respective dashboard)

      // Role based protection

      // Admin routes
      if (
        isAdminRoute(req) &&
        (await auth()).sessionClaims?.metadata?.role !== "admin"
      ) {
        const url = new URL("/sign-in", req.url);
        return NextResponse.redirect(url);
      }

      // Instructor routes
      if (
        isInstructorRoute(req) &&
        (await auth()).sessionClaims?.metadata?.role !== "instructor"
      ) {
        const url = new URL("/sign-in", req.url);
        return NextResponse.redirect(url);
      }

      // Student routes
      if (
        isStudentRoute(req) &&
        (await auth()).sessionClaims?.metadata?.role !== "student"
      ) {
        const url = new URL("/sign-in", req.url);
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error: ", error);
      const url = new URL("/sign-in", req.url);
      return NextResponse.redirect(url);
    }
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
