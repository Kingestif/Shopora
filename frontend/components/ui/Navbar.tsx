"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShoppingBag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface CurrentUser {
  id: string;
  role: "BUYER" | "SELLER" | "ADMIN";
}

export default function Navbar() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!user) setLoadingUser(true);
      
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          setUser(null);
          return;
        }

        const json = await res.json();

        if (json.status === "success" && json.data?.id && json.data?.role) {
          setUser({ id: json.data.id, role: json.data.role });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch current user", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const isLoggedIn = !!user;

  // Dynamic primary nav link based on role
  let primaryLinkHref = "/";
  let primaryLinkLabel = "Home";

  if (user?.role === "BUYER") {
    primaryLinkHref = "/browse";
    primaryLinkLabel = "Browse";
  } else if (user?.role === "SELLER") {
    primaryLinkHref = "/seller";
    primaryLinkLabel = "Dashboard";
  } else if (user?.role === "ADMIN") {
    primaryLinkHref = "/admin";
    primaryLinkLabel = "Admin";
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black transition-transform group-hover:scale-105">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">SHOPORA</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href={primaryLinkHref}
            className="text-lg font-medium text-gray-400 transition-colors hover:text-white"
          >
            {primaryLinkLabel}
          </Link>
          <Link
            href="#contact"
            className="text-lg font-medium text-gray-400 transition-colors hover:text-white"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-gray-400 transition-colors hover:text-white"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center justify-end min-w-[140px]">
            {loadingUser ? (
              <div className="h-10 w-32 animate-pulse rounded-full bg-white/10" />
            ) : !isLoggedIn ? (
              <Button
                asChild
                className="rounded-full bg-white text-black hover:bg-gray-200 px-6 transition-all"
              >
                <Link href="/signup?role=buyer">Get Started</Link>
              </Button>
            ) : (
              <Button
                className="rounded-full border border-white/20 bg-transparent text-white hover:bg-white/10 px-6 transition-all"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-black text-white border-white/10"
            >
              <nav className="flex flex-col gap-6 mt-12">
                <Link
                  href={primaryLinkHref}
                  className="text-lg font-semibold hover:text-gray-400"
                >
                  {primaryLinkLabel}
                </Link>
                <Link
                  href="#contact"
                  className="text-lg font-semibold hover:text-gray-400"
                >
                  Contact
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-semibold hover:text-gray-400"
                >
                  About
                </Link>
                
                <hr className="border-white/10 my-2" />

                <div className="min-h-[50px]">
                   {loadingUser ? (
                     <div className="h-11 w-full animate-pulse rounded-xl bg-white/10" />
                   ) : !isLoggedIn ? (
                    <Button
                      asChild
                      className="w-full rounded-xl bg-white text-black hover:bg-gray-200"
                    >
                      <Link href="/signup?role=buyer">Get Started</Link>
                    </Button>
                  ) : (
                    <Button
                      className="w-full rounded-xl border border-white/20 bg-transparent text-white hover:bg-white/10 flex items-center justify-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}