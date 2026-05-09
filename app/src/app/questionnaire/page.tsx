"use client";

import { useQuestionnaire, QuestionnaireProvider } from "@/components/questionnaire/QuestionnaireProvider";
import OnboardingLayout from "@/components/layout/OnboardingLayout";
import StepUsageBudget from "@/components/questionnaire/steps/StepUsageBudget";
import StepFamilySize from "@/components/questionnaire/steps/StepFamilySize";
import StepSpecsBodyType from "@/components/questionnaire/steps/StepSpecsBodyType";
import StepImportance from "@/components/questionnaire/steps/StepImportance";
import StepPriorities from "@/components/questionnaire/steps/StepPriorities";
import { useRouter } from "next/navigation";

function QuestionnaireContent() {
  const router = useRouter();
  const {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    preferences,
  } = useQuestionnaire();

  // Validate current step
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!preferences.usage && !!preferences.budget;
      case 1:
        return !!preferences.familySize;
      case 2:
        return !!preferences.fuelType && !!preferences.transmission && !!preferences.bodyType;
      case 3:
        return true; // Importance has defaults
      case 4:
        return true; // Priorities are optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      // Save preferences to localStorage or just pass via query/state
      if (typeof window !== "undefined") {
        localStorage.setItem("matchmycar_prefs", JSON.stringify(preferences));
        localStorage.removeItem("matchmycar_results"); // Clear old results
      }
      router.push("/loading");
    } else {
      nextStep();
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      onBack={prevStep}
      onNext={handleNext}
      canProceed={canProceed()}
    >
      {currentStep === 0 && <StepUsageBudget />}
      {currentStep === 1 && <StepFamilySize />}
      {currentStep === 2 && <StepSpecsBodyType />}
      {currentStep === 3 && <StepImportance />}
      {currentStep === 4 && <StepPriorities />}
    </OnboardingLayout>
  );
}


export default function QuestionnairePage() {
  return (
    <QuestionnaireProvider>
      <QuestionnaireContent />
    </QuestionnaireProvider>
  );
}
