import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

/**
 * Check if user input is relevant to the website content
 * @param {string} userInput - The user's question/query
 * @param {string} websiteUrl - The URL of the scraped website
 * @returns {Promise<{isRelevant: boolean, reason?: string}>}
 */
export async function checkContentRelevance(userInput, websiteUrl) {
  try {
    const prompt = `You are a content relevance validator for a web intelligence AI system.

The system allows users to ask questions about a specific website: ${websiteUrl}

Analyze this user input and determine if it's asking about the website content or something unrelated.

User Input: "${userInput}"

VALID examples (website-related):
- "What is this website about?"
- "Explain the main features"
- "What services do they offer?"
- "Tell me about their pricing"
- "What is their contact information?"
- "Summarize this website"

INVALID examples (not website-related):
- "Write code in JavaScript"
- "Explain how to cook pasta"
- "What's the weather today?"
- "Write a fibonacci function"
- "Tell me about Python programming"

Respond with ONLY "RELEVANT" or "NOT_RELEVANT" - nothing else.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
      config: {
        maxOutputTokens: 10,
        temperature: 0.1,
      },
    });

    const result = response.text.trim().toUpperCase();
    const isRelevant = result === "RELEVANT";

    return {
      isRelevant,
      reason: isRelevant
        ? null
        : "Question is not related to the website content",
    };
  } catch (error) {
    console.error("Error checking content relevance:", error);
    // If guardrail fails, allow the request to proceed (fail-open approach)
    return { isRelevant: true };
  }
}

/**
 * Check if AI response is relevant to the website and user query
 * @param {string} aiResponse - The AI's generated response
 * @param {string} userQuery - The original user query
 * @param {string} websiteUrl - The website URL
 * @returns {Promise<{isRelevant: boolean, sanitizedResponse?: string}>}
 */
export async function validateAIResponse(aiResponse, userQuery, websiteUrl) {
  try {
    const prompt = `You are validating an AI response for relevance to a website query.

Website: ${websiteUrl}
User Query: "${userQuery}"
AI Response: "${aiResponse}"

Check if the AI response:
1. Answers the user's question about the website
2. Stays focused on website content
3. Doesn't provide unrelated information

Respond with ONLY "RELEVANT" or "NOT_RELEVANT" - nothing else.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
      config: {
        maxOutputTokens: 10,
        temperature: 0.1,
      },
    });

    const result = response.text.trim().toUpperCase();
    const isRelevant = result === "RELEVANT";

    if (!isRelevant) {
      return {
        isRelevant: false,
        sanitizedResponse:
          "I can only answer questions about the website content. Please ask something related to the website you've processed.",
      };
    }

    return { isRelevant: true };
  } catch (error) {
    console.error("Error validating AI response:", error);
    // If validation fails, allow the response (fail-open approach)
    return { isRelevant: true };
  }
}
