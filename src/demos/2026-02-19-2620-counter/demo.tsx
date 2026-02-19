import { useState } from "react";
import { createCounter } from "./algo";
import styles from "./demo.module.css";

export default function Demo() {
  const [input, setInput] = useState<string>("");

  // Closure counter
  const [counterFn, setCounterFn] = useState<(() => number) | null>(null);
  const [closureOutput, setClosureOutput] = useState<number | null>(null);

  // Regular React counter
  const [regularCount, setRegularCount] = useState<number | null>(null);

  const handleCreate = () => {
    const n = Number(input);

    if (isNaN(n)) {
      alert("Please enter a valid number");
      return;
    }

    const fn = createCounter(n);
    setCounterFn(() => fn);
    setClosureOutput(null);

    setRegularCount(n);
  };

  const handleClosureIncrement = () => {
    if (!counterFn) return;
    setClosureOutput(counterFn());
  };

  const handleRegularIncrement = () => {
    if (regularCount === null) return;
    setRegularCount((prev) => (prev ?? 0) + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Closure vs Regular Counter</h2>
      </div>

      <label className={styles.label}>
        Enter initial number:
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder="example: 777"
        />
      </label>

      <button className="btn btn-primary" onClick={handleCreate}>
        Create Counters
      </button>

      <div className={styles.comparisonContainer}>
        <div className={styles.card}>
          <h3>Closure Counter</h3>

          <button
            className="btn btn-secondary"
            onClick={handleClosureIncrement}
            disabled={!counterFn}
          >
            Increment (Closure)
          </button>

          <div className={styles.result}>
            {closureOutput !== null ? closureOutput : "No calls yet"}
          </div>

          <p className={styles.explain}>
            Value lives inside JavaScript closure memory. Not stored in React
            state.
          </p>
        </div>

        <div className={styles.card}>
          <h3>React State Counter</h3>

          <button
            className="btn btn-secondary"
            onClick={handleRegularIncrement}
            disabled={regularCount === null}
          >
            Increment (State)
          </button>

          <div className={styles.result}>
            {regularCount !== null ? regularCount : "Not initialized"}
          </div>

          <p className={styles.explain}>
            Value lives in React state. Triggers re-render on every update.
          </p>
        </div>
      </div>
    </div>
  );
}
