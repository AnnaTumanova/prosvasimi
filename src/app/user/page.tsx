"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { detectBrowserLanguage, type Lang } from "@/lib/language";

const ICON_PATHS = {
  check: "M4.5 12.75l6 6 9-13.5",
  user: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  photo: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A2.25 2.25 0 0022.5 18V6A2.25 2.25 0 0020.25 3.75H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25zm10.5-11.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

type FormStatus = "idle" | "submitting" | "success";

const MAX_PICTURE_SIZE = 3 * 1024 * 1024;
const ALLOWED_PICTURE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  experienceLevel: string;
  jobField: string;
  workPreference: string;
  skills: string;
  accommodations: string;
  goals: string;
};

const initialProfile: UserProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  experienceLevel: "",
  jobField: "",
  workPreference: "",
  skills: "",
  accommodations: "",
  goals: "",
};

const translations = {
  en: {
    navOffer: "What We Offer", navArticles: "Articles", navQuiz: "Quiz", account: "Account", login: "Log in", register: "Register",
    authRequiredError: "Please create an account or log in before submitting your profile.", emailError: "Please enter a valid email address.", submitError: "Could not submit your profile. Please try again later.", pictureTypeError: "Please upload a JPG, PNG, or WebP image.", pictureSizeError: "Photo must be under 3 MB.",
    badge: "Client intake", title: "Tell us about yourself so we can prepare for your first session.", subtitle: "Share your background, work preferences, and career goals, and optionally upload your CV so we can tailor your coaching to you.", authTitle: "Create an account before submitting your profile.", authSubtitle: "This lets you log in later with your email and password.",
    successTitle: "Your profile was submitted", successText: "Thank you. We will review your information and reach out to schedule your first session.", anotherProfile: "Register another profile",
    details: "Your details", fullName: "Full name", email: "Email", phone: "Phone", location: "Location", locationPlaceholder: "Warsaw / Remote",
    pictureUpload: "Profile photo", uploadPicture: "Upload your photo", pictureHint: "JPG, PNG or WebP up to 3 MB. Optional.", changePhoto: "Change photo",
    experienceQuestions: "Experience questions", experienceLevel: "Experience level", selectLevel: "Select level", entry: "Entry level", junior: "Junior", mid: "Mid-level", senior: "Senior", careerChange: "Career change",
    preferredField: "Preferred field", preferredFieldPlaceholder: "Customer support, IT, design...", workPreference: "Work preference", selectPreference: "Select preference", remote: "Remote", hybrid: "Hybrid", onsite: "On-site", flexible: "Flexible",
    skills: "Key skills and previous experience", skillsPlaceholder: "Tell us about your skills, tools, projects, studies, volunteering, or previous jobs.", accommodations: "Anything else we should know before your first session?", accommodationsPlaceholder: "Optional. Share only what you feel comfortable sharing.", goals: "Career goals", goalsPlaceholder: "What kind of career change or coaching support are you looking for?",
    cvUpload: "CV upload", uploadCv: "Upload your CV", cvHint: "PDF, DOC, or DOCX up to 5MB. Optional but recommended.", selected: "Selected:", submitting: "Submitting...", submit: "Submit profile",
    nextTitle: "What happens next?", step1: "1. Profile review", step1Text: "We review your background and goals.", step2: "2. Tailoring", step2Text: "We tailor your coaching sessions to your goals and experience.", step3: "3. Contact", step3Text: "We reach out to schedule your first coaching session.",
  },
  pl: {
    navOffer: "Co oferujemy", navArticles: "Artykuły", navQuiz: "Quiz", account: "Konto", login: "Zaloguj się", register: "Zarejestruj się",
    authRequiredError: "Utwórz konto lub zaloguj się przed wysłaniem profilu.", emailError: "Podaj poprawny adres e-mail.", submitError: "Nie udało się wysłać profilu. Spróbuj ponownie później.", pictureTypeError: "Prześlij zdjęcie w formacie JPG, PNG lub WebP.", pictureSizeError: "Zdjęcie musi mieć mniej niż 3 MB.",
    badge: "Wprowadzenie klienta", title: "Opowiedz nam o sobie, byśmy mogli przygotować się na Twoją pierwszą sesję.", subtitle: "Podziel się swoim doświadczeniem, preferencjami pracy i celami zawodowymi, i opcjonalnie prześlij CV, abyśmy mogli dopasować coaching do Ciebie.", authTitle: "Utwórz konto przed wysłaniem profilu.", authSubtitle: "Dzięki temu później zalogujesz się swoim e-mailem i hasłem.",
    successTitle: "Twój profil został wysłany", successText: "Dziękujemy. Przejrzymy Twoje informacje i skontaktujemy się, aby umówić Twoją pierwszą sesję.", anotherProfile: "Zarejestruj kolejny profil",
    details: "Twoje dane", fullName: "Imię i nazwisko", email: "E-mail", phone: "Telefon", location: "Lokalizacja", locationPlaceholder: "Warszawa / Zdalnie",
    pictureUpload: "Zdjęcie profilowe", uploadPicture: "Prześlij zdjęcie", pictureHint: "JPG, PNG lub WebP do 3 MB. Opcjonalne.", changePhoto: "Zmień zdjęcie",
    experienceQuestions: "Pytania o doświadczenie", experienceLevel: "Poziom doświadczenia", selectLevel: "Wybierz poziom", entry: "Początkujący", junior: "Junior", mid: "Średniozaawansowany", senior: "Senior", careerChange: "Zmiana ścieżki kariery",
    preferredField: "Preferowana dziedzina", preferredFieldPlaceholder: "Obsługa klienta, IT, design...", workPreference: "Preferencje pracy", selectPreference: "Wybierz preferencję", remote: "Zdalnie", hybrid: "Hybrydowo", onsite: "Stacjonarnie", flexible: "Elastycznie",
    skills: "Kluczowe umiejętności i wcześniejsze doświadczenie", skillsPlaceholder: "Opowiedz o swoich umiejętnościach, narzędziach, projektach, edukacji, wolontariacie lub wcześniejszej pracy.", accommodations: "Coś jeszcze, co powinniśmy wiedzieć przed pierwszą sesją?", accommodationsPlaceholder: "Opcjonalnie. Udostępnij tylko to, czym chcesz się podzielić.", goals: "Cele zawodowe", goalsPlaceholder: "Jakiej zmiany kariery lub wsparcia coachingowego szukasz?",
    cvUpload: "Przesyłanie CV", uploadCv: "Prześlij CV", cvHint: "PDF, DOC lub DOCX do 5 MB. Opcjonalne, ale zalecane.", selected: "Wybrano:", submitting: "Wysyłanie...", submit: "Wyślij profil",
    nextTitle: "Co dalej?", step1: "1. Przegląd profilu", step1Text: "Analizujemy Twoje doświadczenie i cele.", step2: "2. Dopasowanie", step2Text: "Dopasowujemy sesje coachingowe do Twoich celów i doświadczenia.", step3: "3. Kontakt", step3Text: "Skontaktujemy się, aby umówić Twoją pierwszą sesję coachingową.",
  },
  ua: {
    navOffer: "Що ми пропонуємо", navArticles: "Статті", navQuiz: "Тест", account: "Акаунт", login: "Увійти", register: "Зареєструватися",
    authRequiredError: "Будь ласка, створіть акаунт або увійдіть перед надсиланням профілю.", emailError: "Будь ласка, введіть дійсну адресу e-mail.", submitError: "Не вдалося надіслати профіль. Спробуйте пізніше.", pictureTypeError: "Будь ласка, завантажте фото у форматі JPG, PNG або WebP.", pictureSizeError: "Фото має бути менше 3 МБ.",
    badge: "Знайомство з клієнтом", title: "Розкажіть про себе, щоб ми могли підготуватися до вашої першої сесії.", subtitle: "Поділіться досвідом, робочими вподобаннями та кар'єрними цілями і за бажанням завантажте CV, щоб ми могли підлаштувати коучинг під вас.", authTitle: "Створіть акаунт перед надсиланням профілю.", authSubtitle: "Так ви зможете пізніше увійти за допомогою e-mail і пароля.",
    successTitle: "Ваш профіль надіслано", successText: "Дякуємо. Ми переглянемо вашу інформацію і зв'яжемося з вами, щоб призначити першу сесію.", anotherProfile: "Зареєструвати інший профіль",
    details: "Ваші дані", fullName: "Повне ім’я", email: "E-mail", phone: "Телефон", location: "Локація", locationPlaceholder: "Варшава / Віддалено",
    pictureUpload: "Фото профілю", uploadPicture: "Завантажте фото", pictureHint: "JPG, PNG або WebP до 3 МБ. Необов'язково.", changePhoto: "Змінити фото",
    experienceQuestions: "Питання про досвід", experienceLevel: "Рівень досвіду", selectLevel: "Оберіть рівень", entry: "Початковий рівень", junior: "Junior", mid: "Середній рівень", senior: "Senior", careerChange: "Зміна кар’єри",
    preferredField: "Бажана сфера", preferredFieldPlaceholder: "Підтримка клієнтів, IT, дизайн...", workPreference: "Формат роботи", selectPreference: "Оберіть формат", remote: "Віддалено", hybrid: "Гібридно", onsite: "В офісі", flexible: "Гнучко",
    skills: "Ключові навички та попередній досвід", skillsPlaceholder: "Розкажіть про навички, інструменти, проєкти, навчання, волонтерство або попередню роботу.", accommodations: "Щось ще, що варто знати перед першою сесією?", accommodationsPlaceholder: "Необов'язково. Діліться лише тим, чим вам комфортно.", goals: "Кар'єрні цілі", goalsPlaceholder: "Яку зміну кар'єри або підтримку коуча ви шукаєте?",
    cvUpload: "Завантаження CV", uploadCv: "Завантажте CV", cvHint: "PDF, DOC або DOCX до 5 МБ. Необов'язково, але рекомендовано.", selected: "Вибрано:", submitting: "Надсилання...", submit: "Надіслати профіль",
    nextTitle: "Що далі?", step1: "1. Перегляд профілю", step1Text: "Ми переглядаємо ваш досвід і цілі.", step2: "2. Підлаштування", step2Text: "Ми підлаштовуємо коучингові сесії під ваші цілі та досвід.", step3: "3. Контакт", step3Text: "Ми зв'яжемося з вами, щоб призначити першу коучингову сесію.",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function UserPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [cv, setCv] = useState<File | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const t = translations[lang];

  useEffect(() => {
    setLang(detectBrowserLanguage());

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user?.email) {
        updateField("email", data.user.email);
      }
    };

    loadUser();
  }, []);

  const updateField = (field: keyof UserProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError(t.authRequiredError);
      return;
    }

    if (!profile.email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(profile.email)) {
      setError(t.emailError);
      return;
    }

    if (picture) {
      if (!ALLOWED_PICTURE_TYPES.has(picture.type)) {
        setError(t.pictureTypeError);
        return;
      }
      if (picture.size > MAX_PICTURE_SIZE) {
        setError(t.pictureSizeError);
        return;
      }
    }

    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => formData.append(key, value));
    formData.append("createdAt", new Date().toISOString());
    if (cv) formData.append("cv", cv);
    if (picture) formData.append("picture", picture);

    setStatus("submitting");

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      const res = await fetch("/api/user-register", {
        method: "POST",
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        body: formData,
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("success");
      setProfile(initialProfile);
      setCv(null);
      setPicture(null);
      setPicturePreview(null);
    } catch {
      setError(t.submitError);
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D9D9DC]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/logo.png"
              alt="Prosvasimi"
              width={36}
              height={36}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight text-[#0B2818]">Prosvasimi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Link href="/offer" className="px-4 py-2 text-[#0B2818] hover:bg-[#D9D9DC] rounded-lg transition-colors">{t.navOffer}</Link>
            <Link href="/articles" className="px-4 py-2 text-[#0B2818] hover:bg-[#D9D9DC] rounded-lg transition-colors">{t.navArticles}</Link>
            <Link href="/quiz" className="px-4 py-2 text-[#0B2818] hover:bg-[#D9D9DC] rounded-lg transition-colors">{t.navQuiz}</Link>
            {user ? (
              <Link href="/account" className="px-4 py-2 text-[#0B2818] hover:bg-[#D9D9DC] rounded-lg transition-colors">{t.account}</Link>
            ) : (
              <Link href="/login" className="px-4 py-2 text-[#0B2818] hover:bg-[#D9D9DC] rounded-lg transition-colors">{t.login}</Link>
            )}
            <div className="flex items-center gap-1">
              {(["en", "pl", "ua"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLang(option)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors ${
                    lang === option ? "bg-[#0F7A52] text-white" : "text-[#0F7A52] hover:bg-[#D9D9DC]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-white border-b border-[#D9D9DC]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#16A97A]/10 text-[#16A97A] text-sm font-medium">
                {t.badge}
              </span>
              <h1 className="mt-8 text-4xl md:text-5xl font-black tracking-tighter leading-tight text-[#0B2818]">
                {t.title}
              </h1>
              <p className="mt-6 text-lg text-[#0F7A52] leading-relaxed">
                {t.subtitle}
              </p>
              {!user && (
                <div className="mt-8 rounded-2xl border border-[#16A97A]/40 bg-[#16A97A]/10 p-5">
                  <p className="font-medium text-[#0B2818]">{t.authTitle}</p>
                  <p className="mt-2 text-sm text-[#0F7A52]">{t.authSubtitle}</p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Link href="/register" className="inline-flex justify-center rounded-xl bg-[#0F7A52] px-5 py-3 text-white font-bold hover:bg-[#0B2818] transition-colors">{t.register}</Link>
                    <Link href="/login" className="inline-flex justify-center rounded-xl border-2 border-[#D9D9DC] px-5 py-3 text-[#0B2818] font-medium hover:border-[#0F7A52] transition-colors">{t.login}</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {user && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC]">
              {status === "success" ? (
                <div className="rounded-xl bg-[#16A97A]/10 text-[#0B2818] p-6 border border-[#16A97A]/20">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#16A97A] text-white flex items-center justify-center flex-shrink-0">
                      <Icon path={ICON_PATHS.check} className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{t.successTitle}</h2>
                      <p className="mt-2 text-[#0F7A52]">{t.successText}</p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 inline-flex justify-center rounded-xl bg-[#0F7A52] text-white px-5 py-3 font-bold hover:bg-[#0B2818] transition-colors"
                      >
                        {t.anotherProfile}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0B2818]">{t.details}</h2>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.fullName}</span>
                        <input value={profile.name} onChange={(e) => updateField("name", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" placeholder="Anna Nowak" required />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.email}</span>
                        <input type="email" value={profile.email} onChange={(e) => updateField("email", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" placeholder="you@domain.com" required />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.phone}</span>
                        <input value={profile.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" placeholder="+48 123 456 789" />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.location}</span>
                        <input value={profile.location} onChange={(e) => updateField("location", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" placeholder={t.locationPlaceholder} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#0B2818]">{t.experienceQuestions}</h2>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.experienceLevel}</span>
                        <select value={profile.experienceLevel} onChange={(e) => updateField("experienceLevel", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors bg-white" required>
                          <option value="">{t.selectLevel}</option>
                          <option value="entry">{t.entry}</option>
                          <option value="junior">{t.junior}</option>
                          <option value="mid">{t.mid}</option>
                          <option value="senior">{t.senior}</option>
                          <option value="career-change">{t.careerChange}</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.preferredField}</span>
                        <input value={profile.jobField} onChange={(e) => updateField("jobField", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" placeholder={t.preferredFieldPlaceholder} required />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">{t.workPreference}</span>
                        <select value={profile.workPreference} onChange={(e) => updateField("workPreference", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors bg-white" required>
                          <option value="">{t.selectPreference}</option>
                          <option value="remote">{t.remote}</option>
                          <option value="hybrid">{t.hybrid}</option>
                          <option value="onsite">{t.onsite}</option>
                          <option value="flexible">{t.flexible}</option>
                        </select>
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">{t.skills}</span>
                        <textarea value={profile.skills} onChange={(e) => updateField("skills", e.target.value)} className="min-h-32 w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" placeholder={t.skillsPlaceholder} required />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">{t.accommodations}</span>
                        <textarea value={profile.accommodations} onChange={(e) => updateField("accommodations", e.target.value)} className="min-h-28 w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" placeholder={t.accommodationsPlaceholder} />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">{t.goals}</span>
                        <textarea value={profile.goals} onChange={(e) => updateField("goals", e.target.value)} className="min-h-28 w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" placeholder={t.goalsPlaceholder} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#0B2818]">{t.pictureUpload}</h2>
                    <div className="mt-6 flex items-center gap-6">
                      <div className="relative flex-shrink-0">
                        {picturePreview ? (
                          <img
                            src={picturePreview}
                            alt="Profile preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-[#0F7A52]"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-[#D9D9DC] flex items-center justify-center">
                            <Icon path={ICON_PATHS.user} className="w-10 h-10 text-[#3F3C3A]" />
                          </div>
                        )}
                      </div>
                      <label className="flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#8FA79A] bg-[#FFFFFF] px-6 py-8 text-center cursor-pointer hover:border-[#0F7A52] transition-colors">
                        <Icon path={ICON_PATHS.photo} className="w-8 h-8 text-[#0F7A52]" />
                        <span className="mt-2 font-semibold text-[#0B2818]">
                          {picture ? t.changePhoto : t.uploadPicture}
                        </span>
                        <span className="mt-1 text-sm text-[#0F7A52]">{t.pictureHint}</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            setPicture(file);
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => setPicturePreview(ev.target?.result as string);
                              reader.readAsDataURL(file);
                            } else {
                              setPicturePreview(null);
                            }
                          }}
                          className="sr-only"
                        />
                        {picture && (
                          <span className="mt-3 text-sm font-medium text-[#0B2818]">{t.selected} {picture.name}</span>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#0B2818]">{t.cvUpload}</h2>
                    <label className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#8FA79A] bg-[#FFFFFF] px-6 py-10 text-center cursor-pointer hover:border-[#0F7A52] transition-colors">
                      <Icon path={ICON_PATHS.document} className="w-9 h-9 text-[#0F7A52]" />
                      <span className="mt-3 font-semibold text-[#0B2818]">{t.uploadCv}</span>
                      <span className="mt-1 text-sm text-[#0F7A52]">{t.cvHint}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                        className="sr-only"
                      />
                      {cv && <span className="mt-4 text-sm font-medium text-[#0B2818]">{t.selected} {cv.name}</span>}
                    </label>
                  </div>

                  {error && <p className="text-sm text-[#DC2626]">{error}</p>}

                  <button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === "submitting" ? t.submitting : t.submit}
                  </button>
                </form>
              )}
            </div>

            <aside className="bg-[#0F7A52] text-white rounded-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold">{t.nextTitle}</h2>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="font-semibold">{t.step1}</p>
                  <p className="mt-1 text-white/75">{t.step1Text}</p>
                </div>
                <div>
                  <p className="font-semibold">{t.step2}</p>
                  <p className="mt-1 text-white/75">{t.step2Text}</p>
                </div>
                <div>
                  <p className="font-semibold">{t.step3}</p>
                  <p className="mt-1 text-white/75">{t.step3Text}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
        )}
      </main>
    </div>
  );
}
