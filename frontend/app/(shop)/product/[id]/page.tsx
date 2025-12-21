"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RefreshCcw,
  Star
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Aero-Tech Shell Jacket",
    price: 299,
    seller: "estif",
    description: "Fully waterproof and breathable 3-layer techwear shell for urban exploration. Engineered with reinforced seams and a modular hood system, this shell is designed to withstand the harshest city environments while maintaining a sleek, minimalist silhouette.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200&auto=format&fit=crop"
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const [isAdding, setIsAdding] = useState(false);

  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/browse" 
        className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors mb-8 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-slate-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-8 left-8 bg-white text-black hover:bg-white px-4 py-1 rounded-full font-bold">
            New Arrival
          </Badge>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-full border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                Verified Seller: {product.seller}
              </Badge>
              <div className="flex items-center text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-[10px] font-bold ml-1 text-black">4.9/5</span>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
              {product.name}
            </h1>
            
            <p className="text-3xl font-black italic tracking-tight text-slate-900">
              ${product.price}
            </p>
          </div>

          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
            {product.description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={handleAddToCart}
              className="h-16 px-12 rounded-full bg-black text-white hover:bg-zinc-800 text-lg font-bold flex-1 shadow-2xl shadow-black/20"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              {isAdding ? "Adding..." : "Add to Bag"}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-16 px-8 rounded-full border-2 font-bold hover:bg-slate-50"
            >
              Wishlist
            </Button>
          </div>

          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-tight leading-tight">Fast Global Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <RefreshCcw className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-tight leading-tight">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-tight leading-tight">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}