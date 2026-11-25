import type { Metadata } from "next";
import Link from "next/link";
import WhySection from "@/components/WhySection";
import StatsSection from "@/components/StatsSection";
import HomeSeoSection from "@/components/HomeSeoSection";
import Showcase from "@/components/Showcase";
import GalleryPreview from "@/components/GalleryPreview";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Bilvård & service i Ängelholm",
  description:
    "Ge ditt fordon en ny glans med Lavin Bilvård & Service i Ängelholm. Rekond, tvätt och polering av bilar, lastbilar, båtar, husbilar och mattor.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <JsonLd data={[getFaqJsonLd(), getBreadcrumbJsonLd([{ name: "Hem", path: "/" }])]} />
      <section className="hero" aria-label="Lavin Bilvård & Service i Ängelholm">
        <svg className="hero-watermark" viewBox="0 -80 1400 360" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <text
            className="hero-watermark-text"
            x="700"
            y="200"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="150"
            fontWeight="700"
            fontFamily="IBM Plex Sans, sans-serif"
          >
            LAVIN BILVÅRD
          </text>
        </svg>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-main">Bilvård</span>
            <span className="hero-title-accent">& Service</span>
          </h1>
          <p className="hero-subtitle">
            Rekond, tvätt och polering i Ängelholm. Bilar, lastbilar, båtar och husbilar.
          </p>
          <div className="hero-actions">
            <Link href="/prislista" className="hero-btn hero-btn--secondary">
              Boka tid
            </Link>
            <Link href="/prislista" className="hero-btn">
              Priser
            </Link>
          </div>
        </div>
      </section>
      <WhySection />
      <Showcase />
      <StatsSection />
      <GalleryPreview />
      <HomeSeoSection />
    </main>
  );
}
