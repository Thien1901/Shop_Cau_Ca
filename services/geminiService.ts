
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateProductDescription = async (productName: string): Promise<string> => {
  if (!API_KEY) {
    return `This is a high-quality ${productName}, perfect for all fishing enthusiasts. It offers great performance and durability. A must-have in your tackle box.`;
  }
  
  try {
    const prompt = `Generate a compelling and brief e-commerce product description for a fishing product named "${productName}". The description should be around 50-70 words. Highlight its key features and benefits for anglers. Do not use markdown or special formatting.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating product description with Gemini:", error);
    return `Discover the exceptional performance of the ${productName}. Built for enthusiasts and professionals alike, this product ensures reliability and success on the water.`;
  }
};
