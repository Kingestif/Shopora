"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-red-600">403</CardTitle>
          <CardDescription className="mt-2 text-gray-700">
            Unauthorized Access
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-gray-600">
            You do not have permission to view this page. Please check your credentials or contact the administrator.
          </p>
        </CardContent>
        <CardFooter className="mt-6">
          <Link href="/">
            <Button variant="destructive" className="w-full">
              Go to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}