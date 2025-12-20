import { Metadata } from "next";

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
        <div>Navbar</div>
        {children}
        <div>Footer</div>
      </body>
    </html>
  );
}
