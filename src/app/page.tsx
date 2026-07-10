"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
        className="fixed inset-0 bg-[#1B4332]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-[#40916C]/10 flex items-center justify-center mb-4">
            <svg 
              className="h-8 w-8 text-[#40916C]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 id="success-modal-title" className="text-2xl font-bold text-[#1B4332]">
            {title}
          </h2>
          <p className="mt-3 text-[#2D6A4F]">
            {message}
          </p>
          <button
            onClick={onClose}
            className="mt-6 inline-flex justify-center rounded-xl bg-[#2D6A4F] text-white px-6 py-3 font-medium hover:bg-[#1B4332] transition-colors"
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
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#2D6A4F] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Prosvasimi home">
            <Image
              src="/images/logo.png"
              alt="Prosvasimi logo"
              width={36}
              height={36}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight text-[#1B4332]">Prosvasimi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-sm font-medium" aria-label="Main navigation">
            <Link href="/offer" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2">{t.navOffer}</Link>
            <Link href="/articles" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2">{t.navArticles}</Link>
            <Link href="/quiz" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2">{t.navQuiz}</Link>
            <Link href="/register" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2">Register</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-[#E7E5E4] rounded-lg p-1 text-sm" role="group" aria-label="Language selection">
              {(["en", "pl", "ua"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-3 py-1.5 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2 ${
                    lang === l
                      ? "bg-white text-[#1B4332] shadow-sm"
                      : "text-[#2D6A4F] hover:text-[#1B4332]"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a 
              href="#waitlist" 
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#1B4332] transition-colors"
            >
              {t.ctaEarly}
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-white border-b border-[#E7E5E4]">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-36">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#40916C]/10 text-[#40916C] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#40916C] animate-pulse" />
                {t.heroTagline}
              </span>
              
              <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#1B4332]">
                {t.heroTitle}
                <span className="block text-[#2D6A4F] font-medium text-3xl md:text-4xl lg:text-5xl mt-2">{t.heroSubtitle}</span>
              </h1>
              
              <p className="mt-8 text-lg text-[#2D6A4F] leading-relaxed max-w-2xl">
                {t.heroDescription}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="#waitlist" 
                  className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors"
                >
                  {t.heroJoin}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#how"
                  className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl border-2 border-[#E7E5E4] text-[#1B4332] font-medium hover:border-[#2D6A4F] hover:bg-[#FAFAF9] transition-all"
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
                { icon: "🔍", title: t.feature1Title, desc: t.feature1Desc, color: "bg-[#2D6A4F]" },
                { icon: "🧭", title: t.feature2Title, desc: t.feature2Desc, color: "bg-[#C9705F]" },
                { icon: "🧩", title: t.feature3Title, desc: t.feature3Desc, color: "bg-[#5B8FB9]" },
                { icon: "🤝", title: t.feature4Title, desc: t.feature4Desc, color: "bg-[#D4A574]" },
              ].map((feature, i) => (
                <div key={i} className="group">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-[#1B4332]">{feature.title}</h3>
                  <p className="mt-2 text-[#57534E] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="values" className="py-20 md:py-28 bg-white border-y border-[#E7E5E4]">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-[#1B4332]">
              {t.valuesTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: t.value1Title, desc: t.value1Desc, icon: "⚖️", color: "border-t-[#2D6A4F]" },
                { title: t.value2Title, desc: t.value2Desc, icon: "✨", color: "border-t-[#C9705F]" },
                { title: t.value3Title, desc: t.value3Desc, icon: "🛡️", color: "border-t-[#5B8FB9]" },
              ].map((value, i) => (
                <div key={i} className={`bg-[#FAFAF9] rounded-2xl p-8 border border-[#E7E5E4] ${value.color} border-t-4 hover:shadow-lg transition-all`}>
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-[#1B4332]">{value.title}</h3>
                  <p className="mt-3 text-[#57534E] leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section id="for" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-[#1B4332]">
              {t.forWhomTitle}
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Candidates */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E7E5E4] border-l-4 border-l-[#5B8FB9]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#5B8FB9] text-white text-xl mb-6">
                  👤
                </div>
                <h3 className="text-2xl font-bold text-[#1B4332]">{t.forCandTitle}</h3>
                <p className="mt-3 text-[#57534E]">{t.forCandDesc}</p>
                <ul className="mt-6 space-y-3">
                  {[t.forCand1, t.forCand2, t.forCand3, t.forCand4].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#1B4332]">
                      <svg className="w-5 h-5 text-[#5B8FB9] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Employers */}
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E7E5E4] border-l-4 border-l-[#C9705F]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C9705F] text-white text-xl mb-6">
                  🏢
                </div>
                <h3 className="text-2xl font-bold text-[#1B4332]">{t.forEmpTitle}</h3>
                <p className="mt-3 text-[#57534E]">{t.forEmpDesc}</p>
                <ul className="mt-6 space-y-3">
                  {[t.forEmp1, t.forEmp2, t.forEmp3, t.forEmp4].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#1B4332]">
                      <svg className="w-5 h-5 text-[#C9705F] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* How It Works */}
        <section id="how" className="py-20 md:py-28 bg-[#2D6A4F] text-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">
              {t.howTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: 1, title: t.how1Title, desc: t.how1Desc },
                { n: 2, title: t.how2Title, desc: t.how2Desc },
                { n: 3, title: t.how3Title, desc: t.how3Desc },
              ].map((step) => (
                <div key={step.n} className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#1B4332] font-bold text-lg mb-6">
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
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E7E5E4]">
                <h2 className="text-3xl font-bold tracking-tight text-[#1B4332]">{t.waitlistTitle}</h2>
                <p className="mt-4 text-[#2D6A4F]">{t.waitlistDesc}</p>

                {submitted ? (
                  <div className="mt-8 rounded-xl bg-[#40916C]/10 text-[#1B4332] p-6 border border-[#40916C]/20">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#40916C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <label className="block text-sm font-medium text-[#1B4332] mb-3">{t.formIam}</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          type="button" 
                          onClick={() => setRole("candidate")} 
                          className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                            role === "candidate" 
                              ? "bg-[#2D6A4F] text-white border-[#2D6A4F]" 
                              : "border-[#E7E5E4] text-[#1B4332] hover:border-[#2D6A4F]"
                          }`}
                        >
                          {t.formCandidate}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setRole("employer")} 
                          className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                            role === "employer" 
                              ? "bg-[#2D6A4F] text-white border-[#2D6A4F]" 
                              : "border-[#E7E5E4] text-[#1B4332] hover:border-[#2D6A4F]"
                          }`}
                        >
                          {t.formEmployer}
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#1B4332] mb-2">{t.formName}</label>
                        <input 
                          id="name" 
                          name="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" 
                          placeholder="Anna"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#1B4332] mb-2">{t.formEmail}</label>
                        <input 
                          id="email" 
                          name="email" 
                          type="email"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" 
                          placeholder="you@domain.com"
                          required
                        />
                      </div>
                    </div>

                    {err && <p className="text-sm text-[#FF7A59]">{err}</p>}

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <button 
                        type="submit" 
                        className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors"
                      >
                        {t.joinBtn}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                      <p className="text-sm text-[#2D6A4F]">{t.joinNote}</p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-28 bg-white border-t border-[#E7E5E4]">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-[#1B4332]">
              {t.faqTitle}
            </h2>
            <div className="space-y-6">
              {[
                { q: t.faq1Q, a: t.faq1A },
                { q: t.faq2Q, a: t.faq2A },
                { q: t.faq3Q, a: t.faq3A },
              ].map((faq, i) => (
                <div key={i} className="bg-[#FAFAF9] rounded-2xl p-6 border border-[#E7E5E4]">
                  <h3 className="text-lg font-semibold text-[#1B4332]">{faq.q}</h3>
                  <p className="mt-3 text-[#2D6A4F] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E7E5E4] bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Image 
                src="/images/logo.png" 
                alt="Prosvasimi" 
                width={28} 
                height={28}
              />
              <span className="font-medium text-[#1B4332]">Prosvasimi</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-[#2D6A4F]">
              <a href="#values" className="hover:text-[#1B4332] transition-colors">{t.valuesTitle}</a>
              <a href="#for" className="hover:text-[#1B4332] transition-colors">{t.forWhomTitle}</a>
              <Link href="/offer" className="hover:text-[#1B4332] transition-colors">{t.navOffer}</Link>
              <Link href="/articles" className="hover:text-[#1B4332] transition-colors">{t.navArticles}</Link>
              <Link href="/quiz" className="hover:text-[#1B4332] transition-colors">{t.navQuiz}</Link>
              <Link href="/register" className="hover:text-[#1B4332] transition-colors">Register</Link>
            </nav>
            <p className="text-sm text-[#2D6A4F]">© {new Date().getFullYear()} Prosvasimi</p>
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
