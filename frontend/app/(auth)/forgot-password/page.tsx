"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("Check your email for the reset link.");
    } catch {
      setStatus("error");
      setMessage("Error sending request. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              status === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
