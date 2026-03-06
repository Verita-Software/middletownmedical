import { MOCK_PROVIDERS } from "@/lib/mock-data";
import { LOCATION_PHONES } from "@/lib/appConstant";
import {
  MapPin,
  Phone,
  GraduationCap,
  Stethoscope,
  ChevronLeft,
  Award,
  BookOpen,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientImage } from "@/components/providers/client-image";
import { ProviderEducationCard } from "@/components/providers/provider-education-card";

export default async function ProviderProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const provider = MOCK_PROVIDERS.find((p) => p.id === params.id);

  if (!provider) {
    notFound();
  }

  // Split the provider name into display parts
  const firstName = provider.Name.split(" ")[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Hero Section ────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          {/* Back link */}
          <Link
            href="/providers"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#002147] hover:text-[#00AEEF] transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Provider List
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-48 h-48 lg:w-56 lg:h-56 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm">
                  {provider.profile_url ? (
                    <ClientImage
                      src={provider.profile_url}
                      alt={provider.Name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#002147]/10">
                      <span className="text-5xl font-bold text-[#002147]">
                        {provider.Name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name / specialty / meta */}
                <div className="flex-1">
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-[#002147] leading-tight mb-2">
                    {provider.Name}
                  </h1>
                  {provider.Specialties?.length > 0 && (
                    <p className="text-xl lg:text-2xl font-bold text-[#b5097b] mb-4">
                      {provider.Specialties.join(" · ")}
                    </p>
                  )}

                  <div className="flex flex-col gap-1.5 text-base text-slate-700 font-medium">
                    {provider.Locations?.length > 0 && (
                      <p>
                        <span className="text-slate-400">Practices In: </span>
                        {provider.Locations.map((l) => l.split(" - ")[1] || l)
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Card (replaces "Schedule Appointment") */}
            {provider.Locations?.filter((l) => l !== ":").length > 0 && (
              <div className="lg:w-80 shrink-0">
                <div className="bg-[#002147] rounded-2xl p-6 text-white shadow-lg">
                  <h2 className="text-lg font-bold mb-1">
                    Contact {firstName}
                  </h2>
                  <p className="text-white/70 text-sm mb-5">
                    Call the office directly to book an appointment.
                  </p>
                  <div className="flex flex-col gap-3">
                    {provider.Locations.filter((l) => l !== ":").map((loc) => {
                      const phone = LOCATION_PHONES[loc] ?? "(845) 342-4774";
                      const shortName = loc.split(" - ")[1] || loc;
                      return (
                        <a
                          key={loc}
                          href={`tel:${phone.replace(/\D/g, "")}`}
                          className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3 group"
                        >
                          <div className="bg-white/20 rounded-lg p-2 shrink-0">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-white/60 truncate">
                              {shortName}
                            </p>
                            <p className="font-bold text-[#00AEEF] group-hover:text-white transition-colors">
                              {phone}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ──────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 sticky top-[88px] z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <nav className="flex gap-0 overflow-x-auto">
            {[
              provider.Locations?.filter((l) => l !== ":").length > 0 &&
                "Locations",
              "About",
              (provider.Education?.length > 0 ||
                provider.Certifications?.length > 0) &&
                "Education & Credentials",
            ]
              .filter(Boolean)
              .map((tab) => (
                <a
                  key={tab as string}
                  href={`#${(tab as string).toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                  className="px-6 py-4 text-sm font-bold text-slate-500 hover:text-[#002147] border-b-2 border-transparent hover:border-[#002147] transition-all whitespace-nowrap"
                >
                  {tab as string}
                </a>
              ))}
          </nav>
        </div>
      </div>

      {/* ── Page Body ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10">
        {/* LOCATIONS SECTION */}
        {provider.Locations?.filter((l) => l !== ":").length > 0 && (
          <section id="locations">
            <h2 className="text-3xl font-extrabold text-[#002147] mb-8">
              Locations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provider.Locations.filter((l) => l !== ":").map((loc) => {
                const phone = LOCATION_PHONES[loc] ?? "(845) 342-4774";
                // Try to parse "Name - City - Clinic" style strings
                const parts = loc.split(" - ");
                const displayName =
                  parts.length > 1 ? parts.slice(1).join(" - ") : loc;
                const address = parts[0];
                return (
                  <div
                    key={loc}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-[#002147]/10 rounded-xl p-2.5 shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5 text-[#002147]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#002147] text-lg leading-snug mb-1">
                          {displayName !== loc ? displayName : loc}
                        </h3>
                        {parts.length > 1 && (
                          <p className="text-base text-slate-600 mb-3">
                            {address}
                          </p>
                        )}
                        <a
                          href={`tel:${phone.replace(/\D/g, "")}`}
                          className="inline-flex items-center gap-2 text-[#b5097b] font-bold hover:underline text-base"
                        >
                          <Phone className="w-4 h-4" />
                          {phone}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ABOUT SECTION */}
        {provider.Bio && (
          <section id="about">
            <h2 className="text-3xl font-extrabold text-[#002147] mb-8">
              About {provider.Name}
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Philosophy of Care */}
              <div className="flex flex-col sm:flex-row gap-0 sm:divide-x divide-slate-200">
                <div className="sm:w-64 shrink-0 flex items-start gap-3 px-6 pt-6 pb-4 sm:p-8">
                  <Stethoscope className="w-6 h-6 text-[#b5097b] mt-0.5 shrink-0" />
                  <h3 className="font-bold text-[#002147] text-xl leading-tight">
                    Philosophy of Care
                  </h3>
                </div>
                <div className="flex-1 px-6 py-6 sm:p-8">
                  <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                    {provider.Bio}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* GENERAL INFO (Certifications + specialties) */}
        {(provider.Certifications?.length > 0 ||
          provider.Specialties?.length > 0) && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-6">
              <h3 className="font-extrabold text-xl text-[#002147]">
                General Info
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {provider.Certifications?.length > 0 && (
                <div className="px-6 py-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-[#b5097b]" />
                    <h4 className="font-bold text-lg text-[#002147]">
                      Board Certifications
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {provider.Certifications.map((cert, i) => (
                      <li
                        key={i}
                        className="text-slate-600 text-lg leading-relaxed"
                      >
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {provider.Specialties?.length > 0 && (
                <div className="px-6 py-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-[#b5097b]" />
                    <h4 className="font-bold text-lg text-[#002147]">
                      Specialties
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {provider.Specialties.map((spec, i) => (
                      <li key={i} className="text-slate-600 text-lg">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* EDUCATION & CREDENTIALS */}
        <ProviderEducationCard education={provider.Education} />

        {/* Memberships */}
        {provider.Memberships?.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#002147]" />
                <h3 className="font-extrabold text-xl text-[#002147]">
                  Memberships
                </h3>
              </div>
            </div>
            <div className="px-6 py-8">
              <ul className="space-y-4">
                {provider.Memberships.map((mem, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#b5097b] mt-2.5 shrink-0" />
                    <span className="text-slate-600 text-lg leading-relaxed">
                      {mem}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
