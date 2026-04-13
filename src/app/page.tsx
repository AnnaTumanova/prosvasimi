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
      navJobs: "Jobs",
      ctaEarly: "Get Early Access",
      heroTagline: "Inclusive by design",
      heroTitle: "Work without barriers.",
      heroSubtitle: "Prosvasimi",
      heroDescription: "A talent platform connecting people with disabilities with employers ready for inclusive hiring. Accessible roles, accommodation guidance, and fair practices.",
      heroJoin: "Join the Waitlist",
      heroExplore: "Explore Jobs",
      feature1Title: "Accessible Jobs",
      feature1Desc: "Curated roles with clear accommodations and remote-friendly options.",
      feature2Title: "Guided Hiring",
      feature2Desc: "Templates for employers to run bias-aware, accessible processes.",
      feature3Title: "Profile Matching",
      feature3Desc: "Skills-first matching; highlight strengths, not labels.",
      feature4Title: "Support Network",
      feature4Desc: "NGO partners, peer groups, and legal resources in one place.",
      valuesTitle: "Our Values",
      value1Title: "Equal Opportunity",
      value1Desc: "We work with employers committed to accessibility and fair pay.",
      value2Title: "Simplicity",
      value2Desc: "Clear language, simple flows, focused on real outcomes.",
      value3Title: "Trust",
      value3Desc: "Transparent roles, verified companies, respectful communication.",
      forWhomTitle: "Built for Everyone",
      forCandTitle: "For Candidates",
      forCandDesc: "Find roles that match your skills with accommodations clearly stated. No forced disclosure, just opportunities.",
      forCand1: "Roles tagged with accommodations and remote options",
      forCand2: "Skills-first profile (no forced disclosure)",
      forCand3: "Interview prep & rights guidance",
      forCand4: "Peer community and mentoring",
      forEmpTitle: "For Employers",
      forEmpDesc: "Access a diverse talent pool and build an inclusive workplace with our guidance and tools.",
      forEmp1: "Inclusive JD templates & accommodation checklists",
      forEmp2: "Skills-based shortlists; bias-aware screening",
      forEmp3: "Onboarding playbooks, legal & subsidy pointers",
      forEmp4: "Partnership badges to showcase commitment",
      howTitle: "How It Works",
      how1Title: "Tell us your goals",
      how1Desc: "Sign up as candidate or employer; share needs and constraints.",
      how2Title: "Match & prepare",
      how2Desc: "We surface roles or candidates and guide both sides through accessible steps.",
      how3Title: "Hire inclusively",
      how3Desc: "Offer made with accommodations noted. Ongoing support available.",
      waitlistTitle: "Get Early Access",
      waitlistDesc: "Be first to test Prosvasimi. We'll notify you when pilots open in your region.",
      formIam: "I am a",
      formCandidate: "Candidate",
      formEmployer: "Employer",
      formName: "Name",
      formEmail: "Email",
      formErrEmail: "Please enter a valid email address.",
      joinBtn: "Join Waitlist",
      joinNote: "By joining, you agree to be contacted about pilots. No spam.",
      statusThanks: "Thanks! You're on the list as a",
      roleCandidate: "candidate",
      roleEmployer: "employer",
      faqTitle: "Frequently Asked Questions",
      faq1Q: "Is this only for specific disabilities?",
      faq1A: "No. We focus on skills and accommodations, supporting a broad spectrum, including visible and invisible disabilities.",
      faq2Q: "Do candidates have to disclose disability details?",
      faq2A: "No. Disclosure is optional. We emphasize skills-first profiles.",
      faq3Q: "How do employers ensure accessibility?",
      faq3A: "We provide templates, checklists, and partner guidance to meet accessibility standards and local law.",
      successModalTitle: "You're on the list!",
      successModalMessage: "Thank you for joining the Prosvasimi waitlist. We'll notify you when pilots open in your region.",
      successModalButton: "Got it",
    },
    pl: {
      navOffer: "Co oferujemy",
      navArticles: "Artykuły",
      navJobs: "Oferty pracy",
      ctaEarly: "Wczesny dostęp",
      heroTagline: "Włączająco z założenia",
      heroTitle: "Praca bez barier.",
      heroSubtitle: "Prosvasimi",
      heroDescription: "Platforma łącząca osoby z niepełnosprawnościami z pracodawcami gotowymi na inkluzywne zatrudnianie. Dostępne stanowiska, wskazówki dot. dostosowań i sprawiedliwe praktyki.",
      heroJoin: "Dołącz do listy",
      heroExplore: "Zobacz oferty",
      feature1Title: "Dostępne oferty",
      feature1Desc: "Wyselekcjonowane role z jasnymi dostosowaniami i opcjami pracy zdalnej.",
      feature2Title: "Prowadzona rekrutacja",
      feature2Desc: "Szablony dla pracodawców do prowadzenia bezstronnych, dostępnych procesów.",
      feature3Title: "Dopasowanie profilu",
      feature3Desc: "Dobór na podstawie umiejętności; podkreślaj mocne strony, nie etykiety.",
      feature4Title: "Sieć wsparcia",
      feature4Desc: "Partnerzy NGO, grupy rówieśnicze i zasoby prawne w jednym miejscu.",
      valuesTitle: "Nasze wartości",
      value1Title: "Równe szanse",
      value1Desc: "Współpracujemy z pracodawcami zobowiązanymi do dostępności i uczciwego wynagrodzenia.",
      value2Title: "Prostota",
      value2Desc: "Jasny język, proste ścieżki, koncentracja na efektach.",
      value3Title: "Zaufanie",
      value3Desc: "Transparentne oferty, zweryfikowane firmy, szacunek w komunikacji.",
      forWhomTitle: "Dla wszystkich",
      forCandTitle: "Dla kandydatów",
      forCandDesc: "Znajdź role dopasowane do Twoich umiejętności z jasno określonymi dostosowaniami. Bez wymuszonego ujawniania.",
      forCand1: "Stanowiska oznaczone dostosowaniami i pracą zdalną",
      forCand2: "Profil oparty na umiejętnościach (bez wymuszonego ujawniania)",
      forCand3: "Przygotowanie do rozmów i informacje o prawach",
      forCand4: "Społeczność rówieśnicza i mentoring",
      forEmpTitle: "Dla pracodawców",
      forEmpDesc: "Uzyskaj dostęp do zróżnicowanej puli talentów i buduj inkluzywne miejsce pracy z naszym wsparciem.",
      forEmp1: "Szablony ofert i listy dostosowań",
      forEmp2: "Listy krótkie oparte na umiejętnościach; ograniczanie stronniczości",
      forEmp3: "Playbooki wdrożenia, prawo i dofinansowania",
      forEmp4: "Odznaki partnerstwa pokazujące zaangażowanie",
      howTitle: "Jak to działa",
      how1Title: "Powiedz nam o swoich celach",
      how1Desc: "Zarejestruj się jako kandydat lub pracodawca; podziel się potrzebami.",
      how2Title: "Dopasowanie i przygotowanie",
      how2Desc: "Proponujemy role lub kandydatów i prowadzimy obie strony krok po kroku.",
      how3Title: "Zatrudniaj włączająco",
      how3Desc: "Oferta z ustalonymi dostosowaniami. Zapewniamy dalsze wsparcie.",
      waitlistTitle: "Wczesny dostęp",
      waitlistDesc: "Bądź wśród pierwszych, którzy przetestują Prosvasimi. Powiadomimy Cię, gdy pilotaże ruszą.",
      formIam: "Jestem",
      formCandidate: "Kandydat",
      formEmployer: "Pracodawca",
      formName: "Imię",
      formEmail: "E-mail",
      formErrEmail: "Podaj poprawny adres e-mail.",
      joinBtn: "Dołącz do listy",
      joinNote: "Dołączając, wyrażasz zgodę na kontakt w sprawie pilotaży. Bez spamu.",
      statusThanks: "Dziękujemy! Jesteś na liście jako",
      roleCandidate: "kandydat",
      roleEmployer: "pracodawca",
      faqTitle: "Najczęstsze pytania",
      faq1Q: "Czy to tylko dla określonych niepełnosprawności?",
      faq1A: "Nie. Skupiamy się na umiejętnościach i dostosowaniach, wspierając szerokie spektrum.",
      faq2Q: "Czy kandydaci muszą ujawniać informacje o niepełnosprawności?",
      faq2A: "Nie. Ujawnianie jest opcjonalne. Stawiamy na profil oparty na umiejętnościach.",
      faq3Q: "Jak pracodawcy zapewniają dostępność?",
      faq3A: "Zapewniamy szablony, listy kontrolne i wsparcie partnerów.",
      successModalTitle: "Jesteś na liście!",
      successModalMessage: "Dziękujemy za dołączenie do listy oczekujących Prosvasimi.",
      successModalButton: "Rozumiem",
    },
    ua: {
      navOffer: "Що ми пропонуємо",
      navArticles: "Статті",
      navJobs: "Вакансії",
      ctaEarly: "Ранній доступ",
      heroTagline: "Інклюзивність за замовчуванням",
      heroTitle: "Робота без бар'єрів.",
      heroSubtitle: "Prosvasimi",
      heroDescription: "Платформа талантів, що з'єднує людей з інвалідністю з роботодавцями, готовими до інклюзивного найму. Доступні ролі, рекомендації щодо адаптації та справедливі практики.",
      heroJoin: "Приєднатися до списку",
      heroExplore: "Переглянути вакансії",
      feature1Title: "Доступні вакансії",
      feature1Desc: "Відібрані ролі з чіткими адаптаціями та можливістю віддаленої роботи.",
      feature2Title: "Керований найм",
      feature2Desc: "Шаблони для роботодавців для проведення неупереджених, доступних процесів.",
      feature3Title: "Підбір профілю",
      feature3Desc: "Підбір на основі навичок; підкреслюйте сильні сторони, а не ярлики.",
      feature4Title: "Мережа підтримки",
      feature4Desc: "Партнери НГО, групи однодумців та юридичні ресурси в одному місці.",
      valuesTitle: "Наші цінності",
      value1Title: "Рівні можливості",
      value1Desc: "Ми працюємо з роботодавцями, відданими доступності та справедливій оплаті.",
      value2Title: "Простота",
      value2Desc: "Зрозуміла мова, прості процеси, фокус на реальних результатах.",
      value3Title: "Довіра",
      value3Desc: "Прозорі ролі, перевірені компанії, шанобливе спілкування.",
      forWhomTitle: "Для всіх",
      forCandTitle: "Для кандидатів",
      forCandDesc: "Знайдіть ролі, що відповідають вашим навичкам з чітко зазначеними адаптаціями. Без примусового розкриття.",
      forCand1: "Ролі з позначеними адаптаціями та віддаленою роботою",
      forCand2: "Профіль на основі навичок (без примусового розкриття)",
      forCand3: "Підготовка до співбесіди та інформація про права",
      forCand4: "Спільнота однодумців та менторство",
      forEmpTitle: "Для роботодавців",
      forEmpDesc: "Отримайте доступ до різноманітного пулу талантів та будуйте інклюзивне робоче місце з нашою підтримкою.",
      forEmp1: "Інклюзивні шаблони вакансій та чек-листи адаптацій",
      forEmp2: "Короткі списки на основі навичок; неупереджений відбір",
      forEmp3: "Посібники з адаптації, правові та субсидійні вказівки",
      forEmp4: "Партнерські значки для демонстрації відданості",
      howTitle: "Як це працює",
      how1Title: "Розкажіть про свої цілі",
      how1Desc: "Зареєструйтесь як кандидат або роботодавець; поділіться потребами.",
      how2Title: "Підбір та підготовка",
      how2Desc: "Ми пропонуємо ролі або кандидатів і проводимо обидві сторони через доступні кроки.",
      how3Title: "Наймайте інклюзивно",
      how3Desc: "Пропозиція з зазначеними адаптаціями. Доступна постійна підтримка.",
      waitlistTitle: "Ранній доступ",
      waitlistDesc: "Будьте першими, хто протестує Prosvasimi. Ми повідомимо вас, коли пілотні проекти відкриються.",
      formIam: "Я",
      formCandidate: "Кандидат",
      formEmployer: "Роботодавець",
      formName: "Ім'я",
      formEmail: "Електронна пошта",
      formErrEmail: "Будь ласка, введіть дійсну адресу електронної пошти.",
      joinBtn: "Приєднатися",
      joinNote: "Приєднуючись, ви погоджуєтесь на контакт щодо пілотних проектів. Без спаму.",
      statusThanks: "Дякуємо! Ви у списку як",
      roleCandidate: "кандидат",
      roleEmployer: "роботодавець",
      faqTitle: "Питання та відповіді",
      faq1Q: "Це лише для певних видів інвалідності?",
      faq1A: "Ні. Ми фокусуємось на навичках та адаптаціях, підтримуючи широкий спектр.",
      faq2Q: "Чи повинні кандидати розкривати деталі інвалідності?",
      faq2A: "Ні. Розкриття є добровільним. Ми наголошуємо на профілях, орієнтованих на навички.",
      faq3Q: "Як роботодавці забезпечують доступність?",
      faq3A: "Ми надаємо шаблони, чек-листи та партнерські рекомендації.",
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src="/images/logo.png" 
              alt="Prosvasimi" 
              width={36} 
              height={36}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight text-[#1B4332]">Prosvasimi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Link href="/offer" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navOffer}</Link>
            <Link href="/articles" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navArticles}</Link>
            <Link href="/jobs" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navJobs}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-[#E7E5E4] rounded-lg p-1 text-sm" role="group">
              {(["en", "pl", "ua"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
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

      <main>
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
                <Link 
                  href="/jobs" 
                  className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl border-2 border-[#E7E5E4] text-[#1B4332] font-medium hover:border-[#2D6A4F] hover:bg-[#FAFAF9] transition-all"
                >
                  {t.heroExplore}
                </Link>
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
              <Link href="/jobs" className="hover:text-[#1B4332] transition-colors">{t.navJobs}</Link>
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
