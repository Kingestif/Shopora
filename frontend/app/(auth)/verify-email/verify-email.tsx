"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifyEmailTokenPage() {
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const token = searchParams.get("token"); 
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus("error");
        setMessage("No token found in the URL.");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/emailVerification?token=${token}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Email verified successfully! Redirecting to login...");
          setTimeout(() => {
            router.push("/login"); 
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.message || "Invalid or expired token.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <Card className="max-w-md mx-auto mt-16 border-none shadow-2xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        {status === "success" && (
          <Button onClick={() => router.push("/login")}>
            Go to Login
          </Button>
        )}
      </CardContent>

      <CardFooter className="text-center text-sm text-slate-400">
        {status === "error" && (
          <Button onClick={() => router.refresh()}>Retry</Button> 
        )}
      </CardFooter>
    </Card>
  );
}
