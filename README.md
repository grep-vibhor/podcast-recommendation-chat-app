# Podcast Recommendation Chat App

A RAG based chatbot that provides personalized podcast recommendations based on user interactions. The system uses ChromaDB for vector storage and OpenAI's chat models for natural language interactions.

## Features

* Vector embedding generation for podcast metadata
* Efficient similarity search using ChromaDB
* Natural conversation interface powered by OpenAI
* Support for filtering by podcast duration and categories

## Tech Stack

* Python 3.9+
* ChromaDB for vector storage
* OpenAI API for embeddings and chat
* JavaScript
* Node verion v18.12.1
* Docker for running chromaDB



## Usage

1. Clone the repo

2. Install the packages
```bash
npm install
```

3. Export OPENAI API Key
```bash
export OPENAI_API_KEY=sk-proj-........
```


4. Run an async chroma db server on docker in a different tab
```bash
docker pull chromadb/chroma
docker run -p 8000:8000 chromadb/chroma  
curl http://localhost:8000/api/v1/heartbeat
```


5. Modify data in `content.js` as per your need. Current data consists of random podcasts.

6. Setup chromaDB collection where embeddings will reside.
	node create_collection.js

7. Create and push embeddings to chromaDB.
	node data_embeddings.js


8. Chat with your system. Modify query variable in chat.js to put your query like:
```bash
vim chat.js
```

```javascript
const query = "Give me some podcasts related to technology which are less than 1 hour";

const query = "Suggest me some podcasts for children";

const query = "What are some space related podcasts I can watch?";

const query = "What podcasts I can watch as a history enthusiast which are not more that 1 hour";
```

And run:

```bash
node chat.js
```
