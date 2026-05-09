"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { UserPreferences } from "@/types";

interface QuestionnaireContextType {
  currentStep: number;
  totalSteps: number;
  preferences: Partial<UserPreferences>;
  setPreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    budget: "8-12",
    familySize: "4-5",
    usage: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
    mileageImportance: 2,
    safetyImportance: 2,
    performanceImportance: 2,
  });

  const setPreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        currentStep,
        totalSteps,
        preferences,
        setPreference,
        nextStep,
        prevStep,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === totalSteps - 1,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error("useQuestionnaire must be used within a QuestionnaireProvider");
  }
  return context;
}
