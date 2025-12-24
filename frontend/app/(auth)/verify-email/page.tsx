import { Suspense } from "react";
import VerifyEmailTokenPage from "./verify-email";

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <VerifyEmailTokenPage />
    </Suspense>
  );
}