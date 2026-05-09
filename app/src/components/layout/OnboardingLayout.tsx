"use client";

import Link from "next/link";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;
}

export default function OnboardingLayout({
  currentStep,
  totalSteps,
  children,
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
  canProceed,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--color-background)]">
      {/* Ambient Background */}
      <div className="ambient-glow" />

      {/* Top Header — centered logo + progress */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 h-20 bg-[var(--color-background)]/80 backdrop-blur-xl border-b border-white/10">
        {/* Left spacer */}
        <div className="flex-1" />

        {/* Center: Logo + Progress */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Link
            href="/"
            className="flex items-center justify-center bg-white px-4 py-2 rounded-full hover:scale-105 transition-transform"
          >
            <img src="/assets/cardekho_newlogo.svg" alt="CarDekho" className="h-5 w-auto object-contain" />
          </Link>
          {/* Segmented progress bar */}
          <div className="mt-2 w-32 md:w-40 flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-400 ${
                  i < currentStep
                    ? "bg-[var(--color-surface-variant)]"
                    : i === currentStep
                      ? "progress-gradient progress-glow"
                      : "bg-[var(--color-surface-high)]"
                }`}
              />
            ))}
          </div>
          <span className="mt-1.5 font-[var(--font-body)] text-[11px] font-semibold tracking-[0.15em] text-[var(--color-on-surface-variant)] uppercase">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>

        {/* Right: Help icon */}
        <div className="flex-1 flex justify-end relative group">
          <button
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary-container)] transition-colors p-2 rounded-full cursor-help"
            aria-label="Help"
          >
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          
          {/* Tooltip Modal on Hover */}
          <div className="absolute top-full right-0 mt-4 w-64 p-4 rounded-xl glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none before:content-[''] before:absolute before:-top-2 before:right-6 before:border-8 before:border-transparent before:border-b-[rgba(255,255,255,0.1)]">
            <h4 className="font-[var(--font-headline)] font-bold text-[var(--color-on-surface)] text-sm mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[var(--color-primary-action)]">info</span>
              Need Assistance?
            </h4>
            <p className="font-[var(--font-body)] text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
              Our AI is matching your lifestyle against 120+ vehicles in the CarDekho ecosystem. Answer honestly to get the best recommendations.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-28 pb-32 px-6 md:px-16 relative z-10">
        <div className="glass-card rounded-2xl w-full max-w-2xl p-6 md:p-10 animate-scale-in">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-6 py-5 md:py-6 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/90 to-transparent">
        <div className="w-full max-w-2xl mx-auto flex justify-between items-center">
          {/* Back */}
          {isFirstStep ? (
            <Link
              href="/"
              className="btn-glass font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase px-5 py-3 rounded-full flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Home
            </Link>
          ) : (
            <button
              onClick={onBack}
              className="btn-glass font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase px-5 py-3 rounded-full flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back
            </button>
          )}

          {/* Next / Submit */}
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`btn-primary font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-2 transition-opacity ${
              !canProceed ? "opacity-40 cursor-not-allowed !shadow-none !transform-none" : ""
            }`}
          >
            {isLastStep ? "Analyze My Matches" : "Next"}
            <span className="material-symbols-outlined text-lg">
              {isLastStep ? "data_exploration" : "arrow_forward"}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
