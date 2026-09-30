"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AiEvaluationLeadForm from "@/components/AiEvaluationLeadForm";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

const ICON_PATHS = {
  alertTriangle: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  language: "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m6.334-12.138a24.99 24.99 0 013.5 3.038m0 0c1.048-1.084 2.27-2.056 3.664-2.834",
  map: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z",
  shieldCheck: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z",
  beaker: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5M19.8 15.3l1.86 5.58a1.5 1.5 0 01-1.425 1.98H3.765a1.5 1.5 0 01-1.425-1.98L5 14.5",
  trendingUp: "M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22M14.25 9h6.5v6.5",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  chevronDown: "M19.5 8.25l-7.5 7.5-7.5-7.5",
  heart: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  users: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  arrowRight: "M13 7l5 5m0 0l-5 5m5-5H6",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function Page() {
  const [lang, setLang] = useLang();

  const translations: Record<Lang, Record<string, string>> = {
    en: {
      heroEyebrow: "Inclusive AI & Data Services",
      heroTitle: "Make your AI work for the people who actually use it.",
      heroSubtitle: "Human + AI evaluation that helps AI teams identify hallucinations, language issues, safety risks and other failure modes through structured human and automated evaluation.",
      heroCtaPrimary: "Test your AI",
      heroCtaSecondary: "Learn about Prosvasimi",
      stripTagline: "Human evaluation. Automated testing. Actionable insights.",

      problemTitle: "Your AI may work in English. But does it work for your local users?",
      problemBody: "AI systems can behave differently across languages, cultures and real-world use cases. A response can be fluent but incorrect. Technically correct but misleading. Safe in English but problematic in another language.",
      problem1Title: "Hallucinations",
      problem1Desc: "AI generates incorrect information.",
      problem2Title: "Language quality",
      problem2Desc: "Grammatically correct doesn't always mean natural.",
      problem3Title: "Cultural context",
      problem3Desc: "Models can misunderstand local context.",
      problem4Title: "Safety",
      problem4Desc: "AI behavior can vary across languages.",

      solutionTitle: "We test AI before your users do.",
      flowYourAi: "Your AI",
      flowScenarios: "Test scenarios",
      flowAutomated: "Automated evaluation",
      flowHuman: "Human evaluation",
      flowAnalysis: "Error analysis",
      flowReport: "AI Quality Report",

      processTitle: "From AI output to actionable insights",
      process1Title: "Define",
      process1Desc: "We understand your product, users and evaluation criteria.",
      process2Title: "Test",
      process2Desc: "We create representative test scenarios.",
      process3Title: "Evaluate",
      process3Desc: "AI-powered metrics + trained human reviewers.",
      process4Title: "Analyze",
      process4Desc: "We identify recurring failure patterns.",
      process5Title: "Report",
      process5Desc: "You receive clear, prioritized recommendations.",

      productsTitle: "Evaluation services",
      product1Title: "AI Evaluation Sprint",
      product1Desc: "For companies launching or improving an AI product.",
      product2Title: "Multilingual AI Testing",
      product2Desc: "For companies entering new markets.",
      product3Title: "Continuous AI Evaluation",
      product3Desc: "For companies continuously shipping AI.",
      productsCta: "See all evaluation services",

      missionTitle: "Technology should create opportunities, not barriers.",
      missionBody: "Prosvasimi is building professional technology careers for people with disabilities through real commercial AI and data projects. Not charity. Not simulated work. Real projects. Real skills. Real careers.",
      missionCta: "Learn about our mission",

      whyTitle: "Why Prosvasimi?",
      why1Title: "Native-language expertise",
      why1Desc: "Local speakers understand language and context beyond literal translation.",
      why2Title: "Human + AI evaluation",
      why2Desc: "We combine automated metrics with human judgment.",
      why3Title: "Fast, structured delivery",
      why3Desc: "Clear evaluation criteria, timelines and prioritized recommendations for every engagement.",
      why4Title: "Inclusive talent",
      why4Desc: "Our model creates professional technology opportunities for people with disabilities.",

      careerTitle: "We don't just create jobs. We create career paths.",
      career1: "AI Evaluator",
      career2: "Evaluation Specialist",
      career3: "Senior Specialist",
      career4: "AI Evaluation Lead",
      career5: "Project Manager",
    },
    pl: {
      heroEyebrow: "Inclusive AI & Data Services",
      heroTitle: "Spraw, by Twoje AI działało dla ludzi, którzy z niego realnie korzystają.",
      heroSubtitle: "Ewaluacja AI łącząca ludzi i automatyzację. Pomagamy zespołom AI wykrywać halucynacje, problemy językowe, zagrożenia bezpieczeństwa i inne błędy dzięki ustrukturyzowanej ewaluacji ludzkiej i automatycznej.",
      heroCtaPrimary: "Przetestuj swoje AI",
      heroCtaSecondary: "Poznaj Prosvasimi",
      stripTagline: "Ewaluacja ludzka. Testy automatyczne. Praktyczne wnioski.",

      problemTitle: "Twoje AI może działać po angielsku. Ale czy działa dla Twoich lokalnych użytkowników?",
      problemBody: "Systemy AI mogą zachowywać się inaczej w zależności od języka, kultury i realnych przypadków użycia. Odpowiedź może być płynna, ale błędna. Technicznie poprawna, ale myląca. Bezpieczna po angielsku, ale problematyczna w innym języku.",
      problem1Title: "Halucynacje",
      problem1Desc: "AI generuje nieprawdziwe informacje.",
      problem2Title: "Jakość językowa",
      problem2Desc: "Poprawność gramatyczna nie zawsze oznacza naturalność.",
      problem3Title: "Kontekst kulturowy",
      problem3Desc: "Modele mogą błędnie rozumieć lokalny kontekst.",
      problem4Title: "Bezpieczeństwo",
      problem4Desc: "Zachowanie AI może się różnić w zależności od języka.",

      solutionTitle: "Testujemy AI, zanim zrobią to Twoi użytkownicy.",
      flowYourAi: "Twoje AI",
      flowScenarios: "Scenariusze testowe",
      flowAutomated: "Ewaluacja automatyczna",
      flowHuman: "Ewaluacja ludzka",
      flowAnalysis: "Analiza błędów",
      flowReport: "AI Quality Report",

      processTitle: "Od wyniku AI do praktycznych wniosków",
      process1Title: "Define",
      process1Desc: "Poznajemy Twój produkt, użytkowników i kryteria ewaluacji.",
      process2Title: "Test",
      process2Desc: "Tworzymy reprezentatywne scenariusze testowe.",
      process3Title: "Evaluate",
      process3Desc: "Metryki oparte na AI oraz przeszkoleni recenzenci.",
      process4Title: "Analyze",
      process4Desc: "Identyfikujemy powtarzające się wzorce błędów.",
      process5Title: "Report",
      process5Desc: "Otrzymujesz jasne, uporządkowane według priorytetu rekomendacje.",

      productsTitle: "Usługi ewaluacji",
      product1Title: "AI Evaluation Sprint",
      product1Desc: "Dla firm wdrażających lub ulepszających produkt AI.",
      product2Title: "Multilingual AI Testing",
      product2Desc: "Dla firm wchodzących na nowe rynki.",
      product3Title: "Continuous AI Evaluation",
      product3Desc: "Dla firm, które stale rozwijają swoje AI.",
      productsCta: "Zobacz wszystkie usługi ewaluacji",

      missionTitle: "Technologia powinna tworzyć możliwości, a nie bariery.",
      missionBody: "Prosvasimi buduje profesjonalne kariery technologiczne dla osób z niepełnosprawnościami poprzez realne, komercyjne projekty AI i data. Nie charytatywność. Nie symulowana praca. Prawdziwe projekty. Prawdziwe umiejętności. Prawdziwe kariery.",
      missionCta: "Poznaj naszą misję",

      whyTitle: "Dlaczego Prosvasimi?",
      why1Title: "Ekspertyza językowa native speakerów",
      why1Desc: "Lokalni specjaliści rozumieją język i kontekst wykraczający poza dosłowne tłumaczenie.",
      why2Title: "Ewaluacja ludzka i AI",
      why2Desc: "Łączymy metryki automatyczne z oceną ludzką.",
      why3Title: "Szybka, ustrukturyzowana realizacja",
      why3Desc: "Jasne kryteria ewaluacji, terminy i priorytetowe rekomendacje dla każdego projektu.",
      why4Title: "Inkluzywny talent",
      why4Desc: "Nasz model tworzy profesjonalne możliwości technologiczne dla osób z niepełnosprawnościami.",

      careerTitle: "Nie tylko tworzymy miejsca pracy. Tworzymy ścieżki kariery.",
      career1: "AI Evaluator",
      career2: "Evaluation Specialist",
      career3: "Senior Specialist",
      career4: "AI Evaluation Lead",
      career5: "Project Manager",
    },
    ua: {
      heroEyebrow: "Inclusive AI & Data Services",
      heroTitle: "Зробіть так, щоб ваш AI працював для людей, які ним реально користуються.",
      heroSubtitle: "Оцінювання AI людьми та автоматично. Ми допомагаємо AI-командам виявляти галюцинації, мовні проблеми, ризики безпеки та інші збої через структуроване людське й автоматичне оцінювання.",
      heroCtaPrimary: "Перевірте свій AI",
      heroCtaSecondary: "Дізнатися про Prosvasimi",
      stripTagline: "Людське оцінювання. Автоматичне тестування. Практичні висновки.",

      problemTitle: "Ваш AI може працювати англійською. Але чи працює він для ваших локальних користувачів?",
      problemBody: "Системи AI можуть поводитися по-різному залежно від мови, культури та реальних сценаріїв використання. Відповідь може бути гладкою, але неправильною. Технічно коректною, але оманливою. Безпечною англійською, але проблемною іншою мовою.",
      problem1Title: "Галюцинації",
      problem1Desc: "AI генерує неправдиву інформацію.",
      problem2Title: "Якість мови",
      problem2Desc: "Граматична правильність не завжди означає природність.",
      problem3Title: "Культурний контекст",
      problem3Desc: "Моделі можуть неправильно розуміти локальний контекст.",
      problem4Title: "Безпека",
      problem4Desc: "Поведінка AI може відрізнятися залежно від мови.",

      solutionTitle: "Ми тестуємо AI раніше, ніж це зроблять ваші користувачі.",
      flowYourAi: "Ваш AI",
      flowScenarios: "Тестові сценарії",
      flowAutomated: "Автоматичне оцінювання",
      flowHuman: "Людське оцінювання",
      flowAnalysis: "Аналіз помилок",
      flowReport: "AI Quality Report",

      processTitle: "Від результату AI до практичних висновків",
      process1Title: "Define",
      process1Desc: "Ми вивчаємо ваш продукт, користувачів і критерії оцінювання.",
      process2Title: "Test",
      process2Desc: "Створюємо репрезентативні тестові сценарії.",
      process3Title: "Evaluate",
      process3Desc: "Метрики на основі AI та навчені рецензенти.",
      process4Title: "Analyze",
      process4Desc: "Виявляємо повторювані патерни збоїв.",
      process5Title: "Report",
      process5Desc: "Ви отримуєте чіткі, пріоритизовані рекомендації.",

      productsTitle: "Послуги оцінювання",
      product1Title: "AI Evaluation Sprint",
      product1Desc: "Для компаній, що запускають або покращують AI-продукт.",
      product2Title: "Multilingual AI Testing",
      product2Desc: "Для компаній, що виходять на нові ринки.",
      product3Title: "Continuous AI Evaluation",
      product3Desc: "Для компаній, які постійно розвивають свій AI.",
      productsCta: "Переглянути всі послуги оцінювання",

      missionTitle: "Технології мають створювати можливості, а не бар'єри.",
      missionBody: "Prosvasimi будує професійні технологічні кар'єри для людей з інвалідністю через реальні комерційні AI- та data-проєкти. Не благодійність. Не симульована робота. Реальні проєкти. Реальні навички. Реальні кар'єри.",
      missionCta: "Дізнатися про нашу місію",

      whyTitle: "Чому Prosvasimi?",
      why1Title: "Експертиза носіїв мови",
      why1Desc: "Локальні фахівці розуміють мову та контекст глибше за дослівний переклад.",
      why2Title: "Людське та AI-оцінювання",
      why2Desc: "Ми поєднуємо автоматичні метрики з людською оцінкою.",
      why3Title: "Швидке та структуроване виконання",
      why3Desc: "Чіткі критерії оцінювання, терміни та пріоритизовані рекомендації для кожного проєкту.",
      why4Title: "Інклюзивні таланти",
      why4Desc: "Наша модель створює професійні технологічні можливості для людей з інвалідністю.",

      careerTitle: "Ми не просто створюємо робочі місця. Ми створюємо кар'єрні шляхи.",
      career1: "AI Evaluator",
      career2: "Evaluation Specialist",
      career3: "Senior Specialist",
      career4: "AI Evaluation Lead",
      career5: "Project Manager",
    },
  };

  const t = translations[lang];

  const problems = [
    { icon: ICON_PATHS.alertTriangle, title: t.problem1Title, desc: t.problem1Desc },
    { icon: ICON_PATHS.language, title: t.problem2Title, desc: t.problem2Desc },
    { icon: ICON_PATHS.map, title: t.problem3Title, desc: t.problem3Desc },
    { icon: ICON_PATHS.shieldCheck, title: t.problem4Title, desc: t.problem4Desc },
  ];

  const process = [
    { n: "01", title: t.process1Title, desc: t.process1Desc, icon: ICON_PATHS.target },
    { n: "02", title: t.process2Title, desc: t.process2Desc, icon: ICON_PATHS.beaker },
    { n: "03", title: t.process3Title, desc: t.process3Desc, icon: ICON_PATHS.trendingUp },
    { n: "04", title: t.process4Title, desc: t.process4Desc, icon: ICON_PATHS.search },
    { n: "05", title: t.process5Title, desc: t.process5Desc, icon: ICON_PATHS.document },
  ];

  const products = [
    { id: "sprint", title: t.product1Title, desc: t.product1Desc },
    { id: "multilingual", title: t.product2Title, desc: t.product2Desc },
    { id: "continuous", title: t.product3Title, desc: t.product3Desc },
  ];

  const whyItems = [
    { icon: ICON_PATHS.language, title: t.why1Title, desc: t.why1Desc },
    { icon: ICON_PATHS.users, title: t.why2Title, desc: t.why2Desc },
    { icon: ICON_PATHS.bolt, title: t.why3Title, desc: t.why3Desc },
    { icon: ICON_PATHS.heart, title: t.why4Title, desc: t.why4Desc },
  ];

  const careerSteps = [t.career1, t.career2, t.career3, t.career4, t.career5];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0B2818]">
          <div className="pointer-events-none absolute -top-40 -left-24 w-[34rem] h-[34rem] rounded-full bg-[#16A97A]/25 blur-[120px]" aria-hidden="true" />
          <div className="pointer-events-none absolute top-10 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#0F7A52]/30 blur-[110px]" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-36 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/85 text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
                {t.heroEyebrow}
              </span>

              <h1 className="mt-8 text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-tight leading-[1.15] sm:leading-[1.08] text-white break-words">
                {t.heroTitle}
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl">
                {t.heroSubtitle}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="#lead-form"
                  className="inline-flex justify-center items-center gap-2 px-7 py-4 rounded-full bg-[#16A97A] text-white font-semibold hover:bg-[#12946a] transition-colors shadow-[0_8px_30px_rgba(22,169,122,0.35)]"
                >
                  {t.heroCtaPrimary}
                </Link>
                <Link
                  href="/about"
                  className="inline-flex justify-center items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  {t.heroCtaSecondary}
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-sm">
                <span className="text-white/60">{t.stripTagline}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.problemTitle}</h2>
              <p className="mt-5 text-lg text-[#3F3C3A] leading-relaxed">{t.problemBody}</p>
            </div>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {problems.map((p, i) => (
                <div key={i} className="rounded-2xl border border-black/[0.06] p-6 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="w-10 h-10 rounded-lg bg-[#DC2626]/10 flex items-center justify-center mb-4">
                    <Icon path={p.icon} className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0B2818]">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-[#3F3C3A] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-24 md:py-32 bg-[#FAFAF9]">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16 text-[#0B2818]">
              {t.solutionTitle}
            </h2>

            <div className="flex flex-col items-center">
              <div className="w-full max-w-sm rounded-2xl border border-black/[0.06] bg-white px-6 py-4 text-center font-semibold text-[#0B2818] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {t.flowYourAi}
              </div>
              <Icon path={ICON_PATHS.chevronDown} className="w-5 h-5 text-[#0F7A52] my-3" />
              <div className="w-full max-w-sm rounded-2xl border border-black/[0.06] bg-white px-6 py-4 text-center font-semibold text-[#0B2818] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {t.flowScenarios}
              </div>
              <Icon path={ICON_PATHS.chevronDown} className="w-5 h-5 text-[#0F7A52] my-3" />

              <div className="grid sm:grid-cols-2 gap-4 w-full max-w-xl">
                <div className="rounded-2xl border border-[#0F7A52]/20 bg-[#0F7A52]/5 px-6 py-4 text-center font-semibold text-[#0B2818]">
                  {t.flowAutomated}
                </div>
                <div className="rounded-2xl border border-[#0F7A52]/20 bg-[#0F7A52]/5 px-6 py-4 text-center font-semibold text-[#0B2818]">
                  {t.flowHuman}
                </div>
              </div>
              <Icon path={ICON_PATHS.chevronDown} className="w-5 h-5 text-[#0F7A52] my-3" />

              <div className="w-full max-w-sm rounded-2xl border border-black/[0.06] bg-white px-6 py-4 text-center font-semibold text-[#0B2818] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {t.flowAnalysis}
              </div>
              <Icon path={ICON_PATHS.chevronDown} className="w-5 h-5 text-[#0F7A52] my-3" />

              <div className="w-full max-w-sm rounded-2xl bg-[#0B2818] text-white px-6 py-4 text-center font-semibold">
                {t.flowReport}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="relative overflow-hidden py-24 md:py-32 bg-[#0B2818] text-white">
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-[#0F7A52]/25 blur-[120px]" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 relative">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16">
              {t.processTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {process.map((step) => (
                <div key={step.n}>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/5 mb-5">
                    <Icon path={step.icon} className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs font-semibold text-white/40">{step.n}</div>
                  <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-white/60 text-[15px] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products teaser */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16 text-[#0B2818]">
              {t.productsTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/ai-evaluation#${p.id}`}
                  className="group bg-white rounded-2xl p-7 border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(11,40,24,0.10)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-[#0B2818]">{p.title}</h3>
                  <p className="mt-2 text-sm text-[#3F3C3A] leading-relaxed flex-1">{p.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F7A52]">
                    {t.productsCta}
                    <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Social Impact */}
        <section className="py-24 md:py-32 bg-[#FAFAF9]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.missionTitle}</h2>
            <p className="mt-6 text-lg text-[#3F3C3A] leading-relaxed">{t.missionBody}</p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F7A52] hover:text-[#0B2818] transition-colors"
            >
              {t.missionCta}
              <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Why Prosvasimi */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16 text-[#0B2818]">
              {t.whyTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {whyItems.map((item, i) => (
                <div key={i}>
                  <div className="w-11 h-11 rounded-xl bg-[#0F7A52]/10 flex items-center justify-center mb-5">
                    <Icon path={item.icon} className="w-5 h-5 text-[#0F7A52]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0B2818]">{item.title}</h3>
                  <p className="mt-2 text-[15px] text-[#3F3C3A] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Path */}
        <section className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818] max-w-2xl mx-auto">
              {t.careerTitle}
            </h2>
            <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
              {careerSteps.map((step, i) => (
                <React.Fragment key={step}>
                  <div className="px-5 py-3 rounded-full border border-black/[0.08] bg-white text-sm font-semibold text-[#0B2818] whitespace-nowrap">
                    {step}
                  </div>
                  {i < careerSteps.length - 1 && (
                    <Icon
                      path={ICON_PATHS.chevronDown}
                      className="w-4 h-4 text-[#0F7A52] rotate-0 md:-rotate-90 flex-shrink-0"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <AiEvaluationLeadForm lang={lang} />
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
