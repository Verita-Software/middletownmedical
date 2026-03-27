"use client";

import Image from "next/image";
import type {
  CareerListing,
  FaqItem,
  LocationCardEntry,
  PdfCard,
  ResourceSection,
  ResourceSectionContent,
  ScheduleEntry,
} from "@/types/resource-content";
import {
  Phone,
  Printer,
  FileText,
  Download,
  Calendar,
  MapPin,
  Clock,
  BriefcaseBusiness,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PdfCardItem({ card }: { card: PdfCard }) {
  return (
    <Card className="group border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white rounded-2xl">
      <div className="h-1.5 w-full" style={{ backgroundColor: card.accent }} />
      <CardHeader className="pb-2 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: card.accent + "18" }}
            >
              <FileText className="h-5 w-5" style={{ color: card.accent }} />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-[#002147] leading-snug group-hover:text-[#b5097b] transition-colors">
                {card.title}
              </CardTitle>
              <p className="text-xs text-slate-400 font-medium mt-0.5 uppercase tracking-wide">
                {card.category}
              </p>
            </div>
          </div>
          <Badge
            className="shrink-0 rounded-full text-xs font-semibold px-3 py-1 border-0"
            style={{ backgroundColor: card.accent + "15", color: card.accent }}
          >
            {card.tag}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription className="text-slate-600 text-sm leading-relaxed">
          {card.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-0 pb-5 flex items-center gap-3">
        <Button
          asChild
          className="rounded-full font-semibold text-sm px-6 text-white hover:opacity-90"
          style={{ backgroundColor: card.accent }}
        >
          <a href={card.href} target="_blank" rel="noopener noreferrer">
            <Download className="w-4 h-4 mr-2" />
            View Resource
          </a>
        </Button>
        <span className="text-xs text-slate-400">PDF Document</span>
      </CardFooter>
    </Card>
  );
}

/** Renders section content based on backend response type. Add new types here when backend adds them. */
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

/** Splits a string on URLs and renders each URL segment as a clickable link. */
function renderWithLinks(text: string): React.ReactNode {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) =>
    URL_REGEX.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#49A3DA] underline underline-offset-2 hover:text-[#002147] transition-colors break-all"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

const CONTENT_RENDERERS: Record<
  string,
  (content: ResourceSectionContent) => React.ReactNode
> = {
  paragraphs: (content) => {
    if (!("paragraphs" in content) || !Array.isArray(content.paragraphs))
      return null;
    return (
      <div className="space-y-4">
        {content.paragraphs.map((para, j) => (
          <p key={j} className="text-slate-700 leading-relaxed">
            {renderWithLinks(para)}
          </p>
        ))}
      </div>
    );
  },
  contact: (content) => {
    if (!("items" in content) || !Array.isArray(content.items)) return null;
    return (
      <ul className="space-y-3 mt-2">
        {content.items.map((item, j) => (
          <li key={j} className="text-slate-700">
            <span className="font-semibold text-slate-900">{item.label}</span>
            {" — "}
            {item.href ? (
              <a
                href={item.href}
                className="text-primary hover:underline"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {item.value}
              </a>
            ) : (
              <a
                href="tel:+18453424774"
                className="text-primary hover:underline"
              >
                {item.value}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  },
  pdfCards: (content) => {
    if (!("cards" in content) || !Array.isArray(content.cards)) return null;
    return (
      <div className="space-y-6">
        {(content.cards as PdfCard[]).map((card, j) => (
          <PdfCardItem key={j} card={card} />
        ))}
      </div>
    );
  },
  faq: (content) => {
    if (!("items" in content) || !Array.isArray(content.items)) return null;
    return (
      <Accordion type="single" collapsible className="w-full space-y-3 mt-2">
        {(content.items as FaqItem[]).map((item, j) => (
          <AccordionItem
            key={j}
            value={`faq-${j}`}
            className="border border-slate-200 rounded-xl px-5 shadow-sm bg-white overflow-hidden"
          >
            <AccordionTrigger className="text-left font-semibold text-[#002147] text-base hover:no-underline py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
  ctaButton: (content) => {
    if (!("label" in content)) return null;
    const label = content.label as string;
    const href = (content.href as string) ?? "#";
    const note = content.note as string | undefined;
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        {note && (
          <p className="text-sm text-slate-500 uppercase tracking-wide font-medium text-center">
            {note}
          </p>
        )}
        <Button
          asChild
          className="bg-[#b5097b] hover:bg-[#8f0761] text-white rounded-full px-10 py-6 font-bold text-base shadow-md"
        >
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <Calendar className="w-5 h-5 mr-2" />
            {label}
          </a>
        </Button>
      </div>
    );
  },

  bulletList: (content) => {
    if (!("items" in content) || !Array.isArray(content.items)) return null;
    return (
      <ul className="space-y-4 mt-2">
        {(content.items as string[]).map((item, j) => (
          <li
            key={j}
            className="flex items-start gap-3 text-slate-700 leading-relaxed"
          >
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#49A3DA]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  },

  locationCards: (content) => {
    if (!("locations" in content) || !Array.isArray(content.locations))
      return null;
    const locations = content.locations as LocationCardEntry[];
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-2">
        {locations.map((loc, i) => {
          const fullAddress = [loc.addressLine1, loc.addressLine2]
            .filter(Boolean)
            .join(", ");
          const directionsUrl =
            loc.mapsUrl ??
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
          return (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#49A3DA]/10 mt-0.5">
                    <MapPin className="h-4 w-4 text-[#49A3DA]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#002147]">
                      {loc.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {loc.addressLine1}
                      {loc.addressLine2 && (
                        <>
                          <br />
                          {loc.addressLine2}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                {loc.hours && loc.hours.length > 0 && (
                  <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                      Office Hours
                    </p>
                    <div className="space-y-1">
                      {loc.hours.map((h, j) => (
                        <div
                          key={j}
                          className="flex justify-between text-sm text-slate-700"
                        >
                          <span className="font-medium">{h.day}</span>
                          <span>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  {loc.phone && (
                    <a
                      href={`tel:${loc.phone.replace(/\D/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#b5097b] shadow-sm transition-colors hover:border-[#49A3DA] hover:bg-slate-50"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-[#49A3DA]" />
                      {loc.phone}
                    </a>
                  )}
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-[#49A3DA] hover:bg-slate-50 hover:text-[#002147]"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-[#49A3DA]" />
                    Directions
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },

  locationSchedule: (content) => {
    if (!("schedules" in content) || !Array.isArray(content.schedules))
      return null;
    const location = content.location as string;
    const floor = content.floor as string | undefined;
    const mapsUrl =
      (content.mapsUrl as string | undefined) ??
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    const schedules = content.schedules as ScheduleEntry[];

    return (
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white mt-2">
        {/* Location header */}
        <div className="bg-[#002147] px-6 py-4 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-[15px] leading-tight">
              {location}
            </p>
            {floor && <p className="text-white/70 text-xs mt-0.5">{floor}</p>}
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 px-4 py-1.5 text-xs font-semibold text-white transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" />
            Get Directions
          </a>
        </div>

        {/* Schedule rows */}
        <div className="divide-y divide-slate-100">
          {schedules.map((entry, j) => (
            <div
              key={j}
              className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#49A3DA]/10 mt-0.5">
                <Clock className="h-4 w-4 text-[#49A3DA]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#002147] text-sm">{entry.day}</p>
                <p className="text-slate-500 text-sm mt-0.5">{entry.time}</p>
              </div>
              <div className="text-right shrink-0 max-w-[55%]">
                <p className="text-slate-700 text-sm leading-snug">
                  {entry.services}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  jobListings: (content) => {
    if (!("listings" in content) || !Array.isArray(content.listings))
      return null;
    const listings = content.listings as CareerListing[];
    const introCard =
      "introCard" in content &&
      content.introCard &&
      typeof content.introCard === "object"
        ? (content.introCard as {
            title: string;
            subtitle?: string;
            description?: string;
            imageUrl?: string;
          })
        : undefined;
    const legalNote =
      "legalNote" in content &&
      content.legalNote &&
      typeof content.legalNote === "object"
        ? (content.legalNote as { posted?: string; paragraphs?: string[] })
        : undefined;

    return (
      <div className="space-y-8">
        {introCard && (
          <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-0 grid md:grid-cols-[1.1fr_1fr]">
              <div className="p-6 md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#49A3DA]">
                  Careers
                </p>
                <h3 className="text-2xl font-bold text-[#002147] mt-2">
                  {String(introCard.title ?? "")}
                </h3>
                {"subtitle" in introCard && introCard.subtitle && (
                  <p className="text-slate-500 text-sm mt-2">
                    {String(introCard.subtitle)}
                  </p>
                )}
                {"description" in introCard && introCard.description && (
                  <p className="text-slate-700 mt-4 leading-relaxed">
                    {String(introCard.description)}
                  </p>
                )}
              </div>
              {"imageUrl" in introCard && introCard.imageUrl && (
                <div className="relative min-h-[220px] md:min-h-full">
                  <Image
                    src={String(introCard.imageUrl)}
                    alt="Careers at Middletown Medical"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="space-y-5">
          {listings.map((listing, idx) => (
            <Card
              key={idx}
              className="border border-slate-200 shadow-sm rounded-2xl bg-white"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-xl font-bold text-[#002147] flex items-center gap-2">
                    <BriefcaseBusiness className="h-5 w-5 text-[#49A3DA]" />
                    {listing.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    {listing.updated && (
                      <Badge className="bg-[#EDF6FB] text-[#0f5f8d] border border-[#cfe8f8] font-semibold">
                        {listing.updated}
                      </Badge>
                    )}
                    {listing.date && (
                      <Badge
                        variant="outline"
                        className="text-slate-600 border-slate-300"
                      >
                        {listing.date}
                      </Badge>
                    )}
                  </div>
                </div>
                {listing.location && (
                  <p className="text-sm text-slate-500">{listing.location}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {listing.summary && (
                  <p className="text-slate-700 leading-relaxed">
                    {listing.summary}
                  </p>
                )}
                {listing.details?.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <p className="text-sm font-semibold text-[#002147] mb-2">
                      {group.label}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item, itemIndex) => (
                        <li
                          key={`${groupIndex}-${itemIndex}`}
                          className="text-sm text-slate-700 leading-relaxed flex items-start gap-2"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#49A3DA]" />
                          <span>{renderWithLinks(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {(listing.ctaLinks?.length || listing.ctaLabel) && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {listing.ctaLinks?.map((link, linkIdx) => (
                      <Button
                        key={`${listing.title}-cta-${linkIdx}`}
                        asChild
                        variant="outline"
                        className="rounded-full border-slate-300 text-[#002147] hover:bg-slate-100"
                      >
                        <a
                          href={link.href}
                          target={
                            link.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {link.label}
                        </a>
                      </Button>
                    ))}
                    {listing.ctaLabel && listing.ctaHref && (
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-slate-300 text-[#002147] hover:bg-slate-100"
                      >
                        <a
                          href={listing.ctaHref || "#"}
                          target={
                            listing.ctaHref?.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            listing.ctaHref?.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {listing.ctaLabel}
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {legalNote && (
          <Card className="border border-slate-200 bg-slate-50 rounded-2xl">
            <CardContent className="p-6">
              {legalNote.posted && (
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-3">
                  Posted: {legalNote.posted}
                </p>
              )}
              <div className="space-y-3">
                {legalNote.paragraphs?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm leading-relaxed text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  },

  billingDeptInfo: (content) => {
    if (!("phone" in content)) return null;
    const hours = content.hours as string;
    const phone = content.phone as string;
    const fax = content.fax as string[];
    const addressLine1 = content.addressLine1 as string;
    const addressLine2 = content.addressLine2 as string;
    const payBillHref = content.payBillHref as string;
    const mapsUrl = content.mapsUrl as string;

    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-[#002147] px-6 py-5">
          <h2 className="text-2xl font-black text-white">Billing Department</h2>
        </div>
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Hours
              </p>
              <p className="text-slate-700 font-medium">{hours}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Phone
              </p>
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-1.5 text-[#002147] font-semibold hover:text-[#49A3DA] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Fax
              </p>
              {fax.map((f, i) => (
                <p
                  key={i}
                  className="inline-flex items-center gap-1.5 text-slate-600 text-sm"
                >
                  <Printer className="w-3.5 h-3.5 shrink-0" />
                  {f}
                </p>
              ))}
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                Address
              </p>
              <p className="text-slate-700 font-medium">{addressLine1}</p>
              <p className="text-slate-500 text-sm">{addressLine2}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-auto">
              <a
                href={payBillHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#003575] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
              >
                Pay Your Bill
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },

  insuranceColumns: (content) => {
    if (!("columns" in content) || !Array.isArray(content.columns)) return null;
    const notices =
      "notices" in content && Array.isArray(content.notices)
        ? (content.notices as string[])
        : [];
    const columns = content.columns as { heading: string; items: string[] }[];

    return (
      <div className="space-y-6">
        {notices.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 space-y-2">
            {notices.map((notice, i) => (
              <p key={i} className="text-sm text-slate-700 leading-relaxed">
                {renderWithLinks(notice)}
              </p>
            ))}
          </div>
        )}
        <div
          className={`grid gap-6 ${columns.length === 3 ? "md:grid-cols-3" : columns.length === 2 ? "md:grid-cols-2" : "grid-cols-1"}`}
        >
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <div className="bg-[#002147] px-4 py-3">
                <p className="text-white font-bold text-sm tracking-wide">
                  {col.heading}
                </p>
              </div>
              <ul className="p-4 space-y-1.5 ">
                {col.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="text-sm text-slate-700 leading-relaxed flex items-start gap-2"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#49A3DA]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

function renderSectionContent(
  content: ResourceSectionContent,
): React.ReactNode {
  const type =
    content && typeof content === "object" && "type" in content
      ? content.type
      : "";
  const renderer =
    typeof type === "string" ? CONTENT_RENDERERS[type] : undefined;
  return renderer ? renderer(content) : null;
}

const HEADING_STYLES = {
  2: "text-2xl md:text-3xl font-bold text-[#002147] mb-4",
  3: "text-xl font-bold text-[#002147] mt-8 mb-3 first:mt-0",
  4: "text-lg font-bold text-slate-800 mt-6 mb-2 first:mt-0",
} as const;

export function ResourceSectionContent({
  section,
}: {
  section: ResourceSection;
}) {
  const { heading, level, content } = section;
  const className = HEADING_STYLES[level] ?? HEADING_STYLES[2];
  const Tag = level === 2 ? "h2" : level === 3 ? "h3" : "h4";

  return (
    <section>
      <Tag className={className}>{heading}</Tag>
      {renderSectionContent(content)}
    </section>
  );
}
