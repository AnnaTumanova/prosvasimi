"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Lang = "en" | "pl" | "ua";

const workshops = {
  en: [
    {
      id: "ai-job-search",
      title: "AI-Powered Job Search",
      subtitle: "Find Your Dream Role Faster",
      description: "Learn how to leverage ChatGPT, Claude, and other AI tools to optimize your resume, craft compelling cover letters, and discover hidden job opportunities. This hands-on workshop transforms your job search from overwhelming to strategic.",
      duration: "2 hours",
      format: "Online Workshop",
      topics: [
        "Crafting AI-optimized resumes that pass ATS systems",
        "Using AI to research companies and tailor applications",
        "Automating job alerts and application tracking",
        "Interview preparation with AI role-play",
      ],
      number: "01",
      color: "bg-[#2D6A4F]",
      accent: "green",
    },
    {
      id: "ai-learning",
      title: "Learning with AI",
      subtitle: "Accelerate Your Skills Development",
      description: "Discover how to use AI as your personal tutor. From mastering new programming languages to understanding complex regulations, this workshop shows you how to learn anything faster and retain it longer.",
      duration: "2 hours",
      format: "Online Workshop",
      topics: [
        "Creating personalized learning paths with AI",
        "Using AI for instant explanations and examples",
        "Building projects with AI-assisted coding",
        "Staying current with industry trends using AI curation",
      ],
      number: "02",
      color: "bg-[#C9705F]",
      accent: "coral",
    },
    {
      id: "ai-accessibility",
      title: "AI for Workplace Accessibility",
      subtitle: "Tools That Adapt to You",
      description: "Explore AI-powered accessibility tools that can transform your work experience. From voice-to-text and screen readers to task automation, learn how to build a personalized toolkit that works with your unique needs.",
      duration: "2.5 hours",
      format: "Online Workshop",
      topics: [
        "AI-powered assistive technologies overview",
        "Customizing AI tools for your specific needs",
        "Automating repetitive tasks to manage energy",
        "Communicating accommodation needs effectively",
      ],
      number: "03",
      color: "bg-[#5B8FB9]",
      accent: "blue",
    },
  ],
  pl: [
    {
      id: "ai-job-search",
      title: "Szukanie pracy z AI",
      subtitle: "Znajdź wymarzoną rolę szybciej",
      description: "Naucz się wykorzystywać ChatGPT, Claude i inne narzędzia AI do optymalizacji CV, tworzenia przekonujących listów motywacyjnych i odkrywania ukrytych ofert pracy. Ten praktyczny warsztat zmienia poszukiwanie pracy z przytłaczającego w strategiczne.",
      duration: "2 godziny",
      format: "Warsztat online",
      topics: [
        "Tworzenie CV zoptymalizowanych pod AI i systemy ATS",
        "Wykorzystanie AI do researchu firm i personalizacji aplikacji",
        "Automatyzacja alertów o pracę i śledzenie aplikacji",
        "Przygotowanie do rozmów z AI role-play",
      ],
      number: "01",
      color: "bg-[#2D6A4F]",
      accent: "green",
    },
    {
      id: "ai-learning",
      title: "Nauka z AI",
      subtitle: "Przyspiesz rozwój umiejętności",
      description: "Odkryj, jak używać AI jako osobistego tutora. Od opanowania nowych języków programowania po zrozumienie skomplikowanych przepisów — ten warsztat pokazuje, jak uczyć się czegokolwiek szybciej i zapamiętywać na dłużej.",
      duration: "2 godziny",
      format: "Warsztat online",
      topics: [
        "Tworzenie spersonalizowanych ścieżek nauki z AI",
        "Używanie AI do natychmiastowych wyjaśnień i przykładów",
        "Budowanie projektów z pomocą AI w kodowaniu",
        "Śledzenie trendów branżowych z kuratorowaniem AI",
      ],
      number: "02",
      color: "bg-[#C9705F]",
      accent: "coral",
    },
    {
      id: "ai-accessibility",
      title: "AI dla dostępności w pracy",
      subtitle: "Narzędzia dopasowane do Ciebie",
      description: "Poznaj narzędzia dostępności oparte na AI, które mogą zmienić Twoje doświadczenie pracy. Od zamiany głosu na tekst po automatyzację zadań — naucz się budować spersonalizowany zestaw narzędzi.",
      duration: "2,5 godziny",
      format: "Warsztat online",
      topics: [
        "Przegląd technologii wspomagających opartych na AI",
        "Dostosowywanie narzędzi AI do Twoich potrzeb",
        "Automatyzacja powtarzalnych zadań dla zarządzania energią",
        "Skuteczne komunikowanie potrzeb dostosowań",
      ],
      number: "03",
      color: "bg-[#5B8FB9]",
      accent: "blue",
    },
  ],
  ua: [
    {
      id: "ai-job-search",
      title: "Пошук роботи з AI",
      subtitle: "Знайдіть роботу мрії швидше",
      description: "Навчіться використовувати ChatGPT, Claude та інші AI-інструменти для оптимізації резюме, створення переконливих супровідних листів та пошуку прихованих вакансій. Цей практичний воркшоп перетворює пошук роботи зі стресового на стратегічний.",
      duration: "2 години",
      format: "Онлайн воркшоп",
      topics: [
        "Створення резюме, оптимізованих для AI та ATS-систем",
        "Використання AI для дослідження компаній та персоналізації заявок",
        "Автоматизація сповіщень про вакансії та відстеження заявок",
        "Підготовка до співбесід з AI-рольовою грою",
      ],
      number: "01",
      color: "bg-[#2D6A4F]",
      accent: "green",
    },
    {
      id: "ai-learning",
      title: "Навчання з AI",
      subtitle: "Прискорте розвиток навичок",
      description: "Дізнайтеся, як використовувати AI як персонального репетитора. Від опанування нових мов програмування до розуміння складних регуляцій — цей воркшоп показує, як вчитися будь-чому швидше та запам'ятовувати надовше.",
      duration: "2 години",
      format: "Онлайн воркшоп",
      topics: [
        "Створення персоналізованих навчальних шляхів з AI",
        "Використання AI для миттєвих пояснень та прикладів",
        "Створення проектів з AI-асистованим кодуванням",
        "Відстеження галузевих трендів з AI-курацією",
      ],
      number: "02",
      color: "bg-[#C9705F]",
      accent: "coral",
    },
    {
      id: "ai-accessibility",
      title: "AI для доступності на роботі",
      subtitle: "Інструменти, що адаптуються до вас",
      description: "Досліджуйте AI-інструменти доступності, які можуть трансформувати ваш робочий досвід. Від голосу в текст до автоматизації завдань — навчіться створювати персоналізований набір інструментів для ваших унікальних потреб.",
      duration: "2,5 години",
      format: "Онлайн воркшоп",
      topics: [
        "Огляд асистивних технологій на базі AI",
        "Налаштування AI-інструментів під ваші потреби",
        "Автоматизація повторюваних завдань для управління енергією",
        "Ефективне комунікування потреб в адаптаціях",
      ],
      number: "03",
      color: "bg-[#5B8FB9]",
      accent: "blue",
    },
  ],
};

const translations = {
  en: {
    pageTitle: "What We Offer",
    pageSubtitle: "Empowering your career journey with AI-driven workshops and resources",
    workshopsTitle: "Our Workshops",
    workshopsSubtitle: "Practical, hands-on sessions designed for real results",
    duration: "Duration",
    format: "Format",
    topics: "What you'll learn",
    registerInterest: "Register Interest",
    comingSoon: "Coming Soon",
    backHome: "Back to Home",
    navArticles: "Articles",
    navJobs: "Jobs",
    navOffer: "What We Offer",
    modalTitle: "Register Your Interest",
    modalSubtitle: "Be the first to know when this workshop launches",
    formName: "Your Name",
    formEmail: "Email Address",
    formSubmit: "Register",
    formSubmitting: "Registering...",
    formSuccess: "You're registered!",
    formSuccessMsg: "We'll notify you when the workshop is available.",
    formError: "Something went wrong. Please try again.",
    formClose: "Close",
    formEmailError: "Please enter a valid email address.",
    sectionLabel: "Workshop",
  },
  pl: {
    pageTitle: "Co oferujemy",
    pageSubtitle: "Wspieramy Twoją karierę warsztatami i zasobami opartymi na AI",
    workshopsTitle: "Nasze warsztaty",
    workshopsSubtitle: "Praktyczne sesje zaprojektowane dla realnych rezultatów",
    duration: "Czas trwania",
    format: "Format",
    topics: "Czego się nauczysz",
    registerInterest: "Zgłoś zainteresowanie",
    comingSoon: "Wkrótce",
    backHome: "Powrót do strony głównej",
    navArticles: "Artykuły",
    navJobs: "Oferty pracy",
    navOffer: "Co oferujemy",
    modalTitle: "Zgłoś zainteresowanie",
    modalSubtitle: "Bądź pierwszy, gdy warsztat wystartuje",
    formName: "Twoje imię",
    formEmail: "Adres e-mail",
    formSubmit: "Zarejestruj",
    formSubmitting: "Rejestrowanie...",
    formSuccess: "Zarejestrowano!",
    formSuccessMsg: "Powiadomimy Cię, gdy warsztat będzie dostępny.",
    formError: "Coś poszło nie tak. Spróbuj ponownie.",
    formClose: "Zamknij",
    formEmailError: "Podaj poprawny adres e-mail.",
    sectionLabel: "Warsztat",
  },
  ua: {
    pageTitle: "Що ми пропонуємо",
    pageSubtitle: "Підтримуємо вашу кар'єру воркшопами та ресурсами на базі AI",
    workshopsTitle: "Наші воркшопи",
    workshopsSubtitle: "Практичні сесії, розроблені для реальних результатів",
    duration: "Тривалість",
    format: "Формат",
    topics: "Що ви дізнаєтесь",
    registerInterest: "Зареєструвати інтерес",
    comingSoon: "Незабаром",
    backHome: "Повернутися на головну",
    navArticles: "Статті",
    navJobs: "Вакансії",
    navOffer: "Що ми пропонуємо",
    modalTitle: "Зареєструвати інтерес",
    modalSubtitle: "Дізнайтеся першими, коли воркшоп стартує",
    formName: "Ваше ім'я",
    formEmail: "Електронна пошта",
    formSubmit: "Зареєструватися",
    formSubmitting: "Реєстрація...",
    formSuccess: "Ви зареєстровані!",
    formSuccessMsg: "Ми повідомимо вас, коли воркшоп буде доступний.",
    formError: "Щось пішло не так. Спробуйте ще раз.",
    formClose: "Закрити",
    formEmailError: "Будь ласка, введіть дійсну адресу електронної пошти.",
    sectionLabel: "Воркшоп",
  },
};

interface SelectedWorkshop {
  id: string;
  title: string;
}

export default function OfferPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<SelectedWorkshop | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const t = translations[lang];
  const currentWorkshops = workshops[lang];

  const openModal = (workshop: SelectedWorkshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
    setIsSuccess(false);
    setError("");
    setFormName("");
    setFormEmail("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkshop(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formEmail || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(formEmail)) {
      setError(t.formEmailError);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/workshop-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          workshopId: selectedWorkshop?.id,
          workshopTitle: selectedWorkshop?.title,
          lang,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to register");

      setIsSuccess(true);
    } catch (err) {
      setError(t.formError);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Link href="/offer" className="px-4 py-2 text-white bg-[#2D6A4F] rounded-lg hover:bg-[#1B4332] transition-colors">{t.navOffer}</Link>
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
                {t.comingSoon}
              </span>
              
              <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#1B4332]">
                {t.pageTitle}
              </h1>
              
              <p className="mt-8 text-lg text-[#2D6A4F] leading-relaxed max-w-2xl">
                {t.pageSubtitle}
              </p>
              
              <div className="mt-10">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-[#E7E5E4] text-[#1B4332] font-medium hover:border-[#2D6A4F] hover:bg-[#FAFAF9] transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {t.backHome}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Workshops Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1B4332]">
                {t.workshopsTitle}
              </h2>
              <p className="mt-4 text-lg text-[#2D6A4F]">
                {t.workshopsSubtitle}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {currentWorkshops.map((workshop, index) => (
                <article
                  key={workshop.id}
                  className="group relative bg-white rounded-2xl border border-[#E7E5E4] hover:shadow-lg hover:shadow-[#2D6A4F]/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${workshop.color}`} />
                  
                  <div className="p-8">
                    {/* Number badge */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${workshop.color} text-white font-bold text-lg mb-6`}>
                      {workshop.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#1B4332] tracking-tight mb-2">
                      {workshop.title}
                    </h3>
                    <p className="text-[#2D6A4F] font-medium text-sm mb-4">{workshop.subtitle}</p>
                    
                    {/* Meta */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B4332] bg-[#FAFAF9] rounded-lg">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {workshop.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B4332] bg-[#FAFAF9] rounded-lg">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {workshop.format}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[#1B4332]/80 text-sm leading-relaxed mb-6 line-clamp-3">
                      {workshop.description}
                    </p>

                    {/* Topics */}
                    <div className="mb-8">
                      <h4 className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider mb-3">
                        {t.topics}
                      </h4>
                      <ul className="space-y-2">
                        {workshop.topics.slice(0, 3).map((topic, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#40916C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-[#1B4332]">{topic}</span>
                          </li>
                        ))}
                        {workshop.topics.length > 3 && (
                          <li className="text-xs text-[#2D6A4F] pl-6">+{workshop.topics.length - 3} more</li>
                        )}
                      </ul>
                    </div>

                    {/* CTA */}
                    <button 
                      onClick={() => openModal({ id: workshop.id, title: workshop.title })}
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 ${workshop.color} text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity`}
                    >
                      {t.registerInterest}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Registration Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="fixed inset-0 bg-[#1B4332]/60 backdrop-blur-sm" 
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-6 border-b border-[#E7E5E4]">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-[#2D6A4F] hover:text-[#1B4332] hover:bg-[#FAFAF9] rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {isSuccess ? (
                <div className="flex flex-col items-center text-center py-4">
                  <div className="h-14 w-14 rounded-full bg-[#40916C]/10 flex items-center justify-center mb-4">
                    <svg className="h-7 w-7 text-[#40916C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-[#1B4332]">{t.formSuccess}</h2>
                  <p className="mt-2 text-[#2D6A4F]">{t.formSuccessMsg}</p>
                </div>
              ) : (
                <>
                  <h2 id="modal-title" className="text-xl font-semibold text-[#1B4332]">
                    {t.modalTitle}
                  </h2>
                  <p className="mt-1 text-sm text-[#2D6A4F]">{t.modalSubtitle}</p>
                </>
              )}
            </div>

            {/* Modal Body */}
            {isSuccess ? (
              <div className="px-8 py-6">
                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-[#2D6A4F] text-white text-sm font-medium rounded-lg hover:bg-[#1B4332] transition-colors"
                >
                  {t.formClose}
                </button>
              </div>
            ) : (
              <div className="px-8 py-6">
                {selectedWorkshop && (
                  <div className="mb-6 p-4 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4]">
                    <p className="text-xs text-[#2D6A4F] uppercase tracking-wider mb-1">{t.sectionLabel}</p>
                    <p className="text-sm font-medium text-[#1B4332]">{selectedWorkshop.title}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-sm font-medium text-[#1B4332] mb-1.5">
                      {t.formName}
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-[#E7E5E4] rounded-lg focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] outline-none transition-colors"
                      placeholder="Anna"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block text-sm font-medium text-[#1B4332] mb-1.5">
                      {t.formEmail}
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-[#E7E5E4] rounded-lg focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] outline-none transition-colors"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-[#FF7A59]/10 border border-[#FF7A59]/20 rounded-lg">
                      <p className="text-sm text-[#FF7A59]">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#2D6A4F] text-white text-sm font-medium rounded-lg hover:bg-[#1B4332] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t.formSubmitting}
                      </>
                    ) : (
                      t.formSubmit
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

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
              <Link href="/" className="hover:text-[#1B4332] transition-colors">Home</Link>
              <Link href="/offer" className="hover:text-[#1B4332] transition-colors">{t.navOffer}</Link>
              <Link href="/articles" className="hover:text-[#1B4332] transition-colors">{t.navArticles}</Link>
              <Link href="/jobs" className="hover:text-[#1B4332] transition-colors">{t.navJobs}</Link>
            </nav>
            <p className="text-sm text-[#2D6A4F]">© {new Date().getFullYear()} Prosvasimi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
