import { MOCK_PROVIDERS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  GraduationCap,
  Stethoscope,
  Clock,
  FileText,
  Award,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientImage } from "@/components/providers/client-image";

export default async function ProviderProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const provider = MOCK_PROVIDERS.find((p) => p.id === params.id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 max-w-6xl">
      <Link
        href="/providers"
        className="text-sm text-middletown-navy hover:text-middletown-dark transition-colors hover:underline mb-6 inline-flex items-center gap-1 font-medium"
      >
        &larr; Back to Providers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image & Bio summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 text-center">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-slate-50 shadow-sm mb-6 flex items-center justify-center bg-slate-100">
              {provider.profile_url ? (
                <ClientImage
                  src={provider.profile_url}
                  alt={provider.Name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <span className="text-6xl text-slate-400">
                  {provider.Name.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-3 text-middletown-navy leading-tight">
              {provider.Name}
            </h1>
            <p className="text-middletown-navy font-semibold text-lg mb-1">
              {provider.Specialties?.join(", ")}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full bg-middletown-navy hover:bg-middletown-dark text-white rounded-full font-semibold px-8 py-6 text-base transition-all shadow-sm"
              >
                Book Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full gap-2 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-semibold px-8 py-6 text-base shadow-sm"
              >
                <Phone className="w-5 h-5" />
                Call Office
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          {provider.Bio && (
            <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-middletown-navy">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-middletown-navy" />
                </div>
                About {provider.Name}
              </h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                {provider.Bio}
              </div>
            </section>
          )}

          {/* Locations Section */}
          {provider.Locations && provider.Locations.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-middletown-navy">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-middletown-navy" />
                </div>
                Locations
              </h2>
              <div className="space-y-4">
                {provider.Locations.map((loc) => (
                  <div
                    key={loc}
                    className="flex items-start gap-4 p-5 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-slate-100/50 transition-colors"
                  >
                    <div className="bg-white shadow-sm p-3 rounded-xl shrink-0">
                      <MapPin className="w-6 h-6 text-middletown-navy" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-middletown-navy">
                        {loc}
                      </h3>
                      <p className="text-sm mt-2 flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <Clock className="w-4 h-4" /> Open Today: 8:00 AM - 5:00
                        PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Credentials Section */}
          {(provider.Education?.length > 0 ||
            provider.Certifications?.length > 0) && (
            <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-middletown-navy">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-middletown-navy" />
                </div>
                Education & Credentials
              </h2>

              {provider.Education?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-5 text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-400" />
                    Education
                  </h3>
                  <ul className="space-y-4 text-slate-600 ml-2">
                    {provider.Education.map((edu, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-middletown-navy mt-2 shrink-0 shadow-sm" />
                        <span className="leading-relaxed text-lg">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {provider.Certifications?.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-5 text-slate-800 flex items-center gap-2">
                    <Award className="w-5 h-5 text-slate-400" />
                    Certifications
                  </h3>
                  <ul className="space-y-4 text-slate-600 ml-2">
                    {provider.Certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-middletown-navy mt-2 shrink-0 shadow-sm" />
                        <span className="leading-relaxed text-lg">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
