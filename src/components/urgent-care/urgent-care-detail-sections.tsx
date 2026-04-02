import Image from "next/image";
import Link from "next/link";
import type { UrgentCareLocation } from "@/lib/urgent-care-locations";
import {
  URGENT_CARE_IMAGES,
  MM_INSURANCE_INFO_URL,
} from "@/lib/urgent-care-assets";
import {
  WHY_IMMEDIATE_CARE,
  RESERVE_AND_PRICING_BLURBS,
  WORRY_FREE_LEVELS,
  WHEN_URGENT_CARE,
  WHEN_EMERGENCY_ROOM,
  SERVICE_LISTS,
  WHAT_TO_BRING,
} from "@/lib/urgent-care-rich-content";

const SECTION_GAP = "space-y-12 md:space-y-16";

type CategoryDef = {
  title: string;
  icon: string;
  items: readonly string[];
};

const SERVICE_CATEGORIES: CategoryDef[] = [
  {
    title: "Illness",
    icon: URGENT_CARE_IMAGES.icons.illness,
    items: SERVICE_LISTS.illness,
  },
  {
    title: "Injury",
    icon: URGENT_CARE_IMAGES.icons.injury,
    items: SERVICE_LISTS.injury,
  },
  {
    title: "Pediatrics",
    icon: URGENT_CARE_IMAGES.icons.pediatrics,
    items: SERVICE_LISTS.pediatrics,
  },
  {
    title: "Laboratory",
    icon: URGENT_CARE_IMAGES.icons.laboratory,
    items: SERVICE_LISTS.laboratory,
  },
  {
    title: "Physicals",
    icon: URGENT_CARE_IMAGES.icons.medical,
    items: SERVICE_LISTS.physicals,
  },
  {
    title: "STD testing",
    icon: URGENT_CARE_IMAGES.icons.stdTesting,
    items: SERVICE_LISTS.stdTesting,
  },
  {
    title: "Testing",
    icon: URGENT_CARE_IMAGES.icons.xray,
    items: SERVICE_LISTS.testing,
  },
  {
    title: "Immunizations",
    icon: URGENT_CARE_IMAGES.icons.syringe,
    items: SERVICE_LISTS.immunizations,
  },
];

interface UrgentCareDetailSectionsProps {
  location: UrgentCareLocation;
  slug: string;
}

export function UrgentCareDetailSections({
  location,
  slug,
}: Readonly<UrgentCareDetailSectionsProps>) {
  const isMiddletownFacility = slug === "middletown-ny";
  const showLocationIntroWithImage =
    Boolean(location.introHtml) && !isMiddletownFacility;

  return (
    <div className={`${SECTION_GAP} pb-16 pt-10 md:pt-14`}>
      {/* Intro — Duly-style editorial columns */}
      <section className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#0d5c5f] md:text-3xl">
            {WHY_IMMEDIATE_CARE.title}
          </h2>
          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            {WHY_IMMEDIATE_CARE.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#0f2c59]">
            Ready for care?
          </h3>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Most insurance plans are accepted for urgent care. Review accepted
            plans and billing questions before your visit.
          </p>
          <a
            href={MM_INSURANCE_INFO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#49A3DA] hover:underline"
          >
            Insurances we accept{" "}
            <span aria-hidden>→</span>
          </a>
          <ul className="mt-6 space-y-2 border-t border-slate-100 pt-6 text-sm text-slate-600">
            {WHAT_TO_BRING.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#0d5c5f]" aria-hidden>
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {isMiddletownFacility && location.introHtml && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-4/3 min-h-[220px] w-full md:aspect-auto md:min-h-[280px]">
              <Image
                src={URGENT_CARE_IMAGES.facilityPhoto}
                alt={`${location.name} urgent care facility`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <h2 className="text-xl font-bold text-[#0f2c59] md:text-2xl">
                When you need a doctor now
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                All Middletown Medical urgent care locations welcome walk-in
                patients. We focus on life’s common urgent needs — from sore
                throats and rashes to minor sprains and cuts — so you can get
                in, get treated, and get back to your day.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {location.introHtml}
              </p>
            </div>
          </div>
        </section>
      )}

      {showLocationIntroWithImage && location.introHtml && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-4/3 min-h-[220px] w-full md:aspect-auto md:min-h-[280px]">
              <Image
                src={location.cardImageUrl}
                alt={`${location.name} urgent care facility`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <h2 className="text-xl font-bold text-[#0f2c59] md:text-2xl">
                When you need a doctor now
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                All Middletown Medical urgent care locations welcome walk-in
                patients. We are an immediate care center for common urgent and
                non-emergency needs.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {location.introHtml}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-lg font-bold text-[#0f2c59]">
            {RESERVE_AND_PRICING_BLURBS.reserveTitle}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {RESERVE_AND_PRICING_BLURBS.reserveBody}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-lg font-bold text-[#0f2c59]">
            {RESERVE_AND_PRICING_BLURBS.pricingTitle}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {RESERVE_AND_PRICING_BLURBS.pricingLead}
          </p>
        </div>
      </section>

      {/* Worry-free pricing */}
      <section>
        <h2 className="text-xl font-bold text-[#0d5c5f] md:text-2xl">
          No insurance? Worry-free pricing
        </h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Self-pay levels help you understand estimated costs before treatment.
          Final charges depend on services rendered.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {WORRY_FREE_LEVELS.map((tier) => (
            <div
              key={tier.level}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                {tier.level}
              </p>
              <p className="mt-2 text-3xl font-bold text-[#0f2c59]">
                {tier.price}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                {tier.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* UC vs ER */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 md:p-10">
        <h2 className="text-xl font-bold text-[#0d5c5f] md:text-2xl">
          Urgent care or the emergency room?
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h3 className="font-bold text-[#0f2c59]">
              When urgent care is appropriate
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {WHEN_URGENT_CARE.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#0d9488]" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#0f2c59]">
              When to go to the ER or call 911
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {WHEN_EMERGENCY_ROOM.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red-600" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative mx-auto mt-10 max-w-2xl">
          <Image
            src={URGENT_CARE_IMAGES.ucOrErDiagram}
            alt="Guide: urgent care versus emergency room"
            width={480}
            height={186}
            className="h-auto w-full object-contain"
          />
        </div>
      </section>

      {/* Service categories — icon grid; items-start avoids stretched card heights */}
      <section
        id="urgent-care-services"
        className="scroll-mt-28 w-full rounded-2xl border border-teal-200/70 bg-linear-to-br from-teal-50/50 via-white to-emerald-50/40 p-6 shadow-sm md:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-[#0d5c5f] md:text-2xl">
              Conditions & services
            </h2>
            <p className="mt-2 max-w-3xl text-slate-600 leading-relaxed">
              Below is a sample of what we often treat and offer. Availability
              may vary by location; call {location.phone} to confirm.
            </p>
          </div>
          {isMiddletownFacility ? (
            <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl border border-teal-100 shadow-sm sm:h-52 lg:h-auto lg:min-h-44 lg:w-72">
              <Image
                src={URGENT_CARE_IMAGES.facilityPhoto}
                alt={`${location.name} urgent care`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 288px"
              />
            </div>
          ) : (
            <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl border border-teal-100 shadow-sm sm:h-52 lg:h-auto lg:min-h-44 lg:w-72">
              <Image
                src={location.cardImageUrl}
                alt={`${location.name} urgent care`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 288px"
              />
            </div>
          )}
        </div>

        <div className="mt-8 grid w-full grid-cols-1 items-start gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {SERVICE_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="flex min-w-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200 border-t-[3px] border-t-teal-500 bg-white p-4 shadow-sm"
            >
              <div className="flex min-w-0 items-start gap-2.5 border-b border-teal-50 pb-3 sm:gap-3">
                <div className="relative h-11 w-11 shrink-0 rounded-lg bg-teal-50/80 p-1.5 ring-1 ring-teal-100">
                  <Image
                    src={cat.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h3 className="min-w-0 flex-1 text-base font-bold leading-snug wrap-break-word text-[#0f2c59]">
                  {cat.title}
                </h3>
              </div>
              <ul className="mt-3 min-w-0 space-y-1 text-sm leading-snug wrap-break-word text-slate-600">
                {cat.items.map((item) => (
                  <li key={item} className="pl-0.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-teal-200/80 bg-teal-50/60 px-6 py-7 text-center shadow-sm">
        <p className="text-slate-700 leading-relaxed">
          Looking for ongoing primary or specialty care?{" "}
          <Link
            href="/providers"
            className="font-semibold text-[#0d5c5f] underline decoration-teal-300 underline-offset-2 hover:text-teal-700"
          >
            Find a provider
          </Link>{" "}
          or{" "}
          <Link
            href="/services"
            className="font-semibold text-[#0d5c5f] underline decoration-teal-300 underline-offset-2 hover:text-teal-700"
          >
            explore services
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
