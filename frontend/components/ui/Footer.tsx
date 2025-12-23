"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Github,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="w-full bg-black text-white border-t border-white/10"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-black">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tighter">
                SHOPORA
              </span>
            </Link>
            <p className="text-lg text-gray-400 max-w-xs">
              The premium marketplace for next-generation shopping.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/browse"
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold uppercase tracking-wider mb-4">
              Sell
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/signup?role=seller"
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  Seller Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/in/estif/"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-7 w-7" />
              </Link>
              <Link
                href="https://github.com/Kingestif"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-7 w-7" />
              </Link>
              <Link
                href="https://medium.com/@estifanos"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Image
                  width={30}
                  height={30}
                  className="max-sm:w-5 max-sm:h-5"
                  src="/medium.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">
            © {currentYear} Shopora Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
