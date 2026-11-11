import Link from "next/link";
import Image from "next/image";
import type { Lang } from "@/lib/language";

type FooterLabels = {
  tagline: string;
  colStudio: string;
  colAcademy: string;
  colOrg: string;
  services: string;
  forBusinesses: string;
  aiEvaluation: string;
  caseStudies: string;
  academy: string;
  careers: string;
  partner: string;
  about: string;
  contact: string;
  legalTitle: string;
  legalNote: string;
  legalName: string;
  legalRegister: string;
  legalRegisterValue: string;
  legalKrs: string;
  legalNip: string;
  legalRegon: string;
  legalForm: string;
  legalFormValue: string;
};

const labels: Record<Lang, FooterLabels> = {
  en: {
    tagline: "Making AI practical. Making technology inclusive.",
    colStudio: "Inclusive AI Studio",
    colAcademy: "Academy & Careers",
    colOrg: "Prosvasimi",
    services: "AI Services",
    forBusinesses: "For Businesses",
    aiEvaluation: "AI Evaluation",
    caseStudies: "Case Studies",
    academy: "AI Academy",
    careers: "Careers",
    partner: "Become a partner",
    about: "About",
    contact: "Contact",
    legalTitle: "Registration Details",
    legalNote: "Inclusive AI Studio and Inclusive AI Academy are programmes of Fundacja Prosvásimi.",
    legalName: "Name",
    legalRegister: "Register",
    legalRegisterValue: "Register of Associations (KRS)",
    legalKrs: "KRS Number",
    legalNip: "NIP",
    legalRegon: "REGON",
    legalForm: "Legal Form",
    legalFormValue: "Foundation",
  },
  pl: {
    tagline: "AI w praktyce. Technologia bez barier.",
    colStudio: "Inclusive AI Studio",
    colAcademy: "Akademia i kariera",
    colOrg: "Prosvasimi",
    services: "Usługi AI",
    forBusinesses: "Dla firm",
    aiEvaluation: "Ewaluacja AI",
    caseStudies: "Case studies",
    academy: "Akademia AI",
    careers: "Kariera",
    partner: "Zostań partnerem",
    about: "O nas",
    contact: "Kontakt",
    legalTitle: "Dane rejestrowe",
    legalNote: "Inclusive AI Studio i Inclusive AI Academy to programy Fundacji Prosvásimi.",
    legalName: "Nazwa",
    legalRegister: "Rejestr",
    legalRegisterValue: "Rejestr Stowarzyszeń (KRS)",
    legalKrs: "Numer KRS",
    legalNip: "NIP",
    legalRegon: "REGON",
    legalForm: "Forma prawna",
    legalFormValue: "FUNDACJA",
  },
  ua: {
    tagline: "Практичний AI. Інклюзивні технології.",
    colStudio: "Inclusive AI Studio",
    colAcademy: "Академія і кар'єра",
    colOrg: "Prosvasimi",
    services: "AI-послуги",
    forBusinesses: "Для бізнесу",
    aiEvaluation: "Оцінювання AI",
    caseStudies: "Кейси",
    academy: "AI Академія",
    careers: "Кар'єра",
    partner: "Стати партнером",
    about: "Про нас",
    contact: "Контакти",
    legalTitle: "Реєстраційні дані",
    legalNote: "Inclusive AI Studio та Inclusive AI Academy — програми Fundacja Prosvásimi.",
    legalName: "Назва",
    legalRegister: "Реєстр",
    legalRegisterValue: "Реєстр об'єднань (KRS)",
    legalKrs: "Номер KRS",
    legalNip: "NIP",
    legalRegon: "REGON",
    legalForm: "Правова форма",
    legalFormValue: "ФУНДАЦІЯ",
  },
};

const linkClass = "text-[#3F3C3A] hover:text-[#0F7A52] transition-colors";

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = labels[lang];

  const columns = [
    {
      title: t.colStudio,
      links: [
        { href: "/services", label: t.services },
        { href: "/for-businesses", label: t.forBusinesses },
        { href: "/ai-evaluation", label: t.aiEvaluation },
        { href: "/case-studies", label: t.caseStudies },
      ],
    },
    {
      title: t.colAcademy,
      links: [
        { href: "/academy", label: t.academy },
        { href: "/careers", label: t.careers },
        { href: "/contact#partnership", label: t.partner },
      ],
    },
    {
      title: t.colOrg,
      links: [
        { href: "/about", label: t.about },
        { href: "/contact", label: t.contact },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#D9D9DC] bg-white py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/images/logo.png" alt="" width={28} height={28} />
              <span className="font-semibold text-[#0B2818]">Prosvasimi</span>
            </Link>
            <p className="mt-4 text-sm text-[#3F3C3A] max-w-xs">{t.tagline}</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#0B2818]">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#D9D9DC]">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0B2818]">{t.legalTitle}</h2>
          <p className="mt-2 text-sm text-[#3F3C3A]">{t.legalNote}</p>
          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt className="text-[#0F7A52]">{t.legalName}</dt>
              <dd className="mt-1 font-medium text-[#0B2818]">FUNDACJA PROSVÁSIMI</dd>
            </div>
            <div>
              <dt className="text-[#0F7A52]">{t.legalRegister}</dt>
              <dd className="mt-1 font-medium text-[#0B2818]">{t.legalRegisterValue}</dd>
            </div>
            <div>
              <dt className="text-[#0F7A52]">{t.legalKrs}</dt>
              <dd className="mt-1 font-medium text-[#0B2818]">0001231234</dd>
            </div>
            <div>
              <dt className="text-[#0F7A52]">{t.legalNip}</dt>
              <dd className="mt-1 font-medium text-[#0B2818]">5214158994</dd>
            </div>
            <div>
              <dt className="text-[#0F7A52]">{t.legalRegon}</dt>
              <dd className="mt-1 font-medium text-[#0B2818]">54433801900000</dd>
            </div>
            <div>
              <dt className="text-[#0F7A52]">{t.legalForm}</dt>
              <dd className="mt-1 font-medium text-[#0B2818]">{t.legalFormValue}</dd>
            </div>
          </dl>
          <p className="mt-8 text-sm text-[#3F3C3A]">© {new Date().getFullYear()} Fundacja Prosvásimi</p>
        </div>
      </div>
    </footer>
  );
}
