import {
  Search,
  MapPin,
  User,
  Shield,
  Stethoscope,
  Hospital,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="w-full bg-slate-50 relative isolate pt-6 pb-14 lg:pt-24 lg:pb-16">
      {/* Decorative background circle (optional, based on Duly site) */}
      <div className="absolute top-0 right-0 -z-10 w-[50vw] h-[50vw] rounded-full bg-slate-100/50 translate-x-1/3 -translate-y-1/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="w-full lg:w-3/5 bg-white p-6 sm:p-8 lg:p-8 border-2 border-[#002147] rounded-sm  rounded-tl-[3rem] rounded-br-4xl relative z-10 shadow-md flex justify-center flex-col">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 leading-tight mb-6">
              Book an Appointment in <br className="hidden sm:block" />
              <span className="text-[#00AEEF]">Minutes</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-lg">
              Get health care when and how you need - choose from in-person
              visits, video appointments or immediate care services.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mb-8">
              {/* Specialty Input */}
              <div className="relative border-b-2 border-slate-300 focus-within:border-[#002147] transition-colors pb-0">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-800 font-bold"
                  strokeWidth={2.5}
                />
                <input
                  type="text"
                  placeholder="Specialty, Provider, or Symptom"
                  className="w-full pl-12 pr-4 py-4 bg-slate-100 text-[15px] font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none"
                />
              </div>

              {/* Zip Code Input */}
              <div className="relative border-b-2 border-slate-300 focus-within:border-[#002147] transition-colors pb-0">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-800 font-bold"
                  strokeWidth={2.5}
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="w-full pl-12 pr-4 py-4 bg-slate-100 text-[15px] font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none"
                />
              </div>

              {/* Patient Age Input */}
              <div className="relative border-b-2 border-slate-300 focus-within:border-[#002147] transition-colors pb-0">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-800 font-bold"
                  strokeWidth={2.5}
                />
                <input
                  type="text"
                  placeholder="Patient Age"
                  className="w-full pl-12 pr-4 py-4 bg-slate-100 text-[15px] font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none"
                />
              </div>

              {/* Insurance Dropdown (Simulated with text input for now) */}
              <div className="relative border-b-2 border-slate-300 focus-within:border-[#002147] transition-colors pb-0">
                <Shield
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-800 font-bold"
                  strokeWidth={2.5}
                />
                <select
                  defaultValue=""
                  className="w-full pl-12 pr-4 py-4 bg-slate-100 text-[15px] font-semibold text-slate-900 focus:outline-none cursor-pointer appearance-none"
                >
                  <option
                    value=""
                    disabled
                    className="font-normal text-slate-500"
                  >
                    Insurance *
                  </option>
                  <option value="medicare">Medicare</option>
                  <option value="medicaid">Medicaid</option>
                  <option value="private">Private Insurance</option>
                  <option value="self">Self-Pay</option>
                </select>
                {/* Custom chevron */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="#0f172a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <Button className="bg-[#002147] hover:bg-[#002147]/90 text-white font-bold text-lg px-8 py-6 h-auto w-fit rounded-sm shadow-md transition-all">
              Search
            </Button>
          </div>

          {/* Right Module: Care Without the Wait */}
          <div className="w-full lg:w-2/5 bg-[#470A68] p-6 sm:p-8 lg:p-8 rounded-sm rounded-tl-[3rem] rounded-br-[3rem] flex flex-col justify-center shadow-md">
            <h2 className="text-4xl sm:text-5xl lg:text-4xl font-black text-white leading-tight mb-6">
              Care Without the Wait
            </h2>

            <p className="text-lg text-purple-100 mb-10 max-w-md">
              Find same-day and next-day Primary Care or Immediate Care
              appointments near you.
            </p>

            <div className="flex flex-col gap-4">
              {/* Same Day Care Card */}
              <button className="flex items-center bg-white rounded-xl p-5 sm:p-6 transition-transform hover:-translate-y-1 hover:shadow-xl group text-left w-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#470A68]">
                <div className="shrink-0 mr-4 text-[#b5097b]">
                  <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#002147] group-hover:text-[#b5097b] transition-colors mb-1">
                    Same Day Care
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    Next: Tomorrow, 11:15 PM
                  </p>
                </div>
                <div className="shrink-0 ml-2">
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-slate-400 group-hover:text-[#002147] transition-colors"
                  >
                    <path
                      d="M2 2L8 8L2 14"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* Immediate Care Centers Card */}
              <button className="flex items-center bg-white rounded-xl p-5 sm:p-6 transition-transform hover:-translate-y-1 hover:shadow-xl group text-left w-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#470A68]">
                <div className="shrink-0 mr-4 text-[#b5097b]">
                  <Hospital className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#002147] group-hover:text-[#b5097b] transition-colors mb-1">
                    Immediate Care Centers
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    Next: Tomorrow, 7:30 PM
                  </p>
                </div>
                <div className="shrink-0 ml-2">
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-slate-400 group-hover:text-[#002147] transition-colors"
                  >
                    <path
                      d="M2 2L8 8L2 14"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
