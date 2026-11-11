"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InquiryForm from "@/components/InquiryForm";
import { ICON_PATHS, Icon, PageHero, SectionHeading, Steps, btnGhostDark, btnPrimary, cardClass } from "@/components/ui";
import { careerApplication } from "@/lib/formConfigs";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

type Content = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  rolesTitle: string;
  rolesSubtitle: string;
  openTitle: string;
  openEmpty: string;
  futureTitle: string;
  futureRoles: { title: string; desc: string }[];
  trainingTitle: string;
  trainingDesc: string;
  trainingCta: string;
  processTitle: string;
  process: { title: string; desc: string }[];
  principlesTitle: string;
  principles: { title: string; desc: string }[];
  formTitle: string;
  formSubtitle: string;
  partnerTitle: string;
  partnerBody: string;
  partnerCta: string;
};

const content: Record<Lang, Content> = {
  en: {
    eyebrow: "Inclusive Employment",
    title: "Your skills. Your potential. Your career in technology.",
    subtitle: "We believe professional opportunities should be accessible to everyone. We are building an inclusive team where people with different disabilities can develop their skills and contribute to real AI and data projects.",
    cta: "Send your application",
    ctaSecondary: "How recruitment works",
    rolesTitle: "Professional opportunities",
    rolesSubtitle: "We're clear about what exists today and what we're building towards.",
    openTitle: "Open positions",
    openEmpty: "There are no open positions right now. Send us your application and we'll contact you when a matching role or project opens.",
    futureTitle: "Future opportunities",
    futureRoles: [
      { title: "AI Evaluator", desc: "Review and rate AI outputs for accuracy, language quality and safety." },
      { title: "AI Operations Specialist", desc: "Run day-to-day AI-assisted processes and quality checks." },
      { title: "Junior Data Analyst", desc: "Clean data, build reports and dashboards for clients." },
      { title: "AI Automation Specialist", desc: "Build and maintain workflow automations." },
      { title: "Quality Assurance Specialist", desc: "Test solutions before they reach clients." },
      { title: "Project Support Specialist", desc: "Coordinate tasks, documentation and client communication." },
    ],
    trainingTitle: "Training opportunities",
    trainingDesc: "Not ready to apply for a role yet? Start with one of the Inclusive AI Academy career tracks.",
    trainingCta: "Explore the Academy",
    processTitle: "How recruitment works",
    process: [
      { title: "Apply", desc: "Tell us about your skills and interests." },
      { title: "Skills assessment", desc: "We assess competencies — not diagnoses." },
      { title: "Training", desc: "We match you with a suitable learning track if needed." },
      { title: "Practical experience", desc: "Work on training or client projects in a format that suits you." },
      { title: "Employment", desc: "Suitable candidates get access to real, paid opportunities." },
    ],
    principlesTitle: "How we work together",
    principles: [
      { title: "Remote-friendly work", desc: "Most of our work can be done from home." },
      { title: "Flexible schedules", desc: "Where the project allows, you plan your own hours." },
      { title: "Skills-based recruitment", desc: "We look at what you can do and want to learn." },
      { title: "Accessible communication", desc: "Written, async-first communication with clear instructions." },
      { title: "Individual accommodations", desc: "We adapt tools and processes to how you work best." },
      { title: "Equal compensation", desc: "Equal pay for comparable work." },
    ],
    formTitle: "Apply to work with Prosvasimi",
    formSubtitle: "We assess skills, not diagnoses. Sharing accommodation needs is always optional.",
    partnerTitle: "Want to support inclusive employment?",
    partnerBody: "Work with us to create accessible professional opportunities, contribute to practical training and collaborate on inclusive technology projects.",
    partnerCta: "Become a partner",
  },
  pl: {
    eyebrow: "Inkluzywne zatrudnienie",
    title: "Twoje umiejętności. Twój potencjał. Twoja kariera w technologii.",
    subtitle: "Wierzymy, że możliwości zawodowe powinny być dostępne dla wszystkich. Budujemy inkluzywny zespół, w którym osoby z różnymi niepełnosprawnościami rozwijają umiejętności i współtworzą realne projekty AI i data.",
    cta: "Wyślij zgłoszenie",
    ctaSecondary: "Jak wygląda rekrutacja",
    rolesTitle: "Możliwości zawodowe",
    rolesSubtitle: "Jasno mówimy, co jest dostępne dziś, a co dopiero budujemy.",
    openTitle: "Otwarte stanowiska",
    openEmpty: "Obecnie nie mamy otwartych stanowisk. Wyślij zgłoszenie, a odezwiemy się, gdy pojawi się pasująca rola lub projekt.",
    futureTitle: "Przyszłe możliwości",
    futureRoles: [
      { title: "AI Evaluator", desc: "Ocena odpowiedzi AI pod kątem trafności, jakości językowej i bezpieczeństwa." },
      { title: "AI Operations Specialist", desc: "Obsługa codziennych procesów wspieranych przez AI i kontrola jakości." },
      { title: "Junior Data Analyst", desc: "Czyszczenie danych, raporty i dashboardy dla klientów." },
      { title: "AI Automation Specialist", desc: "Tworzenie i utrzymanie automatyzacji procesów." },
      { title: "Quality Assurance Specialist", desc: "Testowanie rozwiązań, zanim trafią do klientów." },
      { title: "Project Support Specialist", desc: "Koordynacja zadań, dokumentacji i komunikacji z klientem." },
    ],
    trainingTitle: "Możliwości szkoleniowe",
    trainingDesc: "Nie czujesz się jeszcze gotowy/a na rolę? Zacznij od jednej ze ścieżek Inclusive AI Academy.",
    trainingCta: "Poznaj Akademię",
    processTitle: "Jak wygląda rekrutacja",
    process: [
      { title: "Zgłoszenie", desc: "Opowiedz nam o swoich umiejętnościach i zainteresowaniach." },
      { title: "Ocena umiejętności", desc: "Oceniamy kompetencje — nie diagnozy." },
      { title: "Szkolenie", desc: "W razie potrzeby dobieramy odpowiednią ścieżkę nauki." },
      { title: "Praktyka", desc: "Praca przy projektach szkoleniowych lub klienckich w dogodnej formie." },
      { title: "Zatrudnienie", desc: "Odpowiedni kandydaci otrzymują dostęp do realnej, płatnej pracy." },
    ],
    principlesTitle: "Jak razem pracujemy",
    principles: [
      { title: "Praca zdalna", desc: "Większość naszej pracy można wykonywać z domu." },
      { title: "Elastyczny czas pracy", desc: "Tam, gdzie projekt na to pozwala, sam/a planujesz godziny." },
      { title: "Rekrutacja oparta na umiejętnościach", desc: "Patrzymy na to, co potrafisz i czego chcesz się nauczyć." },
      { title: "Dostępna komunikacja", desc: "Komunikacja pisemna, asynchroniczna, z jasnymi instrukcjami." },
      { title: "Indywidualne dostosowania", desc: "Dopasowujemy narzędzia i procesy do Twojego sposobu pracy." },
      { title: "Równe wynagrodzenie", desc: "Równa płaca za porównywalną pracę." },
    ],
    formTitle: "Zgłoś się do pracy z Prosvasimi",
    formSubtitle: "Oceniamy umiejętności, nie diagnozy. Informacje o potrzebnych dostosowaniach są zawsze opcjonalne.",
    partnerTitle: "Chcesz wspierać inkluzywne zatrudnienie?",
    partnerBody: "Współpracuj z nami przy tworzeniu dostępnych możliwości zawodowych, praktycznych szkoleń i inkluzywnych projektów technologicznych.",
    partnerCta: "Zostań partnerem",
  },
  ua: {
    eyebrow: "Інклюзивне працевлаштування",
    title: "Ваші навички. Ваш потенціал. Ваша кар'єра в технологіях.",
    subtitle: "Ми віримо, що професійні можливості мають бути доступними для всіх. Ми будуємо інклюзивну команду, де люди з різною інвалідністю розвивають навички та роблять внесок у реальні AI- та data-проєкти.",
    cta: "Надіслати заявку",
    ctaSecondary: "Як відбувається відбір",
    rolesTitle: "Професійні можливості",
    rolesSubtitle: "Ми чесно розділяємо те, що є сьогодні, і те, що ми будуємо.",
    openTitle: "Відкриті вакансії",
    openEmpty: "Зараз відкритих вакансій немає. Надішліть заявку, і ми зв'яжемося, коли з'явиться відповідна роль чи проєкт.",
    futureTitle: "Майбутні можливості",
    futureRoles: [
      { title: "AI Evaluator", desc: "Оцінювання відповідей AI на точність, якість мови та безпеку." },
      { title: "AI Operations Specialist", desc: "Щоденні процеси з AI та контроль якості." },
      { title: "Junior Data Analyst", desc: "Очищення даних, звіти та дашборди для клієнтів." },
      { title: "AI Automation Specialist", desc: "Створення та підтримка автоматизацій процесів." },
      { title: "Quality Assurance Specialist", desc: "Тестування рішень до передачі клієнтам." },
      { title: "Project Support Specialist", desc: "Координація завдань, документації та комунікації з клієнтом." },
    ],
    trainingTitle: "Можливості навчання",
    trainingDesc: "Ще не готові подаватися на роль? Почніть з одного з треків Inclusive AI Academy.",
    trainingCta: "Дізнатися про Академію",
    processTitle: "Як відбувається відбір",
    process: [
      { title: "Заявка", desc: "Розкажіть про свої навички та інтереси." },
      { title: "Оцінка навичок", desc: "Ми оцінюємо компетенції — не діагнози." },
      { title: "Навчання", desc: "За потреби підбираємо відповідний навчальний трек." },
      { title: "Практичний досвід", desc: "Робота над навчальними чи клієнтськими проєктами у зручному форматі." },
      { title: "Працевлаштування", desc: "Відповідні кандидати отримують доступ до реальної оплачуваної роботи." },
    ],
    principlesTitle: "Як ми працюємо разом",
    principles: [
      { title: "Віддалена робота", desc: "Більшість нашої роботи можна виконувати з дому." },
      { title: "Гнучкий графік", desc: "Там, де дозволяє проєкт, ви самі плануєте години." },
      { title: "Відбір за навичками", desc: "Ми дивимося на те, що ви вмієте і чого хочете навчитися." },
      { title: "Доступна комунікація", desc: "Письмова, асинхронна комунікація з чіткими інструкціями." },
      { title: "Індивідуальні пристосування", desc: "Ми адаптуємо інструменти та процеси під ваш спосіб роботи." },
      { title: "Рівна оплата", desc: "Рівна оплата за порівнянну роботу." },
    ],
    formTitle: "Подати заявку на роботу з Prosvasimi",
    formSubtitle: "Ми оцінюємо навички, а не діагнози. Повідомляти про потрібні пристосування — завжди необов'язково.",
    partnerTitle: "Хочете підтримати інклюзивне працевлаштування?",
    partnerBody: "Співпрацюйте з нами, щоб створювати доступні професійні можливості, практичне навчання та інклюзивні технологічні проєкти.",
    partnerCta: "Стати партнером",
  },
};

export default function CareersPage() {
  const [lang, setLang] = useLang();
  const t = content[lang];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={<p>{t.subtitle}</p>}>
          <Link href="#apply" className={btnPrimary}>
            {t.cta}
          </Link>
          <Link href="#process" className={btnGhostDark}>
            {t.ctaSecondary}
          </Link>
        </PageHero>

        {/* Opportunities: open / future / training kept clearly separate */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.rolesTitle} subtitle={t.rolesSubtitle} />

            <h3 className="text-xl font-semibold text-[#0B2818]">{t.openTitle}</h3>
            <p className="mt-3 rounded-2xl border border-dashed border-black/[0.15] p-6 text-[#3F3C3A]">{t.openEmpty}</p>

            <h3 className="mt-14 text-xl font-semibold text-[#0B2818]">{t.futureTitle}</h3>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.futureRoles.map((r) => (
                <div key={r.title} className={`${cardClass} !p-6`}>
                  <h4 className="font-semibold text-[#0B2818]">{r.title}</h4>
                  <p className="mt-1.5 text-[15px] text-[#3F3C3A]">{r.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-14 text-xl font-semibold text-[#0B2818]">{t.trainingTitle}</h3>
            <div className="mt-5 rounded-2xl border border-[#0F7A52]/20 bg-[#0F7A52]/[0.04] p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <p className="text-[#3F3C3A]">{t.trainingDesc}</p>
              <Link href="/academy" className="inline-flex items-center gap-1.5 font-semibold text-[#0F7A52] hover:text-[#0B2818] whitespace-nowrap">
                {t.trainingCta}
                <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Recruitment process */}
        <section id="process" className="py-24 md:py-32 bg-[#0B2818] text-white scroll-mt-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.processTitle} dark />
            <Steps steps={t.process} dark />
          </div>
        </section>

        {/* Principles */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.principlesTitle} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {t.principles.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <Icon path={ICON_PATHS.checkCircle} className="w-6 h-6 text-[#0F7A52] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#0B2818]">{p.title}</h3>
                    <p className="mt-1 text-[15px] text-[#3F3C3A]">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InquiryForm lang={lang} id="apply" title={t.formTitle} subtitle={t.formSubtitle} {...careerApplication(lang)} />

        {/* Employer partnerships */}
        <section className="py-24 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-[#0B2818] text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t.partnerTitle}</h2>
                <p className="mt-3 text-white/70 leading-relaxed">{t.partnerBody}</p>
              </div>
              <Link href="/contact#partnership" className={`${btnPrimary} flex-shrink-0`}>
                {t.partnerCta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
