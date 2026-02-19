import { useMemo, useState } from "react";
import { createHelloWorld } from "./algo";
import styles from "./demo.module.css";

export default function Demo() {
  const [input, setInput] = useState<string>("");

  const helloFn = useMemo(() => createHelloWorld(), []);

  function parseArguments(text: string): unknown[] | null {
    if (!text.trim()) return [];

    try {
      const parts = text.split(",").map((p) => p.trim());

      const parsed = parts.map((value) => {
        if (!isNaN(Number(value))) return Number(value);

        if (value === "true") return true;
        if (value === "false") return false;

        if (value === "null") return null;

        if (
          (value.startsWith("[") && value.endsWith("]")) ||
          (value.startsWith("{") && value.endsWith("}"))
        ) {
          return JSON.parse(value);
        }

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
    <div className={styles.container} style={{ maxWidth: 760 }}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create Hello World (Closure Demo)</h2>
        <div className={styles.subtle}>
          Pattern: <b>closure + higher-order function</b>
        </div>
      </div>

      <div className={styles.card}>
        <b>What this problem teaches</b>
        <ul style={{ marginTop: 8 }}>
          <li>The outer function runs once</li>
          <li>It returns a new function</li>
          <li>The inner function remembers variables (closure)</li>
          <li>Arguments are ignored</li>
        </ul>
      </div>

      <label className={styles.label}>
        Enter ANY JavaScript values (comma separated):
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder='example: 42, "hello", [1,2], {a:1}, false'
        />
      </label>

      <div className={styles.card}>
        <div>
          <b>Parsed arguments:</b>
          <pre className={styles.pre}>{JSON.stringify(args, null, 2)}</pre>
        </div>
      </div>

      <div className={styles.resultCard}>
        <div style={{ fontSize: 14 }}>Calling returned function:</div>
        <div className={styles.result}>{String(output)}</div>
        <div className={styles.subtle} style={{ marginTop: 8 }}>
          No matter what you pass → the closure always returns the stored
          greeting.
        </div>
      </div>
    </div>
  );
}
