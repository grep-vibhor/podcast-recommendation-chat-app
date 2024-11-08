import {openai, chroma, COLLECTION_NAME} from './utils.js';

// Query about our data
const query = "Give me some podcasts related to technology which are less than 1 hour";

main(query);

async function main(input) {
  const embedding = await createEmbedding(input);
  const match = await findNearestMatch(embedding);
  await getChatCompletion(match, input);
}

// Create an embedding vector representing the query
async function createEmbedding(input) {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input
  });
  return embeddingResponse.data[0].embedding;
}

// Query Chroma and return a semantically matching text chunk
async function findNearestMatch(embedding) {
  
  const collection = await chroma.getOrCreateCollection({
    name: COLLECTION_NAME,
  });

  try{
    const results = await collection.query({
        queryEmbeddings: [embedding],
        nResults: 2, // how many results to return
      });
    
      // Manage multiple returned matches
      const match = results.documents[0].map(doc => doc).join('\n');
      return match;
    }
    catch(err){
      console.log(err)
    }
  
}

// Use OpenAI to make the response conversational
const chatMessages = [{
    role: 'system',
    content: `You are an enthusiastic podcast expert who loves recommending podcasts to people. You will be given two pieces of information - some context about podcasts episodes and a question. Your main job is to formulate a short answer to the question using the provided context. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.` 
}];

async function getChatCompletion(text, query) {
  chatMessages.push({
    role: 'user',
    content: `Context: ${text} Question: ${query}`
  });
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: chatMessages,
    temperature: 0.5,
    frequency_penalty: 0.5
  });
  console.log(response.choices[0].message.content);
}
