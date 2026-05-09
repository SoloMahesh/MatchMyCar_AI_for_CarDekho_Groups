"use client";

import { BUDGET_RANGES } from "@/lib/constants";

interface BudgetSliderProps {
  selected: string;
  onChange: (value: string) => void;
}

const budgetKeys = Object.keys(BUDGET_RANGES);

export default function BudgetSlider({ selected, onChange }: BudgetSliderProps) {
  const currentIndex = budgetKeys.indexOf(selected);
  const range = BUDGET_RANGES[selected];
  const fillPercent = ((currentIndex + 1) / budgetKeys.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <label className="font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-on-surface-variant)]">
            Target Budget
          </label>
          <span className="text-[10px] text-[var(--color-on-surface-variant)] opacity-60">Select your comfortable price range</span>
        </div>
        <span className="font-[var(--font-headline)] text-2xl font-bold text-[var(--color-primary)]">
          {range?.label || "₹8 – 12 Lakh"}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative">
        {budgetKeys.map((key) => {
          const isSelected = selected === key;
          const { label } = BUDGET_RANGES[key];
          // Extract just the numbers for a cleaner pill
          const shortLabel = label.replace("₹", "").replace(" Lakh", "L");

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`
                relative px-3 py-4 rounded-xl text-center font-[var(--font-headline)] font-semibold transition-all duration-300
                ${isSelected 
                  ? "bg-[var(--color-primary-container)]/20 text-[var(--color-primary-action)] border border-[var(--color-primary-action)] shadow-[0_0_15px_rgba(247,93,52,0.15)] scale-105 z-10" 
                  : "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] border border-transparent hover:bg-white/[0.05] hover:text-[var(--color-on-surface)]"
                }
              `}
            >
              {isSelected && (
                <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,rgba(247,93,52,0.2)_0%,transparent_70%)] animate-pulse-glow pointer-events-none" />
              )}
              {shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
