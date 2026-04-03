import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-constants";
import { getResourceSlugs } from "@/lib/api/resources";
import { getLocationSlugs } from "@/lib/locations";
import { getUrgentCareSlugs } from "@/lib/urgent-care-locations";
import { MOCK_PROVIDERS } from "@/lib/mock-data";
import { SERVICES_CONTENT } from "@/lib/services-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/providers`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/locations`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/urgent-care`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/feedback`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/legal/terms-of-use`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/compliance-hotline`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/resource/patient-forms/pediatric-forms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/resource/patient-forms/feedback`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(SERVICES_CONTENT).map(
    (slug) => ({
      url: `${SITE_URL}/services/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  const resourceRoutes: MetadataRoute.Sitemap = getResourceSlugs().map((slug) => ({
    url: `${SITE_URL}/resource/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const locationRoutes: MetadataRoute.Sitemap = getLocationSlugs().map((slug) => ({
    url: `${SITE_URL}/location/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const urgentCareRoutes: MetadataRoute.Sitemap = getUrgentCareSlugs().map((slug) => ({
    url: `${SITE_URL}/urgent-care/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const providerRoutes: MetadataRoute.Sitemap = MOCK_PROVIDERS.map((provider) => ({
    url: `${SITE_URL}/providers/${provider.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...resourceRoutes,
    ...locationRoutes,
    ...urgentCareRoutes,
    ...providerRoutes,
  ];
}
