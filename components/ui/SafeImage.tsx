"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface SafeImageProps extends ImageProps {
  fallback?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  fallback = "/placeholder.jpg", 
  ...props 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
  }, [src]);

  return (
    <Image
      {...props}
      src={isError ? fallback : imgSrc}
      alt={alt}
      onError={() => {
        if (!isError) {
          setIsError(true);
        }
      }}
    />
  );
}
