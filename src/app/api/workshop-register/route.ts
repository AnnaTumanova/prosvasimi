import { NextResponse } from "next/server";

// POST /api/workshop-register
export async function POST(req: Request) {
  try {
    const url = process.env.WORKSHOP_APPS_SCRIPT_URL || process.env.WAITLIST_APPS_SCRIPT_URL;
    if (!url) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const { name, email, workshopId, workshopTitle, lang, createdAt } = (await req.json()) as {
      name?: string;
      email?: string;
      workshopId?: string;
      workshopTitle?: string;
      lang?: string;
      createdAt?: string;
    };

    // Basic validation
    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!workshopId) {
      return NextResponse.json({ error: "Workshop ID required" }, { status: 400 });
    }

    const payload = {
      type: "workshop_registration",
      name: name ?? "",
      email,
      workshopId,
      workshopTitle: workshopTitle ?? "",
      lang: lang ?? "en",
      createdAt: createdAt ?? new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "",
      ip: req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "",
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
