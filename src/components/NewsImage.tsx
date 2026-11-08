'use client';

import React, { useState } from 'react';
import { CategorySlug } from '@/types';
import { getCategoryFallbackImage } from '@/data/category-images';

interface NewsImageProps {
  src?: string | null;
  alt?: string;
  category?: CategorySlug;
  fallbackSeed?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export default function NewsImage({
  src,
  alt = 'The American Beacon News',
  category = 'breaking-news',
  fallbackSeed = '',
  className = '',
  priority = false,
}: NewsImageProps) {
  const fallback = getCategoryFallbackImage(category, fallbackSeed || alt);
  
  // If src is invalid or empty, use fallback directly
  const initialSrc = src && src.startsWith('http') && !src.includes('pixel') && !src.includes('undefined')
    ? src
    : fallback.url;

  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback.url);
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`w-full h-full object-cover block transition duration-300 ${className}`}
      style={{ minHeight: '100%', minWidth: '100%' }}
    />
  );
}
