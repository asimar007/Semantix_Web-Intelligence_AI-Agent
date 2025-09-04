import { NextResponse } from "next/server";
import { createEmbedding } from "@/lib/embedder";
import { searchSimilarChunks } from "@/lib/vectorStore";
import { generateResponse } from "@/lib/llmClient";

export async function POST(req) {
  const { query, url } = await req.json();

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
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

  const response = await generateResponse(query, relevantChunks, url);

  return NextResponse.json({
    response,
    relevantChunks: relevantChunks.length,
    query,
    url,
  });
}
