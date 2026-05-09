import { Car, UserPreferences, Recommendation } from "@/types";
import { BUDGET_RANGES } from "./constants";

export function scoreCars(cars: Car[], prefs: UserPreferences): Recommendation[] {
  // Parse budget range
  const budgetRange = BUDGET_RANGES[prefs.budget || "8-12"] || { min: 8, max: 12 };
  
  // Weights based on importance
  const weights = {
    budget: 0.3, // Baseline
    mileage: (prefs.mileageImportance || 2) * 0.1, // 0.1 to 0.3
    safety: (prefs.safetyImportance || 2) * 0.1, // 0.1 to 0.3
    performance: (prefs.performanceImportance || 2) * 0.1, // 0.1 to 0.3
    bodyTypeMatch: 0.1,
    fuelTypeMatch: 0.1,
  };

  const scoredCars = cars.map((car) => {
    let score = 0;

    // 1. Budget scoring (Max 30)
    if (car.exShowroomPrice >= budgetRange.min && car.exShowroomPrice <= budgetRange.max) {
      score += 30;
    } else {
      // Penalty for being out of budget
      const diff = Math.min(
        Math.abs(car.exShowroomPrice - budgetRange.min),
        Math.abs(car.exShowroomPrice - budgetRange.max)
      );
      score += Math.max(0, 30 - diff * 2);
    }

    // 2. Body Type match (Max 10)
    if (prefs.bodyType === car.bodyType || prefs.bodyType === "no_preference" || !prefs.bodyType) {
      score += 10;
    }

    // 3. Fuel Type match (Max 10)
    if (prefs.fuelType === car.fuelType || prefs.fuelType === "no_preference" || !prefs.fuelType) {
      score += 10;
    }

    // 4. Mileage scoring (Max depends on importance)
    // Scale: 10kmpl to 30kmpl
    const mileageScore = Math.min(100, Math.max(0, (car.mileage - 10) * 5));
    score += mileageScore * weights.mileage;

    // 5. Safety scoring (Max depends on importance)
    // Scale: 1 star = 20, 5 star = 100
    const safetyScore = car.safetyRating * 20;
    score += safetyScore * weights.safety;

    // 6. Performance scoring (Max depends on importance)
    const bhp = parseInt(car.power.split(" ")[0]) || 100;
    // Scale: 60bhp to 200bhp
    const perfScore = Math.min(100, Math.max(0, (bhp - 60) * 0.7));
    score += perfScore * weights.performance;

    // Normalize score to percentage (max possible score depends on weights)
    const maxScore = 30 + 10 + 10 + 100 * (weights.mileage + weights.safety + weights.performance);
    const matchPercentage = Math.round((score / maxScore) * 100);

    return {
      rank: 0,
      car,
      matchPercentage,
      explanation: "", // To be filled by Gemini
      highlightedPros: [],
      highlightedCons: [],
    };
  });

  // Sort by match percentage
  const sorted = scoredCars.sort((a, b) => b.matchPercentage - a.matchPercentage);
  
  // Assign ranks
  sorted.forEach((item, index) => {
    item.rank = index + 1;
  });

  return sorted.slice(0, 3); // Return top 3
}
