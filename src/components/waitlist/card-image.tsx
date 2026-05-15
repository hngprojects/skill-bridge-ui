import Image from "next/image";

const CardImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={520}
      height={400}
      className="mt-5 aspect-4/3 w-full object-contain"
    />
  );
};

export default CardImage;
