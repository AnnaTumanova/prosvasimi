import { NextResponse } from "next/server";

// POST /api/workshop-register
export async function POST(req: Request) {
  try {
    const url = process.env.WORKSHOP_APPS_SCRIPT_URL;
    if (!url) {
      console.error("Workshop registration: No Apps Script URL configured");
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

    // Format payload to be compatible with existing waitlist script
    // Using 'role' field to identify workshop registrations
    const payload = {
      type: "workshop_registration",
      name: name ?? "",
      email,
      role: `workshop:${workshopId}`, // This allows existing scripts to store it
      workshopId,
      workshopTitle: workshopTitle ?? "",
      lang: lang ?? "en",
      createdAt: createdAt ?? new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "",
      ip: req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "",
    };

    console.log("Workshop registration payload:", JSON.stringify(payload));

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Google Apps Script returns 302 redirect on success, handle that
    if (res.status === 302 || res.ok) {
      const data = await res.json().catch(() => ({ success: true }));
      return NextResponse.json({ ok: true, ...data }, {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    const text = await res.text();
    console.error("Workshop registration upstream error:", res.status, text);
    return NextResponse.json({ error: "Upstream error", details: text }, { status: 502 });
  } catch (err) {
    console.error("Workshop registration error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
