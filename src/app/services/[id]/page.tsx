import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceSidebar } from "@/components/services/ServiceSidebar";
import { ServiceSections } from "@/components/services/ServiceSections";
import { ServiceProvidersSection } from "@/components/services/ServiceProvidersSection";
import { getServiceContent } from "@/lib/services-content";
import staffData from "@/../api/extracted_staff.json";

type StaffMember = (typeof staffData)[number];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.id);

  const content = getServiceContent(slug);

  if (!content) {
    notFound();
  }

  const specialtiesFilter = content.providerFilter?.specialties ?? [];
  const includeUrls = content.providerFilter?.includeProviderUrls ?? [];
  const bySpecialty: StaffMember[] =
    specialtiesFilter.length === 0
      ? []
      : staffData.filter((staff) =>
          (staff.Specialties ?? []).some((spec: string) =>
            specialtiesFilter.includes(spec),
          ),
        );
  const byUrl: StaffMember[] =
    includeUrls.length === 0
      ? []
      : staffData.filter((s) => includeUrls.includes(s.URL));
  const seen = new Set<string>();
  const providers: StaffMember[] = [...bySpecialty, ...byUrl].filter((s) => {
    if (seen.has(s.URL)) return false;
    seen.add(s.URL);
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <ServiceHero
        title={content.title}
        subtitle={content.subtitle}
        heroImageUrl={content.heroImageUrl}
        heroImageAlt={content.heroImageAlt}
      />

      <main className="container mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <ServiceSections sections={content.sections} />
            <ServiceProvidersSection
              serviceTitle={content.title}
              providers={providers}
            />
          </div>
          <ServiceSidebar />
        </div>
      </main>
    </div>
  );
}
