# LeetCode Lab (personal workspace)

This repo is my daily bridge between LeetCode and real code.  
Every problem I solve becomes a tiny interactive demo I can run locally and revisit later. The goal isn’t a portfolio or a public library — it’s a place to *practice turning ideas into software* and to remember patterns without memorizing them.

---

## Why I’m doing this

LeetCode answers get accepted, then forgotten.  
I want each problem to leave a concrete trace:

- a clean function
- a small UI I can poke at
- a short takeaway I understand next week

Over time this becomes my own reference manual for patterns (closure, two pointers, sliding window, BFS/DFS, DP, etc.).

---

## Daily routine (keep it small)

1. Solve **1 LeetCode problem** (morning)
2. Extract the idea into a pure function → `algo.ts`
3. Wrap it with a tiny UI → `demo.tsx`
4. (Optional) add tags/notes → `meta.ts`
5. Refresh the app and interact with it for ~2–5 minutes

Target: **5–10 minutes after solving**, not a second project.

---

## Run locally

```bash
npm install
npm run dev
```

Open the local URL (usually http://localhost:5173).

The sidebar lists every demo automatically.

---

## Adding a new day

Create a folder using the date + slug:

```
src/demos/YYYY-MM-DD-problem-slug/
```

Example:

```
src/demos/2026-02-18-valid-parentheses/
```

### Required files

**algo.ts** — pure logic only (no React, no DOM)

```ts
export function isValid(s: string): boolean {
  // solution
}
```

**demo.tsx** — minimal inputs + output display

The UI should only demonstrate behavior, not be fancy.

### Optional

**meta.ts**

```ts
export const meta = {
  title: "Valid Parentheses",
  date: "2026-02-18",
  tags: ["stack"]
};
```

The app auto‑loads any folder containing `demo.tsx`.
No registry editing.

---

## Conventions I’m following

### 1) Keep algorithms pure

`algo.ts` must not import React or touch the DOM.

Good:
```
input -> function -> output
```

Bad:
```
function manipulates UI or state directly
```

---

### 2) TypeScript rules (important)

Always type parameters and return values.

Use:
```
unknown
```
when I intentionally ignore input.

Avoid:
```
any
```

Examples:

```ts
(...args: unknown[]) => string
```

```ts
function twoSum(nums: number[], target: number): number[] | null
```

---

### 3) Demo size guideline

Most demos should be:

- 1–2 inputs
- 1 output
- 1 sentence takeaway

No animation unless it helps understanding.

---

## Pattern tags I’ll reuse

arrays  
hashmap  
two-pointers  
sliding-window  
stack  
binary-search  
bfs  
dfs  
heap  
greedy  
dynamic-programming  
backtracking  
union-find  
trie  
closure

Keep vocabulary consistent so I can filter later.

---

## Input notes

Some demos parse free‑form text. Bare words should be treated as strings so I don’t need quotes.

Example input:
```
1, hello, true, [1,2,3]
```

---

## What I’m actually practicing

Not algorithms — *translation*:

problem → idea → function → module → UI

If I can explain a solution through a working demo, I actually understand it.

---

## Future ideas (optional, not required)

- grid visualizer for BFS/DFS
- binary search pointer visualization
- sliding window highlighter
- retry old problems weekly
- generator script for new folders

---

This repo is a notebook I can run.

