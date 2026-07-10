"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { detectBrowserLanguage, type Lang } from "@/lib/language";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    logout: "Log out",
    loading: "Loading your account...",
    signedIn: "Signed in",
    title: "Welcome to your account",
    signedInAs: "You are signed in as",
    completeProfile: "Complete your client profile",
    browseJobs: "See what we offer",
  },
  pl: {
    logout: "Wyloguj się",
    loading: "Ładowanie konta...",
    signedIn: "Zalogowano",
    title: "Witaj na swoim koncie",
    signedInAs: "Jesteś zalogowany jako",
    completeProfile: "Uzupełnij profil klienta",
    browseJobs: "Zobacz co oferujemy",
  },
  ua: {
    logout: "Вийти",
    loading: "Завантаження акаунта...",
    signedIn: "Ви увійшли",
    title: "Ласкаво просимо до вашого акаунта",
    signedInAs: "Ви увійшли як",
    completeProfile: "Заповнити профіль клієнта",
    browseJobs: "Переглянути наші пропозиції",
  },
};

export default function AccountPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("en");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    setLang(detectBrowserLanguage());

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoading(false);

      if (!data.user) {
        router.push("/login");
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <header className="bg-white border-b border-[#D9D9DC]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Prosvasimi" width={36} height={36} />
            <span className="font-semibold text-lg tracking-tight">Prosvasimi</span>
          </Link>
          <div className="flex items-center gap-2">
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
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-medium text-[#0F7A52] hover:bg-[#D9D9DC] transition-colors">{t.logout}</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] shadow-sm">
          {isLoading ? (
            <p className="text-[#0F7A52]">{t.loading}</p>
          ) : user ? (
            <>
              <span className="inline-flex px-4 py-2 rounded-lg bg-[#16A97A]/10 text-[#16A97A] text-sm font-medium">{t.signedIn}</span>
              <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tighter">{t.title}</h1>
              <p className="mt-4 text-[#0F7A52]">{t.signedInAs} {user.email}.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/user" className="inline-flex justify-center px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors">{t.completeProfile}</Link>
                <Link href="/offer" className="inline-flex justify-center px-6 py-4 rounded-xl border-2 border-[#D9D9DC] text-[#0B2818] font-medium hover:border-[#0F7A52] transition-colors">{t.browseJobs}</Link>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
