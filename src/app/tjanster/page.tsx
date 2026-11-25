import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tjänster",
  description:
    "Professionell rekond, utvändig och invändig tvätt, polering, lackskydd, lastbilstvätt, båttvätt, husbil och mattvätt i Ängelholm.",
  path: "/tjanster",
});

const features = [
  {
    title: "Utvändig och invändig tvätt",
    text: "Vi tar hand om hela bilens utsida, från fälgar och hjulhus till lack och rutor. Smuts, vägsalt, asfalt och andra föroreningar tas bort för att skydda lacken mot rost och slitage. Vid behov erbjuder vi även vaxning för extra glans. Kupén får samma omsorg: vi rengör ytorna, dammsuger noggrant och ser till att bilen känns fräsch. Passar både vardagsbilen och bilen som ska förberedas inför försäljning.",
    href: "/prislista#kategori-tvatt",
    link: "Se tvättpriser",
  },
  {
    title: "Rekonditionering av bilar",
    text: "Rekonditionering återställer och förbättrar bilens yttre och inre skick. Grundpaketet är en upprustning av interiör och exteriör. Proffsrekonden är en noggrannare behandling för den som vill att bilen ska se ut som ny igen.",
    href: "/prislista#service-4",
    link: "Rekond från 400 kr",
  },
  {
    title: "Polering och lackskydd",
    text: "Polering är vår specialitet och ger lacken en glänsande, skyddande yta. Lackskydd är nästa steg när ytan ska fortsätta se ny ut längre. Vi anpassar behandlingen efter lackens skick.",
    href: "/prislista#service-5",
    link: "Polering från 1 500 kr",
  },
  {
    title: "Lastbilar, båtar och husbilar",
    text: "Att tvätta en lastbil är ett viktigt steg för att hålla den ren och välskött. Båtar polerar och tvättar vi för att bevara ytan och skydda mot väder och saltvatten. Husbilar tar vi också, och vi har utbildning för just det.",
    href: "/prislista#kategori-fordon",
    link: "Fordon och båt",
  },
  {
    title: "Mattvätt",
    text: "Vi tvättar mattor som du har hemma och de som ligger i bilen. Det är ett av områdena vi är specialister på.",
    href: "/prislista#service-10",
    link: "Mattvätt från 199 kr",
  },
];

export default function ServicesPage() {
  return (
    <main className="services">
      <header className="services-header">
        <p className="services-eyebrow">Vad vi gör</p>
        <h1 className="services-title">Tjänster</h1>
        <p className="services-intro">
          Vi erbjuder professionell rekond och tvätt av bilar, lastbilar och båtar i Ängelholm-området.
          Vår specialitet är polering, så att fordonet får en skinande finish. Välkommen in för att få bilen att se ut som ny igen.
        </p>
      </header>

      <div className="service-features">
        {features.map((feature) => (
          <article key={feature.title} className="service-feature">
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
            <Link href={feature.href}>{feature.link} →</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
