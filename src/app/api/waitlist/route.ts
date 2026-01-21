import { NextResponse } from "next/server";

// POST /api/waitlist
export async function POST(req: Request) {
  try {
    const url = process.env.WAITLIST_APPS_SCRIPT_URL;
    if (!url) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const { name, email, role, lang, createdAt } = (await req.json()) as {
      name?: string;
      email?: string;
      role?: "candidate" | "employer" | string;
      lang?: string;
      createdAt?: string;
    };

    // Basic validation
    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const payload = {
      name: name ?? "",
      email,
      role: role === "employer" ? "employer" : "candidate",
      lang: lang === "pl" ? "pl" : "en",
      createdAt: createdAt ?? new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "",
      ip: req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "",
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Apps Script endpoints are HTTPS; keep default redirect/credentials
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "Upstream error", details: text }, { status: 502 });
    }

    const data = await res.json().catch(() => ({}));

    return NextResponse.json({ ok: true, ...data }, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
