"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GALLERY } from "@/data/site";

export default function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => (value === null ? value : (value + 1) % GALLERY.length));
      if (event.key === "ArrowLeft") {
        setActive((value) => (value === null ? value : (value - 1 + GALLERY.length) % GALLERY.length));
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const image = active === null ? null : GALLERY[active];

  return (
    <>
      <div className="gallery-grid">
        {GALLERY.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="gallery-card"
            onClick={() => setActive(index)}
          >
            <Image src={item.src} alt={item.alt} width={item.width} height={item.height} />
          </button>
        ))}
      </div>

      {image && active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.alt} onClick={() => setActive(null)}>
          <button type="button" className="lightbox-close" onClick={() => setActive(null)} aria-label="Stäng">
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-nav--prev"
            aria-label="Föregående bild"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active - 1 + GALLERY.length) % GALLERY.length);
            }}
          >
            ‹
          </button>
          <img src={image.src} alt={image.alt} onClick={(event) => event.stopPropagation()} />
          <button
            type="button"
            className="lightbox-nav lightbox-nav--next"
            aria-label="Nästa bild"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active + 1) % GALLERY.length);
            }}
          >
            ›
          </button>
          <p className="lightbox-caption">{image.alt}</p>
        </div>
      )}
    </>
  );
}
