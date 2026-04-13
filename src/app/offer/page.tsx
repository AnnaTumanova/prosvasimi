"use client";

import React, { useState } from "react";
import Link from "next/link";

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
      icon: "🎯",
      color: "from-blue-500 to-indigo-600",
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
      icon: "📚",
      color: "from-emerald-500 to-teal-600",
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
      icon: "♿",
      color: "from-purple-500 to-pink-600",
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
      icon: "🎯",
      color: "from-blue-500 to-indigo-600",
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
      icon: "📚",
      color: "from-emerald-500 to-teal-600",
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
      icon: "♿",
      color: "from-purple-500 to-pink-600",
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
      icon: "🎯",
      color: "from-blue-500 to-indigo-600",
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
      icon: "📚",
      color: "from-emerald-500 to-teal-600",
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
      icon: "♿",
      color: "from-purple-500 to-pink-600",
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
    backHome: "← Back to Home",
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
    backHome: "← Powrót do strony głównej",
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
    backHome: "← Повернутися на головну",
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
    <div className="min-h-dvh bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white grid place-items-center font-bold text-lg shadow-lg shadow-slate-900/20 group-hover:shadow-xl group-hover:shadow-slate-900/30 transition-shadow">
              P
            </div>
            <span className="font-semibold text-lg tracking-tight">Prosvasimi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/offer" className="text-slate-900">{t.navOffer}</Link>
            <Link href="/articles" className="text-slate-500 hover:text-slate-900 transition-colors">{t.navArticles}</Link>
            <Link href="/jobs" className="text-slate-500 hover:text-slate-900 transition-colors">{t.navJobs}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm" role="group">
              {(["en", "pl", "ua"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    lang === l
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
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
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />
          
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
            >
              {t.backHome}
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t.pageTitle}
            </h1>
            <p className="mt-6 text-xl text-slate-600 max-w-2xl leading-relaxed">
              {t.pageSubtitle}
            </p>
          </div>
        </section>

        {/* Workshops Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t.workshopsTitle}
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                {t.workshopsSubtitle}
              </p>
            </div>

            <div className="grid gap-8 md:gap-12">
              {currentWorkshops.map((workshop, index) => (
                <div
                  key={workshop.id}
                  className="group relative bg-white rounded-3xl border border-slate-200 p-8 md:p-10 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${workshop.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {workshop.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {t.duration}: {workshop.duration}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {t.format}: {workshop.format}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight">
                        {workshop.title}
                      </h3>
                      <p className="mt-1 text-lg text-slate-500 font-medium">
                        {workshop.subtitle}
                      </p>
                      <p className="mt-4 text-slate-600 leading-relaxed">
                        {workshop.description}
                      </p>

                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                          {t.topics}
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {workshop.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8">
                        <button 
                          onClick={() => openModal({ id: workshop.id, title: workshop.title })}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30"
                        >
                          {t.registerInterest}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                        <span className="ml-4 text-sm text-slate-500">{t.comingSoon}</span>
                      </div>
                    </div>
                  </div>
                </div>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{t.formSuccess}</h2>
                <p className="mt-3 text-slate-600">{t.formSuccessMsg}</p>
                <button
                  onClick={closeModal}
                  className="mt-6 inline-flex justify-center rounded-xl bg-slate-900 text-white px-6 py-3 font-medium shadow-lg hover:bg-slate-800 transition-colors"
                >
                  {t.formClose}
                </button>
              </div>
            ) : (
              <>
                <h2 id="modal-title" className="text-2xl font-bold text-slate-900">
                  {t.modalTitle}
                </h2>
                <p className="mt-2 text-slate-600">{t.modalSubtitle}</p>
                
                {selectedWorkshop && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{selectedWorkshop.title}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-sm font-medium text-slate-700 mb-2">
                      {t.formName}
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                      placeholder="Anna"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block text-sm font-medium text-slate-700 mb-2">
                      {t.formEmail}
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-rose-600 bg-rose-50 p-3 rounded-lg">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 text-white font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t.formSubmitting}
                      </>
                    ) : (
                      <>
                        {t.formSubmit}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-900 text-white grid place-items-center font-bold text-sm">
                P
              </div>
              <span className="font-medium">Prosvasimi</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <Link href="/offer" className="hover:text-slate-900 transition-colors">{t.navOffer}</Link>
              <Link href="/articles" className="hover:text-slate-900 transition-colors">{t.navArticles}</Link>
              <Link href="/jobs" className="hover:text-slate-900 transition-colors">{t.navJobs}</Link>
            </nav>
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} Prosvasimi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
