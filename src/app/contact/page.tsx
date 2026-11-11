"use client";

import React, { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InquiryForm from "@/components/InquiryForm";
import { ICON_PATHS, Icon, PageHero } from "@/components/ui";
import { academyApplication, businessInquiry, partnershipInquiry } from "@/lib/formConfigs";
import type { Lang } from "@/lib/language";
import { useLang } from "@/lib/LanguageContext";

type Intent = "business" | "academy" | "partnership" | "general";
const INTENTS: Intent[] = ["business", "academy", "partnership", "general"];

const translations: Record<Lang, Record<string, string>> = {
  en: {
    tagline: "Contact",
    title: "How can we help?",
    subtitle: "Choose what you're contacting us about so your message reaches the right person.",
    choose: "What are you contacting us about?",
    business: "Business inquiry",
    businessDesc: "AI services for your company",
    academy: "Academy application",
    academyDesc: "Interest in training",
    partnership: "Partnership",
    partnershipDesc: "NGOs, employers, sponsors",
    general: "Other",
    generalDesc: "Career support and anything else",
    directTitle: "Direct contact",
    email: "Email",
    org: "Organisation",
    location: "Location",
    locationValue: "Warsaw, Poland",
    languages: "Languages",
    languagesValue: "English, Polish, Ukrainian",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formMessagePlaceholder: "Tell us what you need...",
    formErrEmail: "Please enter a valid email address.",
    formErrMessage: "Please enter a message.",
    submit: "Send Message",
    submitting: "Sending...",
    successTitle: "Message sent!",
    successMsg: "Thank you for reaching out. We'll get back to you soon.",
    error: "Something went wrong. Please try again later.",
  },
  pl: {
    tagline: "Kontakt",
    title: "Jak możemy pomóc?",
    subtitle: "Wybierz temat wiadomości, aby trafiła do właściwej osoby.",
    choose: "W jakiej sprawie się kontaktujesz?",
    business: "Zapytanie biznesowe",
    businessDesc: "Usługi AI dla Twojej firmy",
    academy: "Zgłoszenie do Akademii",
    academyDesc: "Zainteresowanie szkoleniem",
    partnership: "Partnerstwo",
    partnershipDesc: "NGO, pracodawcy, sponsorzy",
    general: "Inne",
    generalDesc: "Wsparcie kariery i inne sprawy",
    directTitle: "Kontakt bezpośredni",
    email: "E-mail",
    org: "Organizacja",
    location: "Lokalizacja",
    locationValue: "Warszawa, Polska",
    languages: "Języki",
    languagesValue: "angielski, polski, ukraiński",
    formName: "Imię",
    formEmail: "E-mail",
    formMessage: "Wiadomość",
    formMessagePlaceholder: "Napisz, czego potrzebujesz...",
    formErrEmail: "Podaj poprawny adres e-mail.",
    formErrMessage: "Wpisz wiadomość.",
    submit: "Wyślij wiadomość",
    submitting: "Wysyłanie...",
    successTitle: "Wiadomość wysłana!",
    successMsg: "Dziękujemy za kontakt. Odpowiemy wkrótce.",
    error: "Coś poszło nie tak. Spróbuj ponownie później.",
  },
  ua: {
    tagline: "Контакти",
    title: "Чим ми можемо допомогти?",
    subtitle: "Оберіть тему звернення, щоб повідомлення потрапило до потрібної людини.",
    choose: "З якого питання ви звертаєтеся?",
    business: "Бізнес-запит",
    businessDesc: "AI-послуги для вашої компанії",
    academy: "Заявка до Академії",
    academyDesc: "Інтерес до навчання",
    partnership: "Партнерство",
    partnershipDesc: "НГО, роботодавці, спонсори",
    general: "Інше",
    generalDesc: "Кар'єрна підтримка та інші питання",
    directTitle: "Прямий контакт",
    email: "Електронна пошта",
    org: "Організація",
    location: "Місце",
    locationValue: "Варшава, Польща",
    languages: "Мови",
    languagesValue: "англійська, польська, українська",
    formName: "Ім'я",
    formEmail: "Електронна пошта",
    formMessage: "Повідомлення",
    formMessagePlaceholder: "Напишіть, що вам потрібно...",
    formErrEmail: "Будь ласка, введіть дійсну адресу електронної пошти.",
    formErrMessage: "Будь ласка, введіть повідомлення.",
    submit: "Надіслати повідомлення",
    submitting: "Надсилання...",
    successTitle: "Повідомлення надіслано!",
    successMsg: "Дякуємо за звернення. Ми скоро відповімо.",
    error: "Щось пішло не так. Спробуйте пізніше.",
  },
};

const INTENT_ICONS: Record<Intent, string> = {
  business: ICON_PATHS.briefcase,
  academy: ICON_PATHS.academic,
  partnership: ICON_PATHS.handshake,
  general: ICON_PATHS.chat,
};

function GeneralMessageForm({ t, lang }: { t: Record<string, string>; lang: Lang }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");

    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr(t.formErrEmail);
      return;
    }
    if (!message.trim()) {
      setErr(t.formErrMessage);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, lang, createdAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSubmitted(true);
    } catch {
      setErr(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-black/[0.12] focus:border-[#0F7A52] focus:ring-1 focus:ring-[#0F7A52] outline-none transition-colors text-[15px]";

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {submitted ? (
        <div className="rounded-xl bg-[#16A97A]/10 text-[#0B2818] p-6 border border-[#16A97A]/20" role="status">
          <p className="font-semibold">{t.successTitle}</p>
          <p className="mt-1 text-sm text-[#0F7A52]">{t.successMsg}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="general-name" className="block text-sm font-medium text-[#0B2818] mb-2">{t.formName}</label>
              <input id="general-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="general-email" className="block text-sm font-medium text-[#0B2818] mb-2">{t.formEmail}</label>
              <input id="general-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
            </div>
          </div>
          <div>
            <label htmlFor="general-message" className="block text-sm font-medium text-[#0B2818] mb-2">{t.formMessage}</label>
            <textarea id="general-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className={`${inputClass} resize-none`} placeholder={t.formMessagePlaceholder} required />
          </div>
          <div role="alert" className="empty:hidden text-sm text-[#B91C1C]">{err}</div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex justify-center items-center gap-2 w-full px-6 py-4 rounded-xl bg-[#0F7A52] text-white font-semibold hover:bg-[#0B2818] transition-colors disabled:opacity-60"
          >
            {submitting ? t.submitting : t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [lang, setLang] = useLang();
  const [intent, setIntent] = useState<Intent>("business");
  const t = translations[lang];

  // Deep links such as /contact#partnership open the matching form.
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "") as Intent;
      if (INTENTS.includes(hash)) setIntent(hash);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const select = (next: Intent) => {
    setIntent(next);
    window.history.replaceState(null, "", `#${next}`);
  };

  return (
    <div className="min-h-dvh bg-white text-[#0B2818]">
      <SiteHeader lang={lang} setLang={setLang} />

      <main id="main-content">
        <PageHero eyebrow={t.tagline} title={t.title} subtitle={<p>{t.subtitle}</p>} />

        <section className="py-20 md:py-28 bg-[#FAFAF9]">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
            <div>
              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-wide text-[#0F7A52] mb-4">{t.choose}</legend>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {INTENTS.map((key) => (
                    <label
                      key={key}
                      className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#0F7A52] ${
                        intent === key ? "border-[#0F7A52] bg-white shadow-sm" : "border-black/[0.08] bg-white/60 hover:bg-white"
                      }`}
                    >
                      <input type="radio" name="intent" value={key} checked={intent === key} onChange={() => select(key)} className="sr-only" />
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${intent === key ? "bg-[#0F7A52] text-white" : "bg-[#0F7A52]/10 text-[#0F7A52]"}`}>
                        <Icon path={INTENT_ICONS[key]} className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-[#0B2818]">{t[key]}</span>
                        <span className="block text-sm text-[#3F3C3A]">{t[`${key}Desc`]}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-10">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0F7A52]">{t.directTitle}</h2>
                <dl className="mt-4 space-y-3 text-[15px]">
                  <div>
                    <dt className="text-[#5B5754]">{t.email}</dt>
                    <dd><a href="mailto:kontakt@prosvasimi.com" className="font-medium text-[#0B2818] underline decoration-[#0F7A52]/40 hover:decoration-[#0F7A52]">kontakt@prosvasimi.com</a></dd>
                  </div>
                  <div>
                    <dt className="text-[#5B5754]">{t.org}</dt>
                    <dd className="font-medium text-[#0B2818]">Fundacja Prosvásimi · KRS 0001231234</dd>
                  </div>
                  <div>
                    <dt className="text-[#5B5754]">{t.location}</dt>
                    <dd className="font-medium text-[#0B2818]">{t.locationValue}</dd>
                  </div>
                  <div>
                    <dt className="text-[#5B5754]">{t.languages}</dt>
                    <dd className="font-medium text-[#0B2818]">{t.languagesValue}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div>
              {intent === "business" && <InquiryForm lang={lang} id="contact-business" bare {...businessInquiry(lang)} />}
              {intent === "academy" && <InquiryForm lang={lang} id="contact-academy" bare {...academyApplication(lang)} />}
              {intent === "partnership" && <InquiryForm lang={lang} id="contact-partnership" bare {...partnershipInquiry(lang)} />}
              {intent === "general" && <GeneralMessageForm t={t} lang={lang} />}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
