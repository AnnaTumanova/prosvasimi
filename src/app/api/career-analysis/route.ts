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

function getServiceClient(): SupabaseClient | null {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRoleKey) return null;
  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

function sanitizeEmail(email: string) {
  const cleaned = email.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}

function buildAnalysisPrompt(fields: Record<string, string>) {
  return `You are a supportive career coach for people with disabilities and neurodivergent individuals. Review the information below and provide:
1. A brief career profile summary (2-3 sentences).
2. 3-5 concrete, actionable next steps the person can take.
3. A short note on what skills or roles might be a good fit right now.

Information:
- Name: ${fields.name || "Not provided"}
- Location: ${fields.location || "Not provided"}
- Experience level: ${fields.experienceLevel || "Not provided"}
- Target job field: ${fields.jobField || "Not provided"}
- Work preference: ${fields.workPreference || "Not provided"}
- Key skills: ${fields.skills || "Not provided"}
- Career goals: ${fields.goals || "Not provided"}
- Resume text: ${fields.resumeText || "[CV uploaded for review — no pasted text provided]"}`;
}

function fallbackAnalysis(fields: Record<string, string>) {
  return `Thank you for sharing your background.\n\nWe have received your details and uploaded CV. A coach will review your profile and reach out with personalized guidance. In the meantime, consider these general next steps:\n1. Reflect on your top 3 transferable skills and how they apply to ${fields.jobField || "your target field"}.\n2. Research entry points and common roles at your experience level (${fields.experienceLevel || "current level"}).\n3. Prepare a short "career story" that connects your skills to your goals (${fields.goals || "your career goals"}).\n4. Look for networking groups or communities aligned with ${fields.workPreference || "your preferred work arrangement"}.\n5. If you need accommodations, list the ones that help you do your best work and be ready to discuss them with employers.`;
}

async function generateAnalysis(fields: Record<string, string>) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { text: fallbackAnalysis(fields), status: "manual" };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a concise, supportive career coach for people with disabilities and neurodivergent individuals. Be encouraging and practical.",
          },
          { role: "user", content: buildAnalysisPrompt(fields) },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI returned ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new Error("Empty analysis from OpenAI");
    }

    return { text, status: "completed" };
  } catch {
    return { text: fallbackAnalysis(fields), status: "manual" };
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
    }

    const formData = await req.formData();
    const email = sanitizeEmail(String(formData.get("email") ?? ""));

    if (!email) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const name = String(formData.get("name") ?? "");
    const location = String(formData.get("location") ?? "");
    const experienceLevel = String(formData.get("experienceLevel") ?? "");
    const jobField = String(formData.get("jobField") ?? "");
    const workPreference = String(formData.get("workPreference") ?? "");
    const skills = String(formData.get("skills") ?? "");
    const goals = String(formData.get("goals") ?? "");
    const resumeText = String(formData.get("resumeText") ?? "");
    const cv = formData.get("cv");

    const hasInput = resumeText.trim().length > 0 || (cv instanceof File && cv.size > 0);
    if (!hasInput) {
      return NextResponse.json({ error: "Please upload a CV or paste your resume text" }, { status: 400 });
    }

    const guestToken = crypto.randomUUID();
    const basePath = `career-analysis/${guestToken}`;
    let cvPath: string | null = null;
    let cvFileName: string | null = null;
    let cvFileType: string | null = null;
    let cvFileSize: number | null = null;

    if (cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_CV_SIZE) {
        return NextResponse.json({ error: "CV file is too large" }, { status: 400 });
      }

      if (cv.type && !ALLOWED_CV_TYPES.has(cv.type)) {
        return NextResponse.json({ error: "Unsupported CV file type" }, { status: 400 });
      }

      const extension = cv.name.split(".").pop()?.toLowerCase() || "file";
      const filePath = `${basePath}/${Date.now()}.${extension}`;
      const cvBuffer = await cv.arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from(CV_BUCKET)
        .upload(filePath, cvBuffer, {
          contentType: cv.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json({ error: "Could not upload CV" }, { status: 500 });
      }

      cvPath = filePath;
      cvFileName = cv.name;
      cvFileType = cv.type;
      cvFileSize = cv.size;
    }

    const fields = { name, location, experienceLevel, jobField, workPreference, skills, goals, resumeText };
    const { text: analysisText, status: analysisStatus } = await generateAnalysis(fields);

    const payload: Record<string, unknown> = {
      guest_token: guestToken,
      email,
      name,
      location,
      experience_level: experienceLevel,
      job_field: jobField,
      work_preference: workPreference,
      skills,
      goals,
      resume_text: resumeText,
      cv_path: cvPath,
      cv_file_name: cvFileName,
      cv_file_type: cvFileType,
      cv_file_size: cvFileSize,
      analysis_text: analysisText,
      analysis_status: analysisStatus,
      user_agent: req.headers.get("user-agent") ?? "",
      ip: req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "",
    };

    const { error: insertError } = await supabase.from("career_analyses").insert(payload);

    if (insertError) {
      if (cvPath) {
        await supabase.storage.from(CV_BUCKET).remove([cvPath]);
      }
      return NextResponse.json({ error: "Could not save analysis" }, { status: 500 });
    }

    return NextResponse.json(
      {
        id: guestToken,
        email,
        status: analysisStatus,
        requiresLogin: true,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (token) {
    const { data, error } = await supabase
      .from("career_analyses")
      .select(
        "id, guest_token, email, name, location, experience_level, job_field, work_preference, skills, goals, resume_text, cv_file_name, analysis_text, analysis_status"
      )
      .eq("guest_token", token)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    return NextResponse.json({ analysis: data }, { headers: { "Cache-Control": "no-store" } });
  }

  const auth = await authenticate(req);
  if ("error" in auth) return auth.error;

  const { supabase: authSupabase, user } = auth;
  const userEmail = user.email ?? "";

  const { data, error } = await authSupabase
    .from("career_analyses")
    .select(
      "id, guest_token, email, name, location, experience_level, job_field, work_preference, skills, goals, resume_text, cv_file_name, analysis_text, analysis_status"
    )
    .or(`email.eq.${userEmail},user_id.eq.${user.id}`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Could not load analysis" }, { status: 500 });
  }

  if (data) {
    await authSupabase.from("career_analyses").update({ user_id: user.id }).eq("id", data.id);
  }

  return NextResponse.json({ analysis: data }, { headers: { "Cache-Control": "no-store" } });
}
