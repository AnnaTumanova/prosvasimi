"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { detectBrowserLanguage, type Lang } from "@/lib/language";

const STORAGE_KEY = "prosvasimi-lang";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
} | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    const next = stored === "en" || stored === "pl" || stored === "ua" ? stored : detectBrowserLanguage();
    setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors (private browsing, disabled storage, etc.)
    }
  };

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLang(): [Lang, (lang: Lang) => void] {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return [ctx.lang, ctx.setLang];
}
