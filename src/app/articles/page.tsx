"use client";

import React, { useState } from "react";
import Link from "next/link";

type Lang = "en" | "pl" | "uk";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    brandTagline: "Accessible jobs without barriers",
    navHome: "Home",
    navArticles: "Articles",
    pageTitle: "Articles & Research",
    pageSubtitle: "Data-driven insights on disability employment in Ukraine and Poland",
    comparisonTitle: "Quick Comparison Table",
    featureCol: "Feature",
    ukraineCol: "Ukraine (2026)",
    polandCol: "Poland (2026)",
    quotaRow: "Quota",
    penaltyRow: "Penalty/Levy",
    employmentRow: "Employment Rate",
    incentiveRow: "Main Incentive",
    quotaUkraine: "4% (Firms 25+)",
    quotaPoland: "6% (Firms 25+)",
    penaltyUkraine: "40% of avg. salary (Quarterly)",
    penaltyPoland: "40.65% of avg. salary (Monthly)",
    employmentUkraine: "~17%",
    employmentPoland: "~31%",
    incentiveUkraine: "One-time adaptation grant",
    incentivePoland: "Monthly wage subsidy",
    footerNote: "Building an accessible job platform.",
  },
  pl: {
    brandTagline: "Dostępna praca bez barier",
    navHome: "Strona główna",
    navArticles: "Artykuły",
    pageTitle: "Artykuły i badania",
    pageSubtitle: "Analiza zatrudnienia osób z niepełnosprawnościami w Ukrainie i Polsce",
    comparisonTitle: "Tabela porównawcza",
    featureCol: "Cecha",
    ukraineCol: "Ukraina (2026)",
    polandCol: "Polska (2026)",
    quotaRow: "Kwota",
    penaltyRow: "Kara/Składka",
    employmentRow: "Wskaźnik zatrudnienia",
    incentiveRow: "Główna zachęta",
    quotaUkraine: "4% (Firmy 25+)",
    quotaPoland: "6% (Firmy 25+)",
    penaltyUkraine: "40% śr. wynagrodzenia (kwartalnie)",
    penaltyPoland: "40,65% śr. wynagrodzenia (miesięcznie)",
    employmentUkraine: "~17%",
    employmentPoland: "~31%",
    incentiveUkraine: "Jednorazowa dotacja na adaptację",
    incentivePoland: "Miesięczne dofinansowanie wynagrodzeń",
    footerNote: "Budujemy dostępną platformę pracy.",
  },
  uk: {
    brandTagline: "Доступна робота без бар'єрів",
    navHome: "Головна",
    navArticles: "Статті",
    pageTitle: "Статті та дослідження",
    pageSubtitle: "Аналіз працевлаштування людей з інвалідністю в Україні та Польщі",
    comparisonTitle: "Підсумкова таблиця",
    featureCol: "Характеристика",
    ukraineCol: "Україна (2026)",
    polandCol: "Польща (2026)",
    quotaRow: "Квота",
    penaltyRow: "Штраф/Внесок",
    employmentRow: "Рівень зайнятості",
    incentiveRow: "Основний стимул",
    quotaUkraine: "4% (Фірми 25+)",
    quotaPoland: "6% (Фірми 25+)",
    penaltyUkraine: "40% сер. зарплати (щоквартально)",
    penaltyPoland: "40,65% сер. зарплати (щомісяця)",
    employmentUkraine: "~17%",
    employmentPoland: "~31%",
    incentiveUkraine: "Одноразова адаптаційна субсидія",
    incentivePoland: "Щомісячна субсидія на зарплату",
    footerNote: "Будуємо доступну платформу для працевлаштування.",
  },
};

function ArticleCard({
  title,
  content,
  lang,
}: {
  title: string;
  content: React.ReactNode;
  lang: string;
}) {
  return (
    <article className="rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
        {content}
      </div>
    </article>
  );
}

export default function ArticlesPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  const articleEN = (
    <>
      <h3 className="text-xl font-semibold mt-0 mb-4">The Inclusivity Revolution: A 2026 Comparison of Ukraine and Poland</h3>
      <p className="mb-4">
        As of 2026, both Ukraine and Poland have intensified their efforts to integrate persons with disabilities into the labor market, driven by demographic shifts and economic necessity. However, their strategies differ significantly: Ukraine is currently undergoing a radical legislative overhaul, while Poland relies on its mature, subsidy-heavy <strong>PFRON</strong> system.
      </p>

      <h4 className="text-lg font-semibold mt-6 mb-3">Ukraine: The 2026 Shift from Fines to Contributions</h4>
      <p className="mb-4">
        On January 1, 2026, the Law of Ukraine No. 4219-IX came into full effect, fundamentally changing how businesses interact with the disability quota.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>The New Quota Rules:</strong> Companies with <strong>8–25 employees</strong> must hire at least one person with a disability. For those with <strong>25+ employees</strong>, the quota remains at <strong>4%</strong>.</li>
        <li><strong>The "Multiplier" Rule:</strong> To encourage the hiring of those with higher support needs, an employer can count one person as <strong>two</strong> toward the quota if they have a Group I disability or a Group II disability with visual or mental impairments.</li>
        <li><strong>Financial Penalties:</strong> Fines have been replaced by a "Targeted Contribution." If a company fails to meet the quota, it must pay <strong>40% of the average monthly salary</strong> for each unfilled position, calculated quarterly. During Martial Law, this is reduced to 50% of the calculated amount.</li>
        <li><strong>Statistics:</strong> The number of persons with disabilities in Ukraine has risen to approximately <strong>3.4 million</strong> in 2026. Despite this, only about <strong>16-17%</strong> are officially employed, prompting the government to offer adaptation grants of up to <strong>129,705 UAH</strong> for workplace modifications.</li>
      </ul>

      <h4 className="text-lg font-semibold mt-6 mb-3">Poland: The Stability of the PFRON System</h4>
      <p className="mb-4">
        Poland's system is centered on the State Fund for Rehabilitation (PFRON), which in 2026 remains one of the most robust in Europe.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>The 6% Standard:</strong> Polish law requires companies with at least 25 full-time employees to ensure <strong>6%</strong> of their workforce consists of people with disabilities.</li>
        <li><strong>Direct Wage Subsidies:</strong> Poland focuses on long-term salary support rather than just initial adaptation. Monthly subsidies for 2026 have increased to:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Significant Disability:</strong> ~2,760 PLN/month</li>
            <li><strong>Moderate Disability:</strong> ~1,550 PLN/month</li>
            <li><strong>Light Disability:</strong> ~575 PLN/month</li>
          </ul>
        </li>
        <li><strong>Employment Rates:</strong> Poland maintains a higher employment rate for this demographic, currently at <strong>30-32%</strong>, supported by a network of Job Coaches and professional activity centers (ZAZ) which received over <strong>2.3 billion PLN</strong> in funding for 2026.</li>
      </ul>
    </>
  );

  const articleUK = (
    <>
      <h3 className="text-xl font-semibold mt-0 mb-4">Реформа 2026: Нові правила працевлаштування людей з інвалідністю в Україні та Польщі</h3>
      <p className="mb-4">
        2026 рік став поворотним для інклюзивного ринку праці України. З 1 січня набули чинності кардинальні зміни до законодавства, що наближають українські стандарти до європейських, зокрема польських.
      </p>

      <h4 className="text-lg font-semibold mt-6 mb-3">Україна: Нова філософія квот</h4>
      <p className="mb-4">
        З 2026 року Україна відмовилася від старої системи адміністративних штрафів, замінивши їх на <strong>цільовий внесок</strong>.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Квоти та розрахунок:</strong> Для бізнесу з штатом від 8 до 25 осіб — 1 робоче місце; понад 25 осіб — <strong>4%</strong>. Важливим нововведенням є те, що працівник з I групою інвалідності тепер зараховується як <strong>дві особи</strong> при розрахунку квоти.</li>
        <li><strong>Фінансова відповідальність:</strong> Якщо компанія не виконує норматив, вона самостійно розраховує та сплачує внесок у розмірі <strong>40% від середньої зарплати</strong> за кожне вакантне місце щоквартально.</li>
        <li><strong>Державна підтримка:</strong> Для стимулювання найму уряд пропонує компенсації за облаштування робочих місць: до <strong>129 705 грн</strong> (I група) та <strong>86 470 грн</strong> (II група).</li>
      </ul>

      <h4 className="text-lg font-semibold mt-6 mb-3">Польща: Досвід фонду PFRON</h4>
      <p className="mb-4">
        Польська система залишається еталоном стабільності. У 2026 році фінансування програм через фонд PFRON сягнуло рекордних значень.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Порівняння:</strong> У Польщі квота вища — <strong>6%</strong>. Рівень зайнятості людей з інвалідністю становить близько <strong>31%</strong>, що значно перевищує українські <strong>16-17%</strong>.</li>
        <li><strong>Субсидії на зарплату:</strong> Основна відмінність Польщі — це щомісячне дофінансування зарплат. За працівника зі значним ступенем інвалідності роботодавець отримує близько <strong>2 760 злотих</strong> щомісяця.</li>
      </ul>
    </>
  );

  const articlePL = (
    <>
      <h3 className="text-xl font-semibold mt-0 mb-4">Inkluzywny rynek pracy 2026: Polska i Ukraina – analiza porównawcza</h3>
      <p className="mb-4">
        W 2026 roku Polska i Ukraina wdrażają kluczowe zmiany w przepisach dotyczących zatrudniania osób z niepełnosprawnościami. Podczas gdy Polska stawia na waloryzację istniejących dopłat, Ukraina od 1 stycznia 2026 r. wprowadziła zupełnie nowy system składek celowych.
      </p>

      <h4 className="text-lg font-semibold mt-6 mb-3">Polska: Rekordowe wsparcie z PFRON</h4>
      <p className="mb-4">
        Polska w 2026 roku przeznaczyła ponad <strong>2,35 mld PLN</strong> na redystrybucję środków wspierających zatrudnienie osób z niepełnosprawnościami.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Kwoty dofinansowań:</strong> Od 2026 r. wzrosły kwoty miesięcznego dofinansowania wynagrodzeń. Pracodawca może otrzymać do <strong>2 760 PLN</strong> za pracownika ze stopniem znacznym.</li>
        <li><strong>Wskaźnik 6%:</strong> Firmy zatrudniające co najmniej 25 pracowników muszą osiągnąć 6-procentowy wskaźnik zatrudnienia osób niepełnosprawnych. Brak realizacji tego celu skutkuje obowiązkową miesięczną wpłatą na PFRON w wysokości ok. <strong>40,65% przeciętnego wynagrodzenia</strong> za każdą brakującą osobę.</li>
      </ul>

      <h4 className="text-lg font-semibold mt-6 mb-3">Ukraina: Wielka reforma 2026</h4>
      <p className="mb-4">
        Ukraiński system przeszedł transformację, wzorując się na modelach zachodnich.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Składka zamiast kary:</strong> Od 1 stycznia 2026 r. pracodawcy na Ukrainie nie płacą już „kar", lecz „składkę celową". Kwota ta wynosi <strong>40% średniego miesięcznego wynagrodzenia</strong> za każdy nieobsadzony etat w ramach kwoty (4% dla dużych firm).</li>
        <li><strong>Zasada 1=2:</strong> Nowością jest możliwość liczenia osoby z I grupą niepełnosprawności jako <strong>dwóch pracowników</strong> w statystykach kwotowych, co ma zachęcić do zatrudniania osób z największymi barierami.</li>
        <li><strong>Adaptacja stanowiska:</strong> Ukraina oferuje wysokie jednorazowe dotacje na adaptację biur – do <strong>129 705 UAH</strong> (ok. 13 000 PLN).</li>
      </ul>
    </>
  );

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Prosvasimi home">
            <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">P</div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-lg">Prosvasimi</div>
              <div className="text-xs text-slate-500">{t.brandTagline}</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/" className="hover:text-slate-700">{t.navHome}</Link>
            <Link href="/articles" className="text-slate-900 font-medium">{t.navArticles}</Link>
          </nav>
          <div className="hidden sm:flex items-center gap-1 text-sm text-slate-600" role="group" aria-label="Language switch">
            <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 ${lang === "en" ? "text-slate-900 font-medium" : "hover:text-slate-900"}`}>
              EN
            </button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setLang("pl")} aria-pressed={lang === "pl"} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 ${lang === "pl" ? "text-slate-900 font-medium" : "hover:text-slate-900"}`}>
              PL
            </button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setLang("uk")} aria-pressed={lang === "uk"} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 ${lang === "uk" ? "text-slate-900 font-medium" : "hover:text-slate-900"}`}>
              UK
            </button>
          </div>
        </div>
      </header>

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t.pageTitle}</h1>
            <p className="mt-4 text-lg text-slate-600">{t.pageSubtitle}</p>
          </div>

          <div className="space-y-8">
            <ArticleCard
              title={lang === "en" ? "The Inclusivity Revolution" : lang === "uk" ? "Реформа 2026" : "Inkluzywny rynek pracy 2026"}
              content={lang === "en" ? articleEN : lang === "uk" ? articleUK : articlePL}
              lang={lang}
            />

            {/* Comparison Table */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.comparisonTitle}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold">{t.featureCol}</th>
                      <th className="text-left py-3 px-4 font-semibold">{t.ukraineCol}</th>
                      <th className="text-left py-3 px-4 font-semibold">{t.polandCol}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-4 font-medium">{t.quotaRow}</td>
                      <td className="py-3 px-4">{t.quotaUkraine}</td>
                      <td className="py-3 px-4">{t.quotaPoland}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">{t.penaltyRow}</td>
                      <td className="py-3 px-4">{t.penaltyUkraine}</td>
                      <td className="py-3 px-4">{t.penaltyPoland}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">{t.employmentRow}</td>
                      <td className="py-3 px-4">{t.employmentUkraine}</td>
                      <td className="py-3 px-4">{t.employmentPoland}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">{t.incentiveRow}</td>
                      <td className="py-3 px-4">{t.incentiveUkraine}</td>
                      <td className="py-3 px-4">{t.incentivePoland}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-10 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-slate-600">
          <p>Prosvasimi · {t.footerNote} {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
