import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inclusive AI Academy — Accessible AI Training",
  description: "Accessible AI, data and automation training for people with disabilities. Three career tracks, practical projects and mentoring. Register your interest.",
  alternates: { canonical: "/academy" },
  openGraph: { title: "Inclusive AI Academy — Accessible AI Training", description: "Accessible AI, data and automation training for people with disabilities. Three career tracks, practical projects and mentoring. Register your interest.", url: "/academy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
