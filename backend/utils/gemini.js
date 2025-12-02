import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiResponse = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text.trim();
    } catch (error) {
        console.error("❌ Gemini (Flash-Lite) API Error:", error);
        throw new Error("Failed to fetch response from Gemini (Flash-Lite)");
    }
};

// ✅ AI-powered query transformation (matches package embedding style)
export async function transformSearchQueryWithAI(userQuery) {
    const prompt = `
You are a search query transformer. Your job is to expand and enrich user travel queries into detailed, natural language descriptions that will be embedded for semantic search.

Transform the user's query following this exact structure:

1. Start with: "User is searching for: [original query]."
2. Identify and describe the travel category (romantic, adventure, beach, cultural, family, luxury, etc.)
3. Describe the desired duration in natural language (one-day trip, short trip, week-long tour, extended journey)
4. Describe the budget/price preference (budget-friendly, moderately priced, premium, luxury)
5. Mention the location naturally (city, country, region if mentioned)
6. Describe activities and experiences implied by the query
7. Specify if international or domestic travel (if clear from context)
8. End with: "Find tour packages that best match these preferences."

IMPORTANT RULES:
- Write in complete, natural sentences
- Use descriptive language like "Budget-friendly and affordable", "Premium experience", "Perfect for relaxation"
- If duration/budget/location not mentioned, DON'T add it - only expand what's clearly implied
- Keep the same tone and style as this example:

Example Input: "romantic beach honeymoon in Maldives"
Example Output: "User is searching for: romantic beach honeymoon in Maldives. This is a romantic tour package. Located in Maldives. International travel destination. Perfect for beach and water activities. Perfect for couples and relaxation. Find tour packages that best match these preferences."

Now transform this query:
"${userQuery}"

Return ONLY the transformed text, no explanations.
`.trim();

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
        const result = await model.generateContent(prompt);
        let transformedText = result.response.text().trim();

        // Clean up any markdown or extra formatting
        transformedText = transformedText.replace(/```|`/g, "").trim();

        return transformedText;
    } catch (error) {
        console.error("❌ Query transformation failed:", error);
        // Fallback: return enhanced version of original query
        return `User is searching for: ${userQuery}. Find tour packages that best match this description.`;
    }
}
