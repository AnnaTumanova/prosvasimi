import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Prosvasimi about AI services, the Inclusive AI Academy, partnerships or career support.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact", description: "Contact Prosvasimi about AI services, the Inclusive AI Academy, partnerships or career support.", url: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
