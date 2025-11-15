import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runAgent(note) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are Markdown Mark. Summarize documentation into a readable format."
      },
      {
        role: "user",
        content: note
      }
    ]
  });

  return response.choices[0].message.content;
}
