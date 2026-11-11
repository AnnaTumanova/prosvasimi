import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Inclusive Technology Jobs",
  description: "Skills-based recruitment, remote-friendly work and real AI and data projects. Join Prosvasimi's inclusive technology team.",
  alternates: { canonical: "/careers" },
  openGraph: { title: "Careers — Inclusive Technology Jobs", description: "Skills-based recruitment, remote-friendly work and real AI and data projects. Join Prosvasimi's inclusive technology team.", url: "/careers" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
