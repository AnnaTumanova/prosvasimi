"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { detectBrowserLanguage, type Lang } from "@/lib/language";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    register: "Register",
    title: "Log in",
    subtitle: "Enter with your email and password.",
    email: "Email",
    password: "Password",
    passwordPlaceholder: "Your password",
    signInError: "Could not log in. Please check your email and password.",
    submitting: "Logging in...",
    submit: "Log in",
    noAccount: "No account yet?",
    createOne: "Create one",
  },
  pl: {
    register: "Zarejestruj się",
    title: "Zaloguj się",
    subtitle: "Wejdź za pomocą e-maila i hasła.",
    email: "E-mail",
    password: "Hasło",
    passwordPlaceholder: "Twoje hasło",
    signInError: "Nie udało się zalogować. Sprawdź e-mail i hasło.",
    submitting: "Logowanie...",
    submit: "Zaloguj się",
    noAccount: "Nie masz jeszcze konta?",
    createOne: "Utwórz konto",
  },
  ua: {
    register: "Зареєструватися",
    title: "Увійти",
    subtitle: "Увійдіть за допомогою e-mail і пароля.",
    email: "E-mail",
    password: "Пароль",
    passwordPlaceholder: "Ваш пароль",
    signInError: "Не вдалося увійти. Перевірте e-mail і пароль.",
    submitting: "Вхід...",
    submit: "Увійти",
    noAccount: "Ще не маєте акаунта?",
    createOne: "Створити акаунт",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const t = translations[lang];

  useEffect(() => {
    setLang(detectBrowserLanguage());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(t.signInError);
      return;
    }

    router.push("/account");
  };

  return (
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Prosvasimi" width={36} height={36} />
            <span className="font-semibold text-lg tracking-tight">Prosvasimi</span>
          </Link>
          <Link href="/register" className="px-4 py-2 rounded-lg text-sm font-medium text-[#2D6A4F] hover:bg-[#E7E5E4] transition-colors">{t.register}</Link>
        </div>
      </header>

      <main className="mx-auto max-w-md px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-[#E7E5E4] shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="mt-3 text-[#2D6A4F]">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="block text-sm font-medium mb-2">{t.email}</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="you@domain.com" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">{t.password}</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder={t.passwordPlaceholder} required />
            </label>

            {error && <p className="text-sm text-[#FF7A59]">{error}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors disabled:opacity-60">
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#2D6A4F]">
            {t.noAccount} <Link href="/register" className="font-semibold text-[#1B4332] underline">{t.createOne}</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
