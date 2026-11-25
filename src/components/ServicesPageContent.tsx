"use client";

import { CATEGORY_LABELS, CATEGORY_ORDER, SERVICES } from "@/data/site";
import ServiceCard from "@/components/ServiceCard";
import CartBar from "@/components/CartBar";

export default function ServicesPageContent() {
  const categories = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: SERVICES.filter((service) => service.category === category),
  })).filter((entry) => entry.items.length > 0);

  return (
    <>
      <main className="services services--with-cart">
        <header className="services-header">
          <p className="services-eyebrow">Prislista</p>
          <h1 className="services-title">Tvätt, rekond och polering</h1>
          <p className="services-intro">
            Priserna är från-priser och utgår från fordonets storlek och skick.
            Välj tjänster med &quot;Lägg till&quot; och skicka sedan en bokningsförfrågan.
            Vi bekräftar tiden innan den är låst.
          </p>
        </header>

        <nav className="services-catbar" aria-label="Kategorier">
          {categories.map(({ category, label }) => (
            <a key={category} href={`#kategori-${category}`} className="services-catbar-link">
              {label}
            </a>
          ))}
        </nav>

        {categories.map(({ category, label, items }) => (
          <section key={category} id={`kategori-${category}`} className="services-section">
            <h2 className="services-section-title">{label}</h2>
            <div className="services-grid">
              {items.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        ))}
      </main>
      <CartBar />
    </>
  );
}
