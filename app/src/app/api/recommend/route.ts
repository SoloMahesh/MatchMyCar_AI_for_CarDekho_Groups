import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scoreCars } from "@/lib/scoring";
import { generateExplanations } from "@/lib/gemini";
import { UserPreferences } from "@/types";

export async function POST(request: Request) {
  try {
    const prefs: UserPreferences = await request.json();

    // 1. Fetch all cars from DB
    const allCars = await prisma.car.findMany();

    // 2. Score cars based on preferences
    const recommendations = scoreCars(allCars, prefs);

    // 3. Generate AI explanations
    const enrichedRecommendations = await generateExplanations(recommendations, prefs);

    return NextResponse.json({
      totalCarsAnalyzed: allCars.length,
      recommendations: enrichedRecommendations,
    });
  } catch (error) {
    console.error("Recommendation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
