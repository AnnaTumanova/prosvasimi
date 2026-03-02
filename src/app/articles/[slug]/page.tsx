"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Lang = "en" | "pl" | "uk";

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
  uk: {
    brandTagline: "Доступна робота без бар'єрів",
    navHome: "Головна",
    navArticles: "Статті",
    backToArticles: "← Назад до статей",
    footerNote: "Будуємо доступну платформу для працевлаштування.",
  },
};

// Hardcoded articles data
const hardcodedArticles: Record<string, { titleEn: string; titleUk: string; titlePl: string; contentEn: React.ReactNode; contentUk: React.ReactNode; contentPl: React.ReactNode }> = {
  "inclusivity-revolution": {
    titleEn: "The Inclusivity Revolution: A 2026 Comparison of Ukraine and Poland",
    titleUk: "Реформа 2026: Нові правила працевлаштування людей з інвалідністю в Україні та Польщі",
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
    contentUk: (
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
    titleUk: "Як люди з інвалідністю зазвичай знаходять роботу?",
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
    contentUk: (
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
};

interface CMSArticle {
  id: string;
  titleEn: string;
  titleUk: string;
  titlePl: string;
  contentEn: string;
  contentUk: string;
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
      return lang === "en" ? hardcodedArticle.titleEn : lang === "uk" ? hardcodedArticle.titleUk : hardcodedArticle.titlePl;
    }
    if (cmsArticle) {
      return lang === "en" ? cmsArticle.titleEn : lang === "uk" ? cmsArticle.titleUk : cmsArticle.titlePl;
    }
    return "";
  };

  const getContent = () => {
    if (hardcodedArticle) {
      return lang === "en" ? hardcodedArticle.contentEn : lang === "uk" ? hardcodedArticle.contentUk : hardcodedArticle.contentPl;
    }
    if (cmsArticle) {
      const content = lang === "en" ? cmsArticle.contentEn : lang === "uk" ? cmsArticle.contentUk : cmsArticle.contentPl;
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
            <button type="button" onClick={() => setLang("uk")} aria-pressed={lang === "uk"} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 ${lang === "uk" ? "text-slate-900 font-medium" : "hover:text-slate-900"}`}>
              UK
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
