"use client";

import React, { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Lang } from "@/lib/language";

const ICON_PATHS = {
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  check: "M5 13l4 4L19 7",
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
    tagline: "Cooperation",
    title: "Bring structured career coaching to your organization.",
    subtitle: "We partner with companies, NGOs, and community networks to deliver career coaching and accessibility-focused support at scale.",
    forEmpTitle: "For Organizations",
    forEmpDesc: "Bring structured career coaching to your team, community, or partner network.",
    forEmp1: "Group workshops and coaching packages",
    forEmp2: "Flexible scheduling across time zones",
    forEmp3: "Clear reporting on engagement and outcomes",
    forEmp4: "Partnership options for NGOs and community organizations",
    cta: "Start a Conversation",
  },
  pl: {
    tagline: "Współpraca",
    title: "Wprowadź ustrukturyzowany coaching kariery do swojej organizacji.",
    subtitle: "Współpracujemy z firmami, organizacjami pozarządowymi i sieciami społeczności, dostarczając coaching kariery i wsparcie w zakresie dostępności na dużą skalę.",
    forEmpTitle: "Dla organizacji",
    forEmpDesc: "Wprowadź ustrukturyzowany coaching kariery do swojego zespołu, społeczności lub sieci partnerskiej.",
    forEmp1: "Warsztaty grupowe i pakiety coachingowe",
    forEmp2: "Elastyczny harmonogram w różnych strefach czasowych",
    forEmp3: "Przejrzyste raportowanie zaangażowania i efektów",
    forEmp4: "Opcje partnerstwa dla organizacji pozarządowych i społeczności",
    cta: "Rozpocznij rozmowę",
  },
  ua: {
    tagline: "Співпраця",
    title: "Впровадьте структурований кар'єрний коучинг у своїй організації.",
    subtitle: "Ми співпрацюємо з компаніями, НГО та мережами спільнот, щоб надавати кар'єрний коучинг і підтримку доступності в широкому масштабі.",
    forEmpTitle: "Для організацій",
    forEmpDesc: "Впровадьте структурований кар'єрний коучинг у своїй команді, спільноті чи партнерській мережі.",
    forEmp1: "Групові воркшопи та коучингові пакети",
    forEmp2: "Гнучкий розклад у різних часових поясах",
    forEmp3: "Прозора звітність щодо залученості та результатів",
    forEmp4: "Партнерські умови для НГО та спільнот",
    cta: "Розпочати розмову",
  },
};

export default function CooperationPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-[#0B2818] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F7A52]/20 via-transparent to-transparent" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#16A97A]/40 bg-[#16A97A]/10 text-[#16A97A] text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#16A97A] animate-pulse" />
                {t.tagline}
              </span>
              <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white">
                {t.title}
              </h1>
              <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl">
                {t.subtitle}
              </p>
              <div className="mt-10">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-5 rounded-xl bg-white text-[#0B2818] font-bold text-lg hover:bg-[#16A97A] hover:text-white transition-colors"
                >
                  {t.cta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* For Organizations */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#D9D9DC] border-l-4 border-l-[#0B2818] max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0B2818] text-white mb-6">
                <Icon path={ICON_PATHS.building} className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B2818]">{t.forEmpTitle}</h2>
              <p className="mt-3 text-[#3F3C3A]">{t.forEmpDesc}</p>
              <ul className="mt-6 space-y-3">
                {[t.forEmp1, t.forEmp2, t.forEmp3, t.forEmp4].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#0B2818]">
                    <Icon path={ICON_PATHS.check} className="w-5 h-5 text-[#0B2818] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
