import "dotenv/config";
import { Langbase } from "langbase";
import { readFile } from "fs/promises";
import path from "path";

const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
  const cwd = process.cwd();
  const memoryName = "knowledge-base";

  // Upload Company Background document
  const agentArchitecture = await readFile(
    path.join(cwd, "docs", "Company-Background.txt")
  );
  const agentResult = await langbase.memories.documents.upload({
    memoryName,
    contentType: "text/plain",
    documentName: "Company-Background.txt",
    document: agentArchitecture,
    meta: { category: "Intro", topic: "Company Background" },
  });

  console.log(agentResult.ok ? "✓ Intro doc uploaded" : "✗ Intro doc failed");

  // Upload FAQ document
  const langbaseFaq = await readFile(
    path.join(cwd, "docs", "Knowledge-Base.txt")
  );
  const faqResult = await langbase.memories.documents.upload({
    memoryName,
    contentType: "text/plain",
    documentName: "Knowledge-Base.txt",
    document: langbaseFaq,
    meta: { category: "Support", topic: "Knowledge Base" },
  });

  console.log(faqResult.ok ? "✓ FAQ doc uploaded" : "✗ FAQ doc failed");
}

main();
