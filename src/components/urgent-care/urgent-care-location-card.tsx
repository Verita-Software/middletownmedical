import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronDown, Car } from "lucide-react";
import type { UrgentCareLocation } from "@/lib/urgent-care-locations";
import { UrgentCareEstimatedWaitLive } from "@/components/urgent-care/urgent-care-estimated-wait-live";

/** Uniform vertical rhythm inside each location block (Duly-style list). */
const CARD_SPACE_Y = "space-y-2";

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

interface UrgentCareLocationCardProps {
  location: UrgentCareLocation;
  /** First card can use priority for LCP */
  imagePriority?: boolean;
}

/**
 * Duly-inspired location block: photo, name, address, phone, wait time, actions.
 */
export function UrgentCareLocationCard({
  location,
  imagePriority = false,
}: Readonly<UrgentCareLocationCardProps>) {
  const href = `/urgent-care/${location.slug}`;

  return (
    <article
      className={`group mx-auto flex w-full max-w-[320px] flex-col ${CARD_SPACE_Y}`}
    >
      <Link
        href={href}
        className="block outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0d5c5f]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <div className="pt-1">
          <div className="relative mx-auto h-[220px] w-[220px] overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={location.cardImageUrl}
              alt={`${location.name} urgent care — exterior`}
              fill
              priority={imagePriority}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="240px"
            />
          </div>
          <div className="mt-2 text-center">
            <p className="text-lg font-bold tracking-tight text-[#0d5c5f]">
              {location.name}
            </p>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-500">
              Urgent care
            </p>
          </div>
        </div>

        <div className="flex gap-2.5 pt-2.5">
          <MapPin
            className="mt-0.5 h-5 w-5 shrink-0 text-[#49A3DA]"
            aria-hidden
          />
          <div className="min-w-0 flex-1 pb-2">
            <div className="space-y-0.5 text-sm leading-relaxed text-slate-600">
              {location.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="space-y-2 pb-1">
        <a
          href={`tel:${location.phoneTel}`}
          className="inline-block text-base font-bold text-[#470A68] transition-colors hover:text-[#5c1890] hover:underline"
        >
          {location.phone}
        </a>
        <UrgentCareEstimatedWaitLive
          slug={location.slug}
          initialMinutes={location.estimatedWaitMinutes}
          variant="card"
        />
        <p className="text-sm text-slate-600">{location.statusLine}</p>

        <div className="flex flex-col gap-1.5 pt-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0d5c5f] hover:underline"
          >
            View all hours
            <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden />
          </Link>
          <a
            href={mapsUrl(location.directionsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d5c5f] hover:underline"
          >
            <Car className="h-4 w-4 shrink-0" aria-hidden />
            Get directions
          </a>
        </div>
      </div>
    </article>
  );
}
