import { NextResponse } from "next/server";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

const MAX_CV_SIZE = 5 * 1024 * 1024;
const CV_BUCKET = "candidate-cvs";
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type AuthResult =
  | { supabase: SupabaseClient; user: User }
  | { error: NextResponse };

async function authenticate(req: Request): Promise<AuthResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return { error: NextResponse.json({ error: "Supabase is not configured" }, { status: 500 }) };
  }

  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return { error: NextResponse.json({ error: "Authentication required" }, { status: 401 }) };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { data: authData, error: authError } = await supabase.auth.getUser(token);

  if (authError || !authData.user) {
    return { error: NextResponse.json({ error: "Invalid session" }, { status: 401 }) };
  }

  return { supabase, user: authData.user };
}

export async function GET(req: Request) {
  try {
    const auth = await authenticate(req);
    if ("error" in auth) return auth.error;

    const { supabase, user } = auth;

    const { data, error } = await supabase
      .from("candidate_profiles")
      .select(
        "name, email, phone, location, experience_level, job_field, work_preference, skills, accommodations, goals, cv_file_name"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: "Could not load profile" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ profile: null }, { headers: { "Cache-Control": "no-store" } });
    }

    const profile = {
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      location: data.location ?? "",
      experienceLevel: data.experience_level ?? "",
      jobField: data.job_field ?? "",
      workPreference: data.work_preference ?? "",
      skills: data.skills ?? "",
      accommodations: data.accommodations ?? "",
      goals: data.goals ?? "",
      cvFileName: data.cv_file_name ?? null,
    };

    return NextResponse.json({ profile }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

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

    const auth = await authenticate(req);
    if ("error" in auth) return auth.error;

    const { supabase, user } = auth;

    if (user.email && user.email !== email) {
      return NextResponse.json({ error: "Email does not match signed-in user" }, { status: 400 });
    }

    const payload: Record<string, unknown> = {
      user_id: user.id,
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
      user_agent: req.headers.get("user-agent") ?? "",
      ip: req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "",
    };

    // Only touch CV columns when a new file is uploaded, so editing the
    // profile without re-attaching a CV keeps the previously stored one.
    if (cv instanceof File) {
      const extension = cv.name.split(".").pop()?.toLowerCase() || "file";
      const safeEmail = email.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      const cvPath = `${safeEmail}/${Date.now()}.${extension}`;
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

      payload.cv_path = cvPath;
      payload.cv_file_name = cv.name;
      payload.cv_file_type = cv.type;
      payload.cv_file_size = cv.size;
    }

    const { error: upsertError } = await supabase
      .from("candidate_profiles")
      .upsert(payload, { onConflict: "user_id" });

    if (upsertError) {
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
