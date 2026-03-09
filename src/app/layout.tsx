import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NotificationBanner } from "@/components/layout/notification-banner";
import { MobileNav } from "@/components/layout/mobile-nav";
import { WebNav } from "@/components/layout/web-nav";
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
          <div className="bg-white text-slate-900 border-b border-slate-100 relative">
            {/* Desktop web navigation */}
            <WebNav />

            {/* Mobile hamburger — absolutely positioned top-right */}
            <div className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 xl:hidden">
              <MobileNav />
            </div>
          </div>

          {/* Notification Banner */}
          <NotificationBanner />
        </header>
        <main className="min-h-screen bg-middletown-light w-full overflow-x-hidden flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
