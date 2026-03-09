"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Stethoscope,
  ClipboardList,
  ShieldPlus,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useRef, useState } from "react";
import { ResourceListingComponent } from "@/components/resources/resource-listing-component";

const navLinks = [
  { name: "Find a Provider", href: "/providers", icon: Stethoscope },
  { name: "Resources", href: "#", icon: ClipboardList, hasDropdown: true },
  { name: "Services", href: "/services", icon: ShieldPlus },
  { name: "Locations", href: "#", icon: MapPin },
  { name: "Urgent Care", href: "#", icon: Clock },
];

const utilityLinks = [
  { name: "MyChart", href: "#" },
  { name: "Pay My Bill", href: "#" },
];

export function WebNav() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setResourcesOpen(true);
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => setResourcesOpen(false), 120);
  };

  const cancelHide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className="container mx-auto flex h-[100px] min-h-[100px] items-center justify-between gap-8 py-5 pr-6 lg:pr-10 xl:pr-12">
      {/* Logo – left corner with padding 4 */}
      <div className="flex shrink-0 items-center pl-0 pr-4">
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity"
        >
          <Image
            src="/middletown-medical-logo.png"
            alt="Middletown Health and Care"
            width={220}
            height={50}
            className="h-11 w-auto"
            priority
          />
        </Link>
      </div>

      <div className="ml-8"></div>

      {/* Central Navigation – desktop only, Duly-style generous spacing */}
      <nav className="hidden xl:flex items-center gap-x-8 text-[15px] font-medium text-slate-600">
        {navLinks.map(({ name, href, icon: Icon, hasDropdown }) =>
          hasDropdown ? (
            <div
              key={name}
              className="relative"
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <button
                type="button"
                className="flex items-center gap-2.5 py-2 whitespace-nowrap hover:text-primary transition-colors"
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                <Icon className="w-4 h-4 shrink-0 text-primary/80" />
                <span>{name}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-primary/80 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Resources dropdown – content width, center items only (Duly-style) */}
              <div
                className={`absolute left-0 top-full pt-1 z-50 ${resourcesOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"} transition-all duration-150`}
                onMouseEnter={cancelHide}
                onMouseLeave={hideDropdown}
              >
                <div className="bg-white border border-slate-200 rounded-lg shadow-xl py-5 px-5">
                  <ResourceListingComponent variant="dropdown" />
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-2.5 py-2 whitespace-nowrap hover:text-primary transition-colors"
            >
              <Icon className="w-4 h-4 shrink-0 text-primary/80" />
              <span>{name}</span>
            </Link>
          ),
        )}
      </nav>

      {/* Utility links – desktop only (right side), subtle divider */}
      <div className="hidden xl:flex shrink-0 items-center gap-x-8 text-[14px] font-medium text-slate-600">
        <div className="h-5 w-px bg-slate-200" aria-hidden />
        {utilityLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className="whitespace-nowrap py-2 hover:text-primary transition-colors"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
