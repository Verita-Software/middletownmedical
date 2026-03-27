import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, MapPin, Phone, Calendar } from "lucide-react";
import type { LocationItem, LocationDetail } from "@/types/location";
import type { Provider } from "@/lib/mock-data";
import { ClientImage } from "@/components/providers/client-image";

interface LocationOverviewDetailPageProps {
  location: LocationItem;
  details: LocationDetail | null;
  providers: Provider[];
}

/**
 * Render a detailed location page with contact information, action CTAs, and anchored sections for Overview, Services, Specialties, and Meet Our Providers.
 *
 * @param location - Location data used for the header (name, address, phone) and to build the directions link
 * @param details - Optional location details (imageUrl, overview, hours, services, specialties) used to populate the Overview, Services, and Specialties sections
 * @param providers - Array of providers associated with the location; rendered in a responsive grid under Meet Our Providers
 * @returns The fully rendered location detail page as a React element
 */
export function LocationOverviewDetailPage({
  location,
  details,
  providers,
}: LocationOverviewDetailPageProps) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
  const addressParts = location.address.split(",").map((s) => s.trim());
  const cityStateZip = addressParts.length >= 2 ? addressParts.slice(1).join(", ") : location.address;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6">
          <Link
            href="/locations"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Locations List
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6">
        {/* Optional location image from Middletown Medical (constrained size) */}
        {details?.imageUrl && (
          <div className="relative mb-8 h-48 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-56 md:h-64">
            <Image
              src={details.imageUrl}
              alt={location.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              unoptimized={details.imageUrl.includes("middletownmedical.com")}
            />
          </div>
        )}

        {/* Header: Name + City/State + CTAs (Duly-style) */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            {location.name}
          </h1>
          <p className="mt-2 text-xl text-slate-600">{cityStateZip}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </a>
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              <Calendar className="h-4 w-4" />
              Schedule an Appointment
            </Link>
          </div>
          {location.phone && (
            <a
              href={`tel:${location.phone.replace(/\D/g, "")}`}
              className="mt-4 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <Phone className="h-4 w-4" />
              {location.phone}
            </a>
          )}
        </header>

        {/* Tabs / Sections: Overview, Services, Meet Our Providers */}
        <nav className="mb-8 border-b border-slate-200" aria-label="Sections">
          <ul className="flex gap-6">
            <li>
              <a href="#overview" className="block border-b-2 border-primary pb-3 text-sm font-semibold text-primary">
                Overview
              </a>
            </li>
            {details && details.services.length > 0 && (
              <li>
                <a href="#services" className="block border-b-2 border-transparent pb-3 text-sm font-medium text-slate-600 hover:text-slate-900">
                  Services
                </a>
              </li>
            )}
            {details && details.specialties.length > 0 && (
              <li>
                <a href="#specialties" className="block border-b-2 border-transparent pb-3 text-sm font-medium text-slate-600 hover:text-slate-900">
                  Specialties
                </a>
              </li>
            )}
            <li>
              <a href="#providers" className="block border-b-2 border-transparent pb-3 text-sm font-medium text-slate-600 hover:text-slate-900">
                Meet Our Providers
              </a>
            </li>
          </ul>
        </nav>

        {/* Overview */}
        <section id="overview" className="mb-12 scroll-mt-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>
          {details?.overview ? (
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {details.overview}
            </p>
          ) : (
            <p className="text-slate-600 leading-relaxed">
              Middletown Medical is committed to providing quality healthcare to our community. 
              Contact this location for hours and services.
            </p>
          )}
          {details?.hours && (
            <p className="mt-4 text-sm font-medium text-slate-700">
              <span className="text-slate-500">Hours:</span> {details.hours}
            </p>
          )}
        </section>

        {/* Services */}
        {details && details.services.length > 0 && (
          <section id="services" className="mb-12 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Services</h2>
            <div className="space-y-6">
              {details.services.map((svc) => (
                <div key={svc.name} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{svc.name}</h3>
                  {svc.description && (
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {svc.description}
                    </p>
                  )}
                  {svc.phone && (
                    <a href={`tel:${svc.phone.replace(/\D/g, "")}`} className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
                      {svc.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Specialties */}
        {details && details.specialties.length > 0 && (
          <section id="specialties" className="mb-12 scroll-mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Specialties</h2>
            <ul className="flex flex-wrap gap-2">
              {details.specialties.map((s) => (
                <li
                  key={s}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Meet Our Providers */}
        <section id="providers" className="mb-12 scroll-mt-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Meet Our Providers</h2>
          {providers.length === 0 ? (
            <p className="text-slate-600">
              No providers are currently listed for this location.{" "}
              <Link href="/providers" className="font-medium text-primary hover:underline">
                Browse all providers
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <Link
                  key={provider.id}
                  href={`/providers/${provider.id}`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {provider.profile_url ? (
                        <ClientImage
                          src={provider.profile_url}
                          alt={provider.Name}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                          {provider.Name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 group-hover:text-primary">
                        {provider.Name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {provider.Specialties?.slice(0, 2).join(", ") ?? "Provider"}
                      </p>
                    </div>
                  </div>
                  <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:underline">
                    View Profile
                  </span>
                </Link>
              ))}
            </div>
          )}
          {providers.length > 0 && (
            <Link
              href="/providers"
              className="mt-6 inline-block font-medium text-primary hover:underline"
            >
              View All Providers
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
