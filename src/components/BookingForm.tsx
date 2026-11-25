"use client";

import { useMemo, useState } from "react";
import { SATURDAY_SLOTS, SITE, WEEKDAY_SLOTS } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { mailtoHref, submitNetlifyForm } from "@/lib/submit-form";

const WEEKDAYS = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

type Step = 1 | 2 | 3;

type Fields = {
  name: string;
  phone: string;
  email: string;
  registration: string;
  message: string;
  bot: string;
};

const emptyFields: Fields = {
  name: "",
  phone: "",
  email: "",
  registration: "",
  message: "",
  bot: "",
};

function isoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseIso(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function slotsFor(dateStr: string) {
  const date = parseIso(dateStr);
  const day = date.getDay();
  if (day === 0) return [];
  const all = day === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS;
  const now = new Date();
  if (date.toDateString() !== now.toDateString()) return all;
  const minutes = now.getHours() * 60 + now.getMinutes();
  return all.filter((time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m > minutes + 30;
  });
}

function formatLong(dateStr: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(parseIso(dateStr));
}

export default function BookingForm({ onClose }: { onClose: () => void }) {
  const { items, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<"sent" | "mail" | null>(null);

  const todayIso = isoDate(new Date());
  const serviceLines = items.map((item) => `${item.service.name} (${item.service.price})`);

  const calendar = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const offset = (first.getDay() + 6) % 7;
    return { offset, count };
  }, [month]);

  const monthLabel = new Intl.DateTimeFormat("sv-SE", {
    month: "long",
    year: "numeric",
  }).format(month);

  const minMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const maxMonth = new Date(minMonth.getFullYear(), minMonth.getMonth() + 4, 1);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(current: Step) {
    if (current === 1) {
      if (fields.name.trim().length < 2) return "Fyll i ditt namn.";
      const digits = fields.phone.replace(/\D/g, "");
      if (digits.length < 8) return "Fyll i ett telefonnummer.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) return "Fyll i en giltig e-postadress.";
    }
    if (current === 2) {
      if (!date) return "Välj ett datum.";
      if (!time) return "Välj en tid.";
      if (!slotsFor(date).includes(time)) return "Den tiden är inte längre öppen. Välj en annan.";
    }
    return "";
  }

  function next() {
    const message = validateStep(step);
    setError(message);
    if (!message) setStep((value) => (value < 3 ? ((value + 1) as Step) : value));
  }

  async function submit() {
    const message = validateStep(1) || validateStep(2);
    setError(message);
    if (message || sending) return;
    if (fields.bot) return;
    setSending(true);

    const payload = {
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      email: fields.email.trim(),
      registration: fields.registration.trim(),
      date: formatLong(date),
      time,
      services: serviceLines.join("\n"),
      message: fields.message.trim(),
      "bot-field": "",
    };

    const ok = await submitNetlifyForm("bokning", payload);
    setSending(false);
    setDone(ok ? "sent" : "mail");
    clearCart();
  }

  const mailBody = [
    `Namn: ${fields.name.trim()}`,
    `Telefon: ${fields.phone.trim()}`,
    `E-post: ${fields.email.trim()}`,
    fields.registration.trim() ? `Reg.nr: ${fields.registration.trim()}` : "",
    date ? `Önskad tid: ${formatLong(date)} kl. ${time}` : "",
    "",
    "Tjänster:",
    ...serviceLines,
    "",
    fields.message.trim() ? `Meddelande: ${fields.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (done) {
    return (
      <div className="booking-form-card booking-form-card--embedded booking-form-card--success">
        <div className="booking-success-overlay booking-success-overlay--embedded">
          <div className="booking-success-overlay-inner">
            <p className="booking-success-overlay-text">
              {done === "sent"
                ? "Tack! Vi har tagit emot din förfrågan och återkommer för att bekräfta tiden."
                : "Förfrågan är klar. Skicka den med knappen så hamnar den direkt i vår inkorg."}
            </p>
            {done === "mail" && (
              <a
                className="booking-form-btn booking-form-btn--primary"
                href={mailtoHref("Bokningsförfrågan – Lavin Bilvård", mailBody, SITE.email)}
              >
                Skicka via e-post
              </a>
            )}
            <button type="button" className="booking-form-btn booking-form-btn--back" onClick={onClose}>
              Stäng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="booking-form-card booking-form-card--embedded"
      onSubmit={(event) => {
        event.preventDefault();
        if (step < 3) next();
        else void submit();
      }}
    >
      <div className="booking-form-header">
        <h2 className="booking-form-title">Boka tid</h2>
        <button type="button" className="booking-form-close" onClick={onClose} aria-label="Stäng bokning">
          ×
        </button>
      </div>
      <div className="booking-form-progress" aria-hidden>
        {[1, 2, 3].map((value) => (
          <span
            key={value}
            className={`booking-form-progress-seg${step >= value ? " booking-form-progress-seg--active" : ""}`}
          />
        ))}
      </div>
      <p className="booking-form-step-label">
        {step === 1 && "Steg 1 av 3 · Dina uppgifter"}
        {step === 2 && "Steg 2 av 3 · Välj tid"}
        {step === 3 && "Steg 3 av 3 · Bekräfta"}
      </p>

      <div className="booking-form-body">
        <p className="hp-field">
          <label>
            Lämna tomt
            <input
              name="bot-field"
              value={fields.bot}
              onChange={(event) => update("bot", event.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </p>

        {step === 1 && (
          <>
            <label className="booking-form-field">
              <span className="booking-form-label">Namn</span>
              <input
                className="booking-form-input"
                value={fields.name}
                onChange={(event) => update("name", event.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <label className="booking-form-field">
              <span className="booking-form-label">Telefon</span>
              <input
                className="booking-form-input"
                value={fields.phone}
                onChange={(event) => update("phone", event.target.value)}
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </label>
            <label className="booking-form-field">
              <span className="booking-form-label">E-post</span>
              <input
                className="booking-form-input"
                type="email"
                value={fields.email}
                onChange={(event) => update("email", event.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label className="booking-form-field">
              <span className="booking-form-label">Registreringsnummer</span>
              <input
                className="booking-form-input"
                value={fields.registration}
                onChange={(event) => update("registration", event.target.value)}
                autoComplete="off"
              />
            </label>
            <label className="booking-form-field">
              <span className="booking-form-label">Meddelande</span>
              <textarea
                className="booking-form-input"
                rows={3}
                value={fields.message}
                onChange={(event) => update("message", event.target.value)}
              />
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <p className="booking-form-date-note">
              Måndag–fredag 09–18, lördag 10–17. Söndagar är stängda. Tiden är en önskan tills vi bekräftar den.
            </p>
            <div className="booking-form-month-nav">
              <button
                type="button"
                className="booking-form-month-btn"
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                disabled={month <= minMonth}
                aria-label="Föregående månad"
              >
                ‹
              </button>
              <p className="booking-form-month-label">{monthLabel}</p>
              <button
                type="button"
                className="booking-form-month-btn booking-form-month-btn--next"
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                disabled={month >= maxMonth}
                aria-label="Nästa månad"
              >
                ›
              </button>
            </div>
            <div className="booking-form-calendar-wrap">
              <div className="booking-form-calendar-weekdays">
                {WEEKDAYS.map((day) => (
                  <span key={day} className="booking-form-calendar-weekday">
                    {day}
                  </span>
                ))}
              </div>
              <div className="booking-form-calendar-grid">
                {Array.from({ length: calendar.offset }, (_, index) => (
                  <span key={`empty-${index}`} className="booking-form-calendar-cell--empty" />
                ))}
                {Array.from({ length: calendar.count }, (_, index) => {
                  const day = index + 1;
                  const value = isoDate(new Date(month.getFullYear(), month.getMonth(), day));
                  const closed = parseIso(value).getDay() === 0;
                  const past = value < todayIso || (value === todayIso && slotsFor(value).length === 0);
                  const selected = value === date;
                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={closed || past}
                      className={[
                        "booking-form-calendar-day",
                        selected ? "booking-form-calendar-day--selected" : "",
                        value === todayIso ? "booking-form-calendar-day--today" : "",
                        closed ? "booking-form-calendar-day--closed" : "",
                        past && !closed ? "booking-form-calendar-day--past" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        setDate(value);
                        setTime("");
                      }}
                    >
                      <span className="booking-form-calendar-day-num">{day}</span>
                      {closed && <span className="booking-form-calendar-day-closed">Stängt</span>}
                    </button>
                  );
                })}
              </div>
            </div>
            {date && (
              <div className="booking-form-times" role="listbox" aria-label="Tider">
                {slotsFor(date).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`booking-form-time${time === slot ? " booking-form-time--selected" : ""}`}
                    onClick={() => setTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <div className="booking-form-summary">
            <dl className="booking-form-summary-list">
              <div>
                <dt>Namn</dt>
                <dd>{fields.name}</dd>
              </div>
              <div>
                <dt>Telefon</dt>
                <dd>{fields.phone}</dd>
              </div>
              <div>
                <dt>E-post</dt>
                <dd>{fields.email}</dd>
              </div>
              {fields.registration.trim() && (
                <div>
                  <dt>Reg.nr</dt>
                  <dd>{fields.registration}</dd>
                </div>
              )}
              <div>
                <dt>Tid</dt>
                <dd>
                  {formatLong(date)} kl. {time}
                </dd>
              </div>
            </dl>
            <div className="booking-form-summary-services">
              <p className="booking-form-summary-services-title">Valda tjänster</p>
              <ul>
                {items.map((item) => (
                  <li key={item.service.id}>
                    {item.service.name} · {item.service.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {error && (
          <p className="booking-form-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className={`booking-form-footer${step === 1 ? " booking-form-footer--single" : ""}`}>
        {step > 1 && (
          <button
            type="button"
            className="booking-form-btn booking-form-btn--back"
            onClick={() => {
              setError("");
              setStep((value) => (value > 1 ? ((value - 1) as Step) : value));
            }}
          >
            Tillbaka
          </button>
        )}
        <button type="submit" className="booking-form-btn booking-form-btn--primary" disabled={sending}>
          {step < 3 ? "Nästa" : sending ? "Skickar…" : "Skicka förfrågan"}
        </button>
      </div>
    </form>
  );
}
