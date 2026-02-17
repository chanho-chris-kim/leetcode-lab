import React, { useMemo, useState } from "react";
import { demos, type DemoEntry } from "./demos";
import Sidebar from "./app/components/Sidebar";
import DemoHost from "./app/components/DemoHost";

export default function App() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("all");
  const [activeId, setActiveId] = useState<string>(demos[0]?.id ?? "");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    demos.forEach(d => d.tags.forEach(t => set.add(t)));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demos.filter(d => {
      const matchesQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q));

      const matchesTag = tag === "all" || d.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

  const active: DemoEntry | undefined =
    demos.find(d => d.id === activeId) ?? filtered[0] ?? demos[0];

  // Keep activeId valid after filtering
  React.useEffect(() => {
    if (!active) return;
    setActiveId(active.id);
  }, [active?.id]);

  return (
    <div style={styles.shell}>
      <Sidebar
        query={query}
        onQueryChange={setQuery}
        tag={tag}
        onTagChange={setTag}
        tags={allTags}
        demos={filtered}
        activeId={active?.id ?? ""}
        onSelect={setActiveId}
      />
      <main style={styles.main}>
        {active ? (
          <DemoHost demo={active} />
        ) : (
          <div style={styles.empty}>
            <h2 style={{ margin: 0 }}>No demos match your filters</h2>
            <p style={{ marginTop: 8, color: "#666" }}>
              Try clearing search or switching tag to “all”.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
  },
  main: {
    padding: 20,
    overflow: "auto",
    background: "#fafafa",
  },
  empty: {
    border: "1px solid #e6e6e6",
    borderRadius: 12,
    background: "white",
    padding: 16,
  },
};
