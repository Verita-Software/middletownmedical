import Image from "next/image";
import Link from "next/link";

export interface MyChartSectionProps {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}

export function MyChartSection({
  imageSrc,
  imageAlt,
  heading,
  body,
  buttonLabel,
  buttonHref,
}: MyChartSectionProps) {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 lg:pb-24 ">
        <div className="grid grid-cols-1 gap-8 rounded-s rounded-tl-3xl rounded-br-3xl border border-slate-200/80 bg-gray-200/70 shadow-sm overflow-hidden lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-4/3 min-h-[260px] lg:aspect-auto lg:min-h-[320px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-10 lg:px-12 lg:py-14">
            <h2 className="text-2xl font-bold text-primary md:text-3xl lg:text-[2rem] leading-tight mb-4">
              {heading}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8 max-w-xl">
              {body}
            </p>
            <Link
              href={buttonHref}
              className="inline-flex w-fit items-center rounded-lg border-2 border-primary bg-white px-6 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
