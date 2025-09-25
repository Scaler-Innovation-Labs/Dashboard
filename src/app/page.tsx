"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">
        Welcome to the
        <span className="text-blue-500"> SST Dashboard</span>
      </h1>
      <Button className="mt-4 cursor-pointer" onClick={navigateToDashboard}>
        Go to Dashboard
      </Button>
    </div>
  );
}
