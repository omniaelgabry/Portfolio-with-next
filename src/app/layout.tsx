import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Multi-Disciplinary Software Engineer | Portfolio",
  description: "A versatile Multi-Disciplinary Software Engineer & Digital Designer bridging the gap between elegant aesthetic design and powerful backend architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased dark">
      <body>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
