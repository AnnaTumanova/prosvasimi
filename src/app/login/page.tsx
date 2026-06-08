"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/account");
  };

  return (
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Prosvasimi" width={36} height={36} />
            <span className="font-semibold text-lg tracking-tight">Prosvasimi</span>
          </Link>
          <Link href="/register" className="px-4 py-2 rounded-lg text-sm font-medium text-[#2D6A4F] hover:bg-[#E7E5E4] transition-colors">Register</Link>
        </div>
      </header>

      <main className="mx-auto max-w-md px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-[#E7E5E4] shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">Log in</h1>
          <p className="mt-3 text-[#2D6A4F]">Enter with your email and password.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="block text-sm font-medium mb-2">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="you@domain.com" required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-[#E7E5E4] focus:border-[#2D6A4F] focus:outline-none" placeholder="Your password" required />
            </label>

            {error && <p className="text-sm text-[#FF7A59]">{error}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors disabled:opacity-60">
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#2D6A4F]">
            No account yet? <Link href="/register" className="font-semibold text-[#1B4332] underline">Create one</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
