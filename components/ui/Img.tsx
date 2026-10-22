import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type ImgProps = Omit<ImageProps, "src" | "alt"> & {
  /** Unsplash photo id, e.g. "1593351799227-75df2026356b". */
  id: string;
  alt: string;
};

export function Img({ id, alt, className, ...rest }: ImgProps) {
  return <Image src={`photo-${id}`} alt={alt} className={cn("object-cover", className)} {...rest} />;
}
