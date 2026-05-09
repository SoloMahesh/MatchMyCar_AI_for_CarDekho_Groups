"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl border-b border-white/10">
      <div className="flex justify-between items-center h-20 px-6 md:px-16 w-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white px-3 py-1.5 rounded-lg flex items-center justify-center">
            <img src="/assets/cardekho_newlogo.svg" alt="CarDekho" className="h-5 w-auto object-contain" />
          </div>
          <span className="font-[var(--font-headline)] text-xl md:text-[28px] font-bold tracking-tighter text-[var(--color-on-surface)] leading-tight">
            MatchMyCar AI
          </span>
        </Link>

        {/* CTA */}
        <Link
          href="/questionnaire"
          className="btn-primary font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase px-5 py-3 rounded-full inline-flex items-center gap-2"
        >
          <span>Start Matching</span>
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>
    </header>
  );
}
