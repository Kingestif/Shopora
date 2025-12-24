import { Suspense } from "react";
import SignupPage from "./signupClient";

export default function Signup() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <SignupPage />
    </Suspense>
  );
}
