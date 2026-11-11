import type { MetadataRoute } from "next";

const SITE_URL = "https://www.prosvasimi.com";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/for-businesses", priority: 0.9 },
  { path: "/academy", priority: 0.9 },
  { path: "/careers", priority: 0.8 },
  { path: "/ai-evaluation", priority: 0.8 },
  { path: "/case-studies", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/articles", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
