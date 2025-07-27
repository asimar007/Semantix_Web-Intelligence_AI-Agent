import { DataAPIClient } from "@datastax/astra-db-ts";

// Astra DB configuration
const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);

const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);

const COLLECTION_NAME = "website_chunks_google";

let myCollection = null;

async function init() {
  if (!myCollection) {
    try {
      // Try to delete existing collection first
      await db.dropCollection(COLLECTION_NAME);
    } catch (error) {
      // Collection might not exist, that's fine
    }

    // Create collection with correct vector configuration
    myCollection = await db.createCollection(COLLECTION_NAME, {
      vector: {
        dimension: 3072, // Correct dimension for Gemini embeddings
        metric: "cosine",
      },
    });
  }
  return myCollection;
}

export async function storeChunks(chunks, embeddings, url) {
  const collection = await init();

  // Clear existing documents for this URL first
  await clearUrlDocuments(url);

  const timestamp = new Date(Date.now()).toLocaleString();

  // Prepare documents for Astra DB
  const documents = chunks.map((chunk, index) => ({
    _id: `${url}::${timestamp}::${index}`,
    text: chunk,
    $vector: embeddings[index], // Vector field
    metadata: {
      url,
      chunk_index: index,
      timestamp,
      chunk_length: chunk.length,
    },
  }));

  // Insert documents in batches (Astra DB recommends max 20 documents per batch)
  const batchSize = 20;
  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize);
    await collection.insertMany(batch);
  }

  return { success: true, chunks_stored: documents.length };
}

export async function searchSimilarChunks(
  queryEmbedding,
  topK = 5,
  url = null
) {
  const collection = await init();

  const filter = url ? { "metadata.url": url } : {};

  const results = await collection.find(filter, {
    sort: { $vector: queryEmbedding },
    limit: topK,
  });

  const docs = await results.toArray();

  if (!docs?.length) return [];

  return docs.map((doc) => ({
    text: doc.text,
    metadata: doc.metadata,
    distance: 1 - (doc.$similarity || 0), // Convert similarity to distance
  }));
}

export async function clearUrlDocuments(url) {
  const collection = await init();

  // Delete all documents with matching URL
  await collection.deleteMany({
    "metadata.url": url,
  });
}

export async function getAllStoredUrls() {
  const collection = await init();

  // Get all documents and extract unique URLs
  const results = await collection.find(
    {},
    {
      projection: { "metadata.url": 1 },
    }
  );

  const docs = await results.toArray();

  if (!docs?.length) return [];

  const urls = new Set();
  docs.forEach((doc) => {
    if (doc.metadata?.url) {
      urls.add(doc.metadata.url);
    }
  });

  return Array.from(urls);
}
