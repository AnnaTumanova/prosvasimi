"use client";

import { useState } from "react";
import Image from "next/image";

type UnsplashPhoto = {
  id: string;
  alt: string;
  urls: { regular: string; small: string; full: string };
  photoLink: string;
  photographerName: string;
  photographerLink: string;
};

export default function UnsplashPickerPage() {
  const [query, setQuery] = useState("people with disabilities");
  const [results, setResults] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function runSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/unsplash/search?query=${encodeURIComponent(query)}&perPage=15`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setError("Couldn't load results. Check that UNSPLASH_ACCESS_KEY is set.");
    } finally {
      setLoading(false);
    }
  }

  function copySnippet(photo: UnsplashPhoto) {
    const snippet = `url: "${photo.urls.regular}", attribution: "Photo by ${photo.photographerName} on Unsplash (${photo.photoLink})"`;
    navigator.clipboard.writeText(snippet);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div className="min-h-dvh bg-white text-[#0B2818] p-6 md:p-10">
      <h1 className="text-2xl font-bold">Unsplash picker (internal)</h1>
      <p className="mt-1 text-sm text-[#3F3C3A]">
        Search, preview, and copy the URL + required attribution for a photo. Not linked from site nav.
      </p>

      <form onSubmit={runSearch} className="mt-6 flex gap-3 max-w-xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-2 border-[#D9D9DC] rounded-lg px-4 py-2"
          placeholder="Search term"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-[#0B2818] text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {results.map((photo) => (
          <div key={photo.id} className="rounded-xl border-2 border-[#D9D9DC] overflow-hidden">
            <div className="relative aspect-[4/3] bg-[#F5F5F5]">
              <Image src={photo.urls.small} alt={photo.alt} fill className="object-cover" unoptimized />
            </div>
            <div className="p-2 text-xs">
              <p className="truncate text-[#3F3C3A]">
                by{" "}
                <a href={photo.photographerLink} target="_blank" rel="noreferrer" className="underline">
                  {photo.photographerName}
                </a>
              </p>
              <button
                onClick={() => copySnippet(photo)}
                className="mt-1 w-full rounded bg-[#F0F0F0] py-1 font-medium hover:bg-[#E5E5E5]"
              >
                {copiedId === photo.id ? "Copied!" : "Copy URL + attribution"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
