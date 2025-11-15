import React, { useState } from "react";

export default function MarkdownMark() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [placeholderSelected, setPlaceholderSelected] = useState(null);
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const levelButtons = ["Beginner", "Intermediate", "Advanced"];
  const placeholderButtons = ["Simplify", "Shorten", "Add Examples", "Compare"];

  const modeMap = {
    Simplify: "simplify",
    Shorten: "shorten",
    "Add Examples": "addExamples",
    Compare: "compareWithOtherTools",
  };

  const buttonStyle = (selected, isGo = false, isSmall = false) => ({
    padding: isSmall ? "6px 14px" : isGo ? "14px 28px" : "10px 20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: selected ? "#4285f4" : "white",
    color: selected ? "white" : "black",
    cursor: "pointer",
    fontWeight: selected ? "bold" : "normal",
    transition: "0.2s",
    outline: "none",
    ...(isGo && { width: "500px", textAlign: "center" }),
  });

  const handleGoClick = async () => {
    if (!text) return;

    const mode = placeholderSelected ? modeMap[placeholderSelected] : "summarize";
    const level = selectedLevel ? selectedLevel.toLowerCase() : "intermediate";

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
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px", gap: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px" }}>Markdown Mark</h1>

      <div style={{ display: "flex", gap: "15px" }}>
        {levelButtons.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            style={buttonStyle(selectedLevel === level)}
          >
            {level}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Paste URL or documentation here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "500px", height: "150px", padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #aaa" }}
      />

      <div style={{ display: "flex", gap: "15px" }}>
        {placeholderButtons.map((action) => (
          <button
            key={action}
            onClick={() => setPlaceholderSelected(action)}
            style={buttonStyle(placeholderSelected === action, false, true)}
          >
            {action}
          </button>
        ))}
      </div>

      <button onClick={handleGoClick} style={buttonStyle(false, true)}>
        GO
      </button>

      {output && (
        <textarea
          value={output}
          readOnly
          style={{ width: "500px", height: "200px", marginTop: "20px", padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #aaa" }}
        />
      )}
    </div>
  );
}
