import {chroma, COLLECTION_NAME} from './utils.js';

await chroma.deleteCollection({
    name: COLLECTION_NAME,
  });

console.log(`Deleted collection ${COLLECTION_NAME}`)

