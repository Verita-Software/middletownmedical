"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type StaffMember = {
  URL: string;
  Name: string;
  Specialties?: string[];
  Locations?: string[];
  profile_url?: string;
  country?: string;
};

type Props = {
  serviceTitle: string;
  providers: StaffMember[];
};

function getInitials(name: string): string {
  const parts = name
    .split(" ")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return "MM";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "M";
  const first = parts[0][0]?.toUpperCase() ?? "M";
  const last = parts[parts.length - 1][0]?.toUpperCase() ?? "M";
  return `${first}${last}`;
}

function ProviderAvatar({ provider }: { provider: StaffMember }) {
  const [failed, setFailed] = useState(!provider.profile_url);
  const initials = getInitials(provider.Name);

  if (failed) {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#002147] text-sm font-bold text-white">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100">
      <Image
        src={provider.profile_url as string}
        alt={provider.Name}
        fill
        className="object-cover"
        sizes="80px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function ServiceProvidersSection({ serviceTitle, providers }: Props) {
  if (!providers || providers.length === 0) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-10">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#002147] md:text-3xl">
            Providers for {serviceTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            These Middletown Medical providers offer this service or related
            care. You can view their full profiles and locations, then schedule
            with the provider that works best for you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {providers.map((p, idx) => {
          const primarySpecialty = p.Specialties?.[0];
          const primaryLocation = p.Locations?.[0];
          const profileSlug = p.URL?.split("/").pop() ?? `provider-${idx}`;
          return (
            <article
              key={`${p.URL}-${idx}`}
              className="flex gap-4 rounded-tl-4xl rounded-br-4xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <ProviderAvatar provider={p} />
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-slate-900">
                  {p.Name}
                </h3>
                {primarySpecialty && (
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {primarySpecialty}
                  </p>
                )}
                {primaryLocation && (
                  <p className="mt-1 text-xs text-slate-600">
                    {primaryLocation}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link
                    href={`/providers/${encodeURIComponent(profileSlug)}`}
                    className="inline-flex items-center justify-center rounded-sm rounded-tl-2xl rounded-br-2xl border border-slate-300 bg-primary px-4 py-1.5 text-xs font-semibold text-accent-foreground
                     transition-colors hover:border-primary hover:bg-primary/90"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
