"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/mock-data";
import { ClientImage } from "@/components/providers/client-image";
import { Star, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function getInitials(name: string) {
  if (!name) return "";
  const cleanName = name.replace(
    /,\s*(M\.?D\.?|D\.?O\.?|P\.?A\.?-?C|F\.?N\.?P\.?|M\.?S\.?N\.?|F\.?N\.?P\.?-?B\.?C\.?|C\.?D\.?N\.?)\b/gi,
    "",
  );
  const parts = cleanName.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0][0] || "";
    const last = parts[parts.length - 1][0] || "";
    return (first + last).toUpperCase().replace(/[^A-Z]/g, "");
  }
  return name
    .substring(0, 2)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

interface ProviderCardProps {
  provider: Provider;
  variant?: "grid" | "list" | "compact";
  index?: number;
}

export function ProviderCard({
  provider,
  variant = "grid",
  index = 0,
}: ProviderCardProps) {
  const rating = 4.9;
  const specialties = provider.Specialties || [];
  const locations = provider.Locations || [];
  const router = useRouter();

  if (variant === "list") {
    return <ProviderListCard provider={provider} />;
  }

  if (variant === "compact") {
    return <ProviderCompactCard provider={provider} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden"
    >
      {/* Title */}
      <Link
        href={`/providers/${provider.id}`}
        className="text-[22px] font-bold text-primary hover:text-primary/90 transition-colors leading-snug mb-5 underline-offset-4 hover:underline z-10 block"
      >
        {provider.Name}
      </Link>

      <div className="flex gap-4 sm:gap-6 flex-1 z-10 w-full">
        {/* Image */}
        <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-xl overflow-hidden shrink-0 border border-slate-200/60 shadow-inner group-hover:shadow-md transition-shadow duration-300">
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200">
            {provider.profile_url ? (
              <ClientImage
                src={provider.profile_url}
                alt={provider.Name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <span className="text-[36px] font-semibold text-slate-500/70 tracking-tight font-sans">
                {getInitials(provider.Name)}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 min-w-0">
          {specialties.length > 0 && (
            <div className="text-[14px] sm:text-[16px] font-bold text-slate-900 mb-1.5 leading-snug wrap-break-word">
              {specialties.length > 2
                ? `${specialties[0]}, ${specialties[1]} (+${specialties.length - 2})`
                : specialties.join(", ")}
            </div>
          )}

          <div className="flex items-center gap-2 mb-2 font-serif">
            <span className="text-[15px] font-bold text-slate-900">
              {rating}
            </span>
            <div className="flex text-amber-400 gap-0.5 mt-[-2px]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-[15px] h-[15px] fill-current" />
              ))}
            </div>
          </div>

          {locations.length > 0 && (
            <div className="text-[13px] sm:text-[14px] text-slate-500 line-clamp-3 lg:line-clamp-2 leading-relaxed mt-1 pr-2">
              {locations[0]}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6 pt-5 border-t border-slate-100 z-10">
        <Button
          variant="outline"
          onClick={() => router.push(`/providers/${provider.id}`)}
          className="group/btn border-2 cursor-pointer border-primary text-primary hover:bg-primary hover:text-white font-bold text-[15px] h-[46px] px-8 rounded flex items-center justify-center transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            View Details
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
        </Button>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-bl-full mix-blend-multiply" />
    </motion.div>
  );
}

function ProviderListCard({ provider }: { provider: Provider }) {
  const rating = 4.9;
  const specialties = provider.Specialties || [];
  const locations = provider.Locations || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col sm:flex-row gap-6 rounded-[16px] border border-slate-200/80 bg-white p-6 md:p-7 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden items-start sm:items-center"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1 min-w-0 z-10 w-full items-center sm:items-start text-center sm:text-left">
        {/* Image */}
        <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-xl overflow-hidden shrink-0 border border-slate-200/60 shadow-inner group-hover:shadow-md transition-shadow duration-300">
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200">
            {provider.profile_url ? (
              <ClientImage
                src={provider.profile_url}
                alt={provider.Name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <span className="text-[36px] font-semibold text-slate-500/70 tracking-tight font-sans">
                {getInitials(provider.Name)}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 min-w-0 py-1 w-full text-center sm:text-left items-center sm:items-start">
          <Link
            href={`/providers/${provider.id}`}
            className="text-[20px] sm:text-[22px] font-bold text-primary hover:text-primary/90 transition-colors leading-snug mb-2 underline-offset-4 hover:underline truncate w-full"
          >
            {provider.Name}
          </Link>

          {specialties.length > 0 && (
            <div className="text-[14px] sm:text-[16px] font-bold text-slate-900 mb-1.5 leading-snug truncate w-full">
              {specialties.length > 2
                ? `${specialties[0]}, ${specialties[1]}`
                : specialties.join(", ")}
            </div>
          )}

          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 font-serif w-full">
            <span className="text-[15px] font-bold text-slate-900">
              {rating}
            </span>
            <div className="flex text-amber-400 gap-0.5 mt-[-2px]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-[15px] h-[15px] fill-current" />
              ))}
            </div>
          </div>

          {locations.length > 0 && (
            <div className="text-[13px] sm:text-[14px] text-slate-500 line-clamp-2 leading-relaxed mt-1 pr-2">
              {locations[0]}
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0 pt-5 sm:pt-0 border-t sm:border-0 border-slate-100 z-10 pl-0 sm:pl-4">
        <Button
          variant="outline"
          className="group/btn w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-[14px] sm:text-[15px] h-[40px] sm:h-[46px] px-6 sm:px-8 rounded flex items-center justify-center transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            View Details
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
        </Button>
      </div>

      <div className="absolute top-0 bottom-0 right-0 w-64 bg-linear-to-l from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-multiply" />
    </motion.div>
  );
}

function ProviderCompactCard({ provider }: { provider: Provider }) {
  const rating = 4.9;
  const title = "Provider";

  return (
    <Link
      href={`/providers/${provider.id}`}
      className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
    >
      <div className="relative h-14 w-14 rounded-full overflow-hidden shrink-0 border border-slate-100 group-hover:shadow-sm transition-shadow">
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200">
          {provider.profile_url ? (
            <ClientImage
              src={provider.profile_url}
              alt={provider.Name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="text-[18px] font-semibold text-slate-500/70 tracking-tight font-sans">
              {getInitials(provider.Name)}
            </span>
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
          {provider.Name}
        </p>
        <p className="text-[13px] text-slate-500 truncate">{title}</p>
        <div className="flex items-center gap-1 mt-0.5 font-serif">
          <Star className="h-[10px] w-[10px] fill-amber-400 text-amber-400 -mt-px" />
          <span className="text-[11px] font-bold text-slate-700">{rating}</span>
        </div>
      </div>
    </Link>
  );
}
