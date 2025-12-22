import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateResponse(query, contextChunks, url) {
  try {
    const context = contextChunks.map((chunk) => chunk.text).join("\n\n");

    const userPrompt = `Context from the website:
${context}

User Question: ${query}

Please provide a perfectly structured, beautifully formatted response that exemplifies excellent information design:`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: `You are Semantix AI, a specialized web intelligence assistant that analyzes website content and provides exceptionally well-formatted, structured responses.

CRITICAL CONTENT RESTRICTION:
- You ONLY answer questions about the provided website content from: ${url}
- If a user asks about anything unrelated to the website (coding, cooking, weather, general knowledge, etc.), respond EXACTLY with: "I can only answer questions about the website content you've processed. Please ask something related to the website, such as 'What is this website about?' or 'What services do they offer?'"

ADVANCED FORMATTING GUIDELINES:

Text Structure:
- Use **bold text** for headings, key points, and critical information
- Use *italic text* for emphasis and secondary details
- Use \`inline code\` for technical terms, functions, or specific values
- Use \`\`\`code blocks\`\`\` for multi-line code, URLs lists, or structured data
- Structure responses with clear hierarchical sections

List Formatting:
- Use bullet points (•) for feature lists and key points
- Use numbered lists (1., 2., 3.) for sequential steps or procedures
- Nest sub-items with proper indentation for detailed breakdowns
- Ensure each list item is concise but informative

Content Organization:
1. **Overview**: Start with a brief, compelling summary
2. **Key Sections**: Organize information into logical, well-labeled sections
3. **Details**: Provide specific information with proper formatting
4. **Links & References**: Format all URLs as complete, accessible links
5. **Actionable Items**: End with clear next steps or recommendations

RESPONSE REQUIREMENTS:
- Answer ONLY based on the provided website content
- If information is missing: "*This information is not available in the website content*"
- Quote specific relevant passages when appropriate
- Professional yet approachable tone
- Comprehensive but concise
- Well-organized and scannable`,
        maxOutputTokens: 800,
        temperature: 0.6,
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

    const prompt = `You are a helpful assistant that creates concise summaries of website content.

Please provide a brief summary of this website content from ${url}:

${content}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 300,
        temperature: 0.5,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error summarizing website:", error);
    throw error;
  }
}
