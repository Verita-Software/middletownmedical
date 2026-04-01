import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, ChevronLeft, Car } from "lucide-react";
import {
  getUrgentCareBySlug,
  getUrgentCareSlugs,
} from "@/lib/urgent-care-locations";
import { UrgentCareHero } from "@/components/urgent-care/urgent-care-hero";
import { UrgentCareDetailSections } from "@/components/urgent-care/urgent-care-detail-sections";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getUrgentCareSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getUrgentCareBySlug(slug);
  if (!loc) return { title: "Location" };
  return {
    title: `Urgent Care ${loc.name}, NY`,
    description: `Middletown Medical urgent care in ${loc.name}. ${loc.addressSingleLine}. Walk-in care, hours, and directions.`,
    alternates: {
      canonical: `https://middletownmedical.com/urgent-care/${slug}`,
    },
    openGraph: {
      title: `Urgent Care ${loc.name} | Middletown Medical`,
      description: loc.addressSingleLine,
      url: `https://middletownmedical.com/urgent-care/${slug}`,
    },
  };
}

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default async function UrgentCareLocationPage({ params }: Props) {
  const { slug } = await params;
  const location = getUrgentCareBySlug(slug);
  if (!location) notFound();

  return (
    <div className="min-h-screen bg-slate-50/80">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/urgent-care"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0d5c5f] transition-colors hover:text-[#49A3DA]"
          >
            <ChevronLeft className="h-4 w-4" />
            All urgent care locations
          </Link>
        </div>
      </div>

      <UrgentCareHero title={location.name} />

      <div className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
          If you have a life-threatening injury or condition, call{" "}
          <a href="tel:911" className="font-bold underline">
            911
          </a>{" "}
          or go to your nearest hospital now.
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <UrgentCareDetailSections location={location} slug={slug} />
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-md">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Address
                </p>
                <div className="mt-2 flex gap-2">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#49A3DA]" aria-hidden />
                  <div className="space-y-0.5 text-sm text-slate-700">
                    {location.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <a
                  href={mapsUrl(location.directionsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0d5c5f] hover:underline"
                >
                  <Car className="h-4 w-4" />
                  Directions
                </a>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phone
                </p>
                <a
                  href={`tel:${location.phoneTel}`}
                  className="mt-1 inline-flex items-center gap-2 text-xl font-bold text-[#470A68] hover:underline"
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden />
                  {location.phone}
                </a>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Estimated wait
                </p>
                <p className="mt-1 text-lg font-semibold text-[#b5097b]">
                  ~{location.estimatedWaitMinutes} min
                </p>
                <p className="mt-1 text-sm text-slate-600">{location.statusLine}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Hours
                </p>
                <div className="mt-2 max-h-64 overflow-y-auto text-sm">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-slate-100">
                      {location.hours.map((row) => (
                        <tr key={row.day}>
                          <th className="py-1.5 pr-3 font-medium text-slate-700">
                            {row.day}
                          </th>
                          <td className="py-1.5 text-slate-600">{row.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
