"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ICON_PATHS = {
  clipboardList: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M9 4.5h6a2.25 2.25 0 012.25 2.25v.75M9 4.5v.75A2.25 2.25 0 006.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25M6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z",
  calculator: "M8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25zM8.25 12h.008v.008H8.25V12zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.25-4.5h.008v.008H10.5V12zm0 2.25h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5v-.008zm2.25-4.5h.008v.008H12.75V12zm0 2.25h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75v-.008zM15 12h.008v.008H15V12zm0 2.25h.008v.008H15v-.008zm0 2.25h.008v.008H15v-.008z",
  lightBulb: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
  arrowPath: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
  chartBar: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  users: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  currency: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  globe: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  trendingUp: "M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22M14.25 9h6.5v6.5",
  trendingDown: "M2.25 6L9 12.75l4.306-4.306a11.95 11.95 0 015.814 5.518l2.74 1.22M14.25 15h6.5v-6.5",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

type Lang = "en" | "pl" | "ua";

const translations = {
  en: {
    nav: { home: "Home", articles: "Articles", offer: "For Employers", quiz: "Quiz", register: "Register" },
    title: "Inclusion Quiz & Calculator",
    subtitle: "Discover how inclusive your company is and calculate the potential impact",
    quizTitle: "How Inclusive Is Your Company?",
    quizDescription: "Answer 10 questions to assess your company's inclusion level",
    calculatorTitle: "Inclusion Impact Calculator",
    calculatorDescription: "Calculate the potential cost of low inclusion in your organization",
    startQuiz: "Start Quiz",
    question: "Question",
    of: "of",
    yes: "Yes",
    partially: "Partially",
    no: "No",
    next: "Next",
    previous: "Previous",
    seeResults: "See Results",
    yourScore: "Your Score",
    points: "points",
    outOf: "out of",
    lowLevel: "Low Inclusion Level",
    mediumLevel: "Medium Inclusion Level",
    highLevel: "High Inclusion Level",
    lowDesc: "Your company has significant room for improvement in inclusion practices. Consider starting with foundational DEI policies and training.",
    mediumDesc: "You've made progress, but there's still work to do. Focus on measuring outcomes and expanding your initiatives.",
    highDesc: "Excellent! Your company demonstrates strong inclusion practices. Continue leading by example and sharing best practices.",
    recommendations: "Recommendations",
    lowRec1: "Implement a comprehensive DEI policy",
    lowRec2: "Provide mandatory inclusion training for managers",
    lowRec3: "Review and improve recruitment processes",
    lowRec4: "Conduct an accessibility audit",
    medRec1: "Develop diversity metrics and KPIs",
    medRec2: "Increase representation in leadership",
    medRec3: "Improve physical and digital accessibility",
    medRec4: "Create employee resource groups",
    highRec1: "Leverage inclusion for employer branding",
    highRec2: "Launch internal inclusion initiatives",
    highRec3: "Share best practices with industry peers",
    highRec4: "Mentor other organizations on DEI",
    retakeQuiz: "Retake Quiz",
    employees: "Number of Employees",
    avgSalary: "Average Annual Salary",
    currency: "Currency",
    inclusionLevel: "Current Inclusion Level",
    calculate: "Calculate Impact",
    estimatedLoss: "Estimated Annual Loss",
    potentialSavings: "Potential Savings with High Inclusion",
    insight: "Companies with high inclusion levels achieve up to 30% better business results, including higher productivity, lower turnover, and increased innovation.",
    lossExplanation: "This estimate is based on research showing that low inclusion leads to higher turnover, reduced productivity, and missed innovation opportunities.",
    questions: [
      "Do you have an equality and inclusion policy?",
      "Do managers receive DEI (Diversity, Equity, Inclusion) training?",
      "Are job postings accessible and free of bias for all candidates?",
      "Is your team diverse (gender, age, experience)?",
      "Is your recruitment process free from bias?",
      "Is your office or product accessible to everyone?",
      "Do you monitor diversity metrics?",
      "Is there a culture of open feedback?",
      "Do you accommodate different employee needs?",
      "Do you have internal initiatives supporting inclusion?"
    ]
  },
  pl: {
    nav: { home: "Strona główna", articles: "Artykuły", offer: "Dla pracodawców", quiz: "Quiz", register: "Zarejestruj się" },
    title: "Quiz i Kalkulator Inkluzywności",
    subtitle: "Sprawdź, jak inkluzywna jest Twoja firma i oblicz potencjalny wpływ",
    quizTitle: "Jak bardzo inkluzywna jest Twoja firma?",
    quizDescription: "Odpowiedz na 10 pytań, aby ocenić poziom inkluzywności Twojej firmy",
    calculatorTitle: "Kalkulator Wpływu Inkluzywności",
    calculatorDescription: "Oblicz potencjalny koszt niskiej inkluzywności w Twojej organizacji",
    startQuiz: "Rozpocznij Quiz",
    question: "Pytanie",
    of: "z",
    yes: "Tak",
    partially: "Częściowo",
    no: "Nie",
    next: "Dalej",
    previous: "Wstecz",
    seeResults: "Zobacz wyniki",
    yourScore: "Twój wynik",
    points: "punktów",
    outOf: "z",
    lowLevel: "Niski poziom inkluzywności",
    mediumLevel: "Średni poziom inkluzywności",
    highLevel: "Wysoki poziom inkluzywności",
    lowDesc: "Twoja firma ma znaczne pole do poprawy w zakresie praktyk inkluzywnych. Rozważ rozpoczęcie od podstawowych polityk DEI i szkoleń.",
    mediumDesc: "Poczyniłeś postępy, ale wciąż jest wiele do zrobienia. Skup się na mierzeniu wyników i rozszerzaniu inicjatyw.",
    highDesc: "Doskonale! Twoja firma wykazuje silne praktyki inkluzywne. Kontynuuj dawanie przykładu i dzielenie się najlepszymi praktykami.",
    recommendations: "Rekomendacje",
    lowRec1: "Wdróż kompleksową politykę DEI",
    lowRec2: "Zapewnij obowiązkowe szkolenia z inkluzywności dla menedżerów",
    lowRec3: "Przejrzyj i ulepsz procesy rekrutacyjne",
    lowRec4: "Przeprowadź audyt dostępności",
    medRec1: "Opracuj metryki i KPI różnorodności",
    medRec2: "Zwiększ reprezentację w kierownictwie",
    medRec3: "Popraw dostępność fizyczną i cyfrową",
    medRec4: "Utwórz grupy zasobów pracowniczych",
    highRec1: "Wykorzystaj inkluzywność w employer brandingu",
    highRec2: "Uruchom wewnętrzne inicjatywy inkluzywne",
    highRec3: "Dziel się najlepszymi praktykami z branżą",
    highRec4: "Mentoruj inne organizacje w zakresie DEI",
    retakeQuiz: "Powtórz Quiz",
    employees: "Liczba pracowników",
    avgSalary: "Średnie roczne wynagrodzenie",
    currency: "Waluta",
    inclusionLevel: "Aktualny poziom inkluzywności",
    calculate: "Oblicz wpływ",
    estimatedLoss: "Szacowana roczna strata",
    potentialSavings: "Potencjalne oszczędności przy wysokiej inkluzywności",
    insight: "Firmy o wysokim poziomie inkluzywności osiągają nawet o 30% lepsze wyniki biznesowe, w tym wyższą produktywność, niższą rotację i większą innowacyjność.",
    lossExplanation: "Ta szacunkowa wartość opiera się na badaniach pokazujących, że niska inkluzywność prowadzi do wyższej rotacji, zmniejszonej produktywności i utraconych możliwości innowacji.",
    questions: [
      "Czy posiadasz politykę równości i inkluzywności?",
      "Czy menedżerowie przechodzą szkolenia z zakresu DEI?",
      "Czy oferty pracy są dostępne i wolne od uprzedzeń dla wszystkich kandydatów?",
      "Czy Twój zespół jest różnorodny (płeć, wiek, doświadczenie)?",
      "Czy proces rekrutacji jest wolny od uprzedzeń?",
      "Czy biuro lub produkt są dostępne dla wszystkich?",
      "Czy monitorujesz wskaźniki różnorodności?",
      "Czy istnieje kultura otwartego feedbacku?",
      "Czy uwzględniasz różne potrzeby pracowników?",
      "Czy masz wewnętrzne inicjatywy wspierające inkluzywność?"
    ]
  },
  ua: {
    nav: { home: "Головна", articles: "Статті", offer: "Для роботодавців", quiz: "Тест", register: "Зареєструватися" },
    title: "Тест та Калькулятор Інклюзивності",
    subtitle: "Дізнайтеся, наскільки інклюзивна ваша компанія, та розрахуйте потенційний вплив",
    quizTitle: "Наскільки інклюзивна ваша компанія?",
    quizDescription: "Дайте відповідь на 10 запитань, щоб оцінити рівень інклюзивності вашої компанії",
    calculatorTitle: "Калькулятор Впливу Інклюзивності",
    calculatorDescription: "Розрахуйте потенційну вартість низької інклюзивності у вашій організації",
    startQuiz: "Почати Тест",
    question: "Питання",
    of: "з",
    yes: "Так",
    partially: "Частково",
    no: "Ні",
    next: "Далі",
    previous: "Назад",
    seeResults: "Переглянути результати",
    yourScore: "Ваш результат",
    points: "балів",
    outOf: "з",
    lowLevel: "Низький рівень інклюзивності",
    mediumLevel: "Середній рівень інклюзивності",
    highLevel: "Високий рівень інклюзивності",
    lowDesc: "Ваша компанія має значний простір для покращення практик інклюзивності. Розгляньте можливість почати з базових політик DEI та навчання.",
    mediumDesc: "Ви досягли прогресу, але ще є над чим працювати. Зосередьтеся на вимірюванні результатів та розширенні ініціатив.",
    highDesc: "Чудово! Ваша компанія демонструє сильні практики інклюзивності. Продовжуйте подавати приклад та ділитися найкращими практиками.",
    recommendations: "Рекомендації",
    lowRec1: "Впровадьте комплексну політику DEI",
    lowRec2: "Забезпечте обов'язкове навчання з інклюзивності для менеджерів",
    lowRec3: "Перегляньте та покращіть процеси рекрутингу",
    lowRec4: "Проведіть аудит доступності",
    medRec1: "Розробіть метрики та KPI різноманітності",
    medRec2: "Збільшіть представництво в керівництві",
    medRec3: "Покращіть фізичну та цифрову доступність",
    medRec4: "Створіть групи ресурсів працівників",
    highRec1: "Використовуйте інклюзивність для employer branding",
    highRec2: "Запустіть внутрішні ініціативи інклюзивності",
    highRec3: "Діліться найкращими практиками з галуззю",
    highRec4: "Менторуйте інші організації щодо DEI",
    retakeQuiz: "Пройти Тест Знову",
    employees: "Кількість працівників",
    avgSalary: "Середня річна зарплата",
    currency: "Валюта",
    inclusionLevel: "Поточний рівень інклюзивності",
    calculate: "Розрахувати вплив",
    estimatedLoss: "Орієнтовні річні втрати",
    potentialSavings: "Потенційна економія при високій інклюзивності",
    insight: "Компанії з високим рівнем інклюзивності досягають до 30% кращих бізнес-результатів, включаючи вищу продуктивність, нижчу плинність кадрів та більшу інноваційність.",
    lossExplanation: "Ця оцінка базується на дослідженнях, які показують, що низька інклюзивність призводить до вищої плинності кадрів, зниженої продуктивності та втрачених можливостей для інновацій.",
    questions: [
      "Чи маєте ви політику рівності та інклюзивності?",
      "Чи проходять менеджери навчання з DEI (Різноманітність, Рівність, Інклюзія)?",
      "Чи вакансії доступні та вільні від упереджень для всіх кандидатів?",
      "Чи різноманітна ваша команда (стать, вік, досвід)?",
      "Чи вільний ваш процес рекрутингу від упереджень?",
      "Чи доступний ваш офіс або продукт для всіх?",
      "Чи відстежуєте ви показники різноманітності?",
      "Чи існує культура відкритого зворотного зв'язку?",
      "Чи враховуєте ви різні потреби працівників?",
      "Чи маєте ви внутрішні ініціативи, що підтримують інклюзивність?"
    ]
  }
};

function getBrowserLanguage(): Lang {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];
  if (langCode === 'pl') return 'pl';
  if (langCode === 'uk' || langCode === 'ua') return 'ua';
  return 'en';
}

export default function QuizPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTab, setActiveTab] = useState<"quiz" | "calculator">("quiz");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [showResults, setShowResults] = useState(false);
  
  // Calculator state
  const [employees, setEmployees] = useState<number>(100);
  const [avgSalary, setAvgSalary] = useState<number>(50000);
  const [currency, setCurrency] = useState<string>("PLN");
  const [calcInclusionLevel, setCalcInclusionLevel] = useState<string>("medium");
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const detectedLang = getBrowserLanguage();
    setLang(detectedLang);
  }, []);

  const t = translations[lang];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((sum, val) => sum + (val >= 0 ? val : 0), 0);
  };

  const getLevel = (score: number) => {
    if (score <= 6) return "low";
    if (score <= 13) return "medium";
    return "high";
  };

  const getPercentage = (score: number) => {
    if (score <= 6) return Math.round(10 + (score / 6) * 20);
    if (score <= 13) return Math.round(40 + ((score - 7) / 6) * 30);
    return Math.round(80 + ((score - 14) / 6) * 20);
  };

  const calculateLoss = () => {
    let lossPercentage = 0;
    switch (calcInclusionLevel) {
      case "low": lossPercentage = 0.25; break;
      case "medium": lossPercentage = 0.15; break;
      case "high": lossPercentage = 0.075; break;
    }
    return employees * avgSalary * lossPercentage;
  };

  const calculateSavings = () => {
    const currentLoss = calculateLoss();
    const highInclusionLoss = employees * avgSalary * 0.075;
    return currentLoss - highInclusionLoss;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(lang === 'pl' ? 'pl-PL' : lang === 'ua' ? 'uk-UA' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(value);
  };

  const score = calculateScore();
  const level = getLevel(score);
  const percentage = getPercentage(score);

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers(Array(10).fill(-1));
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#D9D9DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Prosvasimi" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-bold text-[#0B2818]">Prosvasimi</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-[#3F3C3A] hover:text-[#0B2818] transition-colors">{t.nav.home}</Link>
              <Link href="/articles" className="text-sm font-medium text-[#3F3C3A] hover:text-[#0B2818] transition-colors">{t.nav.articles}</Link>
              <Link href="/offer" className="text-sm font-medium text-[#3F3C3A] hover:text-[#0B2818] transition-colors">{t.nav.offer}</Link>
              <Link href="/quiz" className="text-sm font-medium text-[#0B2818] border-b-2 border-[#0B2818] pb-1">{t.nav.quiz}</Link>
              <Link href="/register" className="text-sm font-medium text-[#3F3C3A] hover:text-[#0B2818] transition-colors">{t.nav.register}</Link>
            </nav>
            <div className="flex items-center gap-2">
              {(["en", "pl", "ua"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${lang === l ? "bg-[#0B2818] text-white" : "text-[#3F3C3A] hover:bg-[#D9D9DC]"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black tracking-tighter text-[#0B2818] mb-4">{t.title}</h1>
            <p className="text-lg text-[#3F3C3A]">{t.subtitle}</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border-2 border-[#D9D9DC]">
              <button
                onClick={() => { setActiveTab("quiz"); resetQuiz(); }}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "quiz" ? "bg-[#0B2818] text-white shadow-md" : "text-[#3F3C3A] hover:bg-[#FFFFFF]"}`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Icon path={ICON_PATHS.clipboardList} className="w-4 h-4" />
                  {t.quizTitle.split(":")[0] || t.quizTitle}
                </span>
              </button>
              <button
                onClick={() => { setActiveTab("calculator"); setCalculated(false); }}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "calculator" ? "bg-[#0B2818] text-white shadow-md" : "text-[#3F3C3A] hover:bg-[#FFFFFF]"}`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Icon path={ICON_PATHS.calculator} className="w-4 h-4" />
                  {t.calculatorTitle.split(":")[0] || t.calculatorTitle}
                </span>
              </button>
            </div>
          </div>

          {/* Quiz Section */}
          {activeTab === "quiz" && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#D9D9DC] overflow-hidden">
              {!quizStarted && !showResults && (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-[#16A97A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon path={ICON_PATHS.clipboardList} className="w-9 h-9 text-[#16A97A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B2818] mb-4">{t.quizTitle}</h2>
                  <p className="text-[#3F3C3A] mb-8 max-w-md mx-auto">{t.quizDescription}</p>
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="px-8 py-4 bg-[#0B2818] text-white rounded-xl font-semibold hover:bg-[#0F7A52] transition-colors shadow-lg hover:shadow-xl"
                  >
                    {t.startQuiz} →
                  </button>
                </div>
              )}

              {quizStarted && !showResults && (
                <div className="p-8">
                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-[#3F3C3A] mb-2">
                      <span>{t.question} {currentQuestion + 1} {t.of} 10</span>
                      <span>{Math.round((currentQuestion + 1) / 10 * 100)}%</span>
                    </div>
                    <div className="h-2 bg-[#D9D9DC] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#0B2818] to-[#16A97A] transition-all duration-500"
                        style={{ width: `${(currentQuestion + 1) / 10 * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[#0B2818] mb-6">
                      {t.questions[currentQuestion]}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { value: 2, label: t.yes, color: "bg-[#16A97A]", hoverColor: "hover:bg-[#16A97A]/10" },
                        { value: 1, label: t.partially, color: "bg-[#E8991B]", hoverColor: "hover:bg-[#E8991B]/10" },
                        { value: 0, label: t.no, color: "bg-[#E8461D]", hoverColor: "hover:bg-[#E8461D]/10" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center gap-4 ${
                            answers[currentQuestion] === option.value
                              ? `border-[#0B2818] ${option.color} text-white`
                              : `border-[#D9D9DC] ${option.hoverColor} text-[#3F3C3A]`
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            answers[currentQuestion] === option.value
                              ? "border-white bg-white"
                              : "border-current"
                          }`}>
                            {answers[currentQuestion] === option.value && (
                              <span className={`w-3 h-3 rounded-full ${option.color}`} />
                            )}
                          </span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                      className="px-6 py-3 rounded-xl font-medium text-[#3F3C3A] hover:bg-[#D9D9DC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← {t.previous}
                    </button>
                    {currentQuestion < 9 ? (
                      <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        disabled={answers[currentQuestion] === -1}
                        className="px-6 py-3 bg-[#0B2818] text-white rounded-xl font-medium hover:bg-[#0F7A52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t.next} →
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowResults(true)}
                        disabled={answers[currentQuestion] === -1}
                        className="px-6 py-3 bg-[#16A97A] text-white rounded-xl font-medium hover:bg-[#0F7A52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t.seeResults} →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {showResults && (
                <div className="p-8">
                  {/* Score display */}
                  <div className="text-center mb-8">
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="#D9D9DC"
                          strokeWidth="12"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke={level === "low" ? "#E8461D" : level === "medium" ? "#E8991B" : "#16A97A"}
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray={`${percentage * 4.4} 440`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-[#0B2818]">{percentage}%</span>
                        <span className="text-sm text-[#3F3C3A]">{score} {t.points}</span>
                      </div>
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${level === "low" ? "text-[#E8461D]" : level === "medium" ? "text-[#E8991B]" : "text-[#16A97A]"}`}>
                      {level === "low" ? t.lowLevel : level === "medium" ? t.mediumLevel : t.highLevel}
                    </h2>
                    <p className="text-[#3F3C3A] max-w-md mx-auto">
                      {level === "low" ? t.lowDesc : level === "medium" ? t.mediumDesc : t.highDesc}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-[#FFFFFF] rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-[#0B2818] mb-4 flex items-center gap-2">
                      <Icon path={ICON_PATHS.lightBulb} className="w-5 h-5" />
                      {t.recommendations}
                    </h3>
                    <ul className="space-y-3">
                      {(level === "low" ? [t.lowRec1, t.lowRec2, t.lowRec3, t.lowRec4] :
                        level === "medium" ? [t.medRec1, t.medRec2, t.medRec3, t.medRec4] :
                        [t.highRec1, t.highRec2, t.highRec3, t.highRec4]).map((rec, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${level === "low" ? "bg-[#E8461D]" : level === "medium" ? "bg-[#E8991B]" : "bg-[#16A97A]"}`}>
                            {i + 1}
                          </span>
                          <span className="text-[#3F3C3A]">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={resetQuiz}
                      className="px-8 py-4 bg-[#0B2818] text-white rounded-xl font-semibold hover:bg-[#0F7A52] transition-colors"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Icon path={ICON_PATHS.arrowPath} className="w-4 h-4" />
                        {t.retakeQuiz}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Calculator Section */}
          {activeTab === "calculator" && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#D9D9DC] overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-[#0F7A52]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon path={ICON_PATHS.chartBar} className="w-9 h-9 text-[#0F7A52]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B2818] mb-4">{t.calculatorTitle}</h2>
                  <p className="text-[#3F3C3A] max-w-md mx-auto">{t.calculatorDescription}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Employees */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-[#0B2818] mb-2">
                      <Icon path={ICON_PATHS.users} className="w-4 h-4" />
                      {t.employees}
                    </label>
                    <input
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-[#D9D9DC] rounded-xl focus:ring-2 focus:ring-[#0B2818] focus:border-transparent transition-all"
                      min="1"
                    />
                  </div>

                  {/* Average Salary */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-[#0B2818] mb-2">
                      <Icon path={ICON_PATHS.currency} className="w-4 h-4" />
                      {t.avgSalary}
                    </label>
                    <input
                      type="number"
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-[#D9D9DC] rounded-xl focus:ring-2 focus:ring-[#0B2818] focus:border-transparent transition-all"
                      min="0"
                    />
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-[#0B2818] mb-2">
                      <Icon path={ICON_PATHS.globe} className="w-4 h-4" />
                      {t.currency}
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#D9D9DC] rounded-xl focus:ring-2 focus:ring-[#0B2818] focus:border-transparent transition-all"
                    >
                      <option value="PLN">PLN (Polish Zloty)</option>
                      <option value="EUR">EUR (Euro)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="UAH">UAH (Ukrainian Hryvnia)</option>
                      <option value="GBP">GBP (British Pound)</option>
                    </select>
                  </div>

                  {/* Inclusion Level */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-[#0B2818] mb-2">
                      <Icon path={ICON_PATHS.trendingUp} className="w-4 h-4" />
                      {t.inclusionLevel}
                    </label>
                    <select
                      value={calcInclusionLevel}
                      onChange={(e) => setCalcInclusionLevel(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#D9D9DC] rounded-xl focus:ring-2 focus:ring-[#0B2818] focus:border-transparent transition-all"
                    >
                      <option value="low">{t.lowLevel} (10-30%)</option>
                      <option value="medium">{t.mediumLevel} (40-70%)</option>
                      <option value="high">{t.highLevel} (80-100%)</option>
                    </select>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <button
                    onClick={() => setCalculated(true)}
                    className="px-8 py-4 bg-[#0B2818] text-white rounded-xl font-semibold hover:bg-[#0F7A52] transition-colors shadow-lg hover:shadow-xl"
                  >
                    {t.calculate} →
                  </button>
                </div>

                {calculated && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Results */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-[#E8461D]/10 rounded-xl p-6 border border-[#E8461D]/20">
                        <div className="flex items-center gap-1.5 text-sm text-[#E8461D] font-medium mb-2">
                          <Icon path={ICON_PATHS.trendingDown} className="w-4 h-4" />
                          {t.estimatedLoss}
                        </div>
                        <div className="text-3xl font-bold text-[#E8461D]">{formatCurrency(calculateLoss())}</div>
                      </div>
                      <div className="bg-[#16A97A]/10 rounded-xl p-6 border border-[#16A97A]/20">
                        <div className="flex items-center gap-1.5 text-sm text-[#16A97A] font-medium mb-2">
                          <Icon path={ICON_PATHS.trendingUp} className="w-4 h-4" />
                          {t.potentialSavings}
                        </div>
                        <div className="text-3xl font-bold text-[#16A97A]">{formatCurrency(calculateSavings())}</div>
                      </div>
                    </div>

                    {/* Insight */}
                    <div className="bg-[#0F7A52]/10 rounded-xl p-6 border border-[#0F7A52]/20">
                      <div className="flex items-start gap-4">
                        <Icon path={ICON_PATHS.lightBulb} className="w-6 h-6 text-[#0F7A52] flex-shrink-0" />
                        <div>
                          <p className="text-[#0B2818] font-medium mb-2">{t.insight}</p>
                          <p className="text-sm text-[#3F3C3A]">{t.lossExplanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-[#D9D9DC] py-10 bg-white mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-[#3F3C3A] text-sm">
          <p>Prosvasimi &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
