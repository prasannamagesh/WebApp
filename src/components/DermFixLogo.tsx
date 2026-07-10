import Image from 'next/image';

export function DermFixLogo() {
  return (
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-CKjN7oDrpddL3yuyEan0OaWGv7cOOi.png"
      alt="DERMFIX - Preventive Skin Science"
      width={200}
      height={50}
      className="h-8 sm:h-9 lg:h-10 w-auto"
      priority
      quality={100}
      loading="eager"
      unoptimized={false}
    />
  );
}
