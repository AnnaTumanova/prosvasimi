"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ICON_PATHS, Icon, PageHero, SectionHeading, btnGhostDark, btnPrimary, btnSolid, cardClass } from "@/components/ui";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

type UseCase = { name: string; problem: string; solution: string; outcome: string; time: string };
type Service = { id: string; title: string; intro: string; items: string[]; useCases?: UseCase[] };

type Content = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  labels: { problem: string; solution: string; outcome: string; time: string; examples: string; whatWeBuild: string };
  discoveryTitle: string;
  discoveryBody: string;
  discoveryItems: string[];
  discoveryCta: string;
  services: Service[];
  evalTitle: string;
  evalBody: string;
  evalCta: string;
  pricingTitle: string;
  pricingSubtitle: string;
  pricing: { title: string; desc: string }[];
  pricingCta: string;
};

const content: Record<Lang, Content> = {
  en: {
    eyebrow: "Inclusive AI Studio · AI Services",
    title: "AI solutions that solve real business problems.",
    subtitle: "We help small businesses automate operations, improve workflows and turn business data into actionable insights.",
    ctaPrimary: "Book an AI Discovery Call",
    ctaSecondary: "See demo projects",
    labels: { problem: "Business problem", solution: "Proposed solution", outcome: "Expected outcome", time: "Typical implementation", examples: "Example use cases", whatWeBuild: "What we build" },
    discoveryTitle: "Not sure where AI fits into your business?",
    discoveryBody: "Start with AI Discovery & Consulting. We analyse your workflows, identify automation opportunities and prepare a practical AI implementation roadmap.",
    discoveryItems: ["Workflow and tools review", "Prioritised list of automation opportunities", "Effort, cost and risk estimate for each", "A practical implementation roadmap"],
    discoveryCta: "Book an AI Discovery Call",
    services: [
      {
        id: "automation",
        title: "AI Automation",
        intro: "Remove repetitive manual work from your daily operations.",
        items: ["Email automation", "Document processing", "Invoice extraction", "Data entry automation", "Workflow integrations", "Automated reporting"],
        useCases: [
          { name: "Invoice processing", problem: "Invoices arrive by email as PDFs and are typed into accounting software by hand.", solution: "Automatic extraction of supplier, amounts and dates, with human review of uncertain fields.", outcome: "Less manual data entry and fewer typing errors.", time: "2–4 weeks" },
          { name: "Email triage", problem: "A shared inbox mixes orders, questions and complaints; important messages wait.", solution: "AI classifies and routes emails, drafts replies for common requests.", outcome: "Faster responses and a clearer inbox.", time: "2–3 weeks" },
          { name: "Automated reporting", problem: "Weekly reports are rebuilt manually from several spreadsheets.", solution: "Scheduled workflow collects data and sends a ready report.", outcome: "Hours of admin work freed every week.", time: "1–3 weeks" },
        ],
      },
      {
        id: "assistants",
        title: "AI Assistants & Knowledge Systems",
        intro: "Give your team and customers fast, accurate answers based on your own documents (RAG).",
        items: ["Internal knowledge assistants", "Customer support assistants", "FAQ automation", "Document search", "Product information assistants"],
        useCases: [
          { name: "Internal knowledge assistant", problem: "Staff spend time searching for procedures, policies and past answers.", solution: "An assistant that answers from your own documents and shows its sources.", outcome: "Quicker onboarding and fewer repeated questions.", time: "3–6 weeks" },
          { name: "Customer support assistant", problem: "The same customer questions are answered manually every day.", solution: "An assistant trained on your FAQ and product data, with handoff to a human.", outcome: "Faster replies and more time for complex cases.", time: "3–6 weeks" },
        ],
      },
      {
        id: "analytics",
        title: "Data Analytics & Business Intelligence",
        intro: "Turn scattered spreadsheets and system exports into clear, reliable insight.",
        items: ["Sales dashboards", "Marketing analytics", "Customer segmentation", "Revenue reporting", "Demand forecasting"],
        useCases: [
          { name: "Sales dashboard", problem: "Sales data lives in the shop platform, spreadsheets and the accounting tool.", solution: "One automatically refreshed dashboard (e.g. Power BI or Looker Studio).", outcome: "Better visibility into what sells, where and when.", time: "2–4 weeks" },
          { name: "Customer segmentation", problem: "Marketing treats all customers the same.", solution: "Segments based on purchase behaviour, ready for targeted campaigns.", outcome: "More relevant communication with customers.", time: "2–3 weeks" },
        ],
      },
    ],
    evalTitle: "Specialist service: AI Evaluation",
    evalBody: "For businesses and agencies that already run AI assistants, chatbots or RAG systems. Structured human + automated testing for accuracy, language quality and safety.",
    evalCta: "Explore AI Evaluation",
    pricingTitle: "How we work together",
    pricingSubtitle: "Clear scope and pricing agreed before work begins. We'll give you a quote after a free discovery call.",
    pricing: [
      { title: "Discovery engagement", desc: "A short, fixed-scope analysis of your workflows with a written roadmap." },
      { title: "Fixed-price projects", desc: "A defined automation, assistant or dashboard delivered for an agreed price." },
      { title: "Monthly support", desc: "Monitoring, improvements and help after launch, billed monthly." },
      { title: "Custom implementations", desc: "Larger or multi-stage projects, scoped together with your team." },
    ],
    pricingCta: "Book an AI Discovery Call",
  },
  pl: {
    eyebrow: "Inclusive AI Studio · Usługi AI",
    title: "Rozwiązania AI, które rozwiązują realne problemy biznesowe.",
    subtitle: "Pomagamy małym firmom automatyzować operacje, usprawniać procesy i zamieniać dane firmowe w praktyczne wnioski.",
    ctaPrimary: "Umów rozmowę AI Discovery",
    ctaSecondary: "Zobacz projekty demo",
    labels: { problem: "Problem biznesowy", solution: "Proponowane rozwiązanie", outcome: "Oczekiwany efekt", time: "Typowy czas wdrożenia", examples: "Przykładowe zastosowania", whatWeBuild: "Co budujemy" },
    discoveryTitle: "Nie wiesz, gdzie AI pasuje do Twojej firmy?",
    discoveryBody: "Zacznij od AI Discovery & Consulting. Analizujemy Twoje procesy, wskazujemy możliwości automatyzacji i przygotowujemy praktyczną mapę wdrożenia AI.",
    discoveryItems: ["Przegląd procesów i narzędzi", "Lista możliwości automatyzacji według priorytetu", "Szacunek nakładu, kosztu i ryzyka", "Praktyczna mapa wdrożenia"],
    discoveryCta: "Umów rozmowę AI Discovery",
    services: [
      {
        id: "automation",
        title: "Automatyzacja AI",
        intro: "Usuń powtarzalną, ręczną pracę z codziennych operacji.",
        items: ["Automatyzacja e-maili", "Przetwarzanie dokumentów", "Ekstrakcja danych z faktur", "Automatyzacja wprowadzania danych", "Integracje procesów", "Automatyczne raporty"],
        useCases: [
          { name: "Przetwarzanie faktur", problem: "Faktury przychodzą mailem jako PDF i są ręcznie przepisywane do systemu księgowego.", solution: "Automatyczne wyciąganie dostawcy, kwot i dat z weryfikacją niepewnych pól przez człowieka.", outcome: "Mniej ręcznego wprowadzania danych i mniej pomyłek.", time: "2–4 tygodnie" },
          { name: "Segregacja e-maili", problem: "Wspólna skrzynka miesza zamówienia, pytania i reklamacje; ważne wiadomości czekają.", solution: "AI klasyfikuje i przekierowuje e-maile oraz przygotowuje szkice odpowiedzi.", outcome: "Szybsze odpowiedzi i uporządkowana skrzynka.", time: "2–3 tygodnie" },
          { name: "Automatyczne raporty", problem: "Cotygodniowe raporty są ręcznie składane z kilku arkuszy.", solution: "Zaplanowany proces zbiera dane i wysyła gotowy raport.", outcome: "Godziny pracy administracyjnej odzyskane co tydzień.", time: "1–3 tygodnie" },
        ],
      },
      {
        id: "assistants",
        title: "Asystenci AI i systemy wiedzy",
        intro: "Szybkie, trafne odpowiedzi dla zespołu i klientów na podstawie Twoich dokumentów (RAG).",
        items: ["Wewnętrzni asystenci wiedzy", "Asystenci obsługi klienta", "Automatyzacja FAQ", "Wyszukiwanie w dokumentach", "Asystenci informacji o produktach"],
        useCases: [
          { name: "Wewnętrzny asystent wiedzy", problem: "Pracownicy tracą czas na szukanie procedur, zasad i wcześniejszych odpowiedzi.", solution: "Asystent odpowiadający na podstawie Twoich dokumentów i wskazujący źródła.", outcome: "Szybszy onboarding i mniej powtarzanych pytań.", time: "3–6 tygodni" },
          { name: "Asystent obsługi klienta", problem: "Na te same pytania klientów odpowiada się ręcznie każdego dnia.", solution: "Asystent oparty na FAQ i danych produktowych, z przekazaniem do człowieka.", outcome: "Szybsze odpowiedzi i więcej czasu na trudne sprawy.", time: "3–6 tygodni" },
        ],
      },
      {
        id: "analytics",
        title: "Analityka danych i Business Intelligence",
        intro: "Zamień rozproszone arkusze i eksporty z systemów w jasne, wiarygodne wnioski.",
        items: ["Dashboardy sprzedaży", "Analityka marketingowa", "Segmentacja klientów", "Raportowanie przychodów", "Prognozowanie popytu"],
        useCases: [
          { name: "Dashboard sprzedaży", problem: "Dane sprzedażowe są w sklepie, arkuszach i programie księgowym.", solution: "Jeden automatycznie odświeżany dashboard (np. Power BI lub Looker Studio).", outcome: "Lepszy wgląd w to, co, gdzie i kiedy się sprzedaje.", time: "2–4 tygodnie" },
          { name: "Segmentacja klientów", problem: "Marketing traktuje wszystkich klientów tak samo.", solution: "Segmenty oparte na zachowaniach zakupowych, gotowe do kampanii.", outcome: "Bardziej trafna komunikacja z klientami.", time: "2–3 tygodnie" },
        ],
      },
    ],
    evalTitle: "Usługa specjalistyczna: ewaluacja AI",
    evalBody: "Dla firm i agencji, które już korzystają z asystentów AI, chatbotów lub systemów RAG. Ustrukturyzowane testy ludzkie i automatyczne pod kątem trafności, jakości językowej i bezpieczeństwa.",
    evalCta: "Poznaj ewaluację AI",
    pricingTitle: "Jak współpracujemy",
    pricingSubtitle: "Jasny zakres i cena ustalone przed rozpoczęciem pracy. Wycenę przygotujemy po bezpłatnej rozmowie.",
    pricing: [
      { title: "Discovery", desc: "Krótka analiza procesów o stałym zakresie, zakończona pisemną mapą działań." },
      { title: "Projekty o stałej cenie", desc: "Konkretna automatyzacja, asystent lub dashboard za uzgodnioną kwotę." },
      { title: "Wsparcie miesięczne", desc: "Monitoring, usprawnienia i pomoc po wdrożeniu, rozliczane miesięcznie." },
      { title: "Wdrożenia indywidualne", desc: "Większe lub wieloetapowe projekty planowane razem z Twoim zespołem." },
    ],
    pricingCta: "Umów rozmowę AI Discovery",
  },
  ua: {
    eyebrow: "Inclusive AI Studio · AI-послуги",
    title: "AI-рішення, які розв'язують реальні бізнес-задачі.",
    subtitle: "Ми допомагаємо малому бізнесу автоматизувати операції, покращувати процеси та перетворювати дані на практичні висновки.",
    ctaPrimary: "Записатися на AI Discovery",
    ctaSecondary: "Демо-проєкти",
    labels: { problem: "Бізнес-проблема", solution: "Запропоноване рішення", outcome: "Очікуваний результат", time: "Типовий термін впровадження", examples: "Приклади використання", whatWeBuild: "Що ми створюємо" },
    discoveryTitle: "Не впевнені, де AI доречний у вашому бізнесі?",
    discoveryBody: "Почніть з AI Discovery & Consulting. Ми аналізуємо ваші процеси, знаходимо можливості для автоматизації та готуємо практичну дорожню карту впровадження AI.",
    discoveryItems: ["Огляд процесів та інструментів", "Пріоритизований список можливостей автоматизації", "Оцінка зусиль, вартості та ризиків", "Практична дорожня карта впровадження"],
    discoveryCta: "Записатися на AI Discovery",
    services: [
      {
        id: "automation",
        title: "AI-автоматизація",
        intro: "Приберіть рутинну ручну роботу з щоденних операцій.",
        items: ["Автоматизація пошти", "Обробка документів", "Вилучення даних з рахунків", "Автоматизація введення даних", "Інтеграції процесів", "Автоматична звітність"],
        useCases: [
          { name: "Обробка рахунків", problem: "Рахунки приходять поштою у PDF і вручну вносяться в облікову систему.", solution: "Автоматичне вилучення постачальника, сум і дат з людською перевіркою сумнівних полів.", outcome: "Менше ручного введення та помилок.", time: "2–4 тижні" },
          { name: "Сортування пошти", problem: "У спільній скриньці змішані замовлення, питання та скарги; важливе чекає.", solution: "AI класифікує та маршрутизує листи, готує чернетки відповідей.", outcome: "Швидші відповіді та впорядкована скринька.", time: "2–3 тижні" },
          { name: "Автоматична звітність", problem: "Щотижневі звіти щоразу збираються вручну з кількох таблиць.", solution: "Запланований процес збирає дані та надсилає готовий звіт.", outcome: "Години адміністративної роботи щотижня.", time: "1–3 тижні" },
        ],
      },
      {
        id: "assistants",
        title: "AI-асистенти та системи знань",
        intro: "Швидкі й точні відповіді для команди та клієнтів на основі ваших документів (RAG).",
        items: ["Внутрішні асистенти знань", "Асистенти підтримки клієнтів", "Автоматизація FAQ", "Пошук по документах", "Асистенти з інформацією про продукти"],
        useCases: [
          { name: "Внутрішній асистент знань", problem: "Працівники витрачають час на пошук процедур, правил і попередніх відповідей.", solution: "Асистент, що відповідає на основі ваших документів і показує джерела.", outcome: "Швидший онбординг і менше повторних питань.", time: "3–6 тижнів" },
          { name: "Асистент підтримки клієнтів", problem: "На ті самі питання клієнтів щодня відповідають вручну.", solution: "Асистент на основі FAQ і даних про продукти з передачею людині.", outcome: "Швидші відповіді та більше часу на складні випадки.", time: "3–6 тижнів" },
        ],
      },
      {
        id: "analytics",
        title: "Аналітика даних і Business Intelligence",
        intro: "Перетворіть розрізнені таблиці та вивантаження із систем на зрозумілі, надійні висновки.",
        items: ["Дашборди продажів", "Маркетингова аналітика", "Сегментація клієнтів", "Звітність про доходи", "Прогнозування попиту"],
        useCases: [
          { name: "Дашборд продажів", problem: "Дані про продажі розкидані між магазином, таблицями та бухгалтерією.", solution: "Один дашборд з автоматичним оновленням (напр. Power BI чи Looker Studio).", outcome: "Краще розуміння, що, де і коли продається.", time: "2–4 тижні" },
          { name: "Сегментація клієнтів", problem: "Маркетинг працює з усіма клієнтами однаково.", solution: "Сегменти на основі купівельної поведінки, готові для кампаній.", outcome: "Більш релевантна комунікація з клієнтами.", time: "2–3 тижні" },
        ],
      },
    ],
    evalTitle: "Спеціалізована послуга: оцінювання AI",
    evalBody: "Для компаній і агенцій, які вже використовують AI-асистентів, чат-ботів або RAG-системи. Структуроване людське та автоматичне тестування точності, якості мови та безпеки.",
    evalCta: "Оцінювання AI",
    pricingTitle: "Як ми співпрацюємо",
    pricingSubtitle: "Чіткий обсяг і ціна погоджуються до початку роботи. Пропозицію підготуємо після безкоштовного дзвінка.",
    pricing: [
      { title: "Discovery", desc: "Короткий аналіз процесів з фіксованим обсягом і письмовою дорожньою картою." },
      { title: "Проєкти з фіксованою ціною", desc: "Конкретна автоматизація, асистент чи дашборд за погодженою ціною." },
      { title: "Щомісячна підтримка", desc: "Моніторинг, покращення та допомога після запуску з оплатою щомісяця." },
      { title: "Індивідуальні впровадження", desc: "Більші чи багатоетапні проєкти, сплановані разом з вашою командою." },
    ],
    pricingCta: "Записатися на AI Discovery",
  },
};

const SERVICE_ICONS: Record<string, string> = {
  automation: ICON_PATHS.cog,
  assistants: ICON_PATHS.chat,
  analytics: ICON_PATHS.chart,
};

export default function ServicesPage() {
  const [lang, setLang] = useLang();
  const t = content[lang];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={<p>{t.subtitle}</p>}>
          <Link href="/for-businesses#discovery" className={btnPrimary}>
            {t.ctaPrimary}
          </Link>
          <Link href="/case-studies" className={btnGhostDark}>
            {t.ctaSecondary}
          </Link>
        </PageHero>

        {/* AI Discovery entry product */}
        <section id="discovery" className="py-20 md:py-24 bg-[#FAFAF9] scroll-mt-16">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#0F7A52] text-white flex items-center justify-center mb-5">
                <Icon path={ICON_PATHS.lightbulb} className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.discoveryTitle}</h2>
              <p className="mt-4 text-lg text-[#3F3C3A] leading-relaxed">{t.discoveryBody}</p>
              <Link href="/for-businesses#discovery" className={`${btnSolid} mt-8`}>
                {t.discoveryCta}
              </Link>
            </div>
            <ul className={`${cardClass} space-y-3`}>
              {t.discoveryItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[#0B2818]">
                  <Icon path={ICON_PATHS.checkCircle} className="w-5 h-5 text-[#0F7A52] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Core services */}
        {t.services.map((s, idx) => (
          <section key={s.id} id={s.id} className={`py-20 md:py-28 scroll-mt-16 ${idx % 2 === 1 ? "bg-[#FAFAF9]" : ""}`}>
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0F7A52]/10 flex items-center justify-center mb-5">
                    <Icon path={SERVICE_ICONS[s.id]} className="w-5 h-5 text-[#0F7A52]" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{s.title}</h2>
                  <p className="mt-4 text-lg text-[#3F3C3A] leading-relaxed">{s.intro}</p>
                  <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[#0F7A52]">{t.labels.whatWeBuild}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li key={item} className="px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-sm font-medium text-[#0B2818]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {s.useCases && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0F7A52] mb-4">{t.labels.examples}</h3>
                    <div className="space-y-4">
                      {s.useCases.map((uc) => (
                        <article key={uc.name} className={`${cardClass} !p-6`}>
                          <h4 className="text-base font-semibold text-[#0B2818]">{uc.name}</h4>
                          <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
                            <div>
                              <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.labels.problem}</dt>
                              <dd className="mt-1 text-[#3F3C3A]">{uc.problem}</dd>
                            </div>
                            <div>
                              <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.labels.solution}</dt>
                              <dd className="mt-1 text-[#3F3C3A]">{uc.solution}</dd>
                            </div>
                            <div>
                              <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.labels.outcome}</dt>
                              <dd className="mt-1 text-[#3F3C3A]">{uc.outcome}</dd>
                            </div>
                            <div>
                              <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.labels.time}</dt>
                              <dd className="mt-1 font-medium text-[#0B2818]">{uc.time}</dd>
                            </div>
                          </dl>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* AI Evaluation specialist service */}
        <section className="py-20 md:py-24 bg-[#0B2818] text-white">
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center gap-8 justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.evalTitle}</h2>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">{t.evalBody}</p>
            </div>
            <Link href="/ai-evaluation" className={`${btnPrimary} flex-shrink-0`}>
              {t.evalCta}
            </Link>
          </div>
        </section>

        {/* Pricing approach */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.pricingTitle} subtitle={t.pricingSubtitle} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.pricing.map((p) => (
                <div key={p.title} className={cardClass}>
                  <h3 className="text-lg font-semibold text-[#0B2818]">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-[#3F3C3A] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/for-businesses#discovery" className={btnSolid}>
                {t.pricingCta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
