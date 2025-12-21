import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Globe, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeatureGrid() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="mb-16">
          <h2 className="text-6xl font-bold tracking-tighter text-black sm:text-8xl leading-[0.85]">
              Built for <br />the modern era.
            </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Experience the marketplace designed for speed, global connectivity, and total transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          
          <Card className="md:col-span-1 md:row-span-2 overflow-hidden border-none bg-slate-50 shadow-none hover:bg-slate-100 transition-colors group">
            <CardHeader className="p-8">
              <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                <Zap className="h-6 w-6 fill-current" />
              </div>
              <CardTitle className="text-3xl font-bold">Instant Checkout</CardTitle>
              <p className="text-muted-foreground text-lg max-w-sm">
                One-click buying powered by our ultra-low latency payment engine. Shopping at the speed of thought.
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
               <div className="mt-4 flex items-center text-black font-semibold gap-2 group-hover:gap-4 transition-all">
                  Learn more<ArrowRight className="h-5 w-5" />
               </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-none hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Globe className="h-8 w-8 mb-2 text-blue-600" />
              <CardTitle className="text-xl">Global Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Connect with brands and creators from over 150 countries instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-none hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <MapPin className="h-8 w-8 mb-2 text-green-600" />
              <CardTitle className="text-xl">Live Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Watch your order move across the world in real-time with satellite accuracy.
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-1 border-none bg-black text-white flex flex-col justify-center p-8">
             <CardTitle className="text-xl">Creator Network</CardTitle>
             <p className="text-slate-400 text-lg mt-2">
               Join 10k+ creators selling globally.
             </p>
             <Link href="/seller/signup" className="mt-4 text-xs font-bold uppercase tracking-widest hover:underline">
               Apply to sell →
             </Link>
          </Card>

        </div>
      </div>
    </section>
  );
}