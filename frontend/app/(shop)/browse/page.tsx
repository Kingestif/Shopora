"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, ArrowRight, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

export default function BrowsePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const trimmedQuery = searchQuery.trim();
        const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

        const url =
          trimmedQuery.length > 0
            ? `${baseUrl}/product/search?query=${encodeURIComponent(
                trimmedQuery
              )}`
            : `${baseUrl}/product`;

        const res = await fetch(url, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const json = await res.json();

        if (json.status !== "success" || !Array.isArray(json.data)) {
          throw new Error("Invalid response from server");
        }

        setProducts(json.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 relative">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Explore
          </h1>
          <p className="text-slate-500 font-medium">
            Curation of the finest tech and fashion.
          </p>
        </div>

        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search the marketplace..."
              className="pl-10 rounded-full bg-slate-100 border-none h-12 focus-visible:ring-1 focus-visible:ring-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            className="h-12 px-6 rounded-full font-semibold flex items-center gap-2 shadow-md"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart className="h-4 w-4" />
            View Cart
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full text-red-600 hover:bg-red-100 hover:text-red-800"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="group">
              <Card className="border-none shadow-none bg-transparent overflow-hidden">
                <div className="relative aspect-3/4 overflow-hidden rounded-[2rem] bg-slate-100 mb-4 animate-pulse" />

                <CardContent className="p-0 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 w-2/3">
                      <div className="h-4 bg-slate-200 rounded-full w-5/6" />
                      <div className="h-3 bg-slate-200 rounded-full w-2/3" />
                    </div>
                    <div className="h-5 bg-slate-200 rounded-full w-12" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded-full w-full" />
                    <div className="h-3 bg-slate-200 rounded-full w-5/6" />
                  </div>
                </CardContent>

                <CardFooter className="p-0 pt-4">
                  <div className="h-3 bg-slate-200 rounded-full w-24" />
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="py-20 text-center text-red-500 font-medium">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-400 font-medium italic">
            No products found matching your search.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group"
            >
              <Card className="border-none shadow-none bg-transparent overflow-hidden">
                <div className="relative aspect-3/4 overflow-hidden rounded-[2rem] bg-slate-100 mb-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    unoptimized
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="icon"
                      className="rounded-full bg-white text-black hover:bg-black hover:text-white shadow-xl"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-0 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 tracking-tight leading-tight">
                        {product.name}
                      </h3>
                    </div>
                    <span className="font-black italic text-lg tracking-tighter">
                      ${Number(product.price).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 font-medium">
                    {product.description}
                  </p>
                </CardContent>

                <CardFooter className="p-0 pt-4">
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-black group-hover:gap-3 transition-all">
                    View Piece <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
