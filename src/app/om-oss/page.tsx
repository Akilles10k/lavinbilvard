import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Om oss",
  description:
    "Lavin Bilvård & Service är en premiumbilvård i Ängelholm. Rekond, tvätt och polering av bilar, lastbilar, båtar och husbilar.",
  path: "/om-oss",
});

export default function AboutPage() {
  return (
    <main className="contact">
      <div className="contact-wrap">
        <header className="contact-page-head">
          <p className="contact-page-eyebrow">Verkstaden</p>
          <h1 className="contact-page-title">Om oss</h1>
          <p className="contact-page-lead">
            Lavin Bilvård & Service är din pålitliga partner när det gäller bilvård och service i Ängelholm.
            Vi är specialiserade på rengöring och polering av alla typer av fordon, från bilar till båtar och lastbilar.
          </p>
        </header>

        <div className="story">
          <div className="story-copy">
            <h2>Erfarenhet och kvalitet inom bilvård</h2>
            <p>
              Lavin Bilvård & Service är en premiumbilvård med specialisering inom rekond av bilar,
              tvätt av bilar, tvätt av lastbilar, tvätt av båtar och polering. Vi är baserade i Ängelholm
              och tar emot kunder från hela regionen.
            </p>
            <p>
              Vårt team består av erfarna tekniker som tar hand om varje fordon med omsorg och precision.
              Vi använder högkvalitativa produkter och utrustning för att resultatet ska sitta varje gång.
            </p>
            <p>
              Vi tvättar även husbilar, och för dem har vi särskild utbildning.
            </p>
          </div>
          <div className="story-photo">
            <Image
              src="/galleri/husbil.jpg"
              alt="Husbil utanför verkstaden på Lagegatan 11"
              width={1920}
              height={1440}
            />
          </div>
        </div>

        <div className="story">
          <div className="story-photo">
            <Image
              src="/galleri/tvatthall.jpg"
              alt="Tvätthallen hos Lavin Bilvård i Ängelholm"
              width={1440}
              height={1920}
            />
          </div>
          <div className="story-copy">
            <h2>På Lagegatan 11</h2>
            <p>
              Verkstaden ligger på {SITE.address.full}. Här tar vi emot personbilar, lastbilar, båtar och husbilar.
              Öppet måndag till fredag {SITE.openingHours[0].hours.replace(" – ", "–")} och lördag{" "}
              {SITE.openingHours[1].hours.replace(" – ", "–")}.
            </p>
            <p>
              Vill du se hur en behandling kan se ut? Titta in i galleriet, eller skicka en förfrågan så hittar vi en tid.
            </p>
            <p>
              <Link href="/fotogalleri">Se fotogalleriet</Link>
              {" · "}
              <Link href="/prislista">Se priser och boka</Link>
            </p>
          </div>
        </div>

        <h2 style={{ marginTop: "2.75rem", marginBottom: "0.4rem" }}>Välkommen till oss</h2>
        <p className="contact-page-lead">En kort film från Lagegatan 11.</p>
        <div className="video-frame" style={{ marginTop: "1rem" }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${SITE.videoId}`}
            title="Välkommen till Lavin Bilvård & Service på Lagegatan 11 i Ängelholm"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}
