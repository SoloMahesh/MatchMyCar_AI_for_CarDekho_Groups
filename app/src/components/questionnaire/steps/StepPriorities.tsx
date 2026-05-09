"use client";

import { useState } from "react";
import { useQuestionnaire } from "../QuestionnaireProvider";
import PillSelector from "@/components/ui/PillSelector";
import SectionLabel from "@/components/ui/SectionLabel";
import { PRIORITY_OPTIONS } from "@/lib/constants";

export default function StepPriorities() {
  // Local state for the multi-select since we didn't add an array to preferences yet.
  // Actually, we can add it to preferences or just handle it here. We'll use local state
  // for simplicity as it's the final touch.
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const togglePriority = (val: string | number) => {
    const value = val as string;
    setSelectedPriorities((prev) => {
      if (prev.includes(value)) {
        return prev.filter((p) => p !== value);
      }
      if (prev.length < 3) {
        return [...prev, value];
      }
      return prev;
    });
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-10 text-center">
        <h1 className="font-[var(--font-headline)] text-3xl md:text-4xl font-bold tracking-tighter mb-3">
          Final Touches
        </h1>
        <p className="text-[var(--color-on-surface-variant)]">
          Define your primary requirements for the perfect automotive match.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <SectionLabel className="mb-4">
          Priority Focus <span className="text-xs font-normal normal-case opacity-60 ml-2">(select up to 3)</span>
        </SectionLabel>
        <PillSelector
          options={PRIORITY_OPTIONS}
          selected={selectedPriorities}
          onChange={togglePriority}
          multiSelect
        />
      </div>
    </div>
  );
}
