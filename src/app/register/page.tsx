"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { detectBrowserLanguage, type Lang } from "@/lib/language";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    login: "Log in",
    title: "Create your account",
    subtitle: "Register with email and password, then complete your candidate profile.",
    name: "Full name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    passwordPlaceholder: "Minimum 6 characters",
    confirmPasswordPlaceholder: "Repeat password",
    passwordLengthError: "Password must be at least 6 characters.",
    passwordMatchError: "Passwords do not match.",
    signUpError: "Could not create your account. Please check your details and try again.",
    confirmationMessage: "Account created. Please check your email to confirm your account, then log in.",
    submitting: "Creating account...",
    submit: "Create account",
    already: "Already have an account?",
  },
  pl: {
    login: "Zaloguj się",
    title: "Utwórz konto",
    subtitle: "Zarejestruj się adresem e-mail i hasłem, a następnie uzupełnij profil kandydata.",
    name: "Imię i nazwisko",
    email: "E-mail",
    password: "Hasło",
    confirmPassword: "Potwierdź hasło",
    passwordPlaceholder: "Minimum 6 znaków",
    confirmPasswordPlaceholder: "Powtórz hasło",
    passwordLengthError: "Hasło musi mieć co najmniej 6 znaków.",
    passwordMatchError: "Hasła nie są takie same.",
    signUpError: "Nie udało się utworzyć konta. Sprawdź dane i spróbuj ponownie.",
    confirmationMessage: "Konto zostało utworzone. Sprawdź e-mail, aby potwierdzić konto, a następnie się zaloguj.",
    submitting: "Tworzenie konta...",
    submit: "Utwórz konto",
    already: "Masz już konto?",
  },
  ua: {
    login: "Увійти",
    title: "Створіть акаунт",
    subtitle: "Зареєструйтеся за допомогою e-mail і пароля, а потім заповніть профіль кандидата.",
    name: "Повне ім’я",
    email: "E-mail",
    password: "Пароль",
    confirmPassword: "Підтвердіть пароль",
    passwordPlaceholder: "Мінімум 6 символів",
    confirmPasswordPlaceholder: "Повторіть пароль",
    passwordLengthError: "Пароль має містити щонайменше 6 символів.",
    passwordMatchError: "Паролі не збігаються.",
    signUpError: "Не вдалося створити акаунт. Перевірте дані та спробуйте ще раз.",
    confirmationMessage: "Акаунт створено. Перевірте e-mail, щоб підтвердити акаунт, а потім увійдіть.",
    submitting: "Створення акаунта...",
    submit: "Створити акаунт",
    already: "Вже маєте акаунт?",
  },
};

export default function RegisterPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("en");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const t = translations[lang];

  useEffect(() => {
    setLang(detectBrowserLanguage());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError(t.passwordLengthError);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.passwordMatchError);
      return;
    }

    setIsSubmitting(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(t.signUpError);
      return;
    }

    if (data.session) {
      router.push("/user");
      return;
    }

    setMessage(t.confirmationMessage);
  };

  return (
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Prosvasimi" width={36} height={36} />
            <span className="font-semibold text-lg tracking-tight">Prosvasimi</span>
          </Link>
          <div className="flex items-center gap-2">
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
            <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-[#2D6A4F] hover:bg-[#E7E5E4] transition-colors">{t.login}</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-[#E7E5E4] shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="mt-3 text-[#2D6A4F]">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="block text-sm font-medium mb-2">{t.name}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="Anna Nowak" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">{t.email}</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="you@domain.com" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">{t.password}</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder={t.passwordPlaceholder} required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">{t.confirmPassword}</span>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder={t.confirmPasswordPlaceholder} required />
            </label>

            {error && <p className="text-sm text-[#FF7A59]">{error}</p>}
            {message && <p className="text-sm text-[#2D6A4F]">{message}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors disabled:opacity-60">
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#2D6A4F]">
            {t.already} <Link href="/login" className="font-semibold text-[#1B4332] underline">{t.login}</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
