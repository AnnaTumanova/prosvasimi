"use client";

import React from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

const ICON_PATHS = {
  checkCircle: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  shield: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286z",
  heart: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
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
    tagline: "About Prosvasimi",
    title: "A registered foundation, built around real career outcomes.",
    intro: "Prosvasimi (FUNDACJA PROSVÁSIMI) is a registered Polish foundation. We run career coaching, workshops, and an AI-powered resume analyser, and we provide free career support for people with disabilities, chronic illnesses, and neurodivergent individuals — funded by grants and donations, not by the people we help.",
    valuesTitle: "Our Values",
    value1Title: "Practical Results",
    value1Desc: "We focus on concrete next steps and written plans, not vague advice.",
    value2Title: "Simplicity",
    value2Desc: "Clear language, simple flows, focused on real outcomes.",
    value3Title: "Trust",
    value3Desc: "Transparent pricing, experienced coaches, respectful communication.",
    accessTitle: "Accessibility & Disability Support",
    accessDesc: "As a registered foundation, our statutory goals include supporting employment and professional activation of people with disabilities, and supporting people with disabilities, chronic illnesses, and neurodivergent individuals in their professional and social development — including the growing number of veterans in Ukraine rebuilding their careers.",
    access1: "Free coaching and career support, funded by grants (including PFRON and EU funds — ESF+/FERS) and donations, not billed to the people we help",
    access2: "Built for people with disabilities, chronic illness, neurodivergence, and veterans",
    access3: "Tell us what you need when you book — disclosure is always optional",
    accessCta: "Ask About Free Support",
  },
  pl: {
    tagline: "O Prosvasimi",
    title: "Zarejestrowana fundacja, skupiona na realnych rezultatach kariery.",
    intro: "Prosvasimi (FUNDACJA PROSVÁSIMI) to zarejestrowana polska fundacja. Prowadzimy coaching kariery, warsztaty i analizator CV oparty na AI, a także zapewniamy bezpłatne wsparcie kariery dla osób z niepełnosprawnościami, chorobami przewlekłymi i neuroróżnorodnych — finansowane z grantów i darowizn, a nie przez osoby, którym pomagamy.",
    valuesTitle: "Nasze wartości",
    value1Title: "Konkretne rezultaty",
    value1Desc: "Skupiamy się na konkretnych krokach i pisemnych planach, nie na ogólnikach.",
    value2Title: "Prostota",
    value2Desc: "Jasny język, proste ścieżki, koncentracja na efektach.",
    value3Title: "Zaufanie",
    value3Desc: "Przejrzyste ceny, doświadczeni coachowie, szacunek w komunikacji.",
    accessTitle: "Dostępność i wsparcie dla osób z niepełnosprawnościami",
    accessDesc: "Jako zarejestrowana fundacja, nasze cele statutowe obejmują wspieranie zatrudnienia i aktywizacji zawodowej osób z niepełnosprawnościami oraz wspieranie osób z niepełnosprawnościami, chorobami przewlekłymi i neuroróżnorodnych w rozwoju zawodowym i społecznym — w tym rosnącej liczby weteranów z Ukrainy odbudowujących swoją karierę.",
    access1: "Bezpłatny coaching i wsparcie kariery, finansowane z grantów (w tym PFRON i funduszy UE — ESF+/FERS) oraz darowizn, nigdy nie opłacane przez osoby, którym pomagamy",
    access2: "Stworzone dla osób z niepełnosprawnościami, chorobami przewlekłymi, neuroróżnorodnych i weteranów",
    access3: "Powiedz nam, czego potrzebujesz podczas rezerwacji — ujawnienie jest zawsze opcjonalne",
    accessCta: "Zapytaj o bezpłatne wsparcie",
  },
  ua: {
    tagline: "Про Prosvasimi",
    title: "Зареєстрований фонд, орієнтований на реальні кар'єрні результати.",
    intro: "Prosvasimi (FUNDACJA PROSVÁSIMI) — зареєстрований польський фонд. Ми проводимо кар'єрний коучинг, воркшопи та аналізатор резюме на основі AI, а також надаємо безкоштовну кар'єрну підтримку людям з інвалідністю, хронічними захворюваннями та нейровідмінністю — фінансовану за рахунок грантів і пожертв, а не коштом людей, яким ми допомагаємо.",
    valuesTitle: "Наші цінності",
    value1Title: "Конкретні результати",
    value1Desc: "Ми фокусуємось на конкретних кроках і письмових планах, а не на загальних порадах.",
    value2Title: "Простота",
    value2Desc: "Зрозуміла мова, прості процеси, фокус на реальних результатах.",
    value3Title: "Довіра",
    value3Desc: "Прозорі ціни, досвідчені коучі, шанобливе спілкування.",
    accessTitle: "Доступність та підтримка людей з інвалідністю",
    accessDesc: "Як зареєстрований фонд, наші статутні цілі включають підтримку зайнятості та професійної активізації людей з інвалідністю, а також підтримку людей з інвалідністю, хронічними захворюваннями та нейровідмінністю у професійному й соціальному розвитку — зокрема зростаючої кількості ветеранів в Україні, які відбудовують свою кар'єру.",
    access1: "Безкоштовний коучинг та кар'єрна підтримка, фінансована грантами (зокрема PFRON та фондами ЄС — ESF+/FERS) і пожертвами, а не коштом людей, яким ми допомагаємо",
    access2: "Створено для людей з інвалідністю, хронічними захворюваннями, нейровідмінністю та ветеранів",
    access3: "Скажіть нам, що вам потрібно під час бронювання — розкриття інформації завжди добровільне",
    accessCta: "Запитати про безкоштовну підтримку",
  },
};

export default function AboutPage() {
  const [lang, setLang] = useLang();
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#16A97A]/40 bg-[#16A97A]/10 text-[#0F7A52] text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#16A97A] animate-pulse" />
                {t.tagline}
              </span>
              <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white">
                {t.title}
              </h1>
              <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl">
                {t.intro}
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-[#0B2818]">
              {t.valuesTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: t.value1Title, desc: t.value1Desc, icon: ICON_PATHS.checkCircle, color: "border-t-[#0F7A52]" },
                { title: t.value2Title, desc: t.value2Desc, icon: ICON_PATHS.bolt, color: "border-t-[#0B2818]" },
                { title: t.value3Title, desc: t.value3Desc, icon: ICON_PATHS.shield, color: "border-t-[#0D5C3E]" },
              ].map((value, i) => (
                <div key={i} className={`bg-[#FFFFFF] rounded-2xl p-8 border-2 border-[#D9D9DC] ${value.color} border-t-4 hover:shadow-lg transition-all`}>
                  <Icon path={value.icon} className="w-8 h-8 text-[#0B2818] mb-4" />
                  <h3 className="text-xl font-semibold text-[#0B2818]">{value.title}</h3>
                  <p className="mt-3 text-[#3F3C3A] leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accessibility & Disability Support */}
        <section className="py-20 md:py-28 bg-white border-t border-[#D9D9DC]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border-2 border-[#D9D9DC] bg-[#FFFFFF] p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0F7A52] text-white flex-shrink-0">
                <Icon path={ICON_PATHS.heart} className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-[#0B2818]">{t.accessTitle}</h2>
                <p className="mt-4 text-[#3F3C3A] leading-relaxed max-w-3xl">{t.accessDesc}</p>
                <ul className="mt-6 grid sm:grid-cols-3 gap-4">
                  {[t.access1, t.access2, t.access3].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#0B2818]">
                      <svg className="w-4 h-4 text-[#0F7A52] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#0F7A52] text-[#0F7A52] font-bold hover:bg-[#0F7A52] hover:text-white transition-colors"
                >
                  {t.accessCta}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
