import Link from "next/link";
import { LocationItem } from "@/types/location";
import { Phone, ChevronUp, ChevronDown } from "lucide-react";

/**
 * Render a location card showing name, address, optional phone, and an expandable details section.
 *
 * Renders a link to the location page, a tel: link when `location.phone` is present, an expand/collapse control, and — when expanded — county info plus actions to select the location, open directions in Google Maps, or view the full location page.
 *
 * @param location - LocationItem containing name, address, slug, county, phone, and other location data
 * @param isSelected - Whether the card is currently selected (affects visual styling)
 * @param isExpanded - Whether the details section is expanded
 * @param onSelect - Callback invoked when the "View on map" action is triggered
 * @param onToggleExpand - Callback invoked to toggle the expanded/collapsed state
 * @param scrollRef - Optional ref attached to the card's inner container for scrolling behavior
 * @returns The rendered location card element
 */
export function LocationCard({
  location,
  isSelected,
  isExpanded,
  onSelect,
  onToggleExpand,
  scrollRef,
}: {
  location: LocationItem;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;

  return (
    <article
      className={`border-b-2 border-[#7dd3fc]  py-5 last:border-b-0 ${
        isSelected ? "bg-slate-50/80" : ""
      }`}
    >
      <div ref={scrollRef} className="px-0">
        <Link
          href={`/location/${location.slug}`}
          className="text-lg font-bold text-slate-900 hover:text-primary hover:underline"
        >
          {location.name}
        </Link>
        <p className="mt-1 text-sm font-normal text-slate-600">
          {location.address}
        </p>
        {location.phone && (
          <a
            href={`tel:${location.phone.replace(/\D/g, "")}`}
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
          >
            <Phone className="h-3.5 w-3.5" />
            {location.phone}
          </a>
        )}
        <button
          type="button"
          onClick={onToggleExpand}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-[#9333ea] hover:text-[#7e22ce] hover:underline"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "View less" : "View location details"}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-700">County:</span>{" "}
              {location.county}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onSelect}
                className="font-medium text-[#9333ea] hover:underline"
              >
                View on map
              </button>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#9333ea] hover:underline"
              >
                Get directions
              </a>
              <Link
                href={`/location/${location.slug}`}
                className="font-medium text-[#9333ea] hover:underline"
              >
                View full location page
              </Link>
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-medium text-[#9333ea] hover:underline"
            >
              Open in Google Maps
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
