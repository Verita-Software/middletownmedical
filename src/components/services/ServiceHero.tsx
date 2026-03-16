"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, Stethoscope } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  heroImageUrl: string;
  heroImageAlt?: string;
  breadcrumbLabel?: string;
};

export function ServiceHero({
  title,
  subtitle,
  heroImageUrl,
  heroImageAlt,
  breadcrumbLabel = "Services",
}: Props) {
  return (
    <div className="relative w-full bg-[#002147] pt-12 pb-16 lg:pt-16 lg:pb-20">
      <Image
        src={heroImageUrl}
        alt={heroImageAlt || title}
        fill
        className="object-cover opacity-30 mix-blend-luminosity"
        priority
      />
      <div className="relative z-10 container mx-auto flex max-w-7xl flex-col justify-center px-4">
        <div className="mb-6 flex items-center space-x-2 text-sm font-semibold uppercase tracking-wider text-white/70">
          <Link href="/services" className="transition-colors hover:text-white">
            {breadcrumbLabel}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="max-w-[220px] truncate sm:max-w-none">{title}</span>
        </div>

        <h1 className="mb-4 max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mb-6 max-w-2xl text-xl font-semibold text-white/90 md:text-2xl">
            {subtitle}
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          {/* TODO: Add book appointment link back in */}
          {/* <Link
            href="#book-appointment"
            className="inline-flex items-center gap-2 rounded-full bg-[#b5097b] px-8 py-4 font-bold text-white transition-colors hover:bg-[#8f0761]"
          >
            <Calendar className="h-5 w-5" />
            <span>Book Appointment</span>
          </Link> */}
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <Stethoscope className="h-5 w-5" />
            <span>Find a Provider</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
