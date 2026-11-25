import type { Metadata } from "next";
import { SERVICES, SITE } from "@/data/site";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://lavinbilvard.netlify.app";

export const SEO_KEYWORDS = [
  "bilvård Ängelholm",
  "biltvätt Ängelholm",
  "rekond Ängelholm",
  "polering bil Ängelholm",
  "lackskydd Ängelholm",
  "lastbilstvätt Ängelholm",
  "båttvätt Ängelholm",
  "husbiltvätt",
  "mattvätt",
  "Lavin Bilvård",
] as const;

export const DEFAULT_TITLE =
  "Lavin Bilvård & Service i Ängelholm | Rekond, tvätt och polering";

export const DEFAULT_DESCRIPTION =
  "Lavin Bilvård & Service i Ängelholm rekonditionerar, tvättar och polerar bilar, lastbilar, båtar och husbilar. Boka tid på Lagegatan 11.";

type PageMetaOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetaOptions): Metadata {
  const url = absoluteUrl(path);
  const allKeywords = [...new Set([...SEO_KEYWORDS, ...keywords])];

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "sv_SE",
      url,
      siteName: SITE.name,
      title: `${title} | ${SITE.name}`,
      description,
      images: [
        {
          url: absoluteUrl("/galleri/jeep.jpg"),
          width: 1920,
          height: 1440,
          alt: "Lavin Bilvård & Service i Ängelholm",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [absoluteUrl("/galleri/jeep.jpg")],
    },
  };
}

export const FAQ_ITEMS = [
  {
    question: "Vad kostar biltvätt hos Lavin Bilvård?",
    answer:
      "Utvändig biltvätt börjar från 200 kr och invändig tvätt från 300 kr. Grundläggande rekond börjar från 400 kr. Hela prislistan finns under Priser.",
  },
  {
    question: "Vad ingår i en rekond?",
    answer:
      "En grundläggande rekond är en rengöring och upprustning av bilens interiör och exteriör. Proffsrekond är en noggrannare behandling som återställer bilens utseende. Vi anpassar arbetet efter bilens skick.",
  },
  {
    question: "Tvättar ni lastbilar, båtar och husbilar?",
    answer:
      "Ja. Lastbilstvätt börjar från 999 kr, båttvätt från 699 kr och husbil från 599 kr. Vi polerar även båtar och är specialister på husbilar.",
  },
  {
    question: "Tvättar ni mattor?",
    answer:
      "Ja. Vi tvättar mattor både från hemmet och från bilen, från 199 kr. Mattvätt är ett av våra specialistområden.",
  },
  {
    question: "Hur bokar jag tid?",
    answer: `Välj tjänster under Priser, lägg dem i kundvagnen och skicka en bokningsförfrågan. Du kan också ringa ${SITE.phone} eller ${SITE.phoneSecondary}, eller mejla ${SITE.email}. Vi bekräftar tiden innan den är låst.`,
  },
  {
    question: "Var ligger ni?",
    answer: `Vi finns på ${SITE.address.full}. Välkommen in med bil, lastbil, båt eller husbil.`,
  },
  {
    question: "Vilka öppettider har ni?",
    answer:
      "Måndag till fredag 09–18 och lördag 10–17. Söndagar har vi stängt. Boka gärna tid i förväg.",
  },
] as const;

function toSchemaTime(value: string) {
  const trimmed = value.trim();
  return trimmed.includes(":") ? trimmed : `${trimmed}:00`;
}

function parseHourRange(hours: string) {
  const [opens, closes] = hours.split("–").map((part) => toSchemaTime(part));
  return { opens, closes };
}

export function getOpeningHoursSpecification() {
  const weekday = parseHourRange(SITE.openingHours[0].hours);
  const saturday = parseHourRange(SITE.openingHours[1].hours);

  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: weekday.opens,
      closes: weekday.closes,
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: saturday.opens,
      closes: saturday.closes,
    },
  ];
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    email: SITE.email,
    telephone: [SITE.phone, SITE.phoneSecondary],
    description: DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: "SE",
    },
  };
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE.name,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl("/galleri/jeep.jpg"),
    telephone: [SITE.phone, SITE.phoneSecondary],
    email: SITE.email,
    priceRange: "$$",
    currenciesAccepted: "SEK",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: getOpeningHoursSpecification(),
    areaServed: {
      "@type": "City",
      name: SITE.city,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bilvård och rekond",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name },
      })),
    },
    sameAs: [SITE.address.mapsHref],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "sv-SE",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getServicesItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Prislista – Lavin Bilvård & Service",
    description: "Tjänster och priser för tvätt, rekond, polering och lackskydd i Ängelholm.",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: { "@id": `${SITE_URL}/#localbusiness` },
        areaServed: SITE.city,
      },
    })),
  };
}

export const GLOBAL_JSON_LD = [
  getOrganizationJsonLd(),
  getLocalBusinessJsonLd(),
  getWebsiteJsonLd(),
];
