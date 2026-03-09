import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, Stethoscope } from "lucide-react";
import { notFound } from "next/navigation";
import { getResourceBySlug, getResourceSlugs } from "@/lib/api/resources";
import { ResourceSectionContent } from "@/components/resource/ResourceSectionContent";

export async function generateStaticParams() {
  return getResourceSlugs().map((id) => ({ id }));
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slug = id.toLowerCase().replace(/\s+/g, "-");
  const data = getResourceBySlug(slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative w-full min-h-[280px] bg-[#002147] pt-12 pb-16 lg:pt-16 lg:pb-20 flex flex-col justify-end">
        <Image
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2666&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-25 mix-blend-luminosity"
          priority
        />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <nav className="flex items-center text-sm font-semibold text-white/80 mb-4 space-x-2">
            <Link
              href="/"
              className="hover:text-white transition-colors uppercase tracking-wider"
            >
              Resources
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-white uppercase tracking-wider truncate max-w-[220px] sm:max-w-none">
              {data.title}
            </span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white max-w-4xl leading-tight">
            {data.title}
          </h1>
          {data.subtitle != null && data.subtitle !== "" && (
            <p className="mt-4 text-xl md:text-2xl text-white/90 font-semibold max-w-2xl">
              {data.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-[#b5097b] hover:bg-[#8f0761] text-white px-8 py-4 rounded-full font-bold transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-colors backdrop-blur-sm border border-white/20"
            >
              <Stethoscope className="w-5 h-5" />
              Find a Provider
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            {data.intro != null && data.intro !== "" && (
              <p className="text-lg text-slate-700 leading-relaxed mb-10 max-w-3xl">
                {data.intro}
              </p>
            )}
            <div className="space-y-10">
              {data.sections?.map((sec, i) => (
                <ResourceSectionContent key={i} section={sec} />
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="bg-[#002147] text-white p-8 rounded-3xl rounded-tl-sm xl:rounded-tl-[3rem] xl:rounded-br-[3rem]">
              <h3 className="text-2xl font-black mb-4">Need Assistance?</h3>
              <div className="h-0.5 w-16 bg-[#b5097b] mb-6" />
              <p className="mb-6 text-white/80 font-medium">
                Our team is available to answer your questions and help direct
                your care.
              </p>
              <a
                href="tel:+18453424774"
                className="block text-3xl font-black text-white hover:text-slate-200 transition-colors mb-2"
              >
                (845) 342-4774
              </a>
              <p className="text-sm text-white/60 mb-8">
                Available Mon–Fri, 8am–6pm
              </p>
              <Link
                href="#"
                className="block w-full bg-white text-[#002147] font-bold py-4 rounded-xl hover:bg-slate-100 transition-colors text-center"
              >
                Request a Callback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
