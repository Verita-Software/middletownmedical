import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pediatric Patient Forms",
  description:
    "Download and print pediatric patient forms for Middletown Medical. Prepare for your child's visit with our intake and medical history forms.",
  alternates: { canonical: "https://middletownmedical.com/resource/patient-forms/pediatric-forms" },
};

// ── Data ─────────────────────────────────────────────────────────────────────

interface PdfCard {
  title: string;
  href: string;
}

interface FormSection {
  heading: string;
  cards: PdfCard[];
}

const FORM_SECTIONS: FormSection[] = [
  {
    heading: "ASQ-3",
    cards: [
      {
        title: "ASQ-3 | 2 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-2-Month.pdf",
      },
      {
        title: "ASQ-3 | 4 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-4-Month.pdf",
      },
      {
        title: "ASQ-3 | 6 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-6-Month.pdf",
      },
      {
        title: "ASQ-3 | 8 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-9-Month.pdf",
      },
      {
        title: "ASQ-3 | 9 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-8-Month.pdf",
      },
      {
        title: "ASQ-3 | 12 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-12-Month.pdf",
      },
      {
        title: "ASQ-3 | 15 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-15-Month.pdf",
      },
      {
        title: "ASQ-3 | 18 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-18-Month.pdf",
      },
      {
        title: "ASQ-3 | 24 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-24-Month.pdf",
      },
      {
        title: "ASQ-3 | 30 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-30-Month.pdf",
      },
      {
        title: "ASQ-3 | 36 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-36-Month.pdf",
      },
      {
        title: "ASQ-3 | 48 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-48-Month.pdf",
      },
      {
        title: "ASQ-3 | 60 Month",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/ASQ-3-60-Month.pdf",
      },
    ],
  },
  {
    heading: "Other",
    cards: [
      {
        title: "Screen for Child Anxiety Related Disorders (SCARED)",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/SCARED-form-Parent-and-Child-version.pdf",
      },
      {
        title: "PARENT - NICHQ Vanderbilt Assessment Scales",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/PARENT-Vanderbilt-Assessment-Scales.pdf",
      },
      {
        title: "TEACHER - NICHQ Vanderbilt Assessment Scales",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/TEACHER-Vanderbilt-Assessment-Scales.pdf",
      },
      {
        title: "Lead Screening (6 months - 5 years old)",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/Lead-Screening-6-months-5-yrs-old.pdf",
      },
      {
        title: "M Chat (18-30 Months)",
        href: "https://middletownmedical.com/wp-content/uploads/2023/02/M-Chat-18-30-Months.pdf",
      },
    ],
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PediatricFormsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="relative w-full min-h-[200px] bg-[#002147] flex flex-col items-center justify-center py-14 px-4 text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Pediatric Forms
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-2">
        <nav className="flex items-center text-sm text-slate-500 gap-1">
          <Link href="/" className="hover:text-[#002147] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/resource/patient-forms"
            className="hover:text-[#002147] transition-colors"
          >
            Patient Forms
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Pediatric Forms</span>
        </nav>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 pb-20">
        {FORM_SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-black uppercase tracking-widest text-[#49A3DA] mb-6">
              {section.heading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.cards.map((card) => (
                <div
                  key={card.href}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col items-center text-center gap-4"
                >
                  <p className="font-semibold text-[#002147] text-sm leading-snug flex-1 flex items-center justify-center">
                    {card.title}
                  </p>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-1.5 rounded-md border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
