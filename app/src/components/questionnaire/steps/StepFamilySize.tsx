"use client";

import { useQuestionnaire } from "../QuestionnaireProvider";
import NumberSelector from "@/components/ui/NumberSelector";
import { FAMILY_SIZE_OPTIONS } from "@/lib/constants";

export default function StepFamilySize() {
  const { preferences, setPreference } = useQuestionnaire();

  return (
    <div className="animate-fade-in-up">
      <div className="mb-10 text-center">
        <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Your Crew.
        </h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg">
          How many passengers will you carry regularly?
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <NumberSelector
          options={FAMILY_SIZE_OPTIONS}
          selected={preferences.familySize || "4-5"}
          onChange={(val) => setPreference("familySize", val)}
        />
      </div>
    </div>
  );
}
