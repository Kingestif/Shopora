"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  const role = searchParams.get("role")?.toUpperCase() || "BUYER";
  const isSeller = role === "SELLER";

  const minLength = 9;
  const isPasswordValid = password.length >= minLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      router.push(`/check-email?email=${encodeURIComponent(email)}`);

      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold tracking-tighter">
          {isSeller ? "Open your Store" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {isSeller
            ? "Start selling to a global audience today."
            : "Enter your details below to join the Shopora network"}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <input type="hidden" name="role" value={role} />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl h-12 border-slate-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-12 border-slate-200"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isPasswordValid ? "text-green-500" : "text-slate-400"
                }`}
              >
                {password.length > 0 &&
                  (isPasswordValid
                    ? "Length OK"
                    : `Min. ${minLength} characters`)}
              </span>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`rounded-xl h-12 transition-all ${
                password.length > 0 && !isPasswordValid
                  ? "border-red-400 focus-visible:ring-red-400"
                  : "border-slate-200"
              }`}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!isPasswordValid || loading}
            className="w-full h-12 rounded-xl bg-black text-white hover:bg-gray-800 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Signing Up..."
              : isSeller
              ? "Register as Seller"
              : "Sign Up"}
          </Button>
        </CardContent>
      </form>

      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-center w-full text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black font-semibold hover:underline"
          >
            Login
          </Link>
        </div>

        <div className="text-[10px] text-center w-full text-slate-400 uppercase tracking-widest">
          Joining as a {role}
          <Link
            href={`/signup?role=${isSeller ? "BUYER" : "SELLER"}`}
            className="ml-2 underline"
          >
            Switch to {isSeller ? "Buyer" : "Seller"}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
