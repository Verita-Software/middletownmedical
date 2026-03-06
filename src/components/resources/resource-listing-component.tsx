"use client";

import Link from "next/link";

/** Single source of truth for resource categories (Middletown Medical). Slug must match /resource/[id] pages. */
export const RESOURCE_CATEGORIES = [
  {
    title: "Patient Resources",
    description:
      "What to expect, patient forms, virtual healthcare, pre- and post-op checklists, and more.",
    slug: "patient-resources",
  },
  {
    title: "Covid-19 Info",
    description:
      "Latest updates, safety information, and vaccination resources.",
    slug: "covid-19-info",
  },
  {
    title: "Telemedicine",
    description: "Virtual visits and telehealth options for your care.",
    slug: "telemedicine",
  },
  {
    title: "Patient Centered Medical Home",
    description: "Certification and what it means for your care experience.",
    slug: "patient-centered-medical-home",
  },
  {
    title: "Patient Forms",
    description: "Download forms and prepare for your visit.",
    slug: "patient-forms",
  },
  {
    title: "FindHelp.org",
    description: "Community resources and support in your area.",
    slug: "findhelp",
  },
  {
    title: "Billing & Insurance",
    description: "See if your insurance is accepted and pay your bill.",
    slug: "billing-insurance",
  },
  {
    title: "Patient Bill of Rights",
    description: "Your rights as a patient at Middletown Medical.",
    slug: "patient-bill-of-rights",
  },
  {
    title: "Careers",
    description: "Join the Middletown Medical team.",
    slug: "careers",
  },
] as const;

type Variant = "dropdown" | "mobile";

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
        {RESOURCE_CATEGORIES.map(({ title, slug }) => (
          <Link
            key={title}
            href={`/resource/${slug}`}
            onClick={onItemClick}
            className="block py-2 text-slate-700 hover:text-[#002147] font-medium"
          >
            {title}
          </Link>
        ))}
      </div>
    );
  }

  const mid = Math.ceil(RESOURCE_CATEGORIES.length / 2);
  const leftColumn = RESOURCE_CATEGORIES.slice(0, mid);
  const rightColumn = RESOURCE_CATEGORIES.slice(mid);

  const itemLink = (item: (typeof RESOURCE_CATEGORIES)[number]) => (
    <Link
      key={item.title}
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

  return (
    <div className="grid grid-cols-2 gap-x-10 min-w-[640px]">
      <div className="space-y-2 min-w-[300px] border-r border-blue-200 pr-4">
        {leftColumn.map(itemLink)}
      </div>
      <div className="space-y-2 min-w-[300px]">{rightColumn.map(itemLink)}</div>
    </div>
  );
}
