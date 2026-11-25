import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";

export default function Showcase() {
  return (
    <section className="showcase" aria-label="Välkommen till verkstaden">
      <div className="showcase-media">
        <Image
          src="/galleri/jeep.jpg"
          alt="Jeep efter tvätt utanför Lavin Bilvård på Lagegatan 11"
          width={1920}
          height={1440}
          sizes="(min-width: 900px) 58vw, 100vw"
        />
      </div>
      <div className="showcase-copy">
        <p className="showcase-kicker">Lagegatan 11 · {SITE.city}</p>
        <h2 className="showcase-title">Erfarenhet och kvalitet inom bilvård</h2>
        <p className="showcase-text">
          Lavin Bilvård & Service är din partner för bilvård i Ängelholm. Vi är
          specialiserade på rengöring och polering av alla typer av fordon, från
          bilar till båtar och lastbilar. Med vår erfarenhet kan du lita på en
          skinande ren och välskött bil.
        </p>
        <Link href="/om-oss" className="showcase-link">
          Om oss →
        </Link>
      </div>
    </section>
  );
}
