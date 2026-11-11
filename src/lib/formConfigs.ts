import type { Lang } from "@/lib/language";
import type { FormField } from "@/components/InquiryForm";

// Field sets for each intake path. Shared between the dedicated landing pages
// (For Businesses, Academy, Careers) and the Contact page so the same form
// always collects the same data.
//
// Candidate and Academy forms deliberately never ask for a diagnosis or medical
// information — only optional, free-text accommodation needs.

type FormConfig = {
  type: string;
  fields: FormField[];
  cta: string;
  successTitle: string;
  successMessage: string;
  note?: string;
};

export function businessInquiry(lang: Lang): FormConfig {
  const t = {
    en: {
      company: "Company name", website: "Website", industry: "Industry", size: "Number of employees",
      challenge: "Current business challenge", tools: "Current tools", toolsPh: "e.g. Gmail, Excel, HubSpot, Shopify",
      automate: "What would you like to automate or improve?", service: "Service of interest",
      budget: "Approximate budget", name: "Your name", email: "Work email",
      industries: ["E-commerce", "Professional services", "Logistics", "Agency / marketing", "Other"],
      services: ["Not sure yet — AI Discovery", "AI Automation", "AI Assistants & Knowledge Systems", "Data Analytics & BI", "AI Evaluation"],
      budgets: ["Under €2,000", "€2,000–5,000", "€5,000–15,000", "Over €15,000", "Not sure yet"],
      cta: "Request an AI consultation",
      successTitle: "Request received",
      successMessage: "Thank you. We'll review your challenge and reply within two business days to arrange a discovery call.",
    },
    pl: {
      company: "Nazwa firmy", website: "Strona internetowa", industry: "Branża", size: "Liczba pracowników",
      challenge: "Obecne wyzwanie biznesowe", tools: "Obecnie używane narzędzia", toolsPh: "np. Gmail, Excel, HubSpot, Shopify",
      automate: "Co chcesz zautomatyzować lub usprawnić?", service: "Interesująca usługa",
      budget: "Przybliżony budżet", name: "Imię i nazwisko", email: "Służbowy e-mail",
      industries: ["E-commerce", "Usługi profesjonalne", "Logistyka", "Agencja / marketing", "Inna"],
      services: ["Jeszcze nie wiem — AI Discovery", "Automatyzacja AI", "Asystenci AI i systemy wiedzy", "Analityka danych i BI", "Ewaluacja AI"],
      budgets: ["Poniżej 8 000 zł", "8 000–20 000 zł", "20 000–60 000 zł", "Powyżej 60 000 zł", "Jeszcze nie wiem"],
      cta: "Poproś o konsultację AI",
      successTitle: "Zgłoszenie przyjęte",
      successMessage: "Dziękujemy. Przeanalizujemy Twoje wyzwanie i w ciągu dwóch dni roboczych odezwiemy się, aby umówić rozmowę.",
    },
    ua: {
      company: "Назва компанії", website: "Вебсайт", industry: "Галузь", size: "Кількість працівників",
      challenge: "Поточний бізнес-виклик", tools: "Інструменти, якими користуєтеся", toolsPh: "напр. Gmail, Excel, HubSpot, Shopify",
      automate: "Що ви хочете автоматизувати чи покращити?", service: "Послуга, що цікавить",
      budget: "Орієнтовний бюджет", name: "Ваше ім'я", email: "Робоча пошта",
      industries: ["E-commerce", "Професійні послуги", "Логістика", "Агенція / маркетинг", "Інше"],
      services: ["Ще не знаю — AI Discovery", "AI-автоматизація", "AI-асистенти та системи знань", "Аналітика даних і BI", "Оцінювання AI"],
      budgets: ["До €2 000", "€2 000–5 000", "€5 000–15 000", "Понад €15 000", "Ще не знаю"],
      cta: "Запросити AI-консультацію",
      successTitle: "Запит отримано",
      successMessage: "Дякуємо. Ми розглянемо ваш запит і протягом двох робочих днів зв'яжемося, щоб домовитися про дзвінок.",
    },
  }[lang];

  return {
    type: "business-inquiry",
    fields: [
      { name: "company", label: t.company, required: true },
      { name: "website", label: t.website, type: "url", placeholder: "https://" },
      { name: "industry", label: t.industry, type: "select", options: t.industries },
      { name: "companySize", label: t.size, type: "select", options: ["1–4", "5–20", "21–50", "51–200", "200+"] },
      { name: "challenge", label: t.challenge, type: "textarea", required: true },
      { name: "tools", label: t.tools, placeholder: t.toolsPh, full: true },
      { name: "automate", label: t.automate, type: "textarea" },
      { name: "service", label: t.service, type: "select", options: t.services },
      { name: "budget", label: t.budget, type: "select", options: t.budgets },
      { name: "name", label: t.name, required: true },
      { name: "email", label: t.email, type: "email", required: true, placeholder: "you@company.com" },
    ],
    cta: t.cta,
    successTitle: t.successTitle,
    successMessage: t.successMessage,
  };
}

export function academyApplication(lang: Lang): FormConfig {
  const t = {
    en: {
      name: "Name", email: "Email", country: "Country", track: "Preferred career track",
      skills: "Current digital skills", goals: "Learning goals", format: "Preferred learning format",
      access: "Accessibility requirements",
      accessHint: "Tell us what would help you learn — e.g. captions, screen-reader-friendly materials, flexible pace. You never need to share a diagnosis or medical information.",
      tracks: ["AI Operations Specialist (beginner)", "Junior Data Analyst (intermediate)", "Junior AI Automation Specialist (technical)", "Not sure yet"],
      skillLevels: ["Basic — email, documents, browsing", "Intermediate — spreadsheets, online tools", "Advanced — some coding, data or automation", "Not sure"],
      formats: ["Fully online", "Hybrid (online + Warsaw)", "No preference"],
      cta: "Register your interest",
      successTitle: "Thank you for registering",
      successMessage: "We've received your interest in the Inclusive AI Academy. We'll email you when pilot recruitment opens, with next steps.",
    },
    pl: {
      name: "Imię i nazwisko", email: "E-mail", country: "Kraj", track: "Preferowana ścieżka",
      skills: "Obecne umiejętności cyfrowe", goals: "Cele nauki", format: "Preferowana forma nauki",
      access: "Potrzeby w zakresie dostępności",
      accessHint: "Napisz, co pomoże Ci się uczyć — np. napisy, materiały dostępne dla czytników ekranu, elastyczne tempo. Nigdy nie musisz podawać diagnozy ani informacji medycznych.",
      tracks: ["AI Operations Specialist (początkujący)", "Junior Data Analyst (średniozaawansowany)", "Junior AI Automation Specialist (techniczny)", "Jeszcze nie wiem"],
      skillLevels: ["Podstawowe — e-mail, dokumenty, internet", "Średnie — arkusze, narzędzia online", "Zaawansowane — trochę kodu, danych lub automatyzacji", "Nie wiem"],
      formats: ["W pełni online", "Hybrydowo (online + Warszawa)", "Bez preferencji"],
      cta: "Zgłoś zainteresowanie",
      successTitle: "Dziękujemy za zgłoszenie",
      successMessage: "Otrzymaliśmy Twoje zgłoszenie do Inclusive AI Academy. Napiszemy, gdy rozpocznie się rekrutacja do pilotażu.",
    },
    ua: {
      name: "Ім'я", email: "Електронна пошта", country: "Країна", track: "Бажаний кар'єрний трек",
      skills: "Поточні цифрові навички", goals: "Навчальні цілі", format: "Бажаний формат навчання",
      access: "Потреби щодо доступності",
      accessHint: "Розкажіть, що допоможе вам навчатися — напр. субтитри, матеріали для скрінрідерів, гнучкий темп. Вам ніколи не потрібно повідомляти діагноз чи медичну інформацію.",
      tracks: ["AI Operations Specialist (початковий)", "Junior Data Analyst (середній)", "Junior AI Automation Specialist (технічний)", "Ще не знаю"],
      skillLevels: ["Базові — пошта, документи, інтернет", "Середні — таблиці, онлайн-інструменти", "Просунуті — трохи коду, даних чи автоматизації", "Не знаю"],
      formats: ["Повністю онлайн", "Гібридно (онлайн + Варшава)", "Без різниці"],
      cta: "Зареєструвати інтерес",
      successTitle: "Дякуємо за реєстрацію",
      successMessage: "Ми отримали вашу заявку до Inclusive AI Academy. Напишемо, коли відкриється набір на пілотну програму.",
    },
  }[lang];

  return {
    type: "academy-application",
    fields: [
      { name: "name", label: t.name, required: true },
      { name: "email", label: t.email, type: "email", required: true },
      { name: "country", label: t.country },
      { name: "track", label: t.track, type: "select", options: t.tracks },
      { name: "skills", label: t.skills, type: "select", options: t.skillLevels },
      { name: "format", label: t.format, type: "select", options: t.formats },
      { name: "goals", label: t.goals, type: "textarea" },
      { name: "accessibility", label: t.access, type: "textarea", hint: t.accessHint },
    ],
    cta: t.cta,
    successTitle: t.successTitle,
    successMessage: t.successMessage,
  };
}

export function careerApplication(lang: Lang): FormConfig {
  const t = {
    en: {
      name: "Name", email: "Email", location: "Location", skills: "Skills", interests: "Professional interests",
      portfolio: "Portfolio or LinkedIn", availability: "Availability", format: "Preferred working format",
      access: "Workplace accommodations",
      accessHint: "Anything that helps you do your best work. Optional — we assess skills, not diagnoses.",
      availabilities: ["Full-time", "Part-time", "Project-based", "Flexible"],
      formats: ["Remote", "Hybrid (Warsaw)", "No preference"],
      cta: "Send application",
      successTitle: "Application received",
      successMessage: "Thank you. We'll review your skills and interests and get in touch when a matching project, role or training track opens.",
    },
    pl: {
      name: "Imię i nazwisko", email: "E-mail", location: "Lokalizacja", skills: "Umiejętności", interests: "Zainteresowania zawodowe",
      portfolio: "Portfolio lub LinkedIn", availability: "Dostępność", format: "Preferowana forma pracy",
      access: "Dostosowania w miejscu pracy",
      accessHint: "Wszystko, co pomaga Ci pracować najlepiej. Opcjonalnie — oceniamy umiejętności, nie diagnozy.",
      availabilities: ["Pełny etat", "Część etatu", "Projektowo", "Elastycznie"],
      formats: ["Zdalnie", "Hybrydowo (Warszawa)", "Bez preferencji"],
      cta: "Wyślij zgłoszenie",
      successTitle: "Zgłoszenie przyjęte",
      successMessage: "Dziękujemy. Przeanalizujemy Twoje umiejętności i zainteresowania i odezwiemy się, gdy pojawi się pasujący projekt, rola lub ścieżka szkoleniowa.",
    },
    ua: {
      name: "Ім'я", email: "Електронна пошта", location: "Місце проживання", skills: "Навички", interests: "Професійні інтереси",
      portfolio: "Портфоліо або LinkedIn", availability: "Доступність", format: "Бажаний формат роботи",
      access: "Пристосування на робочому місці",
      accessHint: "Усе, що допомагає вам працювати якнайкраще. Необов'язково — ми оцінюємо навички, а не діагнози.",
      availabilities: ["Повна зайнятість", "Часткова зайнятість", "Проєктна робота", "Гнучко"],
      formats: ["Віддалено", "Гібридно (Варшава)", "Без різниці"],
      cta: "Надіслати заявку",
      successTitle: "Заявку отримано",
      successMessage: "Дякуємо. Ми розглянемо ваші навички та інтереси і зв'яжемося, коли з'явиться відповідний проєкт, роль або навчальний трек.",
    },
  }[lang];

  return {
    type: "career-application",
    fields: [
      { name: "name", label: t.name, required: true },
      { name: "email", label: t.email, type: "email", required: true },
      { name: "location", label: t.location },
      { name: "portfolio", label: t.portfolio, type: "url", placeholder: "https://" },
      { name: "skills", label: t.skills, type: "textarea", required: true },
      { name: "interests", label: t.interests, type: "textarea" },
      { name: "availability", label: t.availability, type: "select", options: t.availabilities },
      { name: "format", label: t.format, type: "select", options: t.formats },
      { name: "accessibility", label: t.access, type: "textarea", hint: t.accessHint },
    ],
    cta: t.cta,
    successTitle: t.successTitle,
    successMessage: t.successMessage,
  };
}

export function partnershipInquiry(lang: Lang): FormConfig {
  const t = {
    en: {
      org: "Organisation", orgType: "Organisation type", name: "Your name", email: "Email",
      interest: "How would you like to collaborate?", message: "Message",
      types: ["Company / employer", "NGO / foundation", "Public institution", "University / training provider", "Other"],
      interests: ["Inclusive hiring", "Sponsoring Academy places", "Practical projects for trainees", "Mentoring", "Grant or programme partnership", "Other"],
      cta: "Send partnership inquiry",
      successTitle: "Thank you",
      successMessage: "We've received your partnership inquiry and will reply within a few business days.",
    },
    pl: {
      org: "Organizacja", orgType: "Typ organizacji", name: "Imię i nazwisko", email: "E-mail",
      interest: "W jaki sposób chcesz współpracować?", message: "Wiadomość",
      types: ["Firma / pracodawca", "NGO / fundacja", "Instytucja publiczna", "Uczelnia / organizator szkoleń", "Inna"],
      interests: ["Inkluzywna rekrutacja", "Finansowanie miejsc w Akademii", "Praktyczne projekty dla uczestników", "Mentoring", "Partnerstwo grantowe lub programowe", "Inne"],
      cta: "Wyślij zapytanie o partnerstwo",
      successTitle: "Dziękujemy",
      successMessage: "Otrzymaliśmy zapytanie o partnerstwo i odpowiemy w ciągu kilku dni roboczych.",
    },
    ua: {
      org: "Організація", orgType: "Тип організації", name: "Ваше ім'я", email: "Електронна пошта",
      interest: "Як ви хотіли б співпрацювати?", message: "Повідомлення",
      types: ["Компанія / роботодавець", "НГО / фонд", "Державна установа", "Університет / навчальний заклад", "Інше"],
      interests: ["Інклюзивний найм", "Фінансування місць в Академії", "Практичні проєкти для учасників", "Менторство", "Грантове чи програмне партнерство", "Інше"],
      cta: "Надіслати запит на партнерство",
      successTitle: "Дякуємо",
      successMessage: "Ми отримали ваш запит на партнерство і відповімо протягом кількох робочих днів.",
    },
  }[lang];

  return {
    type: "partnership-inquiry",
    fields: [
      { name: "organisation", label: t.org, required: true },
      { name: "organisationType", label: t.orgType, type: "select", options: t.types },
      { name: "name", label: t.name, required: true },
      { name: "email", label: t.email, type: "email", required: true },
      { name: "interest", label: t.interest, type: "select", options: t.interests, full: true },
      { name: "message", label: t.message, type: "textarea", required: true },
    ],
    cta: t.cta,
    successTitle: t.successTitle,
    successMessage: t.successMessage,
  };
}
