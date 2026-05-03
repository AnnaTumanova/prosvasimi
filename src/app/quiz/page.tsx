"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Lang = "en" | "pl" | "ua";

const translations = {
  en: {
    nav: { home: "Home", jobs: "Jobs", articles: "Articles", offer: "For Employers", quiz: "Quiz" },
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
      "Are job postings accessible to people with disabilities?",
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
    nav: { home: "Strona główna", jobs: "Oferty pracy", articles: "Artykuły", offer: "Dla pracodawców", quiz: "Quiz" },
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
      "Czy oferty pracy są dostępne dla osób z niepełnosprawnościami?",
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
    nav: { home: "Головна", jobs: "Вакансії", articles: "Статті", offer: "Для роботодавців", quiz: "Тест" },
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
      "Чи доступні вакансії для людей з інвалідністю?",
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
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Prosvasimi" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-bold text-[#1B4332]">Prosvasimi</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-[#57534E] hover:text-[#1B4332] transition-colors">{t.nav.home}</Link>
              <Link href="/jobs" className="text-sm font-medium text-[#57534E] hover:text-[#1B4332] transition-colors">{t.nav.jobs}</Link>
              <Link href="/articles" className="text-sm font-medium text-[#57534E] hover:text-[#1B4332] transition-colors">{t.nav.articles}</Link>
              <Link href="/offer" className="text-sm font-medium text-[#57534E] hover:text-[#1B4332] transition-colors">{t.nav.offer}</Link>
              <Link href="/quiz" className="text-sm font-medium text-[#1B4332] border-b-2 border-[#1B4332] pb-1">{t.nav.quiz}</Link>
            </nav>
            <div className="flex items-center gap-2">
              {(["en", "pl", "ua"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${lang === l ? "bg-[#1B4332] text-white" : "text-[#57534E] hover:bg-[#E7E5E4]"}`}
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
            <h1 className="text-4xl font-bold text-[#1B4332] mb-4">{t.title}</h1>
            <p className="text-lg text-[#57534E]">{t.subtitle}</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-[#E7E5E4]">
              <button
                onClick={() => { setActiveTab("quiz"); resetQuiz(); }}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "quiz" ? "bg-[#1B4332] text-white shadow-md" : "text-[#57534E] hover:bg-[#FAFAF9]"}`}
              >
                📝 {t.quizTitle.split(":")[0] || t.quizTitle}
              </button>
              <button
                onClick={() => { setActiveTab("calculator"); setCalculated(false); }}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "calculator" ? "bg-[#1B4332] text-white shadow-md" : "text-[#57534E] hover:bg-[#FAFAF9]"}`}
              >
                🧮 {t.calculatorTitle.split(":")[0] || t.calculatorTitle}
              </button>
            </div>
          </div>

          {/* Quiz Section */}
          {activeTab === "quiz" && (
            <div className="bg-white rounded-2xl shadow-lg border border-[#E7E5E4] overflow-hidden">
              {!quizStarted && !showResults && (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-[#40916C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📋</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1B4332] mb-4">{t.quizTitle}</h2>
                  <p className="text-[#57534E] mb-8 max-w-md mx-auto">{t.quizDescription}</p>
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="px-8 py-4 bg-[#1B4332] text-white rounded-xl font-semibold hover:bg-[#2D6A4F] transition-colors shadow-lg hover:shadow-xl"
                  >
                    {t.startQuiz} →
                  </button>
                </div>
              )}

              {quizStarted && !showResults && (
                <div className="p-8">
                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-[#57534E] mb-2">
                      <span>{t.question} {currentQuestion + 1} {t.of} 10</span>
                      <span>{Math.round((currentQuestion + 1) / 10 * 100)}%</span>
                    </div>
                    <div className="h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#1B4332] to-[#40916C] transition-all duration-500"
                        style={{ width: `${(currentQuestion + 1) / 10 * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[#1B4332] mb-6">
                      {t.questions[currentQuestion]}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { value: 2, label: t.yes, color: "bg-[#40916C]", hoverColor: "hover:bg-[#40916C]/10" },
                        { value: 1, label: t.partially, color: "bg-[#D4A574]", hoverColor: "hover:bg-[#D4A574]/10" },
                        { value: 0, label: t.no, color: "bg-[#C9705F]", hoverColor: "hover:bg-[#C9705F]/10" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center gap-4 ${
                            answers[currentQuestion] === option.value
                              ? `border-[#1B4332] ${option.color} text-white`
                              : `border-[#E7E5E4] ${option.hoverColor} text-[#57534E]`
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
                      className="px-6 py-3 rounded-xl font-medium text-[#57534E] hover:bg-[#E7E5E4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← {t.previous}
                    </button>
                    {currentQuestion < 9 ? (
                      <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        disabled={answers[currentQuestion] === -1}
                        className="px-6 py-3 bg-[#1B4332] text-white rounded-xl font-medium hover:bg-[#2D6A4F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t.next} →
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowResults(true)}
                        disabled={answers[currentQuestion] === -1}
                        className="px-6 py-3 bg-[#40916C] text-white rounded-xl font-medium hover:bg-[#2D6A4F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                          stroke="#E7E5E4"
                          strokeWidth="12"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke={level === "low" ? "#C9705F" : level === "medium" ? "#D4A574" : "#40916C"}
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray={`${percentage * 4.4} 440`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-[#1B4332]">{percentage}%</span>
                        <span className="text-sm text-[#57534E]">{score} {t.points}</span>
                      </div>
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${level === "low" ? "text-[#C9705F]" : level === "medium" ? "text-[#D4A574]" : "text-[#40916C]"}`}>
                      {level === "low" ? t.lowLevel : level === "medium" ? t.mediumLevel : t.highLevel}
                    </h2>
                    <p className="text-[#57534E] max-w-md mx-auto">
                      {level === "low" ? t.lowDesc : level === "medium" ? t.mediumDesc : t.highDesc}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-[#FAFAF9] rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-[#1B4332] mb-4 flex items-center gap-2">
                      💡 {t.recommendations}
                    </h3>
                    <ul className="space-y-3">
                      {(level === "low" ? [t.lowRec1, t.lowRec2, t.lowRec3, t.lowRec4] :
                        level === "medium" ? [t.medRec1, t.medRec2, t.medRec3, t.medRec4] :
                        [t.highRec1, t.highRec2, t.highRec3, t.highRec4]).map((rec, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${level === "low" ? "bg-[#C9705F]" : level === "medium" ? "bg-[#D4A574]" : "bg-[#40916C]"}`}>
                            {i + 1}
                          </span>
                          <span className="text-[#57534E]">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={resetQuiz}
                      className="px-8 py-4 bg-[#1B4332] text-white rounded-xl font-semibold hover:bg-[#2D6A4F] transition-colors"
                    >
                      🔄 {t.retakeQuiz}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Calculator Section */}
          {activeTab === "calculator" && (
            <div className="bg-white rounded-2xl shadow-lg border border-[#E7E5E4] overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-[#5B8FB9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📊</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1B4332] mb-4">{t.calculatorTitle}</h2>
                  <p className="text-[#57534E] max-w-md mx-auto">{t.calculatorDescription}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Employees */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B4332] mb-2">
                      👥 {t.employees}
                    </label>
                    <input
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-[#E7E5E4] rounded-xl focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-all"
                      min="1"
                    />
                  </div>

                  {/* Average Salary */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B4332] mb-2">
                      💰 {t.avgSalary}
                    </label>
                    <input
                      type="number"
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-[#E7E5E4] rounded-xl focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-all"
                      min="0"
                    />
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B4332] mb-2">
                      🌍 {t.currency}
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E7E5E4] rounded-xl focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-all"
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
                    <label className="block text-sm font-medium text-[#1B4332] mb-2">
                      📈 {t.inclusionLevel}
                    </label>
                    <select
                      value={calcInclusionLevel}
                      onChange={(e) => setCalcInclusionLevel(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E7E5E4] rounded-xl focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-all"
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
                    className="px-8 py-4 bg-[#1B4332] text-white rounded-xl font-semibold hover:bg-[#2D6A4F] transition-colors shadow-lg hover:shadow-xl"
                  >
                    {t.calculate} →
                  </button>
                </div>

                {calculated && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Results */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-[#C9705F]/10 rounded-xl p-6 border border-[#C9705F]/20">
                        <div className="text-sm text-[#C9705F] font-medium mb-2">📉 {t.estimatedLoss}</div>
                        <div className="text-3xl font-bold text-[#C9705F]">{formatCurrency(calculateLoss())}</div>
                      </div>
                      <div className="bg-[#40916C]/10 rounded-xl p-6 border border-[#40916C]/20">
                        <div className="text-sm text-[#40916C] font-medium mb-2">📈 {t.potentialSavings}</div>
                        <div className="text-3xl font-bold text-[#40916C]">{formatCurrency(calculateSavings())}</div>
                      </div>
                    </div>

                    {/* Insight */}
                    <div className="bg-[#5B8FB9]/10 rounded-xl p-6 border border-[#5B8FB9]/20">
                      <div className="flex items-start gap-4">
                        <span className="text-2xl">💡</span>
                        <div>
                          <p className="text-[#1B4332] font-medium mb-2">{t.insight}</p>
                          <p className="text-sm text-[#57534E]">{t.lossExplanation}</p>
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

      <footer className="border-t border-[#E7E5E4] py-10 bg-white mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-[#57534E] text-sm">
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
