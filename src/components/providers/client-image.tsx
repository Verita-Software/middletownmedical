"use client";

import Image from "next/image";
import { useState } from "react";

export function ClientImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const isFallback = imgSrc.includes("ui-avatars.com");

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      fill
      unoptimized={isFallback}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => {
        setImgSrc(
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(alt) +
            "&background=e2e8f0&color=475569",
        );
      }}
    />
  );
}
