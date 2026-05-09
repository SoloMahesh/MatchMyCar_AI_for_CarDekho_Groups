/** Questionnaire step configuration — single source of truth for the 5-step flow */

export const BUDGET_RANGES: Record<string, { min: number; max: number; label: string }> = {
  "5-8": { min: 5, max: 8, label: "₹5 – 8 Lakh" },
  "8-12": { min: 8, max: 12, label: "₹8 – 12 Lakh" },
  "12-18": { min: 12, max: 18, label: "₹12 – 18 Lakh" },
  "18-25": { min: 18, max: 25, label: "₹18 – 25 Lakh" },
  "25+": { min: 25, max: 50, label: "₹25 Lakh+" },
};

export const USAGE_OPTIONS = [
  { value: "city", label: "Daily Commute", icon: "work" },
  { value: "highway", label: "Highway Trips", icon: "flight_takeoff" },
  { value: "mixed", label: "Family Hauler", icon: "family_restroom" },
  { value: "offroad", label: "Off-Road Adventure", icon: "landscape" },
  { value: "performance", label: "Track Ready", icon: "sports_score" },
];

export const BODY_TYPE_OPTIONS = [
  { value: "Sedan", label: "Sedan", icon: "directions_car" },
  { value: "SUV", label: "SUV", icon: "time_auto" },
  { value: "Hatchback", label: "Hatchback", icon: "airport_shuttle" },
  { value: "MPV", label: "MPV", icon: "local_shipping" },
  { value: "no_preference", label: "No Preference", icon: "apps" },
];

export const FUEL_TYPE_OPTIONS = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "no_preference", label: "No Preference" },
];

export const TRANSMISSION_OPTIONS = [
  { value: "Automatic", label: "Automatic" },
  { value: "Manual", label: "Manual" },
  { value: "no_preference", label: "No Preference" },
];

export const FAMILY_SIZE_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2-3", label: "2-3" },
  { value: "4-5", label: "4-5" },
  { value: "5+", label: "5+" },
];

export const IMPORTANCE_OPTIONS = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
];

export const PRIORITY_OPTIONS = [
  { value: "speed", label: "Speed", icon: "speed" },
  { value: "safety", label: "Safety", icon: "shield" },
  { value: "tech", label: "Tech", icon: "memory" },
  { value: "luxury", label: "Luxury", icon: "diamond" },
  { value: "efficiency", label: "Efficiency", icon: "eco" },
  { value: "cargo", label: "Cargo Space", icon: "luggage" },
];

export const LOADING_MESSAGES = [
  "Analyzing 120+ cars in our database...",
  "Matching your budget and preferences...",
  "Comparing mileage and safety ratings...",
  "Evaluating comfort and performance...",
  "Generating your personalized shortlist...",
];

export const SEGMENT_AVG_MILEAGE: Record<string, number> = {
  SUV: 16,
  Sedan: 20,
  Hatchback: 22,
  MPV: 15,
};
