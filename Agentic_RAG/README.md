# Agentic RAG AI Agents (TypeScript + Gemini 2.0 Flash)

## Overview

This project is a TypeScript implementation of an **Agentic RAG** (Retrieval-Augmented Generation) system. It demonstrates how to build an AI agent that can retrieve information from a knowledge base and generate answers using a Large Language Model (LLM). The project follows a freeCodeCamp tutorial on building RAG AI agents ([How to Build RAG AI Agents with TypeScript By Maham Codes](https://www.freecodecamp.org/news/how-to-build-rag-ai-agents-with-typescript/)), but uses **Google’s Gemini 2.0 Flash** LLM API instead of OpenAI. By the end of this guide, you will have an application that:

- **Creates an AI Memory:** Initializes a vector database of knowledge (semantic memory) and loads documents into it.
- **Retrieves Context:** Uses semantic search to fetch relevant document chunks for a given query (Retrieval step).
- **Generates Answers:** Employs an LLM (via a Langbase Pipe Agent) to produce a comprehensive response using the retrieved context (Generation step).

Core technologies and APIs: This project uses the [Langbase SDK](https://langbase.com/docs/sdk) for managing AI memory and agents, and the **Google Gemini 2.0 Flash** API for text embeddings and answer generation.

## Features

- **AI Memory Creation:** Set up a persistent semantic memory (vector store) to hold embeddings of your documents for context retrieval.
- **Document Ingestion & Retrieval:** Easily upload documents (text files) into memory and query them to retrieve relevant chunks using semantic similarity search.
- **LLM Integration (Gemini 2.0 Flash):** Integrate with a state-of-the-art LLM (Google’s Gemini 2.0 Flash) to generate answers. The Gemini model provides a large context window and high throughput, enabling the agent to handle complex queries efficiently.
- **Agentic Pipeline:** Implements an agentic pipeline where a **Memory Agent** fetches contextual data and a **Support Agent** (Pipe) uses that context to answer queries.
- **Cited Responses:** The system prompt is designed to produce answers that cite their source documents, making responses transparent and verifiable.
- **Configurable & Extensible:** You can plug in different embedding models or LLM providers by configuring API keys in Langbase. In this project, we use Google’s Gemini API for both embeddings and completions, but you could swap in others (e.g. Anthropic, Cohere) if needed.

## Prerequisites

- **Node.js** (v14 or above recommended) and **npm** (Node Package Manager) installed.
- A **Langbase** account with an API key. Sign up at [Langbase](https://langbase.com/signup) and obtain your personal API key (required to use Langbase SDK services for memory and agent management).
- A **Google Gemini API key** for the LLM. Sign up for access to Google’s Gemini 2.0 API (via Google AI Studio) and get an API key ([Get a Gemini API key  |  Google AI for Developers](https://ai.google.dev/gemini-api/docs/api-key)). This key will be used to allow Langbase (or your local environment) to call the Gemini LLM. Ensure you have enabled the appropriate Google AI services on your account.
- Basic knowledge of TypeScript/JavaScript and the command line.

> **Note:** Using the Gemini API may require a Google Cloud project and enabling the Generative AI API. Google offers a free trial tier, but usage beyond that may incur costs. Monitor your API usage accordingly.

## Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

First, clone this repository and navigate into the project directory:

```bash
git clone https://github.com/sureshkumar-cse/freeCodeCamp-Projects.git
cd freeCodeCamp-Projects/Agentic_RAG
```

> _Alternatively, you can create a new project from scratch by making a directory and initializing a Node.js project. For example:_
>
> ```bash
> mkdir agentic-rag && cd agentic-rag
> npm init -y && touch index.ts agents.ts create-memory.ts upload-docs.ts create-pipe.ts
> ```

### 2. Install Dependencies

Install the necessary packages via npm:

```bash
npm install langbase dotenv
```

- **langbase:** The Langbase SDK for managing memories and agents.
- **dotenv:** Loads environment variables from a `.env` file.

_(Dev dependencies such as TypeScript or a TS runner are optional. This project uses `npx tsx` to run TypeScript files without a separate compile step.)_

### 3. Configure Environment Variables

Create a file named `.env` in the project root to store your API keys. Add the following entries:

```plaintext
LANGBASE_API_KEY = <your-langbase-api-key>
GOOGLE_API_KEY = <your-gemini-api-key>
```

- **LANGBASE_API_KEY:** Your Langbase API key (required for all Langbase SDK calls).
- **GOOGLE_API_KEY:** Your Google Gemini API key. In Langbase, LLM calls will use the keys configured in your account’s keyset. It’s recommended to add your Google API key via **Langbase’s dashboard** for seamless integration. If you do so, you may not need `GOOGLE_API_KEY` in the `.env` (Langbase will utilize the key from your account settings). Otherwise, providing it here allows the SDK to use Gemini for local runs.

Ensure that your `.env` is not committed to version control for security. The project uses `dotenv/config` to load these values at runtime.

## Project Structure

After setup, your project files should look like this:

```
Agentic_RAG/
├── package.json
├── package-lock.json
├── .env                  # Environment variables (Langbase & Google API keys)
├── docs/                 # Directory for knowledge base documents
│   ├── agent-architectures.txt
│   └── langbase-faq.txt
├── create-memory.ts      # Script to create a new AI memory in Langbase
├── upload-docs.ts        # Script to upload documents into the AI memory
├── create-pipe.ts        # Script to create a Langbase Pipe (agent) for Q&A
├── agents.ts             # Module defining functions to run memory and pipe agents
└── index.ts              # Main script to tie everything together and run queries
```

**Key Scripts and Files:**

- **`create-memory.ts`:** Creates a new AI memory (vector store) on Langbase. This memory will hold our document embeddings. You can configure the memory’s name, description, and embedding model here. (By default, we name it `"knowledge-base"` and use a Google text-embedding model for Gemini.) Running this script will output details of the created memory (including an ID and name).
- **`upload-docs.ts`:** Reads files from the `docs/` directory and uploads them to the Langbase memory. Each document is automatically chunked, embedded, and stored via Langbase’s API. This populates the memory so that the agent can later retrieve relevant pieces of text. The script uses `langbase.memories.documents.upload()` for each file and logs success or failure for each upload.
- **`create-pipe.ts`:** Creates a new Pipe agent on Langbase (here called a support agent). A Pipe agent in Langbase is like a hosted chain/agent that can process messages with a given prompt and model. In this project, the support agent is configured with a system instruction to be a helpful assistant. Running this script registers the agent (named `"ai-support-agent"`) and prints its details.
- **`agents.ts`:** Contains functions that orchestrate the RAG process:
  - `runMemoryAgent(query: string)`: Uses `langbase.memories.retrieve()` to perform a semantic search on the memory for the given query. It retrieves the top-K relevant chunks (e.g. top 4) from our knowledge base.
  - `runAiSupportAgent({ chunks, query })`: Uses `langbase.pipes.run()` to run the support agent (created by `create-pipe.ts`) with a system prompt containing the retrieved chunks plus the user query. This function returns the LLM’s completion (the answer).
  - It also includes a helper `getSystemPrompt(chunks)` to format the retrieved chunks into the final system prompt (including instructions for citing sources).
- **`index.ts`:** The main entry-point script. It ties everything together by:

  1. Defining a sample user query (you can modify this to any question).
  2. Calling `runMemoryAgent(query)` to get relevant context chunks from the memory.
  3. Calling `runAiSupportAgent({ chunks, query })` to get a final answer from the LLM, using those chunks as context.
  4. Logging the answer to the console.

- **`docs/` folder:** Contains example text files that serve as the knowledge base. In this tutorial, we include two sample documents: an _Agent Architectures_ overview and a _Langbase FAQs_ document. You can replace or supplement these with your own `.txt` files. Ensure the `upload-docs.ts` script points to the correct filenames and uses the appropriate `contentType` (here we use `text/plain` for text files).

## Usage Guide (Step-by-Step)

Once you've installed everything and set up your API keys, follow these steps to run the RAG agent pipeline. **It’s important to run the scripts in order**, as each step builds on the previous ones (creating memory, uploading data, etc.):

### Step 4: Create the AI Memory

First, create a new AI memory to store our knowledge base:

```bash
npx tsx create-memory.ts
```

This will execute the `create-memory.ts` script, which uses the Langbase SDK to create a memory with the name and settings we specified (e.g. name: `"knowledge-base"`, embedding model: a Google Gemini embedding model). On success, it will print out an object with details of the created memory (including an `id` and `name`).

> **Note:** You only need to do this once. The memory is persisted in your Langbase account. If you run this again, you may create duplicate memories. You can log into Langbase to verify the memory exists. The memory’s **name** (here `"knowledge-base"`) is used in later steps to reference it.

### Step 5: Add Documents to the Memory

Next, upload documents into the memory so the agent has knowledge to draw from. Make sure you have your text files ready in the `docs/` directory (for example, the provided `agent-architectures.txt` and `langbase-faq.txt`):

```bash
npx tsx upload-docs.ts
```

This script will read each file and upload it to Langbase using your memory. For each document, it calls the Langbase API to embed the content and store it under the memory `"knowledge-base"`. You should see console messages indicating whether each document was uploaded successfully (e.g., “✓ Intro doc uploaded” or “✓ FAQ doc uploaded”).

After this step, your AI memory now contains vectorized representations of the documents, meaning it’s ready to be queried. _(You can add more documents by placing them in `docs/` and re-running this step to update the memory.)_

### Step 6: Perform a Retrieval Query (Memory Agent)

Now that the knowledge base is set up, let’s test the retrieval part of RAG. We’ll query the memory for relevant info without generating a full answer yet, just to ensure our memory agent works correctly.

Open **`agents.ts`** and inspect the function `runMemoryAgent`. It uses `langbase.memories.retrieve()` with our memory name and a query string to get relevant chunks. For example, the code might use a sample query like:

```ts
const chunks = await langbase.memories.retrieve({
  query: "What is agent parallelization?",
  topK: 4,
  memory: [{ name: "knowledge-base" }],
});
console.log(chunks);
```

We have also set up `index.ts` to call `runMemoryAgent` and log the returned chunks. To execute this retrieval test, run:

```bash
npx tsx index.ts
```

_(If you have already updated `index.ts` to the final version, it will perform both retrieval and answer generation. In that case, you will get an answer directly. But you can still observe the logged chunks in the output.)_

After running this, you should see an array of memory chunks printed to the console. Each chunk includes a piece of text from your documents, a similarity score, and metadata (like the source document name). For example, a retrieved chunk might look like:

```json
{
  "text": "... (excerpt from agent-architectures.txt about 'Agent Parallelization') ...",
  "similarity": 0.7146,
  "meta": {
    "docName": "agent-architectures.txt",
    "category": "Examples",
    "topic": "Agent architecture"
  }
}
```

This confirms that the Memory Agent can find relevant context from the uploaded docs for a given query.

### Step 7: Create the Support Agent (Pipe)

Now we will create an AI agent that can generate answers using the retrieved context. We use Langbase’s **Pipe** feature to set up an agent with a prompt. Our agent (named `"ai-support-agent"`) will act as a support assistant that always gives accurate, concise information.

Run the following command to execute `create-pipe.ts`:

```bash
npx tsx create-pipe.ts
```

This script uses `langbase.pipes.create()` to create a new pipe agent on Langbase. In our code, we define the agent with a system role message such as:

```ts
role: "system",
content: "You are a helpful AI assistant. You will assist users with their queries. Always ensure you provide accurate and to-the-point information."
```

When you run the script, it will output the details of the created agent (such as its name and ID). Like the memory, this agent is persisted in Langbase. You only need to create it once; subsequent runs of the pipeline will reuse the agent by name.

### Step 8: Generate a RAG Response (Full Pipeline)

Finally, we can retrieve context _and_ get an answer from the LLM in one go. Ensure that `agents.ts` contains the function `runAiSupportAgent` and the helper `getSystemPrompt` as described in the code overview. The `runAiSupportAgent` function will:

1. Take the retrieved `chunks` and the user `query`.
2. Build a system prompt that includes the content of those chunks as contextual knowledge. (It concatenates chunk texts and includes instructions telling the AI to only answer using that context and to cite sources.)
3. Call `langbase.pipes.run()` to invoke the `"ai-support-agent"` with the system prompt and the user query. Langbase will send this request to the underlying LLM (Google’s Gemini in our case) and get a completion.
4. Return the completion (answer text).

In `index.ts`, we tie it all together. The final `index.ts` should look like:

```ts
import { runMemoryAgent, runAiSupportAgent } from "./agents";

async function main() {
  const query = "What is agent parallelization?"; // example query
  const chunks = await runMemoryAgent(query);
  const completion = await runAiSupportAgent({ chunks, query });
  console.log("Completion:", completion);
}

main();
```

Now run the index script to get the answer:

```bash
npx tsx index.ts
```

This time, the program will retrieve the chunks and then feed them to the support agent, ultimately printing out the answer from the LLM.

You should see a helpful answer to the question, using information from the documents. For example:

```
Completion: Agent parallelization is a technique used to speed up the execution of tasks by distributing them across multiple agents that work concurrently [1]. This approach is particularly useful in environments where tasks can be broken down into smaller, independent units of work, allowing for simultaneous processing and reduced overall completion time [1].


 [1] parallel-agents.pdf
```

The answer may also include citations like “[1]” referencing the source documents (depending on how the system prompt was structured in `getSystemPrompt`). In our prompt, we instructed the AI to cite sources, so it will list the document names as references at the end of the answer (e.g., “[1] parallel-agents.pdf”).

**Congratulations – you have now built and run an Agentic RAG system!** 🎉 The agent retrieved relevant context from the knowledge base and used it to generate an informed answer with sources.

## How to Run New Queries & Customize

- **Asking Different Questions:** To ask a new question, simply change the `query` string in `index.ts` (or modify the code to accept user input) and run the script again. The pipeline will retrieve new context and the LLM will generate a new answer based on that context.
- **Updating Documents:** You can add or remove documents in the `docs/` folder and rerun `upload-docs.ts` to update the memory. This allows you to extend the knowledge base with your own data (documentation, notes, etc.).
- **Adjusting Retrieval Size:** The `topK` parameter in `runMemoryAgent` (default 4) controls how many chunks are retrieved from memory for a query. You can adjust this if you want the LLM to have more or fewer context pieces to work with.
- **Tweaking the Prompt:** The system prompt constructed in `getSystemPrompt` can be refined. For instance, you might change the instructions on answer format or style. Just be careful to maintain the part that tells the AI to use the provided context and cite sources, to ensure factual and traceable answers.
- **Using Different Models:** While this implementation uses Google’s Gemini, Langbase allows integration with various providers. By providing different API keys (or switching the model configuration in code), you could experiment with other LLMs. For example, you could try OpenAI’s GPT-4, Cohere, Anthropic Claude, etc., by adjusting the agent’s model or the available keys. Ensure to update the environment variables and Langbase configuration accordingly.

## Additional Notes

- **Langbase SDK:** Langbase abstracts away a lot of complexity. By using the Langbase API key, we can create memories and agents without managing our own vector database or hosting LLM inference servers. Under the hood, Langbase uses the embedding model and LLM of your choice (configured via API keys or their platform). In our case, we used Google’s Gemini models for both embeddings and generation. You could configure alternatives (e.g., Cohere embeddings, OpenAI or Anthropic for generation) by providing those API keys to Langbase or specifying the model in the agent configuration.
- **API Usage and Costs:** Remember that using the Gemini API (for embeddings or text completions) may incur usage costs. Google’s generative AI services have their own pricing model (with a free tier for trial). This tutorial uses small text files and a single question, which should fall well within free usage, but be mindful if you upload very large documents or ask many questions in a loop. Monitor your usage in the Google Cloud console or AI Studio, and consider setting quotas or limits as needed.
- **Error Handling:** For brevity, the scripts do minimal error handling. In a production setting, you should add checks for missing API keys, handle failed API calls or timeouts, and gracefully handle cases where no relevant context is found for a query.
- **Managing Duplicates:** If you re-run the setup scripts, you might create multiple memories or agents with the same name on Langbase. Langbase allows referencing by name (using the first match it finds), but it’s good practice to avoid duplicates. You can manage or delete existing memories/agents via the Langbase dashboard if needed. Keeping unique names or cleaning up duplicates will prevent any ambiguity.
- **Performance Considerations:** Gemini 2.0 Flash is optimized for fast responses and can handle very large context windows. This means the system can scale to bigger knowledge bases or longer queries better than many traditional models. However, always consider the trade-offs—larger context or more documents can slow down retrieval and increase LLM processing time. Optimize `topK` and document chunk sizes for your use case.

## Acknowledgments

This project was inspired by the freeCodeCamp article _“How to Build RAG AI Agents with TypeScript”_. Special thanks to `freeCodeCamp` and `Maham Codes` for the comprehensive tutorial that formed the foundation of this implementatio. The adaptation to Google’s Gemini API was made to explore using the latest Google LLM for the agentic RAG pipeline.

## License

This repository is open-sourced under the **BSD 3-Clause License**. See the `LICENSE` file (or the header in `package.json`) for details. You are free to use, modify, and distribute this project in accordance with the license terms.
