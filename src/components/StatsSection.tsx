import Link from "next/link";

export default function StatsSection() {
  return (
    <section className="stats">
      <span className="stats-watermark" aria-hidden>
        GLANS
      </span>
      <div className="stats-content">
        <h2 className="stats-heading">
          Bilar, lastbilar, båtar och husbilar
        </h2>
        <p className="stats-sub">Rekond, tvätt och polering i Ängelholm</p>
        <Link href="/fotogalleri" className="stats-btn">
          Se galleri
        </Link>
      </div>
    </section>
  );
}
