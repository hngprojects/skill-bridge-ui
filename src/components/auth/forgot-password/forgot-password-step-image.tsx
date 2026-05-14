"use client";

import Image from "next/image";

type ForgotPasswordStepImageProps = {
  src: string;
  alt: string;
};

function ForgotPasswordStepImage({ src, alt }: ForgotPasswordStepImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={72}
      height={85}
      priority
      className="mb-8 h-[92px] w-auto object-contain"
    />
  );
}

export { ForgotPasswordStepImage };
