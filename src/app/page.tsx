"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";

const ICON_PATHS = {
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  trendingUp: "M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22M14.25 9h6.5v6.5",
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  chat: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  checkCircle: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  shield: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286z",
  user: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  heart: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
} as const;

function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function SuccessModal({
  isOpen, 
  onClose, 
  title, 
  message, 
  buttonText 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  message: string; 
  buttonText: string;
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div 
        className="fixed inset-0 bg-[#0B2818]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-[#16A97A]/10 flex items-center justify-center mb-4">
            <svg 
              className="h-8 w-8 text-[#16A97A]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 id="success-modal-title" className="text-2xl font-bold text-[#0B2818]">
            {title}
          </h2>
          <p className="mt-3 text-[#0F7A52]">
            {message}
          </p>
          <button
            onClick={onClose}
            className="mt-6 inline-flex justify-center rounded-xl bg-[#0F7A52] text-white px-6 py-3 font-bold hover:bg-[#0B2818] transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  type Lang = "en" | "pl" | "ua";
  const [lang, setLang] = useState<Lang>("en");
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const translations: Record<Lang, Record<string, string>> = {
    en: {
      navOffer: "What We Offer",
      navArticles: "Articles",
      navQuiz: "Quiz",
      ctaEarly: "Get Early Access",
      heroTagline: "Career coaching that gets specific",
      heroTitle: "Find your next career, with confidence.",
      heroSubtitle: "Prosvasimi",
      heroDescription: "Career coaching for people navigating a career change — clarity sessions, structured pivot programs, and practical tools like CV and LinkedIn reviews to help you move forward.",
      heroJoin: "Join the Waitlist",
      heroExplore: "See How It Works",
      feature1Title: "Career Clarity",
      feature1Desc: "A focused session to map your options and leave with a written action plan.",
      feature2Title: "Structured Coaching",
      feature2Desc: "Multi-session programs that guide you from uncertainty to a concrete next step.",
      feature3Title: "CV & LinkedIn Help",
      feature3Desc: "Practical, hands-on rewrites to present your experience clearly to employers.",
      feature4Title: "Ongoing Support",
      feature4Desc: "Check-ins between sessions so your momentum doesn't stall.",
      valuesTitle: "Our Values",
      value1Title: "Practical Results",
      value1Desc: "We focus on concrete next steps and written plans, not vague advice.",
      value2Title: "Simplicity",
      value2Desc: "Clear language, simple flows, focused on real outcomes.",
      value3Title: "Trust",
      value3Desc: "Transparent pricing, experienced coaches, respectful communication.",
      forWhomTitle: "Who We Work With",
      forCandTitle: "For Career Changers",
      forCandDesc: "Get a clear, personalized plan for your next move from a coach who listens first.",
      forCand1: "One-on-one coaching tailored to your situation",
      forCand2: "Written action plan after every clarity session",
      forCand3: "CV and LinkedIn profile review",
      forCand4: "Milestone check-ins between sessions",
      forEmpTitle: "For Organizations",
      forEmpDesc: "Bring structured career coaching to your team, community, or partner network.",
      forEmp1: "Group workshops and coaching packages",
      forEmp2: "Flexible scheduling across time zones",
      forEmp3: "Clear reporting on engagement and outcomes",
      forEmp4: "Partnership options for NGOs and community organizations",
      accessTitle: "Accessibility & Disability Support",
      accessDesc: "Prosvasimi is a registered foundation. We provide free career coaching, professional activation, and support for people with disabilities, chronic illnesses, and neurodivergent individuals — funded by grants and donations, not by the people we help.",
      access1: "Free coaching and career support, funded by grants and donations",
      access2: "Built for people with disabilities, chronic illness, and neurodivergence",
      access3: "Tell us what you need when you book — disclosure is always optional",
      accessCta: "Ask About Free Support",
      howTitle: "How It Works",
      how1Title: "Book a discovery call",
      how1Desc: "A free 20-minute call to understand your goals and see if we're a fit.",
      how2Title: "Choose your path",
      how2Desc: "Pick a single Career Clarity Session or the full Career Pivot Package.",
      how3Title: "Move forward with a plan",
      how3Desc: "Leave with a concrete action plan and ongoing support if you need it.",
      waitlistTitle: "Get Early Access",
      waitlistDesc: "Be first to book a session with Prosvasimi. We'll notify you when we open in your region.",
      formIam: "I am a",
      formCandidate: "Individual",
      formEmployer: "Organization",
      formName: "Name",
      formEmail: "Email",
      formErrEmail: "Please enter a valid email address.",
      joinBtn: "Join Waitlist",
      joinNote: "By joining, you agree to be contacted about pilots. No spam.",
      statusThanks: "Thanks! You're on the list as an",
      roleCandidate: "individual",
      roleEmployer: "organization",
      faqTitle: "Frequently Asked Questions",
      faq1Q: "What is a Career Clarity Session?",
      faq1A: "A single, focused 75-minute session where we map your options and leave you with a written action plan.",
      faq2Q: "Do I need to already know what career I want next?",
      faq2A: "No. Clarifying that is exactly what the first session is for — we start from where you are.",
      faq3Q: "How is this different from generic career advice?",
      faq3A: "Every session is one-on-one and ends with a concrete, written plan tailored to your situation, not general tips.",
      successModalTitle: "You're on the list!",
      successModalMessage: "Thank you for joining the Prosvasimi waitlist. We'll notify you when we open in your region.",
      successModalButton: "Got it",
    },
    pl: {
      navOffer: "Co oferujemy",
      navArticles: "Artykuły",
      navQuiz: "Quiz",
      ctaEarly: "Wczesny dostęp",
      heroTagline: "Coaching kariery, który daje konkrety",
      heroTitle: "Znajdź swoją następną karierę, z pewnością siebie.",
      heroSubtitle: "Prosvasimi",
      heroDescription: "Coaching kariery dla osób zmieniających ścieżkę zawodową — sesje klarowności, ustrukturyzowane programy zmiany kariery oraz praktyczne wsparcie, takie jak przegląd CV i LinkedIn.",
      heroJoin: "Dołącz do listy",
      heroExplore: "Zobacz jak to działa",
      feature1Title: "Klarowność kariery",
      feature1Desc: "Skoncentrowana sesja, po której wychodzisz z pisemnym planem działania.",
      feature2Title: "Ustrukturyzowany coaching",
      feature2Desc: "Wieloetapowe programy prowadzące od niepewności do konkretnego następnego kroku.",
      feature3Title: "Pomoc z CV i LinkedIn",
      feature3Desc: "Praktyczne przeredagowanie, by jasno przedstawić Twoje doświadczenie pracodawcom.",
      feature4Title: "Stałe wsparcie",
      feature4Desc: "Kontakt między sesjami, żeby nie stracić tempa.",
      valuesTitle: "Nasze wartości",
      value1Title: "Konkretne rezultaty",
      value1Desc: "Skupiamy się na konkretnych krokach i pisemnych planach, nie na ogólnikach.",
      value2Title: "Prostota",
      value2Desc: "Jasny język, proste ścieżki, koncentracja na efektach.",
      value3Title: "Zaufanie",
      value3Desc: "Przejrzyste ceny, doświadczeni coachowie, szacunek w komunikacji.",
      forWhomTitle: "Dla kogo pracujemy",
      forCandTitle: "Dla zmieniających karierę",
      forCandDesc: "Uzyskaj jasny, spersonalizowany plan na kolejny krok od coacha, który najpierw słucha.",
      forCand1: "Indywidualny coaching dopasowany do Twojej sytuacji",
      forCand2: "Pisemny plan działania po każdej sesji klarowności",
      forCand3: "Przegląd CV i profilu LinkedIn",
      forCand4: "Kontakt kontrolny między sesjami",
      forEmpTitle: "Dla organizacji",
      forEmpDesc: "Wprowadź ustrukturyzowany coaching kariery do swojego zespołu, społeczności lub sieci partnerskiej.",
      forEmp1: "Warsztaty grupowe i pakiety coachingowe",
      forEmp2: "Elastyczny harmonogram w różnych strefach czasowych",
      forEmp3: "Przejrzyste raportowanie zaangażowania i efektów",
      forEmp4: "Opcje partnerstwa dla organizacji pozarządowych i społeczności",
      accessTitle: "Dostępność i wsparcie dla osób z niepełnosprawnościami",
      accessDesc: "Prosvasimi jest zarejestrowaną fundacją. Zapewniamy bezpłatny coaching kariery, aktywizację zawodową i wsparcie dla osób z niepełnosprawnościami, chorobami przewlekłymi i neuroróżnorodnych — finansowane z grantów i darowizn, a nie przez osoby, którym pomagamy.",
      access1: "Bezpłatny coaching i wsparcie kariery, finansowane z grantów i darowizn",
      access2: "Stworzone dla osób z niepełnosprawnościami, chorobami przewlekłymi i neuroróżnorodnych",
      access3: "Powiedz nam, czego potrzebujesz podczas rezerwacji — ujawnienie jest zawsze opcjonalne",
      accessCta: "Zapytaj o bezpłatne wsparcie",
      howTitle: "Jak to działa",
      how1Title: "Umów rozmowę wstępną",
      how1Desc: "Bezpłatna 20-minutowa rozmowa, by poznać Twoje cele i sprawdzić dopasowanie.",
      how2Title: "Wybierz swoją ścieżkę",
      how2Desc: "Wybierz pojedynczą Sesję Klarowności Kariery lub pełny Pakiet Zmiany Kariery.",
      how3Title: "Ruszaj naprzód z planem",
      how3Desc: "Wychodzisz z konkretnym planem działania i, jeśli potrzebujesz, dalszym wsparciem.",
      waitlistTitle: "Wczesny dostęp",
      waitlistDesc: "Bądź wśród pierwszych, którzy zarezerwują sesję z Prosvasimi. Powiadomimy Cię, gdy ruszymy w Twoim regionie.",
      formIam: "Jestem",
      formCandidate: "Osobą prywatną",
      formEmployer: "Organizacją",
      formName: "Imię",
      formEmail: "E-mail",
      formErrEmail: "Podaj poprawny adres e-mail.",
      joinBtn: "Dołącz do listy",
      joinNote: "Dołączając, wyrażasz zgodę na kontakt w sprawie pilotaży. Bez spamu.",
      statusThanks: "Dziękujemy! Jesteś na liście jako",
      roleCandidate: "osoba prywatna",
      roleEmployer: "organizacja",
      faqTitle: "Najczęstsze pytania",
      faq1Q: "Czym jest Sesja Klarowności Kariery?",
      faq1A: "Pojedyncza, skoncentrowana 75-minutowa sesja, po której otrzymujesz pisemny plan działania.",
      faq2Q: "Czy muszę już wiedzieć, jaką karierę chcę dalej rozwijać?",
      faq2A: "Nie. Wyjaśnienie tego to właśnie cel pierwszej sesji — zaczynamy od miejsca, w którym jesteś.",
      faq3Q: "Czym różni się to od ogólnych porad kariery?",
      faq3A: "Każda sesja jest indywidualna i kończy się konkretnym, pisemnym planem dopasowanym do Twojej sytuacji, a nie ogólnymi wskazówkami.",
      successModalTitle: "Jesteś na liście!",
      successModalMessage: "Dziękujemy za dołączenie do listy oczekujących Prosvasimi.",
      successModalButton: "Rozumiem",
    },
    ua: {
      navOffer: "Що ми пропонуємо",
      navArticles: "Статті",
      navQuiz: "Тест",
      ctaEarly: "Ранній доступ",
      heroTagline: "Кар'єрний коучинг з конкретними результатами",
      heroTitle: "Знайдіть свою наступну кар'єру впевнено.",
      heroSubtitle: "Prosvasimi",
      heroDescription: "Кар'єрний коучинг для людей, що змінюють кар'єру — сесії ясності, структуровані програми переходу та практична підтримка, як-от перегляд резюме та LinkedIn.",
      heroJoin: "Приєднатися до списку",
      heroExplore: "Дізнатися, як це працює",
      feature1Title: "Кар'єрна ясність",
      feature1Desc: "Сфокусована сесія, після якої ви отримуєте письмовий план дій.",
      feature2Title: "Структурований коучинг",
      feature2Desc: "Багатоетапні програми, що ведуть від невизначеності до конкретного наступного кроку.",
      feature3Title: "Допомога з резюме та LinkedIn",
      feature3Desc: "Практичне редагування, щоб чітко представити ваш досвід роботодавцям.",
      feature4Title: "Постійна підтримка",
      feature4Desc: "Контакт між сесіями, щоб не втратити темп.",
      valuesTitle: "Наші цінності",
      value1Title: "Конкретні результати",
      value1Desc: "Ми фокусуємось на конкретних кроках і письмових планах, а не на загальних порадах.",
      value2Title: "Простота",
      value2Desc: "Зрозуміла мова, прості процеси, фокус на реальних результатах.",
      value3Title: "Довіра",
      value3Desc: "Прозорі ціни, досвідчені коучі, шанобливе спілкування.",
      forWhomTitle: "З ким ми працюємо",
      forCandTitle: "Для тих, хто змінює кар'єру",
      forCandDesc: "Отримайте чіткий персоналізований план наступного кроку від коуча, який спершу слухає.",
      forCand1: "Індивідуальний коучинг, адаптований до вашої ситуації",
      forCand2: "Письмовий план дій після кожної сесії ясності",
      forCand3: "Перегляд резюме та профілю LinkedIn",
      forCand4: "Контрольні точки між сесіями",
      forEmpTitle: "Для організацій",
      forEmpDesc: "Впровадьте структурований кар'єрний коучинг у своїй команді, спільноті чи партнерській мережі.",
      forEmp1: "Групові воркшопи та коучингові пакети",
      forEmp2: "Гнучкий розклад у різних часових поясах",
      forEmp3: "Прозора звітність щодо залученості та результатів",
      forEmp4: "Партнерські умови для НГО та спільнот",
      accessTitle: "Доступність та підтримка людей з інвалідністю",
      accessDesc: "Prosvasimi — зареєстрований фонд. Ми надаємо безкоштовний кар'єрний коучинг, професійну активізацію та підтримку людям з інвалідністю, хронічними захворюваннями та нейровідмінністю — фінансовану за рахунок грантів і пожертв, а не коштом людей, яким ми допомагаємо.",
      access1: "Безкоштовний коучинг та кар'єрна підтримка, фінансована грантами та пожертвами",
      access2: "Створено для людей з інвалідністю, хронічними захворюваннями та нейровідмінністю",
      access3: "Скажіть нам, що вам потрібно під час бронювання — розкриття інформації завжди добровільне",
      accessCta: "Запитати про безкоштовну підтримку",
      howTitle: "Як це працює",
      how1Title: "Забронюйте вступну розмову",
      how1Desc: "Безкоштовна 20-хвилинна розмова, щоб зрозуміти ваші цілі та перевірити відповідність.",
      how2Title: "Оберіть свій шлях",
      how2Desc: "Оберіть окрему Сесію Кар'єрної Ясності або повний Пакет Кар'єрного Переходу.",
      how3Title: "Рухайтесь вперед із планом",
      how3Desc: "Ви отримуєте конкретний план дій і, за потреби, постійну підтримку.",
      waitlistTitle: "Ранній доступ",
      waitlistDesc: "Будьте першими, хто забронює сесію з Prosvasimi. Ми повідомимо вас, коли запустимося у вашому регіоні.",
      formIam: "Я",
      formCandidate: "Приватна особа",
      formEmployer: "Організація",
      formName: "Ім'я",
      formEmail: "Електронна пошта",
      formErrEmail: "Будь ласка, введіть дійсну адресу електронної пошти.",
      joinBtn: "Приєднатися",
      joinNote: "Приєднуючись, ви погоджуєтесь на контакт щодо пілотних проектів. Без спаму.",
      statusThanks: "Дякуємо! Ви у списку як",
      roleCandidate: "приватна особа",
      roleEmployer: "організація",
      faqTitle: "Питання та відповіді",
      faq1Q: "Що таке Сесія Кар'єрної Ясності?",
      faq1A: "Окрема, сфокусована 75-хвилинна сесія, після якої ви отримуєте письмовий план дій.",
      faq2Q: "Чи потрібно вже знати, яку кар'єру я хочу далі?",
      faq2A: "Ні. З'ясування цього — саме мета першої сесії. Ми починаємо з того місця, де ви є.",
      faq3Q: "Чим це відрізняється від загальних кар'єрних порад?",
      faq3A: "Кожна сесія індивідуальна і завершується конкретним письмовим планом під вашу ситуацію, а не загальними порадами.",
      successModalTitle: "Ви у списку!",
      successModalMessage: "Дякуємо за приєднання до списку очікування Prosvasimi.",
      successModalButton: "Зрозуміло",
    },
  };

  const t = translations[lang];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr(t.formErrEmail);
      return;
    }
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          lang,
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSubmitted(true);
      setShowSuccessModal(true);
    } catch (e) {
      setErr("Could not submit. Please try again later.");
    }
  }

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-[#0B2818] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F7A52]/20 via-transparent to-transparent" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#16A97A]/40 bg-[#16A97A]/10 text-[#16A97A] text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#16A97A] animate-pulse" />
                {t.heroTagline}
              </span>

              <h1 className="mt-8 text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white">
                {t.heroTitle}
                <span className="block text-[#16A97A] font-black text-4xl md:text-5xl lg:text-6xl mt-3">{t.heroSubtitle}</span>
              </h1>

              <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl">
                {t.heroDescription}
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#waitlist"
                  className="inline-flex justify-center items-center gap-2 px-8 py-5 rounded-xl bg-white text-[#0B2818] font-bold text-lg hover:bg-[#16A97A] hover:text-white transition-colors"
                >
                  {t.heroJoin}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#how"
                  className="inline-flex justify-center items-center gap-2 px-8 py-5 rounded-xl border-2 border-white/25 text-white font-bold text-lg hover:border-white transition-all"
                >
                  {t.heroExplore}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ICON_PATHS.search, title: t.feature1Title, desc: t.feature1Desc, color: "bg-[#0F7A52]" },
                { icon: ICON_PATHS.trendingUp, title: t.feature2Title, desc: t.feature2Desc, color: "bg-[#0B2818]" },
                { icon: ICON_PATHS.document, title: t.feature3Title, desc: t.feature3Desc, color: "bg-[#0D5C3E]" },
                { icon: ICON_PATHS.chat, title: t.feature4Title, desc: t.feature4Desc, color: "bg-[#16A97A]" },
              ].map((feature, i) => (
                <div key={i} className="group">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon path={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B2818]">{feature.title}</h3>
                  <p className="mt-2 text-[#3F3C3A] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="values" className="py-20 md:py-28 bg-white border-y border-[#D9D9DC]">
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

        {/* For Whom Section */}
        <section id="for" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-[#0B2818]">
              {t.forWhomTitle}
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Candidates */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] border-l-4 border-l-[#0D5C3E]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0D5C3E] text-white mb-6">
                  <Icon path={ICON_PATHS.user} className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2818]">{t.forCandTitle}</h3>
                <p className="mt-3 text-[#3F3C3A]">{t.forCandDesc}</p>
                <ul className="mt-6 space-y-3">
                  {[t.forCand1, t.forCand2, t.forCand3, t.forCand4].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#0B2818]">
                      <svg className="w-5 h-5 text-[#0D5C3E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Employers */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] border-l-4 border-l-[#0B2818]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0B2818] text-white mb-6">
                  <Icon path={ICON_PATHS.building} className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2818]">{t.forEmpTitle}</h3>
                <p className="mt-3 text-[#3F3C3A]">{t.forEmpDesc}</p>
                <ul className="mt-6 space-y-3">
                  {[t.forEmp1, t.forEmp2, t.forEmp3, t.forEmp4].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#0B2818]">
                      <svg className="w-5 h-5 text-[#0B2818] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility & Disability Support */}
        <section id="accessibility" className="py-20 md:py-28 bg-white border-t border-[#D9D9DC]">
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
                  href="#waitlist"
                  className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#0F7A52] text-[#0F7A52] font-bold hover:bg-[#0F7A52] hover:text-white transition-colors"
                >
                  {t.accessCta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-20 md:py-28 bg-[#0F7A52] text-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16">
              {t.howTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: 1, title: t.how1Title, desc: t.how1Desc },
                { n: 2, title: t.how2Title, desc: t.how2Desc },
                { n: 3, title: t.how3Title, desc: t.how3Desc },
              ].map((step) => (
                <div key={step.n} className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#0B2818] font-bold text-lg mb-6">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-white/70 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#D9D9DC]">
                <h2 className="text-3xl font-bold tracking-tight text-[#0B2818]">{t.waitlistTitle}</h2>
                <p className="mt-4 text-[#0F7A52]">{t.waitlistDesc}</p>

                {submitted ? (
                  <div className="mt-8 rounded-xl bg-[#16A97A]/10 text-[#0B2818] p-6 border border-[#16A97A]/20">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#16A97A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">
                        {t.statusThanks} <span className="font-bold">{role === "candidate" ? t.roleCandidate : t.roleEmployer}</span>.
                      </span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0B2818] mb-3">{t.formIam}</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          type="button" 
                          onClick={() => setRole("candidate")} 
                          className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                            role === "candidate" 
                              ? "bg-[#0F7A52] text-white border-[#0F7A52]" 
                              : "border-[#D9D9DC] text-[#0B2818] hover:border-[#0F7A52]"
                          }`}
                        >
                          {t.formCandidate}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setRole("employer")} 
                          className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                            role === "employer" 
                              ? "bg-[#0F7A52] text-white border-[#0F7A52]" 
                              : "border-[#D9D9DC] text-[#0B2818] hover:border-[#0F7A52]"
                          }`}
                        >
                          {t.formEmployer}
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#0B2818] mb-2">{t.formName}</label>
                        <input 
                          id="name" 
                          name="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" 
                          placeholder="Anna"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#0B2818] mb-2">{t.formEmail}</label>
                        <input 
                          id="email" 
                          name="email" 
                          type="email"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors" 
                          placeholder="you@domain.com"
                          required
                        />
                      </div>
                    </div>

                    {err && <p className="text-sm text-[#DC2626]">{err}</p>}

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <button 
                        type="submit" 
                        className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors"
                      >
                        {t.joinBtn}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                      <p className="text-sm text-[#0F7A52]">{t.joinNote}</p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-28 bg-white border-t border-[#D9D9DC]">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-[#0B2818]">
              {t.faqTitle}
            </h2>
            <div className="space-y-6">
              {[
                { q: t.faq1Q, a: t.faq1A },
                { q: t.faq2Q, a: t.faq2A },
                { q: t.faq3Q, a: t.faq3A },
              ].map((faq, i) => (
                <div key={i} className="bg-[#FFFFFF] rounded-2xl p-6 border-2 border-[#D9D9DC]">
                  <h3 className="text-lg font-semibold text-[#0B2818]">{faq.q}</h3>
                  <p className="mt-3 text-[#0F7A52] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D9D9DC] bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Image 
                src="/images/logo.png" 
                alt="Prosvasimi" 
                width={28} 
                height={28}
              />
              <span className="font-medium text-[#0B2818]">Prosvasimi</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-[#0F7A52]">
              <a href="#values" className="hover:text-[#0B2818] transition-colors">{t.valuesTitle}</a>
              <a href="#for" className="hover:text-[#0B2818] transition-colors">{t.forWhomTitle}</a>
              <Link href="/offer" className="hover:text-[#0B2818] transition-colors">{t.navOffer}</Link>
              <Link href="/articles" className="hover:text-[#0B2818] transition-colors">{t.navArticles}</Link>
              <Link href="/quiz" className="hover:text-[#0B2818] transition-colors">{t.navQuiz}</Link>
              <Link href="/register" className="hover:text-[#0B2818] transition-colors">Register</Link>
            </nav>
            <p className="text-sm text-[#0F7A52]">© {new Date().getFullYear()} Prosvasimi</p>
          </div>
        </div>
      </footer>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t.successModalTitle}
        message={t.successModalMessage}
        buttonText={t.successModalButton}
      />
    </div>
  );
}
