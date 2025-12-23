"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface CurrentUser {
  id: string;
  role: "BUYER" | "SELLER" | "ADMIN";
}

export default function Hero() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
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
      }
    };

    fetchCurrentUser();
  }, []);

  let primaryCtaHref = "/signup?role=buyer";
  const primaryCtaLabel = "Start Exploring";

  if (user?.role === "BUYER") {
    primaryCtaHref = "/browse";
  } else if (user?.role === "SELLER") {
    primaryCtaHref = "/seller";
  } else if (user?.role === "ADMIN") {
    primaryCtaHref = "/admin";
  }

  return (
    <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container relative z-10 mx-auto h-full px-4 flex items-start pt-32 md:pt-40">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.1]">
            Shopping at the <br />
            Speed of Light
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-lg">
            Shopora, a unified marketplace for brands and global creators.
            Fueling the next era of commerce.
          </p>

          <div className="pt-4">
            <Button
              asChild
              size="xl"
              className="bg-white group text-black hover:bg-gray-200 px-10 py-2 rounded-full font-medium text-lg shadow-2xl"
            >
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center gap-2"
              >
                {primaryCtaLabel}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 
          - bottom-1 place it at the bottom 
          - left-4 space from the left
      */}
      <div className="absolute bottom-1 left-4 md:left-100 z-10 flex flex-col gap-4 max-md:scale-90 origin-left">
        <div className="flex items-center gap-3 text-white/70">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-mono tracking-widest uppercase">
            System Status: Active
          </span>
        </div>

        <div className="flex gap-8">
          <div className="space-y-1">
            <p className="text-white text-2xl font-bold">12k+</p>
            <p className="text-white/50 text-xs uppercase tracking-tighter font-mono">
              Global Creators
            </p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="space-y-1">
            <p className="text-white text-2xl font-bold">500+</p>
            <p className="text-white/50 text-xs uppercase tracking-tighter font-mono">
              Verified Brands
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
