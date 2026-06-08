import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const MAX_CV_SIZE = 5 * 1024 * 1024;
const CV_BUCKET = "candidate-cvs";
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = String(formData.get("email") ?? "");
    const cv = formData.get("cv");

    if (!email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (cv instanceof File) {
      if (cv.size > MAX_CV_SIZE) {
        return NextResponse.json({ error: "CV file is too large" }, { status: 400 });
      }

      if (cv.type && !ALLOWED_CV_TYPES.has(cv.type)) {
        return NextResponse.json({ error: "Unsupported CV file type" }, { status: 400 });
      }
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    let cvPath: string | null = null;

    if (cv instanceof File) {
      const extension = cv.name.split(".").pop()?.toLowerCase() || "file";
      const safeEmail = email.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      cvPath = `${safeEmail}/${Date.now()}.${extension}`;
      const cvBuffer = await cv.arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from(CV_BUCKET)
        .upload(cvPath, cvBuffer, {
          contentType: cv.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json({ error: "Could not upload CV" }, { status: 500 });
      }
    }

    const payload = {
      name: String(formData.get("name") ?? ""),
      email,
      phone: String(formData.get("phone") ?? ""),
      location: String(formData.get("location") ?? ""),
      experience_level: String(formData.get("experienceLevel") ?? ""),
      job_field: String(formData.get("jobField") ?? ""),
      work_preference: String(formData.get("workPreference") ?? ""),
      skills: String(formData.get("skills") ?? ""),
      accommodations: String(formData.get("accommodations") ?? ""),
      goals: String(formData.get("goals") ?? ""),
      cv_path: cvPath,
      cv_file_name: cv instanceof File ? cv.name : null,
      cv_file_type: cv instanceof File ? cv.type : null,
      cv_file_size: cv instanceof File ? cv.size : null,
      user_agent: req.headers.get("user-agent") ?? "",
      ip: req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "",
    };

    const { error: insertError } = await supabase
      .from("candidate_profiles")
      .insert(payload);

    if (insertError) {
      return NextResponse.json({ error: "Could not save profile" }, { status: 500 });
    }

    return NextResponse.json(
      { ok: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
