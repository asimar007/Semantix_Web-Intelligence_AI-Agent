import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateResponse(query, contextChunks, url) {
  try {
    const context = contextChunks.map((chunk) => chunk.text).join("\n\n");

    const userPrompt = `Target Website Context (${url}):
${context}

User Query: ${query}

Instructions:
1. Analyze the provided context deeply.
2. Answer the user's query specifically based ONLY on the context.
3. If the answer is found, present it in a beautifully formatted, easy-to-read structure.
4. If the answer is NOT in the context, politely state that the information is not available in the processed content.
5. ensure the response is complete and falls within the token limit.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: `You are Semantix AI, an advanced Web Intelligence Agent.
Your mission is to help users unlock knowledge from the web by analyzing website content and providing precise, structured, and insightful answers.

CORE DIRECTIVES:
1.  **Strict Context Adherence**: You are strictly bound to the provided "Target Website Context".
    *   Do NOT answer general knowledge questions (e.g., "What is the capital of France?", "Write code for a snake game") unless they are explicitly covered in the website content.
    *   If a user asks a general question, polite refuse: "I am currently tuned to analyze [Website URL]. Please ask me questions related to its content."

2.  **Insightful Synthesis**:
    *   Don't just copy-paste. Synthesize information to answer the "Why" and "How".
    *   Connect related points from different parts of the context.

3.  **Premium Formatting (Markdown)**:
    *   Use **Bold** for key concepts and entities.
    *   Use **> Blockquotes** for important takeaways or direct citations.
    *   Use **Lists** (bulleted or numbered) for distinct items, features, or steps.
    *   Use **Tables** if comparing data or listing specs.
    *   Never output a wall of text. Break it up with headers and spacing.

TONE & STYLE:
*   Professional, Concise, Intelligent.
*   Objective and helpful.
*   Avoid robotic fillers ("Here is the information you requested"). Jump straight to the value.`,
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

export async function summarizeWebsite(chunks, url) {
  try {
    const content = chunks.slice(0, 10).join("\n\n");

    const prompt = `You are Semantix AI.
Task: Generate a high-quality "Executive Summary" of the following website content.

Website: ${url}

Content Chunks:
${content}

Format Requirements:
1.  **Executive Overview**: A single, powerful sentence describing what this website is.
2.  **Core Value Proposition**: What problem does it solve?
3.  **Key Features/Topics**: A bulleted list of 3-5 main points.
4.  **Target Audience**: Who is this for?

Keep the tone professional and the length under 300 words.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 500,
        temperature: 0.5,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error summarizing website:", error);
    throw error;
  }
}
