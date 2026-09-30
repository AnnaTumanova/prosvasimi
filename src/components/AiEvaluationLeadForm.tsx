"use client";

import React, { useState } from "react";
import type { Lang } from "@/lib/language";
import SuccessModal from "@/components/SuccessModal";

const translations = {
  en: {
    title: "Want to test your AI?",
    subtitle: "Tell us what you're building and we'll suggest the right evaluation approach.",
    name: "Name",
    company: "Company",
    email: "Work email",
    website: "Company website",
    building: "What are you building?",
    languages: "Languages you need to evaluate",
    volume: "Approximate evaluation volume",
    cta: "Request an evaluation",
    errEmail: "Please enter a valid work email address.",
    errGeneric: "Could not submit. Please try again later.",
    successTitle: "Request received",
    successMessage: "Thanks — we'll review what you're building and get back to you shortly to suggest the right evaluation approach.",
    successButton: "Got it",
  },
  pl: {
    title: "Chcesz przetestować swoje AI?",
    subtitle: "Opowiedz nam, co budujesz, a zaproponujemy odpowiednie podejście do ewaluacji.",
    name: "Imię i nazwisko",
    company: "Firma",
    email: "Służbowy e-mail",
    website: "Strona firmy",
    building: "Co budujecie?",
    languages: "Języki do ewaluacji",
    volume: "Przybliżony wolumen ewaluacji",
    cta: "Poproś o ewaluację",
    errEmail: "Podaj poprawny służbowy adres e-mail.",
    errGeneric: "Nie udało się wysłać. Spróbuj ponownie później.",
    successTitle: "Zgłoszenie przyjęte",
    successMessage: "Dziękujemy — przeanalizujemy Wasz projekt i wkrótce skontaktujemy się, proponując odpowiednie podejście do ewaluacji.",
    successButton: "Rozumiem",
  },
  ua: {
    title: "Хочете перевірити свій AI?",
    subtitle: "Розкажіть, що ви створюєте, і ми запропонуємо відповідний підхід до оцінювання.",
    name: "Ім'я",
    company: "Компанія",
    email: "Робоча електронна пошта",
    website: "Сайт компанії",
    building: "Що ви створюєте?",
    languages: "Мови для оцінювання",
    volume: "Орієнтовний обсяг оцінювання",
    cta: "Запросити оцінювання",
    errEmail: "Будь ласка, введіть дійсну робочу електронну пошту.",
    errGeneric: "Не вдалося надіслати. Спробуйте пізніше.",
    successTitle: "Заявку отримано",
    successMessage: "Дякуємо — ми розглянемо ваш проєкт і незабаром зв'яжемося, щоб запропонувати відповідний підхід до оцінювання.",
    successButton: "Зрозуміло",
  },
} satisfies Record<Lang, Record<string, string>>;

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:border-[#0F7A52] focus:ring-1 focus:ring-[#0F7A52] outline-none transition-colors text-[15px]";
const labelClass = "block text-sm font-medium text-[#0B2818] mb-2";

export default function AiEvaluationLeadForm({ lang, id = "lead-form" }: { lang: Lang; id?: string }) {
  const t = translations[lang];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const email = formData.email ?? "";
    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr(t.errEmail);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ai-evaluation",
          email,
          lang,
          submittedAt: new Date().toISOString(),
          name: formData.name,
          company: formData.company,
          website: formData.website,
          building: formData.building,
          languages: formData.languages,
          volume: formData.volume,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setShowSuccessModal(true);
      setFormData({});
    } catch {
      setErr(t.errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id={id} className="py-24 md:py-32 bg-[#FAFAF9]">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.title}</h2>
          <p className="mt-4 text-lg text-[#3F3C3A]">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-10 border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-name" className={labelClass}>{t.name}</label>
                <input id="lead-name" name="name" type="text" value={formData.name || ""} onChange={handleChange} required aria-required="true" className={inputClass} />
              </div>
              <div>
                <label htmlFor="lead-company" className={labelClass}>{t.company}</label>
                <input id="lead-company" name="company" type="text" value={formData.company || ""} onChange={handleChange} required aria-required="true" className={inputClass} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-email" className={labelClass}>{t.email}</label>
                <input id="lead-email" name="email" type="email" value={formData.email || ""} onChange={handleChange} required aria-required="true" className={inputClass} placeholder="you@company.com" />
              </div>
              <div>
                <label htmlFor="lead-website" className={labelClass}>{t.website}</label>
                <input id="lead-website" name="website" type="text" value={formData.website || ""} onChange={handleChange} className={inputClass} placeholder="company.com" />
              </div>
            </div>

            <div>
              <label htmlFor="lead-building" className={labelClass}>{t.building}</label>
              <textarea id="lead-building" name="building" value={formData.building || ""} onChange={handleChange} rows={3} className={inputClass} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-languages" className={labelClass}>{t.languages}</label>
                <input id="lead-languages" name="languages" type="text" value={formData.languages || ""} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="lead-volume" className={labelClass}>{t.volume}</label>
                <input id="lead-volume" name="volume" type="text" value={formData.volume || ""} onChange={handleChange} className={inputClass} placeholder="e.g. 500 test cases" />
              </div>
            </div>

            {err && <p className="text-sm text-[#DC2626]">{err}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex justify-center items-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-semibold hover:bg-[#0B2818] transition-colors disabled:opacity-60"
            >
              {t.cta}
            </button>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t.successTitle}
        message={t.successMessage}
        buttonText={t.successButton}
      />
    </section>
  );
}
