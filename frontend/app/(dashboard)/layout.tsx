"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  let role: "seller" | "admin" = "seller";
  if (pathname.includes("admin")) role = "admin";
  if (pathname.includes("seller")) role = "seller";

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", 
      });
      router.push("/login"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <span className="text-xl font-bold tracking-tighter">SHOPORA</span>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {role === "seller" ? "Seller Studio" : "Admin Panel"}
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {role === "seller" ? (
            <>
              <Link
                href="/seller"
                className="flex items-center gap-3 px-3 py-2 bg-slate-100 text-black rounded-lg font-medium text-sm"
              >
                <LayoutDashboard className="h-4 w-4" /> <div className="text-lg">Inventory</div>
              </Link>
              <Link
                href=""
                className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm transition-colors"
              >
                <ShoppingBag className="h-4 w-4" /> <div className="text-lg">Orders</div>
              </Link>
              <Link
                href=""
                className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm transition-colors"
              >
                <Settings className="h-4 w-4" /> <div className="text-lg">Setting</div>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2 bg-slate-100 text-black rounded-lg font-medium text-sm"
              >
                <LayoutDashboard className="h-4 w-4" /> <div className="text-lg">Control Panel</div>
              </Link>
              <Link
                href=""
                className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm transition-colors"
              >
                <Settings className="h-4 w-4" /> <div className="text-lg">Setting</div>
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 w-full rounded-lg text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
