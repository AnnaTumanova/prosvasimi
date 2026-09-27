"use client";

import React, { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    tagline: "Contact",
    title: "Get in touch.",
    subtitle: "Questions about coaching, workshops, partnerships, or accessibility support — send us a message and we'll get back to you.",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formMessagePlaceholder: "Tell us what you need...",
    formErrEmail: "Please enter a valid email address.",
    formErrMessage: "Please enter a message.",
    submit: "Send Message",
    submitting: "Sending...",
    successTitle: "Message sent!",
    successMsg: "Thank you for reaching out. We'll get back to you soon.",
    error: "Something went wrong. Please try again later.",
  },
  pl: {
    tagline: "Kontakt",
    title: "Skontaktuj się z nami.",
    subtitle: "Pytania dotyczące coachingu, warsztatów, partnerstw lub wsparcia w zakresie dostępności — napisz do nas, a odpowiemy.",
    formName: "Imię",
    formEmail: "E-mail",
    formMessage: "Wiadomość",
    formMessagePlaceholder: "Napisz, czego potrzebujesz...",
    formErrEmail: "Podaj poprawny adres e-mail.",
    formErrMessage: "Wpisz wiadomość.",
    submit: "Wyślij wiadomość",
    submitting: "Wysyłanie...",
    successTitle: "Wiadomość wysłana!",
    successMsg: "Dziękujemy za kontakt. Odpowiemy wkrótce.",
    error: "Coś poszło nie tak. Spróbuj ponownie później.",
  },
  ua: {
    tagline: "Контакти",
    title: "Зв'яжіться з нами.",
    subtitle: "Питання про коучинг, воркшопи, партнерства чи підтримку доступності — напишіть нам, і ми відповімо.",
    formName: "Ім'я",
    formEmail: "Електронна пошта",
    formMessage: "Повідомлення",
    formMessagePlaceholder: "Напишіть, що вам потрібно...",
    formErrEmail: "Будь ласка, введіть дійсну адресу електронної пошти.",
    formErrMessage: "Будь ласка, введіть повідомлення.",
    submit: "Надіслати повідомлення",
    submitting: "Надсилання...",
    successTitle: "Повідомлення надіслано!",
    successMsg: "Дякуємо за звернення. Ми скоро відповімо.",
    error: "Щось пішло не так. Спробуйте пізніше.",
  },
};

export default function ContactPage() {
  const [lang, setLang] = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const t = translations[lang];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");

    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr(t.formErrEmail);
      return;
    }
    if (!message.trim()) {
      setErr(t.formErrMessage);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          lang,
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSubmitted(true);
    } catch {
      setErr(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-[#0B2818] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F7A52]/20 via-transparent to-transparent" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#16A97A]/40 bg-[#16A97A]/10 text-[#0F7A52] text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#16A97A] animate-pulse" />
                {t.tagline}
              </span>
              <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white">
                {t.title}
              </h1>
              <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#D9D9DC]">
                {submitted ? (
                  <div className="rounded-xl bg-[#16A97A]/10 text-[#0B2818] p-6 border border-[#16A97A]/20">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#16A97A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-bold">{t.successTitle}</p>
                        <p className="mt-1 text-sm text-[#0F7A52]">{t.successMsg}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#0B2818] mb-2">{t.formName}</label>
                        <input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                          placeholder="Anna"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#0B2818] mb-2">{t.formEmail}</label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                          placeholder="you@domain.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#0B2818] mb-2">{t.formMessage}</label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors resize-none"
                        placeholder={t.formMessagePlaceholder}
                        required
                      />
                    </div>

                    {err && <p className="text-sm text-[#DC2626]">{err}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? t.submitting : t.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
