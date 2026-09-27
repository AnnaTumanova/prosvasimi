"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/language";

type NavLabels = {
  about: string;
  products: string;
  cooperation: string;
  contact: string;
  account: string;
  login: string;
  register: string;
  logout: string;
  skip: string;
};

const labels: Record<Lang, NavLabels> = {
  en: {
    about: "About Us",
    products: "Our Products",
    cooperation: "Cooperation",
    contact: "Contact",
    account: "Account",
    login: "Log in",
    register: "Register",
    logout: "Log out",
    skip: "Skip to main content",
  },
  pl: {
    about: "O nas",
    products: "Nasze produkty",
    cooperation: "Współpraca",
    contact: "Kontakt",
    account: "Konto",
    login: "Zaloguj się",
    register: "Zarejestruj się",
    logout: "Wyloguj się",
    skip: "Przejdź do treści",
  },
  ua: {
    about: "Про нас",
    products: "Наші продукти",
    cooperation: "Співпраця",
    contact: "Контакти",
    account: "Акаунт",
    login: "Увійти",
    register: "Зареєструватися",
    logout: "Вийти",
    skip: "Перейти до вмісту",
  },
};

const NAV_ITEMS: { href: string; key: keyof NavLabels }[] = [
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/cooperation", key: "cooperation" },
  { href: "/contact", key: "contact" },
];

export default function SiteHeader({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  const pathname = usePathname();
  const t = labels[lang];

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
                      ? "bg-white text-[#0B2818] font-semibold shadow-sm"
                      : "text-[#0B2818] hover:bg-white/60"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
