import Image from "next/image";
import Link from "next/link";

export interface FeatureSectionTwoColumnProps {
  /** When true, image is on the left; when false, image is on the right. */
  imageLeft: boolean;
  imageSrc: string;
  imageAlt: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
  /** Optional badge text over image (e.g. "BRIAN MORAN CANCER INSTITUTE") */
  badge?: string;
}

export function FeatureSectionTwoColumn({
  imageLeft,
  imageSrc,
  imageAlt,
  heading,
  body,
  buttonLabel,
  buttonHref,
  badge,
}: FeatureSectionTwoColumnProps) {
  const imageBlock = (
    <div className="relative aspect-4/3 min-h-[240px] overflow-hidden rounded-2xl ">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {badge && (
        <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-primary/90 px-4 py-2 text-center text-sm font-bold uppercase tracking-wider text-white">
          {badge}
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center px-6 py-10 lg:px-12 lg:py-14">
      <h2 className="text-2xl font-bold text-primary md:text-3xl lg:text-[2rem] leading-tight mb-4">
        {heading}
      </h2>
      <p className="text-slate-600 leading-relaxed mb-8 max-w-xl">{body}</p>
      <Link
        href={buttonHref}
        className="inline-flex w-fit items-center rounded-lg border-2 border-primary bg-white px-6 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
      >
        {buttonLabel}
      </Link>
    </div>
  );

  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-8 bg-gray-200/70 my-6 rounded-s rounded-tl-4xl rounded-br-3xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className={!imageLeft ? "lg:order-2" : ""}>{imageBlock}</div>
          <div className={!imageLeft ? "lg:order-1" : ""}>{textBlock}</div>
        </div>
      </div>
    </section>
  );
}
