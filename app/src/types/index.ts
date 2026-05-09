// ─── Car Entity ───
export interface Car {
  id: number;
  make: string;
  model: string;
  variant: string;
  year: number;
  exShowroomPrice: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  engineCC: number;
  mileage: number;
  safetyRating: number;
  seatingCapacity: number;
  bootSpace: number;
  groundClearance: number;
  power: string;
  torque: string;
  pros: string;
  cons: string;
  imageUrl: string;
}

// ─── Enums ───
export type BodyType = "SUV" | "Sedan" | "Hatchback" | "MPV";
export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";
export type TransmissionType = "Automatic" | "Manual";
export type UsageType = "city" | "highway" | "mixed" | "offroad";
export type FamilySize = "1" | "2-3" | "4-5" | "5+";
export type ImportanceLevel = 1 | 2 | 3;

// ─── User Preferences (collected from questionnaire) ───
export interface UserPreferences {
  budget: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  usage: string;
  familySize: string;
  mileageImportance: ImportanceLevel;
  safetyImportance: ImportanceLevel;
  performanceImportance: ImportanceLevel;
}

// ─── Recommendation (API response) ───
export interface Recommendation {
  rank: number;
  car: Car;
  matchPercentage: number;
  explanation: string;
  highlightedPros: string[];
  highlightedCons: string[];
}

export interface RecommendResponse {
  recommendations: Recommendation[];
  totalCarsAnalyzed: number;
}

// ─── Questionnaire Step ───
export interface QuestionnaireStep {
  id: number;
  title: string;
  subtitle: string;
  field: keyof UserPreferences;
}
