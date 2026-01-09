
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, InvestmentStrategy, RiskTolerance } from "../types";

export const generateStrategy = async (profile: UserProfile): Promise<InvestmentStrategy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Generate a detailed investment strategy for a capital of $${profile.capital} over ${profile.horizon} years with a ${profile.risk} risk tolerance. 
  The goal is: ${profile.goal}.
  Provide allocations across four categories: Startups (Angel/Equity), Banks (FDs/Savings), NBFCs (Corporate Bonds/Loans), and Growth Funds (ETFs/Mutual Funds).
  Ensure percentages sum up to 100%.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          allocations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                percentage: { type: Type.NUMBER },
                description: { type: Type.STRING },
                expectedReturn: { type: Type.STRING },
                riskLevel: { type: Type.STRING }
              },
              required: ["category", "percentage", "description", "expectedReturn", "riskLevel"]
            }
          },
          summary: { type: Type.STRING },
          projectedValue: { type: Type.NUMBER },
          advice: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["allocations", "summary", "projectedValue", "advice"]
      }
    }
  });

  try {
    const text = response.text;
    return JSON.parse(text) as InvestmentStrategy;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid response format from AI");
  }
};
