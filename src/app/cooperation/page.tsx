"use client";

import React, { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Lang } from "@/lib/language";

const ICON_PATHS = {
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  check: "M5 13l4 4L19 7",
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  users: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  chartBar: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  shield: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286z",
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
    tagline: "For Employers",
    title: "Turn your PFRON obligation into inclusive hiring that works.",
    subtitle: "We help SMEs in Poland and Ukraine meet disability-employment quotas with real hires and measurable outcomes — not just a fine paid and forgotten.",
    cta: "Start a Conversation",

    quotaTitle: "Why this matters now",
    quotaBody: "Companies with 25+ employees in Poland must reach a 6% disability-employment rate or pay a monthly levy to PFRON. Ukraine is introducing a comparable quota in 2026. Most companies treat this as a compliance cost. We turn it into a real hiring pipeline — including for the growing number of veterans and people with disabilities re-entering the workforce.",

    activitiesTitle: "What we deliver",
    activitiesSubtitle: "A structured path from audit, to hire, to ongoing compliance.",
    activity1Title: "Accessibility audit & PFRON roadmap",
    activity1Desc: "We assess your workplace and hiring process, then map a concrete path to your quota target.",
    activity2Title: "Candidate sourcing & onboarding support",
    activity2Desc: "We connect you with job-ready candidates and coach both sides through a confident, structured onboarding.",
    activity3Title: "Ongoing monitoring & reporting",
    activity3Desc: "Monthly check-ins and clear reporting you can hand straight to HR and finance.",
    activity4Title: "WCAG-aligned digital accessibility review",
    activity4Desc: "We review your careers site and internal tools against WCAG standards and flag what to fix first.",

    pricingTitle: "Pricing",
    pricingSubtitle: "Transparent, project-based pricing — scoped to your company size.",
    auditPlanTitle: "Audit & Roadmap",
    auditPlanPrice: "from 6,000 zł",
    auditPlanUnit: "one-time project",
    auditPlanDesc: "Full accessibility audit, PFRON roadmap, and a written action plan.",
    retainerPlanTitle: "Ongoing Monitoring",
    retainerPlanPrice: "from 600 zł",
    retainerPlanUnit: "per month",
    retainerPlanDesc: "Monthly check-ins, updated reporting, and support as your hiring plan progresses.",
    pricingNote: "Larger organizations: contact us for a custom scope.",

    ngoTitle: "For NGOs & community networks",
    ngoDesc: "We also partner with NGOs and community organizations to deliver career coaching and accessibility-focused support at scale.",
    ngo1: "Group workshops and coaching packages",
    ngo2: "Flexible scheduling across time zones",
    ngo3: "Clear reporting on engagement and outcomes",
    ngo4: "Partnership options for NGOs and community organizations",
  },
  pl: {
    tagline: "Dla pracodawców",
    title: "Zamień wpłatę na PFRON w rekrutację, która naprawdę działa.",
    subtitle: "Pomagamy małym i średnim firmom w Polsce i na Ukrainie spełnić wskaźnik zatrudnienia osób z niepełnosprawnościami poprzez realne zatrudnienie i mierzalne efekty — a nie tylko opłaconą i zapomnianą karę.",
    cta: "Rozpocznij rozmowę",

    quotaTitle: "Dlaczego to ważne właśnie teraz",
    quotaBody: "Firmy zatrudniające 25 i więcej pracowników w Polsce muszą osiągnąć 6% wskaźnik zatrudnienia osób z niepełnosprawnościami lub płacić comiesięczną wpłatę na PFRON. Ukraina wprowadza podobny wskaźnik w 2026 roku. Większość firm traktuje to jako koszt zgodności. My zamieniamy to w realny proces rekrutacji — także dla rosnącej liczby weteranów i osób z niepełnosprawnościami wracających na rynek pracy.",

    activitiesTitle: "Co dostarczamy",
    activitiesSubtitle: "Ustrukturyzowana droga od audytu, przez rekrutację, po stałą zgodność.",
    activity1Title: "Audyt dostępności i plan działania PFRON",
    activity1Desc: "Oceniamy Twoje miejsce pracy i proces rekrutacji, a następnie wyznaczamy konkretną ścieżkę do osiągnięcia wskaźnika.",
    activity2Title: "Pozyskiwanie kandydatów i wsparcie onboardingu",
    activity2Desc: "Łączymy Cię z gotowymi do pracy kandydatami i wspieramy obie strony w pewnym, ustrukturyzowanym wdrożeniu.",
    activity3Title: "Bieżący monitoring i raportowanie",
    activity3Desc: "Comiesięczne spotkania i przejrzyste raporty, które od razu możesz przekazać HR i finansom.",
    activity4Title: "Przegląd dostępności cyfrowej zgodny z WCAG",
    activity4Desc: "Sprawdzamy Twoją stronę karier i narzędzia wewnętrzne pod kątem WCAG i wskazujemy, co poprawić w pierwszej kolejności.",

    pricingTitle: "Cennik",
    pricingSubtitle: "Przejrzyste ceny projektowe, dopasowane do wielkości firmy.",
    auditPlanTitle: "Audyt i plan działania",
    auditPlanPrice: "od 6000 zł",
    auditPlanUnit: "projekt jednorazowy",
    auditPlanDesc: "Pełny audyt dostępności, plan działania PFRON i pisemny plan wdrożenia.",
    retainerPlanTitle: "Bieżący monitoring",
    retainerPlanPrice: "od 600 zł",
    retainerPlanUnit: "miesięcznie",
    retainerPlanDesc: "Comiesięczne spotkania, aktualizowane raporty i wsparcie w miarę postępów rekrutacji.",
    pricingNote: "Większe organizacje: skontaktuj się z nami w sprawie indywidualnej wyceny.",

    ngoTitle: "Dla organizacji pozarządowych i sieci społeczności",
    ngoDesc: "Współpracujemy również z NGO i organizacjami społecznymi, dostarczając coaching kariery i wsparcie w zakresie dostępności na dużą skalę.",
    ngo1: "Warsztaty grupowe i pakiety coachingowe",
    ngo2: "Elastyczny harmonogram w różnych strefach czasowych",
    ngo3: "Przejrzyste raportowanie zaangażowania i efektów",
    ngo4: "Opcje partnerstwa dla organizacji pozarządowych i społeczności",
  },
  ua: {
    tagline: "Для роботодавців",
    title: "Перетворіть внесок до PFRON на реальний найм, який працює.",
    subtitle: "Ми допомагаємо малому та середньому бізнесу в Польщі та Україні виконати квоту працевлаштування людей з інвалідністю через реальний найм і вимірні результати — а не просто сплачений і забутий штраф.",
    cta: "Розпочати розмову",

    quotaTitle: "Чому це важливо саме зараз",
    quotaBody: "Компанії з 25 і більше працівниками в Польщі повинні досягти 6% рівня зайнятості людей з інвалідністю або сплачувати щомісячний внесок до PFRON. Україна запроваджує подібну квоту у 2026 році. Більшість компаній сприймають це як витрати на відповідність вимогам. Ми перетворюємо це на реальний процес найму — зокрема для зростаючої кількості ветеранів та людей з інвалідністю, які повертаються на ринок праці.",

    activitiesTitle: "Що ми надаємо",
    activitiesSubtitle: "Структурований шлях від аудиту до найму та подальшої відповідності вимогам.",
    activity1Title: "Аудит доступності та PFRON-роадмап",
    activity1Desc: "Оцінюємо ваше робоче місце та процес найму, а потім вибудовуємо конкретний шлях до досягнення квоти.",
    activity2Title: "Пошук кандидатів і підтримка онбордингу",
    activity2Desc: "З'єднуємо вас із готовими до роботи кандидатами та супроводжуємо обидві сторони у впевненому, структурованому впровадженні.",
    activity3Title: "Постійний моніторинг і звітність",
    activity3Desc: "Щомісячні зустрічі та прозора звітність, яку можна одразу передати HR і фінансовому відділу.",
    activity4Title: "Огляд цифрової доступності за стандартом WCAG",
    activity4Desc: "Перевіряємо ваш кар'єрний сайт та внутрішні інструменти на відповідність WCAG і вказуємо, що виправити насамперед.",

    pricingTitle: "Ціни",
    pricingSubtitle: "Прозорі проєктні ціни, підібрані під розмір компанії.",
    auditPlanTitle: "Аудит і роадмап",
    auditPlanPrice: "від 6000 zł",
    auditPlanUnit: "разовий проєкт",
    auditPlanDesc: "Повний аудит доступності, PFRON-роадмап і письмовий план дій.",
    retainerPlanTitle: "Постійний моніторинг",
    retainerPlanPrice: "від 600 zł",
    retainerPlanUnit: "на місяць",
    retainerPlanDesc: "Щомісячні зустрічі, оновлена звітність і підтримка в міру просування найму.",
    pricingNote: "Для більших організацій: зв'яжіться з нами для індивідуальної оцінки обсягу.",

    ngoTitle: "Для НГО та мереж спільнот",
    ngoDesc: "Ми також співпрацюємо з НГО та громадськими організаціями, надаючи кар'єрний коучинг і підтримку доступності в широкому масштабі.",
    ngo1: "Групові воркшопи та коучингові пакети",
    ngo2: "Гнучкий розклад у різних часових поясах",
    ngo3: "Прозора звітність щодо залученості та результатів",
    ngo4: "Партнерські умови для НГО та спільнот",
  },
};

export default function CooperationPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  const activities = [
    { title: t.activity1Title, desc: t.activity1Desc, icon: ICON_PATHS.document },
    { title: t.activity2Title, desc: t.activity2Desc, icon: ICON_PATHS.users },
    { title: t.activity3Title, desc: t.activity3Desc, icon: ICON_PATHS.chartBar },
    { title: t.activity4Title, desc: t.activity4Desc, icon: ICON_PATHS.shield },
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

        {/* Quota context */}
        <section className="py-16 md:py-20 bg-white border-b border-[#D9D9DC]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-[#FFFFFF] border-2 border-[#D9D9DC] border-l-4 border-l-[#16A97A] p-8 md:p-12 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B2818]">{t.quotaTitle}</h2>
              <p className="mt-4 text-[#3F3C3A] leading-relaxed">{t.quotaBody}</p>
            </div>
          </div>
        </section>

        {/* What we deliver */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0B2818]">
                {t.activitiesTitle}
              </h2>
              <p className="mt-4 text-lg text-[#0F7A52]">{t.activitiesSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {activities.map((a, i) => (
                <div key={i} className="bg-[#FFFFFF] rounded-2xl p-8 border-2 border-[#D9D9DC] hover:shadow-lg transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0B2818] text-white mb-5">
                    <Icon path={a.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0B2818]">{a.title}</h3>
                  <p className="mt-3 text-[#3F3C3A] leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 md:py-28 bg-white border-t border-[#D9D9DC]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0B2818]">
                {t.pricingTitle}
              </h2>
              <p className="mt-4 text-lg text-[#0F7A52]">{t.pricingSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="rounded-2xl border-2 border-[#D9D9DC] p-8 md:p-10">
                <h3 className="text-lg font-bold text-[#0B2818]">{t.auditPlanTitle}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter text-[#0B2818]">{t.auditPlanPrice}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[#0F7A52] uppercase tracking-wide">{t.auditPlanUnit}</p>
                <p className="mt-5 text-[#3F3C3A] leading-relaxed">{t.auditPlanDesc}</p>
              </div>
              <div className="rounded-2xl border-2 border-[#0B2818] bg-[#0B2818] p-8 md:p-10">
                <h3 className="text-lg font-bold text-white">{t.retainerPlanTitle}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter text-white">{t.retainerPlanPrice}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[#16A97A] uppercase tracking-wide">{t.retainerPlanUnit}</p>
                <p className="mt-5 text-white/70 leading-relaxed">{t.retainerPlanDesc}</p>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-[#0F7A52]">{t.pricingNote}</p>
          </div>
        </section>

        {/* For NGOs */}
        <section className="py-20 md:py-28 bg-white border-t border-[#D9D9DC]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#D9D9DC] border-l-4 border-l-[#0B2818] max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0B2818] text-white mb-6">
                <Icon path={ICON_PATHS.building} className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B2818]">{t.ngoTitle}</h2>
              <p className="mt-3 text-[#3F3C3A]">{t.ngoDesc}</p>
              <ul className="mt-6 space-y-3">
                {[t.ngo1, t.ngo2, t.ngo3, t.ngo4].map((item, i) => (
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
