"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import jobsData from "./jobs_disability_pl.json";

type Lang = "en" | "pl" | "ua";

interface Job {
  source: string;
  title: string;
  company: string | null;
  location: string | null;
  url: string;
  date_posted: string | null;
  keywords: string;
  scraped_at: number;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    brandTagline: "Accessible jobs without barriers",
    navHome: "Home",
    navArticles: "Articles",
    navJobs: "Jobs",
    pageTitle: "Inclusive Job Offers",
    pageSubtitle: "Curated roles in Poland specifically mentioning disability support (PFRON/Orzeczenie)",
    searchPlaceholder: "Search by title or keyword...",
    noJobs: "No jobs found matching your criteria.",
    source: "Source",
    location: "Location",
    apply: "View Offer",
    remote: "Remote",
    totalJobs: "Showing {count} jobs",
    remoteUnspecified: "Remote / Unspecified",
  },
  pl: {
    brandTagline: "Dostępna praca bez barier",
    navHome: "Strona główna",
    navArticles: "Artykuły",
    navJobs: "Oferty pracy",
    pageTitle: "Oferty pracy z orzeczeniem",
    pageSubtitle: "Wyselekcjonowane oferty z Polski wspierające osoby z niepełnosprawnościami (PFRON/Orzeczenie)",
    searchPlaceholder: "Szukaj po nazwie lub słowie kluczowym...",
    noJobs: "Nie znaleziono ofert spełniających kryteria.",
    source: "Źródło",
    location: "Lokalizacja",
    apply: "Zobacz ofertę",
    remote: "Zdalnie",
    totalJobs: "Pokazuje {count} ofert",
    remoteUnspecified: "Zdalnie / Nieokreślone",
  },
  ua: {
    brandTagline: "Доступна робота без бар'єрів",
    navHome: "Головна",
    navArticles: "Статті",
    navJobs: "Вакансії",
    pageTitle: "Вакансії для людей з інвалідністю",
    pageSubtitle: "Відібрані пропозиції в Польщі з підтримкою людей з інвалідністю (PFRON/Orzeczenie)",
    searchPlaceholder: "Шукати за назвою або ключовим словом...",
    noJobs: "Вакансій не знайдено.",
    source: "Джерело",
    location: "Локація",
    apply: "Переглянути",
    remote: "Віддалено",
    totalJobs: "Показано {count} вакансій",
    remoteUnspecified: "Віддалено / Не вказано",
  },
};

function JobCard({ job, t }: { job: Job; t: Record<string, string> }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E7E5E4] hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-base font-semibold text-[#1B4332] line-clamp-2">{job.title}</h3>
          <span className="inline-flex items-center rounded-md bg-[#2D6A4F]/10 px-2 py-1 text-xs font-medium text-[#2D6A4F]">
            {job.source}
          </span>
        </div>
        
        <div className="space-y-1.5 mb-4 flex-grow">
          {job.company && (
            <div className="flex items-center gap-2 text-sm text-[#57534E]">
              <span>🏢</span>
              <span>{job.company}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {job.keywords.split(',').slice(0, 2).map((kw, i) => (
              <span key={i} className="inline-flex items-center rounded-full bg-[#FAFAF9] border border-[#E7E5E4] px-2 py-0.5 text-xs text-[#57534E]">
                {kw.trim()}
              </span>
            ))}
          </div>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex justify-center items-center gap-2 rounded-lg bg-[#2D6A4F] text-white px-4 py-2 text-sm font-medium hover:bg-[#1B4332] transition-colors"
        >
          {t.apply}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}

function normalizeLocation(location: string | null, lang: Lang): string {
  const remoteLabels: Record<Lang, string> = {
    en: "Remote / Unspecified",
    pl: "Zdalnie / Nieokreślone",
    ua: "Віддалено / Не вказано",
  };
  if (!location) return remoteLabels[lang];
  const loc = location.toLowerCase().trim();
  
  // Common Polish cities
  if (loc.includes("warszawa") || loc.includes("warsaw")) return "Warszawa";
  if (loc.includes("kraków") || loc.includes("krakow") || loc.includes("cracow")) return "Kraków";
  if (loc.includes("wrocław") || loc.includes("wroclaw")) return "Wrocław";
  if (loc.includes("poznań") || loc.includes("poznan")) return "Poznań";
  if (loc.includes("gdańsk") || loc.includes("gdansk")) return "Gdańsk";
  if (loc.includes("łódź") || loc.includes("lodz")) return "Łódź";
  if (loc.includes("katowice")) return "Katowice";
  if (loc.includes("szczecin")) return "Szczecin";
  if (loc.includes("lublin")) return "Lublin";
  if (loc.includes("bydgoszcz")) return "Bydgoszcz";
  if (loc.includes("białystok") || loc.includes("bialystok")) return "Białystok";
  if (loc.includes("gdynia")) return "Gdynia";
  if (loc.includes("częstochowa") || loc.includes("czestochowa")) return "Częstochowa";
  if (loc.includes("radom")) return "Radom";
  if (loc.includes("toruń") || loc.includes("torun")) return "Toruń";
  if (loc.includes("rzeszów") || loc.includes("rzeszow")) return "Rzeszów";
  if (loc.includes("kielce")) return "Kielce";
  if (loc.includes("olsztyn")) return "Olsztyn";
  if (loc.includes("opole")) return "Opole";
  if (loc.includes("gliwice")) return "Gliwice";
  if (loc.includes("zdaln") || loc.includes("remote") || loc.includes("home")) return lang === "pl" ? "Zdalnie" : lang === "ua" ? "Віддалено" : "Remote";
  if (loc.includes("polska") || loc.includes("poland") || loc.includes("cały kraj")) return lang === "pl" ? "Polska (cały kraj)" : lang === "ua" ? "Польща (вся країна)" : "Poland (Nationwide)";
  
  // Return first word capitalized if nothing matches
  return location.split(",")[0].split("/")[0].trim();
}

const locationColors: Record<string, string> = {
  "Warszawa": "#2D6A4F",
  "Kraków": "#C9705F",
  "Wrocław": "#5B8FB9",
  "Poznań": "#D4A574",
  "Gdańsk": "#7C9885",
  "Remote": "#8B7355",
  "Zdalnie": "#8B7355",
  "Віддалено": "#8B7355",
  "Poland (Nationwide)": "#6B7280",
  "Polska (cały kraj)": "#6B7280",
  "Польща (вся країна)": "#6B7280",
  "Remote / Unspecified": "#8B7355",
  "Zdalnie / Nieokreślone": "#8B7355",
  "Віддалено / Не вказано": "#8B7355",
};

function getLocationColor(location: string): string {
  return locationColors[location] || "#57534E";
}

export default function JobsPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [search, setSearch] = useState("");
  const t = translations[lang];

  const filteredJobs = useMemo(() => {
    return (jobsData as Job[]).filter(job => 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.keywords.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const groupedJobs = useMemo(() => {
    const groups: Record<string, Job[]> = {};
    filteredJobs.forEach(job => {
      const location = normalizeLocation(job.location, lang);
      if (!groups[location]) groups[location] = [];
      groups[location].push(job);
    });
    // Sort by number of jobs (descending)
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [filteredJobs, lang]);

  return (
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332] font-sans">
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
            <Link href="/articles" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">{t.navArticles}</Link>
            <Link href="/jobs" className="px-4 py-2 text-white bg-[#2D6A4F] rounded-lg">{t.navJobs}</Link>
          </nav>
          <div className="flex items-center bg-[#E7E5E4] rounded-lg p-1 text-sm">
            <button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded-md transition-all ${lang === "en" ? "bg-white text-[#1B4332] shadow-sm" : "text-[#2D6A4F] hover:text-[#1B4332]"}`}>EN</button>
            <button onClick={() => setLang("pl")} className={`px-3 py-1.5 rounded-md transition-all ${lang === "pl" ? "bg-white text-[#1B4332] shadow-sm" : "text-[#2D6A4F] hover:text-[#1B4332]"}`}>PL</button>
            <button onClick={() => setLang("ua")} className={`px-3 py-1.5 rounded-md transition-all ${lang === "ua" ? "bg-white text-[#1B4332] shadow-sm" : "text-[#2D6A4F] hover:text-[#1B4332]"}`}>UA</button>
          </div>
        </div>
      </header>

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1B4332] mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-lg text-[#2D6A4F]">
              {t.pageSubtitle}
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#2D6A4F]">🔍</span>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#E7E5E4] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <p className="mt-4 text-sm text-[#2D6A4F] text-center">
              {t.totalJobs.replace("{count}", filteredJobs.length.toString())}
            </p>
          </div>

          {groupedJobs.length > 0 ? (
            <div className="space-y-12">
              {groupedJobs.map(([location, jobs]) => (
                <section key={location}>
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getLocationColor(location) }}
                    />
                    <h2 className="text-xl font-bold text-[#1B4332]">
                      {location}
                    </h2>
                    <span className="text-sm text-[#57534E] bg-[#E7E5E4] px-2 py-0.5 rounded-full">
                      {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs.map((job, idx) => (
                      <JobCard key={idx} job={job} t={t} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#E7E5E4]">
              <p className="text-[#57534E]">{t.noJobs}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-200 py-10 bg-white mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>Prosvasimi &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
