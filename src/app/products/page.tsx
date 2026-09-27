"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

const ICON_PATHS = {
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  sparkle: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
  arrowRight: "M13 7l5 5m0 0l-5 5m5-5H6",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    tagline: "Our Products",
    title: "Practical tools for your next career move.",
    subtitle: "From live workshops to inclusive hiring audits — pick what fits where you are today.",
    workshopsTitle: "Workshops",
    workshopsDesc: "Hands-on, live sessions on accessible job search, inclusive recruitment, and interview & negotiation confidence.",
    workshopsCta: "Explore Workshops",
    badgeSoon: "Coming Soon",
    auditTitle: "Accessibility Audit & PFRON Roadmap",
    auditDesc: "For employers: an accessibility audit and a concrete roadmap to meet disability-employment quotas, plus ongoing monitoring.",
    auditCta: "For Employers",
    badgeEmployers: "For Employers",
  },
  pl: {
    tagline: "Nasze produkty",
    title: "Praktyczne narzędzia na Twój kolejny krok w karierze.",
    subtitle: "Od warsztatów na żywo po audyty dostępności — wybierz to, co pasuje do Twojej sytuacji.",
    workshopsTitle: "Warsztaty",
    workshopsDesc: "Praktyczne sesje na żywo o dostępnym poszukiwaniu pracy, inkluzywnej rekrutacji oraz pewności siebie na rozmowach i negocjacjach.",
    workshopsCta: "Zobacz warsztaty",
    badgeSoon: "Wkrótce",
    auditTitle: "Audyt dostępności i plan działania PFRON",
    auditDesc: "Dla pracodawców: audyt dostępności i konkretny plan spełnienia wskaźnika zatrudnienia osób z niepełnosprawnościami wraz z bieżącym monitoringiem.",
    auditCta: "Dla pracodawców",
    badgeEmployers: "Dla pracodawców",
  },
  ua: {
    tagline: "Наші продукти",
    title: "Практичні інструменти для вашого наступного кроку в кар'єрі.",
    subtitle: "Від живих воркшопів до аудитів доступності — оберіть те, що підходить саме вам.",
    workshopsTitle: "Воркшопи",
    workshopsDesc: "Практичні живі сесії про доступний пошук роботи, інклюзивний рекрутинг та впевненість на співбесідах і переговорах.",
    workshopsCta: "Переглянути воркшопи",
    badgeSoon: "Незабаром",
    auditTitle: "Аудит доступності та PFRON-роадмап",
    auditDesc: "Для роботодавців: аудит доступності та конкретний план виконання квоти працевлаштування людей з інвалідністю разом із постійним моніторингом.",
    auditCta: "Для роботодавців",
    badgeEmployers: "Для роботодавців",
  },
};

export default function ProductsPage() {
  const [lang, setLang] = useLang();
  const t = translations[lang];

  const products = [
    { href: "/offer", title: t.workshopsTitle, desc: t.workshopsDesc, cta: t.workshopsCta, icon: ICON_PATHS.document, color: "bg-[#0F7A52]" },
    { href: "/cooperation", title: t.auditTitle, desc: t.auditDesc, cta: t.auditCta, icon: ICON_PATHS.document, color: "bg-[#C97A5B]", badge: t.badgeEmployers },
  ];

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-[#0B2818] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F7A52]/20 via-transparent to-transparent" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#16A97A]/40 bg-[#16A97A]/10 text-[#0F7A52] text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#16A97A] animate-pulse" />
                {t.tagline}
              </span>
              <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white">
                {t.title}
              </h1>
              <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.href}
                  className="group relative bg-white rounded-2xl border-2 border-[#D9D9DC] hover:shadow-lg hover:shadow-[#0F7A52]/10 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${product.color}`} />
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${product.color} text-white`}>
                        <Icon path={product.icon} className="w-6 h-6" />
                      </div>
                      {product.badge && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D9D9DC] text-[#0F7A52] text-xs font-bold uppercase tracking-wider">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#0B2818] tracking-tight mb-3">{product.title}</h3>
                    <p className="text-[#3F3C3A] text-sm leading-relaxed mb-8 flex-1">{product.desc}</p>
                    <Link
                      href={product.href}
                      className={`inline-flex items-center justify-center gap-2 px-5 py-3 ${product.color} text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity`}
                    >
                      {product.cta}
                      <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
