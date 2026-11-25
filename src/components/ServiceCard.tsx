"use client";

import type { Service } from "@/data/site";
import { useCart } from "@/context/CartContext";

export default function ServiceCard({ service }: { service: Service }) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const added = isInCart(service.id);

  return (
    <article id={`service-${service.id}`} className="service-card">
      <div className="service-card-top">
        <span className="service-card-num">{String(service.id).padStart(2, "0")}</span>
        <p className="service-card-price">{service.price}</p>
      </div>
      <h3 className="service-card-title">{service.name}</h3>
      <p className="service-card-text">{service.description}</p>
      <div className="service-card-footer">
        <span className="service-card-duration service-card-duration--empty" aria-hidden="true" />
        <button
          type="button"
          className={`service-card-add-btn ${added ? "service-card-add-btn--added" : ""}`}
          onClick={() => (added ? removeFromCart(service.id) : addToCart(service))}
          aria-pressed={added}
        >
          {added ? "Tillagd" : "Lägg till"}
        </button>
      </div>
    </article>
  );
}
