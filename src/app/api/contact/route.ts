import { NextResponse } from "next/server";

// POST /api/contact
export async function POST(req: Request) {
  try {
    const url = process.env.CONTACT_APPS_SCRIPT_URL || process.env.WAITLIST_APPS_SCRIPT_URL;
    if (!url) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const { name, email, message, lang, createdAt } = (await req.json()) as {
      name?: string;
      email?: string;
      message?: string;
      lang?: string;
      createdAt?: string;
    };

    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const payload = {
      type: "contact_message",
      name: name ?? "",
      email,
      message,
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

    if (res.status === 302 || res.ok) {
      const data = await res.json().catch(() => ({ success: true }));
      return NextResponse.json({ ok: true, ...data }, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const text = await res.text();
    return NextResponse.json({ error: "Upstream error", details: text }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
