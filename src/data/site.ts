export const SITE = {
  name: "Lavin Bilvård & Service",
  shortName: "Lavin Bilvård",
  tagline: "Rekond, tvätt och polering",
  city: "Ängelholm",
  phone: "073-622 49 57",
  phoneHref: "tel:+46736224957",
  phoneSecondary: "073-968 49 62",
  phoneSecondaryHref: "tel:+46739684962",
  email: "Lavinbilvard@gmail.com",
  videoId: "OAmVEytm_so",
  address: {
    street: "Lagegatan 11",
    postalCode: "262 71",
    city: "Ängelholm",
    full: "Lagegatan 11, 262 71 Ängelholm",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Lagegatan+11%2C+262+71+%C3%84ngelholm",
    mapsEmbedHref:
      "https://maps.google.com/maps?q=Lagegatan+11%2C+262+71+%C3%84ngelholm&hl=sv&z=16&output=embed",
  },
  openingHours: [
    { days: "Mån – Fre", hours: "09 – 18" },
    { days: "Lördag", hours: "10 – 17" },
  ],
  geo: {
    latitude: 56.24991,
    longitude: 12.88793,
  },
} as const;

export type ServiceCategory = "tvatt" | "rekond" | "fordon";

export type Service = {
  id: number;
  name: string;
  price: string;
  description: string;
  category: ServiceCategory;
};

export const SERVICES: Service[] = [
  {
    id: 1,
    name: "Biltvätt (exteriör)",
    price: "från 200 kr",
    description:
      "Utvändig tvätt av hela bilen, från fälgar och hjulhus till lack och rutor. Smuts, vägsalt, asfalt och andra föroreningar tas bort för att skydda lacken mot rost och slitage.",
    category: "tvatt",
  },
  {
    id: 2,
    name: "Biltvätt (interiör)",
    price: "från 300 kr",
    description:
      "Kupén får samma omsorg som utsidan. Vi rengör ytorna, dammsuger noggrant och ser till att bilen känns fräsch, ren och trivsam.",
    category: "tvatt",
  },
  {
    id: 3,
    name: "Rekond av bil (grundläggande)",
    price: "från 400 kr",
    description:
      "Grundläggande rengöring och upprustning av interiör och exteriör, så att bilen känns fräsch igen.",
    category: "rekond",
  },
  {
    id: 4,
    name: "Rekond av bil (proffs)",
    price: "från 2 000 kr",
    description:
      "Professionell rekond som återställer bilens utseende. En noggrann behandling för den som vill att bilen ska se ut som ny igen.",
    category: "rekond",
  },
  {
    id: 5,
    name: "Polering av bil",
    price: "från 1 500 kr",
    description:
      "Polering ger lacken en glänsande och skyddande yta. Det är vår specialitet när fordonet ska få en skinande finish.",
    category: "rekond",
  },
  {
    id: 6,
    name: "Lackskydd",
    price: "från 4 000 kr",
    description:
      "Lackskydd bevarar bilens yttre och hjälper den att fortsätta se ny och glänsande ut.",
    category: "rekond",
  },
  {
    id: 7,
    name: "Lastbilstvätt",
    price: "från 999 kr",
    description:
      "Tvätt av lastbil så att den hålls ren och välskött. Hör av dig om du har ett större ekipage, så tar vi fram rätt upplägg.",
    category: "fordon",
  },
  {
    id: 8,
    name: "Båttvätt",
    price: "från 699 kr",
    description:
      "Båttvätt håller båten ren och skyddar mot skador och korrosion från väder och saltvatten.",
    category: "fordon",
  },
  {
    id: 9,
    name: "Husbil",
    price: "från 599 kr",
    description:
      "Tvätt av husbil. Vi är specialister och har utbildning för husbilar.",
    category: "fordon",
  },
];

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  tvatt: "Biltvätt",
  rekond: "Rekond & lackskydd",
  fordon: "Lastbil, båt & husbil",
};

export const CATEGORY_ORDER: ServiceCategory[] = ["tvatt", "rekond", "fordon"];

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const GALLERY: GalleryImage[] = [
  {
    src: "/galleri/jeep.jpg",
    alt: "Mörkgrå Jeep Grand Cherokee efter tvätt utanför anläggningen i Ängelholm",
    width: 1920,
    height: 1440,
  },
  {
    src: "/galleri/porsche.jpg",
    alt: "Beige Porsche Macan i tvätthallen hos Lavin Bilvård",
    width: 1920,
    height: 1440,
  },
  {
    src: "/galleri/bmw-sida.jpg",
    alt: "Röd BMW efter rekond, parkerad vid verkstaden",
    width: 1600,
    height: 1200,
  },
  {
    src: "/galleri/bmw-bak.jpg",
    alt: "Bakpartiet på en röd BMW 2002 efter behandling",
    width: 1920,
    height: 1440,
  },
  {
    src: "/galleri/husbil.jpg",
    alt: "Vit husbil utanför Lavin Biltvätt på Lagegatan",
    width: 1920,
    height: 1440,
  },
  {
    src: "/galleri/tvatthall.jpg",
    alt: "Tvätthallen på Lagegatan 11 i Ängelholm",
    width: 1440,
    height: 1920,
  },
  {
    src: "/galleri/fasad.jpg",
    alt: "Fasaden till Lavin Biltvätt med verkstadsportar och skylt",
    width: 1920,
    height: 1440,
  },
];

export const WEEKDAY_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const SATURDAY_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];
