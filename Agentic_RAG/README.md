# Agentic RAG AI Agents (TypeScript Implementation)

## Overview

This project is a TypeScript implementation of an **Agentic RAG** (Retrieval-Augmented Generation) system. It demonstrates how to build an AI agent that can **retrieve information from a knowledge base and generate answers** using a Large Language Model (LLM). The project follows a freeCodeCamp tutorial on building RAG AI agents with the **Langbase** SDK and OpenAI. By the end of this guide, you will have an application that:

- Creates an AI **memory** (vector database of knowledge) and loads documents into it.
- Uses **semantic search** to retrieve relevant document chunks for a given query (Retrieval step).
- Employs an LLM (via Langbase **Pipe Agent**) to generate a comprehensive response using the retrieved context (Generation step).

**Core technologies and APIs:** This project uses the [Langbase SDK](https://langbase.com) for managing AI memory and agents, and the OpenAI API (via Langbase integration) for text embeddings and answer generation.

## Features

- **AI Memory Creation:** Set up a persistent memory (vector store) to hold embeddings of your documents for context retrieval.
- **Document Ingestion & Retrieval:** Easily upload documents (text files) into memory and query them to retrieve relevant chunks using semantic similarity search.
- **LLM Integration:** Integrate with an LLM (e.g. OpenAI’s GPT) to generate answers. Langbase pipes manage the LLM calls using your configured API keys.
- **Agentic Pipeline:** Implements an agent pipeline where a **Memory Agent** fetches context and a **Support Agent** (pipe) uses that context to answer queries.
- **Cited Responses:** The system prompt is designed to produce answers that cite source documents, making the responses transparent and verifiable.
- **Configurable and Extensible:** You can plug in different embedding models or LLM providers (OpenAI, Anthropic, etc.) by configuring API keys in Langbase, and expand the memory with your own documents.

## Prerequisites

- **Node.js** (v14 or above recommended) and **npm** (Node Package Manager) installed.
- A **Langbase account** with an API key. Sign up at [Langbase](https://langbase.com) and obtain your personal API key (required to use Langbase SDK services).
- An **OpenAI API key** (or another supported LLM provider’s key). For this tutorial, we use OpenAI to provide embeddings and completions. Make sure to add your OpenAI API key to your Langbase account’s LLM API keys section (or have it ready for configuration).
- Basic knowledge of TypeScript/JavaScript and the command line.

## Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

First, clone this repository and navigate into the project directory:

```bash
git clone https://github.com/sureshkumar-cse/freeCodeCamp-Projects.git
cd freeCodeCamp-Projects/Agentic_RAG
```

> _Alternatively,_ you can create a new project from scratch by making a directory and initializing a Node.js project. For example:
>
> ```bash
> mkdir agentic-rag && cd agentic-rag
> npm init -y
> ```
>
> Then create the required TypeScript files (`index.ts`, `agents.ts`, `create-memory.ts`, `upload-docs.ts`, `create-pipe.ts`) in the project directory.

### 2. Install Dependencies

Install the necessary packages via npm:

```bash
npm install langbase dotenv
```

- **langbase:** The Langbase SDK for managing memories and agents.
- **dotenv:** Loads environment variables from a `.env` file.

_(Dev Dependencies such as TypeScript or TSX runner are optional. This project uses `npx tsx` to run TypeScript files without a separate compile step.)_

### 3. Configure Environment Variables

Create a file named **`.env`** in the project root to store your API keys. Add the following entries:

```bash
LANGBASE_API_KEY = <your-langbase-api-key>
# (Optionally, if not adding to Langbase account:)
OPENAI_API_KEY = <your-openai-api-key>
```

- **LANGBASE_API_KEY:** Your Langbase API key (required for all Langbase SDK calls).
- **OPENAI_API_KEY:** _Optional:_ Your OpenAI API key. In Langbase, LLM calls will use the keys configured in your account profile. It’s recommended to add your OpenAI key via [Langbase’s dashboard](https://langbase.com/docs/examples/build-agentic-rag#step-3-add-llm-api-keys) for seamless integration. If you do so, you may not need to use `OPENAI_API_KEY` in the code, as Langbase will automatically utilize the provided key.

Ensure that `.env` is **not committed to version control** for security. The project uses `dotenv/config` to load these values at runtime.

## Project Structure

After setup, your project files should look like this:

```
Agentic_RAG/
├── package.json
├── package-lock.json
├── .env                 # Environment variables (Langbase/OpenAI API keys)
├── docs/                # Directory for knowledge base documents
│   ├── agent-architectures.txt
│   └── langbase-faq.txt
├── create-memory.ts     # Script to create a new AI memory in Langbase
├── upload-docs.ts       # Script to upload documents into the AI memory
├── create-pipe.ts       # Script to create a Langbase Pipe (agent) for Q&A
├── agents.ts            # Module defining functions to run memory and pipe agents
└── index.ts             # Main script to tie everything together and run queries
```

**Key Scripts and Files:**

- **`create-memory.ts`:** Creates a new AI memory (vector store) on Langbase. This memory will hold our document embeddings. You can configure the memory’s name, description, and embedding model here. (By default, we name it `"knowledge-base"` and use an OpenAI text-embedding model.) Running this script will output the created memory details (including an ID and name).

- **`upload-docs.ts`:** Reads files from the `docs/` directory and uploads them to the Langbase memory. Each document is embedded and stored via Langbase’s API. This allows the agents to later retrieve relevant pieces of text. The script uses `Langbase.memories.documents.upload()` for each file and logs success or failure for each upload.

- **`create-pipe.ts`:** Creates a new **Pipe agent** on Langbase (here called a support agent). A pipe agent in Langbase is like a hosted chain or agent that can process messages with a given prompt and model. In this project, the support agent is configured with a system instruction to be a helpful assistant. (It will later be used to generate answers for user queries.) Running this script registers the agent (named `"ai-support-agent"`) and prints its details.

- **`agents.ts`:** Contains functions that orchestrate the RAG process:

  - `runMemoryAgent(query: string)`: Uses `langbase.memories.retrieve()` to perform a semantic search on the memory for the given query. It retrieves the top-k relevant chunks (e.g., top 4) from our knowledge base.
  - `runAiSupportAgent({ chunks, query })`: Uses `langbase.pipes.run()` to run the support agent (created by `create-pipe.ts`) with a system prompt containing the retrieved chunks plus the user query. This function returns the LLM’s completion (answer).
  - It also includes a helper `getSystemPrompt(chunks)` to format the retrieved chunks into the system prompt (including instructions for citing sources).

- **`index.ts`:** The main entry-point script. It ties everything together by:

  1. Defining a sample user query (you can modify this).
  2. Calling `runMemoryAgent(query)` to get relevant context chunks from memory.
  3. Calling `runAiSupportAgent({ chunks, query })` to get a final answer from the LLM, using those chunks as context.
  4. Logging the answer to the console.  
     You can run this after setting up memory and the agent to see the full pipeline in action.

- **`docs/` folder:** Contains example text files that serve as the knowledge base. In this tutorial, we have two sample documents: an **Agent Architectures** overview and a **Langbase FAQs** document. You can replace or supplement these with your own `.txt` files. Ensure the `upload-docs.ts` script points to the correct filenames and that `contentType` is set appropriately (here we use `text/plain` for text files).

## Usage Guide (Step-by-Step)

Once you've installed everything and set up your API keys, you can follow these steps to run the RAG agent pipeline. **It’s important to run the scripts in order**, as each step builds on the previous ones (creating memory, uploading data, etc.).

### Step 4: Create the AI Memory

First, create a new AI memory to store our knowledge base:

```bash
npx tsx create-memory.ts
```

This will execute the `create-memory.ts` script, which uses the Langbase SDK to create a memory with the name and settings we specified (e.g., name: `"knowledge-base"`, embedding model: an OpenAI text embedding model). On success, it will print out an object with details of the created memory (including an `id` and `name`).

> _Note:_ You only need to do this **once**. The memory is persisted in your Langbase account. If you run this again, you may create duplicate memories. You can log into Langbase to verify the memory exists. The memory’s `name` (here `"knowledge-base"`) is used in later steps to reference it.

### Step 5: Add Documents to the Memory

Next, upload documents into the memory so the agent has knowledge to draw from. Make sure you have your text files ready in the `docs/` directory (for example, the provided `agent-architectures.txt` and `langbase-faq.txt`):

```bash
npx tsx upload-docs.ts
```

This script will read each file and upload it to Langbase using your memory. For each document, it calls the Langbase API to embed the content and store it under the memory `"knowledge-base"`. You should see console messages indicating whether each document was uploaded successfully (e.g., “✓ Agent doc uploaded” or “✓ FAQ doc uploaded”).

After this step, your AI memory now contains vectorized representations of the documents, meaning it’s ready to be queried. (You can add more documents by placing them in `docs/` and re-running this step, if desired.)

### Step 6: Perform a Retrieval Query (Memory Agent)

Now that the knowledge base is set up, let’s test the retrieval part of RAG. We’ll query the memory for relevant info **without** generating a full answer yet, just to ensure our memory agent works:

Open `agents.ts` and ensure the function `runMemoryAgent` is defined as shown (it should be, if you cloned this project). It uses `langbase.memories.retrieve()` with our memory name and a query string to get relevant chunks. For example, the code might use a sample query like:

```ts
const chunks = await langbase.memories.retrieve({
  query: "What is agent parallelization?",
  topK: 4,
  memory: [{ name: "knowledge-base" }],
});
```

We have also set up `index.ts` to call `runMemoryAgent` and log the returned chunks. To execute this retrieval test, run:

```bash
npx tsx index.ts
```

_(At this point, `index.ts` is just calling `runMemoryAgent` and printing the result. In a later step, we will extend it to get a full answer. If you have already updated `index.ts` to the final version, it will perform both retrieval and answer generation. You can still observe the logged chunks in the output.)_

After running this, you should see an array of **memory chunks** printed to the console. Each chunk includes a piece of text from your documents, a similarity score, and metadata (like the source document name). For example, a chunk might look like:

```js
{
  text: "... (excerpt from agent-architectures.txt about 'Agent Parallelization') ...",
  similarity: 0.7146,
  meta: { docName: 'agent-architectures.txt', category: 'Examples', topic: 'Agent architecture' }
}
```

This confirms that the **Memory Agent** can find relevant context for the query from the uploaded docs.

### Step 7: Create the Support Agent (Pipe)

Now we will create an AI agent that can generate answers using the retrieved context. We use Langbase’s **Pipe** feature to set up an agent with a prompt. Our agent (named `"ai-support-agent"`) will be a support assistant that always gives accurate, concise information.

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

Finally, we can retrieve context **and** get an answer from the LLM in one go. Ensure that `agents.ts` contains the function `runAiSupportAgent` and the helper `getSystemPrompt` as described in the code overview. The `runAiSupportAgent` function will:

1. Take the retrieved `chunks` and the user `query`.
2. Build a **system prompt** that includes the content of those chunks as contextual knowledge. (It concatenates chunk texts and includes instructions to the AI to only answer using that context and to cite sources.)
3. Call `langbase.pipes.run()` to invoke the `"ai-support-agent"` with the system prompt and the user query. Langbase will send this to the underlying LLM (e.g., OpenAI’s GPT) and get a completion.
4. Return the completion (answer text).

In `index.ts`, we tie it together. The final `index.ts` should look like:

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

This time, the program will retrieve the chunks **and then** feed them to the support agent, ultimately printing out the answer from the LLM.

You should see a helpful answer to the question, using information from the documents. For example:

```
Completion: Agent parallelization is a process that runs multiple LLM tasks simultaneously to enhance speed or accuracy...
1. **Sectioning**: A task is divided into independent parts that can be processed concurrently.
2. **Voting**: Multiple LLM calls generate different responses for the same task...
... In practice, agent parallelization involves orchestrating multiple specialized agents to handle different aspects of a task...
```

The answer may also include citations like `[1]` referencing the source document (depending on how the system prompt was structured in `getSystemPrompt`). In our prompt, we instructed the AI to cite sources, so it will list the document names as references at the end of the answer.

Congratulations – you have now built and run an **Agentic RAG** system! The agent retrieved relevant context from the knowledge base and used it to generate an informed answer.

## How to Run Queries and Customize

- To ask a different question, simply change the `query` string in `index.ts` and run the script again. The pipeline will retrieve new context and the LLM will generate a new answer.
- You can add or remove documents in the `docs/` folder and rerun `upload-docs.ts` to update the memory. This allows you to extend the knowledge base with your own data (documentation, notes, etc.).
- The `topK` parameter in `runMemoryAgent` (default 4) controls how many chunks are retrieved. You can adjust this if you want more or fewer context pieces.
- The system prompt in `getSystemPrompt` can be refined. For instance, you can change the instructions on how the answer should be formatted or what style to use. Just be careful to maintain the part that tells the AI to use the provided context and cite sources for faithfulness.

## Additional Notes

- **Langbase SDK:** Langbase abstracts away a lot of complexity. By using the Langbase API key, we can create memories and agents without managing our own databases or LLM server. Under the hood, Langbase uses the embedding model and LLM of your choice (configured via API keys or their platform). In our case, we used OpenAI’s embeddings (`text-embedding-ada` model under the alias `openai:text-embedding-3-large`) and likely an OpenAI Chat model for the agent. You could configure alternatives (e.g., Cohere embeddings, Anthropic Claude, etc.) by providing those API keys to Langbase.

- **OpenAI costs:** Remember that using OpenAI’s API (for embeddings or chat completions) will incur usage costs. This tutorial uses small text files and one question, which should be minimal, but be mindful if you upload large documents or ask many questions. Consider setting up usage limits or monitoring your API usage.

- **Error Handling:** For brevity, the scripts do minimal error handling. In a production setting, you might want to handle cases like missing API keys, failed API calls, or no results found from the memory.

- **Cleanup:** If you rerun the setup steps, you might create multiple memories or agents with the same name. You can manage or delete these via the Langbase dashboard if needed. Currently, the code always refers to them by name (which Langbase allows), so it will typically use the first matching name it finds. Keeping unique names or cleaning up duplicates is recommended.

## Conclusion

This README walked through creating an Agentic RAG system using TypeScript, Langbase, and OpenAI. You set up a semantic memory, ingested documents, and created an agent capable of answering questions with cited context. This architecture can be the foundation for building chatbots, documentation assistants, or any AI agent that needs to refer to external knowledge.

Feel free to explore further: you can integrate tools, use different models, or build a front-end to interact with this agent. For more information, check out the [Langbase documentation](https://langbase.com/docs) and OpenAI’s guides on working with their API. Good luck, and happy coding!
