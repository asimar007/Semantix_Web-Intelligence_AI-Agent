import { CloudClient } from "chromadb";

// ChromaDB Cloud configuration
const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});

const COLLECTION_NAME = "website_chunks_google";

let myCollection = null;

async function init() {
  if (!myCollection) {
    myCollection = await client.getOrCreateCollection({
      name: COLLECTION_NAME,
    });
  }
  return myCollection;
}

export async function storeChunks(chunks, embeddings, url) {
  const collection = await init();
  await clearUrlDocuments(url, collection);

  const timestamp = new Date(Date.now()).toLocaleString();

  const ids = [];
  const metadatas = [];

  const documents = chunks.map((chunk, index) => {
    ids.push(`${url}::${timestamp}::${index}`);
    metadatas.push({
      url,
      chunk_index: index,
      timestamp,
      chunk_length: chunk.length,
    });
    return chunk;
  });

  await collection.add({ ids, embeddings, documents, metadatas });

  return { success: true, chunks_stored: documents.length };
}

export async function searchSimilarChunks(
  queryEmbedding,
  topK = 5,
  url = null
) {
  const collection = await init();
  const where = url ? { url } : undefined;

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: topK,
    where,
  });

  const docs = results.documents?.[0];
  if (!docs?.length) return [];

  return docs.map((text, i) => ({
    text,
    metadata: results.metadatas[0][i],
    distance: results.distances[0][i],
  }));
}

export async function clearUrlDocuments(url, existingCollection = null) {
  const collection = existingCollection || (await init());
  const results = await collection.get({ where: { url } });
  if (results.ids?.length) {
    await collection.delete({ ids: results.ids });
  }
}

export async function getAllStoredUrls() {
  const collection = await init();
  const results = await collection.get();
  const metas = results.metadatas;
  if (!metas?.length) return [];
  return [...new Set(metas.map((m) => m.url))];
}
