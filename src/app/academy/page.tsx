"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InquiryForm from "@/components/InquiryForm";
import { CheckList, FaqList, ICON_PATHS, Icon, PageHero, SectionHeading, btnGhostDark, btnPrimary, cardClass } from "@/components/ui";
import { academyApplication } from "@/lib/formConfigs";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

type Track = {
  level: string;
  title: string;
  summary: string;
  learn: string[];
  required: string;
  assignments: string;
  careers: string;
};

type Content = {
  eyebrow: string;
  title: string;
  subtitle: string[];
  cta: string;
  ctaSecondary: string;
  tracksTitle: string;
  tracksSubtitle: string;
  trackLabels: { learn: string; required: string; duration: string; assignments: string; careers: string };
  trackDuration: string;
  tracks: Track[];
  programmeTitle: string;
  programme: { label: string; value: string }[];
  programmeNote: string;
  accessTitle: string;
  accessBody: string;
  access: string[];
  pathTitle: string;
  pathBody: string;
  pathCta: string;
  formTitle: string;
  formSubtitle: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
};

const content: Record<Lang, Content> = {
  en: {
    eyebrow: "Inclusive AI Academy by Prosvasimi",
    title: "Learn AI. Build skills. Create your future.",
    subtitle: [
      "Inclusive AI Academy helps people with disabilities develop practical digital, data and artificial intelligence skills.",
      "Our goal is to connect accessible education with real professional opportunities, practical projects and meaningful employment. You don't need to be an AI expert to get started.",
    ],
    cta: "Register your interest",
    ctaSecondary: "See career tracks",
    tracksTitle: "Three career tracks",
    tracksSubtitle: "Choose a starting point that matches your current skills. Each track is built around the work our studio actually delivers.",
    trackLabels: { learn: "What you will learn", required: "Required skills", duration: "Training duration", assignments: "Practical assignments", careers: "Career opportunities" },
    trackDuration: "6 weeks (pilot)",
    tracks: [
      {
        level: "Beginner",
        title: "AI Operations Specialist",
        summary: "Work with AI tools, documents, AI output review, data and reporting.",
        learn: ["Using AI assistants effectively and safely", "Reviewing and rating AI responses", "Document and data handling", "Basic reporting"],
        required: "Comfortable with a computer, email and documents.",
        assignments: "Evaluate real AI assistant outputs; prepare a structured quality report.",
        careers: "AI Evaluator, AI Operations Specialist, Quality Assurance Specialist",
      },
      {
        level: "Intermediate",
        title: "Junior Data Analyst",
        summary: "Excel, SQL, Power BI, data cleaning and analytics.",
        learn: ["Advanced spreadsheets", "SQL fundamentals", "Data cleaning", "Dashboards in Power BI"],
        required: "Confident with spreadsheets; interest in numbers and patterns.",
        assignments: "Clean a real-world dataset and build a sales dashboard for a small business case.",
        careers: "Junior Data Analyst, Reporting Specialist",
      },
      {
        level: "Technical",
        title: "Junior AI Automation Specialist",
        summary: "Make, n8n, APIs, LLM integrations and workflow automation.",
        learn: ["Workflow automation with Make and n8n", "Working with APIs", "Integrating LLMs into business processes", "Testing and documenting automations"],
        required: "Some experience with automation, scripting or no-code tools.",
        assignments: "Build an end-to-end document-processing automation with human review.",
        careers: "Junior AI Automation Specialist, Project Support Specialist",
      },
    ],
    programmeTitle: "Pilot programme at a glance",
    programme: [
      { label: "Duration", value: "6 weeks (pilot)" },
      { label: "Format", value: "Online / hybrid" },
      { label: "Materials", value: "Accessible by design" },
      { label: "Practical projects", value: "Included" },
      { label: "Mentoring", value: "Available" },
      { label: "Cost", value: "To be confirmed with programme funding" },
    ],
    programmeNote: "We're preparing the first pilot cohort now. Register your interest and we'll contact you when recruitment opens.",
    accessTitle: "Our accessibility commitment",
    accessBody: "The Academy is designed from the start for people with different disabilities — not adapted afterwards.",
    access: ["Screen-reader-compatible materials", "Captions and transcripts for all video", "Flexible learning schedules", "Clear, accessible communication", "Individual learning accommodations", "Fully remote participation"],
    pathTitle: "From learning to working",
    pathBody: "Completing the Academy doesn't guarantee a job. It can give you access to further selection for real, paid projects with our AI studio and partners.",
    pathCta: "See careers",
    formTitle: "Register your interest",
    formSubtitle: "It takes about three minutes. You never need to share a diagnosis or medical information.",
    faqTitle: "Academy FAQ",
    faq: [
      { q: "Who can apply?", a: "The pilot is designed for people with disabilities, chronic illnesses and neurodivergent people who want to build a career in digital, data or AI work." },
      { q: "Do I need previous technical experience?", a: "No for the AI Operations track. The Data Analyst and Automation tracks expect some prior experience, described in each track." },
      { q: "Is the programme free?", a: "We aim to make the pilot free for selected participants, funded by grants and partners. We'll confirm this once funding is secured — before anyone enrols." },
      { q: "Will I receive a certificate?", a: "We plan to issue a Prosvasimi certificate of completion to participants who finish the programme and its practical assignments. Details will be confirmed before the pilot starts." },
      { q: "Does completion guarantee employment?", a: "No. Completion can give you access to further selection for real projects with our studio and partner employers, but we can't promise a job." },
      { q: "Can I study remotely?", a: "Yes. The programme can be completed fully online." },
      { q: "What accessibility support is available?", a: "Accessible materials, captions, transcripts, flexible pacing and individual accommodations. Tell us what helps you in the application form." },
    ],
  },
  pl: {
    eyebrow: "Inclusive AI Academy by Prosvasimi",
    title: "Ucz się AI. Rozwijaj umiejętności. Twórz swoją przyszłość.",
    subtitle: [
      "Inclusive AI Academy pomaga osobom z niepełnosprawnościami rozwijać praktyczne umiejętności cyfrowe, analityczne i z zakresu sztucznej inteligencji.",
      "Łączymy dostępną edukację z realnymi możliwościami zawodowymi, praktycznymi projektami i wartościową pracą. Nie musisz być ekspertem od AI, żeby zacząć.",
    ],
    cta: "Zgłoś zainteresowanie",
    ctaSecondary: "Zobacz ścieżki",
    tracksTitle: "Trzy ścieżki kariery",
    tracksSubtitle: "Wybierz punkt startowy dopasowany do swoich umiejętności. Każda ścieżka opiera się na pracy, którą faktycznie realizuje nasze studio.",
    trackLabels: { learn: "Czego się nauczysz", required: "Wymagane umiejętności", duration: "Czas trwania", assignments: "Zadania praktyczne", careers: "Możliwości zawodowe" },
    trackDuration: "6 tygodni (pilotaż)",
    tracks: [
      {
        level: "Początkujący",
        title: "AI Operations Specialist",
        summary: "Praca z narzędziami AI, dokumentami, weryfikacją odpowiedzi AI, danymi i raportami.",
        learn: ["Skuteczne i bezpieczne korzystanie z asystentów AI", "Ocena odpowiedzi AI", "Praca z dokumentami i danymi", "Podstawy raportowania"],
        required: "Swobodna obsługa komputera, poczty i dokumentów.",
        assignments: "Ocena realnych odpowiedzi asystenta AI i przygotowanie raportu jakości.",
        careers: "AI Evaluator, AI Operations Specialist, Quality Assurance Specialist",
      },
      {
        level: "Średniozaawansowany",
        title: "Junior Data Analyst",
        summary: "Excel, SQL, Power BI, czyszczenie danych i analityka.",
        learn: ["Zaawansowane arkusze", "Podstawy SQL", "Czyszczenie danych", "Dashboardy w Power BI"],
        required: "Swoboda w arkuszach kalkulacyjnych; zainteresowanie liczbami.",
        assignments: "Oczyszczenie realnego zbioru danych i dashboard sprzedaży dla małej firmy.",
        careers: "Junior Data Analyst, Reporting Specialist",
      },
      {
        level: "Techniczny",
        title: "Junior AI Automation Specialist",
        summary: "Make, n8n, API, integracje LLM i automatyzacja procesów.",
        learn: ["Automatyzacja w Make i n8n", "Praca z API", "Integracja LLM z procesami biznesowymi", "Testowanie i dokumentowanie automatyzacji"],
        required: "Doświadczenie z automatyzacją, skryptami lub narzędziami no-code.",
        assignments: "Zbudowanie kompletnej automatyzacji przetwarzania dokumentów z weryfikacją człowieka.",
        careers: "Junior AI Automation Specialist, Project Support Specialist",
      },
    ],
    programmeTitle: "Program pilotażowy w skrócie",
    programme: [
      { label: "Czas trwania", value: "6 tygodni (pilotaż)" },
      { label: "Forma", value: "Online / hybrydowo" },
      { label: "Materiały", value: "Dostępne od podstaw" },
      { label: "Projekty praktyczne", value: "W programie" },
      { label: "Mentoring", value: "Dostępny" },
      { label: "Koszt", value: "Do potwierdzenia wraz z finansowaniem programu" },
    ],
    programmeNote: "Przygotowujemy pierwszą grupę pilotażową. Zgłoś zainteresowanie, a odezwiemy się, gdy ruszy rekrutacja.",
    accessTitle: "Nasze zobowiązanie do dostępności",
    accessBody: "Akademia jest projektowana od początku z myślą o osobach z różnymi niepełnosprawnościami — a nie dostosowywana później.",
    access: ["Materiały zgodne z czytnikami ekranu", "Napisy i transkrypcje do wszystkich nagrań", "Elastyczny harmonogram nauki", "Jasna, dostępna komunikacja", "Indywidualne dostosowania", "Możliwość udziału w pełni zdalnie"],
    pathTitle: "Od nauki do pracy",
    pathBody: "Ukończenie Akademii nie gwarantuje zatrudnienia. Może jednak dać dostęp do dalszej rekrutacji do realnych, płatnych projektów w naszym studiu AI i u partnerów.",
    pathCta: "Zobacz kariery",
    formTitle: "Zgłoś zainteresowanie",
    formSubtitle: "To zajmie około trzech minut. Nigdy nie musisz podawać diagnozy ani informacji medycznych.",
    faqTitle: "Pytania o Akademię",
    faq: [
      { q: "Kto może się zgłosić?", a: "Pilotaż jest przeznaczony dla osób z niepełnosprawnościami, chorobami przewlekłymi i osób neuroróżnorodnych, które chcą budować karierę w pracy cyfrowej, z danymi lub AI." },
      { q: "Czy potrzebuję doświadczenia technicznego?", a: "Nie na ścieżce AI Operations. Ścieżki Data Analyst i Automation wymagają pewnego doświadczenia, opisanego przy każdej z nich." },
      { q: "Czy program jest bezpłatny?", a: "Chcemy, aby pilotaż był bezpłatny dla wybranych uczestników dzięki grantom i partnerom. Potwierdzimy to po zabezpieczeniu finansowania — przed zapisami." },
      { q: "Czy otrzymam certyfikat?", a: "Planujemy wydawać certyfikat ukończenia Prosvasimi osobom, które ukończą program i zadania praktyczne. Szczegóły potwierdzimy przed startem pilotażu." },
      { q: "Czy ukończenie gwarantuje zatrudnienie?", a: "Nie. Ukończenie może dać dostęp do dalszej rekrutacji do realnych projektów w naszym studiu i u partnerów, ale nie możemy obiecać pracy." },
      { q: "Czy mogę uczyć się zdalnie?", a: "Tak. Program można ukończyć w pełni online." },
      { q: "Jakie wsparcie w zakresie dostępności jest dostępne?", a: "Dostępne materiały, napisy, transkrypcje, elastyczne tempo i indywidualne dostosowania. Napisz w formularzu, co Ci pomaga." },
    ],
  },
  ua: {
    eyebrow: "Inclusive AI Academy by Prosvasimi",
    title: "Вивчайте AI. Розвивайте навички. Створюйте своє майбутнє.",
    subtitle: [
      "Inclusive AI Academy допомагає людям з інвалідністю розвивати практичні цифрові, аналітичні навички та навички роботи зі штучним інтелектом.",
      "Ми поєднуємо доступну освіту з реальними професійними можливостями, практичними проєктами та змістовною роботою. Щоб почати, не потрібно бути експертом з AI.",
    ],
    cta: "Зареєструвати інтерес",
    ctaSecondary: "Кар'єрні треки",
    tracksTitle: "Три кар'єрні треки",
    tracksSubtitle: "Оберіть стартову точку відповідно до своїх навичок. Кожен трек побудований на роботі, яку реально виконує наша студія.",
    trackLabels: { learn: "Чого ви навчитеся", required: "Потрібні навички", duration: "Тривалість навчання", assignments: "Практичні завдання", careers: "Кар'єрні можливості" },
    trackDuration: "6 тижнів (пілот)",
    tracks: [
      {
        level: "Початковий",
        title: "AI Operations Specialist",
        summary: "Робота з AI-інструментами, документами, перевіркою відповідей AI, даними та звітністю.",
        learn: ["Ефективне та безпечне використання AI-асистентів", "Оцінювання відповідей AI", "Робота з документами та даними", "Основи звітності"],
        required: "Впевнене користування комп'ютером, поштою та документами.",
        assignments: "Оцінити реальні відповіді AI-асистента та підготувати звіт про якість.",
        careers: "AI Evaluator, AI Operations Specialist, Quality Assurance Specialist",
      },
      {
        level: "Середній",
        title: "Junior Data Analyst",
        summary: "Excel, SQL, Power BI, очищення даних та аналітика.",
        learn: ["Просунуті таблиці", "Основи SQL", "Очищення даних", "Дашборди в Power BI"],
        required: "Впевнена робота з таблицями; інтерес до чисел і закономірностей.",
        assignments: "Очистити реальний набір даних і створити дашборд продажів для малого бізнесу.",
        careers: "Junior Data Analyst, Reporting Specialist",
      },
      {
        level: "Технічний",
        title: "Junior AI Automation Specialist",
        summary: "Make, n8n, API, інтеграції LLM та автоматизація процесів.",
        learn: ["Автоматизація в Make і n8n", "Робота з API", "Інтеграція LLM у бізнес-процеси", "Тестування та документування автоматизацій"],
        required: "Певний досвід з автоматизацією, скриптами чи no-code інструментами.",
        assignments: "Створити повну автоматизацію обробки документів з людською перевіркою.",
        careers: "Junior AI Automation Specialist, Project Support Specialist",
      },
    ],
    programmeTitle: "Пілотна програма коротко",
    programme: [
      { label: "Тривалість", value: "6 тижнів (пілот)" },
      { label: "Формат", value: "Онлайн / гібридно" },
      { label: "Матеріали", value: "Доступні з самого початку" },
      { label: "Практичні проєкти", value: "Включено" },
      { label: "Менторство", value: "Доступне" },
      { label: "Вартість", value: "Буде підтверджено разом з фінансуванням програми" },
    ],
    programmeNote: "Ми готуємо першу пілотну групу. Зареєструйте інтерес, і ми зв'яжемося, коли відкриється набір.",
    accessTitle: "Наше зобов'язання щодо доступності",
    accessBody: "Академія від початку створюється для людей з різною інвалідністю — а не адаптується згодом.",
    access: ["Матеріали, сумісні зі скрінрідерами", "Субтитри та транскрипти до всіх відео", "Гнучкий графік навчання", "Зрозуміла, доступна комунікація", "Індивідуальні пристосування", "Повністю дистанційна участь"],
    pathTitle: "Від навчання до роботи",
    pathBody: "Завершення Академії не гарантує працевлаштування. Але може відкрити доступ до подальшого відбору на реальні оплачувані проєкти нашої AI-студії та партнерів.",
    pathCta: "Кар'єра",
    formTitle: "Зареєструвати інтерес",
    formSubtitle: "Це займе близько трьох хвилин. Вам ніколи не потрібно повідомляти діагноз чи медичну інформацію.",
    faqTitle: "Питання про Академію",
    faq: [
      { q: "Хто може подати заявку?", a: "Пілот розрахований на людей з інвалідністю, хронічними захворюваннями та нейровідмінних людей, які хочуть будувати кар'єру в цифровій сфері, роботі з даними чи AI." },
      { q: "Чи потрібен попередній технічний досвід?", a: "Для треку AI Operations — ні. Треки Data Analyst та Automation передбачають певний досвід, описаний у кожному треку." },
      { q: "Чи програма безкоштовна?", a: "Ми прагнемо зробити пілот безкоштовним для відібраних учасників завдяки грантам і партнерам. Підтвердимо це після забезпечення фінансування — до зарахування." },
      { q: "Чи отримаю я сертифікат?", a: "Ми плануємо видавати сертифікат Prosvasimi про проходження учасникам, які завершать програму та практичні завдання. Деталі підтвердимо до старту пілоту." },
      { q: "Чи гарантує завершення працевлаштування?", a: "Ні. Завершення може дати доступ до подальшого відбору на реальні проєкти нашої студії та партнерів-роботодавців, але ми не можемо обіцяти роботу." },
      { q: "Чи можна навчатися дистанційно?", a: "Так. Програму можна пройти повністю онлайн." },
      { q: "Яка підтримка доступності передбачена?", a: "Доступні матеріали, субтитри, транскрипти, гнучкий темп та індивідуальні пристосування. Розкажіть у формі, що вам допомагає." },
    ],
  },
};

export default function AcademyPage() {
  const [lang, setLang] = useLang();
  const t = content[lang];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        <PageHero
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle.map((p) => (
            <p key={p}>{p}</p>
          ))}
        >
          <Link href="#apply" className={btnPrimary}>
            {t.cta}
          </Link>
          <Link href="#tracks" className={btnGhostDark}>
            {t.ctaSecondary}
          </Link>
        </PageHero>

        {/* Career tracks */}
        <section id="tracks" className="py-24 md:py-32 scroll-mt-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.tracksTitle} subtitle={t.tracksSubtitle} />
            <div className="grid lg:grid-cols-3 gap-6">
              {t.tracks.map((track) => (
                <article key={track.title} className={`${cardClass} flex flex-col`}>
                  <span className="self-start px-3 py-1 rounded-full bg-[#0F7A52]/10 text-[#0F7A52] text-xs font-semibold uppercase tracking-wide">
                    {track.level}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[#0B2818]">{track.title}</h3>
                  <p className="mt-2 text-[15px] text-[#3F3C3A] leading-relaxed">{track.summary}</p>
                  <dl className="mt-6 space-y-4 text-[15px]">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.trackLabels.learn}</dt>
                      <dd className="mt-2">
                        <CheckList items={track.learn} className="!space-y-2 text-[15px]" />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.trackLabels.required}</dt>
                      <dd className="mt-1 text-[#3F3C3A]">{track.required}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.trackLabels.duration}</dt>
                      <dd className="mt-1 text-[#3F3C3A]">{t.trackDuration}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.trackLabels.assignments}</dt>
                      <dd className="mt-1 text-[#3F3C3A]">{track.assignments}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#5B5754]">{t.trackLabels.careers}</dt>
                      <dd className="mt-1 font-medium text-[#0B2818]">{track.careers}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Programme details */}
        <section className="py-24 md:py-32 bg-[#0B2818] text-white">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.programmeTitle} dark />
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.programme.map((p) => (
                <div key={p.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <dt className="text-sm text-white/60">{p.label}</dt>
                  <dd className="mt-1 text-lg font-semibold">{p.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-white/70 max-w-3xl">{t.programmeNote}</p>
          </div>
        </section>

        {/* Accessibility commitment */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#0F7A52] text-white flex items-center justify-center mb-5">
                <Icon path={ICON_PATHS.heart} className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B2818]">{t.accessTitle}</h2>
              <p className="mt-4 text-lg text-[#3F3C3A] leading-relaxed">{t.accessBody}</p>
            </div>
            <CheckList items={t.access} className={`${cardClass}`} />
          </div>
        </section>

        {/* From learning to working */}
        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-[#0F7A52]/20 bg-[#0F7A52]/[0.04] p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-[#0B2818]">{t.pathTitle}</h2>
                <p className="mt-3 text-[#3F3C3A] leading-relaxed">{t.pathBody}</p>
              </div>
              <Link href="/careers" className="inline-flex items-center gap-1.5 font-semibold text-[#0F7A52] hover:text-[#0B2818] whitespace-nowrap">
                {t.pathCta}
                <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <InquiryForm lang={lang} id="apply" title={t.formTitle} subtitle={t.formSubtitle} {...academyApplication(lang)} />

        {/* FAQ */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <SectionHeading title={t.faqTitle} />
            <FaqList items={t.faq} />
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
