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

type FormData = {
  name: string;
  email: string;
  location: string;
  experienceLevel: string;
  jobField: string;
  workPreference: string;
  skills: string;
  goals: string;
  resumeText: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  location: "",
  experienceLevel: "",
  jobField: "",
  workPreference: "",
  skills: "",
  goals: "",
  resumeText: "",
};

const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const translations = {
  en: {
    title: "Career Analysis",
    subtitle: "Upload your resume and answer a few questions. We'll prepare a personal career suggestion for you.",
    note: "You do not need an account to submit. To view your analysis, log in or register with the same email.",
    name: "Full name",
    email: "Email address",
    location: "Location",
    experienceLevel: "Experience level",
    selectLevel: "Select level",
    entry: "Entry level",
    junior: "Junior",
    mid: "Mid-level",
    senior: "Senior",
    careerChange: "Career change",
    jobField: "Target job field",
    jobFieldPlaceholder: "e.g. Customer support, IT, design...",
    workPreference: "Work preference",
    selectPreference: "Select preference",
    remote: "Remote",
    hybrid: "Hybrid",
    onsite: "On-site",
    flexible: "Flexible",
    skills: "Key skills and experience",
    skillsPlaceholder: "Tell us about your skills, tools, projects, studies, volunteering, or previous jobs.",
    goals: "Career goals",
    goalsPlaceholder: "What kind of change or support are you looking for?",
    resumeText: "Resume text (optional but recommended for AI analysis)",
    resumeTextPlaceholder: "Paste your resume text here so we can analyze it. You can still upload a file below.",
    cvUpload: "Or upload your CV",
    cvHint: "PDF, DOC or DOCX up to 5 MB.",
    selected: "Selected:",
    uploadCv: "Choose file",
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
    subtitle: "Prześlij CV i odpowiedz na kilka pytań. Przygotujemy dla Ciebie spersonalizowaną sugestię kariery.",
    note: "Nie potrzebujesz konta, aby przesłać dane. Aby zobaczyć analizę, zaloguj się lub zarejestruj za pomocą tego samego e-maila.",
    name: "Imię i nazwisko",
    email: "Adres e-mail",
    location: "Lokalizacja",
    experienceLevel: "Poziom doświadczenia",
    selectLevel: "Wybierz poziom",
    entry: "Początkujący",
    junior: "Junior",
    mid: "Średniozaawansowany",
    senior: "Senior",
    careerChange: "Zmiana ścieżki kariery",
    jobField: "Docelowa dziedzina",
    jobFieldPlaceholder: "np. obsługa klienta, IT, design...",
    workPreference: "Preferencje pracy",
    selectPreference: "Wybierz preferencję",
    remote: "Zdalnie",
    hybrid: "Hybrydowo",
    onsite: "Stacjonarnie",
    flexible: "Elastycznie",
    skills: "Kluczowe umiejętności i doświadczenie",
    skillsPlaceholder: "Opowiedz o swoich umiejętnościach, narzędziach, projektach, edukacji, wolontariacie lub wcześniejszej pracy.",
    goals: "Cele zawodowe",
    goalsPlaceholder: "Jakiej zmiany lub wsparcia szukasz?",
    resumeText: "Tekst CV (opcjonalnie, ale zalecane do analizy AI)",
    resumeTextPlaceholder: "Wklej tekst swojego CV, abyśmy mogli go przeanalizować. Możesz też przesłać plik poniżej.",
    cvUpload: "Lub prześlij CV",
    cvHint: "PDF, DOC lub DOCX do 5 MB.",
    selected: "Wybrano:",
    uploadCv: "Wybierz plik",
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
    subtitle: "Завантажте резюме та дайте відповіді на кілька запитань. Ми підготуємо для вас персональну пропозицію щодо кар'єри.",
    note: "Для надсилання даних не потрібен обліковий запис. Щоб переглянути аналіз, увійдіть або зареєструйтеся за тією ж електронною поштою.",
    name: "Повне ім'я",
    email: "Електронна пошта",
    location: "Локація",
    experienceLevel: "Рівень досвіду",
    selectLevel: "Оберіть рівень",
    entry: "Початковий рівень",
    junior: "Junior",
    mid: "Середній рівень",
    senior: "Senior",
    careerChange: "Зміна кар'єри",
    jobField: "Бажана сфера",
    jobFieldPlaceholder: "напр. підтримка клієнтів, IT, дизайн...",
    workPreference: "Формат роботи",
    selectPreference: "Оберіть формат",
    remote: "Віддалено",
    hybrid: "Гібридно",
    onsite: "В офісі",
    flexible: "Гнучко",
    skills: "Ключові навички та досвід",
    skillsPlaceholder: "Розкажіть про навички, інструменти, проєкти, навчання, волонтерство або попередню роботу.",
    goals: "Кар'єрні цілі",
    goalsPlaceholder: "Якої зміни чи підтримки ви шукаєте?",
    resumeText: "Текст резюме (необов'язково, але рекомендовано для AI-аналізу)",
    resumeTextPlaceholder: "Вставте текст свого резюме, щоб ми могли його проаналізувати. Також можна завантажити файл нижче.",
    cvUpload: "Або завантажте CV",
    cvHint: "PDF, DOC або DOCX до 5 МБ.",
    selected: "Вибрано:",
    uploadCv: "Оберіть файл",
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
  const [form, setForm] = useState<FormData>(initialForm);
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const t = translations[lang];

  useEffect(() => {
    setLang(detectBrowserLanguage());
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

    const data = new FormData();
    data.set("name", form.name);
    data.set("email", form.email);
    data.set("location", form.location);
    data.set("experienceLevel", form.experienceLevel);
    data.set("jobField", form.jobField);
    data.set("workPreference", form.workPreference);
    data.set("skills", form.skills);
    data.set("goals", form.goals);
    data.set("resumeText", form.resumeText);
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
            <label htmlFor="location" className="block text-sm font-medium text-[#0B2818]">{t.location}</label>
            <input id="location" name="location" value={form.location} onChange={handleChange} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-[#0B2818]">{t.experienceLevel}</label>
              <select id="experienceLevel" name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none bg-white">
                <option value="">{t.selectLevel}</option>
                <option value="entry">{t.entry}</option>
                <option value="junior">{t.junior}</option>
                <option value="mid">{t.mid}</option>
                <option value="senior">{t.senior}</option>
                <option value="career-change">{t.careerChange}</option>
              </select>
            </div>

            <div>
              <label htmlFor="workPreference" className="block text-sm font-medium text-[#0B2818]">{t.workPreference}</label>
              <select id="workPreference" name="workPreference" value={form.workPreference} onChange={handleChange} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none bg-white">
                <option value="">{t.selectPreference}</option>
                <option value="remote">{t.remote}</option>
                <option value="hybrid">{t.hybrid}</option>
                <option value="onsite">{t.onsite}</option>
                <option value="flexible">{t.flexible}</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="jobField" className="block text-sm font-medium text-[#0B2818]">{t.jobField}</label>
            <input id="jobField" name="jobField" value={form.jobField} onChange={handleChange} placeholder={t.jobFieldPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-[#0B2818]">{t.skills}</label>
            <textarea id="skills" name="skills" rows={4} value={form.skills} onChange={handleChange} placeholder={t.skillsPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
          </div>

          <div>
            <label htmlFor="goals" className="block text-sm font-medium text-[#0B2818]">{t.goals}</label>
            <textarea id="goals" name="goals" rows={4} value={form.goals} onChange={handleChange} placeholder={t.goalsPlaceholder} className="mt-2 w-full rounded-xl border-2 border-[#D9D9DC] px-4 py-3 focus:border-[#0F7A52] focus:outline-none" />
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
