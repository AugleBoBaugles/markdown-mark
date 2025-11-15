import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runAgent(note, mode = "summarize", level = "intermediate") {
    let systemPrompt = "You are Markdown Mark. Summarize documentation into a readable format. (in markdown)";

    if (mode === "simplify") {
        systemPrompt = "You are Markdown Mark. Make the following text simpler, clearer, and easier to understand. (in markdown)";
    } else if (mode === "shorten") {
        systemPrompt = "You are Markdown Mark. Shorten the following text while preserving meaning. (in markdown)";
    } else if (mode === "addExamples") {
        systemPrompt = "You are Markdown Mark. Add helpful examples to clarify the concepts in the following text. (in markdown)";
    } else if (mode === "compareWithOtherTools"){
        systemPrompt = "You are Markdown Mark. Add comparisons with other similar tools in the following text. (in markdown)";
    }

    if (level == "beginner"){
        systemPrompt + " Explain this like I'm a beginner level."
    }
    else if (level == "intermediate"){
        systemPrompt + " Explain this like I'm a intermediate level."
    }
    else if (level == "expert"){
        systemPrompt + " Explain this like I'm a expert level."
    }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: note }
    ]
  });

  return response.choices[0].message.content;
}
