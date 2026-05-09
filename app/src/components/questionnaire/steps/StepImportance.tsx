"use client";

import { useQuestionnaire } from "../QuestionnaireProvider";
import PillSelector from "@/components/ui/PillSelector";
import SectionLabel from "@/components/ui/SectionLabel";
import { IMPORTANCE_OPTIONS } from "@/lib/constants";
import { ImportanceLevel } from "@/types";

export default function StepImportance() {
  const { preferences, setPreference } = useQuestionnaire();

  return (
    <div className="animate-fade-in-up">
      <div className="mb-10 text-center">
        <h1 className="font-[var(--font-headline)] text-3xl md:text-4xl font-bold tracking-tighter mb-3">
          What Matters Most?
        </h1>
        <p className="text-[var(--color-on-surface-variant)]">
          Rate the importance of each factor for our scoring engine.
        </p>
      </div>

      <div className="space-y-8 max-w-lg mx-auto">
        <div>
          <SectionLabel className="mb-4">Mileage & Running Cost</SectionLabel>
          <PillSelector
            options={IMPORTANCE_OPTIONS}
            selected={preferences.mileageImportance || 2}
            onChange={(val) => setPreference("mileageImportance", val as ImportanceLevel)}
          />
        </div>

        <div>
          <SectionLabel className="mb-4">Safety Ratings</SectionLabel>
          <PillSelector
            options={IMPORTANCE_OPTIONS}
            selected={preferences.safetyImportance || 2}
            onChange={(val) => setPreference("safetyImportance", val as ImportanceLevel)}
          />
        </div>

        <div>
          <SectionLabel className="mb-4">Performance & Driving Dynamics</SectionLabel>
          <PillSelector
            options={IMPORTANCE_OPTIONS}
            selected={preferences.performanceImportance || 2}
            onChange={(val) => setPreference("performanceImportance", val as ImportanceLevel)}
          />
        </div>
      </div>
    </div>
  );
}
