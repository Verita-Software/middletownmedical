"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Stethoscope } from "lucide-react";

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
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="container mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-10 lg:flex-row lg:items-stretch lg:py-14">
        {/* Text side */}
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <Link
              href="/services"
              className="transition-colors hover:text-[#002147]"
            >
              {breadcrumbLabel}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-slate-700">{title}</span>
          </div>

          <h1 className="mb-3 max-w-3xl text-3xl font-black leading-tight text-[#002147] md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mb-6 max-w-2xl text-base font-medium text-slate-700 md:text-lg">
              {subtitle}
            </p>
          )}

          <p className="mb-6 max-w-2xl text-sm text-slate-600">
            Schedule with a Middletown Medical provider who offers this service,
            or explore additional options that fit your needs and location.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 rounded-full bg-[#002147] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0c335e]"
            >
              <Stethoscope className="h-4 w-4" />
              <span>Find a Provider</span>
            </Link>
          </div>
        </div>

        {/* Image side */}
        <div className="relative h-56 w-full flex-1 overflow-hidden rounded-3xl bg-slate-200 shadow-lg sm:h-64 md:h-72 lg:h-80">
          <Image
            src={heroImageUrl}
            alt={heroImageAlt || title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}
