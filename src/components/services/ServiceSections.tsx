"use client";

import type { ServiceSection } from "@/lib/services-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { MapPin, Car, Phone } from "lucide-react";

function RichTextSection({
  heading,
  body,
}: {
  heading?: string;
  body: string[];
}) {
  return (
    <section className="mb-10">
      {heading && (
        <h2 className="mb-4 text-2xl font-bold text-[#002147] md:text-3xl">
          {heading}
        </h2>
      )}
      <div className="space-y-4 text-slate-700 leading-relaxed">
        {body.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function FaqSection(section: Extract<ServiceSection, { type: "faq" }>) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-bold text-[#002147] md:text-3xl">
        {section.heading}
      </h2>
      <Accordion
        type="single"
        collapsible
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        {section.items.map((item, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function PhoneCardsSection(
  section: Extract<ServiceSection, { type: "phoneCards" }>,
) {
  return (
    <section className="mb-10">
      <h2 className="mb-2 text-2xl font-bold text-[#002147] md:text-3xl">
        {section.heading}
      </h2>
      {section.intro && <p className="mb-4 text-slate-700">{section.intro}</p>}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {section.cards.map((card) => (
          <div
            key={card.label}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {card.imageURL && (
              <div className="relative h-40 w-full">
                <Image
                  src={card.imageURL}
                  alt={card.label}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="mb-1 text-lg font-semibold text-slate-900">
                {card.label}
              </h3>
              <a
                href={`tel:${card.phone.replace(/[^0-9]/g, "")}`}
                className="font-bold text-[#b5097b] hover:underline"
              >
                {card.phone}
              </a>
              {card.note && (
                <p className="mt-1 text-sm text-slate-600">{card.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProviderHighlightSection(
  section: Extract<ServiceSection, { type: "providerHighlight" }>,
) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-bold text-[#002147] md:text-3xl">
        {section.heading}
      </h2>
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[220px,1fr]">
        <div className="relative h-64 w-64 max-w-full">
          <Image
            src={section.imageUrl}
            alt={section.name}
            fill
            className="rounded-2xl object-cover shadow-md"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            {section.name}
          </h3>
          <p className="mb-4 text-slate-600">{section.title}</p>
          <div className="space-y-3 text-slate-700 leading-relaxed">
            {section.bio.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Duly-style locations: left = address + Directions; right = grid of service cards (title, note, hours). */
function ServiceLocationsSection(
  section: Extract<ServiceSection, { type: "serviceLocations" }>,
) {
  const heading = section.heading ?? "Locations";

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-bold text-[#002147] md:text-3xl">
        {heading}
      </h2>
      <div className="mb-8 h-0.5 w-12 bg-[#49A3DA]" aria-hidden />
      <div className="flex flex-col gap-10">
        {section.locations.map((loc) => {
          const fullAddress = [loc.addressLine1, loc.addressLine2]
            .filter(Boolean)
            .join(", ");
          const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
          const hasServices = loc.services && loc.services.length > 0;

          return (
            <div
              key={`${loc.name}-${loc.addressLine1}`}
              className={
                hasServices
                  ? "grid grid-cols-1 gap-6 border-b border-slate-200 pb-10 last:border-b-0 last:pb-0 lg:grid-cols-[280px,1fr] lg:gap-8"
                  : "border-b border-slate-200 pb-10 last:border-b-0 last:pb-0"
              }
            >
              {/* Left: location info */}
              <div className="flex flex-col">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#49A3DA]"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900">
                      {loc.name}
                    </h3>
                    {loc.facilityName && (
                      <p className="text-sm text-slate-600">
                        {loc.facilityName}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-slate-700 whitespace-pre-line">
                      {loc.addressLine1}
                      {"\n"}
                      {loc.addressLine2}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {loc.phone && (
                        <a
                          href={`tel:${loc.phone.replace(/\D/g, "")}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#002147] shadow-sm transition-colors hover:border-[#49A3DA] hover:bg-slate-50 hover:text-[#b5097b]"
                        >
                          <Phone className="h-4 w-4 shrink-0 text-[#49A3DA]" aria-hidden />
                          {loc.phone}
                        </a>
                      )}
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-[#49A3DA] hover:bg-slate-50 hover:text-[#002147]"
                      >
                        <Car className="h-4 w-4 shrink-0 text-[#49A3DA]" aria-hidden />
                        Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: services grid */}
              {hasServices && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {loc.services!.map((svc) => (
                    <div
                      key={svc.title}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                        {svc.title}
                      </h4>
                      {svc.note && (
                        <p className="mt-1 text-xs italic text-slate-600">
                          {svc.note}
                        </p>
                      )}
                      <ul className="mt-2 space-y-0.5 text-sm text-slate-700">
                        {svc.hours.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ServiceSections({ sections }: { sections: ServiceSection[] }) {
  return (
    <>
      {sections.map((section, idx) => {
        if (section.type === "richText") {
          return (
            <RichTextSection
              key={idx}
              heading={section.heading}
              body={section.body}
            />
          );
        }
        if (section.type === "faq") {
          return <FaqSection key={idx} {...section} />;
        }
        if (section.type === "phoneCards") {
          return <PhoneCardsSection key={idx} {...section} />;
        }
        if (section.type === "providerHighlight") {
          return <ProviderHighlightSection key={idx} {...section} />;
        }
        if (section.type === "serviceLocations") {
          return <ServiceLocationsSection key={idx} {...section} />;
        }
        return null;
      })}
    </>
  );
}
