"use client";

import { useEffect, useRef } from "react";
import type { LocationItem } from "@/types/location";

interface LocationsMapProps {
  locations: LocationItem[];
  selectedId: string | null;
  onSelectLocation: (id: string) => void;
  className?: string;
}

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
      className={`relative z-0 isolate h-full min-h-[420px] w-full rounded-lg bg-slate-100 ${className}`}
    />
  );
}
