import Image from 'next/image';

interface DermFixLogoProps {
  transparent?: boolean;
}

export function DermFixLogo({ transparent = false }: DermFixLogoProps) {
  const logoSrc = transparent
    ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-CKjN7oDrpddL3yuyEan0OaWGv7cOOi.png'
    : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-CKjN7oDrpddL3yuyEan0OaWGv7cOOi.png';

  return (
    <Image
      src={logoSrc}
      alt="DERMFIX - Preventive Skin Science"
      width={200}
      height={50}
      className={`h-8 sm:h-9 lg:h-10 w-auto ${transparent ? 'opacity-80 hover:opacity-100' : ''} transition-opacity duration-200`}
      priority
      quality={100}
      loading="eager"
      unoptimized={false}
    />
  );
}
