"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Menu,
  X,
  Stethoscope,
  ClipboardList,
  ShieldPlus,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { ResourceListingComponent } from "@/components/resources/resource-listing-component";

const navLinks = [
  { name: "Find a Provider", href: "/providers", icon: Stethoscope },
  { name: "Resources", href: "#", icon: ClipboardList, hasDropdown: true },
  { name: "Services", href: "/services", icon: ShieldPlus },
  { name: "Locations", href: "/locations", icon: MapPin },
  { name: "Urgent Care", href: "/urgent-care", icon: Clock },
];

const utilityLinks = [
  { name: "MyChart", href: "https://health.healow.com/middletownmedical" },
  { name: "Pay My Bill", href: "https://quickclick.com/r/ijz0s" },
];

function MobileDrawer({
  isOpen,
  onClose,
  resourcesExpanded,
  setResourcesExpanded,
}: {
  isOpen: boolean;
  onClose: () => void;
  resourcesExpanded: boolean;
  setResourcesExpanded: (v: boolean | ((prev: boolean) => boolean)) => void;
}) {
  // Portal element — must be rendered client-side only
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-9999 flex">
      {/* Dimmed overlay */}
      <div
        className="flex-1 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <span className="font-extrabold text-[#002147] text-xl">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-[#002147] hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8">
          {/* Primary nav */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map(({ name, href, icon: Icon, hasDropdown }) =>
              hasDropdown ? (
                <div key={name}>
                  <button
                    type="button"
                    onClick={() => setResourcesExpanded((v) => !v)}
                    className="flex items-center justify-between w-full gap-4 px-4 py-3 text-[#002147] hover:bg-slate-50 rounded-lg transition-colors font-bold text-lg"
                  >
                    <span className="flex items-center gap-4">
                      <Icon className="w-6 h-6 text-[#00AEEF] shrink-0" />
                      {name}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform ${resourcesExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {resourcesExpanded && (
                    <ResourceListingComponent
                      variant="mobile"
                      onItemClick={onClose}
                    />
                  )}
                </div>
              ) : (
                <Link
                  key={name}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3 text-[#002147] hover:bg-slate-50 rounded-lg transition-colors font-bold text-lg"
                >
                  <Icon className="w-6 h-6 text-[#00AEEF] shrink-0" />
                  {name}
                </Link>
              ),
            )}
          </nav>

          <div className="h-px bg-slate-200" />

          {/* Utility nav */}
          <nav className="flex flex-col space-y-1">
            {utilityLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={onClose}
                className="flex items-center px-4 py-3 text-slate-700 hover:text-[#002147] hover:bg-slate-50 rounded-lg transition-colors font-semibold text-base"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA footer */}
        <div className="p-5 border-t border-slate-200 bg-slate-50">
          <button className="w-full bg-[#002147] text-white font-bold py-3 rounded-md hover:bg-[#002147]/90 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesExpanded, setResourcesExpanded] = useState(false);

  return (
    // Only visible below xl breakpoint
    <div className="xl:hidden flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-[#002147] hover:bg-slate-100 rounded-md transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-7 h-7 stroke-2" />
      </button>

      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        resourcesExpanded={resourcesExpanded}
        setResourcesExpanded={setResourcesExpanded}
      />
    </div>
  );
}
