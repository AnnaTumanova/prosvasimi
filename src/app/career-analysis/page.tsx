"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { detectBrowserLanguage, type Lang } from "@/lib/language";
import SiteHeader from "@/components/SiteHeader";

const ICON_PATHS = {
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  check: "M4.5 12.75l6 6 9-13.5",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

type FormStatus = "idle" | "submitting" | "success";

type PreferenceFields = {
  energizers: string;
  talents: string;
  environment: string;
  learning: string;
  motivation: string;
  support: string;
};

type CareerFormData = {
  name: string;
  email: string;
  resumeText: string;
  preferences: PreferenceFields;
};

const initialForm: CareerFormData = {
  name: "",
  email: "",
  resumeText: "",
  preferences: {
    energizers: "",
    talents: "",
    environment: "",
    learning: "",
    motivation: "",
    support: "",
  },
};

const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const translations = {
  en: {
    title: "Career Analysis",
    subtitle: "Upload your CV and share what drives you. We'll analyze your resume and personality to suggest career paths.",
    note: "You do not need an account to submit. To view your analysis, log in or register with the same email.",
    name: "Full name",
    email: "Email address",
    resumeText: "Paste your resume text here for AI analysis",
    resumeTextPlaceholder: "Copy and paste the text from your CV or resume...",
    cvUpload: "Or upload your CV",
    cvHint: "PDF, DOC or DOCX up to 5 MB.",
    selected: "Selected:",
    uploadCv: "Choose file",
    prefEnergizers: "What tasks make you lose track of time?",
    prefTalents: "What are your strongest natural talents or strengths?",
    prefEnvironment: "What kind of work environment helps you do your best?",
    prefLearning: "How do you prefer to learn new things?",
    prefMotivation: "What motivates you to do your best work?",
    prefSupport: "What support or accommodations help you thrive?",
    prefPlaceholder: "Share as much or as little as you like...",
    submit: "Get my career analysis",
    submitting: "Analyzing...",
    emailError: "Please enter a valid email address.",
    inputError: "Please upload a CV or paste your resume text.",
    cvTypeError: "Please upload a PDF, DOC, or DOCX file.",
    cvSizeError: "CV must be under 5 MB.",
    submitError: "Could not submit. Please try again later.",
    successTitle: "Thank you! Your analysis is ready.",
    successText: "To view your personalized career suggestion, create an account or log in with the same email you just used.",
    register: "Create account",
    login: "Log in",
  },
  pl: {
    title: "Analiza kariery",
    subtitle: "Prześlij CV i opisz, co Cię napędza. Przeanalizujemy Twoje CV oraz osobowość, by zaproponować ścieżki kariery.",
    note: "Nie potrzebujesz konta, aby przesłać dane. Aby zobaczyć analizę, zaloguj się lub zarejestruj za pomocą tego samego e-maila.",
    name: "Imię i nazwisko",
    email: "Adres e-mail",
    resumeText: "Wklej tutaj tekst swojego CV do analizy AI",
    resumeTextPlaceholder: "Skopiuj i wklej tekst ze swojego CV...",
    cvUpload: "Lub prześlij CV",
    cvHint: "PDF, DOC lub DOCX do 5 MB.",
    selected: "Wybrano:",
    uploadCv: "Wybierz plik",
    prefEnergizers: "Jakie zadania sprawiają, że tracisz poczucie czasu?",
    prefTalents: "Jakie są Twoje najmocniejsze naturalne talenty lub mocne strony?",
    prefEnvironment: "Jakie środowisko pracy pomaga Ci dawać z siebie najwięcej?",
    prefLearning: "W jaki sposób najlepiej uczysz się nowych rzeczy?",
    prefMotivation: "Co motywuje Cię do dawania z siebie wszystkiego w pracy?",
    prefSupport: "Jakie wsparcie lub ułatwienia pomagają Ci się rozwijać?",
    prefPlaceholder: "Podziel się tym, czym chcesz...",
    submit: "Otrzymaj analizę kariery",
    submitting: "Analizowanie...",
    emailError: "Podaj poprawny adres e-mail.",
    inputError: "Prześlij CV lub wklej tekst CV.",
    cvTypeError: "Prześlij plik PDF, DOC lub DOCX.",
    cvSizeError: "CV musi mieć mniej niż 5 MB.",
    submitError: "Nie udało się przesłać. Spróbuj ponownie później.",
    successTitle: "Dziękujemy! Twoja analiza jest gotowa.",
    successText: "Aby zobaczyć spersonalizowaną sugestię kariery, załóż konto lub zaloguj się tym samym adresem e-mail, który podałeś.",
    register: "Załóż konto",
    login: "Zaloguj się",
  },
  ua: {
    title: "Аналіз кар'єри",
    subtitle: "Завантажте CV та розкажіть, що вас мотивує. Ми проаналізуємо ваше резюме та особистість, щоб запропонувати кар'єрні шляхи.",
    note: "Для надсилання даних не потрібен обліковий запис. Щоб переглянути аналіз, увійдіть або зареєструйтеся за тією ж електронною поштою.",
    name: "Повне ім'я",
    email: "Електронна пошта",
    resumeText: "Вставте текст свого резюме сюди для AI-аналізу",
    resumeTextPlaceholder: "Скопіюйте та вставте текст із свого CV...",
    cvUpload: "Або завантажте CV",
    cvHint: "PDF, DOC або DOCX до 5 МБ.",
    selected: "Вибрано:",
    uploadCv: "Оберіть файл",
    prefEnergizers: "Які завдання змушують вас втрачати відчуття часу?",
    prefTalents: "Які ваші найсильніші природні таланти чи сильні сторони?",
    prefEnvironment: "Яке робоче середовище допомагає вам працювати найкраще?",
    prefLearning: "Як ви найкраще засвоюєте нове?",
    prefMotivation: "Що мотивує вас викладатися на роботі?",
    prefSupport: "Яка підтримка чи адаптація допомагає вам розвиватися?",
    prefPlaceholder: "Поділіться тим, чим хочете...",
    submit: "Отримати аналіз кар'єри",
    submitting: "Аналіз...",
    emailError: "Будь ласка, введіть дійсну адресу e-mail.",
    inputError: "Будь ласка, завантажте CV або вставте текст резюме.",
    cvTypeError: "Будь ласка, завантажте файл PDF, DOC або DOCX.",
    cvSizeError: "CV має бути менше 5 МБ.",
    submitError: "Не вдалося надіслати. Спробуйте пізніше.",
    successTitle: "Дякуємо! Ваш аналіз готовий.",
    successText: "Щоб переглянути персональну пропозицію щодо кар'єри, створіть обліковий запис або увійдіть за тією ж електронною поштою, яку ви щойно вказали.",
    register: "Створити обліковий запис",
    login: "Увійти",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function CareerAnalysisPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [form, setForm] = useState<CareerFormData>(initialForm);
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const t = translations[lang];

  useEffect(() => {
    setLang(detectBrowserLanguage());
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePrefChange(key: keyof PreferenceFields, value: string) {
    setForm((prev) => ({ ...prev, preferences: { ...prev.preferences, [key]: value } }));
  }

  function handleCvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setError("");
    if (!file) {
      setCv(null);
      return;
    }
    if (!ALLOWED_CV_TYPES.has(file.type)) {
      setError(t.cvTypeError);
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError(t.cvSizeError);
      e.target.value = "";
      return;
    }
    setCv(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t.emailError);
      return;
    }

    if (!cv && !form.resumeText.trim()) {
      setError(t.inputError);
      return;
    }

    setStatus("submitting");

    const preferenceString = [
      `${t.prefEnergizers}\n${form.preferences.energizers}`,
      `${t.prefTalents}\n${form.preferences.talents}`,
      `${t.prefEnvironment}\n${form.preferences.environment}`,
      `${t.prefLearning}\n${form.preferences.learning}`,
      `${t.prefMotivation}\n${form.preferences.motivation}`,
      `${t.prefSupport}\n${form.preferences.support}`,
    ].join("\n\n");

    const data = new FormData();
    data.set("name", form.name);
    data.set("email", form.email);
    data.set("resumeText", form.resumeText);
    data.set("preferences", preferenceString);
    if (cv) data.set("cv", cv);

    try {
      const res = await fetch("/api/career-analysis", { method: "POST", body: data });
      const result = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(result.error ?? t.submitError);
        setStatus("idle");
        return;
      }

      setSubmittedEmail(form.email);
      setStatus("success");
    } catch {
      setError(t.submitError);
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
        <SiteHeader lang={lang} setLang={setLang} />
        <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
          <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] shadow-sm text-center">
            <div className="mx-auto w-16 h-16 bg-[#16A97A]/10 rounded-full flex items-center justify-center mb-6">
              <Icon path={ICON_PATHS.check} className="w-8 h-8 text-[#16A97A]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">{t.successTitle}</h1>
            <p className="mt-4 text-[#0F7A52]">{t.successText}</p>
            <p className="mt-2 text-sm text-[#3F3C3A]">{submittedEmail}</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/register?email=${encodeURIComponent(submittedEmail)}`}
                className="inline-flex justify-center px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors"
              >
                {t.register}
              </Link>
              <Link
                href={`/login?email=${encodeURIComponent(submittedEmail)}`}
                className="inline-flex justify-center px-6 py-4 rounded-xl border-2 border-[#D9D9DC] text-[#0B2818] font-medium hover:border-[#0F7A52] transition-colors"
              >
                {t.login}
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />
      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{t.title}</h1>
          <p className="mt-4 text-lg text-[#0F7A52]">{t.subtitle}</p>
          <p className="mt-2 text-sm text-[#3F3C3A]">{t.note}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] shadow-sm space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#0B2818]">{t.name}</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0B2818]">{t.email}</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="resumeText" className="block text-sm font-medium text-[#0B2818]">{t.resumeText}</label>
            <textarea id="resumeText" name="resumeText" rows={6} value={form.resumeText} onChange={handleChange} placeholder={t.resumeTextPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B2818]">{t.cvUpload}</label>
            <p className="text-sm text-[#3F3C3A]">{t.cvHint}</p>
            <label className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#D9D9DC] text-[#0F7A52] font-medium hover:border-[#0F7A52] cursor-pointer transition-colors">
              <Icon path={ICON_PATHS.document} className="w-5 h-5" />
              {t.uploadCv}
              <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleCvChange} className="sr-only" />
            </label>
            {cv && <p className="mt-2 text-sm text-[#0F7A52]">{t.selected} {cv.name}</p>}
          </div>

          <div className="pt-4 border-t border-[#D9D9DC]">
            <h2 className="text-lg font-bold text-[#0B2818]">Your preferences & talents</h2>
          </div>

          <div>
            <label htmlFor="energizers" className="block text-sm font-medium text-[#0B2818]">{t.prefEnergizers}</label>
            <textarea id="energizers" rows={3} value={form.preferences.energizers} onChange={(e) => handlePrefChange("energizers", e.target.value)} placeholder={t.prefPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="talents" className="block text-sm font-medium text-[#0B2818]">{t.prefTalents}</label>
            <textarea id="talents" rows={3} value={form.preferences.talents} onChange={(e) => handlePrefChange("talents", e.target.value)} placeholder={t.prefPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="environment" className="block text-sm font-medium text-[#0B2818]">{t.prefEnvironment}</label>
            <textarea id="environment" rows={3} value={form.preferences.environment} onChange={(e) => handlePrefChange("environment", e.target.value)} placeholder={t.prefPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="learning" className="block text-sm font-medium text-[#0B2818]">{t.prefLearning}</label>
            <textarea id="learning" rows={3} value={form.preferences.learning} onChange={(e) => handlePrefChange("learning", e.target.value)} placeholder={t.prefPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-[#0B2818]">{t.prefMotivation}</label>
            <textarea id="motivation" rows={3} value={form.preferences.motivation} onChange={(e) => handlePrefChange("motivation", e.target.value)} placeholder={t.prefPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="support" className="block text-sm font-medium text-[#0B2818]">{t.prefSupport}</label>
            <textarea id="support" rows={3} value={form.preferences.support} onChange={(e) => handlePrefChange("support", e.target.value)} placeholder={t.prefPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          {error && <p className="rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors disabled:opacity-60"
          >
            {status === "submitting" ? t.submitting : t.submit}
          </button>
        </form>
      </main>
    </div>
  );
}
