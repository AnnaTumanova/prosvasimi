"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

type Lang = "en" | "pl" | "ua";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    brandTagline: "Accessible jobs without barriers",
    navHome: "Home",
    navArticles: "Articles",
    navJobs: "Jobs",
    backToArticles: "Back to Articles",
    footerNote: "Building an accessible job platform.",
  },
  pl: {
    brandTagline: "Dostępna praca bez barier",
    navHome: "Strona główna",
    navArticles: "Artykuły",
    navJobs: "Oferty pracy",
    backToArticles: "Powrót do artykułów",
    footerNote: "Budujemy dostępną platformę pracy.",
  },
  ua: {
    brandTagline: "Доступна робота без бар'єрів",
    navHome: "Головна",
    navArticles: "Статті",
    navJobs: "Вакансії",
    backToArticles: "Назад до статей",
    footerNote: "Будуємо доступну платформу для працевлаштування.",
  },
};

// Hardcoded articles data (for existing articles)
const hardcodedArticles: Record<string, { titleEn: string; titleUa: string; titlePl: string; contentEn: React.ReactNode; contentUa: React.ReactNode; contentPl: React.ReactNode }> = {
  "inclusivity-revolution": {
    titleEn: "The Inclusivity Revolution: A 2026 Comparison of Ukraine and Poland",
    titleUa: "Реформа 2026: Нові правила працевлаштування людей з інвалідністю в Україні та Польщі",
    titlePl: "Inkluzywny rynek pracy 2026: Polska i Ukraina – analiza porównawcza",
    contentEn: (
      <>
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
    ),
    contentUa: (
      <>
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
    ),
    contentPl: (
      <>
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
    ),
  },
  "finding-jobs": {
    titleEn: "How Do People with Disabilities Usually Find Jobs?",
    titleUa: "Як люди з інвалідністю зазвичай знаходять роботу?",
    titlePl: "Jak osoby z niepełnosprawnościami zazwyczaj znajdują pracę?",
    contentEn: (
      <>
        <p className="mb-4">
          Finding a job is rarely simple. For people with disabilities, it often involves additional barriers, extra decisions, and more uncertainty — even when skills and experience are strong.
        </p>
        <p className="mb-4">Understanding how people typically search for work helps us design better, more accessible systems.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">1. Through Personal Networks</h4>
        <p className="mb-2">Many people find jobs through:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>friends and family</li>
          <li>former colleagues</li>
          <li>online communities</li>
          <li>disability-focused organizations</li>
        </ul>
        <p className="mb-4"><strong>Why does this work?</strong> Because trust reduces bias. When someone recommends a candidate, employers focus more on skills and less on assumptions.</p>
        <p className="mb-4 text-slate-500 italic">The challenge: not everyone has access to strong professional networks.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">2. Through NGOs and Disability Employment Programs</h4>
        <p className="mb-2">Many candidates work with:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>foundations</li>
          <li>career counselors</li>
          <li>job coaches</li>
          <li>supported employment programs</li>
        </ul>
        <p className="mb-4">These organizations often help with CV preparation, interview practice, and direct connections to inclusive employers.</p>
        <p className="mb-4 text-slate-500 italic">The challenge: limited capacity and limited number of partner companies.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">3. Through Public Employment Services</h4>
        <p className="mb-2">Public institutions may offer:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>job databases</li>
          <li>subsidized employment schemes</li>
          <li>internships</li>
          <li>vocational training</li>
        </ul>
        <p className="mb-4">However, support is often standardized and not always adapted to individual accessibility needs.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">4. Through Online Job Platforms</h4>
        <p className="mb-2">Many candidates apply via:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>job portals</li>
          <li>LinkedIn</li>
          <li>company websites</li>
          <li>remote work platforms</li>
        </ul>
        <p className="mb-4">Remote roles are especially important for many people with mobility, health, or energy limitations.</p>
        <p className="mb-4 text-slate-500 italic">The challenge: recruitment processes are often not accessible (non-accessible forms, required in-person steps, unclear accommodation policies).</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">5. Through Training and Reskilling Programs</h4>
        <p className="mb-2">Some people enter the labor market through:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>vocational rehabilitation</li>
          <li>IT or digital reskilling programs</li>
          <li>internships</li>
        </ul>
        <p className="mb-4">These pathways can build confidence and skills. But training does not always guarantee employment if employers are not actively involved.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">6. Through Self-Employment</h4>
        <p className="mb-2">When traditional employment feels inaccessible, many choose:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>freelancing</li>
          <li>microbusinesses</li>
          <li>online services</li>
        </ul>
        <p className="mb-4">This offers flexibility — but often comes with unstable income and lack of social protection.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">The Hidden Question: "Should I Disclose?"</h4>
        <p className="mb-2">Many people with disabilities face an additional internal dilemma:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Should I disclose my disability?</li>
          <li>Will I be judged?</li>
          <li>Will accommodations be provided?</li>
          <li>Will I lose benefits if I start working?</li>
        </ul>
        <p className="mb-4">This emotional and practical uncertainty makes the job search more complex than it appears.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">What Makes the Difference?</h4>
        <p className="mb-2">Employment becomes easier when:</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li>Skills are clearly identified</li>
          <li>Workplace needs are openly discussed</li>
          <li>Employers are genuinely prepared</li>
        </ol>
        <p className="mb-4"><strong>Inclusive hiring is not charity. It is structured, skills-based recruitment with practical accessibility.</strong></p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Why Prosvasimi Exists</h4>
        <p className="mb-4">Prosvasimi connects qualified candidates with employers who are ready for real accessibility.</p>
        <p className="font-medium">We believe employment should be based on competence — not barriers.</p>
      </>
    ),
    contentUa: (
      <>
        <p className="mb-4">
          Пошук роботи рідко буває простим. Для людей з інвалідністю цей процес часто пов'язаний з додатковими бар'єрами та невизначеністю — навіть за наявності необхідних навичок.
        </p>
        <p className="mb-4">Розуміння цих шляхів допомагає створювати більш доступний ринок праці.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">1. Через особисті контакти</h4>
        <p className="mb-2">Багато людей знаходять роботу через:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>друзів і родину</li>
          <li>колишніх колег</li>
          <li>онлайн-спільноти</li>
          <li>організації підтримки</li>
        </ul>
        <p className="mb-4"><strong>Чому це працює?</strong> Довіра зменшує упередження та зміщує фокус на компетенції.</p>
        <p className="mb-4 text-slate-500 italic">Проблема: не всі мають широку професійну мережу.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">2. Через громадські організації та програми підтримки</h4>
        <p className="mb-2">Допомога включає:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>кар'єрні консультації</li>
          <li>job-коучинг</li>
          <li>програми підтриманого працевлаштування</li>
        </ul>
        <p className="mb-4">Такі програми допомагають із підготовкою резюме та встановленням контактів з інклюзивними роботодавцями.</p>
        <p className="mb-4 text-slate-500 italic">Обмеження: ресурси часто обмежені.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">3. Через державні служби зайнятості</h4>
        <p className="mb-2">Служби пропонують:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>бази вакансій</li>
          <li>стажування</li>
          <li>навчання</li>
          <li>фінансові стимули для роботодавців</li>
        </ul>
        <p className="mb-4">Проте підтримка не завжди враховує індивідуальні потреби доступності.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">4. Через онлайн-платформи</h4>
        <p className="mb-2">Кандидати подають заявки через:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>сайти вакансій</li>
          <li>LinkedIn</li>
          <li>кар'єрні сторінки компаній</li>
          <li>платформи дистанційної роботи</li>
        </ul>
        <p className="mb-4">Дистанційна робота особливо важлива для багатьох людей.</p>
        <p className="mb-4 text-slate-500 italic">Проблема: процеси рекрутингу часто недоступні.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">5. Через навчання та перекваліфікацію</h4>
        <p className="mb-2">Деякі входять на ринок через:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>професійну реабілітацію</li>
          <li>ІТ-курси</li>
          <li>стажування</li>
        </ul>
        <p className="mb-4">Це підвищує впевненість і навички, але не завжди гарантує роботу.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">6. Самозайнятість</h4>
        <p className="mb-2">Деякі обирають:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>фриланс</li>
          <li>малий бізнес</li>
          <li>онлайн-послуги</li>
        </ul>
        <p className="mb-4">Це дає гнучкість, але доходи можуть бути нестабільними.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Приховане питання: чи розкривати інформацію?</h4>
        <p className="mb-2">Багато людей запитують себе:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Чи повідомляти про інвалідність?</li>
          <li>Чи буде дискримінація?</li>
          <li>Чи забезпечать адаптацію?</li>
          <li>Чи не втрачу я соціальні виплати?</li>
        </ul>
        <p className="mb-4">Це додає психологічного навантаження до пошуку роботи.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Що реально допомагає?</h4>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li>Чітке визначення навичок</li>
          <li>Відкритий діалог про потреби</li>
          <li>Підготовленість роботодавця</li>
        </ol>
        <p className="mb-4"><strong>Інклюзивне працевлаштування — це професійний підхід, а не благодійність.</strong></p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Навіщо існує Prosvasimi?</h4>
        <p className="mb-4">Prosvasimi з'єднує кваліфікованих кандидатів із роботодавцями, готовими до реальної доступності.</p>
        <p className="font-medium">Бо робота має залежати від компетенцій — а не від бар'єрів.</p>
      </>
    ),
    contentPl: (
      <>
        <p className="mb-4">
          Znalezienie pracy rzadko bywa proste. Dla osób z niepełnosprawnościami proces ten często wiąże się z dodatkowymi barierami, decyzjami i niepewnością — nawet jeśli posiadają odpowiednie kwalifikacje.
        </p>
        <p className="mb-4">Zrozumienie tych ścieżek pozwala budować bardziej dostępny rynek pracy.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">1. Przez sieci kontaktów</h4>
        <p className="mb-2">Wiele osób znajduje pracę dzięki:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>rodzinie i znajomym</li>
          <li>byłym współpracownikom</li>
          <li>społecznościom online</li>
          <li>organizacjom wspierającym osoby z niepełnosprawnościami</li>
        </ul>
        <p className="mb-4"><strong>Dlaczego to działa?</strong> Zaufanie zmniejsza uprzedzenia. Rekomendacja pomaga skupić się na kompetencjach.</p>
        <p className="mb-4 text-slate-500 italic">Problem: nie każdy ma rozbudowaną sieć kontaktów zawodowych.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">2. Przez fundacje i programy wspierające zatrudnienie</h4>
        <p className="mb-2">Osoby korzystają z:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>doradztwa zawodowego</li>
          <li>coachingu pracy</li>
          <li>programów zatrudnienia wspieranego</li>
        </ul>
        <p className="mb-4">Takie organizacje pomagają przygotować CV, ćwiczyć rozmowy kwalifikacyjne i łączą kandydatów z inkluzywnymi pracodawcami.</p>
        <p className="mb-4 text-slate-500 italic">Ograniczenie: liczba miejsc i partnerów jest często niewystarczająca.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">3. Przez publiczne służby zatrudnienia</h4>
        <p className="mb-2">Urzędy pracy oferują:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>bazy ofert</li>
          <li>staże</li>
          <li>szkolenia</li>
          <li>dofinansowania dla pracodawców</li>
        </ul>
        <p className="mb-4">Jednak wsparcie bywa ogólne i nie zawsze dostosowane do indywidualnych potrzeb.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">4. Przez platformy internetowe</h4>
        <p className="mb-2">Kandydaci aplikują przez:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>portale pracy</li>
          <li>LinkedIn</li>
          <li>strony firmowe</li>
          <li>platformy pracy zdalnej</li>
        </ul>
        <p className="mb-4">Praca zdalna ma szczególne znaczenie dla wielu osób.</p>
        <p className="mb-4 text-slate-500 italic">Problem: procesy rekrutacyjne bywają niedostępne (formularze niedostosowane, brak informacji o dostosowaniach).</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">5. Przez szkolenia i przekwalifikowanie</h4>
        <p className="mb-2">Część osób wchodzi na rynek pracy przez:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>rehabilitację zawodową</li>
          <li>kursy IT</li>
          <li>programy stażowe</li>
        </ul>
        <p className="mb-4">Szkolenia budują kompetencje, ale nie zawsze prowadzą bezpośrednio do zatrudnienia.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">6. Samozatrudnienie</h4>
        <p className="mb-2">Niektórzy wybierają:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>freelancing</li>
          <li>małą działalność</li>
          <li>usługi online</li>
        </ul>
        <p className="mb-4">Daje to elastyczność, ale wiąże się z niestabilnością dochodów.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Dodatkowe wyzwanie: ujawnienie niepełnosprawności</h4>
        <p className="mb-2">Wielu kandydatów zastanawia się:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Czy powiedzieć o niepełnosprawności?</li>
          <li>Czy spotkam się z uprzedzeniami?</li>
          <li>Czy otrzymam potrzebne dostosowanie?</li>
          <li>Czy stracę świadczenia?</li>
        </ul>
        <p className="mb-4">Ta niepewność zwiększa stres związany z rekrutacją.</p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Co zmienia sytuację?</h4>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li>Jasne określenie kompetencji</li>
          <li>Otwarte rozmowy o potrzebach</li>
          <li>Gotowość pracodawcy</li>
        </ol>
        <p className="mb-4"><strong>Inkluzywne zatrudnienie to profesjonalny proces, nie działanie charytatywne.</strong></p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Dlaczego powstało Prosvasimi?</h4>
        <p className="mb-4">Prosvasimi łączy kompetentnych kandydatów z pracodawcami gotowymi na realną dostępność.</p>
        <p className="font-medium">Bo praca powinna zależeć od umiejętności — nie od barier.</p>
      </>
    ),
  },
  "practical-guide": {
    titleEn: "Work and Careers for People with Disabilities: A Practical Guide to Inclusive Employment",
    titleUa: "Робота та кар'єра для людей з інвалідністю: практичний посібник з інклюзивного працевлаштування",
    titlePl: "Praca osób z niepełnosprawnościami w Polsce: jak znaleźć zatrudnienie i jak tworzyć miejsca pracy bez barier",
    contentEn: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">Why disability-inclusive employment matters</h4>
        <p className="mb-4">
          Work is more than income—it's independence, identity, social connection, and access to opportunity. Yet many countries still face a persistent <strong>disability employment gap</strong>, meaning disabled people are employed at lower rates than non-disabled people.
        </p>
        <p className="mb-4">
          For employers, disability inclusion isn't only a social good. Evidence-based research shows that many common employer worries (about cost, performance, or risk) are often overstated, and that better practices across the hiring lifecycle can improve outcomes.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">What "disability-friendly jobs" actually means</h4>
        <p className="mb-4">
          A disability-friendly job isn't a special job category—it's a role where barriers are removed so the person can do the work effectively. That usually comes down to three things:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Accessible hiring</strong> (applications, interviews, assessments, communication)</li>
          <li><strong>Reasonable accommodations</strong> (adjustments that enable performance without undue burden)</li>
          <li><strong>Inclusive management</strong> (clear expectations, flexibility where possible, and psychologically safe culture)</li>
        </ul>
        <p className="mb-4">
          Importantly, "reasonable accommodation" is a recognized concept in employment equality frameworks (including EU contexts) and is widely used in workplace policy and law.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Examples of common accommodations at work</h4>
        <p className="mb-4">Accommodations vary by person and role. Some common examples include:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Flexible hours or modified schedules</li>
          <li>Remote or hybrid work when the role allows</li>
          <li>Screen readers, captions, voice input, ergonomic equipment</li>
          <li>Clear written instructions and structured check-ins</li>
          <li>Adjusted interview format (extra time, alternative tasks, accessibility support)</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Where to find jobs for people with disabilities</h4>
        <p className="mb-4">
          Many candidates begin with mainstream platforms, but disability-focused job boards can reduce friction by prioritizing accessibility and inclusive employers.
        </p>
        <p className="mb-4"><strong>Search tip:</strong> Combine a role keyword with inclusion terms:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>"customer support + disability friendly"</li>
          <li>"data analyst + accessible workplace"</li>
          <li>"remote + jobs for people with disabilities"</li>
          <li>"inclusive employer + [your city]"</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">What inclusive employers do differently</h4>
        <p className="mb-4">Inclusive employers tend to be transparent and consistent. Look for signals like:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>A clear accommodations process (before and after hiring)</li>
          <li>Interview guidance that welcomes accessibility requests</li>
          <li>Disability employee resource groups, accessibility initiatives, or public commitments</li>
          <li>Measurable practices that support sustainable employment, not just hiring headlines</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">For employers: how to build an inclusive hiring process</h4>
        <p className="mb-4"><strong>1. Make job descriptions accessible and specific</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Focus on essential functions, not "nice-to-have" barriers</li>
          <li>Avoid vague traits like "must be energetic" unless genuinely required</li>
        </ul>
        <p className="mb-4"><strong>2. Offer accessible interviews by default</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Provide options: video, phone, in-person, captions, alternative assessments</li>
        </ul>
        <p className="mb-4"><strong>3. Normalize accommodations</strong></p>
        <p className="mb-4">
          A simple line like: "We're happy to provide accommodations throughout the hiring process." reduces fear and increases qualified applications.
        </p>
        <p className="mb-4"><strong>4. Train managers on practical inclusion</strong></p>
        <p className="mb-4">
          Disability inclusion spans the whole employment cycle—from entry to progression to exit—and benefits from concrete, evidence-based practices.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Best jobs for people with disabilities: the right framing</h4>
        <p className="mb-4">
          Lists of "top jobs" can be helpful for inspiration, but the best role depends on skills, interests, support needs, and workplace flexibility.
        </p>
        <p className="mb-4 font-medium">
          A better question than "What jobs fit my disability?" is: "What work environment and tasks help me perform at my best?"
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">FAQ</h4>
        <p className="mb-2"><strong>What is a "reasonable accommodation" at work?</strong></p>
        <p className="mb-4">A reasonable accommodation is an adjustment that enables a person with a disability to do their job or participate in hiring—commonly discussed in employment equality contexts and workplace policy.</p>
        
        <p className="mb-2"><strong>Do I have to disclose my disability to get accommodations?</strong></p>
        <p className="mb-4">Often, accommodations require some form of request, but disclosure norms and legal details vary by country.</p>
        
        <p className="mb-2"><strong>How can employers improve disability employment outcomes?</strong></p>
        <p className="mb-4">Evidence points to structured hiring, accessible interviews, manager capability, and ongoing workplace practices that support sustainable employment.</p>
      </>
    ),
    contentUa: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">Чому важлива інклюзія на робочому місці</h4>
        <p className="mb-4">
          Робота — це більше, ніж дохід. Це незалежність, ідентичність та доступ до можливостей. Однак у багатьох країнах існує стійка <strong>прогалина в працевлаштуванні людей з інвалідністю</strong>, що означає, що люди з інвалідністю працюють у меншій кількості, ніж люди без інвалідності.
        </p>
        <p className="mb-4">
          Для роботодавців інклюзія — це не лише соціальне благо. Дослідження показують, що багато поширених побоювань роботодавців (щодо витрат, продуктивності чи ризиків) часто перебільшені, а кращі практики протягом усього циклу найму можуть покращити результати.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Що насправді означають "роботи, дружні до інвалідів"</h4>
        <p className="mb-4">
          Робота, дружня до інвалідів, — це не спеціальна категорія робіт. Це посада, на якій усунуто бар'єри, щоб людина могла ефективно виконувати роботу. Зазвичай це зводиться до трьох речей:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Доступний найм</strong> (заявки, співбесіди, оцінки, комунікація)</li>
          <li><strong>Розумні пристосування</strong> (коригування, що дозволяють працювати без надмірного тягаря)</li>
          <li><strong>Інклюзивне управління</strong> (чіткі очікування, гнучкість де можливо, психологічно безпечна культура)</li>
        </ul>
        <p className="mb-4">
          Важливо, що "розумне пристосування" — це визнана концепція в рамках рівності працевлаштування (включно з контекстом ЄС) і широко використовується в політиці та законодавстві на робочому місці.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Приклади поширених пристосувань на роботі</h4>
        <p className="mb-4">Пристосування варіюються залежно від людини та посади. Деякі поширені приклади включають:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Гнучкий графік або змінений розклад</li>
          <li>Віддалена або гібридна робота, коли посада дозволяє</li>
          <li>Програми для читання екрану, субтитри, голосовий ввід, ергономічне обладнання</li>
          <li>Чіткі письмові інструкції та структуровані перевірки</li>
          <li>Змінений формат співбесіди (додатковий час, альтернативні завдання, підтримка доступності)</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Де шукати роботу для людей з інвалідністю</h4>
        <p className="mb-4">
          Багато кандидатів починають з основних платформ, але спеціалізовані дошки вакансій для людей з інвалідністю можуть зменшити тертя, пріоритезуючи доступність та інклюзивних роботодавців.
        </p>
        <p className="mb-4"><strong>Порада пошуку:</strong> Поєднайте ключове слово посади з термінами інклюзії:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>"підтримка клієнтів + дружній до інвалідів"</li>
          <li>"аналітик даних + доступне робоче місце"</li>
          <li>"віддалено + вакансії для людей з інвалідністю"</li>
          <li>"інклюзивний роботодавець + [ваше місто]"</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Що роблять інклюзивні роботодавці по-іншому</h4>
        <p className="mb-4">Інклюзивні роботодавці, як правило, є прозорими та послідовними. Шукайте сигнали, як-от:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Чіткий процес пристосувань (до та після найму)</li>
          <li>Настанови для співбесід, що вітають запити на доступність</li>
          <li>Групи працівників з інвалідністю, ініціативи доступності або публічні зобов'язання</li>
          <li>Вимірювані практики, що підтримують стале працевлаштування, а не лише заголовки про найм</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Для роботодавців: як побудувати інклюзивний процес найму</h4>
        <p className="mb-4"><strong>1. Зробіть описи робіт доступними та конкретними</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Зосередьтеся на основних функціях, а не на "приємних" бар'єрах</li>
          <li>Уникайте розмитих рис, як-от "має бути енергійним", якщо це не є справді необхідним</li>
        </ul>
        <p className="mb-4"><strong>2. Пропонуйте доступні співбесіди за замовчуванням</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Надайте варіанти: відео, телефон, особисто, субтитри, альтернативні оцінки</li>
        </ul>
        <p className="mb-4"><strong>3. Нормалізуйте пристосування</strong></p>
        <p className="mb-4">
          Простий рядок, як-от: "Ми раді надати пристосування протягом усього процесу найму." зменшує страх і збільшує кількість кваліфікованих заяв.
        </p>
        <p className="mb-4"><strong>4. Навчайте менеджерів практичній інклюзії</strong></p>
        <p className="mb-4">
          Інклюзія людей з інвалідністю охоплює весь цикл працевлаштування — від входу до просування до виходу — і виграє від конкретних, заснованих на доказах практик.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Найкращі роботи для людей з інвалідністю: правильний підхід</h4>
        <p className="mb-4">
          Списки "найкращих робіт" можуть бути корисними для натхнення, але найкраща посада залежить від навичок, інтересів, потреб підтримки та гнучкості робочого місця.
        </p>
        <p className="mb-4 font-medium">
          Краще питання, ніж "Які роботи підходять для моєї інвалідності?", це: "Яке робоче середовище та завдання допомагають мені працювати найкраще?"
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Часті запитання</h4>
        <p className="mb-2"><strong>Що таке "розумне пристосування" на роботі?</strong></p>
        <p className="mb-4">Розумне пристосування — це коригування, що дозволяє людині з інвалідністю виконувати свою роботу або брати участь у наймі — часто обговорюється в контексті рівності працевлаштування та політики на робочому місці.</p>
        
        <p className="mb-2"><strong>Чи повинен я повідомляти про свою інвалідність, щоб отримати пристосування?</strong></p>
        <p className="mb-4">Часто для пристосувань потрібна певна форма запиту, але норми розкриття інформації та юридичні деталі відрізняються залежно від країни.</p>
        
        <p className="mb-2"><strong>Як роботодавці можуть покращити результати працевлаштування людей з інвалідністю?</strong></p>
        <p className="mb-4">Докази вказують на структурований найм, доступні співбесіди, компетентність менеджерів та постійні робочі практики, що підтримують стале працевлаштування.</p>
      </>
    ),
    contentPl: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">Dlaczego zatrudnianie osób z niepełnosprawnościami ma znaczenie</h4>
        <p className="mb-4">
          Praca to więcej niż dochód — to niezależność, tożsamość, połączenie społeczne i dostęp do możliwości. Jednak wiele krajów wciąż boryka się z trwałym <strong>rozwarstwieniem w zatrudnieniu osób z niepełnosprawnościami</strong>, co oznacza, że osoby niepełnosprawne są zatrudnione w mniejszym stopniu niż osoby pełnosprawne.
        </p>
        <p className="mb-4">
          Dla pracodawców inkluzywność to nie tylko dobro społeczne. Badania oparte na dowodach pokazują, że wiele powszechnych obaw pracodawców (o koszty, wydajność czy ryzyko) jest często przesadzonych, a lepsze praktyki w całym cyklu zatrudnienia mogą poprawić wyniki.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Co tak naprawdę oznaczają "prace przyjazne osobom z niepełnosprawnościami"</h4>
        <p className="mb-4">
          Praca przyjazna osobom z niepełnosprawnościami to nie specjalna kategoria prac — to stanowisko, w którym usunięto bariery, aby osoba mogła efektywnie wykonywać pracę. Zazwyczaj sprowadza się to do trzech rzeczy:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Dostępne zatrudnienie</strong> (aplikacje, rozmowy kwalifikacyjne, oceny, komunikacja)</li>
          <li><strong>Rozsądne dostosowania</strong> (modyfikacje umożliwiające wykonywanie pracy bez nadmiernego obciążenia)</li>
          <li><strong>Inkluzywne zarządzanie</strong> (jasne oczekiwania, elastyczność tam, gdzie to możliwe, i psychologicznie bezpieczna kultura)</li>
        </ul>
        <p className="mb-4">
          Co ważne, "rozsądne dostosowanie" to uznane pojęcie w ramach równości zatrudnienia (w tym w kontekście UE) i jest szeroko stosowane w polityce i prawie dotyczącym miejsca pracy.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Przykłady powszechnych dostosowań w pracy</h4>
        <p className="mb-4">Dostosowania różnią się w zależności od osoby i stanowiska. Niektóre powszechne przykłady obejmują:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Elastyczne godziny lub zmieniony harmonogram</li>
          <li>Praca zdalna lub hybrydowa, gdy stanowisko na to pozwala</li>
          <li>Czytniki ekranu, napisy, wprowadzanie głosowe, sprzęt ergonomiczny</li>
          <li>Jasne, pisemne instrukcje i ustrukturyzowane kontrole</li>
          <li>Dostosowany format rozmowy kwalifikacyjnej (dodatkowy czas, alternatywne zadania, wsparcie dostępności)</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Gdzie szukać pracy dla osób z niepełnosprawnościami</h4>
        <p className="mb-4">
          Wiele kandydatów zaczyna od głównych platform, ale tablice ofert pracy skoncentrowane na osobach z niepełnosprawnościami mogą zmniejszyć tarcie, priorytetyzując dostępność i inkluzywnych pracodawców.
        </p>
        <p className="mb-4"><strong>Wskazówka wyszukiwania:</strong> Połącz słowo kluczowe stanowiska z terminami inkluzywności:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>"obsługa klienta + przyjazne osobom z niepełnosprawnościami"</li>
          <li>"analityk danych + dostępne miejsce pracy"</li>
          <li>"zdalnie + prace dla osób z niepełnosprawnościami"</li>
          <li>"inkluzywny pracodawca + [twoje miasto]"</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Co robią inaczej inkluzywni pracodawcy</h4>
        <p className="mb-4">Inkluzywni pracodawcy są zazwyczaj przejrzysti i konsekwentni. Szukaj sygnałów, takich jak:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Jasny proces dostosowań (przed i po zatrudnieniu)</li>
          <li>Wytyczne do rozmów kwalifikacyjnych, które witają prośby o dostępność</li>
          <li>Grupy pracowników z niepełnosprawnościami, inicjatywy dostępności lub publiczne zobowiązania</li>
          <li>Mierzalne praktyki wspierające zrównoważone zatrudnienie, a nie tylko nagłówki o zatrudnieniu</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Dla pracodawców: jak zbudować inkluzywny proces zatrudnienia</h4>
        <p className="mb-4"><strong>1. Uczyń opisy stanowisk dostępnymi i konkretnymi</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Skup się na podstawowych funkcjach, a nie na "miłych" barierach</li>
          <li>Unikaj ogólnych cech, takich jak "musi być energiczny", chyba że jest to naprawdę wymagane</li>
        </ul>
        <p className="mb-4"><strong>2. Oferuj dostępne rozmowy kwalifikacyjne domyślnie</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Zapewnij opcje: wideo, telefon, osobiście, napisy, alternatywne oceny</li>
        </ul>
        <p className="mb-4"><strong>3. Znormalizuj dostosowania</strong></p>
        <p className="mb-4">
          Prosty wiersz, taki jak: "Chętnie zapewniamy dostosowania w całym procesie zatrudnienia." zmniejsza obawy i zwiększa liczbę kwalifikowanych aplikacji.
        </p>
        <p className="mb-4"><strong>4. Szkól menedżerów w zakresie praktycznej inkluzywności</strong></p>
        <p className="mb-4">
          Inkluzywność osób z niepełnosprawnościami obejmuje cały cykl zatrudnienia — od wejścia do rozwoju do wyjścia — i korzysta z konkretnych, opartych na dowodach praktyk.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Najlepsze prace dla osób z niepełnosprawnościami: właściwe ujęcie</h4>
        <p className="mb-4">
          Listy "najlepszych prac" mogą być pomocne dla inspiracji, ale najlepsze stanowisko zależy od umiejętności, zainteresowań, potrzeb wsparcia i elastyczności miejsca pracy.
        </p>
        <p className="mb-4 font-medium">
          Lepszym pytaniem niż "Jakie prace pasują do mojej niepełnosprawności?" jest: "Jakie środowisko pracy i zadania pomagają mi działać najlepiej?"
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">FAQ</h4>
        <p className="mb-2"><strong>Co to jest "rozsądne dostosowanie" w pracy?</strong></p>
        <p className="mb-4">Rozsądne dostosowanie to modyfikacja, która umożliwia osobie z niepełnosprawnością wykonywanie pracy lub udział w zatrudnieniu — często omawiana w kontekście równości zatrudnienia i polityki miejsca pracy.</p>
        
        <p className="mb-2"><strong>Czy muszę ujawnić swoją niepełnosprawność, aby otrzymać dostosowania?</strong></p>
        <p className="mb-4">Często dostosowania wymagają pewnej formy prośby, ale normy ujawniania i szczegóły prawne różnią się w zależności od kraju.</p>
        
        <p className="mb-2"><strong>Jak pracodawcy mogą poprawić wyniki zatrudnienia osób z niepełnosprawnościami?</strong></p>
        <p className="mb-4">Dowody wskazują na ustrukturyzowane zatrudnienie, dostępne rozmowy kwalifikacyjne, kompetencje menedżerów i ciągłe praktyki pracy wspierające zrównoważone zatrudnienie.</p>
      </>
    ),
  },
  "bridging-the-gap": {
    titleEn: "Bridging the Gap: Disability Employment in 2026",
    titleUa: "Долаючи розрив: працевлаштування людей з інвалідністю у 2026",
    titlePl: "Zmniejszając lukę: zatrudnienie osób z niepełnosprawnościami w 2026",
    contentEn: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">The Current Landscape</h4>
        <p className="mb-4">
          In 2026, people with disabilities are still about twice as likely to be unemployed as those without disabilities. Despite progress in awareness and policy, the employment gap persists across most countries.
        </p>
        <p className="mb-4">
          The situation varies significantly by region and disability type, but the pattern is consistent: barriers in recruitment, workplace accessibility, and employer attitudes continue to limit opportunities.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Key Statistics</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Employment Gap:</strong> People with disabilities have an employment rate roughly 20-30 percentage points lower than non-disabled people</li>
          <li><strong>Regional Differences:</strong> EU countries show better outcomes than many non-EU regions, but gaps remain significant</li>
          <li><strong>Disability Type Impact:</strong> People with physical disabilities generally have higher employment rates than those with intellectual or mental health conditions</li>
          <li><strong>Education Factor:</strong> Higher education levels correlate with better employment outcomes, but gaps persist even among highly educated individuals</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">The Rise of Remote Work</h4>
        <p className="mb-4">
          Remote work has emerged as a game-changer for many people with disabilities. The COVID-19 pandemic accelerated this trend, and by 2026, remote and hybrid work arrangements have become standard for many roles.
        </p>
        <p className="mb-4">
          For many candidates, remote work eliminates transportation barriers, provides greater control over the work environment, and allows for better management of energy levels and health needs.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Inclusive Hiring Practices</h4>
        <p className="mb-4">
          Companies are increasingly adopting inclusive hiring practices, but implementation varies widely. Best practices include:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Accessible application processes and interview formats</li>
          <li>Clear accommodation policies and procedures</li>
          <li>Training for hiring managers and interviewers</li>
          <li>Partnerships with disability organizations</li>
          <li>Regular review and improvement of hiring metrics</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Technology and Assistive Tools</h4>
        <p className="mb-4">
          Advances in technology have created new opportunities. AI-powered tools, better assistive technologies, and improved workplace software have made many jobs more accessible than ever before.
        </p>
        <p className="mb-4">
          However, technology adoption remains uneven, and many workplaces still lack the infrastructure and training needed to fully leverage these tools.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Looking Forward</h4>
        <p className="mb-4">
          The trend toward greater inclusion is expected to continue, driven by:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Demographic shifts and labor shortages</li>
          <li>Increased awareness and advocacy</li>
          <li>Legal requirements and ESG pressures</li>
          <li>Recognition of the business case for diversity</li>
        </ul>
        <p className="mb-4">
          Progress will require sustained effort from employers, policymakers, disability advocates, and technology providers working together to create truly accessible workplaces.
        </p>
      </>
    ),
    contentUa: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">Поточна ситуація</h4>
        <p className="mb-4">
          У 2026 році люди з інвалідністю все ще приблизно вдвічі частіше залишаються без роботи, ніж люди без інвалідності. Незважаючи на прогрес у поінформованості та політиці, розрив у зайнятості зберігається в більшості країн.
        </p>
        <p className="mb-4">
          Ситуація значно відрізняється залежно від регіону та типу інвалідності, але закономірність послідовна: бар'єри в рекрутингу, доступності робочого місця та ставленні роботодавців продовжують обмежувати можливості.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Ключова статистика</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Розрив у зайнятості:</strong> Рівень зайнятості людей з інвалідністю приблизно на 20-30 відсоткових пунктів нижчий, ніж у людей без інвалідності</li>
          <li><strong>Регіональні відмінності:</strong> Країни ЄС показують кращі результати, ніж багато не-ЄС регіонів, але розриви залишаються значними</li>
          <li><strong>Вплив типу інвалідності:</strong> Люди з фізичними інвалідностями зазвичай мають вищий рівень зайнятості, ніж ті, хто має інтелектуальні або психічні розлади</li>
          <li><strong>Фактор освіти:</strong> Вищий рівень освіти корелює з кращими результатами зайнятості, але розриви зберігаються навіть серед високоосвічених осіб</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Підйом віддаленої роботи</h4>
        <p className="mb-4">
          Віддалена робота стала переломним моментом для багатьох людей з інвалідністю. Пандемія COVID-19 прискорила цей тренд, і до 2026 року віддалені та гібридні робочі домовленості стали стандартом для багатьох ролей.
        </p>
        <p className="mb-4">
          Для багатьох кандидатів віддалена робота усуває транспортні бар'єри, забезпечує більший контроль над робочим середовищем і дозволяє краще керувати рівнями енергії та потребами здоров'я.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Інклюзивні практики найму</h4>
        <p className="mb-4">
          Компанії все частіше приймають інклюзивні практики найму, але реалізація значно варіюється. Найкращі практики включають:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Доступні процеси подання заявки та формати співбесід</li>
          <li>Чіткі політики та процедури пристосувань</li>
          <li>Навчання для менеджерів з найму та інтерв'юерів</li>
          <li>Партнерство з організаціями людей з інвалідністю</li>
          <li>Регулярний перегляд та покращення показників найму</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Технології та допоміжні інструменти</h4>
        <p className="mb-4">
          Прогрес у технологіях створив нові можливості. Інструменти на основі ШІ, кращі допоміжні технології та покращене програмне забезпечення для робочих місць зробили багато робіт більш доступними, ніж будь-коли раніше.
        </p>
        <p className="mb-4">
          Однак впровадження технологій залишається нерівномірним, і багато робочих місць все ще не мають інфраструктури та навчання, необхідних для повного використання цих інструментів.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Погляд у майбутнє</h4>
        <p className="mb-4">
          Очікується, що тренд до більшої інклюзії продовжиться, спричинений:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Демографічними змінами та дефіцитом робочої сили</li>
          <li>Збільшенням поінформованості та адвокації</li>
          <li>Вимогами законодавства та тиском ESG</li>
          <li>Визнанням ділового випадку для різноманітності</li>
        </ul>
        <p className="mb-4">
          Прогрес вимагатиме постійних зусиль з боку роботодавців, політиків, захисників прав людей з інвалідністю та постачальників технологій, працюючих разом для створення по-справді доступних робочих місць.
        </p>
      </>
    ),
    contentPl: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">Obecny krajobraz</h4>
        <p className="mb-4">
          W 2026 roku osoby z niepełnosprawnościami są nadal około dwa razy bardziej narażone na bezrobocie niż osoby bez niepełnosprawności. Mimo postępów w świadomości i polityce, luka zatrudnienia utrzymuje się w większości krajów.
        </p>
        <p className="mb-4">
          Sytuacja znacznie różni się w zależności od regionu i rodzaju niepełnosprawności, ale wzorzec jest spójny: bariery w rekrutacji, dostępności miejsca pracy i postawach pracodawców nadal ograniczają możliwości.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Kluczowe statystyki</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Luka zatrudnienia:</strong> Osoby z niepełnosprawnościami mają wskaźnik zatrudnienia o około 20-30 punktów procentowych niższy niż osoby pełnosprawne</li>
          <li><strong>Różnice regionalne:</strong> Kraje UE wykazują lepsze wyniki niż wiele regionów poza UE, ale luki pozostają znaczące</li>
          <li><strong>Wpływ rodzaju niepełnosprawności:</strong> Osoby z niepełnosprawnościami fizycznymi mają generalnie wyższe wskaźniki zatrudnienia niż osoby z niepełnosprawnościami intelektualnymi lub psychicznymi</li>
          <li><strong>Czynnik wykształcenia:</strong> Wyższy poziom wykształcenia koreluje z lepszymi wynikami zatrudnienia, ale luki utrzymują się nawet wśród osób z wyższym wykształceniem</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Wzrost pracy zdalnej</h4>
        <p className="mb-4">
          Praca zdalna stała się przełomem dla wielu osób z niepełnosprawnościami. Pandemia COVID-19 przyspieszyła ten trend, a do 2026 roku zdalne i hybrydowe formy pracy stały się standardem dla wielu stanowisk.
        </p>
        <p className="mb-4">
          Dla wielu kandydatów praca zdalna eliminuje bariery transportowe, zapewnia większą kontrolę nad środowiskiem pracy i pozwala na lepsze zarządzanie poziomami energii i potrzebami zdrowotnymi.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Inkluzywne praktyki zatrudnienia</h4>
        <p className="mb-4">
          Firmy coraz częściej wprowadzają inkluzywne praktyki zatrudnienia, ale wdrażanie różni się znacznie. Najlepsze praktyki obejmują:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Dostępne procesy aplikacyjne i formaty rozmów kwalifikacyjnych</li>
          <li>Jasne polityki i procedury dostosowań</li>
          <li>Szkolenia dla menedżerów zatrudniających i rozmówców</li>
          <li>Partnerstwa z organizacjami osób z niepełnosprawnościami</li>
          <li>Regularne przeglądy i ulepszanie wskaźników zatrudnienia</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Technologia i narzędzia wspomagające</h4>
        <p className="mb-4">
          Postępy w technologii stworzyły nowe możliwości. Narzędzia oparte na AI, lepsze technologie wspomagające i ulepszone oprogramowanie do pracy sprawiły, że wiele stanowisk stało się bardziej dostępnych niż kiedykolwiek wcześniej.
        </p>
        <p className="mb-4">
          Jednak wdrażanie technologii pozostaje nierównomierne, a wiele miejsc pracy wciąż brakuje infrastruktury i szkoleń potrzebnych do pełnego wykorzystania tych narzędzi.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Spojrzenie w przyszłość</h4>
        <p className="mb-4">
          Oczekuje się, że trend ku większej inkluzywności będzie kontynuowany, napędzany przez:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Zmiany demograficzne i niedobory siły roboczej</li>
          <li>Zwiększoną świadomość i adwokację</li>
          <li>Wymagania prawne i presje ESG</li>
          <li>Uznanie biznesowego przypadku dla różnorodności</li>
        </ul>
        <p className="mb-4">
          Postęp wymagać będzie ciągłych wysiłków ze strony pracodawców, polityków, obrońców praw osób z niepełnosprawnościami i dostawców technologii, pracujących razem nad tworzeniem naprawdę dostępnych miejsc pracy.
        </p>
      </>
    ),
  },
  "digital-frontier": {
    titleEn: "The Digital Frontier: 2026 Remote Jobs",
    titleUa: "Цифровий фронтир: дистанційна робота 2026",
    titlePl: "Cyfrowa granica: praca zdalna 2026",
    contentEn: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">The Remote Work Revolution</h4>
        <p className="mb-4">
          The shift to remote work represents one of the most significant changes in the modern labor market. For people with disabilities, this transformation has opened up unprecedented opportunities.
        </p>
        <p className="mb-4">
          What was once considered a privilege has now become a standard expectation for many roles, fundamentally changing how we think about workplace accessibility.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Why Remote Work Matters</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Eliminates Physical Barriers:</strong> No need for accessible transportation or office buildings</li>
          <li><strong>Environmental Control:</strong> Customizable workspace that meets individual needs</li>
          <li><strong>Energy Management:</strong> Better control over work hours and break schedules</li>
          <li><strong>Reduced Discrimination:</strong> Focus shifts from physical presence to actual work output</li>
          <li><strong>Global Opportunities:</strong> Access to jobs regardless of geographic location</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Top Remote-Friendly Roles in 2026</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Software Development:</strong> Programming, web development, and app creation</li>
          <li><strong>Data Analysis:</strong> Business intelligence, analytics, and data science</li>
          <li><strong>Digital Marketing:</strong> Content creation, social media, and SEO</li>
          <li><strong>Customer Support:</strong> Online chat, email, and phone support</li>
          <li><strong>Writing and Editing:</strong> Content creation, technical writing, and copywriting</li>
          <li><strong>Design:</strong> Graphic design, UX/UI, and web design</li>
          <li><strong>Project Management:</strong> Remote team coordination and project oversight</li>
          <li><strong>Teaching and Training:</strong> Online education and corporate training</li>
          <li><strong>Research:</strong> Market research, academic research, and analysis</li>
          <li><strong>Consulting:</strong> Business consulting and specialized expertise</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Challenges and Considerations</h4>
        <p className="mb-4">
          While remote work offers many benefits, it's not without challenges:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Technology Requirements:</strong> Need for reliable internet and appropriate equipment</li>
          <li><strong>Isolation:</strong> Reduced social interaction and team connection</li>
          <li><strong>Home Accessibility:</strong> Need for accessible home workspace</li>
          <li><strong>Time Zone Differences:</strong> For global remote positions</li>
          <li><strong>Self-Discipline:</strong> Requires strong time management skills</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">The Future of Remote Work</h4>
        <p className="mb-4">
          The trend toward remote work is expected to continue and expand. By 2026, we're seeing:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>More companies adopting permanent remote or hybrid policies</li>
          <li>Better tools for collaboration and accessibility</li>
          <li>Increased focus on remote work skills and training</li>
          <li>Greater acceptance of remote work across industries</li>
          <li>Improved legal protections for remote workers</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Making Remote Work Work for You</h4>
        <p className="mb-4">
          To succeed in remote work, consider:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Assess your home workspace and needed accommodations</li>
          <li>Develop strong time management and self-discipline</li>
          <li>Build virtual networking skills and online presence</li>
          <li>Stay current with remote work tools and technologies</li>
          <li>Seek out companies with proven remote work cultures</li>
        </ul>

        <p className="mb-4">
          Remote work isn't just a trend—it's a fundamental shift in how we work. For people with disabilities, it represents a powerful tool for breaking down traditional employment barriers and accessing opportunities based on skills rather than physical limitations.
        </p>
      </>
    ),
    contentUa: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">Революція дистанційної роботи</h4>
        <p className="mb-4">
          Перехід до дистанційної роботи є однією з найзначніших змін на сучасному ринку праці. Для людей з інвалідністю ця трансформація відкрила безпрецедентні можливості.
        </p>
        <p className="mb-4">
          Те, що колись вважалося привілеєм, тепер стало стандартним очікуванням для багатьох ролей, фундаментально змінюючи те, як ми думаємо про доступність робочого місця.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Чому важлива дистанційна робота</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Усуває фізичні бар'єри:</strong> Не потрібен доступний транспорт або офісні будівлі</li>
          <li><strong>Контроль середовища:</strong> Налаштовуване робоче місце, що відповідає індивідуальним потребам</li>
          <li><strong>Управління енергією:</strong> Кращий контроль над робочими годинами та графіком перерв</li>
          <li><strong>Зменшення дискримінації:</strong> Фокус зміщується з фізичної присутності на фактичний результат роботи</li>
          <li><strong>Глобальні можливості:</strong> Доступ до робіт незалежно від географічного розташування</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Топ-10 дистанційних ролей у 2026</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Розробка програмного забезпечення:</strong> Програмування, веб-розробка та створення додатків</li>
          <li><strong>Аналіз даних:</strong> Бізнес-аналітика, аналітика та наука про дані</li>
          <li><strong>Цифровий маркетинг:</strong> Створення контенту, соціальні мережі та SEO</li>
          <li><strong>Підтримка клієнтів:</strong> Онлайн-чат, електронна пошта та телефонна підтримка</li>
          <li><strong>Написання та редагування:</strong> Створення контенту, технічне письмо та копірайтинг</li>
          <li><strong>Дизайн:</strong> Графічний дизайн, UX/UI та веб-дизайн</li>
          <li><strong>Управління проєктами:</strong> Координація дистанційних команд та нагляд за проєктами</li>
          <li><strong>Навчання та тренінг:</strong> Онлайн-освіта та корпоративне навчання</li>
          <li><strong>Дослідження:</strong> Ринкові дослідження, академічні дослідження та аналіз</li>
          <li><strong>Консалтинг:</strong> Бізнес-консалтинг та спеціалізована експертиза</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Виклики та міркування</h4>
        <p className="mb-4">
          Хоча дистанційна робота пропонує багато переваг, вона не без викликів:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Технологічні вимоги:</strong> Потреба в надійному інтернеті та відповідному обладнанні</li>
          <li><strong>Ізоляція:</strong> Зменшена соціальна взаємодія та зв'язок з командою</li>
          <li><strong>Доступність будинку:</strong> Потреба в доступному домашньому робочому місці</li>
          <li><strong>Різниця в часових поясах:</strong> Для глобальних дистанційних позицій</li>
          <li><strong>Самодисципліна:</strong> Вимагає сильних навичок управління часом</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Майбутнє дистанційної роботи</h4>
        <p className="mb-4">
          Очікується, що тренд до дистанційної роботи продовжуватиметься і розширюватиметься. До 2026 року ми бачимо:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Більше компаній приймають постійні дистанційні або гібридні політики</li>
          <li>Кращі інструменти для співпраці та доступності</li>
          <li>Збільшений фокус на навичках дистанційної роботи та навчанні</li>
          <li>Більша прийнятність дистанційної роботи в галузях</li>
          <li>Покращений юридичний захист для дистанційних працівників</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Як зробити дистанційну роботу ефективною для вас</h4>
        <p className="mb-4">
          Щоб успішно працювати дистанційно, розгляньте:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Оцініть своє домашнє робоче місце та необхідні пристосування</li>
          <li>Розвивайте сильні навички управління часом та самодисципліну</li>
          <li>Будуйте навички віртуального нетворкінгу та онлайн-присутності</li>
          <li>Будьте в курсі інструментів та технологій дистанційної роботи</li>
          <li>Шукайте компанії з доведеною культурою дистанційної роботи</li>
        </ul>

        <p className="mb-4">
          Дистанційна робота — це не просто тренд, це фундаментальна зміна в тому, як ми працюємо. Для людей з інвалідністю це представляє потужний інструмент для подолання традиційних бар'єрів працевлаштування та доступу до можливостей на основі навичок, а не фізичних обмежень.
        </p>
      </>
    ),
    contentPl: (
      <>
        <h4 className="text-lg font-semibold mt-6 mb-3">Rewolucja pracy zdalnej</h4>
        <p className="mb-4">
          Przejście na pracę zdalną stanowi jedną z najważniejszych zmian na nowoczesnym rynku pracy. Dla osób z niepełnosprawnościami ta transformacja otworzyła bezprecedensowe możliwości.
        </p>
        <p className="mb-4">
          To, co kiedyś uważano za przywilej, stało się teraz standardowym oczekiwaniem dla wielu stanowisk, fundamentalnie zmieniając sposób, w jaki myślimy o dostępności miejsca pracy.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Dlaczego praca zdalna ma znaczenie</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Eliminuje bariery fizyczne:</strong> Nie potrzeba dostępnego transportu ani budynków biurowych</li>
          <li><strong>Kontrola środowiska:</strong> Dostosowywalne miejsce pracy spełniające indywidualne potrzeby</li>
          <li><strong>Zarządzanie energią:</strong> Lepsza kontrola nad godzinami pracy i harmonogramem przerw</li>
          <li><strong>Zmniejszenie dyskryminacji:</strong> Fokus przesuwa się z obecności fizycznej na faktyczną wydajność pracy</li>
          <li><strong>Globalne możliwości:</strong> Dostęp do pracy niezależnie od lokalizacji geograficznej</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Top 10 ról zdalnych w 2026</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Rozwój oprogramowania:</strong> Programowanie, tworzenie stron internetowych i aplikacji</li>
          <li><strong>Analiza danych:</strong> Analityka biznesowa, analiza i nauka o danych</li>
          <li><strong>Marketing cyfrowy:</strong> Tworzenie treści, media społecznościowe i SEO</li>
          <li><strong>Obsługa klienta:</strong> Czat online, e-mail i wsparcie telefoniczne</li>
          <li><strong>Pisanie i edycja:</strong> Tworzenie treści, pisanie techniczne i copywriting</li>
          <li><strong>Projektowanie:</strong> Projektowanie graficzne, UX/UI i projektowanie stron</li>
          <li><strong>Zarządzanie projektami:</strong> Koordynacja zespołów zdalnych i nadzór projektowy</li>
          <li><strong>Nauka i szkolenia:</strong> Edukacja online i szkolenia korporacyjne</li>
          <li><strong>Badania:</strong> Badania rynku, badania akademickie i analiza</li>
          <li><strong>Konsulting:</strong> Konsulting biznesowy i specjalistyczna wiedza</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Wyzwania i rozważania</h4>
        <p className="mb-4">
          Chociaż praca zdalna oferuje wiele korzyści, nie jest bez wyzwań:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Wymagania technologiczne:</strong> Potrzeba niezawodnego internetu i odpowiedniego sprzętu</li>
          <li><strong>Izolacja:</strong> Zmniejszona interakcja społeczna i więź z zespołem</li>
          <li><strong>Dostępność domu:</strong> Potrzeba dostępnego domowego miejsca pracy</li>
          <li><strong>Różnice czasowe:</strong> Dla globalnych pozycji zdalnych</li>
          <li><strong>Samodyscyplina:</strong> Wymaga silnych umiejętności zarządzania czasem</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Przyszłość pracy zdalnej</h4>
        <p className="mb-4">
          Trend w kierunku pracy zdalnej jest oczekiwany do kontynuacji i ekspansji. Do 2026 roku widzimy:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Więcej firm przyjmuje stałe polityki zdalne lub hybrydowe</li>
          <li>Lepsze narzędzia do współpracy i dostępności</li>
          <li>Zwiększony nacisk na umiejętności pracy zdalnej i szkolenia</li>
          <li>Większa akceptacja pracy zdalnej w różnych branżach</li>
          <li>Poprawiona ochrona prawna dla pracowników zdalnych</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Jak sprawić, by praca zdalna działała dla Ciebie</h4>
        <p className="mb-4">
          Aby odnieść sukces w pracy zdalnej, rozważ:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Oceń swoje domowe miejsce pracy i potrzebne dostosowania</li>
          <li>Rozwijaj silne umiejętności zarządzania czasem i samodyscypliny</li>
          <li>Buduj umiejętności wirtualnego networkingu i obecności online</li>
          <li>Bądź na bieżąco z narzędziami i technologiami pracy zdalnej</li>
          <li>Szukaj firm z udokumentowaną kulturą pracy zdalnej</li>
        </ul>

        <p className="mb-4">
          Praca zdalna to nie tylko trend — to fundamentalna zmiana w tym, jak pracujemy. Dla osób z niepełnosprawnościami stanowi potężne narzędzie do przełamywania tradycyjnych barier zatrudnienia i dostępu do możliwości na podstawie umiejętności, a nie ograniczeń fizycznych.
        </p>
      </>
    ),
  },
};

// Detect browser language and map to supported languages
function getBrowserLanguage(): Lang {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  if (langCode === 'pl') return 'pl';
  if (langCode === 'uk' || langCode === 'ua') return 'ua';
  return 'en';
}

export default function ArticlePage() {
  const [lang, setLang] = useState<Lang>("en");
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params.slug as string;
  const t = translations[lang];

  // Set language based on browser settings on mount
  useEffect(() => {
    const detectedLang = getBrowserLanguage();
    setLang(detectedLang);
  }, []);

  // Try to find hardcoded article first
  const hardcodedArticle = hardcodedArticles[slug];

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        
        if (hardcodedArticle) {
          setArticle({
            ...hardcodedArticle,
            isHardcoded: true
          });
          return;
        }

        // Try to fetch markdown file
        const response = await fetch(`/api/articles/${slug}?lang=${lang}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug, lang, hardcodedArticle]);

  const getTitle = () => {
    if (article?.isHardcoded) {
      return lang === "en" ? article.titleEn : lang === "ua" ? article.titleUa : article.titlePl;
    }
    if (article) {
      return article.title;
    }
    return "";
  };

  const getContent = () => {
    if (article?.isHardcoded) {
      return lang === "en" ? article.contentEn : lang === "ua" ? article.contentUa : article.contentPl;
    }
    if (article?.content) {
      return <div dangerouslySetInnerHTML={{ __html: article.content }} />;
    }
    return null;
  };

  const getImage = () => {
    if (article?.isHardcoded) {
      return null;
    }
    if (article?.image) {
      return article.image;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-[#2D6A4F]">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-dvh bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1B4332] mb-4">Article not found</h1>
          <Link href="/articles" className="text-[#2D6A4F] hover:text-[#1B4332] underline">
            {t.backToArticles}
          </Link>
        </div>
      </div>
    );
  }

  const image = getImage();

  return (
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      <header className="border-b border-[#E7E5E4] bg-white/95 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image 
              src="/images/logo.png" 
              alt="Prosvasimi" 
              width={36} 
              height={36}
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-lg text-[#1B4332]">Prosvasimi</div>
              <div className="text-xs text-[#2D6A4F]">{t.brandTagline}</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <Link href="/" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navHome}</Link>
            <Link href="/offer" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{lang === "en" ? "What We Offer" : lang === "ua" ? "Що ми пропонуємо" : "Co oferujemy"}</Link>
            <Link href="/articles" className="px-4 py-2 text-white bg-[#2D6A4F] rounded-lg">{t.navArticles}</Link>
            <Link href="/jobs" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navJobs}</Link>
          </nav>
          <div className="flex items-center bg-[#E7E5E4] rounded-lg p-1 text-sm">
            <button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded-md transition-all ${lang === "en" ? "bg-white text-[#1B4332] shadow-sm" : "text-[#2D6A4F] hover:text-[#1B4332]"}`}>EN</button>
            <button onClick={() => setLang("pl")} className={`px-3 py-1.5 rounded-md transition-all ${lang === "pl" ? "bg-white text-[#1B4332] shadow-sm" : "text-[#2D6A4F] hover:text-[#1B4332]"}`}>PL</button>
            <button onClick={() => setLang("ua")} className={`px-3 py-1.5 rounded-md transition-all ${lang === "ua" ? "bg-white text-[#1B4332] shadow-sm" : "text-[#2D6A4F] hover:text-[#1B4332]"}`}>UA</button>
          </div>
        </div>
      </header>

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm text-[#2D6A4F] hover:text-[#1B4332] mb-8 group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.backToArticles}
          </Link>

          <article>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1B4332] mb-8">
              {getTitle()}
            </h1>

            {image && (
              <img 
                src={image} 
                alt={getTitle()} 
                className="w-full rounded-2xl mb-8"
              />
            )}

            <div className="prose prose-lg max-w-none prose-headings:text-[#1B4332] prose-p:text-[#57534E] prose-p:mb-6 prose-p:leading-relaxed prose-ul:text-[#57534E] prose-li:text-[#57534E] prose-strong:text-[#1B4332] prose-a:text-[#2D6A4F] hover:prose-a:text-[#1B4332] prose-h4:text-[#1B4332] prose-h2:mt-10 prose-h2:mb-6 prose-h4:mt-8 prose-h4:mb-4">
              {getContent()}
            </div>
          </article>
        </div>
      </main>

      <footer className="border-t border-[#E7E5E4] py-10 bg-white mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-[#57534E] text-sm">
          <p>Prosvasimi &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
