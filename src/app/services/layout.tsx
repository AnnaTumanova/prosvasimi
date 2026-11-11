import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Services for Small Business",
  description: "AI automation, AI assistants and data analytics for small businesses with 5–50 employees. Start with an AI Discovery call and a practical roadmap.",
  alternates: { canonical: "/services" },
  openGraph: { title: "AI Automation Services for Small Business", description: "AI automation, AI assistants and data analytics for small businesses with 5–50 employees. Start with an AI Discovery call and a practical roadmap.", url: "/services" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
