import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceSidebar } from "@/components/services/ServiceSidebar";
import { ServiceSections } from "@/components/services/ServiceSections";
import { ServiceProvidersSection } from "@/components/services/ServiceProvidersSection";
import { getServiceContent, SERVICES_CONTENT } from "@/lib/services-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME, MAIN_PHONE } from "@/lib/seo-constants";
import staffData from "@/../api/extracted_staff.json";

type StaffMember = (typeof staffData)[number];

export async function generateStaticParams() {
  return Object.keys(SERVICES_CONTENT).map((slug) => ({ id: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const slug = decodeURIComponent(id);
  const content = getServiceContent(slug);
  if (!content) return { title: "Service Not Found" };

  const description =
    content.subtitle ??
    `Learn about ${content.title} at Middletown Medical — expert care across the Hudson Valley.`;

  return {
    title: content.title,
    description,
    alternates: { canonical: `${SITE_URL}/services/${encodeURIComponent(slug)}` },
    openGraph: {
      url: `${SITE_URL}/services/${encodeURIComponent(slug)}`,
      title: `${content.title} | Middletown Medical`,
      description,
      images: content.heroImageUrl ? [{ url: content.heroImageUrl }] : undefined,
    },
  };
}

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: content.title,
    description:
      content.subtitle ?? `${content.title} services at Middletown Medical.`,
    url: `${SITE_URL}/services/${encodeURIComponent(slug)}`,
    provider: {
      "@type": "MedicalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: MAIN_PHONE,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd data={serviceSchema} />
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
