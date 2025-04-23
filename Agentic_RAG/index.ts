import { runMemoryAgent, runAiSupportAgent } from "./agents";

async function main() {
  // const query = "What is Atlassian?";
  // const query = "What are the core values of Atlassian?";
  const query = "What is agent parallelization?";
  const chunks = await runMemoryAgent(query);

  const completion = await runAiSupportAgent({
    chunks,
    query,
  });

  console.log("Completion:", completion);
}

main();
