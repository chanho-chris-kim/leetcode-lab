import React from "react";
import type { DemoEntry } from "../../demos";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  tag: string;
  onTagChange: (v: string) => void;
  tags: string[];
  demos: DemoEntry[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({
  query,
  onQueryChange,
  tag,
  onTagChange,
  tags,
  demos,
  activeId,
  onSelect,
}: Props) {
  return (
    <aside style={styles.aside}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>LeetCode Lab</div>
          <div style={styles.subtitle}>Daily mini-demos (UI-first)</div>
        </div>
      </div>

      <div style={styles.controls}>
        <input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Search title, id, tag…"
          style={styles.input}
        />
        <select value={tag} onChange={e => onTagChange(e.target.value)} style={styles.select}>
          {tags.map(t => (
            <option key={t} value={t}>
              {t === "all" ? "All tags" : t}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.list}>
        {demos.length === 0 ? (
          <div style={styles.empty}>No demos found.</div>
        ) : (
          demos.map(d => {
            const active = d.id === activeId;
            return (
              <button
                key={d.id}
                onClick={() => onSelect(d.id)}
                style={{
                  ...styles.item,
                  ...(active ? styles.itemActive : null),
                }}
              >
                <div style={styles.itemTop}>
                  <span style={styles.itemTitle}>{d.title}</span>
                  <span style={styles.itemDate}>{d.date}</span>
                </div>
                <div style={styles.tagRow}>
                  {d.tags.slice(0, 4).map(t => (
                    <span key={t} style={styles.tag}>
                      {t}
                    </span>
                  ))}
                  {d.tags.length > 4 ? (
                    <span style={styles.moreTag}>+{d.tags.length - 4}</span>
                  ) : null}
                </div>
                <div style={styles.itemId}>{d.id}</div>
              </button>
            );
          })
        )}
      </div>

      <div style={styles.footer}>
        Tip: add one folder/day in <code>src/demos/</code>
      </div>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  aside: {
    borderRight: "1px solid #e6e6e6",
    background: "white",
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    minWidth: 0,
    height: "100vh",
  },
  header: {
    padding: 16,
    borderBottom: "1px solid #f0f0f0",
  },
  title: { fontSize: 18, fontWeight: 700 },
  subtitle: { fontSize: 12, color: "#666", marginTop: 4 },
  controls: {
    padding: 16,
    borderBottom: "1px solid #f0f0f0",
    display: "grid",
    gap: 8,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14,
  },
  select: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14,
    background: "white",
  },
  list: {
    overflow: "auto",
    padding: 12,
    display: "grid",
    gap: 10,
  },
  empty: { color: "#666", fontSize: 14, padding: 8 },
  item: {
    textAlign: "left",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #eee",
    background: "white",
    cursor: "pointer",
  },
  itemActive: {
    border: "1px solid #bbb",
    boxShadow: "0 1px 10px rgba(0,0,0,0.05)",
  },
  itemTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "baseline",
  },
  itemTitle: { fontWeight: 700, fontSize: 14 },
  itemDate: { fontSize: 12, color: "#666" },
  tagRow: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 },
  tag: {
    fontSize: 11,
    border: "1px solid #ddd",
    borderRadius: 999,
    padding: "2px 8px",
    color: "#333",
  },
  moreTag: { fontSize: 11, color: "#666", padding: "2px 4px" },
  itemId: { marginTop: 8, fontSize: 12, color: "#777" },
  footer: {
    borderTop: "1px solid #f0f0f0",
    padding: 12,
    fontSize: 12,
    color: "#666",
  },
};
