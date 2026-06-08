"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type FormStatus = "idle" | "submitting" | "success";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  experienceLevel: string;
  jobField: string;
  workPreference: string;
  skills: string;
  accommodations: string;
  goals: string;
};

const initialProfile: UserProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  experienceLevel: "",
  jobField: "",
  workPreference: "",
  skills: "",
  accommodations: "",
  goals: "",
};

export default function UserPage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const updateField = (field: keyof UserProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!profile.email || !/^([^\s@])+@([^\s@]+)\.[^\s@]+$/.test(profile.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => formData.append(key, value));
    formData.append("createdAt", new Date().toISOString());
    if (cv) formData.append("cv", cv);

    setStatus("submitting");

    try {
      const res = await fetch("/api/user-register", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("success");
      setProfile(initialProfile);
      setCv(null);
    } catch {
      setError("Could not submit your profile. Please try again later.");
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/logo.png"
              alt="Prosvasimi"
              width={36}
              height={36}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight text-[#1B4332]">Prosvasimi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Link href="/offer" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">What We Offer</Link>
            <Link href="/articles" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">Articles</Link>
            <Link href="/jobs" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">Jobs</Link>
            <Link href="/quiz" className="px-4 py-2 text-[#1B4332] hover:bg-[#E7E5E4] rounded-lg transition-colors">Quiz</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-white border-b border-[#E7E5E4]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#40916C]/10 text-[#40916C] text-sm font-medium">
                Candidate profile
              </span>
              <h1 className="mt-8 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[#1B4332]">
                Register your profile and tell us about your experience.
              </h1>
              <p className="mt-6 text-lg text-[#2D6A4F] leading-relaxed">
                Share your skills, work preferences, support needs, and optionally upload your CV so Prosvasimi can better match you with accessible opportunities.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E7E5E4]">
              {status === "success" ? (
                <div className="rounded-xl bg-[#40916C]/10 text-[#1B4332] p-6 border border-[#40916C]/20">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#40916C] text-white flex items-center justify-center flex-shrink-0">✓</div>
                    <div>
                      <h2 className="text-xl font-semibold">Your profile was submitted</h2>
                      <p className="mt-2 text-[#2D6A4F]">Thank you. We will review your information and contact you when suitable opportunities are available.</p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 inline-flex justify-center rounded-xl bg-[#2D6A4F] text-white px-5 py-3 font-medium hover:bg-[#1B4332] transition-colors"
                      >
                        Register another profile
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1B4332]">Your details</h2>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">Full name</span>
                        <input value={profile.name} onChange={(e) => updateField("name", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="Anna Nowak" required />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">Email</span>
                        <input type="email" value={profile.email} onChange={(e) => updateField("email", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="you@domain.com" required />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">Phone</span>
                        <input value={profile.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="+48 123 456 789" />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">Location</span>
                        <input value={profile.location} onChange={(e) => updateField("location", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="Warsaw / Remote" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#1B4332]">Experience questions</h2>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">Experience level</span>
                        <select value={profile.experienceLevel} onChange={(e) => updateField("experienceLevel", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors bg-white" required>
                          <option value="">Select level</option>
                          <option value="entry">Entry level</option>
                          <option value="junior">Junior</option>
                          <option value="mid">Mid-level</option>
                          <option value="senior">Senior</option>
                          <option value="career-change">Career change</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium mb-2">Preferred field</span>
                        <input value={profile.jobField} onChange={(e) => updateField("jobField", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="Customer support, IT, design..." required />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">Work preference</span>
                        <select value={profile.workPreference} onChange={(e) => updateField("workPreference", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors bg-white" required>
                          <option value="">Select preference</option>
                          <option value="remote">Remote</option>
                          <option value="hybrid">Hybrid</option>
                          <option value="onsite">On-site</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">Key skills and previous experience</span>
                        <textarea value={profile.skills} onChange={(e) => updateField("skills", e.target.value)} className="min-h-32 w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="Tell us about your skills, tools, projects, studies, volunteering, or previous jobs." required />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">Accessibility needs or accommodations</span>
                        <textarea value={profile.accommodations} onChange={(e) => updateField("accommodations", e.target.value)} className="min-h-28 w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="Optional. Share only what you feel comfortable sharing." />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="block text-sm font-medium mb-2">Career goals</span>
                        <textarea value={profile.goals} onChange={(e) => updateField("goals", e.target.value)} className="min-h-28 w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none transition-colors" placeholder="What kind of role or support are you looking for?" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#1B4332]">CV upload</h2>
                    <label className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B7C9BD] bg-[#FAFAF9] px-6 py-10 text-center cursor-pointer hover:border-[#2D6A4F] transition-colors">
                      <span className="text-4xl">📄</span>
                      <span className="mt-3 font-semibold text-[#1B4332]">Upload your CV</span>
                      <span className="mt-1 text-sm text-[#2D6A4F]">PDF, DOC, or DOCX up to 5MB. Optional but recommended.</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                        className="sr-only"
                      />
                      {cv && <span className="mt-4 text-sm font-medium text-[#1B4332]">Selected: {cv.name}</span>}
                    </label>
                  </div>

                  {error && <p className="text-sm text-[#FF7A59]">{error}</p>}

                  <button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === "submitting" ? "Submitting..." : "Submit profile"}
                  </button>
                </form>
              )}
            </div>

            <aside className="bg-[#2D6A4F] text-white rounded-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold">What happens next?</h2>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="font-semibold">1. Profile review</p>
                  <p className="mt-1 text-white/75">We review your experience and preferences.</p>
                </div>
                <div>
                  <p className="font-semibold">2. Matching</p>
                  <p className="mt-1 text-white/75">We look for roles aligned with your skills and accessibility needs.</p>
                </div>
                <div>
                  <p className="font-semibold">3. Contact</p>
                  <p className="mt-1 text-white/75">We contact you when a relevant opportunity or support program is available.</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
