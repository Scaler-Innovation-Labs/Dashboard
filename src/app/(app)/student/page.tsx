import { checkUserRole } from "@/utils/roles.utils";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const isStudent = await checkUserRole("student");
  if (!isStudent) {
    redirect("/sign-in");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <p>
        Welcome to the student dashboard. Here you can view your courses, track
        your progress, and access learning materials.
      </p>
    </div>
  );
}
