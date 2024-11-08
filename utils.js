import OpenAI from 'openai';
import { ChromaClient } from "chromadb";


/** OpenAI config */
if (!process.env.OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");



export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

/** ChromaDB client */
export const chroma = new ChromaClient();
export const COLLECTION_NAME = "rag_collection"


