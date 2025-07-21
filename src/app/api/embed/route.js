import { NextResponse } from "next/server";
import { chunkText, createEmbeddings } from "@/lib/embedder";
import { storeChunks } from "@/lib/vectorStore";

const EMBEDDING_TIMEOUT_MS = 300000; // 5 minutes

export async function POST(req) {
  const { content, url } = await req.json();

  if (!content || !url) {
    return NextResponse.json(
      { error: "Content and URL are required" },
      { status: 400 }
    );
  }

  const chunks = await chunkText(content);
  if (!chunks.length) {
    return NextResponse.json(
      { error: "No content chunks could be created" },
      { status: 400 }
    );
  }

  const embeddings = await Promise.race([
    createEmbeddings(chunks),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Embedding process timeout after 5 minutes")),
        EMBEDDING_TIMEOUT_MS
      )
    ),
  ]);

  const storeResult = await storeChunks(chunks, embeddings, url);

  return NextResponse.json({
    success: true,
    message: "Content successfully processed and stored",
    chunksCreated: chunks.length,
    url,
    storeResult,
  });
}
