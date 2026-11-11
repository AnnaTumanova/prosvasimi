"use client";

import React, { useState } from "react";
import type { Lang } from "@/lib/language";
import SuccessModal from "@/components/SuccessModal";

// One configurable form for every intake path (business inquiry, Academy
// application, career application, partnership). Submissions go through the
// existing /api/waitlist pipeline, tagged with `type` so each audience's data
// can be routed and retained separately.

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  hint?: string;
  full?: boolean;
};

const common = {
  en: {
    optional: "optional",
    select: "Select…",
    sending: "Sending…",
    errEmail: "Please enter a valid email address.",
    errRequired: "Please fill in all required fields.",
    errConsent: "Please confirm consent to data processing.",
    errGeneric: "Could not submit. Please try again later or write to us directly.",
    successButton: "Got it",
    consent:
      "I agree that Fundacja Prosvásimi may process the data in this form to respond to my request. I can withdraw consent at any time by writing to us.",
  },
  pl: {
    optional: "opcjonalnie",
    select: "Wybierz…",
    sending: "Wysyłanie…",
    errEmail: "Podaj poprawny adres e-mail.",
    errRequired: "Uzupełnij wszystkie wymagane pola.",
    errConsent: "Potwierdź zgodę na przetwarzanie danych.",
    errGeneric: "Nie udało się wysłać. Spróbuj później lub napisz do nas bezpośrednio.",
    successButton: "Rozumiem",
    consent:
      "Wyrażam zgodę na przetwarzanie przez Fundację Prosvásimi danych z tego formularza w celu odpowiedzi na moje zgłoszenie. Mogę wycofać zgodę w każdej chwili, pisząc do nas.",
  },
  ua: {
    optional: "необов'язково",
    select: "Оберіть…",
    sending: "Надсилання…",
    errEmail: "Будь ласка, введіть дійсну електронну адресу.",
    errRequired: "Будь ласка, заповніть усі обов'язкові поля.",
    errConsent: "Будь ласка, підтвердіть згоду на обробку даних.",
    errGeneric: "Не вдалося надіслати. Спробуйте пізніше або напишіть нам напряму.",
    successButton: "Зрозуміло",
    consent:
      "Я погоджуюся, що Fundacja Prosvásimi оброблятиме дані з цієї форми, щоб відповісти на мій запит. Я можу відкликати згоду в будь-який момент, написавши вам.",
  },
} satisfies Record<Lang, Record<string, string>>;

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-black/[0.12] bg-white focus:border-[#0F7A52] focus:ring-1 focus:ring-[#0F7A52] outline-none transition-colors text-[15px]";
const labelClass = "block text-sm font-medium text-[#0B2818] mb-2";

export default function InquiryForm({
  lang,
  type,
  id,
  title,
  subtitle,
  fields,
  cta,
  successTitle,
  successMessage,
  note,
  requireConsent = true,
  bare = false,
}: {
  lang: Lang;
  type: string;
  id: string;
  title?: string;
  subtitle?: string;
  fields: FormField[];
  cta: string;
  successTitle: string;
  successMessage: string;
  note?: string;
  requireConsent?: boolean;
  bare?: boolean;
}) {
  const c = common[lang];
  const [data, setData] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const email = data.email ?? "";
    if (fields.some((f) => f.required && !(data[f.name] ?? "").trim())) {
      setErr(c.errRequired);
      return;
    }
    if (!/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr(c.errEmail);
      return;
    }
    if (requireConsent && !consent) {
      setErr(c.errConsent);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type,
          email,
          lang,
          consent: requireConsent ? consent : undefined,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setShowSuccess(true);
      setData({});
      setConsent(false);
    } catch {
      setErr(c.errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  const form = (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-x-4 gap-y-5" noValidate>
        {fields.map((f) => {
          const fid = `${id}-${f.name}`;
          const hintId = f.hint ? `${fid}-hint` : undefined;
          const wide = f.full || f.type === "textarea";
          const shared = {
            id: fid,
            name: f.name,
            value: data[f.name] || "",
            onChange: handleChange,
            required: f.required,
            "aria-required": f.required ? ("true" as const) : undefined,
            "aria-describedby": hintId,
            className: inputClass,
          };
          return (
            <div key={f.name} className={wide ? "sm:col-span-2" : ""}>
              <label htmlFor={fid} className={labelClass}>
                {f.label}
                {f.required ? (
                  <span className="text-[#B91C1C]" aria-hidden="true"> *</span>
                ) : (
                  <span className="font-normal text-[#5B5754]"> ({c.optional})</span>
                )}
              </label>
              {f.type === "textarea" ? (
                <textarea {...shared} rows={3} placeholder={f.placeholder} />
              ) : f.type === "select" ? (
                <select {...shared}>
                  <option value="">{c.select}</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input {...shared} type={f.type ?? "text"} placeholder={f.placeholder} autoComplete={f.type === "email" ? "email" : undefined} />
              )}
              {f.hint && (
                <p id={hintId} className="mt-1.5 text-sm text-[#5B5754]">
                  {f.hint}
                </p>
              )}
            </div>
          );
        })}

        {requireConsent && (
          <div className="sm:col-span-2 flex items-start gap-3">
            <input
              id={`${id}-consent`}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#0F7A52] flex-shrink-0"
            />
            <label htmlFor={`${id}-consent`} className="text-sm text-[#3F3C3A] leading-relaxed">
              {c.consent}
            </label>
          </div>
        )}

        {note && <p className="sm:col-span-2 text-sm text-[#5B5754]">{note}</p>}

        <div role="alert" aria-live="assertive" className="sm:col-span-2 empty:hidden text-sm text-[#B91C1C]">
          {err}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-2 inline-flex justify-center items-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-semibold hover:bg-[#0B2818] transition-colors disabled:opacity-60"
        >
          {submitting ? c.sending : cta}
        </button>
      </form>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={successTitle}
        message={successMessage}
        buttonText={c.successButton}
      />
    </div>
  );

  if (bare) return <div id={id}>{form}</div>;

  return (
    <section id={id} className="py-24 md:py-32 bg-[#FAFAF9] scroll-mt-16">
      <div className="mx-auto max-w-2xl px-6">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{title}</h2>}
            {subtitle && <p className="mt-4 text-lg text-[#3F3C3A]">{subtitle}</p>}
          </div>
        )}
        {form}
      </div>
    </section>
  );
}
