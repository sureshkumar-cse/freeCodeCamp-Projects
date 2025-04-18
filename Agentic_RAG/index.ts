import { runMemoryAgent, runAiSupportAgent } from "./agents";

async function main() {
  const query = "What are the core values of Atlassian?";
  // const query = "List all the core values of Atlassian by visiting the core value's webpage?";
  // const query = "What is Atlassian?";
  const chunks = await runMemoryAgent(query);

  const completion = await runAiSupportAgent({
    chunks,
    query,
  });

  console.log("Completion:", completion);
}

main();
