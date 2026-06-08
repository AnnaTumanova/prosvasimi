"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push("/user");
      return;
    }

    setMessage("Account created. Please check your email to confirm your account, then log in.");
  };

  return (
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Prosvasimi" width={36} height={36} />
            <span className="font-semibold text-lg tracking-tight">Prosvasimi</span>
          </Link>
          <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-[#2D6A4F] hover:bg-[#E7E5E4] transition-colors">Log in</Link>
        </div>
      </header>

      <main className="mx-auto max-w-md px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-[#E7E5E4] shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-3 text-[#2D6A4F]">Register with email and password, then complete your candidate profile.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="block text-sm font-medium mb-2">Full name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="Anna Nowak" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="you@domain.com" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="Minimum 6 characters" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">Confirm password</span>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="Repeat password" required />
            </label>

            {error && <p className="text-sm text-[#FF7A59]">{error}</p>}
            {message && <p className="text-sm text-[#2D6A4F]">{message}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors disabled:opacity-60">
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#2D6A4F]">
            Already have an account? <Link href="/login" className="font-semibold text-[#1B4332] underline">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
