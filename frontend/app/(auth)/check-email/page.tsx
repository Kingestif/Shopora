"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CheckEmailPageProps {
  email?: string; 
}

export default function CheckEmailPage({ email }: CheckEmailPageProps) {
  return (
    <Card className="max-w-md mx-auto mt-16 border-none shadow-2xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
        <CardDescription>
          We have sent a verification link to your email {email ? <strong>{email}</strong> : ""}.
          Click the link in the email to activate your account.
        </CardDescription>
      </CardHeader>

      <CardFooter className="text-center text-sm text-slate-400">
        Didn’t receive the email? <Button variant="link">Resend Email</Button>
      </CardFooter>
    </Card>
  );
}
