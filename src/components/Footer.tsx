import Link from "next/link";
import { SITE } from "@/data/site";
import LogoIcon from "./LogoIcon";

const companyLinks = [
  { href: "/", label: "Hem" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/fotogalleri", label: "Galleri" },
  { href: "/prislista", label: "Boka tid" },
  { href: "/kontakt", label: "Kontakt" },
];

const serviceLinks = [
  { href: "/prislista#kategori-tvatt", label: "Biltvätt" },
  { href: "/prislista#kategori-rekond", label: "Rekond & polering" },
  { href: "/prislista#kategori-fordon", label: "Lastbil, båt & husbil" },
  { href: "/prislista", label: "Se alla priser" },
];

const contactLinks = [
  { href: SITE.phoneHref, label: SITE.phone },
  { href: SITE.phoneSecondaryHref, label: SITE.phoneSecondary },
  { href: `mailto:${SITE.email}`, label: SITE.email },
  { href: SITE.address.mapsHref, label: SITE.address.full, external: true },
];

const infoLinks = [
  ...SITE.openingHours.map((row) => ({
    href: "/kontakt",
    label: `${row.days} ${row.hours}`,
  })),
  { href: "/kontakt", label: "Söndag stängt" },
  { href: SITE.address.mapsHref, label: "Hitta hit", external: true },
];

type FooterLink = { href: string; label: string; external?: boolean };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="footer-col">
      <p className="footer-col-title">{title}</p>
      <ul className="footer-col-links">
        {links.map((link) => {
          const external = link.external || link.href.startsWith("http") || link.href.startsWith("mailto") || link.href.startsWith("tel");
          return (
            <li key={`${title}-${link.label}`}>
              {external ? (
                <a
                  href={link.href}
                  className="footer-col-link"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="footer-col-link">
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <p className="footer-slogan">
            Så det kan
            <br />
            glänsa
          </p>
          <div className="footer-cols">
            <FooterColumn title="Företag" links={companyLinks} />
            <FooterColumn title="Tjänster" links={serviceLinks} />
            <FooterColumn title="Kontakt" links={contactLinks} />
            <FooterColumn title="Info" links={infoLinks} />
          </div>
        </div>

        <div className="footer-mid">
          <Link href="/" className="footer-brandmark">
            <LogoIcon size={40} className="footer-brandmark-logo site-logo" />
            <span className="footer-brandmark-name">{SITE.shortName}</span>
          </Link>
          <div className="footer-mid-actions">
            <Link href="/prislista" className="footer-pill-btn">
              Boka tid
            </Link>
            <Link href="/prislista" className="footer-pill-btn">
              Se priser
            </Link>
          </div>
        </div>

        <div className="footer-legal">
          <div className="footer-legal-links">
            <span className="footer-lang">Svenska</span>
            <Link href="/kontakt" className="footer-legal-link">
              Kontakt
            </Link>
            <a
              href={SITE.address.mapsHref}
              className="footer-legal-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hitta hit
            </a>
          </div>
          <p className="footer-copy">
            Copyright {year} {SITE.name}. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}
