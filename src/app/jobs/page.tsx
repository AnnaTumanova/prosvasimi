"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
  },
};

function JobCard({ job, t }: { job: Job; t: Record<string, string> }) {
  return (
    <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{job.title}</h3>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {job.source}
          </span>
        </div>
        
        <div className="space-y-2 mb-6 flex-grow">
          {job.company && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-slate-400">🏢</span>
              <span>{job.company}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-slate-400">📍</span>
            <span>{job.location || t.remote}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {job.keywords.split(',').slice(0, 3).map((kw, i) => (
              <span key={i} className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {kw.trim()}
              </span>
            ))}
          </div>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex justify-center items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          {t.apply}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
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

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">P</div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-lg">Prosvasimi</div>
              <div className="text-xs text-slate-500">{t.brandTagline}</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/" className="hover:text-slate-700">{t.navHome}</Link>
            <Link href="/offer" className="hover:text-slate-700">{lang === "en" ? "What We Offer" : lang === "ua" ? "Що ми пропонуємо" : "Co oferujemy"}</Link>
            <Link href="/articles" className="hover:text-slate-700">{t.navArticles}</Link>
            <Link href="/jobs" className="text-slate-900 font-medium underline underline-offset-8 decoration-2 decoration-slate-900">{t.navJobs}</Link>
          </nav>
          <div className="flex items-center gap-1 text-sm text-slate-600">
            <button onClick={() => setLang("en")} className={`px-2 py-1 rounded ${lang === "en" ? "text-slate-900 font-medium bg-slate-100" : "hover:text-slate-900"}`}>EN</button>
            <span>·</span>
            <button onClick={() => setLang("pl")} className={`px-2 py-1 rounded ${lang === "pl" ? "text-slate-900 font-medium bg-slate-100" : "hover:text-slate-900"}`}>PL</button>
            <span>·</span>
            <button onClick={() => setLang("ua")} className={`px-2 py-1 rounded ${lang === "ua" ? "text-slate-900 font-medium bg-slate-100" : "hover:text-slate-900"}`}>UA</button>
          </div>
        </div>
      </header>

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-lg text-slate-600">
              {t.pageSubtitle}
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">🔍</span>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <p className="mt-4 text-sm text-slate-500 text-center">
              {t.totalJobs.replace("{count}", filteredJobs.length.toString())}
            </p>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, idx) => (
                <JobCard key={idx} job={job} t={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-500">{t.noJobs}</p>
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
