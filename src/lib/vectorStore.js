import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const INDEX_NAME = "website-chunks-google";

let myIndex = null;

// Initialize Pinecone index, create if doesn't exist
async function init() {
  if (!myIndex) {
    const indexList = await pinecone.listIndexes();
    const indexExists = indexList.indexes?.some(
      (index) => index.name === INDEX_NAME
    );

    if (!indexExists) {
      await pinecone.createIndex({
        name: INDEX_NAME,
        dimension: 3072,
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 60000));
    }

    myIndex = pinecone.index(INDEX_NAME);
  }
  return myIndex;
}

// Store text chunks and their embeddings in Pinecone
export async function storeChunks(chunks, embeddings, url) {
  const index = await init();
  await clearUrlDocuments(url, index);

  const timestamp = new Date(Date.now()).toLocaleString();
  const validChunks = chunks.slice(0, embeddings.length);

  const vectors = validChunks.map((chunk, i) => {
    const embedding = embeddings[i];

    return {
      id: `${url}::${timestamp}::${i}`,
      values: embedding,
      metadata: {
        url,
        chunk_index: i,
        timestamp,
        chunk_length: chunk.length,
        text: chunk,
      },
    };
  });

  const batchSize = 100;
  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    await index.upsert(batch);
  }

  return { success: true, chunks_stored: vectors.length };
}

// Search for similar chunks using query embedding
export async function searchSimilarChunks(
  queryEmbedding,
  topK = 5,
  url = null
) {
  const index = await init();

  const queryOptions = {
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
    includeValues: false,
  };

  if (url) {
    queryOptions.filter = { url: { $eq: url } };
  }

  const results = await index.query(queryOptions);

  if (!results.matches?.length) return [];

  return results.matches.map((match) => ({
    text: match.metadata.text,
    metadata: {
      url: match.metadata.url,
      chunk_index: match.metadata.chunk_index,
      timestamp: match.metadata.timestamp,
      chunk_length: match.metadata.chunk_length,
    },
    distance: 1 - match.score,
  }));
}

// Delete all documents for a specific URL
export async function clearUrlDocuments(url, existingIndex = null) {
  const index = existingIndex || (await init());

  const queryResponse = await index.query({
    vector: new Array(3072).fill(0),
    topK: 10000,
    filter: { url: { $eq: url } },
    includeMetadata: false,
    includeValues: false,
  });

  if (queryResponse.matches?.length) {
    const idsToDelete = queryResponse.matches.map((match) => match.id);

    const batchSize = 1000;
    for (let i = 0; i < idsToDelete.length; i += batchSize) {
      const batch = idsToDelete.slice(i, i + batchSize);
      await index.deleteMany(batch);
    }
  }
}

// Get all unique URLs stored in the index
export async function getAllStoredUrls() {
  const index = await init();

  const stats = await index.describeIndexStats();
  if (stats.totalVectorCount === 0) return [];

  const queryResponse = await index.query({
    vector: new Array(3072).fill(0),
    topK: 10000,
    includeMetadata: true,
    includeValues: false,
  });

  if (!queryResponse.matches?.length) return [];

  const urls = queryResponse.matches
    .map((match) => match.metadata?.url)
    .filter((url) => url);

  return [...new Set(urls)];
}
