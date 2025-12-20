import Navbar from "@/components/ui/Navbar";
import { Metadata } from "next";
import './globals.css';
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Shopora",
  description: "Shopping made simple",
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
