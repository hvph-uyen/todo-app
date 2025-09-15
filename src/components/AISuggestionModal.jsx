import React from "react";

function AISuggestionModal({ onClose, theme, tasks, currentEnergy, availableTime }) {
  const [prompt, setPrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResults([]);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/api/aiSuggestTasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          tasks,
          currentEnergy,
          availableTime,
        }),
      });

      const data = await res.json();
      console.log("AI response:", data);

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.suggestions || []);
      }
    } catch (err) {
      setError("Request failed: " + err.message);
    }

    setLoading(false);
  };

  const safeTheme = theme || {
    panel: { background: "#fff" },
    fontColor: "#000",
    fontColorSecondary: "#555",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3000,
      }}
    >
      <div
        style={{
          background: safeTheme.panel.background,
          color: safeTheme.fontColor,
          padding: "20px",
          borderRadius: "16px",
          width: "420px",
          maxHeight: "75vh",
          overflowY: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginBottom: "16px", fontSize: "1.25rem", fontWeight: 700 }}>
          🤖 AI Task Generator
        </h3>

        {/* Input */}
        <input
          type="text"
          placeholder="What are you planning to do?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "95%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "16px",
            color: safeTheme.fontColor,
            fontSize: "14px",
          }}
        />

        {/* Buttons */}
        <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: loading ? "#9ca3af" : "#2563eb",
              color: "#fff",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "transparent",
              color: safeTheme.fontColor,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Close
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ color: "red", marginBottom: "12px" }}>❌ {error}</div>
        )}

        {/* Suggestions */}
        {results.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <h4 style={{ marginBottom: "10px", fontWeight: 600 }}>Suggestions:</h4>
            {results.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: "10px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  background: safeTheme.panel.background === "#fff" ? "#f9fafb" : "#1f2937",
                }}
              >
                <strong style={{ display: "block", marginBottom: "4px" }}>
                  {r.text || r}
                </strong>
                {r.priority && (
                  <div style={{ fontSize: "13px", marginBottom: "2px" }}>
                    Priority: {r.priority}
                  </div>
                )}
                {r.estimatedMinutes && (
                  <div style={{ fontSize: "13px", marginBottom: "2px" }}>
                    Est. Time: {r.estimatedMinutes} min
                  </div>
                )}
                {r.reason && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: safeTheme.fontColorSecondary,
                      fontStyle: "italic",
                    }}
                  >
                    {r.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && <p style={{ marginTop: "10px" }}>⏳ Waiting for AI...</p>}
      </div>
    </div>
  );
}

export default AISuggestionModal;