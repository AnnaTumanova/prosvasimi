"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { DemoBadge, ICON_PATHS, Icon, PageHero, SectionHeading, btnPrimary, cardClass } from "@/components/ui";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

// Each case follows the same template (client profile → lessons learned).
// Until real client projects can be published with permission, every entry
// here is a clearly labelled demonstration project, not a client result.

type CaseStudy = {
  id: string;
  title: string;
  service: string;
  profile: string;
  problem: string;
  initial: string;
  solution: string;
  technical: string;
  results: string;
  impact: string;
  lessons: string;
};

type Content = {
  eyebrow: string;
  title: string;
  subtitle: string;
  demoBadge: string;
  demoNote: string;
  sections: Record<Exclude<keyof CaseStudy, "id" | "title" | "service">, string>;
  cases: CaseStudy[];
  metricsTitle: string;
  metricsSubtitle: string;
  metrics: string[];
  ctaTitle: string;
  ctaBody: string;
  cta: string;
};

const content: Record<Lang, Content> = {
  en: {
    eyebrow: "Case Studies & Demos",
    title: "See what practical AI looks like.",
    subtitle: "Demonstration projects built on realistic, synthetic business scenarios. Real client case studies will be added here as projects are completed and clients agree to publication.",
    demoBadge: "Demo project",
    demoNote: "Demonstration built with synthetic data — not a client engagement.",
    sections: {
      profile: "Client profile",
      problem: "Business problem",
      initial: "Initial process",
      solution: "Proposed solution",
      technical: "Technical implementation",
      results: "Results",
      impact: "Business impact",
      lessons: "Lessons learned",
    },
    cases: [
      {
        id: "invoice-processing",
        title: "Invoice Processing Automation",
        service: "AI Automation",
        profile: "Fictional wholesale distributor, 25 employees, ~400 supplier invoices per month.",
        problem: "Invoices arrive as PDF attachments in different layouts and are re-typed into the accounting system.",
        initial: "An office assistant downloads each attachment, reads it and enters supplier, dates, line totals and VAT by hand.",
        solution: "An email-triggered workflow that extracts invoice fields, validates them and sends uncertain cases for human review.",
        technical: "Mailbox trigger → document parsing with an LLM → validation rules (totals, VAT, supplier list) → review queue → export to accounting.",
        results: "Measured on the synthetic test set; we'll report real-world figures only from client projects.",
        impact: "Designed to reduce manual data entry and typing errors while keeping a human in the loop.",
        lessons: "Validation rules matter as much as extraction — they decide which invoices a person must check.",
      },
      {
        id: "rag-assistant",
        title: "Internal AI Knowledge Assistant",
        service: "AI Assistants & Knowledge Systems",
        profile: "Fictional professional services firm, 15 employees, procedures spread across shared drives.",
        problem: "Staff spend time finding policies, templates and past answers; new hires ask the same questions repeatedly.",
        initial: "Searching folders manually and asking colleagues in chat.",
        solution: "A retrieval-augmented (RAG) assistant that answers from company documents and always cites its sources.",
        technical: "Document ingestion and chunking → embeddings and vector search → LLM answer with citations → evaluation set for accuracy and refusal behaviour.",
        results: "Evaluated with our own AI Evaluation methodology on synthetic questions.",
        impact: "Designed for faster onboarding and fewer interruptions for senior staff.",
        lessons: "The assistant must say ‘I don't know’ when documents don't contain the answer — this is tested explicitly.",
      },
      {
        id: "bi-dashboard",
        title: "E-commerce Business Intelligence Dashboard",
        service: "Data Analytics & BI",
        profile: "Fictional online shop, 8 employees, selling through its own store and one marketplace.",
        problem: "Sales, returns and ad spend live in separate exports; the owner can't see margins by product or channel.",
        initial: "Monthly spreadsheets assembled manually from each platform.",
        solution: "One automatically refreshed dashboard with sales, margin, returns and customer segments.",
        technical: "Scheduled data extraction → cleaning and joining in SQL → Power BI data model → dashboard with drill-downs.",
        results: "Built on synthetic data that mirrors a typical small e-commerce business.",
        impact: "Designed to give clear visibility into what sells, where and at what margin.",
        lessons: "Agreeing on definitions (what counts as ‘revenue’ or ‘return’) comes before building any chart.",
      },
    ],
    metricsTitle: "What we'll measure on client projects",
    metricsSubtitle: "We'll only publish verified figures, with the client's permission.",
    metrics: ["Hours saved", "Processing time reduction", "Error reduction", "Automation coverage", "Customer satisfaction"],
    ctaTitle: "Have a similar challenge?",
    ctaBody: "Tell us about your process. We'll tell you honestly whether AI is the right fit.",
    cta: "Request an AI consultation",
  },
  pl: {
    eyebrow: "Case studies i dema",
    title: "Zobacz, jak wygląda AI w praktyce.",
    subtitle: "Projekty demonstracyjne oparte na realistycznych, syntetycznych scenariuszach biznesowych. Prawdziwe case studies klientów dodamy po zakończeniu projektów i za zgodą klientów.",
    demoBadge: "Projekt demo",
    demoNote: "Demonstracja na danych syntetycznych — nie projekt dla klienta.",
    sections: {
      profile: "Profil klienta",
      problem: "Problem biznesowy",
      initial: "Proces wyjściowy",
      solution: "Proponowane rozwiązanie",
      technical: "Wdrożenie techniczne",
      results: "Wyniki",
      impact: "Wpływ na biznes",
      lessons: "Wnioski",
    },
    cases: [
      {
        id: "invoice-processing",
        title: "Automatyzacja przetwarzania faktur",
        service: "Automatyzacja AI",
        profile: "Fikcyjna hurtownia, 25 pracowników, ok. 400 faktur od dostawców miesięcznie.",
        problem: "Faktury przychodzą jako załączniki PDF w różnych układach i są przepisywane do systemu księgowego.",
        initial: "Asystentka pobiera każdy załącznik i ręcznie wpisuje dostawcę, daty, kwoty i VAT.",
        solution: "Proces uruchamiany e-mailem, który wyciąga pola faktury, waliduje je i kieruje niepewne przypadki do weryfikacji przez człowieka.",
        technical: "Trigger skrzynki → parsowanie dokumentu przez LLM → reguły walidacji (sumy, VAT, lista dostawców) → kolejka weryfikacji → eksport do księgowości.",
        results: "Mierzone na syntetycznym zbiorze testowym; dane z realnych wdrożeń podamy tylko z projektów klientów.",
        impact: "Zaprojektowane, by ograniczyć ręczne wprowadzanie danych i pomyłki, z zachowaniem kontroli człowieka.",
        lessons: "Reguły walidacji są równie ważne jak ekstrakcja — decydują, które faktury sprawdza człowiek.",
      },
      {
        id: "rag-assistant",
        title: "Wewnętrzny asystent wiedzy AI",
        service: "Asystenci AI i systemy wiedzy",
        profile: "Fikcyjna firma usług profesjonalnych, 15 pracowników, procedury rozproszone na dyskach.",
        problem: "Pracownicy tracą czas na szukanie zasad, szablonów i wcześniejszych odpowiedzi; nowe osoby zadają te same pytania.",
        initial: "Ręczne przeszukiwanie folderów i pytanie współpracowników na czacie.",
        solution: "Asystent RAG odpowiadający na podstawie dokumentów firmy i zawsze wskazujący źródła.",
        technical: "Wczytanie i podział dokumentów → embeddingi i wyszukiwanie wektorowe → odpowiedź LLM z cytowaniami → zbiór ewaluacyjny trafności i odmów.",
        results: "Oceniony naszą metodologią ewaluacji AI na syntetycznych pytaniach.",
        impact: "Zaprojektowany dla szybszego onboardingu i mniejszej liczby przerw dla seniorów.",
        lessons: "Asystent musi mówić „nie wiem”, gdy dokumenty nie zawierają odpowiedzi — testujemy to wprost.",
      },
      {
        id: "bi-dashboard",
        title: "Dashboard BI dla e-commerce",
        service: "Analityka danych i BI",
        profile: "Fikcyjny sklep internetowy, 8 pracowników, sprzedaż we własnym sklepie i na jednym marketplace.",
        problem: "Sprzedaż, zwroty i wydatki reklamowe są w osobnych eksportach; właściciel nie widzi marż według produktu i kanału.",
        initial: "Miesięczne arkusze składane ręcznie z każdej platformy.",
        solution: "Jeden automatycznie odświeżany dashboard ze sprzedażą, marżą, zwrotami i segmentami klientów.",
        technical: "Zaplanowane pobieranie danych → czyszczenie i łączenie w SQL → model danych Power BI → dashboard z drill-down.",
        results: "Zbudowany na danych syntetycznych odzwierciedlających typowy mały e-commerce.",
        impact: "Zaprojektowany, by pokazać, co, gdzie i z jaką marżą się sprzedaje.",
        lessons: "Uzgodnienie definicji (co jest „przychodem”, a co „zwrotem”) poprzedza budowę jakiegokolwiek wykresu.",
      },
    ],
    metricsTitle: "Co będziemy mierzyć w projektach klientów",
    metricsSubtitle: "Publikujemy tylko zweryfikowane dane, za zgodą klienta.",
    metrics: ["Zaoszczędzone godziny", "Skrócenie czasu przetwarzania", "Redukcja błędów", "Zakres automatyzacji", "Satysfakcja klientów"],
    ctaTitle: "Masz podobne wyzwanie?",
    ctaBody: "Opisz swój proces. Uczciwie powiemy, czy AI to dobre rozwiązanie.",
    cta: "Poproś o konsultację AI",
  },
  ua: {
    eyebrow: "Кейси та демо",
    title: "Подивіться, як виглядає практичний AI.",
    subtitle: "Демонстраційні проєкти на основі реалістичних синтетичних бізнес-сценаріїв. Реальні кейси клієнтів додамо після завершення проєктів і за згодою клієнтів.",
    demoBadge: "Демо-проєкт",
    demoNote: "Демонстрація на синтетичних даних — не клієнтський проєкт.",
    sections: {
      profile: "Профіль клієнта",
      problem: "Бізнес-проблема",
      initial: "Початковий процес",
      solution: "Запропоноване рішення",
      technical: "Технічна реалізація",
      results: "Результати",
      impact: "Вплив на бізнес",
      lessons: "Висновки",
    },
    cases: [
      {
        id: "invoice-processing",
        title: "Автоматизація обробки рахунків",
        service: "AI-автоматизація",
        profile: "Вигаданий оптовий дистриб'ютор, 25 працівників, ~400 рахунків від постачальників на місяць.",
        problem: "Рахунки приходять як PDF-вкладення різного формату і вручну вносяться в облікову систему.",
        initial: "Офіс-асистент завантажує кожне вкладення і вручну вводить постачальника, дати, суми та ПДВ.",
        solution: "Процес, що запускається листом, вилучає поля рахунку, перевіряє їх і передає сумнівні випадки на людську перевірку.",
        technical: "Тригер пошти → парсинг документа через LLM → правила валідації (суми, ПДВ, список постачальників) → черга перевірки → експорт в облік.",
        results: "Виміряно на синтетичному тестовому наборі; реальні показники повідомлятимемо лише з клієнтських проєктів.",
        impact: "Розроблено, щоб зменшити ручне введення та помилки, зберігаючи контроль людини.",
        lessons: "Правила валідації так само важливі, як вилучення, — вони визначають, які рахунки перевіряє людина.",
      },
      {
        id: "rag-assistant",
        title: "Внутрішній AI-асистент знань",
        service: "AI-асистенти та системи знань",
        profile: "Вигадана компанія професійних послуг, 15 працівників, процедури розкидані по дисках.",
        problem: "Працівники витрачають час на пошук правил, шаблонів і попередніх відповідей; новачки ставлять ті самі питання.",
        initial: "Ручний пошук у папках і питання колегам у чаті.",
        solution: "RAG-асистент, що відповідає на основі документів компанії та завжди вказує джерела.",
        technical: "Завантаження та розбиття документів → ембеддинги й векторний пошук → відповідь LLM з цитуванням → набір для оцінки точності та відмов.",
        results: "Оцінено нашою методологією оцінювання AI на синтетичних питаннях.",
        impact: "Розроблено для швидшого онбордингу та меншої кількості відволікань для досвідчених працівників.",
        lessons: "Асистент має казати «не знаю», коли в документах немає відповіді, — ми тестуємо це окремо.",
      },
      {
        id: "bi-dashboard",
        title: "BI-дашборд для e-commerce",
        service: "Аналітика даних і BI",
        profile: "Вигаданий інтернет-магазин, 8 працівників, продажі через власний сайт і один маркетплейс.",
        problem: "Продажі, повернення та рекламні витрати — в окремих вивантаженнях; власник не бачить маржу за товаром і каналом.",
        initial: "Щомісячні таблиці, зібрані вручну з кожної платформи.",
        solution: "Один дашборд з автоматичним оновленням: продажі, маржа, повернення та сегменти клієнтів.",
        technical: "Заплановане вивантаження даних → очищення та об'єднання в SQL → модель даних Power BI → дашборд з деталізацією.",
        results: "Побудовано на синтетичних даних, що відображають типовий малий e-commerce.",
        impact: "Розроблено, щоб показати, що, де і з якою маржею продається.",
        lessons: "Узгодження визначень (що таке «дохід» чи «повернення») передує побудові будь-якого графіка.",
      },
    ],
    metricsTitle: "Що ми вимірюватимемо в клієнтських проєктах",
    metricsSubtitle: "Публікуємо лише перевірені дані за згодою клієнта.",
    metrics: ["Зекономлені години", "Скорочення часу обробки", "Зменшення помилок", "Охоплення автоматизацією", "Задоволеність клієнтів"],
    ctaTitle: "Маєте схожий виклик?",
    ctaBody: "Розкажіть про свій процес. Ми чесно скажемо, чи підходить тут AI.",
    cta: "Запросити AI-консультацію",
  },
};

const SECTION_ORDER = ["profile", "problem", "initial", "solution", "technical", "results", "impact", "lessons"] as const;
const CASE_ICONS: Record<string, string> = {
  "invoice-processing": ICON_PATHS.document,
  "rag-assistant": ICON_PATHS.chat,
  "bi-dashboard": ICON_PATHS.chart,
};

export default function CaseStudiesPage() {
  const [lang, setLang] = useLang();
  const t = content[lang];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={<p>{t.subtitle}</p>} />

        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 space-y-10">
            {t.cases.map((c) => (
              <article key={c.id} id={c.id} className={`${cardClass} md:!p-10 scroll-mt-20`}>
                <div className="flex flex-wrap items-start gap-4 justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0F7A52]/10 flex items-center justify-center flex-shrink-0">
                      <Icon path={CASE_ICONS[c.id]} className="w-6 h-6 text-[#0F7A52]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F7A52]">{c.service}</p>
                      <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-[#0B2818]">{c.title}</h2>
                    </div>
                  </div>
                  <DemoBadge label={t.demoBadge} />
                </div>
                <p className="mt-4 text-sm text-[#5B5754]">{t.demoNote}</p>
                <dl className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-6">
                  {SECTION_ORDER.map((key, i) => (
                    <div key={key}>
                      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#5B5754]">
                        <span className="text-[#0F7A52]">{i + 1}.</span>
                        {t.sections[key]}
                      </dt>
                      <dd className="mt-1.5 text-[15px] text-[#3F3C3A] leading-relaxed">{c[key]}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="py-24 md:py-32 bg-[#FAFAF9]">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.metricsTitle} subtitle={t.metricsSubtitle} />
            <ul className="flex flex-wrap gap-3">
              {t.metrics.map((m) => (
                <li key={m} className="px-5 py-2.5 rounded-full border border-black/[0.08] bg-white text-sm font-medium text-[#0B2818]">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-[#0B2818] text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t.ctaTitle}</h2>
                <p className="mt-3 text-white/70 leading-relaxed">{t.ctaBody}</p>
              </div>
              <Link href="/for-businesses#discovery" className={`${btnPrimary} flex-shrink-0`}>
                {t.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
