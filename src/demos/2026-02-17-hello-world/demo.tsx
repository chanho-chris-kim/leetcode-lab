import React, { useMemo, useState } from "react";
import { createHelloWorld } from "./algo";

export default function Demo() {
  const [input, setInput] = useState<string>("");

  // create the returned function ONCE
  const helloFn = useMemo(() => createHelloWorld(), []);

  function parseArguments(text: string): unknown[] | null {
    if (!text.trim()) return [];

    try {
      // split by commas but keep brackets/objects intact
      const parts = text.split(",").map((p) => p.trim());

      const parsed = parts.map((value) => {
        // number
        if (!isNaN(Number(value))) return Number(value);

        // boolean
        if (value === "true") return true;
        if (value === "false") return false;

        // null
        if (value === "null") return null;

        // array or object
        if (
          (value.startsWith("[") && value.endsWith("]")) ||
          (value.startsWith("{") && value.endsWith("}"))
        ) {
          return JSON.parse(value);
        }

        // otherwise treat as STRING automatically
        return value;
      });

      return parsed;
    } catch {
      return null;
    }
  }

  const args = parseArguments(input);
  const output = args ? helloFn(...args) : "Invalid input";

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <h2 style={{ margin: 0 }}>Create Hello World (Closure Demo)</h2>
        <div style={{ marginTop: 6, color: "#666" }}>
          Pattern: <b>closure + higher-order function</b>
        </div>
      </div>

      <div style={card}>
        <b>What this problem teaches</b>
        <ul style={{ marginTop: 8 }}>
          <li>The outer function runs once</li>
          <li>It returns a new function</li>
          <li>The inner function remembers variables (closure)</li>
          <li>Arguments are ignored</li>
        </ul>
      </div>

      <label style={label}>
        Enter ANY JavaScript values (comma separated):
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={inputStyle}
          placeholder='example: 42, "hello", [1,2], {a:1}, false'
        />
      </label>

      <div style={card}>
        <div>
          <b>Parsed arguments:</b>
          <pre style={pre}>{JSON.stringify(args, null, 2)}</pre>
        </div>
      </div>

      <div style={resultCard}>
        <div style={{ fontSize: 14 }}>Calling returned function:</div>
        <div style={result}>{String(output)}</div>
        <div style={{ marginTop: 8, color: "#666" }}>
          No matter what you pass → the closure always returns the stored
          greeting.
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
