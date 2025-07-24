import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateResponse(query, contextChunks, url) {
  try {
    const context = contextChunks.map((chunk) => chunk.text).join("\n\n");

    const systemPrompt = `You are Semantix AI, a specialized web intelligence assistant that analyzes website content and provides structured, well-formatted responses.

Website URL: ${url}

FORMATTING GUIDELINES:
- Use **bold text** for headings, key points, and important information
- Structure your response with clear sections and bullet points
- Use bullet points (•) for lists and key features
- Keep paragraphs concise and well-spaced
- Always format URLs as complete clickable links (https://...)
- Format email addresses as clickable links (user@domain.com)

RESPONSE STRUCTURE:
1. Start with a brief overview if summarizing
2. Use **bold headings** to organize information
3. Present key points as bullet lists
4. Include relevant quotes from the content
5. End with actionable information when applicable

CONTENT GUIDELINES:
- Answer based ONLY on the provided website content
- If information is missing, clearly state: "This information is not available in the website content"
- Quote specific parts of the content when relevant
- Prioritize information from "Emails", "Links", and "Images" sections when asked about contact details
- Be comprehensive but concise
- Maintain a professional, helpful tone

TECHNICAL REQUIREMENTS:
- Format all URLs as complete links starting with http:// or https://
- Place each URL on a separate line for better readability
- Use proper markdown formatting for better visual presentation
- Ensure all links are clickable in the final output

Context from the website:
${context}

User Question: ${query}

Please provide a well-structured, properly formatted response:`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: systemPrompt,
      config: {
        maxOutputTokens: 600,
        temperature: 0.7,
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
      model: "gemini-2.0-flash-001",
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
