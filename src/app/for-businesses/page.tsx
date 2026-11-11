"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InquiryForm from "@/components/InquiryForm";
import { FaqList, ICON_PATHS, Icon, PageHero, SectionHeading, btnGhostDark, btnPrimary, cardClass } from "@/components/ui";
import { businessInquiry } from "@/lib/formConfigs";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

type Content = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  industriesTitle: string;
  industriesSubtitle: string;
  industries: { title: string; cases: string[] }[];
  outcomesTitle: string;
  outcomesSubtitle: string;
  outcomes: string[];
  outcomesNote: string;
  formTitle: string;
  formSubtitle: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
};

const content: Record<Lang, Content> = {
  en: {
    eyebrow: "For small and growing businesses",
    title: "Make your business work smarter with AI.",
    subtitle: "Practical AI and automation solutions for growing businesses. No need for an internal AI team or complex technology infrastructure.",
    ctaPrimary: "Request an AI consultation",
    ctaSecondary: "See our services",
    industriesTitle: "Built for businesses like yours",
    industriesSubtitle: "We focus on companies with 5–50 employees, where a few hours saved each week makes a real difference.",
    industries: [
      { title: "E-commerce", cases: ["Product descriptions and content", "Customer support assistant", "Sales and stock reporting"] },
      { title: "Professional services", cases: ["Document processing", "Email automation", "CRM updates and follow-ups"] },
      { title: "Logistics", cases: ["Extracting data from shipping documents", "Shipment status reporting", "Order and data processing"] },
      { title: "Small agencies", cases: ["Lead management", "Content workflows", "Client reporting"] },
    ],
    outcomesTitle: "The outcomes we work towards",
    outcomesSubtitle: "Every project starts with a measurable goal we agree together — and we measure it before and after.",
    outcomes: ["Reduce manual data entry", "Reduce document processing time", "Improve response times", "Reduce repetitive administrative work", "Improve reporting visibility"],
    outcomesNote: "We don't promise a fixed percentage saving up front. Results depend on your processes, and we only report numbers we've actually measured.",
    formTitle: "Tell us about your business",
    formSubtitle: "Share a little about your challenge. We'll reply within two business days to arrange a free discovery call.",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do I need technical knowledge?", a: "No. We explain options in plain language, handle the technical work and train your team to use the result." },
      { q: "Can you work with our existing software?", a: "Usually, yes. We integrate with common tools such as email, spreadsheets, CRMs, e-commerce platforms and accounting software. We check feasibility during the discovery call." },
      { q: "How much does an AI implementation cost?", a: "It depends on scope. Smaller automations are typically fixed-price projects; we give you a clear quote after discovery, before any work begins." },
      { q: "How long does implementation take?", a: "Most small projects take between one and six weeks from agreed scope to launch." },
      { q: "Can you support us after deployment?", a: "Yes. We offer monthly support for monitoring, improvements and changes as your business evolves." },
      { q: "Do you work with international clients?", a: "Yes. We're based in Poland and work remotely with clients in English, Polish and Ukrainian." },
      { q: "How do you handle our data?", a: "We only access the data a project needs, agree data processing terms with you before starting, and prefer solutions that keep your data within your own accounts." },
    ],
  },
  pl: {
    eyebrow: "Dla małych i rozwijających się firm",
    title: "Spraw, by Twoja firma działała mądrzej dzięki AI.",
    subtitle: "Praktyczne rozwiązania AI i automatyzacji dla rozwijających się firm. Bez własnego zespołu AI i skomplikowanej infrastruktury.",
    ctaPrimary: "Poproś o konsultację AI",
    ctaSecondary: "Zobacz nasze usługi",
    industriesTitle: "Dla firm takich jak Twoja",
    industriesSubtitle: "Koncentrujemy się na firmach zatrudniających 5–50 osób, gdzie kilka zaoszczędzonych godzin tygodniowo robi realną różnicę.",
    industries: [
      { title: "E-commerce", cases: ["Opisy produktów i treści", "Asystent obsługi klienta", "Raporty sprzedaży i stanów"] },
      { title: "Usługi profesjonalne", cases: ["Przetwarzanie dokumentów", "Automatyzacja e-maili", "Aktualizacje CRM i follow-upy"] },
      { title: "Logistyka", cases: ["Ekstrakcja danych z dokumentów przewozowych", "Raporty statusu przesyłek", "Przetwarzanie zamówień i danych"] },
      { title: "Małe agencje", cases: ["Zarządzanie leadami", "Procesy contentowe", "Raportowanie dla klientów"] },
    ],
    outcomesTitle: "Efekty, do których dążymy",
    outcomesSubtitle: "Każdy projekt zaczyna się od wspólnie ustalonego, mierzalnego celu — mierzymy go przed i po wdrożeniu.",
    outcomes: ["Mniej ręcznego wprowadzania danych", "Krótszy czas przetwarzania dokumentów", "Szybsze odpowiedzi", "Mniej powtarzalnej pracy administracyjnej", "Lepsza widoczność w raportach"],
    outcomesNote: "Nie obiecujemy z góry konkretnego procentu oszczędności. Wyniki zależą od Twoich procesów, a raportujemy tylko liczby, które faktycznie zmierzyliśmy.",
    formTitle: "Opowiedz nam o swojej firmie",
    formSubtitle: "Opisz krótko swoje wyzwanie. Odpowiemy w ciągu dwóch dni roboczych, aby umówić bezpłatną rozmowę.",
    faqTitle: "Najczęstsze pytania",
    faq: [
      { q: "Czy potrzebuję wiedzy technicznej?", a: "Nie. Wyjaśniamy opcje prostym językiem, wykonujemy pracę techniczną i szkolimy zespół z korzystania z rozwiązania." },
      { q: "Czy możecie pracować z naszym obecnym oprogramowaniem?", a: "Zazwyczaj tak. Integrujemy się z popularnymi narzędziami: pocztą, arkuszami, CRM, platformami e-commerce i programami księgowymi. Wykonalność sprawdzamy podczas rozmowy." },
      { q: "Ile kosztuje wdrożenie AI?", a: "To zależy od zakresu. Mniejsze automatyzacje to zwykle projekty o stałej cenie; jasną wycenę przedstawiamy po etapie discovery, przed rozpoczęciem prac." },
      { q: "Jak długo trwa wdrożenie?", a: "Większość małych projektów trwa od jednego do sześciu tygodni od ustalenia zakresu do uruchomienia." },
      { q: "Czy wspieracie nas po wdrożeniu?", a: "Tak. Oferujemy miesięczne wsparcie: monitoring, usprawnienia i zmiany w miarę rozwoju firmy." },
      { q: "Czy pracujecie z klientami zagranicznymi?", a: "Tak. Działamy z Polski i pracujemy zdalnie z klientami po angielsku, polsku i ukraińsku." },
      { q: "Jak traktujecie nasze dane?", a: "Korzystamy tylko z danych potrzebnych w projekcie, przed startem uzgadniamy zasady przetwarzania danych i preferujemy rozwiązania, w których dane zostają na Twoich kontach." },
    ],
  },
  ua: {
    eyebrow: "Для малого бізнесу, що росте",
    title: "Зробіть свій бізнес розумнішим з AI.",
    subtitle: "Практичні рішення з AI та автоматизації для компаній, що ростуть. Без власної AI-команди та складної інфраструктури.",
    ctaPrimary: "Запросити AI-консультацію",
    ctaSecondary: "Наші послуги",
    industriesTitle: "Для бізнесу, як ваш",
    industriesSubtitle: "Ми фокусуємося на компаніях з 5–50 працівниками, де кілька зекономлених годин на тиждень мають реальне значення.",
    industries: [
      { title: "E-commerce", cases: ["Описи товарів і контент", "Асистент підтримки клієнтів", "Звіти про продажі та залишки"] },
      { title: "Професійні послуги", cases: ["Обробка документів", "Автоматизація пошти", "Оновлення CRM і фоллоу-апи"] },
      { title: "Логістика", cases: ["Вилучення даних з транспортних документів", "Звіти про статус відправлень", "Обробка замовлень і даних"] },
      { title: "Малі агенції", cases: ["Управління лідами", "Контент-процеси", "Звітність для клієнтів"] },
    ],
    outcomesTitle: "Результати, до яких ми прагнемо",
    outcomesSubtitle: "Кожен проєкт починається зі спільно погодженої вимірюваної мети — ми вимірюємо її до і після.",
    outcomes: ["Менше ручного введення даних", "Швидша обробка документів", "Швидші відповіді", "Менше рутинної адміністративної роботи", "Краща прозорість звітності"],
    outcomesNote: "Ми не обіцяємо наперед конкретний відсоток економії. Результати залежать від ваших процесів, а ми звітуємо лише про те, що реально виміряли.",
    formTitle: "Розкажіть про свій бізнес",
    formSubtitle: "Коротко опишіть свій виклик. Ми відповімо протягом двох робочих днів, щоб домовитися про безкоштовний дзвінок.",
    faqTitle: "Поширені запитання",
    faq: [
      { q: "Чи потрібні мені технічні знання?", a: "Ні. Ми пояснюємо варіанти простою мовою, виконуємо технічну роботу та навчаємо команду користуватися рішенням." },
      { q: "Чи можете ви працювати з нашим поточним ПЗ?", a: "Зазвичай так. Ми інтегруємося з поширеними інструментами: поштою, таблицями, CRM, e-commerce платформами та бухгалтерськими програмами. Можливість перевіряємо під час дзвінка." },
      { q: "Скільки коштує впровадження AI?", a: "Залежить від обсягу. Менші автоматизації зазвичай мають фіксовану ціну; чітку пропозицію ми надаємо після етапу discovery, до початку робіт." },
      { q: "Скільки триває впровадження?", a: "Більшість невеликих проєктів займає від одного до шести тижнів від погодження обсягу до запуску." },
      { q: "Чи підтримуєте ви нас після запуску?", a: "Так. Ми пропонуємо щомісячну підтримку: моніторинг, покращення та зміни в міру розвитку бізнесу." },
      { q: "Чи працюєте ви з іноземними клієнтами?", a: "Так. Ми працюємо з Польщі віддалено з клієнтами англійською, польською та українською." },
      { q: "Як ви поводитеся з нашими даними?", a: "Ми використовуємо лише дані, потрібні для проєкту, заздалегідь погоджуємо умови обробки даних і віддаємо перевагу рішенням, де дані залишаються у ваших акаунтах." },
    ],
  },
};

const INDUSTRY_ICONS = [ICON_PATHS.globe, ICON_PATHS.briefcase, ICON_PATHS.document, ICON_PATHS.users];

export default function ForBusinessesPage() {
  const [lang, setLang] = useLang();
  const t = content[lang];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={<p>{t.subtitle}</p>}>
          <Link href="#discovery" className={btnPrimary}>
            {t.ctaPrimary}
          </Link>
          <Link href="/services" className={btnGhostDark}>
            {t.ctaSecondary}
          </Link>
        </PageHero>

        {/* Industries */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.industriesTitle} subtitle={t.industriesSubtitle} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.industries.map((ind, i) => (
                <div key={ind.title} className={cardClass}>
                  <div className="w-11 h-11 rounded-xl bg-[#0F7A52]/10 flex items-center justify-center mb-5">
                    <Icon path={INDUSTRY_ICONS[i]} className="w-5 h-5 text-[#0F7A52]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B2818]">{ind.title}</h3>
                  <ul className="mt-3 space-y-2 text-[15px] text-[#3F3C3A]">
                    {ind.cases.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#16A97A] flex-shrink-0" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-24 md:py-32 bg-[#0B2818] text-white">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.outcomesTitle} subtitle={t.outcomesSubtitle} dark />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {t.outcomes.map((o) => (
                <li key={o} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex flex-col gap-3">
                  <Icon path={ICON_PATHS.trendingUp} className="w-5 h-5 text-[#3DDC97]" />
                  <span className="font-medium">{o}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-white/60 max-w-3xl">{t.outcomesNote}</p>
          </div>
        </section>

        <InquiryForm lang={lang} id="discovery" title={t.formTitle} subtitle={t.formSubtitle} {...businessInquiry(lang)} />

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
