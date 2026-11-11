import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Inclusive Technology Foundation",
  description: "Fundacja Prosvásimi combines practical AI services for businesses with accessible education and employment for people with disabilities.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Inclusive Technology Foundation", description: "Fundacja Prosvásimi combines practical AI services for businesses with accessible education and employment for people with disabilities.", url: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
