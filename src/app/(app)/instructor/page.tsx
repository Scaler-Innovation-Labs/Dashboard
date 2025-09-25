import { checkUserRole } from "@/utils/roles.utils";
import { redirect } from "next/navigation";

export default async function InstructorDashboard() {
  // Protect the page from users who are not instructors
  const isInstructor = await checkUserRole("instructor");
  if (!isInstructor) {
    redirect("/sign-in");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>
      <p>
        Welcome to the instructor dashboard. Here you can manage your courses,
        view student progress, and create assignments.
      </p>
    </div>
  );
}
