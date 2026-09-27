"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";
import SiteHeader from "@/components/SiteHeader";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    logout: "Log out",
    loading: "Loading your account...",
    signedIn: "Signed in",
    title: "Welcome to your account",
    signedInAs: "You are signed in as",
    completeProfile: "Complete your client profile",
    browseJobs: "See what we offer",
    analysisTitle: "Your career analysis",
    analysisSubtitle: "Based on the resume and answers you submitted.",
    noAnalysis: "No career analysis found yet.",
    jobsTitle: "5 job positions to consider",
    jobsSubtitle: "Matched to your resume and preferences — a starting point for where to apply.",
    searchRole: "Search this role on LinkedIn",
  },
  pl: {
    logout: "Wyloguj się",
    loading: "Ładowanie konta...",
    signedIn: "Zalogowano",
    title: "Witaj na swoim koncie",
    signedInAs: "Jesteś zalogowany jako",
    completeProfile: "Uzupełnij profil klienta",
    browseJobs: "Zobacz co oferujemy",
    analysisTitle: "Twoja analiza kariery",
    analysisSubtitle: "Na podstawie przesłanego CV i odpowiedzi.",
    noAnalysis: "Nie znaleziono jeszcze analizy kariery.",
    jobsTitle: "5 stanowisk do rozważenia",
    jobsSubtitle: "Dopasowane do Twojego CV i preferencji — punkt wyjścia, gdzie aplikować.",
    searchRole: "Szukaj tej roli na LinkedIn",
  },
  ua: {
    logout: "Вийти",
    loading: "Завантаження акаунта...",
    signedIn: "Ви увійшли",
    title: "Ласкаво просимо до вашого акаунта",
    signedInAs: "Ви увійшли як",
    completeProfile: "Заповнити профіль клієнта",
    browseJobs: "Переглянути наші пропозиції",
    analysisTitle: "Ваш аналіз кар'єри",
    analysisSubtitle: "На основі завантаженого резюме та відповідей.",
    noAnalysis: "Ще не знайдено аналізу кар'єри.",
    jobsTitle: "5 вакансій, які варто розглянути",
    jobsSubtitle: "Підібрані на основі вашого резюме та вподобань — відправна точка, де подавати заявку.",
    searchRole: "Шукати цю роль на LinkedIn",
  },
};

type JobSuggestion = { title: string; reason: string };

export default function AccountPage() {
  const router = useRouter();
  const [lang, setLang] = useLang();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [jobSuggestions, setJobSuggestions] = useState<JobSuggestion[]>([]);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoading(false);

      if (!data.user) {
        router.push("/login");
      }
    };

    loadUser();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const loadAnalysis = async () => {
      setAnalysisLoading(true);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) return;

        const res = await fetch("/api/career-analysis", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const result = (await res.json()) as {
          analysis?: { analysis_text?: string; job_suggestions?: JobSuggestion[] };
        };
        setAnalysis(result.analysis?.analysis_text ?? null);
        setJobSuggestions(result.analysis?.job_suggestions ?? []);
      } finally {
        setAnalysisLoading(false);
      }
    };

    loadAnalysis();
  }, [user]);

  return (
    <div className="min-h-dvh bg-[#FFFFFF] text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-[#D9D9DC] shadow-sm">
          {isLoading ? (
            <p className="text-[#0F7A52]">{t.loading}</p>
          ) : user ? (
            <>
              <span className="inline-flex px-4 py-2 rounded-lg bg-[#16A97A]/10 text-[#0F7A52] text-sm font-medium">{t.signedIn}</span>
              <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tighter">{t.title}</h1>
              <p className="mt-4 text-[#0F7A52]">{t.signedInAs} {user.email}.</p>

              {analysisLoading ? (
                <p className="mt-6 text-sm text-[#0F7A52]">{t.loading}</p>
              ) : analysis ? (
                <>
                  <div className="mt-6 rounded-xl bg-[#F4F4F5] p-6">
                    <h2 className="text-lg font-bold text-[#0B2818]">{t.analysisTitle}</h2>
                    <p className="mt-1 text-sm text-[#0F7A52]">{t.analysisSubtitle}</p>
                    <div className="mt-4 text-[#3F3C3A] leading-relaxed whitespace-pre-wrap">{analysis}</div>
                  </div>

                  {jobSuggestions.length > 0 && (
                    <div className="mt-6">
                      <h2 className="text-lg font-bold text-[#0B2818]">{t.jobsTitle}</h2>
                      <p className="mt-1 text-sm text-[#0F7A52]">{t.jobsSubtitle}</p>
                      <div className="mt-4 grid sm:grid-cols-2 gap-4">
                        {jobSuggestions.map((job, i) => (
                          <div key={i} className="rounded-xl border-2 border-[#D9D9DC] p-5">
                            <h3 className="font-bold text-[#0B2818]">{job.title}</h3>
                            <p className="mt-2 text-sm text-[#3F3C3A] leading-relaxed">{job.reason}</p>
                            <a
                              href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F7A52] hover:text-[#0B2818] transition-colors"
                            >
                              {t.searchRole}
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : null}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/user" className="inline-flex justify-center px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-bold hover:bg-[#0B2818] transition-colors">{t.completeProfile}</Link>
                <Link href="/offer" className="inline-flex justify-center px-6 py-4 rounded-xl border-2 border-[#D9D9DC] text-[#0B2818] font-medium hover:border-[#0F7A52] transition-colors">{t.browseJobs}</Link>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
