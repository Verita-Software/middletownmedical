"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

/** COVID-19 sub-pages shown in the flyout when hovering "Covid-19 Info" */
export const COVID_SUB_ITEMS = [
  {
    title: "COVID-19 Monoclonal Antibodies",
    slug: "covid-19-monoclonal-antibodies",
    href: undefined,
  },
  {
    title: "Covid-19 Vaccine",
    slug: "covid-19-vaccine",
    href: undefined,
  },
  {
    title: "Post COVID-19 Recovery",
    slug: "post-covid-19-recovery",
    href: undefined,
  },
] as const;

/** Patient Forms sub-pages shown in the flyout when hovering "Patient Forms" */
export const PATIENT_FORMS_SUB_ITEMS = [
  {
    title: "Feedback",
    slug: "feedback",
    href: "/resource/patient-forms/feedback",
  },
  {
    title: "Pediatric Forms",
    slug: "pediatric-forms",
    href: "/resource/patient-forms/pediatric-forms",
  },
] as const;

/** Single source of truth for resource categories (Middletown Medical). Slug must match /resource/[id] pages. */
export const RESOURCE_CATEGORIES = [
  {
    title: "Patient Resources",
    description:
      "What to expect, patient forms, virtual healthcare, pre- and post-op checklists, and more.",
    slug: "patient-resources",
    subItems: undefined,
  },
  {
    title: "Covid-19 Info",
    description:
      "Latest updates, safety information, and vaccination resources.",
    slug: "covid-19-info",
    subItems: COVID_SUB_ITEMS,
  },
  {
    title: "Telemedicine",
    description: "Virtual visits and telehealth options for your care.",
    slug: "telemedicine",
    subItems: undefined,
  },
  {
    title: "Patient Centered Medical Home",
    description: "Certification and what it means for your care experience.",
    slug: "patient-centered-medical-home",
    subItems: undefined,
  },
  {
    title: "Patient Forms",
    description: "Download forms and prepare for your visit.",
    slug: "patient-forms",
    href: "/resource/patient-forms",
    subItems: PATIENT_FORMS_SUB_ITEMS,
  },
  {
    title: "FindHelp.org",
    description: "Community resources and support in your area.",
    slug: "findhelp",
    subItems: undefined,
  },
  {
    title: "Billing & Insurance",
    description: "See if your insurance is accepted and pay your bill.",
    slug: "billing-insurance",
    subItems: undefined,
  },
  {
    title: "Patient Bill of Rights",
    description: "Your rights as a patient at Middletown Medical.",
    slug: "patient-bill-of-rights",
    subItems: undefined,
  },
  {
    title: "Careers",
    description: "Join the Middletown Medical team.",
    slug: "careers",
    subItems: undefined,
  },
] as const;

type Variant = "dropdown" | "mobile";

// ── Desktop flyout item (with optional sub-flyout) ──────────────────────────
function DropdownItem({
  item,
}: {
  item: (typeof RESOURCE_CATEGORIES)[number];
}) {
  const [subOpen, setSubOpen] = useState(false);
  const subTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSub = () => {
    if (subTimeoutRef.current) clearTimeout(subTimeoutRef.current);
    setSubOpen(true);
  };
  const hideSub = () => {
    subTimeoutRef.current = setTimeout(() => setSubOpen(false), 100);
  };
  const cancelHideSub = () => {
    if (subTimeoutRef.current) clearTimeout(subTimeoutRef.current);
  };

  if (!item.subItems) {
    return (
      <Link
        href={`/resource/${item.slug}`}
        className="block py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
      >
        <span className="font-semibold text-slate-800 group-hover:text-primary text-[15px] leading-tight block">
          {item.title}
        </span>
        <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
          {item.description}
        </p>
      </Link>
    );
  }

  const itemHref = "href" in item ? (item.href as string) : undefined;

  return (
    <div className="relative" onMouseEnter={showSub} onMouseLeave={hideSub}>
      {itemHref ? (
        <Link
          href={itemHref}
          className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
        >
          <div>
            <span className="font-semibold text-slate-800 group-hover:text-primary text-[15px] leading-tight block">
              {item.title}
            </span>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-primary ml-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100 cursor-pointer">
          <div>
            <span className="font-semibold text-slate-800 group-hover:text-primary text-[15px] leading-tight block">
              {item.title}
            </span>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-primary ml-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      )}

      {/* Sub-flyout */}
      <div
        className={`absolute left-full top-0 pl-2 z-50 transition-all duration-150 ${
          subOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onMouseEnter={cancelHideSub}
        onMouseLeave={hideSub}
      >
        <div className="bg-white border border-slate-200 rounded-xl shadow-xl py-2 min-w-[260px]">
          {item.subItems.map((sub) => (
            <Link
              key={sub.slug}
              href={sub.href ?? `/resource/${sub.slug}`}
              target={sub.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                sub.href?.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="block px-5 py-3 text-[14px] font-semibold text-slate-700 hover:bg-[#EDF6FB] hover:text-[#49A3DA] transition-colors rounded-lg mx-1"
            >
              {sub.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mobile expandable item ───────────────────────────────────────────────────
function MobileItem({
  item,
  onItemClick,
}: {
  item: (typeof RESOURCE_CATEGORIES)[number];
  onItemClick?: () => void;
}) {
  const [subExpanded, setSubExpanded] = useState(false);

  if (!item.subItems) {
    return (
      <Link
        href={`/resource/${item.slug}`}
        onClick={onItemClick}
        className="block py-2 text-slate-700 hover:text-[#002147] font-medium"
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setSubExpanded((v) => !v)}
        className="flex items-center justify-between w-full py-2 text-slate-700 hover:text-[#002147] font-medium"
      >
        <span>{item.title}</span>
        <ChevronRight
          className={`w-4 h-4 text-slate-400 transition-transform ${subExpanded ? "rotate-90" : ""}`}
        />
      </button>
      {subExpanded && (
        <div className="pl-4 border-l-2 border-[#49A3DA] ml-2 mt-1 space-y-1">
          {item.subItems.map((sub) => (
            <Link
              key={sub.slug}
              href={sub.href ?? `/resource/${sub.slug}`}
              target={sub.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                sub.href?.startsWith("http") ? "noopener noreferrer" : undefined
              }
              onClick={onItemClick}
              className="block py-1.5 text-[13px] text-slate-600 hover:text-[#002147] font-medium"
            >
              {sub.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main exported component ──────────────────────────────────────────────────
export function ResourceListingComponent({
  variant = "dropdown",
  onItemClick,
}: {
  variant?: Variant;
  onItemClick?: () => void;
}) {
  if (variant === "mobile") {
    return (
      <div className="pl-10 pr-4 py-2 space-y-1 border-l-2 border-slate-200 ml-6">
        {RESOURCE_CATEGORIES.map((item) => (
          <MobileItem key={item.title} item={item} onItemClick={onItemClick} />
        ))}
      </div>
    );
  }

  const mid = Math.ceil(RESOURCE_CATEGORIES.length / 2);
  const leftColumn = RESOURCE_CATEGORIES.slice(0, mid);
  const rightColumn = RESOURCE_CATEGORIES.slice(mid);

  return (
    <div className="grid grid-cols-2 gap-x-10 min-w-[640px]">
      <div className="space-y-2 min-w-[300px] border-r border-blue-200 pr-4">
        {leftColumn.map((item) => (
          <DropdownItem key={item.title} item={item} />
        ))}
      </div>
      <div className="space-y-2 min-w-[300px]">
        {rightColumn.map((item) => (
          <DropdownItem key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
