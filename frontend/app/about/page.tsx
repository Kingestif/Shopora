"use client";

import { ArrowRight, Globe, Zap, Shield, Users, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-32 pb-20 border-b border-zinc-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-6 block">
              Mission.Statement_v1.0
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black leading-[0.85] mb-12">
              The Protocol for <br />Modern Commerce.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl leading-relaxed font-light">
              Shopora was built to eliminate the friction between creation and acquisition. We are a unified marketplace ecosystem designed for the next generation of global brands.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-zinc-100 bg-zinc-50/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 overflow-hidden shadow-sm">
            
            <div className="bg-white p-12 flex flex-col justify-between h-[320px]">
              <Zap className="h-6 w-6 text-black" />
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest mb-4 text-zinc-400">01. Velocity</h3>
                <p className="text-xl font-bold tracking-tight text-black">
                  Shopping at the speed of light. Low-latency discovery meets instant checkout.
                </p>
              </div>
            </div>

            <div className="bg-white p-12 flex flex-col justify-between h-[320px]">
              <Globe className="h-6 w-6 text-black" />
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest mb-4 text-zinc-400">02. Borderless</h3>
                <p className="text-xl font-bold tracking-tight text-black">
                  Connecting 10k+ global creators with a worldwide audience through a unified engine.
                </p>
              </div>
            </div>

            <div className="bg-white p-12 flex flex-col justify-between h-[320px]">
              <Shield className="h-6 w-6 text-black" />
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest mb-4 text-zinc-400">03. Transparency</h3>
                <p className="text-xl font-bold tracking-tight text-black">
                  Direct-to-creator commerce with absolute transparency in logistics and pricing.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">The_Vision</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-3xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                Traditional marketplaces are cluttered, slow, and noisy. Shopora is the antidote. We provide a high-fidelity environment where quality products are the only priority.
              </p>
              <div className="mt-12 h-px w-full bg-zinc-100" />
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-black mb-2">Our Architecture</h4>
                  <p className="text-zinc-500 text-sm">Built on custom-engineered commerce APIs to ensure 99.9% uptime for our global creator network.</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2">Our Community</h4>
                  <p className="text-zinc-500 text-sm">A hand-picked selection of designers, artists, and innovators defining the modern aesthetic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
            Build the future of <br />commerce with us.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup?role=seller"
              className="px-10 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Apply to Sell <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/signup?role=buyer"
              className="px-10 py-4 border border-zinc-800 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-900 transition-all"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}