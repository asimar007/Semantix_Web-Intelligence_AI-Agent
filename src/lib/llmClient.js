import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateResponse(query, contextChunks, url) {
  try {
    const context = contextChunks.map((chunk) => chunk.text).join("\n\n");

    const systemPrompt = `You are a helpful assistant that answers questions based on the content of a specific website. 

Website URL: ${url}

You should:
1. Answer questions based solely on the provided context from the website
2. If the context doesn't contain enough information to answer the question, say so clearly
3. Be concise but comprehensive in your responses
4. Quote specific parts of the content when relevant
5. When providing URLs or links, always include the full URL (starting with http:// or https://) so they become clickable
6. When providing email addresses, format them as plain email addresses (user@domain.com) so they become clickable
7. When providing image URLs, include the full URL so they become clickable
8. If asked about contact details, external links, or images, prioritize information from the "Emails", "Links", and "Images" sections
9. Format links and image URLs on separate lines when listing multiple items for better readability
10. If asked about something not covered in the website content, politely explain that the information isn't available in the provided content

Context from the website:
${context}

User Question: ${query}`;

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
    const content = chunks.slice(0, 10).join("\n\n"); // Use first 10 chunks for summary

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
