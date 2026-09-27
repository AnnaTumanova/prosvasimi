import { NextResponse } from "next/server";

// GET /api/unsplash/search?query=people+with+disabilities&page=1&perPage=12
export async function GET(req: Request) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("perPage") || "12";

  const upstream = new URL("https://api.unsplash.com/search/photos");
  upstream.searchParams.set("query", query);
  upstream.searchParams.set("page", page);
  upstream.searchParams.set("per_page", perPage);
  upstream.searchParams.set("orientation", searchParams.get("orientation") || "landscape");

  const res = await fetch(upstream, {
    headers: { Authorization: `Client-ID ${accessKey}` },
    // Unsplash API responses for a given query/page rarely change; cache briefly to save rate limit.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "Upstream error", details: text }, { status: 502 });
  }

  const data = await res.json();
  const results = (data.results ?? []).map((photo: {
    id: string;
    alt_description: string | null;
    description: string | null;
    urls: { regular: string; small: string; full: string };
    links: { html: string };
    user: { name: string; links: { html: string } };
  }) => ({
    id: photo.id,
    alt: photo.alt_description ?? photo.description ?? "",
    urls: photo.urls,
    photoLink: photo.links.html,
    photographerName: photo.user.name,
    photographerLink: photo.user.links.html,
  }));

  return NextResponse.json({ results, total: data.total ?? 0 }, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
