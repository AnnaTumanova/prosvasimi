"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/language";

type NavLabels = {
  aiEvaluation: string;
  forCompanies: string;
  ourMission: string;
  contact: string;
  testYourAi: string;
  skip: string;
};

const labels: Record<Lang, NavLabels> = {
  en: {
    aiEvaluation: "AI Evaluation",
    forCompanies: "For Companies",
    ourMission: "Our Mission",
    contact: "Contact",
    testYourAi: "Test your AI",
    skip: "Skip to main content",
  },
  pl: {
    aiEvaluation: "AI Evaluation",
    forCompanies: "Dla firm",
    ourMission: "Nasza misja",
    contact: "Kontakt",
    testYourAi: "Przetestuj swoje AI",
    skip: "Przejdź do treści",
  },
  ua: {
    aiEvaluation: "AI Evaluation",
    forCompanies: "Для компаній",
    ourMission: "Наша місія",
    contact: "Контакти",
    testYourAi: "Перевірте свій AI",
    skip: "Перейти до вмісту",
  },
};

const NAV_ITEMS: { href: string; key: keyof Omit<NavLabels, "testYourAi" | "skip"> }[] = [
  { href: "/ai-evaluation", key: "aiEvaluation" },
  { href: "/ai-evaluation#for-companies", key: "forCompanies" },
  { href: "/about", key: "ourMission" },
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

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#0F7A52] focus:text-white focus:rounded-lg"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/[0.06]">
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

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F7A52] focus:ring-offset-2 ${
                  isActive(item.href)
                    ? "bg-[#0F7A52]/10 text-[#0F7A52]"
                    : "text-[#0B2818] hover:bg-black/[0.04]"
                }`}
              >
                {t[item.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center bg-black/[0.04] rounded-lg p-1 text-sm"
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

            <Link
              href="/ai-evaluation#lead-form"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F7A52] text-white text-sm font-semibold hover:bg-[#0B2818] transition-colors"
            >
              {t.testYourAi}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
