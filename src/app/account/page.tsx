"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoading(false);

      if (!data.user) {
        router.push("/login");
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-dvh bg-[#FAFAF9] text-[#1B4332]">
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="Prosvasimi" width={36} height={36} />
            <span className="font-semibold text-lg tracking-tight">Prosvasimi</span>
          </Link>
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-medium text-[#2D6A4F] hover:bg-[#E7E5E4] transition-colors">Log out</button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#E7E5E4] shadow-sm">
          {isLoading ? (
            <p className="text-[#2D6A4F]">Loading your account...</p>
          ) : user ? (
            <>
              <span className="inline-flex px-4 py-2 rounded-lg bg-[#40916C]/10 text-[#40916C] text-sm font-medium">Signed in</span>
              <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">Welcome to your account</h1>
              <p className="mt-4 text-[#2D6A4F]">You are signed in as {user.email}.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/user" className="inline-flex justify-center px-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors">Complete candidate profile</Link>
                <Link href="/jobs" className="inline-flex justify-center px-6 py-4 rounded-xl border-2 border-[#E7E5E4] text-[#1B4332] font-medium hover:border-[#2D6A4F] transition-colors">Browse jobs</Link>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
