// server.js
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(express.json());

app.post("/api/run-agent", async (req, res) => {
  const { note, mode, level } = req.body;

  // Build system prompt based on mode
  let systemPrompt = "You are Markdown Mark. Summarize documentation into a readable format. (in markdown)";

  if (mode === "simplify") {
    systemPrompt = "You are Markdown Mark. Make the following text simpler, clearer, and easier to understand. (in markdown)";
  } else if (mode === "shorten") {
    systemPrompt = "You are Markdown Mark. Shorten the following text while preserving meaning. (in markdown)";
  } else if (mode === "addExamples") {
    systemPrompt = "You are Markdown Mark. Add helpful examples to clarify the concepts in the following text. (in markdown)";
  } else if (mode === "compareWithOtherTools") {
    systemPrompt = "You are Markdown Mark. Add comparisons with other similar tools in the following text. (in markdown)";
  }

  // Add level context
  if (level === "beginner") systemPrompt += " Explain this like I'm a beginner level.";
  else if (level === "intermediate") systemPrompt += " Explain this like I'm an intermediate level.";
  else if (level === "advanced") systemPrompt += " Explain this like I'm an expert level.";

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: note }
      ]
    });

    res.json({ output: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to run agent" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
