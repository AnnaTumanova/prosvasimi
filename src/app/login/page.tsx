"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { detectBrowserLanguage, type Lang } from "@/lib/language";
import SiteHeader from "@/components/SiteHeader";

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
      console.error("[login] Supabase signIn error:", signInError);
      setError(`${t.signInError} (${signInError.message})`);
      return;
    }

    router.push("/account");
  };

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content" className="mx-auto max-w-md px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border-2 border-[#D9D9DC] shadow-sm">
          <h1 className="text-4xl font-black tracking-tighter">{t.title}</h1>
          <p className="mt-3 text-[#0F7A52]">{t.subtitle}</p>

          {!isSupabaseConfigured && (
            <div className="mt-4 rounded-xl border-2 border-[#DC2626] bg-red-50 p-4 text-sm text-[#DC2626]">
              <strong>Supabase not configured.</strong> Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code>, then restart the dev server.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="block text-sm font-medium mb-2">{t.email}</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none" placeholder="you@domain.com" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">{t.password}</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none" placeholder={t.passwordPlaceholder} required />
            </label>

            {error && <p className="text-sm text-[#DC2626]">{error}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors disabled:opacity-60">
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#0F7A52]">
            {t.noAccount} <Link href="/register" className="font-semibold text-[#0B2818] underline">{t.createOne}</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
