"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import type { Lang } from "@/lib/language";

type NavLabels = {
  home: string;
  offer: string;
  plan: string;
  articles: string;
  quiz: string;
  account: string;
  login: string;
  register: string;
  logout: string;
  skip: string;
};

const labels: Record<Lang, NavLabels> = {
  en: {
    home: "Home",
    offer: "What We Offer",
    plan: "Development Plan",
    articles: "Articles",
    quiz: "Quiz",
    account: "Account",
    login: "Log in",
    register: "Register",
    logout: "Log out",
    skip: "Skip to main content",
  },
  pl: {
    home: "Strona główna",
    offer: "Co oferujemy",
    plan: "Plan rozwoju",
    articles: "Artykuły",
    quiz: "Quiz",
    account: "Konto",
    login: "Zaloguj się",
    register: "Zarejestruj się",
    logout: "Wyloguj się",
    skip: "Przejdź do treści",
  },
  ua: {
    home: "Головна",
    offer: "Що ми пропонуємо",
    plan: "План розвитку",
    articles: "Статті",
    quiz: "Тест",
    account: "Акаунт",
    login: "Увійти",
    register: "Зареєструватися",
    logout: "Вийти",
    skip: "Перейти до вмісту",
  },
};

const NAV_ITEMS: { href: string; key: keyof NavLabels }[] = [
  { href: "/", key: "home" },
  { href: "/offer", key: "offer" },
  { href: "/development-plan", key: "plan" },
  { href: "/articles", key: "articles" },
  { href: "/quiz", key: "quiz" },
];

export default function SiteHeader({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const t = labels[lang];

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#0F7A52] focus:text-white focus:rounded-lg"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D9D9DC]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Prosvasimi home">
            <Image
              src="/images/logo.png"
              alt="Prosvasimi logo"
              width={36}
              height={36}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight text-[#0B2818]">Prosvasimi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-sm font-medium" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F7A52] focus:ring-offset-2 ${
                  isActive(item.href)
                    ? "bg-[#0F7A52] text-white"
                    : "text-[#0B2818] hover:bg-[#D9D9DC]"
                }`}
              >
                {t[item.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center bg-[#D9D9DC] rounded-lg p-1 text-sm"
              role="group"
              aria-label="Language selection"
            >
              {(["en", "pl", "ua"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-3 py-1.5 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#0F7A52] focus:ring-offset-2 ${
                    lang === l
                      ? "bg-white text-[#0B2818] shadow-sm"
                      : "text-[#0F7A52] hover:text-[#0B2818]"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  aria-current={isActive("/account") ? "page" : undefined}
                  className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-medium text-[#0B2818] hover:bg-[#D9D9DC] transition-colors"
                >
                  {t.account}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex px-4 py-2 rounded-lg text-sm font-medium text-[#0F7A52] hover:bg-[#D9D9DC] transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  aria-current={isActive("/login") ? "page" : undefined}
                  className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-medium text-[#0B2818] hover:bg-[#D9D9DC] transition-colors"
                >
                  {t.login}
                </Link>
                <Link
                  href="/register"
                  aria-current={isActive("/register") ? "page" : undefined}
                  className="inline-flex px-4 py-2 rounded-lg bg-[#0F7A52] text-white text-sm font-bold hover:bg-[#0B2818] transition-colors"
                >
                  {t.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
