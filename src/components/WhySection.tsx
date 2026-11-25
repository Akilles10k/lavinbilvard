const features = [
  {
    title: "Premium resultat",
    description:
      "Vi använder kvalitetsprodukter och rätt utrustning så att lack, kupé och detaljer blir skinande rena.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.5 6.4 20.5l2.1-6.7L3 9.8h6.8L12 3z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Alla typer av fordon",
    description:
      "Bilar, lastbilar, båtar och husbilar. Vi har utbildning för husbilar.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M3 14h2l2-7h10l2 7h2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: "Erfarna tekniker",
    description:
      "Varje fordon tas om hand med omsorg och precision. Vi lämnar det inte förrän resultatet sitter.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function WhySection() {
  return (
    <section className="why">
      <div className="why-inner">
        <h2 className="why-heading">Varför välja Lavin Bilvård i Ängelholm?</h2>
        <div className="why-grid">
          {features.map((feature) => (
            <article key={feature.title} className="why-card">
              <div className="why-card-icon">{feature.icon}</div>
              <div className="why-card-body">
                <h3 className="why-card-title">{feature.title}</h3>
                <p className="why-card-text">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
