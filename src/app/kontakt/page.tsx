import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kontakt",
  description:
    "Kontakta Lavin Bilvård & Service på Lagegatan 11 i Ängelholm. Telefon 073-622 49 57 och 073-968 49 62. E-post Lavinbilvard@gmail.com.",
  path: "/kontakt",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
