"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const ICON_PATHS = {
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  trendingUp: "M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22M14.25 9h6.5v6.5",
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  chat: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  heart: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  arrowRight: "M13 7l5 5m0 0l-5 5m5-5H6",
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
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [err, setErr] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const translations: Record<Lang, Record<string, string>> = {
    en: {
      ctaEarly: "Get Started",
      heroTagline: "For job seekers · For employers",
      heroTitle: "Accessible Employment & Inclusive Hiring for People with Disabilities",
      heroSubtitle: "Prosvasimi",
      heroDescription: "Connecting motivated talent with barrier-free workplaces and empowering companies to build inclusive hiring pipelines.",
      heroJoin: "I'm Looking for a Job",
      heroExplore: "I'm Hiring / Partnering",
      feature1Title: "Career Clarity",
      feature1Desc: "A focused session to map your options and leave with a written action plan.",
      feature2Title: "Structured Coaching",
      feature2Desc: "Multi-session programs that guide you from uncertainty to a concrete next step.",
      feature3Title: "CV & LinkedIn Help",
      feature3Desc: "Practical, hands-on rewrites to present your experience clearly to employers.",
      feature4Title: "Ongoing Support",
      feature4Desc: "Check-ins between sessions so your momentum doesn't stall.",
      exploreTitle: "Explore Prosvasimi",
      exploreAboutTitle: "About Us",
      exploreAboutDesc: "Our mission, values, and disability-support work as a registered foundation.",
      exploreProductsTitle: "Our Products",
      exploreProductsDesc: "Workshops and hands-on inclusion support for candidates and employers.",
      exploreCooperationTitle: "For Employers",
      exploreCooperationDesc: "Meet your disability-employment quota with a real hiring pipeline — plus partnership options for NGOs.",
      exploreContactTitle: "Contact",
      exploreContactDesc: "Get in touch with a question or partnership idea.",
      exploreCta: "Learn more",
      howTitle: "How It Works",
      how1Title: "Book a discovery call",
      how1Desc: "A free 20-minute call to understand your goals and see if we're a fit.",
      how2Title: "Choose your path",
      how2Desc: "Pick a single Career Clarity Session or the full Career Pivot Package.",
      how3Title: "Move forward with a plan",
      how3Desc: "Leave with a concrete action plan and ongoing support if you need it.",
      formErrEmail: "Please enter a valid email address.",
      candidateTitle: "Get CV Review & Match with Open Roles",
      candidateIntro: "Submit your CV for a personalized manual review by our inclusion experts within 48 hours.",
      candidateName: "Full Name",
      candidateEmail: "Email",
      candidatePhone: "Phone / Telegram handle",
      candidateRole: "Target Role / Core Skills",
      candidateCV: "CV / Resume file",
      candidateNeeds: "Specific accessibility needs / workplace accommodations",
      candidateCta: "Get CV Review & Match with Open Roles",
      employerTitle: "Apply for Pilot Partnership",
      employerIntro: "Start building an inclusive hiring pipeline with Prosvasimi.",
      employerCompany: "Company Name",
      employerContact: "Contact Person",
      employerEmail: "Work Email",
      employerOpenRoles: "Current hiring needs (number of open roles, remote vs on-site)",
      employerServices: "Interest area",
      employerServicePilot: "Inclusive Hiring Pilot (1–3 open roles)",
      employerServiceAudit: "Job Description & Career Page Accessibility Mini-Audit",
      employerServiceWorkshop: "Inclusive Recruitment Workshop for HR/Talent Acquisition",
      employerCta: "Apply for Pilot Partnership",
      faqTitle: "Frequently Asked Questions",
      faq1Q: "Is this free for job seekers?",
      faq1A: "Yes. CV reviews, matching, and our first-stage support are completely free for candidates.",
      faq2Q: "How does Prosvasimi vet workplace accessibility?",
      faq2A: "We evaluate employer readiness, job descriptions, and workplace accommodation practices before recommending roles to candidates.",
      faq3Q: "What types of accommodations do you support?",
      faq3A: "We support remote and flexible work, assistive technology, adjusted interviews, and other disability-related workplace adjustments.",
      faq4Q: "How do pilot programs work for companies?",
      faq4A: "We run a 1–3 role pilot where we source, screen, and support candidates through onboarding while coaching your HR team on inclusive recruitment.",
      successModalTitle: "Application received",
      successModalMessage: "Thank you. Our team will review your submission and follow up within 48 hours.",
      successModalButton: "Got it",
    },
    pl: {
      ctaEarly: "Zacznij teraz",
      heroTagline: "Dla kandydatów · Dla pracodawców",
      heroTitle: "Dostępna praca i inkluzywne zatrudnianie dla osób z niepełnosprawnościami",
      heroSubtitle: "Prosvasimi",
      heroDescription: "Łączymy zmotywowanych kandydatów z barierodajnymi miejscami pracy i wspieramy firmy w budowie inkluzywnych procesów rekrutacyjnych.",
      heroJoin: "Szukam pracy",
      heroExplore: "Rekrutuję / Chcę współpracować",
      feature1Title: "Klarowność kariery",
      feature1Desc: "Skoncentrowana sesja, po której wychodzisz z pisemnym planem działania.",
      feature2Title: "Ustrukturyzowany coaching",
      feature2Desc: "Wieloetapowe programy prowadzące od niepewności do konkretnego następnego kroku.",
      feature3Title: "Pomoc z CV i LinkedIn",
      feature3Desc: "Praktyczne przeredagowanie, by jasno przedstawić Twoje doświadczenie pracodawcom.",
      feature4Title: "Stałe wsparcie",
      feature4Desc: "Kontakt między sesjami, żeby nie stracić tempa.",
      exploreTitle: "Poznaj Prosvasimi",
      exploreAboutTitle: "O nas",
      exploreAboutDesc: "Nasza misja, wartości i wsparcie dla osób z niepełnosprawnościami jako zarejestrowanej fundacji.",
      exploreProductsTitle: "Nasze produkty",
      exploreProductsDesc: "Warsztaty i praktyczne wsparcie inkluzyjne dla kandydatów i pracodawców.",
      exploreCooperationTitle: "Dla pracodawców",
      exploreCooperationDesc: "Spełnij wskaźnik zatrudnienia osób z niepełnosprawnościami dzięki realnej rekrutacji — oraz opcje partnerstwa dla NGO.",
      exploreContactTitle: "Kontakt",
      exploreContactDesc: "Skontaktuj się z nami w sprawie pytania lub pomysłu na współpracę.",
      exploreCta: "Dowiedz się więcej",
      howTitle: "Jak to działa",
      how1Title: "Umów rozmowę wstępną",
      how1Desc: "Bezpłatna 20-minutowa rozmowa, by poznać Twoje cele i sprawdzić dopasowanie.",
      how2Title: "Wybierz swoją ścieżkę",
      how2Desc: "Wybierz pojedynczą Sesję Klarowności Kariery lub pełny Pakiet Zmiany Kariery.",
      how3Title: "Ruszaj naprzód z planem",
      how3Desc: "Wychodzisz z konkretnym planem działania i, jeśli potrzebujesz, dalszym wsparciem.",
      formErrEmail: "Podaj poprawny adres e-mail.",
      candidateTitle: "Przegląd CV i dopasowanie do ofert",
      candidateIntro: "Prześlij swoje CV, aby otrzymać spersonalizowany przegląd od naszych ekspertów inkluzji w ciągu 48 godzin.",
      candidateName: "Imię i nazwisko",
      candidateEmail: "E-mail",
      candidatePhone: "Telefon / Telegram",
      candidateRole: "Docelowa rola / kluczowe umiejętności",
      candidateCV: "Plik CV",
      candidateNeeds: "Potrzeby dostępności / wymagane udogodnienia w pracy",
      candidateCta: "Prześlij CV i uzyskaj dopasowanie",
      employerTitle: "Aplikuj o współpracę pilotażową",
      employerIntro: "Zacznij budować inkluzywny proces rekrutacyjny z Prosvasimi.",
      employerCompany: "Nazwa firmy",
      employerContact: "Osoba do kontaktu",
      employerEmail: "Służbowy e-mail",
      employerOpenRoles: "Aktualne potrzeby rekrutacyjne (liczba ról, zdalnie/stacjonarnie)",
      employerServices: "Obszar zainteresowania",
      employerServicePilot: "Inkluzywny pilot rekrutacyjny (1–3 role)",
      employerServiceAudit: "Mini-audyt dostępności ogłoszeń i strony kariery",
      employerServiceWorkshop: "Warsztat inkluzywnej rekrutacji dla HR",
      employerCta: "Aplikuj o współpracę pilotażową",
      faqTitle: "Najczęstsze pytania",
      faq1Q: "Czy usługa jest bezpłatna dla osób poszukujących pracy?",
      faq1A: "Tak. Przegląd CV, dopasowanie i pierwszy etap wsparcia są dla kandydatów całkowicie bezpłatne.",
      faq2Q: "Jak Prosvasimi weryfikuje dostępność miejsca pracy?",
      faq2A: "Oceniamy gotowość pracodawcy, opisy stanowisk i praktyki dotyczące udogodnień, zanim zarekomendujemy rolę kandydatowi.",
      faq3Q: "Jakie udogodnienia wspieracie?",
      faq3A: "Wspieramy pracę zdalną i elastyczną, technologie asystujące, dostosowane rozmowy kwalifikacyjne i inne korekty związane z niepełnosprawnością.",
      faq4Q: "Jak działają programy pilotażowe dla firm?",
      faq4A: "Prowadzimy pilotaż obejmujący 1–3 role, podczas któgo pozyskujemy, weryfikujemy i wspieramy kandydatów, szkoląc zespół HR w inkluzywnej rekrutacji.",
      successModalTitle: "Aplikacja została przyjęta",
      successModalMessage: "Dziękujemy. Nasz zespół przeanalizuje Twoje zgłoszenie i skontaktuje się w ciągu 48 godzin.",
      successModalButton: "Rozumiem",
    },
    ua: {
      ctaEarly: "Почати",
      heroTagline: "Для шукачів · Для роботодавців",
      heroTitle: "Доступна зайнятість та інклюзивне наймання для людей з інвалідністю",
      heroSubtitle: "Prosvasimi",
      heroDescription: "Поєднуємо мотивованих талантів зі workplaces без бар'єрів та допомагаємо компаніям будувати інклюзивні рекрутингові процеси.",
      heroJoin: "Шукаю роботу",
      heroExplore: "Наймаю / Хочу співпрацювати",
      feature1Title: "Кар'єрна ясність",
      feature1Desc: "Сфокусована сесія, після якої ви отримуєте письмовий план дій.",
      feature2Title: "Структурований коучинг",
      feature2Desc: "Багатоетапні програми, що ведуть від невизначеності до конкретного наступного кроку.",
      feature3Title: "Допомога з резюме та LinkedIn",
      feature3Desc: "Практичне редагування, щоб чітко представити ваш досвід роботодавцям.",
      feature4Title: "Постійна підтримка",
      feature4Desc: "Контакт між сесіями, щоб не втратити темп.",
      exploreTitle: "Дізнайтеся більше про Prosvasimi",
      exploreAboutTitle: "Про нас",
      exploreAboutDesc: "Наша місія, цінності та підтримка людей з інвалідністю як зареєстрованого фонду.",
      exploreProductsTitle: "Наші продукти",
      exploreProductsDesc: "Воркшопи та практична інклюзивна підтримка для кандидатів і роботодавців.",
      exploreCooperationTitle: "Для роботодавців",
      exploreCooperationDesc: "Виконайте квоту працевлаштування людей з інвалідністю через реальний найм — а також партнерство для НГО.",
      exploreContactTitle: "Контакти",
      exploreContactDesc: "Зв'яжіться з нами з питанням чи ідеєю співпраці.",
      exploreCta: "Дізнатися більше",
      howTitle: "Як це працює",
      how1Title: "Забронюйте вступну розмову",
      how1Desc: "Безкоштовна 20-хвилинна розмова, щоб зрозуміти ваші цілі та перевірити відповідність.",
      how2Title: "Оберіть свій шлях",
      how2Desc: "Оберіть окрему Сесію Кар'єрної Ясності або повний Пакет Кар'єрного Переходу.",
      how3Title: "Рухайтесь вперед із планом",
      how3Desc: "Ви отримуєте конкретний план дій і, за потреби, постійну підтримку.",
      formErrEmail: "Будь ласка, введіть дійсну адресу електронної пошти.",
      candidateTitle: "Огляд резюме та підбір вакансій",
      candidateIntro: "Надішліть своє резюме, щоб отримати персоналізований огляд від наших експертів з інклюзії протягом 48 годин.",
      candidateName: "Повне ім'я",
      candidateEmail: "Електронна пошта",
      candidatePhone: "Телефон / Telegram",
      candidateRole: "Цільова роль / ключові навички",
      candidateCV: "Файл резюме",
      candidateNeeds: "Особливі потреби доступності / коригування на робочому місці",
      candidateCta: "Надіслати резюме та отримати підбір",
      employerTitle: "Подати заявку на пілотне партнерство",
      employerIntro: "Почніть будувати інклюзивний рекрутинговий процес із Prosvasimi.",
      employerCompany: "Назва компанії",
      employerContact: "Контактна особа",
      employerEmail: "Робоча електронна пошта",
      employerOpenRoles: "Поточні потреби в наймі (кількість вакансій, віддалено/в офісі)",
      employerServices: "Сфера інтересу",
      employerServicePilot: "Пілот з інклюзивного найму (1–3 вакансії)",
      employerServiceAudit: "Міні-аудит доступності вакансій та сторінки кар'єри",
      employerServiceWorkshop: "Воркшоп інклюзивного рекрутингу для HR",
      employerCta: "Подати заявку на пілотне партнерство",
      faqTitle: "Питання та відповіді",
      faq1Q: "Чи це безкоштовно для шукачів роботи?",
      faq1A: "Так. Огляд резюме, підбір та перший етап підтримки для кандидатів повністю безкоштовні.",
      faq2Q: "Як Prosvasimi перевіряє доступність робочого місця?",
      faq2A: "Ми оцінюємо готовність роботодавця, описи вакансій та практики адаптації робочого місця, перш ніж рекомендувати роль кандидату.",
      faq3Q: "Які коригування робочого місця ви підтримуєте?",
      faq3A: "Ми підтримуємо віддалену та гнучку роботу, допоміжні технології, адаптовані співбесіди та інші коригування, пов'язані з інвалідністю.",
      faq4Q: "Як працюють пілотні програми для компаній?",
      faq4A: "Ми проводимо пілот на 1–3 вакансії, під час якого знаходимо, перевіряємо та підтримуємо кандидатів, навчаючи вашу HR-команду інклюзивному рекрутингу.",
      successModalTitle: "Заявку отримано",
      successModalMessage: "Дякуємо. Наша команда розгляне вашу заявку та зв'яжеться протягом 48 годин.",
      successModalButton: "Зрозуміло",
    },
  };

  const t = translations[lang];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [e.target.name]: file.name }));
    }
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target;
    const current = (formData[name] as string[] | undefined) ?? [];
    const next = checked ? [...current, value] : current.filter((v) => v !== value);
    setFormData((prev) => ({ ...prev, [name]: next }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, type: "candidate" | "employer") {
    e.preventDefault();
    setErr("");
    const email = (formData[`${type}-email`] as string | undefined) ?? "";
    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr(t.formErrEmail);
      return;
    }

    const payload: Record<string, unknown> = { type, email, lang, submittedAt: new Date().toISOString() };
    if (type === "candidate") {
      payload.name = formData["candidate-name"];
      payload.phone = formData["candidate-phone"];
      payload.roleSkills = formData["candidate-role"];
      payload.cvFileName = formData["candidate-cv"];
      payload.accessibility = formData["candidate-needs"];
    } else {
      payload.company = formData["employer-company"];
      payload.contact = formData["employer-contact"];
      payload.openRoles = formData["employer-roles"];
      payload.remote = formData["employer-remote"];
      payload.needs = formData["employer-needs"];
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setShowSuccessModal(true);
      setFormData({});
    } catch {
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

              <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-white">
                {t.heroTitle}
              </h1>

              <p className="mt-8 text-xl text-white/80 leading-relaxed max-w-2xl">
                {t.heroDescription}
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#candidate-form"
                  className="inline-flex justify-center items-center gap-2 px-8 py-5 rounded-xl bg-[#16A97A] text-white font-bold text-lg hover:bg-[#0F7A52] transition-colors"
                >
                  {t.heroJoin}
                </a>
                <a
                  href="#employer-form"
                  className="inline-flex justify-center items-center gap-2 px-8 py-5 rounded-xl bg-white text-[#0B2818] font-bold text-lg hover:bg-[#16A97A] hover:text-white transition-colors"
                >
                  {t.heroExplore}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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

        {/* Explore Section */}
        <section id="explore" className="py-20 md:py-28 bg-white border-y border-[#D9D9DC]">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-[#0B2818]">
              {t.exploreTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { href: "/about", title: t.exploreAboutTitle, desc: t.exploreAboutDesc, icon: ICON_PATHS.heart, color: "bg-[#0F7A52]" },
                { href: "/products", title: t.exploreProductsTitle, desc: t.exploreProductsDesc, icon: ICON_PATHS.trendingUp, color: "bg-[#0B2818]" },
                { href: "/cooperation", title: t.exploreCooperationTitle, desc: t.exploreCooperationDesc, icon: ICON_PATHS.building, color: "bg-[#0D5C3E]" },
                { href: "/contact", title: t.exploreContactTitle, desc: t.exploreContactDesc, icon: ICON_PATHS.chat, color: "bg-[#16A97A]" },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group bg-[#FFFFFF] rounded-2xl p-8 border-2 border-[#D9D9DC] hover:border-[#0F7A52] hover:shadow-lg transition-all flex flex-col"
                >
                  <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon path={card.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B2818]">{card.title}</h3>
                  <p className="mt-2 text-[#3F3C3A] leading-relaxed flex-1">{card.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F7A52] group-hover:gap-2.5 transition-all">
                    {t.exploreCta}
                    <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4" />
                  </span>
                </Link>
              ))}
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

        {/* Intake Forms */}
        <section className="py-20 md:py-28 bg-[#F4F4F5]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Candidate Form */}
              <section id="candidate-form" className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-[#0B2818]">{t.candidateTitle}</h2>
                <p className="mt-3 text-[#0F7A52]">{t.candidateIntro}</p>

                <form onSubmit={(e) => handleSubmit(e, "candidate")} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="candidate-name" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.candidateName}
                    </label>
                    <input
                      id="candidate-name"
                      name="candidate-name"
                      type="text"
                      value={(formData["candidate-name"] as string) || ""}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      placeholder="Anna"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="candidate-email" className="block text-sm font-medium text-[#0B2818] mb-2">
                        {t.candidateEmail}
                      </label>
                      <input
                        id="candidate-email"
                        name="candidate-email"
                        type="email"
                        value={(formData["candidate-email"] as string) || ""}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                        placeholder="you@domain.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="candidate-phone" className="block text-sm font-medium text-[#0B2818] mb-2">
                        {t.candidatePhone}
                      </label>
                      <input
                        id="candidate-phone"
                        name="candidate-phone"
                        type="text"
                        value={(formData["candidate-phone"] as string) || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                        placeholder="+48 123 456 789"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="candidate-role" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.candidateRole}
                    </label>
                    <input
                      id="candidate-role"
                      name="candidate-role"
                      type="text"
                      value={(formData["candidate-role"] as string) || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      placeholder="Project manager, administration, customer support..."
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-cv" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.candidateCV}
                    </label>
                    <input
                      id="candidate-cv"
                      name="candidate-cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFile}
                      className="w-full text-sm text-[#3F3C3A] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#16A97A]/10 file:text-[#0F7A52] file:font-semibold"
                    />
                    {(formData["candidate-cv"] as string) && (
                      <p className="mt-2 text-sm text-[#0F7A52]">Selected: {formData["candidate-cv"] as string}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="candidate-needs" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.candidateNeeds}
                    </label>
                    <textarea
                      id="candidate-needs"
                      name="candidate-needs"
                      value={(formData["candidate-needs"] as string) || ""}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      placeholder="Remote work, screen-reader friendly materials, adjusted interview..."
                    />
                  </div>

                  {err && <p className="text-sm text-[#DC2626]">{err}</p>}

                  <button
                    type="submit"
                    className="inline-flex justify-center items-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors"
                  >
                    {t.candidateCta}
                  </button>
                </form>
              </section>

              {/* Employer Form */}
              <section id="employer-form" className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-[#0B2818]">{t.employerTitle}</h2>
                <p className="mt-3 text-[#0F7A52]">{t.employerIntro}</p>

                <form onSubmit={(e) => handleSubmit(e, "employer")} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="employer-company" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.employerCompany}
                    </label>
                    <input
                      id="employer-company"
                      name="employer-company"
                      type="text"
                      value={(formData["employer-company"] as string) || ""}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="employer-contact" className="block text-sm font-medium text-[#0B2818] mb-2">
                        {t.employerContact}
                      </label>
                      <input
                        id="employer-contact"
                        name="employer-contact"
                        type="text"
                        value={(formData["employer-contact"] as string) || ""}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="employer-email" className="block text-sm font-medium text-[#0B2818] mb-2">
                        {t.employerEmail}
                      </label>
                      <input
                        id="employer-email"
                        name="employer-email"
                        type="email"
                        value={(formData["employer-email"] as string) || ""}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                        placeholder="hr@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="employer-roles" className="block text-sm font-medium text-[#0B2818] mb-2">
                      {t.employerOpenRoles}
                    </label>
                    <input
                      id="employer-roles"
                      name="employer-roles"
                      type="text"
                      value={(formData["employer-roles"] as string) || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      placeholder="2 open customer support roles, remote-first"
                    />
                  </div>

                  <div>
                    <label htmlFor="employer-remote" className="block text-sm font-medium text-[#0B2818] mb-2">
                      Work setup
                    </label>
                    <input
                      id="employer-remote"
                      name="employer-remote"
                      type="text"
                      value={(formData["employer-remote"] as string) || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9D9DC] focus:border-[#0F7A52] focus:outline-none transition-colors"
                      placeholder="Remote / on-site / hybrid"
                    />
                  </div>

                  <fieldset className="space-y-3">
                    <legend className="block text-sm font-medium text-[#0B2818]">{t.employerServices}</legend>
                    {[
                      { value: "pilot", label: t.employerServicePilot },
                      { value: "audit", label: t.employerServiceAudit },
                      { value: "workshop", label: t.employerServiceWorkshop },
                    ].map((option) => (
                      <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="employer-needs"
                          value={option.value}
                          checked={((formData["employer-needs"] as string[] | undefined) ?? []).includes(option.value)}
                          onChange={handleCheckbox}
                          className="mt-1 w-5 h-5 text-[#0F7A52] border-2 border-[#D9D9DC] rounded focus:ring-[#0F7A52]"
                        />
                        <span className="text-[#3F3C3A] text-sm leading-snug">{option.label}</span>
                      </label>
                    ))}
                  </fieldset>

                  {err && <p className="text-sm text-[#DC2626]">{err}</p>}

                  <button
                    type="submit"
                    className="inline-flex justify-center items-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0B2818] text-white font-bold hover:bg-[#0F7A52] transition-colors"
                  >
                    {t.employerCta}
                  </button>
                </form>
              </section>
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
                { q: t.faq4Q, a: t.faq4A },
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

      <SiteFooter lang={lang} />

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
