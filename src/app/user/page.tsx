"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { detectBrowserLanguage, type Lang } from "@/lib/language";

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
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/logo.png"
              alt="Prosvasimi"
              width={36}
              height={36}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight text-[#1B4332]">Prosvasimi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Link href="/offer" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navOffer}</Link>
            <Link href="/articles" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navArticles}</Link>
            <Link href="/quiz" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navQuiz}</Link>
            {user ? (
              <Link href="/account" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.account}</Link>
            ) : (
              <Link href="/login" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.login}</Link>
            )}
            <div className="flex items-center gap-1">
              {(["en", "pl", "ua"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLang(option)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors ${
                    lang === option ? "bg-[#2D6A4F] text-white" : "text-[#2D6A4F] hover:bg-[#E7E5E4]"
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
        <section className="bg-white border-b border-[#E7E5E4]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#40916C]/10 text-[#40916C] text-sm font-medium">
                {t.badge}
              </span>
              <h1 className="mt-8 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[#1B4332]">
                {t.title}
              </h1>
              <p className="mt-6 text-lg text-[#2D6A4F] leading-relaxed">
                {t.subtitle}
              </p>
              {!user && (
                <div className="mt-8 rounded-2xl border border-[#D4A574]/40 bg-[#D4A574]/10 p-5">
                  <p className="font-medium text-[#1B4332]">{t.authTitle}</p>
                  <p className="mt-2 text-sm text-[#2D6A4F]">{t.authSubtitle}</p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Link href="/register" className="inline-flex justify-center rounded-xl bg-[#2D6A4F] px-5 py-3 text-white font-medium hover:bg-[#1B4332] transition-colors">{t.register}</Link>
                    <Link href="/login" className="inline-flex justify-center rounded-xl border-2 border-[#E7E5E4] px-5 py-3 text-[#1B4332] font-medium hover:border-[#2D6A4F] transition-colors">{t.login}</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E7E5E4]">
              {status === "success" ? (
                <div className="rounded-xl bg-[#40916C]/10 text-[#1B4332] p-6 border border-[#40916C]/20">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#40916C] text-white flex items-center justify-center flex-shrink-0">✓</div>
                    <div>
                      <h2 className="text-xl font-semibold">{t.successTitle}</h2>
                      <p className="mt-2 text-[#2D6A4F]">{t.successText}</p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 inline-flex justify-center rounded-xl bg-[#2D6A4F] text-white px-5 py-3 font-medium hover:bg-[#1B4332] transition-colors"
                      >
                        {t.anotherProfile}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1B4332]">{t.details}</h2>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.fullName}</span>
                        <input value={profile.name} onChange={(e) => updateField("name", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="Anna Nowak" required />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.email}</span>
                        <input type="email" value={profile.email} onChange={(e) => updateField("email", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="you@domain.com" required />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.phone}</span>
                        <input value={profile.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="+48 123 456 789" />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.location}</span>
                        <input value={profile.location} onChange={(e) => updateField("location", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder={t.locationPlaceholder} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#1B4332]">{t.experienceQuestions}</h2>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">{t.experienceLevel}</span>
                        <select value={profile.experienceLevel} onChange={(e) => updateField("experienceLevel", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors bg-white" required>
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
                        <input value={profile.jobField} onChange={(e) => updateField("jobField", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder={t.preferredFieldPlaceholder} required />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">{t.workPreference}</span>
                        <select value={profile.workPreference} onChange={(e) => updateField("workPreference", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors bg-white" required>
                          <option value="">{t.selectPreference}</option>
                          <option value="remote">{t.remote}</option>
                          <option value="hybrid">{t.hybrid}</option>
                          <option value="onsite">{t.onsite}</option>
                          <option value="flexible">{t.flexible}</option>
                        </select>
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">{t.skills}</span>
                        <textarea value={profile.skills} onChange={(e) => updateField("skills", e.target.value)} className="min-h-32 w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder={t.skillsPlaceholder} required />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">{t.accommodations}</span>
                        <textarea value={profile.accommodations} onChange={(e) => updateField("accommodations", e.target.value)} className="min-h-28 w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder={t.accommodationsPlaceholder} />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">{t.goals}</span>
                        <textarea value={profile.goals} onChange={(e) => updateField("goals", e.target.value)} className="min-h-28 w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder={t.goalsPlaceholder} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#1B4332]">{t.pictureUpload}</h2>
                    <div className="mt-6 flex items-center gap-6">
                      <div className="relative flex-shrink-0">
                        {picturePreview ? (
                          <img
                            src={picturePreview}
                            alt="Profile preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-[#2D6A4F]"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-[#E7E5E4] flex items-center justify-center text-3xl">
                            👤
                          </div>
                        )}
                      </div>
                      <label className="flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B7C9BD] bg-[#FAFAF9] px-6 py-8 text-center cursor-pointer hover:border-[#2D6A4F] transition-colors">
                        <span className="text-3xl">🖼️</span>
                        <span className="mt-2 font-semibold text-[#1B4332]">
                          {picture ? t.changePhoto : t.uploadPicture}
                        </span>
                        <span className="mt-1 text-sm text-[#2D6A4F]">{t.pictureHint}</span>
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
                          <span className="mt-3 text-sm font-medium text-[#1B4332]">{t.selected} {picture.name}</span>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#1B4332]">{t.cvUpload}</h2>
                    <label className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B7C9BD] bg-[#FAFAF9] px-6 py-10 text-center cursor-pointer hover:border-[#2D6A4F] transition-colors">
                      <span className="text-4xl">📄</span>
                      <span className="mt-3 font-semibold text-[#1B4332]">{t.uploadCv}</span>
                      <span className="mt-1 text-sm text-[#2D6A4F]">{t.cvHint}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                        className="sr-only"
                      />
                      {cv && <span className="mt-4 text-sm font-medium text-[#1B4332]">{t.selected} {cv.name}</span>}
                    </label>
                  </div>

                  {error && <p className="text-sm text-[#FF7A59]">{error}</p>}

                  <button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === "submitting" ? t.submitting : t.submit}
                  </button>
                </form>
              )}
            </div>

            <aside className="bg-[#2D6A4F] text-white rounded-2xl p-8 sticky top-24">
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
      </main>
    </div>
  );
}
