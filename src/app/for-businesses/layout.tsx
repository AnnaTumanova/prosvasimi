import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI for Small Businesses — Automation & Assistants",
  description: "Practical AI and automation for e-commerce, professional services, logistics and agencies. No internal AI team needed. Request a free AI consultation.",
  alternates: { canonical: "/for-businesses" },
  openGraph: { title: "AI for Small Businesses — Automation & Assistants", description: "Practical AI and automation for e-commerce, professional services, logistics and agencies. No internal AI team needed. Request a free AI consultation.", url: "/for-businesses" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
