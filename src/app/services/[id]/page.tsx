import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, Stethoscope, Clock } from "lucide-react";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params Promise (Next.js 15 requirement)
  const resolvedParams = await params;

  // Decode the URL parameter and replace underscores with spaces
  const serviceName = decodeURIComponent(resolvedParams.id).replace(/_/g, " ");

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dynamic Hero Section */}
      <div className="relative w-full bg-[#002147] pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Placeholder background image with an overlay */}
        <Image
          src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2666&auto=format&fit=crop"
          alt={serviceName}
          fill
          className="object-cover opacity-30 mix-blend-luminosity"
          priority
        />
        <div className="relative z-10 flex flex-col justify-center container mx-auto px-4 max-w-7xl">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm font-semibold text-white/70 mb-6 space-x-2">
            <Link
              href="/services"
              className="hover:text-white transition-colors uppercase tracking-wider"
            >
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white uppercase tracking-wider truncate max-w-[200px] sm:max-w-none">
              {serviceName}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white max-w-4xl leading-tight mb-8">
            {serviceName}
          </h1>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#b5097b] hover:bg-[#8f0761] text-white px-8 py-4 rounded-full font-bold transition-colors flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-colors backdrop-blur-sm border border-white/20">
              Find a Provider
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout Boilerplate */}
      <div className="container mx-auto px-4 max-w-7xl py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column: Dynamic Content Area */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-[#002147] mb-6">
              About {serviceName}
            </h2>
            <div className="h-0.5 w-24 bg-[#8b9e73] mb-8"></div>

            <div className="prose prose-lg prose-slate text-slate-700 max-w-none">
              <p className="lead text-xl text-slate-600 font-medium mb-6">
                Welcome to the {serviceName} department at Middletown Medical.
                We are dedicated to providing you with the highest quality care
                using state-of-the-art technology and evidence-based practices.
              </p>
              <p className="mb-6">
                This is a dynamic placeholder page for{" "}
                <strong>{serviceName}</strong>. As we integrate your backend CMS
                or API, this section will automatically populate with the
                specific clinical details, procedures offered, and specialized
                care information relevant to this specific service.
              </p>
              <h3 className="text-2xl font-bold text-[#002147] mt-12 mb-4">
                What to Expect
              </h3>
              <p className="mb-6">
                Our team of board-certified specialists and dedicated care staff
                ensure that your experience is comfortable, efficient, and
                tailored to your unique health needs from the moment you walk
                through our doors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <Stethoscope className="w-8 h-8 text-[#b5097b] mb-4" />
                  <h4 className="text-xl font-bold text-[#002147] mb-2">
                    Expert Care
                  </h4>
                  <p className="text-slate-600 text-base">
                    Access to top-rated specialists dedicated to{" "}
                    {serviceName.toLowerCase()}.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <Clock className="w-8 h-8 text-[#b5097b] mb-4" />
                  <h4 className="text-xl font-bold text-[#002147] mb-2">
                    Efficiency
                  </h4>
                  <p className="text-slate-600 text-base">
                    Streamlined processes designed to respect your time and
                    health.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="flex flex-col space-y-8">
            {/* Quick Contact Card */}
            <div className="bg-[#002147] text-white p-8 rounded-4xl rounded-tl-sm xl:rounded-tl-[3rem] xl:rounded-br-[3rem]">
              <h3 className="text-2xl font-black mb-4">Need Assistance?</h3>
              <div className="h-0.5 w-16 bg-[#b5097b] mb-6"></div>
              <p className="mb-6 text-white/80 font-medium">
                Our care coordinators are ready to help you schedule your{" "}
                {serviceName.toLowerCase()} visit.
              </p>
              <a
                href="tel:+18453424774"
                className="block text-3xl font-black text-white hover:text-slate-200 transition-colors mb-2"
              >
                (845) 342-4774
              </a>
              <p className="text-sm text-white/60 mb-8">
                Available Mon-Fri, 8am - 6pm
              </p>
              <button className="w-full bg-white text-[#002147] font-bold py-4 rounded-xl hover:bg-slate-100 transition-colors">
                Request a Callback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
