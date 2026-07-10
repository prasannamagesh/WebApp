import Image from 'next/image';

export function DermFixLogo() {
  return (
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-5Q9P2GzQMQin7pXDjGDrd3mfTj16kn.png"
      alt="DERMFIX - Preventive Skin Science"
      width={160}
      height={40}
      className="h-8 sm:h-9 lg:h-10 w-auto"
      priority
    />
  );
}
