"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ShoppingCart, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Aero-Tech Shell Jacket",
    price: 299,
    description: "Fully waterproof and breathable 3-layer techwear shell for urban exploration.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Carbon Fiber Wallet",
    price: 85,
    description: "Aerospace grade carbon fiber with RFID blocking technology.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Quantum H1 Headphones",
    price: 450,
    description: "Active noise cancelling with high-fidelity spatial audio drivers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Modular Cargo Pants",
    price: 160,
    description: "Multi-pocket cargo pants with water-resistant DWR coating.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Aero-Tech Shell Jacket",
    price: 299,
    description: "Fully waterproof and breathable 3-layer techwear shell for urban exploration.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Carbon Fiber Wallet",
    price: 85,
    description: "Aerospace grade carbon fiber with RFID blocking technology.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Quantum H1 Headphones",
    price: 450,
    description: "Active noise cancelling with high-fidelity spatial audio drivers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "8",
    name: "Modular Cargo Pants",
    price: 160,
    description: "Multi-pocket cargo pants with water-resistant DWR coating.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
  },
  
];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">Explore</h1>
          <p className="text-slate-500 font-medium">Curation of the finest tech and fashion.</p>
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
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {filteredProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group">
            <Card className="border-none shadow-none bg-transparent overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button size="icon" className="rounded-full bg-white text-black hover:bg-black hover:text-white shadow-xl">
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
                  <span className="font-black italic text-lg tracking-tighter">${product.price}</span>
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

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-400 font-medium italic">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}