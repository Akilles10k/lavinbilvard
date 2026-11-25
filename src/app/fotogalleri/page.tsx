import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fotogalleri",
  description:
    "Bilder från Lavin Bilvård & Service i Ängelholm. Se rekonditionerade bilar, husbil, tvätthall och verkstaden på Lagegatan 11.",
  path: "/fotogalleri",
});

export default function GalleryPage() {
  return (
    <main className="contact">
      <div className="contact-wrap">
        <header className="contact-page-head">
          <p className="contact-page-eyebrow">Vår bilvård i bilder</p>
          <h1 className="contact-page-title">Fotogalleri</h1>
          <p className="contact-page-lead">
            Galleriet visar arbetet från verkstaden i Ängelholm. Här finns bilar som fått ny glans,
            en husbil, tvätthallen och fasaden på Lagegatan 11.
          </p>
        </header>
        <GalleryGrid />
      </div>
    </main>
  );
}
