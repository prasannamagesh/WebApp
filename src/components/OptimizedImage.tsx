import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  objectPosition?: string;
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 400,
  fill = false,
  className = '',
  priority = false,
  quality = 85,
  sizes,
  objectFit = 'cover',
  objectPosition = 'center',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <div className="text-center text-gray-400 text-sm">
          <div className="text-2xl mb-1">⚠</div>
          <div>Image unavailable</div>
        </div>
      </div>
    );
  }

  const imageProps = fill
    ? {
        fill: true as const,
        sizes,
      }
    : {
        width,
        height,
      };

  return (
    <div className={`relative overflow-hidden ${className}`} style={fill ? { width: '100%', height: '100%' } : {}}>
      <Image
        {...imageProps}
        src={src}
        alt={alt}
        priority={priority}
        quality={quality}
        className={`${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
        style={{
          objectFit,
          objectPosition,
        }}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          console.error(`[v0] Image failed to load: ${src}`);
          setIsLoading(false);
          setHasError(true);
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
    </div>
  );
}
