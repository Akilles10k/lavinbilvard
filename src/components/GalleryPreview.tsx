import Image from "next/image";
import Link from "next/link";
import { GALLERY } from "@/data/site";

export default function GalleryPreview() {
  return (
    <section className="gallery-preview" aria-label="Bilder från verkstaden">
      {GALLERY.slice(0, 4).map((image) => (
        <Link key={image.src} href="/fotogalleri">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 800px) 25vw, 50vw"
          />
        </Link>
      ))}
    </section>
  );
}
