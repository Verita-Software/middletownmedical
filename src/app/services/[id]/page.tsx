import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceSidebar } from "@/components/services/ServiceSidebar";
import { ServiceSections } from "@/components/services/ServiceSections";
import { getServiceContent } from "@/lib/services-content";

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
          </div>
          <ServiceSidebar />
        </div>
      </main>
    </div>
  );
}
