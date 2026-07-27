"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { detectBrowserLanguage, type Lang } from "@/lib/language";
import SiteHeader from "@/components/SiteHeader";

const ICON_PATHS = {
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z",
  map: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z",
  book: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  chart: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  users: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
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
    footerHome: "Home", navOffer: "What We Offer", navPlan: "Development Plan", navArticles: "Articles", navQuiz: "Quiz", navRegister: "Register",
    badge: "In Development",
    title: "The AI Career Platform We're Building",
    subtitle: "An AI-powered platform that reads your CV and skills, shows you which career paths fit, and helps you close the gap — for individuals, and for the organizations that employ them.",
    ctaPrimary: "Join the Waitlist",
    ctaSecondary: "See our current coaching offer",
    introTitle: "What we're building",
    introText: "Alongside our coaching programs, we're building an AI platform that automates the first steps of career clarity: turning a CV or LinkedIn profile into a structured skill profile, matching it against real career paths, and generating a personalized plan to close the gap. It's built for individuals navigating a career move, and for organizations that want to understand and grow the skills already on their team.",
    individualsTitle: "For individuals",
    ind1Title: "AI skill profile", ind1Desc: "Upload your CV or connect LinkedIn — our AI extracts and categorizes your skills automatically.",
    ind2Title: "Career path matching", ind2Desc: "See career paths ranked by fit, with a clear match score for each one.",
    ind3Title: "Skill gap analysis", ind3Desc: "Know exactly which skills stand between you and the role you want.",
    ind4Title: "Personalized learning plan", ind4Desc: "Get a prioritized set of courses and resources matched to each gap.",
    ind5Title: "Live job matching", ind5Desc: "See open roles that match your profile as they come up.",
    ind6Title: "Progress tracking", ind6Desc: "Save target roles and track your skill growth over time.",
    companiesTitle: "For organizations",
    comp1Title: "Team skill mapping", comp1Desc: "Upload your team's data and see an aggregated skills matrix across departments.",
    comp2Title: "Org-level skill gaps", comp2Desc: "Compare your workforce's skills against your business goals.",
    comp3Title: "Internal mobility", comp3Desc: "Surface employees who already match your open internal roles.",
    comp4Title: "Manager dashboard", comp4Desc: "A clear view of team skills, gaps, and mobility — built for non-technical HR managers.",
    statusTitle: "Where things stand",
    statusText: "We're actively building this in stages — starting with individual skill profiles and career path matching, then expanding to learning plans and the workforce tools for teams. Our human coaching programs are available today; the AI platform is what's coming next.",
    finalTitle: "Want early access?",
    finalText: "Join the waitlist and we'll let you know as soon as the platform opens for individuals and companies.",
    finalCta: "Join the Waitlist",
  },
  pl: {
    footerHome: "Strona główna", navOffer: "Co oferujemy", navPlan: "Plan rozwoju", navArticles: "Artykuły", navQuiz: "Quiz", navRegister: "Zarejestruj się",
    badge: "W budowie",
    title: "Platforma AI dla kariery, którą budujemy",
    subtitle: "Platforma oparta na AI, która analizuje Twoje CV i umiejętności, pokazuje pasujące ścieżki kariery i pomaga zamknąć lukę — dla osób indywidualnych i dla organizacji, które je zatrudniają.",
    ctaPrimary: "Dołącz do listy",
    ctaSecondary: "Zobacz naszą obecną ofertę coachingu",
    introTitle: "Co budujemy",
    introText: "Obok naszych programów coachingowych budujemy platformę AI, która automatyzuje pierwsze kroki w klarowności kariery: zamienia CV lub profil LinkedIn w uporządkowany profil umiejętności, dopasowuje go do realnych ścieżek kariery i generuje spersonalizowany plan zamknięcia luki. Jest stworzona dla osób planujących zmianę kariery oraz dla organizacji, które chcą zrozumieć i rozwijać umiejętności już obecne w zespole.",
    individualsTitle: "Dla osób indywidualnych",
    ind1Title: "Profil umiejętności AI", ind1Desc: "Wgraj CV lub połącz LinkedIn — nasze AI automatycznie wyodrębnia i kategoryzuje Twoje umiejętności.",
    ind2Title: "Dopasowanie ścieżek kariery", ind2Desc: "Zobacz ścieżki kariery uszeregowane według dopasowania, z jasnym wynikiem dla każdej z nich.",
    ind3Title: "Analiza luk kompetencyjnych", ind3Desc: "Dowiedz się dokładnie, jakich umiejętności brakuje Ci do wymarzonej roli.",
    ind4Title: "Spersonalizowany plan nauki", ind4Desc: "Otrzymaj priorytetowy zestaw kursów i materiałów dopasowanych do każdej luki.",
    ind5Title: "Dopasowanie ofert pracy na żywo", ind5Desc: "Zobacz otwarte oferty pasujące do Twojego profilu, gdy tylko się pojawią.",
    ind6Title: "Śledzenie postępów", ind6Desc: "Zapisuj docelowe role i śledź rozwój swoich umiejętności w czasie.",
    companiesTitle: "Dla organizacji",
    comp1Title: "Mapowanie umiejętności zespołu", comp1Desc: "Wgraj dane zespołu i zobacz zbiorczą macierz umiejętności w poszczególnych działach.",
    comp2Title: "Luki kompetencyjne na poziomie organizacji", comp2Desc: "Porównaj umiejętności swojego zespołu z celami biznesowymi.",
    comp3Title: "Mobilność wewnętrzna", comp3Desc: "Wskaż pracowników, którzy już pasują do otwartych ról wewnętrznych.",
    comp4Title: "Panel menedżera", comp4Desc: "Przejrzysty widok umiejętności zespołu, luk i mobilności — stworzony dla menedżerów HR bez wiedzy technicznej.",
    statusTitle: "Na jakim jesteśmy etapie",
    statusText: "Budujemy to aktywnie, etapami — zaczynając od indywidualnych profili umiejętności i dopasowania ścieżek kariery, a następnie rozszerzając o plany nauki i narzędzia dla zespołów. Nasze programy coachingowe są dostępne już dziś; platforma AI to kolejny krok.",
    finalTitle: "Chcesz wczesnego dostępu?",
    finalText: "Dołącz do listy oczekujących, a powiadomimy Cię, gdy tylko platforma otworzy się dla osób indywidualnych i organizacji.",
    finalCta: "Dołącz do listy",
  },
  ua: {
    footerHome: "Головна", navOffer: "Що ми пропонуємо", navPlan: "План розвитку", navArticles: "Статті", navQuiz: "Тест", navRegister: "Зареєструватися",
    badge: "У розробці",
    title: "AI-платформа для кар'єри, яку ми будуємо",
    subtitle: "Платформа на основі AI, яка аналізує ваше резюме та навички, показує, які кар'єрні шляхи підходять, і допомагає закрити прогалину — для окремих людей та для організацій, що їх наймають.",
    ctaPrimary: "Приєднатися до списку",
    ctaSecondary: "Переглянути наш поточний коучинг",
    introTitle: "Що ми будуємо",
    introText: "Поряд із нашими коучинговими програмами ми будуємо AI-платформу, яка автоматизує перші кроки до кар'єрної ясності: перетворює резюме або профіль LinkedIn на структурований профіль навичок, зіставляє його з реальними кар'єрними шляхами та генерує персональний план закриття прогалини. Вона створена для людей, що змінюють кар'єру, та для організацій, які хочуть зрозуміти й розвинути навички, що вже є в їхній команді.",
    individualsTitle: "Для окремих людей",
    ind1Title: "AI-профіль навичок", ind1Desc: "Завантажте резюме або підключіть LinkedIn — наш AI автоматично визначає та категоризує ваші навички.",
    ind2Title: "Підбір кар'єрних шляхів", ind2Desc: "Перегляньте кар'єрні шляхи, впорядковані за відповідністю, з чітким показником для кожного.",
    ind3Title: "Аналіз прогалин у навичках", ind3Desc: "Дізнайтесь точно, яких навичок бракує до бажаної ролі.",
    ind4Title: "Персональний план навчання", ind4Desc: "Отримайте пріоритетний набір курсів і матеріалів під кожну прогалину.",
    ind5Title: "Підбір вакансій у реальному часі", ind5Desc: "Переглядайте відкриті вакансії, що відповідають вашому профілю, щойно вони з'являються.",
    ind6Title: "Відстеження прогресу", ind6Desc: "Зберігайте цільові ролі та відстежуйте розвиток навичок із часом.",
    companiesTitle: "Для організацій",
    comp1Title: "Мапування навичок команди", comp1Desc: "Завантажте дані команди та перегляньте зведену матрицю навичок за відділами.",
    comp2Title: "Прогалини на рівні організації", comp2Desc: "Порівняйте навички команди з бізнес-цілями.",
    comp3Title: "Внутрішня мобільність", comp3Desc: "Визначте співробітників, які вже відповідають відкритим внутрішнім ролям.",
    comp4Title: "Панель менеджера", comp4Desc: "Чіткий огляд навичок команди, прогалин і мобільності — створений для HR-менеджерів без технічного бекграунду.",
    statusTitle: "На якому ми етапі",
    statusText: "Ми активно будуємо це поетапно — починаючи з індивідуальних профілів навичок і підбору кар'єрних шляхів, а потім розширюючи до планів навчання та інструментів для команд. Наші коучингові програми доступні вже сьогодні; AI-платформа — це наступний крок.",
    finalTitle: "Хочете ранній доступ?",
    finalText: "Приєднайтесь до списку очікування, і ми повідомимо вас, щойно платформа відкриється для окремих людей та організацій.",
    finalCta: "Приєднатися до списку",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function AiPlatformPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  useEffect(() => {
    setLang(detectBrowserLanguage());
  }, []);

  const individualFeatures = [
    { title: t.ind1Title, desc: t.ind1Desc, icon: ICON_PATHS.document },
    { title: t.ind2Title, desc: t.ind2Desc, icon: ICON_PATHS.map },
    { title: t.ind3Title, desc: t.ind3Desc, icon: ICON_PATHS.target },
    { title: t.ind4Title, desc: t.ind4Desc, icon: ICON_PATHS.book },
    { title: t.ind5Title, desc: t.ind5Desc, icon: ICON_PATHS.search },
    { title: t.ind6Title, desc: t.ind6Desc, icon: ICON_PATHS.chart },
  ];

  const companyFeatures = [
    { title: t.comp1Title, desc: t.comp1Desc, icon: ICON_PATHS.chart },
    { title: t.comp2Title, desc: t.comp2Desc, icon: ICON_PATHS.target },
    { title: t.comp3Title, desc: t.comp3Desc, icon: ICON_PATHS.users },
    { title: t.comp4Title, desc: t.comp4Desc, icon: ICON_PATHS.building },
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
                  href="/#waitlist"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#16A97A] text-white font-bold hover:bg-[#0F7A52] transition-colors"
                >
                  {t.ctaPrimary}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/offer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-white/25 text-white font-bold hover:border-white transition-all"
                >
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What we're building */}
        <section className="py-20 md:py-28 border-b border-[#D9D9DC]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0B2818]">{t.introTitle}</h2>
            <p className="mt-6 text-lg text-[#3F3C3A] leading-relaxed">{t.introText}</p>
          </div>
        </section>

        {/* For individuals */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 justify-center mb-16">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#0D5C3E] text-white">
                <Icon path={ICON_PATHS.bolt} className="w-5 h-5" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0B2818]">
                {t.individualsTitle}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {individualFeatures.map((item, i) => (
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

        {/* For organizations */}
        <section className="py-20 md:py-28 bg-white border-y border-[#D9D9DC]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-3 justify-center mb-16">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#0B2818] text-white">
                <Icon path={ICON_PATHS.building} className="w-5 h-5" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0B2818]">
                {t.companiesTitle}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {companyFeatures.map((item, i) => (
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

        {/* Status */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-2xl border-2 border-[#D9D9DC] p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-[#0B2818]">{t.statusTitle}</h2>
              <p className="mt-4 text-[#3F3C3A] leading-relaxed">{t.statusText}</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 bg-[#0F7A52] text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">{t.finalTitle}</h2>
            <p className="mt-4 text-lg text-white/80">{t.finalText}</p>
            <Link
              href="/#waitlist"
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
              <Link href="/development-plan" className="hover:text-[#0B2818] transition-colors">{t.navPlan}</Link>
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
