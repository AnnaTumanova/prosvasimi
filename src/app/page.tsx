"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "./Prosvasimi_primary_logo.png";
import articleImage from "./5204371929274453837.jpg";

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-xl" aria-hidden>
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <p className="text-slate-600 text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}

function Value({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
      <div className="font-semibold">{title}</div>
      <p className="text-slate-600 text-sm mt-2">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <li className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
      <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-900 text-white text-sm font-semibold">{n}</div>
      <div className="mt-3 font-semibold">{title}</div>
      <p className="text-slate-600 text-sm mt-1">{desc}</p>
    </li>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
      <div className="font-semibold">{q}</div>
      <p className="text-slate-600 text-sm mt-2">{a}</p>
    </div>
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
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <svg 
              className="h-8 w-8 text-emerald-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 id="success-modal-title" className="text-2xl font-bold text-slate-900">
            {title}
          </h2>
          <p className="mt-3 text-slate-600">
            {message}
          </p>
          <button
            onClick={onClose}
            className="mt-6 inline-flex justify-center rounded-2xl bg-slate-900 text-white px-6 py-3 font-medium shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 transition-shadow"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  type Lang = "en" | "pl" | "uk";
  const [lang, setLang] = useState<Lang>("en");
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const translations: Record<Lang, Record<string, string>> = {
    en: {
      brandTagline: "Accessible jobs without barriers",
      navWhy: "Why us",
      navFor: "For whom",
      navHow: "How it works",
      navFAQ: "FAQ",
      navArticles: "Articles",
      ctaEarly: "Get early access",
      badgeInclusive: "Inclusive by design",
      heroTitleMain: "Work without barriers.",
      heroTitleBrand: "Prosvasimi",
      heroParagraph:
        "A talent and job platform connecting people with disabilities with employers who are ready for inclusive hiring—providing accessible roles, accommodation guidance, and fair hiring practices.",
      heroJoin: "Join the waitlist",
      heroEmployer: "I am an employer",
      privacy: "We respect privacy. No spam, easy unsubscribe.",
      feature1T: "Accessible Jobs",
      feature1D: "Curated roles with clear accommodations and remote-friendly options.",
      feature2T: "Guided Hiring",
      feature2D: "Templates for employers to run bias-aware, accessible processes.",
      feature3T: "Profile Matching",
      feature3D: "Skills-first matching; highlight strengths, not labels.",
      feature4T: "Support Network",
      feature4D: "NGO partners, peer groups, and legal resources in one place.",
      badgeAA: "AA contrast • Keyboard friendly • Screen reader tested",
      values1T: "Equal opportunity",
      values1D: "We work with employers committed to accessibility and fair pay.",
      values2T: "Simplicity",
      values2D: "Clear language, simple flows, focused on real outcomes.",
      values3T: "Trust",
      values3D: "Transparent roles, verified companies, respectful communication.",
      forCand: "For Candidates",
      forEmp: "For Employers",
      forC1: "• Roles tagged with accommodations and remote options",
      forC2: "• Skills-first profile (no forced disclosure)",
      forC3: "• Interview prep & rights guidance",
      forC4: "• Peer community and mentoring",
      forE1: "• Inclusive JD templates & accommodation checklists",
      forE2: "• Skills-based shortlists; bias-aware screening",
      forE3: "• Onboarding playbooks, legal & subsidy pointers",
      forE4: "• Partnership badges to showcase commitment",
      how1T: "Tell us your goals",
      how1D: "Sign up as candidate or employer; share needs and constraints.",
      how2T: "Match & prepare",
      how2D: "We surface roles or candidates and guide both sides through accessible steps.",
      how3T: "Hire inclusively",
      how3D: "Offer made with accommodations noted. Ongoing support available.",
      waitlistT: "Get Early Access",
      waitlistP: "Be first to test Prosvasimi. We’ll notify you when pilots open in your region.",
      statusThanksPrefix: "Thanks,",
      statusOnList: "You’re on the list as a",
      roleCandidate: "candidate",
      roleEmployer: "employer",
      formIam: "I am a",
      formCandidate: "Candidate",
      formEmployer: "Employer",
      formName: "Name",
      formEmail: "Email",
      formErrEmail: "Please enter a valid email address.",
      joinBtn: "Join waitlist",
      joinNote: "By joining, you agree to be contacted about pilots. No spam.",
      faqT: "FAQ",
      faq1Q: "Is this only for specific disabilities?",
      faq1A:
        "No. We focus on skills and accommodations, supporting a broad spectrum, including visible and invisible disabilities.",
      faq2Q: "Do candidates have to disclose disability details?",
      faq2A: "No. Disclosure is optional. We emphasize skills-first profiles.",
      faq3Q: "How do employers ensure accessibility?",
      faq3A:
        "We provide templates, checklists, and partner guidance to meet accessibility standards and local law.",
      footerBrand: "Prosvasimi",
      footerValues: "Values",
      footerFor: "For whom",
      footerHow: "How it works",
      footerEarly: "Early access",
      footerLang: "Language: EN / PL / UK",
      footerNote:
        "This is an MVP page. Replace the mock submit with your backend endpoint or a no‑code form tool.",
      successModalTitle: "You're on the list!",
      successModalMessage: "Thank you for joining the Prosvasimi waitlist. We'll notify you when pilots open in your region.",
      successModalButton: "Got it",
    },
    pl: {
      brandTagline: "Dostępna praca bez barier",
      navWhy: "Dlaczego my",
      navFor: "Dla kogo",
      navHow: "Jak to działa",
      navFAQ: "Najczęstsze pytania",
      navArticles: "Artykuły",
      ctaEarly: "Wczesny dostęp",
      badgeInclusive: "Włączająco z założenia",
      heroTitleMain: "Praca bez barier.",
      heroTitleBrand: "Prosvasimi",
      heroParagraph:
        "Platforma łącząca osoby z niepełnosprawnościami z pracodawcami gotowymi na inkluzywne zatrudnianie — z dostępnością stanowisk, wskazówkami dot. dostosowań i sprawiedliwymi praktykami rekrutacyjnymi.",
      heroJoin: "Dołącz do listy oczekujących",
      heroEmployer: "Jestem pracodawcą",
      privacy: "Szanujemy prywatność. Bez spamu, łatwa rezygnacja.",
      feature1T: "Dostępne oferty pracy",
      feature1D:
        "Wyselekcjonowane role z jasnymi dostosowaniami i opcjami pracy zdalnej.",
      feature2T: "Prowadzona rekrutacja",
      feature2D:
        "Szablony dla pracodawców do prowadzenia bezstronnych, dostępnych procesów.",
      feature3T: "Dopasowanie profilu",
      feature3D:
        "Dobór na podstawie umiejętności; podkreślaj mocne strony, nie etykiety.",
      feature4T: "Sieć wsparcia",
      feature4D:
        "Partnerzy NGO, grupy rówieśnicze i zasoby prawne w jednym miejscu.",
      badgeAA:
        "Kontrast AA • Przyjazne klawiaturze • Przetestowane z czytnikami ekranu",
      values1T: "Równe szanse",
      values1D:
        "Współpracujemy z pracodawcami zobowiązanymi do dostępności i uczciwego wynagrodzenia.",
      values2T: "Prostota",
      values2D: "Jasny język, proste ścieżki, koncentracja na efektach.",
      values3T: "Zaufanie",
      values3D:
        "Transparentne oferty, zweryfikowane firmy, szacunek w komunikacji.",
      forCand: "Dla kandydatów",
      forEmp: "Dla pracodawców",
      forC1: "• Stanowiska oznaczone dostosowaniami i pracą zdalną",
      forC2: "• Profil oparty na umiejętnościach (bez wymuszonego ujawniania)",
      forC3: "• Przygotowanie do rozmów i informacje o prawach",
      forC4: "• Społeczność rówieśnicza i mentoring",
      forE1: "• Szablony ofert i listy dostosowań",
      forE2: "• Listy krótkie oparte na umiejętnościach; ograniczanie stronniczości",
      forE3: "• Playbooki wdrożenia, prawo i dofinansowania",
      forE4: "• Odznaki partnerstwa pokazujące zaangażowanie",
      how1T: "Powiedz nam o swoich celach",
      how1D:
        "Zarejestruj się jako kandydat lub pracodawca; podziel się potrzebami i ograniczeniami.",
      how2T: "Dopasowanie i przygotowanie",
      how2D:
        "Proponujemy role lub kandydatów i prowadzimy obie strony krok po kroku z zachowaniem dostępności.",
      how3T: "Zatrudniaj włączająco",
      how3D:
        "Oferta z ustalonymi dostosowaniami. Zapewniamy dalsze wsparcie.",
      waitlistT: "Wczesny dostęp",
      waitlistP:
        "Bądź wśród pierwszych, którzy przetestują Prosvasimi. Powiadomimy Cię, gdy pilotaże ruszą w Twoim regionie.",
      statusThanksPrefix: "Dziękujemy,",
      statusOnList: "Jesteś na liście jako",
      roleCandidate: "kandydat",
      roleEmployer: "pracodawca",
      formIam: "Jestem",
      formCandidate: "Kandydat",
      formEmployer: "Pracodawca",
      formName: "Imię",
      formEmail: "E‑mail",
      formErrEmail: "Podaj poprawny adres e‑mail.",
      joinBtn: "Dołącz do listy",
      joinNote:
        "Dołączając, wyrażasz zgodę na kontakt w sprawie pilotaży. Bez spamu.",
      faqT: "Najczęstsze pytania",
      faq1Q: "Czy to tylko dla określonych niepełnosprawności?",
      faq1A:
        "Nie. Skupiamy się na umiejętnościach i dostosowaniach, wspierając szerokie spektrum, także niewidoczne niepełnosprawności.",
      faq2Q:
        "Czy kandydaci muszą ujawniać informacje o niepełnosprawności?",
      faq2A: "Nie. Ujawnianie jest opcjonalne. Stawiamy na profil oparty na umiejętnościach.",
      faq3Q: "Jak pracodawcy zapewniają dostępność?",
      faq3A:
        "Zapewniamy szablony, listy kontrolne i wsparcie partnerów, aby spełnić standardy dostępności i lokalne prawo.",
      footerBrand: "Prosvasimi",
      footerValues: "Wartości",
      footerFor: "Dla kogo",
      footerHow: "Jak to działa",
      footerEarly: "Wczesny dostęp",
      footerLang: "Język: EN / PL / UK",
      footerNote:
        "To strona MVP. Zastąp symulację wysyłki swoim backendem lub narzędziem bez‑kodowym.",
      successModalTitle: "Jesteś na liście!",
      successModalMessage: "Dziękujemy za dołączenie do listy oczekujących Prosvasimi. Powiadomimy Cię, gdy pilotaże ruszą w Twoim regionie.",
      successModalButton: "Rozumiem",
    },
    uk: {
      brandTagline: "Доступна робота без бар'єрів",
      navWhy: "Чому ми",
      navFor: "Для кого",
      navHow: "Як це працює",
      navFAQ: "Питання",
      navArticles: "Статті",
      ctaEarly: "Ранній доступ",
      badgeInclusive: "Інклюзивність за замовчуванням",
      heroTitleMain: "Робота без бар'єрів.",
      heroTitleBrand: "Prosvasimi",
      heroParagraph:
        "Платформа талантів і вакансій, що з'єднує людей з інвалідністю з роботодавцями, готовими до інклюзивного найму — з доступними ролями, рекомендаціями щодо адаптації та справедливими практиками найму.",
      heroJoin: "Приєднатися до списку очікування",
      heroEmployer: "Я роботодавець",
      privacy: "Ми поважаємо конфіденційність. Без спаму, легка відписка.",
      feature1T: "Доступні вакансії",
      feature1D: "Відібрані ролі з чіткими адаптаціями та можливістю віддаленої роботи.",
      feature2T: "Керований найм",
      feature2D: "Шаблони для роботодавців для проведення неупереджених, доступних процесів.",
      feature3T: "Підбір профілю",
      feature3D: "Підбір на основі навичок; підкреслюйте сильні сторони, а не ярлики.",
      feature4T: "Мережа підтримки",
      feature4D: "Партнери НГО, групи однодумців та юридичні ресурси в одному місці.",
      badgeAA: "Контраст AA • Зручно для клавіатури • Перевірено з читачами екрану",
      values1T: "Рівні можливості",
      values1D: "Ми працюємо з роботодавцями, відданими доступності та справедливій оплаті.",
      values2T: "Простота",
      values2D: "Зрозуміла мова, прості процеси, фокус на реальних результатах.",
      values3T: "Довіра",
      values3D: "Прозорі ролі, перевірені компанії, шанобливе спілкування.",
      forCand: "Для кандидатів",
      forEmp: "Для роботодавців",
      forC1: "• Ролі з позначеними адаптаціями та віддаленою роботою",
      forC2: "• Профіль на основі навичок (без примусового розкриття)",
      forC3: "• Підготовка до співбесіди та інформація про права",
      forC4: "• Спільнота однодумців та менторство",
      forE1: "• Інклюзивні шаблони вакансій та чек-листи адаптацій",
      forE2: "• Короткі списки на основі навичок; неупереджений відбір",
      forE3: "• Посібники з адаптації, правові та субсидійні вказівки",
      forE4: "• Партнерські значки для демонстрації відданості",
      how1T: "Розкажіть про свої цілі",
      how1D: "Зареєструйтесь як кандидат або роботодавець; поділіться потребами та обмеженнями.",
      how2T: "Підбір та підготовка",
      how2D: "Ми пропонуємо ролі або кандидатів і проводимо обидві сторони через доступні кроки.",
      how3T: "Наймайте інклюзивно",
      how3D: "Пропозиція з зазначеними адаптаціями. Доступна постійна підтримка.",
      waitlistT: "Ранній доступ",
      waitlistP: "Будьте першими, хто протестує Prosvasimi. Ми повідомимо вас, коли пілотні проекти відкриються у вашому регіоні.",
      statusThanksPrefix: "Дякуємо,",
      statusOnList: "Ви у списку як",
      roleCandidate: "кандидат",
      roleEmployer: "роботодавець",
      formIam: "Я",
      formCandidate: "Кандидат",
      formEmployer: "Роботодавець",
      formName: "Ім'я",
      formEmail: "Електронна пошта",
      formErrEmail: "Будь ласка, введіть дійсну адресу електронної пошти.",
      joinBtn: "Приєднатися до списку",
      joinNote: "Приєднуючись, ви погоджуєтесь на контакт щодо пілотних проектів. Без спаму.",
      faqT: "Питання та відповіді",
      faq1Q: "Це лише для певних видів інвалідності?",
      faq1A:
        "Ні. Ми фокусуємось на навичках та адаптаціях, підтримуючи широкий спектр, включаючи видимі та невидимі інвалідності.",
      faq2Q: "Чи повинні кандидати розкривати деталі інвалідності?",
      faq2A: "Ні. Розкриття є добровільним. Ми наголошуємо на профілях, орієнтованих на навички.",
      faq3Q: "Як роботодавці забезпечують доступність?",
      faq3A:
        "Ми надаємо шаблони, чек-листи та партнерські рекомендації для відповідності стандартам доступності та місцевому законодавству.",
      footerBrand: "Prosvasimi",
      footerValues: "Цінності",
      footerFor: "Для кого",
      footerHow: "Як це працює",
      footerEarly: "Ранній доступ",
      footerLang: "Мова: EN / PL / UK",
      footerNote:
        "Це MVP сторінка. Замініть тестову відправку на ваш бекенд або інструмент без коду.",
      successModalTitle: "Ви у списку!",
      successModalMessage: "Дякуємо за приєднання до списку очікування Prosvasimi. Ми повідомимо вас, коли пілотні проекти відкриються у вашому регіоні.",
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
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3" aria-label="Prosvasimi home">
            <Image src={logo} alt="Prosvasimi logo" className="h-9 w-auto" height={36} />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#values" className="hover:text-slate-700">{t.navWhy}</a>
            <a href="#for" className="hover:text-slate-700">{t.navFor}</a>
            <a href="#how" className="hover:text-slate-700">{t.navHow}</a>
            <a href="#faq" className="hover:text-slate-700">{t.navFAQ}</a>
            <a href="#articles" className="hover:text-slate-700">{t.navArticles}</a>
          </nav>
          <div className="hidden sm:flex items-center gap-1 text-sm text-slate-600" role="group" aria-label="Language switch">
            <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 ${lang === "en" ? "text-slate-900" : "hover:text-slate-900"}`}>
              EN
            </button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setLang("pl")} aria-pressed={lang === "pl"} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 ${lang === "pl" ? "text-slate-900" : "hover:text-slate-900"}`}>
              PL
            </button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setLang("uk")} aria-pressed={lang === "uk"} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 ${lang === "uk" ? "text-slate-900" : "hover:text-slate-900"}`}>
              UK
            </button>
          </div>
          <a href="#waitlist" className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-4 py-2 text-sm font-medium shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400">
            {t.ctaEarly}
          </a>
        </div>
      </header>

      <main>
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium ring-1 ring-emerald-100">{t.badgeInclusive}</span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
                {t.heroTitleMain}
                <span className="block text-slate-500 font-semibold">{t.heroTitleBrand}</span>
              </h1>
              <p className="mt-5 text-lg text-slate-600 max-w-prose">{t.heroParagraph}</p>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a href="#waitlist" className="inline-flex justify-center rounded-2xl bg-slate-900 text-white px-5 py-3 font-medium shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400">
                  {t.heroJoin}
                </a>
                <a href="#for" className="inline-flex justify-center rounded-2xl border border-slate-300 px-5 py-3 font-medium hover:border-slate-400">
                  {t.heroEmployer}
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500">{t.privacy}</p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FeatureCard icon="🔍" title={t.feature1T} desc={t.feature1D} />
                  <FeatureCard icon="🧭" title={t.feature2T} desc={t.feature2D} />
                  <FeatureCard icon="🧩" title={t.feature3T} desc={t.feature3D} />
                  <FeatureCard icon="🤝" title={t.feature4T} desc={t.feature4D} />
                </div>
              </div>
              <div className="absolute -bottom-6 left-6 bg-white text-slate-700 text-xs rounded-full px-3 py-1 shadow ring-1 ring-slate-200">{t.badgeAA}</div>
            </div>
          </div>
        </section>

        <section id="values" className="py-12 sm:py-16 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Value title={t.values1T} desc={t.values1D} />
              <Value title={t.values2T} desc={t.values2D} />
              <Value title={t.values3T} desc={t.values3D} />
            </div>
          </div>
        </section>

        <section id="for" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-start">
            <div className="p-6 rounded-3xl ring-1 ring-slate-200 bg-white shadow-sm">
              <h3 className="text-xl font-semibold">{t.forCand}</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>{t.forC1}</li>
                <li>{t.forC2}</li>
                <li>{t.forC3}</li>
                <li>{t.forC4}</li>
              </ul>
            </div>
            <div className="p-6 rounded-3xl ring-1 ring-slate-200 bg-white shadow-sm">
              <h3 className="text-xl font-semibold">{t.forEmp}</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>{t.forE1}</li>
                <li>{t.forE2}</li>
                <li>{t.forE3}</li>
                <li>{t.forE4}</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="how" className="py-12 sm:py-16 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol className="grid md:grid-cols-3 gap-6">
              <Step n={1} title={t.how1T} desc={t.how1D} />
              <Step n={2} title={t.how2T} desc={t.how2D} />
              <Step n={3} title={t.how3T} desc={t.how3D} />
            </ol>
          </div>
        </section>

        <section id="waitlist" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-slate-200 bg-white p-6 sm:p-8 shadow">
              <h3 className="text-2xl font-semibold">{t.waitlistT}</h3>
              <p className="mt-2 text-slate-600">{t.waitlistP}</p>

              {submitted ? (
                <div role="status" aria-live="polite" className="mt-6 rounded-xl bg-emerald-50 text-emerald-900 p-4 ring-1 ring-emerald-200">
                  {t.statusThanksPrefix} {name || (lang === "pl" ? "przyjacielu/przyjaciółko" : "friend")}! {t.statusOnList}{" "}
                  <span className="font-medium">{role === "candidate" ? t.roleCandidate : t.roleEmployer}</span>.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium">{t.formIam}</label>
                    <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Select role">
                      <button type="button" onClick={() => setRole("candidate")} aria-pressed={role === "candidate"} className={`px-3 py-2 rounded-xl border ${role === "candidate" ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 hover:border-slate-400"}`}>
                        {t.formCandidate}
                      </button>
                      <button type="button" onClick={() => setRole("employer")} aria-pressed={role === "employer"} className={`px-3 py-2 rounded-xl border ${role === "employer" ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 hover:border-slate-400"}`}>
                        {t.formEmployer}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">{t.formName}</label>
                    <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400" placeholder={lang === "pl" ? "Anna" : "Anna"} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">{t.formEmail}</label>
                    <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400" placeholder={lang === "pl" ? "ty@domena.com" : "you@domain.com"} required />
                  </div>
                  {err && <p className="sm:col-span-2 text-sm text-rose-600">{err}</p>}
                  <div className="sm:col-span-2 flex items-center justify-between gap-3">
                    <button type="submit" className="inline-flex justify-center rounded-2xl bg-slate-900 text-white px-5 py-3 font-medium shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400">
                      {t.joinBtn}
                    </button>
                    <p className="text-xs text-slate-500">{t.joinNote}</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h3 className="text-2xl font-semibold">{t.faqT}</h3>
              <dl className="mt-6 space-y-6">
                <Faq q={t.faq1Q} a={t.faq1A} />
                <Faq q={t.faq2Q} a={t.faq2A} />
                <Faq q={t.faq3Q} a={t.faq3A} />
              </dl>
            </div>
          </div>
        </section>

        <section id="articles" className="py-16 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h3 className="text-2xl font-semibold mb-6">{t.navArticles}</h3>
              
              <div className="mb-8">
                <Image 
                  src={articleImage} 
                  alt="Employment of People with Disabilities" 
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>

              <div className="rounded-3xl ring-1 ring-slate-200 bg-white p-6 sm:p-8 shadow">
                <div className="flex gap-2 mb-6" role="tablist" aria-label="Article language">
                  <button 
                    type="button" 
                    onClick={() => setLang("en")} 
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${lang === "en" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                    role="tab"
                    aria-selected={lang === "en"}
                  >
                    English
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setLang("pl")} 
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${lang === "pl" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                    role="tab"
                    aria-selected={lang === "pl"}
                  >
                    Polski
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setLang("uk")} 
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${lang === "uk" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                    role="tab"
                    aria-selected={lang === "uk"}
                  >
                    Українська
                  </button>
                </div>

                {lang === "en" && (
                  <article className="prose prose-slate max-w-none">
                    <h2 className="text-xl font-bold mb-4">Employment of People with Disabilities: Europe vs Poland vs Ukraine</h2>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-2">Why this matters</h3>
                    <p className="text-slate-600 mb-4">
                      Disability is not a niche topic. In the EU, about <strong>24% of people aged 16+</strong> have some form of disability — roughly <strong>107 million people</strong>. Yet work opportunities are still far from equal.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Europe (EU): the gap is still large</h3>
                    <p className="text-slate-600 mb-4">
                      Eurostat&apos;s latest EU-wide figures for <strong>2024</strong> show a <strong>24.0 percentage-point employment gap</strong> between people with and without disabilities. Unemployment is also higher: in 2024, the unemployment rate for people (15–64) with a disability was <strong>9.5%</strong>, vs <strong>5.9%</strong> for people without a disability; for people with a severe disability it reached <strong>11.6%</strong>. And staying unemployed tends to last longer: <strong>45.0%</strong> of unemployed people with a severe disability were unemployed for 12+ months (EU, 2024).
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Poland: millions of people, low employment rate</h3>
                    <p className="text-slate-600 mb-4">
                      Poland has a large community of people with formally recognised disability. Statistics Poland reports about <strong>4.0 million</strong> people with a valid disability certificate/decision as of December 2023. At the same time, labour market participation remains low. Based on Labour Force Survey-based reporting for 2022, the employment rate of people with disabilities of working age was about <strong>32.2%</strong> (with activity rate ~34.2%). OECD analysis also highlights how low participation is: labour force participation of people with disabilities (15–64) was about <strong>34%</strong> in 2022.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Ukraine: war increases disability — and raises urgency for jobs</h3>
                    <p className="text-slate-600 mb-4">
                      Ukraine&apos;s context is shaped by the full-scale invasion and its long-term consequences. A 2025 humanitarian-focused analysis estimates <strong>over 6 million</strong> people in Ukraine may have a disability, with about <strong>3 million formally recognised</strong>, and notes the war is creating new disabilities across ages. Recent Ukraine-focused research (2025) discusses a <strong>~30% employment rate</strong> for people with disabilities and the policy challenge of raising it.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">What&apos;s behind the numbers (common barriers)</h3>
                    <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                      <li>Inaccessible recruitment (forms, interviews, tests, office requirements)</li>
                      <li>Transport and workplace accessibility</li>
                      <li>Benefit traps (fear of losing support when starting work)</li>
                      <li>Skills mismatch and limited reskilling opportunities</li>
                      <li>Employer uncertainty about accommodations and costs</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-2">What helps (practical steps for employers)</h3>
                    <ol className="list-decimal pl-5 text-slate-600 mb-4 space-y-1">
                      <li><strong>Accessible job posts</strong> (clear tasks, essential requirements only, multiple contact options)</li>
                      <li><strong>Flexible formats</strong> (remote/hybrid, flexible hours, written interview options)</li>
                      <li><strong>Accommodation budget + a simple process</strong> (one clear owner, quick decisions)</li>
                      <li><strong>Structured hiring</strong> (reduce bias: scorecards, skills-based tasks)</li>
                      <li><strong>Retention first</strong> (onboarding support, check-ins, manager training)</li>
                    </ol>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Prosvasimi&apos;s goal</h3>
                    <p className="text-slate-600">
                      Prosvasimi exists to connect talent with employers who are ready to hire inclusively — and to make the path to employment clearer, faster, and more accessible for candidates.
                    </p>
                  </article>
                )}

                {lang === "pl" && (
                  <article className="prose prose-slate max-w-none">
                    <h2 className="text-xl font-bold mb-4">Zatrudnienie osób z niepełnosprawnościami: Europa vs Polska vs Ukraina</h2>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-2">Dlaczego to ważne</h3>
                    <p className="text-slate-600 mb-4">
                      Niepełnosprawność nie jest „marginesem". W UE ok. <strong>24% osób w wieku 16+</strong> ma jakąś formę niepełnosprawności — to ok. <strong>107 mln ludzi</strong>. Mimo to dostęp do pracy wciąż nie jest równy.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Europa (UE): luka nadal jest duża</h3>
                    <p className="text-slate-600 mb-4">
                      Najnowsze dane Eurostatu dla <strong>2024</strong> pokazują <strong>24,0 p.p. luki zatrudnienia</strong> między osobami z i bez niepełnosprawności. Również bezrobocie jest wyższe: w 2024 stopa bezrobocia osób (15–64) z niepełnosprawnością wyniosła <strong>9,5%</strong>, a bez niepełnosprawności <strong>5,9%</strong>; przy poważnej niepełnosprawności było to <strong>11,6%</strong>. Dodatkowo bezrobocie częściej jest długotrwałe: <strong>45,0%</strong> bezrobotnych z poważną niepełnosprawnością pozostawało bez pracy 12+ miesięcy (UE, 2024).
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Polska: duża skala, niska aktywność zawodowa</h3>
                    <p className="text-slate-600 mb-4">
                      W Polsce społeczność osób z formalnym orzeczeniem jest liczna. GUS podaje ok. <strong>4,0 mln</strong> osób z ważnym orzeczeniem/decyzją na grudzień 2023. Jednocześnie wskaźniki rynku pracy są niskie. Na podstawie raportowania opartego o BAEL dla 2022, wskaźnik zatrudnienia osób z niepełnosprawnościami w wieku produkcyjnym wynosił ok. <strong>32,2%</strong> (aktywność ok. 34,2%). OECD również zwraca uwagę na niską partycypację: udział osób z niepełnosprawnościami (15–64) w rynku pracy wynosił ok. <strong>34%</strong> w 2022.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Ukraina: wojna zwiększa liczbę osób z niepełnosprawnością i pilność tematu pracy</h3>
                    <p className="text-slate-600 mb-4">
                      W Ukrainie kontekst kształtuje wojna. Analiza z 2025 r. szacuje <strong>ponad 6 mln</strong> osób z niepełnosprawnością (ok. <strong>3 mln formalnie uznanych</strong>) i wskazuje, że wojna powoduje nowe niepełnosprawności w różnych grupach wieku. Badanie dotyczące Ukrainy (2025) omawia <strong>ok. 30% wskaźnik zatrudnienia</strong> osób z niepełnosprawnościami i potrzebę jego zwiększania.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Skąd te różnice (najczęstsze bariery)</h3>
                    <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                      <li>Niedostępne procesy rekrutacji (formularze, rozmowy, testy)</li>
                      <li>Bariery architektoniczne i transportowe</li>
                      <li>Obawa przed utratą świadczeń po podjęciu pracy</li>
                      <li>Niedopasowanie kompetencji i ograniczony dostęp do reskillingu</li>
                      <li>Niepewność pracodawców co do kosztów i dostosowań</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Co działa (konkretne kroki dla pracodawców)</h3>
                    <ol className="list-decimal pl-5 text-slate-600 mb-4 space-y-1">
                      <li><strong>Dostępne ogłoszenia</strong> (jasny zakres zadań, tylko konieczne wymagania)</li>
                      <li><strong>Elastyczne warunki</strong> (zdalnie/hybrydowo, elastyczne godziny)</li>
                      <li><strong>Prosty proces dostosowań</strong> (jedna osoba odpowiedzialna, szybka decyzja)</li>
                      <li><strong>Rekrutacja oparta o umiejętności</strong> (scorecard, zadania praktyczne)</li>
                      <li><strong>Retencja i onboarding</strong> (wsparcie na start, szkolenia dla menedżerów)</li>
                    </ol>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Cel Prosvasimi</h3>
                    <p className="text-slate-600">
                      Prosvasimi łączy talenty z pracodawcami gotowymi zatrudniać inkluzywnie — i upraszcza drogę do pracy, tak aby była realnie dostępna.
                    </p>
                  </article>
                )}

                {lang === "uk" && (
                  <article className="prose prose-slate max-w-none">
                    <h2 className="text-xl font-bold mb-4">Працевлаштування людей з інвалідністю: Європа vs Польща vs Україна</h2>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-2">Чому це важливо</h3>
                    <p className="text-slate-600 mb-4">
                      Інвалідність — це не &quot;вузька тема&quot;. В ЄС приблизно <strong>24% людей віком 16+</strong> мають певну форму інвалідності — це близько <strong>107 мільйонів</strong> людей. Але можливості працевлаштування досі нерівні.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Європа (ЄС): розрив залишається значним</h3>
                    <p className="text-slate-600 mb-4">
                      За найновішими даними Eurostat за <strong>2024 рік</strong>, різниця в рівні зайнятості між людьми з і без інвалідності становить <strong>24,0 в.п.</strong> Безробіття також вище: у 2024 рівень безробіття (15–64) для людей з інвалідністю — <strong>9,5%</strong>, без інвалідності — <strong>5,9%</strong>; для людей із тяжкою інвалідністю — <strong>11,6%</strong>. Крім того, безробіття частіше стає тривалим: <strong>45,0%</strong> безробітних із тяжкою інвалідністю були без роботи 12+ місяців (ЄС, 2024).
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Польща: масштаб великий, рівень зайнятості низький</h3>
                    <p className="text-slate-600 mb-4">
                      У Польщі багато людей мають офіційно підтверджену інвалідність. GUS повідомляє близько <strong>4,0 млн</strong> осіб із чинним посвідченням/рішенням станом на грудень 2023. Водночас участь у ринку праці є низькою. За даними, що базуються на Labour Force Survey для 2022 року, рівень зайнятості людей з інвалідністю працездатного віку становив близько <strong>32,2%</strong> (активність ~34,2%). OECD також підкреслює низьку участь: рівень участі у робочій силі людей з інвалідністю (15–64) — близько <strong>34%</strong> у 2022.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Україна: війна збільшує кількість людей з інвалідністю та робить тему роботи ще критичнішою</h3>
                    <p className="text-slate-600 mb-4">
                      Український контекст визначає війна. Оцінка за 2025 рік говорить про <strong>понад 6 млн</strong> людей з інвалідністю, з яких близько <strong>3 млн офіційно визнані</strong>, і зазначає, що війна спричиняє нові випадки інвалідності серед різних вікових груп. Україно-орієнтоване дослідження (2025) обговорює <strong>приблизно 30% рівень зайнятості</strong> людей з інвалідністю та необхідність його підвищення.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Що стоїть за цифрами (типові бар&apos;єри)</h3>
                    <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                      <li>Недоступні процеси рекрутингу (форми, співбесіди, тести)</li>
                      <li>Транспорт і доступність робочого місця</li>
                      <li>Страх втратити виплати після працевлаштування</li>
                      <li>Невідповідність навичок і слабкий доступ до перекваліфікації</li>
                      <li>Невпевненість роботодавців щодо адаптацій і витрат</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Що працює (практичні кроки для роботодавців)</h3>
                    <ol className="list-decimal pl-5 text-slate-600 mb-4 space-y-1">
                      <li><strong>Доступні вакансії</strong> (чіткі задачі, тільки необхідні вимоги)</li>
                      <li><strong>Гнучкі умови</strong> (remote/гібрид, гнучкий графік)</li>
                      <li><strong>Простий процес адаптацій</strong> (відповідальний контакт, швидкі рішення)</li>
                      <li><strong>Skills-based найм</strong> (чек-листи оцінки, практичні завдання)</li>
                      <li><strong>Онбординг і утримання</strong> (підтримка на старті, навчання менеджерів)</li>
                    </ol>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Мета Prosvasimi</h3>
                    <p className="text-slate-600">
                      Prosvasimi поєднує таланти з доступними роботодавцями та робить шлях до працевлаштування простішим і реальнішим — для людей і для бізнесу.
                    </p>
                  </article>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-10 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6 items-start">
          <div>
            <div className="font-semibold">{t.footerBrand}</div>
            <p className="mt-2 text-slate-600">Building an accessible job platform. {new Date().getFullYear()}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <a href="#values" className="hover:text-slate-700">{t.footerValues}</a>
            <a href="#for" className="hover:text-slate-700">{t.footerFor}</a>
            <a href="#how" className="hover:text-slate-700">{t.footerHow}</a>
            <a href="#waitlist" className="hover:text-slate-700">{t.footerEarly}</a>
          </div>
          <div className="text-slate-500">
            <p className="mb-2">{t.footerLang}</p>
            <p className="text-xs">{t.footerNote}</p>
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
