import Link from "next/link";
import { Stethoscope, Hospital } from "lucide-react";
import { BookingSearchForm } from "@/components/home/booking-search-form";
import { SameDayCareAvailabilityLine } from "@/components/home/hero-care-availability-lines";
import { formatImmediateCareHeroLine } from "@/lib/hero-care-availability";

/** Same-day / acute care: providers filtered to Emergency Medicine (see `use-providers-filter` URL `specialty`). */
const SAME_DAY_CARE_PROVIDERS_HREF =
  "/providers?specialty=Emergency%20Medicine";
const IMMEDIATE_CARE_CENTERS_HREF = "/urgent-care";

export function HeroBanner() {
  return (
    <div className="w-full bg-slate-50 relative isolate pt-6 pb-14 lg:pt-24 lg:pb-16">
      <div className="absolute top-0 right-0 -z-10 w-[50vw] h-[50vw] rounded-full bg-slate-100/50 translate-x-1/3 -translate-y-1/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left: booking form */}
          <div className="w-full lg:w-3/5 bg-white p-6 sm:p-8 lg:p-6 border-2 border-[#002147] rounded-sm rounded-tl-[3rem] rounded-br-4xl relative z-10 shadow-md flex justify-center flex-col">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 leading-tight mb-6">
              Book an Appointment in <br className="hidden sm:block" />
              <span className="text-[#00AEEF]">Minutes</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-lg">
              Get health care when and how you need - choose from in-person
              visits, video appointments or immediate care services.
            </p>

            <BookingSearchForm />
          </div>

          {/* Right: Care Without the Wait */}
          <div className="w-full lg:w-2/5 bg-[#470A68] p-6 sm:p-8 lg:p-8 rounded-sm rounded-tl-[3rem] rounded-br-[3rem] flex flex-col justify-center shadow-md">
            <h2 className="text-4xl sm:text-5xl lg:text-4xl font-black text-white leading-tight mb-6">
              Care Without the Wait
            </h2>

            <p className="text-lg text-purple-100 mb-10 max-w-md">
              Find same-day and next-day Primary Care or Immediate Care
              appointments near you.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href={SAME_DAY_CARE_PROVIDERS_HREF}
                className="flex items-center bg-white rounded-xl p-5 sm:p-6 transition-transform hover:-translate-y-1 hover:shadow-xl group text-left w-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#470A68]"
              >
                <div className="shrink-0 mr-4 text-[#b5097b]">
                  <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
                </div>
                <div className="grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#002147] group-hover:text-[#b5097b] transition-colors mb-1">
                    Same Day Care
                  </h3>
                  <SameDayCareAvailabilityLine />
                </div>
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 ml-2 text-slate-400 group-hover:text-[#002147] transition-colors"
                  aria-hidden
                >
                  <path
                    d="M2 2L8 8L2 14"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href={IMMEDIATE_CARE_CENTERS_HREF}
                className="flex items-center bg-white rounded-xl p-5 sm:p-6 transition-transform hover:-translate-y-1 hover:shadow-xl group text-left w-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#470A68]"
              >
                <div className="shrink-0 mr-4 text-[#b5097b]">
                  <Hospital className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
                </div>
                <div className="grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#002147] group-hover:text-[#b5097b] transition-colors mb-1">
                    Immediate Care Centers
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {formatImmediateCareHeroLine()}
                  </p>
                </div>
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 ml-2 text-slate-400 group-hover:text-[#002147] transition-colors"
                  aria-hidden
                >
                  <path
                    d="M2 2L8 8L2 14"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
