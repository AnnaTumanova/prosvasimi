import Link from "next/link";
import Image from "next/image";
import type { Lang } from "@/lib/language";

type FooterLabels = {
  about: string;
  products: string;
  cooperation: string;
  contact: string;
  legalTitle: string;
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
    about: "About Us",
    products: "Our Products",
    cooperation: "Cooperation",
    contact: "Contact",
    legalTitle: "Registration Details",
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
    about: "O nas",
    products: "Nasze produkty",
    cooperation: "Współpraca",
    contact: "Kontakt",
    legalTitle: "Dane rejestrowe",
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
    about: "Про нас",
    products: "Наші продукти",
    cooperation: "Співпраця",
    contact: "Контакти",
    legalTitle: "Реєстраційні дані",
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

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = labels[lang];

  return (
    <footer className="border-t border-[#D9D9DC] bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Prosvasimi" width={28} height={28} />
            <span className="font-medium text-[#0B2818]">Prosvasimi</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-[#0F7A52]">
            <Link href="/about" className="hover:text-[#0B2818] transition-colors">{t.about}</Link>
            <Link href="/products" className="hover:text-[#0B2818] transition-colors">{t.products}</Link>
            <Link href="/cooperation" className="hover:text-[#0B2818] transition-colors">{t.cooperation}</Link>
            <Link href="/contact" className="hover:text-[#0B2818] transition-colors">{t.contact}</Link>
          </nav>
          <p className="text-sm text-[#0F7A52]">© {new Date().getFullYear()} Prosvasimi</p>
        </div>

        <div className="mt-10 pt-8 border-t border-[#D9D9DC]">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#0B2818]">{t.legalTitle}</h3>
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
        </div>
      </div>
    </footer>
  );
}
