import { GoogleGenerativeAI } from "@google/generative-ai";
import { Car, UserPreferences, Recommendation } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateExplanations(
  recommendations: Recommendation[],
  prefs: UserPreferences
): Promise<Recommendation[]> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 800,
        responseMimeType: "application/json",
      }
    });

    // We process all 3 cars in a single prompt to save time
    const prompt = `
You are MatchMyCar AI, an expert automotive consultant.
I have a user with these preferences:
Budget: ${prefs.budget} Lakh
Usage: ${prefs.usage}
Family Size: ${prefs.familySize}

I have selected 3 top cars for them:
1. ${recommendations[0]?.car.make} ${recommendations[0]?.car.model} (${recommendations[0]?.matchPercentage}% match) - Pros: ${recommendations[0]?.car.pros}, Cons: ${recommendations[0]?.car.cons}
2. ${recommendations[1]?.car.make} ${recommendations[1]?.car.model} (${recommendations[1]?.matchPercentage}% match) - Pros: ${recommendations[1]?.car.pros}, Cons: ${recommendations[1]?.car.cons}
3. ${recommendations[2]?.car.make} ${recommendations[2]?.car.model} (${recommendations[2]?.matchPercentage}% match) - Pros: ${recommendations[2]?.car.pros}, Cons: ${recommendations[2]?.car.cons}

For each car, provide:
1. A 2-sentence explanation of why it fits the user's specific lifestyle and budget. Tone must be premium, professional, and slightly futuristic (Kinetic Noir style).
2. Exactly 2 highlighted pros (max 4 words each).
3. Exactly 2 highlighted cons (max 4 words each).

Return a JSON array of 3 objects with keys: "explanation", "highlightedPros" (array of strings), "highlightedCons" (array of strings).
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    return recommendations.map((rec, i) => {
      if (parsed[i]) {
        rec.explanation = parsed[i].explanation;
        // Parse DB strings into arrays if they aren't already
        rec.highlightedPros = parsed[i].highlightedPros || JSON.parse(rec.car.pros as unknown as string).slice(0, 2);
        rec.highlightedCons = parsed[i].highlightedCons || JSON.parse(rec.car.cons as unknown as string).slice(0, 2);
      } else {
        applyFallback(rec);
      }
      return rec;
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    // Fallback if Gemini fails
    return recommendations.map(applyFallback);
  }
}

function applyFallback(rec: Recommendation): Recommendation {
  rec.explanation = `Optimal alignment with your requirements. The ${rec.car.bodyType} architecture perfectly matches your specified daily usage.`;
  
  try {
    rec.highlightedPros = JSON.parse(rec.car.pros as string).slice(0, 2);
    rec.highlightedCons = JSON.parse(rec.car.cons as string).slice(0, 2);
  } catch {
    rec.highlightedPros = ["Great styling", "Reliable engine"];
    rec.highlightedCons = ["Average tech", "Firm ride"];
  }
  
  return rec;
}
