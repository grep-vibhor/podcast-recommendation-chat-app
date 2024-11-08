import {chroma, COLLECTION_NAME} from './utils.js';

const collection = await chroma.createCollection({
    name: COLLECTION_NAME,
  });
