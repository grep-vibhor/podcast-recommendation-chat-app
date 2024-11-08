import {openai,chroma, COLLECTION_NAME} from './utils.js';
import podcasts from './content.js'
import { v4 as uuidv4 } from 'uuid'; 



async function createEmbeddingAndStore(input, collection) {
  const data = await Promise.all(
    input.map( async (textChunk) => {
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: textChunk
        });
        return { 
          podcast: textChunk, 
          embedding: embeddingResponse.data[0].embedding,
          id: uuidv4() 
        }
    })
  );
  // Separate the data into three arrays
  const podcasts = data.map(item => item.podcast);
  const embeddings = data.map(item => item.embedding);
  const ids = data.map(item => item.id);

  await collection.add({
    documents: podcasts,
    ids,
    embeddings
  });

  console.log('Embeddings and Store complete!');
}


const chroma_collection = await chroma.getOrCreateCollection({
    name: COLLECTION_NAME,
  });

await createEmbeddingAndStore(podcasts, chroma_collection)

