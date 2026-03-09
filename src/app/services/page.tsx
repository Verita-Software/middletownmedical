import React from "react";
import Image from "next/image";

// Hardcoded data matching the provided Middletown Medical services image
const featuredServices = [
  "Post COVID-19 Recovery",
  "Ketamine Clinic",
  "Same Day Appointments",
  "Imaging Services",
  "Laboratory Services",
  "3D Mammography",
  "Lung Screening",
  "TMS",
  "Treating Depression with TMS",
  "Treating Anxiety with TMS",
  "Treating PTSD with TMS",
  "Treating ADHD with TMS",
];

const specialtyServices = [
  "IND / Occ Med",
  "Headache Center",
  "Hereditary Cancer Screening",
  "Telemedicine",
  "The Sleep Center",
];

const specialtiesAZ = [
  "Addiction Medicine",
  "Allergy & Immunology",
  "Behavioral Health",
  "Cardiology",
  "Dermatology",
  "Diabetes In Children & Teens",
  "Dietitian Nutritionist",
  "Endocrinology",
  "Gastroenterology",
  "Gynecology",
  "Hematology & Oncology",
  "Intensive Cardiac Rehabilitation",
  "Interventional Gastroenterology",
  "Nephrology",
  "Neurology",
  "Ophthalmology / Optometry",
  "Orthopedics",
  "Otolaryngology",
  "Pain Management & Rehabilitation",
  "Pediatrics",
  "Pediatric Endocrinology",
  "Physical Therapy/Occupational Therapy",
  "Podiatry",
  "Primary / Family Medicine",
  "Pulmonary Medicine",
  "Radiology & Ultrasound",
  "Rheumatology",
  "Urgent Care",
  "Urology",
];

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Section: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {/* Featured Services Column */}
          <div className="flex flex-col">
            <div className="relative w-full h-80 sm:h-96 mb-6">
              <Image
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2666&auto=format&fit=crop"
                alt="Featured Services"
                fill
                className="object-cover rounded-sm rounded-tl-[3rem] rounded-br-[3rem]"
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </div>

            <h2 className="text-3xl font-black text-[#002147] mb-4">
              Featured Services
            </h2>
            <div className="h-0.5 w-full bg-[#8b9e73] mb-6"></div>

            <ul className="flex flex-col space-y-4">
              {featuredServices.map((service, idx) => (
                <li key={idx}>
                  <a
                    href={`/services/${encodeURIComponent(service.replace(/ /g, "_"))}`}
                    className="text-2xl font-semibold text-slate-700 hover:text-[#b5097b] transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialty Services Column */}
          <div className="flex flex-col">
            <div className="relative w-full h-80 sm:h-96 mb-6">
              <Image
                src="https://images.pexels.com/photos/3952125/pexels-photo-3952125.jpeg"
                alt="Specialty Services"
                fill
                className="object-cover rounded-sm rounded-tl-[3rem] rounded-br-[3rem]"
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </div>

            <h2 className="text-3xl font-black text-[#002147] mb-4">
              Specialty Services
            </h2>
            <div className="h-0.5 w-full bg-[#8b9e73] mb-6"></div>

            <ul className="flex flex-col space-y-4">
              {specialtyServices.map((service, idx) => (
                <li key={idx}>
                  <a
                    href={`/services/${encodeURIComponent(service.replace(/ /g, "_"))}`}
                    className="text-2xl font-semibold text-slate-700 hover:text-[#b5097b] transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Full Width, 3-Column Grid */}
        <div className="flex flex-col">
          <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6">
            <Image
              src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2670&auto=format&fit=crop"
              alt="Specialties (A-Z)"
              fill
              className="object-cover rounded-sm rounded-tl-[3rem] rounded-br-[3rem]"
              sizes="100vw"
            />
          </div>

          <h2 className="text-3xl font-black text-[#002147] mb-4">
            Specialties (A-Z)
          </h2>
          <div className="h-0.5 w-full bg-[#8b9e73] mb-8"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-2">
            {specialtiesAZ.map((service, idx) => (
              <a
                key={idx}
                href={`/services/${encodeURIComponent(service.replace(/ /g, "_"))}`}
                className="text-2xl font-semibold text-slate-700 hover:text-[#b5097b] transition-colors py-1 block"
              >
                {service}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
