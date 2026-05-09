"use client";

import { useQuestionnaire } from "../QuestionnaireProvider";
import PillSelector from "@/components/ui/PillSelector";
import SegmentedControl from "@/components/ui/SegmentedControl";
import CardGrid from "@/components/ui/CardGrid";
import SectionLabel from "@/components/ui/SectionLabel";
import { FUEL_TYPE_OPTIONS, TRANSMISSION_OPTIONS, BODY_TYPE_OPTIONS } from "@/lib/constants";

export default function StepSpecsBodyType() {
  const { preferences, setPreference } = useQuestionnaire();

  return (
    <div className="animate-fade-in-up">
      <div className="mb-10 text-center">
        <h1 className="font-[var(--font-headline)] text-3xl md:text-4xl font-bold tracking-tighter mb-3">
          Fuel & Performance
        </h1>
        <p className="text-[var(--color-on-surface-variant)]">
          Calibrate your ideal powertrain and chassis configuration.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <SectionLabel className="mb-4">Powertrain</SectionLabel>
          <PillSelector
            options={FUEL_TYPE_OPTIONS}
            selected={preferences.fuelType || ""}
            onChange={(val) => setPreference("fuelType", val as string)}
          />
        </div>

        <div>
          <SectionLabel className="mb-4">Transmission</SectionLabel>
          <SegmentedControl
            options={TRANSMISSION_OPTIONS}
            selected={preferences.transmission || ""}
            onChange={(val) => setPreference("transmission", val as string)}
          />
        </div>

        <div>
          <SectionLabel className="mb-4">Chassis Class</SectionLabel>
          <CardGrid
            options={BODY_TYPE_OPTIONS}
            selected={preferences.bodyType || ""}
            onChange={(val) => setPreference("bodyType", val as string)}
          />
        </div>
      </div>
    </div>
  );
}
