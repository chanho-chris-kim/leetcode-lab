import React, { useState } from "react";
import { createCounter } from "./algo";

export default function Demo() {
  const [input, setInput] = useState<string>("");
  const [counterFn, setCounterFn] = useState<(() => number) | null>(null);
  const [output, setOutput] = useState<number | null>(null);

  // Step 1 — create closure
  const handleCreate = () => {
    const n = Number(input);

    if (isNaN(n)) {
      alert("Please enter a valid number");
      return;
    }

    const fn = createCounter(n); // <-- CLOSURE CREATED HERE
    setCounterFn(() => fn);
    setOutput(null);
  };

  // Step 2 — call closure repeatedly
  const handleIncrement = () => {
    if (!counterFn) return;

    const result = counterFn(); // closure remembers n
    setOutput(result);
  };

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <h2 style={{ margin: 0 }}>Closure Counter Demo</h2>
        <div style={{ marginTop: 6, color: "#666" }}>
          Pattern: <b>Closure</b>
        </div>
      </div>

      <div style={card}>
        <b>What this problem teaches</b>
        <ul style={{ marginTop: 8 }}>
          <li>A function remembers variables from where it was created</li>
          <li>
            The inner function still has access to n after createCounter
            finishes
          </li>
          <li>Closures create persistent memory without React state</li>
          <li>The value lives in JavaScript memory, not React</li>
        </ul>
      </div>

      <label style={label}>
        Enter initial number:
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={inputStyle}
          placeholder="example: 777"
        />
      </label>

      <button onClick={handleCreate}>Create Counter</button>

      <button onClick={handleIncrement} disabled={!counterFn}>
        Increment
      </button>

      <div style={card}>
        <b>Typed value:</b>
        <p>{input}</p>
      </div>

      <div style={resultCard}>
        <div style={{ fontSize: 14 }}>Returned value:</div>
        <div style={result}>{output !== null ? output : "No calls yet"}</div>
        <div style={{ marginTop: 8, color: "#666" }}>
          The counter value lives inside the closure, not inside React state.
        </div>
      </div>
    </div>
  );
}

const label: React.CSSProperties = {
  display: "grid",
  gap: 6,
  fontSize: 13,
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  outline: "none",
  fontSize: 14,
};

const card: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid #eee",
  background: "#fafafa",
};

const resultCard: React.CSSProperties = {
  padding: 14,
  borderRadius: 12,
  border: "1px solid #dcdcdc",
  background: "#ffffff",
};

const result: React.CSSProperties = {
  marginTop: 8,
  padding: 10,
  borderRadius: 8,
  background: "#f1f5f9",
  fontFamily: "monospace",
  fontSize: 18,
};

const pre: React.CSSProperties = {
  background: "#f6f8fa",
  padding: 10,
  borderRadius: 8,
  overflowX: "auto",
  fontSize: 12,
};
