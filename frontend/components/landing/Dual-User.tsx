import Link from "next/link";
import { ShoppingBag, Rocket, ArrowRight } from "lucide-react";

export default function DualUserSection() {
  return (
    <section className="w-full min-h-150 flex flex-col md:flex-row overflow-hidden">
      
      <div className="relative flex-1 bg-black text-white p-12 md:p-24 flex flex-col justify-center items-start group">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Discover <br /> unique pieces.
          </h2>
          <p className="text-gray-400 text-lg max-w-md">
            Explore a curated selection of products from the worlds most innovative brands and independent creators.
          </p>
          <Link 
            href="/browse" 
            className="inline-flex items-center gap-2 group/btn text-lg font-semibold hover:gap-4 transition-all"
          >
            Start Browsing <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="relative flex-1 bg-white text-black p-12 md:p-24 flex flex-col justify-center items-start group">
        <div className="relative z-10 space-y-6">
          <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center">
            <Rocket className="h-6 w-6 text-black" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Start your <br /> own brand.
          </h2>
          <p className="text-slate-500 text-lg max-w-md">
            Join a global network of creators. Scale your business with our lightning-fast infrastructure and global reach.
          </p>
          <Link 
            href="/seller/signup" 
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105"
          >
            Become a Seller
          </Link>
        </div>
      </div>

    </section>
  );
}