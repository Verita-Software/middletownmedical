"use client";

import { useEffect, useRef } from "react";
import type { LocationItem } from "@/types/location";

interface LocationsMapProps {
  locations: LocationItem[];
  selectedId: string | null;
  onSelectLocation: (id: string) => void;
  className?: string;
}

/**
 * Render an interactive Leaflet map displaying the provided locations as markers.
 *
 * The component initializes a client-side Leaflet map inside the returned container,
 * places markers for locations that have numeric latitude and longitude, and invokes
 * `onSelectLocation` when a marker is clicked. When `selectedId` is provided, the map
 * recenters on the corresponding location.
 *
 * @param locations - Array of location objects; only entries with numeric `latitude` and `longitude` are used for markers and bounds
 * @param selectedId - If set, the map will recenter to the location with this id
 * @param onSelectLocation - Callback invoked with a location's `id` when its marker is clicked
 * @param className - Optional additional CSS class names to apply to the map container
 * @returns The component's rendered map container element
 */
export function LocationsMap({
  locations,
  selectedId,
  onSelectLocation,
  className = "",
}: LocationsMapProps) {
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelectLocation);
  onSelectRef.current = onSelectLocation;

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !containerRef.current ||
      locations.length === 0
    )
      return;

    const validLocations = locations.filter(
      (loc) =>
        typeof loc.latitude === "number" && typeof loc.longitude === "number",
    );
    if (validLocations.length === 0) return;

    let map: import("leaflet").Map | null = null;

    const setup = async () => {
      const L = await import("leaflet");
      // @ts-expect-error - leaflet CSS has no type declarations
      await import("leaflet/dist/leaflet.css");

      const el = containerRef.current;
      if (!el || mapRef.current) return;

      // Use local location marker from public folder
      const DefaultIcon = L.icon({
        iconUrl: "/location.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      const centerLat =
        validLocations.reduce((s, l) => s + l.latitude, 0) /
        validLocations.length;
      const centerLng =
        validLocations.reduce((s, l) => s + l.longitude, 0) /
        validLocations.length;

      map = L.map(el).setView([centerLat, centerLng], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const markers: import("leaflet").Marker[] = [];
      validLocations.forEach((loc) => {
        const marker = L.marker([loc.latitude, loc.longitude])
          .addTo(map!)
          .on("click", () => onSelectRef.current(loc.id));
        marker.bindTooltip(loc.name, { permanent: false, direction: "top" });
        markers.push(marker);
      });

      const bounds = L.latLngBounds(
        validLocations.map(
          (l) => [l.latitude, l.longitude] as [number, number],
        ),
      );
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 12 });

      mapRef.current = map;
      markersRef.current = markers;
    };

    setup();

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations]);

  useEffect(() => {
    if (!mapRef.current || !selectedId) return;
    const loc = locations.find((l) => l.id === selectedId);
    if (!loc || typeof loc.latitude !== "number") return;
    mapRef.current.setView([loc.latitude, loc.longitude], 14);
  }, [selectedId, locations]);

  return (
    <div
      ref={containerRef}
      className={`h-full min-h-[420px] w-full rounded-lg bg-slate-100 ${className}`}
    />
  );
}
