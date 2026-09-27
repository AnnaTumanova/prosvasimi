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
  users: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  rocket: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
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
    tagline: "For companies",
    title: "Meet Your Hiring Goals With a Real Inclusive Pipeline",
    subtitle: "Apply for a pilot partnership and we'll source, screen, and support candidates with disabilities through onboarding — while coaching your HR team.",
    roadmapTitle: "Your roadmap",
    step1Title: "Apply for the pilot",
    step1Desc: "Tell us about your open roles, hiring needs, and where you'd like support — sourcing, an accessibility audit, or a recruitment workshop.",
    step2Title: "We review & scope",
    step2Desc: "We assess your job descriptions and workplace readiness, and agree on the roles and accommodations to focus on.",
    step3Title: "Sourcing & screening",
    step3Desc: "We source and screen candidates with disabilities matched to your open roles, so you only meet people who fit.",
    step4Title: "Onboarding & coaching",
    step4Desc: "We support onboarding and coach your HR/Talent Acquisition team on inclusive recruitment practices going forward.",
    formTitle: "Apply for Pilot Partnership",
    formIntro: "Start building an inclusive hiring pipeline with Prosvasimi.",
    formErrEmail: "Please enter a valid email address.",
    employerCompany: "Company Name",
    employerContact: "Contact Person",
    employerEmail: "Work Email",
    employerOpenRoles: "Current hiring needs (number of open roles, remote vs on-site)",
    employerWorkSetup: "Work setup",
    employerServices: "Interest area",
    employerServicePilot: "Inclusive Hiring Pilot (1–3 open roles)",
    employerServiceAudit: "Job Description & Career Page Accessibility Mini-Audit",
    employerServiceWorkshop: "Inclusive Recruitment Workshop for HR/Talent Acquisition",
    employerCta: "Apply for Pilot Partnership",
    successModalTitle: "Application received",
    successModalMessage: "Thank you. Our team will review your submission and follow up within 48 hours.",
    successModalButton: "Got it",
  },
  pl: {
    tagline: "Dla firm",
    title: "Zrealizuj cele rekrutacyjne dzięki realnemu inkluzywnemu procesowi",
    subtitle: "Aplikuj o współpracę pilotażową, a my znajdziemy, zweryfikujemy i wesprzemy kandydatów z niepełnosprawnościami aż po wdrożenie — szkoląc przy tym Twój zespół HR.",
    roadmapTitle: "Twoja droga",
    step1Title: "Aplikuj o pilotaż",
    step1Desc: "Opowiedz nam o otwartych rolach, potrzebach rekrutacyjnych i obszarze wsparcia — pozyskiwaniu kandydatów, audycie dostępności lub warsztacie rekrutacyjnym.",
    step2Title: "Przegląd i zakres",
    step2Desc: "Oceniamy opisy stanowisk i gotowość miejsca pracy, po czym ustalamy role i udogodnienia, na których się skupimy.",
    step3Title: "Pozyskiwanie i weryfikacja",
    step3Desc: "Znajdujemy i weryfikujemy kandydatów z niepełnosprawnościami dopasowanych do Twoich ról, więc spotykasz się tylko z pasującymi osobami.",
    step4Title: "Wdrożenie i szkolenie",
    step4Desc: "Wspieramy proces wdrożenia i szkolimy Twój zespół HR/rekrutacji w zakresie inkluzywnych praktyk na przyszłość.",
    formTitle: "Aplikuj o współpracę pilotażową",
    formIntro: "Zacznij budować inkluzywny proces rekrutacyjny z Prosvasimi.",
    formErrEmail: "Podaj poprawny adres e-mail.",
    employerCompany: "Nazwa firmy",
    employerContact: "Osoba do kontaktu",
    employerEmail: "Służbowy e-mail",
    employerOpenRoles: "Aktualne potrzeby rekrutacyjne (liczba ról, zdalnie/stacjonarnie)",
    employerWorkSetup: "Tryb pracy",
    employerServices: "Obszar zainteresowania",
    employerServicePilot: "Inkluzywny pilot rekrutacyjny (1–3 role)",
    employerServiceAudit: "Mini-audyt dostępności ogłoszeń i strony kariery",
    employerServiceWorkshop: "Warsztat inkluzywnej rekrutacji dla HR",
    employerCta: "Aplikuj o współpracę pilotażową",
    successModalTitle: "Aplikacja została przyjęta",
    successModalMessage: "Dziękujemy. Nasz zespół przeanalizuje Twoje zgłoszenie i skontaktuje się w ciągu 48 godzin.",
    successModalButton: "Rozumiem",
  },
  ua: {
    tagline: "Для компаній",
    title: "Досягніть цілей найму з реальним інклюзивним процесом",
    subtitle: "Подайте заявку на пілотне партнерство, і ми знайдемо, перевіримо та підтримаємо кандидатів з інвалідністю аж до адаптації — навчаючи водночас вашу команду HR.",
    roadmapTitle: "Ваш шлях",
    step1Title: "Подайте заявку на пілот",
    step1Desc: "Розкажіть нам про відкриті вакансії, потреби найму та бажану сферу підтримки — пошук кандидатів, аудит доступності чи воркшоп з рекрутингу.",
    step2Title: "Огляд і визначення обсягу",
    step2Desc: "Ми оцінюємо описи вакансій та готовність робочого місця, і узгоджуємо ролі та коригування, на яких зосередимося.",
    step3Title: "Пошук і перевірка",
    step3Desc: "Ми знаходимо та перевіряємо кандидатів з інвалідністю, підібраних під ваші вакансії, тож ви зустрічаєтесь лише з тими, хто підходить.",
    step4Title: "Адаптація і навчання",
    step4Desc: "Ми підтримуємо процес адаптації та навчаємо вашу команду HR/рекрутингу інклюзивним практикам на майбутнє.",
    formTitle: "Подати заявку на пілотне партнерство",
    formIntro: "Почніть будувати інклюзивний рекрутинговий процес із Prosvasimi.",
    formErrEmail: "Будь ласка, введіть дійсну адресу електронної пошти.",
    employerCompany: "Назва компанії",
    employerContact: "Контактна особа",
    employerEmail: "Робоча електронна пошта",
    employerOpenRoles: "Поточні потреби в наймі (кількість вакансій, віддалено/в офісі)",
    employerWorkSetup: "Формат роботи",
    employerServices: "Сфера інтересу",
    employerServicePilot: "Пілот з інклюзивного найму (1–3 вакансії)",
    employerServiceAudit: "Міні-аудит доступності вакансій та сторінки кар'єри",
    employerServiceWorkshop: "Воркшоп інклюзивного рекрутингу для HR",
    employerCta: "Подати заявку на пілотне партнерство",
    successModalTitle: "Заявку отримано",
    successModalMessage: "Дякуємо. Наша команда розгляне вашу заявку та зв'яжеться протягом 48 годин.",
    successModalButton: "Зрозуміло",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function HiringPage() {
  const [lang, setLang] = useLang();
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [err, setErr] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const t = translations[lang];

  const steps = [
    { n: 1, title: t.step1Title, desc: t.step1Desc, icon: ICON_PATHS.document },
    { n: 2, title: t.step2Title, desc: t.step2Desc, icon: ICON_PATHS.search },
    { n: 3, title: t.step3Title, desc: t.step3Desc, icon: ICON_PATHS.users },
    { n: 4, title: t.step4Title, desc: t.step4Desc, icon: ICON_PATHS.rocket },
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target;
    const current = (formData[name] as string[] | undefined) ?? [];
    const next = checked ? [...current, value] : current.filter((v) => v !== value);
    setFormData((prev) => ({ ...prev, [name]: next }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const email = (formData["employer-email"] as string | undefined) ?? "";
    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr(t.formErrEmail);
      return;
    }

    const payload = {
      type: "employer",
      email,
      lang,
      submittedAt: new Date().toISOString(),
      company: formData["employer-company"],
      contact: formData["employer-contact"],
      openRoles: formData["employer-roles"],
      remote: formData["employer-remote"],
      needs: formData["employer-needs"],
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
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0B2818] text-white mb-6">
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
                  <label htmlFor="employer-company" className="block text-sm font-medium text-[#0B2818] mb-2">
                    {t.employerCompany}
                  </label>
                  <input
                    id="employer-company"
                    name="employer-company"
                    type="text"
                    value={(formData["employer-company"] as string) || ""}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="employer-contact" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.employerContact}
                    </label>
                    <input
                      id="employer-contact"
                      name="employer-contact"
                      type="text"
                      value={(formData["employer-contact"] as string) || ""}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="employer-email" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.employerEmail}
                    </label>
                    <input
                      id="employer-email"
                      name="employer-email"
                      type="email"
                      value={(formData["employer-email"] as string) || ""}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      placeholder="hr@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="employer-roles" className="block text-sm font-medium text-[#0B2818] mb-2">
                    {t.employerOpenRoles}
                  </label>
                  <input
                    id="employer-roles"
                    name="employer-roles"
                    type="text"
                    value={(formData["employer-roles"] as string) || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                    placeholder="2 open customer support roles, remote-first"
                  />
                </div>

                <div>
                  <label htmlFor="employer-remote" className="block text-sm font-medium text-[#0B2818] mb-2">
                    {t.employerWorkSetup}
                  </label>
                  <input
                    id="employer-remote"
                    name="employer-remote"
                    type="text"
                    value={(formData["employer-remote"] as string) || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                    placeholder="Remote / on-site / hybrid"
                  />
                </div>

                <fieldset className="space-y-3">
                  <legend className="block text-sm font-medium text-[#0B2818]">{t.employerServices}</legend>
                  {[
                    { value: "pilot", label: t.employerServicePilot },
                    { value: "audit", label: t.employerServiceAudit },
                    { value: "workshop", label: t.employerServiceWorkshop },
                  ].map((option) => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="employer-needs"
                        value={option.value}
                        checked={((formData["employer-needs"] as string[] | undefined) ?? []).includes(option.value)}
                        onChange={handleCheckbox}
                        className="mt-1 w-5 h-5 text-[#0F7A52] border-2 border-[#D9D9DC] rounded focus:ring-[#0F7A52]"
                      />
                      <span className="text-[#3F3C3A] text-sm leading-snug">{option.label}</span>
                    </label>
                  ))}
                </fieldset>

                {err && <p className="text-sm text-[#DC2626]">{err}</p>}

                <button
                  type="submit"
                  className="inline-flex justify-center items-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0B2818] text-white font-bold hover:bg-[#0F7A52] transition-colors"
                >
                  {t.employerCta}
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
