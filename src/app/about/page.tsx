"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ICON_PATHS, Icon, IconCard, PageHero, SectionHeading, cardClass } from "@/components/ui";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

type Content = {
  eyebrow: string;
  title: string;
  intro: string;
  missionTitle: string;
  missionSubtitle: string;
  mission: { title: string; desc: string; href: string; cta: string }[];
  structureTitle: string;
  structureBody: string;
  structure: { name: string; role: string }[];
  founderTitle: string;
  founderName: string;
  founderRole: string;
  founderBody: string[];
  valuesTitle: string;
  values: { title: string; desc: string }[];
  impactTitle: string;
  impactSubtitle: string;
  impactMetrics: string[];
  impactPending: string;
  programmesTitle: string;
  programmesBody: string;
  programmes: string[];
  programmesCta: string;
};

const content: Record<Lang, Content> = {
  en: {
    eyebrow: "About Prosvasimi",
    title: "Making technology more accessible. Creating meaningful career opportunities.",
    intro: "Prosvasimi (Fundacja Prosvásimi) is a registered Polish foundation based in Warsaw. We combine practical AI services for businesses with accessible education and professional opportunities for people with disabilities, chronic illnesses and neurodivergent people.",
    missionTitle: "Our mission has three parts",
    missionSubtitle: "Each one supports the others: client work creates real experience, and education prepares people to deliver it.",
    mission: [
      { title: "Inclusive technology", desc: "Designing and implementing practical AI solutions through Inclusive AI Studio.", href: "/services", cta: "AI Services" },
      { title: "Accessible education", desc: "Developing digital, data and AI skills through Inclusive AI Academy.", href: "/academy", cta: "AI Academy" },
      { title: "Inclusive employment", desc: "Creating professional, paid opportunities on real technology projects.", href: "/careers", cta: "Careers" },
    ],
    structureTitle: "How Prosvasimi is organised",
    structureBody: "Prosvasimi is the foundation and the umbrella brand. Its programmes work under one mission.",
    structure: [
      { name: "Prosvasimi", role: "Foundation and mission: inclusive technology and employment" },
      { name: "Inclusive AI Studio", role: "AI implementation services for businesses" },
      { name: "Inclusive AI Academy", role: "Accessible AI, data and digital skills training" },
    ],
    founderTitle: "Founder",
    founderName: "Anna Tumanova",
    founderRole: "Founder, Prosvasimi",
    founderBody: [
      "Anna has a background in data science and AI, with hands-on experience implementing machine learning and AI solutions.",
      "She founded Prosvasimi to connect two things that rarely meet: practical AI work that businesses need, and accessible routes into technology careers for people who are too often excluded from them.",
    ],
    valuesTitle: "Our values",
    values: [
      { title: "Accessibility", desc: "We design for different needs from the start, not as an afterthought." },
      { title: "Professional excellence", desc: "Clients get work that meets professional standards — inclusion is never a discount." },
      { title: "Equal opportunities", desc: "We assess skills and potential, not diagnoses." },
      { title: "Practical impact", desc: "We measure what changes for businesses and for people." },
      { title: "Transparency", desc: "We say what is real today and what we are still building." },
      { title: "Continuous learning", desc: "Technology changes fast. So do we." },
    ],
    impactTitle: "Our impact",
    impactSubtitle: "These are the measures we'll report on as our programmes grow.",
    impactMetrics: ["People trained", "People employed", "Paid projects delivered", "Partner organisations", "Training hours", "Accessible learning programmes"],
    impactPending: "Reporting starts with the first pilot",
    programmesTitle: "Existing foundation programmes",
    programmesBody: "Prosvasimi continues to offer free career support funded by grants (including PFRON and EU funds) and donations — not billed to the people we help.",
    programmes: ["Career coaching and workshops", "AI-powered CV analyser", "Support for people with disabilities, chronic illnesses, neurodivergent people and veterans"],
    programmesCta: "Ask about free support",
  },
  pl: {
    eyebrow: "O Prosvasimi",
    title: "Technologia bardziej dostępna. Kariery, które mają znaczenie.",
    intro: "Prosvasimi (Fundacja Prosvásimi) to zarejestrowana polska fundacja z siedzibą w Warszawie. Łączymy praktyczne usługi AI dla firm z dostępną edukacją i możliwościami zawodowymi dla osób z niepełnosprawnościami, chorobami przewlekłymi i osób neuroróżnorodnych.",
    missionTitle: "Nasza misja ma trzy części",
    missionSubtitle: "Każda wspiera pozostałe: praca dla klientów daje realne doświadczenie, a edukacja przygotowuje do jej wykonywania.",
    mission: [
      { title: "Inkluzywna technologia", desc: "Projektowanie i wdrażanie praktycznych rozwiązań AI w ramach Inclusive AI Studio.", href: "/services", cta: "Usługi AI" },
      { title: "Dostępna edukacja", desc: "Rozwijanie umiejętności cyfrowych, analitycznych i AI w Inclusive AI Academy.", href: "/academy", cta: "Akademia AI" },
      { title: "Inkluzywne zatrudnienie", desc: "Tworzenie profesjonalnych, płatnych możliwości przy realnych projektach technologicznych.", href: "/careers", cta: "Kariera" },
    ],
    structureTitle: "Jak zorganizowane jest Prosvasimi",
    structureBody: "Prosvasimi to fundacja i marka nadrzędna. Jej programy realizują jedną misję.",
    structure: [
      { name: "Prosvasimi", role: "Fundacja i misja: inkluzywna technologia i zatrudnienie" },
      { name: "Inclusive AI Studio", role: "Usługi wdrożeń AI dla firm" },
      { name: "Inclusive AI Academy", role: "Dostępne szkolenia z AI, danych i umiejętności cyfrowych" },
    ],
    founderTitle: "Założycielka",
    founderName: "Anna Tumanova",
    founderRole: "Założycielka Prosvasimi",
    founderBody: [
      "Anna ma doświadczenie w data science i AI, w tym praktyczne doświadczenie we wdrażaniu rozwiązań uczenia maszynowego i AI.",
      "Założyła Prosvasimi, aby połączyć dwie rzeczy, które rzadko się spotykają: praktyczną pracę z AI, której potrzebują firmy, oraz dostępne ścieżki do kariery w technologii dla osób zbyt często z niej wykluczanych.",
    ],
    valuesTitle: "Nasze wartości",
    values: [
      { title: "Dostępność", desc: "Projektujemy dla różnych potrzeb od początku, a nie na końcu." },
      { title: "Profesjonalizm", desc: "Klienci otrzymują pracę na profesjonalnym poziomie — inkluzywność nigdy nie jest rabatem." },
      { title: "Równe szanse", desc: "Oceniamy umiejętności i potencjał, nie diagnozy." },
      { title: "Praktyczny wpływ", desc: "Mierzymy, co realnie zmienia się dla firm i ludzi." },
      { title: "Przejrzystość", desc: "Mówimy, co jest realne dziś, a co dopiero budujemy." },
      { title: "Ciągła nauka", desc: "Technologia zmienia się szybko. My też." },
    ],
    impactTitle: "Nasz wpływ",
    impactSubtitle: "Te wskaźniki będziemy raportować w miarę rozwoju programów.",
    impactMetrics: ["Przeszkolone osoby", "Zatrudnione osoby", "Zrealizowane płatne projekty", "Organizacje partnerskie", "Godziny szkoleń", "Dostępne programy edukacyjne"],
    impactPending: "Raportowanie od pierwszego pilotażu",
    programmesTitle: "Dotychczasowe programy fundacji",
    programmesBody: "Prosvasimi nadal oferuje bezpłatne wsparcie kariery finansowane z grantów (w tym PFRON i funduszy UE) oraz darowizn — nigdy nie opłacane przez osoby, którym pomagamy.",
    programmes: ["Coaching kariery i warsztaty", "Analizator CV oparty na AI", "Wsparcie dla osób z niepełnosprawnościami, chorobami przewlekłymi, neuroróżnorodnych i weteranów"],
    programmesCta: "Zapytaj o bezpłatne wsparcie",
  },
  ua: {
    eyebrow: "Про Prosvasimi",
    title: "Робимо технології доступнішими. Створюємо змістовні кар'єрні можливості.",
    intro: "Prosvasimi (Fundacja Prosvásimi) — зареєстрований польський фонд з осідком у Варшаві. Ми поєднуємо практичні AI-послуги для бізнесу з доступною освітою та професійними можливостями для людей з інвалідністю, хронічними захворюваннями та нейровідмінних людей.",
    missionTitle: "Наша місія складається з трьох частин",
    missionSubtitle: "Кожна підтримує інші: клієнтська робота дає реальний досвід, а освіта готує людей її виконувати.",
    mission: [
      { title: "Інклюзивні технології", desc: "Розробка та впровадження практичних AI-рішень в Inclusive AI Studio.", href: "/services", cta: "AI-послуги" },
      { title: "Доступна освіта", desc: "Розвиток цифрових, аналітичних та AI-навичок в Inclusive AI Academy.", href: "/academy", cta: "AI Академія" },
      { title: "Інклюзивне працевлаштування", desc: "Створення професійних оплачуваних можливостей на реальних технологічних проєктах.", href: "/careers", cta: "Кар'єра" },
    ],
    structureTitle: "Як влаштований Prosvasimi",
    structureBody: "Prosvasimi — це фонд і головний бренд. Його програми працюють заради однієї місії.",
    structure: [
      { name: "Prosvasimi", role: "Фонд і місія: інклюзивні технології та працевлаштування" },
      { name: "Inclusive AI Studio", role: "Послуги з впровадження AI для бізнесу" },
      { name: "Inclusive AI Academy", role: "Доступне навчання AI, даним і цифровим навичкам" },
    ],
    founderTitle: "Засновниця",
    founderName: "Anna Tumanova",
    founderRole: "Засновниця Prosvasimi",
    founderBody: [
      "Анна має досвід у data science та AI, зокрема практичний досвід впровадження рішень машинного навчання та AI.",
      "Вона заснувала Prosvasimi, щоб поєднати дві речі, які рідко зустрічаються: практичну AI-роботу, потрібну бізнесу, і доступні шляхи до кар'єри в технологіях для людей, яких надто часто з неї виключають.",
    ],
    valuesTitle: "Наші цінності",
    values: [
      { title: "Доступність", desc: "Ми проєктуємо для різних потреб з самого початку, а не наостанок." },
      { title: "Професіоналізм", desc: "Клієнти отримують роботу професійного рівня — інклюзивність ніколи не є знижкою." },
      { title: "Рівні можливості", desc: "Ми оцінюємо навички та потенціал, а не діагнози." },
      { title: "Практичний вплив", desc: "Ми вимірюємо, що реально змінюється для бізнесу і людей." },
      { title: "Прозорість", desc: "Ми чесно кажемо, що є сьогодні, а що ми ще будуємо." },
      { title: "Постійне навчання", desc: "Технології швидко змінюються. Ми теж." },
    ],
    impactTitle: "Наш вплив",
    impactSubtitle: "Ці показники ми звітуватимемо в міру розвитку програм.",
    impactMetrics: ["Навчені люди", "Працевлаштовані люди", "Виконані оплачувані проєкти", "Організації-партнери", "Години навчання", "Доступні навчальні програми"],
    impactPending: "Звітність — з першого пілоту",
    programmesTitle: "Чинні програми фонду",
    programmesBody: "Prosvasimi і далі надає безкоштовну кар'єрну підтримку, фінансовану грантами (зокрема PFRON і фондами ЄС) та пожертвами, — а не коштом людей, яким ми допомагаємо.",
    programmes: ["Кар'єрний коучинг і воркшопи", "Аналізатор резюме на основі AI", "Підтримка людей з інвалідністю, хронічними захворюваннями, нейровідмінних людей і ветеранів"],
    programmesCta: "Запитати про безкоштовну підтримку",
  },
};

const MISSION_ICONS = [ICON_PATHS.cog, ICON_PATHS.academic, ICON_PATHS.briefcase];

export default function AboutPage() {
  const [lang, setLang] = useLang();
  const t = content[lang];

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={<p>{t.intro}</p>} />

        {/* Mission */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.missionTitle} subtitle={t.missionSubtitle} />
            <div className="grid md:grid-cols-3 gap-6">
              {t.mission.map((m, i) => (
                <IconCard key={m.href} icon={MISSION_ICONS[i]} title={m.title} desc={m.desc} href={m.href} cta={m.cta} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand structure */}
        <section className="py-24 md:py-32 bg-[#FAFAF9]">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading title={t.structureTitle} subtitle={t.structureBody} center />
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-md rounded-2xl bg-[#0B2818] text-white p-6 text-center">
                <div className="text-lg font-semibold">{t.structure[0].name}</div>
                <div className="mt-1 text-sm text-white/70">{t.structure[0].role}</div>
              </div>
              <div className="w-px h-8 bg-[#0F7A52]/40" aria-hidden="true" />
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {t.structure.slice(1).map((s) => (
                  <div key={s.name} className={`${cardClass} text-center`}>
                    <div className="text-lg font-semibold text-[#0B2818]">{s.name}</div>
                    <div className="mt-1 text-sm text-[#3F3C3A]">{s.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0F7A52]">{t.founderTitle}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-24 h-24 rounded-2xl bg-[#0F7A52]/10 text-[#0F7A52] text-3xl font-semibold flex items-center justify-center flex-shrink-0" aria-hidden="true">
                AT
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B2818]">{t.founderName}</h2>
                <p className="mt-1 text-[#5B5754]">{t.founderRole}</p>
                {t.founderBody.map((p) => (
                  <p key={p} className="mt-4 text-lg text-[#3F3C3A] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 md:py-32 bg-[#FAFAF9]">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.valuesTitle} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.values.map((v) => (
                <div key={v.title} className={cardClass}>
                  <h3 className="text-lg font-semibold text-[#0B2818]">{v.title}</h3>
                  <p className="mt-2 text-[15px] text-[#3F3C3A] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact — metrics framework only; no numbers until they are verified */}
        <section className="py-24 md:py-32 bg-[#0B2818] text-white">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title={t.impactTitle} subtitle={t.impactSubtitle} dark />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.impactMetrics.map((m) => (
                <li key={m} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-2xl font-semibold text-white/40" aria-hidden="true">—</div>
                  <div className="mt-1 font-medium">{m}</div>
                  <div className="mt-1 text-sm text-white/55">{t.impactPending}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Existing foundation programmes */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className={`${cardClass} md:!p-12 flex flex-col md:flex-row gap-8`}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0F7A52] text-white flex-shrink-0">
                <Icon path={ICON_PATHS.heart} className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B2818]">{t.programmesTitle}</h2>
                <p className="mt-4 text-[#3F3C3A] leading-relaxed max-w-3xl">{t.programmesBody}</p>
                <ul className="mt-6 grid sm:grid-cols-3 gap-4">
                  {t.programmes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#0B2818]">
                      <Icon path={ICON_PATHS.checkCircle} className="w-5 h-5 text-[#0F7A52] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-[#0F7A52] text-[#0F7A52] font-semibold hover:bg-[#0F7A52] hover:text-white transition-colors"
                >
                  {t.programmesCta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
