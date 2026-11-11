"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AiEvaluationLeadForm from "@/components/AiEvaluationLeadForm";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

const ICON_PATHS = {
  checkCircle: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  rocket: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  users: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  chat: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  academic: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
  briefcase: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function AiEvaluationPage() {
  const [lang, setLang] = useLang();

  const translations: Record<Lang, Record<string, string>> = {
    en: {
      heroEyebrow: "Inclusive AI Studio · Specialist service",
      heroTitle: "Test your AI assistant before your customers do.",
      heroSubtitle: "Human + AI evaluation that helps you identify hallucinations, language issues, safety risks and other failure modes before your users do.",
      heroCta: "Request an evaluation",

      product1Title: "AI Evaluation Sprint",
      product1Subtitle: "For companies launching or improving an AI product.",
      product1Includes: "Includes",
      product1Item1: "Custom evaluation dataset",
      product1Item2: "300–1,000 test cases",
      product1Item3: "Human evaluation",
      product1Item4: "Automated evaluation",
      product1Item5: "Error categorization",
      product1Item6: "AI Quality Report",
      product1Delivery: "Typical delivery: 7–14 days",
      product1Cta: "Request an evaluation",

      product2Title: "Multilingual AI Testing",
      product2Subtitle: "For companies entering new markets.",
      product2Body: "Test your AI across the languages and markets that matter to your users.",
      product2UseCasesLabel: "Use cases",
      product2Item1: "AI assistants",
      product2Item2: "Chatbots",
      product2Item3: "RAG",
      product2Item4: "Customer support",
      product2Item5: "AI search",
      product2Item6: "Translation",
      product2Item7: "AI agents",
      product2Cta: "Talk to an expert",

      product3Title: "Continuous AI Evaluation",
      product3Subtitle: "For companies continuously shipping AI.",
      product3Includes: "Includes",
      product3Item1: "Regression testing",
      product3Item2: "Model comparison",
      product3Item3: "Recurring human evaluation",
      product3Item4: "Quality monitoring",
      product3Item5: "Periodic reports",
      product3Cta: "Discuss your use case",

      reportTitle: "What you get",
      reportSubtitle: "A clear, actionable AI Quality Report — not just a score.",
      reportBadge: "Illustrative example — synthetic data, not client results",
      metricOverall: "Overall quality",
      metricLanguage: "Language quality",
      metricInstruction: "Instruction following",
      metricHallucination: "Hallucination rate",
      metricSafety: "Safety",
      failurePatternsTitle: "Top failure patterns",
      failure1: "Incorrect product information",
      failure2: "Long-form hallucinations",
      failure3: "Inconsistent terminology",
      recommendationsTitle: "Recommendations",
      rec1: "Improve retrieval for X",
      rec2: "Add evaluation cases for Y",
      rec3: "Modify system prompt for Z",

      forCompaniesTitle: "Who it's for",

      audience1Title: "AI startups",
      audience1Desc: "Evaluate your product before launch.",
      audience2Title: "SMEs deploying AI assistants",
      audience2Desc: "Check your chatbot or assistant gives correct, safe answers.",
      audience3Title: "Businesses using RAG systems",
      audience3Desc: "Verify answers are grounded in your own documents.",
      audience4Title: "Customer support automation",
      audience4Desc: "Test automated replies across real customer scenarios.",
      audience5Title: "Agencies building AI for clients",
      audience5Desc: "Add independent quality evaluation to your delivery.",
      audience6Title: "AI product teams",
      audience6Desc: "Understand how your models perform across languages.",

      methodTitle: "How we evaluate",
      methodSubtitle: "A structured methodology that combines automated metrics with trained human reviewers.",
      method1Title: "Test dataset preparation",
      method1Desc: "We collect representative questions and scenarios from your domain.",
      method2Title: "Test case generation",
      method2Desc: "We expand them into edge cases, adversarial prompts and language variants.",
      method3Title: "Human evaluation",
      method3Desc: "Trained reviewers rate accuracy, language quality, tone and safety.",
      method4Title: "Automated evaluation",
      method4Desc: "LLM-based and rule-based metrics score every response at scale.",
      method5Title: "Failure categorisation",
      method5Desc: "Errors are grouped into recurring, actionable failure patterns.",
      method6Title: "Quality reporting",
      method6Desc: "You receive an AI Quality Report with metrics and examples.",
      method7Title: "Recommendations",
      method7Desc: "Prioritised fixes for prompts, retrieval, data and guardrails.",

      academyTitle: "Powered by Inclusive AI Academy specialists",
      academyBody: "Trained AI Evaluation Specialists from our Academy take part in human evaluation, multilingual testing and quality assurance — always under the supervision and mentoring of experienced team members. Your project gets careful human review; our trainees get real professional experience.",
      academyCta: "About the Academy",
      backToServices: "All AI services",

      useCasesTitle: "What can we evaluate?",
      useCase1: "AI Assistants",
      useCase2: "RAG systems",
      useCase3: "Customer support bots",
      useCase4: "AI Search",
      useCase5: "AI Agents",
      useCase6: "Translation systems",
      useCase7: "Content generation",
      useCase8: "Voice AI",
    },
    pl: {
      heroEyebrow: "Inclusive AI Studio · Usługa specjalistyczna",
      heroTitle: "Przetestuj swojego asystenta AI, zanim zrobią to klienci.",
      heroSubtitle: "Ewaluacja ludzka i AI, która pomaga wykrywać halucynacje, problemy językowe, zagrożenia bezpieczeństwa i inne błędy, zanim zrobią to Twoi użytkownicy.",
      heroCta: "Poproś o ewaluację",

      product1Title: "AI Evaluation Sprint",
      product1Subtitle: "Dla firm wdrażających lub ulepszających produkt AI.",
      product1Includes: "W zakresie",
      product1Item1: "Dedykowany zbiór danych ewaluacyjnych",
      product1Item2: "300–1000 przypadków testowych",
      product1Item3: "Ewaluacja ludzka",
      product1Item4: "Ewaluacja automatyczna",
      product1Item5: "Kategoryzacja błędów",
      product1Item6: "AI Quality Report",
      product1Delivery: "Typowy czas realizacji: 7–14 dni",
      product1Cta: "Poproś o ewaluację",

      product2Title: "Multilingual AI Testing",
      product2Subtitle: "Dla firm wchodzących na nowe rynki.",
      product2Body: "Przetestuj swoje AI w językach i na rynkach, które są ważne dla Twoich użytkowników.",
      product2UseCasesLabel: "Zastosowania",
      product2Item1: "Asystenci AI",
      product2Item2: "Chatboty",
      product2Item3: "RAG",
      product2Item4: "Obsługa klienta",
      product2Item5: "Wyszukiwanie AI",
      product2Item6: "Tłumaczenia",
      product2Item7: "Agenci AI",
      product2Cta: "Porozmawiaj z ekspertem",

      product3Title: "Continuous AI Evaluation",
      product3Subtitle: "Dla firm, które stale rozwijają swoje AI.",
      product3Includes: "W zakresie",
      product3Item1: "Testy regresji",
      product3Item2: "Porównanie modeli",
      product3Item3: "Cykliczna ewaluacja ludzka",
      product3Item4: "Monitorowanie jakości",
      product3Item5: "Okresowe raporty",
      product3Cta: "Omów swój przypadek",

      reportTitle: "Co otrzymujesz",
      reportSubtitle: "Jasny, praktyczny AI Quality Report — nie tylko wynik liczbowy.",
      reportBadge: "Przykład poglądowy — dane syntetyczne, nie wyniki klienta",
      metricOverall: "Jakość ogólna",
      metricLanguage: "Jakość językowa",
      metricInstruction: "Zgodność z instrukcjami",
      metricHallucination: "Wskaźnik halucynacji",
      metricSafety: "Bezpieczeństwo",
      failurePatternsTitle: "Najczęstsze wzorce błędów",
      failure1: "Nieprawidłowe informacje o produkcie",
      failure2: "Długie halucynacje",
      failure3: "Niespójna terminologia",
      recommendationsTitle: "Rekomendacje",
      rec1: "Popraw retrieval dla X",
      rec2: "Dodaj przypadki testowe dla Y",
      rec3: "Zmodyfikuj system prompt dla Z",

      forCompaniesTitle: "Dla kogo",

      audience1Title: "Startupy AI",
      audience1Desc: "Przetestuj produkt przed premierą.",
      audience2Title: "MŚP wdrażające asystentów AI",
      audience2Desc: "Sprawdź, czy chatbot lub asystent udziela poprawnych i bezpiecznych odpowiedzi.",
      audience3Title: "Firmy korzystające z RAG",
      audience3Desc: "Zweryfikuj, czy odpowiedzi opierają się na Twoich dokumentach.",
      audience4Title: "Automatyzacja obsługi klienta",
      audience4Desc: "Przetestuj automatyczne odpowiedzi na realnych scenariuszach.",
      audience5Title: "Agencje budujące AI dla klientów",
      audience5Desc: "Dodaj niezależną ewaluację jakości do swoich wdrożeń.",
      audience6Title: "Zespoły produktowe AI",
      audience6Desc: "Zrozum, jak Twoje modele działają w różnych językach.",

      methodTitle: "Jak przeprowadzamy ewaluację",
      methodSubtitle: "Ustrukturyzowana metodologia łącząca metryki automatyczne z oceną przeszkolonych recenzentów.",
      method1Title: "Przygotowanie zbioru testowego",
      method1Desc: "Zbieramy reprezentatywne pytania i scenariusze z Twojej dziedziny.",
      method2Title: "Generowanie przypadków testowych",
      method2Desc: "Rozszerzamy je o przypadki brzegowe, prompty adwersaryjne i warianty językowe.",
      method3Title: "Ewaluacja ludzka",
      method3Desc: "Przeszkoleni recenzenci oceniają trafność, język, ton i bezpieczeństwo.",
      method4Title: "Ewaluacja automatyczna",
      method4Desc: "Metryki oparte na LLM i regułach oceniają każdą odpowiedź na dużą skalę.",
      method5Title: "Kategoryzacja błędów",
      method5Desc: "Błędy grupujemy w powtarzalne, praktyczne wzorce.",
      method6Title: "Raport jakości",
      method6Desc: "Otrzymujesz AI Quality Report z metrykami i przykładami.",
      method7Title: "Rekomendacje",
      method7Desc: "Priorytetowe poprawki promptów, retrievalu, danych i zabezpieczeń.",

      academyTitle: "Wspierane przez specjalistów z Inclusive AI Academy",
      academyBody: "Przeszkoleni specjaliści ds. ewaluacji AI z naszej Akademii uczestniczą w ewaluacji ludzkiej, testach wielojęzycznych i kontroli jakości — zawsze pod nadzorem i z mentoringiem doświadczonych członków zespołu. Twój projekt otrzymuje staranną ocenę, a nasi uczestnicy realne doświadczenie zawodowe.",
      academyCta: "O Akademii",
      backToServices: "Wszystkie usługi AI",

      useCasesTitle: "Co możemy ewaluować?",
      useCase1: "Asystenci AI",
      useCase2: "Systemy RAG",
      useCase3: "Boty obsługi klienta",
      useCase4: "Wyszukiwanie AI",
      useCase5: "Agenci AI",
      useCase6: "Systemy tłumaczeniowe",
      useCase7: "Generowanie treści",
      useCase8: "Voice AI",
    },
    ua: {
      heroEyebrow: "Inclusive AI Studio · Спеціалізована послуга",
      heroTitle: "Протестуйте свого AI-асистента раніше, ніж це зроблять клієнти.",
      heroSubtitle: "Людське та AI-оцінювання, яке допомагає виявляти галюцинації, мовні проблеми, ризики безпеки та інші збої раніше, ніж це зроблять ваші користувачі.",
      heroCta: "Запросити оцінювання",

      product1Title: "AI Evaluation Sprint",
      product1Subtitle: "Для компаній, що запускають або покращують AI-продукт.",
      product1Includes: "Включає",
      product1Item1: "Індивідуальний набір даних для оцінювання",
      product1Item2: "300–1000 тестових кейсів",
      product1Item3: "Людське оцінювання",
      product1Item4: "Автоматичне оцінювання",
      product1Item5: "Категоризація помилок",
      product1Item6: "AI Quality Report",
      product1Delivery: "Типовий термін виконання: 7–14 днів",
      product1Cta: "Запросити оцінювання",

      product2Title: "Multilingual AI Testing",
      product2Subtitle: "Для компаній, що виходять на нові ринки.",
      product2Body: "Протестуйте свій AI мовами та на ринках, важливих для ваших користувачів.",
      product2UseCasesLabel: "Сценарії використання",
      product2Item1: "AI-асистенти",
      product2Item2: "Чат-боти",
      product2Item3: "RAG",
      product2Item4: "Підтримка клієнтів",
      product2Item5: "AI-пошук",
      product2Item6: "Переклад",
      product2Item7: "AI-агенти",
      product2Cta: "Поговорити з експертом",

      product3Title: "Continuous AI Evaluation",
      product3Subtitle: "Для компаній, які постійно розвивають свій AI.",
      product3Includes: "Включає",
      product3Item1: "Регресійне тестування",
      product3Item2: "Порівняння моделей",
      product3Item3: "Регулярне людське оцінювання",
      product3Item4: "Моніторинг якості",
      product3Item5: "Періодичні звіти",
      product3Cta: "Обговорити ваш випадок",

      reportTitle: "Що ви отримуєте",
      reportSubtitle: "Чіткий, практичний AI Quality Report — не просто оцінка.",
      reportBadge: "Ілюстративний приклад — синтетичні дані, не результати клієнта",
      metricOverall: "Загальна якість",
      metricLanguage: "Якість мови",
      metricInstruction: "Дотримання інструкцій",
      metricHallucination: "Рівень галюцинацій",
      metricSafety: "Безпека",
      failurePatternsTitle: "Основні патерни збоїв",
      failure1: "Неправильна інформація про продукт",
      failure2: "Розгорнуті галюцинації",
      failure3: "Непослідовна термінологія",
      recommendationsTitle: "Рекомендації",
      rec1: "Покращити retrieval для X",
      rec2: "Додати тестові кейси для Y",
      rec3: "Змінити system prompt для Z",

      forCompaniesTitle: "Для кого",

      audience1Title: "AI-стартапи",
      audience1Desc: "Перевірте продукт перед запуском.",
      audience2Title: "МСП, що впроваджують AI-асистентів",
      audience2Desc: "Переконайтеся, що чат-бот чи асистент дає правильні й безпечні відповіді.",
      audience3Title: "Компанії з RAG-системами",
      audience3Desc: "Перевірте, що відповіді спираються на ваші документи.",
      audience4Title: "Автоматизація підтримки клієнтів",
      audience4Desc: "Протестуйте автоматичні відповіді на реальних сценаріях.",
      audience5Title: "Агенції, що створюють AI для клієнтів",
      audience5Desc: "Додайте незалежне оцінювання якості до своїх проєктів.",
      audience6Title: "Продуктові AI-команди",
      audience6Desc: "Зрозумійте, як ваші моделі працюють різними мовами.",

      methodTitle: "Як ми оцінюємо",
      methodSubtitle: "Структурована методологія, що поєднує автоматичні метрики з оцінкою навчених рецензентів.",
      method1Title: "Підготовка тестового набору",
      method1Desc: "Збираємо репрезентативні питання та сценарії з вашої сфери.",
      method2Title: "Генерація тестових кейсів",
      method2Desc: "Розширюємо їх граничними випадками, змагальними промптами та мовними варіантами.",
      method3Title: "Людське оцінювання",
      method3Desc: "Навчені рецензенти оцінюють точність, мову, тон і безпеку.",
      method4Title: "Автоматичне оцінювання",
      method4Desc: "Метрики на основі LLM і правил оцінюють кожну відповідь у масштабі.",
      method5Title: "Категоризація збоїв",
      method5Desc: "Групуємо помилки в повторювані практичні патерни.",
      method6Title: "Звіт про якість",
      method6Desc: "Ви отримуєте AI Quality Report з метриками та прикладами.",
      method7Title: "Рекомендації",
      method7Desc: "Пріоритизовані виправлення промптів, retrieval, даних і запобіжників.",

      academyTitle: "За участі фахівців Inclusive AI Academy",
      academyBody: "Навчені спеціалісти з оцінювання AI з нашої Академії беруть участь у людському оцінюванні, багатомовному тестуванні та контролі якості — завжди під наглядом і з менторством досвідчених членів команди. Ваш проєкт отримує ретельну людську перевірку, а наші учасники — реальний професійний досвід.",
      academyCta: "Про Академію",
      backToServices: "Усі AI-послуги",

      useCasesTitle: "Що ми можемо оцінювати?",
      useCase1: "AI-асистенти",
      useCase2: "RAG-системи",
      useCase3: "Боти підтримки клієнтів",
      useCase4: "AI-пошук",
      useCase5: "AI-агенти",
      useCase6: "Системи перекладу",
      useCase7: "Генерація контенту",
      useCase8: "Voice AI",
    },
  };

  const t = translations[lang];

  const audiences = [
    { icon: ICON_PATHS.rocket, title: t.audience1Title, desc: t.audience1Desc },
    { icon: ICON_PATHS.building, title: t.audience2Title, desc: t.audience2Desc },
    { icon: ICON_PATHS.document, title: t.audience3Title, desc: t.audience3Desc },
    { icon: ICON_PATHS.chat, title: t.audience4Title, desc: t.audience4Desc },
    { icon: ICON_PATHS.briefcase, title: t.audience5Title, desc: t.audience5Desc },
    { icon: ICON_PATHS.users, title: t.audience6Title, desc: t.audience6Desc },
  ];

  const methodSteps = [1, 2, 3, 4, 5, 6, 7].map((n) => ({ title: t[`method${n}Title`], desc: t[`method${n}Desc`] }));

  const useCases = [t.useCase1, t.useCase2, t.useCase3, t.useCase4, t.useCase5, t.useCase6, t.useCase7, t.useCase8];

  const metrics = [
    { label: t.metricOverall, value: 87 },
    { label: t.metricLanguage, value: 94 },
    { label: t.metricInstruction, value: 89 },
    { label: t.metricHallucination, value: 7 },
    { label: t.metricSafety, value: 96 },
  ];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0B2818]">
          <div className="pointer-events-none absolute -top-40 -left-24 w-[34rem] h-[34rem] rounded-full bg-[#16A97A]/25 blur-[120px]" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/85 text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
                {t.heroEyebrow}
              </span>
              <h1 className="mt-8 text-[2.25rem] sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] sm:leading-[1.1] text-white break-words">
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
                  {t.heroCta}
                </Link>
                <Link
                  href="/services"
                  className="inline-flex justify-center items-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  {t.backToServices}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product 1: Sprint */}
        <section id="sprint" className="py-24 md:py-28 border-b border-black/[0.06]">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.product1Title}</h2>
              <p className="mt-4 text-lg text-[#3F3C3A] leading-relaxed">{t.product1Subtitle}</p>
              <Link
                href="#lead-form"
                className="mt-8 inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-[#0F7A52] text-white font-semibold hover:bg-[#0B2818] transition-colors"
              >
                {t.product1Cta}
              </Link>
            </div>
            <div className="rounded-2xl border border-black/[0.06] bg-[#FAFAF9] p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0F7A52]">{t.product1Includes}</p>
              <ul className="mt-4 space-y-3">
                {[t.product1Item1, t.product1Item2, t.product1Item3, t.product1Item4, t.product1Item5, t.product1Item6].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#0B2818]">
                    <Icon path={ICON_PATHS.checkCircle} className="w-5 h-5 text-[#0F7A52] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-6 border-t border-black/[0.06] text-sm font-medium text-[#3F3C3A]">{t.product1Delivery}</p>
            </div>
          </div>
        </section>

        {/* Product 2: Multilingual */}
        <section id="multilingual" className="py-24 md:py-28 border-b border-black/[0.06] bg-[#FAFAF9]">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.product2Title}</h2>
              <p className="mt-4 text-lg text-[#3F3C3A] leading-relaxed">{t.product2Subtitle}</p>
              <p className="mt-2 text-[#3F3C3A] leading-relaxed">{t.product2Body}</p>
              <Link
                href="#lead-form"
                className="mt-8 inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-[#0F7A52] text-white font-semibold hover:bg-[#0B2818] transition-colors"
              >
                {t.product2Cta}
              </Link>
            </div>
            <div className="rounded-2xl border border-black/[0.06] bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0F7A52]">{t.product2UseCasesLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[t.product2Item1, t.product2Item2, t.product2Item3, t.product2Item4, t.product2Item5, t.product2Item6, t.product2Item7].map((item) => (
                  <span key={item} className="px-3.5 py-1.5 rounded-full bg-[#0F7A52]/8 text-[#0F7A52] text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product 3: Continuous */}
        <section id="continuous" className="py-24 md:py-28 border-b border-black/[0.06]">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.product3Title}</h2>
              <p className="mt-4 text-lg text-[#3F3C3A] leading-relaxed">{t.product3Subtitle}</p>
              <Link
                href="#lead-form"
                className="mt-8 inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-[#0F7A52] text-white font-semibold hover:bg-[#0B2818] transition-colors"
              >
                {t.product3Cta}
              </Link>
            </div>
            <div className="rounded-2xl border border-black/[0.06] bg-[#FAFAF9] p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0F7A52]">{t.product3Includes}</p>
              <ul className="mt-4 space-y-3">
                {[t.product3Item1, t.product3Item2, t.product3Item3, t.product3Item4, t.product3Item5].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#0B2818]">
                    <Icon path={ICON_PATHS.checkCircle} className="w-5 h-5 text-[#0F7A52] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="py-24 md:py-32 bg-[#FAFAF9]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.methodTitle}</h2>
              <p className="mt-4 text-lg text-[#3F3C3A] leading-relaxed">{t.methodSubtitle}</p>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodSteps.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-black/[0.06] p-6 bg-white">
                  <div className="text-xs font-semibold text-[#0F7A52]">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-base font-semibold text-[#0B2818]">{step.title}</h3>
                  <p className="mt-2 text-[15px] text-[#3F3C3A] leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What you get: sample report */}
        <section className="py-24 md:py-32 bg-[#0B2818] text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.reportTitle}</h2>
              <p className="mt-4 text-lg text-white/65">{t.reportSubtitle}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-xl font-semibold">AI Quality Report</h3>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium uppercase tracking-wide">
                  {t.reportBadge}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-white/5 p-4">
                    <div className="text-2xl font-semibold">{m.value}%</div>
                    <div className="mt-1 text-xs text-white/55 leading-snug">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.failurePatternsTitle}</h4>
                  <ol className="mt-3 space-y-2 text-white/80 text-sm list-decimal list-inside">
                    <li>{t.failure1}</li>
                    <li>{t.failure2}</li>
                    <li>{t.failure3}</li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">{t.recommendationsTitle}</h4>
                  <ol className="mt-3 space-y-2 text-white/80 text-sm list-decimal list-inside">
                    <li>{t.rec1}</li>
                    <li>{t.rec2}</li>
                    <li>{t.rec3}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Companies */}
        <section id="for-companies" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16 text-[#0B2818]">
              {t.forCompaniesTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {audiences.map((a, i) => (
                <div key={i} className="rounded-2xl border border-black/[0.06] p-7 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="w-11 h-11 rounded-xl bg-[#0F7A52]/10 flex items-center justify-center mb-5">
                    <Icon path={a.icon} className="w-5 h-5 text-[#0F7A52]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0B2818]">{a.title}</h3>
                  <p className="mt-2 text-[15px] text-[#3F3C3A] leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.useCasesTitle}</h2>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {useCases.map((uc) => (
                <span
                  key={uc}
                  className="px-5 py-2.5 rounded-full border border-black/[0.08] bg-white text-sm font-medium text-[#0B2818]"
                >
                  {uc}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Connection with the Academy */}
        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-[#0F7A52]/20 bg-[#0F7A52]/[0.04] p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="w-12 h-12 rounded-xl bg-[#0F7A52] text-white flex items-center justify-center flex-shrink-0">
                <Icon path={ICON_PATHS.academic} className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold tracking-tight text-[#0B2818]">{t.academyTitle}</h2>
                <p className="mt-3 text-[#3F3C3A] leading-relaxed max-w-3xl">{t.academyBody}</p>
              </div>
              <Link href="/academy" className="inline-flex items-center gap-1.5 font-semibold text-[#0F7A52] hover:text-[#0B2818] whitespace-nowrap">
                {t.academyCta} →
              </Link>
            </div>
          </div>
        </section>

        <AiEvaluationLeadForm lang={lang} />
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
