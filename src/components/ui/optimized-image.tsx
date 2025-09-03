import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import placeholderSvg from '@/assets/placeholder.svg';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  lazy?: boolean;
}

export const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  className, 
  fallback = placeholderSvg,
  lazy = true,
  ...props 
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(lazy ? fallback : src);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!lazy || !imageRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(imageRef);
    return () => observer.disconnect();
  }, [imageRef, src, lazy]);

  const handleLoad = () => {
    setHasLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setImageSrc(fallback);
  };

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={cn(
        'transition-opacity duration-300',
        hasLoaded ? 'opacity-100' : 'opacity-70',
        hasError && 'opacity-50',
        className
      )}
      onLoad={handleLoad}
      onError={handleError}
      loading={lazy ? 'lazy' : 'eager'}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';