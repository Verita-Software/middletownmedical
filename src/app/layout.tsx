import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NotificationBanner } from "@/components/layout/notification-banner";
import { MobileNav } from "@/components/layout/mobile-nav";
import { WebNav } from "@/components/layout/web-nav";
import { HomeFooter } from "@/components/home/home-footer";
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
  metadataBase: new URL("https://middletownmedical.com"),
  title: {
    default: "Middletown Medical | Compassionate Care in the Hudson Valley",
    template: "%s | Middletown Medical",
  },
  description:
    "Middletown Medical provides comprehensive primary and specialty care across the Hudson Valley. Book appointments, find providers, explore services, and access telehealth.",
  keywords: [
    "Middletown Medical",
    "Hudson Valley healthcare",
    "primary care",
    "specialty care",
    "telehealth",
    "Middletown NY doctors",
    "find a provider",
  ],
  authors: [
    { name: "Middletown Medical", url: "https://middletownmedical.com" },
  ],
  creator: "Middletown Medical",
  publisher: "Middletown Medical",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://middletownmedical.com",
    siteName: "Middletown Medical",
    title: "Middletown Medical | Compassionate Care in the Hudson Valley",
    description:
      "Comprehensive primary and specialty care across the Hudson Valley. Find providers, book appointments, and access telehealth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Middletown Medical",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Middletown Medical | Compassionate Care in the Hudson Valley",
    description:
      "Comprehensive primary and specialty care across the Hudson Valley.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://middletownmedical.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-pt-28">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased overflow-x-hidden max-w-[100vw]`}
      >
        <header className="sticky top-0 z-50 w-full shrink-0 border-b bg-middletown-navy text-white">
          <div className="bg-white text-slate-900 border-b border-slate-100 relative">
            {/* Desktop web navigation */}
            <WebNav />

            {/* Mobile hamburger — absolutely positioned top-right */}
            <div className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 xl:hidden">
              <MobileNav />
            </div>
          </div>

          {/*Hidden Notification Banner */}
          {/* <NotificationBanner /> */}
        </header>
        <main className="flex min-h-0 w-full flex-1 flex-col overflow-x-hidden bg-middletown-light">
          {children}
        </main>
        {/* Site-wide footer — rendered on every page via root layout */}
        <div className="shrink-0">
          <HomeFooter />
        </div>
      </body>
    </html>
  );
}
