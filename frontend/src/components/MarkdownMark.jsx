import React, { useState } from "react";

export default function MarkdownMark() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [placeholderSelected, setPlaceholderSelected] = useState(null);
  const [text, setText] = useState("");

  const levelButtons = ["Beginner", "Intermediate", "Advanced"];
  const placeholderButtons = ["Simplify", "Shorten", "Add Examples", "Compare"];

  // Unified button styling
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

    // GO button color interactions (special)
    ...(isGo && {
      width: "500px", // match textbox width
      textAlign: "center",
    }),
  });

  // Inline pseudo-class workaround for React
  const applyGoButtonInteractions = (e) => {
    if (e.type === "mouseover") {
      e.target.style.backgroundColor = "#e6f0ff";
    }
    if (e.type === "mouseout") {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "black";
    }
    if (e.type === "mousedown") {
      e.target.style.backgroundColor = "#357ae8";
      e.target.style.color = "white";
    }
    if (e.type === "mouseup") {
      e.target.style.backgroundColor = "#e6f0ff";
      e.target.style.color = "black";
    }
    if (e.type === "focus") {
      e.target.style.borderColor = "#4285f4";
      e.target.style.boxShadow = "0 0 0 2px rgba(66,133,244,0.5)";
    }
    if (e.type === "blur") {
      e.target.style.borderColor = "#ccc";
      e.target.style.boxShadow = "none";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        gap: "20px",
        textAlign: "center",
      }}
    >
      <h6 style={{ fontSize: "32px", marginBottom: "10px" }}>Markdown Mark</h6>

      {/* Level Buttons */}
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

      {/* Textbox */}
      <textarea
        placeholder="Paste URL or documentation here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "500px",
          height: "150px",
          padding: "10px",
          fontSize: "14px",
          resize: "none",
          borderRadius: "6px",
          border: "1px solid #aaa",
        }}
      />

      {/* Smaller Placeholder Buttons */}
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

      {/* GO button same width as textbox */}
      <button
        style={buttonStyle(false, true)}
        onMouseOver={applyGoButtonInteractions}
        onMouseOut={applyGoButtonInteractions}
        onMouseDown={applyGoButtonInteractions}
        onMouseUp={applyGoButtonInteractions}
        onFocus={applyGoButtonInteractions}
        onBlur={applyGoButtonInteractions}
      >
        GO
      </button>
    </div>
  );
}
