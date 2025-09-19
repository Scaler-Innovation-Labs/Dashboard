import { checkUserRole } from "@/utils/roles.utils";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // Protect the page from users who are not admins
  const isAdmin = await checkUserRole("admin");
  if (!isAdmin) {
    redirect("/sign-in");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard. Here you can manage users, settings, and
        view reports.
      </p>
    </div>
  );
}
