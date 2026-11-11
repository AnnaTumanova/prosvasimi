"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ICON_PATHS, Icon, IconCard, SectionHeading, Steps, btnGhostDark, btnPrimary, cardClass } from "@/components/ui";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

type Content = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroSubtitle2: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  pillars: { title: string; desc: string; href: string }[];

  problemsTitle: string;
  problemsSubtitle: string;
  problems: { title: string; desc: string }[];

  servicesTitle: string;
  servicesSubtitle: string;
  services: { title: string; desc: string }[];
  servicesCta: string;
  evalTitle: string;
  evalDesc: string;
  evalCta: string;

  processTitle: string;
  process: { title: string; desc: string }[];

  academyEyebrow: string;
  academyTitle: string;
  academyBody: string;
  academyTracks: string[];
  academyCta: string;

  impactTitle: string;
  impactBody: string;
  impactLoop: { title: string; desc: string }[];
  impactNote: string;

  pathsTitle: string;
  paths: { title: string; desc: string; cta: string; href: string }[];
};

const content: Record<Lang, Content> = {
  en: {
    heroEyebrow: "Inclusive AI Studio · Inclusive AI Academy",
    heroTitle: "Practical AI solutions. More inclusive technology careers.",
    heroSubtitle: "We help small businesses automate repetitive processes, make better use of their data and implement practical AI solutions.",
    heroSubtitle2: "At the same time, we're building professional opportunities for people with disabilities through accessible training and real-world technology projects.",
    heroCtaPrimary: "Explore AI Services",
    heroCtaSecondary: "Discover Inclusive AI Academy",
    pillars: [
      { title: "AI Services", desc: "Automation, AI assistants, analytics and evaluation.", href: "/services" },
      { title: "AI Academy", desc: "Accessible AI and digital skills training.", href: "/academy" },
      { title: "Careers", desc: "Professional development and paid project work.", href: "/careers" },
    ],

    problemsTitle: "Where can AI help your business?",
    problemsSubtitle: "You don't need an in-house AI team. Most small businesses start with one painful, repetitive process.",
    problems: [
      { title: "Automate repetitive tasks", desc: "Stop copying data between emails, spreadsheets and systems by hand." },
      { title: "Process documents faster", desc: "Extract information from invoices, orders and forms automatically." },
      { title: "Improve customer communication", desc: "Answer common questions faster with an assistant trained on your own content." },
      { title: "Understand your business data", desc: "See sales, costs and customers in clear dashboards instead of scattered files." },
    ],

    servicesTitle: "What we build",
    servicesSubtitle: "Three core services for small and growing businesses — plus a specialist AI evaluation practice.",
    services: [
      { title: "AI Automation", desc: "Email and document processing, invoice extraction, data entry and workflow integrations." },
      { title: "AI Assistants & Knowledge Systems", desc: "Internal knowledge assistants, customer support assistants and document search built on your content." },
      { title: "Data Analytics & BI", desc: "Sales and marketing dashboards, revenue reporting, customer segmentation and forecasting." },
    ],
    servicesCta: "Learn more",
    evalTitle: "Specialist service: AI Evaluation",
    evalDesc: "Already running an AI assistant or chatbot? We test it with structured human and automated evaluation before your customers find the problems.",
    evalCta: "Explore AI Evaluation",

    processTitle: "How we work",
    process: [
      { title: "Discover", desc: "Understand the business problem and how work is done today." },
      { title: "Design", desc: "Identify the right AI solution — or tell you when you don't need one." },
      { title: "Build", desc: "Implement and integrate with the tools you already use." },
      { title: "Evaluate", desc: "Test quality and performance on your real data." },
      { title: "Improve", desc: "Monitor, support and optimise after launch." },
    ],

    academyEyebrow: "Inclusive AI Academy",
    academyTitle: "Building the next generation of inclusive AI professionals.",
    academyBody: "We provide accessible learning opportunities for people with disabilities, helping them develop practical digital, data and AI skills and transition into meaningful professional opportunities.",
    academyTracks: ["AI Operations Specialist", "Junior Data Analyst", "Junior AI Automation Specialist"],
    academyCta: "Explore the Academy",

    impactTitle: "Technology should create opportunities, not barriers.",
    impactBody: "Our commercial work and our social mission are one model. Client projects create practical experience; the Academy prepares people to deliver that work well.",
    impactLoop: [
      { title: "Businesses", desc: "get practical AI solutions that save time." },
      { title: "Projects", desc: "create real, paid technology work." },
      { title: "Academy graduates", desc: "gain skills, experience and career pathways." },
    ],
    impactNote: "We're at the start of this journey. We'll publish impact numbers once we have verified results — not before.",

    pathsTitle: "How can we help you?",
    paths: [
      { title: "I need AI solutions for my business", desc: "Tell us about a process you'd like to improve. We'll suggest where AI fits — and where it doesn't.", cta: "Request a consultation", href: "/for-businesses#discovery" },
      { title: "I want to join the Academy", desc: "Register interest in our accessible pilot programme for AI, data and automation skills.", cta: "Register interest", href: "/academy#apply" },
      { title: "I want to become a partner", desc: "Employers, NGOs and institutions: collaborate on inclusive hiring, training and projects.", cta: "Partner with us", href: "/contact#partnership" },
    ],
  },
  pl: {
    heroEyebrow: "Inclusive AI Studio · Inclusive AI Academy",
    heroTitle: "Praktyczne rozwiązania AI. Bardziej inkluzywne kariery w technologii.",
    heroSubtitle: "Pomagamy małym firmom automatyzować powtarzalne procesy, lepiej wykorzystywać dane i wdrażać praktyczne rozwiązania AI.",
    heroSubtitle2: "Jednocześnie tworzymy możliwości zawodowe dla osób z niepełnosprawnościami poprzez dostępne szkolenia i realne projekty technologiczne.",
    heroCtaPrimary: "Poznaj usługi AI",
    heroCtaSecondary: "Odkryj Inclusive AI Academy",
    pillars: [
      { title: "Usługi AI", desc: "Automatyzacja, asystenci AI, analityka i ewaluacja.", href: "/services" },
      { title: "Akademia AI", desc: "Dostępne szkolenia z AI i umiejętności cyfrowych.", href: "/academy" },
      { title: "Kariera", desc: "Rozwój zawodowy i płatna praca projektowa.", href: "/careers" },
    ],

    problemsTitle: "Gdzie AI może pomóc Twojej firmie?",
    problemsSubtitle: "Nie potrzebujesz własnego zespołu AI. Większość małych firm zaczyna od jednego uciążliwego, powtarzalnego procesu.",
    problems: [
      { title: "Automatyzacja powtarzalnych zadań", desc: "Koniec z ręcznym przepisywaniem danych między e-mailami, arkuszami i systemami." },
      { title: "Szybsze przetwarzanie dokumentów", desc: "Automatyczne wyciąganie informacji z faktur, zamówień i formularzy." },
      { title: "Lepsza komunikacja z klientami", desc: "Szybsze odpowiedzi na typowe pytania dzięki asystentowi opartemu na Twoich treściach." },
      { title: "Zrozumienie danych firmy", desc: "Sprzedaż, koszty i klienci w czytelnych dashboardach zamiast rozproszonych plików." },
    ],

    servicesTitle: "Co budujemy",
    servicesSubtitle: "Trzy główne usługi dla małych i rozwijających się firm — oraz wyspecjalizowana ewaluacja AI.",
    services: [
      { title: "Automatyzacja AI", desc: "Przetwarzanie e-maili i dokumentów, ekstrakcja faktur, wprowadzanie danych i integracje procesów." },
      { title: "Asystenci AI i systemy wiedzy", desc: "Wewnętrzni asystenci wiedzy, asystenci obsługi klienta i wyszukiwanie w dokumentach na bazie Twoich treści." },
      { title: "Analityka danych i BI", desc: "Dashboardy sprzedaży i marketingu, raporty przychodów, segmentacja klientów i prognozowanie." },
    ],
    servicesCta: "Dowiedz się więcej",
    evalTitle: "Usługa specjalistyczna: ewaluacja AI",
    evalDesc: "Masz już asystenta AI lub chatbota? Przetestujemy go w ramach ustrukturyzowanej ewaluacji ludzkiej i automatycznej, zanim problemy znajdą Twoi klienci.",
    evalCta: "Poznaj ewaluację AI",

    processTitle: "Jak pracujemy",
    process: [
      { title: "Discover", desc: "Poznajemy problem biznesowy i obecny sposób pracy." },
      { title: "Design", desc: "Dobieramy właściwe rozwiązanie AI — albo mówimy, że go nie potrzebujesz." },
      { title: "Build", desc: "Wdrażamy i integrujemy z narzędziami, których już używasz." },
      { title: "Evaluate", desc: "Testujemy jakość i wydajność na Twoich realnych danych." },
      { title: "Improve", desc: "Monitorujemy, wspieramy i optymalizujemy po wdrożeniu." },
    ],

    academyEyebrow: "Inclusive AI Academy",
    academyTitle: "Kształcimy nowe pokolenie inkluzywnych specjalistów AI.",
    academyBody: "Zapewniamy dostępne możliwości nauki dla osób z niepełnosprawnościami, pomagając im rozwijać praktyczne umiejętności cyfrowe, analityczne i z zakresu AI oraz przejść do wartościowej pracy zawodowej.",
    academyTracks: ["AI Operations Specialist", "Junior Data Analyst", "Junior AI Automation Specialist"],
    academyCta: "Poznaj Akademię",

    impactTitle: "Technologia powinna tworzyć możliwości, a nie bariery.",
    impactBody: "Nasza działalność komercyjna i misja społeczna to jeden model. Projekty klientów dają praktyczne doświadczenie, a Akademia przygotowuje ludzi do dobrego wykonywania tej pracy.",
    impactLoop: [
      { title: "Firmy", desc: "otrzymują praktyczne rozwiązania AI, które oszczędzają czas." },
      { title: "Projekty", desc: "tworzą realną, płatną pracę w technologii." },
      { title: "Absolwenci Akademii", desc: "zdobywają umiejętności, doświadczenie i ścieżki kariery." },
    ],
    impactNote: "Jesteśmy na początku tej drogi. Wskaźniki wpływu opublikujemy, gdy będziemy mieć zweryfikowane wyniki — nie wcześniej.",

    pathsTitle: "Jak możemy pomóc?",
    paths: [
      { title: "Potrzebuję rozwiązań AI dla firmy", desc: "Opisz proces, który chcesz usprawnić. Podpowiemy, gdzie AI ma sens — a gdzie nie.", cta: "Poproś o konsultację", href: "/for-businesses#discovery" },
      { title: "Chcę dołączyć do Akademii", desc: "Zgłoś zainteresowanie dostępnym programem pilotażowym z AI, danych i automatyzacji.", cta: "Zgłoś zainteresowanie", href: "/academy#apply" },
      { title: "Chcę zostać partnerem", desc: "Pracodawcy, NGO i instytucje: współpracujmy przy inkluzywnej rekrutacji, szkoleniach i projektach.", cta: "Zostań partnerem", href: "/contact#partnership" },
    ],
  },
  ua: {
    heroEyebrow: "Inclusive AI Studio · Inclusive AI Academy",
    heroTitle: "Практичні AI-рішення. Більш інклюзивні кар'єри в технологіях.",
    heroSubtitle: "Ми допомагаємо малому бізнесу автоматизувати рутинні процеси, краще використовувати дані та впроваджувати практичні AI-рішення.",
    heroSubtitle2: "Водночас ми створюємо професійні можливості для людей з інвалідністю через доступне навчання та реальні технологічні проєкти.",
    heroCtaPrimary: "AI-послуги",
    heroCtaSecondary: "Inclusive AI Academy",
    pillars: [
      { title: "AI-послуги", desc: "Автоматизація, AI-асистенти, аналітика та оцінювання.", href: "/services" },
      { title: "AI Академія", desc: "Доступне навчання AI та цифровим навичкам.", href: "/academy" },
      { title: "Кар'єра", desc: "Професійний розвиток і оплачувана проєктна робота.", href: "/careers" },
    ],

    problemsTitle: "Де AI може допомогти вашому бізнесу?",
    problemsSubtitle: "Вам не потрібна власна AI-команда. Більшість малих компаній починають з одного болючого рутинного процесу.",
    problems: [
      { title: "Автоматизація рутинних завдань", desc: "Більше жодного ручного копіювання даних між листами, таблицями та системами." },
      { title: "Швидша обробка документів", desc: "Автоматичне вилучення інформації з рахунків, замовлень і форм." },
      { title: "Краща комунікація з клієнтами", desc: "Швидші відповіді на типові питання завдяки асистенту на основі ваших матеріалів." },
      { title: "Розуміння даних бізнесу", desc: "Продажі, витрати та клієнти в зрозумілих дашбордах замість розрізнених файлів." },
    ],

    servicesTitle: "Що ми створюємо",
    servicesSubtitle: "Три основні послуги для малого бізнесу, що росте, — плюс спеціалізоване оцінювання AI.",
    services: [
      { title: "AI-автоматизація", desc: "Обробка листів і документів, вилучення даних з рахунків, введення даних та інтеграції процесів." },
      { title: "AI-асистенти та системи знань", desc: "Внутрішні асистенти знань, асистенти підтримки клієнтів і пошук по документах на основі ваших матеріалів." },
      { title: "Аналітика даних і BI", desc: "Дашборди продажів і маркетингу, звіти про доходи, сегментація клієнтів і прогнозування." },
    ],
    servicesCta: "Детальніше",
    evalTitle: "Спеціалізована послуга: оцінювання AI",
    evalDesc: "Вже маєте AI-асистента чи чат-бота? Ми протестуємо його за допомогою структурованого людського та автоматичного оцінювання, перш ніж проблеми знайдуть ваші клієнти.",
    evalCta: "Оцінювання AI",

    processTitle: "Як ми працюємо",
    process: [
      { title: "Discover", desc: "Розбираємося в бізнес-проблемі та поточних процесах." },
      { title: "Design", desc: "Підбираємо правильне AI-рішення — або чесно кажемо, що воно не потрібне." },
      { title: "Build", desc: "Впроваджуємо та інтегруємо з інструментами, якими ви вже користуєтеся." },
      { title: "Evaluate", desc: "Тестуємо якість і продуктивність на ваших реальних даних." },
      { title: "Improve", desc: "Моніторимо, підтримуємо й оптимізуємо після запуску." },
    ],

    academyEyebrow: "Inclusive AI Academy",
    academyTitle: "Готуємо нове покоління інклюзивних AI-фахівців.",
    academyBody: "Ми надаємо доступні можливості навчання для людей з інвалідністю, допомагаючи розвивати практичні цифрові, аналітичні та AI-навички й переходити до змістовної професійної діяльності.",
    academyTracks: ["AI Operations Specialist", "Junior Data Analyst", "Junior AI Automation Specialist"],
    academyCta: "Дізнатися про Академію",

    impactTitle: "Технології мають створювати можливості, а не бар'єри.",
    impactBody: "Наша комерційна діяльність і соціальна місія — це одна модель. Клієнтські проєкти дають практичний досвід, а Академія готує людей якісно виконувати цю роботу.",
    impactLoop: [
      { title: "Бізнес", desc: "отримує практичні AI-рішення, які економлять час." },
      { title: "Проєкти", desc: "створюють реальну оплачувану роботу в технологіях." },
      { title: "Випускники Академії", desc: "здобувають навички, досвід і кар'єрні шляхи." },
    ],
    impactNote: "Ми на початку цього шляху. Показники впливу опублікуємо, коли матимемо перевірені результати — не раніше.",

    pathsTitle: "Чим ми можемо допомогти?",
    paths: [
      { title: "Мені потрібні AI-рішення для бізнесу", desc: "Опишіть процес, який хочете покращити. Ми підкажемо, де AI доречний — а де ні.", cta: "Запросити консультацію", href: "/for-businesses#discovery" },
      { title: "Я хочу приєднатися до Академії", desc: "Зареєструйте інтерес до доступної пілотної програми з AI, даних та автоматизації.", cta: "Зареєструватися", href: "/academy#apply" },
      { title: "Я хочу стати партнером", desc: "Роботодавці, НГО та установи: співпрацюймо в інклюзивному наймі, навчанні та проєктах.", cta: "Стати партнером", href: "/contact#partnership" },
    ],
  },
};

const PROBLEM_ICONS = [ICON_PATHS.bolt, ICON_PATHS.document, ICON_PATHS.chat, ICON_PATHS.chart];
const SERVICE_LINKS = [
  { icon: ICON_PATHS.cog, href: "/services#automation" },
  { icon: ICON_PATHS.chat, href: "/services#assistants" },
  { icon: ICON_PATHS.chart, href: "/services#analytics" },
];
const PATH_ICONS = [ICON_PATHS.briefcase, ICON_PATHS.academic, ICON_PATHS.handshake];

export default function Page() {
  const [lang, setLang] = useLang();
  const t = content[lang];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0B2818]">
          <div className="pointer-events-none absolute -top-40 -left-24 w-[34rem] h-[34rem] rounded-full bg-[#16A97A]/25 blur-[120px]" aria-hidden="true" />
          <div className="pointer-events-none absolute top-10 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#0F7A52]/30 blur-[110px]" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32 md:pb-20 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/85 text-xs font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
                {t.heroEyebrow}
              </span>

              <h1 className="mt-8 text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-tight leading-[1.15] sm:leading-[1.08] text-white break-words">
                {t.heroTitle}
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">{t.heroSubtitle}</p>
              <p className="mt-4 text-lg text-white/60 leading-relaxed max-w-2xl">{t.heroSubtitle2}</p>

              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href="/services" className={btnPrimary}>
                  {t.heroCtaPrimary}
                </Link>
                <Link href="/academy" className={btnGhostDark}>
                  {t.heroCtaSecondary}
                </Link>
              </div>
            </div>

            <div className="mt-16 grid sm:grid-cols-3 gap-4">
              {t.pillars.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex items-center justify-between text-white font-semibold">
                    {p.title}
                    <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4 text-[#3DDC97] transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1.5 text-sm text-white/60">{p.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Business problems */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.problemsTitle} subtitle={t.problemsSubtitle} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.problems.map((p, i) => (
                <IconCard key={p.title} icon={PROBLEM_ICONS[i]} title={p.title} desc={p.desc} />
              ))}
            </div>
          </div>
        </section>

        {/* Services overview */}
        <section className="py-24 md:py-32 bg-[#FAFAF9]">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.servicesTitle} subtitle={t.servicesSubtitle} />
            <div className="grid md:grid-cols-3 gap-6">
              {t.services.map((s, i) => (
                <IconCard key={s.title} icon={SERVICE_LINKS[i].icon} title={s.title} desc={s.desc} href={SERVICE_LINKS[i].href} cta={t.servicesCta} />
              ))}
            </div>
            <Link
              href="/ai-evaluation"
              className="group mt-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 rounded-2xl border border-[#0F7A52]/20 bg-[#0F7A52]/[0.04] p-7 hover:bg-[#0F7A52]/[0.08] transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0F7A52] text-white flex items-center justify-center flex-shrink-0">
                <Icon path={ICON_PATHS.shieldCheck} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0B2818]">{t.evalTitle}</h3>
                <p className="mt-1 text-[15px] text-[#3F3C3A] leading-relaxed">{t.evalDesc}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F7A52] whitespace-nowrap">
                {t.evalCta}
                <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </section>

        {/* How we work */}
        <section className="relative overflow-hidden py-24 md:py-32 bg-[#0B2818] text-white">
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-[#0F7A52]/25 blur-[120px]" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-6 relative">
            <SectionHeading title={t.processTitle} dark />
            <Steps steps={t.process} dark />
          </div>
        </section>

        {/* Academy */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0F7A52]">{t.academyEyebrow}</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.academyTitle}</h2>
              <p className="mt-5 text-lg text-[#3F3C3A] leading-relaxed">{t.academyBody}</p>
              <Link
                href="/academy"
                className="mt-8 inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-[#0F7A52] text-white font-semibold hover:bg-[#0B2818] transition-colors"
              >
                {t.academyCta}
              </Link>
            </div>
            <ol className="space-y-3">
              {t.academyTracks.map((track, i) => (
                <li key={track} className={`${cardClass} flex items-center gap-4 !p-5`}>
                  <span className="w-10 h-10 rounded-full bg-[#0F7A52]/10 text-[#0F7A52] font-semibold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-[#0B2818]">{track}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Inclusive impact */}
        <section className="py-24 md:py-32 bg-[#FAFAF9]">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeading title={t.impactTitle} subtitle={t.impactBody} center />
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {t.impactLoop.map((step, i) => (
                <div key={step.title} className={`${cardClass} text-center relative`}>
                  <div className="text-xs font-semibold text-[#0F7A52]">0{i + 1}</div>
                  <h3 className="mt-2 text-lg font-semibold text-[#0B2818]">{step.title}</h3>
                  <p className="mt-1 text-[15px] text-[#3F3C3A]">{step.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-[#5B5754]">{t.impactNote}</p>
          </div>
        </section>

        {/* Three paths CTA */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.pathsTitle} center />
            <div className="grid md:grid-cols-3 gap-6">
              {t.paths.map((p, i) => (
                <IconCard key={p.href} icon={PATH_ICONS[i]} title={p.title} desc={p.desc} href={p.href} cta={p.cta} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
