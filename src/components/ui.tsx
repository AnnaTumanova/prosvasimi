import React from "react";
import Link from "next/link";

// Shared building blocks for the marketing pages (Services, Academy, Careers,
// etc.) so every section uses the same type scale, spacing and card style.

export const ICON_PATHS = {
  arrowRight: "M13 7l5 5m0 0l-5 5m5-5H6",
  checkCircle: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  chat: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  chart: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  shieldCheck: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  academic: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
  briefcase: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
  heart: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  users: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  handshake: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  cog: "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495",
  globe: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  lightbulb: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z",
  trendingUp: "M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22M14.25 9h6.5v6.5",
  plus: "M12 4.5v15m7.5-7.5h-15",
} as const;

export function Icon({ path, className = "w-6 h-6" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export const btnPrimary =
  "inline-flex justify-center items-center gap-2 px-7 py-4 rounded-full bg-[#16A97A] text-white font-semibold hover:bg-[#12946a] transition-colors shadow-[0_8px_30px_rgba(22,169,122,0.35)]";
export const btnGhostDark =
  "inline-flex justify-center items-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors";
export const btnSolid =
  "inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-[#0F7A52] text-white font-semibold hover:bg-[#0B2818] transition-colors";
export const cardClass =
  "rounded-2xl border border-black/[0.06] p-7 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0B2818]">
      <div className="pointer-events-none absolute -top-40 -left-24 w-[34rem] h-[34rem] rounded-full bg-[#16A97A]/25 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute top-10 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#0F7A52]/30 blur-[110px]" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 relative">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/85 text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
            {eyebrow}
          </span>
          <h1 className="mt-8 text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.15] sm:leading-[1.08] text-white break-words">
            {title}
          </h1>
          {subtitle && <div className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl space-y-4">{subtitle}</div>}
          {children && <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  center = false,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl mb-14`}>
      <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight ${dark ? "text-white" : "text-[#0B2818]"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/65" : "text-[#3F3C3A]"}`}>{subtitle}</p>}
    </div>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[#0B2818]">
          <Icon path={ICON_PATHS.checkCircle} className="w-5 h-5 text-[#0F7A52] flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function IconCard({ icon, title, desc, href, cta }: { icon: string; title: string; desc: string; href?: string; cta?: string }) {
  const body = (
    <>
      <div className="w-11 h-11 rounded-xl bg-[#0F7A52]/10 flex items-center justify-center mb-5">
        <Icon path={icon} className="w-5 h-5 text-[#0F7A52]" />
      </div>
      <h3 className="text-lg font-semibold text-[#0B2818]">{title}</h3>
      <p className="mt-2 text-[15px] text-[#3F3C3A] leading-relaxed flex-1">{desc}</p>
      {cta && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F7A52]">
          {cta}
          <Icon path={ICON_PATHS.arrowRight} className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        className={`group ${cardClass} flex flex-col hover:shadow-[0_16px_40px_rgba(11,40,24,0.10)] hover:-translate-y-1 transition-all duration-300`}
      >
        {body}
      </Link>
    );
  }
  return <div className={`${cardClass} flex flex-col`}>{body}</div>;
}

export function Steps({ steps, dark = false }: { steps: { title: string; desc: string }[]; dark?: boolean }) {
  return (
    <ol className={`grid sm:grid-cols-2 ${steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-8`}>
      {steps.map((step, i) => (
        <li key={step.title}>
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold mb-5 ${
              dark ? "border border-white/15 bg-white/5 text-white" : "bg-[#0F7A52]/10 text-[#0F7A52]"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className={`text-lg font-semibold ${dark ? "text-white" : "text-[#0B2818]"}`}>{step.title}</h3>
          <p className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-white/60" : "text-[#3F3C3A]"}`}>{step.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-[#0B2818] [&::-webkit-details-marker]:hidden">
            {item.q}
            <Icon path={ICON_PATHS.plus} className="w-5 h-5 flex-shrink-0 text-[#0F7A52] transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-[15px] text-[#3F3C3A] leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

// Small label that marks content as a demonstration / illustrative example,
// so demo projects and sample metrics are never mistaken for client results.
export function DemoBadge({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
        dark ? "bg-white/10 text-white/75" : "bg-[#B45309]/10 text-[#92400E]"
      }`}
    >
      {label}
    </span>
  );
}
