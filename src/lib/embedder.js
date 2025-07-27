import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function chunkText(text, chunkSize = 800, overlap = 100) {
  if (!text || typeof text !== "string") return [];

  // Limit text size to prevent memory issues
  if (text.length > 50000) {
    text = text.substring(0, 50000);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSize,
    chunkOverlap: overlap,
    lengthFunction: (text) => text.length,
    separators: ["\n\n", "\n", " ", ""],
  });

  const chunks = await splitter.splitText(text);

  // Filter and limit chunks
  const filteredChunks = chunks
    .filter((chunk) => chunk.trim().length > 50)
    .slice(0, 50);

  return filteredChunks;
}

export async function createEmbedding(text) {
  if (!text?.trim()) throw new Error("Text is required for embedding");
  if (!process.env.GOOGLE_API_KEY)
    throw new Error("Google API key not configured");

  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text.trim(),
    });

    const embedding = response.embeddings[0].values;
    return embedding;
  } catch (error) {
    throw new Error(`Failed to create embedding: ${error.message}`);
  }
}

export async function createEmbeddings(textArray) {
  if (!Array.isArray(textArray) || textArray.length === 0) {
    throw new Error("TextArray must be a non-empty array");
  }

  const chunks = textArray.length > 50 ? textArray.slice(0, 50) : textArray;
  const embeddings = [];

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await createEmbedding(chunks[i]);
    embeddings.push(embedding);

    if (i < chunks.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  return embeddings;
}
