"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/language";

type NavLabels = {
  services: string;
  forBusinesses: string;
  academy: string;
  careers: string;
  about: string;
  contact: string;
  cta: string;
  skip: string;
  menu: string;
};

const labels: Record<Lang, NavLabels> = {
  en: {
    services: "AI Services",
    forBusinesses: "For Businesses",
    academy: "AI Academy",
    careers: "Careers",
    about: "About",
    contact: "Contact",
    cta: "Book a discovery call",
    skip: "Skip to main content",
    menu: "Menu",
  },
  pl: {
    services: "Usługi AI",
    forBusinesses: "Dla firm",
    academy: "Akademia AI",
    careers: "Kariera",
    about: "O nas",
    contact: "Kontakt",
    cta: "Umów rozmowę",
    skip: "Przejdź do treści",
    menu: "Menu",
  },
  ua: {
    services: "AI-послуги",
    forBusinesses: "Для бізнесу",
    academy: "AI Академія",
    careers: "Кар'єра",
    about: "Про нас",
    contact: "Контакти",
    cta: "Записатися на дзвінок",
    skip: "Перейти до вмісту",
    menu: "Меню",
  },
};

const NAV_ITEMS: { href: string; key: keyof Omit<NavLabels, "cta" | "skip" | "menu"> }[] = [
  { href: "/services", key: "services" },
  { href: "/for-businesses", key: "forBusinesses" },
  { href: "/academy", key: "academy" },
  { href: "/careers", key: "careers" },
  { href: "/about", key: "about" },
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (path === "/services" && pathname.startsWith("/ai-evaluation")) return true;
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  const langSwitch = (
    <div className="flex items-center bg-black/[0.04] rounded-lg p-1 text-sm" role="group" aria-label="Language selection">
      {(["en", "pl", "ua"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-3 py-1.5 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#0F7A52] focus:ring-offset-2 ${
            lang === l ? "bg-white text-[#0B2818] font-semibold shadow-sm" : "text-[#0B2818] hover:bg-white/60"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#0F7A52] focus:text-white focus:rounded-lg"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="Prosvasimi home">
            <Image
              src="/images/logo.png"
              alt=""
              width={36}
              height={36}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight text-[#0B2818]">Prosvasimi</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5 text-sm font-medium" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F7A52] focus:ring-offset-2 ${
                  isActive(item.href) ? "bg-[#0F7A52]/10 text-[#0F7A52]" : "text-[#0B2818] hover:bg-black/[0.04]"
                }`}
              >
                {t[item.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">{langSwitch}</div>

            <Link
              href="/for-businesses#discovery"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F7A52] text-white text-sm font-semibold hover:bg-[#0B2818] transition-colors whitespace-nowrap"
            >
              {t.cta}
            </Link>

            <button
              type="button"
              className="xl:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#0B2818] hover:bg-black/[0.04] focus:outline-none focus:ring-2 focus:ring-[#0F7A52]"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
              {t.menu}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" className="xl:hidden border-t border-black/[0.06] bg-white" aria-label="Main navigation">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`px-3 py-3 rounded-lg font-medium ${
                    isActive(item.href) ? "bg-[#0F7A52]/10 text-[#0F7A52]" : "text-[#0B2818] hover:bg-black/[0.04]"
                  }`}
                >
                  {t[item.key]}
                </Link>
              ))}
              <Link
                href="/for-businesses#discovery"
                className="md:hidden mt-2 inline-flex justify-center px-4 py-3 rounded-full bg-[#0F7A52] text-white font-semibold"
              >
                {t.cta}
              </Link>
              <div className="sm:hidden mt-3">{langSwitch}</div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
