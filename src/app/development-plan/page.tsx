"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { detectBrowserLanguage, type Lang } from "@/lib/language";
import SiteHeader from "@/components/SiteHeader";

const ICON_PATHS = {
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z",
  map: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z",
  rocket: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  check: "M4.5 12.75l6 6 9-13.5",
  chart: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  book: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  compass: "M12 21a9 9 0 100-18 9 9 0 000 18zm3.75-11.25l-1.5 4.5-4.5 1.5 1.5-4.5 4.5-1.5z",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

const translations = {
  en: {
    navOffer: "What We Offer", navArticles: "Articles", navQuiz: "Quiz", navRegister: "Register",
    badge: "Product",
    title: "Your Self-Development Plan",
    subtitle: "A personalized roadmap built on your skills that shows exactly how to upgrade to your next career step.",
    ctaPrimary: "Build my plan",
    ctaSecondary: "Take the skills quiz",
    introTitle: "What it is",
    introText: "The Self-Development Plan turns a vague ambition into a clear, step-by-step path. We map the skills you already have, compare them to the role you want next, and give you an ordered set of actions to close the gap — with milestones, resources, and check-ins so progress never stalls.",
    howTitle: "How it works",
    how1Title: "Map your skills",
    how1Desc: "Complete a guided assessment of your experience, strengths, and interests.",
    how2Title: "Spot the gaps",
    how2Desc: "We compare your profile to your target role and surface the skills that matter most.",
    how3Title: "Get your roadmap",
    how3Desc: "Receive a prioritized plan with milestones, timelines, and curated learning resources.",
    how4Title: "Take the next step",
    how4Desc: "Work through milestones with check-ins and coaching support until you land the upgrade.",
    includedTitle: "What's included",
    inc1Title: "Skills assessment", inc1Desc: "A structured review of your current abilities and experience.",
    inc2Title: "Gap analysis", inc2Desc: "A clear picture of what stands between you and your next role.",
    inc3Title: "Milestone roadmap", inc3Desc: "Prioritized, time-boxed steps you can actually follow.",
    inc4Title: "Curated resources", inc4Desc: "Courses, reading, and practice matched to each milestone.",
    inc5Title: "Progress check-ins", inc5Desc: "Regular reviews to keep momentum and adjust the plan.",
    inc6Title: "Career-step guidance", inc6Desc: "Advice on positioning, applications, and interviews for the level up.",
    forTitle: "Who it's for",
    for1: "People ready to move from their current role to the next level",
    for2: "Career changers who need a concrete, ordered path",
    for3: "Anyone rebuilding momentum after a break or a setback",
    for4: "People with disabilities and neurodivergent individuals who want a plan that fits their needs",
    finalTitle: "Ready to plan your next step?",
    finalText: "Create your account and we'll help you build a development plan around your skills and goals.",
    finalCta: "Get started",
    footerHome: "Home",
  },
  pl: {
    navOffer: "Co oferujemy", navArticles: "Artykuły", navQuiz: "Quiz", navRegister: "Zarejestruj się",
    badge: "Produkt",
    title: "Twój plan rozwoju",
    subtitle: "Spersonalizowana mapa oparta na Twoich umiejętnościach, która pokazuje dokładnie, jak awansować na kolejny etap kariery.",
    ctaPrimary: "Stwórz mój plan",
    ctaSecondary: "Rozwiąż quiz umiejętności",
    introTitle: "Co to jest",
    introText: "Plan rozwoju zamienia niejasne ambicje w klarowną ścieżkę krok po kroku. Mapujemy umiejętności, które już masz, porównujemy je z rolą, której pragniesz, i dajemy uporządkowany zestaw działań, by wypełnić lukę — z kamieniami milowymi, zasobami i przeglądami, aby postęp nigdy nie ustawał.",
    howTitle: "Jak to działa",
    how1Title: "Zmapuj umiejętności",
    how1Desc: "Wykonaj prowadzoną ocenę swojego doświadczenia, mocnych stron i zainteresowań.",
    how2Title: "Znajdź luki",
    how2Desc: "Porównujemy Twój profil z docelową rolą i wskazujemy najważniejsze umiejętności.",
    how3Title: "Otrzymaj mapę",
    how3Desc: "Otrzymasz plan z priorytetami, kamieniami milowymi, harmonogramem i dobranymi materiałami.",
    how4Title: "Zrób następny krok",
    how4Desc: "Realizuj kamienie milowe z przeglądami i wsparciem coacha, aż osiągniesz awans.",
    includedTitle: "Co zawiera",
    inc1Title: "Ocena umiejętności", inc1Desc: "Uporządkowany przegląd Twoich obecnych umiejętności i doświadczenia.",
    inc2Title: "Analiza luk", inc2Desc: "Jasny obraz tego, co dzieli Cię od kolejnej roli.",
    inc3Title: "Mapa kamieni milowych", inc3Desc: "Priorytetowe, rozłożone w czasie kroki, które da się zrealizować.",
    inc4Title: "Dobrane materiały", inc4Desc: "Kursy, lektury i praktyka dopasowane do każdego kamienia milowego.",
    inc5Title: "Przeglądy postępów", inc5Desc: "Regularne przeglądy, aby utrzymać tempo i dostosować plan.",
    inc6Title: "Wsparcie w awansie", inc6Desc: "Porady dotyczące pozycjonowania, aplikacji i rozmów o awans.",
    forTitle: "Dla kogo",
    for1: "Osoby gotowe przejść z obecnej roli na wyższy poziom",
    for2: "Osoby zmieniające karierę, które potrzebują konkretnej, uporządkowanej ścieżki",
    for3: "Każdy, kto odbudowuje tempo po przerwie lub niepowodzeniu",
    for4: "Osoby z niepełnosprawnościami i neuroróżnorodne, które chcą planu dopasowanego do ich potrzeb",
    finalTitle: "Gotowy zaplanować kolejny krok?",
    finalText: "Załóż konto, a pomożemy Ci zbudować plan rozwoju wokół Twoich umiejętności i celów.",
    finalCta: "Zaczynajmy",
    footerHome: "Strona główna",
  },
  ua: {
    navOffer: "Що ми пропонуємо", navArticles: "Статті", navQuiz: "Тест", navRegister: "Зареєструватися",
    badge: "Продукт",
    title: "Ваш план розвитку",
    subtitle: "Персональна карта, побудована на ваших навичках, яка показує, як саме перейти на наступний кар'єрний щабель.",
    ctaPrimary: "Створити план",
    ctaSecondary: "Пройти тест навичок",
    introTitle: "Що це",
    introText: "План розвитку перетворює нечітку амбіцію на зрозумілий покроковий шлях. Ми складаємо карту навичок, які ви вже маєте, порівнюємо їх із бажаною роллю та даємо впорядкований набір дій, щоб закрити прогалину — з віхами, ресурсами та переглядами, щоб прогрес ніколи не зупинявся.",
    howTitle: "Як це працює",
    how1Title: "Складіть карту навичок",
    how1Desc: "Пройдіть кероване оцінювання свого досвіду, сильних сторін та інтересів.",
    how2Title: "Знайдіть прогалини",
    how2Desc: "Ми порівнюємо ваш профіль із цільовою роллю та визначаємо найважливіші навички.",
    how3Title: "Отримайте карту",
    how3Desc: "Ви отримаєте план із пріоритетами, віхами, термінами та підібраними матеріалами для навчання.",
    how4Title: "Зробіть наступний крок",
    how4Desc: "Проходьте віхи з переглядами та підтримкою коуча, доки не досягнете підвищення.",
    includedTitle: "Що входить",
    inc1Title: "Оцінка навичок", inc1Desc: "Структурований огляд ваших поточних умінь і досвіду.",
    inc2Title: "Аналіз прогалин", inc2Desc: "Чітке розуміння того, що відділяє вас від наступної ролі.",
    inc3Title: "Карта віх", inc3Desc: "Пріоритетні кроки з термінами, які реально виконати.",
    inc4Title: "Підібрані ресурси", inc4Desc: "Курси, матеріали та практика під кожну віху.",
    inc5Title: "Перегляди прогресу", inc5Desc: "Регулярні перегляди, щоб зберігати темп і коригувати план.",
    inc6Title: "Підтримка на щаблі", inc6Desc: "Поради щодо позиціонування, заявок та співбесід для підвищення.",
    forTitle: "Для кого",
    for1: "Ті, хто готовий перейти з поточної ролі на новий рівень",
    for2: "Ті, хто змінює кар'єру і потребує конкретного впорядкованого шляху",
    for3: "Усі, хто відновлює темп після перерви чи невдачі",
    for4: "Люди з інвалідністю та нейровідмінні, яким потрібен план під їхні потреби",
    finalTitle: "Готові спланувати наступний крок?",
    finalText: "Створіть акаунт, і ми допоможемо побудувати план розвитку навколо ваших навичок і цілей.",
    finalCta: "Почати",
    footerHome: "Головна",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function DevelopmentPlanPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  useEffect(() => {
    setLang(detectBrowserLanguage());
  }, []);

  const steps = [
    { n: 1, title: t.how1Title, desc: t.how1Desc, icon: ICON_PATHS.search },
    { n: 2, title: t.how2Title, desc: t.how2Desc, icon: ICON_PATHS.target },
    { n: 3, title: t.how3Title, desc: t.how3Desc, icon: ICON_PATHS.map },
    { n: 4, title: t.how4Title, desc: t.how4Desc, icon: ICON_PATHS.rocket },
  ];

  const included = [
    { title: t.inc1Title, desc: t.inc1Desc, icon: ICON_PATHS.search },
    { title: t.inc2Title, desc: t.inc2Desc, icon: ICON_PATHS.target },
    { title: t.inc3Title, desc: t.inc3Desc, icon: ICON_PATHS.map },
    { title: t.inc4Title, desc: t.inc4Desc, icon: ICON_PATHS.book },
    { title: t.inc5Title, desc: t.inc5Desc, icon: ICON_PATHS.chart },
    { title: t.inc6Title, desc: t.inc6Desc, icon: ICON_PATHS.compass },
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
                {t.badge}
              </span>
              <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-white">
                {t.title}
              </h1>
              <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl">
                {t.subtitle}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#16A97A] text-white font-bold hover:bg-[#0F7A52] transition-colors"
                >
                  {t.ctaPrimary}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-white/25 text-white font-bold hover:border-white transition-all"
                >
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What it is */}
        <section className="py-20 md:py-28 border-b border-[#D9D9DC]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0B2818]">{t.introTitle}</h2>
            <p className="mt-6 text-lg text-[#3F3C3A] leading-relaxed">{t.introText}</p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-[#0B2818]">
              {t.howTitle}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.n} className="relative bg-white rounded-2xl border-2 border-[#D9D9DC] p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F7A52] text-white mb-6">
                    <Icon path={step.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-[#16A97A]">{String(step.n).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-xl font-semibold text-[#0B2818]">{step.title}</h3>
                  <p className="mt-2 text-[#3F3C3A] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-20 md:py-28 bg-white border-y border-[#D9D9DC]">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-[#0B2818]">
              {t.includedTitle}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {included.map((item, i) => (
                <div key={i} className="rounded-2xl border-2 border-[#D9D9DC] p-8 hover:shadow-lg hover:shadow-[#0F7A52]/10 transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#16A97A]/10 text-[#0F7A52] mb-5">
                    <Icon path={item.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B2818]">{item.title}</h3>
                  <p className="mt-2 text-[#3F3C3A] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12 text-[#0B2818]">
              {t.forTitle}
            </h2>
            <ul className="space-y-4">
              {[t.for1, t.for2, t.for3, t.for4].map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border-2 border-[#D9D9DC] p-5">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#16A97A]/10 text-[#0F7A52] flex-shrink-0 mt-0.5">
                    <Icon path={ICON_PATHS.check} className="w-4 h-4" />
                  </span>
                  <span className="text-[#0B2818]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 bg-[#0F7A52] text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">{t.finalTitle}</h2>
            <p className="mt-4 text-lg text-white/80">{t.finalText}</p>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-[#0B2818] font-bold hover:bg-[#D9D9DC] transition-colors"
            >
              {t.finalCta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D9D9DC] bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Image src="/images/logo.png" alt="Prosvasimi" width={28} height={28} />
              <span className="font-medium text-[#0B2818]">Prosvasimi</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-[#0F7A52]">
              <Link href="/" className="hover:text-[#0B2818] transition-colors">{t.footerHome}</Link>
              <Link href="/offer" className="hover:text-[#0B2818] transition-colors">{t.navOffer}</Link>
              <Link href="/articles" className="hover:text-[#0B2818] transition-colors">{t.navArticles}</Link>
              <Link href="/quiz" className="hover:text-[#0B2818] transition-colors">{t.navQuiz}</Link>
              <Link href="/register" className="hover:text-[#0B2818] transition-colors">{t.navRegister}</Link>
            </nav>
            <p className="text-sm text-[#0F7A52]">© {new Date().getFullYear()} Prosvasimi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
