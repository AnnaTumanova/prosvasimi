import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & AI Demo Projects",
  description: "Demonstration projects for invoice automation, an internal RAG knowledge assistant and an e-commerce BI dashboard.",
  alternates: { canonical: "/case-studies" },
  openGraph: { title: "Case Studies & AI Demo Projects", description: "Demonstration projects for invoice automation, an internal RAG knowledge assistant and an e-commerce BI dashboard.", url: "/case-studies" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
