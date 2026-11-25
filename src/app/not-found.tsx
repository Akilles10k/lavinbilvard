import Link from "next/link";

export default function NotFound() {
  return (
    <main className="contact">
      <div className="contact-wrap">
        <header className="contact-page-head">
          <p className="contact-page-eyebrow">404</p>
          <h1 className="contact-page-title">Sidan finns inte</h1>
          <p className="contact-page-lead">
            Länken leder ingenstans. Gå tillbaka till startsidan eller titta på prislistan.
          </p>
          <p>
            <Link href="/">Till startsidan</Link>
            {" · "}
            <Link href="/prislista">Priser</Link>
          </p>
        </header>
      </div>
    </main>
  );
}
