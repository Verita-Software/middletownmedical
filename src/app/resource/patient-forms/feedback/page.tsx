import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Patient Feedback",
  description:
    "Share your experience at Middletown Medical. Provide feedback and rate your visit at any of our Hudson Valley locations.",
  alternates: { canonical: "https://middletownmedical.com/resource/patient-forms/feedback" },
};

// ── Data ─────────────────────────────────────────────────────────────────────

interface FeedbackCard {
  title: string;
  description: string;
  buttonLabel: "Rate Experience" | "Provide Feedback" | "Leave Review";
  href: string;
}

interface FeedbackLocation {
  name: string;
  subtitle?: string;
  id: string;
  cards: FeedbackCard[];
}

interface FeedbackCounty {
  county: string;
  locations: FeedbackLocation[];
}

const FEEDBACK_DATA: FeedbackCounty[] = [
  {
    county: "Orange County",
    locations: [
      {
        name: "Chester",
        id: "chester",
        cards: [
          {
            title: "Urgent Care Experience",
            description: "Rate your experience at the Chester Urgent Care",
            buttonLabel: "Rate Experience",
            href: "https://middletownmedical.com/feedback/chester-uc",
          },
          {
            title: "Chester Satisfaction Survey",
            description:
              "Leave feedback on your overall experience at Chester",
            buttonLabel: "Provide Feedback",
            href: "https://middletownmedical.com/feedback/chester",
          },
          {
            title: "Review - Google",
            description: "Leave a review on Google",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?source=hp&ei=Ne7ZWsPGD4aZwgSvo5zoBQ&q=Immediate+Medical+Care+%28Chester+Center%29&oq=Immediate+Medical+Care+%28Chester+Center%29&gs_l=psy-ab.13..0j0i22i30k1l2.5902.5902.0.7210.4.2.0.0.0.0.92.92.1.2.0....0...1c.2.64.psy-ab..2.2.186.6..35i39k1.94.5O52RdRCDUE#lrd=0x89c32917207cd489:0x9f5523f295084750,3,,,",
          },
          {
            title: "Review - Facebook",
            description: "Leave a review on Facebook",
            buttonLabel: "Leave Review",
            href: "https://www.facebook.com/chestercenter/reviews/",
          },
        ],
      },
      {
        name: "Middletown",
        id: "middletown",
        cards: [
          {
            title: "Urgent Care Experience",
            description: "Rate your experience at the Middletown Urgent Care",
            buttonLabel: "Rate Experience",
            href: "https://middletownmedical.com/feedback/middletown-uc",
          },
          {
            title: "Middletown Satisfaction Survey",
            description:
              "Leave feedback on your overall experience at Middletown",
            buttonLabel: "Provide Feedback",
            href: "https://middletownmedical.com/feedback/middletown",
          },
          {
            title: "Review - Google",
            description: "Leave a review on Google",
            buttonLabel: "Leave Review",
            href: "https://www.google.com.ar/search?q=middletown+Medical&oq=middletown+Medical&aqs=chrome..69i57j69i60l3j69i64.3488j0j1&sourceid=chrome&ie=UTF-8#lrd=0x89c32d6bbba8493f:0x2d16ff9428525df0,3,,,",
          },
          {
            title: "Review - Facebook",
            description: "Leave a review on Facebook",
            buttonLabel: "Leave Review",
            href: "https://www.facebook.com/MiddletownMedical/reviews/",
          },
        ],
      },
      {
        name: "Montgomery",
        id: "montgomery",
        subtitle: "Harvinder K Chaudhry's Office",
        cards: [
          {
            title: "Review - Google",
            description:
              "Leave a review on Google for Harvinder K Chaudhry's Office",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?biw=1569&bih=991&ei=hX3gWvm7DIqlwAT8kYugDg&q=Harvinder+K+Chaudhry+Office+ny&oq=Harvinder+K+Chaudhry+Office+ny&gs_l=psy-ab.3..35i39k1.1106.1648.0.1790.3.3.0.0.0.0.80.80.1.1.0....0...1c.1.64.psy-ab..2.1.80....0.FDv1PsCSJMo#lrd=0x89dd2a1bbe68156f:0x696b5ac06b1f67bf,3,,,",
          },
        ],
      },
      {
        name: "Newburgh",
        id: "newburgh",
        cards: [
          {
            title: "Urgent Care Experience",
            description: "Rate your experience at the Newburgh Urgent Care",
            buttonLabel: "Rate Experience",
            href: "https://middletownmedical.com/feedback/newburgh-uc",
          },
        ],
      },
      {
        name: "Pine Bush",
        id: "pine-bush",
        subtitle: "Pine Bush Medical",
        cards: [
          {
            title: "Review - Google",
            description: "Leave a review on Google for Pine Bush Medical",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?biw=1569&bih=991&ei=uYHgWq6tBJH4wATHupzoBQ&q=pine+bush+medical+y&oq=pine+bush+medical+y&gs_l=psy-ab.3..35i39k1.1631.2544.0.3172.3.3.0.0.0.0.461.701.2-1j0j1.2.0....0...1c.1.64.psy-ab..1.2.700...0j0i20i263k1j0i22i30k1.0.AB1J45nj6VU#lrd=0x89dcd738f30aea91:0xa2fa24eddbeb02f6,3,,,",
          },
        ],
      },
      {
        name: "Warwick",
        id: "warwick",
        subtitle: "Dr. Anthony Martini's Office",
        cards: [
          {
            title: "Review - Google",
            description:
              "Leave a review on Google for Dr. Anthony Martini's Office",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?q=Dr.+Anthony+Martini%27s+Office&oq=Dr.+Anthony+Martini%27s+Office&aqs=chrome..69i57.613j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c324605e5aedfb:0x38633fb88f9902bb,3,,,",
          },
        ],
      },
    ],
  },
  {
    county: "Sullivan County",
    locations: [
      {
        name: "Barryville",
        id: "barryville",
        subtitle: "River Valley Family Medical Services P.C.",
        cards: [
          {
            title: "Review - Google",
            description:
              "Leave a review on Google for River Valley Family Medical Services P.C.",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?q=River+Valley+Family+Medical+Services+P.C.&oq=River+Valley+Family+Medical+Services+P.C.&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8#lrd=0x89c3542c82c3480f:0x80343ab5cccf995f,3,,,",
          },
        ],
      },
      {
        name: "Ferndale",
        id: "ferndale",
        cards: [
          {
            title: "Review - Google",
            description:
              "Leave a review on Google for Dr. Newland-Pagan's Office",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?q=Yvonne+C+Newland-Pagan+Md&oq=Yvonne+C+Newland-Pagan+Md&aqs=chrome..69i57j69i60l3.1204j0j4&sourceid=chrome&ie=UTF-8#lrd=0x89dcbb759c4b44c1:0x5f1a5280a572167b,3,,,",
          },
        ],
      },
      {
        name: "Liberty",
        id: "liberty",
        subtitle: "Liberty Medical Group",
        cards: [
          {
            title: "Review - Google",
            description: "Leave a review on Google for Liberty Medical Group",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?q=Liberty+Medical+Group%2C+liberty+ny&oq=Liberty+Medical+Group%2C+liberty+ny&aqs=chrome..69i57j0j69i60l2.1942j0j4&sourceid=chrome&ie=UTF-8#lrd=0x89dcbc60945d017d:0xab95e50b2f54cbdd,3,,,",
          },
        ],
      },
      {
        name: "Monticello",
        id: "monticello",
        cards: [
          {
            title: "Urgent Care Experience",
            description:
              "Rate your experience at the Monticello Urgent Care",
            buttonLabel: "Rate Experience",
            href: "https://middletownmedical.com/feedback/monticello-uc",
          },
          {
            title: "Monticello Satisfaction Survey",
            description:
              "Leave feedback on your overall experience at Monticello",
            buttonLabel: "Provide Feedback",
            href: "https://middletownmedical.com/feedback/monticello",
          },
          {
            title: "Review - Google",
            description:
              "Leave a review on Google for Sullivan Internal Medicine Group",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?q=sullivan+internal+medicine+group&oq=Sullivan+Internal+Medicine+Group&aqs=chrome.0.0l3.471j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89dcb0ca3e60269b:0xdd971ae5a6e4e476,3,,,",
          },
          {
            title: "Review - Google",
            description:
              "Leave a review on Google for Catskill Adult & Pediatric",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?ei=_rngWsLSOIL4wgT1m7DYAw&q=Catskill+Adult+%26+Pediatric+Medicine&oq=Catskill+Adult+%26+Pediatric+Medicine&gs_l=psy-ab.3...0.0.1.48300.0.0.0.0.0.0.0.0..0.0....0...1c..64.psy-ab..0.0.0....0.hgoIrS1IazI#lrd=0x89dcb0b64b97f5b1:0x32af3b2c479ad4cf,3,,,",
          },
        ],
      },
      {
        name: "Wurtsboro",
        id: "wurtsboro",
        cards: [
          {
            title: "Review - Google",
            description:
              "Leave a review on Google for Dr. Stuart Tashman, MD",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?ei=frvgWs7hMIykwATir6voCw&q=Tashman+Stuart+M+MD+ny&oq=Tashman+Stuart+M+MD+ny&gs_l=psy-ab.3..33i160k1.7178.7836.0.8379.3.3.0.0.0.0.100.264.2j1.3.0....0...1c.1.64.psy-ab..0.2.163....0.Pmvs0zGvMks#lrd=0x89dccbf3949aec2b:0x5f21c32802cdc6f8,3,,,",
          },
        ],
      },
    ],
  },
  {
    county: "Ulster County",
    locations: [
      {
        name: "Ellenville",
        id: "ellenville",
        subtitle: "Immediate Medical Care",
        cards: [
          {
            title: "Urgent Care Experience",
            description: "Rate your experience at the Ellenville Urgent Care",
            buttonLabel: "Rate Experience",
            href: "https://middletownmedical.com/feedback/ellenville-uc",
          },
          {
            title: "Review - Google",
            description: "Leave a review on Google for Immediate Medical Care",
            buttonLabel: "Leave Review",
            href: "https://www.google.com/search?q=immediate+medical+care+ellenville+ny&oq=Immediate+Medical+Care+ell&aqs=chrome.0.0j69i57j69i60j0l2.4537j0j9&sourceid=chrome&ie=UTF-8#lrd=0x89dcdc95220fc045:0x23285a8127f0c382,3,,,",
          },
        ],
      },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function FeedbackCardItem({ card }: { card: FeedbackCard }) {
  const buttonClass =
    card.buttonLabel === "Rate Experience"
      ? "border border-[#002147] text-[#002147] hover:bg-[#002147] hover:text-white"
      : card.buttonLabel === "Provide Feedback"
        ? "border border-[#002147] text-[#002147] hover:bg-[#002147] hover:text-white"
        : "border border-slate-300 text-slate-700 hover:bg-slate-100";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center gap-3">
      <h3 className="font-bold text-[#002147] text-[15px] leading-snug">
        {card.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed flex-1">
        {card.description}
      </p>
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-1 inline-block px-5 py-2 rounded-md text-sm font-semibold transition-colors ${buttonClass}`}
      >
        {card.buttonLabel}
      </a>
    </div>
  );
}

function LocationSection({ location }: { location: FeedbackLocation }) {
  return (
    <section id={location.id} className="scroll-mt-24">
      <div className="mb-5">
        <h2 className="text-xl font-black uppercase tracking-widest text-[#49A3DA]">
          {location.name}
        </h2>
        {location.subtitle && (
          <p className="text-sm text-slate-500 mt-0.5">{location.subtitle}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {location.cards.map((card, i) => (
          <FeedbackCardItem key={i} card={card} />
        ))}
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="relative w-full min-h-[240px] bg-[#002147] flex flex-col items-center justify-center py-16 px-4 text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            We Value Your Feedback
          </h1>
          <p className="text-white/85 text-base md:text-lg leading-relaxed">
            We want to make it easy for our patients to leave us feedback so
            that we can continue to improve our services. Choose the location
            below and the appropriate form to leave us your feedback. We do not
            ask you for your name and all submissions are anonymous.
          </p>
        </div>
      </div>

      {/* Choose Location */}
      <div className="bg-[#3a5f8a] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white font-black uppercase tracking-widest text-sm mb-6">
            Choose Location
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEEDBACK_DATA.map((county) => (
              <div key={county.county}>
                <p className="text-white font-bold text-[15px] mb-2">
                  {county.county}
                </p>
                <ul className="space-y-1">
                  {county.locations.map((loc) => (
                    <li key={loc.id}>
                      <a
                        href={`#${loc.id}`}
                        className="text-white/75 hover:text-white text-sm transition-colors"
                      >
                        {loc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-xs mt-6 text-right">
            All submissions are anonymous.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <nav className="flex items-center text-sm text-slate-500 gap-1">
          <Link href="/" className="hover:text-[#002147] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Feedback</span>
        </nav>
      </div>

      {/* Location Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-14">
        {FEEDBACK_DATA.map((county) =>
          county.locations.map((location) => (
            <LocationSection key={location.id} location={location} />
          ))
        )}
      </div>
    </div>
  );
}
