import { runAgent } from "./agent.js";
const input = process.argv.slice(2).join(" ");
const output = await runAgent(input);

console.log("\n--- MARKDOWN MARK OUTPUT ---\n");
console.log(output);
