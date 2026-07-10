import Image from 'next/image';

export function DermFixLogo() {
  return (
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-removebg-preview-LITywTYURIyGfG3WL9XD9uMDGephm8.png"
      alt="DERMFIX - Preventive Skin Science"
      width={220}
      height={60}
      className="h-8 sm:h-9 lg:h-10 w-auto transition-opacity duration-200"
      priority
      quality={100}
      loading="eager"
      unoptimized={false}
    />
  );
}
