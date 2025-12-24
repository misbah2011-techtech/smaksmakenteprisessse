
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function searchContent(query: string, availableContent: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is searching for: "${query}". Based on these titles: ${availableContent.join(', ')}, suggest the best matches or explain what they might like.`,
      config: {
        systemInstruction: "You are a streaming platform assistant. Keep it brief and exciting.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini search failed:", error);
    return null;
  }
}
