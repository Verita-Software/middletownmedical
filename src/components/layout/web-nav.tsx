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
  { name: "Services", href: "/services", icon: ShieldPlus, hasDropdown: false },
  { name: "Locations", href: "/locations", icon: MapPin },
  { name: "Urgent Care", href: "#", icon: Clock },
];

const utilityLinks = [
  { name: "MyChart", href: "#" },
  { name: "Pay My Bill", href: "#" },
];

/** Duly-style nav item: dark grey text, light grey icon, rectangle hover (white bg, shadow, rounded) */
const navItemBase =
  "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-[15px] font-medium text-slate-800 transition-all duration-150";
const navItemIcon = "w-4 h-4 shrink-0 text-slate-500";
const navItemHover =
  "hover:bg-[#EDF6FB] hover:text-[#49A3DA] hover:shadow-[0_2px_5px_rgba(0,0,0,0.08)]";

const utilityBase =
  "whitespace-nowrap rounded-lg px-4 py-2.5 text-[14px] font-medium text-slate-800 transition-all duration-150 ";

export function WebNav() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showResources = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(false);
    setResourcesOpen(true);
  };
  const showServices = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setResourcesOpen(false);
    setServicesOpen(true);
  };
  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setResourcesOpen(false);
      setServicesOpen(false);
    }, 120);
  };
  const cancelHide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className="flex min-h-[80px] w-full items-center justify-between px-4 py-5 lg:px-6 xl:px-10">
      {/* Logo – far left */}
      <div className="flex shrink-0 items-center">
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity"
        >
          <Image
            src="/middletown-medical-logo.png"
            alt="Middletown Medical"
            width={180}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Right side: Nav + Utility links grouped together – matches Duly layout */}
      <div className="hidden xl:flex items-center gap-x-1">
        {/* Main Navigation */}
        <nav className="flex items-center gap-x-1">
          {navLinks.map(({ name, href, icon: Icon, hasDropdown }) =>
            hasDropdown ? (
              <div
                key={name}
                className="relative"
                onMouseEnter={
                  name === "Resources" ? showResources : showServices
                }
                onMouseLeave={hideDropdown}
                role="none"
              >
                {name === "Resources" ? (
                  <button
                    type="button"
                    className={`${navItemBase} ${navItemHover}`}
                    aria-expanded={resourcesOpen}
                    aria-haspopup="true"
                  >
                    <Icon className={navItemIcon} />
                    <span>{name}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-500 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={href}
                    className={`${navItemBase} ${navItemHover}`}
                    onMouseEnter={cancelHide}
                  >
                    <Icon className={navItemIcon} />
                    <span>{name}</span>
                    <ChevronDown className="w-4 h-4 shrink-0 text-slate-500" />
                  </Link>
                )}

                {name === "Resources" && (
                  <div
                    className={`absolute left-0 top-full pt-1 z-50 ${resourcesOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"} transition-all duration-150`}
                    onMouseEnter={cancelHide}
                    onMouseLeave={hideDropdown}
                  >
                    <div className="bg-white border border-slate-200 rounded-lg shadow-xl py-5 px-5">
                      <ResourceListingComponent variant="dropdown" />
                    </div>
                  </div>
                )}

                {name === "Services" && (
                  <div
                    className={`absolute left-0 top-full pt-1 z-50 ${servicesOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"} transition-all duration-150`}
                    onMouseEnter={cancelHide}
                    onMouseLeave={hideDropdown}
                  >
                    <div className="min-w-[200px] rounded-lg border border-slate-200 bg-white py-2 shadow-xl">
                      <Link
                        href="/services"
                        className="block px-5 py-2.5 text-[15px] font-medium text-slate-800 hover:bg-slate-50"
                        onClick={() => setServicesOpen(false)}
                      >
                        View All Services
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={name}
                href={href}
                className={`${navItemBase} ${navItemHover}`}
              >
                <Icon className={navItemIcon} />
                <span>{name}</span>
              </Link>
            ),
          )}
        </nav>

        {/* Divider + Utility links */}
        <div className="h-5 w-px bg-slate-200 mx-3" aria-hidden />
        {utilityLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`${utilityBase} ${navItemHover}`}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
