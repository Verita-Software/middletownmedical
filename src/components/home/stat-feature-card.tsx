import Image from "next/image";
import Link from "next/link";

export interface StatFeatureCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export function StatFeatureCard({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonLabel,
  buttonHref,
}: StatFeatureCardProps) {
  return (
    <article className="flex flex-col  rounded-s rounded-tl-3xl rounded-br-3xl  border border-slate-200/80 bg-gray-200/70 p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl mb-6">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-slate-600 text-[15px] leading-relaxed flex-1 mb-6">
        {description}
      </p>
      <Link
        href={buttonHref}
        className="inline-flex w-fit items-center rounded-lg border-2 border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
      >
        {buttonLabel}
      </Link>
    </article>
  );
}
