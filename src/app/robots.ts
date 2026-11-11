import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/account", "/user", "/login", "/register", "/unsplash-picker"],
    },
    sitemap: "https://www.prosvasimi.com/sitemap.xml",
  };
}
