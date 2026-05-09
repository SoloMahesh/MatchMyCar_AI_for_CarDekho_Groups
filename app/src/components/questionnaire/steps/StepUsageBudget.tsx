"use client";

import { useQuestionnaire } from "../QuestionnaireProvider";
import PillSelector from "@/components/ui/PillSelector";
import BudgetSlider from "@/components/ui/BudgetSlider";
import { USAGE_OPTIONS } from "@/lib/constants";

export default function StepUsageBudget() {
  const { preferences, setPreference } = useQuestionnaire();

  return (
    <div className="animate-fade-in-up">
      <div className="mb-10 text-center">
        <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Let's find your drive.
        </h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg">
          What's your primary usage?
        </p>
      </div>

      <div className="space-y-12">
        <PillSelector
          options={USAGE_OPTIONS}
          selected={preferences.usage || ""}
          onChange={(val) => setPreference("usage", val as string)}
        />

        <div className="pt-6 border-t border-white/5">
          <BudgetSlider
            selected={preferences.budget || "8-12"}
            onChange={(val) => setPreference("budget", val)}
          />
        </div>
      </div>
    </div>
  );
}
