import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Stethoscope,
  ClipboardList,
  ShieldPlus,
  MapPin,
  Clock,
  Bell,
  X,
} from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Middletown Medical",
  description: "Provider Directory for Middletown Medical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw]`}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-middletown-navy text-white">
          <div className="bg-white text-slate-900 border-b border-slate-200">
            <div className="container mx-auto flex h-[88px] items-center justify-between px-4 lg:px-8">
              {/* Logo Space */}
              <div className="flex items-center">
                <a href="/" className="flex flex-col">
                  <span className="font-extrabold text-3xl tracking-tight text-primary leading-none">
                    middletown
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                    Health and Care
                  </span>
                </a>
              </div>

              {/* Central Navigation */}
              <nav className="hidden xl:flex items-center space-x-8 text-sm font-semibold text-slate-700">
                <a
                  href="/providers"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Stethoscope className="w-4 h-4 text-primary" />
                  Find a Provider
                </a>
                <a
                  href="/resources"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <ClipboardList className="w-4 h-4 text-primary" />
                  Resources
                </a>
                <a
                  href="/services"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <ShieldPlus className="w-4 h-4 text-primary" />
                  Services
                </a>
                <a
                  href="/locations"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  Locations
                </a>
                <a
                  href="/immediate"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Clock className="w-4 h-4 text-primary" />
                  Immediate Care
                </a>
              </nav>

              {/* Right side navigation */}
              <div className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-slate-600">
                <div className="h-6 w-px bg-slate-300 mx-2" />
                <a
                  href="/mychart"
                  className="hover:text-primary transition-colors"
                >
                  MyChart
                </a>
                <a href="/pay" className="hover:text-primary transition-colors">
                  Pay My Bill
                </a>
              </div>
            </div>
          </div>

          {/* Notification Banner */}
          <div className="bg-[#0f2c59] text-white py-2.5 px-4 text-sm">
            <div className="container mx-auto flex items-center justify-center relative max-w-7xl">
              <div className="flex items-center gap-2 text-center text-[13px] font-medium tracking-wide">
                <Bell className="w-4 h-4" />
                <span>
                  Some BCBSIL patients received letters from BCBSIL incorrectly
                  stating their provider is out of network. This was a BCBSIL
                  error. -
                  <a href="#" className="font-bold hover:underline ml-1">
                    View More
                  </a>
                </span>
              </div>
              <button className="absolute right-0 p-1 hover:bg-white/10 rounded-sm">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
        <main className="min-h-screen bg-middletown-light w-full overflow-x-hidden flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
