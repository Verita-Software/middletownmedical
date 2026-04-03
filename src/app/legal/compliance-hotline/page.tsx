import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/seo-constants";

export const metadata: Metadata = {
  title: "Compliance Hotline",
  description: `Report compliance concerns to ${SITE_NAME}.`,
};

export default function ComplianceHotlinePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
      <h1 className="text-3xl font-bold text-[#002147] mb-6">Compliance Hotline</h1>
      <div className="prose prose-slate max-w-none space-y-4 text-slate-700">
        <p>
          {SITE_NAME} is committed to ethical conduct and compliance with
          applicable laws and policies. If you have a compliance-related concern,
          please contact us so we can review and respond appropriately.
        </p>
        <p className="font-semibold text-[#002147]">
          Main line:{" "}
          <a href="tel:+18453424774" className="text-[#49A3DA] hover:underline">
            (845) 342-4774
          </a>
        </p>
        <p>
          For urgent medical issues, call 911 or go to the nearest emergency
          department. This line is not for medical emergencies.
        </p>
      </div>
      <p className="mt-10">
        <Link href="/" className="text-[#49A3DA] font-semibold hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
