import { GoogleOneTap } from "@clerk/nextjs";

export default function GoogleSignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>This is the Authenction Page</h1>
      <GoogleOneTap />
    </div>
  );
}
