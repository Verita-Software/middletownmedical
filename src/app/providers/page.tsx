import type { Metadata } from "next";
import { ProvidersPageClient } from "@/components/providers/ProvidersPageClient";

export const metadata: Metadata = {
  title: "Find a Provider",
  description:
    "Search Middletown Medical's trusted primary care and specialty providers across the Hudson Valley. Filter by specialty, location, language, and more.",
  alternates: { canonical: "https://middletownmedical.com/providers" },
  openGraph: {
    url: "https://middletownmedical.com/providers",
    title: "Find a Provider | Middletown Medical",
    description:
      "Browse primary care and specialty providers across the Hudson Valley. Filter by specialty, location, and language.",
  },
};

export default function ProvidersPage() {
  return <ProvidersPageClient />;
}
