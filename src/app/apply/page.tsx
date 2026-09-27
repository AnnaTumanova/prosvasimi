"use client";

import React, { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SuccessModal from "@/components/SuccessModal";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

const ICON_PATHS = {
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z",
  chat: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

const translations = {
  en: {
    tagline: "For job seekers",
    title: "Find an Accessible Job, With Support Every Step of the Way",
    subtitle: "Submit your CV once. Our inclusion experts review it by hand and match you with employers who are ready to accommodate you.",
    roadmapTitle: "Your roadmap",
    step1Title: "Submit your CV",
    step1Desc: "Fill in the form below with your background, target role, and any accessibility needs or workplace accommodations you'd like us to know about.",
    step2Title: "Manual review",
    step2Desc: "A real person on our inclusion team reviews your profile within 48 hours — no automated filtering.",
    step3Title: "Get matched",
    step3Desc: "We match you with open roles at employers we've vetted for accessible, disability-friendly workplaces.",
    step4Title: "Interview support",
    step4Desc: "We help you prepare and coordinate any accommodations you need for the interview itself.",
    formTitle: "Get CV Review & Match with Open Roles",
    formIntro: "Submit your CV for a personalized manual review by our inclusion experts within 48 hours.",
    formErrEmail: "Please enter a valid email address.",
    candidateName: "Full Name",
    candidateEmail: "Email",
    candidatePhone: "Phone / Telegram handle",
    candidateRole: "Target Role / Core Skills",
    candidateCV: "CV / Resume file",
    candidateNeeds: "Specific accessibility needs / workplace accommodations",
    candidateCta: "Get CV Review & Match with Open Roles",
    selected: "Selected:",
    successModalTitle: "Application received",
    successModalMessage: "Thank you. Our team will review your submission and follow up within 48 hours.",
    successModalButton: "Got it",
  },
  pl: {
    tagline: "Dla kandydatów",
    title: "Znajdź dostępną pracę, ze wsparciem na każdym kroku",
    subtitle: "Prześlij CV raz. Nasi eksperci ds. inkluzji przeglądają je ręcznie i dopasowują Cię do pracodawców gotowych na dostosowania.",
    roadmapTitle: "Twoja droga",
    step1Title: "Prześlij CV",
    step1Desc: "Wypełnij poniższy formularz, podając swoje doświadczenie, docelową rolę oraz potrzeby dostępności lub udogodnienia, o których powinniśmy wiedzieć.",
    step2Title: "Ręczny przegląd",
    step2Desc: "Prawdziwa osoba z naszego zespołu ds. inkluzji przegląda Twój profil w ciągu 48 godzin — bez automatycznego filtrowania.",
    step3Title: "Dopasowanie",
    step3Desc: "Dopasowujemy Cię do otwartych ról u pracodawców, których zweryfikowaliśmy pod kątem dostępności miejsca pracy.",
    step4Title: "Wsparcie na rozmowie",
    step4Desc: "Pomagamy się przygotować i koordynujemy wszelkie udogodnienia potrzebne podczas samej rozmowy.",
    formTitle: "Przegląd CV i dopasowanie do ofert",
    formIntro: "Prześlij swoje CV, aby otrzymać spersonalizowany przegląd od naszych ekspertów inkluzji w ciągu 48 godzin.",
    formErrEmail: "Podaj poprawny adres e-mail.",
    candidateName: "Imię i nazwisko",
    candidateEmail: "E-mail",
    candidatePhone: "Telefon / Telegram",
    candidateRole: "Docelowa rola / kluczowe umiejętności",
    candidateCV: "Plik CV",
    candidateNeeds: "Potrzeby dostępności / wymagane udogodnienia w pracy",
    candidateCta: "Prześlij CV i uzyskaj dopasowanie",
    selected: "Wybrano:",
    successModalTitle: "Aplikacja została przyjęta",
    successModalMessage: "Dziękujemy. Nasz zespół przeanalizuje Twoje zgłoszenie i skontaktuje się w ciągu 48 godzin.",
    successModalButton: "Rozumiem",
  },
  ua: {
    tagline: "Для шукачів роботи",
    title: "Знайдіть доступну роботу з підтримкою на кожному кроці",
    subtitle: "Надішліть резюме один раз. Наші експерти з інклюзії розглянуть його вручну та підберуть роботодавців, готових до адаптацій.",
    roadmapTitle: "Ваш шлях",
    step1Title: "Надішліть резюме",
    step1Desc: "Заповніть форму нижче, вказавши свій досвід, цільову роль та особливі потреби доступності чи коригування на робочому місці.",
    step2Title: "Ручний огляд",
    step2Desc: "Реальна людина з нашої команди з інклюзії розглядає ваш профіль протягом 48 годин — без автоматичного відбору.",
    step3Title: "Підбір вакансій",
    step3Desc: "Ми підбираємо для вас вакансії у роботодавців, яких ми перевірили на доступність робочого місця.",
    step4Title: "Підтримка на співбесіді",
    step4Desc: "Допомагаємо підготуватися та узгоджуємо будь-які потрібні коригування для самої співбесіди.",
    formTitle: "Огляд резюме та підбір вакансій",
    formIntro: "Надішліть своє резюме, щоб отримати персоналізований огляд від наших експертів з інклюзії протягом 48 годин.",
    formErrEmail: "Будь ласка, введіть дійсну адресу електронної пошти.",
    candidateName: "Повне ім'я",
    candidateEmail: "Електронна пошта",
    candidatePhone: "Телефон / Telegram",
    candidateRole: "Цільова роль / ключові навички",
    candidateCV: "Файл резюме",
    candidateNeeds: "Особливі потреби доступності / коригування на робочому місці",
    candidateCta: "Надіслати резюме та отримати підбір",
    selected: "Вибрано:",
    successModalTitle: "Заявку отримано",
    successModalMessage: "Дякуємо. Наша команда розгляне вашу заявку та зв'яжеться протягом 48 годин.",
    successModalButton: "Зрозуміло",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function ApplyPage() {
  const [lang, setLang] = useLang();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [err, setErr] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const t = translations[lang];

  const steps = [
    { n: 1, title: t.step1Title, desc: t.step1Desc, icon: ICON_PATHS.document },
    { n: 2, title: t.step2Title, desc: t.step2Desc, icon: ICON_PATHS.search },
    { n: 3, title: t.step3Title, desc: t.step3Desc, icon: ICON_PATHS.target },
    { n: 4, title: t.step4Title, desc: t.step4Desc, icon: ICON_PATHS.chat },
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [e.target.name]: file.name }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const email = formData["candidate-email"] ?? "";
    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr(t.formErrEmail);
      return;
    }

    const payload = {
      type: "candidate",
      email,
      lang,
      submittedAt: new Date().toISOString(),
      name: formData["candidate-name"],
      phone: formData["candidate-phone"],
      roleSkills: formData["candidate-role"],
      cvFileName: formData["candidate-cv"],
      accessibility: formData["candidate-needs"],
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setShowSuccessModal(true);
      setFormData({});
    } catch {
      setErr("Could not submit. Please try again later.");
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
              <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-white">
                {t.title}
              </h1>
              <p className="mt-8 text-xl text-white/80 leading-relaxed max-w-2xl">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-[#0B2818]">
              {t.roadmapTitle}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.n} className="relative bg-white rounded-2xl border-2 border-[#D9D9DC] p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F7A52] text-white mb-6">
                    <Icon path={step.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-[#0F7A52]">{String(step.n).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-xl font-semibold text-[#0B2818]">{step.title}</h3>
                  <p className="mt-2 text-[#3F3C3A] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-20 md:py-28 bg-[#F4F4F5]">
          <div className="mx-auto max-w-2xl px-6">
            <section className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-[#0B2818]">{t.formTitle}</h2>
              <p className="mt-3 text-[#0F7A52]">{t.formIntro}</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="candidate-name" className="block text-sm font-medium text-[#0B2818] mb-2">
                    {t.candidateName}
                  </label>
                  <input
                    id="candidate-name"
                    name="candidate-name"
                    type="text"
                    value={formData["candidate-name"] || ""}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                    placeholder="Anna"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="candidate-email" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.candidateEmail}
                    </label>
                    <input
                      id="candidate-email"
                      name="candidate-email"
                      type="email"
                      value={formData["candidate-email"] || ""}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      placeholder="you@domain.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="candidate-phone" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.candidatePhone}
                    </label>
                    <input
                      id="candidate-phone"
                      name="candidate-phone"
                      type="text"
                      value={formData["candidate-phone"] || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="candidate-role" className="block text-sm font-medium text-[#0B2818] mb-2">
                    {t.candidateRole}
                  </label>
                  <input
                    id="candidate-role"
                    name="candidate-role"
                    type="text"
                    value={formData["candidate-role"] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                    placeholder="Project manager, administration, customer support..."
                  />
                </div>

                <div>
                  <label htmlFor="candidate-cv" className="block text-sm font-medium text-[#0B2818] mb-2">
                    {t.candidateCV}
                  </label>
                  <input
                    id="candidate-cv"
                    name="candidate-cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    className="w-full text-sm text-[#3F3C3A] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#16A97A]/10 file:text-[#0F7A52] file:font-semibold"
                  />
                  {formData["candidate-cv"] && (
                    <p className="mt-2 text-sm text-[#0F7A52]">{t.selected} {formData["candidate-cv"]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="candidate-needs" className="block text-sm font-medium text-[#0B2818] mb-2">
                    {t.candidateNeeds}
                  </label>
                  <textarea
                    id="candidate-needs"
                    name="candidate-needs"
                    value={formData["candidate-needs"] || ""}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                    placeholder="Remote work, screen-reader friendly materials, adjusted interview..."
                  />
                </div>

                {err && <p className="text-sm text-[#DC2626]">{err}</p>}

                <button
                  type="submit"
                  className="inline-flex justify-center items-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors"
                >
                  {t.candidateCta}
                </button>
              </form>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t.successModalTitle}
        message={t.successModalMessage}
        buttonText={t.successModalButton}
      />
    </div>
  );
}
