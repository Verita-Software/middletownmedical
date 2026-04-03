import type { Metadata } from "next";
import Link from "next/link";
import { MAIN_PHONE_DISPLAY } from "@/lib/seo-constants";
import { FINDHELP_SEARCH_URL } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Middletown Medical for appointments, billing, and general questions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
      <h1 className="text-3xl font-bold text-[#002147] mb-2">Contact Us</h1>
      <p className="text-slate-600 mb-8">
        We&apos;re here to help with scheduling, billing questions, and care
        navigation.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
            Main phone
          </h2>
          <a
            href="tel:+18453424774"
            className="text-2xl font-bold text-[#002147] hover:text-[#49A3DA]"
          >
            {MAIN_PHONE_DISPLAY}
          </a>
          <p className="text-sm text-slate-500 mt-1">Mon–Fri, 8am–6pm</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
            Billing
          </h2>
          <p className="text-slate-700">
            Billing customer service uses the same main number, or visit{" "}
            <Link
              href="/resource/billing-insurance"
              className="text-[#49A3DA] font-semibold hover:underline"
            >
              Billing &amp; Insurance
            </Link>
            .
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
            Community resources
          </h2>
          <a
            href={FINDHELP_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#49A3DA] font-semibold hover:underline"
          >
            FindHelp.org — search local resources
          </a>
        </div>
      </div>
      <p className="mt-8">
        <Link href="/" className="text-[#49A3DA] font-semibold hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
