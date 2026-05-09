import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scoreCars } from "@/lib/scoring";
import { generateExplanations } from "@/lib/gemini";
import { UserPreferences } from "@/types";

export async function POST(request: Request) {
  try {
    const prefs: UserPreferences = await request.json();
    console.log("Recommendations requested with prefs:", JSON.stringify(prefs));

    // 1. Fetch all cars from DB
    const allCars = await prisma.car.findMany();
    console.log(`Fetched ${allCars.length} cars from database.`);

    if (allCars.length === 0) {
      console.warn("Database is empty. Returning empty recommendations.");
      return NextResponse.json({
        totalCarsAnalyzed: 0,
        recommendations: [],
      });
    }

    // 2. Score cars based on preferences
    const recommendations = scoreCars(allCars, prefs);
    console.log(`Generated ${recommendations.length} recommendations.`);

    if (recommendations.length === 0) {
      return NextResponse.json({
        totalCarsAnalyzed: allCars.length,
        recommendations: [],
      });
    }

    // 3. Generate AI explanations
    console.log("Requesting Gemini AI explanations...");
    const enrichedRecommendations = await generateExplanations(recommendations, prefs);
    console.log("AI explanations generated successfully.");

    return NextResponse.json({
      totalCarsAnalyzed: allCars.length,
      recommendations: enrichedRecommendations,
    });
  } catch (error: any) {
    console.error("Recommendation Error Detail:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return NextResponse.json(
      { error: "Failed to generate recommendations", details: error.message },
      { status: 500 }
    );
  }
}
