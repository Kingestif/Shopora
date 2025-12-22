"use client";

import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black transition-transform">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">
              SHOPORA
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-lg font-medium text-gray-400 transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/browse" className="text-lg font-medium text-gray-400 transition-colors hover:text-white">
            Browse
          </Link>
          <Link href="/about" className="text-lg font-medium text-gray-400 transition-colors hover:text-white">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex rounded-full bg-white text-black hover:bg-gray-200 px-6">
            <Link href="/signup?role=buyer">Get Started</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black text-white border-white/10">
              <nav className="flex flex-col gap-6 mt-12">
                <Link href="/" className="text-lg font-semibold hover:text-gray-400">Home</Link>
                <Link href="/browse" className="text-lg font-semibold hover:text-gray-400">Browse</Link>
                <Link href="/about" className="text-lg font-semibold hover:text-gray-400">About</Link>
                <hr className="border-white/10 my-2" />
                <Button asChild className="w-full rounded-xl bg-white text-black hover:bg-gray-200">
                  <Link href="/signup?role=buyer">Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}