"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Lang = "en" | "pl" | "ua";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    brandTagline: "Accessible jobs without barriers",
    navHome: "Home",
    navArticles: "Articles",
    backToArticles: "← Back to Articles",
    footerNote: "Building an accessible job platform.",
  },
  pl: {
    brandTagline: "Dostępna praca bez barier",
    navHome: "Strona główna",
    navArticles: "Artykuły",
    backToArticles: "← Powrót do artykułów",
    footerNote: "Budujemy dostępną platformę pracy.",
  },
  ua: {
    brandTagline: "Доступна робота без бар'єрів",
    navHome: "Головна",
    navArticles: "Статті",
    backToArticles: "← Назад до статей",
    footerNote: "Будуємо доступну платформу для працевлаштування.",
  },
};

// Hardcoded articles data
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
        <img src="/images/articles/inclusive-workplace.svg" alt="Inclusive workplace illustration" className="w-full rounded-xl mb-8" />
        
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

        <img src="/images/articles/accommodations.svg" alt="Types of workplace accommodations" className="w-full rounded-xl mb-8 mt-8" />

        <h4 className="text-lg font-semibold mt-6 mb-3">Examples of common accommodations at work</h4>
        <p className="mb-4">Accommodations vary by person and role. Some common examples include:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Flexible hours or modified schedules</li>
          <li>Remote or hybrid work when the role allows</li>
          <li>Screen readers, captions, voice input, ergonomic equipment</li>
          <li>Clear written instructions and structured check-ins</li>
          <li>Adjusted interview format (extra time, alternative tasks, accessibility support)</li>
        </ul>

        <img src="/images/articles/job-search.svg" alt="Job search illustration" className="w-full rounded-xl mb-8 mt-8" />

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
        <img src="/images/articles/inclusive-workplace.svg" alt="Ілюстрація інклюзивного робочого місця" className="w-full rounded-xl mb-8" />
        
        <h4 className="text-lg font-semibold mt-6 mb-3">Чому інклюзивне працевлаштування важливе</h4>
        <p className="mb-4">
          Робота — це більше, ніж дохід. Це незалежність, ідентичність, соціальні зв'язки та доступ до можливостей. Проте в багатьох країнах зберігається <strong>розрив у працевлаштуванні людей з інвалідністю</strong> — вони працевлаштовані на нижчому рівні, ніж люди без інвалідності.
        </p>
        <p className="mb-4">
          Для роботодавців інклюзія — це не лише соціальне благо. Дослідження показують, що багато типових побоювань роботодавців (щодо витрат, продуктивності чи ризиків) часто перебільшені, а кращі практики найму покращують результати.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Що насправді означає «робота, дружня до людей з інвалідністю»</h4>
        <p className="mb-4">
          Це не окрема категорія вакансій — це роль, де усунуто бар'єри, щоб людина могла ефективно виконувати роботу. Зазвичай це зводиться до трьох речей:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Доступний найм</strong> (заявки, співбесіди, оцінювання, комунікація)</li>
          <li><strong>Розумне пристосування</strong> (адаптації, що забезпечують продуктивність без надмірного навантаження)</li>
          <li><strong>Інклюзивне управління</strong> (чіткі очікування, гнучкість де можливо, психологічно безпечна культура)</li>
        </ul>

        <img src="/images/articles/accommodations.svg" alt="Види пристосувань на робочому місці" className="w-full rounded-xl mb-8 mt-8" />

        <h4 className="text-lg font-semibold mt-6 mb-3">Приклади типових пристосувань на роботі</h4>
        <p className="mb-4">Пристосування залежать від людини та ролі. Деякі поширені приклади:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Гнучкий графік або змінений розклад</li>
          <li>Віддалена або гібридна робота, коли роль це дозволяє</li>
          <li>Програми читання з екрану, субтитри, голосовий ввід, ергономічне обладнання</li>
          <li>Чіткі письмові інструкції та структуровані зустрічі</li>
          <li>Адаптований формат співбесіди (додатковий час, альтернативні завдання)</li>
        </ul>

        <img src="/images/articles/job-search.svg" alt="Ілюстрація пошуку роботи" className="w-full rounded-xl mb-8 mt-8" />

        <h4 className="text-lg font-semibold mt-6 mb-3">Де шукати роботу для людей з інвалідністю</h4>
        <p className="mb-4">
          Багато кандидатів починають з основних платформ, але спеціалізовані дошки вакансій можуть зменшити тертя, пріоритезуючи доступність та інклюзивних роботодавців.
        </p>
        <p className="mb-4"><strong>Порада для пошуку:</strong> Комбінуйте ключове слово ролі з термінами інклюзії:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>«підтримка клієнтів + дружній до інвалідності»</li>
          <li>«аналітик даних + доступне робоче місце»</li>
          <li>«віддалена робота + для людей з інвалідністю»</li>
          <li>«інклюзивний роботодавець + [ваше місто]»</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Що роблять інклюзивні роботодавці по-іншому</h4>
        <p className="mb-4">Інклюзивні роботодавці зазвичай прозорі та послідовні. Шукайте такі сигнали:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Чіткий процес пристосувань (до і після найму)</li>
          <li>Інструкції до співбесіди, що вітають запити на доступність</li>
          <li>Ресурсні групи працівників з інвалідністю, ініціативи доступності</li>
          <li>Вимірювані практики, що підтримують стале працевлаштування</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Для роботодавців: як побудувати інклюзивний процес найму</h4>
        <p className="mb-4"><strong>1. Зробіть описи вакансій доступними та конкретними</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Зосередьтеся на основних функціях, а не на «бажаних» бар'єрах</li>
          <li>Уникайте розмитих рис на кшталт «має бути енергійним», якщо це не є справді необхідним</li>
        </ul>
        <p className="mb-4"><strong>2. Пропонуйте доступні співбесіди за замовчуванням</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Надавайте варіанти: відео, телефон, особисто, субтитри, альтернативні оцінювання</li>
        </ul>
        <p className="mb-4"><strong>3. Нормалізуйте пристосування</strong></p>
        <p className="mb-4">
          Просте речення: «Ми раді надати пристосування протягом процесу найму» зменшує страх і збільшує кількість кваліфікованих заявок.
        </p>
        <p className="mb-4"><strong>4. Навчайте менеджерів практичній інклюзії</strong></p>
        <p className="mb-4">
          Інклюзія охоплює весь цикл працевлаштування — від входу до просування та виходу — і виграє від конкретних, доказових практик.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">FAQ</h4>
        <p className="mb-2"><strong>Що таке «розумне пристосування» на роботі?</strong></p>
        <p className="mb-4">Розумне пристосування — це адаптація, що дозволяє людині з інвалідністю виконувати свою роботу або брати участь у наймі.</p>
        
        <p className="mb-2"><strong>Чи потрібно розкривати інвалідність, щоб отримати пристосування?</strong></p>
        <p className="mb-4">Часто пристосування вимагають певної форми запиту, але норми розкриття та юридичні деталі відрізняються залежно від країни.</p>
        
        <p className="mb-2"><strong>Як роботодавці можуть покращити результати працевлаштування людей з інвалідністю?</strong></p>
        <p className="mb-4">Докази вказують на структурований найм, доступні співбесіди, компетентність менеджерів та постійні практики на робочому місці.</p>
      </>
    ),
    contentPl: (
      <>
        <img src="/images/articles/inclusive-workplace.svg" alt="Ilustracja inkluzywnego miejsca pracy" className="w-full rounded-xl mb-8" />
        
        <h4 className="text-lg font-semibold mt-6 mb-3">Co to są „racjonalne usprawnienia" w pracy?</h4>
        <p className="mb-4">
          To jedno z najważniejszych pojęć w obszarze zatrudniania osób z niepełnosprawnościami — i jednocześnie jedno z najbardziej mylonych.
        </p>
        <p className="mb-4">
          <strong>Racjonalne usprawnienia</strong> to konieczne w konkretnej sytuacji zmiany lub dostosowania wynikające z potrzeb pracownika (lub kandydata), zgłoszone pracodawcy, które mają umożliwić wykonywanie pracy na równi z innymi — o ile nie stanowią nadmiernego obciążenia dla pracodawcy.
        </p>
        <p className="mb-4">
          <strong>Ważne:</strong> usprawnienia nie muszą oznaczać kosztownych remontów. Często są to proste, tanie i bardzo skuteczne modyfikacje.
        </p>

        <img src="/images/articles/accommodations.svg" alt="Rodzaje usprawnień w miejscu pracy" className="w-full rounded-xl mb-8 mt-8" />

        <h4 className="text-lg font-semibold mt-6 mb-3">Przykłady racjonalnych usprawnień (praktycznie)</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Elastyczne godziny pracy / przesunięcie godzin startu</li>
          <li>Praca zdalna lub hybrydowa (jeśli rola na to pozwala)</li>
          <li>Dostosowanie stanowiska: ergonomiczne krzesło, biurko, oświetlenie</li>
          <li>Oprogramowanie wspierające (np. czytniki ekranu, napisy)</li>
          <li>Jasne instrukcje na piśmie, checklisty, uporządkowane wdrożenie</li>
          <li>Zmiany w rekrutacji: dłuższy czas na zadanie, alternatywna forma spotkania</li>
        </ul>

        <img src="/images/articles/job-search.svg" alt="Ilustracja szukania pracy" className="w-full rounded-xl mb-8 mt-8" />

        <h4 className="text-lg font-semibold mt-6 mb-3">Gdzie szukać pracy dla osób z niepełnosprawnością</h4>
        <p className="mb-4">
          Wiele ofert trafia na duże portale, ale sporo wartościowych rekrutacji dzieje się „obok" — w społecznościach i we współpracy z fundacjami, programami stażowymi czy grupami tematycznymi.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">5 sposobów, które realnie zwiększają szanse</h4>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>Szukaj po frazach, nie tylko po stanowiskach</strong> — Wpisuj: „praca zdalna", „elastyczne godziny", „dostosowanie stanowiska", „inkluzja", „dostępność".</li>
          <li><strong>Korzystaj z grup i społeczności</strong> — Część staży i juniorowych rekrutacji bywa publikowana właśnie tam.</li>
          <li><strong>Upraszczaj CV</strong> — CV ma pokazać kompetencje i efekt pracy. Nie musi tłumaczyć życia.</li>
          <li><strong>Buduj listę „firm przyjaznych"</strong> — Patrz na sygnały: polityka dostępności, jasna informacja o usprawnieniach, proces rekrutacji bez barier.</li>
          <li><strong>Przygotuj prośbę o usprawnienie jako „brief"</strong> — Zamiast ogólnie: „potrzebuję dostosowania", lepiej: „żeby wykonywać X zadanie, potrzebuję Y rozwiązania".</li>
        </ol>

        <h4 className="text-lg font-semibold mt-6 mb-3">Jak (i czy) mówić o niepełnosprawności w rekrutacji?</h4>
        <p className="mb-4">
          Nie ma jednej dobrej odpowiedzi. Natomiast działa zasada: <strong>mów tyle, ile jest potrzebne do działania</strong>.
        </p>
        <p className="mb-4">
          Jeśli usprawnienie jest niezbędne na etapie rekrutacji (np. forma rozmowy, czas, dostępność), warto to zgłosić — krótko, rzeczowo, bez tłumaczeń medycznych.
        </p>
        <p className="mb-4 italic">
          Przykładowe zdanie do rekrutera: „Żeby w pełni komfortowo przejść rozmowę/wykonać zadanie, proszę o [konkretne usprawnienie]. Dzięki temu pokażę kompetencje w równych warunkach."
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Dla pracodawców: jak zatrudniać osoby z niepełnosprawnościami bez chaosu</h4>
        <p className="mb-4"><strong>1. Zrób rekrutację dostępną „z definicji"</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Ogłoszenie bez zbędnych wymagań</li>
          <li>Alternatywy kontaktu (mail/telefon)</li>
          <li>Możliwość zgłoszenia potrzeb w procesie</li>
        </ul>
        <p className="mb-4"><strong>2. Traktuj usprawnienia jak standard HR, nie „wyjątek"</strong></p>
        <p className="mb-4">
          Na poziomie UE racjonalne usprawnienia są rozumiane jako zmiany w pracy/środowisku pracy umożliwiające wykonywanie obowiązków i rozwój.
        </p>
        <p className="mb-4"><strong>3. Zarządzaj przez rezultaty</strong></p>
        <p className="mb-4">
          Dobre zespoły i tak działają na celach, jakości i terminach — a nie na „wszyscy pracują identycznie".
        </p>
        <p className="mb-4"><strong>4. Rozmawiaj, nie zgaduj</strong></p>
        <p className="mb-4">
          Częstym błędem jest zakładanie, co komu „na pewno" pomoże — a to bywa nietrafione. Działają racjonalne rozmowy i konkret.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Najczęstsze pytania (FAQ)</h4>
        <p className="mb-2"><strong>Czym są racjonalne usprawnienia w pracy?</strong></p>
        <p className="mb-4">To dostosowania do potrzeb osoby z niepełnosprawnością w konkretnej sytuacji, zgłoszone pracodawcy, które umożliwiają pracę na równi z innymi, o ile nie stanowią nadmiernego obciążenia.</p>
        
        <p className="mb-2"><strong>Czy dostosowanie stanowiska pracy musi być drogie?</strong></p>
        <p className="mb-4">Nie. Wiele usprawnień jest prostych i niskokosztowych (organizacyjnych lub technologicznych), a ich skuteczność bywa bardzo wysoka.</p>
        
        <p className="mb-2"><strong>Gdzie szukać ofert pracy przyjaznych osobom z niepełnosprawnością?</strong></p>
        <p className="mb-4">Oprócz portali rekrutacyjnych — w grupach tematycznych, programach stażowych i inicjatywach realizowanych z fundacjami; część ofert nie trafia na duże serwisy.</p>
      </>
    ),
  },
  "poland-employment-stats": {
    titleEn: "Employment of People with Disabilities in Poland: Statistics and Perspectives",
    titleUa: "Працевлаштування людей з інвалідністю в Польщі: статистика та перспективи",
    titlePl: "Zatrudnienie Osób z Niepełnosprawnościami w Polsce: Statystyki i Perspektywy",
    contentEn: (
      <>
        <img src="/images/articles/poland-stats.svg" alt="Poland disability employment statistics" className="w-full rounded-xl mb-8" />
        
        <p className="mb-4">
          Integrating people with disabilities into the labor market is a key aspect of building an inclusive and fair society. In Poland, as in many other countries, efforts are being made to increase the professional activity of this social group by offering various types of support and incentives for both employers and employees. Let's look at current statistics on the employment of people with disabilities in Poland and the challenges they face.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Population Size and Structure</h4>
        <p className="mb-4">
          According to data from the Central Statistical Office (GUS) from the 2021 National Census, approximately 3.1 million people with certified disabilities live in Poland, which is nearly 8% of the country's total population. Among them, a significant group are people of working age. Analyzing the structure of this population, one should notice the diversity in terms of the type and degree of disability (significant, moderate, light), which directly affects their professional opportunities. Older people predominate, although awareness of the need to support the professional activity of young people with disabilities is growing.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Level of Professional Activity and Employment Rate</h4>
        <p className="mb-4">
          Indicators for the professional activity and employment of people with disabilities in Poland are gradually improving, but still remain lower compared to the general population. According to 2023 data, the employment rate for people with certified disabilities was around 21-23% (depending on the source and methodology, e.g., PFRON or GUS data). While this represents an increase over previous years, a significant gap still exists. The level of professional activity (i.e., people working or looking for work) is also increasing, hovering around 25-27%. Low professional activity often results from health and architectural barriers, as well as stereotypes and a lack of proper workplace adaptation.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Employment Sectors and Popular Occupations</h4>
        <p className="mb-4">
          People with disabilities find employment in various sectors of the economy, but certain trends are noticeable. A significant portion works in the services sector, trade, and in public administration and national defense. Remote work is gaining popularity, especially in the IT industry (programmers, data analysts), telemarketing, and accounting services, which significantly facilitates the activation of people with mobility limitations. Creative industries such as graphics or copywriting also offer attractive opportunities. Many people are also employed in Sheltered Workshops and social enterprises that specialize in creating jobs for people with disabilities.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Challenges and Barriers in the Labor Market</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Architectural and Communication Barriers:</strong> Lack of adaptation of buildings, transport, and IT systems makes it difficult to get to work and perform duties.</li>
          <li><strong>Stereotypes and Employer Prejudices:</strong> Concerns about additional costs, lower productivity, or frequent sick leave still exist in the minds of many employers.</li>
          <li><strong>Low Level of Education and Qualifications:</strong> Often, people with disabilities have limited access to education and vocational training, which reduces their competitiveness in the labor market.</li>
          <li><strong>Insufficient Workplace Adaptation:</strong> Lack of appropriate equipment, flexible working hours, or assistant support prevents the full use of the employee's potential.</li>
          <li><strong>Complexity of the Certification and Support System:</strong> Complicated administrative procedures and fragmented support systems can discourage both people with disabilities and employers.</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Support Instruments and the Role of PFRON</h4>
        <p className="mb-4">
          In Poland, the State Fund for Rehabilitation of Disabled People (PFRON) plays a key role in supporting the employment of people with disabilities. The Fund offers a wide range of programs and financial instruments, including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Wage Subsidies:</strong> Employers hiring people with disabilities can receive a monthly subsidy for their salary, the amount of which depends on the degree of disability and the type of illness.</li>
          <li><strong>Refund of Workplace Equipment Costs:</strong> Possibility of obtaining a refund of costs incurred for adapting the workplace to the needs of an employee with a disability (e.g., specialized equipment, software).</li>
          <li><strong>Funds for Starting a Business:</strong> People with disabilities can apply for non-refundable funds to start their own business.</li>
          <li><strong>Training and Internships:</strong> PFRON finances training and internship programs that help in gaining new qualifications and professional experience.</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Summary and Perspectives</h4>
        <p className="mb-4">
          The employment of people with disabilities in Poland is an area of dynamic change. Statistics show a positive trend of increasing professional activity and employment rates, which is the result of both state actions and growing social awareness. Nevertheless, there are still many barriers that limit the full integration of people with disabilities in the labor market. The key to success is further developing and improving support instruments, eliminating prejudices, and promoting good practices among employers.
        </p>
      </>
    ),
    contentUa: (
      <>
        <img src="/images/articles/poland-stats.svg" alt="Статистика працевлаштування людей з інвалідністю в Польщі" className="w-full rounded-xl mb-8" />
        
        <p className="mb-4">
          Інтеграція людей з інвалідністю на ринок праці є ключовим аспектом побудови інклюзивного та справедливого суспільства. У Польщі, як і в багатьох інших країнах, докладаються зусилля для підвищення професійної активності цієї соціальної групи, пропонуючи різні види підтримки та стимулів як для роботодавців, так і для працівників. Розглянемо поточну статистику працевлаштування людей з інвалідністю в Польщі та виклики, з якими вони стикаються.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Чисельність та структура населення</h4>
        <p className="mb-4">
          За даними Головного статистичного управління (GUS) з Національного перепису населення та житлового фонду 2021 року, у Польщі проживає близько 3,1 мільйона осіб із підтвердженою інвалідністю, що становить майже 8% від загальної чисельності населення країни. Серед них значну групу становлять особи працездатного віку. Аналізуючи структуру цього населення, слід зауважити різноманітність за типом і ступенем інвалідності (значний, помірний, легкий), що безпосередньо впливає на їхні професійні можливості. Переважають люди старшого віку, хоча усвідомлення необхідності підтримки професійної активності молодих людей з інвалідністю зростає.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Рівень професійної активності та рівень зайнятості</h4>
        <p className="mb-4">
          Показники професійної активності та зайнятості людей з інвалідністю в Польщі поступово покращуються, але все ще залишаються низькими порівняно з загальним населенням. За даними за 2023 рік, рівень зайнятості осіб із підтвердженою інвалідністю становив близько 21-23% (залежно від джерела та методології, наприклад, даних PFRON або GUS). Хоча це означає зростання порівняно з попередніми роками, значний розрив усе ще існує. Рівень професійної активності (тобто людей, які працюють або шукають роботу) також зростає, коливаючись у межах 25-27%. Низька професійна активність часто є наслідком бар'єрів зі здоров'ям та архітектурних бар'єрів, а також стереотипів та відсутності належної адаптації робочого місця.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Сектори зайнятості та популярні професії</h4>
        <p className="mb-4">
          Люди з інвалідністю знаходять роботу в різних секторах економіки, проте помітні певні тенденції. Значна частина працює у сфері послуг, торгівлі, а також у державному управлінні та національній обороні. Віддалена робота набуває популярності, особливо в ІТ-індустрії (програмісти, аналітики даних), телемаркетингу та бухгалтерських послугах, що значно полегшує активізацію людей з обмеженими можливостями пересування. Креативні індустрії, такі як графіка чи копірайтинг, також пропонують привабливі можливості. Багато людей також працюють у захищених майстернях та соціальних підприємствах, які спеціалізуються на створенні робочих місць для людей з інвалідністю.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Виклики та бар'єри на ринку праці</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Архітектурні та комунікаційні бар'єри:</strong> Відсутність адаптації будівель, транспорту та ІТ-систем ускладнює доїзд до роботи та виконання обов'язків.</li>
          <li><strong>Стереотипи та упередження роботодавців:</strong> Побоювання щодо додаткових витрат, нижчої продуктивності або частих лікарняних усе ще існують у свідомості багатьох роботодавців.</li>
          <li><strong>Низький рівень освіти та кваліфікації:</strong> Часто люди з інвалідністю мають обмежений доступ до освіти та професійного навчання, що знижує їхню конкурентоспроможність на ринку праці.</li>
          <li><strong>Недостатня адаптація робочого місця:</strong> Відсутність відповідного обладнання, гнучкого робочого графіка або підтримки асистента перешкоджає повному використанню потенціалу працівника.</li>
          <li><strong>Складність системи сертифікації та підтримки:</strong> Складні адміністративні процедури та фрагментарні системи підтримки можуть відлякувати як людей з інвалідністю, так і роботодавців.</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Інструменти підтримки та роль PFRON</h4>
        <p className="mb-4">
          У Польщі ключову роль у підтримці працевлаштування людей з інвалідністю відіграє Державний фонд реабілітації інвалідів (PFRON). Фонд пропонує широкий спектр програм та фінансових інструментів, зокрема:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Субсидії на заробітну плату:</strong> Роботодавці, які наймають людей з інвалідністю, можуть отримувати щомісячну субсидію на їхню заробітну плату, розмір якої залежить від ступеня інвалідності та типу захворювання.</li>
          <li><strong>Відшкодування витрат на обладнання робочого місця:</strong> Можливість отримання відшкодування витрат, понесених на адаптацію робочого місця до потреб працівника з інвалідністю.</li>
          <li><strong>Кошти на відкриття бізнесу:</strong> Люди з інвалідністю можуть претендувати на безповоротні кошти для відкриття власної справи.</li>
          <li><strong>Навчання та стажування:</strong> PFRON фінансує програми навчання та стажування, які допомагають у здобутті нових кваліфікацій та професійного досвіду.</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Резюме та перспективи</h4>
        <p className="mb-4">
          Працевлаштування людей з інвалідністю в Польщі є сферою динамічних змін. Статистика показує позитивну тенденцію зростання професійної активності та рівня зайнятості, що є результатом як дій держави, так і зростаючої соціальної свідомості. Тим не менш, усе ще існує багато бар'єрів, які обмежують повну інтеграцію людей з інвалідністю на ринку праці. Ключем до успіху є подальший розвиток та вдосконалення інструментів підтримки, усунення упереджень та просування передових практик серед роботодавців.
        </p>
      </>
    ),
    contentPl: (
      <>
        <img src="/images/articles/poland-stats.svg" alt="Statystyki zatrudnienia osób z niepełnosprawnościami w Polsce" className="w-full rounded-xl mb-8" />
        
        <p className="mb-4">
          Wprowadzenie osób z niepełnosprawnościami na rynek pracy to kluczowy aspekt budowania inkluzywnego i sprawiedliwego społeczeństwa. W Polsce, podobnie jak w wielu innych krajach, dąży się do zwiększenia aktywności zawodowej tej grupy społecznej, oferując różnego rodzaju wsparcie i zachęty zarówno dla pracodawców, jak i pracowników. Przyjrzyjmy się aktualnym statystykom dotyczącym zatrudnienia osób z niepełnosprawnościami w Polsce oraz wyzwaniom, z jakimi się mierzą.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Liczebność i Struktura Populacji Osób z Niepełnosprawnościami</h4>
        <p className="mb-4">
          Według danych Głównego Urzędu Statystycznego (GUS) z Narodowego Spisu Powszechnego Ludności i Mieszkań 2021, w Polsce żyje około 3,1 mln osób z orzeczoną niepełnosprawnością, co stanowi blisko 8% całej populacji kraju. Wśród nich znaczącą grupę stanowią osoby w wieku produkcyjnym. Analizując strukturę tej populacji, należy zauważyć zróżnicowanie pod względem rodzaju i stopnia niepełnosprawności (znaczny, umiarkowany, lekki), co bezpośrednio wpływa na ich możliwości zawodowe. Przeważają osoby starsze, choć rośnie świadomość potrzeby wspierania aktywności zawodowej młodych osób z niepełnosprawnościami.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Poziom Aktywności Zawodowej i Wskaźnik Zatrudnienia</h4>
        <p className="mb-4">
          Wskaźniki dotyczące aktywności zawodowej i zatrudnienia osób z niepełnosprawnościami w Polsce ulegają stopniowej poprawie, jednak wciąż pozostają niższe w porównaniu do ogółu populacji. Według danych za 2023 rok, wskaźnik zatrudnienia osób z orzeczoną niepełnosprawnością wynosił około 21-23% (zależnie od źródła i metodologii, np. danych PFRON czy GUS). Choć oznacza to wzrost w stosunku do lat poprzednich, nadal istnieje znacząca luka. Poziom aktywności zawodowej (czyli osób pracujących lub poszukujących pracy) również wzrasta, oscylując wokół 25-27%. Niska aktywność zawodowa często wynika z barier zdrowotnych, architektonicznych, a także stereotypów i braku odpowiedniego dostosowania miejsc pracy.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Sektory Zatrudnienia i Popularne Zawody</h4>
        <p className="mb-4">
          Osoby z niepełnosprawnościami znajdują zatrudnienie w różnych sektorach gospodarki, jednak zauważalne są pewne tendencje. Znaczna część pracuje w sektorze usług, handlu oraz w administracji publicznej i obronie narodowej. Coraz większą popularność zyskuje praca zdalna, zwłaszcza w branży IT (programiści, analitycy danych), telemarketingu i usługach księgowych, co znacząco ułatwia aktywizację osób z ograniczeniami ruchowymi. Branże kreatywne, takie jak grafika czy copywriting, również oferują atrakcyjne możliwości. Wiele osób zatrudnionych jest także w Zakładach Pracy Chronionej oraz w przedsiębiorstwach społecznych, które specjalizują się w tworzeniu miejsc pracy dla osób z niepełnosprawnościami.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Wyzwania i Bariery na Rynku Pracy</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Bariery Architektoniczne i Komunikacyjne:</strong> Brak dostosowania budynków, transportu oraz systemów informatycznych utrudnia dotarcie do pracy i wykonywanie obowiązków.</li>
          <li><strong>Stereotypy i Uprzedzenia Pracodawców:</strong> Obawy przed dodatkowymi kosztami, mniejszą wydajnością czy częstymi zwolnieniami lekarskimi wciąż funkcjonują w świadomości wielu pracodawców.</li>
          <li><strong>Niski Poziom Wykształcenia i Kwalifikacji:</strong> Często osoby z niepełnosprawnościami mają ograniczony dostęp do edukacji i szkoleń zawodowych, co obniża ich konkurencyjność na rynku pracy.</li>
          <li><strong>Niewystarczające Dostosowanie Miejsc Pracy:</strong> Brakuje odpowiedniego oprzyrządowania, elastycznych godzin pracy czy wsparcia asystenta, co uniemożliwia pełne wykorzystanie potencjału pracownika.</li>
          <li><strong>Złożoność Systemu Orzecznictwa i Wsparcia:</strong> Skomplikowane procedury administracyjne i rozdrobnienie systemów wsparcia mogą zniechęcać zarówno osoby z niepełnosprawnościami, jak i pracodawców.</li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Instrumenty Wsparcia i Rola PFRON</h4>
        <p className="mb-4">
          W Polsce kluczową rolę w wspieraniu zatrudnienia osób z niepełnosprawnościami odgrywa Państwowy Fundusz Rehabilitacji Osób Niepełnosprawnych (PFRON). Fundusz oferuje szeroki wachlarz programów i instrumentów finansowych, w tym:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Dofinansowanie do Wynagrodzeń:</strong> Pracodawcy zatrudniający osoby z niepełnosprawnościami mogą otrzymać miesięczne dofinansowanie do ich wynagrodzenia, którego wysokość zależy od stopnia niepełnosprawności i rodzaju schorzenia.</li>
          <li><strong>Refundacja Kosztów Wyposażenia Stanowiska Pracy:</strong> Możliwość uzyskania zwrotu kosztów poniesionych na dostosowanie miejsca pracy do potrzeb pracownika z niepełnosprawnością (np. specjalistyczny sprzęt, oprogramowanie).</li>
          <li><strong>Środki na Podjęcie Działalności Gospodarczej:</strong> Osoby z niepełnosprawnościami mogą ubiegać się o bezzwrotne środki na rozpoczęcie własnej działalności gospodarczej.</li>
          <li><strong>Szkolenia i Staże:</strong> PFRON finansuje programy szkoleniowe i stażowe, które pomagają w zdobyciu nowych kwalifikacji i doświadczenia zawodowego.</li>
          <li><strong>Wsparcie dla Pracodawców:</strong> Fundusz oferuje doradztwo i szkolenia dla pracodawców w zakresie zatrudniania osób z niepełnosprawnościami oraz tworzenia inkluzywnego środowiska pracy.</li>
        </ul>
        <p className="mt-4">
          Polska stosuje również system kwotowy, który nakłada na pracodawców zatrudniających co najmniej 25 pracowników obowiązek zatrudnienia co najmniej 6% osób z niepełnosprawnościami.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3">Podsumowanie i Perspektywy</h4>
        <p className="mb-4">
          Zatrudnienie osób z niepełnosprawnościami w Polsce to obszar dynamicznych zmian. Statystyki pokazują pozytywny trend wzrostu wskaźników aktywności zawodowej i zatrudnienia, co jest efektem zarówno działań państwa, jak i rosnącej świadomości społecznej. Niemniej jednak, wciąż istnieje wiele barier, które ograniczają pełną integrację osób z niepełnosprawnościami na rynku pracy. Kluczem do sukcesu jest dalsze rozwijanie i doskonalenie instrumentów wsparcia, eliminowanie uprzedzeń oraz promowanie dobrych praktyk wśród pracodawców.
        </p>
      </>
    ),
  },
};

interface CMSArticle {
  id: string;
  titleEn: string;
  titleUa: string;
  titlePl: string;
  contentEn: string;
  contentUa: string;
  contentPl: string;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [lang, setLang] = useState<Lang>("en");
  const [cmsArticle, setCmsArticle] = useState<CMSArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  const hardcodedArticle = hardcodedArticles[slug];

  useEffect(() => {
    async function fetchArticle() {
      if (hardcodedArticle) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const articles = await res.json();
          const found = articles.find((a: CMSArticle) => a.id === slug);
          if (found) {
            setCmsArticle(found);
          }
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug, hardcodedArticle]);

  const getTitle = () => {
    if (hardcodedArticle) {
      return lang === "en" ? hardcodedArticle.titleEn : lang === "ua" ? hardcodedArticle.titleUa : hardcodedArticle.titlePl;
    }
    if (cmsArticle) {
      return lang === "en" ? cmsArticle.titleEn : lang === "ua" ? cmsArticle.titleUa : cmsArticle.titlePl;
    }
    return "";
  };

  const getContent = () => {
    if (hardcodedArticle) {
      return lang === "en" ? hardcodedArticle.contentEn : lang === "ua" ? hardcodedArticle.contentUa : hardcodedArticle.contentPl;
    }
    if (cmsArticle) {
      const content = lang === "en" ? cmsArticle.contentEn : lang === "ua" ? cmsArticle.contentUa : cmsArticle.contentPl;
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  if (!hardcodedArticle && !cmsArticle) {
    return (
      <div className="min-h-dvh bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article not found</h1>
          <Link href="/articles" className="text-slate-600 hover:text-slate-900 underline">
            {t.backToArticles}
          </Link>
        </div>
      </div>
    );
  }

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
            <button type="button" onClick={() => setLang("ua")} aria-pressed={lang === "ua"} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 ${lang === "ua" ? "text-slate-900 font-medium" : "hover:text-slate-900"}`}>
              UA
            </button>
          </div>
        </div>
      </header>

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/articles" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-8">
            {t.backToArticles}
          </Link>
          
          <article className="rounded-3xl bg-white p-6 sm:p-10 ring-1 ring-slate-200 shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">{getTitle()}</h1>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
              {getContent()}
            </div>
          </article>
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
