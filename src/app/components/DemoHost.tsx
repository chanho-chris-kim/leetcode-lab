import React from "react";
import type { DemoEntry } from "../../demos";

type Props = { demo: DemoEntry };

export default function DemoHost({ demo }: Props) {
  const LazyComp = React.lazy(async () => {
    const mod = await demo.load();
    return { default: mod.default };
  });

  return (
    <div style={styles.wrap}>
      <React.Suspense fallback={<div style={styles.loading}>Loading demo…</div>}>
        <LazyComp />
      </React.Suspense>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    border: "1px solid #e6e6e6",
    borderRadius: 12,
    background: "white",
    padding: 16,
    minHeight: 240,
  },
  loading: { color: "#666" },
};
