import { NextResponse } from "next/server";
import { createEmbedding } from "@/lib/embedder";
import { searchSimilarChunks } from "@/lib/vectorStore";
import { generateResponse } from "@/lib/llmClient";
import { checkContentRelevance, validateAIResponse } from "@/lib/guardrails";

export async function POST(req) {
  const { query, url } = await req.json();

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  // Input Guardrail: Check if query is relevant to website content
  const relevanceCheck = await checkContentRelevance(query, url);

  if (!relevanceCheck.isRelevant) {
    return NextResponse.json({
      response:
        "I can only answer questions about the website content you've processed. Please ask something related to the website, such as 'What is this website about?' or 'What services do they offer?'",
      relevantChunks: 0,
      query,
      url,
      blocked: true,
      reason: relevanceCheck.reason,
    });
  }

  const queryEmbedding = await createEmbedding(query);
  const relevantChunks = await searchSimilarChunks(queryEmbedding, 5, url);

  if (!relevantChunks.length) {
    return NextResponse.json({
      response:
        "I don't have any information about that topic from the website. Please make sure the website content has been processed first.",
      relevantChunks: 0,
      query,
      url,
    });
  }

  const aiResponse = await generateResponse(query, relevantChunks, url);

  // Output Guardrail: Validate AI response relevance
  const responseValidation = await validateAIResponse(aiResponse, query, url);

  const finalResponse = responseValidation.isRelevant
    ? aiResponse
    : responseValidation.sanitizedResponse;

  return NextResponse.json({
    response: finalResponse,
    relevantChunks: relevantChunks.length,
    query,
    url,
    validated: responseValidation.isRelevant,
  });
}
