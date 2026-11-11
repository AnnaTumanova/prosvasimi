import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Evaluation Services — Human + Automated Testing",
  description: "Structured human and automated evaluation for AI assistants, chatbots and RAG systems: accuracy, language quality and safety, with an AI Quality Report.",
  alternates: { canonical: "/ai-evaluation" },
  openGraph: { title: "AI Evaluation Services — Human + Automated Testing", description: "Structured human and automated evaluation for AI assistants, chatbots and RAG systems: accuracy, language quality and safety, with an AI Quality Report.", url: "/ai-evaluation" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
