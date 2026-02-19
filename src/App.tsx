import React, { useMemo, useState } from "react";
import { demos, type DemoEntry } from "./demos";
import Sidebar from "./app/components/Sidebar";
import DemoHost from "./app/components/DemoHost";

export default function App() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("all");
  const [activeId, setActiveId] = useState<string>(demos[0]?.id ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    demos.forEach((d) => d.tags.forEach((t) => set.add(t)));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demos.filter((d) => {
      const matchesQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTag = tag === "all" || d.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

  const active: DemoEntry | undefined =
    demos.find((d) => d.id === activeId) ?? filtered[0] ?? demos[0];

  // Keep activeId valid after filtering
  React.useEffect(() => {
    if (!active) return;
    setActiveId(active.id);
  }, [active?.id]);

  // Close sidebar on selection (nice on mobile)
  function handleSelect(id: string) {
    setActiveId(id);
    setSidebarOpen(false);
  }

  return (
    <div style={styles.shell}>
      {/* Top bar (always visible on small screens) */}
      <header style={styles.topbar}>
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          style={styles.menuBtn}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div style={styles.topbarTitle}>
          <div style={{ fontWeight: 800, lineHeight: 1.1 }}>LeetCode Lab</div>
          <div style={{ fontSize: 12, color: "#666" }}>
            {active ? `${active.date} — ${active.title}` : "Select a demo"}
          </div>
        </div>
      </header>

      {/* Desktop sidebar (visible via CSS @media) */}
      <aside style={styles.sidebarDesktop} aria-label="Sidebar">
        <Sidebar
          query={query}
          onQueryChange={setQuery}
          tag={tag}
          onTagChange={setTag}
          tags={allTags}
          demos={filtered}
          activeId={active?.id ?? ""}
          onSelect={handleSelect}
        />
      </aside>

      {/* Mobile drawer + overlay */}
      {sidebarOpen && <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />}
      <aside
        style={{
          ...styles.sidebarDrawer,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-102%)",
        }}
        aria-label="Sidebar drawer"
      >
        <Sidebar
          query={query}
          onQueryChange={setQuery}
          tag={tag}
          onTagChange={setTag}
          tags={allTags}
          demos={filtered}
          activeId={active?.id ?? ""}
          onSelect={handleSelect}
        />
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {active ? (
          <DemoHost demo={active} />
        ) : (
          <div style={styles.empty}>
            <h2 style={{ margin: 0 }}>No demos match your filters</h2>
            <p style={{ marginTop: 8, color: "#666" }}>
              Clear search or switch tag to “all”.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    background: "#fafafa",
  },

  topbar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 12px",
    borderBottom: "1px solid #e6e6e6",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)",
  },
  menuBtn: {
    border: "1px solid #ddd",
    background: "white",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 18,
    lineHeight: 1,
  },
  topbarTitle: {
    minWidth: 0,
    display: "grid",
    gap: 2,
  },

  // Desktop sidebar (only shows on wide screens using CSS in index.css below)
  sidebarDesktop: {
    display: "none",
  },

  // Mobile drawer
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.25)",
    zIndex: 30,
  },
  sidebarDrawer: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "min(360px, 92vw)",
    background: "white",
    borderRight: "1px solid #e6e6e6",
    zIndex: 40,
    transition: "transform 180ms ease",
    willChange: "transform",
    overflow: "auto",
  },

  main: {
    padding: 16,
    overflow: "auto",
  },
  empty: {
    border: "1px solid #e6e6e6",
    borderRadius: 12,
    background: "white",
    padding: 16,
  },
};
