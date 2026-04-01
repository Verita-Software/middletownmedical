import Image from "next/image";
import { URGENT_CARE_IMAGES } from "@/lib/urgent-care-assets";

interface UrgentCareHeroProps {
  /** e.g. "Middletown" — shown large in overlay */
  title: string;
  /** Secondary line under title */
  eyebrow?: string;
  /** Override default supporting sentence */
  description?: string;
}

const DEFAULT_DESC =
  "Average wait of 30 minutes or less for many walk-in visits. No appointment necessary — we treat minor illnesses and injuries when you need care today.";

/**
 * Full-width hero using legacy MM locations band imagery (Duly-style overlay copy).
 */
export function UrgentCareHero({
  title,
  eyebrow = "Urgent care",
  description = DEFAULT_DESC,
}: UrgentCareHeroProps) {
  return (
    <div className="relative min-h-[260px] w-full overflow-hidden md:min-h-[300px]">
      <Image
        src={URGENT_CARE_IMAGES.heroBackground}
        alt=""
        fill
        priority
        className="object-cover object-[center_30%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/20"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[260px] max-w-screen-2xl flex-col justify-end px-4 py-10 md:min-h-[300px] md:px-8 md:py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
          Middletown Medical
        </p>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-lg font-semibold uppercase tracking-wide text-[#f472b6] md:text-xl">
          {eyebrow}
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/95 md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
