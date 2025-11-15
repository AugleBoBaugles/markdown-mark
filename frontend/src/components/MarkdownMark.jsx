import React, { useState } from "react";
import "../App.css";

export default function MarkdownMark() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [placeholderSelected, setPlaceholderSelected] = useState(null);
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const levelButtons = ["Beginner", "Intermediate", "Advanced"];
  const placeholderButtons = ["Simplify", "Shorten", "Add Examples", "Compare"];

  const modeMap = {
    Simplify: "simplify",
    Shorten: "shorten",
    "Add Examples": "addExamples",
    Compare: "compareWithOtherTools",
  };

  const handleGoClick = async () => {
    if (!text) return;
    const mode = placeholderSelected ? modeMap[placeholderSelected] : "summarize";
    const level = selectedLevel ? selectedLevel.toLowerCase() : "intermediate";

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("http://localhost:5000/api/run-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: text, mode, level }),
      });
      const data = await res.json();
      setOutput(data.output || "No output returned.");
    } catch (err) {
      console.error(err);
      setOutput("Error: Could not generate output. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="markdown-mark-container">
      <h1 className="markdown-mark-title">Markdown Mark</h1>

      {/* Level Buttons */}
      <div className="level-buttons">
        {levelButtons.map((level) => (
          <button
            key={level}
            className={selectedLevel === level ? "selected" : ""}
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Input Card */}
      <div className="card">
        <textarea
          className="textarea"
          placeholder="Paste URL or documentation here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Placeholder Buttons */}
        <div className="placeholder-buttons">
          {placeholderButtons.map((action) => (
            <button
              key={action}
              className={placeholderSelected === action ? "selected" : ""}
              onClick={() => setPlaceholderSelected(action)}
            >
              {action}
            </button>
          ))}
        </div>

        {/* GO Button */}
        <button className="go-button" onClick={handleGoClick}>
          {loading ? "Thinking..." : "GO"}
        </button>
      </div>

      {/* Output Card */}
      {output && (
        <div className="output-card">
          <textarea className="textarea" value={output} readOnly />
        </div>
      )}
    </div>
  );
}
