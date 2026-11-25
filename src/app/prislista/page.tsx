import type { Metadata } from "next";
import ServicesPageContent from "@/components/ServicesPageContent";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata, getServicesItemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Prislista",
  description:
    "Priser för biltvätt, rekond, polering, lackskydd, lastbil, båt och husbil hos Lavin Bilvård & Service i Ängelholm.",
  path: "/prislista",
});

export default function PricePage() {
  return (
    <>
      <JsonLd data={getServicesItemListJsonLd()} />
      <ServicesPageContent />
    </>
  );
}
