import type React from "react";

export type DemoMeta = {
  title?: string;
  date?: string; // YYYY-MM-DD
  tags?: string[];
};

export type DemoEntry = {
  id: string; // folder name
  title: string;
  date: string;
  tags: string[];
  load: () => Promise<{ default: React.ComponentType }>;
};

/**
 * Auto-load all demos:
 *   src/demos/<folder>/demo.tsx
 */
const demoModules = import.meta.glob("./*/demo.tsx");

/**
 * Optional metadata file per demo:
 *   src/demos/<folder>/meta.ts  exporting either:
 *     export const meta = {...}
 *   OR
 *     export default {...}
 */
const metaModules = import.meta.glob("./*/meta.ts", { eager: true }) as Record<
  string,
  { meta?: DemoMeta; default?: DemoMeta }
>;

function titleFromSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function inferFromId(id: string) {
  // id example: "2026-02-17-hello-world"
  const maybeDate = id.slice(0, 10);
  const hasDate = /^\d{4}-\d{2}-\d{2}$/.test(maybeDate);
  const slug = hasDate ? id.slice(11) : id;
  return {
    date: hasDate ? maybeDate : "unknown-date",
    title: titleFromSlug(slug || id),
  };
}

export const demos: DemoEntry[] = Object.keys(demoModules)
  .map((demoPath) => {
    // demoPath looks like: "./2026-02-17-hello-world/demo.tsx"
    const parts = demoPath.split("/");
    const folder = parts[1]; // "2026-02-17-hello-world"
    const id = folder;

    const metaPath = `./${folder}/meta.ts`;
    const metaMod = metaModules[metaPath];
    const meta: DemoMeta | undefined = metaMod?.meta ?? metaMod?.default;

    const inferred = inferFromId(id);

    const title = meta?.title ?? inferred.title;
    const date = meta?.date ?? inferred.date;
    const tags = meta?.tags ?? [];

    const load = async () => {
      const mod = (await demoModules[demoPath]()) as { default: React.ComponentType };
      return { default: mod.default };
    };

    return { id, title, date, tags, load };
  })
  // Sort newest first when date is valid; unknown-date goes last
  .sort((a, b) => {
    if (a.date === "unknown-date" && b.date === "unknown-date") return a.title.localeCompare(b.title);
    if (a.date === "unknown-date") return 1;
    if (b.date === "unknown-date") return -1;
    return b.date.localeCompare(a.date);
  });
