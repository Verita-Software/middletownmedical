import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { URGENT_CARE_LOCATIONS } from "@/lib/urgent-care-locations";
import { UrgentCareLocationCard } from "@/components/urgent-care/urgent-care-location-card";
import { UrgentCareHero } from "@/components/urgent-care/urgent-care-hero";
import { URGENT_CARE_IMAGES } from "@/lib/urgent-care-assets";
import { WHY_IMMEDIATE_CARE } from "@/lib/urgent-care-rich-content";

export const metadata: Metadata = {
  title: "Urgent Care",
  description:
    "Middletown Medical urgent care locations across the Hudson Valley. Walk-in care for minor illness and injury — find a center near you.",
  alternates: { canonical: "https://middletownmedical.com/urgent-care" },
  openGraph: {
    url: "https://middletownmedical.com/urgent-care",
    title: "Urgent Care | Middletown Medical",
    description:
      "Find immediate care when you need it. View locations, hours, and directions for Middletown Medical urgent care centers.",
  },
};

const SECTION_GAP = "space-y-12 sm:space-y-16";

export default function UrgentCarePage() {
  return (
    <div className="min-h-screen bg-slate-50/80">
      <UrgentCareHero
        title="Urgent care centers"
        eyebrow="Hudson Valley"
        description="Same-day treatment for non-emergency illnesses and injuries — often with shorter waits than the ER for the right types of concerns. No appointment needed; walk in during posted hours or call ahead when wait times are long."
      />

      <div
        className={`mx-auto max-w-screen-2xl px-12 py-12 sm:px-6 lg:px-8 ${SECTION_GAP}`}
      >
        <section className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <h2 className="text-2xl font-bold tracking-tight text-[#0d5c5f]">
              Care when you can&apos;t wait for a routine visit
            </h2>
            <p>{WHY_IMMEDIATE_CARE.paragraphs[0]}</p>
            <p>{WHY_IMMEDIATE_CARE.paragraphs[1]}</p>
            <p className="text-sm text-slate-500">
              Life-threatening emergency? Call{" "}
              <a
                href="tel:911"
                className="font-semibold text-[#0d5c5f] hover:underline"
              >
                911
              </a>{" "}
              or go to the nearest emergency department.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-center text-sm font-semibold text-[#0f2c59]">
              Not sure where to go?
            </p>
            <div className="relative mx-auto aspect-480/186 w-full max-w-md">
              <Image
                src={URGENT_CARE_IMAGES.ucOrErDiagram}
                alt="When to choose urgent care versus the emergency room"
                width={480}
                height={186}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="locations-heading">
          <div className="border-b border-emerald-200/80 pb-3">
            <h2
              id="locations-heading"
              className="text-2xl font-bold tracking-tight text-[#0d5c5f] sm:text-3xl"
            >
              Locations
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Select a site for hours, directions, pricing information, and
            services. Each center is part of the Middletown Medical network —
            coordinated care across Orange, Sullivan, and Ulster counties.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
            {URGENT_CARE_LOCATIONS.map((location, index) => (
              <UrgentCareLocationCard
                key={location.slug}
                location={location}
                imagePriority={index === 0}
              />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-[#0f2c59]">
            When to choose urgent care
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600 leading-relaxed">
            <li>Cough, cold, sore throat, or mild fever</li>
            <li>Minor cuts, sprains, or simple fractures</li>
            <li>Ear or sinus pain, mild asthma, rash, or minor burns</li>
            <li>Urinary symptoms, nausea, or vomiting (non-severe)</li>
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            For{" "}
            <strong className="text-slate-700">
              chest pain, stroke symptoms, severe bleeding, or difficulty
              breathing
            </strong>
            , call 911 or visit an emergency department.
          </p>
          <p className="mt-6">
            <Link
              href="/providers"
              className="font-semibold text-[#49A3DA] hover:underline"
            >
              Find a provider for ongoing care →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
