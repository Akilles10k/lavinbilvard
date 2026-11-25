"use client";

import { useState } from "react";
import { SITE } from "@/data/site";
import { mailtoHref, submitNetlifyForm } from "@/lib/submit-form";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [bot, setBot] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<"sent" | "mail" | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Fyll i ditt namn.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Fyll i en giltig e-postadress.");
      return;
    }
    if (message.trim().length < 5) {
      setError("Skriv ett kort meddelande.");
      return;
    }
    if (bot) return;
    setError("");
    setSending(true);
    const ok = await submitNetlifyForm("kontakt", {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      "bot-field": "",
    });
    setSending(false);
    setDone(ok ? "sent" : "mail");
  }

  if (done === "sent") {
    return (
      <p className="form-success" role="status">
        Tack {name.trim().split(" ")[0]}! Vi har tagit emot ditt meddelande och återkommer så snart vi kan.
      </p>
    );
  }

  if (done === "mail") {
    const href = mailtoHref(
      "Meddelande från hemsidan – Lavin Bilvård",
      `Namn: ${name.trim()}\nE-post: ${email.trim()}\n\n${message.trim()}`,
      SITE.email,
    );
    return (
      <p className="form-success" role="status">
        Meddelandet är klart.{" "}
        <a href={href}>Skicka det via e-post</a> så hamnar det direkt hos oss.
      </p>
    );
  }

  return (
    <form className="contact-form" name="kontakt" onSubmit={onSubmit}>
      <p className="hp-field">
        <label>
          Lämna tomt
          <input value={bot} onChange={(event) => setBot(event.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className="booking-form-field">
        <span className="booking-form-label">Fullständigt namn</span>
        <input className="booking-form-input" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
      </label>
      <label className="booking-form-field">
        <span className="booking-form-label">E-post</span>
        <input className="booking-form-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
      </label>
      <label className="booking-form-field">
        <span className="booking-form-label">Meddelande</span>
        <textarea className="booking-form-input" rows={5} value={message} onChange={(event) => setMessage(event.target.value)} required />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="booking-form-btn booking-form-btn--primary" disabled={sending}>
        {sending ? "Skickar…" : "Skicka"}
      </button>
    </form>
  );
}
