"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  seller?: string;
  image: string;
  quantity: number;
}

const CART_STORAGE_KEY = "shopora-cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        setItems(parsed);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const syncAndSetItems = (updater: (prev: CartItem[]) => CartItem[]) => {
    setItems((prev) => {
      const next = updater(prev);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    syncAndSetItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    syncAndSetItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <div className="h-10 w-40 bg-slate-100 rounded-full animate-pulse" />
        <div className="h-5 w-64 bg-slate-100 rounded-full animate-pulse" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
        <div className="p-8 bg-slate-50 rounded-full">
          <ShoppingBag className="h-12 w-12 text-slate-300" />
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">
          Your bag is empty
        </h2>
        <Link href="/browse">
          <Button className="rounded-full bg-black px-8 h-12 font-bold uppercase tracking-widest text-xs">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-12">
        Your Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 group"
            >
              <div className="relative h-40 w-full sm:w-40 rounded-3xl bg-slate-100 overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 10rem"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {item.seller}
                    </p>
                    <h3 className="text-xl font-black tracking-tight">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xl font-black italic">${item.price}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border-2 border-slate-100 rounded-full px-2 py-1 bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:text-black text-slate-400 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:text-black text-slate-400 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Separator className="bg-slate-100" />
        </div>

        <div className="lg:col-span-4">
          <div className="bg-slate-50 rounded-[3rem] p-8 space-y-6 sticky top-32">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
              Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-slate-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-black font-bold font-mono">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-500 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-black font-bold font-mono">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <Separator className="bg-slate-200" />
              <div className="flex justify-between items-end">
                <span className="text-lg font-black italic uppercase tracking-tighter">
                  Total
                </span>
                <div className="text-right">
                  <p className="text-3xl font-black italic tracking-tighter">
                    ${total.toFixed(2)}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Inclusive of taxes
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full h-16 rounded-full bg-black text-white hover:bg-zinc-800 text-lg font-bold group shadow-2xl shadow-black/10">
              Checkout{" "}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-center justify-center gap-4 pt-4 grayscale opacity-50">
              <CreditCard className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Secure Stripe Payment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
